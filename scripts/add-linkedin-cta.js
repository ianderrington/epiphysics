const fs = require('fs');
const path = require('path');

// LinkedIn CTA footer to add
const linkedinCTA = `

    - i -

    Do you think this is useful or interesting? Let others know with a 👍, repost ♻️, and let us know your thoughts with a comment 💭!`;

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file has LinkedIn blurb and doesn't already have CTA
    if (!content.includes('linkedin:') || content.includes('Found this valuable?')) {
      return false; // Skip if no LinkedIn blurb or already has CTA
    }

    // Pattern to match LinkedIn blurb section
    const linkedinPattern = /(\s+linkedin:\s*>-?\s*\n(?:\s+.*\n)*?)(\s+twitter:|$)/gm;
    
    let hasChanges = false;
    const updatedContent = content.replace(linkedinPattern, (match, linkedinSection, nextSection) => {
      // Remove any trailing whitespace from LinkedIn section
      const trimmedLinkedIn = linkedinSection.trimEnd();
      hasChanges = true;
      return trimmedLinkedIn + linkedinCTA + '\n' + nextSection;
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
  
  return false;
}

function findMarkdownFiles(dir) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findMarkdownFiles(fullPath));
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

// Main execution
console.log('🔍 Finding markdown files with LinkedIn blurbs...\n');

const docsDir = path.join(__dirname, '..', 'docs');
const markdownFiles = findMarkdownFiles(docsDir);

let processedCount = 0;

for (const file of markdownFiles) {
  if (processFile(file)) {
    processedCount++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Total markdown files found: ${markdownFiles.length}`);
console.log(`   Files updated with LinkedIn CTA: ${processedCount}`);
console.log(`\n✨ LinkedIn CTA addition complete!`); 