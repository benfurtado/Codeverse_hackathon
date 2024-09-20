import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Converter() {
  const [file, setFile] = useState(null);
  const [modelUrl, setModelUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConvert = () => {
    if (!file) {
      alert('Please select a PNG file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/convert-to-3d/', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setModelUrl(data.modelUrl);
      } else {
        alert('Conversion failed.');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <input type="file" accept="image/png" onChange={handleFileChange} />
      <button onClick={handleConvert}>Convert to 3D Model</button>
      {modelUrl && (
        <div>
          <h2>3D Model</h2>
          <a href={modelUrl} target="_blank" rel="noopener noreferrer">View Model</a>
          
          {/* You can use a 3D model viewer here, e.g., Three.js */}
        </div>
      )}
      <br/>
      <Link to="/">
        <button style={{ backgroundColor: 'lightblue', borderRadius: '100px' }}>Back</button> {/* Temporary background color */}
      </Link>
    </div>
  );
}

export default Converter;
