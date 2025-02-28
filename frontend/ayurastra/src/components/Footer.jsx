import React from 'react';
import './Footer.css'; // Ensure this import exists

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#resources">Resources</a>
        <a href="#references">References</a>
        <a href="#contact">Contact</a>
      </div>
      <p className="copyright">&copy; 2024 Virtual Herbal Garden. All rights reserved.</p>
    </footer>
  );
};

export default Footer;