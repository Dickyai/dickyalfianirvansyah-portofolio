'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
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

// --- Animasi 3D Hover & Glow ---
const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: 'spring', stiffness: 300, damping: 25 },
    },
  },
};

const sharedTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
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
  const navItems = [
    { href: '#hero', label: 'HOME' },
    { href: '#about', label: 'ABOUT' },
    { href: '#competencies', label: 'SKILLS' },
    { href: '#projects', label: 'PROJECTS' },
    { href: '#certifications', label: 'CERTIFICATIONS' },
  ];

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 py-4 pointer-events-none transition-all duration-300">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={`pointer-events-auto w-full max-w-6xl mx-auto rounded-full transition-all duration-500 ${
          isOnCover
            ? 'bg-slate-950/30 backdrop-blur-md shadow-lg shadow-black/10 border border-white/15 py-2.5 px-4 sm:px-6'
            : isScrolled
            ? 'glass-panel shadow-lg shadow-slate-900/5 dark:shadow-black/40 border border-slate-200 dark:border-slate-800 py-2.5 px-4 sm:px-6'
            : 'bg-transparent py-3 px-2 sm:px-4 border border-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
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
            className={`font-display font-extrabold text-lg sm:text-xl tracking-tight cursor-pointer flex items-center gap-2 group ${
              isOnCover ? 'text-white' : 'text-slate-900 dark:text-white'
            }`}
          >
            <span className="tracking-tight font-display font-bold">
              DICKY<span className="text-blue-600 dark:text-blue-400">AI</span>
            </span>
          </a>

          {/* Desktop Navigation Links (ANIMASI 3D HOVER) */}
          <div className={`hidden md:flex items-center gap-1 p-1 rounded-full backdrop-blur-md ${
            isOnCover
              ? 'bg-white/10 border border-white/15'
              : 'bg-muted/80 dark:bg-card/80 border border-border'
          }`}>
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                className="relative block rounded-full overflow-visible group cursor-pointer"
                style={{ perspective: '600px' }}
                initial="initial"
                whileHover="hover"
              >
                {/* Backlight / Glow Effect (Biru menyesuaikan tema Anda) */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none rounded-full"
                  variants={glowVariants}
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)',
                    opacity: 0,
                  }}
                />
                
                {/* Wajah Depan (Saat Idle) */}
                <motion.a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`flex items-center justify-center px-3.5 py-1.5 relative z-10 bg-transparent ${
                    isOnCover ? 'text-white/80 group-hover:text-white' : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white'
                  } transition-colors rounded-full text-xs font-mono font-medium`}
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center bottom'
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                </motion.a>

                {/* Wajah Belakang (Muncul berputar dari bawah saat di-hover) */}
                <motion.a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  aria-hidden="true"
                  tabIndex={-1}
                  className={`flex items-center justify-center px-3.5 py-1.5 absolute inset-0 z-10 bg-transparent ${
                    isOnCover ? 'text-white' : 'text-slate-900 dark:text-white'
                  } transition-colors rounded-full text-xs font-mono font-medium drop-shadow-md`}
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center top',
                    transform: 'rotateX(90deg)'
                  }}
                >
                  <span className="relative z-10 font-bold">{item.label}</span>
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* Controls: Language, Theme & Menu Mobile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Lang switcher */}
            <div className={`flex items-center rounded-full border p-0.5 font-mono text-[11px] font-bold tracking-wider ${
              isOnCover
                ? 'border-white/20 bg-black/25'
                : 'border-border bg-muted dark:bg-card'
            }`}>
              <button
                onClick={() => onLangChange('id')}
                aria-label="Bahasa Indonesia"
                aria-pressed={lang === 'id'}
                className={`px-2 py-1 rounded-full transition-all duration-200 min-h-[32px] min-w-[32px] sm:min-h-0 sm:min-w-0 flex items-center justify-center ${
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
                aria-label="English"
                aria-pressed={lang === 'en'}
                className={`px-2 py-1 rounded-full transition-all duration-200 min-h-[32px] min-w-[32px] sm:min-h-0 sm:min-w-0 flex items-center justify-center ${
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
                initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.2 }}
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
              onClick={onToggleMobileMenu}
              className={`md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border ${
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

      {/* Mobile Drawer Menu (TETAP SAMA SEPERTI SEBELUMNYA) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto md:hidden absolute top-20 left-4 right-4 rounded-2xl p-5 ${
              isOnCover ? 'bg-slate-950/95 border border-white/10 text-white' : 'glass-panel border border-slate-200 dark:border-slate-800'
            } shadow-2xl flex flex-col space-y-2 font-mono text-sm`}
          >
            {navItems.map((item, idx) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={(e) => {
                  handleSmoothScroll(e, item.href);
                  onToggleMobileMenu();
                }}
                className={`px-4 py-3 min-h-[44px] flex items-center rounded-xl font-medium transition-colors ${
                  isOnCover
                    ? 'text-slate-100 hover:bg-white/10 hover:text-white'
                    : 'hover:bg-muted dark:hover:bg-card-elevated text-slate-800 dark:text-slate-200 hover:text-accent'
                }`}
              >
                {item.label}
              </motion.a>
            ))}

            <div className="pt-2 border-t border-border">
              <a
                href={cvDownloadUrl}
                download
                target="_blank"
                rel="noreferrer"
                onClick={onToggleMobileMenu}
                className="flex items-center justify-center gap-2 w-full min-h-[44px] py-3 rounded-xl bg-accent text-accent-foreground font-mono text-xs font-bold shadow-md hover:bg-accent-hover transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME (CV)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}