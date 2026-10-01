# Technical Survey & Architecture Report: LexBorder AI Single-Page Redesign

**Author**: `explorer_survey_2`  
**Date**: 2026-09-30  
**Scope**: Tech stack, styling, animation/scrollytelling patterns, asset management, and build verification.

---

## 1. Observation

Direct code and environment inspections were conducted across the repository:

### 1.1 Dependency & Runtime Stack (`package.json`)
```json
{
  "dependencies": {
    "next": "16.2.9",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "framer-motion": "^12.40.0",
    "lucide-react": "^1.18.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.6.0",
    "next-themes": "^0.4.6",
    "next-auth": "^4.24.14",
    "prisma": "^7.8.0",
    "@prisma/client": "^7.8.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "16.2.9"
  }
}
```
- **Framer Motion**: Version `12.40.0` is installed (`node_modules/framer-motion/package.json:3`).
- **Lucide Icons**: Version `1.18.0` is installed (`node_modules/lucide-react/package.json:4`).
- **Next.js & React**: Next.js `16.2.9` with React `19.2.4` (App Router architecture).
- **Tailwind CSS**: Tailwind CSS `v4.3.1` using `@tailwindcss/postcss` plugin (`postcss.config.mjs:3-5`). Note that Tailwind v4 does **not** use `tailwind.config.js`; styling and design tokens are declared directly in CSS via `@theme`.

### 1.2 Styling, Theme & Typography Configuration
- **`src/app/globals.css:1-40`**:
  - Tailwind v4 `@theme` block defines:
    ```css
    --font-sans: "Inter", var(--font-geist-sans), sans-serif;
    --color-accent-magenta: #d946ef;
    --color-accent-cyan: #06b6d4;
    --color-accent-blue: #3b82f6;
    --color-accent-purple: #8b5cf6;
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-panel: var(--panel-bg);
    --color-panel-border: var(--panel-border);
    ```
  - Root theme colors:
    - Dark mode (`.dark`): Background `#050B14`, foreground `#f8fafc`, panel background `rgba(10, 17, 40, 0.7)`, panel border `rgba(255, 255, 255, 0.08)`.
  - Utility classes available in `globals.css`:
    - `.glass-panel` (`backdrop-filter: blur(24px)`)
    - `.glass-panel-heavy` (`backdrop-filter: blur(40px)`)
    - `.bg-blobs`, `.blob`, `@keyframes float` (animated floating ambient gradients).
- **`src/app/layout.js:1-35`**:
  - Fonts configured via `next/font/google`:
    - `Geist` (`--font-geist-sans`)
    - `Geist_Mono` (`--font-geist-mono`)
  - Default theme is dark: `<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>`.

### 1.3 NVIDIA References Audit
A case-insensitive global search for `nvidia` across the entire workspace yielded exactly one match:
- `src/app/LandingContent.js:167`:
  ```jsx
  <p>© {new Date().getFullYear()} LexBorder AI. Built for the NVIDIA Inception Programme.</p>
  ```
- **Finding**: Replacing `LandingContent.js` and rewriting `src/app/page.js` removes 100% of NVIDIA references from the project.

### 1.4 Asset & Favicon Audit
- **Founder Photo**: Confirmed valid JPEG file at `C:/Users/Chidi/.gemini/antigravity/brain/7b82a8ae-c2ad-47ff-91c5-ad3b195b0df6/.user_uploaded/media_1790788256344.jpg` (size: 126,585 bytes).
- **Favicon**: Existing `src/app/favicon.ico` contains the standard Vercel triangle icon. Must be replaced with a custom LexBorder logo placeholder (e.g. `src/app/favicon.ico` or `src/app/icon.svg`).

### 1.5 Build & Verification Commands
- **Windows PowerShell Execution**:
  - Running `npm run build` directly triggers: `PSSecurityException: File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.`
  - **Resolution**: Commands must use `npm.cmd` directly: `npm.cmd run build`, `npm.cmd run lint`.
- **`npm.cmd run build` Execution**:
  - Exited code 0 in 12.4s using Turbopack (`▲ Next.js 16.2.9 (Turbopack)`).
  - All 13 routes collected and prerendered cleanly.
  - Concurrency note: Running simultaneous `next build` processes triggers `⨯ Another next build process is already running.` Sequential builds run cleanly.
- **`npm.cmd run lint` Execution**:
  - Exited code 1 with 10 pre-existing ESLint issues (unescaped apostrophe entities in `LandingContent.js:79`, React 19 hook purity errors in `dashboard/page.js` and `DashboardOverview.js`, and `theme-toggle.js`).
  - Sidelining the legacy routes and using properly escaped entities in the new `page.js` will resolve linting cleanly.

---

## 2. Logic Chain

