import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const getFileUrl = `https://starchart-988582688687.us-central1.run.app/getFile?fileName=${name}.json`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchData(getFileUrl);
        setProfile(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [getFileUrl]);

  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="portfolio">
      <h1>{profile.name}</h1>
      <p>{profile.about}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default Portfolio;
