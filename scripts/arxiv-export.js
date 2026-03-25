#!/usr/bin/env node
/**
 * arxiv-export.js
 * 
 * Converts a theory Markdown document to arXiv-ready LaTeX.
 * Single source of truth: Markdown files are the canonical source.
 * 
 * Usage:
 *   node scripts/arxiv-export.js <input.md> [--output arxiv/paper.tex]
 *   node scripts/arxiv-export.js docs/theory/causeplex_loop_phase.md
 *
 * What it handles:
 *   - YAML frontmatter → \title, \author, \date, \begin{abstract}
 *   - Math ($...$, $$...$$) → LaTeX math (preserved as-is by pandoc)
 *   - **Theorem/Lemma/Proposition/Corollary/Definition/Remark/Proof** blocks → amsthm environments
 *   - Mermaid blocks → \begin{figure} placeholder with SVG filename
 *   - Status tables → regular LaTeX tables
 *   - Citations → \cite{} with auto-generated .bib
 *   - Markdown links to other theory docs → \href or footnote
 *   - Runs pandoc for the main conversion
 *
 * Requirements: pandoc (brew install pandoc)
 */

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ─── Config ───────────────────────────────────────────────────────────────────

const REPO_ROOT = path.join(__dirname, '..');
const ARXIV_DIR = path.join(REPO_ROOT, 'arxiv');
const TEMPLATE_PATH = path.join(__dirname, 'arxiv-template.tex');

// ─── Theorem environment mapping ──────────────────────────────────────────────

const THEOREM_PATTERNS = [
  { regex: /^\*\*Theorem\s+([\d.]+[a-z]?)\s+\(([^)]+)\)\.\*\*\s*(.*)/,     env: 'theorem',     numLabel: true },
  { regex: /^\*\*Theorem\s+([\d.]+[a-z]?)\s*\.\*\*\s*(.*)/,                 env: 'theorem',     numLabel: true },
  { regex: /^\*\*Lemma\s+([\d.]+[a-z]?)\s+\(([^)]+)\)\.\*\*\s*(.*)/,       env: 'lemma',       numLabel: true },
  { regex: /^\*\*Lemma\s+([\d.]+[a-z]?)\s*\.\*\*\s*(.*)/,                   env: 'lemma',       numLabel: true },
  { regex: /^\*\*Proposition\s+([\d.]+[a-z]?)\s+\(([^)]+)\)\.\*\*\s*(.*)/,  env: 'proposition', numLabel: true },
  { regex: /^\*\*Proposition\s+([\d.]+[a-z]?)\s*\.\*\*\s*(.*)/,             env: 'proposition', numLabel: true },
  { regex: /^\*\*Corollary\s+([\d.]+[a-z]?)\s+\(([^)]+)\)\.\*\*\s*(.*)/,   env: 'corollary',   numLabel: true },
  { regex: /^\*\*Corollary\s+([\d.]+[a-z]?)\s*\.\*\*\s*(.*)/,              env: 'corollary',   numLabel: true },
  { regex: /^\*\*Definition\s+([\d.]+[a-z]?)\s+\(([^)]+)\)\.\*\*\s*(.*)/,  env: 'definition',  numLabel: true },
  { regex: /^\*\*Definition\s+([\d.]+[a-z]?)\s*\.\*\*\s*(.*)/,             env: 'definition',  numLabel: true },
  { regex: /^\*\*Remark\s+([\d.]+[a-z]?)\s*\.\*\*\s*(.*)/,                 env: 'remark',      numLabel: true },
  { regex: /^\*\*Conjecture\s+([\d.]+[a-z]?)\s+\(([^)]+)\)\.\*\*\s*(.*)/,  env: 'conjecture',  numLabel: true },
  { regex: /^\*\*Conjecture\s+([\d.]+[a-z]?)\s*\.\*\*\s*(.*)/,             env: 'conjecture',  numLabel: true },
  { regex: /^\*\*Identification\s+([\d.]+[a-z]?)\s+\(([^)]+)\)\.\*\*\s*(.*)/, env: 'remark',  numLabel: true },
  { regex: /^\*\*Postulate\s+(\w+)\s+\(([^)]+)\)\.\*\*\s*(.*)/,            env: 'assumption',  numLabel: false },
  { regex: /^\*\*Postulate\s+(\w+)\s*\.\*\*\s*(.*)/,                        env: 'assumption',  numLabel: false },
  { regex: /^\*\*Condition\s+(\w+)\s+\(([^)]+)\)\.\*\*\s*(.*)/,            env: 'assumption',  numLabel: false },
  { regex: /^\*\*Proof\.\*\*\s*(.*)/,                                        env: 'proof',       numLabel: false },
  { regex: /^\*\*Proof\s+of\s+([^.]+)\.\*\*\s*(.*)/,                        env: 'proof',       numLabel: false },
];

