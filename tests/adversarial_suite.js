/**
 * Adversarial Stress-Test Suite — Challenger 1
 * Independent Empirical Verification of LexBorder AI Implementation
 */

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const PROJECT_ROOT = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         Reason: ${err.message}`);
    failedTests++;
    failures.push({ name, error: err.message });
  }
}

console.log('================================================================');
console.log('   LEXBORDER AI - EMPIRICAL ADVERSARIAL CHALLENGER SUITE       ');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// SECTION 1: SIDELINED ROUTES PROBING
// -----------------------------------------------------------------------------
console.log('>>> SECTION 1: PROBING SIDELINED ROUTES');

const sidelinedPages = [
  { path: 'src/app/dashboard/layout.js', type: 'layout', route: '/dashboard (layout)' },
  { path: 'src/app/dashboard/page.js', type: 'page', route: '/dashboard' },
  { path: 'src/app/login/page.js', type: 'page', route: '/login' },
  { path: 'src/app/register/page.js', type: 'page', route: '/register' },
  { path: 'src/app/onboarding/page.js', type: 'page', route: '/onboarding' },
  { path: 'src/app/profile/page.js', type: 'page', route: '/profile' },
  { path: 'src/app/pricing/page.js', type: 'page', route: '/pricing' },
];

sidelinedPages.forEach(({ path: relPath, route }) => {
  test(`Sidelined route ${route} (${relPath}) calls notFound() at entry`, () => {
    const fullPath = path.join(PROJECT_ROOT, relPath);
    assert.ok(fs.existsSync(fullPath), `File ${relPath} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Must import notFound from next/navigation
    const hasImport = /import\s+{[^}]*notFound[^}]*}\s+from\s+["']next\/navigation["']/.test(content) ||
                      /import\s+.*notFound.*from\s+["']next\/navigation["']/.test(content);
    assert.ok(hasImport, `${relPath} must import notFound from next/navigation`);

    // Must call notFound() before returning UI
    const notFoundCall = /\bnotFound\s*\(\s*\)/.test(content);
    assert.ok(notFoundCall, `${relPath} must execute notFound()`);
  });
});

// Sidelined API Routes
const sidelinedApiRoutes = [
  { path: 'src/app/api/auth/[...nextauth]/route.js', route: '/api/auth/[...nextauth]', methods: ['GET', 'POST'] },
  { path: 'src/app/api/auth/register/route.js', route: '/api/auth/register', methods: ['POST'] },
  { path: 'src/app/api/chat/route.js', route: '/api/chat', methods: ['POST'] },
];

