# Acceptance evidence and release gates

**This is not a production sign-off.** Actual Apps Script, Google Sheets, both real Google accounts and paid Maps calls have not been tested. A mocked service test does not prove real backend concurrency, authentication, atomicity or API compatibility.

Status vocabulary: PASS, FAIL, NOT YET TESTED, REQUIRES MANUAL DEVICE TEST, REQUIRES BILLING/API ENABLEMENT.

Local suite: 26 backend tests execute the actual `.gs` sources inside a VM with mocked Google services. Nine browser checks run actual HTML/JS in Chromium against that synthetic adapter. All data is synthetic. The interleaving test is synchronous local orchestration, NOT live simultaneous requests.

For checks requiring a real backend, the acceptance status below stays NOT YET TESTED even when local coverage exists.

| #   | Original acceptance check                       | Current acceptance status       | Local evidence / remaining work                                                                                             |
| --- | ----------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1   | Public event visible                            | NOT YET TESTED                  | Browser verified; repeat against development Apps Script                                                                    |
| 2   | 20 meals remaining initially                    | NOT YET TESTED                  | Backend fixture verified; live fresh 20-meal event needed                                                                   |
| 3   | Multi-recipient referral submission             | NOT YET TESTED                  | Browser + backend verified; live POST/redirect needed                                                                       |
| 4   | Immediate availability reduction                | NOT YET TESTED                  | Browser + backend verified; live Sheet write needed                                                                         |
| 5   | Second referral                                 | NOT YET TESTED                  | Backend workflow covered                                                                                                    |
| 6   | Attempt beyond remaining capacity               | NOT YET TESTED                  | Frontend warning + backend covered                                                                                          |
| 7   | Block overbooking                               | NOT YET TESTED                  | Mocked locked/atomic adapter covered; real backend needed                                                                   |
| 8   | Valid referrals Pending                         | NOT YET TESTED                  | Backend and admin browser covered                                                                                           |
| 9   | Bulk approval                                   | NOT YET TESTED                  | Backend and admin browser covered                                                                                           |
| 10  | Pending → Approved capacity unchanged           | NOT YET TESTED                  | Backend and browser covered                                                                                                 |
| 11  | Edit meal count                                 | NOT YET TESTED                  | Backend and browser covered                                                                                                 |
| 12  | Recalculated capacity                           | NOT YET TESTED                  | Backend and browser covered                                                                                                 |
| 13  | Reject referral                                 | NOT YET TESTED                  | Backend workflow covered                                                                                                    |
| 14  | Rejected meals released                         | NOT YET TESTED                  | Backend workflow covered                                                                                                    |
| 15  | Likely duplicate submission                     | NOT YET TESTED                  | Backend same/across-referral fixtures covered                                                                               |
| 16  | Warning without automatic blocking              | NOT YET TESTED                  | Backend and duplicate-detail UI implemented                                                                                 |
| 17  | Manual admin referral                           | NOT YET TESTED                  | Backend covered; staged admin UI submission needed                                                                          |
| 18  | Build route                                     | NOT YET TESTED                  | Backend and browser covered                                                                                                 |
| 19  | Approved recipients only                        | NOT YET TESTED                  | Backend and browser covered                                                                                                 |
| 20  | Optimize route                                  | REQUIRES BILLING/API ENABLEMENT | Provider request/response adapter mocked; no real API call                                                                  |
| 21  | Manual stop reorder                             | NOT YET TESTED                  | Backend and touch browser controls covered                                                                                  |
| 22  | Renumber route                                  | PASS                            | Local browser and backend order tests                                                                                       |
| 23  | Running meal totals                             | PASS                            | Local browser and backend arithmetic tests                                                                                  |
| 24  | Clickable address                               | PASS                            | Local DOM links verified for desktop                                                                                        |
| 25  | iPhone-sized address link                       | REQUIRES MANUAL DEVICE TEST     | 390px Chromium emulation verified; actual iPhone handoff remains                                                            |
| 26  | Phone and desktop admin                         | NOT YET TESTED                  | Local viewport UI covered; actual Google sign-in/Safari remains                                                             |
| 27  | Print preview                                   | PASS                            | Local Chromium multi-page PDF generated and visually inspected                                                              |
| 28  | Dietary in print                                | PASS                            | Print DOM and PDF text checked                                                                                              |
| 29  | Optional recipient phone in print               | PASS                            | Print DOM and PDF text checked                                                                                              |
| 30  | No organization name in print                   | PASS                            | Print DOM and PDF text checked                                                                                              |
| 31  | No organization email in print                  | PASS                            | Print DOM and PDF text checked                                                                                              |
| 32  | No internal notes in print                      | PASS                            | Print DTO, DOM and PDF checked                                                                                              |
| 33  | Checkbox per stop                               | PASS                            | 30 checkbox nodes and visual PDF inspection                                                                                 |
| 34  | Archive event                                   | NOT YET TESTED                  | Backend and browser covered                                                                                                 |
| 35  | Archive disappears from active selection        | PASS                            | Local browser verified                                                                                                      |
| 36  | Archived reports retained                       | NOT YET TESTED                  | Backend and browser verified; actual persisted history needed                                                               |
| 37  | Double-click cannot duplicate                   | NOT YET TESTED                  | Real local browser double-submit and lost-response retry verified against mocked durable receipts; staged backend needed    |
| 38  | Refresh cannot duplicate                        | NOT YET TESTED                  | Browser receipt restoration and full-event refresh after a lost response verified locally; staged uncertain-response needed |
| 39  | Simultaneous submissions cannot exceed capacity | NOT YET TESTED                  | Shared-lock contention and local interleaving covered; no real parallel executions                                          |
| 40  | Unauthorized protected-data retrieval blocked   | NOT YET TESTED                  | Mocked identities/direct dispatch reject; actual anonymous/third-account tests needed                                       |

