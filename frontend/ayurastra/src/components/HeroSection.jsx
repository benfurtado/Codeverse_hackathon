import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      {/* Video Background */}
      <video autoPlay muted loop className="hero-video">
        <source src="/images/herosectionvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="hero-content">
        <h1>Discover the Power of Nature</h1>
        <p className="hero-subtitle">Explore medicinal plants in an immersive 3D environment.</p>
        <button className="cta-btn">Start Exploring</button>
      </div>
    </section>
  );
};

export default HeroSection;