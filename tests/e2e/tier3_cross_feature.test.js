/**
 * Tier 3: Cross-Feature Integration Test Suite
 * Tests multi-module contracts, anchor-to-section parity, conversion funnels,
 * layout consistency, and brand identity synchronization.
 */

const assert = require("node:assert/strict");
const {
  readFile,
  extractNavigationTargets,
  extractSectionIds,
  extractEmails,
  extractPhoneNumbers,
} = require("./helpers");

const tests = [];

function registerTest(id, name, fn) {
  tests.push({ id, name, fn });
}

function getLandingPageContent() {
  return readFile("src/app/page.js");
}

// ============================================================================
// CROSS-FEATURE 1: Anchor Targets ↔ Section ID Parity
// ============================================================================
registerTest("T3.CF.1", "Header navbar navigation anchors match corresponding section IDs", () => {
  const content = getLandingPageContent();
  const ids = extractSectionIds(content);
  const targets = extractNavigationTargets(content);
  
  const expectedSections = ["how-it-works", "pricing", "about", "contact"];
  for (const sec of expectedSections) {
    assert.ok(
      ids.includes(sec) || ids.includes(`${sec}-us`),
      `Expected section id='${sec}' or id='${sec}-us' not found in page elements (Available IDs: ${ids.join(", ")})`
    );
    assert.ok(
      targets.includes(`#${sec}`) || targets.includes(`#${sec}-us`),
      `Expected navigation target '#${sec}' not found in page navigation (Available targets: ${targets.join(", ")})`
    );
  }
});

registerTest("T3.CF.2", "Footer anchor navigation links resolve to valid in-page sections", () => {
  const content = getLandingPageContent();
  const footerStart = content.indexOf("<footer");
  assert.ok(footerStart !== -1, "Footer element must be present in landing page");
  
  const footerContent = content.slice(footerStart);
  const footerTargets = extractNavigationTargets(footerContent);
  const ids = extractSectionIds(content);
  
  const hashLinks = footerTargets.filter((h) => h.startsWith("#") && h.length > 1).map((h) => h.slice(1));
  for (const hash of hashLinks) {
    assert.ok(
      ids.includes(hash),
      `Footer links to '#${hash}', but no element exists with id='${hash}' (Found IDs: ${ids.join(", ")})`
    );
  }
});

// ============================================================================
// CROSS-FEATURE 2: Hero Section ↔ Conversion Funnel Integration
// ============================================================================
registerTest("T3.CF.3", "Hero CTAs seamlessly route to product discovery (#how-it-works) and conversion (#pricing/#contact)", () => {
  const content = getLandingPageContent();
  const heroIndex = content.indexOf('id="hero"') !== -1 ? content.indexOf('id="hero"') : content.indexOf("id='hero'");
  const heroSlice = heroIndex !== -1 ? content.slice(heroIndex, heroIndex + 4000) : content;
  const targets = extractNavigationTargets(heroSlice);
  
  const hasDiscovery = targets.includes("#how-it-works");
  const hasConversion = targets.includes("#pricing") || targets.includes("#contact");
  
  assert.ok(hasDiscovery, "Hero must provide discovery anchor to #how-it-works");
  assert.ok(hasConversion, "Hero must provide conversion anchor to #contact or #pricing");
});

// ============================================================================
// CROSS-FEATURE 3: Pricing Tiers ↔ Contact Action Parity
// ============================================================================
registerTest("T3.CF.4", "Pricing tier CTA buttons route directly to dedicated founder contact (#contact)", () => {
  const content = getLandingPageContent();
  const pricingIndex = content.indexOf('id="pricing"') !== -1 ? content.indexOf('id="pricing"') : content.indexOf("id='pricing'");
  assert.ok(pricingIndex !== -1, "Pricing section must exist");
  
  const nextSectionIndex = content.indexOf("<section", pricingIndex + 10);
  const pricingSlice = nextSectionIndex !== -1 ? content.slice(pricingIndex, nextSectionIndex) : content.slice(pricingIndex);
  const pricingTargets = extractNavigationTargets(pricingSlice);
  
  const routesToContact = pricingTargets.some((h) => h.includes("#contact"));
  assert.ok(routesToContact, `Pricing tier CTAs must route to #contact (Targets in pricing: ${pricingTargets.join(", ")})`);
});

// ============================================================================
// CROSS-FEATURE 4: About Us Section ↔ Contact Channel Integration
// ============================================================================
registerTest("T3.CF.5", "About Us section features founder Gabriel and synchronizes with Contact Us details", () => {
  const content = getLandingPageContent();
  assert.ok(content.includes("Gabriel"), "About section must feature Gabriel");
  
  const emails = extractEmails(content);
  const phones = extractPhoneNumbers(content);
  
  assert.ok(emails.includes("gabriel@lexborderai.site"), "Expected gabriel@lexborderai.site");
  assert.ok(phones.some((p) => p.replace(/[\s-]/g, "") === "+2349075737269"), "Expected +2349075737269");
});

// ============================================================================
// CROSS-FEATURE 5: Responsive Layout Classes Across All Major Sections
// ============================================================================
registerTest("T3.CF.6", "Major page sections apply consistent max-width and horizontal padding containers", () => {
  const content = getLandingPageContent();
  assert.ok(content.includes("max-w-") || content.includes("container"), "Page must define responsive max-width containers");
  assert.ok(content.includes("mx-auto"), "Page containers must center horizontally with mx-auto");
  assert.ok(content.includes("px-") || content.includes("p-"), "Page must define horizontal padding for responsive margins");
});

// ============================================================================
// CROSS-FEATURE 6: Brand Identity Consistency
// ============================================================================
registerTest("T3.CF.7", "Brand name 'LexBorder' is consistently unified across layout metadata, header, and footer", () => {
  const layout = readFile("src/app/layout.js");
  const content = getLandingPageContent();
  
  assert.ok(layout.includes("LexBorder"), "Layout metadata title must include 'LexBorder'");
  assert.ok(content.includes("LexBorder"), "Landing page content must include 'LexBorder'");
  assert.ok(content.includes("©"), "Landing page must include copyright symbol");
});

// ============================================================================
// CROSS-FEATURE 7: Route Isolation & Perimeter Enforcement
// ============================================================================
registerTest("T3.CF.8", "Sidelined route contracts strictly align with zero navigation links", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  
  const sidelinedRoutes = ["/dashboard", "/login", "/register", "/onboarding", "/profile", "/api/auth"];
  for (const route of sidelinedRoutes) {
    const leakedLinks = targets.filter((h) => h === route || h.startsWith(`${route}/`));
    assert.equal(
      leakedLinks.length,
      0,
      `Landing page leaks navigation to sidelined route '${route}': ${leakedLinks.join(", ")}`
    );
  }
});

module.exports = {
  tests,
  runTier3: async () => {
    const results = [];
    for (const test of tests) {
      try {
        await test.fn();
        results.push({ id: test.id, name: test.name, passed: true });
      } catch (err) {
        results.push({ id: test.id, name: test.name, passed: false, error: err.message });
      }
    }
    return results;
  },
};
