# Public submission confirmation recovery — October 6, 2026

Observed live: user requests appeared in admin, while Safari showed a connection error after about a minute. Apps Script execution screenshot showed doPost completed in 1.181, 2.583 and 3.351 seconds. This narrows the delay to outside the recorded execution, but does not identify the exact failing network/redirect layer.

The public frontend now bounds POST fetch/response reading to 12 seconds. An uncertain transport or backend UNAVAILABLE response triggers up to two read-only receipt checks (8 seconds each, one second between checks). A successful recovery displays the original receipt. Missing/failed checks leave the result explicitly uncertain, preserving the original submission ID. Recovery never repeats the POST and never infers success from capacity changes.

Requests use no-store and omit browser credentials; a non-sensitive request timestamp avoids reuse of cached response redirects. This is a transport precaution, not a proven explanation of the original failure.

## Backend security

GET action=submissionReceipt requires possession of the complete random UUID v4 submission ID. No listing/search endpoint exists. Unknown IDs and admin-created submissions return receipt:null. Responses whitelist only referralId, eventName, meals, recipients (count), and original status. No names, addresses, phone numbers, emails, dietary fields, or notes are returned. IDs are capability tokens: do not copy receipt-check URLs into public logs or analytics. The frontend puts recipient information only in the POST body, not in URLs or browser storage.

The existing shared capacity lock, atomic batch write and idempotency checks are unchanged. No Sheets schema setup, migration, legacy tab edit, account change, billing change or routing change is needed.

## Installation

1. Replace the entire existing Code.gs with apps-script/CommunityMeals-OneFile.gs from this commit. Search for COMMUNITY-MEALS-20261006-SUBMISSION-CONFIRMATION at the top, then Save.
2. Deploy > Manage deployments. Select the existing DEV TEST - Community Meals Public API deployment (ID starts AKfycbxC7zNG6z6QB870).
3. Pencil > Version > New version. Preserve Execute as Me and Who has access Anyone for this existing public API only. Deploy. Its URL stays unchanged.
4. The authenticated admin deployment needs no change for this fix. Do not apply public deployment permissions to admin.
5. Refresh the GitHub Pages public form after the Pages build completes. The new app asset version is 20261006-confirmation-v1.

Use only synthetic data. Verify a new public submission shows confirmation and one Pending referral, with availability reduced exactly once. Also test a lost/blocked POST response with the live receipt recovery endpoint; local simulations alone do not establish live browser reliability. Existing uncertain forms can retry with unchanged details and the same submission ID; do not start a new request for a submission already known to be saved.

## Validation

67 local tests pass in modular mode and 67 in generated single-file mode; syntax, manifest, source-package parity and credential checks pass. These include lost-response recovery without another POST, definitive capacity rejection, delayed receipt visibility, continued uncertainty, receipt privacy, unknown/invalid IDs, and exclusion of admin-created submissions. These are local simulations, not live Apps Script/network performance tests.

Live fixed-backend tests are NOT YET TESTED until the owner installs and versions the updated public deployment. Real iPhone/Safari device checks remain required. This patch does not promise a particular Google network response time or claim the whole V1 acceptance suite is finished.
