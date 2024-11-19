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

const everythingProfileName = window.location.pathname.split("/").pop();
const everythingContent = document.getElementById("everythingContent");

fetch(`data/${everythingProfileName}.json`)
  .then(response => response.json())
  .then(profile => {
    everythingContent.textContent = JSON.stringify(profile, null, 2);
  })
  .catch(err => console.error("Error loading profile:", err));
  
  