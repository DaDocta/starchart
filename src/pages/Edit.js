import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Edit = () => {
  const { isAuthenticated, passwordEntered } = useContext(AuthContext);
  const { name } = useParams(); // Get the name parameter from the URL
  const [fileName, setFileName] = useState('');
  const [jsonContent, setJsonContent] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editKey, setEditKey] = useState('');
  const [editValue, setEditValue] = useState('');
  const [removeKey, setRemoveKey] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const apiUrl = 'https://starchart-988582688687.us-central1.run.app';

  useEffect(() => {
    // Clear fields when switching between /edit and /edit/:name
    setNewKey('');
    setNewValue('');
    setEditKey('');
    setEditValue('');
    setRemoveKey('');
  }, [name]);

  const handleUploadJson = async () => {
    if (!fileName || !jsonContent) {
      setMessage('File name and content are required.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/uploadFile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: `${fileName}.json`, content: JSON.parse(jsonContent) }),
      });

      if (!response.ok) throw new Error('Failed to upload JSON file');
      setMessage('JSON file uploaded successfully.');
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

  if (!name) {
    // Global editing options
    return (
      <div>
        <h1>Edit Options</h1>
        <div>
          <h2>Upload New JSON File</h2>
          <input
            type="text"
            placeholder="File name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <textarea
            placeholder="JSON content"
            value={jsonContent}
            onChange={(e) => setJsonContent(e.target.value)}
            rows="10"
            cols="50"
          ></textarea>
          <button onClick={handleUploadJson}>Upload</button>
        </div>
        <div>
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
        <p>{message}</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  // Edit specific file
  return (
    <div>
      <h1>Edit JSON File: {name}</h1>
      <div>
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
        <button onClick={() => handleAddKeyToAll()}>Add Key</button>
      </div>
      <div>
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
        <button onClick={() => handleEditKey()}>Edit Key</button>
      </div>
      <div>
        <h2>Remove Key</h2>
        <input
          type="text"
          placeholder="Key to remove"
          value={removeKey}
          onChange={(e) => setRemoveKey(e.target.value)}
        />
        <button onClick={() => handleRemoveKey()}>Remove Key</button>
      </div>
      <p>{message}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Edit;
