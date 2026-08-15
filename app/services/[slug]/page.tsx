import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import { services, siteUrl } from "@/lib/content";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${siteUrl}/services/${service.slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}#service`,
    name: service.title,
    description: service.metaDescription,
    serviceType: service.title,
    url: `${siteUrl}/services/${service.slug}`,
    areaServed: "Worldwide",
    provider: {
      "@type": "Person",
      name: "Shaikh Aryan Bilal",
      url: siteUrl,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema, faqSchema]) }}
      />
      <SiteNav />
      <main>
        <section className="section page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">
                <Link className="services-link" href="/services">
                  Services
                </Link>{" "}
                <span aria-hidden="true">/</span> {service.title}
              </p>
            </Reveal>
            <Reveal delay={60}>
              <Typewriter as="h1" className="section-title" text={service.title} dot />
            </Reveal>
            <Reveal delay={120}>
              <p className="services-hero">{service.hero}</p>
            </Reveal>

            <Reveal delay={180}>
              <p className="services-intro">{service.overview}</p>
            </Reveal>

            <Reveal>
              <h2 className="resume-section-title">
                What I build<span className="dot">.</span>
              </h2>
            </Reveal>
            <Reveal>
              <ul className="services-list">
                {service.whatIBuild.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="resume-section-title">
                How I work<span className="dot">.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="services-intro">{service.howIWork}</p>
            </Reveal>

            <Reveal>
              <h2 className="resume-section-title">
                Why it matters<span className="dot">.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="services-intro">{service.whyItMatters}</p>
            </Reveal>

            <Reveal>
              <h2 className="resume-section-title">
                Related work<span className="dot">.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="services-intro">
                You can see {service.title.toLowerCase()} projects I have completed on the{" "}
                <Link className="services-link" href="/resume">
                  Resume
                </Link>{" "}
                page, along with related{" "}
                <Link className="services-link" href="/certifications">
                  Certifications
                </Link>
                .
              </p>
            </Reveal>

            <Reveal>
              <h2 className="resume-section-title">
                FAQ<span className="dot">.</span>
              </h2>
            </Reveal>
            <div className="faq-list">
              {service.faq.map((f, i) => (
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
                {service.cta}{" "}
                <a className="services-link" href="#contact">
                  Let us talk
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
