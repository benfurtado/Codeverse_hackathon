import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import icons
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Whether you have questions, feedback, or partnership inquiries, feel free to reach out.</p>

        {/* Contact Form */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>

        {/* Contact Information */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Email: support@virtualherbalgarden.com</p>
          <p>Phone: +91 12345 67890</p>
          <p>Follow us on:</p>
          <div className="social-links">
            {/* Social Media Icons */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;