/**
 * Tipe untuk konten bilingual (ID/EN) yang dipakai berulang
 * di seluruh data proyek.
 */
export interface LocalizedText {
  id: string;
  en: string;
}

export interface ProjectObjective {
  phase: LocalizedText;
  detail: LocalizedText;
}

export interface ProjectTool {
  name: string;
  reason: LocalizedText;
}

export type ProjectThumbType = 'database' | 'code' | 'monitor' | 'terminal' | 'settings';

export interface ProjectMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

export type ProjectStatus = 'active' | 'in-development' | 'completed';

export interface Project {
  id: number;
  title: string;
  thumbType: ProjectThumbType;
  status: ProjectStatus;
  desc: LocalizedText;
  tech: string[];
  period: string;
  repo: string;
  demo: string;
  objectives: ProjectObjective[];
  tools: ProjectTool[];
  media?: ProjectMedia[];
}
