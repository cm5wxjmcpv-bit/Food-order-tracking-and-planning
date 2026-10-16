function referralMeals_(s, id) {
  return linkedRecipients_(s).filter((r) => r.ReferralID === id).reduce(
    (n, r) => n + Number(r.MealCount),
    0,
  );
}
function submit_(p, adminEmail) {
  const canonical = canonicalSubmission_(p, Boolean(adminEmail)),
    submissionId = submissionId_(p.submissionId),
    hash = fingerprint_(canonical);
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
      return savedSubmissionReceipt_(s, prior);
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
    canonical.recipients.forEach((r, i) =>
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
          AddressStatus: addressProofStatus_(
            r.Address,
            p.recipients[i].addressReceipt,
          ),
          VerifiedAt:
            addressProofStatus_(r.Address, p.recipients[i].addressReceipt) ===
            "Confirmed"
              ? now_()
              : "",
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
    if (p.recipients[i].addressReceipt) {
      old.AddressStatus = addressProofStatus_(
        x.Address,
        p.recipients[i].addressReceipt,
      );
      old.VerifiedAt = old.AddressStatus === "Confirmed" ? now_() : "";
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

/** Read only active approved deliveries from a previously archived event. */
function archivedRecipients_(s, p) {
  const e = byId_(s, "EVENTS", id_(p.eventId));
  if (e.Archived !== true)
    fail_("INVALID", "Choose an archived event.");
  const refs = new Map(s.REFERRALS.filter(r =>
    r.EventID === e.EventID && r.Status === "Approved"
  ).map(r => [r.ReferralID, r]));
  return {
    eventId: e.EventID, eventName: e.EventName,
    recipients: linkedRecipients_(s)
      .filter(r => r.EventID === e.EventID && refs.has(r.ReferralID))
      .map(r => ({
        recipientId: r.RecipientID,
        name: r.RecipientName,
        address: r.Address,
        meals: Number(r.MealCount),
        organization: refs.get(r.ReferralID).OrganizationName,
      }))
      .sort((a,b) => a.name.localeCompare(b.name) || a.address.localeCompare(b.address)),
  };
}

/** Creates new event-specific records, never moves or changes archived history. */
function copyArchivedRecipients_(s, p, admin) {
  const sourceId = id_(p.sourceEventId),
    targetId = id_(p.targetEventId),
    batchId = submissionId_(p.batchId),
    source = byId_(s, "EVENTS", sourceId),
    target = byId_(s, "EVENTS", targetId);
  if (source.Archived !== true || sourceId === targetId)
    fail_("INVALID", "Choose an archived source and a different destination.");
  editable_(target);
  if (!Array.isArray(p.recipientIds) || !p.recipientIds.length ||
      p.recipientIds.length > MEAL_LIMITS.recipients)
    fail_("INVALID", "Select between 1 and 100 archived recipients.");
  const ids = p.recipientIds.map(id_), unique = new Set(ids);
  if (ids.length !== unique.size)
    fail_("INVALID", "Each recipient may be selected only once.");
  const fingerprint = fingerprint_({sourceId, targetId, ids: ids.slice().sort()});
  const prior = s.AUDITLOG.find(a =>
    a.Action === "Archived Recipients Copied" && a.EntityID === batchId);
  if (prior) {
    const info = JSON.parse(prior.NewValue);
    if (info.fingerprint !== fingerprint)
      fail_("IDEMPOTENCY", "This copy request ID was already used.");
    return info.result;
  }
  const sourceRefs = new Map(s.REFERRALS.filter(r =>
    r.EventID === sourceId && r.Status === "Approved"
  ).map(r => [r.ReferralID,r]));
  const sourceRows = new Map(linkedRecipients_(s).filter(r =>
    r.EventID === sourceId && sourceRefs.has(r.ReferralID)
  ).map(r => [r.RecipientID,r]));
  const selected = ids.map(id => {
    const row = sourceRows.get(id);
    if (!row) fail_("INVALID", "A selected recipient is not part of this archived event.");
    return row;
  });
  const personKey = r => normalize_(r.RecipientName) + "|" + addressKey_(r.Address);
  const existing = new Set(linkedRecipients_(s)
    .filter(r => r.EventID === targetId).map(personKey));
  const batchKeys = new Set();
  selected.forEach(r => {
    const key = personKey(r);
    if (existing.has(key) || batchKeys.has(key))
      fail_("DUPLICATE", "One or more selected recipients are already in the destination event, or selected more than once. Review your selection before copying.");
    batchKeys.add(key);
  });
  const meals = selected.reduce((sum,r) => sum + Number(r.MealCount), 0);
  if (meals > available_(s, target))
    fail_("CAPACITY", "The new event does not have enough available meals for this selection.");
  const grouped = new Map();
  selected.forEach(r => {
    if (!grouped.has(r.ReferralID)) grouped.set(r.ReferralID, []);
    grouped.get(r.ReferralID).push(r);
  });
  const created = [], now = now_();
  grouped.forEach((children, referralId) => {
    const origin = sourceRefs.get(referralId);
    const parent = {
      ReferralID: uuid_(), EventID: targetId,
      OrganizationName: origin.OrganizationName,
      OrganizationKey: origin.OrganizationKey,
      OrganizationEmail: origin.OrganizationEmail,
      OrganizationPhone: origin.OrganizationPhone,
      Status: "Pending", SubmittedAt: now, UpdatedAt: now,
      SubmittedByAdmin: true,
      OriginalRequestedMeals: children.reduce((n,r) => n + Number(r.MealCount),0),
      OriginalRecipientCount: children.length,
      Version: 1,
    };
    s.REFERRALS.push(parent);
    children.forEach(r => {
      s.RECIPIENTS.push({
        RecipientID: uuid_(), ReferralID: parent.ReferralID, EventID: targetId,
        RecipientName: r.RecipientName, Address: r.Address,
        NormalizedAddress: addressKey_(r.Address), Phone: r.Phone,
        MealCount: Number(r.MealCount),
        DietaryRestrictions: r.DietaryRestrictions, DoorPreference: r.DoorPreference,
        DeliveryInstructions: r.DeliveryInstructions, Notes: "",
        DuplicateFlag: false, RoutePosition: "", CreatedAt: now, UpdatedAt: now,
        Version: 1, AddressStatus: "Needs Review", VerifiedAt: "",
      });
    });
    created.push(parent.ReferralID);
  });
  refreshDuplicates_(s,targetId);
  const result = {eventId: targetId, recipientsCopied: selected.length,
    mealsReserved: meals, referralsCreated: created.length};
  audit_(s, admin, "Archived Recipients Copied", "Event", batchId, null,
    {sourceEventId: sourceId, targetEventId: targetId, sourceRecipientIds: ids,
     newReferralIds: created, fingerprint, result});
  return result;
}
