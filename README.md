# Community Meal Referral & Delivery System

Implementation-only development branch: `development/community-meals-v1-20261001`.

**Not deployed. Do not merge to main or update the current production Apps Script deployment.**
The production repository baseline is `b004cf872a1e81357af55f78b4aa5141c7e9c10d`.

## Architecture

- Public HTML/CSS/JS remains compatible with existing GitHub Pages hosting.
- `admin.html` is an entry link, never an authentication boundary.
- Admin HTML is served by Apps Script HTML Service.
- One Apps Script project has two deployments: anonymous public (execute as owner), authenticated administrator (execute as accessing user).
- Every protected action checks Google active/effective identity and the private ADMINUSERS allowlist.
- The Google Sheet is private; administrators who execute as themselves require access to it.
- All reservation changes use the same script lock and a single atomic Sheets API batchUpdate.
- Public POST uses `text/plain;charset=utf-8` for a simple cross-origin request. Actual redirect/CORS behavior still requires staging tests.
- Maps adapters remain disabled until separately approved; no live API calls were made during implementation.

## Run local tests / synthetic preview

Use Node 20 or newer:

```sh
npm test
npm run check
npm run preview
```

Preview public form: `http://127.0.0.1:4173/`
Preview admin: `http://127.0.0.1:4173/preview-admin`

The preview binds only to localhost. It uses synthetic identities and an in-memory adapter executing the actual Apps Script source. It is NOT a production authentication server and must never be deployed as one. All Google services and external API responses in these tests are mocked.

Browser tests need Playwright and Chromium installed in the test environment:

```sh
npm run test:ui
```

The runner can resolve Playwright from the provided Codex runtime or a local installation. `MEALS_BROWSER_EXECUTABLE` can select an installed Chromium executable. There are no runtime npm dependencies for the production static site. Browser tests create ignored `.artifacts/` screenshots, JSON results and a synthetic multi-page print PDF.

## Staging setup — next external dependency, not done automatically

1. Provide the existing Apps Script editor URL or source export for comparison. No production source was accessible during this implementation.
2. Provide both actual Google administrator emails. Do not put them in public files or config.js.
3. Create a separate blank Google spreadsheet named `Community Meals — Development`. Do not copy real recipient records into it.
4. Create a separate **development** Apps Script project. Copy only files listed under `apps-script/` into it, with matching Apps Script file types. `.gs` files are script files; `.html` files are HTML files, including AdminClient/AdminStyles. Copy the provided manifest using the editor's manifest setting.
5. Enable the advanced Google Sheets service in that development project. This is not Maps billing activation.
6. In Project Settings → Script Properties, set:

| Property                     | Value                                       |
| ---------------------------- | ------------------------------------------- |
| MEALS_ENV                    | development                                 |
| MEALS_SPREADSHEET_ID         | ID of the new blank DEVELOPMENT spreadsheet |
| MEALS_ALLOW_SCHEMA_SETUP     | true temporarily                            |
| MEALS_BOOTSTRAP_ADMIN_EMAILS | first actual email,second actual email      |
| MEALS_MAPS_LIVE_ENABLED      | false                                       |

7. Share only the development spreadsheet with the two administrator accounts, as needed for execute-as-user writes. Do not enable public link sharing. Configure allowlisting in the private ADMINUSERS tab. Do not directly edit event/referral/recipient tables during normal operation; manual edits bypass application locks and validation.
8. Run `setupDevelopmentSchema_` manually in the editor as an approved account. Run it again to prove repeatability. It only adds missing tabs; it refuses mismatched headers and does not delete or overwrite Requests/Settings. Set MEALS_ALLOW_SCHEMA_SETUP back to false afterward.
9. Create a NEW development admin web-app deployment, executing as the user accessing the web app. Require Google-account access (or the applicable Workspace domain); do not deploy the admin as anonymous/execute-as-owner. Open its `/exec?page=admin` URL with each actual account separately and consent to the required scopes.
10. Verify the identity displayed on screen matches EACH actual signed-in account. Run the identity RPC/`testAdminIdentity` through the deployment as each user; running the helper only in the editor proves the editor identity, not the second web-app identity.
11. Test a third, non-allowlisted Google account and an anonymous request. Both must fail. If either real admin has blank/mismatched active/effective email, STOP. Do not change the checks to allow access.
12. Create a separate development public deployment from the SAME script project, execute as owner, allowing anonymous referrals. Keep the production deployment untouched.
13. For a LOCAL staging test, point the uncommitted public endpoint configuration at that development public URL. Use a distinct localhost origin/storage session. Do not point config.js at production and do not push configured staging endpoints to main.
14. Complete the live tests in `docs/acceptance-tests.md` against the development spreadsheet only.

The provided manifest includes Maps' cloud-platform OAuth scope. Consent and organization policies may need review even while Maps calls are disabled. No OAuth tokens are transmitted to the client.

## Authentication failure policy

Current design is deliberately fail-closed. Missing emails or active/effective identity disagreement blocks admin operations. Authentication is NOT complete until both real accounts pass live staging tests.

If execute-as-user cannot identify both accounts reliably, the proposed alternative is Google Identity Services plus a backend verifier using Google's supported authentication library: verify signature, issuer, audience, expiry, verified email and nonce, then apply the server-side allowlist and secure session/CSRF protection. A small separately approved server/gateway would handle verification. Do not decode tokens without verification or use frontend-supplied email, anonymous access, frontend passwords or sessionStorage as authentication. That alternative has not been implemented or substituted automatically.

