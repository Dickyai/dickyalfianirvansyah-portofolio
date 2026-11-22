import type { LocalizedText } from './project';

export interface MetricItem {
  value: string;
  label: LocalizedText;
}

export interface HeroExperienceBadge {
  number: string;
  line1: LocalizedText;
  line2: LocalizedText;
}

export interface HeroRollingRoles {
  id: string[];
  en: string[];
}

export interface BioData {
  heading: LocalizedText;
  paragraphs: LocalizedText[];
  quickFactsTag: LocalizedText;
  quickFacts: LocalizedText[];
  metrics: MetricItem[];
}

export interface HeroData {
  name: string;
  greeting: LocalizedText;
  major: LocalizedText;
  locationBadge: LocalizedText;
  experienceBadge: HeroExperienceBadge;
  rollingRoles: HeroRollingRoles;
  tags: string[];
  quote: LocalizedText;
  about: BioData;
}
