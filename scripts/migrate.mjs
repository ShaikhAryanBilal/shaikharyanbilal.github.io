#!/usr/bin/env node
/**
 * Migrate WordPress WXR export -> structured JSON content (content/*.json)
 * + a remote-asset manifest (plans/assets-manifest.json) for the download phase.
 *
 * The content structure mirrors the site's actual navigation:
 *   Home (/), Portfolio, Certifications, Services (+ 3 detail pages), Contact.
 *
 * Usage: node scripts/migrate.mjs
 * Reads:  plans/shaikharyanbilal.WordPress.2026-08-01.xml
 * Writes: content/{site,home,work,services,certifications,contact}.json,
 *         plans/assets-manifest.json
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "plans", "shaikharyanbilal.WordPress.2026-08-01.xml");
const OUT = join(ROOT, "content");
const MANIFEST = join(ROOT, "plans", "assets-manifest.json");

// ---------------------------------------------------------------------------
// Parsing helpers
// ---------------------------------------------------------------------------
const xml = readFileSync(SRC, "utf8");

function decodeCDATA(s) {
  return (s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(html) {
  return (html || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<\/li>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanUrl(u) {
  return u.split("?")[0];
}

function extractImgSrcs(html) {
  const srcs = [];
  const re = /<img[^>]+src="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) srcs.push(m[1]);
  return srcs;
}

function parseBlocks(content) {
  const blocks = [];
  const seenImgs = new Set();
  const blockRe = /<(p|h[23]|ul)[^>]*>([\s\S]*?)<\/\1>|<img[^>]*>/gi;
  let m;
  while ((m = blockRe.exec(content)) !== null) {
    const tag = m[1];
    if (tag === "img" || (m[0] && m[0].startsWith("<img"))) {
      const srcRe = /<img[^>]+src="([^"]+)"/.exec(m[0]);
      if (srcRe) {
        const u = srcRe[1];
        const base = cleanUrl(u);
        if (!seenImgs.has(base)) {
          seenImgs.add(base);
          blocks.push({ type: "image", src: u });
        }
      }
      continue;
    }
    if (tag === "p") {
      const text = stripTags(m[2]);
      if (text) blocks.push({ type: "p", text });
      continue;
    }
    if (tag === "h2" || tag === "h3") {
      const text = stripTags(m[2]);
      if (text) blocks.push({ type: tag, text });
      continue;
    }
    if (tag === "ul") {
      const items = [];
      const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
      let lm;
      while ((lm = liRe.exec(m[2])) !== null) {
        const t = stripTags(lm[1]);
        if (t) items.push(t);
      }
      if (items.length) blocks.push({ type: "list", items });
    }
  }
  return blocks;
}

const items = [];
const itemRe = /<item>([\s\S]*?)<\/item>/g;
let im;
while ((im = itemRe.exec(xml)) !== null) {
  const b = im[1];
  const grab = (re) => {
    const mm = re.exec(b);
    return mm ? decodeCDATA(mm[1]).trim() : "";
  };
  const contentRaw = decodeCDATA((/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/.exec(b) || [])[1]);
  const excerptRaw = decodeCDATA((/<excerpt:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/excerpt:encoded>/.exec(b) || [])[1]);
  const cats = [];
  const catRe = /<category domain="category" nicename="([^"]+)"[^>]*>/g;
  let cm;
  while ((cm = catRe.exec(b)) !== null) cats.push(cm[1]);

  items.push({
    id: grab(/<wp:post_id>(\d+)<\/wp:post_id>/),
    type: grab(/<wp:post_type><!\[CDATA\[([^\]]+)\]\]><\/wp:post_type>/),
    status: grab(/<wp:status><!\[CDATA\[([^\]]+)\]\]><\/wp:status>/),
    title: grab(/<title><!\[CDATA\[([^\]]+)\]\]><\/title>/),
    slug: grab(/<wp:post_name><!\[CDATA\[([^\]]+)\]\]><\/wp:post_name>/),
    date: grab(/<wp:post_date><!\[CDATA\[([^\]]+)\]\]><\/wp:post_date>/).slice(0, 10),
    cats,
    excerpt: excerptRaw,
    content: contentRaw,
    blocks: parseBlocks(contentRaw),
    images: [...new Set(extractImgSrcs(contentRaw).map(cleanUrl))],
  });
}

const byId = Object.fromEntries(items.map((i) => [i.id, i]));
const page = (id) => byId[id];

// ---------------------------------------------------------------------------
// Tech-tag heuristic
// ---------------------------------------------------------------------------
const TECH = [
  "WordPress", "PHP", "Laravel", "React", "Next.js", "Tailwind", "TypeScript",
  "JavaScript", "jQuery", "MySQL", "Node.js", "REST API", "WooCommerce",
  "Elementor", "Bootstrap", "Ajax", "GraphQL", "Docker", "AWS",
];
function detectTags(text) {
  const found = [];
  for (const t of TECH) {
    const re = new RegExp(`\\b${t.replace(/[.+]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) found.push(t);
  }
  return [...new Set(found)];
}

// ---------------------------------------------------------------------------
// Projects (published posts -> Portfolio)
// ---------------------------------------------------------------------------
function classify(cats) {
  if (cats.includes("mydeveloped")) return "Built by me";
  if (cats.includes("workedwith")) return "Built with a team";
  return "Website";
}

const projects = items
  .filter((i) => i.type === "post" && i.status === "publish")
  .map((p) => {
    const paras = p.blocks.filter((b) => b.type === "p").map((b) => b.text);
    const excerpt = stripTags(p.excerpt) || paras[0] || "";
    const imgBlocks = p.blocks.filter((b) => b.type === "image");
    return {
      slug: p.slug || `project-${p.id}`,
      title: p.title,
      site: p.title,
      date: p.date,
      category: classify(p.cats),
      excerpt,
      tags: detectTags(p.content),
      image: imgBlocks[0]?.src || null,
      body: p.blocks,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

// ---------------------------------------------------------------------------
// Home page (published page #34) -> hero + about
// ---------------------------------------------------------------------------
const homePage = page("34");
const bioParas = (homePage?.blocks || [])
  .filter((b) => b.type === "p")
  .map((b) => b.text);
const bio = bioParas.slice(1); // skip the short <strong> headline paragraph

// ---------------------------------------------------------------------------
// Services (overview #743 + detail pages #707/#728/#733)
// ---------------------------------------------------------------------------
const SERVICE_PAGES = {
  707: { slug: "website-design-and-development", title: "Website Design & Development" },
  728: { slug: "e-commerce-store-development", title: "E-Commerce Store Development" },
  733: { slug: "performance-optimization", title: "WordPress Performance Optimization" },
};

function walkDetail(blocks) {
  const ps = blocks.filter((b) => b.type === "p").map((b) => b.text);
  const bullets = [];
  for (const b of blocks) if (b.type === "list") bullets.push(...b.items);
  const readyHeading = ps.slice(2).find((p) => /^ready\b/i.test(p)) || "";
  const readyIdx = ps.indexOf(readyHeading);
  const ready = readyIdx >= 0 && readyIdx + 1 < ps.length ? ps[readyIdx + 1] : "";
  const cta =
    ps.find((p) => /^call or message/i.test(p)) ||
    "Call or Message: +92 347 2738186, Contact Us";
  return {
    subtitle: ps[0] || "",
    intro: ps[1] || "",
    bullets,
    readyHeading,
    ready,
    cta,
  };
}

const overview = page("743");
const ovBlocks = overview?.blocks || [];
const ovParas = ovBlocks.filter((b) => b.type === "p").map((b) => b.text);
const svcOrder = ovBlocks
  .filter((b) => b.type === "h3")
  .map((b) => b.text.replace(/^\d+\.\s*/, "").trim());

