// Editor-only helpers: names ending in _ cannot be called with google.script.run.
function schemaPlan_() {
  const db = database_();
  const plans = [];
  Object.keys(MEAL_SCHEMA).forEach((name) => {
    const sheet = db.getSheetByName(name);
    if (!sheet)
      plans.push({ name, action: "create", headers: MEAL_SCHEMA[name] });
    else {
      const header = sheet
        .getRange(1, 1, 1, MEAL_SCHEMA[name].length)
        .getValues()[0];
      if (JSON.stringify(header) !== JSON.stringify(MEAL_SCHEMA[name]))
        fail_(
          "SCHEMA",
          "Existing " +
            name +
            " headers differ. No automatic overwrite is allowed.",
        );
      plans.push({ name, action: "preserve" });
    }
  });
  return plans;
}
function setupDevelopmentSchema_() {
  const p = properties_();
  if (
    p.getProperty("MEALS_ENV") !== "development" ||
    p.getProperty("MEALS_ALLOW_SCHEMA_SETUP") !== "true"
  )
    fail_("CONFIG", "Development schema setup is not explicitly enabled.");
  const email = identity_();
  const bootstrap = String(p.getProperty("MEALS_BOOTSTRAP_ADMIN_EMAILS") || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (
    !bootstrap.includes(email) ||
    bootstrap.length !== 2 ||
    new Set(bootstrap).size !== 2
  )
    fail_(
      "AUTH",
      "Configure exactly two administrator accounts securely in Script Properties.",
    );
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) fail_("BUSY", "Try setup again.");
  try {
    const db = database_(),
      plan = schemaPlan_();
    let next =
      Math.max.apply(
        null,
        db
          .getSheets()
          .map((s) => s.getSheetId())
          .concat([0]),
      ) + 1;
    const requests = [];
    plan
      .filter((x) => x.action === "create")
      .forEach((x) => {
        const sid = next++;
        requests.push({
          addSheet: { properties: { sheetId: sid, title: x.name } },
        });
        const rows = [{ values: x.headers.map(cell_) }];
        if (x.name === "ADMINUSERS")
          bootstrap.forEach((email) =>
            rows.push({ values: [cell_(email), cell_(true), cell_("admin")] }),
          );
        requests.push({
          updateCells: {
            start: { sheetId: sid, rowIndex: 0, columnIndex: 0 },
            rows,
            fields: "userEnteredValue",
          },
        });
      });
    if (requests.length)
      Sheets.Spreadsheets.batchUpdate({ requests }, db.getId());
    return plan;
  } finally {
    lock.releaseLock();
  }
}
function legacyMigrationPlan_() {
  const db = database_(),
    sheet = db.getSheetByName("Requests");
  if (!sheet)
    return {
      records: 0,
      action: "No legacy Requests tab in this development spreadsheet.",
    };
  const rows = sheet
    .getRange(1, 1, Math.max(sheet.getLastRow(), 1), sheet.getLastColumn())
    .getValues();
  const comments = rows[0].indexOf("Comments");
  return {
    records: rows.slice(1).filter((r) => r.some((v) => v !== "")).length,
    recordsWithComments:
      comments < 0
        ? 0
        : rows.slice(1).filter((r) => String(r[comments] || "").trim()).length,
    headers: rows[0],
    proposedMapping: {
      Name: "RecipientName",
      "Address Raw": "Address",
      Phone: "Phone",
      "Dietary Restrictions": "DietaryRestrictions",
      "Door Of Entry": "DoorPreference",
      Comments:
        "UNRESOLVED: preserve original field; obtain explicit mapping approval",
    },
    missingFields: [
      "Event assignment",
      "Organization details",
      "Meal quantities",
      "Permanent IDs",
    ],
    canMigrate: false,
    message:
      "Legacy tabs remain untouched. Do not import until event, organization, quantities and Comments mapping are explicitly approved.",
  };
}
