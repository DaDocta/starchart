import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import '../styles/PasswordPrompt.css'; // Import CSS

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
    <div className="password-prompt">
      <div className="password-prompt-container">
        <h1>Restricted Access</h1>
        <p>Please enter the password to continue:</p>
        <input
          type="password"
          placeholder="Enter password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="password-input"
        />
        <button onClick={handlePasswordSubmit} className="password-submit-button">
          Submit
        </button>
        {message && <p className="password-message">{message}</p>}
      </div>
    </div>
  );
};

export default PasswordPrompt;
