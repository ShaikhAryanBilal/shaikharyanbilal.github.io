import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import { work } from "@/lib/content";
import type { Project } from "@/lib/types";

export const metadata: Metadata = {
  title: "Portfolio — Shaikh Aryan Bilal",
};

const CLIENT_NAMES: Record<string, string> = {
  "kgnwt-org": "KGNWT",
  "khanbabamanpower-com": "Khanbaba Manpower",
  "urecruitment-org-ubaidullah-manpower-company": "URecruitment",
  "finedaily-com-finedaily-brand": "FineDaily",
  "braunhousehold-com-pk-braun-kitchenware": "Braun Household",
  "dental-clinic-template": "Veneto Clinic",
  "thestreetmark-com": "The Streetmark",
  "dawnbread-com-dawn-bread": "Dawn Bread",
  "morning-fresh-bread": "Morning Fresh Bread",
  "golfgreensdamac-com": "Golf Greens DAMAC",
  "unitedcanada-ca": "United Canada",
  "www-schlafenderhase-com": "Schlafender Hase",
  "dev-turningpt-digitalgrowthfactor-co-uk": "Turning Point",
  "rootssoftwares-com": "Roots Softwares",
  "ibagrads-com": "IBA Grads",
  "esl-digitalgiants-website": "MLI ESL",
  "mli2022-digitalgiants-website": "MLI Homestay",
  "ciss-digitalgiants-website": "CISS Canada",
  "bloomfinance-app": "Bloom Finance",
  "desertdudes-com": "Desert Dudes",
  "sajoskitchen-com": "Sajos Kitchen",
  "dolmen-atnr-com-pk-dolmen-mall-official-website": "Dolmen Malls",
  "fasterpakistan-com-faster-brand-website": "Faster Pakistan",
  "international-diabetes-ramadan-conference-2021-web-application":
    "International Diabetes & Ramadan Conference",
  "nadep-foot-conference-2020-web-application": "NADEP & Foot Conference",
  "bide-edu-pk-official-website-of-baqai-institute-of-diabetology-endocrinology":
    "BIDE — Baqai Institute of Diabetology & Endocrinology",
};

function clientName(p: Project): string {
  return CLIENT_NAMES[p.slug] ?? p.title;
}

export default function PortfolioPage() {
  const projects = work.projects.filter((p) => !p.hidden);
  const clients = work.projects.filter((p) => p.hidden);

  return (
    <>
      <SiteNav />
      <main>
        <section className="section page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{work.kicker}</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="section-title">
                {work.title}
                <span className="dot">.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede">{work.lede}</p>
            </Reveal>

            <div className="work-grid">
              {projects.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <article className="work-card">
                    {p.image && (
                      <Link
                        href={`/portfolio/${p.slug}`}
                        className="work-thumb"
                        aria-label={p.title}
                      >
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="(max-width: 900px) 50vw, 33vw"
                        />
                      </Link>
                    )}
                    <div className="work-body">
                      <div className="work-tags">
                        {p.tags.slice(0, 3).map((tag, t) => (
                          <span key={tag} className={t === 0 ? "tag-pill hot" : "tag-pill"}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3>
                        <Link href={`/portfolio/${p.slug}`}>{p.title}</Link>
                      </h3>
                      {p.excerpt ? <p className="work-excerpt">{p.excerpt}</p> : null}
                      <div className="work-foot">
                        <Link className="work-link" href={`/portfolio/${p.slug}`}>
                          View project <span aria-hidden="true">→</span>
                        </Link>
                        <span className="work-year">{p.date.slice(0, 4)}</span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {clients.length > 0 && (
          <section className="section clients-section">
            <div className="wrap">
              <Reveal>
                <h2 className="section-title">
                  Clients I&apos;ve worked with<span className="dot">.</span>
                </h2>
              </Reveal>
              <Reveal>
                <ul className="clients">
                  {clients.map((c) => (
                    <li key={c.slug}>{clientName(c)}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        )}
      </main>
      <ContactSection />
      <SiteFooter />
    </>
  );
}
