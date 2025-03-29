import config from './config.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded successfully");

  // Setting up event listeners
  const signup = document.querySelector(".signup");
  const login = document.querySelector(".login");
  const slider = document.querySelector(".slider");
  const formSection = document.querySelector(".form-section");

  if (login) {
    login.classList.add("magic");
  }

  if (signup && login && slider && formSection) {
    signup.addEventListener("click", () => {
      slider.classList.add("moveslider");
      formSection.classList.add("form-section-move");
      login.classList.remove("magic");
      signup.classList.add("magic");
    });

    login.addEventListener("click", () => {
      slider.classList.remove("moveslider");
      formSection.classList.remove("form-section-move");
      signup.classList.remove("magic");
      login.classList.add("magic");
    });
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Remove the auth token from localStorage
      localStorage.removeItem("authToken");
      // Delete all cookies (if accessible via JavaScript)
      deleteAllCookies();
      // Redirect to the login page
      window.location.href = "index.html";
    });
  }
});

// Helper function to delete all cookies
function deleteAllCookies() {
  document.cookie.split(";").forEach(cookie => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  });
}

window.auth = async function () {
  console.log("Auth function called");

  const isLogin = document.querySelector('.login.magic');
  let email, password, name;

  if (isLogin) {
    email = document.getElementById("login-email").value;
    password = document.getElementById("login-password").value;

    try {
      const response = await fetch(`${config.IP}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers]);

      const data = await response.json();
      console.log('Response body:', data);

      if (response.ok) {
        console.log(data.message);
        localStorage.setItem('authToken', data.token);
        // Check alternateHomePage flag and redirect accordingly:
        if (data.user && data.user.alternateHomePage) {
          window.location.assign("homepage2.html");
        } else {
          window.location.assign("homepage.html");
        }
      } else {
        console.error("Login failed:", data);
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        alert(
          "Network error: Check your server's CORS settings or ensure the backend is reachable."
        );
      } else {
        alert("Something went wrong: " + err.message);
      }
    }
  } else {
    // Signup branch
    const signupEmail = document.getElementById("signup-email").value;
    const signupPassword = document.getElementById("signup-password").value;
    const nameInput = document.querySelector('.signup-box input[type="text"]').value;

    try {
      const response = await fetch(`${config.IP}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameInput,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers]);

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // For new signups, default homepage will be used.
        window.location.assign("homepage.html");
      } else {
        console.error("Signup failed:", data);
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        alert(
          "Network error: Check your server's CORS settings or ensure the backend is reachable."
        );
      } else {
        alert("Something went wrong: " + err.message);
      }
    }
  }
};