// map overview service order -> its paragraph description + list
const overviewBullets = ovBlocks.filter((b) => b.type === "list").map((b) => b.items);
const ovDescIdx = new Map(svcOrder.map((t, i) => [t, 2 + i])); // descriptions start at para index 2

const servicesList = svcOrder.map((title, i) => {
  const info = Object.values(SERVICE_PAGES).find((s) => s.title === title);
  if (!info) return null;
  const detail = walkDetail((page(Object.keys(SERVICE_PAGES).find((k) => SERVICE_PAGES[k].slug === info.slug)) || { blocks: [] }).blocks);
  return {
    num: String(i + 1).padStart(2, "0"),
    slug: info.slug,
    title: info.title,
    description: ovParas[ovDescIdx.get(title) ?? 2] || detail.subtitle,
    bullets: overviewBullets[i] || [],
    detail,
  };
}).filter(Boolean);

const services = {
  kicker: "Services",
  title: "Services",
  subtitle: ovParas[0] || "Elevate Your Online Presence with Our Comprehensive Web Solutions",
  lede: ovParas[1] || "We offer a range of expert services designed to help you create, enhance, and protect your online presence.",
  services: servicesList,
  whyChooseUs: {
    heading: "Why Choose Us?",
    text: ovParas.find((p) => p.startsWith("We are committed")) || "",
  },
  ready: {
    heading: "Ready to Elevate Your Online Presence?",
    text: ovParas.find((p) => p.startsWith("Contact us today")) || "",
    cta: ovParas.find((p) => p.startsWith("Call or Message")) || "Call or Message: +92 347 2738186, Contact Us",
  },
};

