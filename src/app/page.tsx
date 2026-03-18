import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import DefaultHomeLayout from '@/layouts/default/home';
import Features from '@/components/home/Features';
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
  
  // Organize posts by category - including the new categories
  const postsByCategory: Record<string, Post[]> = {
    kids_corner: allPosts.filter(post => 
      post.slug.includes('wise_songs') && 
      !post.slug.includes('cerebral_songs') &&
      !post.isIndex
    ),
    cerebral_songs: allPosts.filter(post => 
      post.slug.includes('cerebral_songs') &&
      !post.isIndex
    ),
    fiction: allPosts.filter(post => post.slug.startsWith('fiction/') && !post.isIndex),
    projects: allPosts.filter(post => post.slug.startsWith('projects/') && !post.isIndex),
  };

  const html = await markdownToHtml(content.content || '');

  // Create components for the home page
  const CustomFeatures = () => (
    <Features 
      features={content.features?.items || []} 
      title={content.features?.title}
      description={content.features?.description}
    />
  );
  
  const CustomFeaturedPosts = () => (
    <FeaturedPosts
      title={content.featured_posts?.title || "Featured Content"}
      categories={{
        kids_corner: {
          title: content.featured_posts?.kids_corner?.title || "🎵 Kids Corner: Wise Songs",
          description: content.featured_posts?.kids_corner?.description || "Educational songs for learning",
          display_count: content.featured_posts?.kids_corner?.display_count || 4,
          pinned: content.featured_posts?.kids_corner?.pinned || [],
          posts: [],
        },
        cerebral_songs: {
          title: content.featured_posts?.cerebral_songs?.title || "🧠 Cerebral Songs",
          description: content.featured_posts?.cerebral_songs?.description || "Complex topics through music",
          display_count: content.featured_posts?.cerebral_songs?.display_count || 3,
          pinned: content.featured_posts?.cerebral_songs?.pinned || [],
          posts: [],
        },
        fiction: {
          title: content.featured_posts?.fiction?.title || "📚 Fiction & Stories",
          description: content.featured_posts?.fiction?.description || "Speculative fiction",
          display_count: content.featured_posts?.fiction?.display_count || 3,
          pinned: content.featured_posts?.fiction?.pinned || [],
          posts: [],
        },
        projects: {
          title: content.featured_posts?.projects?.title || "🔬 Research & Projects",
          description: content.featured_posts?.projects?.description || "Technical implementations",
          display_count: content.featured_posts?.projects?.display_count || 3,
          pinned: content.featured_posts?.projects?.pinned || [],
          posts: [],
        },
      }}
      posts={postsByCategory}
    />
  );
  
  const CustomCTA = () => (
    <div className="relative overflow-hidden py-16 sm:py-24">
      {/* Modern gradient background with animated effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        {/* Animated circles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 drop-shadow-md">
            {content.cta?.title}
          </h2>
          <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow">
            {content.cta?.description}
          </p>

          <div className="flex justify-center">
            <Link
              href={content.cta?.button?.link || '/contact'}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-blue-700 bg-white hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              {content.cta?.button?.text || 'Get in Touch'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DefaultHomeLayout 
      hero={AnimatedHero}
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