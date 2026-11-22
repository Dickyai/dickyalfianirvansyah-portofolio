export type LangCode = 'id' | 'en';

export interface AboutMetric {
  value: string;
  label: string;
}

export interface CoreCompetencyItem {
  title: string;
  category: string;
  description: string;
  capabilities: string[];
  applicationAreas: string[];
  evidence: string[];
  relatedProjects?: number[]; // Berisi ID dari data/projects.ts
}

export interface Translation {
  nav: {
    about: string;
    skills: string;
    projects: string;
    certifications: string;
    contact: string;
  };
  hero: {
    experienceLine1: string;
    experienceLine2: string;
    locationBadge: string;
    greeting: string;
    major: string;
    specializationTitle: string;
    tagline: string;
    ctaWorks: string;
    ctaCv: string;
    rollingRoles: string[];
    tags: string[];
    quote: string;
  };
  coreCompetencies: {
    tag: string;
    heading: string;
    exploreCta: string;
    panelHeaders: {
      capabilities: string;
      applications: string;
      evidence: string;
      relatedProjects: string;
      viewProjectCta: string;
    };
    items: CoreCompetencyItem[];
  };
  skills: {
    tag: string;
    heading: string;
    tagLabel: string;
  };
  sections: {
    projectsHeading: string;
    certificationsHeading: string;
    certTagLabel: string;
  };
  music: {
    title: string;
    status: string;
    playLabel: string;
    pauseLabel: string;
  };
  footer: {
    copyright: string;
    builtWith: string;
  };
  projectsSection: {
    tag: string;
    searchPlaceholder: string;
    noResultsPrefix: string;
  };
  about: {
    heading: string;
    p1: string;
    p2: string;
    p3: string;
    quickFactsTag: string;
    quickFacts: string[];
    metrics: AboutMetric[];
  };
  contact: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    secureHeading: string;
    buttonIdle: string;
    buttonSubmitting: string;
    buttonSuccess: string;
  };
  certificationsSection: {
    tag: string;
    loadMore: string;
    showLess: string;
  };
  contactSection: {
    heading: string;
    description: string;
    successMessage: string;
    errorMessage: string;
  };
  detail: {
    back: string;
    goalsHeading: string;
    stage: string;
    techUsed: string;
    toolJustification: string;
    statusLabels: {
      active: string;
      inDevelopment: string;
      completed: string;
    };
  };
}