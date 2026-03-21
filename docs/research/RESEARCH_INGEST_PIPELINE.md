---
title: "Research Ingest Pipeline (arXiv → Epiphysics)"
description: >-
  Repeatable pipeline for importing foundational papers into Epiphysics research
  sources with reproducible artifacts for downstream computational work.
date: 2026-03-21T00:00:00.000Z
draft: false
author:
  name: "epiphysics-open-source"
contentType: article
series: "Research Methods"
coverImage:
  url: ./images/research-ingest-pipeline.png
  alt: "Automated pipeline converting arXiv PDFs into structured research markdown and source text"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

## Purpose

Standardize how we ingest foundational papers so every source has:

1. Original PDF snapshot
2. Plain text extraction
3. A markdown research file with required frontmatter and full text for search/citation

## Script

`/scripts/research/ingest_arxiv_paper.py`

### Inputs
- `arxiv_id` (required), e.g. `1910.12478`
- `--slug` (optional), output markdown slug
- `--title` (optional), markdown title
- `--description` (optional)
- `--alt` (optional), cover alt text prompt

### Outputs
- `docs/research/sources/<arxiv_id>.pdf`
- `docs/research/sources/<arxiv_id>.txt`
- `docs/research/<slug>_full_extraction.md`

## Usage

```bash
python3 scripts/research/ingest_arxiv_paper.py 1910.12478 \
  --slug tensor_programs_i_1910_12478 \
  --title "Tensor Programs I (arXiv:1910.12478) — Full Text Extraction"
```

## Next stage (analysis pipeline)

After ingestion, create a companion analysis note per paper:

- theorem/lemma list
- notation map
- implementation equations and assumptions
- relevance to Epimechanics hypotheses
- unresolved gaps for computational testing

Recommended naming:
`docs/research/<slug>_analysis.md`
