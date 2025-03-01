import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const [isModalOpen, setIsModalOpen] = useState(false); // State for login modal
  const [showMoreOptions, setShowMoreOptions] = useState(false); // State for "View More" toggle

  // Function to close the modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

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
        <a href="/leaf-lens">LeafLens AI</a>
        <a href="/tours">Guided Tours</a>
        <a href="/maps">Maps</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>

      {/* Login Button */}
      <button className="login-btn" onClick={() => setIsModalOpen(true)}>
        Login
      </button>

      {/* Sign-In Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <h2>Sign in or create an account</h2>

            {/* Username and Password Inputs */}
            <div className="input-group">
              <input type="text" placeholder="Username" className="input-field" />
              <input type="password" placeholder="Password" className="input-field" />
              <button className="continue-btn">Continue</button>
            </div>

            {/* View More Options */}
            <button className="view-more-btn" onClick={() => setShowMoreOptions(!showMoreOptions)}>
              {showMoreOptions ? 'Hide Options' : 'View More'}
            </button>

            {/* Additional Login Options */}
            {showMoreOptions && (
              <div className="additional-options">
                <button className="google-btn">
                  <img src="/images/googleicon.png" alt="Google Icon" className="icon" />
                  Continue with Google
                </button>
                <button className="facebook-btn">
                  <img src="/images/facebookicon.png" alt="Facebook Icon" className="icon" />
                  Continue with Facebook
                </button>
                <button className="apple-btn">
                  <img src="/images/appleicon.png" alt="Apple Icon" className="icon" />
                  Continue with Apple
                </button>
              </div>
            )}

            {/* "Or" Text and Create Account Link */}
            <p className="or-text">Or</p>
            <a href="/create-account" className="create-account-link">
              Create an account
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;