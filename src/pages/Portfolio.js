import React from "react";
import { useParams } from "react-router-dom";
import "../styles/Profile.css";

const Portfolio = () => {
  const { name } = useParams();

  return (
    <div className="profile">
      <h1>Portfolio Page</h1>
      <p>Welcome to the profile page for <strong>{name}</strong>.</p>
    </div>
  );
};

export default Portfolio;
