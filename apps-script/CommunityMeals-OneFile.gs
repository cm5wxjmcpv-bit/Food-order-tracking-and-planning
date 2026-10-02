/*
  Community Meal Referral & Delivery System - ONE FILE Apps Script bundle
  Generated from tested commit 731c820accfe81160c3d3fbd942cc8d94f96b7a1
  Source branch: development/community-meals-v1-20261001
  This combines the tested .gs modules and inlines Admin.html/AdminClient.html/AdminStyles.html.
  Maps remains disabled unless separately configured.
*/


const ADMIN_PAGE_HTML_ = "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />\n    <base target=\"_top\" />\n    <style>\n      :root {\n  --navy: #15324d;\n  --blue: #1668ad;\n  --green: #126c56;\n  --red: #9d2222;\n  --border: #ccd7e1;\n  --muted: #526478;\n  --paper: #f3f6f9;\n  font-family:\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    \"Segoe UI\",\n    sans-serif;\n  color: var(--navy);\n  background: var(--paper);\n  font-size: 16px;\n  line-height: 1.5;\n}\n* {\n  box-sizing: border-box;\n}\nbody {\n  margin: 0;\n}\nh1 {\n  font-size: clamp(1.75rem, 5vw, 2.4rem);\n  line-height: 1.2;\n}\nh2 {\n  font-size: 1.35rem;\n}\nh3 {\n  font-size: 1.1rem;\n}\nh1,\nh2,\nh3,\np,\nlegend {\n  overflow-wrap: anywhere;\n}\n.stop header h3 {\n  min-width: 0;\n  flex: 1;\n}\n.page-wrap {\n  width: min(100% - 2rem, 1040px);\n  margin: auto;\n  padding: 1.5rem 0;\n}\n.narrow {\n  max-width: 640px;\n}\n.site-header {\n  background: var(--navy);\n  color: white;\n}\n.site-header p {\n  margin: 0.4rem 0;\n}\n.eyebrow {\n  text-transform: uppercase;\n  font-size: 0.875rem;\n  letter-spacing: 0.08em;\n}\n.event-panel,\nfieldset,\n.stop,\n.request-card,\n.panel {\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  background: white;\n  padding: 1.25rem;\n  margin: 0 0 1.25rem;\n  min-width: 0;\n}\n.event-panel {\n  border-left: 5px solid var(--green);\n}\nlegend {\n  font-weight: 750;\n  font-size: 1.2rem;\n  padding: 0 0.4rem;\n}\nlabel {\n  display: block;\n  font-weight: 650;\n}\ninput,\nselect,\ntextarea,\nbutton {\n  font: inherit;\n}\ninput,\nselect,\ntextarea {\n  display: block;\n  width: 100%;\n  margin: 0.35rem 0 0;\n  border: 1px solid #8e9eae;\n  border-radius: 6px;\n  padding: 0.7rem;\n  min-height: 46px;\n  background: white;\n  color: var(--navy);\n}\ntextarea {\n  resize: vertical;\n}\n.grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n.full {\n  grid-column: 1/-1;\n}\nbutton,\n.button {\n  display: inline-block;\n  min-height: 46px;\n  border: 0;\n  border-radius: 7px;\n  padding: 0.7rem 1rem;\n  background: var(--blue);\n  color: white;\n  cursor: pointer;\n  text-decoration: none;\n  font-weight: 650;\n}\nbutton.secondary {\n  background: #e8eef4;\n  color: var(--navy);\n}\nbutton.danger {\n  background: var(--red);\n}\nbutton:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n:focus-visible {\n  outline: 3px solid #efb718;\n  outline-offset: 3px;\n}\n.hint {\n  font-size: 0.875rem;\n  font-weight: 400;\n  color: var(--muted);\n}\n.capacity {\n  font-size: 1.2rem;\n}\n.capacity strong {\n  font-size: 1.75rem;\n}\n.totals,\n.metrics,\n.actions,\n.tabs {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.8rem;\n  margin: 1rem 0;\n}\n.totals {\n  background: #e1eef5;\n  padding: 1rem;\n  border-radius: 8px;\n  justify-content: space-between;\n}\n.warning {\n  color: var(--red);\n  font-weight: 650;\n}\n.badge {\n  display: inline-block;\n  background: #fff0cc;\n  border-radius: 5px;\n  padding: 0.2rem 0.5rem;\n  font-size: 0.875rem;\n}\n.request-card header,\n.stop header {\n  display: flex;\n  gap: 0.7rem;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.request-card h3,\n.stop h3 {\n  margin: 0.3rem 0;\n}\n.check-label {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.check-label input {\n  width: 22px;\n  min-height: 22px;\n  margin: 0;\n}\n.metrics span {\n  background: #e8eef4;\n  border-radius: 7px;\n  padding: 0.6rem 1rem;\n}\n.tabs button[aria-selected=\"true\"] {\n  background: var(--navy);\n}\n.recipient-card .remove {\n  margin-bottom: 1rem;\n}\n.stop dl {\n  display: grid;\n  grid-template-columns: max-content 1fr;\n  gap: 0.25rem 0.7rem;\n}\n.stop dt {\n  font-weight: 650;\n}\n.stop dd {\n  margin: 0;\n  overflow-wrap: anywhere;\n}\na {\n  color: #105a9b;\n  overflow-wrap: anywhere;\n}\ndialog {\n  width: min(95vw, 800px);\n  max-height: 90dvh;\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  padding: 1.25rem;\n  color: var(--navy);\n}\ndialog::backdrop {\n  background: #132a42a6;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: center;\n}\n.dialog-header h2 {\n  margin: 0;\n}\n.print-check {\n  display: none;\n}\n.hidden,\n[hidden] {\n  display: none !important;\n}\n.busy {\n  opacity: 0.65;\n}\n.report-row {\n  padding: 0.7rem 0;\n  border-bottom: 1px solid var(--border);\n}\n#adminMessage,\n#submissionMessage {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.print-route-title {\n  display: none;\n}\n@media (max-width: 640px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n  .page-wrap {\n    width: calc(100% - 1.4rem);\n  }\n  .event-panel,\n  fieldset,\n  .stop,\n  .request-card,\n  .panel {\n    padding: 1rem;\n  }\n  .actions button {\n    flex: 1 1 auto;\n  }\n  .tabs {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n  .tabs button {\n    padding: 0.65rem 0.4rem;\n  }\n  .metrics {\n    gap: 0.4rem;\n  }\n  .metrics span {\n    flex: 1 1 40%;\n    padding: 0.5rem;\n  }\n  .stop dl {\n    grid-template-columns: 1fr;\n  }\n  .stop dd {\n    margin-bottom: 0.45rem;\n  }\n  dialog {\n    padding: 1rem;\n  }\n}\n@media print {\n  @page {\n    size: letter;\n    margin: 0.55in;\n  }\n  :root {\n    background: white;\n    color: black;\n    font-size: 11pt;\n  }\n  body {\n    background: white;\n  }\n  .site-header,\n  .no-print,\n  nav,\n  footer,\n  dialog,\n  #adminMessage,\n  #requestsView,\n  #settingsView,\n  #reportsView {\n    display: none !important;\n  }\n  main.page-wrap {\n    width: 100%;\n    padding: 0;\n  }\n  #routeView {\n    display: block !important;\n  }\n  #routeView .actions,\n  #routeView button,\n  .route-status {\n    display: none !important;\n  }\n  .print-route-title {\n    display: block;\n  }\n  .stop {\n    border: 1px solid #888;\n    border-radius: 0;\n    break-inside: avoid;\n    page-break-inside: avoid;\n    margin: 0 0 0.15in;\n    padding: 0.12in;\n  }\n  .stop header {\n    gap: 0.1in;\n  }\n  .stop h3 {\n    font-size: 12pt;\n  }\n  .print-check {\n    display: inline-block;\n    width: 13pt;\n    height: 13pt;\n    border: 1.2pt solid black;\n    flex: none;\n  }\n  .stop dl {\n    display: block;\n    margin: 0.04in 0;\n  }\n  .stop dt,\n  .stop dd {\n    display: inline;\n    margin: 0;\n  }\n  .stop dt {\n    margin-right: 0.2em;\n  }\n  .stop dd::after {\n    content: \"\";\n    display: block;\n  }\n  .stop a {\n    color: black;\n    text-decoration: none;\n  }\n  .stop .address {\n    margin: 0.04in 0;\n  }\n  .stop .badge {\n    display: none;\n  }\n  .route-header {\n    break-after: avoid;\n  }\n  .route-header h2 {\n    margin: 0.05in 0;\n  }\n  .page-wrap {\n    margin: 0;\n  }\n  #routeStops {\n    display: block;\n  }\n  .stop .no-print {\n    display: none !important;\n  }\n}\n\n    </style>\n  </head>\n  <body>\n    <header class=\"site-header no-print\">\n      <div class=\"page-wrap\">\n        <h1>Community Meals</h1>\n        <p id=\"adminIdentity\"></p>\n      </div>\n    </header>\n    <main class=\"page-wrap\">\n      <section class=\"no-print\">\n        <div class=\"grid\">\n          <label>Meal event<select id=\"adminEvents\"></select></label\n          ><label class=\"check-label\"\n            ><input type=\"checkbox\" id=\"showArchived\" />Show archived\n            events</label\n          >\n        </div>\n        <div class=\"actions\">\n          <button id=\"createEvent\">Create Event</button\n          ><button id=\"archiveEvent\" class=\"secondary\">Archive Event</button\n          ><button id=\"reopenEvent\" class=\"secondary\" hidden>\n            Reopen / Unarchive</button\n          ><button id=\"refreshAdmin\" class=\"secondary\">Refresh</button>\n        </div>\n        <div id=\"metrics\" class=\"metrics\"></div>\n        <p id=\"readonlyNotice\" class=\"warning\"></p>\n        <nav class=\"tabs\" aria-label=\"Admin sections\">\n          <button data-view=\"requestsView\" aria-selected=\"true\">Requests</button\n          ><button data-view=\"routeView\" aria-selected=\"false\">\n            Delivery Route</button\n          ><button data-view=\"settingsView\" aria-selected=\"false\">\n            Event Settings</button\n          ><button data-view=\"reportsView\" aria-selected=\"false\">\n            Reports\n          </button>\n        </nav>\n        <p id=\"adminMessage\" role=\"status\" aria-live=\"polite\"></p>\n      </section>\n      <section id=\"requestsView\">\n        <h2>Requests</h2>\n        <div class=\"actions\">\n          <button id=\"addReferral\">Add Referral</button\n          ><button id=\"selectAll\" class=\"secondary\">Select All Pending</button\n          ><button id=\"approveSelected\">Approve Selected</button\n          ><button id=\"rejectSelected\" class=\"danger\">Reject Selected</button>\n        </div>\n        <div id=\"requestCards\"></div>\n      </section>\n      <section id=\"routeView\" hidden>\n        <div class=\"route-header\">\n          <h2 id=\"routeTitle\">Delivery Route</h2>\n          <p id=\"routeDate\"></p>\n          <p id=\"routeSummary\"></p>\n          <p id=\"routeStatus\" class=\"route-status warning\"></p>\n          <p class=\"hint no-print\" translate=\"no\">\n            Route optimization: Google Maps\n          </p>\n        </div>\n        <div class=\"actions no-print\">\n          <button id=\"optimizeRoute\">Optimize Route</button\n          ><button id=\"saveRoute\">Save Manual Order</button\n          ><button id=\"printRoute\" class=\"secondary\">\n            Print Delivery Sheet\n          </button>\n        </div>\n        <div id=\"routeStops\"></div>\n      </section>\n      <section id=\"settingsView\" hidden>\n        <h2>Event Settings</h2>\n        <form id=\"settingsForm\">\n          <div class=\"grid\">\n            <label\n              >Event name<input\n                name=\"eventName\"\n                required\n                maxlength=\"160\" /></label\n            ><label\n              >Delivery date<input\n                type=\"date\"\n                name=\"deliveryDate\"\n                required /></label\n            ><label\n              >Meal capacity<input\n                type=\"number\"\n                name=\"capacity\"\n                min=\"0\"\n                max=\"100000\"\n                step=\"1\"\n                required /></label\n            ><label\n              >Status<select name=\"status\">\n                <option>Draft</option>\n                <option>Open</option>\n                <option>Closed</option>\n                <option>Completed</option>\n              </select></label\n            ><label class=\"full\"\n              >Starting / pickup address<input\n                name=\"startAddress\"\n                required\n                maxlength=\"500\"\n            /></label>\n          </div>\n          <div class=\"actions\">\n            <button type=\"submit\">Save Event Settings</button\n            ><button type=\"button\" id=\"verifyPickup\" class=\"secondary\">\n              Validate Pickup Address\n            </button>\n          </div>\n          <button type=\"button\" id=\"manualPickup\" class=\"secondary\">Mark Saved Pickup Reviewed</button>\n          <p id=\"pickupStatus\"></p>\n          <p class=\"hint\" translate=\"no\">Address validation: Google Maps</p>\n        </form>\n      </section>\n      <section id=\"reportsView\" hidden>\n        <h2>Reports</h2>\n        <p class=\"hint\">\n          Archived events are included. Recipient totals count delivery records\n          across events.\n        </p>\n        <div class=\"grid\">\n          <label\n            >Event<select id=\"reportEvent\">\n              <option value=\"\">All events</option>\n            </select></label\n          ><label\n            >Year<select id=\"reportYear\">\n              <option value=\"\">All years</option>\n            </select></label\n          >\n        </div>\n        <div id=\"reportTotals\" class=\"metrics\"></div>\n        <h3>Referring organizations</h3>\n        <div id=\"organizationReports\"></div>\n      </section>\n    </main>\n    <dialog id=\"referralDialog\">\n      <div class=\"dialog-header\">\n        <h2 id=\"referralHeading\">Referral</h2>\n        <button type=\"button\" id=\"closeReferral\" class=\"secondary\">\n          Close\n        </button>\n      </div>\n      <form id=\"referralEditor\">\n        <fieldset>\n          <legend>Referring organization</legend>\n          <div class=\"grid\">\n            <label\n              >Organization name<input\n                name=\"organizationName\"\n                maxlength=\"160\"\n                required /></label\n            ><label\n              >Email address<input\n                type=\"email\"\n                name=\"organizationEmail\"\n                maxlength=\"254\"\n                required /></label\n            ><label\n              >Phone number<input\n                name=\"organizationPhone\"\n                type=\"tel\"\n                maxlength=\"40\"\n                required\n            /></label>\n          </div>\n        </fieldset>\n        <div id=\"editorRecipients\"></div>\n        <div class=\"actions\">\n          <button type=\"button\" id=\"editorAddRecipient\" class=\"secondary\">\n            + Add Another Recipient</button\n          ><button type=\"submit\" id=\"saveReferral\">Save Referral</button>\n        </div>\n      </form>\n      <p id=\"editorMessage\" role=\"status\"></p>\n    </dialog>\n    <dialog id=\"eventDialog\">\n      <div class=\"dialog-header\">\n        <h2>Create Event</h2>\n        <button id=\"closeEvent\" class=\"secondary\">Close</button>\n      </div>\n      <form id=\"eventEditor\">\n        <div class=\"grid\">\n          <label\n            >Event name<input\n              name=\"eventName\"\n              required\n              maxlength=\"160\" /></label\n          ><label\n            >Delivery date<input\n              type=\"date\"\n              name=\"deliveryDate\"\n              required /></label\n          ><label\n            >Meal capacity<input\n              type=\"number\"\n              name=\"capacity\"\n              min=\"0\"\n              max=\"100000\"\n              step=\"1\"\n              required /></label\n          ><label\n            >Status<select name=\"status\">\n              <option>Draft</option>\n              <option>Open</option>\n              <option>Closed</option>\n            </select></label\n          ><label class=\"full\"\n            >Starting / pickup address<input\n              name=\"startAddress\"\n              required\n              maxlength=\"500\"\n          /></label>\n        </div>\n        <div class=\"actions\"><button type=\"submit\">Create Event</button></div>\n      </form>\n      <p id=\"eventEditorMessage\" role=\"status\"></p>\n    </dialog>\n    <script>\n      \"use strict\";\n(() => {\n  const $ = (id) => document.getElementById(id);\n  let events = [],\n    dashboard = null,\n    route = null,\n    editing = null,\n    viewOnly = false,\n    view = \"requestsView\",\n    busy = false,\n    dragId = null,\n    createId = null,\n    routeUnsaved = false;\n  const el = (tag, text, cls) => {\n    const n = document.createElement(tag);\n    if (text != null) n.textContent = text;\n    if (cls) n.className = cls;\n    return n;\n  };\n  const button = (text, fn, cls) => {\n    const b = el(\"button\", text, cls);\n    b.type = \"button\";\n    b.addEventListener(\"click\", fn);\n    return b;\n  };\n  const addressReviewed = (status) =>\n    [\"Confirmed\", \"Manually Reviewed\"].includes(status);\n  const readonly = () =>\n    !dashboard ||\n    dashboard.event.Archived === true ||\n    dashboard.event.Status === \"Completed\";\n  function rpc(action, p = {}) {\n    return new Promise((resolve, reject) =>\n      google.script.run\n        .withSuccessHandler((r) =>\n          r.ok\n            ? resolve(r.data)\n            : reject(\n                new Error(\n                  r.error?.message ||\n                    \"Your changes were not saved. Please try again.\",\n                ),\n              ),\n        )\n        .withFailureHandler(() =>\n          reject(\n            new Error(\n              \"The service could not be reached. Refresh and try again.\",\n            ),\n          ),\n        )\n        .adminCall(action, p),\n    );\n  }\n  async function task(fn) {\n    if (busy) return;\n    busy = true;\n    $(\"adminEvents\").disabled = true;\n    $(\"showArchived\").disabled = true;\n    $(\"adminMessage\").textContent = \"Working…\";\n    try {\n      await fn();\n      $(\"adminMessage\").textContent = \"\";\n    } catch (e) {\n      $(\"adminMessage\").textContent = e.message;\n    } finally {\n      busy = false;\n      $(\"adminEvents\").disabled = false;\n      $(\"showArchived\").disabled = false;\n    }\n  }\n  const dateLabel = (s) =>\n    new Date(s + \"T12:00:00\").toLocaleDateString(undefined, {\n      year: \"numeric\",\n      month: \"long\",\n      day: \"numeric\",\n    });\n  function today() {\n    return new Intl.DateTimeFormat(\"en-CA\", {\n      timeZone: \"America/New_York\",\n      year: \"numeric\",\n      month: \"2-digit\",\n      day: \"2-digit\",\n    }).format(new Date());\n  }\n  function metric(node, pairs) {\n    node.replaceChildren(...pairs.map(([k, v]) => el(\"span\", k + \": \" + v)));\n  }\n  function eventOptions() {\n    const list = events.filter(\n        (e) => $(\"showArchived\").checked || e.Archived !== true,\n      ),\n      old = dashboard?.event.EventID || $(\"adminEvents\").value;\n    const options = list.map((e) => {\n      const o = el(\"option\", e.EventName + (e.Archived ? \" (Archived)\" : \"\"));\n      o.value = e.EventID;\n      return o;\n    });\n    $(\"adminEvents\").replaceChildren(...options);\n    $(\"adminEvents\").value = list.some((e) => e.EventID === old)\n      ? old\n      : (list.find((e) => e.DeliveryDate >= today()) || list[0])?.EventID || \"\";\n  }\n  async function refreshEvents(preferred) {\n    events = await rpc(\"events\");\n    if (preferred) {\n      dashboard = null;\n      $(\"adminEvents\").value = preferred;\n    }\n    eventOptions();\n    if (\n      preferred &&\n      events.some(\n        (e) =>\n          e.EventID === preferred &&\n          (!$(\"showArchived\").checked ? e.Archived !== true : true),\n      )\n    )\n      $(\"adminEvents\").value = preferred;\n    await refresh();\n  }\n  async function refresh() {\n    const id = $(\"adminEvents\").value;\n    if (!id) {\n      dashboard = null;\n      route = null;\n      metric($(\"metrics\"), []);\n      $(\"requestCards\").replaceChildren(\n        el(\"p\", \"No events available. Create an event to get started.\"),\n      );\n      $(\"routeStops\").replaceChildren();\n      $(\"routeTitle\").textContent = \"Delivery Route\";\n      $(\"routeDate\").textContent = \"\";\n      $(\"routeSummary\").textContent = \"\";\n      $(\"routeStatus\").textContent = \"No event selected.\";\n      $(\"archiveEvent\").disabled = true;\n      $(\"reopenEvent\").hidden = true;\n      $(\"settingsForm\").inert = true;\n      $(\"readonlyNotice\").textContent = \"\";\n      $(\"addReferral\").disabled = true;\n      await reports();\n      return;\n    }\n    dashboard = await rpc(\"dashboard\", { eventId: id });\n    route = await rpc(\"route\", { eventId: id });\n    routeUnsaved = false;\n    renderDashboard();\n    renderRequests();\n    renderRoute();\n    renderSettings();\n    if (view === \"reportsView\") await reports();\n  }\n  function renderDashboard() {\n    metric($(\"metrics\"), [\n      [\"Capacity\", dashboard.capacity],\n      [\"Reserved\", dashboard.reserved],\n      [\"Available\", dashboard.available],\n      [\"Pending Referrals\", dashboard.pendingReferrals],\n      [\"Approved Referrals\", dashboard.approvedReferrals],\n      [\"Delivery Stops\", dashboard.deliveryStops],\n    ]);\n    const ro = readonly();\n    $(\"readonlyNotice\").textContent = ro\n      ? \"This event is read-only. Use Reopen / Unarchive to make corrections.\"\n      : \"\";\n    $(\"archiveEvent\").disabled = dashboard.event.Archived === true;\n    $(\"reopenEvent\").hidden = !ro;\n    [\n      \"addReferral\",\n      \"selectAll\",\n      \"approveSelected\",\n      \"rejectSelected\",\n      \"optimizeRoute\",\n      \"saveRoute\",\n      \"verifyPickup\",\n    ].forEach((id) => ($(id).disabled = ro));\n    $(\"settingsForm\").inert = ro;\n  }\n  function selectedRefs() {\n    return [...$(\"requestCards\").querySelectorAll(\"input:checked\")].map(\n      (x) => ({\n        referralId: x.dataset.referralId,\n        version: Number(x.dataset.version),\n      }),\n    );\n  }\n  async function changeStatus(referrals, status) {\n    if (!referrals.length) throw new Error(\"Select at least one referral.\");\n    if (\n      status === \"Rejected\" &&\n      !confirm(\n        \"Reject \" +\n          referrals.length +\n          \" referral(s) and release their reserved meals?\",\n      )\n    )\n      return;\n    await rpc(\"statuses\", { referrals, status });\n    await refresh();\n  }\n  function renderRequests() {\n    const refs = dashboard.referrals\n      .slice()\n      .sort(\n        (a, b) =>\n          (a.Status === \"Pending\" ? 0 : 1) - (b.Status === \"Pending\" ? 0 : 1) ||\n          a.SubmittedAt.localeCompare(b.SubmittedAt),\n      );\n    $(\"requestCards\").replaceChildren();\n    if (!refs.length) $(\"requestCards\").append(el(\"p\", \"No referrals yet.\"));\n    refs.forEach((r) => {\n      const card = el(\"article\", null, \"request-card\"),\n        header = el(\"header\");\n      const check = el(\"input\");\n      check.type = \"checkbox\";\n      check.dataset.referralId = r.ReferralID;\n      check.dataset.version = r.Version;\n      check.disabled = readonly();\n      const label = el(\"label\", null, \"check-label\");\n      label.append(check, el(\"span\", \"Select \" + r.OrganizationName));\n      header.append(label, el(\"span\", r.Status, \"badge\"));\n      card.append(\n        header,\n        el(\n          \"h3\",\n          r.OrganizationName +\n            \" — \" +\n            r.recipients.length +\n            \" Recipients — \" +\n            r.meals +\n            \" Meals\",\n        ),\n        el(\n          \"p\",\n          \"Submitted \" + new Date(r.SubmittedAt).toLocaleString(),\n          \"hint\",\n        ),\n      );\n      if (r.recipients.some((x) => x.DuplicateFlag))\n        card.append(\n          el(\n            \"p\",\n            \"Possible Duplicate — open View to see matching records.\",\n            \"warning\",\n          ),\n        );\n      if (r.recipients.some((x) => !addressReviewed(x.AddressStatus)))\n        card.append(el(\"p\", \"Address Needs Review\", \"badge\"));\n      const actions = el(\"div\", null, \"actions\");\n      actions.append(button(\"View\", () => openReferral(r, true), \"secondary\"));\n      if (!readonly()) {\n        actions.append(\n          button(\"Edit\", () => openReferral(r, false), \"secondary\"),\n        );\n        [\"Approved\", \"Rejected\", \"Pending\"]\n          .filter((s) => s !== r.Status)\n          .forEach((status) =>\n            actions.append(\n              button(\n                status === \"Approved\"\n                  ? \"Approve\"\n                  : status === \"Rejected\"\n                    ? \"Reject\"\n                    : \"Return to Pending\",\n                () =>\n                  task(() =>\n                    changeStatus(\n                      [{ referralId: r.ReferralID, version: r.Version }],\n                      status,\n                    ),\n                  ),\n                status === \"Rejected\" ? \"danger\" : \"secondary\",\n              ),\n            ),\n          );\n      }\n      card.append(actions);\n      $(\"requestCards\").append(card);\n    });\n  }\n  function field(label, name, value, type = \"text\", max = 1000) {\n    const wrap = el(\"label\", label),\n      input = el(type === \"textarea\" ? \"textarea\" : \"input\");\n    input.name = name;\n    if (type !== \"textarea\") input.type = type;\n    input.value = value ?? \"\";\n    input.maxLength = max;\n    if (type === \"number\") {\n      input.min = \"1\";\n      input.max = \"10000\";\n      input.step = \"1\";\n    }\n    if ([\"recipientName\", \"address\", \"mealCount\"].includes(name))\n      input.required = true;\n    wrap.append(input);\n    return wrap;\n  }\n  function recipientEditor(r) {\n    const card = el(\"fieldset\", null, \"recipient-card\");\n    if (r) {\n      card.dataset.recipientId = r.RecipientID;\n      card.dataset.version = r.Version;\n    }\n    card.append(\n      el(\"legend\", \"Recipient \" + ($(\"editorRecipients\").children.length + 1)),\n    );\n    const grid = el(\"div\", null, \"grid\");\n    grid.append(\n      field(\"Recipient name\", \"recipientName\", r?.RecipientName, \"text\", 160),\n      field(\n        \"Street address (include apartment/unit)\",\n        \"address\",\n        r?.Address,\n        \"text\",\n        500,\n      ),\n      field(\"Phone (optional)\", \"phone\", r?.Phone, \"tel\", 40),\n      field(\"Number of meals\", \"mealCount\", r?.MealCount || 1, \"number\"),\n      field(\n        \"Dietary restrictions / allergies\",\n        \"dietaryRestrictions\",\n        r?.DietaryRestrictions,\n        \"textarea\",\n        500,\n      ),\n    );\n    const door = el(\"label\", \"Preferred door\"),\n      select = el(\"select\");\n    select.name = \"doorPreference\";\n    [\"Front\", \"Side\", \"Back\", \"Other\"].forEach((s) => {\n      const o = el(\"option\", s);\n      o.value = s;\n      select.append(o);\n    });\n    select.value = r?.DoorPreference || \"Front\";\n    door.append(select);\n    grid.append(\n      door,\n      field(\n        \"Delivery instructions (printed)\",\n        \"deliveryInstructions\",\n        r?.DeliveryInstructions,\n        \"textarea\",\n      ),\n      field(\n        \"Internal notes (admin only; never printed)\",\n        \"notes\",\n        r?.Notes,\n        \"textarea\",\n      ),\n    );\n    card.append(grid);\n    if (r) {\n      card.append(\n        el(\n          \"p\",\n          addressReviewed(r.AddressStatus)\n            ? r.AddressStatus === \"Manually Reviewed\"\n              ? \"Address manually reviewed (Google validation not performed)\"\n              : \"Address confirmed\"\n            : \"Address Needs Review\",\n          addressReviewed(r.AddressStatus) ? \"hint\" : \"warning\",\n        ),\n      );\n      if (r.matches?.length) {\n        const details = el(\"details\"),\n          summary = el(\"summary\", \"Possible Duplicate — matching recipients\");\n        details.append(summary);\n        r.matches.forEach((m) =>\n          details.append(\n            el(\n              \"p\",\n              m.recipientName +\n                \" — \" +\n                m.address +\n                \" — Referral \" +\n                m.referralId,\n            ),\n          ),\n        );\n        card.append(details);\n      }\n      if (!readonly()) {\n        card.append(\n          button(\n            \"Mark Saved Address Reviewed\",\n            () => {\n              if (\n                !confirm(\n                  \"Have you checked the SAVED address and confirmed it is usable for delivery? Unsaved edits are not reviewed. This is manual review, not Google validation.\",\n                )\n              )\n                return;\n              task(async () => {\n                await rpc(\"manualAddressReview\", {\n                  entity: \"recipient\",\n                  recipientId: r.RecipientID,\n                  version: r.Version,\n                  confirmed: true,\n                });\n                $(\"referralDialog\").close();\n                await refresh();\n              });\n            },\n            \"secondary\",\n          ),\n        );\n        if (route.mapsEnabled)\n          card.append(\n            button(\n              \"Validate Saved Address\",\n              () =>\n                task(async () => {\n                  await rpc(\"verifyAddress\", {\n                    recipientId: r.RecipientID,\n                    version: r.Version,\n                    entity: \"recipient\",\n                  });\n                  $(\"referralDialog\").close();\n                  await refresh();\n                }),\n              \"secondary\",\n            ),\n          );\n      }\n    } else {\n      card.append(\n        button(\n          \"Remove Recipient\",\n          () => {\n            if ($(\"editorRecipients\").children.length > 1) {\n              card.remove();\n              [...$(\"editorRecipients\").children].forEach(\n                (c, i) =>\n                  (c.querySelector(\"legend\").textContent =\n                    \"Recipient \" + (i + 1)),\n              );\n            }\n          },\n          \"secondary\",\n        ),\n      );\n    }\n    $(\"editorRecipients\").append(card);\n    if (viewOnly)\n      grid\n        .querySelectorAll(\"input,select,textarea\")\n        .forEach((x) => (x.disabled = true));\n  }\n  function openReferral(r, read) {\n    editing = r || null;\n    viewOnly = read || readonly();\n    createId = r ? null : crypto.randomUUID();\n    $(\"referralHeading\").textContent = r\n      ? viewOnly\n        ? \"View Referral\"\n        : \"Edit Referral\"\n      : \"Add Referral\";\n    $(\"editorMessage\").textContent = \"\";\n    [\"organizationName\", \"organizationEmail\", \"organizationPhone\"].forEach(\n      (n) => {\n        const key = n[0].toUpperCase() + n.slice(1);\n        $(\"referralEditor\").elements[n].value = r?.[key] || \"\";\n        $(\"referralEditor\").elements[n].disabled = viewOnly;\n      },\n    );\n    $(\"editorRecipients\").replaceChildren();\n    if (r) r.recipients.forEach(recipientEditor);\n    else recipientEditor();\n    $(\"editorAddRecipient\").hidden = !!r || viewOnly;\n    $(\"saveReferral\").hidden = viewOnly;\n    $(\"referralDialog\").showModal();\n  }\n  function editorPayload() {\n    const f = $(\"referralEditor\"),\n      p = { eventId: dashboard.event.EventID };\n    [\"organizationName\", \"organizationEmail\", \"organizationPhone\"].forEach(\n      (n) => (p[n] = f.elements[n].value.trim()),\n    );\n    p.recipients = [...$(\"editorRecipients\").children].map((c) => {\n      const x = Object.fromEntries(\n        [...c.querySelectorAll(\"[name]\")].map((n) => [\n          n.name,\n          n.name === \"mealCount\" ? Number(n.value) : n.value.trim(),\n        ]),\n      );\n      if (editing) {\n        x.recipientId = c.dataset.recipientId;\n        x.version = Number(c.dataset.version);\n      }\n      return x;\n    });\n    if (editing) {\n      p.referralId = editing.ReferralID;\n      p.version = editing.Version;\n    } else p.submissionId = createId;\n    return p;\n  }\n  function mapsUrl(address) {\n    return /iPhone|iPad|iPod/.test(navigator.userAgent) ||\n      (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1)\n      ? \"https://maps.apple.com/?daddr=\" + encodeURIComponent(address)\n      : \"https://www.google.com/maps/search/?api=1&query=\" +\n          encodeURIComponent(address);\n  }\n  function renumberRoute() {\n    let n = 0;\n    route.stops.forEach((r, i) => {\n      r.stop = i + 1;\n      n += r.meals;\n      r.runningMeals = n;\n    });\n    route.totalMeals = n;\n  }\n  function move(id, delta) {\n    const i = route.stops.findIndex((s) => s.recipientId === id),\n      j = i + delta;\n    if (j < 0 || j >= route.stops.length) return;\n    [route.stops[i], route.stops[j]] = [route.stops[j], route.stops[i]];\n    routeUnsaved = true;\n    renumberRoute();\n    renderRoute();\n  }\n  function renderRoute() {\n    if (!route) return;\n    $(\"routeTitle\").textContent = route.eventName + \" Delivery Route\";\n    $(\"routeDate\").textContent = dateLabel(route.deliveryDate);\n    $(\"routeSummary\").textContent =\n      route.stops.length + \" Stops · \" + route.totalMeals + \" Meals\";\n    $(\"routeStatus\").textContent = routeUnsaved\n      ? \"Order changed. Save Manual Order before printing.\"\n      : route.isFinal\n        ? \"Official delivery order saved.\"\n        : \"Route is not final. \" +\n          (route.unresolved.length\n            ? route.unresolved.length + \" recipient address(es) need review. \"\n            : \"\") +\n          (!addressReviewed(route.startAddressStatus)\n            ? \"Pickup address needs review. \"\n            : \"\") +\n          \"Review addresses and save or optimize the route.\";\n    $(\"printRoute\").disabled = routeUnsaved || !route.isFinal;\n    $(\"optimizeRoute\").disabled =\n      readonly() ||\n      !route.mapsEnabled ||\n      route.unresolved.length > 0 ||\n      !addressReviewed(route.startAddressStatus);\n    $(\"optimizeRoute\").title = route.mapsEnabled\n      ? \"\"\n      : \"Maps APIs are disabled; use manual ordering.\";\n    $(\"saveRoute\").disabled = readonly() || !route.stops.length;\n    $(\"routeStops\").replaceChildren();\n    route.stops.forEach((r) => {\n      const card = el(\"article\", null, \"stop\");\n      card.dataset.recipientId = r.recipientId;\n      const head = el(\"header\");\n      head.append(\n        el(\"span\", null, \"print-check\"),\n        el(\"h3\", \"Stop \" + r.stop + \" — \" + r.recipientName),\n      );\n      card.append(head);\n      const address = el(\"p\", null, \"address\"),\n        link = el(\"a\", r.address);\n      link.href = mapsUrl(r.address);\n      link.target = \"_blank\";\n      link.rel = \"noopener noreferrer\";\n      address.append(link);\n      card.append(address);\n      const dl = el(\"dl\");\n      const pair = (k, v) => {\n        if (v) {\n          dl.append(el(\"dt\", k), el(\"dd\", String(v)));\n        }\n      };\n      pair(\"Phone:\", r.phone);\n      pair(\"Meals:\", r.meals);\n      pair(\"Running Meal Total:\", r.runningMeals);\n      pair(\"Dietary:\", r.dietaryRestrictions);\n      pair(\"Door:\", r.doorPreference);\n      pair(\"Delivery Instructions:\", r.deliveryInstructions);\n      card.append(dl);\n      if (!addressReviewed(r.addressStatus))\n        card.append(el(\"p\", \"Address Needs Review\", \"badge\"));\n      if (!readonly()) {\n        const controls = el(\"div\", null, \"actions no-print\"),\n          up = button(\"Move Up\", () => move(r.recipientId, -1), \"secondary\"),\n          down = button(\"Move Down\", () => move(r.recipientId, 1), \"secondary\");\n        up.disabled = r.stop === 1;\n        down.disabled = r.stop === route.stops.length;\n        controls.append(up, down);\n        card.append(controls);\n        card.draggable = matchMedia(\"(pointer:fine)\").matches;\n        card.addEventListener(\"dragstart\", (ev) => {\n          dragId = r.recipientId;\n          ev.dataTransfer.setData(\"text/plain\", r.recipientId);\n        });\n        card.addEventListener(\"dragover\", (ev) => ev.preventDefault());\n        card.addEventListener(\"drop\", (ev) => {\n          ev.preventDefault();\n          const i = route.stops.findIndex((x) => x.recipientId === dragId),\n            j = route.stops.findIndex((x) => x.recipientId === r.recipientId);\n          if (i < 0 || j < 0 || i === j) return;\n          const [row] = route.stops.splice(i, 1);\n          route.stops.splice(j, 0, row);\n          routeUnsaved = true;\n          renumberRoute();\n          renderRoute();\n        });\n      }\n      $(\"routeStops\").append(card);\n    });\n    if (!route.stops.length)\n      $(\"routeStops\").append(el(\"p\", \"No Approved recipients for this event.\"));\n  }\n  function renderSettings() {\n    const e = dashboard.event;\n    const values = {\n      eventName: e.EventName,\n      deliveryDate: e.DeliveryDate,\n      capacity: e.Capacity,\n      startAddress: e.StartAddress,\n      status: e.Status,\n    };\n    Object.entries(values).forEach(\n      ([k, v]) => ($(\"settingsForm\").elements[k].value = v),\n    );\n    $(\"verifyPickup\").disabled = readonly() || !route.mapsEnabled;\n    $(\"manualPickup\").disabled = readonly();\n    $(\"pickupStatus\").textContent = addressReviewed(e.StartAddressStatus)\n      ? e.StartAddressStatus === \"Manually Reviewed\"\n        ? \"Pickup address manually reviewed (Google validation not performed).\"\n        : \"Pickup address confirmed.\"\n      : \"Pickup Address Needs Review\";\n  }\n  function eventPayload(f) {\n    return Object.fromEntries(\n      [\"eventName\", \"deliveryDate\", \"capacity\", \"startAddress\", \"status\"].map(\n        (n) => [\n          n,\n          n === \"capacity\"\n            ? Number(f.elements[n].value)\n            : f.elements[n].value.trim(),\n        ],\n      ),\n    );\n  }\n  async function reports() {\n    const old = $(\"reportEvent\").value,\n      year = $(\"reportYear\").value;\n    $(\"reportEvent\").replaceChildren(el(\"option\", \"All events\"));\n    $(\"reportEvent\").firstChild.value = \"\";\n    events.forEach((e) => {\n      const o = el(\"option\", e.EventName + (e.Archived ? \" (Archived)\" : \"\"));\n      o.value = e.EventID;\n      $(\"reportEvent\").append(o);\n    });\n    $(\"reportEvent\").value = old;\n    const years = [...new Set(events.map((e) => e.DeliveryDate.slice(0, 4)))]\n      .sort()\n      .reverse();\n    $(\"reportYear\").replaceChildren(el(\"option\", \"All years\"));\n    $(\"reportYear\").firstChild.value = \"\";\n    years.forEach((y) => {\n      const o = el(\"option\", y);\n      o.value = y;\n      $(\"reportYear\").append(o);\n    });\n    $(\"reportYear\").value = year;\n    const r = await rpc(\"reports\", {\n      eventId: $(\"reportEvent\").value,\n      year: $(\"reportYear\").value,\n    });\n    metric($(\"reportTotals\"), [\n      [\"Events\", r.totals.events],\n      [\"Originally Requested Meals\", r.totals.originallyRequestedMeals],\n      [\"Currently Reserved Meals\", r.totals.currentlyReservedMeals],\n      [\"Approved Meals\", r.totals.approvedMeals],\n      [\"Rejected Meals\", r.totals.rejectedMeals],\n      [\"Recipient Records\", r.totals.recipientRecords],\n      [\"Approved Stops\", r.totals.approvedStops],\n      [\"Organizations\", r.totals.organizations],\n    ]);\n    $(\"organizationReports\").replaceChildren(\n      ...r.organizations.map((o) =>\n        el(\n          \"div\",\n          o.name +\n            \" — \" +\n            o.referrals +\n            \" Referrals · \" +\n            o.originallyRequestedMeals +\n            \" Originally Requested Meals · \" +\n            o.currentMeals +\n            \" Current Meals\",\n          \"report-row\",\n        ),\n      ),\n    );\n  }\n  document.querySelectorAll(\"[data-view]\").forEach((b) =>\n    b.addEventListener(\"click\", () =>\n      task(async () => {\n        view = b.dataset.view;\n        [\"requestsView\", \"routeView\", \"settingsView\", \"reportsView\"].forEach(\n          (id) => ($(id).hidden = id !== view),\n        );\n        document\n          .querySelectorAll(\"[data-view]\")\n          .forEach((x) => x.setAttribute(\"aria-selected\", String(x === b)));\n        if (view === \"reportsView\") await reports();\n      }),\n    ),\n  );\n  $(\"adminEvents\").addEventListener(\"change\", () => task(refresh));\n  $(\"showArchived\").addEventListener(\"change\", () =>\n    task(async () => {\n      eventOptions();\n      await refresh();\n    }),\n  );\n  $(\"refreshAdmin\").addEventListener(\"click\", () =>\n    task(() => refreshEvents()),\n  );\n  $(\"createEvent\").addEventListener(\"click\", () => {\n    $(\"eventEditor\").reset();\n    $(\"eventEditorMessage\").textContent = \"\";\n    $(\"eventDialog\").showModal();\n  });\n  $(\"closeEvent\").addEventListener(\"click\", () => $(\"eventDialog\").close());\n  $(\"closeReferral\").addEventListener(\"click\", () =>\n    $(\"referralDialog\").close(),\n  );\n  $(\"addReferral\").addEventListener(\"click\", () => openReferral(null, false));\n  $(\"editorAddRecipient\").addEventListener(\"click\", () => {\n    if ($(\"editorRecipients\").children.length < 100) recipientEditor();\n  });\n  $(\"selectAll\").addEventListener(\"click\", () => {\n    $(\"requestCards\")\n      .querySelectorAll('input[type=\"checkbox\"]')\n      .forEach(\n        (x) =>\n          (x.checked =\n            dashboard.referrals.find(\n              (r) => r.ReferralID === x.dataset.referralId,\n            )?.Status === \"Pending\"),\n      );\n  });\n  $(\"approveSelected\").addEventListener(\"click\", () =>\n    task(() => changeStatus(selectedRefs(), \"Approved\")),\n  );\n  $(\"rejectSelected\").addEventListener(\"click\", () =>\n    task(() => changeStatus(selectedRefs(), \"Rejected\")),\n  );\n  $(\"referralEditor\").addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n    if (busy) return;\n    task(async () => {\n      const payload = editorPayload();\n      try {\n        await rpc(editing ? \"editReferral\" : \"createReferral\", payload);\n        $(\"referralDialog\").close();\n        await refresh();\n      } catch (err) {\n        $(\"editorMessage\").textContent = err.message;\n        throw err;\n      }\n    });\n  });\n  $(\"eventEditor\").addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n    task(async () => {\n      try {\n        const event = await rpc(\"saveEvent\", eventPayload($(\"eventEditor\")));\n        $(\"eventDialog\").close();\n        await refreshEvents(event.EventID);\n      } catch (err) {\n        $(\"eventEditorMessage\").textContent = err.message;\n        throw err;\n      }\n    });\n  });\n  $(\"settingsForm\").addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n    task(async () => {\n      const d = dashboard.event;\n      await rpc(\"saveEvent\", {\n        ...eventPayload($(\"settingsForm\")),\n        eventId: d.EventID,\n        version: d.Version,\n      });\n      await refreshEvents(d.EventID);\n    });\n  });\n  $(\"archiveEvent\").addEventListener(\"click\", () =>\n    task(async () => {\n      if (\n        !confirm(\n          \"Archive this event? Its records will remain available in Reports.\",\n        )\n      )\n        return;\n      await rpc(\"archive\", {\n        eventId: dashboard.event.EventID,\n        version: dashboard.event.Version,\n        mode: \"archive\",\n        confirmed: true,\n      });\n      dashboard = null;\n      await refreshEvents();\n    }),\n  );\n  $(\"reopenEvent\").addEventListener(\"click\", () =>\n    task(async () => {\n      if (\n        !confirm(\n          \"Reopen / Unarchive this event for corrections? This action will be audit logged.\",\n        )\n      )\n        return;\n      const id = dashboard.event.EventID;\n      await rpc(\"archive\", {\n        eventId: id,\n        version: dashboard.event.Version,\n        mode: \"reopen\",\n        confirmed: true,\n      });\n      await refreshEvents(id);\n    }),\n  );\n  $(\"manualPickup\").addEventListener(\"click\", () => {\n    if (\n      !confirm(\n        \"Have you checked the SAVED pickup address and confirmed it is usable? This is manual review, not Google validation.\",\n      )\n    )\n      return;\n    task(async () => {\n      await rpc(\"manualAddressReview\", {\n        entity: \"event\",\n        eventId: dashboard.event.EventID,\n        version: dashboard.event.Version,\n        confirmed: true,\n      });\n      await refresh();\n    });\n  });\n  $(\"verifyPickup\").addEventListener(\"click\", () =>\n    task(async () => {\n      await rpc(\"verifyAddress\", {\n        entity: \"event\",\n        eventId: dashboard.event.EventID,\n        version: dashboard.event.Version,\n      });\n      await refresh();\n    }),\n  );\n  $(\"optimizeRoute\").addEventListener(\"click\", () =>\n    task(async () => {\n      route = await rpc(\"optimize\", {\n        eventId: route.eventId,\n        routeVersion: route.version,\n      });\n      await refresh();\n    }),\n  );\n  $(\"saveRoute\").addEventListener(\"click\", () =>\n    task(async () => {\n      route = await rpc(\"reorder\", {\n        eventId: route.eventId,\n        routeVersion: route.version,\n        recipientIds: route.stops.map((r) => r.recipientId),\n      });\n      routeUnsaved = false;\n      renderRoute();\n    }),\n  );\n  $(\"printRoute\").addEventListener(\"click\", () => {\n    if (!routeUnsaved && route.isFinal) window.print();\n  });\n  [\"reportEvent\", \"reportYear\"].forEach((id) =>\n    $(id).addEventListener(\"change\", () => task(reports)),\n  );\n  task(async () => {\n    const identity = await rpc(\"identity\");\n    $(\"adminIdentity\").textContent =\n      identity.email + \" · \" + identity.environment;\n    await refreshEvents();\n  });\n})();\n\n    </script>\n  </body>\n</html>\n";