## Additional checks

| Check                                         | Acceptance status | Evidence / remaining work                                                                       |
| --------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| Both real administrator Google accounts       | NOT YET TESTED    | Only synthetic active/effective identities tested; stop if either actual identity fails         |
| Unauthorized direct backend calls             | NOT YET TESTED    | Public action allowlist and protected RPC mocked; test real deployments                         |
| Simultaneous admin/public capacity operations | NOT YET TESTED    | Local lock/interleaving verified; launch actual concurrent requests                             |
| Partial write failure/recovery                | NOT YET TESTED    | Injected mock batch failure leaves full state unchanged; staging invalid-batch/failure needed   |
| Stale admin edit conflicts                    | NOT YET TESTED    | Mocked versions reject without writes; two live browser sessions needed                         |
| Route version conflict                        | NOT YET TESTED    | Mocked API response changed route version; staged two-session test needed                       |
| Unresolved-address route behavior             | PASS              | Local browser retains all Approved stops and blocks final optimization/printing                 |
| Archived event reopening                      | NOT YET TESTED    | Confirmed/audited mocked operation and browser unarchive covered                                |
| Touch Move Up / Move Down                     | PASS              | 390px touch-emulated Chromium exercised and official saved order verified locally               |
| Multi-page print                              | PASS              | 30 synthetic stops render on multiple Letter pages; first/last pages inspected                  |
| Spreadsheet formula injection                 | NOT YET TESTED    | Exact typed stringValue writer checked in mocks; confirm literal cells in staging               |
| HTML/script-like submitted text               | PASS              | Real local browser renders text, does not execute it, and remains within phone width            |
| 100-recipient within-limit request            | NOT YET TESTED    | Backend accepts 100 in one mocked atomic batch, rejects 101/over-180KB; live performance needed |
| Maps quotas prevent accidental calls          | PASS              | Default-disabled adapter and pre-call quota rejection locally verified                          |
| Provider-derived coordinates not persisted    | PASS              | Local snapshots/audit contain no provider coordinate values                                     |
| Legacy schema preservation                    | NOT YET TESTED    | Repeat setup preserves synthetic legacy tab; real production remains untouched                  |

## Live capacity/failure testing procedure

Use the DEVELOPMENT deployment and six new V1 tabs in the existing spreadsheet, never Requests/Settings or the current production public URL. Clearly prefix synthetic event names with DEV TEST -.

1. Create a new DEV TEST - Thanksgiving event with 20 meals and synthetic identities.
2. Run the original 40 steps, recording actual receipts/row counts without printing personal data in logs.
3. Launch two public submissions of 12 meals concurrently. At most one can succeed; persisted reservation must be 12, never 24.
4. Concurrently attempt a public 10-meal submission and an admin increase to an existing referral that together would exceed 20. At most the available combined total may be committed.
5. Retry the same successful UUID several times concurrently. Exactly one referral and its complete recipient set must exist. Change a quantity under that same UUID; it must be rejected.
6. Use a staging-only fault injection/invalid request in an atomic Sheets batch. Confirm no referral/recipient/receipt/audit subset is written. Retry using the same submission ID after removing the fault. Do not introduce failure flags into production code.
7. Open one referral in two approved-account browser sessions. Save from one; the stale second edit must fail with CONFLICT, preserving the first edit.
8. Start optimization in one session; reorder/change Approved membership in another. The first response must not replace the newer order.
9. Verify all statuses and reservation changes are derived from stored relationships, including after sorting spreadsheet rows.
10. Mark actual results only after reading the development Sheet and comparing counts.

## Device and API tests

- Real iPhone Safari: Google admin login, touch controls, maps address handoff, print/share flow.
- Tablet and desktop: readable layout, controls, 200% text/zoom, keyboard focus, drag-and-drop, print page boundaries.
- Live Maps: only after separate approval/configuration. Use synthetic identities at approved public civic locations, never invented US/PR addresses or actual recipient personal data.
- Confirm strict address verdicts do not silently select replacement addresses.
- Test large routes for Apps Script runtime, API quotas, all-stop preservation and no mandatory return leg.

## Current gate

No production deployment approval is requested. Pending dependencies are documented in README: manual source installation, private ADMINUSERS configuration, new test deployments, OAuth/identity checks, and separately approved Maps billing/API configuration.

## Maps-disabled manual review (installation update)

PASS LOCAL: explicit confirmation and independent admin authorization; reviewed status remains Manually Reviewed; audit, optimistic conflict and archived-read-only checks; manual saved order becomes printable only after all pickup/recipient addresses are reviewed. Address edits restore Needs Review. No external calls are made.

PASS LOCAL BROWSER: pickup and all recipient manual-review controls with confirmation; final saved route print button enables while Optimize remains disabled.

NOT YET TESTED LIVE: repeat the same workflow after manual installation using both real accounts. Manually reviewed addresses are not claims of Google validation/geocoding.
