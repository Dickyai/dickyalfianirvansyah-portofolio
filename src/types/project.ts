/**
 * Tipe untuk konten bilingual (ID/EN) yang dipakai berulang
 * di seluruh data proyek.
 */
export interface LocalizedText {
  id: string;
  en: string;
}

export type ProjectCategory = 'optimization' | 'automation' | 'analytics' | 'quality';

export interface ProjectMetric {
  label: LocalizedText;
  value: string;
  detail?: LocalizedText;
}

export type ProjectThumbType = 'database' | 'code' | 'monitor' | 'terminal' | 'settings';

export interface ProjectImage {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
}

export type ProjectStatus = 'active' | 'in-development' | 'completed';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  period: string;
  summary: LocalizedText;
  problem: LocalizedText;
  approach: LocalizedText;
  metrics: ProjectMetric[];
  stack: string[];
  images: ProjectImage[];
  links: {
    live?: string;
    github?: string;
  };
  thumbType: ProjectThumbType;
}
