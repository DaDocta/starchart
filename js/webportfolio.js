const params = new URLSearchParams(window.location.search);
const profileName = params.get("name"); // Get name from URL, e.g., 'lukeweidner'
const content = document.getElementById("portfolioContent");
const nameHeader = document.getElementById("profileName");

if (!profileName) {
  content.innerHTML = "<p>No profile specified!</p>";
} else {
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
    .catch(err => {
      content.innerHTML = `<p>Error loading profile: ${err}</p>`;
    });
}
