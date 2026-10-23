import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Gift, Heart } from 'lucide-react';
import { birthdayContent } from '../content';
import { audioManager } from '../utils/audioManager';

interface Props {
  onOpen: () => void;
}

export const GiftGate: React.FC<Props> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    // Start audio IMMEDIATELY and synchronously on user gesture token
    audioManager.play();

    setIsOpening(true);

    // Fire dual celebratory confetti cannons
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#FFD700', '#FFA500', '#FF4500', '#FFF8DC', '#E6C280'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#F59E0B', '#F43F5E'],
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#F59E0B', '#F43F5E'],
      });
    }, 250);

    // Give time for curtain lift animation to glide smoothly before uncovering the app
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#070312] overflow-hidden transition-all duration-1000 ease-in-out ${
        isOpening ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(88,28,135,0.3)_0%,_rgba(15,7,34,0.85)_50%,_rgba(7,3,18,0.98)_100%)]" />

      {/* Subtle particle dust background */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Floating lanterns in the gift gate */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] left-[12%] w-7 h-10 rounded-xl bg-gradient-to-b from-amber-400 to-orange-600 blur-[1px] opacity-70 animate-pulse shadow-[0_0_20px_#f59e0b]" />
        <div className="absolute top-[32%] right-[15%] w-8 h-11 rounded-xl bg-gradient-to-b from-yellow-300 to-amber-500 blur-[1px] opacity-75 animate-bounce shadow-[0_0_25px_#fbbf24]" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[22%] left-[20%] w-6 h-8 rounded-xl bg-gradient-to-b from-rose-400 to-amber-600 blur-[1px] opacity-60 shadow-[0_0_15px_#f43f5e]" />
        <div className="absolute bottom-[28%] right-[22%] w-5 h-7 rounded-xl bg-gradient-to-b from-amber-300 to-yellow-600 blur-[1px] opacity-70 shadow-[0_0_18px_#fcd34d]" />
      </div>

      {/* Main Gate Card */}
      <div className="relative z-10 max-w-md w-full mx-4 text-center px-6 py-10 rounded-3xl glass-card border border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.15)] flex flex-col items-center">
        
        {/* Golden Jubilee Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs tracking-widest font-semibold uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Golden Jubilee • 1976 — 2026</span>
        </div>

        {/* Big Golden 50 Badge Icon */}
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 via-orange-500/20 to-transparent blur-xl animate-pulse" />
          <div className="relative w-24 h-24 rounded-full border-2 border-amber-400/40 bg-gradient-to-b from-amber-400/10 to-transparent flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.3)]">
            <span className="font-serif font-black text-5xl text-gold-gradient tracking-tight">
              50
            </span>
          </div>
          <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase">
            Papa
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
          Happy 50th Birthday, <br />
          <span className="text-gold-gradient">{birthdayContent.fatherNickname}</span>
        </h1>

        <p className="text-slate-300 text-sm max-w-xs mb-8 leading-relaxed">
          From your son <strong className="text-amber-200">{birthdayContent.sonName}</strong> with all my heart, love, and prayers.
        </p>

        {/* Glowing Gift Action Button */}
        <button
          onClick={handleOpen}
          disabled={isOpening}
          className="group relative inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-bold text-base shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.7)] active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          {/* Subtle light sheen sweep */}
          <span className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
          
          <Gift className="w-5 h-5 text-slate-950 transition-transform group-hover:scale-110" />
          <span>Tap to open your gift, Papa</span>
          <Heart className="w-4 h-4 text-red-950 fill-red-950" />
        </button>

        <p className="text-[11px] text-slate-400 mt-4 tracking-wide">
          (Turn up your volume for the music)
        </p>
      </div>
    </div>
  );
};
