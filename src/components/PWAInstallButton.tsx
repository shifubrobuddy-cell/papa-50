import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share2, X, Smartphone, Check } from 'lucide-react';

interface Props {
  variant?: 'floating' | 'inline' | 'hero';
  className?: string;
}

export const PWAInstallButton: React.FC<Props> = ({ variant = 'inline', className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  // If already installed, show small subtle badge or null
  if (isInstalled) {
    if (variant === 'hero' || variant === 'inline') {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
          <Check className="w-3.5 h-3.5" />
          <span>App Installed</span>
        </div>
      );
    }
    return null;
  }

  const handleShareOrCopy = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "50 Years of Papa • Golden Jubilee",
          text: "A special 50th birthday gift web app for my father Mustafa (Abu-g)!",
          url: window.location.href,
        });
      } catch {
        // Ignored if user cancels share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {isInstallable && (
        <button
          onClick={install}
          className={`group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 active:scale-95 transition-all cursor-pointer ${className}`}
        >
          <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          <span>Install Papa's Gift App</span>
        </button>
      )}

      {isIOS && (
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-200 hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer ${className}`}
        >
          <Smartphone className="w-4 h-4 text-amber-400" />
          <span>Add to iPhone Home Screen</span>
        </button>
      )}

      {/* Fallback button when not directly promptable */}
      {!isInstallable && !isIOS && (
        <button
          onClick={handleShareOrCopy}
          className={`flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-600 active:scale-95 transition-all cursor-pointer ${className}`}
        >
          <Share2 className="w-3.5 h-3.5 text-amber-400" />
          <span>{copied ? 'Link Copied!' : 'Share Birthday Link'}</span>
        </button>
      )}

      {/* iOS Safari Guided Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl glass-card p-6 border border-amber-500/30 shadow-2xl">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg">
                50
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Install on iPhone / iPad</h3>
                <p className="text-xs text-amber-300/80">Keep Abu-g's gift on your home screen</p>
              </div>
            </div>

            <ol className="space-y-3 text-xs text-slate-300 my-4 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-800 text-amber-400 text-xs font-semibold flex items-center justify-center">1</span>
                <span>Tap the <strong className="text-white">Share</strong> button <Share2 className="w-3.5 h-3.5 inline mx-0.5 text-amber-400" /> in Safari's bottom toolbar.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-800 text-amber-400 text-xs font-semibold flex items-center justify-center">2</span>
                <span>Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong> with the plus icon.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-800 text-amber-400 text-xs font-semibold flex items-center justify-center">3</span>
                <span>Tap <strong className="text-white">Add</strong> in top right. You can now launch it full-screen anytime!</span>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-2 w-full rounded-xl bg-amber-500 py-2.5 text-xs font-semibold text-slate-950 hover:bg-amber-400 active:scale-95 transition-all"
            >
              Got it, thank you!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
