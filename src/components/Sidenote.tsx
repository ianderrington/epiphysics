'use client';

import React, { useState, useEffect, useRef } from 'react';

interface SidenoteProps {
  id: string;
  number: number;
  children: React.ReactNode;
}

type DisplayMode = 'margin' | 'tooltip' | 'inline';

export default function Sidenote({ id, number, children }: SidenoteProps) {
  const [mode, setMode] = useState<DisplayMode>('margin');
  const [expanded, setExpanded] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const marginRef = useRef<HTMLElement>(null);
  const refRef = useRef<HTMLElement>(null);

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

  // Detect callout type from id (e.g., sn-caveat-1, sn-sidenote-2)
  // Types: sidenote (default/blue), caveat (amber), note (green), warning (red), tip (purple)
  const getVariant = (): string => {
    if (id.includes('caveat') || id.includes('warning')) return 'warning';
    if (id.includes('tip') || id.includes('hint')) return 'tip';
    if (id.includes('note') || id.includes('info')) return 'info';
    if (id.includes('important') || id.includes('critical')) return 'critical';
    return 'default';
  };
  const variant = getVariant();

  // Desktop: margin note — all on right to avoid TOC conflict
  if (mode === 'margin') {
    return (
      <div className="sidenote-wrapper-block" data-sidenote-rendered={id}>
        <aside
          ref={marginRef}
          className={`sidenote-margin sidenote-variant-${variant} ${highlighted ? 'sidenote-flash' : ''}`}
          role="note"
          aria-label={`Sidenote ${number}`}
          onClick={flashRef}
          style={{ cursor: 'pointer' }}
        >
          <span className={`sidenote-number sidenote-number-${variant}`}>{number}</span>
          {children}
        </aside>
        <sup
          ref={refRef}
          className={`sidenote-ref sidenote-ref-${variant} ${highlighted ? 'sidenote-ref-flash' : ''}`}
          onClick={flashMarginNote}
          role="button"
          tabIndex={0}
          title={`Go to sidenote ${number}`}
        >
          {number}
        </sup>
      </div>
    );
  }

  // Tablet: hover tooltip
  if (mode === 'tooltip') {
    return (
      <span
        className="sidenote-wrapper sidenote-tooltip-trigger"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <sup className="sidenote-ref sidenote-ref-interactive">{number}</sup>
        {tooltipVisible && (
          <span className="sidenote-tooltip" role="tooltip">
            {children}
          </span>
        )}
      </span>
    );
  }

  // Mobile: tap-to-expand inline
  return (
    <span className="sidenote-wrapper sidenote-inline-trigger">
      <sup
        className="sidenote-ref sidenote-ref-interactive"
        onClick={() => setExpanded(!expanded)}
        role="button"
        aria-expanded={expanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setExpanded(!expanded);
        }}
      >
        {number}
      </sup>
      {expanded && (
        <span className="sidenote-inline" role="note">
          {children}
        </span>
      )}
    </span>
  );
}
