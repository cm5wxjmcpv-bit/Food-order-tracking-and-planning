/* Shared public/admin address controls. Address data and receipts stay in memory. */
"use strict";
window.MealAddresses = (() => {
  const states = new WeakMap();
  let counter = 0;
  const node = (tag, text) => {
    const n = document.createElement(tag);
    if (text != null) n.textContent = text;
    return n;
  };
  function choose(result) {
    return new Promise((resolve) => {
      const d = node("dialog"),
        heading = node("h2", "Check this address");
      d.className = "address-check";
      heading.id = "address-check-" + ++counter;
      d.setAttribute("aria-labelledby", heading.id);
      d.append(
        heading,
        node(
          "p",
          result.confident
            ? "Please confirm the address for delivery."
            : "This address could not be confidently confirmed. You may edit it or keep it for administrator review.",
        ),
      );
      if (result.unitIssue)
        d.append(
          node(
            "p",
            "Apartment / suite / unit information needs review. Your entered unit has been preserved.",
          ),
        );
      d.append(node("h3", "You entered:"), node("p", result.original));
      if (result.recommended)
        d.append(
          node("h3", "Recommended:"),
          node("p", result.recommended),
          attribution(),
        );
      const actions = node("div");
      actions.className = "actions";
      const finish = (value) => {
        d.close();
        d.remove();
        resolve(value);
      };
      for (const [label, value] of [
        ["Use Recommended", "recommended"],
        ["Keep What I Entered", "original"],
        ["Edit", "edit"],
      ]) {
        if (value === "recommended" && !result.recommended) continue;
        const b = node("button", label);
        b.type = "button";
        b.addEventListener("click", () => finish(value));
        actions.append(b);
      }
      d.append(actions);
      d.addEventListener("cancel", (e) => {
        e.preventDefault();
        finish("edit");
      });
      document.body.append(d);
      d.showModal();
    });
  }
  function attribution() {
    const n = node("span");
    const logo = node("img");
    logo.alt = "Google Maps";
    logo.height = 18;
    logo.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAASCAYAAACghwvPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABDBJREFUeNrcWI1R4lAQjgwFhAouVHBQwYUKDA0oVACpQKkArIBoA8QKEiswHZir4GIF3q7z7c3nmxci3gwyvJk3Itl9b3++/XbDRUDr6uoqlj8L2UnwceWy7x8eHvLgG5fYN5I/a/0stkyCM1o9clIdLDxJCPDdTmS232xvKDvG/moyb3V3yISQmx01EUjCEt9VsqeyB4K6C3wuzwh8N7o7gryG3PWxjOqDjiwJmQR/zgKgo1wNl8/ZGSVkLT7l4lPjob/ZsY3poSfoqmWnbYJdSdCEyo4+QQ0qF3bIRADIIZQTIYiH0NyypRqOvi7E+Dd8TiXYmwOdD2E4I6jGWTkHCXKJIzcXudLTjC0JDWgxBGU+oo8FoE3VSaATkc6qzRf4W+FM1RmKbE1n7XCn2lDaUOC554Of8rzAua8AdwhbMtjTUBuY4XmA52mfbKw8RhctOVDZFYLiojBCY9cgZ0jWM13cUBAKeT5VZ5CEguQMtZy8R8c+CxwnNwLtNHuqWG24k71FcKdONaSw2XePASeGnxOAiYeICneMUHVq05R6cY0ExEhK1OsAfdyyjUctCXMgdIALdG2pYgwdavQAcpXj/JqQP8R5Y+jta6oWHB0uhhi1rQeEHVSrdyWgy1sETPukC0oLnPo5QZVYL104sqo/hsyQ7kgoXnqGVpP6p5V7z4nw8evE2YywS7o4g3MN0NTQ2GuIXhkNQc5QaP0gJrkachWQ2/ZOYTSxwiT0h+6rneryrZQSuoDdqSdpRouXyhJgikuq2n+VxsMO/Fzh31+wKQATrJEc9TfrEYIWLoI0cLwpWE8k9tvRaQjtERlaOXK1U3k8pfEq9zRbWwVKPgRYxkBlvS8L8CkHCFX3zp2ikPQZqCnpAG7VQoMmn8K+CPbqmS96fo8QF+0rZyrdgJKn64engceEysYNNjXwwD0PKAl8SWpxkCe+ARBZHzBzWAXUotv2ondNFGzUNPbIjfYARs9/rxjQ7gS09E7fPaDCJgzN/LNmCOOgvmEmKMUbyGyoVN915PmSkrCjQOVOxSWUhB0ZWBHytza60k8uQQtd1HyXOgqdF5R+FzVZZY4RmK6Vd4y5IRoyg9Li9gRaU9tCsExqE1wfxqTy8BVKEaYJ38qgrDob0bkGCtZsAI3DGpgUMiNMGe6Zc0KmTU2FR8635jS5vTg6MfFzVzKqDhFLuN5R4r62d6YlwFCBykKMwTpB/oRdCvac4lL3yJhbasiNBwlT962bysulianTwN1Gb9w/pgZeQS53zqocOiqteqA79vSRDJOJb+IqW7h8n5xxe0jBnXvOKpH8iN4VMhtMAOINvUzG0Jme1G8OoMSR851W25vs3Sn/XgIbi//+9fUEHNmCErfWyFHiM9/L3Lmt/gnZcoey9/F95VDW2a2TqQjqEYfw/Skt7Q33X1X+K8AAJX03+VzRIA4AAAAASUVORK5CYII=";
    n.append(logo);
    n.className = "address-attribution";
    n.setAttribute("translate", "no");
    return n;
  }
  function attach(
    input,
    call,
    context = () => ({}),
    initialStatus = "Needs Review",
  ) {
    if (states.has(input)) return states.get(input);
    const label = input.parentElement,
      holder = node("div");
    holder.className =
      "address-entry" + (label.classList.contains("full") ? " full" : "");
    label.replaceWith(holder);
    holder.append(label);
    const list = node("div"),
      status = node("p"),
      check = node("button", "Check Address");
    list.className = "address-suggestions";
    list.id = "address-list-" + ++counter;
    list.hidden = true;
    list.setAttribute("role", "group");
    list.setAttribute("aria-label", "Google address suggestions");
    status.className = "hint address-state";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    check.type = "button";
    check.className = "secondary address-check-button";
    holder.append(list, check, status);
    const privacy = node(
      "p",
      "Address search and checking send only this address text to Google. Keep recipient names and delivery notes in their separate fields.",
    );
    privacy.className = "hint";
    holder.append(privacy);
    input.setAttribute("autocomplete", "off");
    input.setAttribute("aria-controls", list.id);
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-autocomplete", "list");
    let revision = 0,
      timer,
      session = null,
      features = null,
      receipt = "",
      checked = input.value.trim(),
      running = null;
    const labelStatus = (s) =>
      s === "Confirmed"
        ? "Address Verified"
        : s === "Manually Reviewed"
          ? "Address manually reviewed"
          : "Needs Review";
    status.textContent = labelStatus(initialStatus);
    const clear = () => {
      list.hidden = true;
      list.replaceChildren();
      input.setAttribute("aria-expanded", "false");
    };
    const reset = (s = "Needs Review") => {
      revision++;
      clearTimeout(timer);
      session = null;
      receipt = "";
      checked = input.value.trim();
      status.textContent = labelStatus(s);
      clear();
    };
    async function config() {
      return features || (features = await call("addressConfig", {}));
    }
    async function validate(candidate) {
      if (running) return running;
      const original = input.value.trim(),
        rev = revision;
      if (!original) return true;
      clear();
      clearTimeout(timer);
      running = (async () => {
        let result;
        try {
          if (!(await config()).validation) {
            checked = original;
            receipt = "";
            status.textContent =
              "Needs Review — address checking is currently unavailable.";
            return true;
          }
          status.textContent = "Checking address…";
          result = await call("addressPreview", {
            ...context(),
            address: original,
            candidate: candidate || original,
            sessionToken: session || "",
          });
        } catch (_) {
          result = { original, confident: false };
        } finally {
          session = null;
        }
        if (
          rev !== revision ||
          input.value.trim() !== original ||
          !input.isConnected
        )
          return false;
        let choice = "original";
        if (!result.confident || !result.equivalent)
          choice = await choose(result);
        if (rev !== revision || !input.isConnected) return false;
        if (choice === "edit") {
          checked = "";
          receipt = "";
          status.textContent =
            "Needs Review — edit the address and check again.";
          input.focus();
          return false;
        }
        if (choice === "recommended") {
          input.value = result.recommended;
          receipt = result.recommendedReceipt || "needs-review";
        } else receipt = result.originalReceipt || "needs-review";
        checked = input.value.trim();
        status.textContent =
          result.confident && (choice === "recommended" || result.equivalent)
            ? "Address Verified"
            : "Needs Review";
        return true;
      })();
      try {
        return await running;
      } finally {
        running = null;
      }
    }
    async function suggest(rev) {
      const address = input.value.trim();
      if (address.length < 4 || input.disabled) return;
      try {
        if (!(await config()).autocomplete || rev !== revision) return;
        session ||= crypto.randomUUID();
        const data = await call("addressSuggestions", {
          ...context(),
          address,
          sessionToken: session,
        });
        if (
          rev !== revision ||
          !input.isConnected ||
          document.activeElement !== input
        )
          return;
        clear();
        for (const suggestion of data.suggestions || []) {
          const b = node("button", suggestion.address);
          b.type = "button";
          b.className = "address-suggestion";
          b.addEventListener("click", () => validate(suggestion.address));
          b.addEventListener("keydown", (e) => {
            const buttons = [...list.querySelectorAll("button")],
              at = buttons.indexOf(b);
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              buttons[
                (at + (e.key === "ArrowDown" ? 1 : buttons.length - 1)) %
                  buttons.length
              ].focus();
            }
            if (e.key === "Escape") {
              e.preventDefault();
              clear();
              input.focus();
            }
          });
          list.append(b);
        }
        if (list.children.length) {
          list.append(attribution());
          list.hidden = false;
          input.setAttribute("aria-expanded", "true");
        }
      } catch (_) {
        if (rev === revision) {
          clear();
          status.textContent =
            "Suggestions unavailable. Enter the full address; it can still be submitted.";
        }
      }
    }
    input.addEventListener("input", () => {
      revision++;
      receipt = "";
      checked = "";
      clear();
      clearTimeout(timer);
      status.textContent = "Needs Review";
      if (!running) timer = setTimeout(() => suggest(revision), 450);
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") clear();
      if (e.key === "ArrowDown" && !list.hidden) {
        e.preventDefault();
        list.querySelector("button")?.focus();
      }
    });
    holder.addEventListener("focusout", (e) => {
      if (!holder.contains(e.relatedTarget)) clear();
    });
    check.addEventListener("click", () => validate());
    const state = {
      reset,
      check: () => validate(),
      prepare: () =>
        running ||
        (checked === input.value.trim() ? Promise.resolve(true) : validate()),
      receipt: () => (checked === input.value.trim() ? receipt : ""),
    };
    states.set(input, state);
    return state;
  }
  async function prepareAll(root) {
    for (const input of root.querySelectorAll(
      '[name="address"], [name="startAddress"]',
    ))
      if (
        !input.disabled &&
        states.has(input) &&
        !(await states.get(input).prepare())
      )
        return false;
    return true;
  }
  return {
    attach,
    prepareAll,
    receipt: (input) => states.get(input)?.receipt() || "",
    reset: (input, status) => states.get(input)?.reset(status),
  };
})();
