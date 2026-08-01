import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Shaikh Aryan Bilal",
};

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="section page-head page-top">
          <div className="wrap">
            <Reveal>
              <p className="kicker">{contact.kicker}</p>
            </Reveal>
            <Reveal>
              <h1 className="section-title">
                {contact.title}
                <span className="dot">.</span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="lede">{contact.lede}</p>
            </Reveal>

            <div className="contact-grid">
              <Reveal>
                <div className="contact-info">
                  <h2>Get in Touch</h2>
                  <p>{contact.location}</p>
                  <p>{contact.hours}</p>
                  <p>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </p>
                  <p>
                    <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
                  </p>
                  <div className="contact-socials">
                    {contact.socials.map((s) => (
                      <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="contact-form-wrap">
                  <h2>{contact.form.heading}</h2>
                  <ContactForm contact={contact} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
