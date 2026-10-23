import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, MessageSquareHeart, Sparkles, User, Heart } from 'lucide-react';
import { birthdayContent, Wish } from '../content';

const STORAGE_KEY = 'papa_birthday_wishes_50';

export const WishWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Load from localStorage on mount, seed with defaultWishes if empty
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes(parsed);
          return;
        }
      }
      setWishes(birthdayContent.defaultWishes);
    } catch {
      setWishes(birthdayContent.defaultWishes);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      relation: relation.trim() || 'Family',
      message: message.trim(),
      timestamp: 'Just now',
      color: 'gold',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    setRecentlyAddedId(newWish.id);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Could not save to localStorage:", err);
    }

    // Gentle confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#F59E0B', '#FFA500'],
    });

    // Reset inputs
    setName('');
    setRelation('');
    setMessage('');
    setIsSubmitting(false);

    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 4000);
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
          <MessageSquareHeart className="w-3.5 h-3.5 text-amber-400" />
          <span>Warm Blessings</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
          Family Wish Wall
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          Leave your dua, memory, or birthday message for Abu-g. Every wish becomes a lantern of love in his sky.
        </p>
      </div>

      {/* Wish Submission Form */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/20 shadow-xl mb-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Your Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mohammad Tameem, Ammi, Ilyas..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Relationship
              </label>
              <input
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="e.g. Son, Daughter, Brother, Friend..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Your Message or Dua *
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a sweet message, dua, or memory for Abu-g's 50th birthday..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:from-amber-300 hover:to-amber-400 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Wish to Abu-g</span>
            </button>
          </div>
        </form>
      </div>

      {/* Wish Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-4 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Wishes & Prayers ({wishes.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishes.map((w) => {
            const isNew = w.id === recentlyAddedId;

            return (
              <div
                key={w.id}
                className={`glass-card rounded-2xl p-5 border transition-all duration-500 ${
                  isNew
                    ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.3)] scale-[1.02]'
                    : 'border-white/10 hover:border-amber-400/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/30 to-purple-500/30 border border-amber-400/30 flex items-center justify-center font-bold text-amber-300 text-xs">
                      {w.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm leading-tight">
                        {w.name}
                      </h4>
                      <span className="text-[11px] text-amber-300/80">
                        {w.relation}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {w.timestamp}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal mt-2">
                  "{w.message}"
                </p>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-end">
                  <Heart className="w-3.5 h-3.5 text-rose-400/80 fill-rose-400/30" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
