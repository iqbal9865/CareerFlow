## ADDED Requirements

### Requirement: Social proof section builds credibility

The homepage SHALL include a social proof section containing at least one of: user statistics, testimonials, or trust badges.

#### Scenario: Section renders trust content

- **WHEN** the social proof section loads
- **THEN** at least two trust signals are visible (e.g., a stat counter and a testimonial quote)

### Requirement: Statistics highlight product traction

If statistics are shown, the section SHALL display at least two numeric metrics with labels (e.g., "Applications tracked", "Active users").

#### Scenario: Stats are readable

- **WHEN** the statistics render
- **THEN** each stat displays a large numeric value and a descriptive label below it

### Requirement: Testimonials include attribution

If testimonials are shown, each quote SHALL include the author's name and role or context.

#### Scenario: Testimonial structure

- **WHEN** a testimonial card renders
- **THEN** it displays a quote, author name, and author role or company

### Requirement: Social proof section is visually distinct

The social proof section SHALL use a background treatment (muted fill, border, or alternate surface color) to differentiate it from adjacent sections.

#### Scenario: Visual separation

- **WHEN** the user scrolls through the homepage
- **THEN** the social proof section is visually distinguishable from the features section above and footer below

### Requirement: Social proof includes final conversion CTA

The social proof section or an adjacent closing CTA band SHALL include a repeated "Get started" button for users who scrolled past the hero.

#### Scenario: Bottom-of-page conversion

- **WHEN** the user reaches the social proof or closing CTA area
- **THEN** a primary CTA button linking to sign-up is visible
