// Constants
const profilesDir = "data"; // Directory for JSON profiles
const everythingPassword = "dadocta";

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const profileList = document.getElementById("profileList");
const webPortfolioBtn = document.getElementById("webPortfolioBtn");
const editBtn = document.getElementById("editBtn");
const everythingBtn = document.getElementById("everythingBtn");

// State
let mode = "webPortfolio"; // Default view mode

// Event Listeners for Choice Buttons
webPortfolioBtn.addEventListener("click", () => setMode("webPortfolio"));
editBtn.addEventListener("click", () => setMode("edit"));
everythingBtn.addEventListener("click", () => {
  const password = prompt("Enter the password to view Everything:");
  if (password === everythingPassword) {
    setMode("everything");
  } else {
    alert("Incorrect password.");
  }
});

// Set active mode
const setMode = (newMode) => {
  mode = newMode;
  document.querySelectorAll("#choiceButtons button").forEach(button => button.classList.remove("active"));
  document.getElementById(`${newMode}Btn`).classList.add("active");
  loadProfiles();
};

// Fetch JSON profiles dynamically
const loadProfiles = async () => {
  profileList.innerHTML = "<p>Loading profiles...</p>";
  try {
    const response = await fetch(`${profilesDir}/index.json`); // Assume index.json lists all JSON files
    const files = await response.json();
    profileList.innerHTML = ""; // Clear profiles

    files.forEach(file => {
      const name = file.name;
      const urlSuffix = file.urlSuffix;

      // Render profile based on mode
      const profileDiv = document.createElement("div");
      profileDiv.className = "profile-item";
      profileDiv.innerHTML = `
        <h2>${name}</h2>
        <a href="${mode}/${urlSuffix}">${capitalize(mode)} Page</a>
      `;
      profileList.appendChild(profileDiv);
    });
  } catch (error) {
    console.error("Error loading profiles:", error);
    profileList.innerHTML = "<p>Failed to load profiles.</p>";
  }
};

// Utility function to capitalize
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Initial Load
loadProfiles();
searchBtn.addEventListener("click", loadProfiles);


// Add random stars to the background
const createStars = () => {
  const starryBg = document.createElement("div");
  starryBg.className = "starry-bg";

  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    starryBg.appendChild(star);
  }

  document.body.appendChild(starryBg);
};

createStars();
