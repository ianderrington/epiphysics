#!/usr/bin/env node

/**
 * Pre-process all markdown content at build time
 * Simplified version that doesn't rely on TypeScript imports
 * Outputs to public/content-data.json for runtime access without bundling docs/
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { unified } = require('unified');
// Fix ESM/CommonJS compatibility by using .default fallback
const remarkParse = require('remark-parse').default || require('remark-parse');
const remarkRehype = require('remark-rehype').default || require('remark-rehype');
const rehypeRaw = require('rehype-raw').default || require('rehype-raw');
const rehypeStringify = require('rehype-stringify').default || require('rehype-stringify');
const remarkGfm = require('remark-gfm').default || require('remark-gfm');
const remarkMath = require('remark-math').default || require('remark-math');
const rehypeKatex = require('rehype-katex').default || require('rehype-katex');
const rehypeSlug = require('rehype-slug').default || require('rehype-slug');

const DOCS_DIR = path.join(process.cwd(), 'docs');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'content-data.json');

// Walk AST tree to find nodes of a given type
function walkTree(node, type, callback) {
  if (node.type === type) callback(node);
  if (node.children) {
    for (const child of node.children) {
      walkTree(child, type, callback);
    }
  }
}

// Remark plugin to resolve relative .md links to absolute route paths
function remarkResolveMdLinks(options) {
  const { relativePath } = options;
  // Get the directory of the current file relative to docs/
  const currentDir = path.dirname(relativePath).replace(/\\/g, '/');

  return (tree) => {
    walkTree(tree, 'link', (node) => {
      if (node.url && (node.url.endsWith('.md') || node.url.endsWith('.mdx')) &&
          !node.url.startsWith('http') && !node.url.startsWith('//')) {
        // Resolve the relative path against the current file's directory
        const resolved = path.posix.join(currentDir, node.url)
          .replace(/\.(md|mdx)$/i, '')
          .replace(/\/index$/, '');
        // Make it absolute for the browser
        node.url = '/' + resolved;
      }
    });
  };
}

// Remark plugin to process Mermaid code blocks into renderable divs
function remarkProcessMermaid() {
  return (tree) => {
    walkTree(tree, 'code', (node) => {
      if (node.lang === 'mermaid') {
        node.type = 'html';
        node.value = `<div data-mermaid="${encodeURIComponent(node.value)}"></div>`;
      }
    });
  };
}

// Remark plugin to process sidenotes: > [!sidenote] blockquotes → div[data-sidenote]
function remarkProcessSidenotes() {
  return (tree) => {
    let counter = 0;
    walkTree(tree, 'blockquote', (node) => {
      if (node.children && node.children.length > 0) {
        const firstChild = node.children[0];
        if (
          firstChild &&
          firstChild.type === 'paragraph' &&
          firstChild.children &&
          firstChild.children.length > 0 &&
          firstChild.children[0].type === 'text'
        ) {
          const text = firstChild.children[0].value;
          const match = text.match(/^\[!sidenote\]/i);
          if (match) {
            counter++;
            // Remove the [!sidenote] prefix
            firstChild.children[0].value = text.replace(/^\[!sidenote\]\s*/i, '');
            if (firstChild.children[0].value === '') {
              firstChild.children.shift();
            }
            if (firstChild.children.length === 0) {
              node.children.shift();
            }
            // Convert blockquote to div with sidenote data attributes
            node.data = node.data || {};
            node.data.hName = 'div';
            node.data.hProperties = node.data.hProperties || {};
            node.data.hProperties.dataSidenote = 'true';
            node.data.hProperties.dataSidenoteId = `sn-${counter}`;
          }
        }
      }
    });
  };
}

// Simple markdown to HTML converter
async function markdownToHtml(markdown, relativePath) {
  try {
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkProcessMermaid)
      .use(remarkProcessSidenotes)
      .use(remarkResolveMdLinks, { relativePath: relativePath || '' })
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      // Skip rehypeSanitize - this is our own trusted content
      .use(rehypeSlug)
      .use(rehypeKatex)
      .use(rehypeStringify)
      .process(markdown);

    return String(result);
  } catch (error) {
    console.error('Error converting markdown:', error);
    return '';
  }
}

// Generate excerpt from markdown
function generateExcerpt(markdown, maxLength = 160) {
  const text = markdown
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .trim();

  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Generate slug from file path
function generateSlug(filePath) {
  return filePath
    .replace(/\.(md|mdx)$/i, '')
    .replace(/\\/g, '/')
    .replace(/^\//, '')
    .replace(/\/index$/, '');
}

// Process a single markdown file
async function processMarkdownFile(filePath, relativePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(fileContents);

    // Skip if no title
    if (!frontmatter.title) {
      console.log(`  ⚠️  Skipping ${relativePath} (no title)`);
      return null;
    }

    // Skip drafts
    if (frontmatter.draft === true) {
      console.log(`  📝 Skipping ${relativePath} (draft)`);
      return null;
    }

    // Generate excerpt
    const excerpt = frontmatter.description || frontmatter.excerpt || generateExcerpt(markdownContent);

    // Process markdown to HTML (pass relativePath for link resolution)
    const html = await markdownToHtml(markdownContent, relativePath);

    // Generate slug
    const slug = generateSlug(relativePath);
    const isIndex = filePath.endsWith('index.md') || filePath.endsWith('index.mdx') ||
                   slug.endsWith('/index') || slug === 'index';

    // Get path segments
    const pathSegments = slug.split('/').filter(Boolean);
    const normalizedSlug = isIndex ? slug.replace(/\/index$/, '') : slug;

    // Create search text
    const searchText = markdownContent
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/```[\s\S]*?```/g, '')
      .trim()
      .toLowerCase()
      .substring(0, 500);

    console.log(`  ✓ Processed ${relativePath}`);

    return {
      slug: normalizedSlug,
      isIndex,
      path: pathSegments,
      metadata: {
        ...frontmatter,
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
        lastModified: frontmatter.lastModified ? new Date(frontmatter.lastModified).toISOString() : null,
      },
      html,
      excerpt,
      searchText
    };
  } catch (error) {
    console.error(`  ❌ Error processing ${relativePath}:`, error.message);
    return null;
  }
}

// Process directory recursively
async function processDirectory(dir, basePath = '') {
  const results = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        const subdirResults = await processDirectory(fullPath, relativePath);
        results.push(...subdirResults);
      } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
        const post = await processMarkdownFile(fullPath, relativePath);
        if (post) {
          results.push(post);
        }
      }
    }
  } catch (error) {
    console.error(`  ❌ Error reading directory ${dir}:`, error.message);
  }

  return results;
}

async function main() {
  console.log('📚 Pre-processing markdown content with HTML rendering...\n');

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
  const allContent = await processDirectory(DOCS_DIR);

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

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output), 'utf8');

  const sizeInMB = (fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2);

  console.log(`\n✅ Pre-processing complete!`);
  console.log(`   Processed: ${allContent.length} content items`);
  console.log(`   Output: ${path.relative(process.cwd(), OUTPUT_FILE)}`);
  console.log(`   Size: ${sizeInMB} MB`);
  console.log(`\nNote: This JSON file will be served as a static asset, not bundled into functions.\n`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