// ─── Parse frontmatter ────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };
  
  const yamlLines = match[1].split('\n');
  const meta = {};
  let currentKey = null;
  let descBuffer = [];
  
  for (const line of yamlLines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      if (currentKey === 'description' && descBuffer.length) {
        meta[currentKey] = descBuffer.join(' ').trim();
        descBuffer = [];
      }
      currentKey = keyMatch[1];
      if (keyMatch[2]) meta[currentKey] = keyMatch[2].replace(/^["']|["']$/g, '');
      else meta[currentKey] = '';
    } else if (currentKey === 'description' && line.match(/^\s+\S/)) {
      descBuffer.push(line.trim());
    } else if (line.match(/^\s+name:\s+(.+)/) && currentKey === 'author') {
      meta.authorName = line.match(/name:\s+(.+)/)[1];
    }
  }
  if (currentKey === 'description' && descBuffer.length) {
    meta.description = descBuffer.join(' ').trim();
  }
  
  return { meta, body: match[2] };
}

// ─── Extract and collect citations ────────────────────────────────────────────

const bibEntries = {};

const KNOWN_REFS = {
  'Sorkin 1994':   { key: 'Sorkin1994', entry: '@article{Sorkin1994,\n  author={Sorkin, Rafael D.},\n  title={Quantum Mechanics as Quantum Measure Theory},\n  journal={Modern Physics Letters A},\n  volume={9},\n  number={33},\n  pages={3119--3127},\n  year={1994},\n  doi={10.1142/S021773239400294X}\n}' },
  'Baez 2012':     { key: 'Baez2012',   entry: '@article{Baez2012,\n  author={Baez, John C.},\n  title={Division Algebras and Quantum Theory},\n  journal={Foundations of Physics},\n  volume={42},\n  number={7},\n  pages={819--855},\n  year={2012},\n  doi={10.1007/s10701-011-9566-z}\n}' },
  'Renou 2021':    { key: 'Renou2021',  entry: '@article{Renou2021,\n  author={Renou, Marc-Olivier and others},\n  title={Quantum theory based on real numbers can be experimentally falsified},\n  journal={Nature},\n  volume={600},\n  pages={625--629},\n  year={2021},\n  doi={10.1038/s41586-021-04160-4}\n}' },
  'Malament 1977': { key: 'Malament1977', entry: '@article{Malament1977,\n  author={Malament, David B.},\n  title={The class of continuous timelike curves determines the topology of spacetime},\n  journal={Journal of Mathematical Physics},\n  volume={18},\n  number={7},\n  pages={1399--1404},\n  year={1977},\n  doi={10.1063/1.523436}\n}' },
  'Bombelli 1987': { key: 'Bombelli1987', entry: '@article{Bombelli1987,\n  author={Bombelli, Luca and Lee, Joohan and Meyer, David and Sorkin, Rafael D.},\n  title={Space-time as a causal set},\n  journal={Physical Review Letters},\n  volume={59},\n  number={5},\n  pages={521--524},\n  year={1987},\n  doi={10.1103/PhysRevLett.59.521}\n}' },
  'Benincasa 2010': { key: 'Benincasa2010', entry: '@article{Benincasa2010,\n  author={Benincasa, Dionigi M. T. and Dowker, Fay},\n  title={Scalar Curvature of a Causal Set},\n  journal={Physical Review Letters},\n  volume={104},\n  number={18},\n  pages={181301},\n  year={2010},\n  doi={10.1103/PhysRevLett.104.181301}\n}' },
  'Gorard 2020':   { key: 'Gorard2020',  entry: '@article{Gorard2020,\n  author={Gorard, Jonathan},\n  title={Some Quantum Mechanical Properties of the Wolfram Model},\n  journal={Complex Systems},\n  volume={29},\n  number={2},\n  pages={537--598},\n  year={2020},\n  doi={10.25088/ComplexSystems.29.2.537}\n}' },
  'Wolfram 2020':  { key: 'Wolfram2020', entry: '@article{Wolfram2020,\n  author={Wolfram, Stephen},\n  title={A Class of Models with the Potential to Represent Fundamental Physics},\n  journal={Complex Systems},\n  volume={29},\n  number={2},\n  pages={107--536},\n  year={2020},\n  doi={10.25088/ComplexSystems.29.2.107}\n}' },
  'Gleason 1957':  { key: 'Gleason1957', entry: '@article{Gleason1957,\n  author={Gleason, Andrew M.},\n  title={Measures on the Closed Subspaces of a Hilbert Space},\n  journal={Journal of Mathematics and Mechanics},\n  volume={6},\n  number={6},\n  pages={885--893},\n  year={1957}\n}' },
  'Hurwitz 1898':  { key: 'Hurwitz1898', entry: "@article{Hurwitz1898,\n  author={Hurwitz, Adolf},\n  title={{\\\"U}ber die Composition der quadratischen Formen von beliebig vielen Variabeln},\n  journal={Nachrichten von der Gesellschaft der Wissenschaften zu G{\\\"o}ttingen},\n  pages={309--316},\n  year={1898}\n}" },
  'Barcelo 2001':  { key: 'Barcelo2001', entry: '@article{Barcelo2001,\n  author={Barcelo, Hélène and Kramer, Xenia and Laubenbacher, Reinhard and Weaver, Christopher},\n  title={Foundations of a Connectivity Theory for Simplicial Complexes},\n  journal={Advances in Applied Mathematics},\n  volume={26},\n  number={2},\n  pages={97--128},\n  year={2001},\n  doi={10.1006/aama.2000.0710}\n}' },
  'Tegmark 1997':  { key: 'Tegmark1997', entry: '@article{Tegmark1997,\n  author={Tegmark, Max},\n  title={On the dimensionality of spacetime},\n  journal={Classical and Quantum Gravity},\n  volume={14},\n  number={4},\n  pages={L69--L75},\n  year={1997},\n  doi={10.1088/0264-9381/14/4/002}\n}' },
  'Feynman 1965':  { key: 'Feynman1965', entry: '@book{Feynman1965,\n  author={Feynman, Richard P. and Hibbs, Albert R.},\n  title={Quantum Mechanics and Path Integrals},\n  publisher={McGraw-Hill},\n  year={1965}\n}' },
};

