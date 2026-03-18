const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function findMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function getFrontmatterImageInfo(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(content);
    const hasCoverImage = 'coverImage' in frontmatter;
    
    return {
      filePath,
      frontmatter,
      hasCoverImage,
      expectedImagePath: hasCoverImage ? frontmatter.coverImage : ''
    };
  } catch (error) {
    console.error(`Error reading frontmatter from ${filePath}:`, error.message);
    return null;
  }
}

async function auditFrontmatterImages(directory) {
  const files = findMarkdownFiles(directory);
  const missingFrontmatter = [];
  const missingFiles = [];
  const validImages = [];
  
  console.log(`\nAuditing ${files.length} markdown files for frontmatter images:`);
  
  for (const file of files) {
    const info = getFrontmatterImageInfo(file);
    if (info) {
      if (!info.hasCoverImage) {
        missingFrontmatter.push(info);
        console.log(`\n❌ File: ${file}`);
        console.log(`   Missing coverImage in frontmatter`);
      } else {
        // Check if the image file actually exists
        const coverImage = info.frontmatter.coverImage;
        let imagePath = '';
        
        if (typeof coverImage === 'string') {
          imagePath = coverImage;
        } else if (typeof coverImage === 'object' && coverImage !== null && 'url' in coverImage) {
          imagePath = coverImage.url;
        }
        
        if (imagePath) {
          // Resolve the image path relative to the markdown file
          const fileDir = path.dirname(file);
          const normalizedImagePath = imagePath.replace(/^\.\//, '');
          const fullImagePath = path.join(fileDir, normalizedImagePath);
          
          try {
            fs.accessSync(fullImagePath);
            validImages.push({ filePath: file, coverImagePath: imagePath });
            console.log(`\n✅ File: ${file}`);
            console.log(`   Has coverImage: ${imagePath} ✓`);
          } catch (error) {
            missingFiles.push({ filePath: file, coverImagePath: imagePath, fullImagePath });
            console.log(`\n⚠️  File: ${file}`);
            console.log(`   Has coverImage: ${imagePath}`);
            console.log(`   But image file missing: ${fullImagePath}`);
          }
        }
      }
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`Total files checked: ${files.length}`);
  console.log(`Files with valid coverImage: ${validImages.length}`);
  console.log(`Files missing coverImage field: ${missingFrontmatter.length}`);
  console.log(`Files with missing image files: ${missingFiles.length}`);
  
  if (missingFrontmatter.length > 0) {
    console.log(`\n🔍 Files missing coverImage field:`);
    missingFrontmatter.forEach(info => {
      console.log(`  - ${info.filePath}`);
    });
  }
  
  if (missingFiles.length > 0) {
    console.log(`\n🖼️  Files with missing image files:`);
    missingFiles.forEach(item => {
      console.log(`  - ${item.filePath}`);
      console.log(`    Expected: ${item.fullImagePath}`);
    });
  }
  
  return {
    totalFiles: files.length,
    validImages: validImages.length,
    missingFrontmatter: missingFrontmatter.length,
    missingFiles: missingFiles.length,
    missingFrontmatterList: missingFrontmatter,
    missingFilesList: missingFiles
  };
}

// Command line interface
if (require.main === module) {
  const directory = process.argv[2] || 'docs';
  auditFrontmatterImages(directory)
    .then(() => console.log('\nAudit complete'))
    .catch(console.error);
}

module.exports = auditFrontmatterImages; 