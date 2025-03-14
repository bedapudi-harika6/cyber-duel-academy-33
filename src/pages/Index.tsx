
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import Missions from '@/components/Missions';
import LevelProgression from '@/components/LevelProgression';
import AIMentor from '@/components/AIMentor';
import LearningModes from '@/components/LearningModes';
import Footer from '@/components/Footer';

const Index = () => {
  // Add a class to the body for global styling
  useEffect(() => {
    document.body.classList.add('cyber-theme');
    // Set the background color explicitly to ensure it applies everywhere
    document.body.style.backgroundColor = '#000000'; // Pure Black
    
    return () => {
      document.body.classList.remove('cyber-theme');
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      
      <main>
        <Hero />
        <Missions />
        <LevelProgression />
        <AIMentor />
        <LearningModes />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
