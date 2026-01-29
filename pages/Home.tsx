import React from 'react';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import Community from '../components/Community';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <Community />
    </>
  );
};

export default Home;