# Address entry update — development only

Branch: `development/community-meals-v1-20261001`.

## Installation now (no billable services needed)

1. Copy **all** of `apps-script/CommunityMeals-OneFile.gs` into the existing project's Code.gs, replacing the previous one-file bundle. Save. Do not keep duplicate modular .gs files in a one-file installation. This includes the complete admin HTML/CSS/JavaScript; no additional HTML files are required.
2. Keep the existing spreadsheet ID, shared-sheet development ID, environment, ADMINUSERS accounts, Sheets v4 service, and manifest scopes unchanged. No schema setup, migration, trigger installation or new sheet is needed.
3. Add Script Properties `MEALS_ADDRESS_AUTOCOMPLETE_ENABLED=false` and `MEALS_ADDRESS_VALIDATION_ENABLED=false`. Keep `MEALS_MAPS_LIVE_ENABLED=false`. Missing address feature flags also default to false.
4. No setup function needs to run. `MEALS_ADDRESS_RECEIPT_SECRET` is generated securely in Script Properties on the first successful live validation. Do not place it in GitHub or manually reset it during testing.
5. Saving source does **not** update an existing versioned `/exec` deployment. After installation, update only the authenticated development admin deployment to a new version, retaining **User accessing the web app** and Google-account access. Do not edit its access mode or overwrite other deployments.
6. Recheck both real administrator identities. This update does not change `Auth.gs`, ADMINUSERS authorization, or authentication behavior.
7. The public frontend files are prepared on the development branch only. `config.js` is intentionally still unconfigured; the public API URL must be set to the authorized development public endpoint when one exists. Do not publish these files over production GitHub Pages. New frontend assets include `address-entry.js`, `privacy.html`, and `terms.html`; changes to `app.js`, `index.html`, and `styles.css` load and use them.

## Google configuration — requires separate billing/API approval

Use one Google Cloud project for both APIs and both keys so a session can end with Address Validation.

| API | Service | Credential |
| --- | --- | --- |
| Places API (New) | places.googleapis.com | MEALS_PLACES_API_KEY |
| Address Validation API | addressvalidation.googleapis.com | MEALS_ADDRESS_API_KEY |

No Maps JavaScript API, browser key, Geocoding API, or Route Optimization API is needed for this update. Autocomplete uses the current REST `places:autocomplete` endpoint, not the legacy endpoint or legacy JavaScript widget.

Create separate server keys in Google Cloud → APIs & Services → Credentials → Create credentials → API key. Edit each key:

- API restrictions: **Restrict key**. Choose only Places API (New) for the Places key; only Address Validation API for the validation key.
- Application restriction: Apps Script has no dedicated egress IP. Do **not** use website/referrer restrictions for these server calls or claim that an all-Google shared IP pool isolates this application. In this architecture the keys have API restrictions but no effective app-specific IP restriction. Keep them in Script Properties, available only to project editors. Stronger source restrictions require a proxy with dedicated egress or a separate securely designed identity-based integration; neither is silently introduced here.
- Do not paste either key into frontend JavaScript, source code, chat, or a repository file.
- The public browser never receives either key. Only address search text, an address-search session token, and region/language settings go to Google. Recipient names, phones, diet, instructions, notes, organization contacts, and event IDs do not go to Google.

Billing must be linked to the Google Cloud project before live requests. No services or billing have been enabled by this code change. Session-based autocomplete terminates with Address Validation; abandoned sessions may be charged as individual autocomplete requests. Do not assume free usage means billing can be omitted.

Recommended initial Cloud limits (adjust only after usage is reviewed): Places autocomplete 60 requests/minute; Address Validation 20 requests/minute. Configure any additional per-day editable quota exposed by the Cloud quota console. Editable request quotas are service limits, not dollar-spend caps. Set project billing budget alerts at $1, $5, and $10, with alerts to the billing owner. **Budget alerts do not stop spending.**

Application caps are reserved under the shared script lock before each external call:

