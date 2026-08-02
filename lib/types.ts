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
    cta: Cta;
    ctaSecondary: Cta;
    portrait: string;
  };
  about: string[];
}

export interface Work {
  kicker: string;
  title: string;
  lede: string;
  projects: Project[];
}

export interface ServiceDetail {
  subtitle: string;
  intro: string;
  bullets: string[];
  readyHeading: string;
  ready: string;
  cta: string;
}

export interface Service {
  num: string;
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  detail: ServiceDetail;
}

export interface Services {
  kicker: string;
  title: string;
  subtitle: string;
  lede: string;
  services: Service[];
  whyChooseUs: { heading: string; text: string };
  ready: { heading: string; text: string; cta: string };
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
  socials: Social[];
  form: {
    heading: string;
    fields: { name: string; label: string; type: string; required: boolean }[];
    submit: string;
  };
}
