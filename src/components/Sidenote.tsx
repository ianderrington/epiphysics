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

  // Odd = right margin, even = left margin
  const side = number % 2 === 1 ? 'right' : 'left';

  // Desktop: margin note
  if (mode === 'margin') {
    return (
      <div className="sidenote-wrapper-block" data-sidenote-rendered={id}>
        <aside
          ref={marginRef}
          className={`sidenote-margin sidenote-margin-${side} ${highlighted ? 'sidenote-flash' : ''}`}
          role="note"
          aria-label={`Sidenote ${number}`}
          onClick={flashRef}
          style={{ cursor: 'pointer' }}
        >
          <span className="sidenote-number">{number}</span>
          {children}
        </aside>
        <sup
          ref={refRef}
          className={`sidenote-ref sidenote-ref-interactive ${highlighted ? 'sidenote-ref-flash' : ''}`}
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
