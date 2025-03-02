
// src/components/Filters.jsx
import React from 'react';
import './Filters.css';

const Filters = ({ onFilterChange }) => {
  const handleFilter = (filterType, e) => {
    onFilterChange(filterType, e.target.value);
  };

  return (
    <div className="filters">
      <select title="Filter by medicinal use" onChange={(e) => handleFilter('medicinalUse', e)}>
        <option value="">All Medicinal Uses</option>
        <option value="Digestion">Digestion</option>
        <option value="Immunity">Immunity</option>
        <option value="Stress Relief">Stress Relief</option>
      </select>
      <select title="Filter by region" onChange={(e) => handleFilter('region', e)}>
        <option value="">All Regions</option>
        <option value="North India">North India</option>
        <option value="South India">South India</option>
        <option value="East India">East India</option>
        <option value="West India">West India</option>
      </select>
      <select title="Filter by plant type" onChange={(e) => handleFilter('plantType', e)}>
        <option value="">All Plant Types</option>
        <option value="Herb">Herb</option>
        <option value="Shrub">Shrub</option>
        <option value="Tree">Tree</option>
      </select>
    </div>
  );
};

export default Filters;
