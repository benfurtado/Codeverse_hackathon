import React from 'react';
import Header from '../components/Header'; // Import Header component
import Footer from '../components/Footer'; // Import Footer component
import './NotFoundPage.css'; // Import CSS for styling

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="not-found-container">
        {/* Image Box */}
        <div className="image-box">
          <img src="/images/404i_.png" alt="404 Background" className="not-found-image" />
        </div>

        {/* Content */}
        <div className="not-found-content">
          <p>Oops! The page you’re looking for doesn’t exist.</p>
          <a href="/" className="back-home-btn">Go Back Home</a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;