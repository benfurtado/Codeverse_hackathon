// src/pages/ExplorePlantsPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header.jsx'; // Add .jsx
import SearchBar from '../components/SearchBar.jsx'; // Add .jsx
import Filters from '../components/Filters.jsx'; // Add .jsx (create this if missing)
import PlantGrid from '../components/PlantGrid.jsx'; // Add .jsx (create this if missing)
import Footer from '../components/Footer.jsx'; // Add .jsx
import './ExplorePlantsPage.css';

const ExplorePlantsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    medicinalUse: 'Medicinal Use',
    region: 'Region',
    plantType: 'Plant Type',
  });

  // Handler for search input changes
  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query in real-time
  };

  // Handler for filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div className="explore-page">
      <Header />
      <main className="content">
        <h1 className="page-title">Explore Medicinal Plants</h1>
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />
        {/* Filters */}
        <Filters onFilterChange={handleFilterChange} />
        {/* Plant Grid */}
        <PlantGrid searchQuery={searchQuery} filters={filters} />
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePlantsPage;