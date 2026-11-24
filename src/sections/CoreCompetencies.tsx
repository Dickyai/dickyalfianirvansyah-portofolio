'use client';

import { useState, useEffect } from 'react';
import { Target, Boxes, BarChart3, Activity, Cpu, BookOpen, X } from 'lucide-react';
import Link from 'next/link';
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
              <motion.article
                key={idx}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.18 }}
                className="group min-h-[150px] border-b border-border/80 py-6"
              >
                <button
                  type="button"
                  onClick={() => setSelectedComp({ index: idx, data: item })}
                  className="flex w-full items-start gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
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
                  </span>
                </button>

                {item.relatedProjects && item.relatedProjects.length > 0 && (
                  <div className="ml-[3.25rem] mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {item.relatedProjects.map((slug) => {
                      const project = PROJECTS.find((entry) => entry.slug === slug);
                      if (!project) return null;
                      return (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          className="inline-flex min-h-[44px] items-center gap-1 font-mono text-xs font-semibold text-blue-600 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {project.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </motion.article>
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
                        {selectedComp.data.relatedProjects.map((slug) => {
                          const projectData = PROJECTS.find((project) => project.slug === slug);
                          if (!projectData) return null;
                          return (
                            <Link
                              key={projectData.slug}
                              href={`/projects/${projectData.slug}`}
                              className="block rounded-lg border border-blue-100 bg-blue-50 px-3 py-3 text-sm font-medium text-slate-800 hover:border-blue-300 dark:border-blue-900/30 dark:bg-blue-900/10 dark:text-slate-200"
                            >
                              {projectData.title}
                            </Link>
                          );
                        })}
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