#!/usr/bin/env node

/**
 * Pre-process all markdown content at build time
 * Outputs to public/content-data.json for runtime access without bundling docs/
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(process.cwd(), 'docs');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'content-data.json');

// Simple markdown to text converter (strips markdown syntax)
function markdownToText(markdown) {
  return markdown
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .trim();
}

function processMarkdownFiles(dir, basePath = '') {
  const content = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        content.push(...processMarkdownFiles(fullPath, relativePath));
      } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
        try {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data: frontmatter, content: markdownContent } = matter(fileContents);

          // Skip if no title (invalid post)
          if (!frontmatter.title) {
            console.log(`  ⚠️  Skipping ${relativePath} (no title)`);
            continue;
          }

          // Skip drafts
          if (frontmatter.draft === true) {
            console.log(`  📝 Skipping ${relativePath} (draft)`);
            continue;
          }

          // Create slug from relative path
          const slug = relativePath
            .replace(/\.(md|mdx)$/i, '')
            .replace(/\\/g, '/');

          // Check if this is an index file
          const isIndex = entry.name.toLowerCase() === 'readme.md' ||
                         entry.name.toLowerCase() === 'index.md';

          // Generate excerpt if not provided
          let excerpt = frontmatter.description || frontmatter.excerpt || '';
          if (!excerpt && markdownContent) {
            const text = markdownToText(markdownContent);
            excerpt = text.substring(0, 200).trim();
            if (text.length > 200) excerpt += '...';
          }

          content.push({
            slug,
            isIndex,
            metadata: {
              title: frontmatter.title,
              description: frontmatter.description || '',
              excerpt,
              date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
              lastModified: frontmatter.lastModified ? new Date(frontmatter.lastModified).toISOString() : null,
              author: frontmatter.author,
              tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
              category: frontmatter.category,
              image: frontmatter.image,
              coverImage: frontmatter.coverImage,
              draft: false, // Already filtered out drafts above
              // Include any other frontmatter fields
              ...Object.fromEntries(
                Object.entries(frontmatter).filter(([key]) =>
                  !['title', 'description', 'excerpt', 'date', 'lastModified', 'author', 'tags', 'category', 'image', 'coverImage', 'draft'].includes(key)
                )
              )
            },
            // Store markdown content for search/rendering
            content: markdownContent,
            // Store plain text for search
            searchText: markdownToText(markdownContent).toLowerCase()
          });

          console.log(`  ✓ Processed ${relativePath}`);
        } catch (error) {
          console.error(`  ❌ Error processing ${relativePath}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.error(`  ❌ Error reading directory ${dir}:`, error.message);
  }

  return content;
}

function main() {
  console.log('📚 Pre-processing markdown content...\n');

  if (!fs.existsSync(DOCS_DIR)) {
    console.error('❌ Error: docs/ directory not found');
    process.exit(1);
  }

  // Ensure public directory exists
  const publicDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Process all markdown files
  const allContent = processMarkdownFiles(DOCS_DIR);

  // Sort by date (newest first)
  allContent.sort((a, b) => {
    const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
    const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
    return dateB - dateA;
  });

  // Write to output file
  const output = {
    generatedAt: new Date().toISOString(),
    contentCount: allContent.length,
    content: allContent
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');

  console.log(`\n✅ Pre-processing complete!`);
  console.log(`   Processed: ${allContent.length} content items`);
  console.log(`   Output: ${path.relative(process.cwd(), OUTPUT_FILE)}`);
  console.log(`   Size: ${(fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2)} MB\n`);
}

main();
