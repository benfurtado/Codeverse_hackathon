import React from 'react';
import './FeaturedPlants.css';

const FeaturedPlants = () => {
  // Static data for featured plants
  const featuredPlants = [
    {
      name: "Tulsi",
      image: "/images/Tulsi.jpg", // Placeholder path; update with your image
      use: "Boosts immunity and relieves stress.",
    },
    {
      name: "Neem",
      image: "/images/neem.jpg", // Placeholder path; update with your image
      use: "Antibacterial and skin-healing properties.",
    },
    {
      name: "Turmeric",
      image: "/images/turmeric.jpg", // Placeholder path; update with your image
      use: "Anti-inflammatory and aids digestion.",
    },
    {
      name: "Ashwagandha",
      image: "/images/Ashwagandha.jpg", // Placeholder path; update with your image
      use: "Reduces stress and improves energy levels.",
    },
    {
      name: "Aloe Vera",
      image: "/images/aloevera.jpg", // Placeholder path; update with your image
      use: "Promotes skin health and hydration.",
    },
  ];

  return (
    <section className="featured-plants">
      <h2>Featured Medicinal Plants</h2>
      <div className="plants-grid">
        {featuredPlants.map((plant, index) => (
          <div className="plant-card" key={index}>
            <img src={plant.image} alt={plant.name} className="plant-image" />
            <h3>{plant.name}</h3>
            <p>{plant.use}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPlants;