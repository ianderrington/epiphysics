#!/usr/bin/env node

/**
 * Automated Tag Cleanup Script
 * Programmatically fixes tag issues identified by the analyzer
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const ANALYSIS_FILE = path.join(__dirname, '..', 'logs', 'tag-cleanup-analysis.json');

/**
 * Load the analysis results
 */
function loadAnalysis() {
  if (!fs.existsSync(ANALYSIS_FILE)) {
    throw new Error('Analysis file not found. Run tag-cleanup-analyzer.js first.');
  }
  
  return JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf8'));
}

/**
 * Normalize tag (matching the app's logic)
 */
function normalizeTag(tag) {
  if (!tag || typeof tag !== 'string') {
    return '';
  }
  
  const trimmed = tag.trim();
  if (!trimmed) {
    return '';
  }
  
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

/**
 * Create cleanup plan based on analysis and tag frequencies
 */
function createCleanupPlan(analysis) {
  const plan = {
    duplicateNormalization: new Map(), // raw tag -> normalized tag
    typoCorrections: new Map(), // wrong tag -> correct tag
    singleUseRemovals: new Set(), // tags to remove completely
    specificToBroad: new Map(), // specific tag -> broader tag
    consolidations: new Map() // multiple tags -> single tag
  };
  
  // Build tag frequency map and find duplicates by analyzing the actual file data
  const tagVariants = new Map(); // normalized -> Set of raw variants
  const tagFrequencies = new Map(); // normalized -> frequency
  
  // Analyze all files to find patterns
  analysis.fileAnalysis.forEach(file => {
    const allTags = [...file.rawTags, ...file.rawCategories];
    allTags.forEach(rawTag => {
      if (rawTag && typeof rawTag === 'string') {
        const normalized = normalizeTag(rawTag);
        if (normalized) {
          tagFrequencies.set(normalized, (tagFrequencies.get(normalized) || 0) + 1);
          
          if (!tagVariants.has(normalized)) {
            tagVariants.set(normalized, new Set());
          }
          tagVariants.get(normalized).add(rawTag);
        }
      }
    });
  });
  
  // 1. Plan duplicate normalization (same normalized tag, different raw variants)
  tagVariants.forEach((variants, normalized) => {
    if (variants.size > 1) {
      variants.forEach(variant => {
        if (variant !== normalized) {
          plan.duplicateNormalization.set(variant, normalized);
        }
      });
    }
  });
  
  // 2. Plan typo corrections (manual rules for obvious typos)
  const typoRules = [
    { wrong: 'Faction', correct: 'Fiction' },
    { wrong: 'Artifical intelligence', correct: 'Ai' },
    { wrong: 'Artificial-intelligence', correct: 'Ai' },
    { wrong: 'Machine-learning', correct: 'Ai' },
    { wrong: 'Super intelligence', correct: 'Ai' },
    { wrong: 'Superintelligence', correct: 'Ai' }
  ];
  
  typoRules.forEach(rule => {
    if (tagFrequencies.has(rule.wrong)) {
      plan.typoCorrections.set(rule.wrong, rule.correct);
    }
  });
  
  // 3. Plan single-use tag removal (only if they're truly noise)
  const meaningfulSingleUseTags = [
    'Fiction', 'Non-fiction', 'Poetry', 'Drama',
    'Mathematics', 'Chemistry', 'Astronomy', 
    'History', 'Geography', 'Literature', 'Art',
    'Music', 'Philosophy', 'Physics', 'Biology'
  ];
  
  tagFrequencies.forEach((freq, tag) => {
    if (freq === 1 && !meaningfulSingleUseTags.includes(tag)) {
      // Only remove truly noise tags
      if (tag.length > 20 || tag.includes('/') || tag.includes('-') && tag.split('-').length > 2) {
        plan.singleUseRemovals.add(tag);
      }
    }
  });
  
  // 4. Plan specific-to-broad conversions
  const specificToBroadRules = [
    { specific: 'Human-computer interaction', broad: 'Technology' },
    { specific: 'Human-ai-co-evolution', broad: 'Ai' },
    { specific: 'Curry-howard-correspondence', broad: 'Mathematics' },
    { specific: 'Theoretical-computer-science', broad: 'Technology' },
    { specific: 'Computer-science-education', broad: 'Education' },
    { specific: 'Foundations-of-mathematics', broad: 'Mathematics' }
  ];
  
  specificToBroadRules.forEach(rule => {
    if (tagFrequencies.has(rule.specific)) {
      plan.specificToBroad.set(rule.specific, rule.broad);
    }
  });
  
  // 5. Plan semantic consolidations
  const consolidationRules = [
    { targets: ['Ai', 'Artificial intelligence', 'Machine learning', 'Ml', 'Ai/ml'], canonical: 'Ai' },
    { targets: ['Science', 'Scientific', 'Research'], canonical: 'Science' },
    { targets: ['Education', 'Learning', 'Teaching'], canonical: 'Education' },
    { targets: ['Children', 'Kids', 'Child', "Children's learning"], canonical: 'Children' },
    { targets: ['Music', 'Songs', 'Audio'], canonical: 'Music' },
    { targets: ['Technology', 'Tech', 'Digital'], canonical: 'Technology' },
    { targets: ['Biology', 'Biological', 'Bio'], canonical: 'Biology' },
    { targets: ['Physics', 'Physical'], canonical: 'Physics' },
    { targets: ['Programming', 'Coding', 'Software development'], canonical: 'Technology' },
    { targets: ['Philosophy', 'Philosophical'], canonical: 'Philosophy' }
  ];
  
  consolidationRules.forEach(rule => {
    rule.targets.forEach(target => {
      if (target !== rule.canonical && tagFrequencies.has(target)) {
        plan.consolidations.set(target, rule.canonical);
      }
    });
  });
  
  return plan;
}

/**
 * Apply cleanup to a single file
 */
function cleanupFile(filePath, plan) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(content);
    
    let modified = false;
    const changes = [];
    
    // Clean up tags array
    if (Array.isArray(frontmatter.tags)) {
      const originalTags = [...frontmatter.tags];
      const cleanedTags = new Set();
      
      frontmatter.tags.forEach(tag => {
        if (!tag || typeof tag !== 'string') return;
        
        let cleanedTag = tag;
        
        // Apply duplicate normalization
        if (plan.duplicateNormalization.has(tag)) {
          cleanedTag = plan.duplicateNormalization.get(tag);
          changes.push(`Tag normalized: "${tag}" → "${cleanedTag}"`);
        }
        
        // Apply typo corrections
        else if (plan.typoCorrections.has(normalizeTag(tag))) {
          cleanedTag = plan.typoCorrections.get(normalizeTag(tag));
          changes.push(`Typo corrected: "${tag}" → "${cleanedTag}"`);
        }
        
        // Apply semantic consolidations
        else if (plan.consolidations.has(normalizeTag(tag))) {
          cleanedTag = plan.consolidations.get(normalizeTag(tag));
          changes.push(`Consolidated: "${tag}" → "${cleanedTag}"`);
        }
        
        // Apply specific-to-broad conversions
        else if (plan.specificToBroad.has(normalizeTag(tag))) {
          cleanedTag = plan.specificToBroad.get(normalizeTag(tag));
          changes.push(`Broadened: "${tag}" → "${cleanedTag}"`);
        }
        
        // Check for single-use removal
        else if (plan.singleUseRemovals.has(normalizeTag(tag))) {
          changes.push(`Removed single-use tag: "${tag}"`);
          return; // Skip adding this tag
        }
        
        // Normalize the final tag
        cleanedTag = normalizeTag(cleanedTag);
        if (cleanedTag) {
          cleanedTags.add(cleanedTag);
        }
      });
      
      frontmatter.tags = Array.from(cleanedTags).sort();
      
      if (JSON.stringify(originalTags) !== JSON.stringify(frontmatter.tags)) {
        modified = true;
      }
    }
    
    // Clean up categories array (apply same logic)
    if (Array.isArray(frontmatter.categories)) {
      const originalCategories = [...frontmatter.categories];
      const cleanedCategories = new Set();
      
      frontmatter.categories.forEach(category => {
        if (!category || typeof category !== 'string') return;
        
        let cleanedCategory = category;
        
        // Apply same cleanup logic as tags
        if (plan.duplicateNormalization.has(category)) {
          cleanedCategory = plan.duplicateNormalization.get(category);
          changes.push(`Category normalized: "${category}" → "${cleanedCategory}"`);
        } else if (plan.typoCorrections.has(normalizeTag(category))) {
          cleanedCategory = plan.typoCorrections.get(normalizeTag(category));
          changes.push(`Category typo corrected: "${category}" → "${cleanedCategory}"`);
        } else if (plan.consolidations.has(normalizeTag(category))) {
          cleanedCategory = plan.consolidations.get(normalizeTag(category));
          changes.push(`Category consolidated: "${category}" → "${cleanedCategory}"`);
        } else if (plan.specificToBroad.has(normalizeTag(category))) {
          cleanedCategory = plan.specificToBroad.get(normalizeTag(category));
          changes.push(`Category broadened: "${category}" → "${cleanedCategory}"`);
        } else if (plan.singleUseRemovals.has(normalizeTag(category))) {
          changes.push(`Removed single-use category: "${category}"`);
          return;
        }
        
        cleanedCategory = normalizeTag(cleanedCategory);
        if (cleanedCategory) {
          cleanedCategories.add(cleanedCategory);
        }
      });
      
      frontmatter.categories = Array.from(cleanedCategories).sort();
      
      if (JSON.stringify(originalCategories) !== JSON.stringify(frontmatter.categories)) {
        modified = true;
      }
    }
    
    // Write the file back if modified
    if (modified) {
      const newContent = matter.stringify(markdownContent, frontmatter);
      fs.writeFileSync(filePath, newContent, 'utf8');
      
      return {
        file: path.relative(DOCS_DIR, filePath),
        modified: true,
        changes
      };
    }
    
    return {
      file: path.relative(DOCS_DIR, filePath),
      modified: false,
      changes: []
    };
    
  } catch (error) {
    return {
      file: path.relative(DOCS_DIR, filePath),
      modified: false,
      changes: [],
      error: error.message
    };
  }
}

