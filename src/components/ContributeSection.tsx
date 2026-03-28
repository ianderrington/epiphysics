'use client';

import React, { useState } from 'react';

const GITHUB_REPO = 'supernalintelligence/epiphysics';
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

export default function ContributeSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mt-12 mb-8 mx-auto max-w-3xl px-4">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden
        bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900">
        {/* Header - always visible */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-5 py-4 text-left
            hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40
              flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Contribute to Epiphysics
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Found an error? Have a suggestion? We welcome contributions.
              </p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Expandable content */}
        {expanded && (
          <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700/50">
            <div className="pt-4 space-y-4">
              {/* Quick links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`${GITHUB_URL}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-3 rounded-md
                    bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600
                    hover:border-blue-300 dark:hover:border-blue-500 transition-colors
                    text-sm text-gray-700 dark:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span>Browse open issues</span>
                </a>
                <a
                  href={`${GITHUB_URL}/issues/new?labels=community-feedback`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-3 rounded-md
                    bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600
                    hover:border-blue-300 dark:hover:border-blue-500 transition-colors
                    text-sm text-gray-700 dark:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>Submit new feedback</span>
                </a>
              </div>

              {/* How to contribute */}
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">How to contribute</h4>
                <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed">
                  <li>
                    <strong>Feedback:</strong> Use the &quot;Give Feedback&quot; button to highlight text and submit annotated critiques as GitHub issues.
                  </li>
                  <li>
                    <strong>Issues:</strong> Report errors, suggest improvements, or ask questions via{' '}
                    <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      GitHub Issues
                    </a>.
                  </li>
                  <li>
                    <strong>Pull requests:</strong> Fork the repo and submit PRs for content corrections, new references, or structural improvements.
                  </li>
                  <li>
                    <strong>AI agents:</strong> AI-assisted contributions are welcome. Please note AI involvement in your PR description.
                  </li>
                </ul>
              </div>

              {/* Repo link */}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                {GITHUB_REPO}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
