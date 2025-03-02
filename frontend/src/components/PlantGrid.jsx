// src/components/PlantGrid.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PlantGrid.css';

// Sample plant data
const plants = [
  { id: 1, name: 'Tulsi', scientificName: 'Ocimum tenuiflorum', image: '/images/Tulsi.jpg', medicinalUse: 'Immunity', region: 'North India', type: 'Herb' },
  { id: 2, name: 'Neem', scientificName: 'Azadirachta indica', image: '/images/neem.jpg', medicinalUse: 'Digestion', region: 'South India', type: 'Tree' },
  { id: 3, name: 'Turmeric', scientificName: 'Curcuma longa', image: '/images/turmeric.jpg', medicinalUse: 'Immunity', region: 'East India', type: 'Herb' },
  { id: 4, name: 'Aloe Vera', scientificName: 'Aloe barbadensis', image: '/images/Aloevera.jpg', medicinalUse: 'Skin Care', region: 'West India', type: 'Herb' },
  { id: 5, name: 'Ashwagandha', scientificName: 'Withania somnifera', image: '/images/Ashwagandha.jpg', medicinalUse: 'Stress Relief', region: 'Central India', type: 'Shrub' },
  { id: 6, name: 'Brahmi', scientificName: 'Bacopa monnieri', image: '/images/brahmi.jpg', medicinalUse: 'Memory Enhancement', region: 'South India', type: 'Herb' },
  { id: 7, name: 'Giloy', scientificName: 'Tinospora cordifolia', image: '/images/giloy.jpg', medicinalUse: 'Immunity', region: 'North India', type: 'Climber' },
  { id: 8, name: 'Mint', scientificName: 'Mentha', image: '/images/mint.jpg', medicinalUse: 'Digestion', region: 'North India', type: 'Herb' },
  { id: 9, name: 'Lavender', scientificName: 'Lavandula', image: '/images/lavender.jpg', medicinalUse: 'Relaxation', region: 'Himalayan Region', type: 'Herb' },
  { id: 10, name: 'Ginger', scientificName: 'Zingiber officinale', image: '/images/ginger.jpg', medicinalUse: 'Digestion', region: 'East India', type: 'Herb' },
  { id: 11, name: 'Lemon Grass', scientificName: 'Cymbopogon citratus', image: '/images/lemongrass.jpg', medicinalUse: 'Detoxification', region: 'South India', type: 'Herb' },
  { id: 12, name: 'Fenugreek', scientificName: 'Trigonella foenum-graecum', image: '/images/fenugreek.jpg', medicinalUse: 'Diabetes Management', region: 'North India', type: 'Herb' },
  { id: 13, name: 'Peppermint', scientificName: 'Mentha piperita', image: '/images/peppermint.jpg', medicinalUse: 'Headache Relief', region: 'West India', type: 'Herb' },
  { id: 14, name: 'Holy Basil (Krishna Tulsi)', scientificName: 'Ocimum sanctum', image: '/images/krishnatulsi.jpg', medicinalUse: 'Respiratory Health', region: 'Central India', type: 'Herb' },
  { id: 15, name: 'Indian Gooseberry (Amla)', scientificName: 'Phyllanthus emblica', image: '/images/amla.jpg', medicinalUse: 'Hair & Skin Health', region: 'South India', type: 'Tree' },
  { id: 16, name: 'Licorice', scientificName: 'Glycyrrhiza glabra', image: '/images/licorice.jpg', medicinalUse: 'Sore Throat Relief', region: 'North India', type: 'Herb' },
  { id: 17, name: 'Sandalwood', scientificName: 'Santalum album', image: '/images/sandalwood.jpg', medicinalUse: 'Skin Soothing', region: 'South India', type: 'Tree' },
  { id: 18, name: 'Black Pepper', scientificName: 'Piper nigrum', image: '/images/blackpepper.jpg', medicinalUse: 'Digestive Aid', region: 'South India', type: 'Climber' },
  { id: 19, name: 'Cinnamon', scientificName: 'Cinnamomum verum', image: '/images/cinnamon.jpg', medicinalUse: 'Anti-inflammatory', region: 'East India', type: 'Tree' },
  { id: 20, name: 'Calendula', scientificName: 'Calendula officinalis', image: '/images/calendula.jpg', medicinalUse: 'Wound Healing', region: 'Himalayan Region', type: 'Herb' },
];

const PlantGrid = ({ searchQuery, filters }) => {
  // Filter plants based on search query and filters
  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMedicinalUse = filters.medicinalUse === 'Medicinal Use' || plant.medicinalUse === filters.medicinalUse;
    const matchesRegion = filters.region === 'Region' || plant.region === filters.region;
    const matchesType = filters.plantType === 'Plant Type' || plant.type === filters.plantType;

    return matchesSearch && matchesMedicinalUse && matchesRegion && matchesType;
  });

  return (
    <div className="plant-grid">
      {filteredPlants.length > 0 ? (
        filteredPlants.map((plant) => (
          <Link to={`/plant/${plant.id}`} key={plant.id} className="plant-card-link">
            <div className="plant-card">
              <img src={plant.image} alt={plant.name} className="plant-image" />
              <h3>{plant.name}</h3>
              <p>{plant.scientificName}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No plants found matching your criteria.</p>
      )}
    </div>
  );
};

export default PlantGrid;