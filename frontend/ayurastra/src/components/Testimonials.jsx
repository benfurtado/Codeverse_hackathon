import React from 'react';
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
            <p>"{testimonial.quote}"</p>
            <h3>{testimonial.name}</h3>
            <p className="role">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;