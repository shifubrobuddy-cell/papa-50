import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, RefreshCw, Eye } from 'lucide-react';
import { birthdayContent } from '../content';

interface Props {
  isUrdu: boolean;
}

export const MyLetter: React.FC<Props> = ({ isUrdu }) => {
  const letterBody = isUrdu
    ? birthdayContent.myLetter.bodyUrdu
    : birthdayContent.myLetter.bodyEnglish;

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);

    let currentIndex = 0;
    const speed = 15; // ms per character
    const stepSize = 3; // 3 chars at a time for smooth reading rhythm

    const interval = setInterval(() => {
      currentIndex += stepSize;
      if (currentIndex >= letterBody.length) {
        setDisplayedText(letterBody);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(letterBody.slice(0, currentIndex));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [letterBody]);

  const showFullLetter = () => {
    setDisplayedText(letterBody);
    setIsTyping(false);
  };

  const restartTyping = () => {
    setDisplayedText('');
    setIsTyping(true);
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 3;
      if (currentIndex >= letterBody.length) {
        setDisplayedText(letterBody);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(letterBody.slice(0, currentIndex));
      }
    }, 15);
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
          <Mail className="w-3.5 h-3.5 text-amber-400" />
          <span>From My Heart to Yours</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
          A Letter for My Father
        </h2>
        <p className="text-slate-300 text-sm">
          Words I have carried inside me for years, written with endless love and gratitude.
        </p>
      </div>

      {/* Letter Container with Parchment Glass Look */}
      <div className="relative rounded-3xl bg-[#120a22]/90 border border-amber-500/30 p-6 sm:p-10 shadow-[0_0_50px_rgba(245,158,11,0.12)] backdrop-blur-xl">
        
        {/* Golden Wax Stamp Seal */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-xl flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-amber-700/80 border border-amber-300/40 flex items-center justify-center">
            <span className="font-serif text-white font-black text-sm tracking-tighter">50</span>
          </div>
        </div>

        {/* Top Controls: Instant Show & Replay */}
        <div className="flex justify-end gap-2 mb-6 pt-2">
          {isTyping ? (
            <button
              onClick={showFullLetter}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-amber-300 transition-colors"
            >
              <Eye className="w-3 h-3" />
              <span>Read Full Letter</span>
            </button>
          ) : (
            <button
              onClick={restartTyping}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-400 hover:text-amber-300 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Replay Writing</span>
            </button>
          )}
        </div>

        {/* Salutation */}
        <div className="mb-4">
          <p className="font-serif text-xl sm:text-2xl font-bold text-amber-300">
            {isUrdu ? birthdayContent.myLetter.salutationUrdu : birthdayContent.myLetter.salutation}
          </p>
        </div>

        {/* Typewritten Body */}
        <div className="text-slate-200 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal tracking-wide min-h-[300px]">
          {displayedText}
          {isTyping && (
            <span className="inline-block w-2 h-5 ml-1 bg-amber-400 animate-pulse align-middle" />
          )}
        </div>

        {/* Sign-off & Handwritten Signature */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-end">
          <p className="text-sm text-slate-400 mb-1">
            {isUrdu ? birthdayContent.myLetter.signOffUrdu : birthdayContent.myLetter.signOff}
          </p>
          <div className="font-handwriting text-3xl sm:text-4xl text-amber-300 font-bold tracking-wide">
            — {birthdayContent.myLetter.signature}
          </div>
        </div>
      </div>
    </section>
  );
};
