'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

/* ── types ─────────────────────────────────────────────── */

export interface NavNode {
  href: string;
  title: string;
}

interface NavBarsProps {
  chapters?: NavNode[];
  currentChapterHref?: string;
  currentChapterTitle?: string;
  tocHtml?: string;
}

/* ── helpers ───────────────────────────────────────────── */

interface Heading { id: string; text: string; level: number; }

function extractHeadings(html: string): Heading[] {
  if (typeof window === 'undefined') return [];
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return Array.from(doc.querySelectorAll('h1,h2,h3,h4,h5,h6'))
      .map((el) => ({
        id: el.id.replace(/^user-content-/, ''),
        text: (el.textContent || '').trim(),
        level: parseInt(el.tagName[1]),
      }))
      .filter((h) => h.id && h.text);
  } catch { return []; }
}

const CHAPTER_H = 44;
const TOC_H = 36;

function getHeaderHeight(): number {
  if (typeof window === 'undefined') return 64;
  const v = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim();
  return parseFloat(v) * (v.endsWith('rem') ? 16 : 1) || 64;
}

/* shared bg — must match header exactly */
const BG = 'bg-white dark:bg-[#0a0f1a]';
const TRANSITION = 'transition-[top] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]';

/* ── main component ────────────────────────────────────── */

