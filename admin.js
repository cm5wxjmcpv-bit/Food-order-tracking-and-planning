const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbycK8gcNuHaK2bESMa6MIpJYnOqAh3dspcXRTLzbf5brcvlFGUCXgJCPC3YpfcdP_wS/exec";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "ChangeMe123!";

const loginSection = document.getElementById("loginSection");
const adminSection = document.getElementById("adminSection");
const adminUsername = document.getElementById("adminUsername");
const adminPassword = document.getElementById("adminPassword");
const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");
const capacityInput = document.getElementById("capacityInput");
const startingPoint = document.getElementById("startingPoint");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const refreshBtn = document.getElementById("refreshBtn");
const logoutBtn = document.getElementById("logoutBtn");
const requestsTableBody = document.getElementById("requestsTableBody");

loginBtn.addEventListener("click", doLogin);
saveSettingsBtn.addEventListener("click", saveSettings);
refreshBtn.addEventListener("click", loadAdminData);
logoutBtn.addEventListener("click", doLogout);

document.addEventListener("DOMContentLoaded", () => {
  const loggedIn = sessionStorage.getItem("mealAdminLoggedIn") === "true";
  if (loggedIn) {
    showAdmin();
    loadAdminData();
  }
});

function doLogin() {
  const user = adminUsername.value.trim();
  const pass = adminPassword.value;

  if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
    sessionStorage.setItem("mealAdminLoggedIn", "true");
    loginMessage.textContent = "Login successful.";
    loginMessage.style.color = "#127a35";
    showAdmin();
    loadAdminData();
  } else {
    loginMessage.textContent = "Invalid username or password.";
    loginMessage.style.color = "#a32020";
  }
}

function doLogout() {
  sessionStorage.removeItem("mealAdminLoggedIn");
  adminSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
  adminUsername.value = "";
  adminPassword.value = "";
  loginMessage.textContent = "";
}

function showAdmin() {
  loginSection.classList.add("hidden");
  adminSection.classList.remove("hidden");
}

async function loadAdminData() {
  try {
    const res = await fetch(`${SCRIPT_URL}?action=getAdminData`);
    const data = await res.json();

    if (!data.ok) {
      throw new Error(data.error || "Could not load admin data.");
    }

    capacityInput.value = data.capacity || 0;
    startingPoint.value = data.startingPoint || "";
    renderRequests(data.requests || []);
  } catch (err) {
    console.error(err);
    alert(err.message || "Admin load failed.");
  }
}

function renderRequests(rows) {
  requestsTableBody.innerHTML = "";

  if (!rows.length) {
    requestsTableBody.innerHTML = `<tr><td colspan="8">No requests found.</td></tr>`;
    return;
  }

  rows.forEach((row, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${escapeHtml(row.name || "")}</td>
      <td>${escapeHtml(row.validatedAddress || row.addressRaw || "")}</td>
      <td>${escapeHtml(row.phone || "")}</td>
      <td>${escapeHtml(row.dietaryRestrictions || "")}</td>
      <td>${escapeHtml(row.doorOfEntry || "")}</td>
      <td>${escapeHtml(row.comments || "")}</td>
      <td>${escapeHtml(row.timestamp || "")}</td>
    `;
    requestsTableBody.appendChild(tr);
  });
}

async function saveSettings() {
  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "saveSettings",
        capacity: Number(capacityInput.value || 0),
        startingPoint: startingPoint.value.trim()
      })
    });

    const data = await res.json();

    if (!data.ok) {
      throw new Error(data.error || "Settings save failed.");
    }

    alert("Settings saved.");
    loadAdminData();
  } catch (err) {
    console.error(err);
    alert(err.message || "Could not save settings.");
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
