'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const GITHUB_REPO = 'ianderrington/epiphysics';

interface Annotation {
  id: string;
  selectedText: string;
  comment: string;
  approxLine: number;
  highlightId: string;
}

interface StoredFeedback {
  annotations: Annotation[];
  generalNote: string;
  pageUrl: string;
}

interface PopupPosition { x: number; y: number; }
interface FeedbackAnnotatorProps { pageTitle: string; enabled?: boolean; }

function getStorageKey(pageTitle: string): string {
  return `epiphysics-feedback-${pageTitle.replace(/\s+/g, '-').toLowerCase()}`;
}

function estimateLineNumber(range: Range): number {
  const container = document.querySelector('article') || document.querySelector('main') || document.body;
  const allText = container.textContent || '';
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  let charCount = 0;
  let found = false;
  while (walker.nextNode()) {
    if (walker.currentNode === range.startContainer) { charCount += range.startOffset; found = true; break; }
    charCount += (walker.currentNode.textContent || '').length;
  }
  if (!found) return 0;
  return (allText.slice(0, charCount).match(/\n/g) || []).length + 1;
}

const HIGHLIGHT_CLASS = 'bg-teal-100/70 dark:bg-teal-500/25 rounded-sm cursor-pointer transition-colors hover:bg-teal-200 dark:hover:bg-teal-500/40';

function highlightRange(range: Range, highlightId: string): void {
  // Try simple case first (selection within one text node)
  try {
    const mark = document.createElement('mark');
    mark.setAttribute('data-feedback-id', highlightId);
    mark.className = HIGHLIGHT_CLASS;
    range.surroundContents(mark);
    return;
  } catch {
    // Selection spans multiple elements — highlight each text node individually
  }

  // Walk all text nodes in the range and wrap each one
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const nodeRange = document.createRange();
        nodeRange.selectNodeContents(node);
        // Check if this text node is within or overlapping the selection range
        if (range.compareBoundaryPoints(Range.START_TO_END, nodeRange) > 0 &&
            range.compareBoundaryPoints(Range.END_TO_START, nodeRange) < 0) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    }
  );
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  textNodes.forEach(textNode => {
    try {
      const nodeRange = document.createRange();
      // Clip to the selection boundaries
      if (textNode === range.startContainer) {
        nodeRange.setStart(textNode, range.startOffset);
      } else {
        nodeRange.setStartBefore(textNode);
      }
      if (textNode === range.endContainer) {
        nodeRange.setEnd(textNode, range.endOffset);
      } else {
        nodeRange.setEndAfter(textNode);
      }
      if (nodeRange.toString().trim()) {
        const mark = document.createElement('mark');
        mark.setAttribute('data-feedback-id', highlightId);
        mark.className = HIGHLIGHT_CLASS;
        nodeRange.surroundContents(mark);
      }
    } catch {}
  });
}

function removeHighlight(highlightId: string): void {
  document.querySelectorAll(`mark[data-feedback-id="${highlightId}"]`).forEach(mark => {
    const parent = mark.parentNode;
    if (parent) { while (mark.firstChild) parent.insertBefore(mark.firstChild, mark); parent.removeChild(mark); parent.normalize(); }
  });
}

