'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CERTIFICATIONS } from '../data/certifications';
import type { LangCode } from '../i18n/types';
import { trapTabFocus } from '../components/common/trapTabFocus';

interface CertificateGridProps {
  lang: LangCode;
}

export function CertificateGrid({ lang }: CertificateGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = selectedIndex === null ? null : CERTIFICATIONS[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
        return;
      }

      if (dialogRef.current) trapTabFocus(event, dialogRef.current);
    };
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [selectedIndex]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
        {CERTIFICATIONS.map((cert, index) => (
          <div key={cert.name} className="min-w-0">
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setSelectedIndex(index);
              }}
              aria-label={lang === 'id' ? `Perbesar sertifikat ${cert.name}` : `Enlarge ${cert.name} certificate`}
              className="relative block aspect-[2481/3508] w-full overflow-hidden rounded-lg border border-border bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Image
                src={cert.thumbnail ?? '/cover.png'}
                alt={lang === 'id'
                  ? `Sertifikat ${cert.name} yang diterbitkan oleh ${cert.issuer}, ${cert.date}`
                  : `${cert.name} certificate issued by ${cert.issuer}, ${cert.date}`}
                fill
                loading="lazy"
                sizes="(max-width: 639px) calc((100vw - 2.75rem) / 2), (max-width: 1023px) calc((100vw - 5.5rem) / 2), 28rem"
                className="object-cover"
              />
            </button>
            <p className="mt-2 text-sm font-medium leading-snug">{cert.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{cert.issuer} · {cert.date}</p>
          </div>
        ))}
      </div>

      {selected && createPortal(
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-lightbox-title"
          onClick={() => setSelectedIndex(null)}
        >
          <h2 id="certificate-lightbox-title" className="sr-only">
            {selected.name}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setSelectedIndex(null)}
            aria-label={lang === 'id' ? 'Tutup sertifikat' : 'Close certificate'}
            className="absolute right-4 top-4 z-10 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <div
            className="relative aspect-[2481/3508] w-[min(88vw,58dvh)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selected.thumbnail ?? '/cover.png'}
              alt={lang === 'id'
                ? `Sertifikat ${selected.name} yang diterbitkan oleh ${selected.issuer}, ${selected.date}`
                : `${selected.name} certificate issued by ${selected.issuer}, ${selected.date}`}
              fill
              loading="lazy"
              sizes="100vw"
              quality={90}
              className="object-contain"
            />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
