#!/usr/bin/env node
/**
 * check-urls.mjs — validates external URLs in reference sections.
 *
 * Usage:
 *   node .agents/scripts/check-urls.mjs            # report only (exit 0)
 *   node .agents/scripts/check-urls.mjs --strict   # fail on dead/error URLs
 *   node .agents/scripts/check-urls.mjs --all      # include URLs outside References
 *
 * Classification:
 *   ok      2xx
 *   blocked 401, 403, 429 (site refuses automated requests)
 *   dead    404, 410, other 4xx
 *   error   5xx, timeout, DNS/TLS failure
 *
 * Results are cached in .agents/.cache/url-check.json for 24 hours.
 * Delete that file to force a fresh check.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.env.CONTENT_ROOT ?? "content");
const STRICT = process.argv.includes("--strict");
const ALL = process.argv.includes("--all");
const CACHE_DIR = path.resolve(".agents/.cache");
const CACHE_FILE = path.join(CACHE_DIR, "url-check.json");
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CONCURRENCY = 6;
const TIMEOUT_MS = 12000;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (full.endsWith(".md")) out.push(full);
  }
  return out;
}

const URL_RE = /https?:\/\/[^\s<>")\]]+/g;

function cleanUrl(raw) {
  return raw.replace(/[.,;:]+$/, "").replace(/\)+$/, "");
}

const files = walk(ROOT);
const occurrences = [];

for (const file of files) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const lines = fs.readFileSync(file, "utf8").split("\n");
  let inRefs = ALL;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!ALL) {
      if (/^##\s+(References|Referensi|Daftar Pustaka)\s*$/i.test(line)) { inRefs = true; continue; }
      if (inRefs && /^##\s+/.test(line)) { inRefs = false; continue; }
    }
    if (!inRefs) continue;
    for (const m of line.matchAll(URL_RE)) {
      occurrences.push({ url: cleanUrl(m[0]), rel, line: i + 1 });
    }
  }
}

const unique = [...new Set(occurrences.map((o) => o.url))];

let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    const parsed = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    const now = Date.now();
    for (const [url, entry] of Object.entries(parsed)) {
      if (now - entry.checkedAt < CACHE_TTL_MS) cache[url] = entry;
    }
  } catch {}
}

async function check(url) {
  if (cache[url]) return cache[url];
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let result;
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "erp-notes-link-check/1.0 (+https://erpnotes.rofid.my.id)" },
    });
    const status = res.status;
    let kind = "ok";
    if (status === 401 || status === 403 || status === 429) kind = "blocked";
    else if (status === 404 || status === 410 || (status >= 400 && status < 500)) kind = "dead";
    else if (status >= 500) kind = "error";
    result = { status, kind, checkedAt: Date.now(), finalUrl: res.url };
    await res.body?.cancel();
  } catch (err) {
    result = { status: 0, kind: "error", checkedAt: Date.now(), error: String(err?.name ?? err) };
  } finally {
    clearTimeout(timer);
  }
  cache[url] = result;
  return result;
}

const results = new Map();
let index = 0;
async function worker() {
  while (index < unique.length) {
    const url = unique[index++];
    results.set(url, await check(url));
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

fs.mkdirSync(CACHE_DIR, { recursive: true });
fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 1), "utf8");

const counts = { ok: 0, blocked: 0, dead: 0, error: 0 };
for (const r of results.values()) counts[r.kind] += 1;

const byUrl = new Map();
for (const o of occurrences) {
  if (!byUrl.has(o.url)) byUrl.set(o.url, []);
  byUrl.get(o.url).push(o);
}

console.log(`Scanned ${files.length} files.`);
console.log(`Reference entries with URL: ${occurrences.length} (${unique.length} unique).`);
console.log(`  ok: ${counts.ok}  blocked: ${counts.blocked}  dead: ${counts.dead}  error: ${counts.error}`);

for (const kind of ["dead", "error", "blocked"]) {
  const list = [...results.entries()].filter(([, r]) => r.kind === kind);
  if (list.length === 0) continue;
  console.log(`\n${kind.toUpperCase()} (${list.length}):`);
  for (const [url, r] of list.slice(0, 40)) {
    const first = byUrl.get(url)[0];
    console.log(`  ${r.status || "-"} ${url}  (${first.rel}:${first.line})`);
  }
  if (list.length > 40) console.log(`  ... ${list.length - 40} more`);
}

if (STRICT && (counts.dead > 0 || counts.error > 0)) {
  console.error(`\nStrict mode: ${counts.dead + counts.error} broken URL(s).`);
  process.exit(1);
}
