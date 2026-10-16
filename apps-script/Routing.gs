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

function driverGroup_(recipient) {
  const match = String(recipient.RoutePosition || "").match(/^([12]):([1-9][0-9]*)$/);
  return match ? Number(match[1]) : 1;
}
function driverPosition_(recipient) {
  const raw = String(recipient.RoutePosition || "");
  const match = raw.match(/^([12]):([1-9][0-9]*)$/);
  if (match) return Number(match[2]);
  const legacy = Number(raw);
  return Number.isSafeInteger(legacy) && legacy > 0 ? legacy : 1e9;
}
function orderedApprovedStops_(s, eventId) {
  return approvedStops_(s, eventId).sort((a,b) =>
    driverGroup_(a) - driverGroup_(b) ||
    driverPosition_(a) - driverPosition_(b) ||
    a.CreatedAt.localeCompare(b.CreatedAt) ||
    a.RecipientID.localeCompare(b.RecipientID)
  );
}
function route_(s, eventId) {
  const e = byId_(s, "EVENTS", eventId);
  const rows = orderedApprovedStops_(s, eventId);
  const grouped = new Map([[1,[]], [2,[]]]);
  rows.forEach(r => grouped.get(driverGroup_(r)).push(r));
  const routes = [...grouped].filter(([driver,group]) => driver === 1 || group.length)
    .map(([driver,group]) => {
      let running = 0;
      const stops = group.map((r,i) => ({
        recipientId: r.RecipientID,
        stop: i+1, driver,
        recipientName: r.RecipientName, address: r.Address, phone: r.Phone,
        meals: Number(r.MealCount),
        runningMeals: (running += Number(r.MealCount)),
        dietaryRestrictions: r.DietaryRestrictions, doorPreference: r.DoorPreference,
        deliveryInstructions: r.DeliveryInstructions,
        addressStatus: r.AddressStatus,
      }));
      return {driver, label: "Driver " + driver,
        stops, totalMeals: running,
        unresolved: stops.filter(x => !addressReviewed_(x.addressStatus)),
      };
    });
  const stops = routes.flatMap(r => r.stops);
  const unresolved = stops.filter(r => !addressReviewed_(r.addressStatus));
  return {
    eventId: e.EventID, eventName: e.EventName, deliveryDate: e.DeliveryDate,
    startAddress: e.StartAddress, startAddressStatus: e.StartAddressStatus,
    version: Number(e.RouteVersion),
    readOnly: e.Archived === true || e.Status === "Completed",
    needsReview: Boolean(e.RouteNeedsReview),
    mapsEnabled: properties_().getProperty("MEALS_MAPS_LIVE_ENABLED") === "true",
    isFinal: !e.RouteNeedsReview && addressReviewed_(e.StartAddressStatus) &&
      !unresolved.length,
    unresolved, stops, routes,
    totalMeals: routes.reduce((n,r) => n+r.totalMeals,0),
  };
}
function routeOrder_(s, p, admin, optimized) {
  const e = byId_(s, "EVENTS", p.eventId);
  editable_(e);
  if (Number(e.RouteVersion) !== Number(p.routeVersion))
    fail_("CONFLICT", "The delivery route changed. Refresh before saving this order.");
  const rows = approvedStops_(s, e.EventID);
  const ids = new Set(rows.map(r => r.RecipientID)), order = p.recipientIds;
  if (!Array.isArray(order) || order.length !== rows.length ||
      new Set(order).size !== rows.length || order.some(id => !ids.has(id)))
    fail_("INVALID", "Both driver routes must contain every approved recipient exactly once.");
  const old = orderedApprovedStops_(s,e.EventID).map(r=>r.RecipientID);
  const groupById = new Map(rows.map(r=>[r.RecipientID,driverGroup_(r)]));
  let previousDriver = 1;
  const counts = {1:0,2:0};
  order.forEach(id => {
    const driver = groupById.get(id);
    if (driver < previousDriver)
      fail_("INVALID", "Keep Driver 1 and Driver 2 stops in their respective routes.");
    previousDriver = driver;
    const recipient = rows.find(r=>r.RecipientID===id);
    recipient.RoutePosition = driver + ":" + (++counts[driver]);
  });
  e.RouteVersion = Number(e.RouteVersion)+1;
  e.RouteNeedsReview = rows.some(r=>!addressReviewed_(r.AddressStatus)) ||
    !addressReviewed_(e.StartAddressStatus);
  audit_(s,admin,optimized?"Route Optimized":"Route Reordered",
    "Event",e.EventID,old,order);
  return route_(s,e.EventID);
}
/** The selection is the complete Driver 2 group; everything else is Driver 1. */
function splitRoute_(s,p,admin) {
  const e=byId_(s,"EVENTS",id_(p.eventId));
  editable_(e);
  if(Number(p.routeVersion)!==Number(e.RouteVersion))
    fail_("CONFLICT","The route changed. Refresh before splitting.");
  const rows=orderedApprovedStops_(s,e.EventID);
  const requested=p.driver2Ids;
  if(!Array.isArray(requested) || requested.length>rows.length ||
     requested.some(x=>typeof x!=="string") ||
     new Set(requested).size!==requested.length)
    fail_("INVALID","Choose each Driver 2 address only once.");
  const approvedIds=new Set(rows.map(r=>r.RecipientID));
  if(requested.some(id=>!approvedIds.has(id)))
    fail_("INVALID","The selected address is not an approved delivery stop.");
  if(requested.length===rows.length && rows.length)
    fail_("INVALID","Leave at least one delivery for Driver 1.");
  const chosen=new Set(requested),before=rows.map(r=>({
    id:r.RecipientID,driver:driverGroup_(r)
  }));
  const counts={1:0,2:0};
  rows.forEach(r=>{
    const group=chosen.has(r.RecipientID)?2:1;
    r.RoutePosition=group+":"+(++counts[group]);
  });
  e.RouteVersion=Number(e.RouteVersion)+1;
  e.RouteNeedsReview=true;
  audit_(s,admin,requested.length?"Route Split":"Route Split Cleared",
    "Event",e.EventID,before,rows.map(r=>({id:r.RecipientID,driver:driverGroup_(r)})));
  return route_(s,e.EventID);
}
function optimize_(p) {
  const a = requireAdmin_(),
    e = byId_(a.state, "EVENTS", p.eventId);
  editable_(e);
  if (Number(p.routeVersion) !== Number(e.RouteVersion))
    fail_("CONFLICT", "The delivery route changed. Refresh before optimizing.");
  const driver = p.driver == null ? 1 : integer_(p.driver,"driver",1,2);
  const stops = approvedStops_(a.state, e.EventID).filter(r=>driverGroup_(r)===driver);
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
  // Route Optimization rejects nonzero timestamp nanos (millisecond fractions).
  const start = new Date(Math.floor(Date.now() / 1000) * 1000 + 60000),
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
    fail_("MAPS", routingFailureMessage_(res));
  const result = JSON.parse(res.getContentText());
  if ((result.skippedShipments || []).length)
    fail_(
      "MAPS",
      "The routing service could not include every stop. The previous order is unchanged.",
    );
  const visits = (result.routes || []).flatMap((r) => r.visits || []);
  const ids = visits.map(v =>
    v.shipmentLabel || (stops[v.shipmentIndex || 0] || {}).RecipientID);
  // Optimize only the chosen driver's stops and preserve the other driver's
  // assignments and order. The locked write rechecks the route version.
  const all = route_(a.state,e.EventID).stops;
  const remaining = all.filter(r=>r.driver!==driver).map(r=>r.recipientId);
  const fullOrder = driver===1 ? ids.concat(remaining) : remaining.concat(ids);
  return locked_(s=>routeOrder_(s,
    {eventId:e.EventID,routeVersion:p.routeVersion,recipientIds:fullOrder},
    admin_(s),true));
}

