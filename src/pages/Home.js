import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const navigate = useNavigate();

  const listFilesUrl = "https://starchart-988582688687.us-central1.run.app/listFiles";
  const getFileUrl = "https://starchart-988582688687.us-central1.run.app/getFile";

  // Fetch JSON files from the bucket
  const fetchProfiles = async () => {
    try {
      const response = await fetch(listFilesUrl);
      if (!response.ok) throw new Error("Failed to fetch file list");

      const fileNames = await response.json();
      const fetchedProfiles = [];

      // Extract profile names from file names (e.g., 'lukeweidner.json' -> 'Luke Weidner')
      fileNames.forEach((fileName) => {
        const name = fileName.replace(".json", "");
        fetchedProfiles.push({ name, fileName });
      });

      setProfiles(fetchedProfiles);
      setFilteredProfiles(fetchedProfiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter profiles based on the search query
    const results = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(query)
    );
    setFilteredProfiles(results);
  };

  const selectName = (name) => {
    setSelectedName(name);
  };

  const navigateToPage = (page) => {
    if (selectedName) {
      navigate(`/${page}/${selectedName}`);
    } else {
      alert("Please search for and select a name first.");
    }
  };

  // Fetch profiles when the component loads
  React.useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="home">
      <h1>Choose an Option</h1>
      <div className="button-group">
        <button onClick={() => navigateToPage("edit")}>Edit</button>
        <button onClick={() => navigateToPage("portfolio")}>Portfolio</button>
        <button onClick={() => navigateToPage("everything")}>Everything</button>
      </div>
      <input
        type="text"
        placeholder="Search profiles..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="profiles">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, index) => (
            <div
              key={index}
              className={`profile ${selectedName === profile.name ? "selected" : ""}`}
              onClick={() => selectName(profile.name)}
            >
              <h2>{profile.name}</h2>
            </div>
          ))
        ) : (
          <p>No profiles found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
