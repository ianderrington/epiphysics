'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

interface ReadingMemoryProps {
  slug: string;
}

type ReadingStats = {
  visits: number;
  totalReadMs: number;
  lastScrollY: number;
  lastProgress: number;
  lastSeenAt: number;
};

const KEY_PREFIX = 'ep-read-memory:';

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
    };
  } catch {
    return { visits: 0, totalReadMs: 0, lastScrollY: 0, lastProgress: 0, lastSeenAt: Date.now() };
  }
}

function saveStats(slug: string, stats: ReadingStats) {
  try {
    localStorage.setItem(`${KEY_PREFIX}${slug}`, JSON.stringify(stats));
  } catch {}
}

function getProgressPercent(): number {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.max(0, Math.min(100, (window.scrollY / max) * 100));
}

export default function ReadingMemory({ slug }: ReadingMemoryProps) {
  const [stats, setStats] = useState<ReadingStats | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const readingStartRef = useRef<number>(Date.now());
  const lastTickRef = useRef<number>(Date.now());

  useEffect(() => {
    const current = loadStats(slug);
    current.visits += 1;
    current.lastSeenAt = Date.now();
    saveStats(slug, current);
    setStats(current);

    const autoCollapse = window.setTimeout(() => setCollapsed(true), 5000);
    return () => window.clearTimeout(autoCollapse);
  }, [slug]);

  useEffect(() => {
    if (!stats) return;

    const onScroll = () => {
      const progress = getProgressPercent();
      setStats(prev => {
        if (!prev) return prev;
        const next = {
          ...prev,
          lastScrollY: window.scrollY,
          lastProgress: progress,
          lastSeenAt: Date.now(),
        };
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
        const next = {
          ...prev,
          totalReadMs: prev.totalReadMs + Math.max(0, Math.min(delta, 15000)),
          lastSeenAt: now,
        };
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

  const resume = () => {
    window.scrollTo({ top: stats.lastScrollY || 0, behavior: 'smooth' });
  };

  const restart = () => {
    const next = { ...stats, lastScrollY: 0, lastProgress: 0, lastSeenAt: Date.now() };
    setStats(next);
    saveStats(slug, next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-4 left-4 z-40 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 px-3 py-2 text-xs text-gray-700 dark:text-gray-200 shadow"
        aria-label="Show reading memory"
      >
        {Math.round(stats.lastProgress)}% read
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 w-64 rounded-lg bg-white/95 dark:bg-gray-800/95 border border-gray-300 dark:border-gray-600 shadow p-3 text-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-800 dark:text-gray-100">Reading memory</span>
        <button onClick={() => setCollapsed(true)} className="text-gray-500">✕</button>
      </div>

      <div className="text-gray-700 dark:text-gray-200 mb-2">
        <div>Progress: <strong>{Math.round(stats.lastProgress)}%</strong></div>
        <div>Visits: <strong>{stats.visits}</strong></div>
        <div>Read time: <strong>{readMinutes} min</strong></div>
      </div>

      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded mb-2 overflow-hidden">
        <div className="h-full bg-blue-500" style={{ width: `${Math.round(stats.lastProgress)}%` }} />
      </div>

      <div className="flex gap-2">
        <button onClick={resume} className="flex-1 px-2 py-1 rounded bg-blue-600 text-white">Resume</button>
        <button onClick={restart} className="flex-1 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">Restart</button>
      </div>
    </div>
  );
}
