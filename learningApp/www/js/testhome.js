import config from './config.js';
import { AvatarManager } from './avatar.js';
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
  // Always initialize the modal event listener.
  initModal();

  // Then proceed with fetching user data.
  const userId = getUserIdFromToken();
  if (!userId) {
    window.location.href = "index.html";
    return;
  }

  fetchUserData(userId)
    .then((user) => {
      updateCoins(user);
      updateTopRightProfile(user);
      updateXPBar(user);
      const avatarManager = new AvatarManager(user);
      avatarManager.updateAvatarPreview();
      window.avatarManager = avatarManager;
      updateLevelUI(user.xp, user.level);
    })
    .catch((err) => {
      console.error(err);
    });
});


function getUserIdFromToken() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
}

async function fetchUserData(userId) {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${config.IP}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return await res.json();
}

function updateCoins(user) {
  const coinsElement = document.querySelector("#coins-container .coins-text");
  if (coinsElement) {
    coinsElement.textContent = user.coins ? `$ ${user.coins}` : "$ 0";
  }
}

function updateTopRightProfile(user) {
  const smallProfilePic = document.querySelector(".small-profile-pic");
  if (user.profilePicture && smallProfilePic) {
    smallProfilePic.src = user.profilePicture;
  }
}

function updateXPBar(user) {
  const xpBar = document.getElementById("xp-bar");
  const levelRect = document.getElementById("level-rectangle");
  const xp = user.xp || 0;
  const level = user.level || 1;
  const xpPerLevel = 100;
  const xpPercentage = Math.min((xp / xpPerLevel) * 100, 100);
  if (xpBar) {
    xpBar.style.width = xpPercentage + "%";
  }
  if (levelRect) {
    levelRect.textContent = `Level ${level}`;
  }
}

function initModal() {
  const playButton = document.querySelector(".play-btn");
  const modal = document.getElementById("modal");
  if (playButton) {
    playButton.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}

function updateLevelUI(xp, level) {
  const progressCircle = document.getElementById("xp-circle");
  if (!progressCircle) return;
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const progress = xp / 100;
  const offset = circumference - (progress * circumference);
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = offset;
}

async function updateXP(amount) {
  const token = localStorage.getItem("authToken");
  const userId = getUserIdFromToken();
  if (!userId) return;
  const res = await fetch(`${config.IP}/users/${userId}/xp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ xpChange: amount }),
  });
  if (res.ok) {
    const data = await res.json();
    console.log("XP updated:", data);
  } else {
    console.error("Failed to update XP");
  }
}
