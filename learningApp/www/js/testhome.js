// --- Helper: Create dummy element if missing ---
function ensureElement(id, tag = "div") {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement(tag);
      el.id = id;
      el.style.display = "none";
      document.body.appendChild(el);
    }
    return el;
  }
  
  // Ensure required avatar preview elements exist
  ensureElement("color-layer", "img");
  ensureElement("skin-layer", "img");
  ensureElement("accessory-layer", "img");
  ensureElement("eyewear-layer", "img");
  ensureElement("hat-layer", "img");
  
  // Ensure play button exists (if not already in HTML)
  if (!document.querySelector(".play-btn")) {
    const btn = document.createElement("button");
    btn.className = "play-btn";
    btn.textContent = "Play!";
    document.body.appendChild(btn);
  }
  
  import config from './config.js';
  import { AvatarManager } from './avatar.js';
  
  document.addEventListener("DOMContentLoaded", () => {
    // 1) Get userID from token
    const userId = getUserIdFromToken();
    if (!userId) {
      window.location.href = "index.html";
      return;
    }
  
    // 2) Fetch user data
    fetchUserData(userId)
      .then((user) => {
        // 3) Update coins in the top left
        updateCoins(user);
        
        // 4) Update the top-right profile (small profile picture)
        updateTopRightProfile(user);
        
        // 5) Make sure the avatar-selector is visible so that its elements exist
        const avatarSelector = document.querySelector(".avatar-selector");
        if (avatarSelector) {
          avatarSelector.style.display = "block";
        }
        
        // 6) Initialize the AvatarManager (using avatar.js code)
        const avatarManager = new AvatarManager(user);
        avatarManager.updateAvatarPreview();
        window.avatarManager = avatarManager;
        
        // 7) Initialize modal functionality for navigation
        initModal();
        
        // 8) Update XP circle progress for the top-right profile
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  
  function initModal() {
    const playButton = document.querySelector(".play-btn");
    const modal = document.getElementById("modal");
    if (playButton) {
      playButton.addEventListener("click", () => {
        modal.style.display = "flex";
      });
    } else {
      console.warn("Play button not found");
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
  