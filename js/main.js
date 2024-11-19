// Constants
const listFilesUrl = 'https://starchart-988582688687.us-central1.run.app/listFiles'; // Replace with the URL for the listFiles function
const getFileUrl = 'https://starchart-988582688687.us-central1.run.app/getFile';     // Replace with the URL for the getFile function
const everythingPassword = "dadocta";

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const profileList = document.getElementById("profileList");
const PortfolioBtn = document.getElementById("PortfolioBtn");
const editBtn = document.getElementById("editBtn");
const everythingBtn = document.getElementById("everythingBtn");

// State
let mode = "Portfolio"; // Default view mode
let profiles = []; // Stores all profiles

// Event Listeners for Choice Buttons
PortfolioBtn.addEventListener("click", () => setMode("Portfolio"));
editBtn.addEventListener("click", () => setMode("edit"));
everythingBtn.addEventListener("click", () => {
  const password = prompt("Enter the password to view Everything:");
  if (password === everythingPassword) {
    setMode("everything");
  } else {
    alert("Incorrect password.");
  }
});

// Fetch JSON profiles dynamically from Google Cloud Functions
const fetchProfiles = async () => {
  profileList.innerHTML = "<p>Loading profiles...</p>";
  try {
    // Fetch the list of JSON files
    const response = await fetch(listFilesUrl);
    const fileNames = await response.json();

    // Fetch each JSON file's content
    profiles = [];
    for (const fileName of fileNames) {
      const profileResponse = await fetch(`${getFileUrl}?fileName=${fileName}`);
      const profile = await profileResponse.json();
      profiles.push(profile);
    }

    // Render the profiles
    renderProfiles();
  } catch (error) {
    console.error("Error loading profiles:", error);
    profileList.innerHTML = "<p>Failed to load profiles. Check the console for details.</p>";
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
      <a href="site/portfolio.html?name=${urlSuffix}">Portfolio</a>
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
