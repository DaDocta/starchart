import React, { useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Edit from './pages/Edit';
import Everything from './pages/Everything';
import { AuthProvider, AuthContext } from './AuthContext';
import './styles/App.css';

const App = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <AuthProvider>
      <div className="page-content" ref={nodeRef}>
        <AuthContext.Consumer>
          {({ isAuthenticated }) => (
            <Routes location={location}>
              {/* Home */}
              <Route path="/" element={<Home />} />
              {/* Portfolio */}
              <Route path="/portfolio/:name" element={<Portfolio />} />
              {/* Edit */}
              {/* Global edit page */}
              <Route path="/edit" element={<Edit />} />
              {/* Edit specific profile */}
              <Route path="/edit/:name" element={<Edit />} />
              {/* Everything */}
              <Route path="/everything/:name" element={<Everything />} />
              {/* Authentication-protected route */}
              <Route
                path="/protected"
                element={isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" />}
              />
            </Routes>
          )}
        </AuthContext.Consumer>
      </div>
    </AuthProvider>
  );
};

export default App;
