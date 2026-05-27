import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit3, FiDownload, FiShare2, FiHeart, FiGift, FiAward, FiStar } from 'react-icons/fi';
import { playPop, playTwinkle } from '../utils/audio';
import confetti from 'canvas-confetti';

const wishes = [
  { id: 'wool', label: 'Playful & Woolly 🐑', text: 'Wishing you a sheep-tacular Eid al-Adha filled with laughter, love, and endless delicious feasts! 🐑❤️' },
  { id: 'blessing', label: 'Warm & Blessed ✨', text: 'May the light of this sacred day illuminate your path, fill your home with peace, and bring joy to your heart.' },
  { id: 'family', label: 'Joy & Family 🏡', text: 'Sending you warm hugs, sweet moments, and the woolliest wishes on this special Eid. Mubarak from our family to yours!' },
  { id: 'short', label: 'Peace & Love 🕊️', text: 'May your sacrifice be accepted, your prayers answered, and your Eid be exceptionally bright, warm, and beautiful.' }
];

const themes = [
  { id: 'gold', name: 'Desert Gold ☀️', bgClass: 'bg-primary-container text-on-primary-container border-primary', fillBg: '#d4af37', textCol: '#554300', accentCol: '#735c00' },
  { id: 'mint', name: 'Cozy Mint 🌿', bgClass: 'bg-secondary-container text-on-secondary-container border-secondary', fillBg: '#8ff6d0', textCol: '#002117', accentCol: '#006c52' },
  { id: 'peach', name: 'Sweet Peach 🍑', bgClass: 'bg-tertiary-container text-on-tertiary-container border-tertiary', fillBg: '#d8a893', textCol: '#2f1407', accentCol: '#7b5644' }
];

