## Why

CareerFlow's frontend is a fresh Next.js scaffold with the default create-next-app placeholder. Before building features, we need a shared, documented design contract for the marketing homepage so implementation aligns with product positioning, user journeys, and visual identity. Defining requirements now prevents ad-hoc UI decisions and gives designers and engineers a single source of truth.

## What Changes

- Replace the placeholder homepage intent with formal design requirements for a CareerFlow marketing landing page
- Define required page sections, content hierarchy, and primary user actions (sign up, sign in, learn more)
- Establish visual design constraints: typography, color usage, spacing, responsive breakpoints, and accessibility baselines
- Specify component-level behavior for navigation, hero, feature blocks, social proof, and footer
- Document non-goals for v1 (e.g., no authenticated dashboard on homepage, no dynamic CMS content)

## Capabilities

### New Capabilities

- `homepage-navigation`: Header layout, logo placement, primary/secondary nav links, and auth CTAs with mobile menu behavior
- `homepage-hero`: Above-the-fold value proposition, headline hierarchy, supporting copy, and primary conversion actions
- `homepage-features`: Product capability highlights, iconography, and section layout for explaining CareerFlow's core value
- `homepage-social-proof`: Trust signals including stats, testimonials, or partner logos to build credibility
- `homepage-footer`: Site footer with legal links, secondary navigation, and brand attribution
- `homepage-responsive-accessibility`: Cross-breakpoint layout rules, touch targets, contrast, keyboard navigation, and semantic structure

### Modified Capabilities

<!-- No existing specs in openspec/specs/ — greenfield project -->

## Impact

- **Code**: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`; new components under `app/` or `components/`
- **Assets**: CareerFlow logo, feature icons, optional hero illustration or screenshot
- **Metadata**: Page title, description, and Open Graph tags in root layout
- **Dependencies**: No new npm packages required for v1; Tailwind CSS 4 and existing Geist fonts are sufficient
- **Systems**: Static marketing page only; no backend API integration in initial scope
