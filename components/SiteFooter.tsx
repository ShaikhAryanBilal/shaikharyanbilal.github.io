import { site } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="foot-inner foot-bar">
        <span>{site.footer.copyright}</span>
        <div className="socials">
          {site.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
        <span className="foot-note">{site.footer.note}</span>
      </div>
    </footer>
  );
}
