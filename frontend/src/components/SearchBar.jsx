// src/components/SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css'; // Create this CSS file

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pass the query to the parent component
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search plants..."
        aria-label="Search plants"
        value={query}
        onChange={handleInputChange}
      />
      <button aria-label="Search">Search</button>
    </div>
  );
};

export default SearchBar;