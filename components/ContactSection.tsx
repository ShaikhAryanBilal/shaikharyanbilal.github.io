import type { SVGProps } from "react";
import { site } from "@/lib/content";

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
  location: (
    <svg {...iconProps}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (
    <svg {...iconProps}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  email: (
    <svg {...iconProps}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  hours: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

export default function ContactSection() {
  const contact = site.contact;
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(contact.location)}`;

  return (
    <section className="contact-section" aria-label="Contact">
      <div className="wrap">
        <div className="contact-section-head">
          <p className="kicker">Contact</p>
          <h2 className="contact-section-title">Get in touch</h2>
        </div>
        <div className="contact-section-grid">
          <div className="contact-block">
            <span className="contact-block-icon">{icons.location}</span>
            <span className="contact-block-label">Location</span>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {contact.location}
            </a>
          </div>
          <div className="contact-block">
            <span className="contact-block-icon">{icons.phone}</span>
            <span className="contact-block-label">Phone</span>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
          </div>
          <div className="contact-block">
            <span className="contact-block-icon">{icons.email}</span>
            <span className="contact-block-label">E-mail</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div className="contact-block">
            <span className="contact-block-icon">{icons.hours}</span>
            <span className="contact-block-label">Hours</span>
            <span>{contact.hours}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
