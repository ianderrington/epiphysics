'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

interface SidenoteProps {
  id: string;
  number: number;
  children: React.ReactNode;
}

type DisplayMode = 'margin' | 'tooltip' | 'inline';

// Extract title from children: looks for first *italic* or **bold** text
function extractTitle(children: React.ReactNode): string | null {
  const text = getTextContent(children);
  // Match *Title*: or **Title**: or **Title.** at the start
  const match = text.match(/^\*([^*]+)\*[:.]\s*|^\*\*([^*]+)\*\*[:.]\s*/);
  if (match) return match[1] || match[2];
  // Just take the first few words
  const words = text.split(/\s+/).slice(0, 4).join(' ');
  return words.length > 3 ? words + '...' : null;
}

function getTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (typeof node === 'object' && 'props' in node) {
    const props = (node as React.ReactElement).props;
    if (props.dangerouslySetInnerHTML) {
      // Strip HTML tags to get text
      return props.dangerouslySetInnerHTML.__html.replace(/<[^>]+>/g, '');
    }
    return getTextContent(props.children);
  }
  return '';
}

export default function Sidenote({ id, number, children }: SidenoteProps) {
  const [mode, setMode] = useState<DisplayMode>('margin');
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const marginRef = useRef<HTMLElement>(null);
  const refRef = useRef<HTMLElement>(null);

  const title = useMemo(() => extractTitle(children), [children]);

  useEffect(() => {
    const updateMode = () => {
      const width = window.innerWidth;
      if (width >= 1280) setMode('margin');
      else if (width >= 768) setMode('tooltip');
      else setMode('inline');
    };
    updateMode();
    window.addEventListener('resize', updateMode);
    return () => window.removeEventListener('resize', updateMode);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [modalOpen]);

  const flashMarginNote = () => {
    if (marginRef.current) {
      marginRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlighted(true);
      setTimeout(() => setHighlighted(false), 1500);
    }
  };

  const flashRef = () => {
    if (refRef.current) {
      refRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlighted(true);
      setTimeout(() => setHighlighted(false), 1500);
    }
  };

  const getVariant = (): string => {
    if (id.includes('caveat') || id.includes('warning')) return 'warning';
    if (id.includes('tip') || id.includes('hint')) return 'tip';
    if (id.includes('note') || id.includes('info')) return 'info';
    if (id.includes('important') || id.includes('critical')) return 'critical';
    return 'default';
  };
  const variant = getVariant();

  const variantLabel: Record<string, string> = {
    default: 'Note', warning: 'Caveat', tip: 'Tip', info: 'Info', critical: 'Important'
  };

  // Desktop: margin note with title preview, click to expand
  if (mode === 'margin') {
    return (
      <>
        <div className="sidenote-wrapper-block" data-sidenote-rendered={id}>
          <aside
            ref={marginRef}
            className={`sidenote-margin sidenote-variant-${variant} ${highlighted ? 'sidenote-flash' : ''}`}
            role="note"
            aria-label={`Sidenote ${number}`}
            onClick={() => setModalOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            <div className="sidenote-margin-header">
              <span className={`sidenote-number sidenote-number-${variant}`}>{number}</span>
              {title && <span className="sidenote-title">{title}</span>}
            </div>
            <div className="sidenote-margin-body">
              {children}
            </div>
          </aside>
          <sup
            ref={refRef}
            className={`sidenote-ref sidenote-ref-${variant} ${highlighted ? 'sidenote-ref-flash' : ''}`}
            onClick={flashMarginNote}
            role="button"
            tabIndex={0}
            title={title ? `${variantLabel[variant]}: ${title}` : `Sidenote ${number}`}
          >
            {number}
          </sup>
        </div>

        {/* Expanded modal */}
        {modalOpen && (
          <div
            className="sidenote-modal-backdrop"
            onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
          >
            <div className={`sidenote-modal sidenote-modal-${variant}`}>
              <div className="sidenote-modal-header">
                <div className="sidenote-modal-label">
                  <span className={`sidenote-number sidenote-number-${variant}`}>{number}</span>
                  <span className="sidenote-modal-variant-tag">{variantLabel[variant]}</span>
                </div>
                <button onClick={() => setModalOpen(false)} className="sidenote-modal-close">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="sidenote-modal-content prose dark:prose-invert prose-sm max-w-none">
                {children}
              </div>
              <button onClick={() => { setModalOpen(false); flashRef(); }} className="sidenote-modal-goto">
                ← Back to text
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Tablet: hover tooltip, click to expand
  if (mode === 'tooltip') {
    return (
      <>
        <span
          className="sidenote-wrapper sidenote-tooltip-trigger"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <sup className="sidenote-ref sidenote-ref-interactive" onClick={() => setModalOpen(true)}>
            {number}
          </sup>
          {tooltipVisible && !modalOpen && (
            <span className="sidenote-tooltip" role="tooltip">
              {title && <strong>{title} </strong>}
              <span className="sidenote-tooltip-hint">(click to expand)</span>
            </span>
          )}
        </span>
        {modalOpen && (
          <div className="sidenote-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
            <div className={`sidenote-modal sidenote-modal-${variant}`}>
              <div className="sidenote-modal-header">
                <div className="sidenote-modal-label">
                  <span className={`sidenote-number sidenote-number-${variant}`}>{number}</span>
                  <span className="sidenote-modal-variant-tag">{variantLabel[variant]}</span>
                </div>
                <button onClick={() => setModalOpen(false)} className="sidenote-modal-close">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="sidenote-modal-content prose dark:prose-invert prose-sm max-w-none">{children}</div>
              <button onClick={() => setModalOpen(false)} className="sidenote-modal-goto">← Close</button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Mobile: tap to expand modal
  return (
    <>
      <span className="sidenote-wrapper sidenote-inline-trigger">
        <sup
          className="sidenote-ref sidenote-ref-interactive"
          onClick={() => setModalOpen(true)}
          role="button"
          tabIndex={0}
        >
          {number}
        </sup>
      </span>
      {modalOpen && (
        <div className="sidenote-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className={`sidenote-modal sidenote-modal-${variant}`}>
            <div className="sidenote-modal-header">
              <div className="sidenote-modal-label">
                <span className={`sidenote-number sidenote-number-${variant}`}>{number}</span>
                <span className="sidenote-modal-variant-tag">{variantLabel[variant]}</span>
              </div>
              <button onClick={() => setModalOpen(false)} className="sidenote-modal-close">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="sidenote-modal-content prose dark:prose-invert prose-sm max-w-none">{children}</div>
            <button onClick={() => setModalOpen(false)} className="sidenote-modal-goto">← Close</button>
          </div>
        </div>
      )}
    </>
  );
}
