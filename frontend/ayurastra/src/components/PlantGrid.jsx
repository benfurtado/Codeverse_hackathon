import React from 'react';
import './PlantGrid.css';

const PlantGrid = () => {
  return (
    <div className="plant-grid">
      <div className="plant-card">
        <img src="images/Tulsi.jpg" alt="Tulsi" className="plant-image" /> {/* Add class */}
        <h3>Tulsi</h3>
        <p>Ocimum tenuiflorum</p>
      </div>
      <div className="plant-card">
        <img src="images/neem.jpg" alt="Neem" className="plant-image" /> {/* Add class */}
        <h3>Neem</h3>
        <p>Azadirachta indica</p>
      </div>
      <div className="plant-card">
        <img src="images/turmeric.jpg" alt="Turmeric" className="plant-image" /> {/* Add class */}
        <h3>Turmeric</h3>
        <p>Curcuma longa</p>
      </div>
    </div>
  );
};

export default PlantGrid;