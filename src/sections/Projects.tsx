'use client';

import { useState } from 'react';
import { Search, ArrowUpRight, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealSection } from '../components/common/RevealSection';
import { Container } from '../components/common/Container';
import { ProjectCardThumbnail } from '../components/project/ProjectCardThumbnail';
import { STATUS_BADGE_STYLES, getStatusLabel } from '../components/project/projectStatusStyles';
import { PROJECTS } from '../data/projects';
import type { ProjectCategory } from '../types/project';
import type { LangCode, Translation } from '../i18n/types';

interface ProjectsProps {
  heading: string;
  searchCopy: Translation['projectsSection'];
  statusLabels: Translation['detail']['statusLabels'];
  lang: LangCode;
}

type FilterType = 'all' | ProjectCategory;

export function Projects({ heading, searchCopy, statusLabels, lang }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filterTabs: { id: FilterType; label: string }[] = [
    { id: 'all', label: searchCopy.filters.all },
    { id: 'optimization', label: searchCopy.filters.optimization },
    { id: 'automation', label: searchCopy.filters.automation },
    { id: 'analytics', label: searchCopy.filters.analytics },
    { id: 'quality', label: searchCopy.filters.quality },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesFilter = activeFilter === 'all' || p.category === activeFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.summary[lang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <RevealSection className="relative z-10 w-full">
        <Container className="desktop-container max-w-[78rem]">
        {/* Section Header & Search Row */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <h2 className="font-display text-[clamp(1.605rem,3.77vw,2.4075rem)] font-extrabold leading-[1.111] tracking-tight text-slate-900 dark:text-white">
              {heading}{' '}
              <span className="font-mono text-[clamp(1.605rem,3.14vw,2.00625rem)] font-bold leading-[1.2] text-blue-600 dark:text-blue-400">
                ({PROJECTS.length})
              </span>
            </h2>
            {/* Interactive Search Bar */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
              </div>
              <input
                id="project-search"
                type="text"
                aria-label={searchCopy.searchPlaceholder}
                placeholder={searchCopy.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-full py-2.5 pl-10 pr-10 text-xs sm:text-sm font-body focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-slate-900 dark:text-white transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-1 pr-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-3 border-b border-border">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                aria-pressed={isActive}
                className={`relative px-4 py-2 min-h-[44px] rounded-full font-mono text-xs font-semibold tracking-wider transition-colors duration-200 flex items-center justify-center ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="projectFilterPill"
                    className="absolute inset-0 rounded-full bg-blue-600 shadow-md shadow-blue-600/20"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`${lang === 'id' ? 'Lihat detail proyek' : 'View project details'}: ${project.title}`}
                    className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <div className="relative aspect-[1.42] overflow-hidden border-y border-border/70 bg-card/20">
                      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                          <ProjectCardThumbnail images={project.images} lang={lang} thumbType={project.thumbType} />
                      </div>
                      <span
                        className={`absolute left-3 top-3 z-10 font-mono text-[10px] font-bold ${STATUS_BADGE_STYLES[project.status]}`}
                      >
                        {getStatusLabel(project.status, statusLabels)}
                      </span>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-[clamp(1rem,1.88vw,1.20375rem)] font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" />
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {searchCopy.filters[project.category]} · {project.period}
                      </p>
                      <p className="mt-3 line-clamp-3 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {project.summary[lang]}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-border/70 pt-3">
                        {project.stack.map((tag, i) => (
                          <span key={i} className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full border-y border-border/70 py-16 text-center font-mono text-sm text-slate-500 dark:text-slate-400"
              >
                {searchCopy.noResultsPrefix} &quot;{searchQuery || filterTabs.find((tab) => tab.id === activeFilter)?.label}&quot;
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        </Container>
      </RevealSection>
    </section>
  );
}
