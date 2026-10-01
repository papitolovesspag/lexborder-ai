#!/usr/bin/env node

/**
 * LexBorder AI E2E Master Test Runner
 * Executes Tiers 1-4 test suites against codebase, assets, and routes.
 * 
 * Usage:
 *   node tests/e2e/run_tests.js
 *   node tests/e2e/run_tests.js --tier=1
 *   node tests/e2e/run_tests.js --verbose
 */

const { runTier1 } = require("./tier1_features.test");
const { runTier2 } = require("./tier2_boundaries.test");
const { runTier3 } = require("./tier3_cross_feature.test");
const { runTier4 } = require("./tier4_scenarios.test");

// Colors for terminal output
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  white: "\x1b[37m",
  bgGreen: "\x1b[42m\x1b[30m",
  bgRed: "\x1b[41m\x1b[37m",
};

async function main() {
  const args = process.argv.slice(2);
  const tierArg = args.find((a) => a.startsWith("--tier="))?.split("=")[1];
  const verbose = args.includes("--verbose") || args.includes("-v");

  console.log(`\n${colors.bold}${colors.cyan}================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}   LEXBORDER AI - AUTOMATED 4-TIER E2E TEST RUNNER              ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}================================================================${colors.reset}\n`);

  const summary = {
    tier1: { name: "Tier 1: Feature Coverage (15 Features)", results: [] },
    tier2: { name: "Tier 2: Boundary & Corner Cases", results: [] },
    tier3: { name: "Tier 3: Cross-Feature Integration", results: [] },
    tier4: { name: "Tier 4: Real-World Scenarios", results: [] },
  };

  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  // Execute Tier 1
  if (!tierArg || tierArg === "1") {
    console.log(`${colors.bold}${colors.yellow}>>> Executing ${summary.tier1.name}...${colors.reset}`);
    summary.tier1.results = await runTier1();
    printTierResults(summary.tier1.results, verbose);
  }

  // Execute Tier 2
  if (!tierArg || tierArg === "2") {
    console.log(`\n${colors.bold}${colors.yellow}>>> Executing ${summary.tier2.name}...${colors.reset}`);
    summary.tier2.results = await runTier2();
    printTierResults(summary.tier2.results, verbose);
  }

  // Execute Tier 3
  if (!tierArg || tierArg === "3") {
    console.log(`\n${colors.bold}${colors.yellow}>>> Executing ${summary.tier3.name}...${colors.reset}`);
    summary.tier3.results = await runTier3();
    printTierResults(summary.tier3.results, verbose);
  }

  // Execute Tier 4
  if (!tierArg || tierArg === "4") {
    console.log(`\n${colors.bold}${colors.yellow}>>> Executing ${summary.tier4.name}...${colors.reset}`);
    summary.tier4.results = await runTier4();
    printTierResults(summary.tier4.results, verbose);
  }

  // Tally results
  for (const tierKey of Object.keys(summary)) {
    for (const r of summary[tierKey].results) {
      totalTests++;
      if (r.passed) totalPassed++;
      else totalFailed++;
    }
  }

  // Print Structured Summary Table
  console.log(`\n${colors.bold}----------------------------------------------------------------${colors.reset}`);
  console.log(`${colors.bold}                    TEST EXECUTION SUMMARY                      ${colors.reset}`);
  console.log(`${colors.bold}----------------------------------------------------------------${colors.reset}`);
  console.log(`Tier                                         Total  Passed  Failed   Rate`);
  console.log(`----------------------------------------------------------------`);

  for (const [key, tier] of Object.entries(summary)) {
    if (tier.results.length === 0) continue;
    const passed = tier.results.filter((r) => r.passed).length;
    const failed = tier.results.filter((r) => !r.passed).length;
    const total = tier.results.length;
    const rate = total > 0 ? ((passed / total) * 100).toFixed(1) + "%" : "N/A";
    const statusColor = failed === 0 ? colors.green : colors.red;
    console.log(
      `${tier.name.padEnd(42)} ${String(total).padStart(5)}  ${colors.green}${String(passed).padStart(6)}${colors.reset}  ${failed > 0 ? colors.red : colors.dim}${String(failed).padStart(6)}${colors.reset}  ${statusColor}${rate.padStart(6)}${colors.reset}`
    );
  }

  console.log(`----------------------------------------------------------------`);
  const overallRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) + "%" : "0%";
  const overallColor = totalFailed === 0 ? colors.green : colors.red;
  console.log(
    `${colors.bold}TOTAL                                      ${String(totalTests).padStart(5)}  ${colors.green}${String(totalPassed).padStart(6)}${colors.reset}  ${totalFailed > 0 ? colors.red : colors.dim}${String(totalFailed).padStart(6)}${colors.reset}  ${overallColor}${overallRate.padStart(6)}${colors.reset}`
  );
  console.log(`${colors.bold}----------------------------------------------------------------${colors.reset}\n`);

  if (totalFailed === 0 && totalTests > 0) {
    console.log(`${colors.bgGreen}${colors.bold}  SUCCESS: ALL ${totalTests} TESTS PASSED WITH 100% SPECIFICATION FIDELITY  ${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.bgRed}${colors.bold}  FAILURE: ${totalFailed} TEST(S) FAILED OUT OF ${totalTests} TOTAL TESTS  ${colors.reset}\n`);
    
    // Print failure details
    console.log(`${colors.bold}${colors.red}Failure Diagnostics:${colors.reset}`);
    for (const [key, tier] of Object.entries(summary)) {
      const failures = tier.results.filter((r) => !r.passed);
      for (const f of failures) {
        console.log(`  - [${colors.red}${f.id}${colors.reset}] ${f.name}`);
        console.log(`    ${colors.dim}Error: ${f.error}${colors.reset}`);
      }
    }
    console.log("");
    process.exit(1);
  }
}

function printTierResults(results, verbose) {
  for (const r of results) {
    if (r.passed) {
      if (verbose || results.length <= 20) {
        console.log(`  ${colors.green}✓${colors.reset} [${colors.cyan}${r.id}${colors.reset}] ${r.name}`);
      }
    } else {
      console.log(`  ${colors.red}✗${colors.reset} [${colors.red}${r.id}${colors.reset}] ${r.name}`);
      console.log(`    ${colors.red}Reason: ${r.error}${colors.reset}`);
    }
  }
  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.filter((r) => !r.passed).length;
  console.log(`  ${colors.dim}--> Subtotal: ${passedCount} passed, ${failedCount} failed (${results.length} total)${colors.reset}`);
}

main().catch((err) => {
  console.error("Test runner encountered unexpected error:", err);
  process.exit(1);
});
