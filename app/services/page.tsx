import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import { services, siteUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: `${services.seoTitle} | Shaikh Aryan Bilal`,
  },
  description: services.seoDescription,
  keywords: [
    "Custom REST API Development",
    "Laravel Backend Developer",
    "Custom WordPress Plugin Development",
    "Strapi Headless CMS Developer",
    "Scalable Application Architecture",
    "Secure PHP Backend Engineer",
    "Legacy PHP Codebase Migration",
    "MySQL Query Performance Optimization",
    "Multi-Tenant SaaS Backend Architecture",
    "OWASP Compliant Web Development",
    "Generative AI API Integration",
    "Redis Cache & Queue Implementation",
    "Laravel Developer in Karachi",
    "Freelance Backend Engineer Pakistan",
    "Remote PHP Developer Karachi",
    "Hire Dedicated Laravel Developer",
  ],
  openGraph: {
    title: `${services.seoTitle} | Shaikh Aryan Bilal`,
    description: services.seoDescription,
    url: `${siteUrl}/services`,
  },
  twitter: {
    title: `${services.seoTitle} | Shaikh Aryan Bilal`,
    description: services.seoDescription,
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Backend Engineering & Custom API Development",
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
              <p className="services-overview">{services.overview}</p>
            </Reveal>

            {services.pageSections.map((section) => (
              <Reveal key={section.heading}>
                <h2 className="resume-section-title">
                  {section.heading}
                  <span className="dot">.</span>
                </h2>
                {section.intro && <p className="services-intro">{section.intro}</p>}
                <div className="services-grid">
                  {section.subsections.map((sub, i) => (
                    <Reveal key={sub.heading} delay={(i % 3) * 80}>
                      <Link className="service-card" href={`/services/${sub.slug}`}>
                        <h3>{sub.heading}</h3>
                        <p>{sub.text}</p>
                        <span className="service-card-link">
                          Learn more <span aria-hidden="true">→</span>
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            ))}

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
