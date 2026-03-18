#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { glob } = require('glob');
const crypto = require('crypto');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

class RateLimiter {
  constructor() {
    this.slots = {
      http: { lastCall: 0, minInterval: 500 },
      api: { lastCall: 0, minInterval: 1000 }
    };
  }

  async waitForSlot(type) {
    const slot = this.slots[type];
    const now = Date.now();
    const elapsed = now - slot.lastCall;
    if (elapsed < slot.minInterval) {
      await new Promise(r => setTimeout(r, slot.minInterval - elapsed));
    }
    slot.lastCall = Date.now();
  }
}

const SKIP_PATTERNS = [
  /^mailto:/,
  /^tel:/,
  /^#/,
  /localhost/,
  /127\.0\.0\.1/,
  /^javascript:/
];

class LinkVerifier {
  constructor(options = {}) {
    this.options = {
      docsDir: options.docsDir || 'docs',
      timeout: options.timeout || 15000,
      httpTtl: options.httpTtl || 7,
      relevanceTtl: options.relevanceTtl || 30,
      noCache: options.noCache || false,
      cacheOnly: options.cacheOnly || false,
      httpOnly: options.httpOnly || false,
      file: options.file || null,
      verbose: options.verbose || false,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };

    this.cache = { version: 1, entries: {} };
    this.rateLimiter = new RateLimiter();
    this.pageContentStore = new Map(); // temporary in-memory store for page content during run
  }

  // --- Cache ---

  get cachePath() {
    return path.join(this.options.docsDir, '.link-verify-cache.json');
  }

  loadCache() {
    if (this.options.noCache) return;
    try {
      const raw = fs.readFileSync(this.cachePath, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed.version === 1) {
        this.cache = parsed;
      }
    } catch {
      // No cache or invalid — start fresh
    }
  }

  saveCache() {
    fs.writeFileSync(this.cachePath, JSON.stringify(this.cache, null, 2));
  }

  isCacheValid(entry, type) {
    if (this.options.noCache) return false;

    if (type === 'http') {
      if (!entry.httpCheckedAt) return false;
      const age = (Date.now() - new Date(entry.httpCheckedAt).getTime()) / (1000 * 60 * 60 * 24);
      return age < this.options.httpTtl;
    }

    if (type === 'relevance') {
      if (!entry.checkedAt) return false;
      const age = (Date.now() - new Date(entry.checkedAt).getTime()) / (1000 * 60 * 60 * 24);
      return age < this.options.relevanceTtl;
    }

    return false;
  }

  // --- Link extraction ---

  shouldSkipLink(url) {
    return SKIP_PATTERNS.some(p => p.test(url));
  }

  isExternalLink(url) {
    return url.startsWith('http://') || url.startsWith('https://');
  }

  extractLinksWithContext(content, filePath) {
    const links = [];
    const markdownLinkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;

    while ((match = markdownLinkRegex.exec(content)) !== null) {
      const [fullMatch, text, rawUrl] = match;
      const url = rawUrl.trim().split(/\s/)[0]; // handle [text](url "title") format

      if (!url || this.shouldSkipLink(url) || !this.isExternalLink(url)) continue;

      // Extract surrounding paragraph as context
      const before = content.substring(0, match.index);
      const after = content.substring(match.index + fullMatch.length);
      const paraStart = Math.max(before.lastIndexOf('\n\n'), 0);
      const paraEndOffset = after.indexOf('\n\n');
      const paraEnd = paraEndOffset === -1
        ? match.index + fullMatch.length + after.length
        : match.index + fullMatch.length + paraEndOffset;

      let contextSnippet = content.substring(paraStart, paraEnd).trim();
      if (contextSnippet.length > 500) {
        contextSnippet = contextSnippet.substring(0, 500) + '...';
      }

      links.push({
        text: text.trim(),
        url,
        contextSnippet,
        file: path.relative(process.cwd(), filePath)
      });
    }

    return links;
  }

