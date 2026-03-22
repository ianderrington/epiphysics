'use client';

/**
 * Mobile-only font size −/+ control.
 * Renders a fixed-position pill at bottom-right on mobile.
 * Changes font size via a <style> tag — zero interaction with TTS widget.
 */

import { useEffect, useState } from 'react';

const KEY = 'epiphysics-font-size';
const SIZES = [1.05, 1.2, 1.35, 1.5];
const DEFAULT = 1;
const STYLE_ID = 'ep-fontsize';

function getIdx(): number {
  try {
    const s = localStorage.getItem(KEY);
    if (s !== null) {
      const i = parseInt(s, 10);
      if (i >= 0 && i < SIZES.length) return i;
    }
  } catch {}
  return DEFAULT;
}

function writeStyle(idx: number) {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = `.post-content,.prose,.prose-lg,.prose-base{font-size:${SIZES[idx]}rem!important}`;
}

export default function FontSizeControl() {
  const [idx, setIdx] = useState(DEFAULT);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Mobile only
    if (window.innerWidth >= 768) return;
    const i = getIdx();
    setIdx(i);
    writeStyle(i);
    setShow(true);
  }, []);

  if (!show) return null;

  function change(delta: number) {
    const next = Math.max(0, Math.min(SIZES.length - 1, idx + delta));
    setIdx(next);
    writeStyle(next);
    try { localStorage.setItem(KEY, String(next)); } catch {}
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 16,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        padding: '4px 4px',
        gap: 0,
      }}
    >
      <button
        type="button"
        onClick={() => change(-1)}
        disabled={idx === 0}
        style={{
          width: 36, height: 36,
          fontSize: 20, fontWeight: 'bold',
          color: idx === 0 ? '#ccc' : '#333',
          background: 'none', border: 'none',
          cursor: 'pointer',
          touchAction: 'manipulation',
        }}
        aria-label="Smaller text"
      >−</button>
      <button
        type="button"
        onClick={() => change(1)}
        disabled={idx === SIZES.length - 1}
        style={{
          width: 36, height: 36,
          fontSize: 20, fontWeight: 'bold',
          color: idx === SIZES.length - 1 ? '#ccc' : '#333',
          background: 'none', border: 'none',
          cursor: 'pointer',
          touchAction: 'manipulation',
        }}
        aria-label="Larger text"
      >+</button>
    </div>
  );
}
