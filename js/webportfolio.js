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


const profileName = window.location.pathname.split("/").pop();
const content = document.getElementById("portfolioContent");
const nameHeader = document.getElementById("profileName");

fetch(`data/${profileName}.json`)
.then(response => response.json())
.then(profile => {
    nameHeader.textContent = profile.name;
    content.innerHTML = `
    <section>
        <h2>About</h2>
        <p>${profile.about}</p>
    </section>
    <section>
        <h2>Skills</h2>
        <ul>${profile.skills.map(skill => `<li>${skill}</li>`).join("")}</ul>
    </section>
    <section>
        <h2>Experience</h2>
        ${profile.experience.map(exp => `
        <div>
            <h3>${exp.title} at ${exp.company}</h3>
            <p>${exp.duration}</p>
            <p>${exp.description}</p>
        </div>
        `).join("")}
    </section>
    `;
})
.catch(err => console.error("Error loading profile:", err));
  