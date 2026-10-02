# Implementation-only report

Development branch: `development/community-meals-v1-20261001`.
Production baseline: `b004cf872a1e81357af55f78b4aa5141c7e9c10d`.

No production deployment, merge to main, Google Cloud billing activation or production Apps Script update was performed. On October 2, the six V1 header-only tabs were added to the existing spreadsheet under explicit authorization; Requests/Settings remained unchanged. See shared-spreadsheet-testing.md for the current integration status.

## Components implemented

| Component         | Implementation status                                                                                                                 | Verification limit                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Public referrals  | Event selection, meals remaining, organization details, dynamic recipient cards, warnings and receipts                                | Real Chromium browser exercised against synthetic backend; live Apps Script POST/redirect not tested                  |
| Admin dashboard   | Requests, bulk/individual review, editing, manual referral entry, events, archives/reopening, reports                                 | Synthetic administrator backend only; both real account identities pending                                            |
| Authentication    | Server-side active/effective Google identity, active allowlist, per-action checks, fail-closed dispatch                               | NOT YET TESTED with either actual administrator or a deployed anonymous/third account                                 |
| Capacity          | Pending + Approved meal reservations; rejection releases; restore/edit/capacity-change validation                                     | Shared-lock code locally exercised; true Apps Script parallel executions pending                                      |
| Atomic writes     | One batch for referral, all recipients and receipt; one batch for related edits/audit                                                 | Injected mocked batch failures preserve state; actual Google Sheets failure behavior pending                          |
| Idempotency       | UUID + canonical payload fingerprint + stored original receipt; different data rejected                                               | Backend retries and real local browser lost-response/full-event refresh/double-submit exercised; live staging pending |
| Duplicates        | Same-event warnings within/across referrals, normalized address/name/phone, unit distinctions preserved                               | Local synthetic cases; no automatic blocking, merging or deletion                                                     |
| Routing           | Approved-only stops, transient coordinate validation, one vehicle/no required return leg, provider result checks, route version check | Actual Maps adapter requests not sent; mocked responses exercised                                                     |
| Manual order      | Desktop native drag-and-drop, touch Move Up/Down, save, renumber, running totals                                                      | Real local Chromium desktop/390px touch viewport tested                                                               |
| Address review    | Unresolved referrals still reserve meals; unresolved Approved stops remain visible; final optimization blocked                        | Mocked provider verdicts exercised; live API pending                                                                  |
| Mobile/responsive | Cards rather than wide tables, 46px controls, width-safe submitted text                                                               | 390px phone and 768px tablet browser viewport checked; actual iPhone/iPad Safari pending                              |
| Printing          | Per-stop checkboxes, dietary/phone/instructions and running totals; no organization contacts or internal notes                        | 30 synthetic stops on eight Letter pages; first/last pages visually inspected and print DOM checked                   |
| Reporting         | Original requested, current reserved/approved/rejected, recipient records, organizations, event/year filters, archived inclusion      | Mocked stored records + real local browser reporting tested                                                           |
| Schema/migration  | Six-tab schema, repeatable add-only development setup, schema mismatch protection, read-only legacy migration plan                    | Real six-tab creation/header readback and unchanged legacy snapshots; import blocked pending mapping/source inspection                            |
| Audit/security    | Protected old/new changes, typed string cells, safe text rendering, size limits, safe error boundaries                                | Local source/mocked/browser checks; staging literal Sheet cells and account protections pending                       |

## Changed / created files

Modified existing files:

- index.html, app.js, styles.css
- admin.html, admin.js
- README.md

New frontend configuration:

- config.js (blank public endpoints; no secrets)

New backend:

- apps-script/Code.gs, Auth.gs, Store.gs, Validation.gs
- apps-script/Events.gs, Referrals.gs, Duplicates.gs
- apps-script/Addresses.gs, Routing.gs, Reports.gs, Audit.gs, Schema.gs
- apps-script/Admin.html, AdminClient.html, AdminStyles.html
- apps-script/appsscript.json

New verification/documentation:

- tests/backend.test.mjs, browser.test.mjs, harness.mjs
- tools/dev-server.mjs, check.mjs
- docs/acceptance-tests.md, schema-and-migration.md, implementation-report.md
- package.json, .gitignore

No deployment workflow/configuration files were added or changed.

## Available test results

- PASS: 27 local backend tests, using actual Apps Script source with mocked Google services.
- PASS: 9 real Chromium browser checks against the synthetic local backend, including native drag-and-drop, touch ordering, tablet width/200% text check, multi-page print, archive/unarchive and uncertain-response retry at zero remaining capacity.
- PASS: JavaScript syntax, manifest parsing, shared CSS consistency and frontend credential-pattern checks.
- FAIL: none outstanding in the available local suite.

These passes do NOT mark the corresponding live-backend acceptance requirements as passed. The full 40-step checklist plus additional tests has individual statuses in `acceptance-tests.md`. It keeps true concurrency, live atomic writes, real identities and deployed API authorization as NOT YET TESTED; Maps optimization requires billing/API enablement; physical iPhone navigation requires a manual device test.

## Exact next dependencies

1. Existing Apps Script editor/source access for comparison; no existing backend could be inspected beyond its known public endpoint reference.
2. Both administrator Google account emails for private backend configuration and identity tests.
3. Use the existing spreadsheet and its six new V1 tabs. Inspect the existing Apps Script project for shared properties/triggers/function collisions before creating NEW development deployments. No separate spreadsheet or script project is authorized. Preserve the published production version and all legacy tabs.
4. Real signed-in identity tests for both accounts. Stop if either identity cannot be verified. Secure Google Identity Services/token-verification alternative is documented, not silently substituted.
5. Live capacity/idempotency/atomicity/unauthorized-call tests on that development backend, including actual parallel requests and two-account stale edits.
6. Separate Maps billing/API approval before enabling Address Validation and Route Optimization. Keep MEALS_MAPS_LIVE_ENABLED=false until then.
7. Approved program privacy/terms wording before the Maps integration is released; display attribution is included. Google's terms prohibit live artificially-created US/PR addresses, so live API tests require approved public civic locations with synthetic recipient identities.
8. Actual iPhone/iPad Safari and physical navigation/printing checks.
9. If legacy data exists, approve event/organization/meal-quantity/Comments mapping before building/applying the import.

## Costs and operational concerns

README documents the exact APIs, credential placement, IAM permission, OAuth scopes, provider quotas, suggested $5 budget alerts and application-enforced daily/monthly call limits. No billable API call was made. Budgets notify and are not a spending cap; application limits do not govern other projects sharing the billing account.

Coordinates are intentionally not persisted. Optimization revalidates every approved location and pickup, increasing validation usage (101 validation calls plus 100 shipment units for 100 stops). Large routes and long-running Sheet histories may approach Apps Script execution-time/read limits; live expected-volume testing remains a release gate.

Anonymous referral programs can receive fraudulent requests that temporarily reserve capacity. Size limits and admin rejection are present; CAPTCHA/accounts were not added. Assess actual staged abuse behavior before considering extra friction.

Requests/Settings and their legacy comments are unchanged; six new V1 tabs coexist in that spreadsheet. Migration tooling currently provides a safe schema setup and dry-run plan, not an approved real-data import. Authentication and the system overall are not claimed finished. Production deployment approval is not being requested.
