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
