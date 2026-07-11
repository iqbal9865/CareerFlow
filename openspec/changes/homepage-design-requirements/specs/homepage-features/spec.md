## ADDED Requirements

### Requirement: Features section explains product capabilities

The homepage SHALL include a features section with a section heading, brief introduction, and at least three feature cards describing CareerFlow's core capabilities.

#### Scenario: Feature cards display consistently

- **WHEN** the features section renders
- **THEN** each feature card displays an icon, title (H3), and description paragraph
- **AND** all cards share equal visual weight in the layout

### Requirement: Features cover job-search workflow

The feature set SHALL address at minimum: application tracking, pipeline management, and interview preparation or reminders.

#### Scenario: Three core features present

- **WHEN** the features section renders
- **THEN** cards for "Track applications", "Manage your pipeline", and "Stay on top of interviews" (or equivalent approved copy) are visible

### Requirement: Features section is anchorable

The features section SHALL have an HTML `id` attribute (e.g., `features`) so navigation links can scroll to it.

#### Scenario: Section is targetable

- **WHEN** the URL contains `#features`
- **THEN** the page scrolls to the features section on load

### Requirement: Feature icons are accessible

Each feature icon SHALL be decorative (aria-hidden) or include an accessible name if it conveys unique information.

#### Scenario: Icons do not create noise for screen readers

- **WHEN** a screen reader navigates a feature card
- **THEN** the feature title and description are announced without redundant icon alt text

### Requirement: Features layout adapts to viewport

On mobile, feature cards SHALL stack vertically. On tablet and desktop, cards SHALL display in a grid (2 or 3 columns).

#### Scenario: Responsive grid

- **WHEN** the viewport is ≥ 768px
- **THEN** feature cards display in a multi-column grid with consistent gap spacing
