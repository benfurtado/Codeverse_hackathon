// src/components/Filters.jsx
import React from 'react';
import './Filters.css'; // Create this CSS file

const Filters = ({ onFilterChange }) => {
  const handleFilter = (filterType, e) => {
    onFilterChange(filterType, e.target.value); // Pass the filter type and value to the parent
  };

  return (
    <div className="filters">
      <select title="Filter by medicinal use" onChange={(e) => handleFilter('medicinalUse', e)}>
        <option>Medicinal Use</option>
        <option>Digestion</option>
        <option>Immunity</option>
        <option>Stress Relief</option>
      </select>
      <select title="Filter by region" onChange={(e) => handleFilter('region', e)}>
        <option>Region</option>
        <option>North India</option>
        <option>South India</option>
        <option>East India</option>
        <option>West India</option>
      </select>
      <select title="Filter by plant type" onChange={(e) => handleFilter('plantType', e)}>
        <option>Plant Type</option>
        <option>Herb</option>
        <option>Shrub</option>
        <option>Tree</option>
      </select>
    </div>
  );
};

export default Filters;