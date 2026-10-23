import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Globe, Heart } from 'lucide-react';
import { birthdayContent } from '../content';

interface Props {
  isUrdu: boolean;
  onToggleLang: () => void;
}

const HERO_AVATARS = [
  { id: 'portrait', src: '/photos/photo-now.jpg', label: 'Classic Portrait', pos: 'object-[center_12%]' },
  { id: 'birthday', src: '/photos/family-1.jpg', label: 'Birthday Smile', pos: 'object-[center_8%]' },
  { id: 'shadi', src: '/photos/family-8.jpg', label: 'Celebration', pos: 'object-[center_15%]' },
  { id: 'sofa', src: '/photos/family-9.jpg', label: 'Warm Home', pos: 'object-[center_18%]' },
  { id: 'young', src: '/photos/childhood-with-dad.jpg', label: 'With Tameem', pos: 'object-[center_20%]' },
];

export const HeroSection: React.FC<Props> = ({ isUrdu, onToggleLang }) => {
  const [tapCount, setTapCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0);

  const activeAvatar = HERO_AVATARS[selectedAvatarIdx];

  // Easter egg: 5 taps on the "50" triggers fireworks bursts
  const handleTap50 = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (nextCount % 5 === 0) {
      const end = Date.now() + 2 * 1000;
      const colors = ['#FFD700', '#FFA500', '#FF4500', '#F43F5E', '#FFFFFF'];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  };

  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
      
      {/* Top Controls: Language Switcher */}
      <div className="w-full flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 text-xs text-amber-300/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium tracking-wider uppercase">Golden Jubilee • 1976 — 2026</span>
        </div>

        {/* Language Toggle Button */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-xs font-medium text-amber-200 hover:bg-slate-800/90 active:scale-95 transition-all shadow-sm cursor-pointer"
          title="Toggle English / Roman Urdu translations"
        >
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span>{isUrdu ? 'Urdu / Roman' : 'English'}</span>
        </button>
      </div>

      {/* Hero Circular Glowing Frame for Abu-g */}
      <div className="relative mb-4 group">
        {/* Multi-layered radial glowing halo */}
        <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-amber-500/30 via-orange-500/20 to-purple-600/30 blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-80" />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 opacity-70 animate-pulse" style={{ animationDuration: '4s' }} />

        {/* Circular portrait container */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-3 border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.4)] bg-slate-950">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center">
              <span className="text-amber-400 font-serif text-2xl font-bold">Mustafa</span>
            </div>
          )}

          <img
            src={activeAvatar.src}
            alt={`Mustafa (${birthdayContent.fatherNickname}) - 50th Birthday Portrait`}
            loading="eager"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover ${activeAvatar.pos} transition-all duration-500 ${
              imageLoaded ? 'scale-100 blur-0 opacity-100' : 'scale-105 blur-md opacity-0'
            }`}
          />
        </div>

        {/* Floating Crown / Heart Pin */}
        <div className="absolute -top-3 -right-2 w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg border border-white/20">
          <Heart className="w-4 h-4 text-slate-950 fill-slate-950" />
        </div>

        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-wider shadow-lg whitespace-nowrap">
          {birthdayContent.fatherNickname}
        </div>
      </div>

      {/* Quick Portrait Thumbnails Selector */}
      <div className="flex items-center gap-2 mb-6 mt-1">
        {HERO_AVATARS.map((av, idx) => (
          <button
            key={av.id}
            onClick={() => {
              setSelectedAvatarIdx(idx);
              setImageLoaded(true);
            }}
            className={`w-8 h-8 rounded-full overflow-hidden border transition-all cursor-pointer ${
              selectedAvatarIdx === idx
                ? 'border-amber-400 scale-110 shadow-[0_0_10px_#f59e0b]'
                : 'border-white/20 opacity-50 hover:opacity-100'
            }`}
            title={av.label}
          >
            <img src={av.src} alt={av.label} className={`w-full h-full object-cover ${av.pos}`} />
          </button>
        ))}
      </div>

      {/* Giant Animated Gold "50" with 5-Tap Easter Egg */}
      <div className="relative mb-3 cursor-pointer select-none" onClick={handleTap50} title="Tap 5 times for fireworks!">
        <span className="font-serif font-black text-7xl sm:text-9xl text-gold-gradient tracking-tight drop-shadow-[0_10px_25px_rgba(245,158,11,0.3)] transition-transform active:scale-95 inline-block">
          50
        </span>
        {tapCount > 0 && tapCount % 5 !== 0 && (
          <span className="absolute -top-2 -right-4 text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
            {5 - (tapCount % 5)} taps to fireworks!
          </span>
        )}
      </div>

      {/* Primary Headline */}
      <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
        {birthdayContent.hero.title}{' '}
        <span className="text-gold-gradient block sm:inline">{birthdayContent.fatherName}</span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mb-6">
        {isUrdu ? birthdayContent.hero.subtitleUrdu : birthdayContent.hero.subtitle}
      </p>

      {/* Dedication Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-xs text-amber-200/90 border border-amber-500/20">
        <span>A loving gift from your son,</span>
        <strong className="text-white font-semibold">{birthdayContent.sonName}</strong>
      </div>
    </section>
  );
};
