import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <section className="features">
      <h2>Key Features</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <i className="icon">🌿</i>
          <h3>Immersive 3D Models</h3>
          <p>Explore plants from all angles with interactive 3D models.</p>
        </div>
        <div className="feature-card">
          <i className="icon">🔍</i>
          <h3>AI-Powered Plant Identification</h3>
          <p>Instantly identify plants using AI scanning technology.</p>
        </div>
        <div className="feature-card">
          <i className="icon">🗺️</i>
          <h3>Guided Learning Tours</h3>
          <p>Thematic tours to learn about plants for specific health needs.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;