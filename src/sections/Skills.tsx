'use client';

import { ENGINEERING_TOOLKIT } from '@/data/toolkit';
import { ToolIcon } from '@/components/common/ToolIcon';
import { RevealSection } from '@/components/common/RevealSection';

export function Skills() {
  // Gandakan array untuk memastikan infinite scroll tidak pernah memiliki ruang kosong
  const duplicatedTools = [...ENGINEERING_TOOLKIT, ...ENGINEERING_TOOLKIT];

  return (
    <RevealSection className="w-full">
      <div className="relative w-full overflow-hidden border-y border-border/60 bg-transparent py-12 pointer-events-none">

        {/* Masking gradien di kiri dan kanan agar ikon muncul/hilang secara halus (fade effect) */}
        <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background/80 via-background/20 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background/80 via-background/20 to-transparent"></div>

        {/* Rel animasi - Flex dan w-max memastikan lebar dihitung dari konten */}
        <div className="flex w-max animate-tool-rail">
          {duplicatedTools.map((tool, index) => (
            <div
              key={`${tool.id}-${index}`}
              className={`flex items-center justify-center px-8 sm:px-12 ${
                index >= ENGINEERING_TOOLKIT.length ? 'rail-duplicate' : ''
              }`}
            >
              {/* tool-icon-reveal: default pudar & grayscale, warna asli brand muncul saat hover (lihat globals.css) */}
              <div
                className="tool-icon-reveal pointer-events-auto cursor-help"
                title={tool.name}
              >
                <ToolIcon
                  type={tool.iconType}
                  name={tool.iconName}
                  className="w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}