// ===== Code.gs =====
function doGet(e) {
  if (e && e.parameter && e.parameter.page === "admin") {
    const auth = safeBoundary_(() => {
      const a = requireAdmin_();
      return a.email;
    });
    if (!auth.ok)
      return HtmlService.createHtmlOutput(
        "<h1>Administrator access unavailable</h1><p>Open the authenticated admin deployment using an approved Google account. If Google cannot identify your account, stop and contact the program administrator.</p>",
      );
    return HtmlService.createHtmlOutput(ADMIN_PAGE_HTML_)
      .setTitle("Community Meals Administration")
      .addMetaTag("viewport", "width=device-width, initial-scale=1");
  }
  const action = e && e.parameter && e.parameter.action;
  return json_(
    action === "events"
      ? safeBoundary_(publicEvents_)
      : {
          ok: false,
          error: {
            code: "FORBIDDEN",
            message: "This public operation is unavailable.",
          },
        },
  );
}
function doPost(e) {
  return json_(
    safeBoundary_(() => {
      const raw = e && e.postData && e.postData.contents;
      if (!raw || Utilities.newBlob(raw).getBytes().length > MEAL_LIMITS.bytes)
        fail_("INVALID", "The request is too large. Submit fewer recipients.");
      let p;
      try {
        p = JSON.parse(raw);
      } catch (_) {
        fail_("INVALID", "The request could not be read.");
      }
      if (!p || p.action !== "submit")
        fail_("FORBIDDEN", "This public operation is unavailable.");
      return submit_(p, null);
    }),
  );
}
function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
function adminCall(action, p) {
  return safeBoundary_(() => {
    // Authorization must happen before dispatch, including every read.
    const auth = requireAdmin_();
    p = p || {};
    if (
      Utilities.newBlob(JSON.stringify(p)).getBytes().length > MEAL_LIMITS.bytes
    )
      fail_("INVALID", "The request is too large.");
    if (action === "identity")
      return {
        email: auth.email,
        environment: properties_().getProperty("MEALS_ENV"),
      };
    if (action === "events")
      return auth.state.EVENTS.slice().sort((a, b) =>
        a.DeliveryDate.localeCompare(b.DeliveryDate),
      );
    if (action === "dashboard") return dashboard_(auth.state, p);
    if (action === "route") return route_(auth.state, id_(p.eventId));
    if (action === "reports") return reports_(auth.state, p);
    if (action === "createReferral") return submit_(p, auth.email);
    if (action === "verifyAddress") return verifyAddress_(p);
    if (action === "optimize") return optimize_(p);
    return locked_((s) => {
      const admin = admin_(s);
      switch (action) {
        case "manualAddressReview":
          return manualAddressReview_(s, p, admin);
        case "saveEvent":
          return eventWrite_(s, p, admin);
        case "archive":
          return archiveWrite_(s, p, admin);
        case "statuses":
          return statuses_(s, p, admin);
        case "editReferral":
          return editReferral_(s, p, admin);
        case "reorder":
          return routeOrder_(s, p, admin, false);
        default:
          fail_("FORBIDDEN", "This administrator operation is unavailable.");
      }
    });
  });
}



