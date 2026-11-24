'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';
import { ProjectMediaGallery } from './ProjectMediaGallery';
import { Container } from '../common/Container';
import { STATUS_BADGE_STYLES, getStatusLabel } from './projectStatusStyles';
import { TRANSLATIONS } from '../../i18n/translations';
import type { Project } from '../../types/project';
import type { LangCode } from '../../i18n/types';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [lang, setLang] = useState<LangCode>('en');

  useEffect(() => {
    const savedLang = window.localStorage.getItem('portfolio-language');
    if (savedLang === 'id' || savedLang === 'en') setLang(savedLang);
  }, []);

  const handleLangChange = (nextLang: LangCode) => {
    setLang(nextLang);
    window.localStorage.setItem('portfolio-language', nextLang);
  };

  const copy = TRANSLATIONS[lang].detail;

  return (
    <Container className="w-full min-w-0 max-w-[59rem] pb-24 pt-28 sm:pt-32">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/#projects"
          className="group inline-flex min-h-[44px] items-center py-2 font-mono text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          {copy.back}
        </Link>
        <div className="flex items-center gap-1 rounded-full border border-border p-1" aria-label="Language">
          {(['id', 'en'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleLangChange(option)}
              aria-pressed={lang === option}
              className={`min-h-[40px] min-w-[44px] rounded-full px-3 font-mono text-xs font-bold transition-colors ${
                lang === option ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <ProjectMediaGallery images={project.images} lang={lang} thumbType={project.thumbType} />

      <h1 className="mb-3 text-balance font-display text-[clamp(1.875rem,5.02vw,3.21rem)] font-extrabold leading-tight text-slate-900 dark:text-white">
        {project.title}
      </h1>
      <p className="mb-5 max-w-prose text-pretty font-body text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
        {project.summary[lang]}
      </p>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className={`rounded-full border px-3 py-1 font-mono text-xs shadow-sm ${STATUS_BADGE_STYLES[project.status]}`}>
          {getStatusLabel(project.status, copy.statusLabels)}
        </span>
        <span className="border-l border-slate-300 pl-3 font-mono text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {project.period}
        </span>
      </div>

      <div className="grid gap-8 border-t border-border/80 pt-8 md:grid-cols-2">
        <section>
          <h2 className="mb-3 font-display text-xl font-bold text-slate-900 dark:text-white">
            {copy.problem}
          </h2>
          <p className="max-w-prose text-pretty font-body text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            {project.problem[lang]}
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl font-bold text-slate-900 dark:text-white">
            {copy.approach}
          </h2>
          <p className="max-w-prose text-pretty font-body text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            {project.approach[lang]}
          </p>
        </section>
      </div>

      <section className="mt-10 border-t border-border/80 pt-8">
        <h2 className="mb-5 font-display text-xl font-bold text-slate-900 dark:text-white">
          {copy.results}
        </h2>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.metrics.map((metric, index) => (
            <div key={`${metric.label.en}-${index}`} className="rounded-xl border border-border bg-card/70 p-4">
              <dt className="font-mono text-xs leading-relaxed text-muted-foreground">
                {metric.label[lang]}
              </dt>
              <dd className="mt-2 font-display text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                {metric.value}
              </dd>
              {metric.detail && (
                <p className="mt-2 text-pretty font-body text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {metric.detail[lang]}
                </p>
              )}
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-10 grid gap-8 border-t border-border/80 pt-8 sm:grid-cols-2">
        <section>
          <h2 className="mb-4 font-display text-lg font-bold text-slate-900 dark:text-white">
            {copy.stack}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 font-mono text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-400"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {(project.links.live || project.links.github) && (
          <section>
            <h2 className="mb-4 font-display text-lg font-bold text-slate-900 dark:text-white">
              {copy.links}
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-xl bg-slate-900 px-4 py-2.5 font-mono text-xs font-bold text-white shadow-sm transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  <GithubIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  {copy.github}
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-xl border border-border px-4 py-2.5 font-mono text-xs font-bold text-slate-700 shadow-sm transition-colors hover:border-blue-500 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                >
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  {copy.live}
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </Container>
  );
}
