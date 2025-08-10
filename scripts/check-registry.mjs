// scripts/check-registry.mjs
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const here = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");

// 1) Read tools.js as plain text (avoid importing JSX)
const toolsPath = path.join(projectRoot, "data", "tools.js");
const text = fs.readFileSync(toolsPath, "utf8");

// 2) Collect slugs via regex (matches: slug: 'remove-duplicate-lines')
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const slugs = [];
for (const m of text.matchAll(slugRegex)) slugs.push(m[1]);

// 3) Check for component files for each slug
const compDir = path.join(projectRoot, "components", "tools");
const missing = [];
for (const slug of slugs) {
  const file = path.join(compDir, `${slug}.jsx`);
  if (!fs.existsSync(file)) missing.push({ slug, file });
}

// 4) Optionally: warn if there are component files not in the registry
const filesOnDisk = fs
  .readdirSync(compDir)
  .filter((f) => f.endsWith(".jsx"))
  .map((f) => f.replace(/\.jsx$/, ""));
const extras = filesOnDisk.filter((name) => !slugs.includes(name));

// 5) Report
if (missing.length === 0 && extras.length === 0) {
  console.log("✅ Registry looks good. All component files are present.");
  process.exit(0);
}

if (missing.length) {
  console.error("\n❌ Missing component files referenced by registry:");
  for (const m of missing) console.error(`- ${m.slug} → ${m.file}`);
}

if (extras.length) {
  console.warn("\n⚠️  Component files that are NOT listed in registry:");
  for (const x of extras) console.warn(`- ${x}.jsx`);
}

process.exit(missing.length ? 1 : 0);
