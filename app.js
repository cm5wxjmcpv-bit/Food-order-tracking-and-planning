const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbycK8gcNuHaK2bESMa6MIpJYnOqAh3dspcXRTLzbf5brcvlFGUCXgJCPC3YpfcdP_wS/exec";

const formsContainer = document.getElementById("formsContainer");
const addPersonBtn = document.getElementById("addPersonBtn");
const submitAllBtn = document.getElementById("submitAllBtn");
const statusMessage = document.getElementById("statusMessage");
const capacityCount = document.getElementById("capacityCount");
const personFormTemplate = document.getElementById("personFormTemplate");

let currentCapacity = 0;
let autocompleteInstances = [];

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

    autocompleteInstances.push(autocomplete);
  } else {
    addressFeedback.textContent = "Google Maps address suggestions are not loaded yet.";
    addressFeedback.className = "address-feedback bad";
  }
}
