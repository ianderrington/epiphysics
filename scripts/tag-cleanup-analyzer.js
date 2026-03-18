#!/usr/bin/env node

/**
 * Tag Cleanup Analyzer
 * Comprehensive analysis of tag distribution and identification of cleanup targets
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
 * Extract and analyze tags from a markdown file
 */
function analyzeFileTagsRaw(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(content);
    
    const rawTags = [];
    const rawCategories = [];
    
    // Extract raw tags
    if (Array.isArray(frontmatter.tags)) {
      rawTags.push(...frontmatter.tags);
    }
    
    // Extract raw categories
    if (Array.isArray(frontmatter.categories)) {
      rawCategories.push(...frontmatter.categories);
    }
    
    return {
      file: path.relative(DOCS_DIR, filePath),
      fullPath: filePath,
      rawTags,
      rawCategories,
      normalizedTags: [...rawTags, ...rawCategories].map(normalizeTag).filter(Boolean),
      frontmatter
    };
  } catch (error) {
    console.warn(`Warning: Could not process ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Identify problematic tags that need cleanup
 */
function identifyProblematicTags(fileAnalysis) {
  const problems = {
    duplicates: new Map(), // Same tag with different cases
    lowFrequency: new Map(), // Tags with very low frequency
    typos: new Map(), // Potential typos
    inconsistent: new Map(), // Similar tags that might be duplicates
    tooSpecific: new Map(), // Overly specific tags
    empty: [], // Files with empty/invalid tags
    overlapping: new Map() // Tags that overlap semantically
  };
  
  // Build frequency maps
  const normalizedFreq = new Map();
  const rawTagVariants = new Map(); // Track all variants of each normalized tag
  
  fileAnalysis.forEach(file => {
    if (!file) return;
    
    // Track raw variants for each normalized tag
    [...file.rawTags, ...file.rawCategories].forEach(rawTag => {
      if (rawTag && typeof rawTag === 'string') {
        const normalized = normalizeTag(rawTag);
        if (normalized) {
          normalizedFreq.set(normalized, (normalizedFreq.get(normalized) || 0) + 1);
          
          if (!rawTagVariants.has(normalized)) {
            rawTagVariants.set(normalized, new Set());
          }
          rawTagVariants.set(normalized, rawTagVariants.get(normalized).add(rawTag));
        }
      }
    });
    
    // Check for empty tags
    const hasEmptyTags = [...file.rawTags, ...file.rawCategories].some(tag => 
      !tag || typeof tag !== 'string' || tag.trim() === ''
    );
    if (hasEmptyTags) {
      problems.empty.push(file);
    }
  });
  
  // Identify duplicates (same normalized tag, different raw variants)
  rawTagVariants.forEach((variants, normalized) => {
    if (variants.size > 1) {
      problems.duplicates.set(normalized, {
        variants: Array.from(variants),
        frequency: normalizedFreq.get(normalized),
        files: fileAnalysis.filter(f => f && f.normalizedTags.includes(normalized))
      });
    }
  });
  
  // Identify low frequency tags
  normalizedFreq.forEach((freq, tag) => {
    if (freq === 1) {
      problems.lowFrequency.set(tag, {
        frequency: freq,
        files: fileAnalysis.filter(f => f && f.normalizedTags.includes(tag))
      });
    }
  });
  
  // Identify potential typos and similar tags
  const allTags = Array.from(normalizedFreq.keys());
  for (let i = 0; i < allTags.length; i++) {
    for (let j = i + 1; j < allTags.length; j++) {
      const tag1 = allTags[i];
      const tag2 = allTags[j];
      
      // Check for very similar tags (potential typos)
      if (levenshteinDistance(tag1.toLowerCase(), tag2.toLowerCase()) <= 2 && 
          Math.abs(tag1.length - tag2.length) <= 2) {
        
        const freq1 = normalizedFreq.get(tag1);
        const freq2 = normalizedFreq.get(tag2);
        
        // The less frequent one might be a typo
        if (Math.abs(freq1 - freq2) > 3) {
          const lessFrequent = freq1 < freq2 ? tag1 : tag2;
          const moreFrequent = freq1 < freq2 ? tag2 : tag1;
          
          problems.typos.set(lessFrequent, {
            suggestedReplacement: moreFrequent,
            frequency: Math.min(freq1, freq2),
            targetFrequency: Math.max(freq1, freq2),
            files: fileAnalysis.filter(f => f && f.normalizedTags.includes(lessFrequent))
          });
        }
      }
      
      // Check for semantically similar tags
      if (areSemanticallyRelated(tag1, tag2)) {
        if (!problems.overlapping.has(tag1)) {
          problems.overlapping.set(tag1, new Set());
        }
        problems.overlapping.get(tag1).add(tag2);
      }
    }
  }
  
  // Identify overly specific tags
  normalizedFreq.forEach((freq, tag) => {
    if (isOverlySpecific(tag) && freq < 3) {
      problems.tooSpecific.set(tag, {
        frequency: freq,
        suggestedBroadening: suggestBroaderTag(tag),
        files: fileAnalysis.filter(f => f && f.normalizedTags.includes(tag))
      });
    }
  });
  
  return problems;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Check if two tags are semantically related
 */
function areSemanticallyRelated(tag1, tag2) {
  const related = [
    ['ai', 'artificial intelligence', 'machine learning', 'ml'],
    ['science', 'research', 'scientific'],
    ['education', 'learning', 'teaching'],
    ['children', 'kids', 'child'],
    ['music', 'songs', 'audio'],
    ['programming', 'coding', 'software development'],
    ['biology', 'biological', 'bio'],
    ['physics', 'physical'],
    ['technology', 'tech', 'digital']
  ];
  
  return related.some(group => 
    group.some(item => tag1.toLowerCase().includes(item)) &&
    group.some(item => tag2.toLowerCase().includes(item)) &&
    tag1 !== tag2
  );
}

/**
 * Check if a tag is overly specific
 */
function isOverlySpecific(tag) {
  return tag.length > 25 || 
         tag.includes('-') && tag.split('-').length > 3 ||
         tag.includes(' ') && tag.split(' ').length > 4;
}

/**
 * Suggest a broader tag
 */
function suggestBroaderTag(tag) {
  const broadeningMap = {
    'dna sequencing': 'Biology',
    'machine learning': 'Ai',
    'software development': 'Technology',
    'artificial intelligence': 'Ai',
  };
  
  const lowerTag = tag.toLowerCase();
  for (const [specific, broad] of Object.entries(broadeningMap)) {
    if (lowerTag.includes(specific)) {
      return broad;
    }
  }
  
  // General broadening rules
  if (lowerTag.includes('ai') || lowerTag.includes('artificial')) return 'Ai';
  if (lowerTag.includes('bio') || lowerTag.includes('dna') || lowerTag.includes('gene')) return 'Biology';
  if (lowerTag.includes('physics') || lowerTag.includes('quantum')) return 'Physics';
  if (lowerTag.includes('music') || lowerTag.includes('song')) return 'Music';
  if (lowerTag.includes('child') || lowerTag.includes('kid')) return 'Children';
  if (lowerTag.includes('learn') || lowerTag.includes('teach')) return 'Education';
  
  return 'General';
}

/**
 * Main analysis function
 */
function analyzeTagDistribution() {
  console.log('🔍 Analyzing tag distribution and identifying cleanup targets...\n');
  
  const markdownFiles = findMarkdownFiles(DOCS_DIR);
  console.log(`Found ${markdownFiles.length} markdown files`);
  
  const fileAnalysis = markdownFiles.map(analyzeFileTagsRaw).filter(Boolean);
  const filesWithTags = fileAnalysis.filter(f => f.normalizedTags.length > 0);
  
  console.log(`Files with tags: ${filesWithTags.length}`);
  
  const problems = identifyProblematicTags(fileAnalysis);
  
  // Generate comprehensive report
  console.log('\n📊 TAG DISTRIBUTION ANALYSIS');
  console.log('============================');
  
  // Summary statistics
  const allNormalizedTags = new Map();
  filesWithTags.forEach(file => {
    file.normalizedTags.forEach(tag => {
      allNormalizedTags.set(tag, (allNormalizedTags.get(tag) || 0) + 1);
    });
  });
  
  const totalUniqueTags = allNormalizedTags.size;
  const totalTagUsages = Array.from(allNormalizedTags.values()).reduce((a, b) => a + b, 0);
  
  console.log(`Total unique tags: ${totalUniqueTags}`);
  console.log(`Total tag usages: ${totalTagUsages}`);
  console.log(`Average tags per file: ${(totalTagUsages / filesWithTags.length).toFixed(2)}`);
  
  // Problem analysis
  console.log('\n🚨 PROBLEMS IDENTIFIED');
  console.log('=======================');
  
  console.log(`\n1. DUPLICATE TAGS (${problems.duplicates.size} issues)`);
  console.log('   Same tag with different cases/formatting:');
  let duplicateCount = 0;
  problems.duplicates.forEach((data, tag) => {
    if (duplicateCount < 10) {
      console.log(`   • "${tag}" appears as: ${data.variants.map(v => `"${v}"`).join(', ')} (${data.frequency} uses)`);
    }
    duplicateCount++;
  });
  if (duplicateCount > 10) console.log(`   ... and ${duplicateCount - 10} more`);
  
  console.log(`\n2. LOW FREQUENCY TAGS (${problems.lowFrequency.size} issues)`);
  console.log('   Tags used only once (creating noise):');
  let lowFreqCount = 0;
  problems.lowFrequency.forEach((data, tag) => {
    if (lowFreqCount < 15) {
      console.log(`   • "${tag}" (1 use)`);
    }
    lowFreqCount++;
  });
  if (lowFreqCount > 15) console.log(`   ... and ${lowFreqCount - 15} more`);
  
  console.log(`\n3. POTENTIAL TYPOS (${problems.typos.size} issues)`);
  console.log('   Tags that might be typos of other tags:');
  problems.typos.forEach((data, tag) => {
    console.log(`   • "${tag}" → "${data.suggestedReplacement}" (${data.frequency} vs ${data.targetFrequency} uses)`);
  });
  
  console.log(`\n4. OVERLY SPECIFIC TAGS (${problems.tooSpecific.size} issues)`);
  console.log('   Tags that could be broadened:');
  problems.tooSpecific.forEach((data, tag) => {
    console.log(`   • "${tag}" → "${data.suggestedBroadening}" (${data.frequency} uses)`);
  });
  
  console.log(`\n5. EMPTY/INVALID TAGS (${problems.empty.length} files)`);
  console.log('   Files with empty or invalid tags:');
  problems.empty.slice(0, 10).forEach(file => {
    console.log(`   • ${file.file}`);
  });
  if (problems.empty.length > 10) console.log(`   ... and ${problems.empty.length - 10} more`);
  
  // Generate cleanup recommendations
  console.log('\n💡 CLEANUP RECOMMENDATIONS');
  console.log('===========================');
  
  const potentialReduction = problems.duplicates.size + problems.lowFrequency.size + problems.typos.size;
  const afterCleanup = totalUniqueTags - potentialReduction;
  const reductionPercent = ((potentialReduction / totalUniqueTags) * 100).toFixed(1);
  
  console.log(`Current tags: ${totalUniqueTags}`);
  console.log(`After cleanup: ~${afterCleanup}`);
  console.log(`Potential reduction: ${potentialReduction} tags (${reductionPercent}%)`);
  
  console.log('\nPriority cleanup actions:');
  console.log('1. Fix duplicate tags (normalize case)');
  console.log('2. Remove single-use tags or consolidate them');
  console.log('3. Fix apparent typos');
  console.log('4. Broaden overly specific tags');
  
  // Save detailed results
  const results = {
    summary: {
      totalFiles: markdownFiles.length,
      filesWithTags: filesWithTags.length,
      totalUniqueTags,
      totalTagUsages,
      averageTagsPerFile: totalTagUsages / filesWithTags.length
    },
    problems,
    fileAnalysis: filesWithTags.map(f => ({
      file: f.file,
      rawTags: f.rawTags,
      rawCategories: f.rawCategories,
      normalizedTags: f.normalizedTags
    })),
    tagFrequencies: Object.fromEntries(allNormalizedTags)
  };
  
  const outputPath = path.join(__dirname, '..', 'logs', 'tag-cleanup-analysis.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Detailed analysis saved to: ${path.relative(process.cwd(), outputPath)}`);
  
  return results;
}

// Run if called directly
if (require.main === module) {
  try {
    analyzeTagDistribution();
  } catch (error) {
    console.error('Error analyzing tag distribution:', error);
    process.exit(1);
  }
}

module.exports = { analyzeTagDistribution };
