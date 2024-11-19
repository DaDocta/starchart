import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('edit'); // Default dropdown option
  const [error, setError] = useState(null);

  const listFilesUrl = 'https://starchart-988582688687.us-central1.run.app/listFiles';
  const getFileUrl = 'https://starchart-988582688687.us-central1.run.app/getFile';

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fileNames = await fetchData(listFilesUrl);
        const fetchedProfiles = await Promise.all(
          fileNames.map(async (fileName) => {
            const profile = await fetchData(`${getFileUrl}?fileName=${fileName}`);
            return profile && profile.name ? profile : null;
          })
        );
        setProfiles(fetchedProfiles.filter(Boolean));
        setError(null);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError(err.message);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (profileName) => {
    const urlSuffix = profileName.toLowerCase().replace(/\s+/g, '');
    navigate(`/starchart/${selectedOption}/${urlSuffix}`);
  };

  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className="home">
      <header>
        <h1>Star-Themed Portfolio</h1>
        <div className="navigation-controls">
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="edit">Edit</option>
            <option value="portfolio">Portfolio</option>
            <option value="everything">Everything</option>
          </select>
        </div>
      </header>
      <main>
        <div className="profile-list">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.name}
              className="profile-item"
              onClick={() => handleNavigate(profile.name)}
            >
              <h2>{profile.name}</h2>
              <p>{profile.about}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
