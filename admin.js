const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbycK8gcNuHaK2bESMa6MIpJYnOqAh3dspcXRTLzbf5brcvlFGUCXgJCPC3YpfcdP_wS/exec";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "ChangeMe123!";

const loginSection = document.getElementById("loginSection");
const adminSection = document.getElementById("adminSection");
const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

const usernameInput = document.getElementById("adminUsername");
const passwordInput = document.getElementById("adminPassword");

const capacityInput = document.getElementById("capacityInput");
const startingPointInput = document.getElementById("startingPoint");

const saveBtn = document.getElementById("saveSettingsBtn");
const refreshBtn = document.getElementById("refreshBtn");

const tableBody = document.getElementById("requestsTableBody");

loginBtn.addEventListener("click", doLogin);
saveBtn.addEventListener("click", saveSettings);
refreshBtn.addEventListener("click", loadAdminData);

function doLogin() {
  if (
    usernameInput.value === ADMIN_USERNAME &&
    passwordInput.value === ADMIN_PASSWORD
  ) {
    loginSection.style.display = "none";
    adminSection.style.display = "block";
    loadAdminData();
  } else {
    loginMessage.textContent = "Invalid login";
    loginMessage.style.color = "red";
  }
}

async function loadAdminData() {
  try {
    const res = await fetch(`${SCRIPT_URL}?action=getAdminData`);
    const data = await res.json();

    if (!data.ok) throw new Error(data.error);

    capacityInput.value = data.capacity || 0;
    startingPointInput.value = data.startingPoint || "";

    renderTable(data.requests || []);
  } catch (err) {
    alert("Error loading admin data");
    console.error(err);
  }
}

function renderTable(rows) {
  tableBody.innerHTML = "";

  rows.forEach((r, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${r.name || ""}</td>
      <td>${r.validatedAddress || ""}</td>
      <td>${r.phone || ""}</td>
      <td>${r.dietaryRestrictions || ""}</td>
      <td>${r.doorOfEntry || ""}</td>
      <td>${r.comments || ""}</td>
      <td>${r.timestamp || ""}</td>
    `;

    tableBody.appendChild(tr);
  });
}

async function saveSettings() {
  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "saveSettings",
        capacity: Number(capacityInput.value),
        startingPoint: startingPointInput.value
      })
    });

    const data = await res.json();
    if (!data.ok) throw new Error(data.error);

    alert("Saved!");
    loadAdminData();
  } catch (err) {
    alert("Error saving settings");
  }
}
