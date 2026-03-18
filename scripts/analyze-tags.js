#!/usr/bin/env node

/**
 * Tag Analysis Script
 * Analyzes all tags in the blog and provides statistics
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '..', 'docs');

/**
 * Recursively find all markdown files
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
 * Extract tags from a markdown file
 */
function extractTags(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    const tags = [];
    
    // Extract tags from tags field
    if (Array.isArray(data.tags)) {
      tags.push(...data.tags.map(tag => tag.trim()));
    }
    
    // Extract tags from categories field
    if (Array.isArray(data.categories)) {
      tags.push(...data.categories.map(cat => cat.trim()));
    }
    
    return {
      file: path.relative(DOCS_DIR, filePath),
      tags: tags.filter(tag => tag.length > 0)
    };
  } catch (error) {
    console.warn(`Warning: Could not process ${filePath}: ${error.message}`);
    return { file: path.relative(DOCS_DIR, filePath), tags: [] };
  }
}

/**
 * Normalize tag for counting (consistent with the app's logic)
 */
function normalizeTag(tag) {
  return tag.trim();
}

/**
 * Main analysis function
 */
function analyzeTagsSync() {
  console.log('🔍 Analyzing tags in blog posts...\n');
  
  // Find all markdown files
  const markdownFiles = findMarkdownFiles(DOCS_DIR);
  console.log(`Found ${markdownFiles.length} markdown files`);
  
  // Extract tags from all files
  const tagMap = new Map();
  const fileTagMap = new Map();
  let totalPosts = 0;
  
  for (const file of markdownFiles) {
    const { file: relativePath, tags } = extractTags(file);
    
    if (tags.length > 0) {
      totalPosts++;
      fileTagMap.set(relativePath, tags);
      
      // Count tag frequencies
      for (const tag of tags) {
        const normalized = normalizeTag(tag);
        tagMap.set(normalized, (tagMap.get(normalized) || 0) + 1);
      }
    }
  }
  
  // Convert to sorted array
  const sortedTags = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  
  // Generate statistics
  const totalTags = sortedTags.length;
  const totalTagUsages = sortedTags.reduce((sum, tag) => sum + tag.count, 0);
  
  // Frequency thresholds
  const frequencyThresholds = [1, 2, 3, 4, 5, 10, 15, 20];
  
  console.log('\n📊 TAG ANALYSIS RESULTS');
  console.log('========================');
  console.log(`Total posts with tags: ${totalPosts}`);
  console.log(`Total unique tags: ${totalTags}`);
  console.log(`Total tag usages: ${totalTagUsages}`);
  console.log(`Average tags per post: ${(totalTagUsages / totalPosts).toFixed(2)}`);
  
  console.log('\n📈 TAG FREQUENCY DISTRIBUTION');
  console.log('==============================');
  
  for (const threshold of frequencyThresholds) {
    const tagsAboveThreshold = sortedTags.filter(tag => tag.count >= threshold).length;
    const percentageOfTags = ((tagsAboveThreshold / totalTags) * 100).toFixed(1);
    const usagesAboveThreshold = sortedTags
      .filter(tag => tag.count >= threshold)
      .reduce((sum, tag) => sum + tag.count, 0);
    const percentageOfUsages = ((usagesAboveThreshold / totalTagUsages) * 100).toFixed(1);
    
    console.log(`Tags with ≥${threshold} uses: ${tagsAboveThreshold} (${percentageOfTags}% of tags, ${percentageOfUsages}% of usages)`);
  }
  
  console.log('\n🏷️  TOP 20 MOST FREQUENT TAGS');
  console.log('==============================');
  sortedTags.slice(0, 20).forEach((tag, index) => {
    console.log(`${(index + 1).toString().padStart(2)}.  ${tag.name.padEnd(30)} (${tag.count})`);
  });
  
  console.log('\n📝 TAGS WITH EXACTLY 1 USE (SAMPLE)');
  console.log('====================================');
  const singleUseTags = sortedTags.filter(tag => tag.count === 1);
  singleUseTags.slice(0, 20).forEach(tag => {
    console.log(`    ${tag.name}`);
  });
  if (singleUseTags.length > 20) {
    console.log(`    ... and ${singleUseTags.length - 20} more`);
  }
  
  console.log('\n🎯 RECOMMENDATION');
  console.log('==================');
  const tagsWithMinFreq5 = sortedTags.filter(tag => tag.count >= 5).length;
  const tagsWithMinFreq3 = sortedTags.filter(tag => tag.count >= 3).length;
  
  console.log(`Setting minimum frequency to 5 would show ${tagsWithMinFreq5} tags (${((tagsWithMinFreq5 / totalTags) * 100).toFixed(1)}% of current tags)`);
  console.log(`Setting minimum frequency to 3 would show ${tagsWithMinFreq3} tags (${((tagsWithMinFreq3 / totalTags) * 100).toFixed(1)}% of current tags)`);
  
  // Save detailed results to JSON
  const results = {
    analysis: {
      totalPosts,
      totalTags,
      totalTagUsages,
      averageTagsPerPost: totalTagUsages / totalPosts
    },
    frequencyDistribution: frequencyThresholds.map(threshold => ({
      threshold,
      tagsAboveThreshold: sortedTags.filter(tag => tag.count >= threshold).length,
      usagesAboveThreshold: sortedTags
        .filter(tag => tag.count >= threshold)
        .reduce((sum, tag) => sum + tag.count, 0)
    })),
    allTags: sortedTags,
    fileTagMap: Object.fromEntries(fileTagMap)
  };
  
  const outputPath = path.join(__dirname, '..', 'logs', 'tag-analysis.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Detailed results saved to: ${path.relative(process.cwd(), outputPath)}`);
  
  return results;
}

// Run if called directly
if (require.main === module) {
  try {
    analyzeTagsSync();
  } catch (error) {
    console.error('Error analyzing tags:', error);
    process.exit(1);
  }
}

module.exports = { analyzeTagsSync };
