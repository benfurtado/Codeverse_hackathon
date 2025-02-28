
// src/components/PlantModelViewer.jsx
import React from 'react';
import './PlantModelViewer.css'; // Create this CSS file

const PlantModelViewer = () => {
  return (
    <div className="model-viewer">
      <h3>3D Plant Model</h3>
      <div className="model-container">
        {/* 3D model integration (e.g., Three.js) goes here */}
      </div>
    </div>
  );
};

export default PlantModelViewer;