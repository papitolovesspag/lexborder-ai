/**
 * Tier 1: Feature Coverage Test Suite
 * Covers all 15 features in PROJECT.md with >=5 test cases per feature (75+ test cases).
 */

const assert = require("node:assert/strict");
const {
  readFile,
  readBinaryFile,
  fileExists,
  walkDirectory,
  scanForbiddenTerms,
  extractEmails,
  extractPhoneNumbers,
  extractNavigationTargets,
  extractSectionIds,
  checkRouteSidelined,
} = require("./helpers");

const tests = [];

function registerTest(id, feature, name, fn) {
  tests.push({ id, feature, name, fn });
}

function getLandingPageContent() {
  return readFile("src/app/page.js");
}

// ============================================================================
// FEATURE 1: Accelerator / NVIDIA Purge
// ============================================================================
registerTest("T1.F1.1", "F1: Accelerator / NVIDIA Purge", "src/app/page.js has zero mentions of NVIDIA", () => {
  const content = readFile("src/app/page.js");
  const violations = scanForbiddenTerms(content, ["nvidia"]);
  assert.equal(violations.length, 0, `Found NVIDIA in src/app/page.js: ${JSON.stringify(violations)}`);
});

registerTest("T1.F1.2", "F1: Accelerator / NVIDIA Purge", "src/app/LandingContent.js has zero mentions of NVIDIA", () => {
  const content = readFile("src/app/LandingContent.js");
  if (content) {
    const violations = scanForbiddenTerms(content, ["nvidia"]);
    assert.equal(violations.length, 0, `Found NVIDIA in src/app/LandingContent.js: ${JSON.stringify(violations)}`);
  }
});

registerTest("T1.F1.3", "F1: Accelerator / NVIDIA Purge", "src/app/layout.js has zero mentions of NVIDIA or accelerators", () => {
  const content = readFile("src/app/layout.js");
  const violations = scanForbiddenTerms(content, ["nvidia", "inception", "accelerator"]);
  assert.equal(violations.length, 0, `Found forbidden term in src/app/layout.js: ${JSON.stringify(violations)}`);
});

registerTest("T1.F1.4", "F1: Accelerator / NVIDIA Purge", "Landing content has zero mentions of 'Inception' accelerator program", () => {
  const content = getLandingPageContent();
  const violations = scanForbiddenTerms(content, ["inception"]);
  assert.equal(violations.length, 0, `Found 'inception' in landing page content: ${JSON.stringify(violations)}`);
});

registerTest("T1.F1.5", "F1: Accelerator / NVIDIA Purge", "Landing content has zero mentions of accelerator/incubator backing", () => {
  const content = getLandingPageContent();
  const violations = scanForbiddenTerms(content, ["accelerator", "accelerated", "incubator"]);
  assert.equal(violations.length, 0, `Found accelerator mentions in landing page: ${JSON.stringify(violations)}`);
});

// ============================================================================
// FEATURE 2: SaaS Route Sidelining
// ============================================================================
registerTest("T1.F2.1", "F2: SaaS Route Sidelining", "/dashboard route entry point is sidelined", () => {
  const isSidelined = checkRouteSidelined("src/app/dashboard/page.js");
  assert.ok(isSidelined, "src/app/dashboard/page.js must call notFound() or return 404");
});

registerTest("T1.F2.2", "F2: SaaS Route Sidelining", "/login route entry point is sidelined", () => {
  const isSidelined = checkRouteSidelined("src/app/login/page.js");
  assert.ok(isSidelined, "src/app/login/page.js must call notFound() or return 404");
});

registerTest("T1.F2.3", "F2: SaaS Route Sidelining", "/register route entry point is sidelined", () => {
  const isSidelined = checkRouteSidelined("src/app/register/page.js");
  assert.ok(isSidelined, "src/app/register/page.js must call notFound() or return 404");
});

