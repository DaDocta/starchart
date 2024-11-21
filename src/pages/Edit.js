import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import BackgroundVideo from '../components/BackgroundVideo'; // Import background video component
import '../styles/Edit.css'; // Import CSS for styling

const Edit = () => {
  const { isAuthenticated, passwordEntered } = useContext(AuthContext);
  const { name } = useParams(); // Get the name parameter from the URL
  const [fileName, setFileName] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null); // State to store the uploaded file
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editKey, setEditKey] = useState('');
  const [editValue, setEditValue] = useState('');
  const [removeKey, setRemoveKey] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const apiUrl = 'https://starchart-988582688687.us-central1.run.app';

  useEffect(() => {
    setNewKey('');
    setNewValue('');
    setEditKey('');
    setEditValue('');
    setRemoveKey('');
  }, [name]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  const handleUploadFile = async () => {
    if (!uploadedFile) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await fetch(`${apiUrl}/uploadFile`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload file');
      setMessage('File uploaded successfully.');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddKeyToAll = async () => {
    if (!newKey) {
      setMessage('Key is required.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/addKeyToAll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: newKey, value: newValue }),
      });

      if (!response.ok) throw new Error('Failed to add key to all JSON files');
      setMessage('Key added to all JSON files successfully.');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditKey = async () => {
    if (!editKey) {
      setMessage('Key to edit is required.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/editFile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: `${name}.json`,
          edits: [{ action: 'edit', key: editKey, value: editValue }],
        }),
      });

      if (!response.ok) throw new Error('Failed to edit key');
      setMessage(`Key "${editKey}" updated successfully.`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveKey = async () => {
    if (!removeKey) {
      setMessage('Key to remove is required.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/editFile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: `${name}.json`,
          edits: [{ action: 'remove', key: removeKey }],
        }),
      });

      if (!response.ok) throw new Error('Failed to remove key');
      setMessage(`Key "${removeKey}" removed successfully.`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isAuthenticated && !passwordEntered) {
    return <div>Please log in to access the editing functionality.</div>;
  }

  return (
    <div className="edit">
      <BackgroundVideo />
      <div className="content">
        {!name ? (
          <>
            <h1>Edit Options</h1>
            <div className="option">
            <h2>Upload JSON File</h2>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange} // Handle file selection
            />
            <label htmlFor="file-upload" className="file-upload-label">
              Choose File
            </label>
            <button onClick={handleUploadFile}>Upload File</button>
          </div>
          <div className="option">
            <h2>Add Key to All JSON Files</h2>
            <input
              type="text"
              placeholder="New key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />
            <input
              type="text"
              placeholder="Default value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <button onClick={handleAddKeyToAll}>Add Key</button>
          </div>

          </>
        ) : (
          <>
            <h1>Edit JSON File: {name}</h1>
            <div className="option">
              <h2>Add New Key</h2>
              <input
                type="text"
                placeholder="Key to add"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
              />
              <input
                type="text"
                placeholder="Value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              <button onClick={handleAddKeyToAll}>Add Key</button>
            </div>
            <div className="option">
              <h2>Edit Existing Key</h2>
              <input
                type="text"
                placeholder="Key to edit"
                value={editKey}
                onChange={(e) => setEditKey(e.target.value)}
              />
              <input
                type="text"
                placeholder="New value"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={handleEditKey}>Edit Key</button>
            </div>
            <div className="option">
              <h2>Remove Key</h2>
              <input
                type="text"
                placeholder="Key to remove"
                value={removeKey}
                onChange={(e) => setRemoveKey(e.target.value)}
              />
              <button onClick={handleRemoveKey}>Remove Key</button>
            </div>
          </>
        )}
        <p>{message}</p>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Edit;
