import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const navigate = useNavigate();

  const listFilesUrl = "https://starchart-988582688687.us-central1.run.app/listFiles";
  const getFileUrl = "https://starchart-988582688687.us-central1.run.app/getFile";

  // Fetch profiles (you can use useEffect if this is needed to auto-fetch on mount)
  const fetchProfiles = async () => {
    try {
      const response = await fetch(listFilesUrl);
      if (!response.ok) throw new Error("Failed to fetch file list");

      const fileNames = await response.json();
      const fetchedProfiles = [];

      for (const fileName of fileNames) {
        try {
          const profileResponse = await fetch(`${getFileUrl}?fileName=${fileName}`);
          if (!profileResponse.ok) {
            console.error(`Failed to fetch profile: ${fileName}`);
            continue;
          }
          const profile = await profileResponse.json();
          fetchedProfiles.push(profile);
        } catch (error) {
          console.error(`Error fetching profile "${fileName}":`, error);
        }
      }

      setProfiles(fetchedProfiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
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

  // Filter profiles based on search
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="home">
      <h1>Choose an Option</h1>
      <div className="button-group">
        <button onClick={() => navigateToPage("edit")}>Edit</button>
        <button onClick={() => navigateToPage("profile")}>Profile</button>
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
              <p>{profile.description || "No description available"}</p>
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
