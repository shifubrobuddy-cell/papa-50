import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayContent } from '../content';

interface Props {
  isUrdu: boolean;
}

export const DuaCard: React.FC<Props> = ({ isUrdu }) => {
  if (!birthdayContent.dua.enabled) return null;

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-b from-[#180e2e] via-[#100722] to-[#070312] p-8 sm:p-12 border border-amber-400/30 shadow-[0_0_50px_rgba(245,158,11,0.12)] text-center overflow-hidden">
        
        {/* Subtle Arch Silhouette Background */}
        <div className="absolute inset-x-8 top-0 h-40 border-b-2 border-amber-400/10 rounded-b-full pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>A Prayer for My Father</span>
        </div>

        {/* Arabic Ayah */}
        <div className="my-6">
          <p
            dir="rtl"
            lang="ar"
            className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient leading-loose tracking-wide"
            style={{ fontFamily: "'Playfair Display', 'Traditional Arabic', serif" }}
          >
            {birthdayContent.dua.arabic}
          </p>
          <span className="text-[11px] text-amber-300/70 tracking-widest uppercase block mt-3 font-medium">
            {birthdayContent.dua.reference}
          </span>
        </div>

        {/* Transliteration */}
        <p className="font-serif italic text-amber-200/90 text-sm sm:text-base max-w-lg mx-auto mb-4">
          "{birthdayContent.dua.transliteration}"
        </p>

        {/* Translation */}
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
          {isUrdu ? birthdayContent.dua.translationUrdu : birthdayContent.dua.translationEnglish}
        </p>

        {/* Personal Son's Dua Box */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-5 max-w-lg mx-auto flex items-start gap-3 text-left">
          <Heart className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 fill-rose-400/40" />
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block mb-1">
              Mohammad Tameem's Daily Prayer for Abu-g
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "{birthdayContent.dua.personalDua}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
