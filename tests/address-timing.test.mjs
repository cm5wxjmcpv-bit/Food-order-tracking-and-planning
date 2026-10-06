import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';

// Small DOM/timer adapter for scheduling tests; not a live browser or Google test.
function client() {
  let now = 100000, next = 0;
  const timers = new Map();
  class Element {
    constructor(tag) {
      this.tag = tag; this.children = []; this.handlers = {}; this.value = '';
      this.isConnected = true; this.classList = { contains: () => false };
      this.textContent = ''; this.disabled = false; this.attributes = new Map();
    }
    append(...items) { this.children.push(...items); for (const item of items) item.parentElement = this; }
    replaceWith(other) { this.replacement = other; }
    replaceChildren() { this.children = []; }
    setAttribute(name, value) { this.attributes.set(name, value); }
    getAttribute(name) { return this.attributes.get(name) ?? null; }
    removeAttribute(name) { this.attributes.delete(name); }
    addEventListener(name, handler) { this.handlers[name] = handler; }
    focus() { document.activeElement = this; this.handlers.focus?.(); }
  }
  const document = { createElement: tag => new Element(tag), activeElement: null, addEventListener() {} };
  const ctx = { document, window: {}, crypto, queueMicrotask, Date: { now: () => now },
    setTimeout: (fn, delay) => { timers.set(++next, { at: now + delay, fn }); return next; },
    clearTimeout: id => timers.delete(id),
  };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync('address-entry.js', 'utf8'), ctx);
  ctx.MealButtonFeedback = ctx.window.MealButtonFeedback;
  const label = new Element('label'), input = new Element('input'); label.append(input);
  const requests = [], pending = []; let configCalls = 0;
  const state = ctx.window.MealAddresses.attach(input, async (action, payload) => {
    if (action === 'addressConfig') { configCalls++; return { autocomplete: true, validation: true }; }
    requests.push({ action, payload });
    return await new Promise(resolve => pending.push(resolve));
  });
  const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };
  return { input, requests, pending, document, state, configCalls: () => configCalls,
    type: value => { input.value = value; input.handlers.input(); },
    flush,
    tick: async ms => {
      now += ms;
      for (const [id, timer] of [...timers]) if (timer.at <= now) { timers.delete(id); timer.fn(); }
      await flush();
    },
    list: () => label.replacement.children[1],
  };
}

test('lookup begins during continuous typing without waiting for a typing pause', async () => {
  const h = client(); h.input.focus(); await h.flush();
  h.type('100 S'); await h.tick(80);
  h.type('100 Sy'); await h.tick(80);
  assert.equal(h.requests.length, 1);
  assert.equal(h.requests[0].payload.address, '100 Sy');
  assert.equal(h.configCalls(), 1);
});

test('in-flight edits coalesce into one latest query, with no overlapping calls or stale results', async () => {
  const h = client(); h.input.focus();
  h.type('100 Synthetic'); await h.tick(150);
  assert.equal(h.requests.length, 1);
  for (const value of ['100 Synthetic S', '100 Synthetic St', '100 Synthetic Street']) {
    h.type(value); await h.tick(100);
  }
  assert.equal(h.requests.length, 1);
  h.pending.shift()({ suggestions: [{ address: 'STALE result' }] }); await h.flush();
  assert.equal(h.list().children.length, 0);
  await h.tick(700);
  assert.equal(h.requests.length, 2);
  assert.equal(h.requests[1].payload.address, '100 Synthetic Street');
  h.pending.shift()({ suggestions: [{ address: 'Latest result' }] }); await h.flush();
  assert.equal(h.list().children[0].textContent, 'Latest result');
});

test('leaving the field before its timer fires avoids an unnecessary lookup', async () => {
  const h = client(); h.input.focus(); h.type('100 Synthetic');
  h.document.activeElement = null; await h.tick(150);
  assert.equal(h.requests.length, 0);
});

test('a delayed suggestion cannot overwrite a completed validation badge', async () => {
  const h = client(); h.input.focus(); h.type('100 Synthetic'); await h.tick(150);
  h.input.parentElement.parentElement.children[2].handlers.click(); await h.flush();
  assert.equal(h.requests[1].action, 'addressPreview');
  h.pending[1]({ original: '100 Synthetic', confident: true, equivalent: true, originalReceipt: 'synthetic-proof' });
  await h.flush();
  const status = h.input.parentElement.parentElement.children[3];
  assert.equal(status.textContent, 'Address Verified');
  h.pending[0]({ suggestions: [{ address: 'Late suggestion' }] }); await h.flush();
  assert.equal(status.textContent, 'Address Verified');
  assert.equal(h.list().children.length, 0);
});


test('choosing a suggestion fills the field immediately and does not check it again on submit', async () => {
  const h = client(); h.input.focus(); h.type('100 Synth'); await h.tick(150);
  h.pending.shift()({ suggestions: [{ address: '100 Synthetic Street, Example City' }] }); await h.flush();
  let prevented = false;
  h.list().children[0].handlers.pointerdown({ preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
  h.list().children[0].handlers.click();
  assert.equal(h.input.value, '100 Synthetic Street, Example City');
  await h.flush();
  assert.equal(h.requests[1].payload.address, '100 Synthetic Street, Example City');
  h.pending.shift()({ original: h.input.value, confident: true, equivalent: true, originalReceipt: 'synthetic-proof' });
  await h.flush();
  assert.equal(await h.state.prepare(), true);
  assert.equal(h.requests.length, 2);
  assert.equal(h.state.receipt(), 'synthetic-proof');
});

test('selected street suggestions preserve complete entered apartment details', async () => {
  const h = client(); h.input.focus(); h.type('100 Synthetic St Apt 4 East'); await h.tick(150);
  h.pending.shift()({ suggestions: [{ address: '100 Synthetic Street, Example City' }] }); await h.flush();
  h.list().children[0].handlers.click(); await h.flush();
  assert.equal(h.input.value, '100 Synthetic Street, Example City, Apt 4 East');
  assert.equal(h.requests[1].payload.address, h.input.value);
});

test('a suggestion with a conflicting unit cannot silently replace the entered unit', async () => {
  const h = client(); h.input.focus(); h.type('100 Synthetic St Apt 4'); await h.tick(150);
  h.pending.shift()({ suggestions: [{ address: '100 Synthetic St Apt 5' }] }); await h.flush();
  h.list().children[0].handlers.click(); await h.flush();
  assert.equal(h.input.value, '100 Synthetic St Apt 4');
  assert.equal(h.requests[1].payload.address, '100 Synthetic St Apt 4');
  assert.equal(h.requests[1].payload.candidate, '100 Synthetic St Apt 5');
});