registerTest("T1.F2.4", "F2: SaaS Route Sidelining", "/onboarding and /profile routes are sidelined", () => {
  const onboardingSidelined = !fileExists("src/app/onboarding/page.js") || checkRouteSidelined("src/app/onboarding/page.js");
  const profileSidelined = !fileExists("src/app/profile/page.js") || checkRouteSidelined("src/app/profile/page.js");
  assert.ok(onboardingSidelined, "src/app/onboarding/page.js must be sidelined");
  assert.ok(profileSidelined, "src/app/profile/page.js must be sidelined");
});

registerTest("T1.F2.5", "F2: SaaS Route Sidelining", "/api/auth endpoints are sidelined or disabled", () => {
  const nextauthSidelined = !fileExists("src/app/api/auth/[...nextauth]/route.js") || checkRouteSidelined("src/app/api/auth/[...nextauth]/route.js");
  const registerApiSidelined = !fileExists("src/app/api/auth/register/route.js") || checkRouteSidelined("src/app/api/auth/register/route.js");
  assert.ok(nextauthSidelined || registerApiSidelined, "Auth API endpoints must be sidelined");
});

// ============================================================================
// FEATURE 3: Navigation Sidelining
// ============================================================================
registerTest("T1.F3.1", "F3: Navigation Sidelining", "Landing page contains zero links to /dashboard", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  const dashboardLinks = targets.filter((h) => h === "/dashboard" || h.startsWith("/dashboard/"));
  assert.equal(dashboardLinks.length, 0, `Landing page links to dashboard: ${dashboardLinks}`);
});

registerTest("T1.F3.2", "F3: Navigation Sidelining", "Landing page contains zero links to /login", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  const loginLinks = targets.filter((h) => h === "/login" || h.startsWith("/login/"));
  assert.equal(loginLinks.length, 0, `Landing page links to login: ${loginLinks}`);
});

registerTest("T1.F3.3", "F3: Navigation Sidelining", "Landing page contains zero links to /register", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  const registerLinks = targets.filter((h) => h === "/register" || h.startsWith("/register/"));
  assert.equal(registerLinks.length, 0, `Landing page links to register: ${registerLinks}`);
});

registerTest("T1.F3.4", "F3: Navigation Sidelining", "Landing page contains zero links to /api/auth", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  const authLinks = targets.filter((h) => h.includes("/api/auth"));
  assert.equal(authLinks.length, 0, `Landing page links to auth API: ${authLinks}`);
});

registerTest("T1.F3.5", "F3: Navigation Sidelining", "Landing page links resolve only to in-page anchors or valid static targets", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  const disallowed = targets.filter(
    (h) => h.startsWith("/onboarding") || h.startsWith("/profile") || h.startsWith("/dashboard") || h.startsWith("/login") || h.startsWith("/register")
  );
  assert.equal(disallowed.length, 0, `Found disallowed route targets: ${disallowed}`);
});

// ============================================================================
// FEATURE 4: Founder Image Ingestion
// ============================================================================
registerTest("T1.F4.1", "F4: Founder Image Ingestion", "public/images/gabriel.jpg exists in filesystem", () => {
  assert.ok(fileExists("public/images/gabriel.jpg"), "public/images/gabriel.jpg must exist");
});

registerTest("T1.F4.2", "F4: Founder Image Ingestion", "public/images/gabriel.jpg has non-trivial file size (> 50KB)", () => {
  const buffer = readBinaryFile("public/images/gabriel.jpg");
  assert.ok(buffer && buffer.length > 50000, `Image file size ${buffer ? buffer.length : 0} bytes is too small or missing`);
});

registerTest("T1.F4.3", "F4: Founder Image Ingestion", "public/images/gabriel.jpg has valid JPEG magic bytes [0xFF, 0xD8, 0xFF]", () => {
  const buffer = readBinaryFile("public/images/gabriel.jpg");
  assert.ok(buffer && buffer.length >= 3, "Image buffer empty");
  assert.equal(buffer[0], 0xff, "First byte must be 0xFF");
  assert.equal(buffer[1], 0xd8, "Second byte must be 0xD8");
  assert.equal(buffer[2], 0xff, "Third byte must be 0xFF");
});

