// src/components/SearchBar.jsx
import React from 'react';
import './SearchBar.css'; // Create this CSS file

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search plants..." />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;