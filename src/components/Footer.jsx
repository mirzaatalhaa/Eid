import React from 'react';
import { FiHeart, FiTwitter, FiFacebook, FiMessageCircle, FiSmile } from 'react-icons/fi';
import { playPop } from '../utils/audio';

export default function Footer({ isMuted }) {
  const shareText = "Celebrate Eid al-Adha Mubarak in this whimsical interactive sketchbook! 🐑✨";
  const shareUrl = window.location.href;

  const socialLinks = [
    {
      icon: FiTwitter,
      label: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      colorClass: 'bg-primary-container text-on-primary-container hover:bg-primary-fixed'
    },
    {
      icon: FiFacebook,
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      colorClass: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed'
    },
    {
      icon: FiMessageCircle,
      label: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      colorClass: 'bg-tertiary-container text-on-tertiary-container hover:bg-tertiary-fixed'
    }
  ];

  return (
    <footer className="w-full bg-surface-container-high border-t-[4px] border-dashed border-outline-variant mt-10 sm:mt-16 pb-8 sm:pb-12 relative overflow-hidden">
      {/* Torn Paper border effect */}
      <div className="absolute top-0 left-0 w-full h-3 bg-on-background opacity-5"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:justify-between relative z-10">
        
        {/* Branding & Sub-text */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-2">
          <div className="font-headline font-extrabold text-2xl text-primary flex items-center gap-1.5">
            <span>🐑</span>
            <span>Eid Sketchbook</span>
          </div>
          <p className="font-body text-xs text-on-surface-variant font-bold max-w-sm leading-relaxed">
            Hand-drawn with love, laughter, and woolly hugs. May your Eid be filled with joy and blessings.
          </p>
        </div>

        {/* Social Share Buttons (Washi tape style) */}
        <div className="flex flex-col items-center gap-3">
          <span className="font-headline font-bold text-xs text-outline flex items-center gap-1">
            <FiSmile className="text-secondary animate-bounce" />
            Share the celebration:
          </span>
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { if (!isMuted) playPop(); }}
                  className={`w-11 h-11 flex items-center justify-center border-2 border-on-background rounded-xl wobbly-border-sm sticker-shadow hover:translate-y-0.5 hover:shadow-sticker transition-all ${social.colorClass}`}
                  title={`Share on ${social.label}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Links (Styled like tags or sticky tape) */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); if (!isMuted) playPop(); alert("Happy Eid! Made by Antigravity under Gemini IDE scratchpad context."); }}
            className="font-headline font-bold text-xs bg-surface text-on-surface-variant px-3 py-1.5 border-2 border-outline-variant hover:rotate-1 hover:scale-105 transition-transform rounded-md shadow-sm"
          >
            About Project
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); if (!isMuted) playPop(); alert("This application is running locally. Spread joy!"); }}
            className="font-headline font-bold text-xs bg-surface text-on-surface-variant px-3 py-1.5 border-2 border-outline-variant hover:-rotate-1 hover:scale-105 transition-transform rounded-md shadow-sm"
          >
            Privacy Notes
          </a>
        </div>

      </div>

      {/* Credit line */}
      <div className="text-center mt-12 font-headline font-bold text-[10px] text-outline opacity-60 flex items-center justify-center gap-1">
        <span>© 1445 Eid Sketchbook. Made with</span>
        <FiHeart className="text-tertiary animate-pulse" />
        <span>for families and friends everywhere.</span>
      </div>
    </footer>
  );
}
