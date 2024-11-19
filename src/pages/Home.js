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
  const [notFound, setNotFound] = useState(false); // State for "not found" message

  const listFilesUrl = 'https://starchart-988582688687.us-central1.run.app/listFiles';
  const getFileUrl = 'https://starchart-988582688687.us-central1.run.app/getFile';

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fileNames = await fetchData(listFilesUrl);
        console.log('Fetched file names:', fileNames); // Debugging file names
        const fetchedProfiles = await Promise.all(
          fileNames.map(async (fileName) => {
            const profile = await fetchData(`${getFileUrl}?fileName=${fileName}`);
            console.log(`Fetched profile for ${fileName}:`, profile); // Debugging profile content
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

  const handleSearch = () => {
    const profile = profiles.find(
      (p) => p.name.toLowerCase().trim() === searchQuery.toLowerCase().trim()
    );

    if (profile) {
      const urlSuffix = profile.name.toLowerCase().replace(/\s+/g, '');
      setNotFound(false); // Reset "not found" state
      navigate(`/starchart/${selectedOption}/${urlSuffix}`);
    } else {
      setNotFound(true); // Display "not found" message
    }
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
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      <main>
        {notFound && <div className="not-found">Profile not found. Please try again.</div>}
        <div className="profile-list">
          {profiles.map((profile) => (
            <div
              key={profile.name}
              className="profile-item"
              onClick={() => {
                const urlSuffix = profile.name.toLowerCase().replace(/\s+/g, '');
                navigate(`/starchart/${selectedOption}/${urlSuffix}`);
              }}
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
