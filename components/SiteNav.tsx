"use client";

import { site } from "@/lib/content";

export default function SiteNav() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    document.getElementById("themeToggle")?.setAttribute("aria-pressed", next === "light" ? "true" : "false");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="logo" href="#top">
          {site.name}
          <span className="dot">.</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {site.nav.map((link) => (
            <span
              key={link.href}
              className={link.children ? "nav-item has-children" : "nav-item"}
            >
              <a href={link.href}>{link.label}</a>
              {link.children && (
                <ul className="nav-dropdown">
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <a href={child.href}>{child.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </span>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            id="themeToggle"
            type="button"
            aria-label="Switch theme"
            onClick={toggle}
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
            {site.cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
