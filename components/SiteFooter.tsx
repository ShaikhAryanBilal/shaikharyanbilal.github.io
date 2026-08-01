import { site } from "@/lib/content";

export default function SiteFooter() {
  const contact = site.contact;
  return (
    <footer className="footer">
      <div className="foot-contact">
        <div className="foot-inner foot-contact-grid">
          <div className="foot-block">
            <span className="foot-label">Location</span>
            <span>{contact.location}</span>
          </div>
          <div className="foot-block">
            <span className="foot-label">Phone</span>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
          </div>
          <div className="foot-block">
            <span className="foot-label">E-mail</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div className="foot-block">
            <span className="foot-label">Hours</span>
            <span>{contact.hours}</span>
          </div>
        </div>
      </div>
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
