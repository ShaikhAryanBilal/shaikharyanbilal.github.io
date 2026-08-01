import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { home } from "@/lib/content";

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero home={home} />

        <section className="section" id="about">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{home.kicker}</p>
            </Reveal>
            <Reveal>
              <h2 className="section-title">
                About<span className="dot">.</span>
              </h2>
            </Reveal>
            <div className="about-copy">
              {home.about.map((p, i) => (
                <Reveal key={i} delay={(i % 3) * 60}>
                  <p>{p}</p>
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
