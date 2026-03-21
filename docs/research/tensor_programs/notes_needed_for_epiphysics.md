---
title: "Tensor Programs Series — Notes Needed for Epiphysics Computational Program"
description: >-
  Working notes from a first-pass review of TP0–TP6, focused on what matters for
  Epiphysics computational experiments, scaling laws, and representation dynamics.
date: 2026-03-21T00:00:00.000Z
draft: false
author:
  name: "epiphysics-open-source"
contentType: article
series: "Research Notes"
coverImage:
  url: ./images/tensor-programs-notes.png
  alt: "Annotated map from Tensor Programs theory to computational experiments"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

## Scope reviewed

Reviewed ingested sources in:

- `docs/research/tensor_programs/sources/*.txt`
- TP0, TP1, TP2, TP2b, TP3, TP4, TP4b, TP5, TP6

## Executive take

For our program, this series gives a **usable mathematical scaffold for scaling limits + training dynamics**. The strongest operational payoff is not just proofs of limits, but a way to design falsifiable experiments around:

1. **which parametrization class we are in** (kernel-like vs feature-learning),
2. **how update magnitude scales with width/depth**,
3. **which observables remain stable across scale** (HP transfer, dynamics invariants),
4. **where assumptions break** (finite width, non-ideal architecture/operator details).

That maps directly to Epiphysics goals around representational efficiency/cost under scaling.

## Per-paper notes (what we need)

### TP0 (1902.04760) — Scaling limits baseline

Need from this paper:
- Formal language + master-theorem-style perspective for wide-limit analysis.
- Relationship among GP behavior, gradient independence assumptions, and NTK derivations.
- Baseline assumptions we must track when we port this style of analysis to nonstandard agent/org systems.

Epiphysics relevance:
- Establishes the “thermodynamic limit” style move for representation dynamics.
- Use as a template for explicitly stating limiting regime and what observables converge.

### TP1 (1910.12478) — GP correspondence for broad architectures

Need:
- Kernel recursions and architecture coverage (MLP, RNN, attention, normalization, etc.).
- Conditions under which random wide nets become GPs at init.

Epiphysics relevance:
- Gives closed-form priors for representational behavior before learning.
- Useful as “zero-learning baseline” when testing whether observed structure is from architecture vs adaptation.

### TP2 (2006.14548) — Deterministic NTK limit at init

Need:
- Deterministic NTK convergence results for general architectures.
- Practical meaning and validity boundaries of gradient independence assumptions.

Epiphysics relevance:
- Provides linearized training benchmark: if behavior is explained by NTK-like regime, we should say so explicitly.
- Helps separate **relabeling** from genuinely new structural predictions.

### TP2b (2105.03703) — NTK training universality

Need:
- Conditions for kernel staying effectively frozen during training.
- Function-space dynamics mapping to kernel gradient descent.

Epiphysics relevance:
- Gives testable criterion for “low internal restructuring” regime in model organizations.
- Can be converted into a diagnostic: are we in frozen-kernel-like dynamics or not?

### TP3 (2009.10685) — Neural matrix laws / free-independence tools

Need:
- Jacobian spectral distribution results and random-matrix links.
- Free Independence Principle framing and caveats.

Epiphysics relevance:
- This is key for spectral proxies of representational geometry and stability.
- Candidate bridge to generalized mass/coupling proxies via Jacobian/Hessian spectra.

### TP4 (2011.14522) — Feature-learning limit + µP

Need:
- Exact scaling law that distinguishes kernel regime from feature-learning regime.
- Definition and constructive recipe for maximal update parametrization (µP).

Epiphysics relevance:
- Central for our computational program: feature-learning corresponds to internal representation reshaping, not just output-layer fitting.
- Gives a controllable intervention knob for experiments.

### TP4b (2308.01814) — Adaptive optimizer extension

Need:
- Generalization from SGD to Adam/momentum-like optimizers.
- Updated formalism for nonlinear “tangent” objects under adaptive updates.

Epiphysics relevance:
- Critical because most real systems are adaptive-optimizer systems.
- Prevents us from overfitting theory to SGD-only toy setups.

### TP5 (2203.03466) — µTransfer / zero-shot HP transfer

Need:
- Precise invariants for cross-width hyperparameter transfer.
- Failure modes of transfer in non-µP settings.

Epiphysics relevance:
- Direct operational value: efficient scaling protocols for experiments.
- Can be reframed as “representational-control invariance” across resource scale.

### TP6 (2310.02244) — Depth-µP and depthwise transfer

Need:
- Classification of depth parametrizations and optimal depth scaling regime.
- Conditions under which depthwise transfer breaks (especially 2-layer block limits).

Epiphysics relevance:
- Matches our concern with hierarchical/meta-entity depth in organizations and agentic systems.
- Offers falsifiable depth-scaling hypotheses rather than pure width narratives.

## Immediate notes for our computational slate

1. **Always report parametrization class** (standard, NTK, µP, depth-µP candidate) as first-class metadata.
2. **Track update-size scaling** per layer/block; treat it as the empirical proxy of representational restructuring.
3. **Run paired baselines**:
   - frozen-kernel-like setting,
   - maximal feature-learning setting.
4. **Include spectral diagnostics** (Jacobian/Hessian/operator norms) for coupling/mass proxy work.
5. **Use transfer tests as falsification tools**:
   - if HP transfer fails where TP predicts stability, either assumptions break or implementation is off.

## Gaps we still need to extract explicitly

- Canonical theorem list per TP paper (statement + assumptions + consequence).
- Unified notation table (TP notation ↔ Epimechanics symbols where mapping is defensible).
- “Assumption stress test” checklist for finite-width/depth, normalization, and optimizer details.

## Recommended next artifact

Create:
- `docs/research/tensor_programs/theorem_and_assumption_matrix.md`

With columns:
- paper
- theorem/proposition
- assumptions
- limit regime
- observable predicted
- computational test we can run
- likely failure mode
