#!/usr/bin/env ts-node

/**
 * Pre-process all markdown content at build time
 * Outputs to public/content-data.json for runtime access without bundling docs/
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml, generateExcerpt, splitMarkdownIntoSegments } from '../src/lib/content/markdown';
import { generateSlug } from '../src/lib/content/slugs';
import { collectFolderConfigs } from '../src/lib/content/pages-config';
import { mergeFrontmatter } from '../src/lib/content/frontmatter-merge';
import { getAbsolutePath } from '../src/lib/content/filesystem';

const DOCS_DIR = path.join(process.cwd(), 'docs');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'content-data.json');

interface ProcessedPost {
  slug: string;
  isIndex: boolean;
  path: string[];
  metadata: any;
  html: string;
  excerpt: string;
  chatSegmentsHtml?: Array<{
    content: string;
    metadata: any;
    index: number;
  }>;
  // Store minimal markdown for search (first 500 chars)
  searchText: string;
}

async function processMarkdownFile(filePath: string, relativePath: string): Promise<ProcessedPost | null> {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: fileFrontmatter, content: markdownContent } = matter(fileContents);

    // Skip if no title
    if (!fileFrontmatter.title) {
      console.log(`  ⚠️  Skipping ${relativePath} (no title)`);
      return null;
    }

    // Skip drafts
    if (fileFrontmatter.draft === true) {
      console.log(`  📝 Skipping ${relativePath} (draft)`);
      return null;
    }

    // Collect folder-level configs and merge
    const folderConfigs = await collectFolderConfigs(filePath);
    let mergedMetadata = fileFrontmatter;

    if (folderConfigs.length > 0) {
      let baseDefaults: any = {};
      for (let i = folderConfigs.length - 1; i >= 0; i--) {
        const config = folderConfigs[i];
        if (config.defaults) {
          baseDefaults = mergeFrontmatter(baseDefaults, config.defaults as any);
        }
      }
      if (Object.keys(baseDefaults).length > 0) {
        mergedMetadata = mergeFrontmatter(baseDefaults, fileFrontmatter);
      }
    }

    const metadata = mergedMetadata;

    // Generate excerpt
    const excerpt = await generateExcerpt(markdownContent, 160, filePath);

    // Process markdown to HTML
    let html = '';
    let chatSegmentsHtml: Array<{ content: string; metadata: any; index: number }> | undefined;

    if (metadata.render_as === 'chat') {
      const segments = splitMarkdownIntoSegments(markdownContent);
      chatSegmentsHtml = [];
      for (const segment of segments) {
        const segmentHtml = await markdownToHtml(segment.rawMarkdown, filePath);
        chatSegmentsHtml.push({
          content: segmentHtml,
          index: segment.index,
          metadata: segment.metadata
        });
      }
    } else {
      html = await markdownToHtml(markdownContent, filePath);
    }

    // Generate slug
    const slug = generateSlug(relativePath);
    const isIndex = filePath.endsWith('index.md') || filePath.endsWith('index.mdx') ||
                   slug.endsWith('/index') || slug === 'index';

    // Get path segments
    const pathSegments = slug.split('/').filter(Boolean);
    const normalizedSlug = isIndex ? slug.replace(/\/index$/, '') : slug;

    // Create search text (first 500 chars of markdown, lowercased)
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
      metadata,
      html,
      excerpt,
      chatSegmentsHtml,
      searchText
    };
  } catch (error) {
    console.error(`  ❌ Error processing ${relativePath}:`, error instanceof Error ? error.message : String(error));
    return null;
  }
}

async function processDirectory(dir: string, basePath = ''): Promise<ProcessedPost[]> {
  const results: ProcessedPost[] = [];

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
    console.error(`  ❌ Error reading directory ${dir}:`, error instanceof Error ? error.message : String(error));
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
