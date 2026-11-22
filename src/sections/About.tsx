'use client';

import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { RevealSection } from '../components/common/RevealSection';
import type { Translation } from '../i18n/types';

interface AboutProps {
  copy: Translation['about'];
}

export function About({ copy }: AboutProps) {
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
      className="relative isolate overflow-hidden px-4 py-24 sm:px-6"
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

      <RevealSection className="relative z-10 mx-auto max-w-6xl">
        <div className="border-y border-border/80 py-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <div className="flex flex-col">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {copy.heading}
            </h2>

              <dl className="mt-8 grid grid-cols-3 border-y border-border/80 lg:mt-auto lg:grid-cols-1">
                {copy.metrics.map((metric, index) => (
                  <div
                    key={`${metric.label}-${index}`}
                    className="border-r border-border/80 py-4 pr-3 last:border-r-0 sm:pr-5 lg:border-b lg:border-r-0 lg:py-5 lg:last:border-b-0"
                  >
                    <dt className="font-mono text-[10px] uppercase leading-tight tracking-wider text-slate-500 dark:text-slate-400 sm:text-[11px]">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 font-display text-xl font-extrabold text-blue-600 dark:text-blue-400 sm:text-2xl">
                    {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-5 font-body text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base sm:leading-7">
              <p className="text-justify">{copy.p1}</p>
              <p className="text-justify">{copy.p2}</p>
              <p className="text-justify">{copy.p3}</p>
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