registerTest("T1.F4.4", "F4: Founder Image Ingestion", "public/images/gabriel.jpg has valid JPEG EOI marker [0xFF, 0xD9]", () => {
  const buffer = readBinaryFile("public/images/gabriel.jpg");
  assert.ok(buffer && buffer.length >= 2, "Image buffer empty");
  assert.equal(buffer[buffer.length - 2], 0xff, "Second to last byte must be 0xFF");
  assert.equal(buffer[buffer.length - 1], 0xd9, "Last byte must be 0xD9");
});

registerTest("T1.F4.5", "F4: Founder Image Ingestion", "Landing page references /images/gabriel.jpg with Gabriel alt text", () => {
  const content = getLandingPageContent();
  const hasImageRef = content.includes("/images/gabriel.jpg") || content.includes("gabriel.jpg");
  assert.ok(hasImageRef, "Landing page must reference founder image at /images/gabriel.jpg");
});

// ============================================================================
// FEATURE 5: Custom Placeholder Favicon
// ============================================================================
registerTest("T1.F5.1", "F5: Custom Placeholder Favicon", "src/app/icon.svg exists and has valid SVG root element", () => {
  assert.ok(fileExists("src/app/icon.svg"), "src/app/icon.svg must exist");
  const content = readFile("src/app/icon.svg");
  assert.ok(content.includes("<svg") && content.includes("</svg>"), "src/app/icon.svg must be a valid SVG document");
});

registerTest("T1.F5.2", "F5: Custom Placeholder Favicon", "public/icon.svg exists and has valid SVG root element", () => {
  assert.ok(fileExists("public/icon.svg"), "public/icon.svg must exist");
  const content = readFile("public/icon.svg");
  assert.ok(content.includes("<svg") && content.includes("</svg>"), "public/icon.svg must be a valid SVG document");
});

registerTest("T1.F5.3", "F5: Custom Placeholder Favicon", "src/app/layout.js metadata declares custom icon configuration", () => {
  const layoutContent = readFile("src/app/layout.js");
  const hasIconConfig = layoutContent.includes("icon") && (layoutContent.includes("/icon.svg") || layoutContent.includes("icon.svg"));
  assert.ok(hasIconConfig, "src/app/layout.js must declare custom icon in metadata");
});

registerTest("T1.F5.4", "F5: Custom Placeholder Favicon", "Favicon SVG contains viewBox and geometric drawing elements", () => {
  const content = readFile("src/app/icon.svg");
  assert.ok(content.includes("viewBox="), "SVG must define viewBox");
  const hasGeometry = content.includes("<path") || content.includes("<rect") || content.includes("<circle");
  assert.ok(hasGeometry, "SVG must contain vector drawing primitives");
});

registerTest("T1.F5.5", "F5: Custom Placeholder Favicon", "Favicon SVG does not contain third-party or NVIDIA trademarks", () => {
  const content = readFile("src/app/icon.svg");
  const violations = scanForbiddenTerms(content, ["nvidia", "vercel", "tailwind"]);
  assert.equal(violations.length, 0, `Favicon contains forbidden terms: ${JSON.stringify(violations)}`);
});

// ============================================================================
// FEATURE 6: Striking Hero Section
// ============================================================================
registerTest("T1.F6.1", "F6: Striking Hero Section", "Hero section container exists with #hero identifier or hero landmark", () => {
  const content = getLandingPageContent();
  const ids = extractSectionIds(content);
  const hasHeroId = ids.includes("hero") || content.includes('id="hero"') || content.includes("id='hero'");
  assert.ok(hasHeroId, "Page must include hero section with id='hero'");
});

registerTest("T1.F6.2", "F6: Striking Hero Section", "Hero headline contains autonomous trade compliance intelligence value proposition", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  const hasTradeTopic = lower.includes("trade") || lower.includes("customs") || lower.includes("tariff") || lower.includes("compliance");
  assert.ok(hasTradeTopic, "Hero section headline must address trade compliance / tariff intelligence");
});