// ===== Validation.gs =====
const MEAL_LIMITS = Object.freeze({
  recipients: 100,
  bytes: 180000,
  text: 1000,
  meals: 10000,
});
function fail_(code, message) {
  const e = new Error(message);
  e.code = code;
  e.clientSafe = true;
  throw e;
}
function text_(value, label, max, required) {
  if (typeof value !== "string" && value != null)
    fail_("INVALID", label + " must be text.");
  const s = String(value == null ? "" : value).trim();
  if (
    (required && !s) ||
    s.length > max ||
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(s)
  )
    fail_("INVALID", "Please check " + label + ".");
  return s;
}
function integer_(v, label, min, max) {
  if (v === "" || v == null || typeof v === "boolean")
    fail_("INVALID", "Please check " + label + ".");
  const n = Number(v);
  if (!Number.isSafeInteger(n) || n < min || n > max)
    fail_("INVALID", "Please check " + label + ".");
  return n;
}
function id_(v) {
  return text_(v, "record ID", 100, true);
}
function uuid_() {
  return Utilities.getUuid();
}
function now_() {
  return new Date().toISOString();
}
function normalize_(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^a-z0-9#]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}
function addressKey_(s) {
  return normalize_(s)
    .replace(
      /\b(street|road|avenue|drive|boulevard|lane|court)\b/g,
      (v) =>
        ({
          street: "st",
          road: "rd",
          avenue: "ave",
          drive: "dr",
          boulevard: "blvd",
          lane: "ln",
          court: "ct",
        })[v],
    )
    .replace(/\b(apartment|suite)\b/g, "unit")
    .replace(/\bapt\b/g, "unit")
    .replace(/#\s*/g, "unit ")
    .replace(/\bvirginia\b/g, "va")
    .replace(/\bnorth\b/g, "n")
    .replace(/\bsouth\b/g, "s")
    .replace(/\beast\b/g, "e")
    .replace(/\bwest\b/g, "w");
}
function phoneKey_(s) {
  return String(s || "")
    .replace(/\D/g, "")
    .replace(/^1(?=\d{10}$)/, "");
}
function organization_(p) {
  const name = text_(p.organizationName, "organization name", 160, true);
  const email = text_(p.organizationEmail, "organization email", 254, true);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fail_("INVALID", "Please enter a valid organization email.");
  const phone = text_(p.organizationPhone, "organization phone", 40, true);
  if (phoneKey_(phone).length < 7)
    fail_("INVALID", "Please enter an organization phone number.");
  return {
    OrganizationName: name,
    OrganizationKey: normalize_(name),
    OrganizationEmail: email,
    OrganizationPhone: phone,
  };
}
function recipients_(list, admin) {
  if (
    !Array.isArray(list) ||
    !list.length ||
    list.length > MEAL_LIMITS.recipients
  )
    fail_("INVALID", "Enter between 1 and 100 recipients.");
  return list.map((p) => {
    const door = text_(
      p.doorPreference || "Front",
      "door preference",
      20,
      true,
    );
    if (!["Front", "Side", "Back", "Other"].includes(door))
      fail_("INVALID", "Please check the preferred door.");
    if (!admin && p.notes)
      fail_("INVALID", "Internal notes are administrator-only.");
    return {
      RecipientName: text_(p.recipientName, "recipient name", 160, true),
      Address: text_(p.address, "street address", 500, true),
      NormalizedAddress: addressKey_(p.address),
      Phone: text_(p.phone, "recipient phone", 40, false),
      MealCount: integer_(p.mealCount, "number of meals", 1, MEAL_LIMITS.meals),
      DietaryRestrictions: text_(
        p.dietaryRestrictions,
        "dietary restrictions",
        500,
        false,
      ),
      DoorPreference: door,
      DeliveryInstructions: text_(
        p.deliveryInstructions,
        "delivery instructions",
        1000,
        false,
      ),
      Notes: admin ? text_(p.notes, "internal notes", 1000, false) : "",
    };
  });
}
function canonicalSubmission_(p, admin) {
  return {
    EventID: id_(p.eventId),
    organization: organization_(p),
    recipients: recipients_(p.recipients, admin),
  };
}
function fingerprint_(v) {
  return Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    JSON.stringify(v),
    Utilities.Charset.UTF_8,
  )
    .map((n) => ("0" + ((n + 256) % 256).toString(16)).slice(-2))
    .join("");
}
function safeBoundary_(fn) {
  try {
    return { ok: true, data: fn() };
  } catch (e) {
    return {
      ok: false,
      error: {
        code: e.clientSafe ? e.code : "UNAVAILABLE",
        message: e.clientSafe
          ? e.message
          : "Your changes were not saved. Please try again.",
      },
    };
  }
}



// ===== Store.gs =====
const MEAL_SCHEMA = Object.freeze({
  EVENTS: [
    "EventID",
    "EventName",
    "DeliveryDate",
    "Capacity",
    "StartAddress",
    "Status",
    "Archived",
    "ArchivedDate",
    "CreatedAt",
    "UpdatedAt",
    "Version",
    "RouteVersion",
    "RouteNeedsReview",
    "StartAddressStatus",
  ],
  REFERRALS: [
    "ReferralID",
    "EventID",
    "OrganizationName",
    "OrganizationKey",
    "OrganizationEmail",
    "OrganizationPhone",
    "Status",
    "SubmittedAt",
    "UpdatedAt",
    "SubmittedByAdmin",
    "OriginalRequestedMeals",
    "OriginalRecipientCount",
    "Version",
  ],
  RECIPIENTS: [
    "RecipientID",
    "ReferralID",
    "EventID",
    "RecipientName",
    "Address",
    "NormalizedAddress",
    "Phone",
    "MealCount",
    "DietaryRestrictions",
    "DoorPreference",
    "DeliveryInstructions",
    "Notes",
    "DuplicateFlag",
    "RoutePosition",
    "CreatedAt",
    "UpdatedAt",
    "Version",
    "AddressStatus",
    "VerifiedAt",
  ],
  AUDITLOG: [
    "AuditID",
    "Timestamp",
    "Admin",
    "Action",
    "EntityType",
    "EntityID",
    "OldValue",
    "NewValue",
  ],
  ADMINUSERS: ["Email", "Active", "Role"],
  SUBMISSIONS: [
    "SubmissionID",
    "Fingerprint",
    "ReferralID",
    "Receipt",
    "CreatedAt",
  ],
});
const ID_FIELDS = {
  EVENTS: "EventID",
  REFERRALS: "ReferralID",
  RECIPIENTS: "RecipientID",
  AUDITLOG: "AuditID",
  ADMINUSERS: "Email",
  SUBMISSIONS: "SubmissionID",
};
function properties_() {
  return PropertiesService.getScriptProperties();
}
function database_() {
  const p = properties_();
  const id = p.getProperty("MEALS_SPREADSHEET_ID");
  if (!id) fail_("CONFIG", "The meal program is not configured yet.");
  const env = p.getProperty("MEALS_ENV");
  if (!["development", "production"].includes(env))
    fail_("CONFIG", "Set the backend environment before use.");
  if (
    env === "production" &&
    p.getProperty("MEALS_PRODUCTION_ENABLED") !== "true"
  )
    fail_("CONFIG", "Production writes have not been enabled.");
  if (
    env === "development" &&
    id === "1qqXeHVIi5WMqtXMSIYtB9iuV0gPfy_QdGUgLlv8BD2w" &&
    p.getProperty("MEALS_SHARED_SHEET_DEV_ID") !== id
  )
    fail_(
      "CONFIG",
      "Shared-spreadsheet development requires explicit backend configuration.",
    );
  return SpreadsheetApp.openById(id);
}
function load_() {
  const db = database_();
  const state = {};
  const meta = {};
  Object.keys(MEAL_SCHEMA).forEach((name) => {
    const sheet = db.getSheetByName(name);
    if (!sheet) fail_("SCHEMA", "Backend setup is incomplete.");
    const headers = MEAL_SCHEMA[name];
    const raw = sheet
      .getRange(1, 1, Math.max(sheet.getLastRow(), 1), headers.length)
      .getValues();
    if (JSON.stringify(raw[0]) !== JSON.stringify(headers))
      fail_(
        "SCHEMA",
        "Schema mismatch in " + name + ". No changes were saved.",
      );
    const used = new Set();
    const rows = [];
    const positions = {};
    raw.slice(1).forEach((r, i) => {
      if (r.every((v) => v === "")) return;
      const obj = {};
      headers.forEach((h, j) => (obj[h] = r[j]));
      const key = String(obj[ID_FIELDS[name]]);
      if (!key || used.has(key))
        fail_("SCHEMA", "Invalid or duplicate permanent ID in " + name + ".");
      used.add(key);
      rows.push(obj);
      positions[key] = i + 1;
    });
    state[name] = rows;
    meta[name] = {
      sheetId: sheet.getSheetId(),
      positions,
      lastRow: raw.length,
      original: JSON.stringify(rows),
    };
  });
  Object.defineProperty(state, "_meta", { value: meta });
  Object.defineProperty(state, "_db", { value: db.getId() });
  return state;
}
function cell_(v) {
  if (typeof v === "number") return { userEnteredValue: { numberValue: v } };
  if (typeof v === "boolean") return { userEnteredValue: { boolValue: v } };
  return { userEnteredValue: { stringValue: String(v == null ? "" : v) } };
}
function commit_(s) {
  const requests = [];
  Object.keys(MEAL_SCHEMA).forEach((name) => {
    const m = s._meta[name];
    const previous = JSON.parse(m.original);
    const originals = new Map(
      previous.map((r) => [String(r[ID_FIELDS[name]]), r]),
    );
    const added = [];
    s[name].forEach((row) => {
      const key = String(row[ID_FIELDS[name]]);
      const old = originals.get(key);
      if (!old) added.push(row);
      else {
        originals.delete(key);
        if (JSON.stringify(row) !== JSON.stringify(old))
          requests.push({
            updateCells: {
              range: {
                sheetId: m.sheetId,
                startRowIndex: m.positions[key],
                endRowIndex: m.positions[key] + 1,
                startColumnIndex: 0,
                endColumnIndex: MEAL_SCHEMA[name].length,
              },
              rows: [{ values: MEAL_SCHEMA[name].map((h) => cell_(row[h])) }],
              fields: "userEnteredValue",
            },
          });
      }
    });
    if (originals.size) fail_("INTEGRITY", "Record deletion is not supported.");
    if (added.length)
      requests.push({
        appendCells: {
          sheetId: m.sheetId,
          rows: added.map((row) => ({
            values: MEAL_SCHEMA[name].map((h) => cell_(row[h])),
          })),
          fields: "userEnteredValue",
        },
      });
  });
  if (requests.length) Sheets.Spreadsheets.batchUpdate({ requests }, s._db);
}
function locked_(fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000))
    fail_(
      "BUSY",
      "The system is busy. Please try again using the same submission.",
    );
  try {
    const s = load_();
    const value = fn(s);
    commit_(s);
    return value;
  } finally {
    lock.releaseLock();
  }
}
function byId_(s, name, id) {
  const row = s[name].find((r) => String(r[ID_FIELDS[name]]) === String(id));
  if (!row) fail_("NOT_FOUND", "That record could not be found.");
  return row;
}
function version_(row, v) {
  if (Number(row.Version) !== Number(v))
    fail_(
      "CONFLICT",
      "This record changed since you opened it. Refresh before saving.",
    );
}
function touch_(row) {
  row.Version = Number(row.Version) + 1;
  row.UpdatedAt = now_();
}



