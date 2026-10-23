import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { birthdayContent } from '../content';

export const LiveAgeCounter: React.FC = () => {
  const [timeUnits, setTimeUnits] = useState({
    years: 50,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  useEffect(() => {
    const birthDate = new Date(birthdayContent.birthDate).getTime();

    const calculateAge = () => {
      const now = new Date();
      const nowTime = now.getTime();
      const diffMs = Math.max(0, nowTime - birthDate);

      // Detailed calendar breakdown
      const birth = new Date(birthdayContent.birthDate);
      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      let days = now.getDate() - birth.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const totalSeconds = Math.floor(diffMs / 1000);

      setTimeUnits({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
      });
    };

    calculateAge();
    const interval = setInterval(calculateAge, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Years', value: timeUnits.years },
    { label: 'Months', value: timeUnits.months },
    { label: 'Days', value: timeUnits.days },
    { label: 'Hours', value: timeUnits.hours },
    { label: 'Minutes', value: timeUnits.minutes },
    { label: 'Seconds', value: timeUnits.seconds },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/25 shadow-[0_0_40px_rgba(245,158,11,0.08)] text-center relative overflow-hidden">
        {/* Subtle decorative glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Real-Time Ticking Since 23 October 1976</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
          50 Years on this Earth
        </h2>
        
        <p className="text-amber-200/80 text-sm max-w-md mx-auto mb-8 font-serif italic">
          "Every second of this was a blessing for our family."
        </p>

        {/* Counter Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-2xl bg-slate-900/70 border border-white/5 flex flex-col items-center justify-center transition-all hover:border-amber-400/30"
            >
              <span className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient tabular-nums">
                {String(stat.value).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Total seconds micro-indicator */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Over</span>
          <span className="font-mono text-amber-300 font-bold tabular-nums">
            {timeUnits.totalSeconds.toLocaleString()}
          </span>
          <span>seconds of unwavering love & protection.</span>
        </div>
      </div>
    </section>
  );
};
