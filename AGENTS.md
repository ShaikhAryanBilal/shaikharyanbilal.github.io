# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Copilot Workspace, etc.)
working in this repository. Read this fully before making changes.

## Project Overview

- **Type:** Personal portfolio website
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (auto-deploys on push to `main`)
- **Package manager:** npm

## Setup Commands

```bash
npm install          # install dependencies
npm run dev           # start local dev server (localhost:3000)
npm run build          # production build (run before assuming changes work)
npm run lint            # run ESLint
```

Always run `npm run build` after non-trivial changes to catch type errors
and broken imports before considering a task done. Do not just rely on
`npm run dev` working — dev mode is more forgiving than build.

## Project Structure

```
app/
  layout.tsx            # root layout — shared across all pages
  page.tsx              # homepage
  certifications/page.tsx
  contact/page.tsx
  portfolio/
    page.tsx            # portfolio listing
    [slug]/page.tsx     # project detail pages (SSG via generateStaticParams)
components/             # reusable UI components
  ThemeInit.tsx         # theme init script injected into <head> via useServerInsertedHTML (no-FOUC)
lib/                    # helpers, utils, data fetching
content/                # content as JSON: site, home, work, certifications, contact
public/
  images/               # static images, referenced via next/image
next.config.ts
tailwind.config.ts
```

Content lives in `content/*.json` and is edited directly — all page copy is driven by these files, so edit JSON, not components.

If you add new top-level folders (e.g. `hooks/`, `types/`), update this
section so future agent runs stay accurate.

## Code Style Rules

- Use TypeScript everywhere — no new `.js`/`.jsx` files.
- Functional components only, no class components.
- Prefer Server Components by default. Only add `"use client"` when a
  component genuinely needs interactivity (state, effects, event handlers).
- Use the `@/*` import alias instead of relative `../../../` paths.
- Tailwind for styling — do not introduce a second styling system (no CSS
  modules, no styled-components) unless explicitly asked.
- Keep components small and single-purpose. If a component file exceeds
  ~150 lines, consider splitting it.
- Images: always use `next/image`, never a raw `<img>` tag.
- Don't add new dependencies unless necessary — check if something can be
  done with what's already installed first.

## Content & Data

- Project entries live in [describe where: e.g. `src/content/projects/*.mdx`
  or a `projects.ts` data file]. When adding a new project, follow the exact
  shape of existing entries — don't invent new frontmatter/field names
  without updating the type definition too.
- Keep image assets under ~300KB; prefer `.webp`. Place under
  `public/images/projects/`.

## Career Content & Resume Rule

- The master resume lives at `resume/Shaikh-Aryan-Bilal-Resume.md` and is
  tracked in git.
- Whenever a change touches career detail content on the site — work
  history/resume page data (`content/workHistory.json`), experience, skills,
  education, certifications, projects, or roles/periods — ask the user
  whether they want the resume file updated to match. Ask before doing it;
  if they decline, leave the resume untouched.

## What NOT to Do

- Do not modify `next.config.ts` deployment-related settings (e.g. `output`,
  `basePath`) without asking — this project deploys to Vercel and doesn't
  need static export config.
- Do not add a CMS, database, or auth system unless explicitly requested —
  this is a static/content-driven portfolio, keep it simple.
- Do not commit `.env` files or secrets.
- Do not run `git push` or open PRs automatically — prepare changes and let
  the user review/commit unless told otherwise.
- Never run long-running commands (e.g. `npm run dev`, starting a server,
  `npm install`) unless explicitly asked.
- Never push to `main` unless the user explicitly says so.
- Do not reformat/rewrite files unrelated to the current task "while you're
  in there" — keep diffs scoped to what was asked.

## Testing / Validation Checklist

Before considering a task complete:
1. `npm run build` succeeds with no errors.
2. `npm run lint` passes (fix warnings you introduced).
3. New/changed pages are manually sane — check that routes resolve, no
   obvious layout breakage, images load.
4. If you touched shared components (`layout.tsx`, nav, footer), confirm
   other pages that use them still render correctly.

## Deployment Notes

- Pushing to `main` triggers an automatic GitHub Pages deploy via
  `.github/workflows/deploy.yml` (static export via `output: "export"`).
- **Prerequisite (one-time, manual):** repo Settings → Pages → Source must be
  **"GitHub Actions"**, NOT "Deploy from a branch". If it's left on branch,
  GitHub's built-in Jekyll deployment overrides the Actions artifact and the
  site serves the README instead of the exported site. Verify after enabling:
  no "pages build and deployment" workflow should appear in the Actions list.
- The build output is written to `out/` and published by the Pages action.
- Live URL: https://shaikharyanbilal.github.io (source repo:
  `ShaikhAryanBilal/shaikharyanbilal.github.io`).
- The live `siteUrl` is defined in `lib/content.ts` — update it there, not
  per-file, when the domain changes.

## Efficiency Notes for Agents

- Don't re-scaffold the project structure or re-init config files that
  already exist — check first.
- Don't ask the user for information already answered in this file
  (framework, styling approach, package manager, deploy target).
- When unsure about a design/content decision (e.g. wording, exact colors,
  which projects to feature), ask — don't invent portfolio content on the
  user's behalf.
- Prefer editing existing components over creating near-duplicate new ones..