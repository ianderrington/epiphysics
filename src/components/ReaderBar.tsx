'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronsUp, List, X } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';

export interface NavNode {
  href: string;
  title: string;
}

interface ReaderBarProps {
  parent?: NavNode | null;
  prev?: NavNode | null;
  next?: NavNode | null;
  chapters?: NavNode[];
  currentHref?: string;
  currentTitle?: string;
  tocHtml?: string;
}

export default function ReaderBar({
  parent,
  prev,
  next,
  chapters = [],
  currentHref,
  currentTitle,
  tocHtml,
}: ReaderBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'chapters' | 'toc'>('chapters');

  const hasChapters = chapters.length > 0;
  const hasToc = !!tocHtml;
  const hasAnything = parent || prev || next || hasChapters;

  if (!hasAnything) return null;

  return (
    <>
      {/* Top context bar — sits right below the header */}
      <nav
        className="w-full border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm"
        aria-label="Reader navigation"
      >
        <div className="max-w-[1120px] mx-auto flex items-center h-10 px-2 sm:px-4 gap-1">
          {/* Prev */}
          {prev ? (
            <Link
              href={prev.href}
              className="flex items-center gap-1 min-w-0 shrink text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title={prev.title}
            >
              <ChevronLeft size={15} className="shrink-0" />
              <span className="truncate hidden sm:inline max-w-[160px] lg:max-w-[220px]">{prev.title}</span>
            </Link>
          ) : (
            <div className="w-5" />
          )}

          {/* Center: parent ↑ + current title (clickable → drawer) */}
          <div className="flex-1 flex items-center justify-center gap-1.5 min-w-0">
            {parent && (
              <Link
                href={parent.href}
                className="flex items-center gap-0.5 text-xs text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title={`Up to ${parent.title}`}
              >
                <ChevronsUp size={13} className="shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-[140px]">{parent.title}</span>
              </Link>
            )}

            {parent && (hasChapters || hasToc) && (
              <span className="text-gray-300 dark:text-gray-600 text-xs">/</span>
            )}

            {(hasChapters || hasToc) && (
              <button
                type="button"
                onClick={() => {
                  setDrawerTab(hasChapters ? 'chapters' : 'toc');
                  setDrawerOpen(true);
                }}
                className="flex items-center gap-1 min-w-0 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Open navigation drawer"
              >
                <span className="truncate max-w-[120px] sm:max-w-[200px]">{currentTitle || 'Navigate'}</span>
                <List size={14} className="shrink-0 text-gray-400" />
              </button>
            )}
          </div>

          {/* Next */}
          {next ? (
            <Link
              href={next.href}
              className="flex items-center gap-1 min-w-0 shrink text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title={next.title}
            >
              <span className="truncate hidden sm:inline max-w-[160px] lg:max-w-[220px] text-right">{next.title}</span>
              <ChevronRight size={15} className="shrink-0" />
            </Link>
          ) : (
            <div className="w-5" />
          )}
        </div>
      </nav>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="absolute top-0 left-0 right-0 max-h-[70vh] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 shrink-0">
              <div className="flex gap-2">
                {hasChapters && (
                  <button
                    type="button"
                    onClick={() => setDrawerTab('chapters')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      drawerTab === 'chapters'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    Chapters
                  </button>
                )}
                {hasToc && (
                  <button
                    type="button"
                    onClick={() => setDrawerTab('toc')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      drawerTab === 'toc'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    On This Page
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer content */}
            <div className="overflow-y-auto p-4">
              {drawerTab === 'chapters' ? (
                <div className="space-y-0.5 max-w-xl mx-auto">
                  {chapters.map((ch) => {
                    const active = currentHref === ch.href;
                    return (
                      <Link
                        key={ch.href}
                        href={ch.href}
                        onClick={() => setDrawerOpen(false)}
                        className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                          active
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {ch.title}
                      </Link>
                    );
                  })}
                </div>
              ) : hasToc ? (
                <div className="max-w-xl mx-auto">
                  <TableOfContents content={tocHtml!} onLinkClick={() => setDrawerOpen(false)} />
                </div>
              ) : (
                <p className="text-sm text-gray-500">No headings on this page.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
