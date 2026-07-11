## ADDED Requirements

### Requirement: Sticky site header is visible on all viewports

The homepage SHALL display a sticky header that remains visible at the top of the viewport while the user scrolls.

#### Scenario: Header stays fixed on scroll

- **WHEN** the user scrolls down the homepage
- **THEN** the header remains pinned to the top of the viewport

### Requirement: Header displays CareerFlow branding

The header SHALL display the CareerFlow logo or wordmark on the left side, linking to the homepage root (`/`).

#### Scenario: Logo navigates home

- **WHEN** the user clicks the CareerFlow logo in the header
- **THEN** the browser navigates to the homepage root

### Requirement: Desktop navigation shows primary links

On viewports ≥ 768px, the header SHALL display horizontal navigation links for Features, How It Works, and Pricing (or equivalent section anchors).

#### Scenario: Nav link scrolls to section

- **WHEN** the user clicks a navigation link targeting an on-page section
- **THEN** the page scrolls smoothly to that section

### Requirement: Header provides authentication CTAs

The header SHALL display a "Log in" text link and a "Get started" primary button on the right side.

#### Scenario: Get started CTA is prominent

- **WHEN** the homepage loads on any viewport
- **THEN** the "Get started" button uses the primary brand color and is visually distinct from "Log in"

### Requirement: Mobile navigation uses accessible menu toggle

On viewports < 768px, navigation links SHALL be hidden behind a menu toggle button with an accessible label.

#### Scenario: Mobile menu opens and closes

- **WHEN** the user taps the menu toggle button on mobile
- **THEN** navigation links and auth CTAs become visible in an overlay or panel
- **AND** tapping the toggle again or pressing Escape closes the menu

#### Scenario: Menu toggle is keyboard accessible

- **WHEN** the user focuses the menu toggle and presses Enter or Space
- **THEN** the mobile menu opens or closes accordingly
