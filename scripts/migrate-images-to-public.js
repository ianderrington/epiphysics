#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Migrate images from docs/ to public/docs/
 * Mirrors directory structure for easy maintenance
 */

const DOCS_DIR = path.join(process.cwd(), 'docs');
const PUBLIC_DOCS_DIR = path.join(process.cwd(), 'public', 'docs');

// Image extensions to migrate
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'];

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`✓ Copied: ${path.relative(process.cwd(), dest)}`);
}

function migrateImages(sourceDir, targetDir) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  let imageCount = 0;

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      imageCount += migrateImages(sourcePath, targetPath);
    } else if (entry.isFile() && isImageFile(entry.name)) {
      // Copy image file
      copyFile(sourcePath, targetPath);
      imageCount++;
    }
  }

  return imageCount;
}

function main() {
  console.log('🖼️  Migrating images from docs/ to public/docs/...\n');

  if (!fs.existsSync(DOCS_DIR)) {
    console.error('❌ Error: docs/ directory not found');
    process.exit(1);
  }

  ensureDir(PUBLIC_DOCS_DIR);

  const imageCount = migrateImages(DOCS_DIR, PUBLIC_DOCS_DIR);

  console.log(`\n✅ Migration complete! Copied ${imageCount} images`);
  console.log('\nNext steps:');
  console.log('1. Verify images are in public/docs/');
  console.log('2. Test your site locally');
  console.log('3. If everything works, you can remove images from docs/');
  console.log('4. Add public/docs/ to git and commit');
}

main();