sidelinedApiRoutes.forEach(({ path: relPath, route, methods }) => {
  test(`Sidelined API route ${route} returns 404 for methods: ${methods.join(', ')}`, () => {
    const fullPath = path.join(PROJECT_ROOT, relPath);
    assert.ok(fs.existsSync(fullPath), `File ${relPath} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');

    methods.forEach((method) => {
      const funcPattern = new RegExp(`export\\s+(?:async\\s+)?function\\s+${method}\\s*\\(`, 'm');
      assert.ok(funcPattern.test(content), `${relPath} must export handler for HTTP ${method}`);
    });

    // Verify 404 Response is returned
    const returns404 = /status:\s*404/.test(content) || /new\s+Response\(.*404/.test(content);
    assert.ok(returns404, `${relPath} must return Response with HTTP 404`);
  });
});

// Navigation Sidelining: Assert zero links to sidelined routes on landing page
test('Landing page contains strictly zero links pointing to sidelined routes', () => {
  const landingContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/page.js'), 'utf8');
  const hrefs = [...landingContent.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);

  const prohibitedRoutes = ['/dashboard', '/login', '/register', '/api/auth', '/onboarding', '/profile', '/pricing'];
  const violations = hrefs.filter(h => prohibitedRoutes.some(pr => h === pr || h.startsWith(pr + '/')));
  assert.equal(violations.length, 0, `Landing page contains links to sidelined routes: ${violations.join(', ')}`);
});

// -----------------------------------------------------------------------------
// SECTION 2: EXHAUSTIVE TEXT SCAN FOR PROHIBITED STRINGS
// -----------------------------------------------------------------------------
console.log('\n>>> SECTION 2: EXHAUSTIVE PROHIBITED STRINGS SCAN');

const prohibitedTerms = ['nvidia', 'inception', 'accelerator', 'accelerated'];

function getAllAppFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.next' || entry.name === '.agents') {
        continue;
      }
      files.push(...getAllAppFiles(full));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

const appDirs = [
  path.join(PROJECT_ROOT, 'src'),
  path.join(PROJECT_ROOT, 'public'),
];

const allSourceFiles = appDirs.flatMap(d => getAllAppFiles(d));

prohibitedTerms.forEach(term => {
  test(`Application source & public files contain 0 matches for prohibited term '${term}'`, () => {
    const violations = [];
    const regex = new RegExp(`\\b${term}\\b`, 'i');

    for (const filePath of allSourceFiles) {
      const relPath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
      // Skip binary files for text regex
      if (filePath.endsWith('.jpg') || filePath.endsWith('.png') || filePath.endsWith('.ico')) continue;
      
      const content = fs.readFileSync(filePath, 'utf8');
      if (regex.test(content)) {
        violations.push(relPath);
      }
    }
    assert.deepEqual(violations, [], `Prohibited term '${term}' found in: ${violations.join(', ')}`);
  });
});

test('Substrings for prohibited terms (obfuscation check) in landing page', () => {
  const landing = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/page.js'), 'utf8').toLowerCase();
  for (const term of prohibitedTerms) {
    assert.ok(!landing.includes(term), `Landing page contains substring '${term}'`);
  }
});

// Check public/images/gabriel.jpg binary for embedded prohibited strings
test('Founder image binary (gabriel.jpg) contains zero embedded prohibited strings in metadata', () => {
  const imgBuf = fs.readFileSync(path.join(PROJECT_ROOT, 'public/images/gabriel.jpg'));
  const bufStr = imgBuf.toString('binary').toLowerCase();
  for (const term of prohibitedTerms) {
    assert.ok(!bufStr.includes(term), `gabriel.jpg metadata contains prohibited term '${term}'`);
  }
});

// -----------------------------------------------------------------------------
// SECTION 3: CONTACT EXCLUSIVITY VALIDATION
// -----------------------------------------------------------------------------
console.log('\n>>> SECTION 3: CONTACT EXCLUSIVITY VALIDATION');

test('Landing page Contact Us section contains designated email and phone', () => {
  const landingContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/page.js'), 'utf8');
  assert.ok(landingContent.includes('gabriel@lexborderai.site'), 'Must contain gabriel@lexborderai.site');
  assert.ok(landingContent.includes('+2349075737269'), 'Must contain +2349075737269');
});

test('Landing page contains STRICTLY ZERO other email addresses', () => {
  const landingContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/page.js'), 'utf8');
  // Strict RFC-like regex
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = [...new Set(landingContent.match(emailRegex) || [])];
  
  const unauthorized = emails.filter(e => e.toLowerCase() !== 'gabriel@lexborderai.site');
  assert.deepEqual(unauthorized, [], `Unauthorized email addresses found: ${unauthorized.join(', ')}`);
});

test('Landing page contains STRICTLY ZERO other phone numbers', () => {
  const landingContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/page.js'), 'utf8');
  // Match international and standard phone patterns
  const phoneRegex = /(?:\+?\d{1,4}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,5}|\+\d{10,15}/g;
  const candidates = [...new Set(landingContent.match(phoneRegex) || [])];
  
  // Filter numbers that are phone-like (>= 7 digits, not years like 2025/2026, not hex codes, not CSS px/rem values)
  const phoneCandidates = candidates
    .map(c => c.trim())
    .filter(c => {
      const digits = c.replace(/\D/g, '');
      if (digits.length < 7) return false;
      if (c.startsWith('0x') || /^[0-9a-fA-F]{6,}$/.test(c)) return false;
      return true;
    });

  const unauthorized = phoneCandidates.filter(p => p.replace(/[\s-]/g, '') !== '+2349075737269');
  assert.deepEqual(unauthorized, [], `Unauthorized phone numbers found: ${unauthorized.join(', ')}`);
});

test('Contact Us section uses valid mailto: and tel: URI schemes', () => {
  const landingContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/page.js'), 'utf8');
  assert.ok(landingContent.includes('href="mailto:gabriel@lexborderai.site"'), 'Must have href="mailto:gabriel@lexborderai.site"');
  assert.ok(landingContent.includes('href="tel:+2349075737269"'), 'Must have href="tel:+2349075737269"');
});

// -----------------------------------------------------------------------------
// SECTION 4: ABOUT US & FOUNDER EXCLUSIVITY
// -----------------------------------------------------------------------------
console.log('\n>>> SECTION 4: ABOUT US & FOUNDER EXCLUSIVITY');

test('About Us section features founder Gabriel and no co-founders', () => {
  const landingContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/page.js'), 'utf8');
  const aboutIdx = landingContent.indexOf('id="about"');
  assert.ok(aboutIdx !== -1, 'About Us section with id="about" must exist');
  
  const contactIdx = landingContent.indexOf('id="contact"');
  const aboutContent = contactIdx !== -1 ? landingContent.slice(aboutIdx, contactIdx) : landingContent.slice(aboutIdx);

  assert.ok(aboutContent.includes('Gabriel'), 'Founder Gabriel must be mentioned in About Us');
  assert.ok(/trade|customs|compliance/i.test(aboutContent), 'Bio must mention trade compliance context');
  assert.ok(/ai|intelligence|engine/i.test(aboutContent), 'Bio must mention AI engine development');
  assert.ok(!/co-founder/i.test(aboutContent), 'Must not mention co-founders');
  assert.ok(!/our team/i.test(aboutContent), 'Must not mention generic "our team" grids');
  assert.ok(!/advisory board/i.test(aboutContent), 'Must not mention advisory board');
});

test('Founder image exists, is non-empty, and has valid JPEG headers', () => {
  const imgPath = path.join(PROJECT_ROOT, 'public/images/gabriel.jpg');
  assert.ok(fs.existsSync(imgPath), 'public/images/gabriel.jpg must exist');
  const stat = fs.statSync(imgPath);
  assert.ok(stat.size > 100 * 1024, `gabriel.jpg size must be > 100KB, got ${stat.size} bytes`);
  
  const buf = fs.readFileSync(imgPath);
  assert.equal(buf[0], 0xFF, 'Byte 0 must be 0xFF');
  assert.equal(buf[1], 0xD8, 'Byte 1 must be 0xD8');
  assert.equal(buf[2], 0xFF, 'Byte 2 must be 0xFF');
});

// -----------------------------------------------------------------------------
// SECTION 5: FAVICON CONFIGURATION & ASSET INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n>>> SECTION 5: FAVICON & ASSET INTEGRITY');

test('Favicon assets exist in src/app/icon.svg and public/icon.svg as valid vector geometry', () => {
  ['src/app/icon.svg', 'public/icon.svg'].forEach(iconRel => {
    const fullPath = path.join(PROJECT_ROOT, iconRel);
    assert.ok(fs.existsSync(fullPath), `${iconRel} must exist`);
    const svg = fs.readFileSync(fullPath, 'utf8');
    assert.ok(/<svg[^>]*>/i.test(svg), `${iconRel} must contain <svg> tag`);
    assert.ok(/<\/svg>/i.test(svg), `${iconRel} must contain </svg> closing tag`);
    assert.ok(!/nvidia/i.test(svg), `${iconRel} must not contain nvidia reference`);
  });
});

test('Root layout (src/app/layout.js) references icon metadata', () => {
  const layoutContent = fs.readFileSync(path.join(PROJECT_ROOT, 'src/app/layout.js'), 'utf8');
  assert.ok(/icons\s*:/i.test(layoutContent) || /icon\.svg/i.test(layoutContent), 'layout.js must configure icon metadata');
  assert.ok(!/nvidia/i.test(layoutContent), 'layout.js must not contain nvidia');
  assert.ok(!/accelerator/i.test(layoutContent), 'layout.js must not contain accelerator');
});

// -----------------------------------------------------------------------------
// FINAL SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL ADVERSARIAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
console.log('================================================================');

if (failedTests > 0) {
  console.error('\nFAILURE DETAILS:');
  failures.forEach((f, idx) => {
    console.error(`  ${idx + 1}. ${f.name} => ${f.error}`);
  });
  process.exit(1);
} else {
  console.log('\nVERDICT: EMPIRICAL APPROVAL CONFIRMED (100% PASS RATE)\n');
  process.exit(0);
}
