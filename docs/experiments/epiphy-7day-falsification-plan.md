---
title: "Epiphy 7-Day Falsification Plan (Meta-Entity + AI)"
description: >-
  A pre-registered, fast-falsification execution plan for testing core Epiphysics claims in
  AI and AI-mediated systems: quadratic vs quartic baseline, meta-entity threshold behavior,
  and proxy robustness for generalized mass/coupling.
date: 2026-03-21T00:00:00.000Z
draft: true
author:
  name: "Epiphysics"
contentType: article
series: "Experiments"
coverImage:
  url: ./images/epiphy-7day-falsification-plan.png
  alt: >-
    A seven-day experimental roadmap with decision gates, kill criteria, and branching outcomes,
    shown as a clean systems diagram in blueprint style.
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

## Goal

Run the shortest disconfirming chain for three linked claims:

1. Quadratic kinetic form is sufficient under complexity-penalized prediction.
2. Macro-level causal signal in AI collectives emerges only past coupling thresholds.
3. Generalized mass/coupling proxies are measurable and robust enough for theory tests.

## Operating Constraints

- Core theory-test WIP = 1.
- Hard timebox: 6h max per experiment phase before checkpoint.
- No application writing until one full falsification cycle completes.
- Every claim in outputs tagged with source + experiment id.
- Bounded recurrence: max 2 full cycles before mandatory framework-review branch.

---

## Track Split

### Track A — Instrumentation Validity
Question: *Can we measure proxies reliably?*

### Track B — Theory Tests
Question: *Do predicted structures hold once proxies are measurable?*

Track A must pass minimum reliability before Track B claims are promoted.

### Minimum Reliability Gate (Track A)

Before any Track B claim is considered valid:
- Test-retest reliability: ICC(2,1) >= 0.80 for primary proxies
- Regime discrimination: AUROC >= 0.75 against prespecified regime labels
- Drift under perturbation: <= 10% coefficient of variation across reruns

If any criterion fails, Track B results are tagged exploratory only.

---

## Experiment Register

## EPIHY-EXP-002 — Quadratic vs Quartic Baseline (Day 1–2)

### Hypothesis
Quadratic model matches or outperforms quartic under complexity-penalized predictive scoring on low-dimensional time series.

### Metrics
- Predictive NLL (or MSE fallback if likelihood unavailable)
- BIC/MDL-style complexity penalty
- Seed/split stability

### Pre-registered Dataset + Sample Plan
- Primary dataset: synthetic reversible oscillator benchmark generated from known quadratic dynamics with controlled noise.
- Secondary dataset: synthetic mildly non-ideal benchmark with weak higher-order perturbation.
- Splits/seeds: 5 fixed train/test splits x 10 fixed seeds (50 runs/model).

### Null Baseline
- Label-shuffled target baseline and phase-randomized trajectory baseline.
- A model comparison result is only considered meaningful if both fitted models outperform null baselines on held-out error.

### Fail / Kill Criteria
- **Kill quadratic-first assumption** if quartic beats quadratic by DeltaBIC >= 10 in >= 80% of runs.
- **Inconclusive** if 2 <= median DeltaBIC < 10 or win-rate < 80%; proceed only with explicit uncertainty note.
- **Pause and redesign data protocol** if coefficient of variation of DeltaBIC > 0.50 across runs.
- **Timebox gate:** if protocol cannot be finalized and executed in 12h total, reduce scope to one canonical dataset and rerun.

### Output
One table, one verdict, one next-step decision.

---

## EPIHY-EXP-003 — Meta-Entity Coupling Threshold Test (Day 2–4)

### Hypothesis
Macro-level effective information gain appears only after crossing a coupling regime threshold in a controlled multi-agent workflow.

### Setup
- Minimal AI collective with controllable coupling parameter(s)
- Two settings/datasets to check structure repeatability

### Pre-registered Coupling Sweep
- Coupling parameter alpha in [0.0, 1.0] with step 0.1 (11 levels), fixed before runs.
- 20 replications per alpha per setting with fixed random seeds.
- Threshold estimator: segmented regression with one breakpoint, selected by AIC.

### Metrics
- Macro vs micro predictive/casual-information delta (predefined estimator)
- Threshold detection quality (piecewise/segmented fit preferred)
- Cross-setting consistency

### Null Baseline
- Permutation null: shuffle agent-to-agent interaction edges while preserving degree distribution.
- Threshold claim requires observed breakpoint improvement over null at p < 0.05 (bootstrap).

### Blinding
- Coupling labels hidden during first-pass threshold fitting; labels revealed only after breakpoint candidate is logged.

### Fail / Kill Criteria
- **Fail claim** if no threshold-like regime shift appears in both settings.
- **Fail estimator** if Kendall tau rank consistency across replications < 0.6.
- **Timebox gate:** if controllable coupling cannot be implemented in 6h, reduce model complexity and preserve sweep integrity.

### Output
Threshold plot(s), fit summary, pass/fail against threshold hypothesis.

---

## EPIHY-EXP-004 — Proxy Robustness Stress Test (Day 4–6)

### Hypothesis
Generalized mass and coupling proxies are stable under perturbation and separate known dynamic regimes.

### Metrics
- Test-retest stability under perturbations
- Sensitivity/specificity for regime separation
- Drift over reruns

### Null Baseline
- Randomized proxy assignment baseline; require proxy AUROC to exceed null AUROC by >= 0.10.

### Fail / Kill Criteria
- **Fail proxy set** if ICC < 0.80, AUROC < 0.75, or drift > 10% CV.
- **Fail deployment readiness** if proxies are non-identifiable under small instrumentation changes.
- **Timebox gate:** after 6h without stable proxy behavior, freeze and document failure modes before any theory claims.

### Output
Robustness matrix + recommendation (keep/revise/drop each proxy).

---

## Day-by-Day Plan

- **D1:** lock protocol + pre-registration commit SHA, run EXP-002 baseline.
- **D2:** analyze EXP-002 and publish verdict memo with null-comparison table.
- **D3:** run EXP-004 proxy stress tests (Track A gate first).
- **D4:** robustness reruns; decide Track A pass/fail.
- **D5:** build and run EXP-003 coupling sweep (only if Track A passes).
- **D6:** EXP-003 reruns + blinded threshold analysis + null comparison.
- **D7:** synthesis checkpoint (go/no-go on application note vs framework revision).

---

## Decision Gate (Day 7)

Proceed to Part 2/3 application drafting **only if**:
1. EXP-002 produced stable, interpretable verdict.
2. EXP-003 shows threshold structure or yields a clear falsification.
3. EXP-004 yields at least one reliable proxy pair.

Otherwise: revise assumptions and rerun narrowed falsification loop.

Cycle policy:
- Cycle 1 failure -> revise protocol and run Cycle 2.
- Cycle 2 failure -> mandatory framework-review memo before any further reruns.

## Evidence Tagging Convention

Use inline tags in all memos:
- `Source: <path>`
- `Experiment: EPIHY-EXP-00X`
- `Status: pass|fail|inconclusive`

## Pre-registration Record

- Commit protocol and lock before first run.
- Record: `PreReg SHA: <git commit sha>` in each experiment memo.
