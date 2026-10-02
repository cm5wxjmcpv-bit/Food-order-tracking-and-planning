# Community Meals — manual Apps Script installation

This package uses the existing project and spreadsheet. It replaces the old source with the modular V1 backend. It does not delete or migrate Requests/Settings, activate Maps/billing, merge main or publish the frontend. The package's 16 code boxes contain the COMPLETE contents of 12 script files, 3 HTML files and the manifest. Their bytes are checked against apps-script/ by tools/check.mjs. Use the pinned commit URL supplied in the chat; do not mix files from other versions.

Project editor:
https://script.google.com/u/0/home/projects/1ZDIqJvXfmu1z2cYhlRfQNPf4ElyoKcVNeaG35NkeblARb6p4KJeOOGDm/edit

Spreadsheet:
https://docs.google.com/spreadsheets/d/1qqXeHVIi5WMqtXMSIYtB9iuV0gPfy_QdGUgLlv8BD2w/edit

The old deployment is reference only. These instructions create TWO NEW test deployments rather than editing it. Do not point the current GitHub Pages site at them yet.

## A. Replace source and create the modular files

1. Open the project editor link above. Click Editor (the code icon on the left) if needed.
2. Select Code.gs in the Files list. Click inside its code, press Command+A on Mac (Ctrl+A on Windows), and delete its contents. Paste the ENTIRE File 1 Code.gs code box below. Keep the file itself named Code.gs.
3. Next to Files, click +, choose Script, and enter each bare name in this list. Apps Script adds .gs. Paste the matching COMPLETE code box into each file, replacing any starter function it creates:

   Validation, Store, Auth, Audit, Events, Referrals, Duplicates, Reports, Addresses, Routing, Schema.

4. Next to Files, click +, choose HTML, and enter these bare names. Apps Script adds .html. Replace ALL starter contents with the matching complete code box:

   Admin, AdminClient, AdminStyles.

5. AdminClient contains JavaScript only and AdminStyles contains CSS only. They intentionally have no script/style wrappers: Admin.html supplies the wrappers. Do not add wrappers or move their contents into Code.gs.
6. Click Project Settings (gear on the left). Under General settings, check “Show appsscript.json manifest file in editor.” Return to Editor, select appsscript.json, and replace all contents with File 16 below.
7. Click Save project (disk icon), or press Command+S / Ctrl+S. Wait for saving to finish. Confirm all 16 files are present with the exact spelling/capitalization. There must be only one doGet and one doPost; both are in replacement Code.gs.

No old source compatibility is required under the revised authorization. Do not paste any secrets into source. No functions or triggers need scheduling for this V1. If the project has existing installed triggers, report them before proceeding: replacing source does not remove old triggers automatically.

## B. Google Sheets service

1. In Editor, find Services in the left panel beneath Files.
2. The supplied manifest declares Sheets v4. If Sheets already appears under Services, do not add a duplicate.
3. If it does not appear, click + beside Services, select Google Sheets API, choose version v4, keep Identifier Sheets, and click Add.
4. For Apps Script's default Cloud project, the corresponding API is enabled automatically. If Google reports that a custom/standard project's Sheets API is disabled, stop and send the error; we will handle that configuration separately. Do not enable Maps or billing.

## C. Private Script Properties

1. Click Project Settings (gear on the left).
2. Scroll to Script Properties. Click Add script property (or Edit script properties if properties already exist).
3. Add/update these exact keys and values. Preserve unrelated property keys; do not clear the list:

| Property | Exact value |
| --- | --- |
| MEALS_ENV | development |
| MEALS_SPREADSHEET_ID | 1qqXeHVIi5WMqtXMSIYtB9iuV0gPfy_QdGUgLlv8BD2w |
| MEALS_SHARED_SHEET_DEV_ID | 1qqXeHVIi5WMqtXMSIYtB9iuV0gPfy_QdGUgLlv8BD2w |
| MEALS_ALLOW_SCHEMA_SETUP | false |
| MEALS_MAPS_LIVE_ENABLED | false |

4. Click Save script properties.

Do not set MEALS_PRODUCTION_ENABLED=true. No Maps keys, Cloud project ID or bootstrap administrator property is needed for this installation. ADMINUSERS controls access directly.

## D. Enter the two administrators in ADMINUSERS

1. Open the spreadsheet link above and click ADMINUSERS at the bottom.
2. Keep row 1 exactly Email / Active / Role.
3. In row 2, put your actual Google account email in A2, boolean TRUE in B2, and lowercase admin in C2.
4. In row 3, put the community paramedic's actual Google account email in A3, boolean TRUE in B3, and lowercase admin in C3.
5. Enter TRUE directly into the cell, without quotation marks or an apostrophe; Google Sheets should treat it as a boolean. Use lowercase email addresses. Avoid duplicate email rows. If records already exist, review them rather than overwriting them blindly.
6. Both Google accounts must have appropriate access to this spreadsheet for execute-as-user administration. Use the spreadsheet Share button to review access. Keep it restricted. This grants access to legacy tabs too; both administrators must be authorized to see that data. Do not publish the spreadsheet or use Anyone-with-link sharing.

No actual email addresses are built into this package. Removing/deactivating an ADMINUSERS row blocks subsequent protected calls. The backend independently checks the signed-in Google identity and active allowlist for every protected action.

## E. One-time setup and permissions

