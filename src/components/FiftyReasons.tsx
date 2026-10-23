import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCheck, RotateCcw } from 'lucide-react';
import { birthdayContent } from '../content';

export const FiftyReasons: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [hasTriggeredAllConfetti, setHasTriggeredAllConfetti] = useState(false);

  const discoveredCount = Object.values(flippedCards).filter(Boolean).length;
  const total = birthdayContent.fiftyReasons.length;

  const toggleCard = (num: number) => {
    const next = { ...flippedCards, [num]: !flippedCards[num] };
    setFlippedCards(next);

    const newCount = Object.values(next).filter(Boolean).length;
    if (newCount === total && !hasTriggeredAllConfetti) {
      setHasTriggeredAllConfetti(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#F59E0B', '#EF4444', '#EC4899', '#A855F7'],
      });
    }
  };

  const flipAll = () => {
    const all: Record<number, boolean> = {};
    birthdayContent.fiftyReasons.forEach((r) => {
      all[r.num] = true;
    });
    setFlippedCards(all);
    if (!hasTriggeredAllConfetti) {
      setHasTriggeredAllConfetti(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const resetAll = () => {
    setFlippedCards({});
    setHasTriggeredAllConfetti(false);
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Half a Century of Reasons</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
          50 Reasons I Love You, Abu-g
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          Tap each golden card to flip and discover a memory, sacrifice, or quality that makes you my hero.
        </p>

        {/* Progress Tracker */}
        <div className="mt-6 max-w-xs mx-auto">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{discoveredCount} / {total} Discovered</span>
            </span>
            <span className="text-slate-400 font-mono">
              {Math.round((discoveredCount / total) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 rounded-full"
              style={{ width: `${(discoveredCount / total) * 100}%` }}
            />
          </div>

          {/* Quick controls */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <button
              onClick={flipAll}
              className="flex items-center gap-1 text-[11px] text-amber-300/80 hover:text-amber-200 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Reveal All Cards</span>
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={resetAll}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 50 Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {birthdayContent.fiftyReasons.map((reason) => {
          const isFlipped = !!flippedCards[reason.num];

          return (
            <div
              key={reason.num}
              onClick={() => toggleCard(reason.num)}
              className="h-44 sm:h-48 perspective-1000 cursor-pointer select-none group"
            >
              <div
                className={`relative w-full h-full transform-style-3d transition-transform duration-500 rounded-2xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT of Card */}
                <div className="absolute inset-0 backface-hidden rounded-2xl glass-card border border-amber-500/20 group-hover:border-amber-400/50 p-4 flex flex-col items-center justify-between text-center transition-all group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Heart className="w-3 h-3 text-amber-400" />
                  </div>

                  <div className="my-auto">
                    <span className="font-serif font-black text-4xl text-gold-gradient tracking-tight block">
                      #{reason.num}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium tracking-wide mt-1 block">
                      Tap to reveal
                    </span>
                  </div>

                  <span className="text-[10px] text-amber-300/60 uppercase tracking-widest font-semibold">
                    Abu-g
                  </span>
                </div>

                {/* BACK of Card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-b from-[#1c1236] to-[#0d071a] border border-amber-400/40 p-4 flex flex-col justify-between text-center shadow-xl">
                  <div className="flex items-center justify-between w-full border-b border-white/10 pb-1.5 mb-1">
                    <span className="text-[11px] font-bold text-amber-400">
                      #{reason.num}
                    </span>
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                  </div>

                  <div className="my-auto">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-white mb-1.5">
                      {reason.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-snug line-clamp-4">
                      {reason.text}
                    </p>
                  </div>

                  <span className="text-[9px] text-amber-300/60 tracking-wider">
                    Tap to flip back
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
