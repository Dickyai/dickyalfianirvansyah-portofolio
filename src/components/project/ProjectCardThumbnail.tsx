'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProjectThumbIcon } from './ProjectThumbIcon';
import type { ProjectMedia, ProjectThumbType } from '../../types/project';

interface ProjectCardThumbnailProps {
  media?: ProjectMedia[];
  thumbType: ProjectThumbType;
}

const ROTATE_INTERVAL_MS = 3500;

/**
 * Thumbnail untuk card di grid Projects.tsx.
 *
 * Hanya item bertipe 'image' yang dipakai & diputar bergantian di sini —
 * video SENGAJA disaring keluar (tidak ikut siklus, tidak ditampilkan sama
 * sekali di card grid). Video tetap tampil normal di halaman detail proyek
 * (ProjectMediaGallery), cuma tidak relevan untuk thumbnail kecil ini.
 *
 *   - 0 gambar  -> fallback ke ProjectThumbIcon (termasuk kalau project
 *                  cuma punya video, tanpa gambar sama sekali)
 *   - 1 gambar  -> statis
 *   - 2+ gambar -> bergantian otomatis tiap 3.5 detik, fade halus
 */
export function ProjectCardThumbnail({ media, thumbType }: ProjectCardThumbnailProps) {
  const images = (media ?? []).filter((item) => item.type === 'image');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const updateDesktop = () => setIsDesktop(desktop.matches);
    updateDesktop();
    desktop.addEventListener('change', updateDesktop);
    return () => desktop.removeEventListener('change', updateDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [images.length, isDesktop]);

  if (images.length === 0) {
    return (
      <>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-500 to-transparent"></div>
        <ProjectThumbIcon
          type={thumbType}
          className="w-14 h-14 text-stone-300 dark:text-[#8A9099] group-hover:scale-125 group-hover:text-emerald-500 dark:group-hover:text-[#78DA76] transition-all duration-500 relative z-10"
        />
      </>
    );
  }

  return (
    <>
      {(isDesktop ? images : images.slice(0, 1)).map((item, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === (isDesktop ? activeIndex : 0) ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={item.src}
            alt={item.alt ?? ''}
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
