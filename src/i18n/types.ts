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
  relatedProjects?: string[];
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
    headline: string;
    tagline: string;
    ctaWorks: string;
    ctaCv: string;
    metrics: AboutMetric[];
    rollingRoles: string[];
    tags: string[];
    quote: string;
  };
  coreCompetencies: {
    tag: string;
    heading: string;
    panelHeaders: {
      capabilities: string;
      applications: string;
      evidence: string;
      relatedProjects: string;
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
    filters: {
      all: string;
      optimization: string;
      automation: string;
      analytics: string;
      quality: string;
    };
  };
  about: {
    heading: string;
    studyStatusLabel: string;
    points: string[];
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
    problem: string;
    approach: string;
    results: string;
    stack: string;
    links: string;
    github: string;
    live: string;
    statusLabels: {
      active: string;
      inDevelopment: string;
      completed: string;
    };
  };
}