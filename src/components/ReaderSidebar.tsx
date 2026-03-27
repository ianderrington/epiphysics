'use client';

import React from 'react';
import Link from 'next/link';
import TableOfContents from '@/components/TableOfContents';
import type { NavNode } from './ReaderBar';

interface ReaderSidebarProps {
  chapters?: NavNode[];
  currentHref?: string;
  tocHtml?: string;
}

export default function ReaderSidebar({
  chapters = [],
  currentHref,
  tocHtml,
}: ReaderSidebarProps) {
  const hasChapters = chapters.length > 0;
  const hasToc = !!tocHtml;

  if (!hasChapters && !hasToc) return null;

  return (
    <aside
      className="hidden xl:block w-64 shrink-0 sticky top-[calc(var(--header-height)+52px)] max-h-[calc(100vh-var(--header-height)-60px)] overflow-y-auto pr-4"
      style={{ scrollbarWidth: 'thin' }}
    >
      {hasChapters && (
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-2">
            Chapters
          </h3>
          <nav className="space-y-0.5">
            {chapters.map((ch) => {
              const active = currentHref === ch.href;
              return (
                <Link
                  key={ch.href}
                  href={ch.href}
                  className={`block px-2 py-1.5 rounded-md text-sm transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {ch.title}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {hasToc && (
        <div>
          {hasChapters && (
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-2">
              On this page
            </h3>
          )}
          <TableOfContents content={tocHtml!} />
        </div>
      )}
    </aside>
  );
}
