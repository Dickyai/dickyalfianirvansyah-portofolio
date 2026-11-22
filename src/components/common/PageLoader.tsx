'use client';

import { useCallback, useEffect, useState } from 'react';
import { Chakra_Petch } from 'next/font/google';
import { EncryptedText } from '../ui/encrypted-text';

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

const LOADER_TEXT = 'Welcome to My Portfolio';
const REVEAL_DELAY_MS = 30;
const HOLD_AFTER_REVEAL_MS = 180;
const FADE_OUT_DURATION_MS = 300;

/**
 * Splash screen saat portofolio pertama kali dibuka.
 * Dirancang responsif dan cepat agar pengunjung tidak merasa tertahan di layar loading.
 */
export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasTextRevealed, setHasTextRevealed] = useState(false);
  const handleTextRevealed = useCallback(() => setHasTextRevealed(true), []);

  useEffect(() => {
    if (!hasTextRevealed) return;

    const fadeTimer = window.setTimeout(() => {
      setIsFadingOut(true);
    }, HOLD_AFTER_REVEAL_MS);

    const removeTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, HOLD_AFTER_REVEAL_MS + FADE_OUT_DURATION_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [hasTextRevealed]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#18191B] transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative inline-block text-center px-4 max-w-2xl">
        <p
          role="status"
          aria-live="polite"
          className={`${chakraPetch.className} text-xl sm:text-2xl md:text-3xl font-bold tracking-tight`}
        >
          <EncryptedText
            text={LOADER_TEXT}
            revealDelayMs={REVEAL_DELAY_MS}
            flipDelayMs={30}
            onComplete={handleTextRevealed}
            encryptedClassName="text-[#8A9099]"
            revealedClassName="text-white drop-shadow-md"
          />
        </p>
      </div>
    </div>
  );
}