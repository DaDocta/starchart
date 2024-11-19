const params = new URLSearchParams(window.location.search);
const profileName = params.get("name");
const everythingContent = document.getElementById("everythingContent");

if (!profileName) {
  everythingContent.innerHTML = "<p>No profile specified!</p>";
} else {
  fetch(`data/${profileName}.json`)
    .then(response => response.json())
    .then(profile => {
      everythingContent.innerHTML = `<pre>${JSON.stringify(profile, null, 2)}</pre>`;
    })
    .catch(err => {
      everythingContent.innerHTML = `<p>Error loading profile: ${err}</p>`;
    });
}
