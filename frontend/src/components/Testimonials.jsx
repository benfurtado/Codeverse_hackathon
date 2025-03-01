// src/components/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { FaQuoteLeft } from 'react-icons/fa'; // Import quote icon
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Anjali Sharma",
      role: "AYUSH Practitioner",
      quote: "The Virtual Herbal Garden is a game-changer for promoting traditional medicine.",
    },
    {
      name: "Ramesh Kumar",
      role: "Herbal Enthusiast",
      quote: "I learned so much about medicinal plants through this platform!",
    },
    {
      name: "Sunita Devi",
      role: "Botany Student",
      quote: "The 3D models and guided tours are incredibly immersive and educational.",
    },
    {
      name: "Dr. Rajiv Mehta",
      role: "Research Scientist",
      quote: "This platform bridges the gap between ancient wisdom and modern technology.",
    },
    {
      name: "Priya Singh",
      role: "Health Blogger",
      quote: "A must-have resource for anyone interested in natural remedies.",
    },
    {
      name: "Karan Patel",
      role: "Yoga Instructor",
      quote: "Helps me teach my students about the benefits of Ayurvedic herbs.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // State to track hover pause

  // Automatically cycle through testimonial groups
// src/components/Testimonials.jsx
useEffect(() => {
  let interval;
  if (!isPaused) {
    interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3));
    }, 3000); // Reduced from 5000ms to 3000ms (3 seconds)
  }

  return () => clearInterval(interval); // Cleanup interval on unmount or pause
}, [currentIndex, isPaused]);

  // Get the current group of testimonials
  const currentGroup = testimonials.slice(currentIndex * 3, currentIndex * 3 + 3);

  return (
    <section
      className="testimonials-section"
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on hover out
    >
      <h2>What Our Users Say</h2>
      <div className="testimonials-grid">
        <AnimatePresence mode="wait">
          {currentGroup.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="testimonial-card"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="quote-icon" />

              {/* Testimonial Content */}
              <p>{testimonial.quote}</p>

              {/* User Info */}
              <div className="user-info">
                <h3>{testimonial.name}</h3>
                <p className="role">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonials;