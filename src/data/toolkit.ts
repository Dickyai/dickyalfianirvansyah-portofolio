// src/data/toolkit.ts

export interface ToolkitItem {
  id: string;
  name: string;
  category: string;
  context: string;
  /**
   * 'logo'        -> render logo, dari salah satu dari dua sumber di ToolIcon.tsx:
   *                  - LOGO_MAP: SVG resmi Simple Icons/Devicon, diinline sebagai JSX.
   *                  - LOCAL_LOGO_MAP: SVG milik sendiri (bukan Simple Icons/Devicon),
   *                    disimpan di public/logo/ dan dirender lewat <img>.
   * 'placeholder' -> belum ada aset logo untuk software ini,
   *                  dirender sebagai badge inisial (lihat PLACEHOLDER_MAP di ToolIcon.tsx).
   *                  Ganti ke 'logo' begitu ada aset SVG yang bisa dipakai.
   */
  iconType: 'logo' | 'placeholder';
  iconName: string;
  row: 1 | 2;
}

export const ENGINEERING_TOOLKIT: ToolkitItem[] = [
  // Row 1: Data, Analytics & Automation
  { id: 'python', name: 'Python', category: 'analytics', context: 'Algorithms · Data Processing', iconType: 'logo', iconName: 'python', row: 1 },
  { id: 'sheets', name: 'Google Sheets', category: 'data', context: 'Data Modeling · Spreadsheet Automation', iconType: 'logo', iconName: 'googlesheets', row: 1 },
  { id: 'minitab', name: 'Minitab', category: 'analytics', context: 'Statistical Analysis · SPC', iconType: 'logo', iconName: 'minitab', row: 1 },
  { id: 'spss', name: 'SPSS', category: 'analytics', context: 'Statistical Modeling', iconType: 'logo', iconName: 'spss', row: 1 },
  { id: 'pomqm', name: 'POM-QM', category: 'analytics', context: 'Operations Research · Quantitative Methods', iconType: 'logo', iconName: 'pomqm', row: 1 },
  { id: 'gas', name: 'Apps Script', category: 'automation', context: 'Workflow Automation', iconType: 'logo', iconName: 'googleappsscript', row: 1 },
  { id: 'access', name: 'MS Access', category: 'data', context: 'Relational Database', iconType: 'logo', iconName: 'msaccess', row: 1 },

  // Row 2: Design, Prototyping & Development
  { id: 'catia', name: 'CATIA V5', category: 'design', context: 'CAD · Assembly · Rendering', iconType: 'logo', iconName: 'catia', row: 2 },
  { id: 'visio', name: 'MS Visio', category: 'design', context: 'Process Mapping · Flowcharting', iconType: 'logo', iconName: 'msvisio', row: 2 },
  { id: 'tinkercad', name: 'TinkerCAD', category: 'design', context: 'Engineering Prototyping', iconType: 'logo', iconName: 'tinkercad', row: 2 },
  { id: 'cura', name: 'UltiMaker Cura', category: 'slicing', context: 'Slicing · Print Prep', iconType: 'logo', iconName: 'ultimaker', row: 2 },
  { id: 'bambu', name: 'Bambu Lab', category: 'slicing', context: '3D Printing · P1P Operation', iconType: 'logo', iconName: 'bambulab', row: 2 },
  { id: 'github', name: 'GitHub', category: 'dev', context: 'Version Control', iconType: 'logo', iconName: 'github', row: 2 },
];