'use client';

import { useState, useEffect } from 'react';
import { Target, Boxes, BarChart3, Activity, Cpu, BookOpen, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealSection } from '../components/common/RevealSection';
import { Container } from '../components/common/Container';
import { useLenis } from '../components/common/LenisProvider';
import type { Translation, CoreCompetencyItem } from '../i18n/types';
import { PROJECTS } from '../data/projects'; // Import untuk memetakan nama project

interface CoreCompetenciesProps {
  copy: Translation['coreCompetencies'];
}

// Icon disesuaikan secara berurutan dengan 6 Domain Competency baru
const COMPETENCY_ICONS = [Target, Boxes, BarChart3, Activity, Cpu, BookOpen];

export function CoreCompetencies({ copy }: CoreCompetenciesProps) {
  const [selectedComp, setSelectedComp] = useState<{ index: number; data: CoreCompetencyItem } | null>(null);
  const lenis = useLenis();

  // Aksesibilitas: Kunci scroll body dan tangkap tombol ESC saat modal terbuka
  useEffect(() => {
    if (!selectedComp) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedComp(null);
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [selectedComp, lenis]);

  // Navigasi smooth ke section projects
  const handleScrollToProjects = () => {
    setSelectedComp(null);
    setTimeout(() => {
      const projects = document.getElementById('projects');
      if (projects) {
        if (lenis) lenis.scrollTo(projects, { offset: -80 });
        else {
          projects.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'start',
          });
        }
      }
    }, 150);
  };

  return (
    <section
      id="competencies"
      className="relative py-16 sm:py-20 lg:py-20"
    >
      <RevealSection className="w-full">
        <Container className="desktop-container max-w-[78rem]">
        <div className="mb-8 border-b border-border/80 pb-5">
          <h2 className="font-display text-[clamp(1.605rem,3.77vw,2.4075rem)] font-extrabold leading-[1.111] tracking-tight text-slate-900 dark:text-white">
            {copy.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
          {copy.items.map((item, idx) => {
            const Icon = COMPETENCY_ICONS[idx % COMPETENCY_ICONS.length];
            return (
              <motion.button
                key={idx}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.18 }}
                onClick={() => setSelectedComp({ index: idx, data: item })}
                className="group flex min-h-[150px] items-start gap-4 border-b border-border/80 py-6 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                aria-label={`View details for ${item.title}`}
              >
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center text-blue-600 transition-colors group-hover:text-blue-800 dark:text-blue-400 dark:group-hover:text-blue-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="mb-1 flex items-center justify-between gap-3">
                    <span role="heading" aria-level={3} className="font-display text-[clamp(1rem,1.88vw,1.20375rem)] font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                      {item.title}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-slate-400 dark:text-slate-500">
                      0{idx + 1}
                    </span>
                  </span>

                  <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {item.category}
                  </span>

                  <span className="mt-2 block font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.description}
                  </span>

                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-blue-600 transition-colors group-hover:text-blue-800 dark:text-blue-400 dark:group-hover:text-blue-300">
                    {copy.exploreCta}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
        </Container>
      </RevealSection>

      {/* Side Drawer / Modal Detail */}
      <AnimatePresence>
        {selectedComp && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedComp(null)}
              aria-hidden="true"
            />
            
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full sm:w-[440px] h-[100dvh] bg-background shadow-2xl border-l border-border flex flex-col overflow-y-auto overscroll-contain"
              role="dialog"
              aria-modal="true"
              aria-labelledby="comp-dialog-title"
              data-lenis-prevent
            >
              {/* Header Panel */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-5 bg-background/90 backdrop-blur-md border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                    0{selectedComp.index + 1}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">/</span>
                  <span className="font-mono text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300">
                    {selectedComp.data.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedComp(null)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Konten Utama */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col gap-8">
                <div>
                  <h3 id="comp-dialog-title" className="mb-3 font-display text-[clamp(1.375rem,2.52vw,1.605rem)] font-extrabold leading-tight text-slate-900 dark:text-white">
                    {selectedComp.data.title}
                  </h3>
                  <p className="font-body text-[16px] leading-relaxed text-left text-slate-600 dark:text-slate-300 lg:text-justify">
                    {selectedComp.data.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Capabilities */}
                  <DetailSection title={copy.panelHeaders.capabilities}>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 dark:text-slate-300 font-body">
                      {selectedComp.data.capabilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </DetailSection>

                  {/* Application Areas */}
                  <DetailSection title={copy.panelHeaders.applications}>
                    <div className="flex flex-wrap gap-2">
                      {selectedComp.data.applicationAreas.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                          {item}
                        </span>
                      ))}
                    </div>
                  </DetailSection>

                  {/* Evidence */}
                  <DetailSection title={copy.panelHeaders.evidence}>
                    <ul className="space-y-2">
                      {selectedComp.data.evidence.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                          <span className="text-blue-500 mt-0.5">▪</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </DetailSection>

                  {/* Related Projects (Hanya tampil bila array-nya ada) */}
                  {selectedComp.data.relatedProjects && selectedComp.data.relatedProjects.length > 0 && (
                    <DetailSection title={copy.panelHeaders.relatedProjects}>
                      <div className="space-y-3">
                        {selectedComp.data.relatedProjects.map((projectId, i) => {
                          const projectData = PROJECTS.find(p => p.id === projectId);
                          if (!projectData) return null;
                          return (
                            <div key={i} className="px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-sm font-medium text-slate-800 dark:text-slate-200">
                              {projectData.title}
                            </div>
                          );
                        })}
                        
                        <button
                          onClick={handleScrollToProjects}
                          className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-xs font-bold uppercase transition-transform hover:scale-[1.02] active:scale-95"
                        >
                          <span>{copy.panelHeaders.viewProjectCta}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </DetailSection>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Sub-komponen kecil untuk menjaga konsistensi header dalam panel
function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-3 uppercase">
        {title}
      </h4>
      {children}
    </div>
  );
}