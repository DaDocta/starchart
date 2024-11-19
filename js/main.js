// Constants
const listFilesUrl = 'https://starchart-988582688687.us-central1.run.app/listFiles'; // API endpoint for listing files
const getFileUrl = 'https://starchart-988582688687.us-central1.run.app/getFile';     // API endpoint for fetching individual files
const everythingPassword = "dadocta";

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const profileList = document.getElementById("profileList");
const portfolioBtn = document.getElementById("PortfolioBtn");
const editBtn = document.getElementById("editBtn");
const everythingBtn = document.getElementById("everythingBtn");

// State
let mode = "Portfolio"; // Default view mode
let profiles = []; // Stores all profiles

// Event Listeners for Choice Buttons
portfolioBtn.addEventListener("click", () => setMode("Portfolio"));
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
  try {
    const response = await fetch(listFilesUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const fileNames = await response.json();

    profiles = [];
    for (const fileName of fileNames) {
      const profileResponse = await fetch(`${getFileUrl}?fileName=${fileName}`);
      if (!profileResponse.ok) {
        console.error(`Error fetching profile for file: ${fileName}`);
        continue;
      }
      const profile = await profileResponse.json();
      if (profile && profile.name) profiles.push(profile);
    }

    renderProfiles();
  } catch (error) {
    console.error("Error loading profiles:", error);
    profileList.innerHTML = "<p>Failed to load profiles. Check the console for details.</p>";
  }
};

// Render profiles based on mode and search query
const renderProfiles = () => {
  profileList.innerHTML = ""; // Clear the current list
  const query = searchInput.value.toLowerCase(); // Normalize the search query

  // Filter profiles that are valid and match the search query
  const filteredProfiles = profiles.filter(profile =>
    profile && profile.name && profile.name.toLowerCase().includes(query)
  );

  if (filteredProfiles.length === 0) {
    profileList.innerHTML = "<p>No profiles found.</p>";
    return;
  }

  // Dynamically create profile items
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


// Set active mode and re-render profiles
const setMode = (newMode) => {
  mode = newMode;

  // Update button styles
  document.querySelectorAll("#choiceButtons button").forEach(button => {
    button.classList.remove("active");
  });
  document.getElementById(`${newMode}Btn`).classList.add("active");

  // Rerender profiles if needed
  renderProfiles();
};

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

// Initial Setup
createStars(); // Add stars to the background
fetchProfiles(); // Fetch profiles on load
searchBtn.addEventListener("click", renderProfiles); // Add event listener for search
