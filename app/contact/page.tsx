import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import { icons, CONTACT_SOCIAL_ICONS } from "@/components/icons";
import { contact, siteUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Shaikh Aryan Bilal",
  description:
    "Get in touch with Shaikh Aryan Bilal, a backend-focused web software engineer. Reach out via email, phone, or WhatsApp for web development, Laravel, WordPress, and API projects.",
  keywords: [
    "Shaikh Aryan Bilal contact",
    "Hire Laravel developer",
    "hire web developer Karachi",
    "freelance backend engineer Pakistan",
    "contact backend developer",
    "WhatsApp web developer",
    "remote PHP developer contact",
  ],
  openGraph: {
    title: "Contact | Shaikh Aryan Bilal",
    description:
      "Get in touch with Shaikh Aryan Bilal, a backend-focused web software engineer. Reach out via email, phone, or WhatsApp.",
    url: `${siteUrl}/contact`,
  },
  twitter: {
    title: "Contact | Shaikh Aryan Bilal",
    description:
      "Get in touch with Shaikh Aryan Bilal, a backend-focused web software engineer.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
    ],
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Shaikh Aryan Bilal",
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Shaikh Aryan Bilal",
      email: `mailto:${contact.email}`,
      telephone: contact.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karachi",
        addressCountry: "PK",
      },
    },
  };

  const channels = [
    {
      icon: icons.email,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: icons.phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: icons.whatsapp,
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: contact.whatsapp,
    },
    {
      icon: icons.location,
      label: "Location",
      value: contact.location,
    },
    {
      icon: icons.clock,
      label: "Hours",
      value: contact.hours,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, contactSchema]),
        }}
      />
      <SiteNav />
      <main>
        <section className="section page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{contact.kicker}</p>
            </Reveal>
            <Reveal delay={60}>
              <Typewriter as="h1" className="section-title" text={contact.title} dot />
            </Reveal>
            <Reveal delay={120}>
              <p className="contact-page-lede">{contact.lede}</p>
            </Reveal>

            <div className="contact-page">
              <div className="contact-channels">
                {channels.map((ch, i) => {
                  const inner = (
                    <>
                      <span className="contact-ch-icon">{ch.icon}</span>
                      <span className="contact-ch-body">
                        <span className="contact-ch-label">{ch.label}</span>
                        <span className="contact-ch-value">{ch.value}</span>
                      </span>
                    </>
                  );
                  return (
                    <Reveal key={ch.label} delay={(i % 3) * 80}>
                      {ch.href ? (
                        <a
                          className="contact-ch-card"
                          href={ch.href}
                          target={ch.href.startsWith("http") ? "_blank" : undefined}
                          rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="contact-ch-card">{inner}</div>
                      )}
                    </Reveal>
                  );
                })}
              </div>

              <Reveal delay={120}>
                <aside className="contact-cta">
                  <span className="contact-cta-icon">{icons.whatsapp}</span>
                  <Typewriter as="h2" text={contact.whatsappCta.title} dot={false} />
                  <p>{contact.whatsappCta.text}</p>
                  <a
                    className="pill shimmer"
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.whatsappCta.label} <span aria-hidden="true">→</span>
                  </a>
                </aside>
              </Reveal>

              <Reveal>
                <div className="contact-social">
                  <h2>Connect elsewhere</h2>
                  <p>Find me across the web — follow for updates, work samples, and thoughts.</p>
                  <ul className="contact-social-list">
                    {contact.socials.map((s) => (
                      <li key={s.label}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer">
                          <span className="contact-social-icon">
                            {icons[CONTACT_SOCIAL_ICONS[s.label]] ?? icons.linkedin}
                          </span>
                          <span>{s.label}</span>
                          <span className="contact-social-arrow">{icons.arrow}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
