import type { SVGProps } from "react";
import { contact } from "@/lib/content";
import Typewriter from "@/components/Typewriter";

const iconProps: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const icons = {
  email: (
    <svg {...iconProps}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  phone: (
    <svg {...iconProps}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  whatsapp: (
    <svg {...iconProps}>
      <path d="M3 21l1.65-4.83A8.5 8.5 0 1 1 7.83 19.35L3 21z" />
    </svg>
  ),
  linkedin: (
    <svg {...iconProps}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v1.5" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  github: (
    <svg {...iconProps}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  ),
};

const SOCIAL_ICONS: Record<string, keyof typeof icons> = {
  LinkedIn: "linkedin",
  GitHub: "github",
};

export default function ContactSection() {
  const links = [
    { icon: icons.email, href: `mailto:${contact.email}`, label: contact.email },
    { icon: icons.phone, href: `tel:${contact.phone.replace(/\s+/g, "")}`, label: contact.phone },
    { icon: icons.whatsapp, href: contact.whatsapp, label: "WhatsApp" },
  ];

  return (
    <section className="contact-panel" id="contact" aria-label="Contact">
      <div className="wrap">
        <div className="contact-panel-inner">
          <div className="contact-panel-grid">
            <div>
              <p className="kicker">Get in touch</p>
              <Typewriter as="h2" className="contact-panel-title" text="Let's work together" dot />
              <p className="contact-panel-lede">{contact.lede}</p>

              <div className="contact-links">
                {links.map((l) => (
                  <a key={l.label} className="contact-link" href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    <span className="contact-link-icon">{l.icon}</span>
                    <span>{l.label}</span>
                  </a>
                ))}
                {contact.socials
                  .filter((s) => SOCIAL_ICONS[s.label])
                  .map((s) => (
                    <a key={s.label} className="contact-link" href={s.url} target="_blank" rel="noopener noreferrer">
                      <span className="contact-link-icon">{icons[SOCIAL_ICONS[s.label]]}</span>
                      <span>{s.label}</span>
                    </a>
                  ))}
              </div>
            </div>

            <div>
              <div className="contact-whatsapp">
                <span className="contact-whatsapp-icon">{icons.whatsapp}</span>
                <Typewriter as="h3" text={contact.whatsappCta.title} />
                <p>{contact.whatsappCta.text}</p>
                <a className="pill shimmer" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  {contact.whatsappCta.label} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
