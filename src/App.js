import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Portfolio from "./pages/Portfolio";
import Everything from "./pages/Everything";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/everything" element={<Everything />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