export default function FeedbackAnnotator({ pageTitle, enabled = true }: FeedbackAnnotatorProps) {
  const [annotationMode, setAnnotationMode] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [generalNote, setGeneralNote] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [showHighlights, setShowHighlights] = useState(true);
  const [popup, setPopup] = useState<PopupPosition | null>(null);
  const [pendingText, setPendingText] = useState('');
  const [pendingRange, setPendingRange] = useState<Range | null>(null);
  const [pendingLine, setPendingLine] = useState(0);
  const [commentInput, setCommentInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [mounted, setMounted] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(getStorageKey(pageTitle));
      if (stored) {
        const data: StoredFeedback = JSON.parse(stored);
        if (data.annotations?.length > 0 || data.generalNote) {
          setAnnotations(data.annotations || []);
          setGeneralNote(data.generalNote || '');
        }
      }
    } catch {}
  }, [pageTitle]);

  useEffect(() => {
    if (!mounted) return;
    const data: StoredFeedback = { annotations, generalNote, pageUrl: typeof window !== 'undefined' ? window.location.href : '' };
    try {
      if (annotations.length > 0 || generalNote) localStorage.setItem(getStorageKey(pageTitle), JSON.stringify(data));
      else localStorage.removeItem(getStorageKey(pageTitle));
    } catch {}
  }, [annotations, generalNote, pageTitle, mounted]);

  // Toggle highlight visibility
  useEffect(() => {
    document.querySelectorAll('mark[data-feedback-id]').forEach(mark => {
      if (showHighlights) {
        (mark as HTMLElement).style.backgroundColor = '';
        (mark as HTMLElement).style.opacity = '';
      } else {
        (mark as HTMLElement).style.backgroundColor = 'transparent';
        (mark as HTMLElement).style.opacity = '1';
      }
    });
  }, [showHighlights]);

  const handleMouseUp = useCallback(() => {
    if (!annotationMode) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) return;
    const text = selection.toString().trim();
    if (text.length < 3) return;
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setPendingText(text);
    setPendingRange(range.cloneRange());
    setPendingLine(estimateLineNumber(range));
    setPopup({ x: rect.left + rect.width / 2, y: rect.bottom + window.scrollY + 8 });
  }, [annotationMode]);

  useEffect(() => {
    if (annotationMode) { document.addEventListener('mouseup', handleMouseUp); return () => document.removeEventListener('mouseup', handleMouseUp); }
  }, [annotationMode, handleMouseUp]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) { setPopup(null); setPendingText(''); setPendingRange(null); setCommentInput(''); }
    };
    if (popup) { const t = setTimeout(() => document.addEventListener('mousedown', handleClick), 50); return () => { clearTimeout(t); document.removeEventListener('mousedown', handleClick); }; }
  }, [popup]);

  useEffect(() => { if (popup && commentInputRef.current) commentInputRef.current.focus(); }, [popup]);

  useEffect(() => {
    const handleHighlightClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'MARK' && target.getAttribute('data-feedback-id')) {
        setPanelOpen(true);
        const id = target.getAttribute('data-feedback-id')!;
        setTimeout(() => {
          const el = document.querySelector(`[data-annotation-panel-id="${id}"]`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el?.classList.add('ring-2', 'ring-teal-400');
          setTimeout(() => el?.classList.remove('ring-2', 'ring-teal-400'), 1500);
        }, 100);
      }
    };
    document.addEventListener('click', handleHighlightClick);
    return () => document.removeEventListener('click', handleHighlightClick);
  }, []);

  const addAnnotation = () => {
    if (!pendingText) return;
    const highlightId = `fb-${Date.now()}`;
    if (pendingRange) { try { highlightRange(pendingRange, highlightId); } catch {} }
    // Clean the text: normalize whitespace, collapse multiple newlines/spaces
    const cleanText = pendingText.replace(/\s+/g, ' ').trim();
    const truncated = cleanText.length > 500 ? cleanText.slice(0, 500) + '...' : cleanText;
    setAnnotations(prev => [...prev, { id: highlightId, selectedText: truncated, comment: commentInput.trim(), approxLine: pendingLine, highlightId }]);
    setPopup(null); setPendingText(''); setPendingRange(null); setCommentInput('');
    setPanelOpen(true);
    window.getSelection()?.removeAllRanges();
  };

  const removeAnnotation = (id: string) => { removeHighlight(id); setAnnotations(prev => prev.filter(a => a.id !== id)); if (editingId === id) setEditingId(null); };

  const clearAll = () => {
    if (!confirmClear) { setConfirmClear(true); return; }
    annotations.forEach(a => removeHighlight(a.id));
    setAnnotations([]); setGeneralNote(''); setEditingId(null); setConfirmClear(false); setAnnotationMode(false);
    localStorage.removeItem(getStorageKey(pageTitle));
  };

  const startEdit = (a: Annotation) => { setEditingId(a.id); setEditComment(a.comment); };
  const saveEdit = (id: string) => { setAnnotations(prev => prev.map(a => a.id === id ? { ...a, comment: editComment.trim() } : a)); setEditingId(null); setEditComment(''); };

  const buildIssueUrl = () => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    let body = `## Feedback: ${pageTitle}\n`;
    body += `**Page:** [${pageTitle}](${pageUrl})\n`;
    body += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
    body += `**Annotations:** ${annotations.length}\n`;

    if (generalNote.trim()) {
      body += `\n### General Note\n${generalNote.trim()}\n`;
    }

    if (annotations.length > 0) {
      body += '\n---\n';
      annotations.forEach((a, i) => {
        body += `\n### Annotation ${i + 1} (~line ${a.approxLine})\n`;
        body += `> ${a.selectedText}\n`;
        if (a.comment) {
          body += `\n**Comment:** ${a.comment}\n`;
        }
      });
    }

    const title = `Feedback: ${pageTitle} (${annotations.length} annotation${annotations.length !== 1 ? 's' : ''})`;
    return `https://github.com/${GITHUB_REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=${encodeURIComponent('community-feedback')}`;
  };

  const handleSubmitClick = () => {
    if (!confirmSubmit) { setConfirmSubmit(true); return; }
    // Build URL before clearing
    const url = buildIssueUrl();
    // Show confetti + thank you
    setShowThankYou(true);
    setConfirmSubmit(false);
    // Clear after a moment, then open GitHub
    setTimeout(() => {
      annotations.forEach(a => removeHighlight(a.id));
      setAnnotations([]); setGeneralNote(''); setAnnotationMode(false);
      localStorage.removeItem(getStorageKey(pageTitle));
      window.open(url, '_blank');
    }, 1800);
    // Hide thank you after animation
    setTimeout(() => { setShowThankYou(false); setPanelOpen(false); }, 3000);
  };

  if (!mounted || !enabled) return null;
  const hasContent = annotations.length > 0 || generalNote.trim();

  return (
    <>
      {/* Single floating button — toggles panel, enters annotation mode if no content */}
      <div className="fixed bottom-6 left-4 z-50">
        <button
          onClick={() => {
            if (panelOpen) { setPanelOpen(false); }
            else if (hasContent) { setPanelOpen(true); }
            else { setAnnotationMode(true); setPanelOpen(true); }
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-sm font-medium transition-all duration-200 ${
            annotationMode
              ? 'bg-teal-500 text-white hover:bg-teal-600 ring-2 ring-teal-300/50'
              : hasContent
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200/80 dark:border-gray-600/80 backdrop-blur-sm'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span className="hidden sm:inline">Feedback</span>
          {hasContent && <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full">{annotations.length}</span>}
        </button>
      </div>

      {/* Annotation mode indicator — subtle top border */}
      {annotationMode && (
        <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400" />
      )}

      {/* Selection popup */}
      {popup && (
        <div ref={popupRef} style={{ position: 'absolute', left: `${Math.min(popup.x, (typeof window !== 'undefined' ? window.innerWidth - 340 : popup.x))}px`, top: `${popup.y}px`, transform: 'translateX(-50%)' }}
          className="z-[60] w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 rounded">~Line {pendingLine}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2.5 line-clamp-3 italic border-l-2 border-teal-400 pl-2">
            {pendingText.slice(0, 150)}{pendingText.length > 150 ? '...' : ''}
          </p>
          <textarea ref={commentInputRef} value={commentInput} onChange={e => setCommentInput(e.target.value)}
            placeholder="What's the issue? (optional)" rows={2}
            className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 resize-none"
            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addAnnotation(); }}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-[10px] text-gray-400">⌘+Enter to add</span>
            <div className="flex gap-2">
              <button onClick={() => { setPopup(null); setPendingText(''); setPendingRange(null); setCommentInput(''); }} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1">Cancel</button>
              <button onClick={addAnnotation} className="text-xs bg-teal-500 text-white px-3.5 py-1.5 rounded-lg hover:bg-teal-600 font-medium transition-colors">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Thank you + confetti overlay */}
      {showThankYou && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          {/* Confetti particles */}
          <div ref={confettiRef} className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20 + 5}%`,
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  backgroundColor: ['#14b8a6', '#f59e0b', '#3b82f6', '#ef4444', '#a855f7', '#22c55e', '#ec4899'][Math.floor(Math.random() * 7)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                  animation: `confetti-fall ${1.5 + Math.random() * 2}s ease-in forwards`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
          {/* Thank you message */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl px-8 py-6 text-center animate-pulse border-2 border-teal-200 dark:border-teal-700">
            <div className="text-3xl mb-2">🎉</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">Thank you!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your feedback makes Epiphysics better.<br/>Opening GitHub...</p>
          </div>
        </div>
      )}

      {/* CSS for confetti animation */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>

      {/* Panel */}
      {panelOpen && (
        <div className="fixed bottom-20 left-4 z-50 w-[420px] max-h-[75vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-teal-50 to-white dark:from-teal-900/20 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Feedback</h3>
              {hasContent && <span className="text-[10px] bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 px-1.5 py-0.5 rounded-full">{annotations.length} annotation{annotations.length !== 1 ? 's' : ''}</span>}
            </div>
            <div className="flex items-center gap-1">
              {/* Toggle annotation mode */}
              <button onClick={() => setAnnotationMode(!annotationMode)}
                className={`text-[10px] px-2 py-1 rounded-full transition-colors ${annotationMode ? 'bg-teal-500 text-white' : 'text-gray-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30'}`}
                title={annotationMode ? 'Stop annotating' : 'Start annotating'}>
                {annotationMode ? '● Annotating' : '○ Annotate'}
              </button>
              {/* Toggle highlights */}
              {annotations.length > 0 && (
                <button onClick={() => setShowHighlights(!showHighlights)}
                  className={`text-[10px] px-2 py-1 rounded-full transition-colors ${showHighlights ? 'text-teal-600 hover:bg-teal-50' : 'text-gray-400 hover:bg-gray-100'}`}
                  title={showHighlights ? 'Hide highlights' : 'Show highlights'}>
                  {showHighlights ? '◉' : '○'} Highlights
                </button>
              )}
              {/* Close */}
              <button onClick={() => { setPanelOpen(false); setAnnotationMode(false); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {/* General note */}
            <div className="rounded-lg border border-teal-100 dark:border-teal-800/50 p-2.5 bg-teal-50/50 dark:bg-teal-900/10">
              <label className="text-[10px] font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider block mb-1.5">General Note</label>
              <textarea value={generalNote} onChange={e => setGeneralNote(e.target.value)}
                placeholder="Overall feedback about this page..." rows={2}
                className="w-full text-xs border-0 rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300/50 resize-none shadow-sm"
              />
            </div>

            {/* Annotations */}
            {annotations.map((a, i) => (
              <div key={a.id} data-annotation-panel-id={a.id} className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-2.5 text-sm relative group transition-all hover:bg-gray-100/80 dark:hover:bg-gray-700/60">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-white bg-teal-500 dark:bg-teal-600 w-4 h-4 rounded-full flex items-center justify-center font-bold">{i + 1}</span>
                    <span className="text-[10px] text-gray-400 font-mono">~line {a.approxLine}</span>
                  </div>
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(a)} className="text-gray-400 hover:text-teal-500 p-1 rounded" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                    </button>
                    <button onClick={() => removeAnnotation(a.id)} className="text-gray-400 hover:text-red-500 p-1 rounded" title="Remove">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                </div>
                <blockquote className="text-xs text-gray-600 dark:text-gray-300 italic border-l-2 border-teal-300 dark:border-teal-600 pl-2 mb-1.5 line-clamp-3">{a.selectedText}</blockquote>
                {editingId === a.id ? (
                  <div>
                    <textarea value={editComment} onChange={e => setEditComment(e.target.value)} rows={2}
                      className="w-full text-xs border-0 rounded-md p-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-300/50 resize-none shadow-sm" autoFocus
                      onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) saveEdit(a.id); if (e.key === 'Escape') setEditingId(null); }}
                    />
                    <div className="flex justify-end gap-1 mt-1">
                      <button onClick={() => setEditingId(null)} className="text-[10px] text-gray-400 px-2 py-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-600">Cancel</button>
                      <button onClick={() => saveEdit(a.id)} className="text-[10px] bg-teal-500 text-white px-2 py-0.5 rounded hover:bg-teal-600">Save</button>
                    </div>
                  </div>
                ) : a.comment ? (
                  <p className="text-xs text-gray-700 dark:text-gray-200 cursor-pointer hover:text-teal-600 transition-colors" onClick={() => startEdit(a)}>{a.comment}</p>
                ) : (
                  <p className="text-[10px] text-gray-400 italic cursor-pointer hover:text-teal-500 transition-colors" onClick={() => startEdit(a)}>Click to add comment...</p>
                )}
              </div>
            ))}

            {!hasContent && (
              <div className="text-center py-6">
                <p className="text-xs text-gray-400 mb-2">No annotations yet.</p>
                <button onClick={() => setAnnotationMode(true)}
                  className="text-xs text-teal-600 hover:text-teal-700 font-medium">Start annotating →</button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-3 py-2.5 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex gap-2">
            {hasContent && (
              <>
                {confirmSubmit ? (
                  <div className="flex-1 flex flex-col gap-1.5">
                    <p className="text-[10px] text-gray-500 text-center">This will clear your annotations from this page and open GitHub to submit the issue.</p>
                    <div className="flex gap-2">
                      <button onClick={() => setConfirmSubmit(false)}
                        className="flex-1 text-xs py-2 px-3 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        Cancel
                      </button>
                      <button onClick={handleSubmitClick}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-teal-600 text-white text-xs font-medium py-2 px-3 rounded-lg hover:bg-teal-700 transition-colors">
                        Confirm & Submit
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button onClick={handleSubmitClick}
                      className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white text-xs font-medium py-2 px-3 rounded-lg hover:bg-teal-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      Submit Issue
                    </button>
                    <button onClick={clearAll}
                      className={`text-xs px-3 py-2 rounded-lg transition-colors font-medium ${
                        confirmClear ? 'bg-red-500 text-white hover:bg-red-600' : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                      }`}>
                      {confirmClear ? 'Confirm?' : 'Clear'}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
