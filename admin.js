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
const requestsTableBody = document.getElementById("requestsTableBody");

loginBtn.addEventListener("click", doLogin);
saveSettingsBtn.addEventListener("click", saveSettings);
refreshBtn.addEventListener("click", loadAdminData);

document.addEventListener("DOMContentLoaded", () => {
  const loggedIn = sessionStorage.getItem("mealAdminLoggedIn") === "true";
  if (loggedIn) {
    showAdmin();
    loadAdminData();
  }
});

function doLogin() {
  if (adminUsername.value === ADMIN_USERNAME && adminPassword.value === ADMIN_PASSWORD) {
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

function showAdmin() {
  loginSection.classList.add("hidden");
  adminSection.classList.remove("hidden");
}

async function loadAdminData() {
  try {
    const res = await fetch(`${SCRIPT_URL}?action=getAdminData`);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "Could not load admin data.");

    capacityInput.value = data.capacity || 0;
    startingPoint.value = data.startingPoint || "";
    renderRequests(data.requests || []);
  } catch (err) {
    alert(err.message || "Admin load failed.");
  }
}
