const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('=== VICTORY AUDITOR INDEPENDENT INSPECTION ===');

// 1. Check all hrefs in src/app/page.js
const pageContent = fs.readFileSync('src/app/page.js', 'utf8');
const hrefRegex = /href=["']([^"']+)["']/g;
let m;
const hrefs = [];
while ((m = hrefRegex.exec(pageContent)) !== null) {
  hrefs.push(m[1]);
}
console.log('\n[1] HREFS IN src/app/page.js:');
console.log(hrefs);

// Check if any href points to SaaS routes
const forbiddenHrefs = ['/dashboard', '/login', '/register', '/onboarding', '/profile', '/pricing', '/api'];
const leaked = hrefs.filter(h => forbiddenHrefs.some(f => h.startsWith(f)));
console.log('Leaked SaaS hrefs:', leaked);

// 2. Scan entire src/ and public/ for forbidden terms
console.log('\n[2] FORBIDDEN TERM SCAN IN src/ & public/:');
const forbiddenTerms = ['nvidia', 'inception', 'accelerator', 'accelerated', 'y combinator', 'techstars'];
function scanDir(dir) {
  const matches = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      matches.push(...scanDir(p));
    } else {
      try {
        const text = fs.readFileSync(p, 'utf8');
        forbiddenTerms.forEach(term => {
          const re = new RegExp('\\b' + term + '\\b', 'i');
          if (re.test(text)) {
            matches.push({ file: p, term });
          }
        });
      } catch (err) {
        // binary file
      }
    }
  }
  return matches;
}

const srcViolations = scanDir('src');
const publicViolations = scanDir('public');
console.log('src violations:', srcViolations);
console.log('public violations:', publicViolations);

// 3. Scan emails and phones in src/app/page.js
console.log('\n[3] CONTACT EXCLUSIVITY IN src/app/page.js:');
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const phoneRegex = /\+?[0-9]{1,3}[-.\s]?\(?[0-9]{2,4}\)?[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,4}/g;
const emails = [...new Set(pageContent.match(emailRegex) || [])];
const phones = [...new Set(pageContent.match(phoneRegex) || [])];
console.log('Emails found:', emails);
console.log('Phones found:', phones);

// 4. Founder image hash check
console.log('\n[4] FOUNDER IMAGE HASH CHECK:');
const srcImg = 'C:/Users/Chidi/.gemini/antigravity/brain/7b82a8ae-c2ad-47ff-91c5-ad3b195b0df6/.user_uploaded/media_1790788256344.jpg';
const dstImg = 'public/images/gabriel.jpg';
const srcHash = crypto.createHash('sha256').update(fs.readFileSync(srcImg)).digest('hex');
const dstHash = crypto.createHash('sha256').update(fs.readFileSync(dstImg)).digest('hex');
console.log('Source image SHA256:', srcHash);
console.log('Dest image SHA256:  ', dstHash);
console.log('Hash match:         ', srcHash === dstHash);

// 5. Sections presence in src/app/page.js
console.log('\n[5] SECTION IDs IN src/app/page.js:');
const sections = ['hero', 'how-it-works', 'pricing', 'about', 'contact'];
sections.forEach(id => {
  const hasId = pageContent.includes(`id="${id}"`);
  console.log(`Section #${id}: ${hasId ? 'FOUND' : 'MISSING'}`);
});

// 6. Sidelined routes check
console.log('\n[6] SIDELINED ROUTES CHECK:');
const routes = [
  'src/app/dashboard/page.js',
  'src/app/dashboard/layout.js',
  'src/app/login/page.js',
  'src/app/register/page.js',
  'src/app/onboarding/page.js',
  'src/app/profile/page.js',
  'src/app/pricing/page.js',
  'src/app/api/auth/[...nextauth]/route.js',
  'src/app/api/auth/register/route.js',
];
routes.forEach(r => {
  const c = fs.readFileSync(r, 'utf8');
  const hasNotFound = c.includes('notFound()') || c.includes('new Response("Not Found", { status: 404 })');
  console.log(`${r}: ${hasNotFound ? 'SAFELY SIDELINED (404/notFound)' : 'NOT SIDELINED'}`);
});
