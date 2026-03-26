'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const PATH_COOKIE = 'ep_last_path';
const SCROLL_COOKIE = 'ep_last_scroll';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE}; samesite=lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export default function SiteResume() {
  const pathname = usePathname();
  const router = useRouter();
  // Track whether user arrived at '/' via internal client-side navigation (intentional)
  // vs. fresh page load (auto-resume should apply)
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    // Auto-return to last page only on a fresh load (not when user clicks Home intentionally)
    if (pathname === '/') {
      const cameFromInternal = prevPathname.current !== null;
      if (!cameFromInternal) {
        const lastPath = getCookie(PATH_COOKIE);
        if (lastPath && lastPath !== '/' && !lastPath.startsWith('/api')) {
          prevPathname.current = '/';
          router.replace(lastPath);
          return;
        }
      }
      // Intentional home nav — clear the last path so next fresh load starts at home
      prevPathname.current = '/';
    } else {
      prevPathname.current = pathname;
    }

    setCookie(PATH_COOKIE, pathname);

    const onScroll = () => {
      setCookie(SCROLL_COOKIE, String(Math.round(window.scrollY)));
      setCookie(PATH_COOKIE, pathname);
    };

    const t = window.setTimeout(onScroll, 250);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('beforeunload', onScroll);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('beforeunload', onScroll);
    };
  }, [pathname, router]);

  return null;
}
