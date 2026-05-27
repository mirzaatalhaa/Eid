import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import Hero from './components/Hero';
import GreetingCardGenerator from './components/GreetingCardGenerator';
import DuaSection from './components/DuaSection';
import InteractiveDoodleArea from './components/InteractiveDoodleArea';
import DidYouKnow from './components/DidYouKnow';
import Footer from './components/Footer';

export default function App() {
  const [isMuted, setIsMuted] = useState(false);

  // Trigger celebration confetti on page load
  useEffect(() => {
    // Initial load burst
    const end = Date.now() + 1.5 * 1000;
    const colors = ['#735c00', '#d4af37', '#006c52', '#8ff6d0', '#7b5644'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const triggerManualConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#735c00', '#d4af37', '#006c52', '#8ff6d0', '#7b5644']
    });
  };

  return (
    <div className="flex flex-col min-h-screen relative text-on-background selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden w-full">
      {/* Decorative top border ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-tertiary"></div>

      {/* Header / Navbar */}
      <Header 
        isMuted={isMuted} 
        setIsMuted={setIsMuted} 
      />

      {/* Main content sections */}
      <main className="flex-grow w-full relative">
        <Hero 
          isMuted={isMuted} 
          onTriggerConfetti={triggerManualConfetti} 
        />
        
        <GreetingCardGenerator 
          isMuted={isMuted} 
        />
        
        <DuaSection 
          isMuted={isMuted} 
        />
        
        <InteractiveDoodleArea 
          isMuted={isMuted} 
        />
        
        <DidYouKnow 
          isMuted={isMuted} 
        />
      </main>

      {/* Footer */}
      <Footer 
        isMuted={isMuted} 
      />
    </div>
  );
}
