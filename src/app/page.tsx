import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import DefaultHomeLayout from '@/layouts/default/home';
import Features from '@/components/home/Features';
import WhatsThis from '@/components/home/WhatsThis';
import EmbeddedMap from '@/components/home/EmbeddedMap';
import Link from 'next/link';
import SafeHTML from '@/components/SafeHTML';
import { markdownToHtml } from '@/lib/content/markdown';
import { loadSiteConfig } from '@/lib/server/config';
import { loadHomeContent, HomePageContent } from '@/lib/server/content';
import { getCachedAllContent, Post } from '@/lib/content';

const AnimatedHero = dynamic(() => import('@/components/home/AnimatedHero'), { ssr: true });
const FeaturedPosts = dynamic(() => import('@/components/home/FeaturedPosts'), { ssr: true });

// Generate metadata from config
export async function generateMetadata(): Promise<Metadata> {
  const config = loadSiteConfig();
  const { site } = config;

  return {
    title: {
      default: site.title,
      template: `%s | ${site.title}`,
    },
    description: site.description,
    metadataBase: new URL(site.url),
    openGraph: {
      title: site.title,
      description: site.description,
      url: '/',
      siteName: site.title,
      // Use default OG image if necessary
      images: [
        {
          url: '/images/og-image.jpg', // Default fallback
          width: 1200,
          height: 630,
          alt: site.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: site.title,
      description: site.description,
      // Use default Twitter image if necessary
      images: ['/images/twitter-image.jpg'],
    },
  };
}

export default async function Home() {
  try {
    // Load the home page content using the server loader
    const content = loadHomeContent();
    
    if (!content) {
      console.error('Error: Home page content not found');
      throw new Error('Home page content not found. Please ensure docs/home/content.yaml exists.');
    }

    // Get all posts for featured sections
    let allPosts: Post[] = [];
    try {
      allPosts = await getCachedAllContent();
    } catch (error) {
      console.error('[Home Page] Error loading posts:', error);
      // Continue with empty posts array to allow page to render
    }
  
  // Organize posts by category for Epiphysics
  const postsByCategory: Record<string, Post[]> = {
    theory: allPosts.filter(post => post.slug.startsWith('theory/') && !post.isIndex),
    applications: allPosts.filter(post => post.slug.startsWith('applications/') && !post.isIndex),
    research: allPosts.filter(post => post.slug.startsWith('research/') && !post.isIndex),
    experiments: allPosts.filter(post => post.slug.startsWith('experiments/') && !post.isIndex),
  };

  const html = await markdownToHtml(content.content || '');

  // Create components for the home page
  const CustomWhatsThis = () => <WhatsThis />;

  const CustomFeatures = () => (
    <>
      <EmbeddedMap />
      <Features 
        features={content.features?.items || []} 
        title={content.features?.title}
        description={content.features?.description}
      />
    </>
  );
  
  const CustomFeaturedPosts = () => (
    <FeaturedPosts
      title={content.featured_posts?.title || "Recent Content"}
      categories={{
        theory: {
          title: "Theory",
          description: "The Epimechanics framework — foundations through full ontology",
          display_count: 4,
          pinned: content.featured_posts?.projects?.pinned || [],
          posts: [],
        },
        applications: {
          title: "Applications",
          description: "Testing the framework in specific domains",
          display_count: 4,
          pinned: [],
          posts: [],
        },
        research: {
          title: "Research",
          description: "Papers, proofs, and experimental protocols",
          display_count: 3,
          pinned: [],
          posts: [],
        },
        experiments: {
          title: "Experiments — Under Development",
          description: "Empirical tests being designed — protocols ready, experiments not yet run",
          display_count: 2,
          pinned: [],
          posts: [],
        },
      }}
      posts={postsByCategory}
    />
  );
  
  const CustomCTA = () => (
    <div className="relative py-16 sm:py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {content.cta?.title || 'Open Source'}
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          {content.cta?.description || 'Theory developed. Experiments ready to run.'}
        </p>
        <Link
          href={content.cta?.button?.link || 'https://github.com/supernalintelligence/epiphysics'}
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors"
        >
          {content.cta?.button?.text || 'View on GitHub'}
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
        </Link>
      </div>
    </div>
  );

  return (
    <DefaultHomeLayout 
      hero={AnimatedHero}
      intro={CustomWhatsThis}
      features={CustomFeatures}
      featuredPosts={CustomFeaturedPosts}
      cta={CustomCTA}
      heroProps={{
        title: content.hero?.title,
        description: content.hero?.subtitle || content.description,
        quick_links: content.hero?.quick_links || [],
        cta: content.hero?.cta || content.cta?.button,
        background_style: content.hero?.background_style || 'dynamic',
        background_image: content.hero?.background_image
      }}
    />
  );
  } catch (error) {
    console.error('[Home Page] Error rendering:', error);
    // Return a fallback page instead of crashing
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            There was an error loading the home page content.
          </p>
          {error instanceof Error && (
            <pre className="text-sm text-left bg-red-50 dark:bg-red-900/20 p-4 rounded mt-4">
              {error.message}
            </pre>
          )}
        </div>
      </div>
    );
  }
}