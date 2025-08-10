// scripts/build-registry.mjs
import fs from "node:fs";
import path from "node:path";

const TOOLS_DIR = path.join(process.cwd(), "components", "tools");
const DATA_DIR  = path.join(process.cwd(), "data");
const OUT_FILE  = path.join(DATA_DIR, "tools.js");

const ICONS = [
  "Wand2","ListOrdered","CaseUpper","CaseLower","Type","Link","Sigma","Braces","TextQuote","Filter"
];
const icon = (i) => ICONS[i % ICONS.length];

function toTitle(stem) {
  return stem.replace(/[-_]+/g," ").replace(/\s+/g," ").trim()
             .replace(/\b\w/g, m => m.toUpperCase());
}
function slugify(stem){
  return stem.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^[-]+|[-]+$/g,"") || "tool";
}

const files = fs.existsSync(TOOLS_DIR)
  ? fs.readdirSync(TOOLS_DIR).filter(f => /\.(jsx|js)$/.test(f)).sort()
  : [];

fs.mkdirSync(DATA_DIR, { recursive: true });
const header = `/* Auto-generated from components/tools. Do not edit by hand. */
import dynamic from 'next/dynamic';
import { ${ICONS.join(", ")} } from 'lucide-react';
`;

const rows = files.map((f, i) => {
  const stem = f.replace(/\.(jsx|js)$/,"");
  const slug = slugify(stem);
  const name = toTitle(stem);
  const desc = `${name} online tool.`;
  return `  { slug: '${slug}', name: '${name}', description: '${desc}', tags: [], Icon: ${icon(i)}, component: dynamic(()=>import('@/components/tools/${stem}')) },`;
}).join("\n");

const body = `const registry = [
${rows}
];
`;

const helpers = `
export function getAllTools(){ return registry; }
export function getToolBySlug(slug){ return registry.find(t=>t.slug===slug); }
export function getRelatedTools(slug){
  const me = getToolBySlug(slug); if (!me) return [];
  const score = t => (t.slug===slug? -1 : t.tags?.filter(x=>me.tags?.includes(x)).length || 0);
  return [...registry].sort((a,b)=>score(b)-score(a)).filter(t=>t.slug!==slug);
}
export default registry;
`;

fs.writeFileSync(OUT_FILE, header + body + helpers, "utf8");
console.log(`Generated ${OUT_FILE} with ${files.length} tools.`);
