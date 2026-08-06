# Portfolio — Frank Gualdron

Personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## Stack

- **Next.js 16** (App Router, Server Actions, Server Components by default)
- **TypeScript** — strict mode, no untyped files
- **Tailwind CSS v4** — theme tokens (light/dark) in `app/globals.css`, no ad-hoc inline styles
- **motion** — scroll-reveal only, via `components/motion/Reveal.tsx`
- **zod** — contact form validation
- **lucide-react** — icon set (brand logos for GitHub/LinkedIn are local SVGs in `components/icons`, since lucide dropped trademarked marks)

## Structure

```
app/            routes, metadata, SEO file conventions (robots, sitemap, manifest, OG images)
components/     ui/ (primitives) · layout/ · home/ · work/ · contact/ · motion/
content/        typed content modules (profile.ts, projects.ts) — no CMS, no MDX
lib/            validation, structured data, small utilities
```

See `PORTFOLIO_AUDIT.md` and `REDESIGN_PLAN.md` for the reasoning behind this structure.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before deploying

A few things are intentionally left as placeholders — grep for `TODO` or check:

- `content/profile.ts` — LinkedIn URL is a placeholder
- `lib/site.ts` — `siteUrl` is a placeholder, used for `metadataBase`, sitemap and robots
- `content/projects.ts` — case-study challenges/learnings are a first draft; review before publishing
- No resume/CV is linked yet

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
