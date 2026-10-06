import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
function controller() {
  const ctx = vm.createContext({ window: {}, setTimeout });
  vm.runInContext(fs.readFileSync("submission-confirmation.js", "utf8"), ctx);
  return ctx.window.MealSubmission;
}
const receipt = { referralId: "synthetic-id", meals: 5 };
test("successful POST returns immediately without recovery reads", async () => {
  const c = controller(); let checks = 0;
  assert.equal(await c.confirm({send: async () => receipt, check: async () => { checks++; }}), receipt);
  assert.equal(checks, 0);
});
test("lost POST response is confirmed by a read without submitting again", async () => {
  const c = controller(); let posts = 0, checks = 0, messages = 0;
  const result = await c.confirm({ send: async () => { posts++; throw Object.assign(new Error("network"), { uncertain: true }); },
    check: async () => { checks++; return { receipt }; }, onChecking: () => messages++ });
  assert.equal(result, receipt); assert.equal(posts, 1); assert.equal(checks, 1); assert.equal(messages, 1);
});
test("definitive capacity error is shown without recovery or another POST", async () => {
  const c = controller(); const error = Object.assign(new Error("Only 2 meals remain"), { code: "CAPACITY" });
  await assert.rejects(c.confirm({ send: async () => { throw error; }, check: async () => { assert.fail("Unexpected read"); }}), e => e === error);
});
test("a temporarily absent receipt is rechecked and a later atomic save is recognized", async () => {
  const c = controller(); let checks = 0;
  assert.equal(await c.confirm({ send: async () => { throw { uncertain: true }; },
    check: async () => ({receipt: ++checks === 1 ? null : receipt}), pause: async () => {} }), receipt);
  assert.equal(checks, 2);
});
test("unconfirmed save remains uncertain; never infer success from availability or retry the write", async () => {
  const c = controller(); let posts = 0, checks = 0;
  await assert.rejects(c.confirm({ send: async () => { posts++; throw { uncertain: true }; }, check: async () => { checks++; throw new Error("read failed"); }, pause: async () => {} }),
    e => e.uncertain === true && /could not confirm/.test(e.message));
  assert.equal(posts, 1); assert.equal(checks, 2);
});
test("public transport bounds POST time, disables caching and keeps recipient data out of URLs", async () => {
  const source = fs.readFileSync("app.js", "utf8");
  let ms, cleared = 0, request;
  const ctx = vm.createContext({ window: { MEALS_CONFIG: { publicApiUrl: "https://example.test/exec" } }, AbortController,
    setTimeout: (fn, delay) => { ms = delay; return 1; }, clearTimeout: () => cleared++,
    fetch: async (url, options) => { request = { url, options }; return {ok: true, json: async () => ({ok: true, data: receipt})}; },
    encodeURIComponent, Date });
  vm.runInContext(source.slice(source.indexOf("  async function api("), source.indexOf("  async function load(")), ctx);
  await ctx.api({address: "Synthetic secret address", action: "submit"});
  assert.equal(ms, 12000); assert.equal(cleared, 1);
  assert.equal(request.options.cache, "no-store"); assert.equal(request.options.credentials, "omit");
  assert.ok(!request.url.includes("Synthetic")); assert.match(request.options.body, /Synthetic/);
  await ctx.api(null, "synthetic-submission-id");
  assert.equal(ms, 15000); assert.match(request.url, /action=submissionReceipt/);
});
test("Safari numeric AbortError triggers receipt recovery instead of escaping as a backend error", async () => {
  const source = fs.readFileSync("app.js", "utf8");
  let calls = 0;
  const ctx = vm.createContext({ window: { MEALS_CONFIG: { publicApiUrl: "https://example.test/exec" } }, AbortController,
    setTimeout: () => 1, clearTimeout: () => {}, encodeURIComponent, Date,
    fetch: async () => {
      if (++calls === 1) throw new DOMException("Fetch is aborted", "AbortError");
      return {ok: true, json: async () => ({ok: true, data: {receipt}})};
    } });
  vm.runInContext(source.slice(source.indexOf("  async function api("), source.indexOf("  async function load(")), ctx);
  const c = controller();
  const result = await c.confirm({send: () => ctx.api({action: "submit"}), check: () => ctx.api(null, "synthetic-submission-id")});
  assert.equal(result, receipt);
  assert.equal(calls, 2);
});
