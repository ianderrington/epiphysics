import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { loadConfig } from '@/lib/content/resolver';
import { DEFAULT_IMAGES } from '@/lib/constants';
import PostComponent from '@/components/PostComponent';
import FloatingShareButton from '@/components/FloatingShareButton';
import Breadcrumb from '@/components/Breadcrumb';
import { resolveImagePath } from '@/lib/imageUtils';
import CollectionDisplay from '@/components/CollectionDisplay';
import MobileReaderNav from '@/components/MobileReaderNav';
import { prepareCollectionRenderData } from '@/lib/content/collectionRenderer';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo';
import FeedbackAnnotator from '@/components/FeedbackAnnotator';
import ContributeSection from '@/components/ContributeSection';
import { applyContributorMetadata } from '@/lib/contributors';

// Force dynamic rendering to avoid SSR issues with client components
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    section: string;
    slug: string[];
  }>;
}

interface NavNode {
  href: string;
  title: string;
}

function hrefFromSlug(slug: string): string {
  return `/${slug.replace(/^\//, '').replace(/\/index$/, '')}`;
}

async function resolveMobileNav(
  section: string,
  slugSegments: string[],
  currentSlug: string,
  isCollection: boolean,
  currentTitle: string
): Promise<{ parent: NavNode | null; prev: NavNode | null; next: NavNode | null; chapters: NavNode[]; currentHref: string }> {
  const currentNodeSlug = currentSlug.replace(/\/index$/, '');
  const parentSlug = slugSegments.length > 1 ? [section, ...slugSegments.slice(0, -1)].join('/') : section;

  const parentTitle = parentSlug
    .split('/')
    .pop()
    ?.replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase()) || 'Collection';

  const parent: NavNode | null = parentSlug && parentSlug !== currentNodeSlug
    ? { href: hrefFromSlug(parentSlug), title: parentTitle }
    : null;

  const { getCachedSectionContent, getCachedPostBySlug, getCachedChildPosts } = await import('@/lib/content');

  let siblingNodes: NavNode[] = [];

  if (parentSlug === section) {
    const allPosts = await getCachedSectionContent(section);
    const items = await prepareCollectionRenderData(section, []).then(d => d.items);
    siblingNodes = items.map((item: any) => {
      if ('posts' in item) {
        const slug = item.fullSlug;
        const title = item.indexPost?.metadata?.title || item.slug;
        return { href: hrefFromSlug(slug), title };
      }
      return { href: hrefFromSlug(item.slug), title: item.metadata?.title || item.slug.split('/').pop() || item.slug };
    });
    // keep linter happy with allPosts usage in dynamic import context
    if (!allPosts) siblingNodes = siblingNodes;
  } else {
    const parentPost = await getCachedPostBySlug(parentSlug);
    if (parentPost) {
      const childPosts = await getCachedChildPosts(parentPost.slug);
      const scopeSlug = parentPost.slug.replace(/\/index$/, '');
      const items = await prepareCollectionRenderData(section, scopeSlug.split('/').slice(1)).then(d => d.items);
      siblingNodes = items.map((item: any) => {
        if ('posts' in item) {
          const slug = item.fullSlug;
          const title = item.indexPost?.metadata?.title || item.slug;
          return { href: hrefFromSlug(slug), title };
        }
        return { href: hrefFromSlug(item.slug), title: item.metadata?.title || item.slug.split('/').pop() || item.slug };
      });
      if (!childPosts) siblingNodes = siblingNodes;
    }
  }

  // include current if absent (edge cases)
  if (!siblingNodes.some(n => n.href === hrefFromSlug(currentNodeSlug))) {
    siblingNodes.push({ href: hrefFromSlug(currentNodeSlug), title: currentTitle });
  }

  const idx = siblingNodes.findIndex(n => n.href === hrefFromSlug(currentNodeSlug));
  return {
    parent,
    prev: idx > 0 ? siblingNodes[idx - 1] : null,
    next: idx >= 0 && idx < siblingNodes.length - 1 ? siblingNodes[idx + 1] : null,
    chapters: siblingNodes,
    currentHref: hrefFromSlug(currentNodeSlug),
  };
}

