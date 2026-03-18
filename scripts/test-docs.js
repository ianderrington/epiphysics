#!/usr/bin/env node

const { execSync } = require('child_process');
const { program } = require('commander');
const path = require('path');
const fs = require('fs');

program
  .name('test-docs')
  .description('Test different docs directories')
  .option('-d, --dir <directory>', 'Directory to test (docs or docs_new)')
  .option('-t, --time <seconds>', 'How long to run the server for testing', '10')
  .option('-k, --keep', 'Keep the test directory instead of restoring backup')
  .option('-s, --server-only', 'Only start the server (skip build)')
  .parse();

const options = program.opts();

function backupCurrentDocs() {
  if (fs.existsSync('docs.bak')) {
    console.log('Removing old docs backup...');
    execSync('rm -rf docs.bak');
  }
  if (fs.existsSync('docs')) {
    console.log('Backing up current docs...');
    execSync('mv docs docs.bak');
  }
}

function restoreBackup() {
  if (fs.existsSync('docs.bak')) {
    console.log('Restoring docs from backup...');
    if (fs.existsSync('docs')) {
      execSync('rm -rf docs');
    }
    execSync('mv docs.bak docs');
  }
}

function testDocs(docsDir) {
  console.log(`\nTesting ${docsDir}...`);
  
  try {
    // Backup current docs if testing docs_new
    if (docsDir === 'docs_new') {
      backupCurrentDocs();
      console.log('Moving docs_new to docs for testing...');
      execSync('cp -r docs_new docs');
    }

    if (!options.serverOnly) {
      // Clean next cache and build files
      console.log('Cleaning next cache...');
      execSync('rm -rf .next', { stdio: 'inherit' });
      
      // Run the build
      console.log('Running next build...');
      execSync('npm run build', { stdio: 'inherit' });
    }
    
    // Start the server
    console.log(`Starting server for ${options.time} seconds...`);
    execSync('npm run start', { stdio: 'inherit' });

    console.log(`\n✅ ${docsDir} test completed successfully!`);
    return true;
  } catch (error) {
    console.error(`\n❌ ${docsDir} test failed:`, error.message);
    return false;
  } finally {
    // Restore original docs if we were testing docs_new and --keep wasn't specified
    if (docsDir === 'docs_new' && !options.keep) {
      restoreBackup();
    }
  }
}

// Main execution
if (!options.dir) {
  console.log('Testing both directories...');
  testDocs('docs');
  testDocs('docs_new');
} else {
  testDocs(options.dir);
} 