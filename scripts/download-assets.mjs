#!/usr/bin/env node
/**
 * Download remote assets locally, then rewrite content/*.json srcs to local
 * paths so the site is fully self-hosted.
 *
 * Project images are pulled from the live WordPress.com API so each project
 * gets its *correct* featured + ordered body screenshots (fixes duplicated/
 * wrong images), organized project-wise:
 *
 *   public/images/projects/<slug>/hero.webp     featured / thumbnail
 *   public/images/projects/<slug>/<n>.webp      body screenshots in order
 *
 * Usage: node scripts/download-assets.mjs
 * Reads:  content/work.json, content/certifications.json, content/home.json
 * Writes: public/images/portrait.jpg, public/images/certifications/*,
 *         public/images/projects/<slug>/*.webp
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, statSync } from "node:fs";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMG = join(ROOT, "public", "images");
const PROJECTS_DIR = join(IMG, "projects");

const POSTS_API =
  "https://public-api.wordpress.com/rest/v1.1/sites/shaikharyanbilal.wordpress.com/posts/";
const PORTRAIT_URL =
  "https://shaikharyanbilal.wordpress.com/wp-content/uploads/2024/03/profile-site-icon.jpg";
const PORTRAIT_OUT = join(IMG, "portrait.jpg");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readJson(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}
function writeJson(p, data) {
  writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

function safeExt(u) {
  const e = extname(new URL(u).pathname).toLowerCase();
  return /^\.(jpe?g|png|webp|gif|svg)$/.test(e) ? e : ".jpg";
}

async function download(url, outPath) {
  if (existsSync(outPath)) {
    console.log(`skip  ${url} -> ${outPath} (exists)`);
    return;
  }
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL  ${res.status} ${url}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buf);
  const kb = (buf.length / 1024).toFixed(1);
  console.log(`ok    ${kb}KB ${url} -> ${outPath}`);
  return true;
}

async function downloadWebp(url, outPath, width, quality = 82) {
  if (existsSync(outPath)) {
    console.log(`skip  ${url} -> ${outPath} (exists)`);
    return;
  }
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL  ${res.status} ${url}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(dirname(outPath), { recursive: true });
  const tmp = join(dirname(outPath), `.${extname(outPath) || ".tmp"}.${Date.now()}.src`);
  writeFileSync(tmp, buf);
  await sharp(tmp).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(outPath);
  rmSync(tmp, { force: true });
  const kb = (statSync(outPath).size / 1024).toFixed(1);
  console.log(`ok    ${kb}KB webp ${url} -> ${outPath}`);
  return true;
}

async function fetchPosts() {
  let all = [];
  let page = 1;
  let total = 0;
  do {
    const r = await fetch(`${POSTS_API}?number=100&page=${page}&fields=slug,featured_image,content`);
    const j = await r.json();
    if (j.error) throw new Error(JSON.stringify(j));
    all = all.concat(j.posts || []);
    total = j.found || 0;
    page++;
  } while (page <= Math.ceil(total / 100) && page < 20);
  return all;
}

function orderedImages(content) {
  const urls = [
    ...content.matchAll(
      /https:\/\/shaikharyanbilal\.wordpress\.com\/wp-content\/uploads\/[^"'() ]+/g
    ),
  ].map((m) => m[0].split("?")[0]);
  return [...new Set(urls)];
}

async function main() {
  // Portrait
  await download(PORTRAIT_URL, PORTRAIT_OUT);

  // Projects: correct images per post, organized project-wise
  const workPath = join(ROOT, "content", "work.json");
  const work = readJson(workPath);
  const posts = await fetchPosts();
  const bySlug = Object.fromEntries(work.projects.map((p) => [p.slug, p]));
  let changed = 0;

  for (const post of posts) {
    const project = bySlug[post.slug];
    if (!project) continue;

    const dir = join(PROJECTS_DIR, post.slug);
    const featUrl = (post.featured_image || "").split("?")[0];
    const hero = featUrl
      ? `/images/projects/${post.slug}/hero.webp`
      : project.image;
    if (featUrl) {
      await downloadWebp(`${featUrl}?w=1200`, join(dir, "hero.webp"), 1200);
    }

    const imgs = orderedImages(post.content);
    const local = imgs.map((u, i) => ({
      src: `/images/projects/${post.slug}/${i + 1}.webp`,
      url: `${u}?w=1600`,
      name: `${i + 1}.webp`,
    }));
    for (const li of local) {
      await downloadWebp(li.url, join(dir, li.name), 1600);
    }

    project.image = hero;
    let idx = 0;
    const newBody = [];
    for (const block of project.body) {
      if (block.type === "image") {
        if (idx < local.length) newBody.push({ type: "image", src: local[idx++].src });
      } else {
        newBody.push(block);
      }
    }
    while (idx < local.length) {
      newBody.push({ type: "image", src: local[idx++].src });
    }
    project.body = newBody;
    changed++;
    await sleep(100);
  }
  writeJson(workPath, work);
  console.log(`rewrote ${changed} project images (project-wise, webp)`);

  // Certification images
  const certPath = join(ROOT, "content", "certifications.json");
  const certs = readJson(certPath);
  let certChanged = 0;
  const certImgs = [];
  for (const url of certs.images || []) {
    const base = new URL(url).pathname.split("/").pop();
    const ext = safeExt(url);
    const local = `/images/certifications/${base.replace(/\.[^.]+$/, "")}${ext}`;
    const out = join(IMG, "certifications", `${base.replace(/\.[^.]+$/, "")}${ext}`);
    const ok = await download(url, out);
    if (ok !== false) {
      certImgs.push(local);
      certChanged++;
    } else {
      certImgs.push(url);
    }
  }
  certs.images = certImgs;
  writeJson(certPath, certs);
  console.log(`rewrote ${certChanged} certification images to local paths`);

  // Home portrait reference
  const homePath = join(ROOT, "content", "home.json");
  const home = readJson(homePath);
  home.hero.portrait = "/images/portrait.jpg";
  writeJson(homePath, home);
  console.log("home.hero.portrait -> /images/portrait.jpg");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
