#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Colors for console output
const colors = {
  reset: '\\x1b[0m',
  red: '\\x1b[31m',
  green: '\\x1b[32m',
  yellow: '\\x1b[33m',
  blue: '\\x1b[34m',
  magenta: '\\x1b[35m',
  cyan: '\\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Cache directory for build optimization
const CACHE_DIR = '.build-cache';
const HASH_FILE = path.join(CACHE_DIR, 'hashes.json');

function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function loadHashes() {
  try {
    if (fs.existsSync(HASH_FILE)) {
      return JSON.parse(fs.readFileSync(HASH_FILE, 'utf8'));
    }
  } catch (error) {
    log(`Warning: Could not load hash cache: ${error.message}`, 'yellow');
  }
  return {};
}

function saveHashes(hashes) {
  try {
    ensureCacheDir();
    fs.writeFileSync(HASH_FILE, JSON.stringify(hashes, null, 2));
  } catch (error) {
    log(`Warning: Could not save hash cache: ${error.message}`, 'yellow');
  }
}

function getFileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(content).digest('hex');
  } catch (error) {
    return null;
  }
}

function getDirectoryHash(dirPath, extensions = ['.md', '.js', '.ts', '.json']) {
  const files = [];
  
  function collectFiles(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          collectFiles(fullPath);
        } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore errors for missing directories
    }
  }
  
  collectFiles(dirPath);
  
  const hashes = files.sort().map(file => {
    const hash = getFileHash(file);
    return `${file}:${hash}`;
  });
  
  return crypto.createHash('md5').update(hashes.join('|')).digest('hex');
}

function runCommand(command, description) {
  log(`🔄 ${description}...`, 'blue');
  try {
    const result = execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    log(`✅ ${description} completed`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'red');
    return false;
  }
}

function shouldSkipTask(taskName, inputPaths, outputPaths = []) {
  const hashes = loadHashes();
  const currentHash = inputPaths.map(p => getDirectoryHash(p)).join('|');
  
  if (hashes[taskName] === currentHash) {
    // Check if outputs still exist
    const outputsExist = outputPaths.length === 0 || outputPaths.every(p => fs.existsSync(p));
    if (outputsExist) {
      log(`⚡ Skipping ${taskName} (cached)`, 'cyan');
      return true;
    }
  }
  
  hashes[taskName] = currentHash;
  saveHashes(hashes);
  return false;
}

function optimizedBuild() {
  log('🚀 Starting optimized build process...', 'magenta');
  
  const startTime = Date.now();
  
  // Twitter QC - only run if markdown files changed (non-blocking for builds)
  if (!shouldSkipTask('twitter-qc', ['docs/', 'scripts/twitter-qc.js'])) {
    log('🔄 Twitter QC check (non-blocking)...', 'blue');
    try {
      execSync('node scripts/twitter-qc.js', { encoding: 'utf8', stdio: 'inherit' });
      log('✅ Twitter QC check passed', 'green');
    } catch (error) {
      log('⚠️  Twitter QC check found issues but build will continue', 'yellow');
      log('   (Twitter QC issues should be fixed via pre-commit hooks)', 'yellow');
    }
  }
  
  // Mermaid rendering - only run if markdown files or script changed
  if (!shouldSkipTask('mermaid', ['docs/', 'src/scripts/renderMermaid.js'], ['public/diagrams/'])) {
    if (!runCommand('node src/scripts/renderMermaid.js', 'Rendering Mermaid diagrams')) {
      process.exit(1);
    }
  }
  
  // Next.js build
  log('🔄 Running Next.js build...', 'blue');
  if (!runCommand('npm run build', 'Next.js build')) {
    process.exit(1);
  }
  
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  log(`🎉 Optimized build completed in ${totalTime}s`, 'green');
}

function clearCache() {
  log('🧹 Clearing build cache...', 'yellow');
  try {
    if (fs.existsSync(CACHE_DIR)) {
      fs.rmSync(CACHE_DIR, { recursive: true });
      log('✅ Build cache cleared', 'green');
    } else {
      log('ℹ️ No cache to clear', 'blue');
    }
  } catch (error) {
    log(`❌ Error clearing cache: ${error.message}`, 'red');
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.includes('--clear-cache')) {
  clearCache();
} else {
  optimizedBuild();
} 