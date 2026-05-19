import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RUNTIME = "nodejs20.x";
const functionsDir = join(".vercel", "output", "functions");

if (!existsSync(functionsDir)) {
  console.warn("[patch-vercel-runtime] No existe .vercel/output/functions, se omite.");
  process.exit(0);
}

let patched = 0;

for (const entry of readdirSync(functionsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;

  const configPath = join(functionsDir, entry.name, ".vc-config.json");
  if (!existsSync(configPath)) continue;

  const config = JSON.parse(readFileSync(configPath, "utf8"));
  if (config.runtime?.startsWith("nodejs")) {
    config.runtime = RUNTIME;
    writeFileSync(configPath, `${JSON.stringify(config, null, "\t")}\n`);
    patched += 1;
  }
}

console.log(`[patch-vercel-runtime] ${patched} función(es) con runtime ${RUNTIME}`);
