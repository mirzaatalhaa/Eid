import React, { useState } from 'react';
import { FiVolume2, FiVolumeX, FiMenu, FiX, FiAward, FiBookOpen, FiImage, FiCompass, FiInfo } from 'react-icons/fi';
import { playPop } from '../utils/audio';

export default function Header({ isMuted, setIsMuted, isDarkMode, setIsDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      setTimeout(() => playPop(), 50); // play feedback after unmuting
    }
  };

  const navItems = [
    { label: 'Home', href: '#home', icon: FiCompass },
    { label: 'Greeting Card', href: '#card-generator', icon: FiImage },
    { label: 'Dua Deck', href: '#duas', icon: FiBookOpen },
    { label: 'Doodle Pad', href: '#doodles', icon: FiAward },
    { label: 'Eid Facts', href: '#facts', icon: FiInfo },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (!isMuted) playPop();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b-[3px] border-on-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4">
        {/* Brand / Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-headline text-lg sm:text-2xl font-extrabold text-primary hover:rotate-1 transition-transform inline-flex items-center gap-1.5 sm:gap-2 shrink-0"
        >
          <span>🐑</span>
          <span className="relative">
            Eid Mubarak
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-secondary rounded-full transform scale-x-75 origin-left"></span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-headline font-bold text-on-background hover:text-primary transition-colors text-sm relative group py-1 flex items-center gap-1.5"
              >
                <Icon className="w-4 h-4 text-secondary" />
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-secondary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            );
          })}
        </nav>

        {/* Actions (Sound, Theme, Burger) */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleMute}
            className="w-10 h-10 flex items-center justify-center bg-surface-container border-2 border-on-background wobbly-border-sm sticker-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#221a0f] transition-all"
            title={isMuted ? 'Unmute Sounds' : 'Mute Sounds'}
          >
            {isMuted ? (
              <FiVolumeX className="w-5 h-5 text-tertiary" />
            ) : (
              <FiVolume2 className="w-5 h-5 text-secondary animate-pulse" />
            )}
          </button>

          {/* Mobile Menu Toggler */}
          <button
            onClick={() => {
              if (!isMuted) playPop();
              setIsOpen(!isOpen);
            }}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-primary-container text-on-primary-container border-2 border-on-background wobbly-border-sm sticker-shadow"
          >
            {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>

          {/* Desktop CTA */}
          <button
            onClick={() => {
              if (!isMuted) playPop();
              const element = document.querySelector('#card-generator');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden md:block bg-secondary text-on-secondary px-5 py-2 font-headline font-bold border-2 border-on-background wobbly-border-sm sticker-shadow sticker-btn text-sm"
          >
            Send Wishes ✨
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-on-background bg-background px-6 py-4 flex flex-col gap-4 animate-wobble">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-headline font-bold text-lg text-on-background hover:text-primary flex items-center gap-3 py-2 border-b border-outline-variant/30"
              >
                <Icon className="w-5 h-5 text-secondary" />
                {item.label}
              </a>
            );
          })}
          <button
            onClick={() => {
              if (!isMuted) playPop();
              const element = document.querySelector('#card-generator');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
              setIsOpen(false);
            }}
            className="bg-primary text-on-primary py-3 rounded-xl font-headline font-bold border-2 border-on-background wobbly-border text-center sticker-shadow"
          >
            Create Greeting Card 🌟
          </button>
        </div>
      )}
    </header>
  );
}