  // --- HTTP ---

  makeHttpRequest(targetUrl, redirectCount = 0) {
    if (redirectCount > 10) {
      return Promise.reject({ status: 0, message: 'Too many redirects' });
    }

    return new Promise((resolve, reject) => {
      let parsedUrl;
      try {
        parsedUrl = new URL(targetUrl);
      } catch {
        return reject({ status: 0, message: `Invalid URL: ${targetUrl}` });
      }

      const client = parsedUrl.protocol === 'https:' ? https : http;

      const req = client.request(targetUrl, {
        method: 'GET',
        timeout: this.options.timeout,
        headers: {
          'User-Agent': this.options.userAgent,
          'Accept': 'text/html,application/xhtml+xml,text/plain,*/*',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, targetUrl).href;
          res.resume(); // drain response
          resolve(this.makeHttpRequest(redirectUrl, redirectCount + 1));
          return;
        }

        if (res.statusCode < 200 || res.statusCode >= 400) {
          res.resume();
          reject({ status: res.statusCode, message: `HTTP ${res.statusCode}` });
          return;
        }

        let body = '';
        const maxBytes = 100 * 1024;
        res.on('data', (chunk) => {
          if (body.length < maxBytes) body += chunk.toString();
        });
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            body,
            contentType: res.headers['content-type'] || ''
          });
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject({ status: 0, message: 'Timeout' });
      });
      req.on('error', (err) => {
        reject({ status: 0, message: err.message });
      });
      req.end();
    });
  }

  async checkHttp(url) {
    await this.rateLimiter.waitForSlot('http');
    return this.makeHttpRequest(url);
  }

  // --- Content extraction ---

  extractPageContent(html) {
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '';

    const metaMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    const metaDesc = metaMatch ? metaMatch[1].trim() : '';

    let text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<header[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const bodySnippet = text.substring(0, 2000);

    return { title, metaDesc, bodySnippet };
  }

  simpleHash(str) {
    return crypto.createHash('md5').update(str.substring(0, 2000)).digest('hex').substring(0, 12);
  }

  // --- AI relevance ---

  async checkRelevance(url, pageContent, citationContext) {
    await this.rateLimiter.waitForSlot('api');

    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic();

    const response = await client.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 150,
      messages: [{
        role: 'user',
        content: `You are verifying that a web link is relevant to how it's cited in a markdown document.

CITATION CONTEXT (from the markdown document):
${citationContext}

LINK URL: ${url}

LINKED PAGE CONTENT:
Title: ${pageContent.title}
Description: ${pageContent.metaDesc}
Body excerpt: ${pageContent.bodySnippet}

Rate the relevance of this linked page to its citation context. Respond in exactly this JSON format:
{"score":"relevant","reasoning":"One sentence explanation"}

Possible scores:
- "relevant": The page content clearly matches what the citation describes or references
- "weak": The page is tangentially related but doesn't strongly support the citation
- "irrelevant": The page content has little or nothing to do with how it's cited`
      }]
    });

    const text = response.content[0].text.trim();
    try {
      return JSON.parse(text);
    } catch {
      // Try to extract JSON from response
      const jsonMatch = text.match(/\{[^}]+\}/);
      if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]); } catch {}
      }
      return { score: 'error', reasoning: text.substring(0, 200) };
    }
  }

  // --- Main flow ---

  async findMarkdownFiles() {
    if (this.options.file) {
      const resolved = path.resolve(this.options.file);
      if (!fs.existsSync(resolved)) {
        throw new Error(`File not found: ${this.options.file}`);
      }
      return [resolved];
    }
    const pattern = path.join(this.options.docsDir, '**/*.md');
    const files = await glob(pattern, { ignore: ['**/node_modules/**'] });
    return files.map(f => path.resolve(f));
  }

  async verify() {
    log('\nLink Verifier', 'magenta');
    log('='.repeat(50), 'magenta');

    this.loadCache();

    const markdownFiles = await this.findMarkdownFiles();
    log(`\nScanning ${markdownFiles.length} markdown file(s)...`, 'blue');

    // Collect all external links with citation context, deduplicated by URL
    const urlCitations = new Map(); // url -> [{ file, linkText, contextSnippet }]
    let totalLinks = 0;

    for (const filePath of markdownFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      const links = this.extractLinksWithContext(content, filePath);
      totalLinks += links.length;

      for (const link of links) {
        if (!urlCitations.has(link.url)) {
          urlCitations.set(link.url, []);
        }
        urlCitations.get(link.url).push({
          file: link.file,
          linkText: link.text,
          contextSnippet: link.contextSnippet
        });
      }
    }

    log(`Found ${totalLinks} external links (${urlCitations.size} unique URLs)`, 'blue');

    if (this.options.cacheOnly) {
      this.generateReport(urlCitations);
      return;
    }

    // Phase 1: HTTP reachability
    log('\n--- Phase 1: HTTP Reachability ---', 'magenta');
    let httpChecked = 0;
    let httpCached = 0;
    let httpErrors = 0;

    for (const [url] of urlCitations) {
      const entry = this.cache.entries[url];
      if (entry && this.isCacheValid(entry, 'http')) {
        httpCached++;
        if (this.options.verbose) {
          log(`  [cached ${entry.httpStatus}] ${url}`, 'dim');
        }
        continue;
      }

      try {
        const result = await this.checkHttp(url);
        this.cache.entries[url] = {
          ...this.cache.entries[url],
          httpStatus: result.status,
          httpCheckedAt: new Date().toISOString(),
          httpError: undefined
        };

        // Store page content temporarily for relevance check
        if (result.body && result.contentType.includes('text/html')) {
          const pageContent = this.extractPageContent(result.body);
          const contentHash = this.simpleHash(pageContent.bodySnippet);
          this.pageContentStore.set(url, pageContent);
          if (!this.cache.entries[url].relevance) {
            this.cache.entries[url].relevance = {};
          }
          this.cache.entries[url].relevance.contentHash = contentHash;
        }

        httpChecked++;
        log(`  [${result.status}] ${url}`, result.status === 200 ? 'green' : 'yellow');
      } catch (err) {
        this.cache.entries[url] = {
          ...this.cache.entries[url],
          httpStatus: err.status || 0,
          httpError: err.message,
          httpCheckedAt: new Date().toISOString()
        };
        httpErrors++;
        log(`  [ERROR] ${url} — ${err.message}`, 'red');
      }
    }

    this.saveCache();
    log(`\nHTTP: ${httpChecked} checked, ${httpCached} cached, ${httpErrors} errors`, 'cyan');

    // Phase 2: AI relevance
    if (!this.options.httpOnly) {
      // Check if API key is available
      if (!process.env.ANTHROPIC_API_KEY) {
        log('\nNo ANTHROPIC_API_KEY found — skipping relevance checks.', 'yellow');
        log('Set the env var or use --http-only to suppress this warning.', 'yellow');
      } else {
        log('\n--- Phase 2: AI Relevance Check ---', 'magenta');
        let relChecked = 0;
        let relCached = 0;
        let relErrors = 0;

        for (const [url, citations] of urlCitations) {
          const entry = this.cache.entries[url];
          if (!entry || (entry.httpStatus !== undefined && (entry.httpStatus < 200 || entry.httpStatus >= 400))) {
            continue; // skip unreachable
          }

          // Skip non-HTML (PDFs, etc.)
          if (!this.pageContentStore.has(url) && !entry.relevance?.contentHash) {
            continue;
          }

          for (const citation of citations) {
            const citationKey = citation.file;
            const existingCitation = entry.relevance?.citations?.[citationKey];

            if (existingCitation && this.isCacheValid(existingCitation, 'relevance')) {
              relCached++;
              if (this.options.verbose) {
                log(`  [cached: ${existingCitation.score}] ${url} in ${citationKey}`, 'dim');
              }
              continue;
            }

            // Get page content
            let pageContent = this.pageContentStore.get(url);
            if (!pageContent) {
              // Need to re-fetch
              try {
                const result = await this.checkHttp(url);
                if (result.body && result.contentType.includes('text/html')) {
                  pageContent = this.extractPageContent(result.body);
                  this.pageContentStore.set(url, pageContent);
                } else {
                  continue;
                }
              } catch {
                continue;
              }
            }

            try {
              const result = await this.checkRelevance(url, pageContent, citation.contextSnippet);

              if (!entry.relevance) entry.relevance = {};
              if (!entry.relevance.citations) entry.relevance.citations = {};
              entry.relevance.citations[citationKey] = {
                score: result.score,
                reasoning: result.reasoning,
                linkText: citation.linkText,
                contextSnippet: citation.contextSnippet.substring(0, 200),
                checkedAt: new Date().toISOString()
              };

              relChecked++;
              const scoreColor = result.score === 'relevant' ? 'green'
                : result.score === 'weak' ? 'yellow' : 'red';
              log(`  [${result.score}] ${url}`, scoreColor);
              if (this.options.verbose) {
                log(`    in: ${citationKey}`, 'dim');
                log(`    reason: ${result.reasoning}`, 'dim');
              }
            } catch (err) {
              relErrors++;
              log(`  [API error] ${url} — ${err.message}`, 'red');
            }
          }
        }

        this.saveCache();
        log(`\nRelevance: ${relChecked} checked, ${relCached} cached, ${relErrors} errors`, 'cyan');
      }
    }

    this.generateReport(urlCitations);
  }

  generateReport(urlCitations) {
    log('\n' + '='.repeat(50), 'magenta');
    log('VERIFICATION REPORT', 'magenta');
    log('='.repeat(50), 'magenta');

    // HTTP summary
    const broken = [];
    const blocked = []; // 403s — likely bot-blocked, not truly broken
    const weak = [];
    const irrelevant = [];
    let okCount = 0;
    let relevantCount = 0;
    let weakCount = 0;
    let irrelevantCount = 0;

    for (const [url, citations] of urlCitations) {
      const entry = this.cache.entries[url];
      if (!entry) continue;

      const isBad = entry.httpStatus !== undefined && (entry.httpStatus < 200 || entry.httpStatus >= 400) || entry.httpStatus === 0;
      if (isBad) {
        const is403 = entry.httpStatus === 403;
        for (const c of citations) {
          const item = { url, file: c.file, linkText: c.linkText, error: entry.httpError || `HTTP ${entry.httpStatus}` };
          if (is403) blocked.push(item);
          else broken.push(item);
        }
      } else {
        okCount++;
      }

      // Relevance
      if (entry.relevance?.citations) {
        for (const [file, rel] of Object.entries(entry.relevance.citations)) {
          if (rel.score === 'relevant') relevantCount++;
          else if (rel.score === 'weak') {
            weakCount++;
            weak.push({ url, file, linkText: rel.linkText, reasoning: rel.reasoning });
          } else if (rel.score === 'irrelevant') {
            irrelevantCount++;
            irrelevant.push({ url, file, linkText: rel.linkText, reasoning: rel.reasoning });
          }
        }
      }
    }

    log(`\nURLs: ${urlCitations.size} unique`, 'cyan');
    log(`  OK: ${okCount}  |  Broken: ${broken.length}  |  Blocked (403): ${blocked.length}`, okCount > 0 ? 'green' : 'cyan');

    if (relevantCount + weakCount + irrelevantCount > 0) {
      log(`\nRelevance:`, 'cyan');
      log(`  Relevant: ${relevantCount}  |  Weak: ${weakCount}  |  Irrelevant: ${irrelevantCount}`, 'cyan');
    }

    if (broken.length > 0) {
      log('\nBROKEN LINKS:', 'red');
      log('-'.repeat(40), 'red');
      broken.forEach((b, i) => {
        log(`  ${i + 1}. ${b.file}`, 'yellow');
        log(`     Link: ${b.url}`, 'red');
        log(`     Text: "${b.linkText}"`, 'dim');
        log(`     Error: ${b.error}`, 'red');
      });
    }

    if (blocked.length > 0) {
      log('\nBLOCKED (403 — likely bot protection, not truly broken):', 'yellow');
      log('-'.repeat(40), 'yellow');
      blocked.forEach((b, i) => {
        log(`  ${i + 1}. ${b.url}`, 'yellow');
        log(`     Text: "${b.linkText}"`, 'dim');
      });
    }

    if (irrelevant.length > 0) {
      log('\nIRRELEVANT CITATIONS:', 'red');
      log('-'.repeat(40), 'red');
      irrelevant.forEach((ir, i) => {
        log(`  ${i + 1}. ${ir.file}`, 'yellow');
        log(`     Link: ${ir.url}`, 'red');
        log(`     Text: "${ir.linkText}"`, 'dim');
        log(`     Reason: ${ir.reasoning}`, 'red');
      });
    }

    if (weak.length > 0) {
      log('\nWEAK CITATIONS:', 'yellow');
      log('-'.repeat(40), 'yellow');
      weak.forEach((w, i) => {
        log(`  ${i + 1}. ${w.file}`, 'yellow');
        log(`     Link: ${w.url}`, 'yellow');
        log(`     Text: "${w.linkText}"`, 'dim');
        log(`     Reason: ${w.reasoning}`, 'yellow');
      });
    }

    if (broken.length === 0 && irrelevant.length === 0 && weak.length === 0) {
      log('\nAll links verified OK!' + (blocked.length > 0 ? ` (${blocked.length} blocked by bot protection)` : ''), 'green');
    }

    log('');
  }
}

