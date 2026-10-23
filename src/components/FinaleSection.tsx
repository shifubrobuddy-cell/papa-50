import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, RefreshCw, Share2, Sparkles, Check } from 'lucide-react';
import { birthdayContent } from '../content';
import { PWAInstallButton } from './PWAInstallButton';

interface Props {
  onReplay: () => void;
}

export const FinaleSection: React.FC<Props> = ({ onReplay }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "50 Years of Papa • Golden Jubilee",
          text: `Happy 50th Birthday, Abu-g (${birthdayContent.fatherName})! A gift from Mohammad Tameem Mustafa.`,
          url: window.location.href,
        });
      } catch {
        // Ignored
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleHeartClick = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#EF4444', '#EC4899', '#FFD700'],
    });
  };

  return (
    <section className="relative pt-16 pb-24 px-4 sm:px-6 max-w-3xl mx-auto text-center">
      {/* Beating Heart & Final Declaration */}
      <div className="flex flex-col items-center mb-10">
        <button
          onClick={handleHeartClick}
          aria-label="Send love to Abu-g"
          className="relative group p-4 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-transform active:scale-90 mb-4 cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-ping opacity-60" style={{ animationDuration: '2s' }} />
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500 transition-transform group-hover:scale-110" />
        </button>

        <h2 className="font-serif text-4xl sm:text-5xl font-black text-white mb-2 leading-tight">
          I Love You, <span className="text-gold-gradient">Papa</span>
        </h2>
        
        <p className="text-amber-200/90 font-serif italic text-base sm:text-lg max-w-md mx-auto">
          "You gave me your name, your protection, and your life. I will spend mine making you proud."
        </p>
      </div>

      {/* Action Buttons Grid */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
        {/* Replay Surprise Button */}
        <button
          onClick={onReplay}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 border border-white/10 text-white font-semibold text-sm hover:border-amber-400/40 hover:bg-slate-800 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>Replay the Surprise</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 border border-white/10 text-white font-semibold text-sm hover:border-amber-400/40 hover:bg-slate-800 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Share Gift Link</span>
            </>
          )}
        </button>

        {/* PWA Install Button */}
        <PWAInstallButton className="w-full sm:w-auto" />
      </div>

      {/* Quiet, Respectful Footer */}
      <div className="pt-8 border-t border-white/10 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-amber-300/70 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mustafa's Golden Jubilee • 1976 — 2026</span>
        </div>
        <p>
          Dedicated with unconditional love by his son <strong className="text-slate-300">Mohammad Tameem Mustafa</strong>.
        </p>
        <p className="text-[11px] text-slate-600">
          Abha · Dammam · Khobar · Riyadh
        </p>
      </div>
    </section>
  );
};