/**
 * Find all markdown files
 */
function findMarkdownFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findMarkdownFiles(fullPath, files);
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Main cleanup function
 */
function runAutomatedCleanup(dryRun = false) {
  console.log('🧹 Starting automated tag cleanup...\n');
  
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }
  
  // Load analysis
  const analysis = loadAnalysis();
  console.log(`Loaded analysis with ${analysis.summary.totalUniqueTags} unique tags`);
  
  // Create cleanup plan
  const plan = createCleanupPlan(analysis);
  
  console.log('\n📋 CLEANUP PLAN');
  console.log('================');
  console.log(`Duplicate normalizations: ${plan.duplicateNormalization.size}`);
  console.log(`Typo corrections: ${plan.typoCorrections.size}`);
  console.log(`Single-use removals: ${plan.singleUseRemovals.size}`);
  console.log(`Specific-to-broad conversions: ${plan.specificToBroad.size}`);
  console.log(`Semantic consolidations: ${plan.consolidations.size}`);
  
  // Show some examples
  console.log('\nExamples:');
  let exampleCount = 0;
  plan.duplicateNormalization.forEach((target, source) => {
    if (exampleCount < 5) {
      console.log(`  • "${source}" → "${target}" (normalization)`);
      exampleCount++;
    }
  });
  plan.typoCorrections.forEach((target, source) => {
    if (exampleCount < 10) {
      console.log(`  • "${source}" → "${target}" (typo fix)`);
      exampleCount++;
    }
  });
  
  if (dryRun) {
    console.log('\n✅ Dry run completed. Use --execute to apply changes.');
    return { dryRun: true, plan };
  }
  
  // Apply cleanup to all files
  console.log('\n🔧 Applying cleanup...');
  const markdownFiles = findMarkdownFiles(DOCS_DIR);
  const results = markdownFiles.map(file => cleanupFile(file, plan));
  
  // Generate report
  const modifiedFiles = results.filter(r => r.modified);
  const errorFiles = results.filter(r => r.error);
  
  console.log('\n📊 CLEANUP RESULTS');
  console.log('===================');
  console.log(`Total files processed: ${results.length}`);
  console.log(`Files modified: ${modifiedFiles.length}`);
  console.log(`Files with errors: ${errorFiles.length}`);
  
  if (modifiedFiles.length > 0) {
    console.log('\n📝 Modified files:');
    modifiedFiles.slice(0, 20).forEach(result => {
      console.log(`  • ${result.file} (${result.changes.length} changes)`);
    });
    if (modifiedFiles.length > 20) {
      console.log(`  ... and ${modifiedFiles.length - 20} more`);
    }
  }
  
  if (errorFiles.length > 0) {
    console.log('\n❌ Files with errors:');
    errorFiles.forEach(result => {
      console.log(`  • ${result.file}: ${result.error}`);
    });
  }
  
  // Save detailed results
  const detailedResults = {
    timestamp: new Date().toISOString(),
    plan,
    results,
    summary: {
      totalFiles: results.length,
      modifiedFiles: modifiedFiles.length,
      errorFiles: errorFiles.length,
      totalChanges: modifiedFiles.reduce((sum, r) => sum + r.changes.length, 0)
    }
  };
  
  const outputPath = path.join(__dirname, '..', 'logs', 'tag-cleanup-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(detailedResults, null, 2));
  console.log(`\n💾 Detailed results saved to: ${path.relative(process.cwd(), outputPath)}`);
  
  console.log('\n✅ Cleanup completed!');
  console.log('💡 Re-run the analyzer to see the improvements.');
  
  return detailedResults;
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--execute');
  
  if (dryRun) {
    console.log('Use --execute flag to apply changes, or run in dry-run mode first.\n');
  }
  
  try {
    runAutomatedCleanup(dryRun);
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
}

module.exports = { runAutomatedCleanup };
