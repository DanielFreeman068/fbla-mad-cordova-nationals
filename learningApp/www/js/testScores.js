let selectedSubject = "math";
import config from './config.js';


// 1) When the user clicks a subject button
function handleLevelClick(subject) {
  selectedSubject = subject;
  updateButtonSelection();
  // 2) fetch scores from the server
  fetchTestScores(subject);
}

// 3) Actually fetch from /tests?subject=someSubject
async function fetchTestScores(subject) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No auth token found");
    return;
  }

  try {
    const res = await fetch(`http://${config.IP}:3000/tests?subject=${subject}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch test scores");
    }
    const data = await res.json(); 
    // data is an array of { subject, date, score }
    // 4) Pass data to the "renderLeaderboard" function
    renderLeaderboard(data);
  } catch (err) {
    console.error("Error fetching test scores:", err);
  }
}

// 5) Actually render the table, using the "data" from server
function renderLeaderboard(data) {
  const tableBody = document.getElementById("leaderboard-body");
  tableBody.innerHTML = "";

  // Sort by date descending
  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Show top 10
  data.slice(0, 10).forEach(item => {
    const row = document.createElement("tr");
    // Convert date to a nice format
    const dateString = new Date(item.date).toLocaleDateString();
    row.innerHTML = `
      <td>${dateString}</td>
      <td>${item.score} / 25</td>
    `;
    tableBody.appendChild(row);
  });
}

// Keep your existing "updateButtonSelection" if you want
function updateButtonSelection() {
  const subjects = ["math", "science", "history", "geography"];
  subjects.forEach(subject => {
    const button = document.getElementById(`${subject.toLowerCase()}-button`);
    if (subject === selectedSubject) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });
}

// 6) On page load, default to "Math"
document.addEventListener("DOMContentLoaded", () => {
  updateButtonSelection();
  fetchTestScores("math"); 
});

window.handleLevelClick = handleLevelClick;
