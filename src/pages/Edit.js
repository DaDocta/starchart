import React from "react";
import { useParams } from "react-router-dom";
import "../styles/Edit.css";

const Edit = () => {
  const { name } = useParams();

  return (
    <div className="edit">
      <h1>Edit Profile</h1>
      <p>You are editing the profile for <strong>{name}</strong>.</p>
    </div>
  );
};

export default Edit;
