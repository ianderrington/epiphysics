#!/usr/bin/env node

/**
 * Validate that all markdown files have valid dates in their frontmatter
 * Used in pre-push hook to prevent pushing files with invalid dates
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const docsPath = path.join(process.cwd(), 'docs');

/**
 * Recursively get all markdown files
 */
function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, .git, etc.
      if (!file.startsWith('.') && file !== 'node_modules') {
        getAllMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Validate a single markdown file
 */
function validateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(content);

    // Skip files without frontmatter
    if (!frontmatter || Object.keys(frontmatter).length === 0) {
      return { valid: true, file: filePath };
    }

    // Skip index files (they might not need dates)
    if (filePath.endsWith('index.md') || filePath.endsWith('index.mdx')) {
      return { valid: true, file: filePath };
    }

    // Skip files in _kb (knowledge base) or other internal directories
    if (filePath.includes('/_kb/') || filePath.includes('/_pages/') || filePath.includes('/_templates/')) {
      return { valid: true, file: filePath };
    }

    // Check if file has a title (indicates it's a content file)
    if (!frontmatter.title) {
      return { valid: true, file: filePath }; // Skip files without titles
    }

    // Validate date field
    if (!frontmatter.date) {
      return {
        valid: false,
        file: filePath,
        error: 'Missing date field in frontmatter'
      };
    }

    // Validate date is parseable
    const date = new Date(frontmatter.date);
    if (isNaN(date.getTime())) {
      return {
        valid: false,
        file: filePath,
        error: `Invalid date value: "${frontmatter.date}"`
      };
    }

    return { valid: true, file: filePath };
  } catch (error) {
    return {
      valid: false,
      file: filePath,
      error: `Error reading file: ${error.message}`
    };
  }
}

// Main execution
console.log('🔍 Validating markdown file dates...\n');

const allFiles = getAllMarkdownFiles(docsPath);
const results = allFiles.map(validateFile);
const invalid = results.filter(r => !r.valid);

if (invalid.length > 0) {
  console.error('❌ Found files with invalid or missing dates:\n');
  invalid.forEach(({ file, error }) => {
    const relativePath = path.relative(process.cwd(), file);
    console.error(`  • ${relativePath}`);
    console.error(`    ${error}\n`);
  });

  console.error(`\n${invalid.length} file(s) with invalid dates.`);
  console.error('\nTo fix these files, add a valid "date" field to the frontmatter:');
  console.error('  date: 2024-01-01T00:00:00.000Z\n');
  process.exit(1);
}

console.log(`✅ All ${allFiles.length} markdown files have valid dates!\n`);
process.exit(0);
