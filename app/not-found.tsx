import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you are looking for could not be found on the portfolio of Shaikh Aryan Bilal, web software engineer.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="section page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">404</p>
            </Reveal>
            <Reveal delay={60}>
              <Typewriter as="h1" className="section-title" text="Page not found" dot />
            </Reveal>
            <Reveal delay={120}>
              <p className="lede">
                The page you are looking for does not exist or has been moved.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="services-cta">
                <Link className="services-link" href="/">
                  Back to home
                </Link>{" "}
                or browse{" "}
                <Link className="services-link" href="/services">
                  services
                </Link>
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
