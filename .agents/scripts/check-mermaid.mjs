#!/usr/bin/env node
/**
 * check-mermaid.mjs — dependency-free Mermaid sanity check.
 *
 * Catches failure modes that have already occurred in this repository:
 *   1. wiki links inside diagram labels (render literally)
 *   2. unquoted edge labels containing punctuation (flowchart)
 *   3. unquoted node labels containing parentheses (flowchart)
 *   4. unbalanced subgraph/end (flowchart)
 *   5. unbalanced alt/loop/opt/par/critical/break/rect (sequence)
 *   6. empty diagram
 *
 * Heuristic, not a full parser: it catches syntax that reliably breaks
 * Mermaid, not every grammar rule.
 *
 * Exit 1 on errors, 0 otherwise.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.env.CONTENT_ROOT ?? "content");
const FLOW = /^(flowchart|graph)\b/;
const BLOCK_TYPES = /^(sequenceDiagram|classDiagram|stateDiagram(-v2)?|erDiagram|journey|gantt|pie|quadrantChart|mindmap|timeline|gitGraph|C4\w*|block-beta|sankey-beta|xyChart|architecture-beta|packet-beta)\b/;

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
let diagrams = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const lines = fs.readFileSync(file, "utf8").split("\n");
  let inMermaid = false;
  let start = 0;
  let buffer = [];

  const flush = () => {
    diagrams += 1;
    const body = buffer;
    const first = body.find((l) => l.trim() !== "" && !l.trim().startsWith("%%")) ?? "";
    const isFlow = FLOW.test(first.trim());
    const isSequence = /^sequenceDiagram\b/.test(first.trim());
    const isKnown = isFlow || isSequence || BLOCK_TYPES.test(first.trim());

    if (body.every((l) => l.trim() === "" || l.trim().startsWith("%%"))) {
      warnings.push(`${rel}:${start} empty diagram`);
      return;
    }
    if (!isKnown) warnings.push(`${rel}:${start} unrecognised diagram type: ${first.trim().slice(0, 30)}`);

    let subgraphDepth = 0;
    let blockDepth = 0;

    body.forEach((line, idx) => {
      const ln = start + idx;

      if (/\[\[[^\]]*(?:\||\/)[^\]]*\]\]/.test(line)) {
        errors.push(`${rel}:${ln} wiki link inside a Mermaid label (renders literally)`);
      }

      if (isFlow) {
        if (/^\s*subgraph\b/.test(line)) subgraphDepth += 1;
        if (/^\s*end\s*$/.test(line)) subgraphDepth -= 1;

        const edge = line.match(/-->\|([^|]*)\|/);
        if (edge && !/^\s*"/.test(edge[1]) && /[():]/.test(edge[1])) {
          errors.push(`${rel}:${ln} unquoted edge label: ${edge[1].trim().slice(0, 40)}`);
        }

        const node = line.match(/^\s*[A-Za-z0-9_]+\s*\[([^\]]*)\]/);
        if (
          node &&
          /^[A-Za-z0-9 ]/.test(node[1]) &&
          /\([^)]*\)/.test(node[1])
        ) {
          errors.push(`${rel}:${ln} unquoted node label: ${node[1].trim().slice(0, 40)}`);
        }
      }

      if (isSequence) {
        if (/^\s*(alt|loop|opt|par|critical|break|rect)\b/.test(line)) blockDepth += 1;
        if (/^\s*end\s*$/.test(line)) blockDepth -= 1;
      }
    });

    if (isFlow && subgraphDepth !== 0) {
      errors.push(`${rel}:${start} unbalanced subgraph/end (depth ${subgraphDepth})`);
    }
    if (isSequence && blockDepth !== 0) {
      errors.push(`${rel}:${start} unbalanced alt/loop/opt/end (depth ${blockDepth})`);
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inMermaid && /^\s*```mermaid/.test(line)) {
      inMermaid = true;
      start = i + 1;
      buffer = [];
      continue;
    }
    if (inMermaid && /^\s*```\s*$/.test(line)) {
      flush();
      inMermaid = false;
      continue;
    }
    if (inMermaid) buffer.push(line);
  }
}

for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);

console.log(`\nChecked ${diagrams} Mermaid diagrams in ${files.length} files.`);
console.log(`Errors: ${errors.length}  Warnings: ${warnings.length}`);

process.exit(errors.length > 0 ? 1 : 0);
