import type { SkillCategoryKey } from '../types/skill';

export interface SkillDetail {
  id: string;
  name: string;
  context: string;
  relatedCompetencies?: string[];
  relatedProjects?: { title: string; href: string }[];
}

export interface ToolkitCategory {
  id: SkillCategoryKey;
  label: string;
  icon: 'code' | 'settings' | 'monitor';
  skills: SkillDetail[];
}

export const ENGINEERING_TOOLKIT: ToolkitCategory[] = [
  {
    id: 'data-automation',
    label: 'DATA & AUTOMATION',
    icon: 'code',
    skills: [
      {
        id: 'gas',
        name: 'Google Apps Script',
        context: 'Web apps · workflow automation · triggers',
        relatedCompetencies: ['Digital Process Automation'],
        relatedProjects: [{ title: 'Automated Student Analytics System', href: '#projects' }]
      },
      {
        id: 'python',
        name: 'Python',
        context: 'Algorithms · data processing · automation',
        relatedCompetencies: ['Optimization & Decision Analysis', 'Data-Driven Analysis'],
        relatedProjects: [{ title: 'GVRP Distribution Routing', href: '#projects' }]
      },
      {
        id: 'excel',
        name: 'Excel / Sheets',
        context: 'Data modeling · INDEX MATCH · VSTACK',
      },
      {
        id: 'minitab-spss',
        name: 'Minitab & SPSS',
        context: 'Statistical analysis · SPC · modeling',
        relatedCompetencies: ['Data-Driven Analysis', 'Process Improvement & Quality']
      },
      {
        id: 'ms-access',
        name: 'Microsoft Access',
        context: 'Relational database · form systems',
      }
    ]
  },
  {
    id: 'industrial-engineering',
    label: 'INDUSTRIAL ENGINEERING',
    icon: 'settings',
    skills: [
      {
        id: 'spc',
        name: 'Statistical Process Control',
        context: 'Capability analysis (Cp/Cpk) · quality control',
        relatedCompetencies: ['Process Improvement & Quality']
      },
      {
        id: 'mrp',
        name: 'MRP',
        context: 'Production planning · inventory control',
        relatedCompetencies: ['Supply Chain & Production Planning']
      },
      {
        id: 'supply-chain',
        name: 'Supply Chain & PPIC',
        context: 'Operations management · logistics',
      },
      {
        id: 'gvrp',
        name: 'GVRP',
        context: 'Vehicle routing · distribution optimization',
        relatedCompetencies: ['Optimization & Decision Analysis', 'Supply Chain & Production Planning'],
        relatedProjects: [{ title: 'PT Teknoplast Distribution Study', href: '#projects' }]
      },
      {
        id: 'work-measurement',
        name: 'Work Measurement',
        context: 'Time study · work sampling',
      }
    ]
  },
  {
    id: 'design-prototyping',
    label: 'DESIGN & PROTOTYPING',
    icon: 'monitor',
    skills: [
      {
        id: 'catia',
        name: 'CATIA V5',
        context: 'CAD · assembly · rendering',
        relatedCompetencies: ['Technical Design / Engineering Prototyping']
      },
      {
        id: 'tinkercad',
        name: 'TinkerCAD',
        context: 'Engineering prototyping',
      },
      {
        id: '3d-printing',
        name: '3D Printing',
        context: 'Machine operation (Bambu Lab P1P)',
        relatedProjects: [{ title: 'Product Design Lab Certification', href: '#projects' }]
      },
      {
        id: 'slicing',
        name: 'Slicing Systems',
        context: 'Cura · Bambu Studio · print preparation',
      },
      {
        id: 'sop',
        name: 'SOP Development',
        context: 'Work instructions · process documentation',
      }
    ]
  }
];