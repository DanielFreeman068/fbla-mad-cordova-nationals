// home.js
import config from './config.js';
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

    // 1) Get userID from token
    const userId = getUserIdFromToken();
    if (!userId) {
      // If no token, redirect to login
      window.location.href = "index.html";
      return;
    }
  
    // 2) Fetch user data
    fetchUserData(userId)
      .then((user) => {
        // 3) Update side infos
        updateSideInfos(user);
  
        // 4) Update the circular progress (xp/level)
        updateLevelUI(user.xp, user.level);
  
        // 5) Update the profile picture
        const profilePic = document.querySelector(".profile-pic");
        if (user.profilePicture) {
          profilePic.src = user.profilePicture;
        }
      })
      .catch((err) => {
        console.error(err);
        // Possibly redirect to login if error
      });
  
    // The rest of your existing code for modal, etc.
    initModal();
  });
  
  function getUserIdFromToken() {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
  
    try {
      // decode JWT (base64). 
      // Typically we only need userId if you put { userId: ... } in the payload
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId; 
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  }
  
  // Example fetch user data
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
  
  function updateSideInfos(user) {
    // Replace these with your actual elements:
    const sideInfo1 = document.querySelector(".side-info-1 .side-info-text-left");
    const sideInfo2 = document.querySelector(".side-info-2 .side-info-text-right");
    const sideInfo3 = document.querySelector(".side-info-3 .side-info-text-left");
    const sideInfo4 = document.querySelector(".side-info-4 .side-info-text-right");
  
    // Example usage from user schema:
    // 1) Jeopardy Score
    sideInfo1.textContent = user.jeopardyScore || 0;
  
    // 2) Timer Challenge Time
    sideInfo2.textContent = `${user.timerChallengeTime}s` || "00:00";
  
    // 3) Coins
    sideInfo3.textContent = `$ ${user.coins}` || 0;
  
    // 4) TicTacToeWins
    sideInfo4.textContent = user.ticTacToeWins || 0;
  }
  
  function updateLevelUI(xp, level) {
    // Show text
    document.getElementById("level").textContent = `Level ${level}`;
  
    // Fill the circle progress
    const progressCircle = document.querySelector("svg circle");
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
  
    // xpPerLevel = 100
    const progress = xp / 100; // fraction 0..1
    const offset = circumference - (progress * circumference);
  
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = offset;
  }
  
  
  // For the modal
  function initModal() {
    const playButton = document.querySelector(".play-btn");
    const modal = document.getElementById("modal");
    
    playButton.addEventListener("click", () => {
      modal.style.display = "flex";
    });
    
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
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
      // Re-fetch user data if you want to refresh the UI
      const updatedUser = await fetchUserData(userId);
      updateSideInfos(updatedUser);
      updateLevelUI(updatedUser.xp, updatedUser.level);
    } else {
      console.error("Failed to update XP");
    }
  }
  