import React from 'react';
import './TourCard.css';

const TourCard = ({ tour, onSelect }) => {
  return (
    <div className="tour-card" onClick={onSelect}>
      <img src={tour.image} alt={tour.title} className="tour-image" />
      <div className="card-content">
        <h3>{tour.title}</h3>
        <p>{tour.description}</p>
      </div>
    </div>
  );
};

export default TourCard;