'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Reveal } from '../components/common/Reveal';
import { Container } from '../components/common/Container';
import { CertificateGrid } from './CertificateGrid';
import type {
  PictureRailGalleryLabels,
  PictureRailItem,
} from '../components/ui/picture-rail-gallery';
import { CERTIFICATIONS } from '../data/certifications';
import type { LangCode } from '../i18n/types';

const PictureRailGallery = dynamic(
  () => import('../components/ui/picture-rail-gallery'),
  { ssr: false },
);

const GALLERY_LABELS: Record<LangCode, PictureRailGalleryLabels> = {
  en: {
    front: 'Front',
    back: 'Back',
    close: 'Close',
    open: '',
    viewCertificate: 'View certificate',
  },
  id: {
    front: 'Depan',
    back: 'Belakang',
    close: 'Tutup',
    open: '',
    viewCertificate: 'Lihat sertifikat',
  },
};

interface CertificationsProps {
  heading: string;
  isDarkMode: boolean;
  lang: LangCode;
}

export function Certifications({ heading, isDarkMode, lang }: CertificationsProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const items = useMemo<PictureRailItem[]>(
    () =>
      CERTIFICATIONS.map((cert) => ({
        id: cert.name,
        title: cert.name,
        artist: cert.issuer,
        year: cert.date,
        image: cert.thumbnail ?? '/cover.png',
        aspect: cert.aspect ?? 0.8,
        frame: isDarkMode ? 'black' : 'white',
        mat: false,
        drop: 0,
        link: cert.link,
      })),
    [isDarkMode],
  );

  useEffect(() => {
    const media = window.matchMedia('(min-width: 64rem)');
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <Reveal className="relative w-full py-16 sm:py-20 lg:py-24">
      <Container className="desktop-container max-w-[78rem]">
        <div id="certifications">
          <div className="hidden lg:block">
            {isDesktop && (
              <PictureRailGallery
                id="certifications-desktop"
                items={items}
                heading={heading}
                labels={GALLERY_LABELS[lang]}
                autoplay={false}
                className="w-full"
              />
            )}
          </div>
          <CertificateGrid lang={lang} />
        </div>
      </Container>
    </Reveal>
  );
}
