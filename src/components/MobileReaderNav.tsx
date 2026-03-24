'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, List } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';

interface NavNode {
  href: string;
  title: string;
}

interface SectionNode {
  id: string;
  text: string;
}

interface MobileReaderNavProps {
  domainTitle: string;
  domainOptions?: NavNode[];
  currentTitle: string;
  currentHref?: string;
  chapters?: NavNode[];
  parent?: NavNode | null;
  prev?: NavNode | null;
  next?: NavNode | null;
  tocContentHtml?: string;
}

function extractSectionsFromHtml(html?: string): SectionNode[] {
  if (!html) return [];
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h2[id], h3[id]'));
    return headings
      .map((h) => ({ id: h.id, text: (h.textContent || '').trim() }))
      .filter((h) => !!h.id && !!h.text);
  } catch {
    return [];
  }
}

export default function MobileReaderNav({
  domainTitle,
  domainOptions = [],
  currentTitle,
  currentHref,
  chapters = [],
  parent,
  prev,
  next,
  tocContentHtml,
}: MobileReaderNavProps) {
  const [showDomainMenu, setShowDomainMenu] = useState(false);
  const [showChapterParent, setShowChapterParent] = useState(false);
  const [showSectionDrawer, setShowSectionDrawer] = useState(false);
  const [drawerView, setDrawerView] = useState<'toc' | 'chapters'>('toc');
  const [stage, setStage] = useState<0 | 1 | 2>(2); // 2: A+B+C, 1: B+C, 0: B only
  const [isNarrow, setIsNarrow] = useState(false);

  const sections = useMemo(() => extractSectionsFromHtml(tocContentHtml), [tocContentHtml]);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);

  const lastYRef = useRef(0);
  const downAccumRef = useRef(0);
  const upAccumRef = useRef(0);
  const THRESHOLD = 24;

  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 480);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mobile-reader-active', { detail: { active: true } }));

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastYRef.current;

      if (delta > 0) {
        downAccumRef.current += delta;
        upAccumRef.current = 0;
        if (downAccumRef.current > THRESHOLD) {
          setStage((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2) : 0));
          downAccumRef.current = 0;
        }
      } else if (delta < 0) {
        upAccumRef.current += Math.abs(delta);
        downAccumRef.current = 0;
        if (upAccumRef.current > THRESHOLD) {
          setStage((s) => (s < 2 ? ((s + 1) as 0 | 1 | 2) : 2));
          upAccumRef.current = 0;
        }
      }

      lastYRef.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.dispatchEvent(new CustomEvent('mobile-reader-active', { detail: { active: false } }));
    };
  }, []);

  useEffect(() => {
    if (!sections.length) return;
    const onScroll = () => {
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= 120) idx = i;
      }
      setCurrentSectionIdx(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  const currentChapterNumber = Math.max(1, chapters.findIndex((c) => c.href === currentHref) + 1);
  const prevSection = currentSectionIdx > 0 ? sections[currentSectionIdx - 1] : null;
  const nextSection = currentSectionIdx < sections.length - 1 ? sections[currentSectionIdx + 1] : null;
  const currentSection = sections[currentSectionIdx] || null;

  const goSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Layer A: Focus Domain (hidden on narrow + stage collapsed) */}
      {!isNarrow && stage >= 2 && (
        <div className="h-10 px-3 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800">
          <span className="font-semibold text-sm">◍</span>
          <button
            type="button"
            onClick={() => setShowDomainMenu((v) => !v)}
            className="text-sm font-medium text-gray-800 dark:text-gray-100 inline-flex items-center gap-1"
          >
            Domain: {domainTitle} <ChevronDown size={14} />
          </button>
          <div className="ml-auto text-xs text-gray-400">⋯</div>
        </div>
      )}
      {showDomainMenu && !isNarrow && domainOptions.length > 0 && (
        <div className="px-2 pb-2 space-y-1 border-b border-gray-100 dark:border-gray-800">
          {domainOptions.map((opt) => (
            <Link key={opt.href} href={opt.href} className="block px-2 py-1.5 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              {opt.title}
            </Link>
          ))}
        </div>
      )}

      {/* Layer B: Chapter Level (always available) */}
      <div className={`${isNarrow ? 'h-11' : 'h-12'} px-2 grid grid-cols-[36px_1fr_36px_36px] items-center gap-1 border-b border-gray-100 dark:border-gray-800`}>
        {prev ? (
          <Link href={prev.href} className="h-9 w-9 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Previous chapter">
            <ChevronLeft size={18} />
          </Link>
        ) : (
          <div className="h-9 w-9" />
        )}

        <div className="min-w-0 px-1 text-[13px] font-medium truncate inline-flex items-center gap-1">
          <span className="text-xs text-gray-500">({currentChapterNumber})</span>
          <span className="truncate">{currentTitle}</span>
          {parent && !isNarrow && (
            <button onClick={() => setShowChapterParent((v) => !v)} className="ml-1 text-gray-500">
              {showChapterParent ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>

        {next ? (
          <Link href={next.href} className="h-9 w-9 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Next chapter">
            <ChevronRight size={18} />
          </Link>
        ) : (
          <div className="h-9 w-9" />
        )}

        <button
          type="button"
          onClick={() => {
            setDrawerView('chapters');
            setShowSectionDrawer(true);
          }}
          className="h-9 w-9 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Open chapter selector"
        >
          <List size={16} />
        </button>
      </div>
      {showChapterParent && parent && !isNarrow && (
        <div className="px-2 pb-2 border-b border-gray-100 dark:border-gray-800">
          <Link href={parent.href} className="block px-2 py-1.5 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800">↑ {parent.title}</Link>
        </div>
      )}

      {/* Layer C: Section Level (collapsible; on narrow use drawer only) */}
      {!isNarrow && stage >= 1 && (
        <div className="h-9 px-2 grid grid-cols-[32px_1fr_32px_32px] items-center gap-1">
          {prevSection ? (
            <button onClick={() => goSection(prevSection.id)} className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Previous section">
              <ChevronLeft size={16} />
            </button>
          ) : (
            <div className="h-8 w-8" />
          )}

          <div className="min-w-0 px-1 text-xs font-medium truncate">{currentSection?.text || 'Section'}</div>

          {nextSection ? (
            <button onClick={() => goSection(nextSection.id)} className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Next section">
              <ChevronRight size={16} />
            </button>
          ) : (
            <div className="h-8 w-8" />
          )}

          <button
            type="button"
            onClick={() => {
              setDrawerView('toc');
              setShowSectionDrawer(true);
            }}
            className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Open section TOC"
          >
            <List size={14} />
          </button>
        </div>
      )}

      {/* Shared drawer for chapters + local TOC */}
      {showSectionDrawer && (
        <div className="fixed inset-0 z-50 bg-black/35" onClick={() => setShowSectionDrawer(false)}>
          <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] bg-white dark:bg-gray-900 rounded-t-2xl border-t border-gray-200 dark:border-gray-700 shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-gray-100">Navigate</span>
              <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => setShowSectionDrawer(false)}>Close</button>
            </div>
            <div className="px-3 pt-3 pb-1 flex gap-2 border-b border-gray-100 dark:border-gray-800">
              <button type="button" onClick={() => setDrawerView('chapters')} className={`px-3 py-1.5 rounded-md text-xs font-medium ${drawerView === 'chapters' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>Chapters</button>
              <button type="button" onClick={() => setDrawerView('toc')} className={`px-3 py-1.5 rounded-md text-xs font-medium ${drawerView === 'toc' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>Local TOC</button>
            </div>
            <div className="p-4">
              {drawerView === 'chapters' ? (
                <div className="space-y-1">
                  {chapters.length > 0 ? chapters.map((ch) => (
                    <Link key={ch.href} href={ch.href} onClick={() => setShowSectionDrawer(false)} className={`block px-2 py-1.5 rounded text-sm ${ch.href === currentHref ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                      {ch.title}
                    </Link>
                  )) : <div className="text-sm text-gray-500">No sibling chapters found.</div>}
                </div>
              ) : tocContentHtml ? (
                <TableOfContents content={tocContentHtml} onLinkClick={() => setShowSectionDrawer(false)} />
              ) : (
                <div className="text-sm text-gray-500">No local sections found.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