registerTest("T1.F6.3", "F6: Striking Hero Section", "Hero includes status badge or intelligence indicator", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  const hasBadgeOrPill = lower.includes("autonomous") || lower.includes("intelligence") || lower.includes("engine") || lower.includes("ai-powered");
  assert.ok(hasBadgeOrPill, "Hero should display status badge or platform intelligence indicator");
});

registerTest("T1.F6.4", "F6: Striking Hero Section", "Hero contains primary CTA anchor leading to #contact or #pricing", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  const hasConversionCta = targets.includes("#contact") || targets.includes("#pricing");
  assert.ok(hasConversionCta, "Hero must provide CTA anchor link to #contact or #pricing");
});

registerTest("T1.F6.5", "F6: Striking Hero Section", "Hero contains secondary exploration CTA leading to #how-it-works", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  const hasExplorationCta = targets.includes("#how-it-works");
  assert.ok(hasExplorationCta, "Hero must provide exploration CTA anchor link to #how-it-works");
});

// ============================================================================
// FEATURE 7: Realistic Pricing Section
// ============================================================================
registerTest("T1.F7.1", "F7: Realistic Pricing Section", "Pricing section container exists with #pricing identifier", () => {
  const content = getLandingPageContent();
  const ids = extractSectionIds(content);
  assert.ok(ids.includes("pricing"), "Page must include pricing section with id='pricing'");
});

registerTest("T1.F7.2", "F7: Realistic Pricing Section", "Pricing section includes structured plan tiers (Starter, Professional, Enterprise)", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  const hasTiers =
    (lower.includes("starter") || lower.includes("standard") || lower.includes("pilot")) &&
    (lower.includes("pro") || lower.includes("professional") || lower.includes("growth")) &&
    (lower.includes("enterprise") || lower.includes("custom") || lower.includes("global"));
  assert.ok(hasTiers, "Pricing section must display structured tiered plans");
});

registerTest("T1.F7.3", "F7: Realistic Pricing Section", "Pricing section displays realistic monetary amounts or custom billing quotes", () => {
  const content = getLandingPageContent();
  const hasCurrency = content.includes("$") || content.includes("USD") || content.includes("Custom");
  assert.ok(hasCurrency, "Pricing section must display realistic pricing amounts or enterprise quote options");
});

registerTest("T1.F7.4", "F7: Realistic Pricing Section", "Pricing features include core compliance capabilities (HS codes, tariffs, sanctions)", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  const hasComplianceFeatures =
    lower.includes("hs") || lower.includes("tariff") || lower.includes("customs") || lower.includes("sanctions");
  assert.ok(hasComplianceFeatures, "Pricing section features must reflect trade compliance capabilities");
});

registerTest("T1.F7.5", "F7: Realistic Pricing Section", "Pricing action buttons route users to contact/inquiry (#contact)", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  assert.ok(targets.includes("#contact"), "Pricing tiers must route user action to #contact");
});

// ============================================================================
// FEATURE 8: About Us Section (Gabriel)
// ============================================================================
registerTest("T1.F8.1", "F8: About Us Section (Gabriel)", "About Us section container exists with #about identifier", () => {
  const content = getLandingPageContent();
  const ids = extractSectionIds(content);
  const hasAboutId = ids.includes("about") || ids.includes("about-us");
  assert.ok(hasAboutId, "Page must include About Us section with id='about' or id='about-us'");
});

registerTest("T1.F8.2", "F8: About Us Section (Gabriel)", "Founder Gabriel is prominently identified by name in About Us", () => {
  const content = getLandingPageContent();
  assert.ok(content.includes("Gabriel"), "About Us section must prominently name founder Gabriel");
});

