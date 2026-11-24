'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowDownRight, Download } from 'lucide-react';
import Image from 'next/image';
import { useRoleTypewriter } from '../hooks/useRoleTypewriter';
import { Reveal } from '../components/common/Reveal';
import { Container } from '../components/common/Container';
import { CV_DOWNLOAD_URL } from '../data/contact';
import type { LangCode, Translation } from '../i18n/types';

interface HeroProps {
  copy: Translation['hero'];
  lang: LangCode;
}

export function Hero({ copy, lang }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const [isHeroActive, setIsHeroActive] = useState(false);
  const { displayedText } = useRoleTypewriter(
    copy.rollingRoles,
    lang,
    !reduceMotion && isHeroActive,
  );
  const role = reduceMotion ? copy.rollingRoles[0] : displayedText || copy.rollingRoles[0];

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsHeroActive(true);
      observer.disconnect();
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center overflow-hidden pb-16 pt-24">
      <Container className="desktop-container relative z-10 max-w-[78rem]">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-mono text-sm font-semibold text-blue-700 dark:text-blue-400">
                {copy.greeting}
              </p>
              <h1 className="mt-2 text-balance font-display text-[clamp(2rem,6.27vw,4.0125rem)] font-extrabold leading-none tracking-tight text-slate-900 dark:text-white">
                Dicky Alfian Irvansyah
              </h1>
            </Reveal>
            <Reveal staggerIndex={1}>
              <p className="mt-4 max-w-xl text-balance font-display text-[clamp(1.05rem,2.1vw,1.35rem)] font-semibold leading-snug text-slate-800 dark:text-slate-100">
                {copy.headline}
              </p>
              <p className="mt-3 inline-block max-w-full break-words rounded-lg border border-border bg-card/80 px-3 py-1.5 font-mono text-[10px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xs">
                {copy.tagline}
              </p>

              <p className="mt-4 flex min-h-6 items-center gap-2 font-mono text-sm font-semibold text-blue-700 dark:text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" aria-hidden="true" />
                {role}
              </p>

              <blockquote className="mt-4 max-w-xl rounded-lg border border-border bg-card/70 px-4 py-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {copy.quote}
              </blockquote>
            </Reveal>

            <Reveal staggerIndex={2}>
              <dl className="mt-5 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
                {copy.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="min-w-0 rounded-lg border border-border bg-card/80 p-2.5 sm:p-3"
                  >
                    <dt className="mt-1 break-words font-mono text-[9px] leading-tight tracking-wide text-slate-500 dark:text-slate-400 sm:text-[10px]">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-extrabold leading-tight text-blue-600 dark:text-blue-400 sm:text-xl">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal staggerIndex={3}>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-xs font-bold text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {copy.ctaWorks}
                  <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={CV_DOWNLOAD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-card/80 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 transition-colors hover:border-accent"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {copy.ctaCv}
                </a>
              </div>
            </Reveal>

          </div>

          <Reveal staggerIndex={1} className="mx-auto w-full max-w-[26rem]">
            <div className="relative aspect-[4/5]">
              <div className="home-portrait-halo" aria-hidden="true" />
              <Image
                src="/home-portrait.png"
                alt="Dicky Alfian Irvansyah"
                fill
                loading="lazy"
                sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) 38vw, 416px"
                className="z-10 object-contain object-bottom"
              />
            </div>
            <p className="mx-auto mt-3 w-fit font-mono text-[12px] font-medium tracking-wide text-muted-foreground sm:text-xs">
              {copy.major}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}