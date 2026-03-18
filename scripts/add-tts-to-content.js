#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Voice selection based on content type
const VOICE_MAPPING = {
  // Fiction/Storytelling - Fable (expressive, storytelling)
  fiction: 'fable',
  story: 'fable',
  narrative: 'fable',
  
  // Technical/Professional - Onyx (deep, authoritative)
  technology: 'onyx',
  research: 'onyx',
  science: 'onyx',
  technical: 'onyx',
  business: 'onyx',
  ai: 'onyx',
  
  // Friendly/Personal - Shimmer (warm, friendly)
  personal: 'shimmer',
  philosophy: 'shimmer',
  society: 'shimmer',
  'growing_corner': 'shimmer',
  
  // Energetic/Enthusiastic - Nova (energetic)
  tutorial: 'nova',
  guide: 'nova',
  announcement: 'nova',
  blog: 'nova',
};

// Directories to process
const CONTENT_DIRS = [
  'docs/musings/building_code',
  'docs/musings/future',
  'docs/musings/growing_corner',
  'docs/about',
  'docs/projects',
];

// Directories to skip
const SKIP_DIRS = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'the_saga', // Skip detailed story files
];

function determineVoice(filePath, metadata) {
  // Check if already has TTS enabled
  if (metadata.tts?.enabled) {
    return null; // Skip files that already have TTS
  }
  
  // Check draft status
  if (metadata.draft === true) {
    return null; // Skip draft files
  }
  
  // Determine voice based on categories, tags, or path
  const pathLower = filePath.toLowerCase();
  const categories = (metadata.categories || []).map(c => c.toLowerCase());
  const tags = (metadata.tags || []).map(t => t.toLowerCase());
  
  // Check categories first
  for (const category of categories) {
    if (VOICE_MAPPING[category]) {
      return VOICE_MAPPING[category];
    }
  }
  
  // Check tags
  for (const tag of tags) {
    if (VOICE_MAPPING[tag]) {
      return VOICE_MAPPING[tag];
    }
  }
  
  // Check path
  if (pathLower.includes('building_code')) return 'onyx';
  if (pathLower.includes('growing_corner')) return 'shimmer';
  if (pathLower.includes('future')) return 'nova';
  if (pathLower.includes('about')) return 'shimmer';
  if (pathLower.includes('projects')) return 'onyx';
  
  // Default to onyx for most content
  return 'onyx';
}

function addTTSToFile(filePath, voice) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdownContent } = matter(content);
    
    // Skip if no title (likely not a proper content file)
    if (!data.title) {
      return { skipped: true, reason: 'No title' };
    }
    
    // Add TTS configuration
    data.tts = {
      enabled: true,
      provider: 'openai',
      voice: voice,
      enableSpeed: true,
      enableProgress: true,
      apiUrl: 'https://tts.supernal.ai',
    };
    
    // Reconstruct the file
    const newContent = matter.stringify(markdownContent, data);
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    return { updated: true, voice };
  } catch (error) {
    return { error: error.message };
  }
}

function processDirectory(dirPath, stats = { updated: 0, skipped: 0, errors: 0, byVoice: {} }) {
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  Directory not found: ${dirPath}`);
    return stats;
  }
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    // Skip certain directories
    if (entry.isDirectory() && SKIP_DIRS.some(skip => entry.name.includes(skip))) {
      continue;
    }
    
    if (entry.isDirectory()) {
      processDirectory(fullPath, stats);
    } else if (entry.name.endsWith('.md')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(content);
        
        const voice = determineVoice(fullPath, data);
        
        if (!voice) {
          stats.skipped++;
          continue;
        }
        
        const result = addTTSToFile(fullPath, voice);
        
        if (result.updated) {
          stats.updated++;
          stats.byVoice[voice] = (stats.byVoice[voice] || 0) + 1;
          console.log(`✅ ${fullPath} -> ${voice}`);
        } else if (result.skipped) {
          stats.skipped++;
        } else if (result.error) {
          stats.errors++;
          console.log(`❌ ${fullPath}: ${result.error}`);
        }
      } catch (error) {
        stats.errors++;
        console.log(`❌ ${fullPath}: ${error.message}`);
      }
    }
  }
  
  return stats;
}

// Main execution
console.log('🎙️  Adding TTS to content files...\n');

const stats = { updated: 0, skipped: 0, errors: 0, byVoice: {} };

for (const dir of CONTENT_DIRS) {
  console.log(`\n📁 Processing ${dir}...`);
  processDirectory(dir, stats);
}

console.log('\n' + '='.repeat(50));
console.log('📊 Summary:');
console.log(`   Updated: ${stats.updated} files`);
console.log(`   Skipped: ${stats.skipped} files`);
console.log(`   Errors: ${stats.errors} files`);
console.log('\n🎤 Voice Distribution:');
for (const [voice, count] of Object.entries(stats.byVoice)) {
  console.log(`   ${voice}: ${count} files`);
}
console.log('='.repeat(50));


