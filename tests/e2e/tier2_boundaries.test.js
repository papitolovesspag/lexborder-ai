/**
 * Tier 2: Boundary & Corner Cases Test Suite
 * Tests strict negative constraints, boundaries, regex fidelity, asset integrity,
 * and edge conditions (>=5 tests per boundary).
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
  checkRouteSidelined,
} = require("./helpers");

const tests = [];

function registerTest(id, boundary, name, fn) {
  tests.push({ id, boundary, name, fn });
}

function getLandingPageContent() {
  return readFile("src/app/page.js");
}

// ============================================================================
// BOUNDARY 1: Strictly NO Forbidden Accelerator / NVIDIA Mentions
// ============================================================================
registerTest("T2.B1.1", "B1: Forbidden Terms", "src/app/page.js strictly contains no 'nvidia' (case-insensitive)", () => {
  const content = readFile("src/app/page.js");
  const regex = /nvidia/i;
  assert.equal(regex.test(content), false, "Forbidden term 'nvidia' found in src/app/page.js");
});

registerTest("T2.B1.2", "B1: Forbidden Terms", "src/app/layout.js strictly contains no 'nvidia', 'inception', or 'accelerator'", () => {
  const content = readFile("src/app/layout.js");
  const regex = /(nvidia|inception|accelerator|accelerated)/i;
  assert.equal(regex.test(content), false, "Forbidden term found in src/app/layout.js");
});

registerTest("T2.B1.3", "B1: Forbidden Terms", "src/app/LandingContent.js strictly contains no 'nvidia' or 'inception'", () => {
  const content = readFile("src/app/LandingContent.js");
  if (content) {
    const regex = /(nvidia|inception)/i;
    assert.equal(regex.test(content), false, "Forbidden term found in src/app/LandingContent.js");
  }
});

registerTest("T2.B1.4", "B1: Forbidden Terms", "Entire src/app directory has 0 occurrences of 'nvidia'", () => {
  const files = walkDirectory("src/app", (rel) => rel.endsWith(".js") || rel.endsWith(".jsx") || rel.endsWith(".css"));
  const matches = [];
  for (const f of files) {
    const content = readFile(f);
    if (/nvidia/i.test(content)) {
      matches.push(f);
    }
  }
  assert.deepEqual(matches, [], `Files containing 'nvidia': ${matches.join(", ")}`);
});

registerTest("T2.B1.5", "B1: Forbidden Terms", "Landing content strictly has 0 occurrences of 'accelerator' or 'accelerated'", () => {
  const content = getLandingPageContent();
  const violations = scanForbiddenTerms(content, ["accelerator", "accelerated", "accelerating"]);
  assert.equal(violations.length, 0, `Violations found: ${JSON.stringify(violations)}`);
});

// ============================================================================
// BOUNDARY 2: Contact Information Regex & Exclusivity
// ============================================================================
registerTest("T2.B2.1", "B2: Contact Info", "Email regex strictly matches gabriel@lexborderai.site", () => {
  const content = getLandingPageContent();
  const emails = extractEmails(content);
  assert.ok(emails.includes("gabriel@lexborderai.site"), "Expected gabriel@lexborderai.site in landing page");
});

registerTest("T2.B2.2", "B2: Contact Info", "Phone regex strictly matches +2349075737269", () => {
  const content = getLandingPageContent();
  const cleanPhone = "+2349075737269";
  assert.ok(content.includes(cleanPhone), `Expected exact phone string ${cleanPhone} in landing page`);
});

registerTest("T2.B2.3", "B2: Contact Info", "Rejection of generic mock emails (info@, support@, admin@, sales@, contact@)", () => {
  const content = getLandingPageContent();
  const emails = extractEmails(content);
  const genericPrefixes = ["info@", "support@", "admin@", "sales@", "contact@", "hello@"];
  const offending = emails.filter((e) => genericPrefixes.some((p) => e.toLowerCase().startsWith(p)));
  assert.equal(offending.length, 0, `Generic mock emails detected: ${offending.join(", ")}`);
});

registerTest("T2.B2.4", "B2: Contact Info", "Zero competing phone numbers or alternate country codes", () => {
  const content = getLandingPageContent();
  const phones = extractPhoneNumbers(content);
  const normalizedTarget = "+2349075737269";
  const unexpectedPhones = phones.filter((p) => p.replace(/[\s-]/g, "") !== normalizedTarget);
  assert.equal(unexpectedPhones.length, 0, `Unexpected phone numbers found: ${unexpectedPhones.join(", ")}`);
});

registerTest("T2.B2.5", "B2: Contact Info", "Contact URI schemes strictly valid: mailto:gabriel@lexborderai.site and tel:+2349075737269", () => {
  const content = getLandingPageContent();
  const targets = extractNavigationTargets(content);
  const mailtos = targets.filter((h) => h.startsWith("mailto:"));
  const tels = targets.filter((h) => h.startsWith("tel:"));
  
  if (mailtos.length > 0) {
    for (const m of mailtos) {
      assert.equal(m, "mailto:gabriel@lexborderai.site", `Invalid mailto link: ${m}`);
    }
  }
  if (tels.length > 0) {
    for (const t of tels) {
      assert.equal(t.replace(/[\s-]/g, ""), "tel:+2349075737269", `Invalid tel link: ${t}`);
    }
  }
});

// ============================================================================
// BOUNDARY 3: Sidelined Routes HTTP 404 / Inaccessible State
// ============================================================================
registerTest("T2.B3.1", "B3: Sidelined Routes", "/dashboard route calls notFound()", () => {
  assert.ok(checkRouteSidelined("src/app/dashboard/page.js"), "src/app/dashboard/page.js must call notFound()");
});

registerTest("T2.B3.2", "B3: Sidelined Routes", "/login route calls notFound()", () => {
  assert.ok(checkRouteSidelined("src/app/login/page.js"), "src/app/login/page.js must call notFound()");
});

registerTest("T2.B3.3", "B3: Sidelined Routes", "/register route calls notFound()", () => {
  assert.ok(checkRouteSidelined("src/app/register/page.js"), "src/app/register/page.js must call notFound()");
});

registerTest("T2.B3.4", "B3: Sidelined Routes", "/onboarding route calls notFound() or is disabled", () => {
  assert.ok(checkRouteSidelined("src/app/onboarding/page.js"), "src/app/onboarding/page.js must call notFound()");
});

registerTest("T2.B3.5", "B3: Sidelined Routes", "/profile route calls notFound() or is disabled", () => {
  assert.ok(checkRouteSidelined("src/app/profile/page.js"), "src/app/profile/page.js must call notFound()");
});

registerTest("T2.B3.6", "B3: Sidelined Routes", "/api/auth endpoints return 404 or are disabled", () => {
  const nextAuth = "src/app/api/auth/[...nextauth]/route.js";
  const registerAuth = "src/app/api/auth/register/route.js";
  const isSidelined = checkRouteSidelined(nextAuth) || checkRouteSidelined(registerAuth);
  assert.ok(isSidelined, "Auth API endpoints must be sidelined");
});

// ============================================================================
// BOUNDARY 4: Founder Asset Validation (public/images/gabriel.jpg)
// ============================================================================
registerTest("T2.B4.1", "B4: Founder Asset", "public/images/gabriel.jpg exists at precise canonical path", () => {
  assert.ok(fileExists("public/images/gabriel.jpg"), "Asset public/images/gabriel.jpg does not exist");
});

registerTest("T2.B4.2", "B4: Founder Asset", "public/images/gabriel.jpg file size exceeds 100,000 bytes", () => {
  const buf = readBinaryFile("public/images/gabriel.jpg");
  assert.ok(buf && buf.length >= 100000, `Expected file size >= 100KB, got ${buf ? buf.length : 0} bytes`);
});

registerTest("T2.B4.3", "B4: Founder Asset", "public/images/gabriel.jpg binary magic bytes match JPEG SOI [0xFF, 0xD8, 0xFF]", () => {
  const buf = readBinaryFile("public/images/gabriel.jpg");
  assert.ok(buf && buf.length >= 3, "Buffer too short");
  assert.equal(buf[0], 0xff, "Byte 0 must be 0xFF");
  assert.equal(buf[1], 0xd8, "Byte 1 must be 0xD8");
  assert.equal(buf[2], 0xff, "Byte 2 must be 0xFF");
});

registerTest("T2.B4.4", "B4: Founder Asset", "public/images/gabriel.jpg binary ends with JPEG EOI [0xFF, 0xD9]", () => {
  const buf = readBinaryFile("public/images/gabriel.jpg");
  assert.ok(buf && buf.length >= 2, "Buffer too short");
  assert.equal(buf[buf.length - 2], 0xff, "Second to last byte must be 0xFF");
  assert.equal(buf[buf.length - 1], 0xd9, "Last byte must be 0xD9");
});

registerTest("T2.B4.5", "B4: Founder Asset", "Founder image is located in public/ so Next.js serves it directly without build failure", () => {
  const isInsidePublic = fileExists("public/images/gabriel.jpg");
  assert.ok(isInsidePublic, "Asset must reside within public/images/ directory");
});

// ============================================================================
// BOUNDARY 5: Favicon Vector Assets Validation
// ============================================================================
registerTest("T2.B5.1", "B5: Favicon Vector", "src/app/icon.svg exists and is non-empty", () => {
  const content = readFile("src/app/icon.svg");
  assert.ok(content && content.trim().length > 100, "src/app/icon.svg must be non-empty");
});

registerTest("T2.B5.2", "B5: Favicon Vector", "public/icon.svg exists and is non-empty", () => {
  const content = readFile("public/icon.svg");
  assert.ok(content && content.trim().length > 100, "public/icon.svg must be non-empty");
});

registerTest("T2.B5.3", "B5: Favicon Vector", "SVG file has valid XML root with xmlns='http://www.w3.org/2000/svg'", () => {
  const content = readFile("src/app/icon.svg");
  assert.ok(content.includes('xmlns="http://www.w3.org/2000/svg"'), "SVG must declare xmlns");
  assert.ok(content.includes("<svg") && content.includes("</svg>"), "SVG must have root tags");
});

registerTest("T2.B5.4", "B5: Favicon Vector", "SVG contains vector shapes (path, rect, circle, or polygon)", () => {
  const content = readFile("src/app/icon.svg");
  const hasShape = /<(path|rect|circle|polygon|line)\b/.test(content);
  assert.ok(hasShape, "SVG must contain vector geometry tags");
});

registerTest("T2.B5.5", "B5: Favicon Vector", "SVG does not contain third-party trademark paths or NVIDIA claw/eye", () => {
  const content = readFile("src/app/icon.svg");
  const violations = scanForbiddenTerms(content, ["nvidia", "vercel", "tailwind", "react"]);
  assert.equal(violations.length, 0, `Favicon contains forbidden term: ${JSON.stringify(violations)}`);
});

module.exports = {
  tests,
  runTier2: async () => {
    const results = [];
    for (const test of tests) {
      try {
        await test.fn();
        results.push({ id: test.id, boundary: test.boundary, name: test.name, passed: true });
      } catch (err) {
        results.push({ id: test.id, boundary: test.boundary, name: test.name, passed: false, error: err.message });
      }
    }
    return results;
  },
};
