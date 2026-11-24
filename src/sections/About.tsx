'use client';

import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { RevealSection } from '../components/common/RevealSection';
import { Container } from '../components/common/Container';
import { STUDY_STATUS } from '../data/profile';
import type { LangCode, Translation } from '../i18n/types';

interface AboutProps {
  copy: Translation['about'];
  lang: LangCode;
}

export function About({ copy, lang }: AboutProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [spotlightActive, setSpotlightActive] = useState(false);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    spotlightRef.current?.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
    spotlightRef.current?.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') setSpotlightActive(true);
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setSpotlightActive(false)}
    >
      <div
        ref={spotlightRef}
        className={`about-cursor-spotlight pointer-events-none absolute inset-0 z-0${spotlightActive ? ' is-active' : ''}`}
        aria-hidden="true"
      />

      <RevealSection className="relative z-10 w-full">
        <Container className="desktop-container max-w-[78rem]">
        <div className="border-y border-border/80 py-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <div className="flex flex-col">
            <h2 className="font-display text-[clamp(1.605rem,3.77vw,2.4075rem)] font-extrabold leading-[1.111] tracking-tight text-slate-900 dark:text-white">
              {copy.heading}
            </h2>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {copy.studyStatusLabel}
              <span className="mt-1 block font-body text-sm font-semibold normal-case tracking-normal text-slate-700 dark:text-slate-200">
                {STUDY_STATUS[lang]}
              </span>
            </p>
            </div>

            <ul className="space-y-5 font-body text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base sm:leading-7">
              {copy.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" aria-hidden="true" />
                  <span className="text-left lg:text-justify">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </Container>
      </RevealSection>
    </section>
  );
}
