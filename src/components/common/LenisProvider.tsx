'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let instance: Lenis | null = null;
    const updateScrollTrigger = () => ScrollTrigger.update();
    const raf = (time: number) => instance?.raf(time * 1000);

    const start = () => {
      if (instance || motionPreference.matches) return;

      instance = new Lenis({ autoRaf: false, anchors: true });
      instance.on('scroll', updateScrollTrigger);
      gsap.ticker.add(raf);
      setLenis(instance);
    };

    const stop = () => {
      if (!instance) return;

      gsap.ticker.remove(raf);
      instance.off('scroll', updateScrollTrigger);
      instance.destroy();
      instance = null;
      setLenis(null);
    };

    const syncMotionPreference = () => {
      if (motionPreference.matches) stop();
      else start();
    };

    syncMotionPreference();
    motionPreference.addEventListener('change', syncMotionPreference);

    return () => {
      motionPreference.removeEventListener('change', syncMotionPreference);
      stop();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}
