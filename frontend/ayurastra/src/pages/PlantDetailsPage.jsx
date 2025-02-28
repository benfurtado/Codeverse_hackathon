// src/pages/PlantDetailsPage.jsx
import React from 'react';
import Header from '../components/Header.jsx'; // Add .jsx
import PlantModelViewer from '../components/PlantModelViewer.jsx'; // Add .jsx
import Footer from '../components/Footer.jsx'; // Add .jsx

const PlantDetailsPage = () => {
  return (
    <>
      <Header />
      <PlantModelViewer />
      <div className="details-content">
        <h1>Tulsi (Ocimum tenuiflorum)</h1>
        <p>Used for respiratory health and immunity.</p>
      </div>
      <Footer />
    </>
  );
};

export default PlantDetailsPage;