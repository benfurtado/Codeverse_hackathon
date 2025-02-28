import React from 'react';
import './Filters.css'; // Create this CSS file

const Filters = () => {
  return (
    <div className="filters">
      <select>
        <option>Medicinal Use</option>
        <option>Digestion</option>
        <option>Immunity</option>
        <option>Stress Relief</option>
      </select>
      <select>
        <option>Region</option>
        <option>North India</option>
        <option>South India</option>
        <option>East India</option>
        <option>West India</option>
      </select>
      <select>
        <option>Plant Type</option>
        <option>Herb</option>
        <option>Shrub</option>
        <option>Tree</option>
      </select>
    </div>
  );
};

export default Filters; // Ensure this line exists