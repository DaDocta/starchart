import React, { useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Edit from './pages/Edit';
import Everything from './pages/Everything';
import BackgroundVideo from './components/BackgroundVideo';
import { AuthProvider, AuthContext } from './AuthContext';
import './styles/App.css';
import './styles/Transitions.css';

const App = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <AuthProvider>
      <div className="app-container">
        <BackgroundVideo />
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={{ enter: 1500, exit: 500 }}
            unmountOnExit
            appear
            nodeRef={nodeRef}
          >
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
          </CSSTransition>
        </SwitchTransition>
      </div>
    </AuthProvider>
  );
};

export default App;
