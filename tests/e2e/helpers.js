/**
 * LexBorder AI E2E Test Suite - Shared Helpers & Utilities
 * Provides AST/file-inspection, pattern scanning, asset integrity validation,
 * navigation target extraction, and test harness helpers for Tiers 1-4.
 */

const fs = require("node:fs");
const path = require("node:path");

const PROJECT_ROOT = path.resolve(__dirname, "../..");

/**
 * Resolve an absolute path relative to the project root.
 */
function resolvePath(...segments) {
  return path.resolve(PROJECT_ROOT, ...segments);
}

/**
 * Check if a file exists synchronously.
 */
function fileExists(relPath) {
  return fs.existsSync(resolvePath(relPath));
}

/**
 * Read file as UTF-8 text string. Returns empty string if file missing.
 */
function readFile(relPath) {
  const fullPath = resolvePath(relPath);
  if (!fs.existsSync(fullPath)) return "";
  return fs.readFileSync(fullPath, "utf-8");
}

/**
 * Read file as binary Buffer.
 */
function readBinaryFile(relPath) {
  const fullPath = resolvePath(relPath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath);
}

/**
 * Recursively walk directory and return array of file paths relative to project root.
 */
function walkDirectory(dirRelPath, filter = () => true) {
  const fullDir = resolvePath(dirRelPath);
  if (!fs.existsSync(fullDir)) return [];

  const results = [];
  function _walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        // Skip node_modules, .git, .next, .agents
        if (
          entry.name === "node_modules" ||
          entry.name === ".git" ||
          entry.name === ".next" ||
          entry.name === ".agents"
        ) {
          continue;
        }
        _walk(fullPath);
      } else if (entry.isFile()) {
        const rel = path.relative(PROJECT_ROOT, fullPath).replace(/\\/g, "/");
        if (filter(rel, fullPath)) {
          results.push(rel);
        }
      }
    }
  }
  _walk(fullDir);
  return results;
}

/**
 * Search content for forbidden terms (case-insensitive substring or regex).
 * Returns array of { term, line, snippet }.
 */
function scanForbiddenTerms(content, forbiddenList = []) {
  const lines = content.split(/\r?\n/);
  const violations = [];

  for (let i = 0; i < lines.length; i++) {
    const lineText = lines[i];
    for (const term of forbiddenList) {
      const regex = new RegExp(`\\b${term}\\b`, "i");
      if (regex.test(lineText)) {
        violations.push({
          term,
          line: i + 1,
          snippet: lineText.trim(),
        });
      }
    }
  }
  return violations;
}

/**
 * Extract all RFC 5322 email patterns from content.
 */
function extractEmails(content) {
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = content.match(regex) || [];
  // Return unique emails
  return Array.from(new Set(matches));
}

/**
 * Extract candidate phone numbers from content.
 */
function extractPhoneNumbers(content) {
  // Matches +234..., +1..., (xxx) xxx-xxxx, etc.
  const regex = /(?:\+?\d{1,4}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,5}|\+\d{10,15}/g;
  const matches = content.match(regex) || [];
  // Filter out short numbers (like dates 2024-2025 or Tailwind fractions)
  return matches
    .map((s) => s.trim())
    .filter((s) => s.replace(/\D/g, "").length >= 7);
}

/**
 * Extract all href attributes from content (from Link, a tags, etc.).
 */
function extractHrefs(content) {
  const regex = /href=["']([^"']+)["']/g;
  const hrefs = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    hrefs.push(match[1]);
  }
  return hrefs;
}

/**
 * Extract all navigation targets (both href="#..." and scrollToSection("...") calls).
 */
function extractNavigationTargets(content) {
  const targets = [];
  // 1. href attributes
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    targets.push(match[1]);
  }
  // 2. scrollToSection calls (e.g. scrollToSection("how-it-works"))
  const scrollRegex = /scrollToSection\(["']([^"']+)["']\)/g;
  while ((match = scrollRegex.exec(content)) !== null) {
    targets.push(`#${match[1]}`);
  }
  return Array.from(new Set(targets));
}

/**
 * Extract all id attributes from content (e.g. id="how-it-works").
 */
function extractSectionIds(content) {
  const regex = /\bid=["']([^"']+)["']/g;
  const ids = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    ids.push(match[1]);
  }
  return Array.from(new Set(ids));
}

/**
 * Check if a route file (e.g., in src/app/dashboard) is sidelined via notFound() or disabled return.
 */
function checkRouteSidelined(relPath) {
  const content = readFile(relPath);
  if (!content) return false;

  const hasNotFoundImport =
    /import\s+.*notFound.*from\s+["']next\/navigation["']/.test(content);
  const callsNotFound = /\bnotFound\s*\(\s*\)/.test(content);
  const returns404 =
    /status:\s*404/.test(content) || /new\s+Response\(.*404/.test(content);
  const commentsOutWholeRoute =
    /^\s*\/\*[\s\S]*\*\/\s*$/m.test(content) ||
    /disabled route/i.test(content);

  return (
    (hasNotFoundImport && callsNotFound) || returns404 || commentsOutWholeRoute
  );
}

module.exports = {
  PROJECT_ROOT,
  resolvePath,
  fileExists,
  readFile,
  readBinaryFile,
  walkDirectory,
  scanForbiddenTerms,
  extractEmails,
  extractPhoneNumbers,
  extractHrefs,
  extractNavigationTargets,
  extractSectionIds,
  checkRouteSidelined,
};
