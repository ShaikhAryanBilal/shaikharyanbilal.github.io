import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Shaikh Aryan Bilal",
};

export default function ServicesPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="section page-head page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{services.kicker}</p>
            </Reveal>
            <Reveal>
              <h1 className="section-title">
                {services.title}
                <span className="dot">.</span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="lede lede-strong">{services.subtitle}</p>
            </Reveal>
            <Reveal>
              <p className="lede">{services.lede}</p>
            </Reveal>

            <div className="svc-list">
              {services.services.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 80}>
                  <a className="svc-card" href={`/${s.slug}`}>
                    <span className="svc-num">{s.num}</span>
                    <div className="svc-body">
                      <h2>{s.title}</h2>
                      <p>{s.description}</p>
                      <ul className="svc-bullets">
                        {s.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                      <span className="svc-link">
                        Learn more <span className="svc-arrow" aria-hidden="true">→</span>
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="svc-block">
                <h2>{services.whyChooseUs.heading}</h2>
                <p>{services.whyChooseUs.text}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <Reveal>
          <section className="cta-strip">
            <div className="wrap cta-strip-inner">
              <h2>{services.ready.heading}</h2>
              <p>{services.ready.text}</p>
              <Link className="cta" href="/contact">
                Contact us
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
