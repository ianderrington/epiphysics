'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BlogContext } from '@/app/providers';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';
import { QRCodeSVG } from 'qrcode.react';
import { Search, QrCode, Menu, X, ChevronDown } from 'lucide-react';
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
  const [mobileReaderActive, setMobileReaderActive] = useState(false);
  const [mobileSectionOpen, setMobileSectionOpen] = useState(false);
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

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

  // Close mobile section dropdown on outside click
  useEffect(() => {
    if (!mobileSectionOpen) return;
    const handler = (e: MouseEvent) => {
      if (mobileSectionRef.current && !mobileSectionRef.current.contains(e.target as Node)) {
        setMobileSectionOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileSectionOpen]);

  // Close modals when route changes and notify parent
  useEffect(() => {
    setShowQRCode(false);
    setShowSearch(false);
    setMobileSectionOpen(false);
    onMenuToggle?.(false);
  }, [pathname, onMenuToggle]);

  // Notify parent when mobile menu state changes
  useEffect(() => {
    onMenuToggle?.(isOpen);
  }, [isOpen, onMenuToggle]);

  // Reader mode signal from mobile reader nav
  useEffect(() => {
    const activeHandler = (event: Event) => {
      const e = event as CustomEvent<{ active?: boolean }>;
      const active = !!e.detail?.active;
      setMobileReaderActive(active);
    };
    window.addEventListener('mobile-reader-active', activeHandler as EventListener);
    return () => window.removeEventListener('mobile-reader-active', activeHandler as EventListener);
  }, []);

  // Close all popups on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowQRCode(false);
        setShowSearch(false);
        setMobileSectionOpen(false);
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
      <header className="bg-white dark:bg-[#0a0f1a] border-b border-gray-200 dark:border-gray-800 m-0 p-0">
        <div className={`w-full px-4 sm:px-6 lg:px-8 py-0 ${mobileReaderActive ? 'hidden md:block' : 'block'}`}>
          <div className="flex justify-between items-center h-16">
            {/* Logo + Mobile section selector */}
            <div className="flex items-center h-full gap-2">
              <Link href="/" className="site-title flex items-center h-full">
                {/* Mobile: Show logo only */}
                <div className="md:hidden flex items-center">
                  <Image
                    src="/epiphysics_logo.svg"
                    alt="Epiphysics"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                    priority
                  />
                </div>
                {/* Desktop: Show full text */}
                <span className="hidden md:block text-lg md:text-xl font-bold truncate">
                  Epiphysics
                </span>
              </Link>

              {/* Mobile section selector */}
              {currentSection && (
                <div ref={mobileSectionRef} className="relative md:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileSectionOpen((v) => !v)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="truncate max-w-[120px]">
                      {sections.find((s) => s.id === currentSection)?.title ||
                        currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`shrink-0 text-gray-400 transition-transform ${mobileSectionOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {mobileSectionOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-1 overflow-hidden">
                      {sections
                        .filter((s) => !s.id.endsWith('.md'))
                        .map((s) => (
                          <Link
                            key={s.id}
                            href={`/${s.id}`}
                            onClick={() => setMobileSectionOpen(false)}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              s.id === currentSection
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                          >
                            {s.title}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop menu */}
            <nav className="hidden md:flex items-center space-x-6">
              {sections.filter((s) => !s.id.endsWith('.md')).map((section) => {
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