The six V1 tabs already exist with verified headers. NO schema/migration setup function needs running. Do not run setupDevelopmentSchema_ or legacy migration tooling for this installation.

The public and admin apps read those headers automatically. If a schema mismatch is reported, stop and send the error; do not rename/delete/overwrite tabs.

Google will request authorization for the manifest's scopes:

- View/edit Google spreadsheets (spreadsheets): needed to access the configured spreadsheet and write the atomic batch. This OAuth scope is broader than one spreadsheet; application code targets the configured ID and six V1 tabs.
- See your Google account email (userinfo.email): needed for server-side administrator identification.
- Connect to an external service (script.external_request): retained for the disabled Maps adapters. MEALS_MAPS_LIVE_ENABLED=false blocks those calls. No Maps billing is enabled by granting this scope.

No Gmail sending, Drive-wide access, contacts, payments or cloud-platform scope is requested by this manifest. Exact consent wording may vary. Authorize the required scopes for this project under the correct account. If your organization blocks authorization, or Google asks for unexpected permissions, stop and report the screen. Do not weaken authentication.

The editor helper testAdminIdentity is optional, not a setup action; an editor run cannot prove the other administrator's deployed identity. Both real accounts must be tested through the admin deployment.

## F. NEW authenticated admin test deployment

Do this after source/configuration installation is complete; the chat will guide it one step at a time.

1. At the editor's upper right, click Deploy -> New deployment.
2. Beside Select type, click the gear and choose Web app.
3. Description: DEV TEST - Community Meals Admin.
4. Execute as: User accessing the web app.
5. Who has access: Anyone with Google account (or the appropriate domain option only if BOTH administrators are in that domain). Never choose anonymous access or execute-as-owner for the admin.
6. Click Deploy. If prompted, click Authorize access and select the intended Google account; review and grant the listed permissions. If an unverified-app or organization-policy screen appears, send its exact wording before continuing so we can check the correct project/account.
7. Copy the Web app URL ending /exec and record the Deployment ID. Do not use the old deployed URL, and do not use /dev for these integration tests.
8. Append ?page=admin to this NEW URL and open it while signed into the first administrator account. The header must show that actual account email and development.
9. Repeat in a separate browser profile/session as the second account, including its consent flow. Its own email must appear. A blank/mismatched identity or Access unavailable message means STOP; do not change identity_ or allow anonymous administration.
10. A third non-allowlisted account and an anonymous browser session must not retrieve protected data. Keep these tests NOT YET TESTED until actually performed.

## G. NEW public API test deployment

Only after both admin identity checks pass:

1. Click Deploy -> New deployment -> gear -> Web app.
2. Description: DEV TEST - Community Meals Public API.
3. Execute as: Me (the spreadsheet-authorized owner deploying this project).
4. Who has access: Anyone. This applies ONLY to public event summaries/referral submission. The protected admin application and RPCs still fail closed under an anonymous/owner-identity mismatch.
5. Click Deploy and complete owner authorization if asked. Copy its NEW /exec URL and Deployment ID separately from the admin URL.
6. Open PUBLIC_URL?action=events. The response contains only Open-event summaries. With no events it should contain ok:true and an empty data array. It must not contain recipient/contact lists.
7. If organization policy prohibits anonymous public access, stop and report that restriction. Do not change the admin deployment to work around it.

We will configure a LOCAL development frontend with these URLs next; do not update main or publish over GitHub Pages. The Apps Script backend alone does not publish the static public form. Leave committed config.js endpoints blank until the approved development configuration step.

## H. Synthetic tests and Maps-disabled delivery sheets

Create DEV TEST - Thanksgiving with capacity 20 in the admin Event Settings interface. Use synthetic identities, example.test organization emails and reserved example phone numbers. No real recipient data. Use DEV TEST - Christmas for another event if needed. The six V1 tabs are the only development data store; Requests/Settings are ignored and untouched.

Follow docs/acceptance-tests.md for the 40 acceptance steps and extra security/concurrency/recovery tests. Record live results separately from local passes. Current package: 28 local mocked-backend tests and 10 local Chromium checks pass. Both actual identities, true live concurrency, live atomic failure/recovery, deployed API authorization and actual device behavior remain untested.

Maps remains disabled. Review each SAVED recipient address through Requests -> Edit -> Mark Saved Address Reviewed; explicitly confirm only after checking it. Review the SAVED pickup through Event Settings -> Mark Saved Pickup Reviewed. This is a recorded manual attestation, not Google validation or geocoding. Unsaved address edits are not reviewed. Editing an address clears its review.

Approved stops appear in Delivery Route. Use drag-and-drop or Move Up/Move Down, then Save Manual Order. Stop numbers/running totals update. Print enables only once every saved address is reviewed and the official order is saved. Unresolved addresses stay visible, and Optimize remains disabled. Actual Google validation/optimization and its cloud-platform scope will be enabled only in the separately approved Maps phase.

## Official setup references

- https://developers.google.com/apps-script/guides/web
- https://developers.google.com/apps-script/guides/services/advanced
- https://developers.google.com/apps-script/concepts/scopes
- https://developers.google.com/apps-script/concepts/deployments

Installation is a manual action by the user. No script source was uploaded or web-app deployment created during package preparation. The old versioned deployment remains at its old code until explicitly edited; none of these instructions edits it.
