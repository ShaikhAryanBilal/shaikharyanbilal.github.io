import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import { work } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio — Shaikh Aryan Bilal",
};

export default function PortfolioPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="section page-head page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{work.kicker}</p>
            </Reveal>
            <Reveal>
              <h1 className="section-title">
                {work.title}
                <span className="dot">.</span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="lede">{work.lede}</p>
            </Reveal>

            <div className="work-grid">
              {work.projects.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <article className="work-card">
                    {p.image && (
                      <Link
                        href={`/web-development-projects/${p.slug}`}
                        className="thumb-link"
                        aria-label={p.title}
                      >
                        <div className="thumb">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="(max-width: 900px) 50vw, 33vw"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="card-meta">
                      <span>{p.category}</span>
                      <span>{p.date.slice(0, 4)}</span>
                    </div>
                    <h3>
                      <Link href={`/web-development-projects/${p.slug}`}>{p.title}</Link>
                    </h3>
                    {p.excerpt ? <p>{p.excerpt}</p> : null}
                    <p className="tags">{p.tags.join(" · ")}</p>
                    <Link
                      className="card-link"
                      href={`/web-development-projects/${p.slug}`}
                    >
                      View project
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
