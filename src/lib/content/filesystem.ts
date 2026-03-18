import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { logger } from '../logger';

/**
 * Read a directory recursively and return all markdown files
 * @param dirPath The directory path to read
 * @param basePath The base path for relative paths
 * @returns An array of file paths relative to the base path
 */
export async function readDirectoryRecursively(
  dirPath: string, 
  basePath: string[] = []
): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await fsPromises.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules, .git, and other non-content directories
        if (
          entry.name === 'node_modules' || 
          entry.name === '.git' || 
          entry.name === '.next' ||
          entry.name === 'public' ||
          entry.name === 'assets' // Skip assets directory as it contains images
        ) {
          continue;
        }
        
        // Recursively process subdirectories
        const subDirFiles = await readDirectoryRecursively(
          fullPath, 
          [...basePath, entry.name]
        );
        files.push(...subDirFiles);
      } else if (
        entry.isFile() && 
        (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))
      ) {
        // Process markdown files
        const relativePath = [...basePath, entry.name].join('/');
        files.push(relativePath);
      }
    }
    
    return files;
  } catch (error) {
    logger.error(`Error reading directory ${dirPath}: ${error}`);
    return [];
  }
}

/**
 * Read a markdown file and return its contents
 * @param filePath The path to the markdown file
 * @returns The contents of the file
 */
export async function readMarkdownFile(filePath: string): Promise<string> {
  try {
    const content = await fsPromises.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    logger.error(`Error reading file ${filePath}: ${error}`);
    return '';
  }
}

/**
 * Check if a file exists
 * @param filePath The path to the file
 * @returns True if the file exists, false otherwise
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fsPromises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Normalize a file path
 * @param filePath The file path to normalize
 * @returns The normalized file path
 */
export function normalizePath(filePath: string): string {
  // Replace backslashes with forward slashes
  return filePath.replace(/\\/g, '/');
}

/**
 * Get the content directory path
 * @param filePath Optional file path to determine which directory to use
 * @returns The absolute path to the content directory
 */
export function getContentDirectory(filePath?: string): string {
  // Support custom content directory from environment variable for deployments
  if (process.env.CONTENT_DIRECTORY) {
    return process.env.CONTENT_DIRECTORY;
  }
  
  // For local development and production builds, use the docs directory
  const docsPath = path.join(process.cwd(), 'docs');
  
  // If we're in production and docs doesn't exist, try public/docs as a fallback
  if (process.env.NODE_ENV === 'production') {
    try {
      // Check synchronously if the docs directory exists
      if (!fs.existsSync(docsPath)) {
        const publicDocsPath = path.join(process.cwd(), 'public', 'docs');
        // If public/docs exists, use it
        if (fs.existsSync(publicDocsPath)) {
          return publicDocsPath;
        }
      }
    } catch (error) {
      // Fall back to the default path if there's an error
      logger.error(`Error checking content directories: ${error}`);
    }
  }
  
  // Always use the docs directory as the primary content source
  return docsPath;
}

/**
 * Get the absolute path for a file in the content directory
 * @param relativePath The relative path to the file
 * @returns The absolute path to the file
 */
export function getAbsolutePath(relativePath: string): string {
  return path.join(getContentDirectory(), relativePath);
} 