/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FloatingLanterns } from './components/FloatingLanterns';
import { MusicPlayer } from './components/MusicPlayer';
import { GiftGate } from './components/GiftGate';
import { HeroSection } from './components/HeroSection';
import { LiveAgeCounter } from './components/LiveAgeCounter';
import { JourneyTimeline } from './components/JourneyTimeline';
import { ThenAndNow } from './components/ThenAndNow';
import { FamilyGallery } from './components/FamilyGallery';
import { MyLetter } from './components/MyLetter';
import { FiftyReasons } from './components/FiftyReasons';
import { BlowTheCandle } from './components/BlowTheCandle';
import { WishWall } from './components/WishWall';
import { DuaCard } from './components/DuaCard';
import { FinaleSection } from './components/FinaleSection';

export default function App() {
  const [gateOpened, setGateOpened] = useState(false);
  const [musicTriggered, setMusicTriggered] = useState(false);
  const [isUrdu, setIsUrdu] = useState(false);

  const handleOpenGate = () => {
    setGateOpened(true);
    setMusicTriggered(true);
  };

  const handleReplay = () => {
    setGateOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#070312] text-slate-100 overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Floating lanterns ambient background */}
      <FloatingLanterns />

      {/* Background Ambient Radial Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(120,53,15,0.18)_0%,_rgba(88,28,135,0.12)_45%,_transparent_75%)]" />
        <div className="absolute top-[45%] left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(245,158,11,0.08)_0%,_transparent_70%)]" />
        <div className="absolute top-[75%] right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(147,51,234,0.09)_0%,_transparent_70%)]" />
      </div>

      {/* Background Music Player */}
      <MusicPlayer />

      {/* 1. Gift Gate (Shown before opening) */}
      {!gateOpened && (
        <GiftGate onOpen={handleOpenGate} />
      )}

      {/* Main Experience (Visible after gate opens or scrolls smoothly) */}
      <main className="relative z-10">
        {/* 2. Hero Section */}
        <HeroSection
          isUrdu={isUrdu}
          onToggleLang={() => setIsUrdu(!isUrdu)}
        />

        {/* 3. Live Age Counter */}
        <LiveAgeCounter />

        {/* 4. Journey Timeline (1976 → 2026) */}
        <JourneyTimeline isUrdu={isUrdu} />

        {/* 5. Then & Now Drag Comparison */}
        <ThenAndNow isUrdu={isUrdu} />

        {/* 6. Family Polaroid Gallery */}
        <FamilyGallery isUrdu={isUrdu} />

        {/* 7. My Letter */}
        <MyLetter isUrdu={isUrdu} />

        {/* 8. 50 Reasons I Love You */}
        <FiftyReasons />

        {/* 9. Blow the Candle */}
        <BlowTheCandle />

        {/* 10. Family Wish Wall */}
        <WishWall />

        {/* 11. Dua Card */}
        <DuaCard isUrdu={isUrdu} />

        {/* 12. Finale */}
        <FinaleSection onReplay={handleReplay} />
      </main>
    </div>
  );
}
