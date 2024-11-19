const params = new URLSearchParams(window.location.search);
const profileName = params.get("name"); // Get name from URL
const editContent = document.getElementById("editContent");

if (!profileName) {
  editContent.innerHTML = "<p>No profile specified!</p>";
} else {
  fetch(`https://starchart-988582688687.us-central1.run.app/getFile?fileName=${profileName}.json`)
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

        // API call to save updated profile
        fetch(`https://starchart-988582688687.us-central1.run.app/updateFile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: `${profileName}.json`, content: updatedProfile })
        })
          .then(response => {
            if (response.ok) {
              alert("Profile updated successfully!");
            } else {
              throw new Error("Failed to update profile.");
            }
          })
          .catch(err => alert(`Error: ${err.message}`));
      };
    })
    .catch(err => {
      editContent.innerHTML = `<p>Error loading profile: ${err.message}</p>`;
    });
}
