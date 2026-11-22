// src/components/sections/ToolIcon.tsx

import type { ComponentType, ReactNode } from 'react';
import {
  Network,
  Boxes,
  Package,
  Timer,
  Printer,
  Workflow,
  FileSpreadsheet,
  Database,
  Cpu,
} from 'lucide-react';

interface ToolIconProps {
  type: 'logo' | 'glyph' | 'placeholder';
  name: string;
  className?: string;
}

// Map khusus untuk method/glyph konseptual yang menggunakan Lucide Icons
// (dipakai section lain di luar toolkit rail, tetap dipertahankan agar tidak breaking).
const GLYPH_MAP: Record<string, ComponentType<{ className?: string }>> = {
  route: Workflow,
  dna: Network,
  boxes: Boxes,
  package: Package,
  timer: Timer,
  'printer-3d': Printer,
  database: Database,
  spreadsheet: FileSpreadsheet,
};

/**
 * Logo software ASLI (bukan interpretasi/dibentuk menyerupai), diambil dari:
 * - Simple Icons (https://simpleicons.org) - lisensi CC0
 * - Devicon (https://devicon.dev) - lisensi MIT
 * Setiap path memakai warna hex RESMI brand masing-masing (bukan currentColor),
 * supaya efek hover "reveal warna asli" di Skills.tsx (CSS grayscale filter) bekerja.
 */
