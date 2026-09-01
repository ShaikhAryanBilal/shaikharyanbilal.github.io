import { contact } from "@/lib/content";
import { icons, CONTACT_SOCIAL_ICONS } from "@/components/icons";
import Typewriter from "@/components/Typewriter";

const PANEL_SOCIALS = ["LinkedIn", "GitHub"];

export default function ContactSection() {
  const links = [
    { icon: icons.email, href: `mailto:${contact.email}`, label: contact.email },
    { icon: icons.phone, href: `tel:${contact.phone.replace(/\s+/g, "")}`, label: contact.phone },
    { icon: icons.whatsapp, href: contact.whatsapp, label: "WhatsApp" },
  ];

  return (
    <section className="contact-panel" id="contact" aria-label="Contact">
      <div className="wrap">
        <div className="contact-panel-inner">
          <div className="contact-panel-grid">
            <div>
              <p className="kicker">Get in touch</p>
              <Typewriter as="h2" className="contact-panel-title" text="Let's work together" dot />
              <p className="contact-panel-lede">{contact.lede}</p>

              <div className="contact-links">
                {links.map((l) => (
                  <a key={l.label} className="contact-link" href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    <span className="contact-link-icon">{l.icon}</span>
                    <span>{l.label}</span>
                  </a>
                ))}
                {contact.socials
                  .filter((s) => PANEL_SOCIALS.includes(s.label) && CONTACT_SOCIAL_ICONS[s.label])
                  .map((s) => (
                    <a key={s.label} className="contact-link" href={s.url} target="_blank" rel="noopener noreferrer">
                      <span className="contact-link-icon">{icons[CONTACT_SOCIAL_ICONS[s.label]]}</span>
                      <span>{s.label}</span>
                    </a>
                  ))}
              </div>
            </div>

            <div>
              <div className="contact-whatsapp">
                <span className="contact-whatsapp-icon">{icons.whatsapp}</span>
                <Typewriter as="h3" text={contact.whatsappCta.title} />
                <p>{contact.whatsappCta.text}</p>
                <a className="pill shimmer" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  {contact.whatsappCta.label} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
