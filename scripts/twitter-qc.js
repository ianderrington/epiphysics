#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const TWITTER_CHAR_LIMIT = 280;
const DOCS_DIR = path.join(process.cwd(), 'docs');

// Twitter automatically shortens all URLs to t.co links which are always 23 characters
// Plus a space before the URL = 24 characters total
const ESTIMATED_URL_LENGTH = 24;

function getAllMarkdownFiles(dir) {
  const files = [];
  
  function traverse(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function checkTwitterBlurbs() {
  console.log('🐦 Twitter Blurb QC - Checking character limits...\n');
  
  const markdownFiles = getAllMarkdownFiles(DOCS_DIR);
  const issues = [];
  let totalChecked = 0;
  let filesWithTwitterBlurbs = 0;
  
  for (const filePath of markdownFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(content);
      
      if (frontmatter.shareBlurbs?.twitter) {
        totalChecked++;
        filesWithTwitterBlurbs++;
        const twitterBlurb = frontmatter.shareBlurbs.twitter;
        const blurbLength = twitterBlurb.length;
        
        // Calculate total length including URL that will be added
        const totalCharCount = blurbLength + ESTIMATED_URL_LENGTH;
        const effectiveLimit = TWITTER_CHAR_LIMIT - ESTIMATED_URL_LENGTH;
        
        if (totalCharCount > TWITTER_CHAR_LIMIT) {
          issues.push({
            file: path.relative(process.cwd(), filePath),
            title: frontmatter.title || 'Untitled',
            blurb: twitterBlurb,
            charCount: blurbLength,
            totalCharCount: totalCharCount,
            excess: totalCharCount - TWITTER_CHAR_LIMIT,
            effectiveLimit: effectiveLimit
          });
        }
        
        // Also show a sample of what we're checking (first few files)
        if (totalChecked <= 3) {
          const status = totalCharCount > TWITTER_CHAR_LIMIT ? '❌' : '✅';
          console.log(`${status} ${path.relative(process.cwd(), filePath)}`);
          console.log(`   Title: ${frontmatter.title || 'Untitled'}`);
          console.log(`   Twitter blurb: ${blurbLength} chars`);
          console.log(`   With URL: ${totalCharCount}/${TWITTER_CHAR_LIMIT} chars`);
          console.log(`   Blurb: "${twitterBlurb.substring(0, 80)}${twitterBlurb.length > 80 ? '...' : ''}"`);
          console.log('');
        }
      }
    } catch (error) {
      console.warn(`⚠️  Warning: Could not parse ${filePath}: ${error.message}`);
    }
  }
  
  console.log(`📊 Summary:`);
  console.log(`   Total markdown files: ${markdownFiles.length}`);
  console.log(`   Files with Twitter blurbs: ${filesWithTwitterBlurbs}`);
  console.log(`   Character limit violations: ${issues.length}\n`);
  
  if (issues.length > 0) {
    console.log('❌ Twitter Blurb Issues Found:\n');
    
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.file}`);
      console.log(`   Title: ${issue.title}`);
      console.log(`   Blurb length: ${issue.charCount} chars`);
      console.log(`   Total with URL: ${issue.totalCharCount}/${TWITTER_CHAR_LIMIT} (${issue.excess} chars over)`);
      console.log(`   Effective limit: ${issue.effectiveLimit} chars (${ESTIMATED_URL_LENGTH} reserved for URL)`);
      console.log(`   Blurb: "${issue.blurb}"`);
      console.log('');
    });
    
    console.log(`💡 Suggestions:`);
    console.log(`   • Shorten the blurbs to fit within ${TWITTER_CHAR_LIMIT - ESTIMATED_URL_LENGTH} characters (${ESTIMATED_URL_LENGTH} chars reserved for URL)`);
    console.log(`   • Use abbreviations and remove unnecessary words`);
    console.log(`   • Consider using emoji to replace words (🚀 for "launch", 💡 for "idea")`);
    console.log(`   • Break complex ideas into multiple tweets or threads\n`);
    
    // Exit with error code for CI/CD
    process.exit(1);
  } else {
    console.log('✅ All Twitter blurbs are within the character limit!');
    
    if (filesWithTwitterBlurbs === 0) {
      console.log('ℹ️  No Twitter blurbs found to check.');
    }
  }
}

// Run the check
if (require.main === module) {
  try {
    checkTwitterBlurbs();
  } catch (error) {
    console.error('❌ Error running Twitter QC:', error.message);
    process.exit(1);
  }
}

module.exports = { checkTwitterBlurbs, getAllMarkdownFiles }; 