export default function NavBars({
  chapters = [],
  currentChapterHref,
  currentChapterTitle,
  tocHtml,
}: NavBarsProps) {
  const [expanded, setExpanded] = useState<null | 'chapters' | 'toc'>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  const [headerH, setHeaderH] = useState(64);

  useEffect(() => { setHeaderH(getHeaderHeight()); }, []);

  const toggle = useCallback((panel: 'chapters' | 'toc') => {
    setExpanded((prev) => (prev === panel ? null : panel));
  }, []);
  const close = useCallback(() => setExpanded(null), []);

  useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (chapterRef.current?.contains(t) || tocRef.current?.contains(t)) return;
      close();
    };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('keydown', esc); };
  }, [expanded, close]);

  useEffect(() => { close(); }, [currentChapterHref, close]);

  /* ── scroll state: 3 → 2 → 1 → 0 visible bars ── */
  const [showHeader, setShowHeader] = useState(true);
  const [showChapter, setShowChapter] = useState(true);
  const [showToc, setShowToc] = useState(true);
  const lastY = useRef(0);
  const scrollDelta = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const d = y - lastY.current;
      lastY.current = y;

      if ((d > 0 && scrollDelta.current < 0) || (d < 0 && scrollDelta.current > 0))
        scrollDelta.current = 0;
      scrollDelta.current += d;

      // down: header first, then chapter, then toc
      if (scrollDelta.current > 40) setShowHeader(false);
      if (scrollDelta.current > 100) setShowChapter(false);
      if (scrollDelta.current > 160) setShowToc(false);

      // up: toc first, then chapter, then header
      if (scrollDelta.current < -20) setShowToc(true);
      if (scrollDelta.current < -40) setShowChapter(true);
      if (scrollDelta.current < -60) setShowHeader(true);

      if (y < 80) {
        setShowHeader(true); setShowChapter(true); setShowToc(true);
        scrollDelta.current = 0;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // sync header wrapper
  useEffect(() => {
    const w = document.querySelector('.header-wrapper');
    if (!w) return;
    w.classList.toggle('nav-header-hidden', !showHeader);
    return () => { w.classList.remove('nav-header-hidden'); };
  }, [showHeader]);

  /*
   * Position math — pure `top` sliding, no opacity/translate tricks.
   *
   * Chapter bar top:
   *   visible:  headerH (below header) or 0 (header hidden)
   *   hidden:   -CHAPTER_H (slid off screen above)
   *
   * TOC bar top:
   *   visible:  chapterTop + CHAPTER_H  (below chapter)
   *             or chapterTop            (chapter hidden, TOC fills gap)
   *   hidden:   -TOC_H (slid off screen above)
   */
  const chapterShown = showChapter || expanded !== null;
  const tocShown = (showToc || expanded === 'toc') && expanded !== 'chapters';

  const chapterTop = chapterShown
    ? (showHeader ? headerH : 0)
    : -CHAPTER_H;

  const tocTop = tocShown
    ? (chapterShown
        ? (showHeader ? headerH : 0) + CHAPTER_H
        : (showHeader ? headerH : 0))
    : -TOC_H;

  /* ── TOC headings + scroll spy ── */
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState('');

  useEffect(() => { if (tocHtml) setHeadings(extractHeadings(tocHtml)); }, [tocHtml]);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) { setActiveHeadingId(e.target.id.replace(/^user-content-/, '')); break; } },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id) || document.getElementById(`user-content-${h.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const chapterIdx = chapters.findIndex((c) => c.href === currentChapterHref);
  const chapterPrev = chapterIdx > 0 ? chapters[chapterIdx - 1] : null;
  const chapterNext = chapterIdx >= 0 && chapterIdx < chapters.length - 1 ? chapters[chapterIdx + 1] : null;

  const activeIdx = headings.findIndex((h) => h.id === activeHeadingId);
  const headingPrev = activeIdx > 0 ? headings[activeIdx - 1] : null;
  const headingNext = activeIdx >= 0 && activeIdx < headings.length - 1 ? headings[activeIdx + 1] : null;
  const tocLabel = (headings.find((h) => h.id === activeHeadingId) || headings[0])?.text || '';

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id) || document.getElementById(`user-content-${id}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - (headerH + CHAPTER_H + TOC_H + 16);
      window.scrollTo({ top, behavior: 'smooth' });
      window.history.pushState({}, '', `#${id}`);
    }
  }, [headerH]);

  const hasChapters = chapters.length > 0;
  const hasHeadings = headings.length > 0;
  if (!hasChapters && !hasHeadings) return null;

  const spacerHeight = (hasChapters ? CHAPTER_H : 0) + (hasHeadings ? TOC_H : 0);
  const arrowCls = 'flex items-center justify-center shrink-0 h-full transition-colors text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 active:bg-black/5 dark:active:bg-white/5';

  /* only the bottom-most ON-SCREEN bar gets the heavier outer border */
  const chapterBorder = (!tocShown || expanded === 'chapters')
    ? 'border-b border-gray-200 dark:border-gray-800'
    : 'border-b border-gray-100 dark:border-white/[0.06]';

  return (
    <>
      <div style={{ height: spacerHeight }} aria-hidden />

      {/* ═══ CHAPTER BAR — slides via top only ═══ */}
      {hasChapters && (
        <div
          ref={chapterRef}
          className={`fixed left-0 right-0 z-30 ${TRANSITION}`}
          style={{ top: chapterTop }}
        >
          <div className={`${BG} ${chapterBorder}`}>
            <div className="max-w-[1120px] mx-auto flex items-center px-1" style={{ height: CHAPTER_H }}>
              {chapterPrev ? (
                <Link href={chapterPrev.href} className={`${arrowCls} w-11`} title={chapterPrev.title}>
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </Link>
              ) : <div className="w-11" />}

              <button
                type="button"
                onClick={() => toggle('chapters')}
                className="flex-1 flex items-center justify-center gap-1.5 min-w-0 h-full px-3
                           font-semibold text-[15px] text-gray-900 dark:text-gray-50
                           hover:text-blue-600 dark:hover:text-blue-400
                           active:bg-black/[0.03] dark:active:bg-white/[0.04]
                           transition-colors select-none"
              >
                <span className="truncate">{currentChapterTitle || 'Chapters'}</span>
                <ChevronDown size={15} strokeWidth={2.5}
                  className={`shrink-0 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${expanded === 'chapters' ? 'rotate-180' : ''}`}
                />
              </button>

              {chapterNext ? (
                <Link href={chapterNext.href} className={`${arrowCls} w-11`} title={chapterNext.title}>
                  <ChevronRight size={20} strokeWidth={2.5} />
                </Link>
              ) : <div className="w-11" />}
            </div>
          </div>

          {expanded === 'chapters' && (
            <div className={`${BG} border-b border-gray-200 dark:border-gray-800 max-h-[65vh] overflow-y-auto overscroll-contain`}>
              <div className="max-w-[600px] mx-auto py-1.5 px-2">
                {chapters.map((c) => (
                  <Link key={c.href} href={c.href} onClick={close}
                    className={`block px-4 py-3 rounded-lg text-[15px] transition-colors ${
                      c.href === currentChapterHref
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 font-semibold'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/[0.04]'
                    }`}
                  >{c.title}</Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ TOC BAR — slides via top only ═══ */}
      {hasHeadings && (
        <div
          ref={tocRef}
          className={`fixed left-0 right-0 z-[29] ${TRANSITION}`}
          style={{ top: tocTop }}
        >
          <div className={`${BG} border-b border-gray-200 dark:border-gray-800`}>
            <div className="max-w-[1120px] mx-auto flex items-center px-1" style={{ height: TOC_H }}>
              {headingPrev ? (
                <button type="button" onClick={() => scrollTo(headingPrev.id)} className={`${arrowCls} w-10`} title={headingPrev.text}>
                  <ChevronLeft size={16} strokeWidth={2.5} />
                </button>
              ) : <div className="w-10" />}

              <button
                type="button"
                onClick={() => toggle('toc')}
                className="flex-1 flex items-center justify-center gap-1 min-w-0 h-full px-3
                           text-[13px] text-gray-500 dark:text-gray-400
                           hover:text-blue-600 dark:hover:text-blue-400
                           active:bg-black/[0.03] dark:active:bg-white/[0.04]
                           transition-colors select-none"
              >
                <span className="truncate">{tocLabel || 'On this page'}</span>
                <ChevronDown size={12} strokeWidth={2.5}
                  className={`shrink-0 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${expanded === 'toc' ? 'rotate-180' : ''}`}
                />
              </button>

              {headingNext ? (
                <button type="button" onClick={() => scrollTo(headingNext.id)} className={`${arrowCls} w-10`} title={headingNext.text}>
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>
              ) : <div className="w-10" />}
            </div>
          </div>

          {expanded === 'toc' && (
            <div className={`${BG} border-b border-gray-200 dark:border-gray-800 max-h-[60vh] overflow-y-auto overscroll-contain`}>
              <div className="max-w-[600px] mx-auto py-1.5 px-2">
                {headings.map((h) => (
                  <button key={h.id} type="button"
                    onClick={() => { scrollTo(h.id); close(); }}
                    className={`block w-full text-left rounded-lg text-[15px] py-2.5 transition-colors ${
                      h.id === activeHeadingId
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 font-semibold'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/[0.04]'
                    }`}
                    style={{ paddingLeft: `${Math.max(0, h.level - 1) * 16 + 16}px` }}
                  >{h.text}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {expanded && (
        <div className="fixed inset-0 bg-black/10 dark:bg-black/30 z-[28] animate-fadeIn" onClick={close} />
      )}
    </>
  );
}
