import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
  // Static newsletter data
  const newsletters = [
    {
      title: "New Plant Added: Ashwagandha",
      description: "Learn about the benefits of Ashwagandha for stress relief and immunity.",
    },
    {
      title: "Upcoming Guided Tour: Immunity Boost",
      description: "Join our guided tour to explore plants that boost immunity naturally.",
    },
  ];

  return (
    <section className="newsletter-section">
      <h2>Subscribe to Our Newsletter</h2>
      <p>Stay updated with the latest news and discoveries in AYUSH medicinal plants.</p>

      {/* Display static newsletter teasers */}
      <div className="newsletter-teasers">
        {newsletters.map((item, index) => (
          <div className="teaser-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Subscription form */}
      <form className="newsletter-form">
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
};

export default Newsletter;