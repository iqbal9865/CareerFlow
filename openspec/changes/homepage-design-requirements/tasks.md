## 1. Foundation and Design Tokens

- [ ] 1.1 Add CareerFlow brand CSS variables to `app/globals.css` (primary, accent, muted, section spacing)
- [ ] 1.2 Update `app/layout.tsx` metadata with CareerFlow title, description, and Open Graph tags
- [ ] 1.3 Create `components/homepage/` directory structure for section components
- [ ] 1.4 Create shared `Container` wrapper component with `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`

## 2. Navigation Header

- [ ] 2.1 Implement `Header` component with sticky positioning and CareerFlow logo/wordmark
- [ ] 2.2 Add desktop navigation links (Features, How It Works, Pricing) with anchor scroll behavior
- [ ] 2.3 Add auth CTAs ("Log in" link and "Get started" primary button)
- [ ] 2.4 Implement mobile hamburger menu with open/close toggle and Escape key support
- [ ] 2.5 Add skip-to-main-content link as first focusable element

## 3. Hero Section

- [ ] 3.1 Implement `Hero` component with H1 headline, subheadline, and CTA button group
- [ ] 3.2 Add primary CTA linking to sign-up route and secondary "Learn more" anchor link
- [ ] 3.3 Add product screenshot/mockup panel with descriptive alt text
- [ ] 3.4 Implement responsive layout (stacked mobile, two-column desktop)

## 4. Features Section

- [ ] 4.1 Implement `Features` section with `id="features"` anchor and section heading
- [ ] 4.2 Create `FeatureCard` sub-component with inline SVG icon, title, and description
- [ ] 4.3 Add three feature cards: application tracking, pipeline management, interview reminders
- [ ] 4.4 Implement responsive grid layout (1 col mobile, 2–3 col desktop)

## 5. Social Proof Section

- [ ] 5.1 Implement `SocialProof` section with distinct background treatment
- [ ] 5.2 Add statistics row with at least two metrics and labels
- [ ] 5.3 Add testimonial card(s) with quote, author name, and role
- [ ] 5.4 Add closing "Get started" CTA band at bottom of section

## 6. Footer

- [ ] 6.1 Implement `Footer` component with Product and Company link columns
- [ ] 6.2 Add copyright line with dynamic current year and CareerFlow brand name
- [ ] 6.3 Add Privacy Policy and Terms of Service links
- [ ] 6.4 Implement mobile stacked layout for footer columns

## 7. Page Assembly and Accessibility

- [ ] 7.1 Compose all sections in `app/page.tsx`, replacing create-next-app placeholder
- [ ] 7.2 Wrap page content in semantic `<main>` landmark with proper heading hierarchy
- [ ] 7.3 Verify WCAG AA color contrast in both light and dark modes
- [ ] 7.4 Verify 44px minimum touch targets on mobile interactive elements
- [ ] 7.5 Test keyboard navigation: tab order, focus rings, skip link, mobile menu

## 8. Final Review

- [ ] 8.1 Run `npm run build` to confirm no TypeScript or build errors
- [ ] 8.2 Visual QA at mobile (375px), tablet (768px), and desktop (1280px) breakpoints
- [ ] 8.3 Confirm all spec scenarios are satisfied via manual checklist walkthrough
