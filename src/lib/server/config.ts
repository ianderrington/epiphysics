import { readFileSync } from 'fs';
import { join } from 'path';
import { existsSync } from 'fs';
import yaml from 'js-yaml';
import { cache } from 'react';

// Define the config types
export interface SiteConfig {
  site: {
    title: string;
    description: string;
    url: string;
    language: string;
    favicon: string;
    copyright: string;
  };
  author: {
    name: string;
    email: string;
    link: string;
    social: {
      twitter: string;
      github: string;
      bluesky: string;
      threads: string;
    };
  };
  rss: {
    title: string;
    description: string;
    categories: string[];
    ttl: number;
  };
}

// Cached config loader - loads from docs/site.config.yaml
// This is the SINGLE SOURCE OF TRUTH for site configuration
export const loadSiteConfig = cache((): SiteConfig => {
  const configPath = join(process.cwd(), 'docs', 'site.config.yaml');
  
  if (!existsSync(configPath)) {
    throw new Error('Site config file not found at docs/site.config.yaml - this file is required');
  }
  
  try {
    const configContent = readFileSync(configPath, 'utf8');
    const yamlConfig = yaml.load(configContent) as SiteConfig;
    
    // Validate required fields
    if (!yamlConfig.site || !yamlConfig.author || !yamlConfig.rss) {
      throw new Error('Invalid site config: missing required sections (site, author, rss)');
    }
    
    return yamlConfig;
  } catch (e) {
    console.error('Error loading site config:', e);
    throw e;
  }
}); 