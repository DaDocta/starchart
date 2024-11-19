import React, { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';
import '../styles/Everything.css';

const Everything = () => {
  const [profiles, setProfiles] = useState([]);
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
            return profile || null;
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

  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className="everything">
      <h1>Everything</h1>
      <div className="profile-list">
        {profiles.map((profile) => (
          <pre key={profile.name}>{JSON.stringify(profile, null, 2)}</pre>
        ))}
      </div>
    </div>
  );
};

export default Everything;
