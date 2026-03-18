#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const DOCS_DIR = './docs';
const MIN_LINKEDIN_LENGTH = 150; // Minimum recommended length
const IDEAL_LINKEDIN_LENGTH = 400; // Ideal target length
const MAX_LINKEDIN_LENGTH = 1000; // Maximum practical length

// Helper functions
function getAllMarkdownFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      getAllMarkdownFiles(fullPath, files);
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function analyzeLinkedInContent(content) {
  if (!content) return { score: 0, issues: ['Missing LinkedIn content'] };
  
  const length = content.length;
  const issues = [];
  let score = 50; // Base score
  
  // Length analysis
  if (length < MIN_LINKEDIN_LENGTH) {
    issues.push(`Too short (${length} chars, needs ${MIN_LINKEDIN_LENGTH}+ chars)`);
    score -= 30;
  } else if (length > MAX_LINKEDIN_LENGTH) {
    issues.push(`Too long (${length} chars, should be under ${MAX_LINKEDIN_LENGTH})`);
    score -= 20;
  } else if (length >= MIN_LINKEDIN_LENGTH && length <= IDEAL_LINKEDIN_LENGTH) {
    score += 20;
  }
  
  // Content quality checks
  const hasHashtags = /#\w+/.test(content);
  const hasCallToAction = /question|thoughts|experience|comment|discuss|share/i.test(content);
  const hasProfessionalTone = /leaders|professionals|teams|industry|strategy|insights|analysis/i.test(content);
  const hasStructure = /•|-|📊|🔍|⚡|💡|🎯|✅|⚠️/.test(content) || content.includes('\n\n');
  const hasValueProposition = /benefits|impact|results|insights|analysis|strategy|framework/i.test(content);
  
  if (hasHashtags) score += 10;
  else issues.push('Missing hashtags');
  
  if (hasCallToAction) score += 15;
  else issues.push('Missing call to action or engagement prompt');
  
  if (hasProfessionalTone) score += 10;
  else issues.push('Could use more professional language');
  
  if (hasStructure) score += 15;
  else issues.push('Poor structure - needs bullets, emojis, or paragraphs');
  
  if (hasValueProposition) score += 10;
  else issues.push('Unclear value proposition');
  
  // Check for LinkedIn-specific ending
  const hasLinkedInEnding = /👍.*repost.*♻️.*comment.*💭/i.test(content);
  if (hasLinkedInEnding) score += 5;
  else issues.push('Missing standard LinkedIn engagement ending');
  
  return { score: Math.min(100, Math.max(0, score)), issues, length };
}

function categorizeContent(filePath) {
  const parts = filePath.split('/');
  if (parts.includes('musings')) {
    if (parts.includes('building_code')) return 'Tech/Development';
    if (parts.includes('moloch')) return 'AI Safety';
    if (parts.includes('existence_physics_and_life')) return 'Philosophy/Science';
    if (parts.includes('the_future')) return 'Future Tech';
    if (parts.includes('markets_and_value')) return 'Economics';
    return 'Musings/Philosophy';
  }
  if (parts.includes('projects')) return 'Projects';
  if (parts.includes('about')) return 'About/Research';
  if (parts.includes('blog')) return 'Blog';
  if (parts.includes('contact')) return 'Contact';
  return 'Other';
}

// Main analysis function
function analyzeAllLinkedInFrontmatter() {
  const files = getAllMarkdownFiles(DOCS_DIR);
  const results = [];
  
  console.log(`Found ${files.length} markdown files to analyze...\n`);
  
  for (const filePath of files) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(content);
      const frontmatter = parsed.data;
      
      if (!frontmatter.shareBlurbs || !frontmatter.shareBlurbs.linkedin) {
        results.push({
          file: filePath,
          title: frontmatter.title || 'Untitled',
          category: categorizeContent(filePath),
          linkedin: null,
          analysis: { score: 0, issues: ['No LinkedIn shareBlurb found'], length: 0 },
          isDraft: frontmatter.draft === true
        });
        continue;
      }
      
      const linkedinContent = frontmatter.shareBlurbs.linkedin;
      const analysis = analyzeLinkedInContent(linkedinContent);
      
      results.push({
        file: filePath,
        title: frontmatter.title || 'Untitled',
        category: categorizeContent(filePath),
        linkedin: linkedinContent,
        analysis,
        isDraft: frontmatter.draft === true
      });
      
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  }
  
  return results;
}

