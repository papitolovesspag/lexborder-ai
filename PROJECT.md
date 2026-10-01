# Project: LexBorder AI Single-Page Company Website

## Architecture
- **Framework**: Next.js 16.2.9 (App Router) + React 19.2.4 + Turbopack.
- **Styling**: Tailwind CSS v4.3.1 (CSS theme via `@tailwindcss/postcss` and `src/app/globals.css`).
- **Animations**: Framer Motion 12.40.0 (`"use client"`, `useScroll`, `useTransform`, `motion.div`, `AnimatePresence`).
- **Icons**: Lucide React 1.18.0.
- **Single-Page Entry**: `src/app/page.js` containing full scrolling architecture:
  - Header / Sticky Glassmorphism Navbar (anchor links: `#how-it-works`, `#pricing`, `#about`, `#contact`)
  - Hero Section (striking headline, badge, interactive preview, CTA)
  - "How it Works" Section (scrollytelling animation with sticky container & 3-step compliance pipeline)
  - Realistic Pricing Section (Tiered pricing cards: Starter, Professional, Enterprise with billing toggles and feature matrix)
  - "About Us" Section (strictly ONE founder Gabriel, image at `/images/gabriel.jpg`, authoritative trade compliance biography, zero accelerator mentions)
  - "Contact Us" Section (strictly ONLY email `gabriel@lexborderai.site` and phone `+2349075737269`)
  - Modern Footer (navigation anchors, copyright, zero accelerator mentions)
- **Sidelined Routes**: `/dashboard`, `/login`, `/register`, `/api/auth`, `/onboarding`, `/profile` call `notFound()` or return disabled state while preserving code.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Accelerator / NVIDIA Purge | Complete elimination of NVIDIA and accelerator mentions across codebase (specifically `src/app/LandingContent.js:167`) | M1 | ORIGINAL_REQUEST §R1, §R2 |
| 2 | SaaS Route Sidelining | Inactivate `/dashboard`, `/login`, `/register`, `/api/auth`, `/onboarding`, `/profile` so they return 404 / disabled without build failure | M1 | ORIGINAL_REQUEST §R3 |
| 3 | Navigation Sidelining | Remove all navigation links pointing to `/dashboard`, `/login`, `/register`, or SaaS routes | M1 | ORIGINAL_REQUEST §R3 |
| 4 | Founder Image Ingestion | Copy Gabriel's portrait from user upload path to `public/images/gabriel.jpg` | M2 | ORIGINAL_REQUEST §R1 |
| 5 | Custom Placeholder Favicon | Install LexBorder SVG icon to `src/app/icon.svg` & `public/icon.svg`, configure layout metadata | M2 | ORIGINAL_REQUEST §R2 |
| 6 | Striking Hero Section | High-impact headline, value proposition for AI global trade compliance, CTA anchors | M3 | ORIGINAL_REQUEST §R1 |
| 7 | Realistic Pricing Section | Structured tiers (Starter, Professional, Enterprise) with trade compliance feature breakdown | M3 | ORIGINAL_REQUEST §R1 |
| 8 | About Us Section (Gabriel) | Dedicated founder section with Gabriel's photo, compelling trade compliance bio, strictly 1 founder, 0 accelerator mentions | M3 | ORIGINAL_REQUEST §R1 |
| 9 | Contact Us Section | Dedicated contact card strictly with email `gabriel@lexborderai.site` and phone `+2349075737269` | M3 | ORIGINAL_REQUEST §R1 |
| 10 | Modern Footer | Minimalist dark footer with anchor links, legal/copyright, zero accelerator mentions | M3 | ORIGINAL_REQUEST §R1 |
| 11 | Scrollytelling "How it Works" | Multi-step interactive scrollytelling animation using Framer Motion `useScroll`/`useTransform` with mobile fallback | M4 | ORIGINAL_REQUEST §R1, §R2 |
| 12 | UI Polish & Animations | Framer motion entry animations, glowing borders, glassmorphic cards, micro-interactions | M4 | ORIGINAL_REQUEST §R2 |
| 13 | Mobile Responsiveness | Flawless mobile viewport scaling (320px, 375px, 768px, 1024px, 1440px) | M4 | ORIGINAL_REQUEST §R2 |
| 14 | E2E Testing Suite (Tiers 1-4) | Comprehensive opaque-box test suite covering routes, 404s, content verification, contact restrictions, and mobile rendering | M5 (Test Track) | Orchestrator Protocol |
| 15 | Adversarial Coverage & Integrity Audit | Tier 5 adversarial stress testing and Forensic Integrity Audit verification | M5 | Orchestrator Protocol |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Design test runner & tests (Tiers 1-4) covering all 15 features; publish TEST_READY.md | none | DONE |
| M1 | Purge Mentions & Sideline Routes | Sideline `/dashboard`, `/login`, `/register`, `/api/auth` via `notFound()`, purge NVIDIA/accelerator text, remove dead links | none | DONE |
| M2 | Brand Assets & Favicon Setup | Copy founder image to `public/images/gabriel.jpg`, install SVG favicon, update `src/app/layout.js` metadata | none | DONE |
| M3 | Single-Page Architecture & Content | Rewrite `src/app/page.js` with Hero, Pricing, About Us (Gabriel), Contact Us (exact email/phone), Footer | M1, M2 | DONE |
| M4 | Animations, Scrollytelling & Mobile | Implement Framer Motion scrollytelling in "How it Works", interactive pipeline, mobile responsiveness | M3 | DONE |
| M5 | Final Milestone: E2E Pass & Audit | Execute 100% pass of E2E test suite (Tiers 1-4) + Tier 5 Adversarial Hardening + Forensic Audit | E2E, M4 | DONE |

## Interface Contracts
### Navbar / Hero ↔ Page Sections
- Anchor targets: `#hero`, `#how-it-works`, `#pricing`, `#about`, `#contact`
- No external authentication or dashboard URLs.

### Next.js App Router ↔ Asset Pipeline
- Image path: `/images/gabriel.jpg` (Next.js Image component, responsive sizes).
- Favicon: `/icon.svg` and `src/app/icon.svg` metadata link.

### Sidelined Routes Contract
- HTTP status: 404 (via `notFound()` from `next/navigation`).
- Preserved files: Code retained in component files, zero deleted business logic.

## Code Layout
- `src/app/page.js` — Single-page application entry point (Hero, How It Works, Pricing, About Us, Contact, Footer).
- `src/app/layout.js` — Root layout with metadata and favicon definitions.
- `src/app/icon.svg` — Custom LexBorder vector favicon.
- `src/app/dashboard/` — Sidelined dashboard routes (returns `notFound()`).
- `src/app/login/` — Sidelined login route (returns `notFound()`).
- `src/app/register/` — Sidelined register route (returns `notFound()`).
- `src/app/api/auth/` — Sidelined auth endpoints (returns 404 responses).
- `public/images/gabriel.jpg` — Founder portrait asset.
- `public/icon.svg` — Static vector favicon asset.
- `tests/e2e/` — E2E test suite harness, test tiers, and runner.
