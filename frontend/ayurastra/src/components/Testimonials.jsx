import React from 'react';
import { FaQuoteLeft, FaUser } from 'react-icons/fa'; // Import icons
import { motion } from 'framer-motion'; // Import framer-motion
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
  ];

  return (
    <section className="testimonials-section">
      <h2>What Our Users Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            {/* Animated Quote Icon */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FaQuoteLeft className="quote-icon" />
            </motion.div>

            <p>{testimonial.quote}</p>

            {/* User Info */}
            <div className="user-info">
              {/* Animated User Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <FaUser className="user-icon" />
              </motion.div>
              <div>
                <h3>{testimonial.name}</h3>
                <p className="role">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;