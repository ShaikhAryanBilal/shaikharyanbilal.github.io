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
        <figure className="project-figure">
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
        <article className="section page-head page-top">
          <div className="wrap">
            <Link className="project-back" href="/portfolio">
              <span aria-hidden="true">←</span> Back to portfolio
            </Link>

            <header className="project-head">
              <h1 className="section-title">{p.title}</h1>
              <div className="project-meta">
                <span>{formattedDate}</span>
                <span>{p.site}</span>
              </div>
              {p.excerpt ? <p className="project-excerpt">{p.excerpt}</p> : null}
            </header>

            {p.image && (
              <figure className="project-hero">
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
              <div className="project-body">
                {p.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            )}

            <p className="project-tags">{p.tags.join(" · ")}</p>
          </div>
        </article>
      </main>
      <ContactSection />
      <SiteFooter />
    </>
  );
}
