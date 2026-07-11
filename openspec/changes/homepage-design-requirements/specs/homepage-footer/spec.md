## ADDED Requirements

### Requirement: Footer displays on every homepage load

The homepage SHALL render a site footer as the last element on the page.

#### Scenario: Footer is last section

- **WHEN** the homepage fully loads
- **THEN** the footer appears after all content sections with no content below it

### Requirement: Footer contains secondary navigation

The footer SHALL include links grouped into at least two columns: Product (Features, Pricing, FAQ) and Company (About, Contact, Privacy).

#### Scenario: Footer links are navigable

- **WHEN** the user clicks a footer link with a defined route
- **THEN** the browser navigates to that route or scrolls to the anchor target

### Requirement: Footer displays copyright and brand

The footer SHALL display a copyright notice with the current year and "CareerFlow" brand name.

#### Scenario: Copyright renders dynamically

- **WHEN** the footer renders in any calendar year
- **THEN** the copyright line includes the current year automatically

### Requirement: Footer includes legal links

The footer SHALL include links to Privacy Policy and Terms of Service.

#### Scenario: Legal links present

- **WHEN** the footer renders
- **THEN** "Privacy Policy" and "Terms of Service" links are visible

### Requirement: Footer layout adapts to mobile

On viewports < 768px, footer columns SHALL stack vertically with adequate spacing.

#### Scenario: Mobile footer stacking

- **WHEN** the viewport is below 768px
- **THEN** footer link groups stack in a single column layout
