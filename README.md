<div align="center">

# CareerFlow

**Your job search, organized.**

Track every application, interview and follow-up in one place — so no opportunity slips through the cracks.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Security](#security)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

## Overview

CareerFlow is a job-application tracker for job seekers. This repository contains the **web frontend**, built with Next.js 16 and the App Router. It connects to the **CareerFlow backend** (Express, Prisma, PostgreSQL), which provides JWT authentication and REST APIs for auth, profiles, applications and tasks.

## Features

| Area                 | What you can do                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Landing page**     | Responsive marketing homepage with light and dark mode                                                             |
| **Authentication**   | Register, sign in and sign out; sessions refresh automatically in the background                                  |
| **Applications**     | Create, view, edit and delete applications with company, role, location, salary range, job link, source and notes |
| **Pipeline**         | Track each application as **Pending**, **Interview**, **Accepted** or **Rejected**                                 |
| **Follow-ups**       | Record when you applied and when to follow up                                                                      |
| **Dashboard**        | See per-status counts at a glance, filter by status and search by company or position                              |
| **Tasks**            | Add to-dos with a deadline, edit or delete them, and move them through **To do → In review → Done**; see overdue and on-time stats |
| **Profile**          | Manage your bio, avatar, contact details and portfolio, LinkedIn and GitHub links                                  |
| **Account menu**     | Open Profile, Settings and Log out from the dropdown under your name |
| **Account settings** | Update your name, or change your email (confirmed with your current password)                                      |

## Tech Stack

| Layer      | Technology                                                       |
| ---------- | ---------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) — App Router, Server Actions, Proxy |
| UI         | React 19, Tailwind CSS 4, Geist font                             |
| Language   | TypeScript                                                       |
| Backend    | CareerFlow API — Express, Prisma, PostgreSQL, JWT                |
| Tooling    | ESLint                                                           |

## Getting Started

### Prerequisites

- **Node.js** 20 or later
- **npm**
- The **CareerFlow backend** running locally (default: `http://localhost:5000`)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd careerflow-frontend

# 2. Install dependencies
npm install

# 3. Configure the backend URL
echo "BACKEND_API_URL=http://localhost:5000/api/v1" > .env.local

# 4. Start the development server
npm run dev
```

The app is now running at **http://localhost:3000**.

> **Note:** Start the backend before signing in. Without it, the landing page still works, but sign-in and all data pages will show a connection error.

## Environment Variables

Create a `.env.local` file in the project root:

| Variable          | Required | Default                        | Description                     |
| ----------------- | -------- | ------------------------------ | ------------------------------- |
| `BACKEND_API_URL` | No       | `http://localhost:5000/api/v1` | Base URL of the CareerFlow API  |

`BACKEND_API_URL` is only read on the server and is never exposed to the browser.

## Available Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the development server          |
| `npm run build` | Create an optimized production build  |
| `npm run start` | Serve the production build            |
| `npm run lint`  | Run ESLint                            |

## Architecture

CareerFlow uses a **backend-for-frontend** pattern: the browser talks only to the Next.js server, and the Next.js server talks to the CareerFlow API.

```
┌──────────┐   cookies    ┌────────────────────────┐   Bearer JWT   ┌──────────────────┐
│ Browser  │ ───────────► │  Next.js server        │ ─────────────► │ CareerFlow API   │
│          │ ◄─────────── │  Proxy · Server Actions│ ◄───────────── │ Express + Prisma │
└──────────┘    HTML      │  Server Components     │      JSON      └──────────────────┘
                          └────────────────────────┘
```

- **Session:** after sign-in, the access and refresh tokens are stored in httpOnly cookies, out of reach of browser JavaScript.
- **Token refresh:** `proxy.ts` runs before each request. When the access token has expired, it gets a new one from the API using the refresh token, so users stay signed in.
- **Route protection:** signed-out visitors who open a protected page are redirected to `/login` and returned to that page after signing in.
- **Data reads:** Server Components load data through a small data-access layer (`lib/dal.ts`).
- **Data writes:** forms submit to Server Actions (`app/actions/`). Validation errors from the API appear inline, and the user's input is kept.

## Project Structure

```
careerflow-frontend/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout and metadata
│   ├── globals.css           # Tailwind setup and brand design tokens
│   ├── (auth)/               # Sign-in and registration pages
│   ├── (app)/                # Signed-in area with shared navigation
│   │   ├── dashboard/
│   │   ├── applications/     # new, [id], [id]/edit
│   │   ├── tasks/
│   │   ├── profile/
│   │   └── settings/
│   └── actions/              # Server Actions: auth, applications, profile, tasks
├── components/
│   ├── homepage/             # Landing page sections
│   ├── ui.tsx                # Form fields, buttons and messages
│   └── ...                   # Logo, status badge and feature forms
├── lib/
│   ├── api.ts                # Backend fetch wrapper
│   ├── dal.ts                # Data-access layer
│   ├── session.ts            # Session cookie helpers
│   ├── tokens.ts             # Token and cookie utilities
│   ├── form.ts               # Form parsing and date helpers
│   └── definitions.ts        # Shared types
└── proxy.ts                  # Route protection and token refresh
```

## Routes

| Route                     | Description                         | Access    |
| ------------------------- | ----------------------------------- | --------- |
| `/`                       | Landing page                        | Public    |
| `/login`                  | Sign in                             | Public    |
| `/register`               | Create an account                   | Public    |
| `/dashboard`              | Applications overview and filters   | Signed in |
| `/applications/new`       | Add an application                  | Signed in |
| `/applications/[id]`      | Application details                 | Signed in |
| `/applications/[id]/edit` | Edit an application                 | Signed in |
| `/tasks`                  | Tasks, progress stats and filters   | Signed in |
| `/profile`                | View and edit your profile          | Signed in |
| `/settings`               | Account settings                    | Signed in |

## Security

- Tokens live in **httpOnly**, `SameSite=Lax` cookies (`Secure` in production) and never reach client-side JavaScript.
- All API calls are made server-side; the backend URL is never sent to the browser.
- Post-login redirects accept only same-site paths, which prevents open redirects.
- Signing out revokes the refresh token on the backend and clears both cookies.
- Job-posting links are only rendered as clickable links when they use `http` or `https`.

## Deployment

1. Build the app with `npm run build`.
2. Set `BACKEND_API_URL` to your production API.
3. Serve it over **HTTPS**, since auth cookies are marked `Secure` in production.

Any platform that runs Next.js 16 with the Node.js runtime works, such as Vercel, a Docker container or a Node server.

## Roadmap

- [ ] Replace the placeholder testimonials on the landing page with real user quotes
- [ ] Add About, Contact, Privacy Policy and Terms of Service pages
- [ ] Add a skills section to the profile (supported by the backend data model)
- [ ] Add follow-up reminders and notifications
