"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const link = document.getElementById("adminLink"),
    url = window.MEALS_CONFIG?.adminAppUrl;
  try {
    const parsed = new URL(url);
    if (
      parsed.origin !== "https://script.google.com" ||
      !parsed.pathname.endsWith("/exec")
    )
      throw new Error();
    parsed.searchParams.set("page", "admin");
    link.href = parsed.href;
    link.hidden = false;
  } catch (_) {
    document.getElementById("adminStatus").textContent =
      "The authenticated administrator application has not been configured yet.";
  }
});
