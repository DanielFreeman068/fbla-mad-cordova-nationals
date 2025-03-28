// profile.js
import config from './config.js';
import { setHomeRedirect } from './homeRedirect.js'; // Import the shared function


document.addEventListener("DOMContentLoaded", () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("No user ID found, redirecting to login");
      window.location.href = "index.html";
      return;
    }
  
    // 1) Fetch user data & update UI
    fetchUserData(userId)
      .then((user) => {
        updateProfileUI(user);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        // Possibly redirect if error
      });
  
    // 2) Handle profile pic upload
    const profileIcon = document.getElementById("edit-profile-pic");
    const profileInput = document.getElementById("profile-upload");
    if (profileIcon && profileInput) {
      profileIcon.addEventListener("click", () => {
        profileInput.click();
      });
      profileInput.addEventListener("change", async () => {
        await uploadImageAsBase64(userId, "profile-upload", "uploadProfile");
        refreshUserData(userId);
      });
    }
  
    // 3) Handle banner upload
    const bannerIcon = document.getElementById("edit-banner-icon");
    const bannerInput = document.getElementById("banner-upload");
    if (bannerIcon && bannerInput) {
      bannerIcon.addEventListener("click", () => {
        bannerInput.click();
      });
      bannerInput.addEventListener("change", async () => {
        await uploadImageAsBase64(userId, "banner-upload", "uploadBanner");
        refreshUserData(userId);
      });
    }
  });
  
  /** Decodes userId from the JWT token stored in localStorage */
  function getUserIdFromToken() {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId; // Must match the key your backend uses in the JWT payload
    } catch (e) {
      console.error("Invalid token parse:", e);
      return null;
    }
  }
  
  /** Calls GET /users/:id to retrieve user data (xp, level, pictures, etc.) */
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
  
  /** After an image upload, re-fetch user data to update the UI with new URLs */
  async function refreshUserData(userId) {
    try {
      const user = await fetchUserData(userId);
      updateProfileUI(user);
    } catch (err) {
      console.error("Error refreshing user data:", err);
    }
  }
  
  /** Updates the entire profile UI (profile pic, banner, XP bar, level, etc.) */
  function updateProfileUI(user) {
    // 1) Profile & Banner
    const profilePicDiv = document.getElementById("profile-pic");
    if (profilePicDiv) {
      // If user.profilePicture is set, use it; otherwise use a Cloudinary default
      profilePicDiv.style.backgroundImage = user.profilePicture
        ? `url('${user.profilePicture}')`
        : `url('https://res.cloudinary.com/dmrevelyc/image/upload/v1736633601/default_aeldkt.webp')`;
    }
  
    const bannerDiv = document.getElementById("banner");
    if (bannerDiv) {
      // If user.bannerPicture is set, use it; otherwise use a Cloudinary default
      bannerDiv.style.backgroundImage = user.bannerPicture
        ? `url('${user.bannerPicture}')`
        : `url('https://res.cloudinary.com/dmrevelyc/image/upload/v1736639379/defaultbanner_hnbtpb.webp')`;
    }
  
    // 2) Name / Username
    document.getElementById("full-name").textContent = user.name || "No Name";
    document.getElementById("username").textContent = user.email || "No Email";
  
    // 3) XP Bar
    const xpBar = document.getElementById("xp-bar");
    const xp = user.xp || 0;
    const level = user.level || 1;
    const xpPerLevel = 100;
  
    // Fill bar from 0-100%
    const xpPercentage = Math.min((xp / xpPerLevel) * 100, 100);
    xpBar.style.width = xpPercentage + "%";
  
    // 4) Level text
    const levelRect = document.getElementById("level-rectangle");
    levelRect.textContent = `Level ${level}`;

    document.getElementById("timerValue").textContent      = `${user.timerChallengeTime}s` || "00:00";
    document.getElementById("jeopardyValue").textContent   = user.jeopardyScore      || 0;
    document.getElementById("ticTacToeValue").textContent  = user.ticTacToeWins      || 0;
    document.getElementById("coinsValue").textContent      = `$ ${user.coins}`              || 0;
  }
  
  /** Converts a <input type="file"> file to base64, calls the relevant upload endpoint. */
  async function uploadImageAsBase64(userId, inputId, endpoint) {
    const token = localStorage.getItem("authToken");
    const fileInput = document.getElementById(inputId);
    if (!fileInput.files.length) return;
  
    // Convert file to base64
    const file = fileInput.files[0];
    const base64Image = await toBase64(file);
  
    // Upload to your backend, which then uses Cloudinary
    // e.g. POST /users/:id/uploadProfile or /users/:id/uploadBanner
    const url = `${config.IP}/users/${userId}/${endpoint}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ base64Image }),
    });
    if (!res.ok) {
      throw new Error("Failed to upload image");
    }
    const data = await res.json();
    console.log("Upload success:", data);
  }
  
  /** Helper: convert a File to base64 string */
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  document.getElementById("switch-home-btn").addEventListener("click", () => {
    document.getElementById("switch-home-modal").style.display = "flex";
});

// Cancel button: close the modal
document.getElementById("cancel-switch-home").addEventListener("click", () => {
    document.getElementById("switch-home-modal").style.display = "none";
});

// Confirm button: call the backend to toggle homepage preference
document.getElementById("confirm-switch-home").addEventListener("click", async () => {
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
         if (res.ok){
              const data = await res.json();
              // Update localStorage for immediate use
              localStorage.setItem("alternateHomePage", data.alternateHomePage.toString());
              // Call our shared function to update the home link accordingly
              setHomeRedirect();
              alert("Homepage switched successfully to " + (data.alternateHomePage ? "alternate" : "default") + " version.");
         } else {
              alert("Failed to switch homepage.");
         }
    } catch(err){
         console.error(err);
         alert("Error switching homepage.");
    }
    document.getElementById("switch-home-modal").style.display = "none";
});


  
  document.getElementById("edit-avatar-btn").addEventListener("click", () => {
    window.location.href = "avatar.html";
  });