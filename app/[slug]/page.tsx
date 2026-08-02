import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/content";

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
  const svc = services.services.find((s) => s.slug === slug);
  return { title: svc ? `${svc.title} — Shaikh Aryan Bilal` : "Services" };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = services.services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const { detail } = svc;

  return (
    <>
      <SiteNav />
      <main>
        <section className="section page-head page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">
                {services.kicker} · {svc.num}
              </p>
            </Reveal>
            <Reveal>
              <h1 className="section-title">
                {svc.title}
                <span className="dot">.</span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="lede lede-strong">{detail.subtitle}</p>
            </Reveal>
            <Reveal>
              <p className="lede">{detail.intro}</p>
            </Reveal>

            <Reveal>
              <h2 className="svc-block-heading">What&apos;s included</h2>
              <ul className="svc-bullets">
                {detail.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <div className="svc-block">
                <h2>{detail.readyHeading}</h2>
                <p>{detail.ready}</p>
                <Link className="cta" href="/contact">
                  Contact us
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <ContactSection />
      <SiteFooter />
    </>
  );
}
