// src/components/BookmarkList.jsx
import React from 'react';
import './BookmarkList.css'; // Create this CSS file

const BookmarkList = () => {
  return (
    <div className="bookmark-list">
      <h3>Saved Plants</h3>
      <ul>
        <li>Tulsi (Ocimum tenuiflorum)</li>
        <li>Neem (Azadirachta indica)</li>
      </ul>
    </div>
  );
};

export default BookmarkList;