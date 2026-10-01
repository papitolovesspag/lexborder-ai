# Original User Request

## Initial Request — 2026-09-30T17:21:40Z

Build a premium, animation-heavy single-page company website for LexBorder AI to replace the current SaaS landing page. The design must be neutral, extremely polished, and highly responsive, strictly avoiding any mentions of specific accelerators (e.g., do NOT mention NVIDIA).

Working directory: `c:/Users/Chidi/Documents/Web Dev Projects/lexborder-ai`
Integrity mode: development

## Requirements

### R1. Single-Page Architecture & Content
Overwrite the existing `src/app/page.js` to build a single-page scrolling website. It must include:
- A striking Hero section.
- A "How it Works" section featuring scrollytelling animations.
- A realistic Pricing section.
- An "About Us" section explicitly limited to ONE founder (Gabriel). Do not include any text stating the startup is accelerated by anyone. Use the uploaded image (`C:/Users/Chidi/.gemini/antigravity/brain/7b82a8ae-c2ad-47ff-91c5-ad3b195b0df6/.user_uploaded/media_1790788256344.jpg`) as his picture and generate a compelling biography for him that relates to the development of LexBorder AI and global trade compliance.
- A "Contact Us" section containing ONLY the email `gabriel@lexborderai.site` and the phone number `+2349075737269`. No other contact info should exist.
- A clean, modern Footer.

### R2. UI Polish, Mobile Responsiveness & Favicon
- Liberally apply Framer Motion (or similar) to achieve a premium, animation-heavy experience.
- The layout MUST be fully responsive, ensuring flawless mobile views for all complex animations.
- Implement a placeholder logo as the favicon (tab icon) so the user can easily swap it out later. Remove any NVIDIA logos or references.

### R3. Sideline Existing Features
Comment out the page components inside the existing SaaS routes (`/dashboard`, `/login`, `/register`, `/api/auth`) or disable their layout entry points so they are preserved in the codebase but entirely inaccessible to users. Remove all navigation links pointing to them.

## Acceptance Criteria

### Content & Asset Verification
- [ ] `src/app/page.js` renders successfully without Next.js build errors.
- [ ] The favicon is updated/configured correctly.
- [ ] The Contact section contains ONLY the specified email and phone number.
- [ ] The About Us section contains exactly ONE founder (Gabriel) with a generated bio, and explicitly lacks any mention of accelerators.
- [ ] There is zero mention of NVIDIA anywhere in the codebase.

### UI & Animations (Agent-as-Judge)
- [ ] The site features smooth scrolling and complex "scrollytelling" animations in the How it Works section.
- [ ] The layout is flawlessly responsive and looks excellent on mobile viewports.

### Sidelined Features
- [ ] Navigating to `/dashboard` or `/login` returns a 404 or a "disabled" state.
- [ ] No links on the landing page point to authentication or dashboard routes.
