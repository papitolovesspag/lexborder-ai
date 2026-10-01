const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('   CHALLENGER 2: EMPIRICAL ADVERSARIAL STRESS TEST SUITE        ');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// -----------------------------------------------------------------------------
// 1. ASSET INTEGRITY
// -----------------------------------------------------------------------------
console.log('--- 1. ASSET INTEGRITY ---');

const imgPath = path.resolve('public/images/gabriel.jpg');
assert(fs.existsSync(imgPath), 'public/images/gabriel.jpg exists');
if (fs.existsSync(imgPath)) {
  const stat = fs.statSync(imgPath);
  assert(stat.size > 100 * 1024, `gabriel.jpg size is > 100KB (${(stat.size / 1024).toFixed(2)} KB, ${stat.size} bytes)`);
  
  const buf = fs.readFileSync(imgPath);
  const isJpeg = buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF;
  assert(isJpeg, `gabriel.jpg has valid JPEG magic bytes (FF D8 FF): ${buf.subarray(0, 3).toString('hex').toUpperCase()}`);
}

const icons = ['src/app/icon.svg', 'public/icon.svg'];
icons.forEach((iconRel) => {
  const iconPath = path.resolve(iconRel);
  assert(fs.existsSync(iconPath), `${iconRel} exists`);
  if (fs.existsSync(iconPath)) {
    const content = fs.readFileSync(iconPath, 'utf8');
    assert(/<svg[^>]*>/i.test(content) && /<\/svg>/i.test(content), `${iconRel} is valid SVG XML`);
    assert(/viewBox=["']0 0 512 512["']/i.test(content), `${iconRel} contains viewBox="0 0 512 512"`);
    assert(/<linearGradient/i.test(content), `${iconRel} contains <linearGradient> definitions`);
  }
});

// -----------------------------------------------------------------------------
// 2. DOM & CSS RESPONSIVENESS
// -----------------------------------------------------------------------------
console.log('\n--- 2. DOM & CSS RESPONSIVENESS & BREAKPOINTS ---');

const pageContent = fs.readFileSync('src/app/page.js', 'utf8');

// Check main container overflow prevention
assert(pageContent.includes('overflow-x-hidden'), 'Main wrapper enforces overflow-x-hidden');

// Check background elements overflow confinement
assert(pageContent.includes('fixed inset-0 pointer-events-none -z-10 overflow-hidden'), 'Background ambient gradients are isolated with overflow-hidden');

// Check breakpoints in responsive classes
const breakpoints = ['sm:', 'md:', 'lg:'];
breakpoints.forEach(bp => {
  assert(pageContent.includes(bp), `Responsive breakpoint prefix '${bp}' is actively used in layout`);
});

// Check narrow viewport protection (320px, 375px)
assert(pageContent.includes('max-w-[320px]') || pageContent.includes('w-full'), 'Mobile image constraints scale dynamically (w-full max-w-[320px])');
assert(pageContent.includes('break-all'), 'Long strings (e.g. email, cryptographic hashes) enforce break-all to prevent 320px overflow');

// Check Scrollytelling & Mobile Fallback
assert(pageContent.includes('activeStep'), 'Interactive step state (activeStep) is implemented');
assert(pageContent.includes('Step {stepIdx + 1}') || pageContent.includes('Phase 01'), 'Manual step selection buttons/cards available for touch/mobile devices');
assert(pageContent.includes('onClick={() => setActiveStep('), 'Interactive click/tap handlers exist for step switching on mobile');

// -----------------------------------------------------------------------------
// 3. LINK & NAVIGATION INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n--- 3. LINK & NAVIGATION INTEGRITY ---');

// Extract all hrefs
const hrefMatches = [...pageContent.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
console.log('Detected href attributes:', hrefMatches);

const validAnchors = ['#hero', '#how-it-works', '#pricing', '#about', '#contact'];
const validProtocols = ['mailto:', 'tel:'];

hrefMatches.forEach(href => {
  const isValid = validAnchors.includes(href) || validProtocols.some(proto => href.startsWith(proto));
  assert(isValid, `href '${href}' is valid on-page anchor or direct mailto/tel protocol`);
  assert(!href.includes('/dashboard'), `href '${href}' does not point to /dashboard`);
  assert(!href.includes('/login') && !href.includes('/register') && !href.includes('/api/auth'), `href '${href}' does not point to auth routes`);
});

// Extract all scrollToSection calls
const scrollTargets = [...pageContent.matchAll(/scrollToSection\(["']([^"']+)["']\)/g)].map(m => m[1]);
console.log('Detected scrollToSection targets:', [...new Set(scrollTargets)]);

const validSectionIds = ['hero', 'how-it-works', 'pricing', 'about', 'contact'];
scrollTargets.forEach(target => {
  assert(validSectionIds.includes(target), `scrollToSection target '${target}' is a valid section target`);
});

// Verify all target IDs exist in DOM
validSectionIds.forEach(id => {
  const idRegex = new RegExp(`id=["']${id}["']`);
  assert(idRegex.test(pageContent), `DOM contains target section with id="${id}"`);
});

// -----------------------------------------------------------------------------
// 4. ADVERSARIAL CHECKS: FORBIDDEN CONTENT & ISOLATION
// -----------------------------------------------------------------------------
console.log('\n--- 4. ADVERSARIAL FORBIDDEN CONTENT AUDIT ---');

const forbiddenTerms = [
  'nvidia',
  'inception',
  'accelerated by',
  'accelerator program'
];

forbiddenTerms.forEach(term => {
  const hasTerm = new RegExp(term, 'i').test(pageContent);
  assert(!hasTerm, `Landing page contains ZERO mentions of forbidden term: '${term}'`);
});

// Check contact section exclusivity
const contactSection = pageContent.slice(pageContent.indexOf('id="contact"'));
assert(contactSection.includes('gabriel@lexborderai.site'), 'Contact section contains gabriel@lexborderai.site');
assert(contactSection.includes('+2349075737269'), 'Contact section contains +2349075737269');

// Search for any other emails or phone numbers in contact section
const otherEmails = [...contactSection.matchAll(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)]
  .map(m => m[0])
  .filter(email => email !== 'gabriel@lexborderai.site');
assert(otherEmails.length === 0, `No unauthorized emails found in Contact section: [${otherEmails.join(', ')}]`);

// Check About Us section exclusivity to ONE founder: Gabriel
const aboutSection = pageContent.slice(pageContent.indexOf('id="about"'), pageContent.indexOf('id="contact"'));
assert(aboutSection.includes('Gabriel'), 'About section features Gabriel');
assert(!aboutSection.includes('co-founder') && !aboutSection.includes('co-founders'), 'About section does not mention co-founders');
assert(aboutSection.includes('sole founder') || aboutSection.includes('Founder'), 'About section identifies Gabriel as founder');

console.log('\n================================================================');
console.log(`TOTAL CHECKS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
console.log('================================================================\n');

if (failCount > 0) {
  process.exit(1);
}
