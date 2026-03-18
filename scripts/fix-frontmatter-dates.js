#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { glob } = require('glob');

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

class FrontmatterDateFixer {
  constructor(options = {}) {
    this.options = {
      docsDir: options.docsDir || 'docs',
      dryRun: options.dryRun || false,
      checkOnly: options.checkOnly || false,
      verbose: options.verbose || false,
      ignorePatterns: options.ignorePatterns || [
        /node_modules/,
        /\.git/,
        /\.next/,
        /dist/,
        /build/
      ],
      ...options
    };
    
    this.results = {
      totalFiles: 0,
      filesWithDates: 0,
      incorrectDates: 0,
      fixedFiles: [],
      errors: []
    };
  }

  async fixDates() {
    log('\n📅 Starting Frontmatter Date Fixer', 'magenta');
    log('='.repeat(50), 'magenta');
    
    try {
      // Find all markdown files
      const markdownFiles = await this.findMarkdownFiles();
      this.results.totalFiles = markdownFiles.length;
      
      log(`\n📄 Found ${markdownFiles.length} markdown files`, 'blue');
      
      if (this.options.checkOnly) {
        log('🔍 Running in check-only mode', 'yellow');
      } else if (this.options.dryRun) {
        log('🧪 Running in dry-run mode (no files will be modified)', 'yellow');
      }
      
      // Process each file
      for (const filePath of markdownFiles) {
        await this.processFile(filePath);
      }
      
      // Generate report
      this.generateReport();
      
      return this.results.incorrectDates === 0;
      
    } catch (error) {
      log(`\n❌ Date fixer failed: ${error.message}`, 'red');
      this.results.errors.push(error.message);
      return false;
    }
  }

  async findMarkdownFiles() {
    const pattern = path.join(this.options.docsDir, '**/*.md');
    const files = await glob(pattern, { 
      ignore: this.options.ignorePatterns.map(p => p.toString().slice(1, -1))
    });
    return files.map(file => path.resolve(file));
  }

  async processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const frontmatterDate = this.extractFrontmatterDate(content);
      
      if (!frontmatterDate) {
        if (this.options.verbose) {
          log(`⚪ No date found in ${path.relative(process.cwd(), filePath)}`, 'cyan');
        }
        return;
      }

      this.results.filesWithDates++;
      
      const gitDate = await this.getFirstCommitDate(filePath);
      if (!gitDate) {
        log(`⚠️  No git history found for ${path.relative(process.cwd(), filePath)}`, 'yellow');
        return;
      }

      const frontmatterDateObj = new Date(frontmatterDate);
      const gitDateObj = new Date(gitDate);
      
      // Check if dates are significantly different (more than 1 day difference)
      const daysDifference = Math.abs((frontmatterDateObj - gitDateObj) / (1000 * 60 * 60 * 24));
      
