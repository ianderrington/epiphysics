'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BlogContext } from '@/app/providers';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';
import { QRCodeSVG } from 'qrcode.react';
import { Search, QrCode, Menu, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useMobileMenu } from '@/contexts/MobileMenuContext';

interface HeaderProps {
  sections: Array<{
    id: string;
    title: string;
  }>;
  externalLinks?: Array<{
    title: string;
    href: string;
  }>;
  onMenuToggle?: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sections, externalLinks = [], onMenuToggle }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { posts } = React.useContext(BlogContext);
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [subNavItems, setSubNavItems] = useState<Array<{ href: string; title: string }>>([]);
  const [showSubNav, setShowSubNav] = useState(true);
  const [showMobileTopNav, setShowMobileTopNav] = useState(true);
  const [mobileReaderActive, setMobileReaderActive] = useState(false);
  const lastScrollYRef = useRef(0);
  const upScrollCountRef = useRef(0);
  const { isOpen, toggleMenu, closeMenu, isMobile } = useMobileMenu();

  // Set mounted state for portal rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get current section from pathname
  const currentSection = pathname?.split('/')[1];

  // Set current URL - update whenever pathname changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [pathname]);

  // Build subsection nav (auto-generated from loaded content context)
  useEffect(() => {
    if (!currentSection || !isMounted || !posts?.length) {
      setSubNavItems([]);
      return;
    }

    try {
      const normalized = posts
        .map((p: any) => ({
          slug: p?.slug as string | undefined,
          title: (p?.metadata?.title || p?.title || '') as string,
        }))
        .filter((p: any) => typeof p.slug === 'string' && p.slug.length > 0) as Array<{ slug: string; title: string }>;

      const inSection = normalized.filter((p) => p.slug.startsWith(`${currentSection}/`));
      const directDocs = inSection.filter((p) => {
        const rel = p.slug.slice(currentSection.length + 1);
        return rel && !rel.includes('/') && rel !== 'index';
      });

      const folderNames = new Set<string>();
      inSection.forEach((p) => {
        const rel = p.slug.slice(currentSection.length + 1);
        if (!rel || rel === 'index') return;
        const first = rel.split('/')[0];
        if (first && first !== 'index') folderNames.add(first);
      });

      const folderItems = Array.from(folderNames)
        .filter((name) => !directDocs.find((d) => d.slug === `${currentSection}/${name}`))
        .map((name) => {
          const exact = inSection.find((p) => p.slug === `${currentSection}/${name}`);
          const indexLike = inSection.find((p) => p.slug === `${currentSection}/${name}/index`);
          return {
            href: `/${currentSection}/${name}`,
            title: exact?.title || indexLike?.title || name.replace(/[-_]/g, ' '),
          };
        });

      const docItems = directDocs.map((d) => ({
        href: `/${d.slug}`,
        title: d.title,
      }));

      const merged = [...docItems, ...folderItems]
        .filter((item) => item.href !== `/${currentSection}`)
        .sort((a, b) => a.title.localeCompare(b.title));

      setSubNavItems(merged);
    } catch {
      setSubNavItems([]);
    }
  }, [currentSection, isMounted, posts]);

  // Mobile: hide subsection row on downward scroll; show after two upward scroll intents
  useEffect(() => {
    if (!isMobile) return;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollYRef.current;

      if (delta > 6) {
        upScrollCountRef.current = 0;
        setShowSubNav(false);
      } else if (delta < -6) {
        upScrollCountRef.current += 1;
        if (upScrollCountRef.current >= 2) {
          setShowSubNav(true);
        }
      }

      lastScrollYRef.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  // Close modals when route changes and notify parent
  React.useEffect(() => {
    setShowQRCode(false);
    setShowSearch(false);
    onMenuToggle?.(false);
  }, [pathname, onMenuToggle]);

  // Notify parent when mobile menu state changes
  useEffect(() => {
    onMenuToggle?.(isOpen);
  }, [isOpen, onMenuToggle]);

  // Reset subsection row visibility on navigation
  useEffect(() => {
    setShowSubNav(true);
    upScrollCountRef.current = 0;
  }, [pathname]);

  // Reader mode signal from mobile reader nav
  useEffect(() => {
    const activeHandler = (event: Event) => {
      const e = event as CustomEvent<{ active?: boolean }>;
      const active = !!e.detail?.active;
      setMobileReaderActive(active);
      setShowMobileTopNav(!active);
    };
    window.addEventListener('mobile-reader-active', activeHandler as EventListener);
    return () => window.removeEventListener('mobile-reader-active', activeHandler as EventListener);
  }, []);

  // Add keyboard event handler for ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowQRCode(false);
        setShowSearch(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQRCodeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQRCode(true);
    setShowSearch(false);
    closeMenu();
  };
  
  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setShowSearch(true);
    setShowQRCode(false);
    closeMenu();
  };

  const handleMenuButtonClick = () => {
    setShowQRCode(false);
    setShowSearch(false);
    toggleMenu();
  };

  // QR Code Modal Component
  const QRCodeModal = () => {
    if (!showQRCode) return null;
    
    // Get page title from document or fallback to derived title from URL
    const getPageTitle = () => {
      if (typeof document !== 'undefined' && document.title) {
        return document.title;
      }
      // Extract title from pathname as fallback
      const path = pathname || '';
      if (path === '/') return 'Home';
      const segment = path.split('/').pop() || '';
      return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    };
    
    // Ensure we have a valid URL
    const qrCodeUrl = currentUrl || (typeof window !== 'undefined' ? window.location.href : '');
    
    return (
      <div 
        className="mobile-qr-popup active" 
        onClick={(e) => {
          e.stopPropagation();
          setShowQRCode(false);
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-code-title"
      >
        <div 
          className="qr-content"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
        >
          <button 
            className="qr-close-button"
            onClick={() => setShowQRCode(false)}
            aria-label="Close QR code"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
          <h3 id="qr-code-title">Scan to visit</h3>
          {qrCodeUrl && (
            <>
              <div className="qr-container">
                <QRCodeSVG 
                  value={qrCodeUrl} 
                  size={220} 
                  bgColor={"#FFFFFF"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                  style={{ display: 'block', maxWidth: '100%' }} 
                />
              </div>
              <div className="shared-url">
                {getPageTitle()}
              </div>
              <div className="shared-url" style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                {qrCodeUrl}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Search Modal Component
  const SearchModal = () => {
    if (!showSearch) return null;
    
    return (
      <div 
        className="mobile-search-popup active"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowSearch(false);
        }}
      >
        <div 
          className="search-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <SearchBar 
            posts={posts || []} 
            isMobile={true}
            onClose={() => setShowSearch(false)}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 m-0 p-0">
        <div className={`w-full px-4 sm:px-6 lg:px-8 py-0 transition-all duration-200 ${mobileReaderActive && !showMobileTopNav ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-20 opacity-100'} md:max-h-none md:opacity-100`}>
          <div className="flex justify-between items-center h-16">
            {/* Logo/Home link */}
            <div className="flex items-center h-full">
              <Link href="/" className="site-title flex items-center h-full">
                {/* Mobile: Show logo only */}
                <div className="md:hidden flex items-center">
                  <img
                    src="/epiphysics_logo.svg"
                    alt="Epiphysics"
                    className="h-8 w-8"
                  />
                </div>
                {/* Desktop: Show full text */}
                <span className="hidden md:block text-lg md:text-xl font-bold truncate">
                  Epiphysics
                </span>
              </Link>
            </div>

            {/* Desktop menu */}
            <nav className="hidden md:flex items-center space-x-6">
              {sections.map((section) => {
                const isActive = section.id === currentSection;
                return (
                  <Link
                    key={section.id}
                    href={`/${section.id}`}
                    className={`text-base font-medium transition-colors ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {section.title}
                  </Link>
                );
              })}
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium transition-colors text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {link.title}
                </a>
              ))}
            </nav>
            
            {/* Desktop controls */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* QR code button - always visible */}
              <button
                type="button"
                onClick={handleQRCodeClick}
                className="p-1 md:p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label="Show QR code"
              >
                <QrCode size={20} />
              </button>
              
              {/* Desktop-only controls */}
              <div className="hidden md:flex items-center space-x-4">
                <SearchBar posts={posts || []} />
                <ThemeToggle />
              </div>

              {/* Mobile-only controls */}
              <div className="md:hidden flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleSearchClick}
                  className="p-1 md:p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
                <button
                  onClick={handleMenuButtonClick}
                  className="p-1 md:p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label="Toggle navigation menu"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile quick section switcher (auto-generated from configured sections) */}
        <div className={`md:hidden border-t border-gray-200 dark:border-gray-800 px-2 overflow-x-auto transition-all duration-200 ${showMobileTopNav ? 'max-h-20 opacity-100 py-2' : 'max-h-0 opacity-0 py-0 border-t-0'}`}>
          <nav className="flex items-center gap-2 min-w-max" aria-label="Quick section navigation">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === '/'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              Home
            </Link>
            {sections.map((section) => {
              const isActive = section.id === currentSection;
              return (
                <Link
                  key={`quick-${section.id}`}
                  href={`/${section.id}`}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  {section.title}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile subsection switcher (auto-generated from current section content) */}
        {!mobileReaderActive && currentSection && subNavItems.length > 0 && (
          <div
            className={`md:hidden border-t border-gray-200 dark:border-gray-800 px-2 py-2 overflow-x-auto transition-all duration-200 ${
              showSubNav && showMobileTopNav ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 py-0 border-t-0'
            }`}
          >
            <nav className="flex items-center gap-2 min-w-max" aria-label="Subsection navigation">
              <Link
                href={`/${currentSection}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname === `/${currentSection}`
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                Overview
              </Link>
              {subNavItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={`sub-${item.href}`}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Render modals via portal to avoid DOM nesting issues */}
      {isMounted && typeof document !== 'undefined' && (
        <>
          {createPortal(<QRCodeModal />, document.body)}
          {createPortal(<SearchModal />, document.body)}
          {createPortal(<MobileMenu sections={sections} externalLinks={externalLinks} />, document.body)}
        </>
      )}
    </>
  );
};

export default Header; 