# Shared-spreadsheet development testing — October 2, 2026

This supersedes the earlier separate-spreadsheet/project instructions. No separate spreadsheet or Apps Script project was created.

## Completed live spreadsheet changes

Spreadsheet: https://docs.google.com/spreadsheets/d/1qqXeHVIi5WMqtXMSIYtB9iuV0gPfy_QdGUgLlv8BD2w/edit

Added only these tabs and their matching schema headers, in one Sheets batch:

| Tab | sheetId | Data rows |
| --- | --- | --- |
| EVENTS | 578725090 | None |
| REFERRALS | 578725091 | None |
| RECIPIENTS | 578725092 | None |
| AUDITLOG | 578725093 | None |
| ADMINUSERS | 578725094 | None; actual emails pending |
| SUBMISSIONS | 578725095 | None |

Headers were re-read and match Store.gs. Each new tab has one frozen header row and a 1000 x 26 grid. Native visual fit has not been inspected; schema contents/properties were verified by API.

Requests (sheetId 0) and Settings (sheetId 578725089) were read before and after the batch, across their existing bounded A1:Z1000 grids. User-entered values/formulas, formats, validations, notes, text/chip runs and tab properties matched exactly. No batch request targeted either legacy tab. No records were migrated or overwritten. No recipient data was written into the new tabs.

## Branch changes and fixes

- Store.gs requires MEALS_SHARED_SHEET_DEV_ID equal to the existing spreadsheet ID for shared-sheet development; ordinary accidental targeting still fails closed.
- Schema.gs supports header-only pre-created ADMINUSERS: append the two private bootstrap accounts only when the tab is empty beneath its header. Preserve existing account records.
- Local tests now include both legacy tabs and shared-sheet submissions, setup repeatability, bootstrap failure/recovery and legacy preservation.
- README/schema/acceptance documentation uses the existing spreadsheet and prefers the existing script project after a compatibility inspection.

## Results

PASS — live connector schema creation and header readback.
PASS — live connector before/after legacy cell and tab-property comparison.
PASS — 27 local backend tests using mocked Google services, including the added bootstrap recovery test.
PASS — source syntax/configuration checks and whitespace check.

The earlier 9 Chromium UI checks passed on the original implementation; no frontend files changed in this update and the UI suite was not rerun. These are not live Apps Script test results.

NOT YET TESTED — actual administrator authentication, unauthorized deployed RPC, true concurrent admin/public capacity changes, live idempotency, stale edits, duplicate warnings, archive/reopen, reports and manual route ordering through Apps Script.

REQUIRES BILLING/API ENABLEMENT — live Maps validation/optimization, still disabled.

REQUIRES MANUAL DEVICE TEST — physical iPhone/iPad navigation and physical printing.

## Deployment blocker and next user action

The Drive connector returned no accessible Apps Script project metadata in a script-MIME search. It does not provide Apps Script source/version/deployment management tools. No development deployment ID or URL exists from this work, and the production deployment was not touched.

Provide the existing project's editor URL and source export/copies of all .gs/.html files and appsscript.json. Provide trigger/deployment details and Script Property KEY NAMES ONLY; never paste secret values. Both actual administrator Google emails are also needed privately for configuration.

In the existing spreadsheet: Extensions -> Apps Script -> copy the editor URL. In Apps Script: Project Settings -> show appsscript.json; copy source files/manifest; Triggers -> list installed triggers; Deploy -> Manage deployments -> record deployment IDs, version numbers, execute-as and access settings without editing anything. Script Properties: list key names only.

Review source and configuration before uploading the V1 source. Existing doGet/doPost and helper names may collide. Published versions freeze source, but Script Properties and installed triggers are shared across versions; changing them can affect production. Do not overwrite source/manifest, change legacy keys/triggers, or edit the current production deployment. If safe isolation cannot be demonstrated in the existing project, stop and explain before proposing another project.

After compatibility review, create new development versions/deployments only. Use the six V1 tabs and clearly labeled synthetic events (DEV TEST - Thanksgiving, DEV TEST - Christmas), synthetic recipients and example.test organizations. Test both real identities first and stop if either cannot be independently authorized. Record and compare legacy snapshots around the live suite.

No merge, production frontend deployment, production backend replacement, Maps billing activation or legacy migration is authorized by this change. Legacy preservation/migration mapping still requires a separate proposal and approval.
