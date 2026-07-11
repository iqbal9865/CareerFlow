## Context

CareerFlow is a job-search productivity platform that helps users track applications, manage pipelines, and stay organized during their career transition. The frontend is a Next.js 16 App Router project with React 19, Tailwind CSS 4, and Geist fonts. The current `app/page.tsx` is the create-next-app default placeholder with no product branding or marketing content.

This change defines design requirements only — not full implementation. The homepage serves unauthenticated visitors: job seekers evaluating whether to sign up. Primary conversion goal is registration; secondary is learning about product features.

**Constraints:**
- Static content for v1 (no CMS, no API calls on homepage)
- Existing stack only (Next.js, Tailwind, TypeScript)
- Mobile-first responsive design
- WCAG 2.1 AA accessibility baseline

## Goals / Non-Goals

**Goals:**
- Establish a cohesive visual language and page structure for the CareerFlow marketing homepage
- Define section-by-section content hierarchy and interaction patterns
- Enable incremental implementation via isolated, testable components
- Support light and dark mode via existing CSS variable approach

**Non-Goals:**
- Authenticated user dashboard or application tracking UI
- Backend integration, analytics instrumentation, or A/B testing infrastructure
- Internationalization (i18n) in v1
- Blog, pricing page, or multi-page marketing site (homepage only)
- Custom illustration or animation library dependencies

## Decisions

### 1. Component architecture: section-based composition

**Decision:** Split homepage into discrete section components (`Header`, `Hero`, `Features`, `SocialProof`, `Footer`) composed in `app/page.tsx`.

**Rationale:** Each section maps to a spec capability, can be built and reviewed independently, and aligns with OpenSpec task breakdown.

**Alternatives considered:**
- Single monolithic page component — rejected; harder to test and maintain
- Page builder / CMS-driven sections — rejected; over-engineered for v1 static content

### 2. Layout system: centered container with max-width

**Decision:** Use a consistent content container (`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`) for all sections except full-bleed hero background.

**Rationale:** Matches modern SaaS landing page conventions; works well with Tailwind utilities already in the project.

### 3. Design tokens: extend existing CSS variables

**Decision:** Define CareerFlow brand tokens in `globals.css` (`--color-primary`, `--color-accent`, `--color-muted`, section spacing scale) rather than introducing a component library.

**Rationale:** Zero new dependencies; Tailwind 4 `@theme inline` already maps CSS variables to utilities.

**Alternatives considered:**
- shadcn/ui — deferred; adds dependency before design is validated
- Hardcoded Tailwind colors — rejected; harder to maintain brand consistency

### 4. Navigation: sticky header with mobile drawer

**Decision:** Sticky top navigation with logo left, links center (desktop), auth CTAs right. Mobile uses hamburger menu revealing a slide-down or overlay panel.

**Rationale:** Standard SaaS pattern; keeps sign-up accessible while scrolling.

### 5. Hero visual: product screenshot over illustration

**Decision:** Hero includes a product UI screenshot or mockup panel rather than abstract illustration.

**Rationale:** CareerFlow is a utility product; showing the actual interface builds trust faster than generic career imagery.

### 6. Typography: Geist Sans hierarchy

**Decision:** Use existing Geist Sans with defined scale: H1 (3xl–5xl), H2 (2xl–3xl), body (base/lg), caption (sm).

**Rationale:** Font already loaded in layout; no FOUT or additional network requests.

### 7. Imagery and icons: inline SVG icons

**Decision:** Feature section icons as inline SVG components; no icon font library.

**Rationale:** Keeps bundle small; SVGs are accessible and themeable.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Brand colors not yet finalized | Use placeholder primary (`#2563eb` blue) with token names; swap value in one CSS file later |
| Product screenshot unavailable at build time | Use styled placeholder panel with skeleton UI; swap asset when ready |
| Content copy not approved | Use clearly marked placeholder copy in components; specs define structure not final wording |
| Dark mode contrast issues | Test all sections against WCAG AA; specs require 4.5:1 text contrast |
| Scope creep into multi-page site | Non-goals documented; footer links can point to `#` placeholders |

## Migration Plan

Not applicable — greenfield homepage replacing placeholder. Deployment is standard Next.js static/SSR build with no data migration.

**Rollout:**
1. Implement sections behind feature-complete static page
2. Update `layout.tsx` metadata (title, description, OG tags)
3. Remove create-next-app placeholder content from `page.tsx`

## Open Questions

1. **Final brand palette** — Is there an existing CareerFlow brand guide, or should we propose one during implementation?
2. **Auth route paths** — What are the sign-up and sign-in URL paths (`/signup`, `/login`, or external)?
3. **Social proof content** — Real user testimonials and metrics, or placeholder content for launch?
4. **Hero CTA copy** — "Get started free" vs "Start tracking applications" — product/marketing decision needed
