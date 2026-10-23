import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';
import { birthdayContent } from '../content';

interface Props {
  isUrdu: boolean;
}

export const ThenAndNow: React.FC<Props> = ({ isUrdu }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already ended
    }
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Then & Now</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
          {birthdayContent.thenAndNow.title}
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          {birthdayContent.thenAndNow.subtitle}
        </p>
      </div>

      {/* Comparison Container */}
      <div className="glass-card rounded-3xl p-4 sm:p-6 border border-amber-500/20 shadow-2xl">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-full max-w-2xl mx-auto aspect-[4/5] sm:aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none shadow-inner bg-slate-950"
        >
          {/* NOW (Right side - Full image background) */}
          <img
            src={birthdayContent.thenAndNow.nowPhoto}
            alt="Mustafa today at 50"
            className="absolute inset-0 w-full h-full object-cover object-[center_12%]"
          />
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-200">
            {birthdayContent.thenAndNow.nowLabel}
          </div>

          {/* THEN (Left side - Clipped overlay image) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={birthdayContent.thenAndNow.youngPhoto}
              alt="Mustafa in earlier years with baby Tameem"
              className="absolute inset-0 w-full h-full object-cover object-[center_12%] max-w-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              }}
            />
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-200">
              {birthdayContent.thenAndNow.youngLabel}
            </div>
          </div>

          {/* Golden Divider Line and Drag Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-[0_0_15px_#f59e0b]"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Center Thumb */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white/40">
              <SlidersHorizontal className="w-4 h-4 fill-current rotate-90" />
            </div>
          </div>
        </div>

        {/* Drag Hint & Caption */}
        <div className="text-center mt-6">
          <p className="font-serif italic text-base sm:text-lg text-amber-200 mb-1">
            "{isUrdu && birthdayContent.thenAndNow.captionUrdu
              ? birthdayContent.thenAndNow.captionUrdu
              : birthdayContent.thenAndNow.caption}"
          </p>
          <span className="text-xs text-slate-400">
            Drag the slider left or right to explore the journey across time
          </span>
        </div>
      </div>
    </section>
  );
};
