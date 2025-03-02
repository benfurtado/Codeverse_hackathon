// src/components/PlantGrid.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PlantGrid.css';
import Filters from './Filters';

const PlantGrid = ({ searchQuery }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    medicinalUse: '',
    region: '',
    plantType: ''
  });

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/plants');

        const formattedPlants = response.data.map(plant => ({
          id: plant.id,
          name: plant.name,
          scientificName: plant.scientific_name,
          image: plant.plant_photo || '/images/default-plant.jpg',
          medicinalUse: plant.medicinal_use || 'N/A',
          region: plant.region || 'N/A',
          plantType: plant.plant_type || 'N/A'
        }));

        setPlants(formattedPlants);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMedicinalUse = !filters.medicinalUse || plant.medicinalUse === filters.medicinalUse;
    const matchesRegion = !filters.region || plant.region === filters.region;
    const matchesType = !filters.plantType || plant.plantType === filters.plantType;

    return matchesSearch && matchesMedicinalUse && matchesRegion && matchesType;
  });

  if (loading) return <div className="plant-grid">Loading plants...</div>;
  if (error) return <div className="plant-grid">Error: {error}</div>;

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
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
    </div>
  );
};

export default PlantGrid;