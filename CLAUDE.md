@AGENTS.md

# CareerFlow Frontend

Next.js 16 (App Router, React 19, Tailwind 4) frontend for the CareerFlow job-application tracker.
The backend lives in `../careerflow-backend` (Express + Prisma + JWT, default `http://localhost:5000/api/v1`).

## Running locally

1. Start the backend: `cd ../careerflow-backend && npm run dev` (needs its Postgres `DATABASE_URL`).
2. Create `.env.local` (gitignored): `BACKEND_API_URL=http://localhost:5000/api/v1`
3. `npm run dev` → http://localhost:3000

Checks: `npx tsc --noEmit`, `npm run lint`, `npm run build`.

## Auth architecture (backend-for-frontend)

The browser never sees the backend JWTs. Next.js server code stores them in httpOnly cookies and calls the backend on the user's behalf.

- `lib/tokens.ts` — cookie names (`cf_access`, `cf_refresh`), cookie options, JWT `exp` decoding, `requestNewAccessToken()`. No `server-only` import so `proxy.ts` can use it.
- `lib/session.ts` — `setSession` / `clearSession` / getters. Cookie writes only work in Server Actions and Route Handlers.
- `proxy.ts` — Next 16's renamed middleware. Silently refreshes an expired access token via `/auth/refresh` (and forwards it to the current request), redirects unauthenticated users on protected routes to `/login?next=…`, redirects authenticated users away from `/login` and `/register`, and clears cookies when refresh fails. Protected prefixes: `/dashboard`, `/applications`, `/profile`, `/settings`.
- `lib/api.ts` — `apiFetch()`, the single entry point to the backend. Attaches the Bearer token, throws `ApiError(status, message)`, redirects to `/login` on 401.
- `lib/dal.ts` — Data Access Layer: `getProfile`, `getApplications`, `getApplication` (wrapped in React `cache()`; 403/404 → `notFound()`).

The backend login response contains only tokens, so the current user's name/email come from `GET /profile` (`profile.user`).

## Mutations

All writes are Server Actions in `app/actions/` (`auth.ts`, `applications.ts`, `profile.ts`) that return `FormState` (`{ error?, success? }`).

- Catch only `ApiError` in actions and rethrow anything else; `redirect()` works by throwing.
- Client forms use `useFormAction()` from `components/ui.tsx` (submits via `onSubmit` + `startTransition`) instead of `<form action>`, because React 19 resets uncontrolled forms after an action and would wipe the user's input on a validation error.
- After in-place updates, call `refresh()` from `next/cache` so server components (e.g. the header name) re-render.
- `lib/form.ts`: blank optional fields become `null` on update (clears them) and are omitted on create. Dates from `<input type="date">` must go through `toIsoDate()`, because Prisma rejects date-only strings. Display dates with `formatDate()` (UTC) to avoid off-by-one days.

## Routes

- `app/page.tsx` — marketing homepage composed from `components/homepage/*` (Header, Hero, Features, HowItWorks, SocialProof, Faq, CallToAction, Footer), built to `openspec/changes/homepage-design-requirements`.
- `app/(auth)/` — `/login`, `/register` (centered card layout).
- `app/(app)/` — authenticated layout with nav + logout: `/dashboard` (status counts as filters, search via `?status=&q=`), `/applications/new`, `/applications/[id]`, `/applications/[id]/edit`, `/profile`, `/settings` (name/email).

Next 16 reminders: `params` and `searchParams` are Promises (`await` them); `cookies()` is async.

## Styling

- Brand tokens are in `app/globals.css` (`--primary`, `--primary-text`, `--primary-soft`, `--accent`, `--muted`, `--muted-foreground`), exposed as Tailwind utilities (`bg-primary`, `text-primary-text`, `py-section`, …). Use `text-primary-text` for brand-colored text; `--primary` alone fails contrast on dark backgrounds.
- Shared pieces: `components/logo.tsx`, `components/status-badge.tsx`, `components/ui.tsx` (Field, Select, TextArea, SubmitButton, FormMessage).
- Homepage targets WCAG AA, 44px touch targets on mobile, a skip link, and dark mode via `prefers-color-scheme`.

## Backend contract and quirks

- Endpoints: `POST /auth/{register,login,refresh,logout}`, `PUT /auth/{name,email}`, `GET|PUT /profile`, `GET|POST /applications`, `GET|PUT|DELETE /applications/:id`.
- Application statuses: `PENDING | INTERVIEW | ACCEPTED | REJECTED`. Genders: `MALE | FEMALE | OTHER`.
- Register password: 8+ chars with uppercase, lowercase, digit and one of `@$!%*?&`.
- Profile validation: bio ≥ 10 chars; avatar/portfolio must start with `https://`; LinkedIn must start with `https://linkedin.com` (`www.` is rejected); GitHub with `https://github.com`.
- `jobUrl` is not validated by the backend, so only render it as a link when it starts with `http(s)://`.

## Known TODOs

- Testimonials in `components/homepage/social-proof.tsx` are placeholders ("Sample User"); replace them with real quotes before launch.
- Footer About/Contact/Privacy/Terms links point to `#` until those pages exist.
