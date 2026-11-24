'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ProjectThumbIcon } from './ProjectThumbIcon';
import type { LangCode } from '../../i18n/types';
import type { ProjectImage, ProjectThumbType } from '../../types/project';

interface ProjectCardThumbnailProps {
  images: ProjectImage[];
  lang: LangCode;
  thumbType: ProjectThumbType;
}

const ROTATE_INTERVAL_MS = 3500;

/**
 * Thumbnail untuk card di grid Projects.tsx.
 *
 * Project screenshots rotate on desktop; mobile loads only the first image.
 */
export function ProjectCardThumbnail({ images, lang, thumbType }: ProjectCardThumbnailProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const updateDesktop = () => setIsDesktop(desktop.matches);
    updateDesktop();
    desktop.addEventListener('change', updateDesktop);
    return () => desktop.removeEventListener('change', updateDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || reduceMotion || images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [images.length, isDesktop, reduceMotion]);

  if (images.length === 0) {
    return (
      <>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-500 to-transparent"></div>
        <ProjectThumbIcon
          type={thumbType}
          className="w-14 h-14 text-stone-300 dark:text-[#8A9099] group-hover:scale-125 group-hover:text-emerald-500 dark:group-hover:text-[#78DA76] transition-transform duration-premium ease-premium relative z-10 motion-reduce:transform-none"
        />
      </>
    );
  }

  return (
    <>
      {(isDesktop ? images : images.slice(0, 1)).map((item, idx) => (
        <div
          key={idx}
          aria-hidden={idx !== (isDesktop ? activeIndex : 0)}
          className={`absolute inset-0 transition-opacity duration-premium ease-premium ${
            idx === (isDesktop ? activeIndex : 0) ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={item.src}
            alt={idx === (isDesktop ? activeIndex : 0) ? item.alt[lang] : ''}
            fill
            loading="lazy"
            sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) calc((100vw - 4.5rem) / 2), 33vw"
            className="object-cover"
          />
        </div>
      ))}
    </>
  );
}
