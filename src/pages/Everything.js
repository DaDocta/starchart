import React from "react";
import { useParams } from "react-router-dom";
import "../styles/Everything.css";

const Everything = () => {
  const { name } = useParams();

  return (
    <div className="everything">
      <h1>Everything Page</h1>
      <p>Accessing everything for <strong>{name}</strong>.</p>
    </div>
  );
};

export default Everything;