export default function GreetingCardGenerator({ isMuted }) {
  const [senderName, setSenderName] = useState('');
  const [selectedWish, setSelectedWish] = useState(wishes[0]);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  // Live preview name
  const displayName = senderName.trim() || 'Your Name';

  // Handle Sparkles animation on "Generate"
  const generateSparkles = () => {
    if (!isMuted) playTwinkle();
    
    // Trigger Canvas Confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#735c00', '#d4af37', '#006c52', '#8ff6d0', '#7b5644'],
      disableForReducedMotion: true
    });

    const newSparkles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10, // percentage
      y: Math.random() * 80 + 10, // percentage
      size: Math.random() * 20 + 10,
      color: ['#735c00', '#006c52', '#ba1a1a', '#7b5644'][Math.floor(Math.random() * 4)]
    }));

    setSparkles(newSparkles);
    setIsGenerated(true);

    // Clear sparkles after animation
    setTimeout(() => {
      setSparkles([]);
    }, 1200);
  };

  const handleDownload = () => {
    if (!isMuted) playPop();
    
    // Draw on canvas and download
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');

    // 1. Draw Background
    ctx.fillStyle = '#fff8f3'; // paper color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Card Border/Card itself
    ctx.fillStyle = selectedTheme.fillBg;
    ctx.strokeStyle = '#221a0f';
    ctx.lineWidth = 8;
    
    // Draw wobbly rounded card shape
    ctx.beginPath();
    ctx.roundRect(80, 80, 640, 840, [40, 20, 30, 25]);
    ctx.fill();
    ctx.stroke();

    // 3. Draw paper lines or grid texture inside card
    ctx.strokeStyle = 'rgba(34, 26, 15, 0.08)';
    ctx.lineWidth = 3;
    for (let i = 120; i < 900; i += 40) {
      ctx.beginPath();
      ctx.moveTo(120, i);
      ctx.lineTo(680, i);
      ctx.stroke();
    }

    // 4. Header: "Eid Mubarak"
    ctx.fillStyle = '#221a0f';
    ctx.font = '800 68px Arial'; // fallback elegant sans
    ctx.textAlign = 'center';
    ctx.fillText('Eid Mubarak', 400, 220);

    // 5. Draw decorative elements (Moon and Stars)
    ctx.fillStyle = selectedTheme.accentCol;
    ctx.font = '50px Arial';
    ctx.fillText('🌙', 400, 300);
    ctx.fillText('⭐', 220, 250);
    ctx.fillText('⭐', 580, 250);

    // 6. Draw Wish Text (wrapped)
    ctx.fillStyle = selectedTheme.textCol;
    ctx.font = 'bold 32px Arial';
    
    const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
      const words = text.split(' ');
      let line = '';
      let currentY = y;

      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, currentY);
    };

    wrapText(ctx, selectedWish.text, 400, 420, 520, 48);

    // 7. Mascot drawing
    ctx.font = '100px Arial';
    ctx.fillText('🐑', 400, 680);

    // 8. Sender placard
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#221a0f';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(150, 780, 500, 110, [15, 25, 15, 25]);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#7f7663';
    ctx.font = 'bold 22px Arial';
    ctx.fillText('Warmest wishes from:', 400, 815);

    ctx.fillStyle = selectedTheme.accentCol;
    ctx.font = 'bold 36px Arial';
    ctx.fillText(displayName, 400, 865);

    // 9. Download Trigger
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `eid-card-${displayName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShare = () => {
    if (!isMuted) playPop();
    const shareText = `Check out this customized Eid card from ${displayName}: "${selectedWish.text}" 🎉 Generate yours here!`;
    if (navigator.share) {
      navigator.share({
        title: 'Eid al-Adha Greeting Card',
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Greeting message copied to clipboard! Share it with your friends! 🐑✨');
    }
  };

  return (
    <section id="card-generator" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 bg-background relative">
      {/* Scribble divider */}
      <div className="absolute top-0 left-0 w-full px-6">
        <div className="scribble-divider"></div>
      </div>

      <div className="text-center mb-12 relative mt-8">
        <h2 className="font-headline font-extrabold text-2xl sm:text-3xl md:text-5xl text-on-background mb-3 sm:mb-4">
          Create Your <span className="text-secondary relative">Eid Greeting Card</span>
        </h2>
        <p className="font-body text-sm sm:text-base md:text-lg text-on-surface-variant max-w-xl mx-auto font-semibold">
          Tailor a whimsical sketchbook card, choose your favorite doodle theme, and share it instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start max-w-5xl mx-auto">
        {/* Left Side: Creation Form (styled like a Notebook page) */}
        <div className="bg-surface-container-lowest wobbly-border p-4 sm:p-6 md:p-8 relative sticker-shadow bg-paper-lined-red">
          <div className="pl-4 sm:pl-6 md:pl-8 flex flex-col gap-4 sm:gap-6">
            <h3 className="font-headline font-bold text-xl md:text-2xl text-on-surface mb-2 flex items-center gap-2">
              <FiEdit3 className="text-secondary" />
              Customize Card
            </h3>

            {/* Input Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="card-name" className="font-headline font-bold text-sm text-on-surface-variant">
                Your Name
              </label>
              <input
                id="card-name"
                type="text"
                maxLength={25}
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g., The Ahmed Family"
                className="w-full bg-background border-2 border-on-background px-4 py-3 font-semibold text-on-background wobbly-border-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>

            {/* Select Wish Option */}
            <div className="flex flex-col gap-2">
              <label className="font-headline font-bold text-sm text-on-surface-variant">
                Choose a Wish
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {wishes.map((wish) => (
                  <button
                    key={wish.id}
                    onClick={() => {
                      if (!isMuted) playPop();
                      setSelectedWish(wish);
                    }}
                    className={`px-4 py-3 font-headline font-bold text-xs rounded-xl border-2 text-left transition-all ${
                      selectedWish.id === wish.id
                        ? 'bg-secondary text-on-secondary border-on-background shadow-sticker'
                        : 'bg-background text-on-background border-outline-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {wish.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Theme */}
            <div className="flex flex-col gap-2">
              <label className="font-headline font-bold text-sm text-on-surface-variant">
                Select Card Color Theme
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      if (!isMuted) playPop();
                      setSelectedTheme(theme);
                    }}
                    className={`flex-1 min-w-[80px] px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-headline font-bold rounded-lg border-2 transition-all ${
                      selectedTheme.id === theme.id
                        ? 'border-on-background font-extrabold scale-105 shadow-sticker'
                        : 'border-outline-variant opacity-80'
                    }`}
                    style={{ backgroundColor: theme.fillBg, color: theme.textCol }}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Trigger */}
            <button
              onClick={generateSparkles}
              className="w-full bg-primary text-on-primary font-headline text-lg py-4 rounded-wobbly border-[3px] border-on-background sticker-shadow-secondary hover:-translate-y-0.5 hover:shadow-sticker-lg transition-all flex items-center justify-center gap-2 group mt-2"
            >
              <span>Auto-Magic Wish ✨</span>
            </button>
          </div>
        </div>

        {/* Right Side: Live Card Preview */}
        <div className="flex flex-col items-center gap-6 relative">
          {/* Hand-drawn arrow showing direction */}
          <div className="hidden lg:block absolute -left-14 top-1/3 text-outline -rotate-12 pointer-events-none">
            <svg fill="none" height="40" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 60 40" width="60">
              <path d="M 5 20 Q 30 5, 55 20"></path>
              <path d="M 45 10 L 55 20 L 45 30"></path>
            </svg>
            <span className="font-headline text-xs font-bold absolute -top-5 left-2">Live Preview!</span>
          </div>

          {/* Greeting Card Frame */}
          <motion.div
            id="greeting-card-frame"
            className={`w-full max-w-[320px] sm:max-w-sm aspect-[4/5] border-[4px] border-on-background rounded-3xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden sticker-shadow-lg transition-colors duration-300 ${selectedTheme.bgClass} bg-paper-grid`}
          >
            {/* Sparkles Overlay */}
            <AnimatePresence>
              {sparkles.map((sp) => (
                <motion.div
                  key={sp.id}
                  initial={{ scale: 0, opacity: 0, rotate: 0 }}
                  animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0], rotate: [0, 180, 360] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className="absolute z-30 pointer-events-none"
                  style={{
                    left: `${sp.x}%`,
                    top: `${sp.y}%`,
                    fontSize: `${sp.size}px`,
                    color: sp.color
                  }}
                >
                  ★
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Little sheep pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none text-2xl font-bold select-none p-4 leading-loose">
              🐑 ✨ 🌙 🐑 ✨ 🌙 🐑 ✨ 🌙 🐑 ✨ 🌙
            </div>

            {/* Moon & Stars doodle on card header */}
            <div className="text-center z-10 mt-4">
              <div className="text-secondary flex justify-center gap-2 mb-2">
                <span className="text-3xl animate-bounce">🌙</span>
                <span className="text-xl animate-pulse self-end mb-1">⭐</span>
              </div>
              <h4 className="font-headline font-extrabold text-2xl sm:text-3xl mb-1 select-none">Eid Mubarak</h4>
            </div>

            {/* Message Body */}
            <div className="z-10 text-center px-2 flex-grow flex items-center justify-center">
              <p className="font-headline font-bold text-sm md:text-base leading-relaxed text-on-background/90 italic">
                "{selectedWish.text}"
              </p>
            </div>

            {/* Sheep Mascot inside card */}
            <div className="text-center text-6xl my-2 animate-bounce z-10 select-none">
              🐑
            </div>

            {/* Card Placard Footer */}
            <div className="bg-surface-container-lowest border-2 border-on-background py-3 px-4 wobbly-border-sm text-center z-10 flex flex-col items-center">
              <span className="font-headline font-bold text-[10px] text-outline tracking-wider uppercase mb-0.5">
                Warmest wishes from
              </span>
              <span className="font-headline font-extrabold text-lg text-primary select-all truncate max-w-full px-2">
                {displayName}
              </span>
            </div>
          </motion.div>

          {/* Action buttons (only active or fully opaque once card generated) */}
          <div className={`w-full max-w-[320px] sm:max-w-sm flex gap-3 sm:gap-4 transition-opacity duration-300 ${isGenerated ? 'opacity-100' : 'opacity-60'}`}>
            <button
              onClick={handleDownload}
              className="flex-1 bg-surface text-on-surface font-headline font-bold py-3 px-4 rounded-xl border-2 border-on-background sticker-shadow sticker-btn flex justify-center items-center gap-2 text-xs md:text-sm"
            >
              <FiDownload />
              Download PNG
            </button>

            <button
              onClick={handleShare}
              className="flex-1 bg-secondary text-on-secondary font-headline font-bold py-3 px-4 rounded-xl border-2 border-on-background sticker-shadow-secondary sticker-btn flex justify-center items-center gap-2 text-xs md:text-sm"
            >
              <FiShare2 />
              Share Wishes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
