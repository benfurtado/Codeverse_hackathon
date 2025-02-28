import React from 'react';
import Header from '../components/Header.jsx';
import HeroSection from '../components/HeroSection.jsx';
import FeaturesSection from '../components/FeaturesSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import FeaturedPlants from '../components/FeaturedPlants.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Newsletter from '../components/Newsletter.jsx';
import CTASection from '../components/CTASection.jsx';
import Footer from '../components/Footer.jsx';

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <FeaturedPlants />
      <Testimonials />
      <Newsletter />
      <CTASection />
      <Footer />
    </>
  );
};

export default HomePage;