import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa6';

interface CustomIconProps {
  className?: string;
}

/**
 * Warna resmi tiap brand. LinkedIn/WhatsApp/Instagram SELALU pakai warna
 * ini (tidak ikut currentColor/hover), karena warna adalah bagian dari
 * identitas brand mereka. GitHub sengaja dikecualikan — logonya memang
 * monokrom (hitam di light mode, putih di dark mode), jadi tetap pakai
 * currentColor supaya otomatis menyesuaikan tema seperti sebelumnya.
 */
const BRAND_COLORS = {
  linkedin: '#0A66C2',
  whatsapp: '#25D366',
  instagram: '#E4405F',
} as const;

export const GithubIcon = ({ className }: CustomIconProps) => <FaGithub className={className} />;

export const LinkedinIcon = ({ className }: CustomIconProps) => (
  <FaLinkedin className={className} style={{ color: BRAND_COLORS.linkedin }} />
);

export const WhatsappIcon = ({ className }: CustomIconProps) => (
  <FaWhatsapp className={className} style={{ color: BRAND_COLORS.whatsapp }} />
);

export const InstagramIcon = ({ className }: CustomIconProps) => (
  <FaInstagram className={className} style={{ color: BRAND_COLORS.instagram }} />
);

/**
 * Peta ContactIconKey (types/contact.ts) -> komponen icon, dipakai di
 * Contact.tsx saat merender CONTACT_LINKS.
 */
export const SOCIAL_ICON_MAP = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  whatsapp: WhatsappIcon,
  instagram: InstagramIcon,
} as const;

/**
 * Catatan: ContactIconKey juga punya key 'mail', tapi icon Mail sudah
 * tersedia bawaan dari lucide-react, jadi TIDAK didaftarkan di sini.
 */
