'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLenis } from './LenisProvider';

const SHOW_THRESHOLD_PX = 480;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > SHOW_THRESHOLD_PX);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 w-11 h-11 rounded-full bg-card/90 backdrop-blur-md border border-border shadow-xl flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-accent hover:border-accent transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