// Reporting functions
function generateSummaryReport(results) {
  console.log('='.repeat(80));
  console.log('LINKEDIN FRONTMATTER ANALYSIS SUMMARY');
  console.log('='.repeat(80));
  
  const total = results.length;
  const withLinkedIn = results.filter(r => r.linkedin).length;
  const published = results.filter(r => !r.isDraft).length;
  const publishedWithLinkedIn = results.filter(r => !r.isDraft && r.linkedin).length;
  
  console.log(`Total files analyzed: ${total}`);
  console.log(`Files with LinkedIn content: ${withLinkedIn} (${(withLinkedIn/total*100).toFixed(1)}%)`);
  console.log(`Published files: ${published}`);
  console.log(`Published files with LinkedIn: ${publishedWithLinkedIn} (${(publishedWithLinkedIn/published*100).toFixed(1)}%)`);
  
  // Score distribution
  const scores = results.filter(r => r.linkedin).map(r => r.analysis.score);
  const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  
  console.log(`\nAverage LinkedIn quality score: ${avgScore.toFixed(1)}/100`);
  
  // Length distribution
  const lengths = results.filter(r => r.linkedin).map(r => r.analysis.length);
  const avgLength = lengths.length > 0 ? lengths.reduce((a, b) => a + b, 0) / lengths.length : 0;
  
  console.log(`Average LinkedIn content length: ${avgLength.toFixed(0)} characters`);
  
  // Category breakdown
  console.log('\nBy Category:');
  const categoryStats = {};
  results.forEach(r => {
    if (!categoryStats[r.category]) {
      categoryStats[r.category] = { total: 0, withLinkedIn: 0, scores: [] };
    }
    categoryStats[r.category].total++;
    if (r.linkedin) {
      categoryStats[r.category].withLinkedIn++;
      categoryStats[r.category].scores.push(r.analysis.score);
    }
  });
  
  Object.entries(categoryStats).forEach(([category, stats]) => {
    const avgCatScore = stats.scores.length > 0 ? 
      stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length : 0;
    console.log(`  ${category}: ${stats.withLinkedIn}/${stats.total} (avg score: ${avgCatScore.toFixed(1)})`);
  });
}

