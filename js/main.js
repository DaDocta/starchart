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
let profiles = []; // Stores all profiles

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

// Fetch JSON profiles dynamically
const fetchProfiles = async () => {
  profileList.innerHTML = "<p>Loading profiles...</p>";
  try {
    const response = await fetch(`${profilesDir}/index.json`); // Fetch index.json containing file names
    const files = await response.json();

    profiles = [];
    for (const file of files) {
      const profileResponse = await fetch(`${profilesDir}/${file}`);
      const profile = await profileResponse.json();
      profiles.push(profile);
    }
    renderProfiles();
  } catch (error) {
    console.error("Error loading profiles:", error);
    profileList.innerHTML = "<p>Failed to load profiles. Check console for details.</p>";
  }
};

// Render profiles based on mode and search query
const renderProfiles = () => {
  profileList.innerHTML = "";
  const query = searchInput.value.toLowerCase();

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(query)
  );

  if (filteredProfiles.length === 0) {
    profileList.innerHTML = "<p>No profiles found.</p>";
    return;
  }

  filteredProfiles.forEach(profile => {
    const name = profile.name;
    const urlSuffix = name.toLowerCase().replace(/\s+/g, ""); // Convert name to URL-friendly format

    const profileDiv = document.createElement("div");
    profileDiv.className = "profile-item";
    profileDiv.innerHTML = `
      <h2>${name}</h2>
      <a href="site/webportfolio.html?name=${urlSuffix}">Web Portfolio</a>
      <a href="site/edit.html?name=${urlSuffix}">Edit</a>
      <a href="site/everything.html?name=${urlSuffix}">Everything</a>
    `;
    profileList.appendChild(profileDiv);
  });
};

// Set active mode
const setMode = (newMode) => {
  mode = newMode;
  document.querySelectorAll("#choiceButtons button").forEach(button => button.classList.remove("active"));
  document.getElementById(`${newMode}Btn`).classList.add("active");
  renderProfiles();
};

// Initial Load
fetchProfiles();
searchBtn.addEventListener("click", renderProfiles);

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
