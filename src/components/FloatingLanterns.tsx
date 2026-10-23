import React, { useMemo } from 'react';

interface Lantern {
  id: number;
  x: number; // percentage across screen 0-100
  size: number; // px width
  duration: number; // seconds to float up
  delay: number; // seconds
  colorClass: string;
  glowClass: string;
  swayDuration: number;
}

export const FloatingLanterns: React.FC = () => {
  // Generate a fixed set of lanterns so re-renders don't cause jitter
  const lanterns: Lantern[] = useMemo(() => {
    const palette = [
      {
        body: 'from-amber-400/70 via-orange-500/60 to-red-600/40',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]',
      },
      {
        body: 'from-yellow-300/80 via-amber-400/60 to-orange-500/40',
        glow: 'shadow-[0_0_24px_rgba(251,191,36,0.6)]',
      },
      {
        body: 'from-rose-400/70 via-pink-500/50 to-purple-600/40',
        glow: 'shadow-[0_0_18px_rgba(244,63,94,0.4)]',
      },
      {
        body: 'from-amber-200/90 via-amber-400/60 to-yellow-600/40',
        glow: 'shadow-[0_0_22px_rgba(254,243,199,0.5)]',
      },
    ];

    return Array.from({ length: 16 }).map((_, i) => {
      const p = palette[i % palette.length];
      return {
        id: i,
        x: (i * 6.25 + (i % 3) * 2) % 94 + 3, // well distributed
        size: 16 + (i % 4) * 6, // 16px to 34px
        duration: 18 + (i % 5) * 4, // 18s - 34s
        delay: -(i * 2.5), // stagger start times so lanterns already fill the sky
        colorClass: p.body,
        glowClass: p.glow,
        swayDuration: 3 + (i % 3),
      };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {lanterns.map((lantern) => (
        <div
          key={lantern.id}
          className="absolute bottom-[-50px]"
          style={{
            left: `${lantern.x}%`,
            animation: `floatUp ${lantern.duration}s linear infinite`,
            animationDelay: `${lantern.delay}s`,
            willChange: 'transform',
          }}
        >
          <div
            className="flex flex-col items-center"
            style={{
              animation: `sway ${lantern.swayDuration}s ease-in-out infinite alternate`,
            }}
          >
            {/* Top loop */}
            <div className="w-1.5 h-1 border border-amber-300/40 rounded-t-sm" />
            
            {/* Lantern body */}
            <div
              className={`rounded-xl bg-gradient-to-b ${lantern.colorClass} ${lantern.glowClass} flex items-center justify-center relative backdrop-blur-xs`}
              style={{
                width: `${lantern.size}px`,
                height: `${lantern.size * 1.35}px`,
              }}
            >
              {/* Inner glowing flame */}
              <div className="w-2 h-2 rounded-full bg-white/90 shadow-[0_0_8px_#ffffff] animate-pulse" />
              {/* Rib details */}
              <div className="absolute inset-x-1 top-1 bottom-1 border-y border-amber-200/30 rounded-xs pointer-events-none" />
            </div>

            {/* Bottom tassel */}
            <div className="w-0.5 h-3 bg-gradient-to-b from-amber-400/60 to-transparent" />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.85);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          85% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(-115vh) scale(1.05);
            opacity: 0;
          }
        }

        @keyframes sway {
          0% {
            transform: translateX(-8px) rotate(-3deg);
          }
          100% {
            transform: translateX(8px) rotate(3deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .absolute[style*="animation: floatUp"] {
            animation: none !important;
            transform: translateY(-50vh) !important;
            opacity: 0.3 !important;
          }
        }
      `}</style>
    </div>
  );
};
