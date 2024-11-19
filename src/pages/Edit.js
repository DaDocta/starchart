import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import '../styles/Edit.css';

const Edit = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [error, setError] = useState(null);

  const getFileUrl = `https://starchart-988582688687.us-central1.run.app/getFile?fileName=${name}.json`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchData(getFileUrl);
        setProfile(data);
        setUpdatedProfile(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [getFileUrl]);

  const handleSave = async () => {
    // Add save logic here
    console.log('Saving profile:', updatedProfile);
  };

  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="edit">
      <h1>Edit Profile</h1>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={updatedProfile.name || ''}
            onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
          />
        </label>
        <label>
          About:
          <textarea
            value={updatedProfile.about || ''}
            onChange={(e) => setUpdatedProfile({ ...updatedProfile, about: e.target.value })}
          />
        </label>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Edit;