// ===== Auth.gs =====
function identity_() {
  const active = String(Session.getActiveUser().getEmail() || "").toLowerCase();
  const effective = String(
    Session.getEffectiveUser().getEmail() || "",
  ).toLowerCase();
  if (!active || active !== effective)
    fail_(
      "AUTH",
      "Sign in through the authenticated administrator application. Your Google identity could not be verified.",
    );
  return active;
}
function admin_(s) {
  const email = identity_();
  if (
    !s.ADMINUSERS.some(
      (r) =>
        String(r.Email).toLowerCase() === email &&
        (r.Active === true || r.Active === "true") &&
        r.Role === "admin",
    )
  )
    fail_("FORBIDDEN", "This Google account is not an approved administrator.");
  return email;
}
function requireAdmin_() {
  const email = identity_();
  const s = load_();
  admin_(s);
  return { email, state: s };
}
function testAdminIdentity() {
  return safeBoundary_(() => {
    const a = requireAdmin_();
    return {
      email: a.email,
      environment: properties_().getProperty("MEALS_ENV"),
      authorized: true,
    };
  });
}



// ===== Audit.gs =====
function audit_(s, admin, action, type, id, oldValue, newValue) {
  s.AUDITLOG.push({
    AuditID: uuid_(),
    Timestamp: now_(),
    Admin: admin,
    Action: action,
    EntityType: type,
    EntityID: id,
    OldValue: JSON.stringify(oldValue == null ? null : oldValue),
    NewValue: JSON.stringify(newValue == null ? null : newValue),
  });
}



