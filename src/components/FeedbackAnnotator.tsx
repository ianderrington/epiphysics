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

interface PopupPosition {
  x: number;
  y: number;
}

interface FeedbackAnnotatorProps {
  pageTitle: string;
  enabled?: boolean;
}

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
    if (walker.currentNode === range.startContainer) {
      charCount += range.startOffset;
      found = true;
      break;
    }
    charCount += (walker.currentNode.textContent || '').length;
  }
  if (!found) return 0;
  return (allText.slice(0, charCount).match(/\n/g) || []).length + 1;
}

function highlightRange(range: Range, highlightId: string): void {
  try {
    const mark = document.createElement('mark');
    mark.setAttribute('data-feedback-id', highlightId);
    mark.className = 'bg-amber-200/60 dark:bg-amber-500/30 rounded-sm cursor-pointer transition-colors hover:bg-amber-300/80 dark:hover:bg-amber-500/50';
    range.surroundContents(mark);
  } catch {
    const mark = document.createElement('mark');
    mark.setAttribute('data-feedback-id', highlightId);
    mark.className = 'bg-amber-200/60 dark:bg-amber-500/30 rounded-sm';
    mark.textContent = range.toString();
    range.deleteContents();
    range.insertNode(mark);
  }
}

function removeHighlight(highlightId: string): void {
  const marks = document.querySelectorAll(`mark[data-feedback-id="${highlightId}"]`);
  marks.forEach(mark => {
    const parent = mark.parentNode;
    if (parent) {
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    }
  });
}

