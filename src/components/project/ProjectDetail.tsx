'use client';

import { ChevronLeft, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';
import { ProjectMediaGallery } from './ProjectMediaGallery';
import { STATUS_BADGE_STYLES, getStatusLabel } from './projectStatusStyles';
import type { Project } from '../../types/project';
import type { LangCode, Translation } from '../../i18n/types';

interface ProjectDetailProps {
  project: Project;
  lang: LangCode;
  copy: Translation['detail'];
  onBack: () => void;
}

export function ProjectDetail({ project, lang, copy, onBack }: ProjectDetailProps) {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-400">
      <button
        type="button"
        onClick={onBack}
        aria-label={copy.back}
        className="group flex items-center min-h-[44px] py-2 text-sm font-mono text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
        {copy.back}
      </button>

      <ProjectMediaGallery media={project.media} thumbType={project.thumbType} />

      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
        {project.title}
      </h1>

      <div className="mb-6 flex items-center gap-3">
        <span className={`text-xs font-mono px-3 py-1 rounded-full border shadow-sm ${STATUS_BADGE_STYLES[project.status]}`}>
          {getStatusLabel(project.status, copy.statusLabels)}
        </span>
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 border-l border-slate-300 dark:border-slate-700 pl-3">
          {project.period}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mb-10 items-center">
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`Repository GitHub untuk ${project.title}`}
          className="flex items-center min-h-[44px] px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-mono text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" /> REPOSITORY
        </a>
        {project.demo !== '#' && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            aria-label={`Live demo untuk ${project.title}`}
            className="flex items-center min-h-[44px] px-4 py-2.5 border border-slate-300 dark:border-slate-700 font-mono text-xs font-bold rounded-xl hover:border-blue-500 hover:text-blue-600 text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" /> LIVE DEMO / CASE STUDY
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-6 flex items-center text-slate-900 dark:text-white">
              <span className="w-6 h-1 bg-blue-600 dark:bg-blue-400 mr-3 block rounded-full" aria-hidden="true"></span>
              {copy.goalsHeading}
            </h2>

            <div className="space-y-6">
              {project.objectives.map((obj, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800">
                  <div className="absolute w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full -left-[7.5px] top-1.5 shadow-sm" aria-hidden="true"></div>
                  <h3 className="font-mono text-sm font-bold mb-1.5 text-slate-900 dark:text-white">
                    {`${copy.stage} ${idx + 1}: ${obj.phase[lang]}`}
                  </h3>
                  <p className="font-body text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {obj.detail[lang]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="font-display text-lg font-bold mb-3 text-slate-900 dark:text-white">
              {copy.techUsed}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-mono text-xs rounded-lg border border-blue-200 dark:border-blue-900/60 font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {project.tools.length > 0 && (
            <section className="border-t border-border/80 pt-5">
              <h2 className="font-display text-sm font-bold mb-3 flex items-center text-slate-900 dark:text-white">
                <Sparkles className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" aria-hidden="true" /> {copy.toolJustification}
              </h2>
              <div className="space-y-3">
                {project.tools.map((tool, idx) => (
                  <div key={idx} className="border-t border-slate-100 dark:border-slate-800/80 pt-3 first:border-none first:pt-0">
                    <strong className="font-mono text-xs text-slate-900 dark:text-white block mb-0.5">{tool.name}</strong>
                    <p className="font-body text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{tool.reason[lang]}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