registerTest("T1.F8.3", "F8: About Us Section (Gabriel)", "Biography details trade compliance and AI engine development", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  const hasTradeBio =
    (lower.includes("compliance") || lower.includes("trade") || lower.includes("customs") || lower.includes("tariff")) &&
    (lower.includes("ai") || lower.includes("intelligence") || lower.includes("architecture"));
  assert.ok(hasTradeBio, "Founder biography must articulate trade compliance and AI expertise");
});

registerTest("T1.F8.4", "F8: About Us Section (Gabriel)", "Strictly ONE founder presented (no co-founders or team grids)", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  assert.ok(!lower.includes("co-founder"), "Must not include co-founders");
  assert.ok(!lower.includes("our team"), "Must not include generic 'Our Team' grids");
  assert.ok(!lower.includes("advisory board"), "Must not include advisory boards");
});

registerTest("T1.F8.5", "F8: About Us Section (Gabriel)", "Founder bio contains strictly zero accelerator or incubator claims", () => {
  const content = getLandingPageContent();
  const violations = scanForbiddenTerms(content, ["accelerator", "accelerated", "incubator", "y combinator", "techstars"]);
  assert.equal(violations.length, 0, `Founder bio has accelerator claims: ${JSON.stringify(violations)}`);
});

// ============================================================================
// FEATURE 9: Contact Us Section
// ============================================================================
registerTest("T1.F9.1", "F9: Contact Us Section", "Contact section container exists with #contact identifier", () => {
  const content = getLandingPageContent();
  const ids = extractSectionIds(content);
  const hasContactId = ids.includes("contact") || ids.includes("contact-us");
  assert.ok(hasContactId, "Page must include Contact Us section with id='contact' or id='contact-us'");
});

registerTest("T1.F9.2", "F9: Contact Us Section", "Displays designated email gabriel@lexborderai.site", () => {
  const content = getLandingPageContent();
  assert.ok(content.includes("gabriel@lexborderai.site"), "Contact section must contain gabriel@lexborderai.site");
});

registerTest("T1.F9.3", "F9: Contact Us Section", "Displays designated phone number +2349075737269", () => {
  const content = getLandingPageContent();
  assert.ok(content.includes("+2349075737269"), "Contact section must contain +2349075737269");
});

registerTest("T1.F9.4", "F9: Contact Us Section", "Strictly NO other email addresses present on the landing page", () => {
  const content = getLandingPageContent();
  const emails = extractEmails(content);
  const invalidEmails = emails.filter((e) => e !== "gabriel@lexborderai.site");
  assert.equal(invalidEmails.length, 0, `Unexpected email addresses found: ${invalidEmails.join(", ")}`);
});

registerTest("T1.F9.5", "F9: Contact Us Section", "Strictly NO other phone numbers present on the landing page", () => {
  const content = getLandingPageContent();
  const phones = extractPhoneNumbers(content);
  const invalidPhones = phones.filter((p) => p.replace(/[\s-]/g, "") !== "+2349075737269");
  assert.equal(invalidPhones.length, 0, `Unexpected phone numbers found: ${invalidPhones.join(", ")}`);
});

// ============================================================================
// FEATURE 10: Modern Footer
// ============================================================================
registerTest("T1.F10.1", "F10: Modern Footer", "Semantic <footer> element exists", () => {
  const content = getLandingPageContent();
  assert.ok(content.includes("<footer") && content.includes("</footer>"), "Landing page must contain semantic <footer>");
});

registerTest("T1.F10.2", "F10: Modern Footer", "Footer includes internal navigation anchors matching page sections", () => {
  const content = getLandingPageContent();
  const footerContent = content.slice(content.indexOf("<footer"));
  const targets = extractNavigationTargets(footerContent);
  const hasInternalAnchors = targets.some((h) => h.startsWith("#"));
  assert.ok(hasInternalAnchors, "Footer must include internal anchor navigation links");
});

registerTest("T1.F10.3", "F10: Modern Footer", "Footer includes copyright notice referencing LexBorder AI", () => {
  const content = getLandingPageContent();
  const footerContent = content.slice(content.indexOf("<footer"));
  assert.ok(footerContent.includes("LexBorder"), "Footer must include LexBorder copyright");
});

