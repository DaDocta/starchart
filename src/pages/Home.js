import React, { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const listFilesUrl = 'https://starchart-988582688687.us-central1.run.app/listFiles';
  const getFileUrl = 'https://starchart-988582688687.us-central1.run.app/getFile';

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fileNames = await fetchData(listFilesUrl);
        const fetchedProfiles = await Promise.all(
          fileNames.map(async (fileName) => {
            try {
              const profile = await fetchData(`${getFileUrl}?fileName=${fileName}`);
              if (profile && profile.name) {
                return profile;
              } else {
                console.warn(`Invalid or incomplete profile: ${fileName}`, profile);
              }
            } catch (error) {
              console.error(`Failed to fetch profile for ${fileName}:`, error);
            }
            return null;
          })
        );

        setProfiles(fetchedProfiles.filter(Boolean)); // Remove null profiles
        setError(null); // Clear errors
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setError(error.message);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="home">
      <header>
        <h1>Star-Themed Portfolio</h1>
        <div id="choiceButtons">
          <button onClick={() => navigate('/portfolio')}>Portfolio</button>
          <button onClick={() => navigate('/edit')}>Edit</button>
          <button
            onClick={() => {
              const password = prompt('Enter password to access everything:');
              if (password === 'dadocta') {
                navigate('/everything');
              } else {
                alert('Incorrect password.');
              }
            }}
          >
            Everything
          </button>
        </div>
        <input
          type="text"
          placeholder="Search profiles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>
      <main>
        <div className="profile-list">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.name}
              className="profile-item"
              onClick={() => navigate(`/portfolio/${profile.name.toLowerCase().replace(/\s+/g, '')}`)}
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
