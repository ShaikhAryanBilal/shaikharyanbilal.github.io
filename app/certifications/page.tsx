import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import CertGrid from "@/components/CertGrid";
import { certifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certifications",
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
