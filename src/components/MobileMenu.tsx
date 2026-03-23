'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import ThemeToggle from './ThemeToggle';
import { BlogContext } from '@/app/providers';

interface MobileMenuProps {
  sections: Array<{
    id: string;
    title: string;
  }>;
  externalLinks?: Array<{
    title: string;
    href: string;
  }>;
}

const FONT_KEY = 'epiphysics-font-size';
const FONT_SIZES = [1.05, 1.2, 1.35, 1.5];
const FONT_STYLE_ID = 'ep-fontsize';

function readFontIdx(): number {
  try {
    const value = localStorage.getItem(FONT_KEY);
    if (value !== null) {
      const idx = parseInt(value, 10);
      if (idx >= 0 && idx < FONT_SIZES.length) return idx;
    }
  } catch {}
  return 1;
}

function applyFontSize(idx: number) {
  if (typeof document === 'undefined') return;
  let el = document.getElementById(FONT_STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = FONT_STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = `.post-content,.prose,.prose-lg,.prose-base{font-size:${FONT_SIZES[idx]}rem!important}`;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ sections, externalLinks = [] }) => {
  const { isOpen, closeMenu, isMobile } = useMobileMenu();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { posts } = React.useContext(BlogContext);
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({});
  const [fontIdx, setFontIdx] = useState(1);

  // Get current section from pathname
  const currentSection = pathname?.split('/')[1];

  // Auto-expand current section for quicker subsection access
  useEffect(() => {
    if (!currentSection) return;
    setExpandedSections(prev => ({ ...prev, [currentSection]: true }));
  }, [currentSection]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getSectionChildren = (sectionId: string): Array<{ href: string; title: string }> => {
    if (!posts?.length) return [];

    const normalized = posts
      .map((p: any) => ({
        slug: p?.slug as string | undefined,
        title: (p?.metadata?.title || p?.title || '') as string,
      }))
      .filter((p: any) => typeof p.slug === 'string' && p.slug.length > 0) as Array<{ slug: string; title: string }>;

    const inSection = normalized.filter((p) => p.slug.startsWith(`${sectionId}/`));

    const directDocs = inSection
      .filter((p) => {
        const rel = p.slug.slice(sectionId.length + 1);
        return rel && !rel.includes('/') && rel !== 'index';
      })
      .map((p) => ({ href: `/${p.slug}`, title: p.title }));

    const folderNames = new Set<string>();
    inSection.forEach((p) => {
      const rel = p.slug.slice(sectionId.length + 1);
      if (!rel || rel === 'index') return;
      const first = rel.split('/')[0];
      if (first && first !== 'index') folderNames.add(first);
    });

    const folderItems = Array.from(folderNames)
      .filter((name) => !directDocs.find((d) => d.href === `/${sectionId}/${name}`))
      .map((name) => {
        const exact = inSection.find((p) => p.slug === `${sectionId}/${name}`);
        const indexLike = inSection.find((p) => p.slug === `${sectionId}/${name}/index`);
        return {
          href: `/${sectionId}/${name}`,
          title: exact?.title || indexLike?.title || name.replace(/[-_]/g, ' '),
        };
      });

    return [...directDocs, ...folderItems]
      .filter((item) => item.href !== `/${sectionId}`)
      .sort((a, b) => a.title.localeCompare(b.title));
  };

  useEffect(() => {
    if (!isMobile) return;
    const idx = readFontIdx();
    setFontIdx(idx);
    applyFontSize(idx);
  }, [isMobile]);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Focus trap
  useEffect(() => {
    if (isOpen && isMobile) {
      const menu = menuRef.current;
      if (!menu) {
        return;
      }

      const focusableElements = menu.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      };

      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeMenu();
        }
      };

      document.addEventListener('keydown', handleTabKey);
      document.addEventListener('keydown', handleEscapeKey);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTabKey);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, isMobile, closeMenu]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      closeMenu();
    }
  };

  const changeFontSize = (delta: number) => {
    const next = Math.max(0, Math.min(FONT_SIZES.length - 1, fontIdx + delta));
    setFontIdx(next);
    applyFontSize(next);
    try {
      localStorage.setItem(FONT_KEY, String(next));
    } catch {}
  };

  // Only render on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        ref={overlayRef}
        className={`
          fixed inset-0 bg-black z-[9998]
          transition-opacity duration-300 ease-in-out
          ${isOpen
            ? 'opacity-50 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          }
        `}
        onClick={handleOverlayClick}
        aria-hidden={!isOpen}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw]
          bg-white dark:bg-gray-900 z-[9999]
          shadow-xl border-l border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 id="mobile-menu-title" className="text-lg font-semibold text-gray-900 dark:text-white">
            Navigation
          </h2>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 space-y-2">
            {sections.map((section) => {
              const isActive = currentSection === section.id;
              const children = getSectionChildren(section.id);
              const isExpanded = !!expandedSections[section.id];

              return (
                <div key={section.id} className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/${section.id}`}
                      className={`
                        flex-1 px-4 py-3 rounded-lg text-base font-medium
                        transition-colors duration-200
                        ${isActive
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                        }
                      `}
                      onClick={closeMenu}
                    >
                      {section.title}
                    </Link>

                    {children.length > 0 && (
                      <button
                        type="button"
                        onClick={() => toggleSection(section.id)}
                        className="px-3 py-3 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        aria-label={isExpanded ? `Collapse ${section.title}` : `Expand ${section.title}`}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </button>
                    )}
                  </div>

                  {children.length > 0 && isExpanded && (
                    <div className="ml-3 mt-1 mb-2 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3">
                      {children.map((child) => {
                        const childActive = pathname === child.href || pathname?.startsWith(`${child.href}/`);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMenu}
                            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                              childActive
                                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                            }`}
                          >
                            • {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={closeMenu}
              >
                {link.title} ↗
              </a>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Text size</span>
            <div className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <button
                type="button"
                onClick={() => changeFontSize(-1)}
                disabled={fontIdx === 0}
                className="px-3 py-1 text-lg font-semibold text-gray-700 dark:text-gray-200 disabled:opacity-40"
                aria-label="Smaller text"
              >−</button>
              <button
                type="button"
                onClick={() => changeFontSize(1)}
                disabled={fontIdx === FONT_SIZES.length - 1}
                className="px-3 py-1 text-lg font-semibold text-gray-700 dark:text-gray-200 disabled:opacity-40 border-l border-gray-300 dark:border-gray-600"
                aria-label="Larger text"
              >+</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
