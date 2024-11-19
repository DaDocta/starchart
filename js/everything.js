const params = new URLSearchParams(window.location.search);
const profileName = params.get("name"); // Get name from URL
const everythingContent = document.getElementById("everythingContent");

if (!profileName) {
  everythingContent.innerHTML = "<p>No profile specified!</p>";
} else {
  fetch(`https://starchart-988582688687.us-central1.run.app/getFile?fileName=${profileName}.json`)
    .then(response => response.json())
    .then(profile => {
      everythingContent.innerHTML = `<pre>${JSON.stringify(profile, null, 2)}</pre>`;
    })
    .catch(err => {
      everythingContent.innerHTML = `<p>Error loading profile: ${err.message}</p>`;
    });
}
