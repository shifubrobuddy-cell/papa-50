import React from 'react';
import { MapPin, Calendar, Sparkles } from 'lucide-react';
import { birthdayContent, TimelineItem } from '../content';

interface Props {
  isUrdu: boolean;
}

export const JourneyTimeline: React.FC<Props> = ({ isUrdu }) => {
  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>The Path of Sacrifice & Love</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
          Abu-g's Journey (1976 → 2026)
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
          From early youth to Abha, Dammam, Khobar, and Riyadh — five decades of building a secure, blessed sanctuary for us all.
        </p>
      </div>

      {/* Timeline Vertical Track */}
      <div className="relative border-l-2 border-amber-500/30 ml-4 sm:ml-32 space-y-12">
        {birthdayContent.timeline.map((item: TimelineItem, index: number) => (
          <div key={index} className="relative pl-6 sm:pl-10 group">
            
            {/* Timeline Dot with Gold Glow */}
            <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_12px_#f59e0b] group-hover:scale-125 transition-transform duration-300">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
            </div>

            {/* Year Badge on the Left (Desktop) or Inline */}
            <div className="sm:absolute sm:-left-32 sm:top-1 sm:w-24 sm:text-right">
              <span className="font-serif font-black text-xl sm:text-2xl text-gold-gradient block">
                {item.year}
              </span>
            </div>

            {/* Milestone Card */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-amber-400/30 transition-all duration-300 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  {item.title}
                </h3>
                {item.location && (
                  <div className="flex items-center gap-1 text-xs text-amber-300/90 font-medium">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {isUrdu && item.descriptionUrdu ? item.descriptionUrdu : item.description}
              </p>

              {/* Milestone Photo - Full Face Visibility Guaranteed */}
              {item.photo && (
                <div className="relative rounded-2xl overflow-hidden border border-white/10 max-w-lg bg-slate-950 shadow-2xl group/photo my-3">
                  {/* Ambient background blur */}
                  <img
                    src={item.photo}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                  />

                  {/* Clear, uncropped photo display so all faces and heads are visible */}
                  <div className="relative z-10 w-full max-h-[380px] sm:max-h-[440px] flex items-center justify-center p-2">
                    <img
                      src={item.photo}
                      alt={item.photoAlt || item.title}
                      loading="lazy"
                      className="max-h-[360px] sm:max-h-[420px] w-auto max-w-full rounded-xl object-contain shadow-2xl transition-transform duration-500 group-hover/photo:scale-[1.02]"
                    />
                  </div>

                  <div className="relative z-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-5 flex items-center justify-between">
                    <span className="text-xs text-amber-200/95 font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item.photoAlt || item.title}</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
