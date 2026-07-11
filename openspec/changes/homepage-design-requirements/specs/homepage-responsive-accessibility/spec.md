## ADDED Requirements

### Requirement: Homepage supports responsive breakpoints

The homepage SHALL render correctly at mobile (< 768px), tablet (768px–1023px), and desktop (≥ 1024px) breakpoints without horizontal scrolling.

#### Scenario: No horizontal overflow

- **WHEN** the homepage renders at any supported viewport width
- **THEN** no horizontal scrollbar appears due to layout overflow

### Requirement: Touch targets meet minimum size

All interactive elements (buttons, links, menu toggle) SHALL have a minimum touch target of 44×44 CSS pixels on mobile viewports.

#### Scenario: Mobile button sizing

- **WHEN** the homepage renders on a viewport < 768px
- **THEN** all primary buttons and the mobile menu toggle have at least 44px height

### Requirement: Color contrast meets WCAG AA

All body text and interactive elements SHALL meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text and UI components).

#### Scenario: Text is readable

- **WHEN** the homepage renders in light or dark mode
- **THEN** body text against its background meets a 4.5:1 contrast ratio

### Requirement: Page uses semantic HTML landmarks

The homepage SHALL use semantic elements: `<header>`, `<main>`, `<section>`, `<footer>`, and a single `<h1>`.

#### Scenario: Landmark navigation

- **WHEN** a screen reader user navigates by landmarks
- **THEN** header, main content, and footer landmarks are available

### Requirement: Skip navigation link is provided

The homepage SHALL include a visually hidden "Skip to main content" link as the first focusable element.

#### Scenario: Skip link bypasses header

- **WHEN** the user activates the skip link via keyboard
- **THEN** focus moves to the main content area, bypassing the navigation header

### Requirement: Dark mode respects system preference

The homepage SHALL support dark mode via `prefers-color-scheme` media query, consistent with the existing `globals.css` approach.

#### Scenario: System dark mode

- **WHEN** the user's OS is set to dark mode
- **THEN** the homepage renders with dark background and light text tokens

### Requirement: Focus indicators are visible

All focusable elements SHALL display a visible focus ring when navigated via keyboard.

#### Scenario: Keyboard focus visibility

- **WHEN** the user tabs through interactive elements
- **THEN** each focused element shows a visible outline or ring distinct from its default state

### Requirement: Page metadata supports SEO and sharing

The root layout metadata SHALL be updated from the create-next-app defaults to CareerFlow-specific title and description.

#### Scenario: Browser tab shows product name

- **WHEN** the homepage loads
- **THEN** the browser tab title reads "CareerFlow" with a descriptive subtitle
- **AND** a meta description tag describes the product for search engines
