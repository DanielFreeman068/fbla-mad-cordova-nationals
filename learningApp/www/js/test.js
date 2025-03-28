import { setHomeRedirect } from './homeRedirect.js';

function setupSwitchHomeListener() {
    const confirmSwitchBtn = document.getElementById("confirm-switch-home");
    if (!confirmSwitchBtn) {
      // Element doesn't exist on this page – do nothing.
      return;
    }
    confirmSwitchBtn.addEventListener("click", async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userId = getUserIdFromToken();
        const res = await fetch(`${config.IP}/users/${userId}/switchHomePage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          // Update localStorage for immediate use
          localStorage.setItem("alternateHomePage", data.alternateHomePage.toString());
          // Update the home link accordingly using our shared function
          setHomeRedirect();
          alert("Homepage switched successfully to " + (data.alternateHomePage ? "alternate" : "default") + " version.");
        } else {
          alert("Failed to switch homepage.");
        }
      } catch (err) {
        console.error(err);
        alert("Error switching homepage.");
      }
      const modal = document.getElementById("switch-home-modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  }

document.addEventListener("DOMContentLoaded", () => {
    setupSwitchHomeListener();
});