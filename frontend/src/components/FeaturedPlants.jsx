// src/components/FeaturedPlants.jsx
import React from 'react';
import './FeaturedPlants.css';

const FeaturedPlants = () => {
  // Static data for featured plants (removed "use" property)
  const featuredPlants = [
    {
      name: "Tulsi",
      image: "/images/Tulsi.jpg", // Placeholder path; update with your image
    },
    {
      name: "Neem",
      image: "/images/neem.jpg", // Placeholder path; update with your image
    },
    {
      name: "Turmeric",
      image: "/images/turmeric.jpg", // Placeholder path; update with your image
    },
    {
      name: "Ashwagandha",
      image: "/images/Ashwagandha.jpg", // Placeholder path; update with your image
    },
    {
      name: "Aloe Vera",
      image: "/images/Aloevera.jpg", // Placeholder path; update with your image
    },
    {
      name: "Giloy",
      image: "/images/giloy.jpg", // Placeholder path; update with your image
    },
    {
      name: "Brahmi",
      image: "/images/brahmi.jpg", // Placeholder path; update with your image
    },
    {
      name: "Mint",
      image: "/images/mint.jpg", // Placeholder path; update with your image
    },
    {
      name: "Lavender",
      image: "/images/lavender.jpg", // Placeholder path; update with your image
    },
    {
      name: "Ginger",
      image: "/images/ginger.jpg", // Placeholder path; update with your image
    },
  ];

  return (
    <section className="featured-plants">
      <h2>Featured Medicinal Plants</h2>
      <div className="plants-scroll-container">
        <div className="plants-scroll">
          {featuredPlants.map((plant, index) => (
            <div className="plant-card" key={index}>
              <img src={plant.image} alt={plant.name} className="plant-image" />
              <h3>{plant.name}</h3>
            </div>
          ))}
          {/* Duplicate the cards for seamless looping */}
          {featuredPlants.map((plant, index) => (
            <div className="plant-card" key={`duplicate-${index}`}>
              <img src={plant.image} alt={plant.name} className="plant-image" />
              <h3>{plant.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlants;