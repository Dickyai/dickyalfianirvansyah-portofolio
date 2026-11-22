// types/skill.ts

export type SkillIconKey = 'code' | 'settings' | 'monitor';

// Mendefinisikan exact keys untuk kategori agar type-safe
export type SkillCategoryKey = 'data-automation' | 'industrial-engineering' | 'design-prototyping';

// Tipe relasi proyek untuk mencegah struktur objek yang tidak seragam
export interface SkillProjectRef {
  title: string;
  href: string;
}

// Representasi ontologis dari sebuah skill individu
export interface SkillDetail {
  id: string;
  name: string;
  context: string;
  relatedCompetencies?: string[];
  relatedProjects?: SkillProjectRef[];
}

// Tipe kategori toolkit yang menggantikan antarmuka SkillCategory lama
export interface ToolkitCategory {
  id: SkillCategoryKey;
  label: string;
  icon: SkillIconKey;
  skills: SkillDetail[];
}

/* 
  Catatan: Antarmuka 'SkillCategory' yang lama sengaja dihapus
  karena kita tidak lagi menggunakan struktur legacy di mana 
  'items' hanya berupa array of strings.
*/