// ---------------------------------------------------------------------------
// Certifications (published page #144)
// ---------------------------------------------------------------------------
const certPage = page("144");
const certifications = {
  kicker: "Certifications",
  title: "Certifications",
  lede: (certPage?.blocks || []).find((b) => b.type === "p")?.text || "Here are some of my achievements.",
  images: certPage?.images || [],
};

// ---------------------------------------------------------------------------
// Contact (published page #7)
// ---------------------------------------------------------------------------
const contactPage = page("7");
const contactContent = contactPage?.content || "";
const contact = {
  kicker: "Contact",
  title: "Contact",
  lede:
    (contactPage?.blocks || []).find((b) => b.type === "p")?.text ||
    "Don't hesitate to reach out with the contact information below, or send a message using the form.",
  email: /mailto:([\w.+-]+@[\w-]+\.[\w.]+)/.exec(contactContent)?.[1] || "",
  phone: /tel:([+\d ]+)/.exec(contactContent)?.[1] || "",
  location: "Karachi, Pakistan",
  hours: "Available 24/7",
  whatsapp: "https://wa.me/923472738186",
  socials: [
    { label: "Facebook", url: "https://www.facebook.com/aryan.bilal.9" },
    { label: "Instagram", url: "https://www.instagram.com/shaikharyan12/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/shaikh-aryan-bilal/" },
    { label: "WhatsApp", url: "https://api.whatsapp.com/send?phone=923472738186" },
  ],
  form: {
    heading: "Send a Message",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "message", label: "Message", type: "textarea", required: true },
    ],
    submit: "Send",
  },
};

// ---------------------------------------------------------------------------
// Site metadata (channel + real navigation)
// ---------------------------------------------------------------------------
const SITE = {
  name: decodeCDATA((/<channel>[\s\S]*?<title>([^<]+)<\/title>/.exec(xml) || [])[1] || "Shaikh Aryan Bilal"),
  tagline: "Full-Stack WordPress Developer",
  location: "Karachi, Pakistan",
  hours: "Available 24/7",
  url: "",
  nav: [
    { label: "Home", href: "/" },
    { label: "Certifications", href: "/certifications" },
    { label: "Portfolio", href: "/web-development-projects" },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Website Design & Development", href: "/website-design-and-development" },
        { label: "E-Commerce Store Development", href: "/e-commerce-store-development" },
        { label: "WordPress Performance Optimization", href: "/performance-optimization" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Hire me", href: "/contact" },
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/shaikh-aryan-bilal/" },
    { label: "GitHub", url: "https://github.com/ShaikhAryanBilal/" },
    { label: "WhatsApp", url: "https://api.whatsapp.com/send?phone=923472738186" },
    { label: "Facebook", url: "https://www.facebook.com/aryan.bilal.9" },
    { label: "Instagram", url: "https://www.instagram.com/shaikharyan12/" },
  ],
  footer: {
    copyright: "© 2026 Shaikh Aryan Bilal",
    note: "Built with Next.js · Deployed on Vercel",
  },
  contact: {
    whatsapp: "https://wa.me/923472738186",
    email: "shaikharyan637@gmail.com",
    phone: "+92 347 2738186",
    location: "Karachi, Pakistan",
    hours: "Available 24/7",
  },
};

const home = {
  kicker: SITE.tagline,
  hero: {
    tagline: "Software Engineer",
    name: SITE.name,
    lede: "I'm a Web Software Engineer with 6+ years of experience designing and developing scalable, secure, and high-performing web applications.",
    cta: { label: "Send a message", href: "/contact" },
    ctaSecondary: { label: "View work", href: "/web-development-projects" },
    portrait: "/images/portrait.jpg",
  },
  about: bio,
};

const work = {
  kicker: "Portfolio",
  title: "Portfolio",
  lede: "Sites and applications I've built or shipped with a team. A selection — not everything.",
  projects,
};

// ---------------------------------------------------------------------------
// Asset manifest
// ---------------------------------------------------------------------------
const manifest = {
  generated: new Date().toISOString(),
  source: "shaikharyanbilal.WordPress.2026-08-01.xml",
  assets: [...new Set(items.flatMap((i) => i.images))].sort(),
};

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------
mkdirSync(OUT, { recursive: true });
// remove superseded files
for (const stale of ["writing.json", "hire.json"]) {
  rmSync(join(OUT, stale), { force: true });
}
const files = { site: SITE, home, work, services, certifications, contact };
for (const [name, data] of Object.entries(files)) {
  const path = join(OUT, `${name}.json`);
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  console.log(`wrote ${path}`);
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`wrote ${MANIFEST} (${manifest.assets.length} assets)`);
console.log(`projects: ${work.projects.length}, services: ${services.services.length}, certs: ${certifications.images.length}`);
