'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import Image from 'next/image';
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
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const scrollToMedia = (index: number) => {
    const slide = carouselRef.current?.children.item(index);
    if (!slide) return;
    carouselRef.current?.scrollTo({
      left: slide.getBoundingClientRect().width * index,
      behavior: 'smooth',
    });
  };

  const handleCarouselScroll = () => {
    const track = carouselRef.current;
    if (!track) return;
    const slideWidth = track.clientWidth;
    if (slideWidth > 0) setActiveIndex(Math.round(track.scrollLeft / slideWidth));
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
      <div className="hidden lg:block">
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
          <Image
            src={active.src}
            alt={active.alt ?? ''}
            fill
            loading="lazy"
            sizes="(max-width: 1279px) calc(100vw - 6rem), 944px"
            className="object-cover"
          />
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
                <Image
                  src={item.src}
                  alt={item.alt ?? ''}
                  fill
                  loading="lazy"
                  sizes="96px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
      </div>

      {hasMedia && (
        <div className="lg:hidden">
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            role="region"
            aria-roledescription="carousel"
            aria-label="Project screenshots"
            className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth rounded-xl motion-reduce:scroll-auto"
          >
            {items.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                className="relative aspect-video w-full shrink-0 snap-center overflow-hidden rounded-xl border border-stone-200 bg-stone-100 dark:border-[#2E323A] dark:bg-[#1B1E22]"
              >
                {item.type === 'image' ? (
                  <button
                    type="button"
                    aria-label={`Enlarge screenshot ${index + 1}`}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsLightboxOpen(true);
                    }}
                    className="absolute inset-0 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt ?? ''}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1023px) calc(100vw - 2.5rem), 944px"
                      className="object-cover"
                    />
                  </button>
                ) : (
                  <video
                    src={item.src}
                    controls
                    preload="none"
                    className="absolute inset-0 h-full w-full bg-black object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          {items.length > 1 && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="mr-1 font-mono text-xs text-muted-foreground" aria-live="polite">
                {activeIndex + 1} / {items.length}
              </span>
              {items.map((item, index) => (
                <button
                  key={`${item.src}-indicator-${index}`}
                  type="button"
                  aria-label={`Go to screenshot ${index + 1}`}
                  aria-current={index === activeIndex}
                  onClick={() => scrollToMedia(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-accent' : 'bg-muted-foreground/35'
                  }`}
                />
              ))}
            </div>
          )}
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

          <div
            className="relative h-[calc(100dvh-3rem)] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt ?? ''}
              fill
              loading="lazy"
              sizes="100vw"
              className="select-none rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
