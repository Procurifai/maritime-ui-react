#!/usr/bin/env node
/**
 * Build packages/maritime-ui/components.manifest.json by scanning src/**\/*.tsx.
 *
 * Regex-driven (no TS AST) to keep zero-deps. For each component file:
 *   - PascalCase export → `name`
 *   - Top-of-file JSDoc block → `description`
 *   - `interface <Name>Props { ... }` → `propsSummary`
 *   - `@category <slug>` JSDoc tag → `category` (falls back to directory-name)
 *
 * Output schema is stable; CI diffs the file across regen vs committed to
 * catch out-of-date manifests on PR.
 *
 * Strict mode (`--strict`) exits non-zero if any shipped component lacks a
 * JSDoc description or `<Name>Props` interface — used by pre-commit.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'packages/maritime-ui/src');
const OUT_PATH = join(ROOT, 'packages/maritime-ui/components.manifest.json');

const strict = process.argv.includes('--strict');

/** Recursively walk a directory, returning all .tsx file paths. */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (
      entry.endsWith('.tsx') &&
      !entry.endsWith('.stories.tsx') &&
      !entry.endsWith('.test.tsx')
    ) {
      out.push(full);
    }
  }
  return out;
}

/** Strip /** ... *\/ delimiters and per-line ` * ` prefixes from a JSDoc block. */
function cleanJsdoc(raw) {
  return raw
    .replace(/^\s*\/\*\*/, '')
    .replace(/\*\/\s*$/, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, ''))
    .filter((line) => !line.startsWith('@'))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractCategory(jsdoc, filePath) {
  const m = jsdoc.match(/@category\s+(\S+)/);
  if (m) return m[1];
  // Fall back to the directory under src/ (e.g. status-indicator/Foo.tsx → status-indicator).
  const rel = relative(SRC_DIR, filePath);
  const dir = rel.split('/')[0];
  return dir;
}

function extractProps(src, componentName) {
  const re = new RegExp(
    `(?:export\\s+)?interface\\s+${componentName}Props\\s*[^{]*{([\\s\\S]*?)\\n}`,
    'm',
  );
  const m = src.match(re);
  if (!m) return [];
  return m[1]
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) => line && !line.startsWith('//') && !line.startsWith('/*') && !line.startsWith('*'),
    )
    .map((line) => {
      const propMatch = line.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\??:/);
      return propMatch ? propMatch[1] : null;
    })
    .filter(Boolean);
}

function extractComponent(filePath) {
  const src = readFileSync(filePath, 'utf8');
  // Find first JSDoc block at top of file (before any import).
  const jsdocMatch = src.match(/^\s*\/\*\*([\s\S]*?)\*\//);
  const jsdocRaw = jsdocMatch ? jsdocMatch[0] : '';
  const description = jsdocRaw ? cleanJsdoc(jsdocRaw) : '';

  // PascalCase named export at top level.
  const exportMatch = src.match(/export\s+(?:function|const)\s+([A-Z][a-zA-Z0-9]*)/);
  if (!exportMatch) return null;
  const name = exportMatch[1];

  const category = extractCategory(jsdocRaw, filePath);
  const propsSummary = extractProps(src, name);

  const rel = relative(SRC_DIR, filePath).replace(/\\/g, '/');
  const subpath = rel.split('/')[0];

  // Detect sibling .stories.tsx and .test.tsx
  const dir = dirname(filePath);
  const fileBase = filePath
    .split('/')
    .slice(-1)[0]
    .replace(/\.tsx$/, '');
  const hasStories = readdirSync(dir).includes(`${fileBase}.stories.tsx`);
  const hasTest = readdirSync(dir).includes(`${fileBase}.test.tsx`);

  return {
    name,
    description,
    category,
    propsSummary,
    importLine: `import { ${name} } from '@procurifai/maritime-ui/${subpath}';`,
    barrelImportLine: `import { ${name} } from '@procurifai/maritime-ui';`,
    sourcePath: `packages/maritime-ui/src/${rel}`,
    hasStories,
    hasTest,
  };
}

function main() {
  const files = walk(SRC_DIR);
  const components = files
    .map(extractComponent)
    .filter((c) => c !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (strict) {
    const errors = [];
    for (const c of components) {
      if (!c.description) errors.push(`${c.name}: missing JSDoc description`);
      if (c.propsSummary.length === 0)
        errors.push(`${c.name}: missing <Name>Props interface or empty interface`);
      if (!c.hasStories) errors.push(`${c.name}: missing ${c.name}.stories.tsx`);
      if (!c.hasTest) errors.push(`${c.name}: missing ${c.name}.test.tsx`);
    }
    if (errors.length) {
      console.error('Strict manifest check failed:');
      for (const e of errors) console.error(`  • ${e}`);
      process.exit(1);
    }
  }

  const manifest = {
    $schema: 'https://maritime.ui/schemas/components.manifest.json',
    totalCount: components.length,
    components,
  };

  writeFileSync(OUT_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`✓ Manifest written (${components.length} components)`);
}

main();
