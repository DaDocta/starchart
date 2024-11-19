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
  const [notFound, setNotFound] = useState(false);

  const baseUrl = 'https://<region>-<project>.cloudfunctions.net/starchartFunction';
  const listFilesUrl = `${baseUrl}/listFiles`;
  const getFileUrl = `${baseUrl}/getFile`;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        console.log('Fetching file names...');
        const fileNames = await fetchData(listFilesUrl);
        console.log('Fetched file names:', fileNames);

        const fetchedProfiles = await Promise.all(
          fileNames.map(async (fileName) => {
            try {
              const profile = await fetchData(`${getFileUrl}?fileName=${fileName}`);
              if (profile && profile.name) {
                console.log(`Valid profile for ${fileName}:`, profile);
                return profile;
              } else {
                console.warn(`Invalid profile for ${fileName}:`, profile);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching profile for ${fileName}:`, error);
              return null;
            }
          })
        );

        const validProfiles = fetchedProfiles.filter(Boolean); // Keep only valid profiles
        console.log('Valid profiles:', validProfiles);
        setProfiles(validProfiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setError(error.message);
      }
    };

    fetchProfiles();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    console.log('Search query:', query);

    const profile = profiles.find((p) => p.name.toLowerCase() === query);

    if (profile) {
      const urlSuffix = profile.name.toLowerCase().replace(/\s+/g, '');
      console.log(`Navigating to /starchart/${selectedOption}/${urlSuffix}`);
      setNotFound(false);
      navigate(`/starchart/${selectedOption}/${urlSuffix}`);
    } else {
      console.warn('No profile found for query:', query);
      setNotFound(true);
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
