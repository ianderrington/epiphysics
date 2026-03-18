'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const GITHUB_REPO = 'ianderrington/epiphysics';

interface Annotation {
  id: string;
  selectedText: string;
  comment: string;
}

interface PopupPosition {
  x: number;
  y: number;
}

interface FeedbackAnnotatorProps {
  pageTitle: string;
  enabled?: boolean;
}

export default function FeedbackAnnotator({ pageTitle, enabled = true }: FeedbackAnnotatorProps) {
  const [annotationMode, setAnnotationMode] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [popup, setPopup] = useState<PopupPosition | null>(null);
  const [pendingText, setPendingText] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [mounted, setMounted] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle text selection in annotation mode
  const handleMouseUp = useCallback(() => {
    if (!annotationMode) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      return;
    }

    const text = selection.toString().trim();
    if (text.length < 3) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    setPendingText(text);
    setPopup({
      x: rect.left + rect.width / 2,
      y: rect.bottom + window.scrollY + 8,
    });
  }, [annotationMode]);

  useEffect(() => {
    if (annotationMode) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [annotationMode, handleMouseUp]);

  // Close popup on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopup(null);
        setPendingText('');
        setCommentInput('');
      }
    };
    if (popup) {
      // Delay to avoid the same mouseup closing it
      const timer = setTimeout(() => document.addEventListener('mousedown', handleClick), 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClick);
      };
    }
  }, [popup]);

  // Focus comment input when popup appears
  useEffect(() => {
    if (popup && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [popup]);

  const addAnnotation = () => {
    if (!pendingText) return;
    const annotation: Annotation = {
      id: Date.now().toString(),
      selectedText: pendingText.length > 300 ? pendingText.slice(0, 300) + '...' : pendingText,
      comment: commentInput.trim(),
    };
    setAnnotations(prev => [...prev, annotation]);
    setPopup(null);
    setPendingText('');
    setCommentInput('');
    setPanelOpen(true);
    window.getSelection()?.removeAllRanges();
  };

  const removeAnnotation = (id: string) => {
    setAnnotations(prev => prev.filter(a => a.id !== id));
  };

  const submitAsIssue = () => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

    const bodyParts = [
      `**Page:** [${pageTitle}](${pageUrl})`,
      '',
      '---',
      '',
    ];

    annotations.forEach((a, i) => {
      bodyParts.push(`### Annotation ${i + 1}`);
      bodyParts.push('');
      bodyParts.push(`> ${a.selectedText.replace(/\n/g, '\n> ')}`);
      bodyParts.push('');
      if (a.comment) {
        bodyParts.push(`**Comment:** ${a.comment}`);
        bodyParts.push('');
      }
      bodyParts.push('---');
      bodyParts.push('');
    });

    const title = `Feedback: ${pageTitle}`;
    const body = bodyParts.join('\n');

    const url = `https://github.com/${GITHUB_REPO}/issues/new?` +
      `title=${encodeURIComponent(title)}` +
      `&body=${encodeURIComponent(body)}` +
      `&labels=${encodeURIComponent('community-feedback')}`;

    window.open(url, '_blank');
  };

  if (!mounted || !enabled) return null;

  return (
    <>
      {/* Floating feedback button */}
      <div className="fixed bottom-12 left-4 z-50 flex flex-col items-start gap-2">
        <button
          onClick={() => {
            if (annotationMode) {
              setAnnotationMode(false);
            } else {
              setAnnotationMode(true);
            }
          }}
          className={`
            group flex items-center gap-2 px-3 py-2 rounded-full shadow-lg
            text-sm font-medium transition-all duration-200
            ${annotationMode
              ? 'bg-amber-500 text-white hover:bg-amber-600 ring-2 ring-amber-300'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
            }
          `}
          title={annotationMode ? 'Exit annotation mode' : 'Give feedback'}
        >
          {/* Pencil / annotation icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span className="hidden sm:inline">
            {annotationMode ? 'Exit Feedback' : 'Give Feedback'}
          </span>
        </button>

        {/* Badge showing annotation count */}
        {annotations.length > 0 && (
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg text-xs font-medium
              bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <span>{annotations.length} annotation{annotations.length !== 1 ? 's' : ''}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Annotation mode banner */}
      {annotationMode && (
        <div className="fixed top-16 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div className="bg-amber-500 text-white text-sm px-4 py-1.5 rounded-b-lg shadow-md pointer-events-auto">
            Select text to annotate — click &quot;Exit Feedback&quot; when done
          </div>
        </div>
      )}

      {/* Selection popup */}
      {popup && (
        <div
          ref={popupRef}
          style={{
            position: 'absolute',
            left: `${Math.min(popup.x, (typeof window !== 'undefined' ? window.innerWidth - 320 : popup.x))}px`,
            top: `${popup.y}px`,
            transform: 'translateX(-50%)',
          }}
          className="z-[60] w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 p-3"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2 italic">
            &quot;{pendingText.slice(0, 100)}{pendingText.length > 100 ? '...' : ''}&quot;
          </p>
          <textarea
            ref={commentInputRef}
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            placeholder="Add your comment (optional)..."
            rows={2}
            className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-md p-2
              bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            onKeyDown={e => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                addAnnotation();
              }
            }}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => { setPopup(null); setPendingText(''); setCommentInput(''); }}
              className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2 py-1"
            >
              Cancel
            </button>
            <button
              onClick={addAnnotation}
              className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Annotations panel */}
      {panelOpen && annotations.length > 0 && (
        <div className="fixed bottom-28 left-4 z-50 w-80 max-h-[60vh] bg-white dark:bg-gray-800
          rounded-lg shadow-2xl border border-gray-200 dark:border-gray-600 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Annotations ({annotations.length})
            </h3>
            <button
              onClick={() => setPanelOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {annotations.map((a, i) => (
              <div key={a.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-2.5 text-sm relative group">
                <button
                  onClick={() => removeAnnotation(a.id)}
                  className="absolute top-1 right-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove annotation"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">#{i + 1}</p>
                <blockquote className="text-xs text-gray-600 dark:text-gray-300 italic border-l-2 border-blue-400 pl-2 mb-1 line-clamp-3">
                  {a.selectedText}
                </blockquote>
                {a.comment && (
                  <p className="text-xs text-gray-800 dark:text-gray-200 mt-1">{a.comment}</p>
                )}
              </div>
            ))}
          </div>

          <div className="px-3 py-3 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={submitAsIssue}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white text-sm
                font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Submit as GitHub Issue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
