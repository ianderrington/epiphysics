#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const url = require('url');
const { glob } = require('glob');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

class LinkChecker {
  constructor(options = {}) {
    this.options = {
      docsDir: options.docsDir || 'docs',
      skipExternal: options.skipExternal || false,
      timeout: options.timeout || 10000,
      userAgent: options.userAgent || 'Mozilla/5.0 (compatible; LinkChecker/1.0)',
      allowedExternalDomains: options.allowedExternalDomains || [],
      skipPatterns: options.skipPatterns || [
        /^mailto:/,
        /^tel:/,
        /^#/,
        /localhost/,
        /127\.0\.0\.1/,
        /^javascript:/
      ],
      maxRetries: options.maxRetries || 2,
      ...options
    };
    
    this.results = {
      totalFiles: 0,
      totalLinks: 0,
      internalLinks: 0,
      externalLinks: 0,
      brokenLinks: [],
      errors: []
    };
    
    this.checkedUrls = new Map(); // Cache for external URL checks
  }

  async checkLinks() {
    log('\n🔗 Starting Link Checker', 'magenta');
    log('='.repeat(50), 'magenta');
    
    try {
      // Find all markdown files
      const markdownFiles = await this.findMarkdownFiles();
      this.results.totalFiles = markdownFiles.length;
      
      log(`\n📄 Found ${markdownFiles.length} markdown files`, 'blue');
      
      // Process each file
      for (const filePath of markdownFiles) {
        await this.checkFileLinks(filePath);
      }
      
      // Generate report
      this.generateReport();
      
      return this.results.brokenLinks.length === 0;
      
    } catch (error) {
      log(`\n❌ Link checker failed: ${error.message}`, 'red');
      this.results.errors.push(error.message);
      return false;
    }
  }

  async findMarkdownFiles() {
    const pattern = path.join(this.options.docsDir, '**/*.md');
    const files = await glob(pattern, { ignore: ['**/node_modules/**'] });
    return files.map(file => path.resolve(file));
  }

