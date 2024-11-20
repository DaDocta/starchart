import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    // Initialize from localStorage
    const storedState = localStorage.getItem('authState');
    return storedState
      ? JSON.parse(storedState)
      : { isAuthenticated: false, user: null, passwordEntered: false };
  });

  useEffect(() => {
    // Persist the authentication state in localStorage
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  const login = (userData) => {
    setAuthState({ isAuthenticated: true, user: userData, passwordEntered: true });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null, passwordEntered: false });
    localStorage.removeItem('authState'); // Clear localStorage
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