// ===== Events.gs =====
function reserved_(s, eventId) {
  const active = new Set(
    s.REFERRALS.filter(
      (r) =>
        r.EventID === eventId && ["Pending", "Approved"].includes(r.Status),
    ).map((r) => r.ReferralID),
  );
  return s.RECIPIENTS.filter((r) => active.has(r.ReferralID)).reduce(
    (n, r) => n + Number(r.MealCount),
    0,
  );
}
function available_(s, e) {
  return Number(e.Capacity) - reserved_(s, e.EventID);
}
function editable_(e) {
  if (e.Archived === true || e.Status === "Completed")
    fail_("READ_ONLY", "Reopen or unarchive this event before making changes.");
}
function routeDirty_(e) {
  e.RouteVersion = Number(e.RouteVersion) + 1;
  e.RouteNeedsReview = true;
}
function eventInput_(p) {
  const date = text_(p.deliveryDate, "delivery date", 10, true);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    new Date(date + "T12:00:00Z").toISOString().slice(0, 10) !== date
  )
    fail_("INVALID", "Please check the delivery date.");
  const status = p.status || "Draft";
  if (!["Draft", "Open", "Closed", "Completed"].includes(status))
    fail_("INVALID", "Please check event status.");
  return {
    EventName: text_(p.eventName, "event name", 160, true),
    DeliveryDate: date,
    Capacity: integer_(p.capacity, "meal capacity", 0, 100000),
    StartAddress: text_(p.startAddress, "pickup address", 500, true),
    Status: status,
  };
}
function eventWrite_(s, p, admin) {
  const input = eventInput_(p);
  if (!p.eventId) {
    const e = Object.assign(input, {
      EventID: uuid_(),
      Archived: false,
      ArchivedDate: "",
      CreatedAt: now_(),
      UpdatedAt: now_(),
      Version: 1,
      RouteVersion: 1,
      RouteNeedsReview: true,
      StartAddressStatus: "Needs Review",
    });
    s.EVENTS.push(e);
    audit_(s, admin, "Event Created", "Event", e.EventID, null, input);
    return e;
  }
  const e = byId_(s, "EVENTS", p.eventId);
  editable_(e);
  version_(e, p.version);
  const reserved = reserved_(s, e.EventID);
  if (input.Capacity < reserved)
    fail_(
      "CAPACITY",
      "Capacity cannot be reduced below the " +
        reserved +
        " meals already reserved.",
    );
  const old = {
    EventName: e.EventName,
    DeliveryDate: e.DeliveryDate,
    Capacity: e.Capacity,
    StartAddress: e.StartAddress,
    Status: e.Status,
  };
  if (input.StartAddress !== e.StartAddress) {
    e.StartAddressStatus = "Needs Review";
    routeDirty_(e);
  }
  Object.assign(e, input);
  touch_(e);
  audit_(
    s,
    admin,
    old.Capacity !== e.Capacity ? "Capacity Changed" : "Event Edited",
    "Event",
    e.EventID,
    old,
    input,
  );
  return e;
}
function archiveWrite_(s, p, admin) {
  const e = byId_(s, "EVENTS", p.eventId);
  version_(e, p.version);
  if (p.confirmed !== true)
    fail_("CONFIRM", "Confirm this event action first.");
  const old = { Status: e.Status, Archived: e.Archived };
  if (p.mode === "archive") {
    e.Archived = true;
    e.ArchivedDate = now_();
  } else if (p.mode === "reopen") {
    e.Archived = false;
    e.ArchivedDate = "";
    if (e.Status === "Completed") e.Status = "Closed";
  } else fail_("INVALID", "Unknown event action.");
  touch_(e);
  audit_(
    s,
    admin,
    p.mode === "archive" ? "Event Archived" : "Event Reopened / Unarchived",
    "Event",
    e.EventID,
    old,
    { Status: e.Status, Archived: e.Archived },
  );
  return e;
}
function publicEvents_() {
  const s = load_();
  return s.EVENTS.filter((e) => e.Status === "Open" && e.Archived !== true)
    .map((e) => ({
      eventId: e.EventID,
      eventName: e.EventName,
      deliveryDate: e.DeliveryDate,
      remaining: available_(s, e),
    }))
    .sort((a, b) => a.deliveryDate.localeCompare(b.deliveryDate));
}