function collectCitations(text) {
  const cited = new Set();
  for (const [name, ref] of Object.entries(KNOWN_REFS)) {
    if (text.includes(name)) {
      cited.add(name);
      bibEntries[ref.key] = ref.entry;
    }
  }
  return cited;
}

// ─── Preprocessing pipeline ───────────────────────────────────────────────────

function preprocessMarkdown(content, outputBase) {
  let text = content;
  const figures = [];

  // 1. Remove YAML frontmatter (already parsed)
  text = text.replace(/^---\n[\s\S]*?\n---\n/, '');

  // 2. Remove prerequisite callouts (> **Prerequisites...**)
  text = text.replace(/^> \*\*(Prerequisites|Layer architecture note)\.\*\*[\s\S]*?\n\n/gm, '');

  // 3. Replace Mermaid blocks with figure placeholders
  let figCount = 0;
  text = text.replace(/```mermaid\n([\s\S]*?)```/g, (match, diagram) => {
    figCount++;
    const figName = `${outputBase}-fig${figCount}.pdf`;
    figures.push({ num: figCount, name: figName, diagram: diagram.trim() });
    return `\n\\begin{figure}[htbp]\n\\centering\n\\includegraphics[width=0.9\\textwidth]{${figName}}\n\\caption{[Figure ${figCount}: diagram — see source for Mermaid definition]}\n\\label{fig:${outputBase}-${figCount}}\n\\end{figure}\n`;
  });

  // 4. Remove status badges that don't render well: ✅ → (proved), ⚠️ → (conditional), 🧭 → (postulate)
  text = text.replace(/✅/g, '(\\checkmark)');
  text = text.replace(/⚠️/g, '(\\triangle)');
  text = text.replace(/🧭/g, '(\\ast)');
  text = text.replace(/🧱/g, '');
  text = text.replace(/❌/g, '(\\times)');

  // 5. Theorem/Lemma/Proof block conversion
  // Pattern: **Theorem X.Y (Name).** *statement* → \begin{theorem}[Name]\label{thm:XY} statement \end{theorem}
  const lines = text.split('\n');
  const result = [];
  let inTheorem = false;
  let currentEnv = null;
  let currentLabel = null;
  let theoremBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let matched = false;

    for (const pat of THEOREM_PATTERNS) {
      const m = line.match(pat.regex);
      if (m) {
        // Flush any open theorem
        if (inTheorem && currentEnv) {
          result.push(...theoremBuffer);
          result.push(`\\end{${currentEnv}}`);
          result.push('');
          inTheorem = false;
          theoremBuffer = [];
        }

        const env = pat.env;
        // Extract number and optional name
        let num = '', name = '', rest = '';
        if (pat.numLabel) {
          num = m[1] || '';
          name = m[3] ? m[2] : '';
          rest = m[3] || m[2] || '';
        } else {
          name = m[2] || m[1] || '';
          rest = m[3] || m[2] || '';
        }

        const label = `${env}:${num.replace(/\./g, '-')}`;
        const nameStr = name ? `[${name}]` : '';

        if (env === 'proof') {
          result.push(`\\begin{proof}`);
          if (rest) result.push(rest.replace(/\*([^*]+)\*/g, '$1'));
        } else {
          result.push(`\\begin{${env}}${nameStr}`);
          if (num) result.push(`\\label{${label}}`);
          if (rest) result.push(rest.replace(/\*([^*]+)\*/g, '$1'));
        }

        inTheorem = true;
        currentEnv = env;
        currentLabel = label;
        theoremBuffer = [];
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Detect end of theorem block: empty line followed by non-theorem content
      if (inTheorem) {
        if (line.trim() === '' || line.startsWith('**')) {
          // Check if next non-empty line starts a new block
          let nextMeaningful = '';
          for (let j = i + 1; j < lines.length && j < i + 3; j++) {
            if (lines[j].trim()) { nextMeaningful = lines[j]; break; }
          }
          const isEndOfBlock = line.trim() === '' && (!nextMeaningful.startsWith('*') || nextMeaningful.startsWith('**Proof'));
          if (isEndOfBlock || line === '$\\square$' || line.includes('\\square') || line.match(/\$\\square\$/)) {
            result.push(...theoremBuffer);
            if (line.includes('\\square') || line.match(/\$\\square\$/)) result.push('');
            result.push(`\\end{${currentEnv}}`);
            result.push('');
            inTheorem = false;
            theoremBuffer = [];
            currentEnv = null;
          } else {
            theoremBuffer.push(line);
          }
        } else {
          theoremBuffer.push(line);
        }
      } else {
        result.push(line);
      }
    }
  }

  // Flush any remaining theorem
  if (inTheorem && currentEnv) {
    result.push(...theoremBuffer);
    result.push(`\\end{${currentEnv}}`);
    result.push('');
  }

  text = result.join('\n');

  // 6. Convert inline citation patterns like "Baez (2012)" → \cite{Baez2012}
  for (const [name, ref] of Object.entries(KNOWN_REFS)) {
    // Match "[Author YYYY]" or "Author (YYYY)" patterns  
    const authorYear = name.split(' ');
    const author = authorYear[0];
    const year = authorYear[1];
    // Replace [Author Year, ...] style
    text = text.replace(new RegExp(`\\[${author}[^\\]]*${year}[^\\]]*\\]`, 'g'), `\\cite{${ref.key}}`);
    // Replace Author (Year) style  
    text = text.replace(new RegExp(`${author}\\s+\\(${year}[^)]*\\)`, 'g'), `${author} \\cite{${ref.key}}`);
  }

  // 7. Convert internal cross-links to footnotes
  text = text.replace(/\[([^\]]+)\]\(\.\/([^)]+)\.md([^)]*)\)/g, (match, text, file, anchor) => {
    return `${text}\\footnote{See companion document: \\texttt{${file}}}`;
  });

  // 8. Remove markdown horizontal rules
  text = text.replace(/^---+$/gm, '\\medskip');

  // 9. Fix $\square$ at end of proofs → proper qed
  text = text.replace(/\$\\square\$/g, '\\qed');

  return { text, figures };
}

