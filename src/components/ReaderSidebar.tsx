'use client';

import React from 'react';
import TableOfContents from '@/components/TableOfContents';
import type { NavNode } from './ReaderBar';

interface ReaderSidebarProps {
  chapters?: NavNode[];
  currentHref?: string;
  tocHtml?: string;
}

export default function ReaderSidebar({
  tocHtml,
}: ReaderSidebarProps) {
  if (!tocHtml) return null;

  return (
    <aside
      className="hidden xl:block w-64 shrink-0 sticky top-[calc(var(--header-height)+52px)] max-h-[calc(100vh-var(--header-height)-60px)] overflow-y-auto pr-4"
      style={{ scrollbarWidth: 'thin' }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-2">
        On this page
      </h3>
      <TableOfContents content={tocHtml} />
    </aside>
  );
}
