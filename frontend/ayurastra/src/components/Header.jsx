import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src="/images/logoayurastra.png" alt="AyurAstra Logo" className="logo-image" />
        AyurAstra
      </div>

      {/* Hamburger Menu Icon (Visible on Mobile) */}
      <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>

      {/* Navigation Menu */}
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="/explore">Explore Plants</a>
        <a href="/tours">Guided Tours</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>

      {/* Login Button */}
      <button className="login-btn">Login</button>
    </header>
  );
};

export default Header;