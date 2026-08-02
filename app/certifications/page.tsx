import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import { certifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certifications — Shaikh Aryan Bilal",
};

export default function CertificationsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="section page-head page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{certifications.kicker}</p>
            </Reveal>
            <Reveal>
              <h1 className="section-title">
                {certifications.title}
                <span className="dot">.</span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="lede">{certifications.lede}</p>
            </Reveal>

            <div className="cert-grid">
              {certifications.images.map((src, i) => (
                <Reveal key={src} delay={(i % 3) * 80}>
                  <figure className="cert-card">
                    <Image
                      src={src}
                      alt="Certification"
                      fill
                      sizes="(max-width: 900px) 50vw, 33vw"
                    />
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ContactSection />
      <SiteFooter />
    </>
  );
}