  async checkFileLinks(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const links = this.extractLinks(content);
      
      if (links.length === 0) return;
      
      const relativePath = path.relative(process.cwd(), filePath);
      log(`\n📝 Checking ${relativePath} (${links.length} links)`, 'cyan');
      
      for (const link of links) {
        await this.checkSingleLink(link, filePath);
      }
      
    } catch (error) {
      const relativePath = path.relative(process.cwd(), filePath);
      log(`❌ Error reading file ${relativePath}: ${error.message}`, 'red');
      this.results.errors.push(`Error reading ${relativePath}: ${error.message}`);
    }
  }

  extractLinks(content) {
    const links = [];
    
    // Match markdown links: [text](url)
    const markdownLinkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = markdownLinkRegex.exec(content)) !== null) {
      const [fullMatch, text, url] = match;
      if (url && !this.shouldSkipLink(url)) {
        links.push({
          text: text.trim(),
          url: url.trim(),
          type: this.getLinkType(url.trim()),
          fullMatch
        });
      }
    }
    
    // Match HTML links: <a href="url">
    const htmlLinkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
    while ((match = htmlLinkRegex.exec(content)) !== null) {
      const url = match[1].trim();
      if (url && !this.shouldSkipLink(url)) {
        links.push({
          text: 'HTML link',
          url: url,
          type: this.getLinkType(url),
          fullMatch: match[0]
        });
      }
    }
    
    this.results.totalLinks += links.length;
    return links;
  }

  shouldSkipLink(url) {
    return this.options.skipPatterns.some(pattern => {
      if (pattern instanceof RegExp) {
        return pattern.test(url);
      }
      return url.includes(pattern);
    });
  }

  getLinkType(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return 'external';
    }
    if (url.startsWith('/')) {
      return 'absolute';
    }
    return 'relative';
  }

  async checkSingleLink(link, filePath) {
    const { url, type, text } = link;
    
    try {
      if (type === 'external') {
        this.results.externalLinks++;
        if (!this.options.skipExternal) {
          await this.checkExternalLink(url, filePath, link);
        }
      } else {
        this.results.internalLinks++;
        await this.checkInternalLink(url, filePath, link);
      }
    } catch (error) {
      this.addBrokenLink(filePath, link, error.message);
    }
  }

  async checkInternalLink(url, filePath, link) {
    // Remove query parameters and fragments
    const cleanUrl = url.split('?')[0].split('#')[0];
    
    let targetPath;
    
    if (cleanUrl.startsWith('/')) {
      // Absolute path from docs root
      targetPath = path.join(this.options.docsDir, cleanUrl);
    } else {
      // Relative path from current file
      const currentDir = path.dirname(filePath);
      targetPath = path.resolve(currentDir, cleanUrl);
    }
    
    // Add .md extension if it's missing and we're looking for a markdown file
    if (!path.extname(targetPath) && !fs.existsSync(targetPath)) {
      const mdPath = targetPath + '.md';
      if (fs.existsSync(mdPath)) {
        targetPath = mdPath;
      } else {
        // Try index.md in the directory
        const indexPath = path.join(targetPath, 'index.md');
        if (fs.existsSync(indexPath)) {
          targetPath = indexPath;
        }
      }
    }
    
    if (!fs.existsSync(targetPath)) {
      throw new Error(`File not found: ${targetPath}`);
    }
    
    const stat = fs.statSync(targetPath);
    if (!stat.isFile() && !stat.isDirectory()) {
      throw new Error(`Invalid target: ${targetPath}`);
    }
    
    log(`  ✅ ${url}`, 'green');
  }

  async checkExternalLink(url, filePath, link) {
    // Check cache first
    if (this.checkedUrls.has(url)) {
      const cached = this.checkedUrls.get(url);
      if (!cached.success) {
        throw new Error(cached.error);
      }
      log(`  ✅ ${url} (cached)`, 'green');
      return;
    }
    
    let attempt = 0;
    let lastError;
    
    while (attempt < this.options.maxRetries) {
      try {
        await this.makeHttpRequest(url);
        this.checkedUrls.set(url, { success: true });
        log(`  ✅ ${url}`, 'green');
        return;
      } catch (error) {
        lastError = error;
        attempt++;
        if (attempt < this.options.maxRetries) {
          log(`  ⚠️  ${url} (retry ${attempt}/${this.options.maxRetries - 1})`, 'yellow');
          await this.delay(1000 * attempt); // Progressive delay
        }
      }
    }
    
    this.checkedUrls.set(url, { success: false, error: lastError.message });
    throw lastError;
  }

  makeHttpRequest(url) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);
      const isHttps = parsedUrl.protocol === 'https:';
      const client = isHttps ? https : http;
      
      const options = {
        method: 'HEAD', // Use HEAD to avoid downloading full content
        timeout: this.options.timeout,
        headers: {
          'User-Agent': this.options.userAgent,
          'Accept': '*/*'
        }
      };
      
      const req = client.request(url, options, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve();
        } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // Handle redirects
          resolve();
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
      
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      req.on('error', (error) => {
        reject(new Error(`Network error: ${error.message}`));
      });
      
      req.end();
    });
  }

  addBrokenLink(filePath, link, error) {
    const relativePath = path.relative(process.cwd(), filePath);
    this.results.brokenLinks.push({
      file: relativePath,
      link: link,
      error: error
    });
    log(`  ❌ ${link.url} - ${error}`, 'red');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  generateReport() {
    log('\n📊 Link Check Report', 'magenta');
    log('='.repeat(50), 'magenta');
    
    log(`📄 Files processed: ${this.results.totalFiles}`, 'cyan');
    log(`🔗 Total links found: ${this.results.totalLinks}`, 'cyan');
    log(`🏠 Internal links: ${this.results.internalLinks}`, 'cyan');
    log(`🌐 External links: ${this.results.externalLinks}`, 'cyan');
    
    if (this.results.brokenLinks.length === 0) {
      log(`\n✅ All links are working!`, 'green');
    } else {
      log(`\n❌ Found ${this.results.brokenLinks.length} broken links:`, 'red');
      log('-'.repeat(50), 'red');
      
      this.results.brokenLinks.forEach((broken, index) => {
        log(`\n${index + 1}. ${broken.file}`, 'yellow');
        log(`   Link: ${broken.link.url}`, 'red');
        log(`   Text: "${broken.link.text}"`, 'cyan');
        log(`   Error: ${broken.error}`, 'red');
      });
    }
    
    if (this.results.errors.length > 0) {
      log(`\n⚠️  Processing errors:`, 'yellow');
      this.results.errors.forEach(error => {
        log(`  - ${error}`, 'yellow');
      });
    }
  }
}

// CLI functionality
async function main() {
  const args = process.argv.slice(2);
  const options = {};
  
  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--skip-external':
        options.skipExternal = true;
        break;
      case '--docs-dir':
        options.docsDir = args[++i];
        break;
      case '--timeout':
        options.timeout = parseInt(args[++i]) || 10000;
        break;
      case '--help':
        console.log(`
Link Checker Usage:
  node scripts/link-checker.js [options]

Options:
  --skip-external     Skip checking external URLs
  --docs-dir <dir>    Specify docs directory (default: docs)
  --timeout <ms>      HTTP request timeout (default: 10000)
  --help              Show this help message

Examples:
  node scripts/link-checker.js
  node scripts/link-checker.js --skip-external
  node scripts/link-checker.js --docs-dir content --timeout 5000
        `);
        process.exit(0);
        break;
    }
  }
  
  const checker = new LinkChecker(options);
  const success = await checker.checkLinks();
  
  if (!success) {
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    log(`\n💥 Fatal error: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { LinkChecker };
