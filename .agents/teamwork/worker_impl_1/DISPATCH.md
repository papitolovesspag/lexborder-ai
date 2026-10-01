## 2026-09-30T17:33:04Z
[Message] timestamp=2026-09-30T17:33:04Z sender=ef4519b8-c049-491f-abfe-3230f4b01325 priority=MESSAGE_PRIORITY_HIGH content=You are worker_impl_1.
Working directory: c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/.agents/teamwork/worker_impl_1

MANDATORY: First read ORIGINAL_REQUEST.md at:
c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/.agents/teamwork/ORIGINAL_REQUEST.md
Also read PROJECT.md at:
c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/PROJECT.md
Read the survey handoffs at:
- c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/.agents/teamwork/explorer_survey_1/handoff.md
- c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/.agents/teamwork/explorer_survey_2/handoff.md
- c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/.agents/teamwork/explorer_survey_3/handoff.md

Exclusive Write Ownership:
You own `src/app/`, `public/`. DO NOT modify files in `tests/e2e/`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your mission:
Implement all required changes across Milestones M1, M2, M3, and M4:

1. Assets & Favicon Setup (M2):
   - Create `public/images` directory if it does not exist.
   - Copy founder photo from `C:\Users\Chidi\.gemini\antigravity\brain\7b82a8ae-c2ad-47ff-91c5-ad3b195b0df6\.user_uploaded\media_1790788256344.jpg` to `public/images/gabriel.jpg`.
   - Copy SVG icon from `c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/.agents/teamwork/explorer_survey_3/icon.svg` to `src/app/icon.svg` and `public/icon.svg`.
   - In `src/app/layout.js`, configure metadata for title, description, and custom icons.

2. Purge NVIDIA/Accelerator Mentions & Sideline Existing SaaS Routes (M1):
   - Search and purge all mentions of "NVIDIA", "Inception", and "accelerator" across `src/app/` (specifically in `src/app/LandingContent.js:167` or replace with clean copyright).
   - In `src/app/dashboard/layout.js`, `dashboard/page.js`, `login/page.js`, `register/page.js`, `onboarding/page.js`, and `profile/page.js`: import `{ notFound } from 'next/navigation'` and invoke `notFound()` at the start of the page/layout components so they return 404, while preserving the original component code.
   - In `src/app/api/auth/[...nextauth]/route.js`, return a 404 Response while preserving any exported objects (e.g. `authOptions`) so imports don't fail.
   - In `src/app/page.js`, remove any session check redirect to `/dashboard`.

3. Single-Page Architecture & Content in `src/app/page.js` (M3 & M4):
   - Overwrite `src/app/page.js` to build a complete, single-page scrolling company website for LexBorder AI. Mark `"use client"`.
   - Sections to implement:
     a. Sticky Header / Navbar: Sleek dark glassmorphism navbar with brand logo, smooth-scroll anchor links (`#how-it-works`, `#pricing`, `#about`, `#contact`), and a "Request Demo" CTA button scrolling to `#contact`. Absolutely no links to `/dashboard`, `/login`, or `/register`.
     b. Hero Section: Striking headline (e.g., "Autonomous Global Trade Compliance Intelligence"), glowing badge, interactive compliance preview card, and primary CTAs.
     c. "How it Works" Section (M4): Scrollytelling interactive experience using Framer Motion (`useScroll`, `useTransform`, sticky viewport container) showcasing the 3-step compliance pipeline:
        1. Document Ingestion & Harmonized System (HS) Auto-Classification
        2. Real-Time Tariff, Sanctions & Cross-Border Regulatory Matrix
        3. Automated Customs Clearance & Compliance Certification
        Include full responsive fallback for mobile screens so animations display smoothly on all viewports.
     d. Realistic Pricing Section: Three realistic pricing tiers for global trade businesses:
        - Starter: $199/month (Automated HS Classification, 250 monthly clearance scans, standard tariff updates)
        - Professional: $599/month (Unlimited automated filings, multi-jurisdiction tariff calculation, export control screening, API access)
        - Enterprise: Custom / $1,999+/month (Dedicated compliance model fine-tuning, automated customs broker integrations, 24/7 SLA, on-premise data residency)
        Include billing toggle (Monthly / Annual with 20% discount) and feature comparison list.
     e. "About Us" Section: Strictly ONE founder: Gabriel.
        - Render Gabriel's image from `/images/gabriel.jpg` using Next.js Image component with high-end styling (subtle cyan/indigo glow border, rounded corners).
        - Feature the compelling biography detailing Gabriel's journey in tackling global trade friction, customs delays, and complex tariff jurisprudence, leading to the creation of LexBorder AI.
        - Strict constraint: DO NOT mention NVIDIA, Inception, or any accelerator anywhere.
     f. "Contact Us" Section:
        - Dedicated contact section containing strictly ONLY:
          Email: `gabriel@lexborderai.site`
          Phone: `+2349075737269`
        - Include clean interactive copy-to-clipboard buttons and mailto/tel action buttons. No other contact info, social handles, or physical addresses.
     g. Modern Footer: Clean dark footer with LexBorder AI branding, anchor links, copyright, and zero accelerator references.

4. UI Polish & Mobile Responsiveness:
   - Use Framer Motion liberally (`motion.div`, `initial`, `whileInView`, `viewport={{ once: true }}`, hover micro-interactions).
   - Ensure complete responsiveness across mobile (320px, 375px), tablet (768px), and desktop (1024px+).

5. Verification:
   - Run `npm.cmd run build` in PowerShell and verify that Next.js Turbopack build succeeds with zero errors.
   - Document all changes and verification outputs in `c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/.agents/teamwork/worker_impl_1/handoff.md`.
   - Send completion message to parent when finished.
