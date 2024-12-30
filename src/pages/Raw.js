import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import { AuthContext } from '../AuthContext';
import PasswordPrompt from '../components/PasswordPrompt';
import BackgroundVideo from '../components/BackgroundVideo';
import '../styles/Raw.css';

const Raw = () => {
  const { name } = useParams();
  const { isAuthenticated, passwordEntered } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editableProfile, setEditableProfile] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const apiUrl = `https://starchart-988582688687.us-central1.run.app`;
  const getFileUrl = name ? `${apiUrl}/getFile?fileName=${name}.json` : null;

  useEffect(() => {
    if ((isAuthenticated || passwordEntered) && name) {
      const fetchProfile = async () => {
        try {
          const data = await fetchData(getFileUrl);
          setProfile(data);
          setEditableProfile(JSON.stringify(data, null, 2)); // Initialize editable JSON
          setError(null);
        } catch (err) {
          console.error('Error fetching profile:', err);
          setError(err.message);
        }
      };

      fetchProfile();
    }
  }, [isAuthenticated, passwordEntered, name, getFileUrl]);

  const handleSave = async () => {
    try {
      const updatedProfile = JSON.parse(editableProfile); // Parse editable JSON
      const response = await fetch(`${apiUrl}/editFile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: `${name}.json`, data: updatedProfile }),
      });

      if (!response.ok) throw new Error('Failed to save changes');
      setMessage('Changes saved successfully.');
      setProfile(updatedProfile); // Update original profile
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(err.message || 'Failed to save changes.');
    }
  };

  if (!isAuthenticated && !passwordEntered) {
    return <PasswordPrompt onAuthenticated={() => {}} />;
  }

  if (error) {
    return (
      <div className="raw">
        <BackgroundVideo />
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!profile && name) {
    return (
      <div className="raw">
        <BackgroundVideo />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="raw">
      <BackgroundVideo />
      <div className="content">
        <h1>{name ? `Raw: ${name}` : 'Raw'}</h1>
        {profile ? (
          <>
            <textarea
              className="json"
              value={editableProfile}
              onChange={(e) => setEditableProfile(e.target.value)} // Allow inline editing
              rows="20"
            />
            <button onClick={handleSave}>Save Changes</button>
            {message && <p className="success-message">{message}</p>}
          </>
        ) : (
          <p>No specific profile selected. Access the global data or search for a profile.</p>
        )}
      </div>
    </div>
  );
};

export default Raw;
