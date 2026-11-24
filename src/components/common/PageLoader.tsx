'use client';

import { useEffect, useState } from 'react';
import { Chakra_Petch } from 'next/font/google';

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

const LOADER_TEXT = 'Welcome to My Portfolio';
const LOADER_DURATION_MS = 450;
const FADE_OUT_DURATION_MS = 240;

/**
 * Splash screen saat portofolio pertama kali dibuka.
 * Dirancang responsif dan cepat agar pengunjung tidak merasa tertahan di layar loading.
 */
export function PageLoader() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (
      document.readyState === 'complete' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(false);
      return;
    }

    const fadeTimer = window.setTimeout(() => setIsFadingOut(true), LOADER_DURATION_MS);
    const removeTimer = window.setTimeout(
      () => setIsVisible(false),
      LOADER_DURATION_MS + FADE_OUT_DURATION_MS,
    );

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isMounted || !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#18191B] transition-opacity duration-premium ease-premium ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative inline-block text-center px-4 max-w-2xl">
        <p
          role="status"
          aria-live="polite"
          className={`${chakraPetch.className} text-xl sm:text-2xl md:text-3xl font-bold tracking-tight`}
        >
          {LOADER_TEXT}
        </p>
      </div>
    </div>
  );
}