const LOGO_MAP: Record<string, { viewBox: string; render: () => ReactNode }> = {
  python: {
    viewBox: '0 0 24 24',
    render: () => (
      <path
        fill="#3776AB"
        d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"
      />
    ),
  },
  github: {
    viewBox: '0 0 24 24',
    render: () => (
      <path
        className="fill-[#181717] dark:fill-white"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    ),
  },
  tinkercad: {
    viewBox: '0 0 24 24',
    render: () => (
      <path
        fill="#1477D1"
        d="M0 0v7.32h7.32V0H0zm8.34 0v7.32h7.32V0H8.34zm8.34 0v7.32H24V0h-7.32zM1.605 1.266h4.106V2.33h-1.4v3.725H3.055V2.33h-1.45V1.265zm9.77 0h1.256V6.05h-1.256V1.266zm6.814 0h1.692l1.455 3.289v-3.29h1.158v4.79H20.82l-1.47-3.26V6.05h-1.16V1.266zM0 8.34v7.32h7.32V8.34H0zm8.34 0v7.32h7.32V8.34H8.34zm8.34 0v7.32H24V8.34h-7.32zm-6.32 1.265h3.19v.965h-1.935v.92H13.5v.92h-1.885v1.065h2.03v.916h-3.286V9.605zm8.16 0h1.906c1.075 0 1.719.495 1.719 1.315 0 .535-.284.935-.8 1.135.22.14.35.37.485.705l.645 1.625h-1.35l-.006.006-.433-1.221c-.2-.535-.287-.664-.702-.664h-.254v1.885h-1.21V9.605zM1.596 9.61h1.26v1.756L4.3 9.61h1.51l-2.022 2.25 2.182 2.536H4.39l-1.541-1.94v1.94H1.596V9.609zm18.134.916v1.065h.334c.375 0 .827-.095.827-.57 0-.36-.226-.495-.801-.495h-.36zM0 16.68V24h7.32v-7.32H0zm8.34 0V24h7.32v-7.32H8.34zm8.34 0V24H24v-7.32h-7.32zm-12.42 1.2c.375 0 .815.066 1.17.17l.09.024-.055 1.022-.16-.067a2.415 2.415 0 0 0-.89-.174c-.876 0-1.466.555-1.466 1.485s.54 1.484 1.446 1.484c.35 0 .66-.06.925-.18l-.006-.003.16-.07.055.993-.08.032c-.33.13-.753.199-1.193.199-.765 0-1.411-.22-1.871-.635-.475-.43-.73-1.06-.73-1.82 0-1.425 1.095-2.46 2.605-2.46zm6.996.07h1.484l1.824 4.784H13.26l-.4-1.16H11.1l-.41 1.16H9.435l1.82-4.785zm6.965 0h1.718c1.625 0 2.522.825 2.522 2.325v.004c0 1.535-.992 2.455-2.647 2.455h-1.593V17.95zm1.26.915v2.95h.195c.975 0 1.488-.55 1.488-1.54 0-.895-.49-1.41-1.375-1.41h-.309zm-7.5.19-.596 1.6h1.17l-.575-1.6z"
      />
    ),
  },
  bambulab: {
    viewBox: '0 0 24 24',
    render: () => (
      <path
        fill="#00AE42"
        d="M12.662 24V8.959l8.535 3.369V24zm-9.859-.003v-7.521l8.534-3.371-.001 10.892zM2.803 0h8.533l.001 11.672-8.534 3.369zm9.859 0h8.535v10.892l-8.535-3.371z"
      />
    ),
  },
  googlesheets: {
    viewBox: '0 0 24 24',
    render: () => (
      <path
        fill="#34A853"
        d="M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z"
      />
    ),
  },
  googleappsscript: {
    viewBox: '0 0 24 24',
    render: () => (
      <path
        fill="#4285F4"
        d="M12.363 2.54a3.136 3.136 0 0 0-.376.022 2.864 2.864 0 0 0-1.589.828c-.562.58-.82 1.115-.773 1.943-.01.264.193 1.023.272 1.274 1.115 3.546 2.09 6.75 3.26 10.279.08.246.168.486.267.72.02.047.035.046.048-.004.077-.297.174-.612.29-.945.894-2.576 1.772-5.14 2.633-7.696a.345.345 0 0 0 .004-.217 163.054 163.054 0 0 0-1.49-4.572 2.603 2.603 0 0 0-.704-.933c-.55-.46-1.166-.694-1.842-.7Zm9.078.117a2.734 2.734 0 0 0-2.878 1.828l-4.576 13.289a2.734 2.734 0 0 0 1.695 3.475l.12.04a2.734 2.734 0 0 0 3.475-1.694L23.85 6.307a2.734 2.734 0 0 0-1.695-3.476c-.233-.1-.506-.124-.716-.174ZM12.375 3.96a1.396 1.396 0 1 1 0 2.791 1.395 1.395 0 0 1 0-2.79zm8.809.07a1.402 1.402 0 1 1 0 2.803 1.402 1.402 0 0 1 0-2.803zM5.419 7.605a2.853 2.853 0 0 0-.468.052 2.683 2.683 0 0 0-1.337.627 2.62 2.62 0 0 0-.924 1.833 3.808 3.808 0 0 0 0 .648 2.52 2.52 0 0 0 .673 1.52c.221.238.465.454.732.648 3.043 2.21 6.08 4.43 9.108 6.664a.78.78 0 0 0 .158.089c.03-.043.032-.098.007-.167a17.409 17.409 0 0 0-.317-1.066 532.752 532.752 0 0 1-2.02-6.251 41.91 41.91 0 0 0-.497-1.477c-.967-.849-2.078-1.6-3.023-2.302A3.848 3.848 0 0 0 6.153 7.7a2.388 2.388 0 0 0-.734-.094Zm.02 1.424a1.398 1.398 0 1 1 0 2.796 1.398 1.398 0 0 1 0-2.796zm-2.458 6.792c-.733-.006-1.375.202-1.927.622a2.72 2.72 0 0 0-.95 1.45 2.78 2.78 0 0 0-.09 1.04 2.74 2.74 0 0 0 .695 1.583c.664.578 1.26.85 2 .945 1.42-.005 2.84-.012 4.262-.02h.418c2.277-.003 4.513-.002 6.706.003.148.005.28.003.392-.01.06-.005.091-.031.092-.077a10.656 10.656 0 0 0-.834-.653 488.746 488.746 0 0 1-6.57-4.815.236.236 0 0 0-.14-.047c-1.34-.003-2.691-.01-4.054-.02zm-.19 1.418a1.402 1.402 0 1 1 0 2.803 1.402 1.402 0 0 1 0-2.803zm13.874.002a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"
      />
    ),
  },
  minitab: {
    viewBox: '0 0 128 128',
    render: () => (
      <path
        fill="#8DC63F"
        d="M0 0v128h128V0H0zm34.6 106.5H14.8v-54h19.7v54zm27.1 0H42v-87h19.7v87zm27.1 0H69.1V37.6h19.7v68.9zm27.2 0H96.3V68.6H116v37.9z"
      />
    ),
  },
  spss: {
    viewBox: '0 0 128 128',
    render: () => (
      <path
        fill="#CC1E4C"
        d="M125 80.5c-1.7 0-3.1 1.3-3.1 3s1.3 3 3.1 3c1.7 0 3-1.3 3-3s-1.3-3-3-3zm-.1.5c1.4 0 2.4 1.1 2.4 2.5s-1 2.5-2.3 2.5c-1.4 0-2.4-1.1-2.4-2.5s.9-2.4 2.3-2.5zm-1 .8v3.4h.6v-1.5h.6l.9 1.5h.6l-.9-1.6c.6 0 .8-.4.8-.9 0-.6-.4-.9-1.2-.9h-1.4zm.5 1.5v-1.1h.7c.5 0 .7.2.7.6s-.3.6-.6.6l-.8-.1zM31.3 93.7c-1.6-1.2-3.5-2.2-6.1-3-3.3-1.1-8.1-2.2-10-2.9-1.2-.5-1.7-1.2-1.7-2.2 0-1.4 1.7-2.2 3.7-2.3 3.3.1 4.3 2 4.5 3.3h9.6v7.1zm12 8.9h7.1c6.2-.1 11.2-3.2 13.7-7.7.2-.4.4-.7.6-1.1.4.5.7.7 1.1 1.1 1.7 1.5 3.9 2.6 6.2 3.3 3.7 1.3 6.6 2.2 7.6 2.6 1.9.8 3.1 1.4 3.1 3.1 0 2-2.2 2.8-4.5 2.9-3.1-.1-6.2-1.6-6.1-4.7H60c.6 8.1 8.6 14.4 18 14.5 5.7-.1 11-1.7 14.4-5.8 3.4 3.5 7.4 5.7 13 5.8 8.9-.1 18.1-4.5 18.2-13.9 0-3-.8-5.6-2.7-7.8-1.7-2-4.1-3.3-7.4-4.2-3.3-1.1-8.1-2.2-10-2.9-1.2-.5-1.7-1.2-1.7-2.2 0-1.4 1.7-2.2 3.7-2.3 3.3.1 4.3 2 4.5 3.3h11.6c.1-8-6.6-13.3-16.1-13.3-7.1 0-11.9 2.7-14.3 6.6-2.6-4.1-7.8-6.6-14.3-6.6-6.8 0-11.5 2.6-14 6.3-2.8-3.6-7.4-5.9-13-5.9H31.3v6.1c-2.6-4.1-7.8-6.5-14.2-6.5-9.9 0-15.3 5.5-15.8 11.8 0 3.9 1.9 7.4 4.8 9.9 1.7 1.5 3.7 2.6 6 3.3 3.7 1.3 6.6 2.2 7.6 2.6 1.9.8 3.1 1.4 3.1 3.1 0 2-2.3 2.8-4.5 2.9-3.1-.1-6.2-1.6-6.1-4.7H-.1c.6 8.1 8.6 14.4 18 14.5 5.2-.1 10-1.5 13.2-4.5v3.8h12l.2-13.4zm0-18.9h6.5c2.4 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5h-6.5v-9zM92.5 95c-1.7-2-4.1-3.3-7.4-4.2-3.3-1.1-8.1-2.2-9.9-2.9-1.3-.5-1.9-1.2-1.9-2.2 0-1.4 1.7-2.2 3.7-2.3 3.4.1 4.3 2 4.5 3.3h8.2c.5 3.2 2.1 6.1 4.7 8.3 1.7 1.5 3.8 2.6 6.1 3.3 3.7 1.3 6.6 2.2 7.5 2.6 2 .8 3.1 1.4 3.1 3.1 0 2-2.3 2.8-4.5 2.9-3.1-.1-6.2-1.6-6.1-4.7H95c0-2.9-.9-5.3-2.5-7.2zM.1 11.2v3.5H25v-3.5H.1zm28.3 0v3.5H64s-3.6-3.5-8.4-3.5H28.4zm42.6 0v3.5h21.5l-1.3-3.5H71zm36.9 0l-1.3 3.5h21.3v-3.5h-20zM.1 18v3.5H25V18H.1zm28.3 0v3.5H68s-.5-2.7-1.3-3.5H28.4zM71 18v3.5h23.8L93.6 18H71zm34.3 0l-1.2 3.5h23.7V18h-22.5zm-98 6.8v3.5H18v-3.5H7.3zm28.3 0v3.5h10.8v-3.5H35.6zm21.4 0v3.5h10.8s.7-1.9.7-3.5H57zm21.2 0v3.5h19.1L96 24.8H78.2zm24.8 0l-1.3 3.5h19.2v-3.5H103zM7.3 31.7v3.5H18v-3.5H7.3zm28.3 0v3.5h27.6s2.3-1.8 3-3.5H35.6zm42.6 0v3.5H89v-1.9l.7 1.9h19.8l.7-1.9v1.9H121v-3.5h-20.3l-1.1 3-1.1-3H78.2zM7.3 38.5V42H18v-3.5H7.3zm28.3 0V42h30.6c-.7-1.7-3-3.5-3-3.5H35.6zm42.6 0V42H89v-3.5H78.2zm12.7 0l1.3 3.5H107l1.2-3.5H90.9zm19.3 0V42H121v-3.5h-10.8zM7.3 45.3v3.5H18v-3.5H7.3zm28.3 0v3.5h10.8v-3.5H35.6zm21.4 0v3.5h11.5c0-1.7-.7-3.5-.7-3.5H57zm21.2 0v3.5H89v-3.5H78.2zm15.2 0l1.3 3.5h9.9l1.3-3.5H93.4zm16.8 0v3.5H121v-3.5h-10.8zM.3 52.1v3.5h24.9v-3.5H.3zm28.1 0v3.5h38.4c.8-.8 1.3-3.5 1.3-3.5H28.4zm42.8 0v3.5H89v-3.5H71.2zm24.6 0l1.3 3.5h5.1l1.2-3.5h-7.6zm14.4 0v3.5h17.9v-3.5h-17.9zM.3 58.9v3.5h24.9v-3.5H.3zm28.1 0v3.5h27.1c4.8 0 8.4-3.5 8.4-3.5H28.4zm42.8 0v3.5H89v-3.5H71.2zm27.1 0l1.3 3.5h.2l1.3-3.5h-2.8zm11.9 0v3.5h17.9v-3.5h-17.9z"
      />
    ),
  },
};

