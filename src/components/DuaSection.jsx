import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import { playPop, playSlide } from '../utils/audio';

const duasList = [
  {
    id: 1,
    title: 'Takbeerat of Eid',
    description: 'The celebratory chants declaration recited during the days of Eid.',
    arabic: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ، اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
    transliteration: 'Allahu Akbar, Allahu Akbar, La ilaha illallah, Allahu Akbar, Allahu Akbar, wa lillahil Hamd.',
    translation: 'Allah is the greatest, Allah is the greatest, there is no god but Allah. Allah is the greatest, Allah is the greatest, and to Him belongs all praise.',
    colorClass: 'bg-primary-container text-on-primary-container border-primary',
    tag: 'Eid Chant 📢'
  },
  {
    id: 2,
    title: 'Dua for Devotion & Sacrifice',
    description: 'A prayer for God to accept our sincere sacrifices and good deeds.',
    arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Rabbana taqabbal minna innaka antas-Samee\'ul Aleem.',
    translation: '“Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing.” (Quran 2:127)',
    colorClass: 'bg-secondary-container text-on-secondary-container border-secondary',
    tag: 'Acceptance 🤲'
  },
  {
    id: 3,
    title: 'Prayer for Goodness & Peace',
    description: 'A comprehensive prayer for happiness in this life and the hereafter.',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina \'adhaban-nar.',
    translation: '“Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.” (Quran 2:201)',
    colorClass: 'bg-tertiary-container text-on-tertiary-container border-tertiary',
    tag: 'Blessings 🕊️'
  }
];

export default function DuaSection({ isMuted }) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (!isMuted) playSlide();
    setIndex((prevIndex) => (prevIndex + 1) % duasList.length);
  };

  const handlePrev = () => {
    if (!isMuted) playSlide();
    setIndex((prevIndex) => (prevIndex - 1 + duasList.length) % duasList.length);
  };

  // Drag handlers for swipe gesture
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  const currentDua = duasList[index];

  return (
    <section id="duas" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 bg-background relative overflow-hidden">
      {/* Scribble divider */}
      <div className="absolute top-0 left-0 w-full px-6">
        <div className="scribble-divider"></div>
      </div>

      <div className="text-center mb-12 mt-8">
        <h2 className="font-headline font-extrabold text-2xl sm:text-3xl md:text-5xl text-on-background mb-3 sm:mb-4">
          Interactive <span className="text-primary relative">Dua Deck</span>
        </h2>
        <p className="font-body text-sm sm:text-base md:text-lg text-on-surface-variant max-w-xl mx-auto font-semibold">
          Swipe or drag the cards to read the beautiful prayers and declarations of the blessed days of Eid al-Adha.
        </p>
      </div>

      {/* Deck Swiper Interface */}
      <div className="relative flex flex-col items-center justify-center max-w-2xl mx-auto min-h-[380px] sm:min-h-[420px] md:min-h-[450px]">
        
        {/* Floating background decorative cards to look like a stack */}
        <div className="absolute top-4 w-11/12 h-full bg-surface-container-high border-[3px] border-on-background rounded-3xl wobbly-border-lg opacity-40 translate-y-3 rotate-3 z-0 pointer-events-none"></div>
        <div className="absolute top-2 w-[96%] h-full bg-surface-container border-[3px] border-on-background rounded-3xl wobbly-border opacity-70 -translate-y-1 -rotate-2 z-10 pointer-events-none"></div>

        {/* Swipeable Main Card */}
        <div className="w-full h-full flex items-center justify-center z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDua.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 0.98, rotate: 1 }}
              initial={{ x: 150, opacity: 0, rotate: -4 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -150, opacity: 0, rotate: 4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className={`w-full max-w-xl min-h-[340px] sm:min-h-[380px] border-[3px] border-on-background rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col justify-between relative cursor-grab active:cursor-grabbing select-none sticker-shadow-lg ${currentDua.colorClass}`}
            >
              {/* Paper Lines Grid */}
              <div className="absolute inset-0 opacity-10 pointer-events-none paper-lined"></div>

              {/* Card Badge */}
              <div className="flex justify-between items-center z-10">
                <span className="bg-surface-container-lowest text-on-background border-2 border-on-background px-3 py-1 rounded-full text-xs font-headline font-bold">
                  {currentDua.tag}
                </span>
                <span className="font-headline font-extrabold text-xs text-outline opacity-75">
                  Card {index + 1} of {duasList.length}
                </span>
              </div>

              {/* Arabic Content */}
              <div className="my-4 text-center z-10">
                <h3 className="font-headline font-bold text-lg md:text-xl text-on-background/80 mb-4">
                  {currentDua.title}
                </h3>
                {/* Large cursive arabic font style */}
                <p dir="rtl" className="text-xl sm:text-2xl md:text-3xl font-normal leading-loose text-on-background mb-4 font-serif px-1 sm:px-2">
                  {currentDua.arabic}
                </p>
              </div>

              {/* Transliteration and Translation */}
              <div className="z-10 bg-surface-container-lowest/80 backdrop-blur-sm border-2 border-on-background p-3 sm:p-4 rounded-2xl wobbly-border-sm text-center">
                <p className="font-headline font-bold text-xs text-secondary italic mb-2 leading-relaxed">
                  "{currentDua.transliteration}"
                </p>
                <p className="font-body font-semibold text-xs md:text-sm text-on-background/90 leading-relaxed">
                  {currentDua.translation}
                </p>
              </div>

              {/* Bottom Swipe Hint */}
              <div className="text-center text-[10px] font-headline font-bold text-outline opacity-60 flex items-center justify-center gap-1 mt-1 z-10">
                <span>◀ Swipe Left or Right to Flip Card ▶</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-6 mt-8 z-30 relative">
        <button
          onClick={handlePrev}
          className="w-12 h-12 flex items-center justify-center bg-surface-container border-2 border-on-background rounded-full wobbly-border-sm sticker-shadow hover:translate-y-0.5 hover:shadow-sticker transition-all"
          title="Previous Card"
        >
          <FiChevronLeft className="w-6 h-6 text-on-background" />
        </button>
        <div className="flex gap-2">
          {duasList.map((d, i) => (
            <button
              key={d.id}
              onClick={() => {
                if (!isMuted) playPop();
                setIndex(i);
              }}
              className={`w-3.5 h-3.5 rounded-full border-2 border-on-background transition-all ${
                index === i ? 'bg-primary scale-110' : 'bg-surface'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="w-12 h-12 flex items-center justify-center bg-surface-container border-2 border-on-background rounded-full wobbly-border-sm sticker-shadow hover:translate-y-0.5 hover:shadow-sticker transition-all"
          title="Next Card"
        >
          <FiChevronRight className="w-6 h-6 text-on-background" />
        </button>
      </div>
    </section>
  );
}
