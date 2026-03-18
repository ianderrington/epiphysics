#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { checkTwitterBlurbs } = require('./twitter-qc.js');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description, required = true) {
  log(`\n🔄 ${description}...`, 'blue');
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: ['inherit', 'pipe', 'pipe'] 
    });
    log(`✅ ${description} - PASSED`, 'green');
    return { success: true, output: result };
  } catch (error) {
    log(`❌ ${description} - FAILED`, 'red');
    if (error.stdout) log(error.stdout, 'yellow');
    if (error.stderr) log(error.stderr, 'red');
    
    if (required) {
      log(`\n💥 Pre-commit checks failed. Fix the issues above before committing.`, 'red');
      process.exit(1);
    }
    return { success: false, error: error.message };
  }
}

function checkForChanges() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim().length > 0;
  } catch (error) {
    log(`❌ Error checking git status: ${error.message}`, 'red');
    return false;
  }
}

function getCurrentBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch (error) {
    return 'unknown';
  }
}

function checkEnvironmentFiles() {
  log(`\n🔍 Checking environment configuration...`, 'blue');
  
  const requiredEnvVars = [
    'NEXT_PUBLIC_GTM_ID',
    'NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY'
  ];
  
  const envLocalPath = '.env.local';
  if (!fs.existsSync(envLocalPath)) {
    log(`⚠️  .env.local not found - this is OK for production`, 'yellow');
    return true;
  }
  
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  const missingVars = requiredEnvVars.filter(varName => 
    !envContent.includes(`${varName}=`)
  );
  
  if (missingVars.length > 0) {
    log(`❌ Missing environment variables: ${missingVars.join(', ')}`, 'red');
    return false;
  }
  
  log(`✅ Environment configuration - PASSED`, 'green');
  return true;
}

function checkPackageJson() {
  log(`\n📦 Checking package.json...`, 'blue');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check for required scripts
    const requiredScripts = ['build', 'dev', 'start', 'twitter:qc'];
    const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
    
    if (missingScripts.length > 0) {
      log(`❌ Missing package.json scripts: ${missingScripts.join(', ')}`, 'red');
      return false;
    }
    
    log(`✅ Package.json validation - PASSED`, 'green');
    return true;
  } catch (error) {
    log(`❌ Error reading package.json: ${error.message}`, 'red');
    return false;
  }
}

async function runPreCommitChecks() {
  log(`\n🚀 Starting Pre-Commit Checks`, 'magenta');
  log(`${'='.repeat(50)}`, 'magenta');
  
  const branch = getCurrentBranch();
  log(`📍 Current branch: ${branch}`, 'cyan');
  
  // Check if there are changes to commit
  if (!checkForChanges()) {
    log(`\nℹ️  No changes detected. Nothing to commit.`, 'yellow');
    return;
  }
  
  let allChecksPassed = true;
  
  // 1. Twitter QC Check
  log(`\n🐦 Running Twitter Blurb QC...`, 'blue');
  try {
    checkTwitterBlurbs();
    log(`✅ Twitter QC - PASSED`, 'green');
  } catch (error) {
    log(`❌ Twitter QC - FAILED`, 'red');
    allChecksPassed = false;
  }
  
  // 2. Environment check
  if (!checkEnvironmentFiles()) {
    allChecksPassed = false;
  }
  
  // 3. Package.json check
  if (!checkPackageJson()) {
    allChecksPassed = false;
  }
  
  // 4. Install dependencies (if package-lock.json changed)
  const hasPackageLockChanges = execSync('git diff --name-only --cached', { encoding: 'utf8' })
    .includes('package-lock.json');
  
  if (hasPackageLockChanges) {
    runCommand('npm ci', 'Installing dependencies', true);
  }
  
  // 5. Lint check (if available)
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.scripts.lint) {
      runCommand('npm run lint', 'Linting code', false); // Non-blocking
    }
  } catch (error) {
    // Lint script not available, skip
  }
  
  // 6. Date check (check for frontmatter dates that don't match git history)
  log(`\n📅 Running Date Checker...`, 'blue');
  try {
    const dateCheckResult = runCommand('node scripts/fix-frontmatter-dates.js --check-only', 'Checking frontmatter dates', false);
    if (!dateCheckResult.success) {
      log(`⚠️  Found frontmatter dates that don't match git commit history.`, 'yellow');
      log(`   Run 'npm run dates:fix' to automatically fix them.`, 'cyan');
      log(`   Run 'npm run dates:fix:dry' to see what would be changed.`, 'cyan');
      // Don't fail the build for date issues, just warn
    } else {
      log(`✅ All frontmatter dates match git history!`, 'green');
    }
  } catch (error) {
    log(`⚠️  Date checker not available, skipping...`, 'yellow');
  }

  // 7. Link check (check for broken links in markdown files)
  log(`\n🔗 Running Link Checker...`, 'blue');
  try {
    // Run link checker with internal links only for pre-commit (skip external to avoid timeouts)
    const linkCheckResult = runCommand('node scripts/link-checker.js --skip-external', 'Checking internal links', false);
    if (!linkCheckResult.success) {
      log(`⚠️  Link check found broken internal links. Consider fixing them when possible.`, 'yellow');
      log(`   Run 'npm run links:check:internal' for detailed link check results.`, 'cyan');
      // Don't fail the build for link issues, just warn
    } else {
      log(`✅ All internal links are working!`, 'green');
    }
  } catch (error) {
    log(`⚠️  Link checker not available, skipping...`, 'yellow');
  }

  // 8. Build check
  const buildResult = runCommand('npm run build', 'Building project', true);
  
  // 9. Type check (if available)
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.scripts['type-check']) {
      runCommand('npm run type-check', 'Type checking', false);
    }
  } catch (error) {
    // Type check not available, skip
  }
  
  if (!allChecksPassed) {
    log(`\n💥 Some checks failed. Please fix the issues above.`, 'red');
    process.exit(1);
  }
  
  log(`\n✨ All pre-commit checks passed!`, 'green');
  return true;
}

async function commitAndPush() {
  log(`\n📝 Committing changes...`, 'blue');
  
  // Add all changes
  runCommand('git add .', 'Staging all changes', true);
  
  // Create commit message
  const timestamp = new Date().toISOString().split('T')[0];
  const commitMessage = process.argv[2] || `Auto-commit: Updates and fixes (${timestamp})`;
  
  // Commit
  runCommand(`git commit -m "${commitMessage}"`, 'Committing changes', true);
  
  // Push to current branch
  const branch = getCurrentBranch();
  const pushResult = runCommand(`git push origin ${branch}`, `Pushing to ${branch}`, true);
  
  if (pushResult.success) {
    log(`\n🎉 Successfully committed and pushed to ${branch}!`, 'green');
    log(`📝 Commit message: "${commitMessage}"`, 'cyan');
  }
}

// Main execution
async function main() {
  try {
    // Run all pre-commit checks
    await runPreCommitChecks();
    
    // If all checks pass, ask if user wants to commit and push
    if (process.argv.includes('--auto-commit')) {
      await commitAndPush();
    } else {
      log(`\n🤔 All checks passed! Run with --auto-commit to automatically commit and push.`, 'yellow');
      log(`   Example: node scripts/pre-commit-check.js --auto-commit "Your commit message"`, 'cyan');
    }
    
  } catch (error) {
    log(`\n💥 Pre-commit check failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Handle CLI usage
if (require.main === module) {
  main();
}

module.exports = { runPreCommitChecks, commitAndPush }; 