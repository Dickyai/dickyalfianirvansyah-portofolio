'use client';

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

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [images.length]);

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
      {images.map((item, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.alt ?? ''} className="w-full h-full object-cover" />
        </div>
      ))}
    </>
  );
}
