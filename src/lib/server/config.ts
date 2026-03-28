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

// Hardcoded fallback for when docs/site.config.yaml is not available at runtime
// (e.g. Vercel serverless functions where docs/ is excluded from the bundle)
const DEFAULT_SITE_CONFIG: SiteConfig = {
  site: {
    title: 'Epiphysics',
    description: 'Epimechanics — the mathematical grammar of how representations change under forces, applicable to any substrate',
    url: 'https://epiphysics.xyz',
    language: 'en',
    favicon: '/favicon.ico',
    copyright: 'All rights reserved',
  },
  author: {
    name: 'Ian Derrington',
    email: 'ianderrington@gmail.com',
    link: '/theory',
    social: {
      twitter: 'https://x.com/ian_derrington',
      github: 'https://github.com/supernalintelligence/epiphysics',
      bluesky: '',
      threads: '',
    },
  },
  rss: {
    title: 'Epiphysics',
    description: 'Updates from Epiphysics - the empirical science of Epimechanics',
    categories: ['Physics', 'Philosophy', 'Information Theory', 'Complex Systems'],
    ttl: 60,
  },
};

// Cached config loader - loads from docs/site.config.yaml
// Falls back to hardcoded defaults when file is unavailable (Vercel serverless)
export const loadSiteConfig = cache((): SiteConfig => {
  const configPath = join(process.cwd(), 'docs', 'site.config.yaml');

  if (!existsSync(configPath)) {
    console.warn('Site config file not found at docs/site.config.yaml - using built-in defaults');
    return DEFAULT_SITE_CONFIG;
  }

  try {
    const configContent = readFileSync(configPath, 'utf8');
    const yamlConfig = yaml.load(configContent) as SiteConfig;

    // Validate required fields
    if (!yamlConfig.site || !yamlConfig.author || !yamlConfig.rss) {
      console.warn('Invalid site config: missing required sections - using built-in defaults');
      return DEFAULT_SITE_CONFIG;
    }

    return yamlConfig;
  } catch (e) {
    console.warn('Error loading site config, using built-in defaults:', e);
    return DEFAULT_SITE_CONFIG;
  }
});
