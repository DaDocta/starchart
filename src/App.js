import React, { useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
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
              <Route path="/" element={<Home />} />
              <Route path="/portfolio/:name" element={<Portfolio />} />
              <Route path="/edit/:name" element={<Edit />} />
              <Route
                path="/everything"
                element={isAuthenticated ? <Everything /> : <Navigate to="/" replace />}
              />
            </Routes>
          )}
        </AuthContext.Consumer>
      </div>
    </AuthProvider>
  );
};

export default App;
