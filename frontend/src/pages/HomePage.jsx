import React from 'react';
import HeroSection from '../components/home/HeroSection.jsx';
import DiscoverySection from '../components/home/DiscoverySection.jsx';
import PopularPoojasSection from '../components/home/PopularPoojasSection.jsx';
import TopPriestsSection from '../components/home/TopPriestsSection.jsx';
import MuhurtaPreviewSection from '../components/home/MuhurtaPreviewSection.jsx';
import HowItWorksSection from '../components/home/HowItWorksSection.jsx';
import TrustSection from '../components/home/TrustSection.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import TemplePreviewSection from '../components/home/TemplePreviewSection.jsx';
import BlogPreviewSection from '../components/home/BlogPreviewSection.jsx';
import FinalCTASection from '../components/home/FinalCTASection.jsx';

const HomePage = () => {
  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero Section */}
      <HeroSection />

      {/* Discovery & Search */}
      <DiscoverySection />

      {/* Popular Poojas Marketplace Section */}
      <PopularPoojasSection />

      {/* Top-Rated Priests Section */}
      <TopPriestsSection />

      {/* Upcoming Auspicious Muhurtas Preview */}
      <MuhurtaPreviewSection />

      {/* How Divine Pooja Works */}
      <HowItWorksSection />

      {/* Trust & Platform Pillars */}
      <TrustSection />

      {/* Devotee Testimonials */}
      <TestimonialsSection />

      {/* Temple Directory Preview */}
      <TemplePreviewSection />

      {/* Spiritual Insights & Articles */}
      <BlogPreviewSection />

      {/* Final Conversion CTA */}
      <FinalCTASection />
    </div>
  );
};

export default HomePage;
