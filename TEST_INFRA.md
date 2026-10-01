# LexBorder AI - Automated E2E Test Infrastructure

## Overview
This document specifies the architecture, execution methodology, and operational details of the automated 4-tier End-to-End (E2E) test suite designed for the LexBorder AI single-page company website.

The test infrastructure is designed for high reliability, zero external testing dependencies (built natively on modern Node.js v24 `assert/strict` and AST/filesystem analyzers), deterministic execution, and strict exit code contracts (exit code `0` on 100% success; non-zero on any failure).

---

## Architecture & Directory Layout

The test suite resides in `tests/e2e/` with modular tier isolation:

```
tests/e2e/
├── helpers.js                 # Shared AST/file-inspection, pattern scanning, and navigation utilities
├── tier1_features.test.js     # Tier 1: Feature coverage (all 15 features in PROJECT.md, >=5 tests each)
├── tier2_boundaries.test.js   # Tier 2: Boundary & corner cases (forbidden strings, regex, assets, 404s)
├── tier3_cross_feature.test.js# Tier 3: Cross-feature integrations & anchor-to-section parity
├── tier4_scenarios.test.js    # Tier 4: Real-world end-to-end user journeys & mobile simulation
└── run_tests.js               # Master test runner CLI with ANSI formatting and exit code signaling
```

---

## 4-Tier Test Methodology

### Tier 1: Feature Coverage (75 Tests)
Covers all 15 features defined in `PROJECT.md` with >=5 test cases per feature:
1. **F1: Accelerator / NVIDIA Purge** (5 tests) — Complete elimination of NVIDIA and accelerator mentions across codebase and landing content.
2. **F2: SaaS Route Sidelining** (5 tests) — Fencing `/dashboard`, `/login`, `/register`, `/onboarding`, `/profile`, `/api/auth` with `notFound()` or 404 responses.
3. **F3: Navigation Sidelining** (5 tests) — Verification that landing page contains zero links to authentication, registration, or dashboard routes.
4. **F4: Founder Image Ingestion** (5 tests) — Presence, binary JPEG magic header (`[0xFF, 0xD8, 0xFF]`), size (>50KB), and alt-text attribution of `public/images/gabriel.jpg`.
5. **F5: Custom Placeholder Favicon** (5 tests) — Verification of `src/app/icon.svg`, `public/icon.svg`, SVG viewBox/geometry, and metadata link configuration.
6. **F6: Striking Hero Section** (5 tests) — Hero section existence (`#hero`), trade compliance value proposition, innovation badge, and dual conversion/discovery CTAs.
7. **F7: Realistic Pricing Section** (5 tests) — Pricing container (`#pricing`), structured tiers (Starter, Pro, Enterprise), compliance feature checklists, and `#contact` routing.
8. **F8: About Us Section (Gabriel)** (5 tests) — About section (`#about`), prominent identification of founder Gabriel, trade compliance & AI bio, strictly 1 founder, 0 accelerator claims.
9. **F9: Contact Us Section** (5 tests) — Contact container (`#contact`), designated email `gabriel@lexborderai.site`, phone `+2349075737269`, and strict absence of competing contacts.
10. **F10: Modern Footer** (5 tests) — Semantic `<footer>`, internal anchor navigation, LexBorder AI copyright, zero auth links, zero accelerator mentions.
11. **F11: Scrollytelling "How it Works"** (5 tests) — Container (`#how-it-works`), 3-step compliance pipeline (HS classification, tariff engine, automated clearance/audit).
12. **F12: UI Polish & Animations** (5 tests) — Framer Motion imports/hooks, glassmorphism (`backdrop-blur`), ambient glows, hover micro-interactions, smooth scrolling.
13. **F13: Mobile Responsiveness** (5 tests) — HTML viewport shell, responsive Tailwind classes (`sm:`, `md:`, `lg:`), mobile hamburger/toggle navigation, `grid-cols-1` collapsing, fluid typography.
14. **F14: E2E Testing Suite Harness** (5 tests) — Runner script, modular test files, structured output, error diagnostic capture, and self-contained execution.
15. **F15: Adversarial Coverage & Integrity Audit** (5 tests) — Obfuscated string scanning, rogue protocol auditing (`mailto:` / `tel:`), broken anchor detection, singleton founder audit, route fencing.

