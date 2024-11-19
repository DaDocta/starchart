import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Portfolio = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const getFileUrl = `https://starchart-988582688687.us-central1.run.app/getFile?fileName=jsons/${name}.json`;

  // Fetch the profile JSON file
  const fetchProfile = async () => {
    try {
      const response = await fetch(getFileUrl);
      if (!response.ok) throw new Error(`Failed to fetch profile for ${name}`);

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [name]);

  if (!profile) {
    return <p>Loading portfolio...</p>;
  }

  return (
    <div className="portfolio">
      <h1>Portfolio for {profile.name}</h1>
      <p>Location: {profile.location.city}, {profile.location.state}, {profile.location.country}</p>
      <p>About: {profile.about}</p>
      <h2>Skills</h2>
      <ul>
        {profile.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <h2>Experience</h2>
      <ul>
        {profile.experience.map((job, index) => (
          <li key={index}>
            <strong>{job.title}</strong> at {job.company} ({job.duration})
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