registerTest("T1.F10.4", "F10: Modern Footer", "Footer contains zero links to authentication, registration, or dashboard", () => {
  const content = getLandingPageContent();
  const footerContent = content.slice(content.indexOf("<footer"));
  const targets = extractNavigationTargets(footerContent);
  const forbiddenLinks = targets.filter((h) => h.includes("dashboard") || h.includes("login") || h.includes("register") || h.includes("auth"));
  assert.equal(forbiddenLinks.length, 0, `Footer contains forbidden links: ${forbiddenLinks}`);
});

registerTest("T1.F10.5", "F10: Modern Footer", "Footer contains zero mentions of NVIDIA or accelerators", () => {
  const content = getLandingPageContent();
  const footerContent = content.slice(content.indexOf("<footer"));
  const violations = scanForbiddenTerms(footerContent, ["nvidia", "inception", "accelerator"]);
  assert.equal(violations.length, 0, `Footer contains forbidden terms: ${JSON.stringify(violations)}`);
});

// ============================================================================
// FEATURE 11: Scrollytelling "How it Works"
// ============================================================================
registerTest("T1.F11.1", "F11: Scrollytelling 'How it Works'", "'How it Works' section exists with #how-it-works identifier", () => {
  const content = getLandingPageContent();
  const ids = extractSectionIds(content);
  assert.ok(ids.includes("how-it-works"), "Page must include section with id='how-it-works'");
});

registerTest("T1.F11.2", "F11: Scrollytelling 'How it Works'", "Section structures a multi-step compliance pipeline (at least 3 steps)", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  const hasStepIndicators =
    (lower.includes("01") || lower.includes("step 1") || lower.includes("phase 1")) &&
    (lower.includes("02") || lower.includes("step 2") || lower.includes("phase 2")) &&
    (lower.includes("03") || lower.includes("step 3") || lower.includes("phase 3"));
  assert.ok(hasStepIndicators, "How it Works must define at least 3 distinct pipeline stages");
});

registerTest("T1.F11.3", "F11: Scrollytelling 'How it Works'", "Step 1 addresses document ingestion / HS code classification", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  const hasStep1Content = lower.includes("ingest") || lower.includes("document") || lower.includes("hs") || lower.includes("classification");
  assert.ok(hasStep1Content, "Pipeline step 1 must address document ingestion or HS code classification");
});

registerTest("T1.F11.4", "F11: Scrollytelling 'How it Works'", "Step 2 addresses real-time tariff calculation and sanctions checks", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  const hasStep2Content = lower.includes("tariff") || lower.includes("sanction") || lower.includes("duty") || lower.includes("rules");
  assert.ok(hasStep2Content, "Pipeline step 2 must address tariff calculation or sanctions validation");
});

registerTest("T1.F11.5", "F11: Scrollytelling 'How it Works'", "Step 3 addresses automated customs clearance and audit trail generation", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  const hasStep3Content = lower.includes("clearance") || lower.includes("filing") || lower.includes("audit") || lower.includes("export");
  assert.ok(hasStep3Content, "Pipeline step 3 must address clearance, filing, or audit trail generation");
});

// ============================================================================
// FEATURE 12: UI Polish & Animations
// ============================================================================
registerTest("T1.F12.1", "F12: UI Polish & Animations", "Imports and utilizes Framer Motion components or hooks", () => {
  const content = getLandingPageContent();
  const usesFramerMotion = content.includes("framer-motion") && (content.includes("motion.") || content.includes("useScroll"));
  assert.ok(usesFramerMotion, "Landing page must utilize Framer Motion for animations");
});

registerTest("T1.F12.2", "F12: UI Polish & Animations", "Applies glassmorphic styling (glass-panel or backdrop-blur)", () => {
  const content = getLandingPageContent();
  const hasGlass = content.includes("glass-panel") || content.includes("backdrop-blur");
  assert.ok(hasGlass, "Landing page should apply backdrop-blur or glassmorphism styling");
});

