'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, type Variants, useReducedMotion } from 'framer-motion';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useLenis } from '../common/LenisProvider';
import type { LangCode } from '../../i18n/types';

interface NavbarProps {
  lang: LangCode;
  onLangChange: (lang: LangCode) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isScrolled: boolean;
  isOnCover: boolean;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate: () => void;
  cvDownloadUrl: string;
}

const NAV_ITEMS = [
  { href: '#hero', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#competencies', label: 'SKILLS' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#certifications', label: 'CERTIFICATIONS' },
];

// --- Animasi 3D Hover & Glow ---
const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

export function Navbar({
  lang,
  onLangChange,
  isDarkMode,
  onToggleTheme,
  isScrolled,
  isOnCover,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
  cvDownloadUrl,
}: NavbarProps) {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const toggleMobileMenuRef = useRef(onToggleMobileMenu);
  toggleMobileMenuRef.current = onToggleMobileMenu;
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const sections = NAV_ITEMS.map(({ href }) => document.querySelector<HTMLElement>(href)).filter(
      (section): section is HTMLElement => section !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (activeEntry?.target instanceof HTMLElement) setActiveSection(activeEntry.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;
    const menuButton = menuButtonRef.current;
    const brand = brandRef.current;
    const desktopBreakpoint = window.matchMedia('(min-width: 64rem)');

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop();

    const getFocusableElements = () =>
      drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

    getFocusableElements()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        toggleMobileMenuRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const closeOnDesktop = () => {
      if (desktopBreakpoint.matches) toggleMobileMenuRef.current();
    };
    desktopBreakpoint.addEventListener('change', closeOnDesktop);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      desktopBreakpoint.removeEventListener('change', closeOnDesktop);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      if (desktopBreakpoint.matches) brand?.focus();
      else menuButton?.focus();
    };
  }, [isMobileMenuOpen, lenis]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate();
    const targetId = href.replace('#', '');
    window.requestAnimationFrame(() => {
      const element = document.getElementById(targetId);
      if (!element) return;
      if (lenis) {
        lenis.scrollTo(element, { offset: -80 });
        return;
      }

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetPosition,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  };

  const navMenu = (
    <motion.div
      ref={drawerRef}
      id="mobile-nav-drawer"
      role={isMobileMenuOpen ? 'dialog' : undefined}
      aria-modal={isMobileMenuOpen || undefined}
      aria-label={isMobileMenuOpen ? 'Primary navigation' : undefined}
      initial={isMobileMenuOpen && !reduceMotion ? { opacity: 0 } : false}
      animate={isMobileMenuOpen ? { opacity: 1 } : undefined}
      transition={{ duration: reduceMotion ? 0 : 0.24 }}
      className={`pointer-events-auto ${
        isMobileMenuOpen
          ? `fixed bottom-0 left-[env(safe-area-inset-left)] right-[env(safe-area-inset-right)] z-[60] flex max-h-[85dvh] flex-col space-y-2 overflow-y-auto rounded-t-3xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] font-mono text-sm shadow-2xl lg:hidden ${
              isOnCover ? 'border border-white/10 bg-slate-950/95 text-white' : 'glass-panel border border-slate-200 dark:border-slate-800'
            }`
          : `hidden items-center gap-1 rounded-full p-1 backdrop-blur-md lg:flex ${
              isOnCover
                ? 'border border-white/15 bg-white/10'
                : 'border border-border bg-muted/80 dark:bg-card/80'
            }`
      }`}
    >
      {NAV_ITEMS.map((item, index) => (
        <motion.div
          key={item.href}
          className={`group relative block cursor-pointer overflow-visible ${
            isMobileMenuOpen ? 'w-full rounded-xl' : 'rounded-full'
          }`}
          style={{ perspective: '600px' }}
          initial="initial"
          whileHover={reduceMotion ? undefined : 'hover'}
        >
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none rounded-full"
            variants={glowVariants}
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)',
              opacity: 0,
            }}
          />

          <motion.a
            href={item.href}
            onClick={(e) => {
              handleSmoothScroll(e, item.href);
              if (isMobileMenuOpen) onToggleMobileMenu();
            }}
            data-label={isMobileMenuOpen ? undefined : item.label}
            aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
            initial={isMobileMenuOpen && !reduceMotion ? { opacity: 0, x: -10 } : false}
            animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : undefined}
            transition={
              isMobileMenuOpen
                ? { duration: reduceMotion ? 0 : 0.24, delay: reduceMotion ? 0 : index * 0.05 }
                : undefined
            }
            className={
              isMobileMenuOpen
                ? `flex min-h-11 w-full items-center rounded-xl px-4 py-3 font-medium transition-colors ${
                    isOnCover
                      ? 'text-slate-100 hover:bg-white/10 hover:text-white'
                      : 'text-slate-800 hover:bg-muted hover:text-accent dark:text-slate-200 dark:hover:bg-card-elevated'
                  }`
                : `nav-flip-link relative z-10 flex items-center justify-center rounded-full bg-transparent px-3.5 py-1.5 text-xs font-mono font-medium ${
                    isOnCover ? 'text-white/80 group-hover:text-white' : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white'
                  }`
            }
          >
            {item.label}
          </motion.a>
        </motion.div>
      ))}

      {isMobileMenuOpen && (
        <div className="border-t border-border pt-2">
          <a
            href={cvDownloadUrl}
            download
            target="_blank"
            rel="noreferrer"
            onClick={onToggleMobileMenu}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 font-mono text-xs font-bold text-accent-foreground shadow-md transition-colors hover:bg-accent-hover"
          >
            <Download className="h-4 w-4" />
            <span>DOWNLOAD RESUME (CV)</span>
          </a>
        </div>
      )}
    </motion.div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-[calc(1rem+env(safe-area-inset-top))] pb-4 pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))] pointer-events-none transition-[opacity,transform] duration-premium ease-premium sm:pl-[calc(1.5rem+env(safe-area-inset-left))] sm:pr-[calc(1.5rem+env(safe-area-inset-right))]">
      <motion.nav
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto relative z-20 mx-auto w-full max-w-6xl rounded-full transition-[opacity,transform] duration-premium ease-premium ${
          isOnCover
            ? 'shadow-lg shadow-black/10 border border-white/15 py-2.5 px-4 sm:px-6'
            : isScrolled
            ? 'shadow-lg shadow-slate-900/5 dark:shadow-black/40 border border-slate-200 dark:border-slate-800 py-2.5 px-4 sm:px-6'
            : 'py-3 px-2 sm:px-4 border border-transparent'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-0 rounded-full bg-slate-950/30 backdrop-blur-md transition-opacity duration-premium ease-premium ${
            isOnCover ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-0 rounded-full bg-[var(--glass-bg)] backdrop-blur-[16px] transition-opacity duration-premium ease-premium ${
            !isOnCover && isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="relative z-10 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            ref={brandRef}
            href="#parallax-cover"
            onClick={(e) => {
              e.preventDefault();
              onNavigate();
              if (lenis) {
                lenis.scrollTo(0);
              } else {
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                });
              }
            }}
            className={`flex min-h-11 items-center gap-2 font-display text-lg font-extrabold tracking-tight sm:text-xl ${
              isOnCover ? 'text-white' : 'text-slate-900 dark:text-white'
            }`}
          >
            <span className="tracking-tight font-display font-bold">
              DICKY<span className="text-blue-600 dark:text-blue-400">AI</span>
            </span>
          </a>

          {!isMobileMenuOpen && navMenu}

          {/* Controls: Language, Theme & Menu Mobile */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Lang switcher */}
            <div className={`flex items-center rounded-full border p-0.5 font-mono text-[11px] font-bold tracking-wider ${
              isOnCover
                ? 'border-white/20 bg-black/25'
                : 'border-border bg-muted dark:bg-card'
            }`}>
              <button
                onClick={() => onLangChange('id')}
                aria-label="ID (Bahasa Indonesia)"
                aria-pressed={lang === 'id'}
                className={`flex min-h-11 min-w-11 items-center justify-center rounded-full px-2 py-1 transition-all duration-200 lg:min-h-0 lg:min-w-0 ${
                  lang === 'id'
                    ? isOnCover
                      ? 'bg-white/20 text-white shadow-sm'
                      : 'bg-card-elevated text-accent shadow-sm'
                    : isOnCover
                      ? 'text-white/65 hover:text-white'
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => onLangChange('en')}
                aria-label="EN (English)"
                aria-pressed={lang === 'en'}
                className={`flex min-h-11 min-w-11 items-center justify-center rounded-full px-2 py-1 transition-all duration-200 lg:min-h-0 lg:min-w-0 ${
                  lang === 'en'
                    ? isOnCover
                      ? 'bg-white/20 text-white shadow-sm'
                      : 'bg-card-elevated text-accent shadow-sm'
                    : isOnCover
                      ? 'text-white/65 hover:text-white'
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border transition-all ${
                isOnCover
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                  : 'bg-muted dark:bg-card hover:bg-card-elevated border-border text-slate-700 dark:text-slate-300'
              }`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <motion.div
                key={isDarkMode ? 'dark' : 'light'}
                initial={reduceMotion ? false : { rotate: -90, scale: 0.7, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
              >
                {!isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-400" />
                )}
              </motion.div>
            </button>

            {/* Mobile menu toggle */}
            <button
              ref={menuButtonRef}
              onClick={onToggleMobileMenu}
              className={`flex min-h-11 min-w-11 items-center justify-center rounded-full border p-2 lg:hidden ${
                isOnCover
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-muted dark:bg-card border-border text-slate-700 dark:text-slate-200'
              }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {isMobileMenuOpen &&
        createPortal(
          <>
            <motion.button
              type="button"
              aria-label="Close navigation"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.24 }}
              className="pointer-events-auto fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={onToggleMobileMenu}
            />
            {navMenu}
          </>,
          document.body,
        )}
    </header>
  );
}