/**
 * Software TANPA aset logo terbuka yang bisa saya verifikasi (belum ada di Simple Icons/Devicon,
 * atau sudah ditarik pemiliknya - kasus ini terjadi pada semua produk Microsoft Office).
 * Dirender sebagai badge inisial dengan warna aksen resmi/mendekati resmi, BUKAN klaim logo asli.
 * Ganti ke LOGO_MAP di atas begitu ada aset SVG resmi (upload file atau link sumbernya).
 */
const PLACEHOLDER_MAP: Record<string, { initials: string; color: string }> = {
  // Semua entry sebelumnya (msaccess, catia, msvisio, pomqm, ultimaker) sudah
  // punya aset SVG sendiri di LOCAL_LOGO_MAP di bawah. Map ini sengaja dikosongkan
  // dan dipertahankan sebagai tempat untuk software berikutnya yang belum punya aset.
};

/**
 * Logo lokal milik sendiri (bukan Simple Icons/Devicon), disimpan sebagai file statis
 * di `public/logo/` dan dirender lewat <img>, bukan inline JSX seperti LOGO_MAP.
 * Alasan dipisah: aset ini adalah SVG hasil trace raster (VTracer) berukuran besar
 * dan path kompleks, tidak ideal untuk diinline langsung ke bundle JS.
 * Path di sini relatif ke root publik Next.js (folder `public/`).
 */