// Return only bounded machine codes. Never expose Google's raw message/body.
function routingFailureMessage_(response) {
  let error = {};
  try { error = JSON.parse(response.getContentText()).error || {}; } catch (_) {}
  const safeCode = value => /^[A-Z][A-Z0-9_]{0,80}$/.test(String(value || "")) ? String(value) : "";
  const details = Array.isArray(error.details) ? error.details.slice(0, 5) : [];
  const codes = [safeCode(error.status), ...details.map(d => safeCode(d && d.reason))].filter(Boolean);
  let guidance = "";
  if (codes.includes("ACCESS_TOKEN_SCOPE_INSUFFICIENT"))
    guidance = " Authorize Google Cloud routing permission and deploy a New version with the updated appsscript.json.";
  else if (codes.includes("SERVICE_DISABLED"))
    guidance = " Enable Route Optimization API in the configured Google Cloud project.";
  else if (codes.includes("BILLING_DISABLED"))
    guidance = " Check billing on the configured Google Cloud project.";
  return "Route optimization failed: HTTP " + response.getResponseCode() +
    (codes.length ? " — " + codes.join(" / ") : "") + "." + guidance +
    " The previous order is unchanged.";
}
function checkRoutingConnection() {
  requireAdmin_();
  const project = properties_().getProperty("MEALS_CLOUD_PROJECT_ID");
  if (!project) fail_("CONFIG", "MEALS_CLOUD_PROJECT_ID is missing.");
  const response = UrlFetchApp.fetch(
    "https://routeoptimization.googleapis.com/v1/projects/" + encodeURIComponent(project) + ":optimizeTours",
    {
      method: "post", contentType: "application/json",
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      payload: JSON.stringify({ solvingMode: "VALIDATE_ONLY", model: {
        vehicles: [{ startLocation: { latitude: 36.69, longitude: -79.87 }, costPerHour: 1 }], shipments: []
      }}), muteHttpExceptions: true
    }
  );
  const message = response.getResponseCode() === 200 ? "Routing connection: HTTP 200 | OK" : routingFailureMessage_(response);
  console.log(message);
  return message;
}
function authorizeRouting() {
  requireAdmin_();
  ScriptApp.requireScopes(ScriptApp.AuthMode.FULL, ["https://www.googleapis.com/auth/cloud-platform"]);
  return checkRoutingConnection();
}
