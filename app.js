const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbycK8gcNuHaK2bESMa6MIpJYnOqAh3dspcXRTLzbf5brcvlFGUCXgJCPC3YpfcdP_wS/exec";

const formsContainer = document.getElementById("formsContainer");
const addPersonBtn = document.getElementById("addPersonBtn");
const submitAllBtn = document.getElementById("submitAllBtn");
const statusMessage = document.getElementById("statusMessage");
const capacityCount = document.getElementById("capacityCount");
const personFormTemplate = document.getElementById("personFormTemplate");

let currentCapacity = 0;

document.addEventListener("DOMContentLoaded", async () => {
  addPersonCard();
  await loadCapacity();
});

addPersonBtn.addEventListener("click", () => {
  addPersonCard(true);
});

submitAllBtn.addEventListener("click", submitAllRequests);

function addPersonCard(addToTop = false) {
  const clone = personFormTemplate.content.cloneNode(true);
  const card = clone.querySelector(".person-card");

  const doorSelect = clone.querySelector(".door");
  const otherDoorWrap = clone.querySelector(".otherDoorWrap");
  const otherDoorInput = clone.querySelector(".otherDoor");
  const removeBtn = clone.querySelector(".remove-btn");
  const addressInput = clone.querySelector(".address");
  const addressFeedback = clone.querySelector(".address-feedback");
  const validatedAddress = clone.querySelector(".validatedAddress");
  const latInput = clone.querySelector(".lat");
  const lngInput = clone.querySelector(".lng");

  doorSelect.addEventListener("change", () => {
    const isOther = doorSelect.value === "Other";
    otherDoorWrap.classList.toggle("hidden", !isOther);
    otherDoorInput.required = isOther;
    if (!isOther) otherDoorInput.value = "";
  });

  removeBtn.addEventListener("click", () => {
    card.remove();
    renumberCards();
  });

  if (window.google && google.maps && google.maps.places) {
    const autocomplete = new google.maps.places.Autocomplete(addressInput, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      fields: ["formatted_address", "geometry", "name"]
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place || !place.formatted_address || !place.geometry) {
        addressFeedback.textContent = "Please select a valid suggested address.";
        addressFeedback.className = "address-feedback bad";
        validatedAddress.value = "";
        latInput.value = "";
        lngInput.value = "";
        return;
      }

      validatedAddress.value = place.formatted_address;
      addressInput.value = place.formatted_address;
      latInput.value = place.geometry.location.lat();
      lngInput.value = place.geometry.location.lng();
      addressFeedback.textContent = "Validated address selected.";
      addressFeedback.className = "address-feedback good";
    });

    addressInput.addEventListener("blur", () => {
      if (!validatedAddress.value || addressInput.value !== validatedAddress.value) {
        addressFeedback.textContent = "Use a suggested address from the dropdown so the location is valid.";
        addressFeedback.className = "address-feedback bad";
      }
    });
  } else {
    addressFeedback.textContent = "Google Maps address suggestions are not loaded yet.";
    addressFeedback.className = "address-feedback bad";
  }

  if (addToTop && formsContainer.firstChild) {
    formsContainer.insertBefore(clone, formsContainer.firstChild);
  } else {
    formsContainer.appendChild(clone);
  }

  renumberCards();
}

function renumberCards() {
  const cards = formsContainer.querySelectorAll(".person-card");
  cards.forEach((card, index) => {
    card.querySelector(".personNumber").textContent = `Person ${index + 1}`;
    const removeBtn = card.querySelector(".remove-btn");
    removeBtn.style.display = cards.length === 1 ? "none" : "inline-block";
  });
}

async function loadCapacity() {
  capacityCount.textContent = "...";

  try {
    const res = await fetch(`${SCRIPT_URL}?action=getCapacity`);
    const data = await res.json();

    if (!data.ok) {
      throw new Error(data.error || "Failed to load capacity");
    }

    currentCapacity = Number(data.capacity || 0);
    capacityCount.textContent = currentCapacity;
  } catch (err) {
    console.error(err);
    capacityCount.textContent = "Error";
  }
}

function collectCards() {
  const cards = [...formsContainer.querySelectorAll(".person-card")];

  return cards.map((card, index) => {
    const door = card.querySelector(".door").value;
    const otherDoor = card.querySelector(".otherDoor").value.trim();
    const resolvedDoor = door === "Other" ? otherDoor : door;

    return {
      personIndex: index + 1,
      name: card.querySelector(".name").value.trim(),
      addressRaw: card.querySelector(".address").value.trim(),
      validatedAddress: card.querySelector(".validatedAddress").value.trim(),
      lat: card.querySelector(".lat").value.trim(),
      lng: card.querySelector(".lng").value.trim(),
      phone: card.querySelector(".phone").value.trim(),
      dietaryRestrictions: card.querySelector(".dietary").value.trim(),
      doorOfEntry: resolvedDoor,
      comments: card.querySelector(".comments").value.trim()
    };
  });
}

function validateRequests(requests) {
  if (!requests.length) return "Add at least one person.";

  for (const req of requests) {
    if (!req.name) return `Person ${req.personIndex}: name is required.`;
    if (!req.addressRaw) return `Person ${req.personIndex}: address is required.`;
    if (!req.validatedAddress || !req.lat || !req.lng) return `Person ${req.personIndex}: please pick a valid address from the suggestions.`;
    if (!req.phone) return `Person ${req.personIndex}: phone number is required.`;
    if (!req.doorOfEntry) return `Person ${req.personIndex}: door of entry is required.`;
  }

  if (requests.length > currentCapacity) {
    return `You only have capacity for ${currentCapacity} more people.`;
  }

  return "";
}

async function submitAllRequests() {
  statusMessage.textContent = "Submitting...";
  statusMessage.style.color = "#16202a";

  const requests = collectCards();
  const error = validateRequests(requests);

  if (error) {
    statusMessage.textContent = error;
    statusMessage.style.color = "#a32020";
    return;
  }

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "submitRequests",
        requests
      })
    });

    const data = await res.json();

    if (!data.ok) {
      throw new Error(data.error || "Submit failed");
    }

    statusMessage.textContent = "Request(s) submitted successfully.";
    statusMessage.style.color = "#127a35";

    formsContainer.innerHTML = "";
    addPersonCard();
    await loadCapacity();
  } catch (err) {
    console.error(err);
    statusMessage.textContent = err.message || "There was a problem submitting the request(s).";
    statusMessage.style.color = "#a32020";
  }
}