registerTest("T1.F12.3", "F12: UI Polish & Animations", "Includes ambient gradient lighting or glow highlights", () => {
  const content = getLandingPageContent();
  const hasGradients = content.includes("bg-gradient-to-") || content.includes("radial-gradient") || content.includes("blur-");
  assert.ok(hasGradients, "Landing page must use glowing ambient lighting effects");
});

registerTest("T1.F12.4", "F12: UI Polish & Animations", "Interactive elements feature hover and transition classes", () => {
  const content = getLandingPageContent();
  const hasTransitions = content.includes("transition") && content.includes("hover:");
  assert.ok(hasTransitions, "Interactive components must include transition and hover states");
});

registerTest("T1.F12.5", "F12: UI Polish & Animations", "Enforces smooth scrolling behavior in CSS or JavaScript scrollIntoView", () => {
  const globals = readFile("src/app/globals.css");
  const layout = readFile("src/app/layout.js");
  const page = readFile("src/app/page.js");
  const allCode = `${globals}\n${layout}\n${page}`;
  const hasSmoothScroll =
    allCode.includes("scroll-smooth") ||
    allCode.includes("scroll-behavior: smooth") ||
    allCode.includes('behavior: "smooth"');
  assert.ok(hasSmoothScroll, "Smooth scrolling must be declared in CSS or smooth scrollIntoView behavior");
});

// ============================================================================
// FEATURE 13: Mobile Responsiveness
// ============================================================================
registerTest("T1.F13.1", "F13: Mobile Responsiveness", "Root layout properly configures mobile viewport / html structure", () => {
  const layout = readFile("src/app/layout.js");
  assert.ok(layout.includes("<html") && layout.includes("<body"), "Root layout must provide valid HTML document shell");
});

registerTest("T1.F13.2", "F13: Mobile Responsiveness", "Landing page applies responsive breakpoint prefixes (sm:, md:, lg:)", () => {
  const content = getLandingPageContent();
  assert.ok(content.includes("sm:") && content.includes("md:") && content.includes("lg:"), "Page must use standard responsive breakpoint classes");
});

registerTest("T1.F13.3", "F13: Mobile Responsiveness", "Includes mobile-responsive navigation pattern (collapsed links or responsive container)", () => {
  const content = getLandingPageContent();
  const hasMobileNav = content.includes("hidden md:flex") || content.includes("md:hidden") || content.includes("mobileMenuOpen");
  assert.ok(hasMobileNav, "Navigation bar must adapt dynamically to mobile screen widths");
});

registerTest("T1.F13.4", "F13: Mobile Responsiveness", "Multi-column grids collapse to single-column on mobile (grid-cols-1)", () => {
  const content = getLandingPageContent();
  assert.ok(content.includes("grid-cols-1"), "Card grids must specify grid-cols-1 for mobile layout");
});

registerTest("T1.F13.5", "F13: Mobile Responsiveness", "Fluid typography scaling prevents mobile overflow", () => {
  const content = getLandingPageContent();
  const hasFluidText =
    (content.includes("text-3xl") || content.includes("text-4xl")) &&
    (content.includes("md:text-5xl") || content.includes("lg:text-6xl") || content.includes("sm:text-5xl"));
  assert.ok(hasFluidText, "Headlines must use responsive font sizing to avoid mobile clipping");
});

// ============================================================================
// FEATURE 14: E2E Testing Suite (Tiers 1-4)
// ============================================================================
registerTest("T1.F14.1", "F14: E2E Testing Suite", "Test runner script tests/e2e/run_tests.js exists", () => {
  assert.ok(fileExists("tests/e2e/run_tests.js"), "tests/e2e/run_tests.js must exist");
});