function generateDetailedReport(results) {
  console.log('\n' + '='.repeat(80));
  console.log('DETAILED LINKEDIN ANALYSIS');
  console.log('='.repeat(80));
  
  // Sort by score (lowest first - most need improvement)
  const sortedResults = results
    .filter(r => r.linkedin)
    .sort((a, b) => a.analysis.score - b.analysis.score);
  
  console.log('\nFILES NEEDING MOST IMPROVEMENT (lowest scores first):');
  console.log('-'.repeat(80));
  
  sortedResults.slice(0, 15).forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.title}`);
    console.log(`   File: ${result.file}`);
    console.log(`   Category: ${result.category}`);
    console.log(`   Score: ${result.analysis.score}/100`);
    console.log(`   Length: ${result.analysis.length} chars`);
    console.log(`   Draft: ${result.isDraft ? 'Yes' : 'No'}`);
    console.log(`   Issues: ${result.analysis.issues.join(', ')}`);
    
    if (result.analysis.length < MIN_LINKEDIN_LENGTH) {
      console.log(`   Preview: "${result.linkedin.substring(0, 100)}..."`);
    }
  });
}

function generateMissingLinkedInReport(results) {
  const missing = results.filter(r => !r.linkedin && !r.isDraft);
  
  if (missing.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('PUBLISHED FILES MISSING LINKEDIN CONTENT');
    console.log('='.repeat(80));
    
    missing.forEach((result, index) => {
      console.log(`${index + 1}. ${result.title}`);
      console.log(`   File: ${result.file}`);
      console.log(`   Category: ${result.category}`);
    });
  }
}

function generateRecommendationsReport(results) {
  console.log('\n' + '='.repeat(80));
  console.log('IMPROVEMENT RECOMMENDATIONS');
  console.log('='.repeat(80));
  
  const needsWork = results.filter(r => r.linkedin && r.analysis.score < 70 && !r.isDraft);
  const shortContent = results.filter(r => r.linkedin && r.analysis.length < MIN_LINKEDIN_LENGTH && !r.isDraft);
  const missingStructure = results.filter(r => r.linkedin && r.analysis.issues.includes('Poor structure - needs bullets, emojis, or paragraphs') && !r.isDraft);
  
  console.log(`\nHIGH PRIORITY (Score < 70, Published): ${needsWork.length} files`);
  needsWork.slice(0, 5).forEach(r => {
    console.log(`  - ${r.title} (Score: ${r.analysis.score})`);
  });
  
  console.log(`\nTOO SHORT (< ${MIN_LINKEDIN_LENGTH} chars, Published): ${shortContent.length} files`);
  shortContent.slice(0, 5).forEach(r => {
    console.log(`  - ${r.title} (${r.analysis.length} chars)`);
  });
  
  console.log(`\nNEEDS BETTER STRUCTURE (Published): ${missingStructure.length} files`);
  missingStructure.slice(0, 5).forEach(r => {
    console.log(`  - ${r.title}`);
  });
  
  console.log('\nGENERAL RECOMMENDATIONS:');
  console.log('1. Add LinkedIn content to files missing it');
  console.log('2. Expand short LinkedIn blurbs to 300-500 characters');
  console.log('3. Add structure with bullets, emojis, or clear paragraphs');
  console.log('4. Include professional hashtags');
  console.log('5. Add calls to action or engagement prompts');
  console.log('6. Ensure the standard LinkedIn ending is present');
}

// Main execution
function main() {
  const results = analyzeAllLinkedInFrontmatter();
  
  generateSummaryReport(results);
  generateDetailedReport(results);
  generateMissingLinkedInReport(results);
  generateRecommendationsReport(results);
  
  // Export detailed data to JSON for further analysis
  const exportData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: results.length,
      withLinkedIn: results.filter(r => r.linkedin).length,
      published: results.filter(r => !r.isDraft).length,
      publishedWithLinkedIn: results.filter(r => !r.isDraft && r.linkedin).length,
      averageScore: results.filter(r => r.linkedin).reduce((sum, r) => sum + r.analysis.score, 0) / results.filter(r => r.linkedin).length || 0,
      averageLength: results.filter(r => r.linkedin).reduce((sum, r) => sum + r.analysis.length, 0) / results.filter(r => r.linkedin).length || 0
    },
    results: results.map(r => ({
      file: r.file,
      title: r.title,
      category: r.category,
      isDraft: r.isDraft,
      hasLinkedIn: !!r.linkedin,
      score: r.analysis.score,
      length: r.analysis.length,
      issues: r.analysis.issues
    }))
  };
  
  fs.writeFileSync('linkedin_analysis_results.json', JSON.stringify(exportData, null, 2));
  console.log('\n📊 Detailed results exported to: linkedin_analysis_results.json');
}

// Check if gray-matter is available
try {
  require.resolve('gray-matter');
  main();
} catch (error) {
  console.error('Error: gray-matter package not found.');
  console.error('Please install it with: npm install gray-matter');
  console.error('Or run this script from the project root directory.');
  process.exit(1);
} 