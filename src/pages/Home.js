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

  const baseApiUrl = 'https://starchart-988582688687.us-central1.run.app';

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fileNames = await fetchData(`${baseApiUrl}/listFiles`);
        const fetchedProfiles = await Promise.all(
          fileNames.map(async (fileName) => {
            try {
              const profile = await fetchData(`${baseApiUrl}/getFile?fileName=${fileName}`);
              return profile && profile.name ? profile : null;
            } catch {
              return null;
            }
          })
        );
        setProfiles(fetchedProfiles.filter(Boolean)); // Keep only valid profiles
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError(err.message);
      }
    };

    fetchProfiles();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    const profile = profiles.find((p) => p.name.toLowerCase() === query);

    if (profile) {
      const urlSuffix = profile.name.toLowerCase().replace(/\s+/g, '');
      navigate(`/${selectedOption}/${urlSuffix}`);
    } else if (selectedOption === 'edit' && !searchQuery) {
      navigate('/edit'); // Navigate to global edit page
    } else {
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
          <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="edit">Edit</option>
            <option value="portfolio">Portfolio</option>
            <option value="everything">Everything</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      {notFound && <div>Profile not found. Please try again.</div>}
    </div>
  );
};

export default Home;
