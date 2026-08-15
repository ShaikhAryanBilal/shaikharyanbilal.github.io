import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import CertGrid from "@/components/CertGrid";
import { certifications, siteUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "22 professional certifications earned by Shaikh Aryan Bilal across backend development, web application security, penetration testing, ethical hacking and related fields.",
  keywords: [
    "Shaikh Aryan Bilal certifications",
    "web application security certification",
    "penetration testing certificate",
    "ethical hacking certification",
    "backend developer certifications",
    "Laravel certification",
    "web security certifications",
  ],
  alternates: {
    canonical: "/certifications",
  },
};

export default function CertificationsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Certifications",
        item: `${siteUrl}/certifications`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SiteNav />
      <main>
        <section className="section page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{certifications.kicker}</p>
            </Reveal>
            <Reveal delay={60}>
              <Typewriter as="h1" className="section-title" text={certifications.title} dot />
            </Reveal>
            <Reveal delay={120}>
              <p className="lede">{certifications.lede}</p>
            </Reveal>

            <div className="cert-grid">
              <CertGrid images={certifications.images} />
            </div>
          </div>
        </section>
      </main>
      <ContactSection />
      <SiteFooter />
    </>
  );
}
