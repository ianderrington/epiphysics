'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CornerUpLeft, List, Play } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';
import { toast } from 'react-hot-toast';

interface NavNode {
  href: string;
  title: string;
}

interface MobileReaderNavProps {
  currentTitle: string;
  currentHref?: string;
  chapters?: NavNode[];
  parent?: NavNode | null;
  prev?: NavNode | null;
  next?: NavNode | null;
  tocContentHtml?: string;
  ttsEnabled?: boolean;
}

export default function MobileReaderNav({
  currentTitle,
  currentHref,
  chapters = [],
  parent,
  prev,
  next,
  tocContentHtml,
  ttsEnabled = false,
}: MobileReaderNavProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [drawerView, setDrawerView] = useState<'toc' | 'chapters'>('toc');
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mobile-reader-active', { detail: { active: true } }));

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastYRef.current;
      if (delta > 6) setVisible(false);
      if (delta < -6) setVisible(true);
      lastYRef.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.dispatchEvent(new CustomEvent('mobile-reader-active', { detail: { active: false } }));
    };
  }, []);

  const handlePlay = () => {
    const attemptPlay = () => {
      const root = document.querySelector('.supernal-tts-widget') as HTMLElement | null;
      if (!root) return false;

      const candidate = root.querySelector(
        '[data-tts-action="play"], .supernal-tts-play-button, button[aria-label*="Play" i]'
      ) as HTMLButtonElement | null;

      if (candidate && !candidate.disabled) {
        candidate.click();
        return true;
      }
      return false;
    };

    if (attemptPlay()) {
      toast.success('Playing audio');
      return;
    }

    window.setTimeout(() => {
      if (attemptPlay()) toast.success('Playing audio');
      else toast('Audio player unavailable on this page');
    }, 300);
  };

  return (
    <>
      <div
        className={`md:hidden sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-transform duration-200 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="h-12 px-2.5 grid grid-cols-[40px_40px_1fr_40px_40px] items-center gap-1">
          {parent ? (
            <Link
              href={parent.href}
              className="h-10 w-10 rounded-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-[0.98]"
              aria-label={`Up to ${parent.title}`}
              title={`Up to ${parent.title}`}
            >
              <CornerUpLeft size={16} />
            </Link>
          ) : (
            <div className="h-10 w-10" />
          )}

          {prev ? (
            <Link
              href={prev.href}
              className="h-10 w-10 rounded-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-[0.98]"
              aria-label="Previous sibling"
              title="Previous sibling"
            >
              <ChevronLeft size={18} />
            </Link>
          ) : (
            <div className="h-10 w-10" />
          )}

          <button
            type="button"
            onClick={() => {
              setDrawerView(tocContentHtml ? 'toc' : 'chapters');
              setTocOpen(true);
            }}
            className="h-10 w-10 rounded-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-[0.98]"
            aria-label="Open navigation drawer"
            title="Navigation"
          >
            <List size={18} />
          </button>

          <div
            className="min-w-0 px-1.5 text-[13px] leading-tight font-medium text-gray-800 dark:text-gray-100 truncate"
            title={currentTitle}
            aria-current="page"
          >
            {currentTitle}
          </div>

          {next ? (
            <Link
              href={next.href}
              className="h-10 w-10 rounded-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-[0.98]"
              aria-label="Next sibling"
              title="Next sibling"
            >
              <ChevronRight size={18} />
            </Link>
          ) : (
            <div className="h-10 w-10" />
          )}


        </div>
      </div>

      {tocOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/35" onClick={() => setTocOpen(false)}>
          <div
            className="absolute top-16 left-2 right-2 max-h-[70vh] bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-gray-100">Navigate</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePlay}
                  disabled={!ttsEnabled}
                  className="h-8 w-8 rounded-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30"
                  aria-label="Play audio"
                  title={ttsEnabled ? 'Play audio' : 'Audio unavailable'}
                >
                  <Play size={15} />
                </button>
                <button
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setTocOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="px-3 pt-3 pb-1 border-b border-gray-100 dark:border-gray-800 flex gap-2">
              <button
                type="button"
                onClick={() => setDrawerView('toc')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium ${drawerView === 'toc' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
              >
                Local TOC
              </button>
              <button
                type="button"
                onClick={() => setDrawerView('chapters')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium ${drawerView === 'chapters' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
              >
                Chapters
              </button>
            </div>
            <div className="p-4">
              {drawerView === 'toc' ? (
                tocContentHtml ? (
                  <TableOfContents content={tocContentHtml} onLinkClick={() => setTocOpen(false)} />
                ) : (
                  <div className="text-sm text-gray-500">No local table of contents for this page.</div>
                )
              ) : (
                <div className="space-y-1">
                  {chapters.length > 0 ? chapters.map((ch) => {
                    const active = currentHref === ch.href;
                    return (
                      <Link
                        key={ch.href}
                        href={ch.href}
                        onClick={() => setTocOpen(false)}
                        className={`block px-3 py-2 rounded-md text-sm ${active ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                      >
                        {ch.title}
                      </Link>
                    );
                  }) : (
                    <div className="text-sm text-gray-500">No sibling chapters found.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
