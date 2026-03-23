'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);
  const upCountRef = useRef(0);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mobile-reader-active', { detail: { active: true } }));

    const emitStage = (showTopNav: boolean) => {
      window.dispatchEvent(new CustomEvent('mobile-reader-nav-stage', { detail: { showTopNav } }));
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastYRef.current;

      if (delta > 6) {
        setVisible(false);
        upCountRef.current = 0;
        emitStage(false);
      } else if (delta < -6) {
        if (upCountRef.current === 0) {
          setVisible(true);
          emitStage(false);
          upCountRef.current = 1;
        } else {
          setVisible(true);
          emitStage(true);
          upCountRef.current = 2;
        }
      }

      lastYRef.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.dispatchEvent(new CustomEvent('mobile-reader-active', { detail: { active: false } }));
      window.dispatchEvent(new CustomEvent('mobile-reader-nav-stage', { detail: { showTopNav: true } }));
    };
  }, []);

  const leftTarget = prev || parent || null;

  return (
    <>
      <div className={`md:hidden sticky top-16 z-30 px-2 pt-2 transition-transform duration-200 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="bg-white/92 dark:bg-gray-900/92 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm px-1 py-1 grid grid-cols-[42px_42px_1fr_42px] items-center gap-1">
          {leftTarget ? (
            <Link href={leftTarget.href} className="h-9 w-9 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              <ChevronLeft size={20} />
            </Link>
          ) : (
            <div className="h-9 w-9" />
          )}

          <button
            type="button"
            onClick={() => setTocOpen(true)}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Open chapter drawer"
          >
            <List size={20} />
          </button>

          <div className="min-w-0 px-1 text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
            {currentTitle}
          </div>

          {next ? (
            <Link href={next.href} className="h-9 w-9 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-200 justify-self-end hover:bg-gray-100 dark:hover:bg-gray-800">
              <ChevronRight size={20} />
            </Link>
          ) : (
            <div className="h-9 w-9 justify-self-end" />
          )}
        </div>
      </div>

      {tocOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/35" onClick={() => setTocOpen(false)}>
          <div
            className="absolute top-16 left-2 right-2 max-h-[70vh] bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-gray-100">TOC</span>
              <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setTocOpen(false)}>Close</button>
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
