import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import { workHistory, siteUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Work history, projects, skills and education of Shaikh Aryan Bilal, a backend-focused web software engineer with 6+ years of experience in PHP, Laravel, WordPress, Strapi and web security.",
  keywords: [
    "Shaikh Aryan Bilal resume",
    "Laravel developer resume",
    "PHP backend developer",
    "web software engineer Karachi",
    "WordPress developer CV",
    "backend engineer portfolio",
  ],
  alternates: {
    canonical: "/resume",
  },
};

export default function WorkHistoryPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Resume", item: `${siteUrl}/resume` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SiteNav />
      <main>
        <section className="section page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{workHistory.kicker}</p>
            </Reveal>
            <Reveal delay={60}>
              <Typewriter as="h1" className="section-title" text={workHistory.title} dot />
            </Reveal>
            <Reveal delay={120}>
              <p className="lede">{workHistory.lede}</p>
            </Reveal>

            <Reveal>
              <p className="resume-summary">{workHistory.summary}</p>
            </Reveal>

            <Reveal>
              <Typewriter as="h2" className="resume-section-title" text="Core skills" dot />
            </Reveal>
            <Reveal>
              <div className="skill-sections">
                {workHistory.skills.map((s) => (
                  <div key={s.category} className="skill-section">
                    <h3>{s.category}</h3>
                    <ul className="skill-pills">
                      {s.skills.map((skill) => (
                        <li key={skill} className="skill-pill">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <Typewriter as="h2" className="resume-section-title" text="Work experience" dot />
            </Reveal>
            <div className="exp-list">
              {workHistory.experience.map((exp, i) => (
                <Reveal key={exp.company} delay={(i % 2) * 60}>
                  <div className="exp-item">
                    <h3 className="exp-company">{exp.company}</h3>
                    {exp.roles.map((r) => (
                      <div key={r.role} className="exp-role">
                        <div className="exp-role-head">
                          <h4>{r.role}</h4>
                          <span className="exp-period">{r.period}</span>
                        </div>
                        <ul className="exp-points">
                          {r.points.map((p, j) => (
                            <li key={j}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <Typewriter as="h2" className="resume-section-title" text="Projects" dot />
            </Reveal>
            <div className="project-list">
              {workHistory.projects.map((p, i) => (
                <Reveal key={p.name} delay={(i % 2) * 60}>
                  <div className="project-item">
                    <h3>{p.name}</h3>
                    {p.org && <p className="project-org">{p.org}</p>}
                    {p.note && <p className="project-note">{p.note}</p>}
                    <ul className="exp-points">
                      {p.points.map((pt, j) => (
                        <li key={j}>{pt}</li>
                      ))}
                    </ul>
                    {p.stack && (
                      <p className="project-stack">
                        <strong>Stack:</strong> {p.stack}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <Typewriter as="h2" className="resume-section-title" text="Education" dot />
            </Reveal>
            <Reveal>
              <ul className="edu-list">
                {workHistory.education.map((e) => (
                  <li key={e.degree}>
                    <strong>{e.degree}</strong> — {e.school}
                    <span className="edu-period"> ({e.period})</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <Typewriter as="h2" className="resume-section-title" text="Certifications" dot />
            </Reveal>
            <Reveal>
              <ul className="edu-list">
                {workHistory.certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <Typewriter as="h2" className="resume-section-title" text="Languages" dot />
            </Reveal>
            <Reveal>
              <ul className="edu-list">
                {workHistory.languages.map((l) => (
                  <li key={l.language}>
                    <strong>{l.language}</strong> — {l.level}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <ContactSection />
      <SiteFooter />
    </>
  );
}