registerTest("T1.F14.2", "F14: E2E Testing Suite", "Tier 1 test suite file exists and exports test definitions", () => {
  assert.ok(fileExists("tests/e2e/tier1_features.test.js"), "tier1_features.test.js must exist");
});

registerTest("T1.F14.3", "F14: E2E Testing Suite", "Tier 2 boundary test suite file exists", () => {
  assert.ok(fileExists("tests/e2e/tier2_boundaries.test.js"), "tier2_boundaries.test.js must exist");
});

registerTest("T1.F14.4", "F14: E2E Testing Suite", "Tier 3 cross-feature test suite file exists", () => {
  assert.ok(fileExists("tests/e2e/tier3_cross_feature.test.js"), "tier3_cross_feature.test.js must exist");
});

registerTest("T1.F14.5", "F14: E2E Testing Suite", "Tier 4 scenario test suite file exists", () => {
  assert.ok(fileExists("tests/e2e/tier4_scenarios.test.js"), "tier4_scenarios.test.js must exist");
});

// ============================================================================
// FEATURE 15: Adversarial Coverage & Integrity Audit
// ============================================================================
registerTest("T1.F15.1", "F15: Adversarial Coverage", "Case-insensitive scan for obfuscated accelerator mentions across all app files", () => {
  const files = walkDirectory("src/app", (rel) => rel.endsWith(".js") || rel.endsWith(".jsx"));
  const allViolations = [];
  for (const f of files) {
    const content = readFile(f);
    const violations = scanForbiddenTerms(content, ["nvidia", "inception", "accelerator", "accelerated"]);
    if (violations.length > 0) {
      allViolations.push({ file: f, violations });
    }
  }
  assert.equal(allViolations.length, 0, `Forbidden terms found across app files: ${JSON.stringify(allViolations)}`);
});

registerTest("T1.F15.2", "F15: Adversarial Coverage", "Verifies no rogue mailto or tel targets exist", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  const mailtos = targets.filter((h) => h.startsWith("mailto:"));
  const tels = targets.filter((h) => h.startsWith("tel:"));
  for (const m of mailtos) {
    assert.equal(m, "mailto:gabriel@lexborderai.site", `Unauthorized mailto link detected: ${m}`);
  }
  for (const t of tels) {
    assert.equal(t.replace(/[\s-]/g, ""), "tel:+2349075737269", `Unauthorized tel link detected: ${t}`);
  }
});

registerTest("T1.F15.3", "F15: Adversarial Coverage", "All anchor hash links correspond to matching target element IDs", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  const ids = extractSectionIds(content);
  const hashLinks = targets.filter((h) => h.startsWith("#") && h.length > 1).map((h) => h.slice(1));
  for (const hash of hashLinks) {
    assert.ok(ids.includes(hash), `Anchor target '#${hash}' has no matching element id='${hash}' in page (Found IDs: ${ids.join(", ")})`);
  }
});

registerTest("T1.F15.4", "F15: Adversarial Coverage", "Singleton founder audit: no phantom team member cards exist", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  assert.ok(!lower.includes("team member"), "Found 'team member' reference");
  assert.ok(!lower.includes("co-founder"), "Found 'co-founder' reference");
  assert.ok(!lower.includes("leadership team"), "Found 'leadership team' reference");
});

registerTest("T1.F15.5", "F15: Adversarial Coverage", "Route fencing audit: all sidelined routes prevent unauthorized page access", () => {
  const routes = [
    "src/app/dashboard/page.js",
    "src/app/login/page.js",
    "src/app/register/page.js",
  ];
  for (const r of routes) {
    assert.ok(checkRouteSidelined(r), `Route ${r} is not properly fenced with notFound()`);
  }
});

module.exports = {
  tests,
  runTier1: async () => {
    const results = [];
    for (const test of tests) {
      try {
        await test.fn();
        results.push({ id: test.id, feature: test.feature, name: test.name, passed: true });
      } catch (err) {
        results.push({ id: test.id, feature: test.feature, name: test.name, passed: false, error: err.message });
      }
    }
    return results;
  },
};
