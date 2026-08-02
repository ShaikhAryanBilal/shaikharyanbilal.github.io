export interface Cta {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Social {
  label: string;
  url: string;
}

export interface Site {
  name: string;
  tagline: string;
  location: string;
  hours: string;
  url: string;
  nav: NavLink[];
  cta: Cta;
  socials: Social[];
  footer: { copyright: string; note: string };
  contact: { whatsapp: string; email: string; phone: string; location: string; hours: string };
}

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string };

export interface Project {
  slug: string;
  title: string;
  site: string;
  date: string;
  excerpt: string;
  tags: string[];
  image: string | null;
  body: Block[];
  hidden?: boolean;
}

export interface Home {
  kicker: string;
  hero: {
    tagline: string;
    name: string;
    lede: string;
    status: string;
    cta: Cta;
    ctaSecondary: Cta;
    portrait: string;
  };
  stats: { value: string; label: string }[];
  skills: { title: string; items: string[] }[];
  highlights: string[];
  about: string[];
}

export interface Work {
  kicker: string;
  title: string;
  lede: string;
  projects: Project[];
}

export interface Certifications {
  kicker: string;
  title: string;
  lede: string;
  images: string[];
}

export interface Contact {
  kicker: string;
  title: string;
  lede: string;
  email: string;
  phone: string;
  location: string;
  hours: string;
  whatsapp: string;
  whatsappCta: { title: string; text: string; label: string };
  socials: Social[];
}

export interface WorkHistory {
  kicker: string;
  title: string;
  lede: string;
  summary: string;
  skills: { category: string; skills: string[] }[];
  experience: {
    company: string;
    roles: { role: string; period: string; points: string[] }[];
  }[];
  projects: {
    name: string;
    org?: string;
    note?: string;
    stack?: string;
    points: string[];
  }[];
  education: { degree: string; school: string; period: string }[];
  certifications: string[];
  languages: { language: string; level: string }[];
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  hero: string;
  overview: string;
  whatIBuild: string[];
  howIWork: string;
  whyItMatters: string;
  faq: ServiceFaq[];
  cta: string;
}

export interface Services {
  kicker: string;
  title: string;
  hero: string;
  intro: string;
  offers: {
    slug: string;
    title: string;
    text: string;
  }[];
  background: string;
  whyWorkWithMe: string;
  faq: ServiceFaq[];
  cta: string;
  services: ServiceDetail[];
}
