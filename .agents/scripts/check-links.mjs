#!/usr/bin/env node
/**
 * check-links.mjs — deterministic internal link check for ERP Notes.
 *
 * Checks:
 *   1. Wiki links [[path]], [[path|label]], [[path#anchor]] resolve to a file.
 *   2. Markdown links to .md files resolve.
 *   3. Anchors resolve to a heading in the target file (warning only).
 *   4. Wiki links inside fenced code blocks are reported (they render literally).
 *
 * Exit 1 on errors, 0 otherwise. Warnings never fail the build.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.env.CONTENT_ROOT ?? "content");
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
const relPaths = files.map((f) =>
  path.relative(ROOT, f).split(path.sep).join("/").replace(/\.md$/, ""),
);
const byPath = new Set(relPaths);
const byBasename = new Map();
for (const rel of relPaths) {
  const base = path.basename(rel);
  if (!byBasename.has(base)) byBasename.set(base, []);
  byBasename.get(base).push(rel);
}

function resolve(target) {
  const clean = target.trim().replace(/^\.\//, "").replace(/\.md$/, "");
  if (byPath.has(clean)) return { ok: true, path: clean };
  const base = path.basename(clean);
  const matches = byBasename.get(base);
  if (matches && matches.length > 0) {
    if (matches.length > 1) {
      return { ok: true, path: matches[0], ambiguous: matches.length };
    }
    return { ok: true, path: matches[0] };
  }
  return { ok: false, path: clean };
}

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/`[^`]*`/g, "")
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, "$2$1")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function headingsOf(file) {
  const text = fs.readFileSync(file, "utf8");
  const slugs = new Set();
  for (const line of text.split("\n")) {
    const m = /^#{1,6}\s+(.*)$/.exec(line);
    if (m) slugs.add(slugify(m[1]));
  }
  return slugs;
}

const headingCache = new Map();
function cachedHeadings(relPath) {
  if (!headingCache.has(relPath)) {
    headingCache.set(relPath, headingsOf(path.join(ROOT, `${relPath}.md`)));
  }
  return headingCache.get(relPath);
}

const WIKI = /\[\[([^\]|#]+)(#[^\]|]+)?(?:\|([^\]]+))?\]\]/g;
const MDLINK = /\[([^\]]+)\]\(([^)\s]+\.md)(#[^)\s]+)?\)/g;

let wikiCount = 0;
let mdCount = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split("\n");

  // Track fenced code blocks so we can flag links that render literally.
  let inFence = false;

  lines.forEach((line, i) => {
    const lineNo = i + 1;
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;

    WIKI.lastIndex = 0;
    let m;
    while ((m = WIKI.exec(line))) {
      wikiCount += 1;
      const target = m[1].trim();
      const anchor = m[2] ? m[2].slice(1) : null;
      const res = resolve(target);
      if (!res.ok) {
        errors.push(
          `${rel}:${lineNo} broken wiki link -> ${target}`,
        );
      } else if (inFence) {
        warnings.push({ file: rel, kind: "wiki link inside a code block renders literally" });
      } else if (res.ambiguous) {
        warnings.push({ file: rel, kind: "ambiguous wiki link (several files share this name)" });
      }
      if (res.ok && anchor) {
        const slugs = cachedHeadings(res.path);
        const wanted = slugify(anchor);
        if (!slugs.has(wanted)) {
          warnings.push({
            file: rel,
            kind: `anchor not found in ${res.path} (#${anchor})`,
          });
        }
      }
    }

    MDLINK.lastIndex = 0;
    while ((m = MDLINK.exec(line))) {
      mdCount += 1;
      const href = m[2];
      if (/^[a-z]+:/i.test(href)) continue;
      const resolved = path
        .relative(ROOT, path.resolve(path.dirname(file), href))
        .split(path.sep)
        .join("/")
        .replace(/\.md$/, "");
      if (!byPath.has(resolved)) {
        errors.push(`${rel}:${lineNo} broken markdown link -> ${href}`);
      }
    }
  });
}

const aggregated = new Map();
for (const w of warnings) {
  const key = `${w.file}\u0000${w.kind}`;
  aggregated.set(key, (aggregated.get(key) ?? 0) + 1);
}

for (const [key, count] of [...aggregated.entries()].sort()) {
  const [file, kind] = key.split("\u0000");
  console.warn(`WARN  ${file}: ${count} ${kind}`);
}
for (const e of errors) console.error(`ERROR ${e}`);

console.log(
  `\nChecked ${files.length} files: ${wikiCount} wiki links, ${mdCount} markdown links.`,
);
console.log(`Errors: ${errors.length}  Warnings: ${warnings.length}`);

process.exit(errors.length > 0 ? 1 : 0);