const LOCAL_LOGO_MAP: Record<string, string> = {
  msaccess: '/logo/msaccess.svg',
  msvisio: '/logo/msvisio.svg',
  catia: '/logo/catia.svg',
  pomqm: '/logo/pomqm.svg',
  ultimaker: '/logo/ultimaker.svg',
};

function PlaceholderBadge({
  initials,
  color,
  className,
}: {
  initials: string;
  color: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill={color} />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight={700}
        fontSize={initials.length > 1 ? 8 : 11}
        fill="#FFFFFF"
      >
        {initials}
      </text>
    </svg>
  );
}

export function ToolIcon({ type, name, className = 'w-6 h-6' }: ToolIconProps) {
  // 1. GLYPH: metode/konsep teknis abstrak (dipakai section lain, bukan toolkit rail)
  if (type === 'glyph') {
    const IconComponent = GLYPH_MAP[name] || Cpu;
    return <IconComponent className={className} />;
  }

  // 2. PLACEHOLDER: software tanpa logo vektor terverifikasi
  if (type === 'placeholder') {
    const entry = PLACEHOLDER_MAP[name];
    if (entry) {
      return <PlaceholderBadge initials={entry.initials} color={entry.color} className={className} />;
    }
    return <Cpu className={className} />;
  }

  // 3. LOGO: aset asli dari Simple Icons (CC0) / Devicon (MIT)
  const logo = LOGO_MAP[name];
  if (logo) {
    return (
      <svg className={className} viewBox={logo.viewBox} xmlns="http://www.w3.org/2000/svg">
        {logo.render()}
      </svg>
    );
  }

  // 3b. LOGO lokal (file SVG milik sendiri di public/logo/, tanpa lisensi Simple Icons/Devicon)
  const localLogoSrc = LOCAL_LOGO_MAP[name];
  if (localLogoSrc) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={localLogoSrc}
        alt={`${name} logo`}
        className={`${className} object-contain`}
      />
    );
  }

  // Fallback terakhir jika iconName belum terdaftar di ketiga map
  return <Cpu className={className} aria-hidden="true" />;
}