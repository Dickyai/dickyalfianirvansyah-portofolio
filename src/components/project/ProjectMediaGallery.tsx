'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { ProjectThumbIcon } from './ProjectThumbIcon';
import type { ProjectMedia, ProjectThumbType } from '../../types/project';

interface ProjectMediaGalleryProps {
  media?: ProjectMedia[];
  thumbType: ProjectThumbType;
}

/**
 * Preview utama + strip thumbnail di bawahnya (kalau media > 1), plus
 * lightbox: klik gambar aktif untuk membuka versi zoom layar penuh
 * (navigasi panah kiri/kanan & tombol X, juga bisa Esc/Arrow keyboard).
 *
 * CATATAN: status badge ("STATUS: ...") TIDAK lagi dirender di sini.
 * Dulu ditumpuk di atas gambar/video (pojok kiri bawah), sekarang dipindah
 * ke ProjectDetail.tsx supaya tidak menutupi media apa pun. Komponen ini
 * jadi murni soal menampilkan media, tidak lagi soal status proyek.
 */
export function ProjectMediaGallery({ media, thumbType }: ProjectMediaGalleryProps) {
  const items = media ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hasMedia = items.length > 0;
  const active = hasMedia ? items[Math.min(activeIndex, items.length - 1)] : null;

  // Indeks item bertipe gambar saja, dipakai untuk navigasi di dalam lightbox
  // (lightbox cuma pernah dibuka untuk gambar, jadi navigasinya juga cuma
  // meloncat antar sesama gambar, melewati video).
  const imageIndices = items.reduce<number[]>((acc, item, idx) => {
    if (item.type === 'image') acc.push(idx);
    return acc;
  }, []);

  const goToImageOffset = (offset: number) => {
    if (imageIndices.length === 0) return;
    const currentPos = imageIndices.indexOf(activeIndex);
    const nextPos = (currentPos + offset + imageIndices.length) % imageIndices.length;
    setActiveIndex(imageIndices[nextPos]);
  };

  // Kunci scroll body selama lightbox terbuka
  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // Kontrol keyboard: Esc menutup, panah kiri/kanan navigasi
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') goToImageOffset(-1);
      if (e.key === 'ArrowRight') goToImageOffset(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLightboxOpen, activeIndex]);

  return (
    <div className="mb-10">
      <div
        role={active?.type === 'image' ? 'button' : undefined}
        tabIndex={active?.type === 'image' ? 0 : undefined}
        onKeyDown={(e) => {
          if (active?.type === 'image' && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
        onClick={() => {
          if (active?.type === 'image') setIsLightboxOpen(true);
        }}
        aria-label={active?.type === 'image' ? 'Perbesar gambar preview' : undefined}
        className={`aspect-video w-full bg-stone-100 dark:bg-[#1B1E22] rounded-xl border border-stone-200 dark:border-[#2E323A] flex items-center justify-center relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
          active?.type === 'image' ? 'cursor-zoom-in' : ''
        }`}
      >
        {!hasMedia && (
          <>
            <div className="absolute inset-0 blueprint-grid opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-100/90 dark:from-[#1B1E22]/90 to-transparent z-0"></div>
            <ProjectThumbIcon
              type={thumbType}
              className="w-24 h-24 text-stone-300 dark:text-[#2E323A] group-hover:scale-110 transition-transform duration-700 relative z-10"
            />
          </>
        )}

        {active?.type === 'image' && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={active.src} alt={active.alt ?? ''} className="absolute inset-0 w-full h-full object-cover" />
        )}

        {active?.type === 'video' && (
          <video
            key={active.src}
            src={active.src}
            controls
            className="absolute inset-0 w-full h-full object-cover bg-black"
          />
        )}
      </div>

      {hasMedia && items.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
          {items.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Pilih media ${idx + 1}`}
              aria-pressed={idx === activeIndex}
              className={`relative shrink-0 w-24 aspect-video rounded-lg overflow-hidden border-2 transition-colors min-h-[44px] ${
                idx === activeIndex
                  ? 'border-emerald-500 dark:border-[#78DA76]'
                  : 'border-transparent hover:border-stone-300 dark:hover:border-[#2E323A]'
              }`}
            >
              {item.type === 'video' ? (
                <div className="w-full h-full bg-stone-900 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.src} alt={item.alt ?? ''} className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && active?.type === 'image' && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Media preview"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Tutup preview"
          >
            <X className="w-7 h-7" aria-hidden="true" />
          </button>

          {imageIndices.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToImageOffset(-1);
                }}
                className="absolute left-4 md:left-8 text-white/80 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft className="w-8 h-8" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToImageOffset(1);
                }}
                className="absolute right-4 md:right-8 text-white/80 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Gambar berikutnya"
              >
                <ChevronRight className="w-8 h-8" aria-hidden="true" />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.src}
            alt={active.alt ?? ''}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full object-contain rounded-lg select-none"
          />
        </div>
      )}
    </div>
  );
}
