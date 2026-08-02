import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import { workHistory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
};

export default function WorkHistoryPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="section page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{workHistory.kicker}</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="section-title">
                {workHistory.title}
                <span className="dot">.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede">{workHistory.lede}</p>
            </Reveal>

            <Reveal>
              <p className="resume-summary">{workHistory.summary}</p>
            </Reveal>

            <Reveal>
              <h2 className="resume-section-title">
                Core skills<span className="dot">.</span>
              </h2>
            </Reveal>
            <Reveal>
              <div className="skill-sections">
                {workHistory.skills.map((s, i) => (
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
              <h2 className="resume-section-title">
                Work experience<span className="dot">.</span>
              </h2>
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
              <h2 className="resume-section-title">
                Projects<span className="dot">.</span>
              </h2>
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
              <h2 className="resume-section-title">
                Education<span className="dot">.</span>
              </h2>
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
              <h2 className="resume-section-title">
                Certifications<span className="dot">.</span>
              </h2>
            </Reveal>
            <Reveal>
              <ul className="edu-list">
                {workHistory.certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="resume-section-title">
                Languages<span className="dot">.</span>
              </h2>
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
