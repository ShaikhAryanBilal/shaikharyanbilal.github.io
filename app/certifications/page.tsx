import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import CertLightbox from "@/components/CertLightbox";
import { certifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certifications — Shaikh Aryan Bilal",
};

export default function CertificationsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="section page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{certifications.kicker}</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="section-title">
                {certifications.title}
                <span className="dot">.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede">{certifications.lede}</p>
            </Reveal>

            <div className="cert-grid">
              <CertLightbox images={certifications.images} />
            </div>
          </div>
        </section>
      </main>
      <ContactSection />
      <SiteFooter />
    </>
  );
}
