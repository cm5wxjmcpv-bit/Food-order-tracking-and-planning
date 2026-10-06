# Copy Public Link

The administrator main page has a **Copy Public Link** button with loading feedback. It retrieves the configured public referral website URL through an authenticated backend action, attempts to copy it, and opens a dialog with the URL, Copy Link, and Open Public Form. Browsers that restrict clipboard access show a selected URL for manual copying.

In the existing Apps Script project, open **Project Settings → Script Properties → Edit script properties**. Add:

| Property | Value |
| --- | --- |
| `MEALS_PUBLIC_FORM_URL` | The full `https://` URL of the hosted public referral form |

Keep all existing properties. Do not use the authenticated admin deployment link or the public JSON API endpoint. The backend does not infer a public website from a deployment URL. Missing configuration produces a clear message rather than an incorrect share link.

The repository's public frontend configuration is currently blank; this change does not deploy it or invent a public website URL. The configured public form must be tested while signed out before sharing externally.

Replace the entire Code.gs with the updated single-file bundle, save, then update the existing development admin deployment to a new version. Preserve **User accessing the web app** and Google-account access. No manifest change, setup function, migration, or spreadsheet write is needed.

Local backend tests cover missing/unsafe configuration, the configured link, and unauthorized access. Clipboard behavior on the actual Apps Script deployment and iPhone requires live manual testing.
