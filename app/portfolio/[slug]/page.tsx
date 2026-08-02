import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import { work } from "@/lib/content";
import type { Block } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return work.projects.filter((p) => !p.hidden).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = work.projects.find((x) => x.slug === slug);
  return { title: p ? `${p.title} — Shaikh Aryan Bilal` : "Portfolio" };
}

function Block({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="case-figure">
          <Image src={block.src} alt="" fill sizes="(max-width: 900px) 100vw, 820px" />
        </figure>
      );
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = work.projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const formattedDate = new Date(p.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <>
      <SiteNav />
      <main>
        <article className="section page-top">
          <div className="wrap">
            <Link className="case-back" href="/portfolio">
              <span aria-hidden="true">←</span> Back to portfolio
            </Link>

            <header className="case-head">
              <div className="case-tags">
                {p.tags.map((tag, i) => (
                  <span key={tag} className={i === 0 ? "tag-pill hot" : "tag-pill"}>
                    {tag}
                  </span>
                ))}
                <span className="work-year">{formattedDate}</span>
              </div>
              <h1 className="case-title">{p.title}</h1>
              {p.excerpt ? <p className="case-excerpt">{p.excerpt}</p> : null}

              <div className="case-meta">
                <div>
                  <p className="case-meta-label">Client</p>
                  <p className="case-meta-value">{p.site}</p>
                </div>
                <div>
                  <p className="case-meta-label">Date</p>
                  <p className="case-meta-value">{formattedDate}</p>
                </div>
                <div>
                  <p className="case-meta-label">Stack</p>
                  <p className="case-meta-value">{p.tags.join(" · ")}</p>
                </div>
              </div>
            </header>

            {p.image && (
              <figure className="case-hero">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 1080px"
                />
              </figure>
            )}

            {p.body.length > 0 && (
              <div className="case-body">
                {p.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            )}

            <p className="case-tags-foot">
              {p.tags.map((tag, i) => (
                <span key={tag} className={i === 0 ? "tag-pill hot" : "tag-pill"}>
                  {tag}
                </span>
              ))}
            </p>
          </div>
        </article>
      </main>
      <ContactSection />
      <SiteFooter />
    </>
  );
}
