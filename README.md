# Frank Gualdrón — Portfolio

A personal engineering portfolio built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. Three case studies (not project cards), a real Server Action behind the contact form, generated OG images per page, and a design system built from actual theme tokens instead of inline styles.

Live: _pending custom domain — see [Deploying to Vercel](#deploying-to-vercel)_
Background: [`PORTFOLIO_AUDIT.md`](./PORTFOLIO_AUDIT.md), [`REDESIGN_PLAN.md`](./REDESIGN_PLAN.md), [`CONTENT_REVIEW.md`](./CONTENT_REVIEW.md) document the audit, the rebuild plan, and the content-accuracy pass this project went through, in that order.

---

## Project description

This repo was rebuilt from scratch after an earlier version of the site was found to be non-functional — its core components were empty files and its git history was gone. Rather than patch that, the project restarted with a documented audit, a redesign plan, and phased implementation, each committed separately. What's here now is the result: a 4-route site (Home, Work, three case studies, Contact) with no client-side framework beyond what each interactive piece actually needs, a single accent-color design system with real light/dark parity, and copy that's checked against the author's CV so the portfolio and the CV tell the same story.

## Tech stack, and why

| Choice | Why this and not something else |
|---|---|
| **Next.js 16 (App Router)** | Server Components by default keep client JS to only what's interactive (nav, form, theme toggle, scroll reveals). File-based conventions (`robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx`) cover the entire SEO surface without a plugin. It's also the framework the target companies (Vercel, and Vercel-adjacent shops) build and hire for — using it correctly is itself a signal. |
| **TypeScript, strict, no `.js`/`.jsx` files** | The previous version mixed `.js` and `.jsx` with zero domain typing. Every file here is `.ts`/`.tsx`; `content/projects.ts` and `content/profile.ts` are fully typed, so a malformed case study fails at compile time, not at runtime in front of a recruiter. |
| **Tailwind CSS v4** | Used as intended: theme tokens defined once in `app/globals.css` via `@theme`, consumed as utility classes everywhere. No inline `style={{}}` objects except the handful of places (generated OG images, a computed progress width) where the value is genuinely dynamic and CSS can't express it statically. |
| **`motion` (Framer Motion's successor)** | One thin wrapper (`components/motion/Reveal.tsx`) around `whileInView`, used for a single scroll-reveal effect and nothing else. No page transitions, no looping animations, no decorative motion. Respects `prefers-reduced-motion`. |
| **`zod`** | Server-side validation for the contact form. Chosen over hand-rolled validation because the schema doubles as the TypeScript type for form data — one definition, not two. |
| **`lucide-react`** | Replaced emoji-as-icons from the previous version. Tree-shakeable, consistent stroke width, and real `aria-hidden`/`aria-label` support. GitHub/LinkedIn marks are hand-written SVGs in `components/icons/BrandIcons.tsx` — lucide dropped trademarked brand logos in its v1, so there was no drop-in replacement. |
| **No CMS, no MDX, no i18n library, no state library** | Three case studies and one profile don't need a content management layer — `content/*.ts` are plain typed modules, editable with full autocomplete and zero runtime cost. No global client state exists beyond a couple of local `useState` calls (menu open, theme). Adding any of these before they're needed would be exactly the kind of unnecessary abstraction this project explicitly avoided (see `REDESIGN_PLAN.md`). |

## Key features

- **Case studies, not project cards.** Every project page follows Problem → Approach → Challenges → Result → What I learned, sourced from the author's actual CV — not marketing copy (`CONTENT_REVIEW.md` documents the fact-check pass).
- **A contact form that works without JavaScript.** `app/contact/actions.ts` is a Server Action with `zod` validation and a honeypot field; the form posts and validates correctly with JS disabled, and layers in `aria-live` status and inline field errors when it's enabled.
- **Generated OG images per route**, including one per case study (`app/opengraph-image.tsx`, `app/work/[slug]/opengraph-image.tsx`), so sharing any link produces a real preview instead of a blank card.
- **Real light/dark parity.** Every color is a CSS custom property overridden under `[data-theme="dark"]`; no component branches on theme, they all just consume the same token names.
- **Keyboard-complete.** Visible `:focus-visible` rings everywhere (including on the contact form's inputs, which lost their default outline), a mobile nav with a real focus trap and `Escape`-to-close, and a skip-to-content link.
- **Zero unnecessary client JS.** Pages are Server Components unless a file starts with `"use client"` for a specific, named reason (form state, menu open/close, theme, one motion wrapper).

## Project structure

```
app/
  layout.tsx              Root layout: fonts, metadata, JSON-LD, theme script
  page.tsx                Home (composes components/home/*)
  globals.css             Design tokens (@theme), light/dark overrides
  robots.ts / sitemap.ts / manifest.ts     SEO file conventions
  opengraph-image.tsx / icon.tsx / apple-icon.tsx   Generated images (next/og)
  work/
    page.tsx              Case study index
    [slug]/page.tsx        One case study
    [slug]/opengraph-image.tsx
  contact/
    page.tsx
    actions.ts             Server Action: zod validation + Formspree

components/
  ui/          Primitives with no knowledge of content: Button, Badge, Container, SectionHeading
  layout/      Header, Footer, MobileNav, ThemeToggle, BackToTop
  home/        Hero, About, FeaturedWork, ContactCta — composed only on the home page
  work/        ProjectCard, CaseStudyHeader, CaseStudyBody
  contact/     ContactForm
  motion/      Reveal — the one scroll-reveal wrapper, used everywhere motion appears
  icons/       BrandIcons — GitHub/LinkedIn marks lucide-react doesn't ship

content/
  profile.ts    Name, role, bio, stack, social links — typed, no JSX
  projects.ts   Project[] with case-study fields + getProjectBySlug/getProjectStaticParams

lib/
  cn.ts             Tiny classnames joiner
  styles.ts         Shared Tailwind fragments (icon button, hover card) used across components
  validation.ts     zod schema for the contact form
  structured-data.ts  JSON-LD builder
  site.ts           Resolves the canonical site URL (env var → Vercel → localhost)
  og-image.tsx      Shared frame/colors/monogram for generated icons and OG images
  theme-script.ts   Pre-hydration inline script that sets the theme before first paint
```

**The rule that keeps this from rotting:** `content/` never imports React — it's data. `components/ui/` never imports from `content/` — primitives stay generic. Only `app/*/page.tsx` files import both and wire them together. Changing copy never touches a component; changing a primitive's look never touches copy.

## Running locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs with zero environment variables set — see below for what's optional.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (eslint-config-next, core-web-vitals + typescript)
```

## Environment variables

None are required to build or run the site. Copy `.env.example` to `.env.local` only if you want to override a default:

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Inferred from `VERCEL_PROJECT_PRODUCTION_URL` on Vercel, `http://localhost:3000` otherwise | Canonical URL used in `metadataBase`, `sitemap.xml`, `robots.txt`, and JSON-LD. Only set this to force a specific domain (e.g. a custom domain Vercel doesn't know about yet). |
| `FORMSPREE_ENDPOINT` | No | The hardcoded endpoint in `app/contact/actions.ts` | Points the contact form at a different Formspree form — useful for a staging/preview form separate from production. Not a secret (Formspree endpoints are the public POST target of a plain HTML form). |

## Deploying to Vercel

1. Push this repo to GitHub (see below).
2. In Vercel, **Add New → Project**, import the GitHub repo. Framework preset (Next.js) is auto-detected — no build command overrides needed.
3. Leave environment variables unset for the first deploy. `NEXT_PUBLIC_SITE_URL` will fall back to Vercel's own `VERCEL_PROJECT_PRODUCTION_URL`, so sitemap/OG/robots are already correct against the `*.vercel.app` domain.
4. If a custom domain is attached later, add `NEXT_PUBLIC_SITE_URL=https://<your-domain>` in Project Settings → Environment Variables and redeploy, so metadata doesn't keep pointing at the Vercel-assigned domain.
5. Before it's shared publicly, replace the two known placeholders in `content/profile.ts`: the LinkedIn URL (`TU_USUARIO`) and, once available, a live demo link for WeatherNow in `content/projects.ts`.

No other configuration is required — `next.config.ts` is intentionally left at defaults because nothing in the project needs custom headers, redirects, or image domains.

## Code conventions

- **100% TypeScript**, strict mode. No `any` in application code; `content/*.ts` types (`Profile`, `Project`) are the contract every component renders against.
- **No inline styles** outside of `next/og` image generation (which can't read CSS) and the skill-bar-style cases where a value is computed at render time. Everything else is Tailwind utilities built from the token system in `app/globals.css`.
- **Server Components by default**; a file only gets `"use client"` when it owns interactive state (`ContactForm`, `MobileNav`, `ThemeToggle`, `Reveal`) — checked per component, not applied at the layout level.
- **Shared class fragments, not copy-pasted Tailwind strings.** Where the exact same utility string showed up in more than a couple of places (an icon-button shape, a hover-bordered card), it's a named export from `lib/styles.ts`, composed with `cn()` at each call site rather than re-typed.
- **Comments explain *why*, not *what*.** They show up only where the reasoning isn't obvious from the code itself — e.g. why the mobile nav is portaled to `document.body` (a `backdrop-blur` ancestor otherwise breaks `position: fixed` sizing), or why OG image colors are hardcoded literals instead of theme tokens (`next/og` can't read CSS custom properties).
- **ESLint clean, always.** `npm run lint` and `tsc --noEmit` are run after every change in this project's history — not a pre-commit hook yet, but zero warnings has been the bar throughout.

## SEO and accessibility

**SEO**
- Per-route `metadata` exports (`title`, `description`) — the previous version shared one `<title>` across every page.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` via Next's file conventions.
- Dynamically generated Open Graph images for the home page and every case study (`next/og`), so link previews always match the actual page.
- JSON-LD `Person` schema in the root layout (`lib/structured-data.ts`).
- Semantic HTML: one `<h1>` per page, landmark elements (`header`/`nav`/`main`/`footer`), no heading-level skips.

**Accessibility**
- Visible `:focus-visible` rings on every interactive element, including form inputs (which had their native outline removed and needed an explicit replacement).
- Keyboard-complete mobile navigation: focus moves into the panel on open, `Tab`/`Shift+Tab` are trapped inside it, `Escape` closes it and returns focus to the trigger.
- Contact form: labeled inputs, `aria-invalid`/`aria-describedby` wired to real per-field errors, submission state announced via `aria-live`/`role="alert"`, and a honeypot field that's invisible to sighted and screen-reader users alike (not just visually hidden).
- `prefers-reduced-motion: reduce` is respected globally (`app/globals.css`) and specifically inside the one motion component (`components/motion/Reveal.tsx`).
- Both theme modes were built with contrast in mind from the token level up, not adjusted after the fact per component.

## Architectural decisions worth knowing

- **Content is data, not JSX.** `content/profile.ts` and `content/projects.ts` hold every piece of copy on the site as typed objects. No component ever hardcodes a sentence of copy — this is what makes the CV-accuracy pass in `CONTENT_REVIEW.md` a content-only diff, not a component rewrite.
- **The contact form is a Server Action, not a client `fetch`.** The previous version called Formspree directly from client-side JavaScript, putting the endpoint in the browser bundle and skipping server-side validation entirely. `app/contact/actions.ts` validates with `zod` on the server and the form works with JavaScript disabled (progressive enhancement), which a client-only `fetch` call cannot do.
- **Design tokens live in one place, deliberately.** Every color, in both themes, is a named CSS custom property in `app/globals.css`'s `@theme` block. No component branches on `dark:` conditionally — they all read `bg-bg`, `text-fg-muted`, etc., and the token's value changes under `[data-theme="dark"]`. Changing the accent color site-wide is a one-line edit.
- **Case studies are statically generated**, not fetched at request time — `generateStaticParams` in `app/work/[slug]/page.tsx` (shared with its OG image route via `getProjectStaticParams` in `content/projects.ts`) pre-renders all three at build time, since the set of projects doesn't change per request.
- **No i18n, on purpose, for now.** The previous version had a language toggle with no persistence and a `<html lang>` that never matched the selected language — a real accessibility and SEO bug. Given the target companies (international, English-first), English-only was the deliberate choice for v1 rather than fixing that half-built system; see `REDESIGN_PLAN.md` §2 for the full reasoning and the migration path (`next-intl` with real `/en /es` routes) if it's ever needed.

## Planned improvements

- [ ] Replace the LinkedIn placeholder (`content/profile.ts`) once the account is unrestricted.
- [ ] Add a live demo link for WeatherNow (`content/projects.ts`) once it's redeployed.
- [ ] Add real screenshots/GIFs of all three projects — currently every case study is text-only, which is a known gap (`PORTFOLIO_AUDIT.md` §1.6).
- [ ] Link a downloadable résumé PDF from the header/footer.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final custom domain once one is attached.
- [ ] Revisit bilingual support with `next-intl` and real per-locale routes, if there's a concrete need for it (not before).
- [ ] A minimal Playwright smoke test for the contact form's happy and error paths — deferred deliberately for v1 (see `REDESIGN_PLAN.md` §2), worth adding once the content stabilizes.

## License

Code is available under the [MIT License](./LICENSE). The content — case study text, bio, and any personal branding — is not: it describes one specific person's real experience and isn't offered for reuse.
