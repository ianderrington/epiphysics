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
    return headings.map((h) => ({
      id: h.id,
      text: (h.textContent || '').trim(),
    })).filter(h => !!h.id && !!h.text);
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
  const [showSectionParent, setShowSectionParent] = useState(false);
  const [visibleRows, setVisibleRows] = useState<0 | 1 | 2>(2); // 2: all, 1: row2+row3, 0: row3 only

  const sections = useMemo(() => extractSectionsFromHtml(tocContentHtml), [tocContentHtml]);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);

  const lastYRef = useRef(0);
  const downAccumRef = useRef(0);
  const upAccumRef = useRef(0);
  const THRESHOLD = 24;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mobile-reader-active', { detail: { active: true } }));
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastYRef.current;

      if (delta > 0) {
        downAccumRef.current += delta;
        upAccumRef.current = 0;
        if (downAccumRef.current > THRESHOLD) {
          setVisibleRows((v) => (v > 0 ? ((v - 1) as 0 | 1 | 2) : 0));
          downAccumRef.current = 0;
        }
      } else if (delta < 0) {
        upAccumRef.current += Math.abs(delta);
        downAccumRef.current = 0;
        if (upAccumRef.current > THRESHOLD) {
          setVisibleRows((v) => (v < 2 ? ((v + 1) as 0 | 1 | 2) : 2));
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

  // Track current section by scroll position
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

  const currentChapterNumber = Math.max(1, chapters.findIndex(c => c.href === currentHref) + 1);

  const prevSection = currentSectionIdx > 0 ? sections[currentSectionIdx - 1] : null;
  const nextSection = currentSectionIdx < sections.length - 1 ? sections[currentSectionIdx + 1] : null;
  const currentSection = sections[currentSectionIdx] || null;

  const goSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="md:hidden sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Row A: Domain */}
      <div className={`transition-all duration-200 overflow-hidden ${visibleRows >= 2 ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="h-11 px-2.5 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800">
          <span className="font-semibold text-sm">◍</span>
          <button
            type="button"
            onClick={() => setShowDomainMenu(v => !v)}
            className="text-sm font-medium text-gray-800 dark:text-gray-100 inline-flex items-center gap-1"
          >
            Domain: {domainTitle} <ChevronDown size={14} />
          </button>
          <div className="ml-auto text-xs text-gray-400">⋯</div>
        </div>
        {showDomainMenu && domainOptions.length > 0 && (
          <div className="px-2 pb-2 space-y-1">
            {domainOptions.map(opt => (
              <Link key={opt.href} href={opt.href} className="block px-2 py-1.5 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                {opt.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Row B: Chapter */}
      <div className={`transition-all duration-200 overflow-hidden ${visibleRows >= 1 ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="h-11 px-1.5 grid grid-cols-[36px_1fr_36px] items-center border-b border-gray-100 dark:border-gray-800">
          {prev ? <Link href={prev.href} className="h-9 w-9 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"><ChevronLeft size={18} /></Link> : <div className="h-9 w-9" />}
          <div className="min-w-0 px-1 text-[13px] font-medium truncate inline-flex items-center gap-1">
            <span className="text-xs text-gray-500">({currentChapterNumber})</span>
            <span className="truncate">{currentTitle}</span>
            {parent && (
              <button onClick={() => setShowChapterParent(v => !v)} className="ml-1 text-gray-500">{showChapterParent ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>
            )}
          </div>
          {next ? <Link href={next.href} className="h-9 w-9 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"><ChevronRight size={18} /></Link> : <div className="h-9 w-9" />}
        </div>
        {showChapterParent && parent && (
          <div className="px-2 pb-2">
            <Link href={parent.href} className="block px-2 py-1.5 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800">↑ {parent.title}</Link>
          </div>
        )}
      </div>

      {/* Row C: Section (always sticky/visible in compact mode) */}
      <div className="h-11 px-1.5 grid grid-cols-[36px_1fr_36px] items-center">
        {prevSection ? <button onClick={() => goSection(prevSection.id)} className="h-9 w-9 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"><ChevronLeft size={18} /></button> : <div className="h-9 w-9" />}
        <div className="min-w-0 px-1 text-[13px] font-medium truncate inline-flex items-center gap-1">
          <button onClick={() => setShowSectionParent(v => !v)} className="text-gray-500"><List size={14} /></button>
          <span className="truncate">{currentSection?.text || 'Section'}</span>
          <span className="text-xs text-gray-500 ml-1">{sections.length ? `${Math.round(((currentSectionIdx + 1) / sections.length) * 100)}%` : ''}</span>
        </div>
        {nextSection ? <button onClick={() => goSection(nextSection.id)} className="h-9 w-9 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"><ChevronRight size={18} /></button> : <div className="h-9 w-9" />}
      </div>

      {showSectionParent && (
        <div className="px-2 pb-2 border-t border-gray-100 dark:border-gray-800 max-h-[45vh] overflow-y-auto">
          <div className="text-xs uppercase tracking-wide text-gray-500 px-2 py-1">Local TOC</div>
          {tocContentHtml ? (
            <TableOfContents content={tocContentHtml} onLinkClick={() => setShowSectionParent(false)} />
          ) : (
            <div className="text-sm text-gray-500 px-2 py-1">No local sections found.</div>
          )}
          <div className="text-xs uppercase tracking-wide text-gray-500 px-2 py-2">Chapters</div>
          <div className="space-y-1 pb-1">
            {chapters.map(ch => (
              <Link
                key={ch.href}
                href={ch.href}
                onClick={() => setShowSectionParent(false)}
                className={`block px-2 py-1.5 rounded text-sm ${ch.href === currentHref ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                {ch.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
