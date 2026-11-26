#!/usr/bin/env node
/**
 * check-frontmatter.mjs — validates YAML frontmatter on content files.
 *
 * Required:  title (non-empty)
 * Allowed:   title, tags, status, reviewed, software_version, sources
 * Optional conventions:
 *   status            draft | reviewed | verified
 *   reviewed          YYYY-MM-DD
 *   software_version  free text, e.g. "Odoo 17.0"
 *   sources           integer count of cited references
 *
 * Unknown keys are warnings, not errors, so a schema addition does not
 * break the build before the rule is updated.
 *
 * Exit 1 on errors, 0 otherwise.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.env.CONTENT_ROOT ?? "content");
const ALLOWED = new Set([
  "title",
  "tags",
  "status",
  "reviewed",
  "software_version",
  "sources",
]);
const STATUS = new Set(["draft", "reviewed", "verified"]);

const errors = [];
const warnings = [];

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
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split("\n");

  if (lines[0]?.trim() !== "---") {
    errors.push(`${rel}: missing frontmatter block`);
    continue;
  }

  const end = lines.indexOf("---", 1);
  if (end === -1) {
    errors.push(`${rel}: frontmatter block is not closed`);
    continue;
  }

  const keys = new Map();
  for (const raw of lines.slice(1, end)) {
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(raw);
    if (m) keys.set(m[1], m[2].trim());
  }

  const title = keys.get("title");
  if (!title) {
    errors.push(`${rel}: missing required "title"`);
  } else if (title.replace(/^["']|["']$/g, "").trim() === "") {
    errors.push(`${rel}: empty "title"`);
  }

  for (const key of keys.keys()) {
    if (!ALLOWED.has(key)) warnings.push(`${rel}: unknown frontmatter key "${key}"`);
  }

  const status = keys.get("status");
  if (status && !STATUS.has(status.replace(/^["']|["']$/g, ""))) {
    errors.push(`${rel}: invalid status "${status}" (expected draft|reviewed|verified)`);
  }

  const reviewed = keys.get("reviewed");
  if (reviewed) {
    const value = reviewed.replace(/^["']|["']$/g, "");
    const parsed = new Date(`${value}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(parsed.getTime())) {
      errors.push(`${rel}: invalid reviewed "${reviewed}" (expected YYYY-MM-DD)`);
    }
  }

  const sources = keys.get("sources");
  if (sources !== undefined && !/^\d+$/.test(sources.replace(/^["']|["']$/g, ""))) {
    errors.push(`${rel}: invalid sources "${sources}" (expected a non-negative integer)`);
  }

  const softwareVersion = keys.get("software_version");
  if (softwareVersion !== undefined && softwareVersion.replace(/^["']|["']$/g, "").trim() === "") {
    errors.push(`${rel}: empty software_version`);
  }

  const tags = keys.get("tags");
  if (tags !== undefined) {
    const inline = /^\[.*\]$/.test(tags);
    const fmLines = lines.slice(1, end);
    const idx = fmLines.findIndex((l) => /^tags:\s*$/.test(l));
    const block = idx !== -1 && /^\s+-\s+\S+/.test(fmLines[idx + 1] ?? "");
    if (!inline && !block) {
      warnings.push(`${rel}: "tags" should be a list (inline [a, b] or block "- tag")`);
    }
  }
}

for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);

console.log(`\nChecked ${files.length} files.`);
console.log(`Errors: ${errors.length}  Warnings: ${warnings.length}`);

process.exit(errors.length > 0 ? 1 : 0);