// --- CLI ---

async function main() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--docs-dir': options.docsDir = args[++i]; break;
      case '--timeout': options.timeout = parseInt(args[++i]) || 15000; break;
      case '--http-ttl': options.httpTtl = parseInt(args[++i]) || 7; break;
      case '--relevance-ttl': options.relevanceTtl = parseInt(args[++i]) || 30; break;
      case '--no-cache': options.noCache = true; break;
      case '--cache-only': options.cacheOnly = true; break;
      case '--http-only': options.httpOnly = true; break;
      case '--file': options.file = args[++i]; break;
      case '--verbose': options.verbose = true; break;
      case '--help':
        console.log(`
Link Verifier — validates links and checks citation relevance via AI

Usage: node scripts/link-verifier.js [options]

Options:
  --file <path>            Check a single markdown file
  --http-only              Skip AI relevance check
  --no-cache               Ignore cache, re-verify everything
  --cache-only             Report from cache only (no network)
  --http-ttl <days>        HTTP cache TTL (default: 7)
  --relevance-ttl <days>   Relevance cache TTL (default: 30)
  --docs-dir <dir>         Docs directory (default: docs)
  --timeout <ms>           HTTP timeout (default: 15000)
  --verbose                Show detailed output
  --help                   Show this help

Examples:
  node scripts/link-verifier.js
  node scripts/link-verifier.js --http-only
  node scripts/link-verifier.js --file docs/musings/some-post.md
  node scripts/link-verifier.js --cache-only
`);
        process.exit(0);
    }
  }

  const verifier = new LinkVerifier(options);
  await verifier.verify();
}

if (require.main === module) {
  main().catch(err => {
    log(`\nFatal error: ${err.message}`, 'red');
    if (err.stack) log(err.stack, 'dim');
    process.exit(1);
  });
}

module.exports = { LinkVerifier };
