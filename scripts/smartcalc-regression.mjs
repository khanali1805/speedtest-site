import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "src/lib/calculator-engine.ts",
  "src/lib/calculation-history.ts",
  "src/lib/utility-analysis.ts",
  "src/components/utilities/utility-analysis-panel.tsx",
  "src/components/wifi/wifi-analyzer.tsx",
  "src/app/api/calculators/calculate/route.ts",
  "src/app/api/utilities/verify/route.ts",
  "src/app/api/wifi/ping/route.ts",
  "src/app/api/wifi/speed/route.ts",
  "src/app/api/health/route.ts",
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error("Missing required files:");
  for (const file of missing) console.error(` - ${file}`);
  process.exit(1);
}

const calc = fs.readFileSync(path.join(root, "src/lib/calculator-engine.ts"), "utf8");
const utility = fs.readFileSync(path.join(root, "src/lib/utility-analysis.ts"), "utf8");
const wifi = fs.readFileSync(path.join(root, "src/components/wifi/wifi-analyzer.tsx"), "utf8");

const checks = [
  ["calculator engine exports electricity calculation", /calculateElectricity/.test(calc)],
  ["calculator engine exports gas calculation", /calculateGas/.test(calc)],
  ["calculator engine exports water calculation", /calculateWater/.test(calc)],
  ["utility engine exports comparison", /compareUtilityPeriods/.test(utility)],
  ["utility engine exports meter verification", /verifyMeterUsage/.test(utility)],
  ["wifi uses real geolocation", /navigator\.geolocation/.test(wifi)],
  ["wifi uses real ping endpoint", /\/api\/wifi\/ping/.test(wifi)],
  ["wifi uses Cloudflare speed engine", /@cloudflare\/speedtest/.test(wifi)],
  ["wifi does not advertise fake RSSI", !/fake.*RSSI|synthetic.*RSSI/i.test(wifi)],
];

let failed = false;
for (const [name, ok] of checks) {
  console.log(`${ok ? "[PASS]" : "[FAIL]"} ${name}`);
  if (!ok) failed = true;
}

if (failed) process.exit(1);
console.log("[PASS] SmartCalc deterministic regression checks complete.");