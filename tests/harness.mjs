import fs from "node:fs";
import vm from "node:vm";
import crypto from "node:crypto";
import path from "node:path";
export function harness() {
  let id = 0,
    locked = false,
    failNext = false;
  const tables = new Map();
  const props = {
    MEALS_ENV: "development",
    MEALS_SPREADSHEET_ID: "synthetic-development-sheet",
    MEALS_ALLOW_SCHEMA_SETUP: "true",
    MEALS_BOOTSTRAP_ADMIN_EMAILS:
      "admin-one@example.test,admin-two@example.test",
  };
  const state = {
    active: "admin-one@example.test",
    effective: "admin-one@example.test",
    apiCalls: 0,
    batchCalls: 0,
    lockAcquires: 0,
    externalDuringLock: false,
  };
  const sheetAPI = (t) => ({
    getSheetId: () => t.id,
    getName: () => t.name,
    getLastRow: () => t.rows.length,
    getLastColumn: () => t.rows[0]?.length || 0,
    getRange: (r, c, n, w) => ({
      getValues: () =>
        Array.from({ length: n }, (_, i) =>
          Array.from(
            { length: w },
            (_, j) => t.rows[r - 1 + i]?.[c - 1 + j] ?? "",
          ),
        ),
    }),
  });
  const db = {
    getId: () => props.MEALS_SPREADSHEET_ID,
    getSheets: () => [...tables.values()].map(sheetAPI),
    getSheetByName: (name) =>
      tables.has(name) ? sheetAPI(tables.get(name)) : null,
  };
  const ctx = {
    console,
    Date,
    Math,
    JSON,
    Set,
    Map,
    Object,
    Array,
    Number,
    String,
    Boolean,
    Error,
    RegExp,
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (k) => props[k] ?? null,
        setProperty: (k, v) => {
          props[k] = v;
        },
      }),
    },
    Session: {
      getActiveUser: () => ({ getEmail: () => state.active }),
      getEffectiveUser: () => ({ getEmail: () => state.effective }),
    },
    Utilities: {
      getUuid: () => crypto.randomUUID(),
      DigestAlgorithm: { SHA_256: "sha256" },
      Charset: { UTF_8: "utf8" },
      computeDigest: (_, v) =>
        [...crypto.createHash("sha256").update(v).digest()].map((n) =>
          n > 127 ? n - 256 : n,
        ),
      newBlob: (s) => ({ getBytes: () => [...Buffer.from(s)] }),
    },
    SpreadsheetApp: { openById: () => db },
    LockService: {
      getScriptLock: () => ({
        tryLock: () => {
          state.lockAcquires++;
          if (locked) return false;
          locked = true;
          return true;
        },
        releaseLock: () => {
          locked = false;
        },
      }),
    },
    ScriptApp: { getOAuthToken: () => "synthetic-server-token" },
    UrlFetchApp: {
      fetch: (url, options) => {
        state.apiCalls++;
        if (locked) state.externalDuringLock = true;
        if (state.fetch) return state.fetch(url, options);
        throw new Error("External API disabled in tests");
      },
    },
    ContentService: {
      MimeType: { JSON: "json" },
      createTextOutput: (s) => ({ setMimeType: () => ({ text: s }) }),
    },
    Sheets: {
      Spreadsheets: {
        batchUpdate: (body) => {
          state.batchCalls++;
          if (!locked) throw new Error("Writes must be locked");
          if (failNext) {
            failNext = false;
            throw new Error("Injected atomic write failure");
          }
          const draft = structuredClone([...tables]);
          const staged = new Map(draft);
          for (const req of body.requests) {
            if (req.addSheet) {
              const p = req.addSheet.properties;
              if (staged.has(p.title)) throw new Error("Sheet exists");
              staged.set(p.title, { name: p.title, id: p.sheetId, rows: [] });
            } else {
              const u = req.updateCells || req.appendCells,
                sid = u.range?.sheetId ?? u.start?.sheetId ?? u.sheetId,
                t = [...staged.values()].find((x) => x.id === sid);
              if (!t) throw new Error("Missing table");
              const start = req.appendCells
                ? t.rows.length
                : (u.range?.startRowIndex ?? u.start.rowIndex);
              const col =
                u.range?.startColumnIndex ?? u.start?.columnIndex ?? 0;
              u.rows.forEach((row, i) => {
                t.rows[start + i] ||= [];
                row.values.forEach((c, j) => {
                  const v = c.userEnteredValue || {};
                  if (v.formulaValue !== undefined)
                    throw new Error("Formula injection");
                  t.rows[start + i][col + j] =
                    v.stringValue ?? v.numberValue ?? v.boolValue ?? "";
                });
              });
            }
          }
          tables.clear();
          for (const [k, v] of staged) tables.set(k, v);
          return {};
        },
      },
    },
  };
  vm.createContext(ctx);
  const files = [
    "Validation",
    "Store",
    "Auth",
    "Audit",
    "Events",
    "Duplicates",
    "Referrals",
    "Reports",
    "Addresses",
    "Routing",
    "Schema",
    "Code",
  ];
  for (const f of files)
    vm.runInContext(
      fs.readFileSync(path.resolve("apps-script", f + ".gs"), "utf8"),
      ctx,
      { filename: f + ".gs" },
    );
  // Include an unrelated legacy tab: schema setup must preserve it.
  tables.set("Requests", {
    name: "Requests",
    id: 0,
    rows: [
      ["Timestamp", "Name", "Comments"],
      ["synthetic", "Legacy Test", "Legacy comment preserved"],
    ],
  });
  ctx.setupDevelopmentSchema_();
  return {
    ctx,
    state,
    props,
    tables,
    failNext: () => {
      failNext = true;
    },
    snapshot: () => JSON.stringify([...tables]),
    admin: (action, p) => JSON.parse(JSON.stringify(ctx.adminCall(action, p))),
    public: (p) =>
      JSON.parse(
        ctx.doPost({
          postData: { contents: JSON.stringify({ action: "submit", ...p }) },
        }).text,
      ),
    get: (name) => ctx.load_()[name],
    seed: (fn) => ctx.locked_((s) => fn(s)),
  };
}
export const payload = (eventId, meals = [3, 2], overrides = {}) => ({
  eventId,
  submissionId: crypto.randomUUID(),
  organizationName: "Synthetic Outreach",
  organizationEmail: "outreach@example.test",
  organizationPhone: "202-555-0100",
  recipients: meals.map((n, i) => ({
    recipientName: "Synthetic Recipient " + (i + 1),
    address: 100 + i + " Synthetic Test Lane, Example City, VA 00000",
    phone: i ? "" : "202-555-0101",
    mealCount: n,
    dietaryRestrictions: i ? "" : "Synthetic allergy note",
    doorPreference: "Side",
    deliveryInstructions: "Synthetic instruction",
  })),
  ...overrides,
});
export function createEvent(h, capacity = 20) {
  const r = h.admin("saveEvent", {
    eventName: "Test Thanksgiving Event",
    deliveryDate: "2026-11-26",
    capacity,
    startAddress: "1 Synthetic Pickup Road, Example City, VA 00000",
    status: "Open",
  });
  if (!r.ok) throw new Error(r.error.message);
  return r.data;
}
export function approve(h, ids) {
  return h.admin("statuses", {
    status: "Approved",
    referrals: h
      .get("REFERRALS")
      .filter((r) => ids.includes(r.ReferralID))
      .map((r) => ({ referralId: r.ReferralID, version: r.Version })),
  });
}
export function editPayload(h, id) {
  const r = h.get("REFERRALS").find((x) => x.ReferralID === id);
  return {
    referralId: id,
    version: r.Version,
    organizationName: r.OrganizationName,
    organizationEmail: r.OrganizationEmail,
    organizationPhone: r.OrganizationPhone,
    recipients: h
      .get("RECIPIENTS")
      .filter((x) => x.ReferralID === id)
      .map((x) => ({
        recipientId: x.RecipientID,
        version: x.Version,
        recipientName: x.RecipientName,
        address: x.Address,
        phone: x.Phone,
        mealCount: x.MealCount,
        dietaryRestrictions: x.DietaryRestrictions,
        doorPreference: x.DoorPreference,
        deliveryInstructions: x.DeliveryInstructions,
        notes: x.Notes,
      })),
  };
}
