#!/usr/bin/env node
/**
 * Watches docs/ for markdown changes and re-runs the content preprocessor.
 * Uses Node's built-in fs.watch with recursive option (macOS/Windows native).
 */
const { watch } = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const DOCS_DIR = path.resolve(__dirname, '..', 'docs');
const DEBOUNCE_MS = 500;

let timer = null;
let running = false;

function rebuild() {
  if (running) return;
  running = true;
  const start = Date.now();
  try {
    console.log('\x1b[36m[watch] docs changed — migrating images + rebuilding content-data.json…\x1b[0m');
    execSync('node scripts/migrate-images-to-public.js', {
      cwd: path.resolve(__dirname, '..'),
      stdio: 'inherit',
    });
    execSync('node scripts/preprocess-content-simple.js', {
      cwd: path.resolve(__dirname, '..'),
      stdio: 'inherit',
    });
    console.log(`\x1b[32m[watch] done in ${Date.now() - start}ms\x1b[0m`);
  } catch (err) {
    console.error('\x1b[31m[watch] preprocess failed\x1b[0m', err.message);
  } finally {
    running = false;
  }
}

console.log(`\x1b[36m[watch] watching ${DOCS_DIR} for .md/.mdx changes…\x1b[0m`);

watch(DOCS_DIR, { recursive: true }, (_event, filename) => {
  if (!filename) return;
  if (!/\.(md|mdx|png|jpg|jpeg|gif|svg|webp)$/.test(filename)) return;

  clearTimeout(timer);
  timer = setTimeout(rebuild, DEBOUNCE_MS);
});