| Service | Per minute | Per UTC day | Per UTC month |
| --- | ---: | ---: | ---: |
| Autocomplete | 60 | 1,500 | 10,000 |
| Validation | 20 | 300 | 3,000 |

Failed external calls count conservatively. The caps apply across admin/public deployments of this project; they prevent further calls after the cap, but are not a universal Cloud hard spending cap or a guarantee against a leaked key being used outside the app. A public caller could exhaust these shared limits; rate-limit/abuse testing remains a release dependency. No CAPTCHA has been added.

After key restrictions, Cloud limits, billing approval, and current Google terms have been reviewed, enter the two keys in Script Properties and set only the two address switches to true. Keep `MEALS_MAPS_LIVE_ENABLED=false`.

## Behavior and data

- Four-character minimum and 450 ms typing debounce. Fresh UUID session per address search; selection validation ends the session. Separate sessions per address card.
- Suggestions have official, unmodified Google Maps logo attribution. Lists are transient and never written to Sheets/browser storage. Keyboard, touch, and mouse selection are supported.
- A selected suggestion is validated before it replaces the visible value. Material changes require **Check this address → Use Recommended / Keep What I Entered / Edit**. Equivalent casing, punctuation, common street abbreviations, or USA suffix differences do not need a popup when the provider verdict is confident. Conservative normalization may ask for confirmation on other differences.
- A confidently validated unchanged address shows **Address Verified**. Kept differing originals, uncertain results, service failure, and quota exhaustion use **Needs Review**, allowing the meal reservation.
- Apartment/suite/unit/floor/building/room segments are retained. Conflicting provider units retain the original address and are flagged. Missing units are restored visibly and flagged; the administrator can edit and check again. Unit distinctions remain in duplicate normalization.
- Current `AddressStatus` / `StartAddressStatus` store `Confirmed` for Google-verified addresses, preserving compatibility with routes; UI says Address Verified. Existing `Manually Reviewed` records retain their meaning. `VerifiedAt` records successful recipient checks.
- A short-lived HMAC receipt binds the exact address and outcome to the server. Client-supplied status is never trusted. Changed/forged/expired receipts fall back to Needs Review. Tokens remain in memory, contain a digest rather than an address, and do not affect submission fingerprints; identical retries return their original receipt even after token expiry.
- Only final addresses explicitly confirmed by the requester/admin are persisted. No suggestion list, raw Google verdict/components, or provider coordinates are stored. Terms and privacy pages describe this; publish them alongside the frontend before public address services are enabled. Review the program-specific wording before release.
- Google calls do not occur inside meal-capacity transactions. A short lock reserves usage or initializes the signing secret. Submission still uses one atomic Sheets batch operation. Existing versions protect stale edits; route changes remain marked for review.
- No spreadsheet schema/header changes, legacy migration, or authentication change is required.

## Verification status

Automated tests use synthetic Google responses and a synthetic Apps Script/Sheets adapter. They are **not live Google/backend passes**. The one-file bundle is regenerated from modular source and checked byte-for-byte before committing; backend tests are also run against that complete bundle.

Local results: **PASS** — 38 backend tests against modular source; **PASS** — the same 38 tests against the complete one-file bundle; **PASS** — 10 existing browser checks and 7 new address browser checks. Google results in these tests were synthetic. **NOT YET TESTED / REQUIRES BILLING/API ENABLEMENT** — actual Google calls. **REQUIRES MANUAL DEVICE TEST** — iPhone/iPad Safari.

Pending: both actual Google administrator identities after the new version; live Google suggestions/validation with properly restricted keys; actual billing/session accounting and Cloud quota settings; Apps Script cold-start/typing latency; mobile Safari/device selection and popup focus; public anonymous endpoint integration and abuse tests; privacy/terms publication. Route optimization stays disabled.

Official unmodified Google Maps attribution image source: https://developers.google.com/static/maps/documentation/images/Google_Maps_Attribution_Assets.zip (Gray 1x logo, embedded so no additional browser tracking request is needed).
