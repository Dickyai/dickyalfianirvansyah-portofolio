'use client';

import { useMemo } from 'react';
import { RevealSection } from '../components/common/RevealSection';
import { Container } from '../components/common/Container';
import PictureRailGallery, {
  type PictureRailGalleryLabels,
  type PictureRailItem,
} from '../components/ui/picture-rail-gallery';
import { CERTIFICATIONS } from '../data/certifications';
import type { LangCode } from '../i18n/types';

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

  return (
    <RevealSection className="relative w-full py-16 sm:py-20 lg:py-24">
      <Container className="desktop-container max-w-[78rem]">
        <PictureRailGallery
          id="certifications"
          items={items}
          heading={heading}
          labels={GALLERY_LABELS[lang]}
          autoplay={false}
          className="w-full"
        />
      </Container>
    </RevealSection>
  );
}
