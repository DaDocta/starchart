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
  console.log("Fetching profile list from:", listFilesUrl); // Debugging: API URL
  try {
    const response = await fetch(listFilesUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch profile list. HTTP status: ${response.status}`);
    }
    const fileNames = await response.json();
    console.log("Received file names:", fileNames); // Debugging: File names

    profiles = [];
    for (const fileName of fileNames) {
      try {
        console.log(`Fetching profile for file: ${fileName}`); // Debugging: Fetching individual profile
        const profileResponse = await fetch(`${getFileUrl}?fileName=${fileName}`);
        if (!profileResponse.ok) {
          console.error(`Failed to fetch profile for file: ${fileName}. HTTP status: ${profileResponse.status}`);
          continue; // Skip problematic files
        }
        const profile = await profileResponse.json();
        console.log(`Fetched profile:`, profile); // Debugging: Log the entire profile object
        if (profile && typeof profile.name === 'string') {
          profiles.push(profile); // Add only valid profiles
        } else {
          console.warn(`Profile is invalid or missing a valid name: ${fileName}`, profile); // Debugging: Invalid profile
        }
      } catch (profileError) {
        console.error(`Error fetching profile for file: ${fileName}`, profileError); // Debugging: Individual fetch error
      }
    }

    console.log("Fetched profiles array:", profiles); // Debugging: Final profiles array
    renderProfiles(); // Render profiles after fetching
  } catch (error) {
    console.error("Error loading profiles:", error); // Debugging: Overall fetch error
    profileList.innerHTML = "<p>Failed to load profiles. Check the console for details.</p>";
  }
};

// Render profiles based on mode and search query
const renderProfiles = () => {
  profileList.innerHTML = ""; // Clear the current list
  const query = searchInput.value.toLowerCase().trim(); // Normalize the search query

  // Filter valid profiles and match the search query
  const filteredProfiles = profiles.filter(profile => {
    if (profile && typeof profile.name === 'string') {
      return profile.name.toLowerCase().includes(query);
    } else {
      console.warn("Skipping invalid profile:", profile); // Debugging: Skipped invalid profile
      return false;
    }
  });

  if (filteredProfiles.length === 0) {
    profileList.innerHTML = "<p>No profiles found.</p>";
    return;
  }

  // Dynamically render each filtered profile
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

  console.log("Rendered profiles:", filteredProfiles); // Debugging: Rendered profiles
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
console.log("Initializing application..."); // Debugging: Initialization
createStars(); // Add stars to the background
fetchProfiles(); // Fetch profiles on load
searchBtn.addEventListener("click", renderProfiles); // Add event listener for search
