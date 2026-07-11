## ADDED Requirements

### Requirement: Hero section occupies above-the-fold priority

The homepage SHALL render a hero section as the first content block below the header, designed to fit primary messaging within the initial viewport on common desktop and mobile screens.

#### Scenario: Hero is first content section

- **WHEN** the homepage loads
- **THEN** the hero section appears immediately below the header before any other content section

### Requirement: Hero communicates core value proposition

The hero SHALL display a primary headline (H1), supporting subheadline, and at least one primary call-to-action button.

#### Scenario: Headline hierarchy

- **WHEN** the hero section renders
- **THEN** exactly one H1 element contains the main value proposition
- **AND** a supporting paragraph appears below the H1 with secondary messaging

### Requirement: Hero primary CTA drives registration

The hero SHALL include a primary CTA button labeled for user acquisition (e.g., "Get started free") that links to the sign-up route.

#### Scenario: Primary CTA is actionable

- **WHEN** the user clicks the hero primary CTA
- **THEN** the browser navigates to the sign-up page

### Requirement: Hero includes secondary action

The hero SHALL include a secondary action (text link or ghost button) for users who want to learn more before signing up.

#### Scenario: Secondary action scrolls to features

- **WHEN** the user clicks the secondary "Learn more" action
- **THEN** the page scrolls to the features section

### Requirement: Hero displays product visual

The hero SHALL include a product screenshot, mockup, or styled placeholder panel showing the CareerFlow application interface.

#### Scenario: Visual supports messaging

- **WHEN** the hero section renders on desktop (≥ 1024px)
- **THEN** the product visual appears alongside or below the headline in a two-column or stacked layout
- **AND** the visual has alt text describing the product interface
