#!/usr/bin/env node

/**
 * Wrapper to run TypeScript preprocessing script using tsx
 */

const { spawn } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'preprocess-content.ts');

// Use tsx to run the TypeScript file with proper ESM support
const child = spawn('npx', ['tsx', '--tsconfig', 'tsconfig.json', scriptPath], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    // Force CommonJS resolution for problematic packages
    TS_NODE_PROJECT: path.join(process.cwd(), 'tsconfig.json'),
  }
});

child.on('close', (code) => {
  process.exit(code || 0);
});

child.on('error', (err) => {
  console.error('Failed to start preprocessing:', err);
  process.exit(1);
});
