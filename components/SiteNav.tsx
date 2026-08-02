"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/content";

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    document.getElementById("themeToggle")?.setAttribute("aria-pressed", next === "light" ? "true" : "false");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className={scrolled ? "nav scrolled" : "nav"}>
      <nav className="nav-inner" aria-label="Primary">
        <Link className="logo" href="/">
          {site.name}
          <span className="dot">.</span>
        </Link>

        <ul className="nav-links">
          {site.nav.map((link) => (
            <li key={link.href}>
              <Link className={isActive(link.href) ? "nav-link on" : "nav-link"} href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            id="themeToggle"
            type="button"
            aria-label="Switch theme"
            onClick={toggleTheme}
          >
            <svg
              className="icon-moon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg
              className="icon-sun"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4" />
            </svg>
          </button>
          <a className="pill" href={site.cta.href}>
            {site.cta.label} <span aria-hidden="true">→</span>
          </a>
          <button
            className="nav-burger"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu open">
          <ul>
            {site.nav.map((link) => (
              <li key={link.href}>
                <a
                  className={isActive(link.href) ? "on" : ""}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mobile-cta">
              <a className="pill" href={site.cta.href} onClick={() => setMenuOpen(false)}>
                {site.cta.label} →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