### Tier 2: Boundary & Corner Cases (26 Tests)
Tests strict negative constraints, boundary conditions, and binary asset integrity:
- **B1: Forbidden Terms Boundary** (5 tests) — Zero occurrences of `nvidia`, `inception`, `accelerator`, or `accelerated` across `src/app/page.js`, `src/app/layout.js`, and components.
- **B2: Contact Information Boundary** (5 tests) — Exact regex matching for `gabriel@lexborderai.site` and `+2349075737269`, strict rejection of generic mock emails and unlisted phone numbers.
- **B3: Sidelined Routes 404 Boundary** (6 tests) — Direct verification that `/dashboard`, `/login`, `/register`, `/onboarding`, `/profile`, and `/api/auth` are sidelined.
- **B4: Founder Asset Boundary** (5 tests) — Exact filesystem path, file size >= 100KB, JPEG SOI marker `0xFF 0xD8 0xFF`, JPEG EOI marker `0xFF 0xD9`, and public directory location.
- **B5: Favicon Vector Asset Boundary** (5 tests) — Dual file existence, valid XML root, vector primitives, zero third-party trademark vectors.

### Tier 3: Cross-Feature Integration (8 Tests)
Verifies multi-component parity and architectural contracts:
- **T3.CF.1**: Header navigation targets match page section IDs (`hero`, `how-it-works`, `pricing`, `about`, `contact`).
- **T3.CF.2**: Footer navigation targets resolve to valid in-page sections.
- **T3.CF.3**: Hero CTAs connect to `#how-it-works` (discovery) and `#contact` (conversion).
- **T3.CF.4**: Pricing tier CTAs route directly to `#contact`.
- **T3.CF.5**: About Us founder details synchronize with Contact Us communication channels.
- **T3.CF.6**: Responsive max-width container and padding standardization across all major sections.
- **T3.CF.7**: Unified brand identity ("LexBorder AI") synchronized across layout metadata, header, and footer.
- **T3.CF.8**: Sidelined route isolation prevents any navigation links from pointing to dormant routes.

### Tier 4: Real-World Application Scenarios (5 Tests)
End-to-end simulations of actual persona journeys:
- **T4.SC.1**: Enterprise Compliance Officer Journey (evaluates platform mission, 3-step pipeline, enterprise tier, founder contact).
- **T4.SC.2**: Supply Chain Director Pricing Review (navigates via `#pricing`, compares plan tiers, clicks through to `#contact`).
- **T4.SC.3**: Investor / Venture Partner Founder Background Check (verifies solo founder Gabriel, validates trade domain background, audits 0 accelerator claims).
- **T4.SC.4**: Mobile Browser Simulation (verifies responsive classes, mobile drawer/menu, single-column grid collapsing, fluid image handling).
- **T4.SC.5**: Contact Initiation Flow (verifies direct founder channels, valid `mailto:` and `tel:` protocols, zero competing contact channels).

---

## How to Run the Tests

Execute the master runner directly via Node.js from the project root:

```bash
# Run the complete test suite (Tiers 1-4, 114 tests)
node tests/e2e/run_tests.js

# Run with verbose individual test logging
node tests/e2e/run_tests.js --verbose

# Run a specific tier only
node tests/e2e/run_tests.js --tier=1
node tests/e2e/run_tests.js --tier=2
node tests/e2e/run_tests.js --tier=3
node tests/e2e/run_tests.js --tier=4
```

### Exit Codes
- `0`: All tests passed with 100% specification compliance.
- `1`: One or more tests failed. Diagnostic information is output to stdout.
