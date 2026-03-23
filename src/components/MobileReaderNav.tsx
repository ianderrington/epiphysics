'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';

interface NavNode {
  href: string;
  title: string;
}

interface MobileReaderNavProps {
  currentTitle: string;
  parent?: NavNode | null;
  prev?: NavNode | null;
  next?: NavNode | null;
  tocContentHtml?: string;
}

export default function MobileReaderNav({
  currentTitle,
  parent,
  prev,
  next,
  tocContentHtml,
}: MobileReaderNavProps) {
  const [tocOpen, setTocOpen] = useState(false);

  const leftTarget = prev || parent || null;

  return (
    <>
      <div className="md:hidden sticky top-16 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="px-2 py-1.5 grid grid-cols-[44px_44px_1fr_44px] items-center gap-1">
          {leftTarget ? (
            <Link href={leftTarget.href} className="h-10 w-10 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-200">
              <ChevronLeft size={20} />
            </Link>
          ) : (
            <div className="h-10 w-10" />
          )}

          <button
            type="button"
            onClick={() => setTocOpen(true)}
            className="h-10 w-10 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-200"
            aria-label="Open chapter drawer"
          >
            <List size={20} />
          </button>

          <div className="min-w-0 px-1 text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
            {currentTitle}
          </div>

          {next ? (
            <Link href={next.href} className="h-10 w-10 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-200 justify-self-end">
              <ChevronRight size={20} />
            </Link>
          ) : (
            <div className="h-10 w-10 justify-self-end" />
          )}
        </div>
      </div>

      {tocOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setTocOpen(false)}>
          <div
            className="absolute top-0 left-0 right-0 max-h-[72vh] bg-white dark:bg-gray-900 rounded-b-2xl border-b border-gray-200 dark:border-gray-700 shadow-xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-gray-100">Chapter Drawer</span>
              <button className="text-sm text-gray-500" onClick={() => setTocOpen(false)}>Close</button>
            </div>
            <div className="p-4">
              {tocContentHtml ? (
                <TableOfContents content={tocContentHtml} onLinkClick={() => setTocOpen(false)} />
              ) : (
                <div className="text-sm text-gray-500">No table of contents for this page.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
