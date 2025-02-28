// src/pages/ExplorePlantsPage.jsx
import React from 'react';
import Header from '../components/Header.jsx'; // Add .jsx
import SearchBar from '../components/SearchBar.jsx'; // Add .jsx
import Filters from '../components/Filters.jsx'; // Add .jsx (create this if missing)
import PlantGrid from '../components/PlantGrid.jsx'; // Add .jsx (create this if missing)
import Footer from '../components/Footer.jsx'; // Add .jsx

const ExplorePlantsPage = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <Filters />
      <PlantGrid />
      <Footer />
    </>
  );
};

export default ExplorePlantsPage;