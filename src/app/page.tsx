'use client';

import { useEffect, useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MusicWidget } from '../components/common/MusicWidget';
import { PageLoader } from '../components/common/PageLoader';
import { ScrollToTopButton } from '../components/common/ScrollToTopButton';
import { ParallaxComponent } from '../components/ui/parallax-scrolling';
import DataRain, { type DataRainPalette } from '../components/ui/data-rain';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { CoreCompetencies } from '../sections/CoreCompetencies';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Certifications } from '../sections/Certifications';
import { Contact } from '../sections/Contact';
import { TRANSLATIONS } from '../i18n/translations';
import { CV_DOWNLOAD_URL } from '../data/contact';
import type { LangCode } from '../i18n/types';

const AUDIO_TRACK_URL = '/music/lagu.m4a';
const DARK_RAIN_PALETTE: DataRainPalette = {
  calm: '#8E86D0',
  mid: '#E0A95A',
  hot: '#8E86D0',
};
const LIGHT_RAIN_PALETTE: DataRainPalette = {
  calm: '#3F6FA8',
  mid: '#9A4F26',
  hot: '#3F6FA8',
};

export default function PortfolioApp() {
  const { isDarkMode, toggleTheme } = useDarkMode();
  const [lang, setLang] = useState<LangCode>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isParallaxVisible, setIsParallaxVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedLang = window.localStorage.getItem('portfolio-language');
    if (savedLang === 'id' || savedLang === 'en') setLang(savedLang);
  }, []);

  const handleLangChange = (nextLang: LangCode) => {
    setLang(nextLang);
    window.localStorage.setItem('portfolio-language', nextLang);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cover = document.getElementById('parallax-cover');
    if (!cover) {
      setIsParallaxVisible(false);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsParallaxVisible(entry.isIntersecting);
    });

    observer.observe(cover);
    return () => observer.disconnect();
  }, []);

  const t = TRANSLATIONS[lang];
  const rainPalette = isDarkMode ? DARK_RAIN_PALETTE : LIGHT_RAIN_PALETTE;

  return (
    <div className="relative isolate min-h-[100dvh] overflow-x-clip bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground transition-colors duration-500">
      <DataRain
        className="portfolio-data-rain"
        count={1400}
        flowSpeed={0.75}
        obstacleRadius={72}
        palette={rainPalette}
      />
      <PageLoader />

      <div className="relative z-10">
        <Navbar
          lang={lang}
          onLangChange={handleLangChange}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          isScrolled={isScrolled}
          isOnCover={isParallaxVisible}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen((v) => !v)}
          onNavigate={() => setIsMobileMenuOpen(false)}
          cvDownloadUrl={CV_DOWNLOAD_URL}
        />

        <main className="min-h-[100dvh]">
          <div className="animate-in fade-in duration-700">
            <ParallaxComponent isDarkMode={isDarkMode} />
            <Hero copy={t.hero} lang={lang} />

            {/* B. Profile & Background */}
            <About copy={t.about} lang={lang} />

            {/* C. Industrial Core Competencies (Destinasi Utama Navigasi) */}
            <CoreCompetencies copy={t.coreCompetencies} />

            {/* D. Visual Engineering Toolkit (Transisi Visual, Tanpa Anchor Navigasi) */}
            <Skills />

            {/* E. Complete Project Archive */}
            <Projects
              heading={t.sections.projectsHeading}
              searchCopy={t.projectsSection}
              statusLabels={t.detail.statusLabels}
              lang={lang}
            />

            {/* E. Certifications & Official Qualifications */}
            <Certifications
              heading={t.sections.certificationsHeading}
              isDarkMode={isDarkMode}
              lang={lang}
            />

            {/* F. Contact */}
            <Contact sectionCopy={t.contactSection} formCopy={t.contact} />
          </div>
        </main>

        <MusicWidget audioTrackUrl={AUDIO_TRACK_URL} copy={t.music} />
        <ScrollToTopButton />

        <Footer copyright={t.footer.copyright} builtWith={t.footer.builtWith} />
      </div>
    </div>
  );
}