export default function FeedbackAnnotator({ pageTitle, enabled = true }: FeedbackAnnotatorProps) {
  const [annotationMode, setAnnotationMode] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [generalNote, setGeneralNote] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [popup, setPopup] = useState<PopupPosition | null>(null);
  const [pendingText, setPendingText] = useState('');
  const [pendingRange, setPendingRange] = useState<Range | null>(null);
  const [pendingLine, setPendingLine] = useState(0);
  const [commentInput, setCommentInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState('');
  const [mounted, setMounted] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  // Load from localStorage on mount
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

  // Save to localStorage whenever annotations or generalNote change
  useEffect(() => {
    if (!mounted) return;
    const data: StoredFeedback = {
      annotations,
      generalNote,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    };
    try {
      if (annotations.length > 0 || generalNote) {
        localStorage.setItem(getStorageKey(pageTitle), JSON.stringify(data));
      } else {
        localStorage.removeItem(getStorageKey(pageTitle));
      }
    } catch {}
  }, [annotations, generalNote, pageTitle, mounted]);

  // Handle text selection
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
    if (annotationMode) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [annotationMode, handleMouseUp]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopup(null); setPendingText(''); setPendingRange(null); setCommentInput('');
      }
    };
    if (popup) {
      const timer = setTimeout(() => document.addEventListener('mousedown', handleClick), 50);
      return () => { clearTimeout(timer); document.removeEventListener('mousedown', handleClick); };
    }
  }, [popup]);

  useEffect(() => {
    if (popup && commentInputRef.current) commentInputRef.current.focus();
  }, [popup]);

  // Click highlight to scroll to annotation
  useEffect(() => {
    const handleHighlightClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'MARK' && target.getAttribute('data-feedback-id')) {
        setPanelOpen(true);
        const id = target.getAttribute('data-feedback-id')!;
        setTimeout(() => {
          const el = document.querySelector(`[data-annotation-panel-id="${id}"]`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el?.classList.add('ring-2', 'ring-blue-400');
          setTimeout(() => el?.classList.remove('ring-2', 'ring-blue-400'), 1500);
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
    setAnnotations(prev => [...prev, {
      id: highlightId,
      selectedText: pendingText.length > 500 ? pendingText.slice(0, 500) + '...' : pendingText,
      comment: commentInput.trim(),
      approxLine: pendingLine,
      highlightId,
    }]);
    setPopup(null); setPendingText(''); setPendingRange(null); setCommentInput('');
    setPanelOpen(true);
    window.getSelection()?.removeAllRanges();
  };

  const removeAnnotation = (id: string) => {
    removeHighlight(id);
    setAnnotations(prev => prev.filter(a => a.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const clearAll = () => {
    annotations.forEach(a => removeHighlight(a.id));
    setAnnotations([]);
    setGeneralNote('');
    setEditingId(null);
    localStorage.removeItem(getStorageKey(pageTitle));
  };

  const startEdit = (a: Annotation) => { setEditingId(a.id); setEditComment(a.comment); };
  const saveEdit = (id: string) => {
    setAnnotations(prev => prev.map(a => a.id === id ? { ...a, comment: editComment.trim() } : a));
    setEditingId(null); setEditComment('');
  };

  const submitAsIssue = () => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const parts: string[] = [];

    parts.push(`## Feedback: ${pageTitle}`);
    parts.push(`**Page:** [${pageTitle}](${pageUrl})`);
    parts.push(`**Date:** ${new Date().toISOString().split('T')[0]}`);
    parts.push(`**Annotations:** ${annotations.length}`);

    if (generalNote.trim()) {
      parts.push('');
      parts.push('### General Note');
      parts.push(generalNote.trim());
    }

    if (annotations.length > 0) {
      parts.push('');
      parts.push('---');
      annotations.forEach((a, i) => {
        parts.push('');
        parts.push(`### Annotation ${i + 1} (~line ${a.approxLine})`);
        // Format the blockquote properly — no double newlines
        const quoted = a.selectedText.split('\n').map(line => `> ${line}`).join('\n');
        parts.push(quoted);
        if (a.comment) {
          parts.push('');
          parts.push(`**Comment:** ${a.comment}`);
        }
      });
    }

    const title = `Feedback: ${pageTitle} (${annotations.length} annotation${annotations.length !== 1 ? 's' : ''})`;
    const body = parts.join('\n');

    const url = `https://github.com/${GITHUB_REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=${encodeURIComponent('community-feedback')}`;
    window.open(url, '_blank');
  };

  if (!mounted || !enabled) return null;

  const hasContent = annotations.length > 0 || generalNote.trim();

  return (
    <>
      {/* Floating buttons */}
      <div className="fixed bottom-12 left-4 z-50 flex flex-col items-start gap-2">
        <button
          onClick={() => setAnnotationMode(!annotationMode)}
          className={`group flex items-center gap-2 px-3 py-2 rounded-full shadow-lg text-sm font-medium transition-all duration-200 ${
            annotationMode
              ? 'bg-amber-500 text-white hover:bg-amber-600 ring-2 ring-amber-300'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span className="hidden sm:inline">{annotationMode ? 'Exit Feedback' : 'Give Feedback'}</span>
        </button>

        {hasContent && (
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {annotations.length > 0 && <span>{annotations.length} annotation{annotations.length !== 1 ? 's' : ''}</span>}
            {annotations.length > 0 && generalNote.trim() && <span>·</span>}
            {generalNote.trim() && <span>note</span>}
          </button>
        )}
      </div>

      {/* Annotation mode banner */}
      {annotationMode && (
        <div className="fixed top-16 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div className="bg-amber-500 text-white text-sm px-4 py-1.5 rounded-b-lg shadow-md pointer-events-auto">
            Select text to annotate — highlights persist — click &quot;Exit Feedback&quot; when done
          </div>
        </div>
      )}

      {/* Selection popup */}
      {popup && (
        <div
          ref={popupRef}
          style={{
            position: 'absolute',
            left: `${Math.min(popup.x, (typeof window !== 'undefined' ? window.innerWidth - 340 : popup.x))}px`,
            top: `${popup.y}px`,
            transform: 'translateX(-50%)',
          }}
          className="z-[60] w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 p-3"
        >
          <p className="text-[10px] text-gray-400 mb-1">~Line {pendingLine}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-3 italic border-l-2 border-amber-400 pl-2">
            &quot;{pendingText.slice(0, 150)}{pendingText.length > 150 ? '...' : ''}&quot;
          </p>
          <textarea
            ref={commentInputRef}
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            placeholder="What's the issue? (optional)"
            rows={2}
            className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addAnnotation(); }}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-[10px] text-gray-400">⌘+Enter to add</span>
            <div className="flex gap-2">
              <button onClick={() => { setPopup(null); setPendingText(''); setPendingRange(null); setCommentInput(''); }} className="text-xs text-gray-500 px-2 py-1">Cancel</button>
              <button onClick={addAnnotation} className="text-xs bg-amber-500 text-white px-3 py-1 rounded-md hover:bg-amber-600 font-medium">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Panel */}
      {panelOpen && (
        <div className="fixed bottom-28 left-4 z-50 w-96 max-h-[70vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-600 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Feedback</h3>
            <div className="flex items-center gap-2">
              {hasContent && (
                <button onClick={clearAll} className="text-[10px] text-red-400 hover:text-red-600 px-1">Clear all</button>
              )}
              <button onClick={() => setPanelOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {/* General note */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-2.5">
              <label className="text-xs font-medium text-blue-700 dark:text-blue-300 block mb-1">General note</label>
              <textarea
                value={generalNote}
                onChange={e => setGeneralNote(e.target.value)}
                placeholder="Overall feedback about this page..."
                rows={2}
                className="w-full text-xs border border-blue-200 dark:border-blue-700 rounded p-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
              />
            </div>

            {/* Annotations */}
            {annotations.map((a, i) => (
              <div key={a.id} data-annotation-panel-id={a.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-2.5 text-sm relative group transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-400 font-mono">#{i + 1} · ~line {a.approxLine}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(a)} className="text-gray-400 hover:text-blue-500 p-0.5" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                    </button>
                    <button onClick={() => removeAnnotation(a.id)} className="text-gray-400 hover:text-red-500 p-0.5" title="Remove">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                </div>
                <blockquote className="text-xs text-gray-600 dark:text-gray-300 italic border-l-2 border-amber-400 pl-2 mb-1.5 line-clamp-3">{a.selectedText}</blockquote>
                {editingId === a.id ? (
                  <div>
                    <textarea value={editComment} onChange={e => setEditComment(e.target.value)} rows={2}
                      className="w-full text-xs border border-gray-200 dark:border-gray-600 rounded p-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none" autoFocus
                      onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) saveEdit(a.id); if (e.key === 'Escape') setEditingId(null); }}
                    />
                    <div className="flex justify-end gap-1 mt-1">
                      <button onClick={() => setEditingId(null)} className="text-[10px] text-gray-400 px-1.5 py-0.5">Cancel</button>
                      <button onClick={() => saveEdit(a.id)} className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded">Save</button>
                    </div>
                  </div>
                ) : a.comment ? (
                  <p className="text-xs text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600" onClick={() => startEdit(a)}>{a.comment}</p>
                ) : (
                  <p className="text-[10px] text-gray-400 italic cursor-pointer hover:text-blue-500" onClick={() => startEdit(a)}>Click to add comment...</p>
                )}
              </div>
            ))}

            {annotations.length === 0 && !generalNote.trim() && (
              <p className="text-xs text-gray-400 text-center py-4">No annotations yet. Select text on the page to add feedback.</p>
            )}
          </div>

          {/* Submit */}
          {hasContent && (
            <div className="px-3 py-2.5 border-t border-gray-100 dark:border-gray-700">
              <button onClick={submitAsIssue}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Submit as GitHub Issue
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
