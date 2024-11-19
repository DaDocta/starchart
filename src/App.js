import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Profile from "./pages/Profile";
import Everything from "./pages/Everything";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:name" element={<Edit />} />
        <Route path="/profile/:name" element={<Profile />} />
        <Route path="/everything/:name" element={<Everything />} />
      </Routes>
    </Router>
  );
};

export default App;