// ===== Referrals.gs =====
function referralMeals_(s, id) {
  return s.RECIPIENTS.filter((r) => r.ReferralID === id).reduce(
    (n, r) => n + Number(r.MealCount),
    0,
  );
}
function submit_(p, adminEmail) {
  const canonical = canonicalSubmission_(p, Boolean(adminEmail)),
    submissionId = id_(p.submissionId),
    hash = fingerprint_(canonical);
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      submissionId,
    )
  )
    fail_("INVALID", "A valid submission ID is required.");
  return locked_((s) => {
    if (adminEmail) {
      if (admin_(s) !== adminEmail)
        fail_("AUTH", "Administrator identity changed.");
    }
    const prior = s.SUBMISSIONS.find((r) => r.SubmissionID === submissionId);
    if (prior) {
      if (prior.Fingerprint !== hash)
        fail_(
          "IDEMPOTENCY",
          "This submission ID was already used with different information.",
        );
      return JSON.parse(prior.Receipt);
    }
    const e = byId_(s, "EVENTS", canonical.EventID);
    if (adminEmail) editable_(e);
    else if (e.Status !== "Open" || e.Archived === true)
      fail_("CLOSED", "This event is no longer accepting requests.");
    const meals = canonical.recipients.reduce((n, r) => n + r.MealCount, 0),
      left = available_(s, e);
    if (meals > left)
      fail_(
        "CAPACITY",
        "Only " +
          left +
          " meals remain for this event. Please reduce the request before submitting.",
      );
    const referral = Object.assign(canonical.organization, {
      ReferralID: uuid_(),
      EventID: e.EventID,
      Status: "Pending",
      SubmittedAt: now_(),
      UpdatedAt: now_(),
      SubmittedByAdmin: Boolean(adminEmail),
      OriginalRequestedMeals: meals,
      OriginalRecipientCount: canonical.recipients.length,
      Version: 1,
    });
    s.REFERRALS.push(referral);
    canonical.recipients.forEach((r) =>
      s.RECIPIENTS.push(
        Object.assign(r, {
          RecipientID: uuid_(),
          ReferralID: referral.ReferralID,
          EventID: e.EventID,
          DuplicateFlag: false,
          RoutePosition: "",
          CreatedAt: now_(),
          UpdatedAt: now_(),
          Version: 1,
          AddressStatus: "Needs Review",
          VerifiedAt: "",
        }),
      ),
    );
    refreshDuplicates_(s, e.EventID);
    const receipt = {
      referralId: referral.ReferralID,
      eventName: e.EventName,
      meals,
      recipients: canonical.recipients.length,
      status: "Pending",
    };
    s.SUBMISSIONS.push({
      SubmissionID: submissionId,
      Fingerprint: hash,
      ReferralID: referral.ReferralID,
      Receipt: JSON.stringify(receipt),
      CreatedAt: now_(),
    });
    if (adminEmail)
      audit_(
        s,
        adminEmail,
        "Referral Created",
        "Referral",
        referral.ReferralID,
        null,
        { meals, recipients: canonical.recipients.length },
      );
    return receipt;
  });
}
function statuses_(s, p, admin) {
  if (!["Pending", "Approved", "Rejected"].includes(p.status))
    fail_("INVALID", "Please check referral status.");
  if (
    !Array.isArray(p.referrals) ||
    !p.referrals.length ||
    p.referrals.length > 200
  )
    fail_("INVALID", "Select up to 200 referrals.");
  const seen = new Set();
  const rows = p.referrals.map((x) => {
    const id = id_(x.referralId);
    if (seen.has(id)) fail_("INVALID", "Select each referral once.");
    seen.add(id);
    const r = byId_(s, "REFERRALS", id);
    version_(r, x.version);
    editable_(byId_(s, "EVENTS", r.EventID));
    return r;
  });
  const needed = {};
  rows.forEach((r) => {
    if (r.Status === "Rejected" && p.status !== "Rejected")
      needed[r.EventID] =
        (needed[r.EventID] || 0) + referralMeals_(s, r.ReferralID);
  });
  Object.keys(needed).forEach((id) => {
    if (needed[id] > available_(s, byId_(s, "EVENTS", id)))
      fail_(
        "CAPACITY",
        "There are not enough meals available to restore the selected referrals.",
      );
  });
  rows.forEach((r) => {
    const old = r.Status;
    if (old === p.status) return;
    r.Status = p.status;
    touch_(r);
    const e = byId_(s, "EVENTS", r.EventID);
    if (old === "Approved" || p.status === "Approved") routeDirty_(e);
    audit_(
      s,
      admin,
      "Referral " + (p.status === "Pending" ? "Returned to Pending" : p.status),
      "Referral",
      r.ReferralID,
      old,
      p.status,
    );
  });
  return { updated: rows.length };
}
function editReferral_(s, p, admin) {
  const r = byId_(s, "REFERRALS", p.referralId),
    e = byId_(s, "EVENTS", r.EventID);
  editable_(e);
  version_(r, p.version);
  const org = organization_(p),
    input = recipients_(p.recipients, true),
    existing = s.RECIPIENTS.filter((x) => x.ReferralID === r.ReferralID);
  if (p.recipients.length !== existing.length)
    fail_(
      "INVALID",
      "Use Add Referral to create additional recipient records. Existing recipients cannot be removed.",
    );
  const unique = new Set();
  p.recipients.forEach((x) => {
    const old = existing.find((y) => y.RecipientID === x.recipientId);
    if (!old || unique.has(x.recipientId))
      fail_("INVALID", "Recipient IDs do not match this referral.");
    unique.add(x.recipientId);
    version_(old, x.version);
  });
  const oldMeals = referralMeals_(s, r.ReferralID),
    newMeals = input.reduce((n, x) => n + x.MealCount, 0);
  if (
    ["Pending", "Approved"].includes(r.Status) &&
    newMeals - oldMeals > available_(s, e)
  )
    fail_("CAPACITY", "There are not enough meals available for this edit.");
  const oldOrg = {
    OrganizationName: r.OrganizationName,
    OrganizationEmail: r.OrganizationEmail,
    OrganizationPhone: r.OrganizationPhone,
  };
  Object.assign(r, org);
  touch_(r);
  audit_(s, admin, "Referral Edited", "Referral", r.ReferralID, oldOrg, org);
  input.forEach((x, i) => {
    const old = existing.find(
      (y) => y.RecipientID === p.recipients[i].recipientId,
    );
    const previous = Object.assign({}, old);
    if (old.Address !== x.Address) {
      old.AddressStatus = "Needs Review";
      old.VerifiedAt = "";
    }
    Object.assign(old, x);
    touch_(old);
    audit_(
      s,
      admin,
      "Recipient Edited",
      "Recipient",
      old.RecipientID,
      previous,
      old,
    );
  });
  if (r.Status === "Approved") routeDirty_(e);
  refreshDuplicates_(s, e.EventID);
  return { referralId: r.ReferralID };
}



