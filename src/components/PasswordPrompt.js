import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const PasswordPrompt = ({ onAuthenticated }) => {
  const { login } = useContext(AuthContext);
  const [passwordInput, setPasswordInput] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordSubmit = () => {
    if (passwordInput === 'DaDocta') {
      login({ user: 'AuthenticatedUser' }); // Set authentication state
      setMessage('');
      onAuthenticated(); // Notify parent component of successful authentication
    } else {
      setMessage('Incorrect password.');
    }
  };

  return (
    <div>
      <h1>Restricted Access</h1>
      <p>Please enter the password to continue:</p>
      <input
        type="password"
        placeholder="Enter password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <button onClick={handlePasswordSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

export default PasswordPrompt;
