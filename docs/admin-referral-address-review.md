# Review recipient addresses from request cards

Every editable referral card has Review Addresses with Google. It opens the existing referral editor and checks every recipient using the existing Address Validation preview/choice flow. Material changes and uncertain addresses require the existing recommended/original/Edit choice. Unit information is preserved by that flow. No address is silently replaced.

The editor shows progress, retains loading feedback, and enables Save Reviewed Addresses when checks finish or the administrator chooses Edit. Nothing is persisted until that Save action succeeds. It uses the existing authenticated editReferral endpoint, signed address receipts, stale-version checks, atomic locked write and audit history. No new public/admin endpoint, credential, quota, API or billing setting is introduced. Google receives address information only.

Confirmed recipients show Address Verified on request cards. Manually reviewed recipients show Address Manually Reviewed, distinguishing the two methods. Uncertain recipients stay Address Needs Review. Completed/archived events retain their read-only behavior and do not show the review button.

Install the complete generated Code.gs bundle. Its top marker is COMMUNITY-MEALS-20261006-ADMIN-ADDRESS-REVIEW. Save, then update the EXISTING authenticated ADMIN deployment to New version. Preserve Execute as User accessing the web app and Google-account authenticated access. The public API deployment does not need an update for this admin UI feature.

Local tests exercise checking all recipients without saving, stopping for Edit, closing mid-review, and rendering the review action and status indicators. Live Apps Script UI testing remains NOT YET TESTED until the owner updates the admin deployment. Test synthetic referrals with several recipients, a confirmed address, a changed recommendation, an uncertain address and an apartment/unit. Verify choices persist only after Save and the route recognizes saved review status. Public submission succeeded in the user's Safari retest in six seconds before this admin change; the public frontend is unchanged by this feature.