// ===== Duplicates.gs =====
function similarAddress_(a, b) {
  if (a === b) return Boolean(a);
  const numberA = a.match(/^\d+\w?\b/),
    numberB = b.match(/^\d+\w?\b/);
  if (!numberA || !numberB || numberA[0] !== numberB[0]) return false;
  const unitA = (a.match(/\bunit\s+(\w+)/) || [])[1] || "",
    unitB = (b.match(/\bunit\s+(\w+)/) || [])[1] || "";
  if (unitA !== unitB) return false;
  const first = new Set(a.split(" ")),
    second = new Set(b.split(" "));
  const common = [...first].filter((x) => second.has(x)).length;
  return common / Math.max(first.size, second.size) >= 0.85;
}
function duplicateMatches_(a, b) {
  if (a.RecipientID === b.RecipientID || a.EventID !== b.EventID) return false;
  const address = addressKey_(a.Address),
    other = addressKey_(b.Address);
  const name = normalize_(a.RecipientName) === normalize_(b.RecipientName);
  const phone = phoneKey_(a.Phone);
  return Boolean(
    (address && similarAddress_(address, other)) ||
    (name && phone && phone === phoneKey_(b.Phone)),
  );
}
function refreshDuplicates_(s, eventId) {
  const rows = s.RECIPIENTS.filter((r) => r.EventID === eventId);
  rows.forEach(
    (a) => (a.DuplicateFlag = rows.some((b) => duplicateMatches_(a, b))),
  );
}
function matchesFor_(s, r) {
  return s.RECIPIENTS.filter((b) => duplicateMatches_(r, b)).map((b) => ({
    recipientId: b.RecipientID,
    referralId: b.ReferralID,
    recipientName: b.RecipientName,
    address: b.Address,
  }));
}



// ===== Reports.gs =====
function reports_(s, p) {
  const events = s.EVENTS.filter(
    (e) =>
      (!p.eventId || e.EventID === p.eventId) &&
      (!p.year || e.DeliveryDate.slice(0, 4) === String(p.year)),
  );
  const ids = new Set(events.map((e) => e.EventID)),
    refs = s.REFERRALS.filter((r) => ids.has(r.EventID));
  const rows = s.RECIPIENTS.filter((r) => ids.has(r.EventID));
  const totals = {
    events: events.length,
    originallyRequestedMeals: refs.reduce(
      (n, r) => n + Number(r.OriginalRequestedMeals),
      0,
    ),
    currentlyReservedMeals: 0,
    approvedMeals: 0,
    rejectedMeals: 0,
    recipientRecords: rows.length,
    approvedStops: 0,
    organizations: 0,
  };
  const organizations = {};
  refs.forEach((r) => {
    const meals = referralMeals_(s, r.ReferralID);
    if (r.Status !== "Rejected") totals.currentlyReservedMeals += meals;
    if (r.Status === "Approved") {
      totals.approvedMeals += meals;
      totals.approvedStops += rows.filter(
        (x) => x.ReferralID === r.ReferralID,
      ).length;
    }
    if (r.Status === "Rejected") totals.rejectedMeals += meals;
    const key = r.OrganizationKey;
    if (!organizations[key])
      organizations[key] = {
        name: r.OrganizationName,
        referrals: 0,
        originallyRequestedMeals: 0,
        currentMeals: 0,
      };
    organizations[key].referrals++;
    organizations[key].originallyRequestedMeals += Number(
      r.OriginalRequestedMeals,
    );
    organizations[key].currentMeals += meals;
  });
  totals.organizations = Object.keys(organizations).length;
  return {
    totals,
    organizations: Object.values(organizations).sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
  };
}
function dashboard_(s, p) {
  const e = byId_(s, "EVENTS", p.eventId),
    refs = s.REFERRALS.filter((r) => r.EventID === e.EventID),
    recipients = s.RECIPIENTS.filter((r) => r.EventID === e.EventID);
  return {
    event: e,
    capacity: Number(e.Capacity),
    reserved: reserved_(s, e.EventID),
    available: available_(s, e),
    pendingReferrals: refs.filter((r) => r.Status === "Pending").length,
    approvedReferrals: refs.filter((r) => r.Status === "Approved").length,
    deliveryStops: recipients.filter((x) =>
      refs.some(
        (r) => r.ReferralID === x.ReferralID && r.Status === "Approved",
      ),
    ).length,
    referrals: refs.map((r) =>
      Object.assign({}, r, {
        meals: referralMeals_(s, r.ReferralID),
        recipients: recipients
          .filter((x) => x.ReferralID === r.ReferralID)
          .map((x) => Object.assign({}, x, { matches: matchesFor_(s, x) })),
      }),
    ),
  };
}



// ===== Addresses.gs =====
function mapsEnabled_() {
  if (properties_().getProperty("MEALS_MAPS_LIVE_ENABLED") !== "true")
    fail_(
      "API_DISABLED",
      "Live Maps APIs are disabled. Separate billing/API approval and configuration are required.",
    );
}
function addressLookup_(address) {
  mapsEnabled_();
  const key = properties_().getProperty("MEALS_ADDRESS_API_KEY");
  if (!key) fail_("CONFIG", "Address Validation is not configured.");
  mapsUsage_("validation", 1);
  const response = UrlFetchApp.fetch(
    "https://addressvalidation.googleapis.com/v1:validateAddress",
    {
      method: "post",
      contentType: "application/json",
      headers: { "X-Goog-Api-Key": key },
      payload: JSON.stringify({
        address: { regionCode: "US", addressLines: [address] },
      }),
      muteHttpExceptions: true,
    },
  );
  if (response.getResponseCode() !== 200)
    fail_("MAPS", "This address could not be confirmed. Please review it.");
  const result = JSON.parse(response.getContentText()).result || {},
    v = result.verdict || {},
    geo = result.geocode || {};
  const confirmed =
    v.addressComplete === true &&
    !v.hasUnconfirmedComponents &&
    !v.hasInferredComponents &&
    !v.hasReplacedComponents &&
    ["PREMISE", "SUB_PREMISE"].includes(v.validationGranularity) &&
    geo.location;
  return {
    confirmed: Boolean(confirmed),
    latitude: confirmed ? geo.location.latitude : "",
    longitude: confirmed ? geo.location.longitude : "",
  };
}
function verifyAddress_(p) {
  const a = requireAdmin_(),
    isStart = p.entity === "event",
    r = byId_(
      a.state,
      isStart ? "EVENTS" : "RECIPIENTS",
      isStart ? p.eventId : p.recipientId,
    ),
    e = isStart ? r : byId_(a.state, "EVENTS", r.EventID);
  editable_(e);
  version_(r, p.version);
  const address = isStart ? r.StartAddress : r.Address;
  const lookup = addressLookup_(address);
  return locked_((s) => {
    const admin = admin_(s),
      row = byId_(
        s,
        isStart ? "EVENTS" : "RECIPIENTS",
        isStart ? p.eventId : p.recipientId,
      ),
      event = isStart ? row : byId_(s, "EVENTS", row.EventID);
    editable_(event);
    version_(row, p.version);
    const old = isStart ? row.StartAddressStatus : row.AddressStatus;
    if (isStart) {
      row.StartAddressStatus = lookup.confirmed ? "Confirmed" : "Needs Review";
    } else {
      row.AddressStatus = lookup.confirmed ? "Confirmed" : "Needs Review";
      row.VerifiedAt = now_();
    }
    touch_(row);
    routeDirty_(event);
    audit_(
      s,
      admin,
      "Address Reviewed",
      isStart ? "Event" : "Recipient",
      isStart ? row.EventID : row.RecipientID,
      old,
      lookup.confirmed ? "Confirmed" : "Needs Review",
    );
    return {
      confirmed: lookup.confirmed,
      message: lookup.confirmed ? "Address confirmed." : "Address Needs Review",
    };
  });
}
// Reserve usage before the external call; failed calls count conservatively.
// No names, addresses or credentials are included in counters.
function mapsUsage_(kind, units) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000))
    fail_("BUSY", "The system is busy. Try again shortly.");
  try {
    const p = properties_(),
      date = now_().slice(0, 10),
      month = date.slice(0, 7);
    let daily, monthly;
    try {
      daily = JSON.parse(p.getProperty("MEALS_MAPS_USAGE_DAY") || "{}");
      monthly = JSON.parse(p.getProperty("MEALS_MAPS_USAGE_MONTH") || "{}");
    } catch (_) {
      fail_("CONFIG", "Maps usage counters need administrator review.");
    }
    if (daily.date !== date) daily = { date, validation: 0, optimization: 0 };
    if (monthly.month !== month)
      monthly = { month, validation: 0, optimization: 0 };
    const dailyLimit = kind === "validation" ? 300 : 500,
      monthLimit = 3000;
    if (
      (daily[kind] || 0) + units > dailyLimit ||
      (monthly[kind] || 0) + units > monthLimit
    )
      fail_(
        "API_QUOTA",
        "The configured Maps usage limit has been reached. No additional API call was made.",
      );
    daily[kind] = (daily[kind] || 0) + units;
    monthly[kind] = (monthly[kind] || 0) + units;
    p.setProperty("MEALS_MAPS_USAGE_DAY", JSON.stringify(daily));
    p.setProperty("MEALS_MAPS_USAGE_MONTH", JSON.stringify(monthly));
  } finally {
    lock.releaseLock();
  }
}

