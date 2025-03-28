import config from './config.js';

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

export async function setHomeRedirect() {
  const homeLink = document.getElementById("home");
  if (!homeLink) return;
  
  const token = localStorage.getItem("authToken");
  if (!token) {
    homeLink.href = "index.html";
    return;
  }
  
  // Check for the flag in localStorage
  let alternate = localStorage.getItem("alternateHomePage");
  if (alternate !== null) {
    homeLink.href = alternate === "true" ? "homepage2.html" : "homepage.html";
  } else {
    // Fetch from backend if not cached
    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        homeLink.href = "homepage.html";
        return;
      }
      const res = await fetch(`${config.IP}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        homeLink.href = "homepage.html";
        return;
      }
      const user = await res.json();
      if (user.alternateHomePage) {
        homeLink.href = "homepage2.html";
        localStorage.setItem("alternateHomePage", "true");
      } else {
        homeLink.href = "homepage.html";
        localStorage.setItem("alternateHomePage", "false");
      }
    } catch (err) {
      console.error(err);
      homeLink.href = "homepage.html";
    }
  }
  
  // Attach an event listener so that each time the home link is clicked,
  // it rechecks the alternate flag and redirects accordingly.
  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    const alt = localStorage.getItem("alternateHomePage");
    const destination = alt === "true" ? "homepage2.html" : "homepage.html";
    window.location.href = destination;
  });
}