## Maps configuration — separate approval still required

No billing has been activated. Do not set MEALS_MAPS_LIVE_ENABLED=true yet.

After separate approval, use a dedicated Cloud project linked to the development Apps Script project:

1. Link an approved billing account to that Cloud project.
2. Enable Address Validation API (`addressvalidation.googleapis.com`).
3. Enable Route Optimization API (`routeoptimization.googleapis.com`).
4. Restrict the Address Validation key to that API and store it only in `MEALS_ADDRESS_API_KEY` in Script Properties. Never use a browser-referrer-restricted key for server calls or put the server key in config.js.
5. Set `MEALS_CLOUD_PROJECT_ID` to the linked project's ID. Grant both administrators the least-privilege permission needed for `routeoptimization.locations.use`; a suitable custom role can avoid broad project Editor/Owner access. Review service-consumer permissions if required by the project.
6. Configure provider quota controls: initially recommend Address Validation at 60 requests/minute and Optimize Tours at 2 requests/minute; set daily limits if your console exposes them. Do not assume every API offers a daily or dollar-denominated hard cap.
7. Create a $5 monthly budget with 50%, 90%, 100% actual-spend alerts and forecast alerts. These notify; they do not stop spending.
8. Application-enforced hard request limits are implemented: Address Validation 300 calls/day and 3,000/month; optimization 500 shipment units/day and 3,000/month. Counters are reserved before each external call under a short lock, without holding the capacity lock during the call. Failed calls count conservatively. These counters constrain this application, not other projects sharing the billing account, and are not a billing-account dollar cap.
9. Before enabling live calls, approve the program's public privacy/terms wording and provider attribution. Display attribution is included in the admin interface; public policy text requires the program owner's approval.
10. Only then set MEALS_MAPS_LIVE_ENABLED=true in DEVELOPMENT and run live tests.

Optimization begins at pickup and has no required end location/return leg. Every approved recipient remains a separate shipment/stop. An unresolved address blocks optimization, not referral submission. The service must return every approved stop exactly once; incomplete/duplicate/skipped results leave the prior order unchanged.

Coordinates returned by Address Validation are transient and are not saved in Sheets, browser storage or audit history. Original submitted addresses and internally generated normalized strings remain in the program records. Optimization revalidates pickup and all approved addresses on each run; this increases validation usage, so a 100-stop optimization uses 101 validation calls plus 100 shipment units. The code uses driving routes, not straight-line heuristics. Large events may approach Apps Script execution-time limits; test expected real volumes before release.

Synthetic invented street addresses are used ONLY in local mocked tests. Google's Address Validation terms prohibit live requests with artificially-created US/PR addresses. For live Maps tests, use approved public civic/building locations with synthetic recipient identities; do not use actual recipient personal records or submit the local invented addresses to Google.

Official references:

- https://developers.google.com/apps-script/guides/web
- https://developers.google.com/apps-script/reference/lock/lock-service
- https://developers.google.com/workspace/sheets/api/guides/batch
- https://developers.google.com/maps/documentation/address-validation/usage-and-billing
- https://developers.google.com/maps/documentation/route-optimization/usage-and-billing
- https://developers.google.com/maps/documentation/route-optimization/reference/rest/v1/projects/optimizeTours
- https://developers.google.com/maps/documentation/address-validation/policies
- https://cloud.google.com/maps-platform/terms/maps-service-terms

## Data, reporting, migration and release

Six new tabs: EVENTS, REFERRALS, RECIPIENTS, AUDITLOG, ADMINUSERS, SUBMISSIONS. The source of truth for capacity is current recipient MealCount belonging to Pending/Approved referrals. OriginalRequestedMeals is a separate immutable submission snapshot for historical reporting.

Records are updated by durable IDs, with optimistic versions, inside the shared lock. The write batch contains referral/recipient/idempotency/audit changes together. No application deletion is supported. Submitted text is written using Sheets stringValue, never formulaValue; HTML is rendered via textContent/value. Public APIs expose only event summaries and minimal receipts. Audit may contain protected original/edited fields, so keep its spreadsheet private.

Completed/archived events are normally read-only. Explicit confirmed Reopen / Unarchive is audited. Completed reopens to Closed rather than silently accepting public referrals. Unarchiving another status retains that status; the confirmation is explicit. Reports include archived events. Organization grouping uses an exact conservative normalized key, with no fuzzy organization merging.

Delivery Instructions, Dietary Restrictions and Internal Notes remain separate. Internal Notes are admin-only and excluded from the delivery DTO and print DOM. Printed sheets never include organization names or contacts.

`legacyMigrationPlan_` is a read-only dry-run on a DEVELOPMENT sheet containing test legacy rows. It reports existing headers, affected row counts and unresolved mappings without changing data. Legacy records lack events, organizations and meal quantities. Legacy Comments mapping is intentionally unresolved. The actual legacy import is blocked until real source inspection, event/organization/quantity assignment and explicit Comments mapping approval; do not infer meanings or overwrite historical comments.

`config.js` deliberately contains blank endpoints. The existing production backend is never contacted by tests. Production writes are gated by MEALS_ENV=production and MEALS_PRODUCTION_ENABLED=true, neither configured here. That backend deployment and eventual production schema setup require separate release approval after all required staging tests.

GitHub Pages currently builds from main. Do not merge/push this implementation to main until separately authorized. No deployment configuration was changed.
