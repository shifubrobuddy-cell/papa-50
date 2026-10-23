// Shared Audio Manager for reliable playback across preview iframes and devices

import { birthdayContent } from '../content';

type Listener = (isPlaying: boolean, hasError: boolean) => void;

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private hasError = false;
  private listeners: Set<Listener> = new Set();
  private initialized = false;

  constructor() {
    // Lazy init in browser
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this.initialized) return;
    this.initialized = true;

    try {
      this.audio = new Audio();
      this.audio.src = birthdayContent.music.src;
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 0.85;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.hasError = false;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('error', () => {
        console.warn('Audio error with primary source, trying fallback...');
        if (this.audio && this.audio.src !== birthdayContent.music.fallbackSrc) {
          this.audio.src = birthdayContent.music.fallbackSrc;
          this.audio.load();
        } else {
          this.hasError = true;
          this.notify();
        }
      });
    } catch (err) {
      console.warn('AudioManager init error:', err);
    }
  }

  public async play(): Promise<boolean> {
    this.init();
    if (!this.audio) return false;

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.hasError = false;
      this.notify();
      return true;
    } catch (err) {
      console.warn('Audio play was deferred or blocked by browser policy:', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return Promise.resolve(false);
    } else {
      return this.play();
    }
  }

  public setVolume(vol: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, vol));
    }
  }

  public toggleMute(): boolean {
    if (this.audio) {
      this.audio.muted = !this.audio.muted;
      return this.audio.muted;
    }
    return false;
  }

  public isMuted(): boolean {
    return this.audio ? this.audio.muted : false;
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying, this.hasError);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying, this.hasError));
  }
}

export const audioManager = new AudioManager();
