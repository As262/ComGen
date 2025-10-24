import React from 'react';
import Hero from '../components/Hero';
import MenSection from '../components/MenSection';
import WomenSection from '../components/WomenSection';
import ShoesSection from '../components/ShoesSection';
import AppliancesSection from '../components/AppliancesSection';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <MenSection />
      <WomenSection />
      <ShoesSection />
      <AppliancesSection />
    </div>
  );
};

export default HomePage;
