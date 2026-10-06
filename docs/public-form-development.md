# Simple public form — development testing

The public form now uses the separate anonymous development API supplied on October 6, 2026. It collects typed addresses without Google autocomplete or validation. The backend reserves meals as Pending and marks addresses Needs Review when there is no signed address verification receipt. Admin address checking and routing are unchanged. The shared address-entry script remains loaded for button feedback, but the public form does not attach address lookup widgets or call address services.

User screenshots confirm the development API returned public event information in a Safari private window and denied anonymous admin-page access. These checks do not establish that submission, concurrency, all protected calls, or public-browser CORS work live.

No Sheets data was changed during this frontend update. No Apps Script replacement is needed. GitHub Pages remains on main; development commits do not publish the new form. Do not set MEALS_PUBLIC_FORM_URL to the API URL.

For local testing, use the provided public-form ZIP. Extract it and serve its folder locally with `python3 -m http.server 8080 --bind 127.0.0.1`, then visit `http://localhost:8080`. Use synthetic DEV TEST organization/recipient details only. Verify event selection, remaining meals, adding/removing recipient cards without losing values, submitting without an address popup, success, Pending status and Address Needs Review in admin, and capacity reduction. Test mobile layout and uncertain-response retries. This local URL is not a shareable website URL.

Before the public form is published, complete available integration tests and obtain separate approval for the specific hosting/main change. Publishing the form and updating the admin share-link property are later steps.
