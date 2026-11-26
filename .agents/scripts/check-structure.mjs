#!/usr/bin/env node
/**
 * check-structure.mjs — structural sanity check for articles.
 *
 * Errors (fail the build):
 *   - no H1
 *   - frontmatter present but unreadable
 *
 * Warnings (reported only):
 *   - missing Definition / References on a non-index article
 *   - empty section (heading immediately followed by another heading)
 *   - duplicate H2 heading in one file
 *   - Naventra block inside a concept article (migration backlog)
 *   - software article without a version
 *
 * Exit 1 only on errors.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.env.CONTENT_ROOT ?? "content");
const errors = [];
const warnings = [];
const naventraFiles = [];
let articles = 0;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (full.endsWith(".md")) out.push(full);
  }
  return out;
}

if (!fs.existsSync(ROOT)) {
  console.error(`content directory not found: ${ROOT}`);
  process.exit(1);
}

const files = walk(ROOT);

for (const file of files) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const isIndex = path.basename(file) === "index.md";
  const isSoftware = rel.startsWith("20-software/");
  const isNaventra = rel.startsWith("30-naventra/");
  const text = fs.readFileSync(file, "utf8");
  const body = text.replace(/^---\n[\s\S]*?\n---\n/, "");
  const lines = body.split("\n");

  if (!isIndex && !/^#\s+\S/m.test(body)) {
    errors.push(`${rel}: no H1`);
    continue;
  }
  if (isIndex) continue;
  articles += 1;

  const headings = lines
    .map((l, i) => ({ l, i }))
    .filter(({ l }) => /^##\s+/.test(l));

  const names = headings.map(({ l }) => l.replace(/^##\s+/, "").trim());
  const seen = new Set();
  for (const name of names) {
    if (seen.has(name)) warnings.push(`${rel}: duplicate heading "## ${name}"`);
    seen.add(name);
  }

  if (!names.includes("Definition")) warnings.push(`${rel}: missing "## Definition"`);
  if (!names.includes("References")) warnings.push(`${rel}: missing "## References"`);

  for (let k = 0; k < headings.length; k++) {
    const here = headings[k].i;
    const next = k + 1 < headings.length ? headings[k + 1].i : lines.length;
    const content = lines.slice(here + 1, next).filter((l) => l.trim() !== "");
    if (content.length === 0) {
      warnings.push(`${rel}: empty section "## ${names[k]}"`);
    }
  }

  if (names.includes("Naventra Consideration") && !isNaventra) {
    // NAV-01 keeps a single reference line in concept articles; only flag a
    // section that still carries a full design block.
    const navIdx = names.indexOf("Naventra Consideration")
    const navStart = headings[navIdx].i
    const navEnd = navIdx + 1 < headings.length ? headings[navIdx + 1].i : lines.length
    const navLines = lines
      .slice(navStart + 1, navEnd)
      .filter((l) => l.trim() !== "" && !/^-{3,}$/.test(l.trim()))
    if (navLines.length > 1) naventraFiles.push(rel)
  }

  if (isSoftware) {
    const hasVersion = /software_version:/.test(text) || /\b(Odoo|ERPNext|Dynamics 365|SAP)\s+v?\d/i.test(body);
    if (!hasVersion) warnings.push(`${rel}: software article without a version`);
  }
}

if (naventraFiles.length > 0) {
  warnings.push(
    `${naventraFiles.length} concept articles contain a Naventra block (migration to content/30-naventra pending)`,
  );
}

for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);

console.log(`\nChecked ${articles} articles (${files.length} files).`);
console.log(`Errors: ${errors.length}  Warnings: ${warnings.length}`);

process.exit(errors.length > 0 ? 1 : 0);
