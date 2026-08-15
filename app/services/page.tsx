import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import { services, siteUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Backend development services from Shaikh Aryan Bilal with 6+ years of experience. Laravel, PHP, WordPress and Strapi development, REST and GraphQL APIs, web security audits, migrations, performance optimization and ongoing support.",
  keywords: [
    "Laravel development services",
    "PHP backend development",
    "WordPress development services",
    "Strapi development",
    "API development services",
    "web security audit",
    "backend performance optimization",
    "website migration services",
  ],
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Backend Web Development",
    provider: {
      "@type": "Person",
      name: "Shaikh Aryan Bilal",
      url: siteUrl,
      sameAs: [
        "https://www.linkedin.com/in/shaikh-aryan-bilal/",
        "https://github.com/ShaikhAryanBilal/",
      ],
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development Services",
      itemListElement: services.offers.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.title },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: services.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, faqSchema]) }}
      />
      <SiteNav />
      <main>
        <section className="section page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{services.kicker}</p>
            </Reveal>
            <Reveal delay={60}>
              <Typewriter as="h1" className="section-title" text={services.title} dot />
            </Reveal>
            <Reveal delay={120}>
              <p className="services-hero">{services.hero}</p>
            </Reveal>

            <Reveal delay={180}>
              <p className="services-intro">{services.intro}</p>
            </Reveal>

            <Reveal delay={240}>
              <h2 className="resume-section-title">
                What I offer<span className="dot">.</span>
              </h2>
            </Reveal>
            <div className="services-grid">
              {services.offers.map((o, i) => (
                <Reveal key={o.slug} delay={(i % 3) * 80}>
                  <Link className="service-card" href={`/services/${o.slug}`}>
                    <h3>{o.title}</h3>
                    <p>{o.text}</p>
                    <span className="service-card-link">
                      Learn more <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="resume-section-title">
                A bit about my background<span className="dot">.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="services-intro">
                I have worked on 29 projects and hold 22 certifications across backend development
                and related fields. You can see examples of past work on my{" "}
                <Link className="services-link" href="/resume">
                  Resume
                </Link>{" "}
                page and view my full list of certifications on the{" "}
                <Link className="services-link" href="/certifications">
                  Certifications
                </Link>{" "}
                page.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="resume-section-title">
                Why work with me<span className="dot">.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="services-intro">{services.whyWorkWithMe}</p>
            </Reveal>

            <Reveal>
              <h2 className="resume-section-title">
                FAQ<span className="dot">.</span>
              </h2>
            </Reveal>
            <div className="faq-list">
              {services.faq.map((f, i) => (
                <Reveal key={f.q} delay={(i % 2) * 60}>
                  <div className="faq-item">
                    <h3>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="services-cta">
                {services.cta}{" "}
                <a className="services-link" href="#contact">
                  Let us talk about it
                </a>
                .
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <ContactSection />
      <SiteFooter />
    </>
  );
}