```
[Observation: Next.js 16.2.9 App Router + React 19 + Framer Motion 12.40.0 + Tailwind CSS 4]
                     │
                     ▼
[Logic Step 1: Animation Architecture]
- Framer Motion 12 natively supports `useScroll`, `useTransform`, `useSpring`, and `AnimatePresence` in React 19.
- Any animated component MUST have the `"use client";` directive at the top.
                     │
                     ▼
[Logic Step 2: "How it Works" Scrollytelling Pattern]
- Build a sticky scrollytelling container:
  • Parent track: `relative min-h-[300vh] w-full` with ref attached to `useScroll({ target: containerRef, offset: ["start start", "end end"] })`.
  • Sticky stage: `sticky top-20 h-[calc(100vh-5rem)] flex items-center justify-between gap-12`.
  • Two-column layout:
    - Left side: 3 sequential step narrative cards (Step 1: Automated Ingestion & Parsing; Step 2: Multi-Jurisdiction Regulatory Matrix; Step 3: Instant Clearance & Audit Shield).
    - Right side: Dynamic interactive visual canvas that morphs across scroll intervals:
      * Range [0, 0.33]: Document intake UI with animated OCR scan beam and extracted tariff fields.
      * Range [0.33, 0.66]: World trade map & tariff comparison matrix (US vs EU vs UK tax rates & sanctions check).
      * Range [0.66, 1.0]: Green-light verified customs certificate with cryptographic audit badge and instant download simulation.
  • Mobile responsiveness: Use Tailwind breakpoints (`md:sticky md:block hidden`) with a mobile-optimized tabbed card sequence or vertical progressive timeline so mobile users experience zero scrolling lockups or horizontal overflow.
                     │
                     ▼
[Logic Step 3: Design Tokens & Visual Hierarchy]
- Palette:
  • Background: `#050B14` (Deep Space Dark) and `#0A1128` (Midnight Navy).
  • Glow accents: Electric Cyan (`#06B6D4`), Hyper Blue (`#3B82F6`), Vivid Purple (`#8B5CF6`), Magenta (`#D946EF`).
- Surfaces:
  • Dual-layer glassmorphism (`backdrop-blur-2xl bg-white/[0.03] border border-white/10 shadow-2xl`).
  • Subdued noise texture overlay (`bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay`).
  • Radial gradient hover borders and ambient background light cones.
                     │
                     ▼
[Logic Step 4: Asset & Section Routing Architecture]
- Founder section: Copy `media_1790788256344.jpg` to `public/images/gabriel.jpg`. Render via `next/image` with rounded corners, subtle rim-lighting border (`border-purple-500/20`), founder title ("Founder & Chief Compliance Architect"), and an authentic trade-compliance bio. No accelerators mentioned.
- Contact section: Exclusively list `gabriel@lexborderai.site` and `+2349075737269` with interactive click-to-copy badges.
- Pricing section: Realistic tiers (e.g. Starter $0/mo, Professional $79/mo, Enterprise Custom) with annual/monthly toggle and feature checklists.
- Sidelining routes: In `/dashboard`, `/login`, `/register`, `/api/auth`, import `notFound` from `next/navigation` and invoke `notFound()` or comment out page bodies so all direct visits return 404 or disabled view.
```

---

## 3. Caveats

1. **No Automated Test Framework**: There is no Jest or Vitest test runner installed in `package.json`. Verification must be performed using `npm.cmd run build`, `npm.cmd run lint`, and visual verification.
2. **Next.js Image Asset Location**: Next.js cannot read images from external user paths (`C:/Users/...`) during runtime rendering; the image file must be physically copied into `public/images/` or `public/` to be served.
3. **Concurrent Build Lock**: Do not launch simultaneous `npm.cmd run build` commands, as Turbopack creates an exclusive lock in `.next/` while building.

---

## 4. Conclusion

The technology foundation is primed for an exceptional, premium experience:
- **Core Stack**: Next.js 16.2.9, React 19.2.4, Tailwind CSS 4.3.1, Framer Motion 12.40.0, Lucide React 1.18.0.
- **Architecture**: Single-page architecture in `src/app/page.js` with client sub-sections.
- **Scrollytelling**: Framer Motion `useScroll` + `useTransform` + sticky viewport container with mobile-responsive fallback.
- **Zero-NVIDIA**: Confirmed only 1 instance existed in `src/app/LandingContent.js:167`; overwriting the landing page eliminates all references project-wide.
- **Verification**: `npm.cmd run build` builds cleanly in ~12 seconds.

---

## 5. Verification Method

### 5.1 Verification Commands
Execute the following commands in the workspace root:

```powershell
# 1. Verify build compiles cleanly with zero errors
npm.cmd run build

# 2. Verify ESLint rules
npm.cmd run lint

# 3. Verify zero occurrences of NVIDIA across entire codebase
git grep -i "nvidia"
```

### 5.2 File & Component Verification Checklist
1. Inspect `src/app/page.js` to ensure it contains:
   - Hero section with animated badges and CTAs.
   - "How it Works" section with `useScroll`/`useTransform` scrollytelling.
   - Realistic Pricing section with tiers and toggles.
   - About Us section featuring only Gabriel with `public/images/gabriel.jpg` and trade compliance bio.
   - Contact Us section containing **only** `gabriel@lexborderai.site` and `+2349075737269`.
   - Modern Footer with zero accelerator mentions.
2. Check `src/app/icon.svg` or `src/app/favicon.ico` for brand placeholder logo.
3. Check `src/app/dashboard/page.js` and `src/app/login/page.js` to confirm they return `notFound()` or disabled states.
