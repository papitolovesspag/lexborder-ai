/**
 * Tier 4: Real-World Application Scenarios Test Suite
 * End-to-end user journeys simulating real prospective clients, enterprise buyers,
 * supply chain executives, investors, and mobile users.
 */

const assert = require("node:assert/strict");
const {
  readFile,
  readBinaryFile,
  extractNavigationTargets,
  extractSectionIds,
  extractEmails,
  extractPhoneNumbers,
  scanForbiddenTerms,
} = require("./helpers");

const tests = [];

function registerTest(id, name, fn) {
  tests.push({ id, name, fn });
}

function getLandingPageContent() {
  return readFile("src/app/page.js");
}

// ============================================================================
// SCENARIO 1: Enterprise Compliance Officer Journey
// ============================================================================
registerTest("T4.SC.1", "Enterprise Compliance Officer: Evaluates platform, pipeline steps, and enterprise SLA", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  
  // 1. Compliance officer lands and inspects value proposition
  assert.ok(
    lower.includes("compliance") && (lower.includes("trade") || lower.includes("tariff") || lower.includes("customs")),
    "Compliance officer must identify global trade compliance focus immediately"
  );
  
  // 2. Evaluates the 3-step scrollytelling audit pipeline
  assert.ok(
    (lower.includes("hs") || lower.includes("classification")) &&
    (lower.includes("tariff") || lower.includes("duty") || lower.includes("sanctions")) &&
    (lower.includes("clearance") || lower.includes("filing") || lower.includes("audit")),
    "Compliance officer must find complete 3-stage compliance architecture"
  );
  
  // 3. Inspects Enterprise tier for enterprise-grade trade capabilities
  assert.ok(
    lower.includes("enterprise") && (lower.includes("custom") || lower.includes("dedicated") || lower.includes("unlimited") || lower.includes("sla")),
    "Compliance officer must find high-tier enterprise capability"
  );
  
  // 4. Locates verified direct line to founder Gabriel
  const emails = extractEmails(content);
  assert.ok(emails.includes("gabriel@lexborderai.site"), "Compliance officer must find direct founder email");
});

// ============================================================================
// SCENARIO 2: Supply Chain Director Pricing Review
// ============================================================================
registerTest("T4.SC.2", "Supply Chain Director: Compares tiered options and clicks through to contact", () => {
  const content = getLandingPageContent();
  const ids = extractSectionIds(content);
  const targets = extractNavigationTargets(content);
  
  // 1. Direct navigation via #pricing
  assert.ok(ids.includes("pricing"), "Supply Chain Director must find #pricing anchor target");
  
  // 2. Clear tiers present
  const lower = content.toLowerCase();
  const hasMultipleTiers = (lower.includes("starter") || lower.includes("pro")) && lower.includes("enterprise");
  assert.ok(hasMultipleTiers, "Must be able to compare entry tier against enterprise tier");
  
  // 3. Transparent figures or quote indicators
  assert.ok(content.includes("$") || content.includes("USD") || content.includes("Custom"), "Must show pricing indicators");
  
  // 4. Action connects to contact
  assert.ok(targets.includes("#contact"), "Pricing plan selection must guide user to #contact");
});

// ============================================================================
// SCENARIO 3: Investor / Venture Partner Founder Background Check
// ============================================================================
registerTest("T4.SC.3", "Investor Background Check: Verifies solo founder Gabriel and independent bootstrapping", () => {
  const content = getLandingPageContent();
  const lower = content.toLowerCase();
  
  // 1. Confirms founder Gabriel is clearly identified
  assert.ok(content.includes("Gabriel"), "Founder Gabriel must be prominently named");
  
  // 2. Confirms trade domain expertise
  assert.ok(
    lower.includes("trade") || lower.includes("customs") || lower.includes("regulatory") || lower.includes("cross-border"),
    "Founder profile must substantiate trade domain expertise"
  );
  
  // 3. Verifies zero accelerator affiliations (clean cap table / autonomous venture)
  const violations = scanForbiddenTerms(content, ["nvidia", "inception", "accelerator", "accelerated", "y combinator", "techstars"]);
  assert.equal(violations.length, 0, `Investor detects forbidden accelerator claims: ${JSON.stringify(violations)}`);
  
  // 4. Confirms exactly one founder depicted
  assert.ok(!lower.includes("co-founder"), "Investor detects co-founder claims when strictly 1 founder permitted");
  assert.ok(!lower.includes("team members"), "Investor detects team grid when strictly 1 founder permitted");
  
  // 5. Verifies founder image asset exists and is non-empty
  const buf = readBinaryFile("public/images/gabriel.jpg");
  assert.ok(buf && buf.length > 50000, "Founder photo must be present and verified");
});

// ============================================================================
// SCENARIO 4: Mobile Browser Inspection Simulation
// ============================================================================
registerTest("T4.SC.4", "Mobile Browser Simulation: Verifies responsive classes, mobile layouts, and touch targets", () => {
  const content = getLandingPageContent();
  
  // 1. Responsive container classes
  assert.ok(content.includes("max-w-") || content.includes("container"), "Mobile layout requires constrained width wrapper");
  assert.ok(content.includes("mx-auto"), "Mobile layout requires auto margins");
  
  // 2. Single column stacking on mobile
  assert.ok(content.includes("grid-cols-1"), "Grid elements must collapse to grid-cols-1 on mobile viewports");
  
  // 3. Breakpoint scaling
  assert.ok(content.includes("sm:") || content.includes("md:") || content.includes("lg:"), "Must use responsive Tailwind breakpoints");
  
  // 4. Image responsive wrapping
  assert.ok(
    content.includes("rounded-") && (content.includes("object-cover") || content.includes("w-full") || content.includes("max-w-")),
    "Founder image must use responsive presentation styling"
  );
});

// ============================================================================
// SCENARIO 5: Contact Initiation & Direct Communication Flow
// ============================================================================
registerTest("T4.SC.5", "Contact Initiation: Verifies exclusive channels, valid URI protocols, and zero data leakage", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  const emails = extractEmails(content);
  const phones = extractPhoneNumbers(content);
  
  // 1. Email verification
  assert.ok(emails.includes("gabriel@lexborderai.site"), "Must include gabriel@lexborderai.site");
  assert.equal(emails.length, 1, `Must contain strictly ONE email address, found: ${emails.join(", ")}`);
  
  // 2. Phone verification
  assert.ok(phones.some((p) => p.replace(/[\s-]/g, "") === "+2349075737269"), "Must include +2349075737269");
  const filteredPhones = phones.filter((p) => p.replace(/[\s-]/g, "") !== "+2349075737269");
  assert.equal(filteredPhones.length, 0, `Must contain strictly ONE phone number, found: ${filteredPhones.join(", ")}`);
  
  // 3. Navigation targets include #contact
  const contactTargets = targets.filter((h) => h === "#contact" || h.includes("#contact"));
  assert.ok(contactTargets.length > 0, "Must contain navigation targets to #contact section");
});

module.exports = {
  tests,
  runTier4: async () => {
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
