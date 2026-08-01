import Image from "next/image";
import type { Home } from "@/lib/types";

export default function Hero({ home }: { home: Home }) {
  const { hero } = home;

  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-tagline">{hero.tagline}</p>
          <h1 className="hero-name">{hero.name}</h1>
          <p className="hero-lede">{hero.lede}</p>
          <div className="hero-cta">
            <a className="cta" href={hero.cta.href}>
              {hero.cta.label}
            </a>
            <a className="cta-outline" href={hero.ctaSecondary.href}>
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>
        <div className="hero-media">
          <div className="hero-photo">
            <Image
              src={hero.portrait}
              alt={hero.name}
              fill
              priority
              sizes="(max-width: 640px) 300px, 420px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
