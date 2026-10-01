## 2026-09-30T17:33:04Z
You are test_writer_1.
Working directory: c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/.agents/teamwork/test_writer_1

MANDATORY: First read ORIGINAL_REQUEST.md at:
c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/.agents/teamwork/ORIGINAL_REQUEST.md
Also read PROJECT.md at:
c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/PROJECT.md

Exclusive Write Ownership:
You own `tests/e2e/`, `TEST_INFRA.md`, and `TEST_READY.md`. DO NOT modify files in `src/` or `public/`.

Your mission:
Design and build a comprehensive, automated E2E test suite for the LexBorder AI single-page company website per the 4-tier methodology:
1. Requirements Coverage:
   - Tier 1: Feature Coverage (>=5 test cases per feature covering all 15 features in PROJECT.md):
     - Single-page scrolling architecture in `src/app/page.js`
     - Hero section existence, headline, and CTA anchors
     - "How it Works" section with scrollytelling structure
     - Realistic Pricing section with tiers and features
     - "About Us" section with Gabriel's photo (`/images/gabriel.jpg`) and bio
     - Constraint: Strictly ONE founder in About Us (no other team members)
     - Constraint: Strictly ZERO mentions of NVIDIA, Inception, or any accelerator in the codebase/landing content
     - "Contact Us" section containing strictly ONLY `gabriel@lexborderai.site` and `+2349075737269` (no other contact details)
     - Clean modern Footer with anchor navigation
     - Favicon configuration (custom icon.svg in layout metadata)
     - Sidelined routes: `/dashboard`, `/login`, `/register`, `/api/auth`, `/onboarding`, `/profile` return 404 or disabled state
     - Navigation audit: Zero links to dashboard or auth routes on the landing page
   - Tier 2: Boundary & Corner Cases (>=5 per feature where boundaries exist):
     - Verify strictly NO forbidden strings (`nvidia`, `inception`, `accelerator`, `accelerated`) in `src/app/page.js`, `src/app/layout.js`, `src/app/LandingContent.js`
     - Verify regex pattern for email strictly matches only `gabriel@lexborderai.site` on the landing page
     - Verify phone number matches `+2349075737269`
     - Verify sidelined routes return 404 status codes
     - Verify image file `public/images/gabriel.jpg` exists and is non-empty
     - Verify favicon `src/app/icon.svg` and `public/icon.svg` exist and are valid SVGs
   - Tier 3: Cross-Feature Combinations:
     - Navigation anchors match section id targets (`#hero`, `#how-it-works`, `#pricing`, `#about`, `#contact`)
     - Responsive viewport layouts and styles
   - Tier 4: Real-World Application Scenarios (>=5 scenarios):
     - Enterprise compliance officer journey
     - Supply chain director pricing review
     - Investor/partner founder background check
     - Mobile browser inspection simulation
     - Contact initiation flow
2. Test Runner & Harness:
   - Implement an automated test runner script `tests/e2e/run_tests.js` (or similar Node.js script using native assertion libraries) that can execute against the built Next.js artifacts and codebase.
   - The test script must produce structured pass/fail output and exit code 0 when all tests pass.
3. Documentation:
   - Create `TEST_INFRA.md` at project root documenting test architecture, tiers, and invocation command.
   - When test suite creation is complete and ready to run, create `TEST_READY.md` at project root with coverage summary and exact runner command.
4. Report:
   - Write your handoff report to `c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai/.agents/teamwork/test_writer_1/handoff.md`.
   - Send completion message to parent when finished.
