export type ContactIconKey = 'mail' | 'github' | 'linkedin' | 'whatsapp' | 'instagram';

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: ContactIconKey;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactSectionData {
  heading: { id: string; en: string };
  description: { id: string; en: string };
  links: ContactLink[];
  cvDownloadUrl: string;
}
