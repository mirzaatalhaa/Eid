import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiAward, FiHeart } from 'react-icons/fi';
import { playPop, playBaa } from '../utils/audio';

const characterFacts = [
  {
    id: 'sheep',
    character: '🐑',
    fact: 'The sheep reminds us of Ibrahim\'s story of sacrifice, deep devotion, and obedience to God! 🐑',
    colorClass: 'bg-primary-container text-on-primary-container',
    bubbleColor: 'bg-surface-container-low border-primary',
    animType: 'bounce'
  },
  {
    id: 'feast',
    character: '🍢',
    fact: 'Eid feast meats are divided into three: 1/3 for family, 1/3 for friends & relatives, and 1/3 for those in need! 🍢',
    colorClass: 'bg-secondary-container text-on-secondary-container',
    bubbleColor: 'bg-surface-container border-secondary',
    animType: 'spin'
  },
  {
    id: 'outfit',
    character: '✨',
    fact: 'Wearing your best clothes, taking a bath, and walking home via a different route are traditional Eid etiquettes! 👕',
    colorClass: 'bg-tertiary-container text-on-tertiary-container',
    bubbleColor: 'bg-surface-container-high border-tertiary',
    animType: 'wobble'
  }
];

export default function DidYouKnow({ isMuted }) {
  const [clickedChar, setClickedChar] = useState(null);
  const [hoveredChar, setHoveredChar] = useState(null);

  const handleCharClick = (charId) => {
    if (!isMuted) {
      if (charId === 'sheep') playBaa();
      else playPop();
    }
    setClickedChar(charId);
    // Clear clicked state after animation completes
    setTimeout(() => setClickedChar(null), 800);
  };

  return (
    <section id="facts" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 bg-background relative overflow-hidden">
      {/* Scribble divider */}
      <div className="absolute top-0 left-0 w-full px-6">
        <div className="scribble-divider"></div>
      </div>

      {/* Decorative background doodles */}
      <div className="absolute top-8 left-8 opacity-10 text-6xl select-none rotate-12">⭐</div>
      <div className="absolute bottom-8 right-8 opacity-10 text-6xl select-none -rotate-12">☁️</div>

      <div className="text-center mb-12 mt-8">
        <h2 className="font-headline font-extrabold text-2xl sm:text-3xl md:text-5xl text-on-background mb-3 sm:mb-4">
          Did You <span className="text-tertiary relative">Know?</span>
        </h2>
        <p className="font-body text-sm sm:text-base md:text-lg text-on-surface-variant max-w-xl mx-auto font-semibold">
          Tap the cute characters to see what they have to say about the beautiful traditions of Eid!
        </p>
      </div>

      {/* Characters Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto items-end pt-4 sm:pt-10">
        {characterFacts.map((item) => {
          const isClicked = clickedChar === item.id;
          const isHovered = hoveredChar === item.id;
          const showBubble = isHovered || isClicked || true; // always show, but highlight on hover

          // Animation logic for mascot
          let animateVal = {};
          if (isClicked) {
            if (item.animType === 'bounce') animateVal = { y: [0, -35, 0], scaleY: [1, 0.9, 1.1, 1] };
            if (item.animType === 'spin') animateVal = { rotate: [0, 360], scale: [1, 1.2, 1] };
            if (item.animType === 'wobble') animateVal = { rotate: [0, -15, 15, -15, 0], scale: [1, 1.05, 1] };
          } else {
            animateVal = { y: [0, -4, 0] }; // gentle floating idle
          }

          return (
            <div 
              key={item.id}
              className="flex flex-col items-center group relative mt-10 sm:mt-0"
              onMouseEnter={() => setHoveredChar(item.id)}
              onMouseLeave={() => setHoveredChar(null)}
            >
              {/* Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={showBubble ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8 }}
                className={`absolute -top-20 sm:-top-28 p-3 sm:p-4 border-2 border-on-background rounded-2xl wobbly-border-sm sticker-shadow z-10 text-center w-[200px] sm:max-w-[240px] text-[11px] sm:text-xs font-bold text-on-background ${item.bubbleColor}`}
              >
                <p className="leading-relaxed">{item.fact}</p>
                {/* Arrow */}
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 border-r-2 border-b-2 border-on-background rotate-45 ${item.bubbleColor.split(' ')[0]}`}></div>
              </motion.div>

              {/* Character Circle Button */}
              <motion.div
                onClick={() => handleCharClick(item.id)}
                animate={animateVal}
                transition={isClicked ? { duration: 0.6 } : { repeat: Infinity, duration: 3 + Math.random(), ease: 'easeInOut' }}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[3px] border-on-background flex items-center justify-center text-3xl sm:text-4xl cursor-pointer sticker-shadow transition-all group-hover:shadow-sticker-lg bg-surface-container ${item.colorClass}`}
              >
                <span className="select-none">{item.character}</span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
