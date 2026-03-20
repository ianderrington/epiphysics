const withMDX = require('@next/mdx')();
const mdxOptions = require('./mdx.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // Externalize packages that should not be bundled in serverless functions
  serverExternalPackages: [
    '@anthropic-ai/sdk',
    '@google/genai',
    'lighthouse',
    'chrome-launcher',
    '@mermaid-js/mermaid-cli',
    'puppeteer',
    'sharp',
  ],

  // Exclude docs directory - we use preprocessed content-data.json instead
  // Note: public/docs/ is NOT excluded so images can be served
  outputFileTracingIncludes: {
    '*': ['docs/site.config.yaml', 'docs/home/content.yaml', 'docs/.pages'],
  },
  outputFileTracingExcludes: {
    '*': [
      'docs/**/*',
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/esbuild/linux',
      'node_modules/webpack/lib',
      '.git/**/*',
    ],
  },

  // Enable image optimization for all domains
  images: {
    unoptimized: true, // Don't optimize images since we're serving from docs directory
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.epiphysics.xyz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'epiphysics.xyz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/**',
      },
    ],
    domains: ['localhost', 'epiphysics.xyz', 'www.epiphysics.xyz', 'vercel.app'],
  },

  // Pass environment variables to the client-side
  env: {
    ENABLE_LOGS: process.env.ENABLE_LOGS || 'false',
    NEXT_PUBLIC_ENABLE_LOGS: process.env.ENABLE_LOGS || 'false',
  },
  
  // Images are served directly from public/docs/ by Next.js
  // No rewrites needed - Next.js serves public/ automatically
  
  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    mdxRs: false, // Set to false since we're using custom MDX options
    optimizePackageImports: ['react-icons', 'lucide-react', '@heroicons/react'],
  },

  webpack: (config, { isServer }) => {
    // Mark heavy packages as external for server-side bundles
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@anthropic-ai/sdk': 'commonjs @anthropic-ai/sdk',
        '@google/genai': 'commonjs @google/genai',
        'lighthouse': 'commonjs lighthouse',
        'chrome-launcher': 'commonjs chrome-launcher',
        '@mermaid-js/mermaid-cli': 'commonjs @mermaid-js/mermaid-cli',
        'puppeteer': 'commonjs puppeteer',
      });
    }

    // Optimize vendor chunks for client-side
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 10
            }
          }
        }
      };
    }

    return config;
  },
};

// Export the final configuration with MDX support
module.exports = withMDX({
  ...nextConfig,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
}); 