// Manual review is an explicit admin attestation, never a Google geocode result.
function addressReviewed_(status) {
  return status === "Confirmed" || status === "Manually Reviewed";
}
function manualAddressReview_(s, p, admin) {
  if (p.confirmed !== true)
    fail_(
      "CONFIRM",
      "Confirm that you checked the saved address before marking it reviewed.",
    );
  if (!["event", "recipient"].includes(p.entity))
    fail_("INVALID", "Please select an address to review.");
  const isStart = p.entity === "event",
    row = byId_(
      s,
      isStart ? "EVENTS" : "RECIPIENTS",
      isStart ? p.eventId : p.recipientId,
    ),
    event = isStart ? row : byId_(s, "EVENTS", row.EventID);
  editable_(event);
  version_(row, p.version);
  const old = isStart ? row.StartAddressStatus : row.AddressStatus;
  if (isStart) row.StartAddressStatus = "Manually Reviewed";
  else {
    row.AddressStatus = "Manually Reviewed";
    row.VerifiedAt = now_();
  }
  touch_(row);
  routeDirty_(event);
  audit_(
    s,
    admin,
    "Address Manually Reviewed",
    isStart ? "Event" : "Recipient",
    isStart ? row.EventID : row.RecipientID,
    old,
    "Manually Reviewed",
  );
  return {
    reviewed: true,
    message:
      "Saved address manually reviewed; Google validation was not performed.",
  };
}



// ===== Routing.gs =====
function approvedStops_(s, eventId) {
  const ids = new Set(
    s.REFERRALS.filter(
      (r) => r.EventID === eventId && r.Status === "Approved",
    ).map((r) => r.ReferralID),
  );
  return s.RECIPIENTS.filter(
    (r) => r.EventID === eventId && ids.has(r.ReferralID),
  );
}
function route_(s, eventId) {
  const e = byId_(s, "EVENTS", eventId);
  const rows = approvedStops_(s, eventId).sort(
    (a, b) =>
      (Number(a.RoutePosition) || 1e9) - (Number(b.RoutePosition) || 1e9) ||
      a.CreatedAt.localeCompare(b.CreatedAt) ||
      a.RecipientID.localeCompare(b.RecipientID),
  );
  let running = 0;
  const stops = rows.map((r, i) => ({
    recipientId: r.RecipientID,
    stop: i + 1,
    recipientName: r.RecipientName,
    address: r.Address,
    phone: r.Phone,
    meals: Number(r.MealCount),
    runningMeals: (running += Number(r.MealCount)),
    dietaryRestrictions: r.DietaryRestrictions,
    doorPreference: r.DoorPreference,
    deliveryInstructions: r.DeliveryInstructions,
    addressStatus: r.AddressStatus,
  }));
  const unresolved = stops.filter((r) => !addressReviewed_(r.addressStatus));
  return {
    eventId: e.EventID,
    eventName: e.EventName,
    deliveryDate: e.DeliveryDate,
    startAddress: e.StartAddress,
    startAddressStatus: e.StartAddressStatus,
    version: Number(e.RouteVersion),
    readOnly: e.Archived === true || e.Status === "Completed",
    needsReview: Boolean(e.RouteNeedsReview),
    mapsEnabled:
      properties_().getProperty("MEALS_MAPS_LIVE_ENABLED") === "true",
    isFinal:
      !e.RouteNeedsReview &&
      addressReviewed_(e.StartAddressStatus) &&
      !unresolved.length,
    unresolved,
    stops,
    totalMeals: running,
  };
}
function routeOrder_(s, p, admin, optimized) {
  const e = byId_(s, "EVENTS", p.eventId);
  editable_(e);
  if (Number(e.RouteVersion) !== Number(p.routeVersion))
    fail_(
      "CONFLICT",
      "The delivery route changed. Refresh before saving this order.",
    );
  const stops = approvedStops_(s, e.EventID),
    ids = stops.map((r) => r.RecipientID),
    order = p.recipientIds;
  if (
    !Array.isArray(order) ||
    order.length !== ids.length ||
    new Set(order).size !== ids.length ||
    order.some((id) => !ids.includes(id))
  )
    fail_(
      "INVALID",
      "The route must include every approved recipient exactly once.",
    );
  const old = stops
    .slice()
    .sort(
      (a, b) =>
        (Number(a.RoutePosition) || 1e9) - (Number(b.RoutePosition) || 1e9),
    )
    .map((r) => r.RecipientID);
  order.forEach((id, i) => {
    const r = byId_(s, "RECIPIENTS", id);
    r.RoutePosition = i + 1;
  });
  e.RouteVersion = Number(e.RouteVersion) + 1;
  e.RouteNeedsReview =
    stops.some((r) => !addressReviewed_(r.AddressStatus)) ||
    !addressReviewed_(e.StartAddressStatus);
  audit_(
    s,
    admin,
    optimized ? "Route Optimized" : "Route Reordered",
    "Event",
    e.EventID,
    old,
    order,
  );
  return route_(s, e.EventID);
}
function optimize_(p) {
  const a = requireAdmin_(),
    e = byId_(a.state, "EVENTS", p.eventId);
  editable_(e);
  if (Number(p.routeVersion) !== Number(e.RouteVersion))
    fail_("CONFLICT", "The delivery route changed. Refresh before optimizing.");
  const stops = approvedStops_(a.state, e.EventID);
  if (!stops.length)
    fail_("INVALID", "Approve at least one recipient before optimizing.");
  if (
    !addressReviewed_(e.StartAddressStatus) ||
    stops.some((r) => !addressReviewed_(r.AddressStatus))
  )
    fail_(
      "ADDRESS_REVIEW",
      "Address Needs Review. Confirm the pickup address and every approved recipient before optimization.",
    );
  mapsEnabled_();
  const project = properties_().getProperty("MEALS_CLOUD_PROJECT_ID");
  if (!project) fail_("CONFIG", "Route Optimization is not configured.");
  // Google-derived coordinates stay transient: never write them to Sheets or audit history.
  const pickup = addressLookup_(e.StartAddress);
  const locations = stops.map((r) => addressLookup_(r.Address));
  if (!pickup.confirmed || locations.some((x) => !x.confirmed))
    fail_(
      "ADDRESS_REVIEW",
      "An address could not be reconfirmed. Review the addresses before routing.",
    );
  const start = new Date(Date.now() + 60000),
    end = new Date(start.getTime() + 86400000);
  const payload = {
    model: {
      globalStartTime: start.toISOString(),
      globalEndTime: end.toISOString(),
      vehicles: [
        {
          startLocation: {
            latitude: pickup.latitude,
            longitude: pickup.longitude,
          },
          costPerHour: 1,
        },
      ],
      shipments: stops.map((r, i) => ({
        label: r.RecipientID,
        deliveries: [
          {
            arrivalLocation: {
              latitude: locations[i].latitude,
              longitude: locations[i].longitude,
            },
          },
        ],
      })),
    },
    timeout: "30s",
  };
  mapsUsage_("optimization", stops.length);
  const res = UrlFetchApp.fetch(
    "https://routeoptimization.googleapis.com/v1/projects/" +
      encodeURIComponent(project) +
      ":optimizeTours",
    {
      method: "post",
      contentType: "application/json",
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    },
  );
  if (res.getResponseCode() !== 200)
    fail_(
      "MAPS",
      "The route could not be optimized. The previous order is unchanged.",
    );
  const result = JSON.parse(res.getContentText());
  if ((result.skippedShipments || []).length)
    fail_(
      "MAPS",
      "The routing service could not include every stop. The previous order is unchanged.",
    );
  const visits = (result.routes || []).flatMap((r) => r.visits || []);
  const ids = visits.map(
    (v) => v.shipmentLabel || (stops[v.shipmentIndex || 0] || {}).RecipientID,
  );
  return locked_((s) =>
    routeOrder_(
      s,
      { eventId: e.EventID, routeVersion: p.routeVersion, recipientIds: ids },
      admin_(s),
      true,
    ),
  );
}



// ===== Schema.gs =====
// Editor-only helpers: names ending in _ cannot be called with google.script.run.
function schemaPlan_() {
  const db = database_();
  const plans = [];
  Object.keys(MEAL_SCHEMA).forEach((name) => {
    const sheet = db.getSheetByName(name);
    if (!sheet)
      plans.push({ name, action: "create", headers: MEAL_SCHEMA[name] });
    else {
      const header = sheet
        .getRange(1, 1, 1, MEAL_SCHEMA[name].length)
        .getValues()[0];
      if (JSON.stringify(header) !== JSON.stringify(MEAL_SCHEMA[name]))
        fail_(
          "SCHEMA",
          "Existing " +
            name +
            " headers differ. No automatic overwrite is allowed.",
        );
      plans.push({ name, action: "preserve" });
    }
  });
  return plans;
}
function setupDevelopmentSchema_() {
  const p = properties_();
  if (
    p.getProperty("MEALS_ENV") !== "development" ||
    p.getProperty("MEALS_ALLOW_SCHEMA_SETUP") !== "true"
  )
    fail_("CONFIG", "Development schema setup is not explicitly enabled.");
  const email = identity_();
  const bootstrap = String(p.getProperty("MEALS_BOOTSTRAP_ADMIN_EMAILS") || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (
    !bootstrap.includes(email) ||
    bootstrap.length !== 2 ||
    new Set(bootstrap).size !== 2
  )
    fail_(
      "AUTH",
      "Configure exactly two administrator accounts securely in Script Properties.",
    );
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) fail_("BUSY", "Try setup again.");
  try {
    const db = database_(),
      plan = schemaPlan_();
    let next =
      Math.max.apply(
        null,
        db
          .getSheets()
          .map((s) => s.getSheetId())
          .concat([0]),
      ) + 1;
    const requests = [];
    plan
      .filter((x) => x.action === "create")
      .forEach((x) => {
        const sid = next++;
        requests.push({
          addSheet: { properties: { sheetId: sid, title: x.name } },
        });
        const rows = [{ values: x.headers.map(cell_) }];
        if (x.name === "ADMINUSERS")
          bootstrap.forEach((email) =>
            rows.push({ values: [cell_(email), cell_(true), cell_("admin")] }),
          );
        requests.push({
          updateCells: {
            start: { sheetId: sid, rowIndex: 0, columnIndex: 0 },
            rows,
            fields: "userEnteredValue",
          },
        });
      });
    // Connector-created headers may already exist. Bootstrap only an empty
    // ADMINUSERS tab; never overwrite or replace an existing account record.
    const admins = db.getSheetByName("ADMINUSERS");
    if (admins && admins.getLastRow() === 1) {
      requests.push({
        appendCells: {
          sheetId: admins.getSheetId(),
          rows: bootstrap.map((email) => ({
            values: [cell_(email), cell_(true), cell_("admin")],
          })),
          fields: "userEnteredValue",
        },
      });
    }
    if (requests.length)
      Sheets.Spreadsheets.batchUpdate({ requests }, db.getId());
    return plan;
  } finally {
    lock.releaseLock();
  }
}
function legacyMigrationPlan_() {
  const db = database_(),
    sheet = db.getSheetByName("Requests");
  if (!sheet)
    return {
      records: 0,
      action: "No legacy Requests tab in this development spreadsheet.",
    };
  const rows = sheet
    .getRange(1, 1, Math.max(sheet.getLastRow(), 1), sheet.getLastColumn())
    .getValues();
  const comments = rows[0].indexOf("Comments");
  return {
    records: rows.slice(1).filter((r) => r.some((v) => v !== "")).length,
    recordsWithComments:
      comments < 0
        ? 0
        : rows.slice(1).filter((r) => String(r[comments] || "").trim()).length,
    headers: rows[0],
    proposedMapping: {
      Name: "RecipientName",
      "Address Raw": "Address",
      Phone: "Phone",
      "Dietary Restrictions": "DietaryRestrictions",
      "Door Of Entry": "DoorPreference",
      Comments:
        "UNRESOLVED: preserve original field; obtain explicit mapping approval",
    },
    missingFields: [
      "Event assignment",
      "Organization details",
      "Meal quantities",
      "Permanent IDs",
    ],
    canMigrate: false,
    message:
      "Legacy tabs remain untouched. Do not import until event, organization, quantities and Comments mapping are explicitly approved.",
  };
}

