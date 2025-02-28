// src/pages/NotFoundPage.jsx
import React from 'react';
import Header from '../components/Header.jsx'; // Add .jsx
import Footer from '../components/Footer.jsx'; // Add .jsx

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page you’re looking for doesn’t exist.</p>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;