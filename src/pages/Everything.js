import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import { AuthContext } from '../AuthContext';
import PasswordPrompt from '../components/PasswordPrompt';

const Everything = () => {
  const { name } = useParams();
  const { isAuthenticated, passwordEntered } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const getFileUrl = name
    ? `https://starchart-988582688687.us-central1.run.app/getFile?fileName=${name}.json`
    : null;

  useEffect(() => {
    if ((isAuthenticated || passwordEntered) && name) {
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
    }
  }, [isAuthenticated, passwordEntered, name, getFileUrl]);

  if (!isAuthenticated && !passwordEntered) {
    return <PasswordPrompt onAuthenticated={() => {}} />;
  }

  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!profile && name) return <div>Loading...</div>;

  return (
    <div>
      <h1>{name ? `Everything: ${name}` : 'Everything'}</h1>
      {profile ? (
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      ) : (
        <p>No specific profile selected. Access the global data or search for a profile.</p>
      )}
    </div>
  );
};

export default Everything;
