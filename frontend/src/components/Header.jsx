import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';

const Header = () => {
  // UI state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup

  // User state
  const [user, setUser] = useState(null);

  // Form states for login
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form states for signup
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // On component mount, attempt to fetch user details if already logged in.
  useEffect(() => {
    axios.get('http://localhost:5000/api/login')
      .then(response => {
        if (response.data && response.data.loggedIn) {
          setUser(response.data.user);
        }
      })
      .catch(error => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  // Closes the modal if clicked outside the modal content.
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  // Handles login functionality
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', {
      username: loginUsername,
      password: loginPassword,
    })
      .then(response => {
        setUser(response.data.user);
        setIsModalOpen(false);
        setLoginUsername('');
        setLoginPassword('');
      })
      .catch(error => {
        console.error("Login failed:", error);
      });
  };

  // Handles signup functionality
  const handleSignup = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/user', {
      username: signupUsername,
      password: signupPassword,
    })
      .then(response => {
        // Assuming the signup auto logs in the user or returns the created user.
        setUser(response.data.user);
        setIsModalOpen(false);
        setSignupUsername('');
        setSignupPassword('');
      })
      .catch(error => {
        console.error("Signup failed:", error);
      });
  };

  // Navigation links change based on login status
  const navLinks = user ? [
    { path: "/", label: "Home" },
    { path: "/explore", label: "Explore Plants" },
    { path: "/leaf-lens", label: "LeafLens AI" },
    { path: "/tours", label: "Guided Tours" },
    { path: "/maps", label: "Maps" },
    { path: "/watchlist", label: "Watchlist" },
    { path: "/contact", label: "Contact" }
  ] : [
    { path: "/", label: "Home" },
    { path: "/explore", label: "Explore Plants" },
    { path: "/leaf-lens", label: "LeafLens AI" },
    { path: "/tours", label: "Guided Tours" },
    { path: "/maps", label: "Maps" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" }
  ];

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
        {navLinks.map((link, index) => (
          <a key={index} href={link.path}>{link.label}</a>
        ))}
      </nav>

      {/* Right-hand UI: Either Profile Picture or Login/Signup Button */}
      {user ? (
        <div className="profile-container">
          {/* Animated profile picture */}
          <img src="/images/animated-profile.gif" alt="Profile" className="profile-pic" />
        </div>
      ) : (
        <button
          className="login-btn"
          onClick={() => {
            setIsModalOpen(true);
            setIsSignup(false); // Default to login mode when opening modal
          }}
        >
          Login / Signup
        </button>
      )}

      {/* Modal for Login/Signup */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            {isSignup ? <h2>Create an Account</h2> : <h2>Sign In</h2>}

            {isSignup ? (
              <form onSubmit={handleSignup}>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                  <button type="submit" className="continue-btn">Sign Up</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button type="submit" className="continue-btn">Continue</button>
                </div>
              </form>
            )}

            {/* Additional login options only shown on login mode */}
            {!isSignup && (
              <>
                <button
                  className="view-more-btn"
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                >
                  {showMoreOptions ? 'Hide Options' : 'View More'}
                </button>
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
              </>
            )}

            {/* Toggle between Login and Signup */}
            <p className="or-text">Or</p>
            {isSignup ? (
              <p>
                Already have an account?{' '}
                <button className="toggle-btn" onClick={() => setIsSignup(false)}>
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button className="toggle-btn" onClick={() => setIsSignup(true)}>
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
