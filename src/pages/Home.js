import React, { useState, useEffect } from "react";
import "../styles/Home.css";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // API Endpoints
  const listFilesUrl = "https://starchart-988582688687.us-central1.run.app/listFiles";
  const getFileUrl = "https://starchart-988582688687.us-central1.run.app/getFile";

  // Fetch JSON files from the bucket
  const fetchProfiles = async () => {
    try {
      // Fetch the list of JSON file names
      const response = await fetch(listFilesUrl);
      if (!response.ok) throw new Error("Failed to fetch file list");

      const fileNames = await response.json();
      const fetchedProfiles = [];

      // Fetch each profile file's content
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
      setFilteredProfiles(fetchedProfiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter profiles based on the search query
    const results = profiles.filter(
      (profile) =>
        profile.name.toLowerCase().includes(query) ||
        (profile.description && profile.description.toLowerCase().includes(query))
    );
    setFilteredProfiles(results);
  };

  // Fetch profiles on component mount
  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Search profiles..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="profiles">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, index) => (
            <div key={index} className="profile">
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
