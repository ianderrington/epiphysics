'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface ReadingMemoryProps {
  slug: string;
  contentHash?: string;
  compact?: boolean;
}

type ReadingStats = {
  visits: number;
  totalReadMs: number;
  lastScrollY: number;
  lastProgress: number;
  lastSeenAt: number;
  contentHash?: string;
  updated?: boolean;
};

const KEY_PREFIX = 'ep-read-memory:';
const PATH_COOKIE = 'ep_last_path';
const SCROLL_COOKIE = 'ep_last_scroll';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function loadStats(slug: string): ReadingStats {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}${slug}`);
    if (!raw) {
      return { visits: 0, totalReadMs: 0, lastScrollY: 0, lastProgress: 0, lastSeenAt: Date.now() };
    }
    const parsed = JSON.parse(raw) as Partial<ReadingStats>;
    return {
      visits: parsed.visits ?? 0,
      totalReadMs: parsed.totalReadMs ?? 0,
      lastScrollY: parsed.lastScrollY ?? 0,
      lastProgress: parsed.lastProgress ?? 0,
      lastSeenAt: parsed.lastSeenAt ?? Date.now(),
      contentHash: parsed.contentHash,
      updated: parsed.updated ?? false,
    };
  } catch {
    return { visits: 0, totalReadMs: 0, lastScrollY: 0, lastProgress: 0, lastSeenAt: Date.now() };
  }
}

function saveStats(slug: string, stats: ReadingStats) {
  try { localStorage.setItem(`${KEY_PREFIX}${slug}`, JSON.stringify(stats)); } catch {}
}

function getProgressPercent(): number {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.max(0, Math.min(100, (window.scrollY / max) * 100));
}

export default function ReadingMemory({ slug, contentHash, compact = true }: ReadingMemoryProps) {
  const [stats, setStats] = useState<ReadingStats | null>(null);
  const lastTickRef = useRef<number>(Date.now());
  const didAutoResumeRef = useRef(false);

  useEffect(() => {
    const current = loadStats(slug);
    const changed = !!contentHash && !!current.contentHash && current.contentHash !== contentHash;

    const next: ReadingStats = {
      ...current,
      visits: current.visits + 1,
      lastSeenAt: Date.now(),
      updated: changed,
      contentHash: contentHash ?? current.contentHash,
      ...(changed ? { lastScrollY: 0, lastProgress: 0 } : {}),
    };

    saveStats(slug, next);
    setStats(next);
  }, [slug, contentHash]);

  useEffect(() => {
    if (!stats || didAutoResumeRef.current) return;
    const lastPath = getCookie(PATH_COOKIE);
    const lastScroll = Number(getCookie(SCROLL_COOKIE) || '0');
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    if (lastPath === currentPath && lastScroll > 100) {
      didAutoResumeRef.current = true;
      window.setTimeout(() => {
        window.scrollTo({ top: lastScroll, behavior: 'smooth' });
      }, 180);
    }
  }, [stats]);

  useEffect(() => {
    if (!stats) return;

    const onScroll = () => {
      const progress = getProgressPercent();
      setStats(prev => {
        if (!prev) return prev;
        const next = { ...prev, lastScrollY: window.scrollY, lastProgress: progress, lastSeenAt: Date.now() };
        saveStats(slug, next);
        return next;
      });
    };

    const tick = window.setInterval(() => {
      if (document.hidden) return;
      const now = Date.now();
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;
      setStats(prev => {
        if (!prev) return prev;
        const next = { ...prev, totalReadMs: prev.totalReadMs + Math.max(0, Math.min(delta, 15000)), lastSeenAt: now };
        saveStats(slug, next);
        return next;
      });
    }, 5000);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(tick);
    };
  }, [slug, stats]);

  const readMinutes = useMemo(() => {
    if (!stats) return 0;
    return Math.round(stats.totalReadMs / 60000);
  }, [stats]);

  if (!stats) return null;

  const resume = () => window.scrollTo({ top: stats.lastScrollY || 0, behavior: 'smooth' });
  const restart = () => {
    const next = { ...stats, lastScrollY: 0, lastProgress: 0, updated: false, lastSeenAt: Date.now() };
    setStats(next);
    saveStats(slug, next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50/65 dark:bg-gray-800/35 ${compact ? 'p-2 text-[11px]' : 'p-3 text-xs'}`}>
      <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
        <span>Read {Math.round(stats.lastProgress)}/100%</span>
        <span>{stats.visits} visits</span>
      </div>
      <div className="mt-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
        <div className="h-full bg-blue-500/75" style={{ width: `${Math.round(stats.lastProgress)}%` }} />
      </div>
      <div className="mt-1 flex items-center justify-between text-gray-500 dark:text-gray-400">
        <span>{readMinutes} min read</span>
        {stats.updated ? <span className="text-amber-600 dark:text-amber-400">updated</span> : <span>saved</span>}
      </div>
      <div className="mt-2 flex gap-1.5 items-center">
        <button onClick={resume} className="flex-1 rounded bg-white/80 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 px-2 py-1">Resume</button>
        <button
          onClick={restart}
          className="rounded bg-white/80 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 p-1.5"
          aria-label="Restart from top"
          title="Restart"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
}
