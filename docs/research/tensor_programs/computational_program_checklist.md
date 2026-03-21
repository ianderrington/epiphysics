---
title: "Tensor Programs → Epiphysics Computational Program Checklist"
description: >-
  End-to-end execution checklist to turn TP-series theory into auditable Epiphysics
  experiments with explicit falsification criteria.
date: 2026-03-21T00:00:00.000Z
draft: false
author:
  name: "epiphysics-open-source"
contentType: article
series: "Research Methods"
coverImage:
  url: ./images/tp-checklist.png
  alt: "Execution checklist linking theory assumptions to reproducible computational experiments"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

## Stage A — Source readiness (done)

- [x] TP0–TP6 PDFs downloaded
- [x] Plain text extraction for each paper
- [x] Full extraction markdown per paper
- [x] Series index file with paths

## Stage B — Theory extraction (done)

- [x] Notes file with per-paper relevance
- [x] Theorem/assumption matrix for implementation planning
- [x] Notation crosswalk with explicit non-equivalences

## Stage C — Experiment design (next)

- [ ] Define 3 benchmark tasks spanning:
  - frozen-kernel-favoring setting,
  - feature-learning-critical setting,
  - depth-sensitive residual setting.
- [ ] Pre-register measurable hypotheses per task.
- [ ] For each task, include at least one disconfirming criterion.

## Stage D — Instrumentation schema (next)

- [ ] Emit run metadata:
  - parametrization class,
  - optimizer class,
  - width/depth vectors,
  - LR schedule and batch settings.
- [ ] Emit dynamics observables:
  - update norms per layer,
  - representation drift,
  - kernel/tangent drift,
  - spectral diagnostics,
  - transfer regret.

## Stage E — Falsification logic (next)

- [ ] If NTK drift is high in claimed kernel regime, reject kernel-regime claim.
- [ ] If µTransfer fails under verified µP scaling, flag mismatch between assumptions and implementation.
- [ ] If depth transfer fails in depth-µP candidate setup, classify likely block-structure limitation.

## Stage F — Epiphysics-specific outputs (next)

- [ ] Derive preliminary proxies for:
  - generalized mass tensor behavior,
  - coupling tensor behavior,
  - representational cost vs predictive gain.
- [ ] Report where results are:
  - relabeling,
  - structural consequence,
  - genuinely novel.

## Required companion files

- `docs/research/tensor_programs/index.md`
- `docs/research/tensor_programs/notes_needed_for_epiphysics.md`
- `docs/research/tensor_programs/theorem_and_assumption_matrix.md`
- `docs/research/tensor_programs/notation_crosswalk_tp_to_epimechanics.md`

## Definition of done (for this phase)

This phase is done when:
1. all TP-series source artifacts are locally reproducible,
2. theorem-assumption-test mapping exists,
3. notation bridge and non-equivalence boundaries are explicit,
4. experiment checklist is concrete enough to implement without re-reading all papers.