// ─── LaTeX template ───────────────────────────────────────────────────────────

function buildPreamble(meta) {
  return `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb,amsthm}
\\usepackage{hyperref}
\\usepackage{graphicx}
\\usepackage{xcolor}
\\usepackage{booktabs}
\\usepackage{geometry}
\\geometry{margin=1in}

% Theorem environments
\\newtheorem{theorem}{Theorem}[section]
\\newtheorem{lemma}[theorem]{Lemma}
\\newtheorem{proposition}[theorem]{Proposition}
\\newtheorem{corollary}[theorem]{Corollary}
\\newtheorem{conjecture}[theorem]{Conjecture}
\\theoremstyle{definition}
\\newtheorem{definition}[theorem]{Definition}
\\newtheorem{assumption}[theorem]{Postulate}
\\theoremstyle{remark}
\\newtheorem{remark}[theorem]{Remark}

% Cause-plex notation shortcuts
\\newcommand{\\CC}{\\mathcal{C}}
\\newcommand{\\Cstar}{\\mathcal{C}^*}
\\newcommand{\\prec}{\\prec}
\\newcommand{\\loopspace}{\\Omega(\\mathcal{C}^*, e_*)}

\\title{${meta.title || 'Untitled'}}
\\author{${(meta.authorName || meta.author || 'Ian Derrington').replace(/^["']|["']$/g, '')}}
\\date{${new Date().toISOString().split('T')[0]}}

\\begin{document}
\\maketitle

\\begin{abstract}
${(meta.description || '').replace(/\s+/g, ' ').trim()}
\\end{abstract}

`;
}

