'use client';

import { useEffect, useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MusicWidget } from '../components/common/MusicWidget';
import { PageLoader } from '../components/common/PageLoader';
import { ScrollToTopButton } from '../components/common/ScrollToTopButton';
import { useLenis } from '../components/common/LenisProvider';
import { ProjectDetail } from '../components/project/ProjectDetail';
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
import type { Project } from '../types/project';

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
  const lenis = useLenis();
  const [lang, setLang] = useState<LangCode>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isParallaxVisible, setIsParallaxVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setIsParallaxVisible(false);
      return;
    }

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
  }, [selectedProject]);

  const t = TRANSLATIONS[lang];
  const rainPalette = isDarkMode ? DARK_RAIN_PALETTE : LIGHT_RAIN_PALETTE;

  const handleNavigate = () => setSelectedProject(null);

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setTimeout(() => {
      const projects = document.getElementById('projects');
      if (!projects) return;
      if (lenis) {
        lenis.scrollTo(projects, { offset: -80 });
      } else {
        projects.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    }, 50);
  };

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
          onLangChange={setLang}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          isScrolled={isScrolled}
          isOnCover={isParallaxVisible}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen((v) => !v)}
          onNavigate={handleNavigate}
          cvDownloadUrl={CV_DOWNLOAD_URL}
        />

        <main className="min-h-[100dvh]">
          {selectedProject ? (
            <ProjectDetail project={selectedProject} lang={lang} copy={t.detail} onBack={handleBackToProjects} />
          ) : (
            <div className="animate-in fade-in duration-700">
              <ParallaxComponent isDarkMode={isDarkMode} />
              <Hero copy={t.hero} lang={lang} />

              {/* B. Profile & Background */}
              <About copy={t.about} />

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
                onSelectProject={setSelectedProject}
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
          )}
        </main>

        <MusicWidget audioTrackUrl={AUDIO_TRACK_URL} copy={t.music} />
        <ScrollToTopButton />

        <Footer copyright={t.footer.copyright} builtWith={t.footer.builtWith} />
      </div>
    </div>
  );
}