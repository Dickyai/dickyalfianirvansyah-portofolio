import { Database, Code2, Terminal, Monitor, Settings } from 'lucide-react';
import type { ComponentType } from 'react';
import type { ProjectThumbType } from '../../types/project';

const THUMB_ICON_MAP: Record<ProjectThumbType, ComponentType<{ className?: string }>> = {
  database: Database,
  code: Code2,
  terminal: Terminal,
  monitor: Monitor,
  settings: Settings,
};

interface ProjectThumbIconProps {
  type: ProjectThumbType;
  className?: string;
}

/**
 * Dulu fungsi `renderIcon(type, className)` di page.tsx, dipakai di 2 tempat
 * (card grid Projects & halaman ProjectDetail). Sekarang 1 komponen dipakai ulang
 * di keduanya alih-alih 2 salinan switch-case.
 */
export function ProjectThumbIcon({ type, className }: ProjectThumbIconProps) {
  const Icon = THUMB_ICON_MAP[type] ?? Settings;
  return <Icon className={className} />;
}
