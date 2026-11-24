'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let instance: Lenis | null = null;

    const start = () => {
      if (instance || motionPreference.matches) return;

      instance = new Lenis({ autoRaf: true, anchors: true, smoothWheel: false });
      setLenis(instance);
    };

    const stop = () => {
      if (!instance) return;

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
