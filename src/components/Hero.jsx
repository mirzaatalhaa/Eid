import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { playBaa, playPop } from '../utils/audio';

// Interactive SVG Sheep Mascot
const SheepMascot = ({ isMuted }) => {
  const [speech, setSpeech] = useState("");
  const [isJumping, setIsJumping] = useState(false);
  const [blink, setBlink] = useState(false);

  const sheepPhrases = [
    "Baa! Wishing you a woolly happy Eid! 🐑",
    "Did you prepare the delicious feast yet? 🍢",
    "Time to share gifts and spread smiles! 🎁",
    "May your sacrifices be accepted! ❤️",
    "Don't forget to share with those in need! 🌾",
    "Have a spectacular and blessed Eid! ✨",
    "Can I have a sweet date please? 🌴",
  ];

  useEffect(() => {
    // Random blinking eyes
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleMascotClick = () => {
    if (!isMuted) playBaa();
    setIsJumping(true);
    const randomPhrase = sheepPhrases[Math.floor(Math.random() * sheepPhrases.length)];
    setSpeech(randomPhrase);
    setTimeout(() => setIsJumping(false), 600);
    // clear speech after 4 seconds
    setTimeout(() => setSpeech(""), 4000);
  };

  return (
    <div className="relative flex flex-col items-center cursor-pointer select-none group" onClick={handleMascotClick}>
      {/* Speech Bubble */}
      {speech && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-20 sm:-top-24 bg-surface-container-lowest border-2 border-on-background px-3 py-2 sm:px-4 sm:py-3 rounded-2xl wobbly-border-sm sticker-shadow z-20 w-[200px] sm:max-w-xs text-center font-bold text-xs sm:text-sm text-on-background"
        >
          {speech}
          {/* Arrow */}
          <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-surface-container-lowest border-r-2 border-b-2 border-on-background rotate-45"></div>
        </motion.div>
      )}

      {/* Mascot Holder Card */}
      <motion.div
        animate={isJumping ? { y: [-20, 0], scaleY: [0.95, 1.05, 1] } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="w-36 h-36 sm:w-52 sm:h-52 bg-surface-container-low border-[3px] border-on-background wobbly-border sticker-shadow flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-sticker-lg bg-paper-grid"
      >
        {/* Floating text suggestion */}
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-primary-container text-on-primary-container text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full rotate-6 border border-on-background group-hover:scale-105 transition-transform">
          Tap me!
        </div>

        {/* Dynamic SVG Sheep */}
        <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-36 sm:h-36">
          {/* Legs */}
          <motion.line 
            x1="38" y1="65" x2="38" y2="82" 
            stroke="#221a0f" strokeWidth="4" strokeLinecap="round"
            animate={isJumping ? { y: [0, -5, 0] } : {}}
          />
          <motion.line 
            x1="45" y1="67" x2="45" y2="82" 
            stroke="#221a0f" strokeWidth="4" strokeLinecap="round"
            animate={isJumping ? { y: [0, -3, 0] } : {}}
          />
          <motion.line 
            x1="55" y1="67" x2="55" y2="82" 
            stroke="#221a0f" strokeWidth="4" strokeLinecap="round"
            animate={isJumping ? { y: [0, -3, 0] } : {}}
          />
          <motion.line 
            x1="62" y1="65" x2="62" y2="82" 
            stroke="#221a0f" strokeWidth="4" strokeLinecap="round"
            animate={isJumping ? { y: [0, -5, 0] } : {}}
          />

          {/* Little Tail */}
          <path d="M 25 50 Q 15 45 25 40" fill="none" stroke="#221a0f" strokeWidth="4" strokeLinecap="round" />
          <path d="M 25 50 Q 15 45 25 40" fill="#ffffff" />

          {/* Fluffy Wool Body */}
          <circle cx="36" cy="46" r="10" fill="#ffffff" stroke="#221a0f" strokeWidth="3" />
          <circle cx="48" cy="40" r="12" fill="#ffffff" stroke="#221a0f" strokeWidth="3" />
          <circle cx="60" cy="44" r="10" fill="#ffffff" stroke="#221a0f" strokeWidth="3" />
          <circle cx="38" cy="56" r="11" fill="#ffffff" stroke="#221a0f" strokeWidth="3" />
          <circle cx="52" cy="58" r="12" fill="#ffffff" stroke="#221a0f" strokeWidth="3" />
          <circle cx="62" cy="54" r="9" fill="#ffffff" stroke="#221a0f" strokeWidth="3" />
          {/* Inner fills to hide overlapping borders */}
          <circle cx="36" cy="46" r="8.5" fill="#ffffff" />
          <circle cx="48" cy="40" r="10.5" fill="#ffffff" />
          <circle cx="60" cy="44" r="8.5" fill="#ffffff" />
          <circle cx="38" cy="56" r="9.5" fill="#ffffff" />
          <circle cx="52" cy="58" r="10.5" fill="#ffffff" />
          <circle cx="62" cy="54" r="7.5" fill="#ffffff" />

          {/* Face (Centered on the right side) */}
          <path d="M 62 42 Q 68 36 74 42 Q 78 48 76 54 Q 72 60 64 56 Z" fill="#221a0f" />
          
          {/* Ears */}
          <path d="M 64 38 Q 62 26 58 36" fill="none" stroke="#221a0f" strokeWidth="3" strokeLinecap="round" />
          <path d="M 68 40 Q 74 26 72 38" fill="none" stroke="#221a0f" strokeWidth="3" strokeLinecap="round" />

          {/* Eyes */}
          {blink ? (
            // Blinking eyes (lines)
            <>
              <line x1="68" y1="46" x2="71" y2="46" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="74" y1="48" x2="76" y2="48" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            // Open eyes (dots)
            <>
              <circle cx="69.5" cy="46" r="2.5" fill="#ffffff" />
              <circle cx="69.5" cy="46" r="1" fill="#000000" />
              <circle cx="75" cy="48" r="2" fill="#ffffff" />
              <circle cx="75" cy="48" r="0.8" fill="#000000" />
            </>
          )}

          {/* Cheeks */}
          <circle cx="68" cy="51" r="1.5" fill="#ffa6a6" />
          <circle cx="76" cy="53" r="1" fill="#ffa6a6" />

          {/* Cute wool cap on head */}
          <circle cx="66" cy="38" r="5" fill="#ffffff" stroke="#221a0f" strokeWidth="2" />
          <circle cx="70" cy="37" r="4.5" fill="#ffffff" stroke="#221a0f" strokeWidth="2" />
          <circle cx="66" cy="38" r="4" fill="#ffffff" />
          <circle cx="70" cy="37" r="3.5" fill="#ffffff" />
        </svg>
      </motion.div>
    </div>
  );
};

export default function Hero({ isMuted, onTriggerConfetti }) {
  // Parallax values based on mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 15 });

  // Transforms for parallax offsets
  const parallaxX1 = useTransform(springX, [-300, 300], [-25, 25]);
  const parallaxY1 = useTransform(springY, [-300, 300], [-25, 25]);
  
  const parallaxX2 = useTransform(springX, [-300, 300], [35, -35]);
  const parallaxY2 = useTransform(springY, [-300, 300], [35, -35]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCTAClick = () => {
    if (!isMuted) playPop();
    onTriggerConfetti();
    const element = document.querySelector('#card-generator');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full relative py-8 sm:py-12 md:py-24 flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] overflow-hidden bg-background px-4 sm:px-6"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 paper-grid pointer-events-none opacity-50 z-0"></div>

      {/* Floating Elements (Parallax layers) */}
      
      {/* Crescent Moon */}
      <motion.div 
        style={{ x: parallaxX1, y: parallaxY1 }}
        className="absolute top-16 left-6 md:left-24 text-primary opacity-85 z-10 w-16 h-16 select-none cursor-pointer"
        onClick={() => { if (!isMuted) playPop(); }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[2px_2px_0px_#221a0f]">
          <path d="M 50 15 A 35 35 0 1 0 85 50 A 28 28 0 1 1 50 15 Z" fill="#d4af37" stroke="#221a0f" strokeWidth="4" />
        </svg>
      </motion.div>

      {/* Lantern Left */}
      <motion.div 
        style={{ x: parallaxX2, y: parallaxY1 }}
        className="absolute top-12 right-8 md:right-32 w-14 h-24 lantern-swing z-10 select-none hidden sm:block"
      >
        <svg viewBox="0 0 60 100" className="w-full h-full filter drop-shadow-[2px_2px_0px_#221a0f]">
          <line x1="30" y1="0" x2="30" y2="25" stroke="#221a0f" strokeWidth="3" />
          <path d="M 15 25 H 45 V 35 H 15 Z" fill="#006c52" stroke="#221a0f" strokeWidth="3" />
          <path d="M 10 35 H 50 L 40 70 H 20 Z" fill="#8ff6d0" stroke="#221a0f" strokeWidth="3" />
          {/* Flame inside */}
          <circle cx="30" cy="52" r="6" fill="#d4af37" />
          <path d="M 15 70 H 45 V 80 H 15 Z" fill="#006c52" stroke="#221a0f" strokeWidth="3" />
          <path d="M 25 80 L 15 95 H 45 L 35 80 Z" fill="#7b5644" stroke="#221a0f" strokeWidth="3" />
        </svg>
      </motion.div>

      {/* Cloud Left */}
      <motion.div 
        style={{ x: parallaxX2, y: parallaxY2 }}
        className="absolute bottom-24 left-10 md:left-24 text-outline opacity-60 z-10 w-20 select-none hidden md:block"
      >
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <path d="M 15 45 A 15 15 0 0 1 30 20 A 20 20 0 0 1 70 20 A 15 15 0 0 1 85 45 Z" fill="#ffffff" stroke="#221a0f" strokeWidth="3" />
        </svg>
      </motion.div>

      {/* Star Right */}
      <motion.div 
        style={{ x: parallaxX1, y: parallaxY2 }}
        className="absolute bottom-16 right-6 md:right-28 text-tertiary opacity-40 z-0 w-10 select-none hidden sm:block"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[2px_2px_0px_#221a0f] animate-pulse">
          <polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36" fill="#d8a893" stroke="#221a0f" strokeWidth="4" />
        </svg>
      </motion.div>

      {/* Main Text Content */}
      <div className="z-10 text-center w-full max-w-3xl flex flex-col items-center px-1">
        {/* Banner badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="bg-tertiary-container text-on-tertiary-container border-2 border-on-background px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-headline font-bold text-[10px] sm:text-xs md:text-sm sticker-shadow mb-4 sm:mb-6"
        >
          ✨ The Eid Sketchbook Experience 🐑
        </motion.div>

        {/* Title */}
        <h1 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-6xl text-primary leading-tight relative px-2 sm:px-4 select-none">
          <motion.span 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 10, delay: 0.2 }}
            className="block mb-1 text-on-background"
          >
            Interactive
          </motion.span>
          <motion.span 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 10, delay: 0.35 }}
            className="inline-block text-primary relative px-2"
          >
            Eid al-Adha Mubarak
            {/* Draw Hand-Scribble underline */}
            <svg className="absolute w-full h-4 -bottom-2 left-0 text-secondary" preserveAspectRatio="none" viewBox="0 0 200 10">
              <path d="M0,5 Q50,9 100,5 T200,5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
              <path d="M10,7 Q60,11 110,7 T190,7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" opacity="0.6"></path>
            </svg>
          </motion.span>
        </h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-body text-sm sm:text-base md:text-xl text-on-surface-variant max-w-xl mt-5 sm:mt-8 mb-6 sm:mb-10 leading-relaxed font-semibold px-2 sm:px-4"
        >
          Explore a whimsical, hand-drawn sketchbook world! Draw doodles, swing glowing lanterns, play with sheep, and craft custom greeting cards to share with your family.
        </motion.p>

        {/* CTA Button and Mascot */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 0.8 }}
          className="flex flex-col items-center gap-6 sm:gap-10 mt-2 w-full px-2 sm:px-4"
        >
          {/* Mascot */}
          <SheepMascot isMuted={isMuted} />

          {/* Buttons Stack */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full max-w-md">
            <button
              onClick={handleCTAClick}
              className="w-full sm:w-auto bg-primary text-on-primary font-headline font-bold text-sm sm:text-base md:text-lg py-3 px-6 sm:px-8 rounded-xl border-[3px] border-on-background sticker-shadow-tertiary hover:-translate-y-0.5 hover:shadow-sticker-lg transition-all flex items-center justify-center gap-1.5"
            >
              Generate Card ✨
            </button>
            <button
              onClick={() => {
                if (!isMuted) playPop();
                const element = document.querySelector('#doodles');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-surface-container-high text-on-surface font-headline font-bold text-sm sm:text-base md:text-lg py-3 px-6 sm:px-8 rounded-xl border-[3px] border-on-background sticker-shadow sticker-btn flex items-center justify-center gap-1.5"
            >
              Play Doodle Board 🎨
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Scribble divider line at bottom */}
      <div className="absolute bottom-0 left-0 w-full px-6 max-w-6xl mx-auto">
        <div className="scribble-divider"></div>
      </div>
    </section>
  );
}
