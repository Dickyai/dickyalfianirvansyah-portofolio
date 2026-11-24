'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { ProjectThumbIcon } from './ProjectThumbIcon';
import { trapTabFocus } from '../common/trapTabFocus';
import type { LangCode } from '../../i18n/types';
import type { ProjectImage, ProjectThumbType } from '../../types/project';

interface ProjectMediaGalleryProps {
  images: ProjectImage[];
  lang: LangCode;
  thumbType: ProjectThumbType;
}

export function ProjectMediaGallery({ images, lang, thumbType }: ProjectMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeImage = images[activeIndex];

  const moveActiveImage = useCallback((offset: number) => {
    setActiveIndex((index) => (index + offset + images.length) % images.length);
  }, [images.length]);

  const scrollToImage = (index: number) => {
    const track = carouselRef.current;
    const slide = track?.children.item(index);
    if (!track || !(slide instanceof HTMLElement)) return;
    const left =
      track.scrollLeft +
      slide.getBoundingClientRect().left -
      track.getBoundingClientRect().left;
    track.scrollTo({
      left,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const handleCarouselKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const nextIndex = Math.max(
      0,
      Math.min(images.length - 1, activeIndex + (event.key === 'ArrowRight' ? 1 : -1)),
    );
    scrollToImage(nextIndex);
    setActiveIndex(nextIndex);
    if (event.target === event.currentTarget) return;
    carouselRef.current?.children
      .item(nextIndex)
      ?.querySelector<HTMLButtonElement>('button')
      ?.focus({ preventScroll: true });
  };

  const handleCarouselScroll = () => {
    const track = carouselRef.current;
    if (track?.clientWidth) setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false);
        return;
      }
      if (event.key === 'ArrowLeft') moveActiveImage(-1);
      if (event.key === 'ArrowRight') moveActiveImage(1);
      if (lightboxRef.current) trapTabFocus(event, lightboxRef.current);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isLightboxOpen, moveActiveImage]);

  return (
    <div className="mb-10 w-full min-w-0">
      {images.length > 0 ? (
        <>
          <div className="hidden lg:block">
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setIsLightboxOpen(true);
              }}
              aria-label={lang === 'id' ? 'Perbesar gambar proyek' : 'Enlarge project image'}
              className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 dark:border-[#2E323A] dark:bg-[#1B1E22]"
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt[lang]}
                fill
                loading="lazy"
                sizes="(max-width: 1279px) calc(100vw - 6rem), 944px"
                className="object-cover"
              />
            </button>
            {images.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                {images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`${lang === 'id' ? 'Pilih gambar' : 'Select image'} ${index + 1}`}
                    aria-pressed={index === activeIndex}
                    className={`relative aspect-video min-h-[44px] w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      index === activeIndex
                        ? 'border-emerald-500 dark:border-[#78DA76]'
                        : 'border-transparent hover:border-stone-300 dark:hover:border-[#2E323A]'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt[lang]}
                      fill
                      loading="lazy"
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:hidden">
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              onKeyDown={handleCarouselKeyDown}
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label={lang === 'id' ? 'Tangkapan layar proyek' : 'Project screenshots'}
              className="flex w-full min-w-0 snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth rounded-xl motion-reduce:scroll-auto"
            >
              {images.map((image, index) => (
                <div
                  key={image.src}
                  className="relative aspect-video w-full shrink-0 snap-center overflow-hidden rounded-xl border border-stone-200 bg-stone-100 dark:border-[#2E323A] dark:bg-[#1B1E22]"
                >
                  <button
                    type="button"
                    aria-label={`${lang === 'id' ? 'Perbesar tangkapan layar' : 'Enlarge screenshot'} ${index + 1}`}
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget;
                      setActiveIndex(index);
                      setIsLightboxOpen(true);
                    }}
                    className="absolute inset-0 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt[lang]}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1023px) calc(100vw - 2.5rem), 944px"
                      className="object-cover"
                    />
                  </button>
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="mr-1 font-mono text-xs text-muted-foreground" aria-live="polite">
                  {activeIndex + 1} / {images.length}
                </span>
                {images.map((image, index) => (
                  <button
                    key={`${image.src}-indicator`}
                    type="button"
                    aria-label={`${lang === 'id' ? 'Ke gambar' : 'Go to image'} ${index + 1}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                    onClick={() => scrollToImage(index)}
                    className="flex h-11 w-11 items-center justify-center"
                  >
                    <span
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === activeIndex ? 'bg-accent' : 'bg-muted-foreground/35'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="mt-3 text-center font-mono text-xs leading-relaxed text-muted-foreground">
            {activeImage.caption[lang]}
          </p>
        </>
      ) : (
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-stone-100 dark:border-[#2E323A] dark:bg-[#1B1E22]">
          <ProjectThumbIcon type={thumbType} className="h-24 w-24 text-stone-300 dark:text-[#2E323A]" />
        </div>
      )}

      {isLightboxOpen && activeImage && (
        <div
          ref={lightboxRef}
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'id' ? 'Pratinjau gambar' : 'Image preview'}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-6 top-6 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={lang === 'id' ? 'Tutup pratinjau' : 'Close preview'}
          >
            <X className="h-7 w-7" aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  moveActiveImage(-1);
                }}
                className="absolute left-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:left-8"
                aria-label={lang === 'id' ? 'Gambar sebelumnya' : 'Previous image'}
              >
                <ChevronLeft className="h-8 w-8" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  moveActiveImage(1);
                }}
                className="absolute right-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:right-8"
                aria-label={lang === 'id' ? 'Gambar berikutnya' : 'Next image'}
              >
                <ChevronRight className="h-8 w-8" aria-hidden="true" />
              </button>
            </>
          )}

          <div className="relative h-[calc(100dvh-3rem)] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={activeImage.src}
              alt={activeImage.alt[lang]}
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