function buildEnd(bibFile) {
  return `
\\bibliographystyle{plain}
\\bibliography{${bibFile}}

\\end{document}
`;
}

// ─── Main export function ─────────────────────────────────────────────────────

function exportToArxiv(inputPath, outputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(inputPath, 'utf8');
  const { meta, body } = parseFrontmatter(rawContent);

  const outputBase = path.basename(outputPath, '.tex');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // Collect citations before processing
  collectCitations(rawContent);

  // Preprocess markdown
  const { text: processedMd, figures } = preprocessMarkdown(body, outputBase);

  // Write temp file for pandoc
  const tmpMd = path.join(outputDir, `_tmp_${outputBase}.md`);
  fs.writeFileSync(tmpMd, processedMd);

  // Run pandoc: markdown → LaTeX body only (no preamble)
  const pandocResult = spawnSync('pandoc', [
    tmpMd,
    '-f', 'markdown+tex_math_dollars+smart',
    '-t', 'latex',
    '--no-highlight',
  ], { encoding: 'utf8' });

  fs.unlinkSync(tmpMd);

  if (pandocResult.error) {
    console.error('Pandoc error:', pandocResult.error.message);
    process.exit(1);
  }
  if (pandocResult.status !== 0) {
    console.error('Pandoc stderr:', pandocResult.stderr);
    process.exit(1);
  }

  let latexBody = pandocResult.stdout;

  // Build full document
  const bibFile = outputBase;
  const preamble = buildPreamble(meta);
  const ending = buildEnd(bibFile);
  const fullTex = preamble + latexBody + ending;

  // Write .tex
  fs.writeFileSync(outputPath, fullTex);
  console.log(`✅ LaTeX written: ${outputPath}`);

  // Write .bib
  const bibPath = path.join(outputDir, `${outputBase}.bib`);
  const bibContent = Object.values(bibEntries).join('\n\n');
  fs.writeFileSync(bibPath, bibContent);
  console.log(`✅ BibTeX written: ${bibPath} (${Object.keys(bibEntries).length} entries)`);

  // Report figures that need manual generation
  if (figures.length > 0) {
    console.log(`\n⚠️  ${figures.length} Mermaid diagram(s) need manual export to PDF:`);
    figures.forEach(f => {
      console.log(`   Figure ${f.num}: ${f.name}`);
      console.log(`   (Export the Mermaid diagram from the source MD to PDF/PNG, place in ${outputDir}/)`);
    });
  }

  // Summary
  console.log(`\n📄 arXiv submission files in: ${outputDir}/`);
  console.log(`   ${path.basename(outputPath)}`);
  console.log(`   ${path.basename(bibPath)}`);
  if (figures.length) console.log(`   + ${figures.length} figure file(s) needed`);
  console.log(`\n📦 To submit: zip the directory and upload to arxiv.org`);

  return { outputPath, bibPath, figures };
}

// ─── CLI ──────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(`Usage: node scripts/arxiv-export.js <input.md> [--output arxiv/paper.tex]`);
  console.log(`\nExample:`);
  console.log(`  node scripts/arxiv-export.js docs/theory/causeplex_loop_phase.md`);
  console.log(`  node scripts/arxiv-export.js docs/theory/causeplex_loop_phase.md --output arxiv/loop_phase.tex`);
  process.exit(0);
}

const inputPath = path.resolve(REPO_ROOT, args[0]);
let outputPath;

const outIdx = args.indexOf('--output');
if (outIdx !== -1 && args[outIdx + 1]) {
  outputPath = path.resolve(REPO_ROOT, args[outIdx + 1]);
} else {
  const baseName = path.basename(inputPath, '.md');
  outputPath = path.join(ARXIV_DIR, baseName, `${baseName}.tex`);
}

exportToArxiv(inputPath, outputPath);
