'use client';

import React, { useRef, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import TableOfContents from '@/components/TableOfContents';
import FloatingShareButton from '@/components/FloatingShareButton';
import ReadingMemory from '@/components/ReadingMemory';

interface CollectionFloatingToolsProps {
  slug: string;
  title: string;
  html: string;
  content: string;
  description?: string;
  tags?: string[];
}

export default function CollectionFloatingTools({
  slug,
  title,
  html,
  content,
  description,
  tags = [],
}: CollectionFloatingToolsProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <div className="hidden md:block">
        <Navigation
          type="toc"
          isOpen={tocOpen}
          onToggle={() => setTocOpen(!tocOpen)}
          footerRef={footerRef as React.RefObject<HTMLElement>}
          alwaysVisible={false}
        >
          <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-gray-100">Contents</div>
            <div className="p-3 overflow-y-auto">
              <TableOfContents content={html} onLinkClick={() => setTocOpen(false)} />
              <div className="mt-3">
                <ReadingMemory slug={slug} contentHash={`${html.length}`} />
              </div>
            </div>
          </div>
        </Navigation>
      </div>

      <FloatingShareButton
        title={title}
        description={description || ''}
        tags={tags}
        fullContent={content}
        htmlContent={html}
        isCollection={true}
      />
    </>
  );
}
