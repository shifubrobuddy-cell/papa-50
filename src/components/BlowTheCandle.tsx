import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Mic, MicOff, Flame, Wind, RotateCcw, Sparkles } from 'lucide-react';

export const BlowTheCandle: React.FC = () => {
  // 5 candles representing 5 decades (10 years each = 50 years!)
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [micActive, setMicActive] = useState(false);
  const [micDenied, setMicDenied] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [allExtinguished, setAllExtinguished] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.2;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setMicActive(true);
      setMicDenied(false);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkAudio = () => {
        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume in the turbulent low-to-mid wind frequency range
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setAudioLevel(normalized);

        // Threshold for blowing detection
        if (normalized > 38) {
          extinguishNextCandle();
        }

        animationFrameRef.current = requestAnimationFrame(checkAudio);
      };

      checkAudio();
    } catch (err) {
      console.warn("Microphone access denied or unsupported:", err);
      setMicDenied(true);
      setMicActive(false);
    }
  };

  const stopMic = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }
    setMicActive(false);
  };

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  const extinguishNextCandle = () => {
    setCandlesLit((prev) => {
      const litIndex = prev.findIndex((lit) => lit);
      if (litIndex === -1) return prev;
      const next = [...prev];
      next[litIndex] = false;

      // Check if all are now extinguished
      if (next.every((lit) => !lit)) {
        triggerWishCelebration();
      }
      return next;
    });
  };

  const extinguishManual = (index: number) => {
    setCandlesLit((prev) => {
      const next = [...prev];
      next[index] = false;
      if (next.every((lit) => !lit)) {
        triggerWishCelebration();
      }
      return next;
    });
  };

  const blowAllManual = () => {
    setCandlesLit([false, false, false, false, false]);
    triggerWishCelebration();
  };

  const triggerWishCelebration = () => {
    setAllExtinguished(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FFFFFF', '#EC4899', '#38BDF8'],
    });
  };

  const relightCandles = () => {
    setCandlesLit([true, true, true, true, true]);
    setAllExtinguished(false);
  };

  const litCount = candlesLit.filter(Boolean).length;

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>Interactive Birthday Tradition</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
          Blow the Golden Candles
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          5 candles for 5 glorious decades. Blow into your phone's microphone to extinguish them, or tap them!
        </p>
      </div>

      <div className="relative glass-card rounded-3xl p-6 sm:p-10 border border-amber-500/25 shadow-2xl overflow-hidden flex flex-col items-center">
        
        {/* Microphone status or activation toggle */}
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-3">
          {!micActive ? (
            <button
              onClick={startMic}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-amber-400/40 text-xs font-semibold text-amber-300 hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Mic className="w-4 h-4 text-amber-400" />
              <span>Enable Microphone to Blow</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Listening for your breath...</span>
              <button
                onClick={stopMic}
                className="text-slate-400 hover:text-white ml-1"
                title="Turn off microphone"
              >
                <MicOff className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Sound level gauge if mic active */}
          {micActive && (
            <div className="flex items-center gap-1.5">
              <div className="w-24 h-2 rounded-full bg-slate-900 overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-75"
                  style={{ width: `${audioLevel}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{audioLevel}%</span>
            </div>
          )}

          {micDenied && (
            <span className="text-xs text-amber-400/80">
              Mic access denied or unavailable. You can tap the candles or button below!
            </span>
          )}
        </div>

        {/* The 5 Candles & Birthday Cake Illustration */}
        <div className="relative w-full max-w-md flex flex-col items-center my-4">
          
          {/* Candle Row */}
          <div className="flex items-end justify-center gap-5 sm:gap-8 mb-[-4px] z-10">
            {candlesLit.map((isLit, i) => (
              <div
                key={i}
                onClick={() => isLit && extinguishManual(i)}
                className="flex flex-col items-center cursor-pointer group select-none"
                title={`Candle for Decade ${i + 1} (${isLit ? 'Lit - Click to blow out' : 'Extinguished'})`}
              >
                {/* Flame / Smoke */}
                <div className="h-10 flex items-center justify-center">
                  {isLit ? (
                    <div className="relative flex flex-col items-center animate-bounce" style={{ animationDuration: `${1.4 + (i % 3) * 0.2}s` }}>
                      {/* Outer flame halo */}
                      <div className="w-4 h-6 rounded-full bg-amber-400/80 blur-[2px] shadow-[0_0_15px_#f59e0b]" />
                      {/* Inner core flame */}
                      <div className="absolute top-1 w-2 h-3.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                    </div>
                  ) : (
                    /* Smoke wisps */
                    <div className="flex flex-col items-center opacity-60">
                      <div className="w-1 h-3 bg-slate-400/60 rounded-full blur-[1px] animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Wick */}
                <div className="w-0.5 h-2 bg-slate-900" />

                {/* Candle Stick with Gold Striping */}
                <div className="w-4 sm:w-5 h-16 sm:h-20 rounded-t-sm bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 shadow-md border-x border-amber-500/40 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,#b45309,#b45309_4px,transparent_4px,transparent_8px)]" />
                  <span className="absolute bottom-1 inset-x-0 text-center font-bold text-[9px] text-slate-900 font-mono">
                    {i * 10 + 10}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Golden Celebration Cake (Tier 1 & Tier 2) */}
          <div className="w-full flex flex-col items-center">
            {/* Top Tier */}
            <div className="w-64 sm:w-72 h-14 rounded-t-2xl bg-gradient-to-r from-[#2a1b4e] via-[#4c1d95] to-[#2a1b4e] border-t-2 border-x-2 border-amber-400/50 shadow-inner relative flex items-center justify-center">
              {/* Frosting drips */}
              <div className="absolute top-0 inset-x-0 flex justify-around">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div key={idx} className="w-4 h-3 bg-amber-200/90 rounded-b-full shadow-xs" />
                ))}
              </div>
              <span className="font-serif font-black text-amber-200 tracking-wider text-sm mt-2">
                GOLDEN 50
              </span>
            </div>

            {/* Bottom Tier */}
            <div className="w-72 sm:w-84 h-16 rounded-b-xl bg-gradient-to-r from-[#1e1038] via-[#3b0764] to-[#1e1038] border-b-2 border-x-2 border-amber-400/40 flex items-center justify-center shadow-2xl relative">
              <span className="text-xs text-amber-300/80 font-medium tracking-widest uppercase">
                Happy Birthday Abu-g
              </span>
            </div>

            {/* Cake Stand Base Plate */}
            <div className="w-80 sm:w-96 h-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 shadow-[0_8px_20px_rgba(245,158,11,0.3)] mt-[-2px]" />
          </div>
        </div>

        {/* Celebration State or Helper Controls */}
        {allExtinguished ? (
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-purple-500/20 border border-amber-400/40 text-center animate-in zoom-in-95 duration-300">
            <div className="inline-flex items-center gap-1.5 text-amber-300 text-sm font-bold mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Make a wish, Papa!</span>
            </div>
            <p className="text-white font-serif text-xl sm:text-2xl font-bold mb-3">
              May all your silent duas and prayers come true. Ameen!
            </p>
            <button
              onClick={relightCandles}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-amber-400/30 text-xs font-semibold text-amber-300 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Relight Candles</span>
            </button>
          </div>
        ) : (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={blowAllManual}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md hover:from-amber-300 hover:to-amber-400 active:scale-95 transition-all cursor-pointer"
            >
              <Wind className="w-4 h-4" />
              <span>Blow Out All ({litCount} remaining)</span>
            </button>
            <span className="text-xs text-slate-400">
              Or blow into your phone's mic
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
