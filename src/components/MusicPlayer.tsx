import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc, Music } from 'lucide-react';
import { birthdayContent } from '../content';
import { audioManager } from '../utils/audioManager';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
      if (playing) {
        setHasInteracted(true);
      }
    });

    // Also attach a one-time window listener so any tap on the page starts music if gate was opened
    const handleFirstTap = () => {
      if (!audioManager.getPlaying()) {
        audioManager.play();
      }
      window.removeEventListener('pointerdown', handleFirstTap);
    };

    window.addEventListener('pointerdown', handleFirstTap, { once: true });

    return () => {
      unsubscribe();
      window.removeEventListener('pointerdown', handleFirstTap);
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioManager.toggle();
  };

  const handleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      {/* Top-Right Sticky Compact Player */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-amber-500/30 shadow-xl shadow-black/50 text-xs">
          {/* Disc & Title Button */}
          <button
            onClick={handleToggle}
            aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
            className="flex items-center gap-2 text-amber-300 hover:text-amber-100 transition-colors focus-visible:outline-none cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <Disc
                className={`w-4 h-4 text-amber-400 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3.5s' }}
              />
              {isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              )}
            </div>
            
            <span className="hidden sm:inline font-medium tracking-wide max-w-[140px] truncate text-amber-200/90">
              {birthdayContent.music.title}
            </span>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={handleToggle}
            className="p-1 rounded-full text-slate-300 hover:text-amber-300 hover:bg-white/5 active:scale-90 transition-all focus-visible:outline-none cursor-pointer"
            title={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
            )}
          </button>

          {/* Mute Button */}
          <button
            onClick={handleMute}
            className="p-1 rounded-full text-slate-400 hover:text-amber-300 hover:bg-white/5 active:scale-90 transition-all focus-visible:outline-none cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Floating Prompt if music hasn't started yet */}
      {!isPlaying && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 animate-bounce duration-1000 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              audioManager.play();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300/60"
          >
            <Music className="w-4 h-4 fill-current animate-pulse" />
            <span>Tap to Play Abu-g's Song (KK Mashup) 🎵</span>
          </button>
        </div>
      )}
    </>
  );
};
