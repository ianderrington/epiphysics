const fs = require('fs');
const path = require('path');

// The exact LinkedIn CTA that was added by the problematic script
const linkedinCTAToRemove = `

---

Do you think this is useful or interesting? Let others know with a 👍, repost ♻️, and let us know your thoughts with a comment 💭!`;

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file contains the problematic LinkedIn CTA
    if (!content.includes("Do you think this is useful or interesting? Let others know with a 👍, repost ♻️, and let us know your thoughts with a comment 💭!")) {
      return false; // Skip if doesn't contain the problematic CTA
    }

    // Remove the exact LinkedIn CTA that was added
    const updatedContent = content.replace(linkedinCTAToRemove, '');
    
    // Also handle variations with different spacing/newlines
    const variations = [
      `\n---\n\nDo you think this is useful or interesting? Let others know with a 👍, repost ♻️, and let us know your thoughts with a comment 💭!`,
      `\n\n---\n\nDo you think this is useful or interesting? Let others know with a 👍, repost ♻️, and let us know your thoughts with a comment 💭!`,
      `---\n\nDo you think this is useful or interesting? Let others know with a 👍, repost ♻️, and let us know your thoughts with a comment 💭!`
    ];
    
    let finalContent = updatedContent;
    variations.forEach(variation => {
      finalContent = finalContent.replace(variation, '');
    });

    // Only write if content actually changed
    if (finalContent !== content) {
      fs.writeFileSync(filePath, finalContent, 'utf8');
      console.log(`✅ Removed LinkedIn CTA from: ${filePath}`);
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
console.log('🔍 Finding markdown files with problematic LinkedIn CTAs...\n');

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
console.log(`   Files cleaned (LinkedIn CTA removed): ${processedCount}`);
console.log(`\n✨ LinkedIn CTA cleanup complete!`);

if (processedCount === 0) {
  console.log(`\n🎉 No problematic LinkedIn CTAs found! Your files are already clean.`);
} else {
  console.log(`\n🎯 Next steps:`);
  console.log(`   1. Review the changes with: git diff`);
  console.log(`   2. Test your site to ensure rendering is fixed`);
  console.log(`   3. Commit the cleaned files: git add . && git commit -m "Remove problematic LinkedIn CTAs that broke rendering"`);
} 