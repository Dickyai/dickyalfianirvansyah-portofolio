import { useEffect, useState } from 'react';

type RolePhase = 'building' | 'holding' | 'removing';

/**
 * Animasi ketik-hapus bergantian untuk daftar role (rollingRoles) di Hero.
 *
 * @param roles     Daftar teks role, mis. t.hero.rollingRoles
 * @param resetKey  Nilai yang, saat berubah, mereset animasi dari awal.
 *                  Di page.tsx lama ini adalah `lang` (ganti bahasa = reset animasi).
 */
export function useRoleTypewriter(roles: string[], resetKey: string | number) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [rolePhase, setRolePhase] = useState<RolePhase>('building');

  useEffect(() => {
    setRoleIndex(0);
    setVisibleChars(0);
    setRolePhase('building');
  }, [resetKey]);

  useEffect(() => {
    const fullText = roles[roleIndex % roles.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (rolePhase === 'building') {
      if (visibleChars < fullText.length) {
        timeout = setTimeout(() => setVisibleChars((v) => v + 1), 45);
      } else {
        timeout = setTimeout(() => setRolePhase('holding'), 200);
      }
    } else if (rolePhase === 'holding') {
      timeout = setTimeout(() => setRolePhase('removing'), 2000);
    } else {
      if (visibleChars > 0) {
        timeout = setTimeout(() => setVisibleChars((v) => v - 1), 25);
      } else {
        timeout = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length);
          setRolePhase('building');
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [rolePhase, visibleChars, roleIndex, roles]);

  const fullRoleText = roles[roleIndex % roles.length];
  const displayedText = fullRoleText.slice(0, visibleChars);

  return { displayedText, roleIndex, fullRoleText };
}
