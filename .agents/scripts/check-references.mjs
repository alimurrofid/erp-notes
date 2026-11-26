#!/usr/bin/env node
/**
 * check-references.mjs — audits the `## References` section of every article.
 *
 * A reference entry is considered traceable when it contains at least one of:
 *   - a URL (http/https)
 *   - a standard/regulation identifier (IFRS 15, IAS 2, PSAK 72, PMK 131, PP 58, UU 7, ...)
 *   - an ISBN (10 or 13 digit, with or without hyphens)
 *   - an explicit uncertainty marker ("tidak terverifikasi")
 *
 * Default mode reports only (exit 0) because 141 files currently have no URL.
 * Use --strict to fail while the backfill is in progress.
 *
 * Usage:
 *   node .agents/scripts/check-references.mjs
 *   node .agents/scripts/check-references.mjs --strict
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.env.CONTENT_ROOT ?? "content");
const STRICT = process.argv.includes("--strict");

const URL_RE = /https?:\/\//i;
const ID_RE =
  /\b(IFRS|IAS|PSAK|SAK|PMK|PP|UU|PERPRES|PERMEN|POJK|PER|SE)[\s.-]*\d+/i;
const MARKER_RE = /(tidak|belum)\s+terverifikasi/i;
const ISBN_RE = /\bISBN(?:-1[03])?:?\s*[\d][\d-]{8,15}[\dXx]\b/i;

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
const offenders = [];
let total = 0;
let withUrl = 0;
let withId = 0;
let withMarker = 0;
let untraceable = 0;
let filesWithoutSection = 0;
let filesWithNoUrl = 0;
let urlEntries = 0;
let undatedUrls = 0;
const undatedExamples = [];
let indexFiles = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  if (path.basename(file) === "index.md") {
    indexFiles += 1;
    continue;
  }
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const start = lines.findIndex((l) =>
    /^##\s+(References|Referensi|Daftar Pustaka)\s*$/i.test(l),
  );
  if (start === -1) {
    filesWithoutSection += 1;
    continue;
  }
  const end = lines.findIndex((l, i) => i > start && /^##\s+/.test(l));
  const section = lines.slice(start + 1, end === -1 ? undefined : end);

  const entries = [];
  let current = null;
  for (const line of section) {
    if (/^\s*(?:[-*]|\d+\.)\s+/.test(line)) {
      if (current) entries.push(current);
      current = line;
    } else if (current && line.trim() !== "") {
      current += ` ${line.trim()}`;
    } else if (line.trim() === "" && current) {
      entries.push(current);
      current = null;
    }
  }
  if (current) entries.push(current);

  let fileHasUrl = false;
  let fileUntraceable = 0;

  for (const line of entries) {
    total += 1;
    const hasUrl = URL_RE.test(line);
    const hasId = ID_RE.test(line) || ISBN_RE.test(line);
    const hasMarker = MARKER_RE.test(line);
    if (hasUrl) {
      withUrl += 1;
      urlEntries += 1;
      fileHasUrl = true;
      if (!/(diakses|accessed)/i.test(line)) {
        undatedUrls += 1;
        if (undatedExamples.length < 10) undatedExamples.push(`${rel}:${curLine}`);
      }
    } else if (hasId) withId += 1;
    else if (hasMarker) withMarker += 1;
    else {
      untraceable += 1;
      fileUntraceable += 1;
    }
  }

  if (!fileHasUrl) filesWithNoUrl += 1;
  if (fileUntraceable > 0) {
    offenders.push({ rel, count: fileUntraceable });
  }
}

const pct = total === 0 ? 0 : Math.round((withUrl / total) * 100);
console.log(`Checked ${files.length} files.`);
console.log(`Reference entries: ${total}`);
console.log(`  with URL: ${withUrl} (${pct}%)`);
console.log(`  standard/regulation id or ISBN only: ${withId}`);
console.log(`  explicitly unverified: ${withMarker}`);
console.log(`  untraceable (no URL, no id, no marker): ${untraceable}`);
console.log(`Files without a References section: ${filesWithoutSection}`);
console.log(`Files with no URL in any reference: ${filesWithNoUrl}`);
console.log(`URL entries without access date: ${undatedUrls}`);
for (const ex of undatedExamples) console.log(`  undated: ${ex}`);
console.log(`Index pages skipped (navigation, not articles): ${indexFiles}`);

if (offenders.length > 0) {
  console.log(`\nFiles with untraceable entries: ${offenders.length}`);
  for (const o of offenders.slice(0, 20)) console.log(`  ${o.rel}: ${o.count}`);
  if (offenders.length > 20) console.log(`  ... ${offenders.length - 20} more`);
}

if (STRICT) {
  const problems =
    untraceable +
    filesWithoutSection +
    undatedUrls +
    (process.env.REQUIRE_REF_URL ? filesWithNoUrl : 0);
  if (problems > 0) {
    console.error(`\nStrict mode: ${problems} reference problem(s) found.`);
    process.exit(1);
  }
}

process.exit(0);
