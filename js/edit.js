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


const editProfileName = window.location.pathname.split("/").pop();
const editContent = document.getElementById("editContent");

fetch(`data/${editProfileName}.json`)
  .then(response => response.json())
  .then(profile => {
    editContent.innerHTML = `
      <form id="editForm">
        <label>
          Name:
          <input type="text" name="name" value="${profile.name}">
        </label>
        <label>
          About:
          <textarea name="about">${profile.about}</textarea>
        </label>
        <button type="submit">Save</button>
      </form>
    `;

    document.getElementById("editForm").onsubmit = (e) => {
      e.preventDefault();
      const updatedProfile = {
        name: e.target.name.value,
        about: e.target.about.value
      };
      console.log("Updated Profile:", updatedProfile); // Replace with API call to save
    };
  })
  .catch(err => console.error("Error loading profile:", err));
  
  