      if (daysDifference > 1) {
        this.results.incorrectDates++;
        const relativePath = path.relative(process.cwd(), filePath);
        
        log(`\n📝 ${relativePath}`, 'cyan');
        log(`  ❌ Frontmatter: ${frontmatterDate}`, 'red');
        log(`  ✅ Git commit:  ${gitDate}`, 'green');
        log(`  📊 Difference:  ${daysDifference.toFixed(1)} days`, 'yellow');
        
        if (!this.options.checkOnly) {
          const success = await this.fixFileDate(filePath, content, frontmatterDate, gitDate);
          if (success) {
            this.results.fixedFiles.push({
              file: relativePath,
              oldDate: frontmatterDate,
              newDate: gitDate,
              daysDifference: daysDifference
            });
            if (!this.options.dryRun) {
              log(`  🔧 Fixed!`, 'green');
            } else {
              log(`  🧪 Would fix (dry run)`, 'yellow');
            }
          }
        }
      } else if (this.options.verbose) {
        log(`✅ ${path.relative(process.cwd(), filePath)} - dates match`, 'green');
      }
      
    } catch (error) {
      const relativePath = path.relative(process.cwd(), filePath);
      log(`❌ Error processing ${relativePath}: ${error.message}`, 'red');
      this.results.errors.push(`Error processing ${relativePath}: ${error.message}`);
    }
  }

  extractFrontmatterDate(content) {
    // Match YAML frontmatter date field
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return null;
    
    const frontmatter = frontmatterMatch[1];
    const dateMatch = frontmatter.match(/^date:\s*(.+)$/m);
    
    if (!dateMatch) return null;
    
    // Clean up the date string (remove quotes, trim whitespace)
    return dateMatch[1].replace(/['"]/g, '').trim();
  }

  async getFirstCommitDate(filePath) {
    try {
      // Get the first commit date for this file
      const result = execSync(
        `git log --format="%ci" --follow "${filePath}" | tail -1`,
        { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
      );
      
      if (!result.trim()) return null;
      
      // Parse git date and convert to ISO format
      const gitDate = new Date(result.trim());
      return gitDate.toISOString();
      
    } catch (error) {
      if (this.options.verbose) {
        log(`⚠️  Git error for ${filePath}: ${error.message}`, 'yellow');
      }
      return null;
    }
  }

  async fixFileDate(filePath, content, oldDate, newDate) {
    try {
      if (this.options.dryRun) {
        return true; // Simulate success in dry run
      }
      
      // Replace the date in frontmatter
      const updatedContent = content.replace(
        /^(date:\s*)(.+)$/m,
        `$1${newDate}`
      );
      
      if (updatedContent === content) {
        log(`⚠️  Could not replace date in ${path.relative(process.cwd(), filePath)}`, 'yellow');
        return false;
      }
      
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      return true;
      
    } catch (error) {
      log(`❌ Failed to fix ${path.relative(process.cwd(), filePath)}: ${error.message}`, 'red');
      return false;
    }
  }

  generateReport() {
    log('\n📊 Date Fix Report', 'magenta');
    log('='.repeat(50), 'magenta');
    
    log(`📄 Total files processed: ${this.results.totalFiles}`, 'cyan');
    log(`📅 Files with dates: ${this.results.filesWithDates}`, 'cyan');
    log(`❌ Incorrect dates found: ${this.results.incorrectDates}`, this.results.incorrectDates > 0 ? 'red' : 'green');
    
    if (this.results.fixedFiles.length > 0) {
      if (this.options.dryRun) {
        log(`🧪 Files that would be fixed: ${this.results.fixedFiles.length}`, 'yellow');
      } else {
        log(`🔧 Files fixed: ${this.results.fixedFiles.length}`, 'green');
      }
      
      if (this.options.verbose) {
        log('\nFixed files:', 'cyan');
        this.results.fixedFiles.forEach((fix, index) => {
          log(`${index + 1}. ${fix.file}`, 'yellow');
          log(`   Old: ${fix.oldDate}`, 'red');
          log(`   New: ${fix.newDate}`, 'green');
          log(`   Diff: ${fix.daysDifference.toFixed(1)} days`, 'cyan');
        });
      }
    }
    
    if (this.results.errors.length > 0) {
      log(`\n⚠️  Errors encountered: ${this.results.errors.length}`, 'yellow');
      if (this.options.verbose) {
        this.results.errors.forEach(error => {
          log(`  - ${error}`, 'yellow');
        });
      }
    }
    
    if (this.results.incorrectDates === 0) {
      log('\n✨ All frontmatter dates are correct!', 'green');
    } else if (this.options.checkOnly) {
      log(`\n🔍 Found ${this.results.incorrectDates} files with incorrect dates.`, 'yellow');
      log('   Run without --check-only to fix them.', 'cyan');
    }
  }
}

// CLI functionality
async function main() {
  const args = process.argv.slice(2);
  const options = {};
  
  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--check-only':
        options.checkOnly = true;
        break;
      case '--verbose':
        options.verbose = true;
        break;
      case '--docs-dir':
        options.docsDir = args[++i];
        break;
      case '--help':
        console.log(`
Frontmatter Date Fixer Usage:
  node scripts/fix-frontmatter-dates.js [options]

Options:
  --dry-run         Show what would be changed without making changes
  --check-only      Only check for incorrect dates, don't fix them
  --verbose         Show detailed output including correct files
  --docs-dir <dir>  Specify docs directory (default: docs)
  --help            Show this help message

Examples:
  node scripts/fix-frontmatter-dates.js --check-only
  node scripts/fix-frontmatter-dates.js --dry-run --verbose
  node scripts/fix-frontmatter-dates.js
        `);
        process.exit(0);
        break;
    }
  }
  
  const fixer = new FrontmatterDateFixer(options);
  const success = await fixer.fixDates();
  
  if (!success) {
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    log(`\n💥 Fatal error: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { FrontmatterDateFixer };
