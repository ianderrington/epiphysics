'use client';

import Link from 'next/link';

interface PaperNode {
  title: string;
  subtitle: string;
  href: string;
  status: 'proved' | 'conditional' | 'draft';
  track: 'core' | 'physics';
}

const corePapers: PaperNode[] = [
  { title: 'Part 0: Foundations', subtitle: 'What is causation? What is an entity?', href: '/theory/00_prelude', status: 'proved', track: 'core' },
  { title: 'Part 1: Mechanics', subtitle: 'F=dp/dt for any domain', href: '/theory/01_generalized_mechanics', status: 'proved', track: 'core' },
  { title: 'Part 1.5: Causors', subtitle: 'What stable things are made of', href: '/theory/01_5_causors', status: 'proved', track: 'core' },
  { title: 'Part 2: Meta-Entities', subtitle: 'When aggregates become entities', href: '/theory/02_meta_entities', status: 'proved', track: 'core' },
  { title: 'Part 3: Intelligence', subtitle: 'What entities know and do', href: '/theory/03_intelligence_consciousness_agency', status: 'proved', track: 'core' },
  { title: 'Part 5: Ontology', subtitle: 'Full formal ontology + open questions', href: '/theory/05_ontology_and_open_questions', status: 'proved', track: 'core' },
];

const physicsPapers: PaperNode[] = [
  { title: 'Spacetime', subtitle: 'Lorentzian metric from causal order', href: '/theory/causeplex_spacetime', status: 'proved', track: 'physics' },
  { title: 'Quantum Mechanics', subtitle: 'QM from multiway causal structure', href: '/theory/causeplex_quantum', status: 'conditional', track: 'physics' },
  { title: 'U(1) Fixed-Point', subtitle: 'Why quantum mechanics uses complex numbers', href: '/theory/amplitude-phase-fixed-point-paper', status: 'proved', track: 'physics' },
];

const statusColors = {
  proved: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  conditional: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  draft: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const statusLabels = {
  proved: 'Proved',
  conditional: 'Conditional',
  draft: 'Draft',
};

export default function EmbeddedMap() {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            The Framework at a Glance
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Every paper. Click to read. Green = proved. Yellow = conditional on named assumptions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Core Series */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Core Series — the framework
            </h3>
            <div className="space-y-2">
              {corePapers.map((paper, i) => (
                <Link
                  key={paper.href}
                  href={paper.href}
                  className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-gray-400 dark:text-gray-500 font-mono text-sm w-5 shrink-0">{i + 1}</span>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">{paper.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{paper.subtitle}</div>
                    </div>
                  </div>
                  <span className={`ml-3 shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[paper.status]}`}>
                    {statusLabels[paper.status]}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Physics Track */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Physics Foundations — the derivations
            </h3>
            <div className="space-y-2">
              {physicsPapers.map((paper, i) => (
                <Link
                  key={paper.href}
                  href={paper.href}
                  className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-gray-400 dark:text-gray-500 font-mono text-sm w-5 shrink-0">{i + 1}</span>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 truncate">{paper.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{paper.subtitle}</div>
                    </div>
                  </div>
                  <span className={`ml-3 shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[paper.status]}`}>
                    {statusLabels[paper.status]}
                  </span>
                </Link>
              ))}
            </div>

            {/* Reading path note */}
            <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>New here?</strong> Read the Core Series first. The Physics track requires the spacetime paper before the quantum paper.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/theory/series_map"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Full series map with proof status and dependency graph →
          </Link>
        </div>
      </div>
    </section>
  );
}
