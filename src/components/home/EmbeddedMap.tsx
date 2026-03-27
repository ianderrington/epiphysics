'use client';

import Link from 'next/link';

interface PaperNode {
  title: string;
  subtitle: string;
  href: string;
  track: 'core' | 'physics';
}

const corePapers: PaperNode[] = [
  { title: 'Foundations', subtitle: 'What is causation? What is an entity?', href: '/theory/00_prelude', track: 'core' },
  { title: 'Mechanics', subtitle: 'F=dp/dt for any domain', href: '/theory/01_generalized_mechanics', track: 'core' },
  { title: 'Causors', subtitle: 'What stable things are made of', href: '/theory/01_5_causors', track: 'core' },
  { title: 'Meta-Entities', subtitle: 'When aggregates become entities', href: '/theory/02_meta_entities', track: 'core' },
  { title: 'Intelligence', subtitle: 'What entities know and do', href: '/theory/03_intelligence_consciousness_agency', track: 'core' },
  { title: 'Ontology', subtitle: 'The full picture', href: '/theory/05_ontology_and_open_questions', track: 'core' },
];

const physicsPapers: PaperNode[] = [
  { title: 'Spacetime', subtitle: 'Where the metric comes from', href: '/theory/causeplex_spacetime', track: 'physics' },
  { title: 'Quantum Mechanics', subtitle: 'Where the wave function comes from', href: '/theory/causeplex_quantum', track: 'physics' },
  { title: 'Complex Numbers', subtitle: 'Why i appears in physics', href: '/theory/amplitude-phase-fixed-point-paper', track: 'physics' },
];

export default function EmbeddedMap() {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            The Framework
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Two tracks: the conceptual framework and its physics foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Core Series */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Conceptual Framework
            </h3>
            <div className="space-y-2">
              {corePapers.map((paper, i) => (
                <Link
                  key={paper.href}
                  href={paper.href}
                  className="flex items-center p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 group"
                >
                  <span className="text-gray-400 dark:text-gray-500 font-mono text-sm w-5 shrink-0">{i + 1}</span>
                  <div className="ml-3 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{paper.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{paper.subtitle}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Physics Track */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Physics Foundations
            </h3>
            <div className="space-y-2">
              {physicsPapers.map((paper, i) => (
                <Link
                  key={paper.href}
                  href={paper.href}
                  className="flex items-center p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md transition-all duration-200 group"
                >
                  <span className="text-gray-400 dark:text-gray-500 font-mono text-sm w-5 shrink-0">{i + 1}</span>
                  <div className="ml-3 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">{paper.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{paper.subtitle}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Reading path note */}
            <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>New here?</strong> Start with Foundations in the conceptual track.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/theory/series_map"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Full series map with dependencies →
          </Link>
        </div>
      </div>
    </section>
  );
}
