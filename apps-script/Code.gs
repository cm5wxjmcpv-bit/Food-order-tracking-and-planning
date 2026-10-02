function include_(name) {
  return HtmlService.createHtmlOutputFromFile(name).getContent();
}
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
    return HtmlService.createTemplateFromFile("Admin")
      .evaluate()
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