// Static params removed - using force-dynamic to avoid SSR issues with client components

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { section, slug } = resolvedParams;
  
  // Use unified collection renderer
  const renderData = await prepareCollectionRenderData(section, slug);
  
  if (!renderData.indexPost) {
    notFound();
  }

  renderData.indexPost.metadata = await applyContributorMetadata(renderData.indexPost.metadata);

  // Get view configuration from index post frontmatter
  const defaultViewType = renderData.indexPost?.metadata?.defaultViewType || 'cards';
  const allowedViewTypes = renderData.indexPost?.metadata?.allowedViewTypes;

  // Check if feedback is enabled (default: true unless explicitly disabled)
  const feedbackEnabled = renderData.indexPost?.metadata?.feedback?.enabled !== false;

  // Prepare schema data
  const config = loadConfig();
  const baseUrl = config.site.url;
  const fullUrl = `${baseUrl}/${section}/${slug.join('/')}`;

  const mobileNav = await resolveMobileNav(
    section,
    slug,
    renderData.indexPost.slug,
    renderData.isCollection,
    renderData.indexPost.metadata.title
  );

  // Prepare breadcrumb items for schema
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    ...renderData.breadcrumbPath.map((crumb: any) => ({
      name: crumb.title,
      url: `${baseUrl}${crumb.href}`
    }))
  ];

  // Prepare image URL for schema - resolve relative paths first
  const resolvedSchemaImageUrl = resolveImagePath(
    renderData.indexPost.metadata.coverImage,
    DEFAULT_IMAGES.post,
    section,
    renderData.indexPost.slug
  );

  const absoluteImageUrl = resolvedSchemaImageUrl.startsWith('http')
    ? resolvedSchemaImageUrl
    : `${baseUrl}${resolvedSchemaImageUrl}`;

  return (
    <>
      {/* Schema.org structured data */}
      {!renderData.isCollection && (
        <>
          <ArticleSchema
            title={renderData.indexPost.metadata.title}
            description={renderData.indexPost.metadata.description || renderData.indexPost.excerpt || ''}
            datePublished={renderData.indexPost.metadata.date ? new Date(renderData.indexPost.metadata.date).toISOString() : new Date().toISOString()}
            dateModified={renderData.indexPost.metadata.dateModified ? new Date(renderData.indexPost.metadata.dateModified).toISOString() : undefined}
            image={absoluteImageUrl || undefined}
            url={fullUrl}
            keywords={renderData.indexPost.metadata.tags}
          />
          <BreadcrumbSchema items={breadcrumbItems} />
        </>
      )}

      <MobileReaderNav
        currentTitle={renderData.indexPost.metadata.title}
        currentHref={mobileNav.currentHref}
        chapters={mobileNav.chapters}
        parent={mobileNav.parent}
        prev={mobileNav.prev}
        next={mobileNav.next}
        tocContentHtml={renderData.indexPost.html || ''}
        ttsEnabled={!!renderData.indexPost.metadata.tts?.enabled}
      />

      {renderData.isCollection ? (
        <CollectionDisplay
          indexPost={renderData.indexPost}
          items={renderData.items}
          section={renderData.section}
          breadcrumbPath={renderData.breadcrumbPath}
          defaultViewType={defaultViewType as any}
          allowedViewTypes={allowedViewTypes as any}
          getImagePath={resolveImagePath}
        />
      ) : (
        <>
          <div className="breadcrumb-container">
            <Breadcrumb path={renderData.breadcrumbPath} />
          </div>
          <div className="max-w-[1600px] mx-auto px-1 sm:px-6 py-4">
            <PostComponent post={renderData.indexPost} />
          </div>
          <ContributeSection />
        </>
      )}
      <FeedbackAnnotator
        pageTitle={renderData.indexPost.metadata.title}
        enabled={feedbackEnabled}
      />
      <FloatingShareButton
        title={renderData.indexPost.metadata.title}
        description={renderData.indexPost.metadata.description || renderData.indexPost.excerpt || ''}
        tags={renderData.indexPost.metadata.tags || []}
        shareBlurbs={renderData.indexPost.metadata.shareBlurbs}
        isAlwaysVisible={false}
        isCollection={renderData.isCollection}
        fullContent={renderData.indexPost.content || ''}
        htmlContent={renderData.indexPost.html || ''}
        coverImage={typeof renderData.indexPost.metadata.coverImage === 'string'
          ? renderData.indexPost.metadata.coverImage
          : renderData.indexPost.metadata.coverImage?.url || ''}
      />
    </>
  );
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  
  const { section, slug } = resolvedParams;
  const renderData = await prepareCollectionRenderData(section, slug);
  const post = renderData.indexPost;

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const config = loadConfig();
  const { site } = config;
  
  const parentMetadata = await parent;
  const metadataBase = parentMetadata.metadataBase || new URL(site.url);
  
  const url = `/${resolvedParams.section}/${Array.isArray(resolvedParams.slug) ? resolvedParams.slug.join('/') : resolvedParams.slug}`;
  
  const title = post.metadata.title;
  const description = post.metadata.description || post.excerpt || '';
  
  const resolvedImageUrl = resolveImagePath(
    post.metadata.coverImage,
    DEFAULT_IMAGES.post,
    resolvedParams.section,
    post.slug
  );

  const absoluteImageUrl = resolvedImageUrl.startsWith('http') 
    ? resolvedImageUrl 
    : new URL(resolvedImageUrl, metadataBase).toString();

  const shareBlurbs = post.metadata.shareBlurbs || {};

  // Use platform-specific descriptions for social sharing
  const facebookDescription = shareBlurbs.facebook || description;
  const twitterDescription = shareBlurbs.twitter || description;

  return {
    title,
    description,
    metadataBase: metadataBase,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: facebookDescription,
      url: url,
      siteName: site.title,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: site.social.openGraph.locale,
      type: 'article',
      publishedTime: post.metadata.date ? new Date(post.metadata.date).toISOString() : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: twitterDescription,
      images: [absoluteImageUrl],
    },
  };
} 