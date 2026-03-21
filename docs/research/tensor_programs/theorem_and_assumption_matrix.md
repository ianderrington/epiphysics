---
title: "Tensor Programs — Theorem and Assumption Matrix (TP0–TP6)"
description: >-
  Implementation-oriented matrix of core results in the Tensor Programs series,
  with assumptions, predicted observables, and concrete computational tests.
date: 2026-03-21T00:00:00.000Z
draft: false
author:
  name: "epiphysics-open-source"
contentType: article
series: "Research Notes"
coverImage:
  url: ./images/tensor-programs-theorem-matrix.png
  alt: "Matrix mapping Tensor Programs theorems to assumptions, predictions, and test plans"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

## Purpose

Convert TP-series theory into a directly executable checklist for Epiphysics computational work.

## Matrix

| Paper | Core theorem/result (working label) | Key assumptions to verify | Limit regime | Predicted observable | Computational test | Typical failure mode |
|---|---|---|---|---|---|---|
| TP0 (1902.04760) | Master-theorem style scaling limits; GP/NTK unification setup | Wide-layer scaling; random init laws; syntax constraints for program class | Width → ∞ | Convergent statistics for outputs/gradients | Sweep width; compare empirical moments/kernels vs predicted limits | Finite-width corrections; violated independence assumptions |
| TP0 | Informal DNN→GP correspondence corollaries | Controlled nonlinearity growth; rank conditions | Width → ∞ at init | Output process approximately Gaussian | Multi-input normality checks + kernel recursion match | Heavy-tailed activations, normalization artifacts |
| TP1 (1910.12478) | NETSOR Master Theorem (Theorem 5.4) | Program expressible in NETSOR; controlled nonlinearities; covariance regularity | Width → ∞ | Architecture-agnostic GP limit at initialization | Instantiate MLP/RNN/attention families and compare empirical covariance recursion | Unsupported ops or shape coupling not in assumptions |
| TP1 | GP kernel computation corollary | Same as above + valid kernel recursion numerics | Width → ∞ | Deterministic kernel map | Build kernel solver and cross-check Monte Carlo wide nets | Numerical instability in recurrence |
| TP2 (2006.14548) | BP-like NETSORᵀ Master Theorem (Theorem 7.2 family) | Backprop graph in allowed class; Simple GIA check; regularity of activations | Width → ∞ | Deterministic NTK at initialization | Estimate NTK empirically for increasing width; test convergence | GIA invalid in specific architecture blocks |
| TP2 | NTK convergence corollary for broad architectures | Same + architecture constraints | Width → ∞ at init | Kernel concentration | Confidence intervals of NTK entries vs width | Poor concentration at practical widths |
| TP2b (2105.03703) | Architectural universality of NTK training dynamics | NTK parametrization; small-step SGD regime; assumptions inherited from TP2/TP3 machinery | Width → ∞ during training | Frozen-kernel dynamics; function evolution ≈ kernel GD | Train finite models and track NTK drift + function-space trajectory | Large LR / long training breaks frozen-kernel approximation |
| TP3 (2009.10685) | NETSORᵀ Master Theorem + Free Independence Principle | Full transpose interactions allowed; Gaussian init; asymptotic freeness conditions | Width → ∞ | Spectral laws for Jacobians/activations; free-independence structure | Measure empirical spectral distributions and compare laws | Correlated weights / normalization layers violate idealized assumptions |
| TP3 | Semicircle / Marchenko–Pastur recovery as special cases | Classical random-matrix assumptions | Large matrix limits | Known spectral distributions | Synthetic sanity tests before architecture-scale runs | Non-iid matrix structure |
| TP4 (2011.14522) | Stability/nontriviality/feature-learning characterization (Thm 3.3/3.4/3.6/3.8) | abc-parametrization conditions; stable scaling exponents; training routine regularity | Width → ∞ during training | Dichotomy: kernel regime vs feature-learning regime | Run paired parametrizations and compare representation drift metrics | Hidden implementation mismatch of scaling exponents |
| TP4 | µP maximal update results (Thm 5.6 etc.) | Correct µP scaling layer-by-layer; optimizer setup | Width → ∞ | Maximal layer updates with stable dynamics | Log per-layer update norms across widths | Incorrect parameter grouping or optimizer defaults |
| TP4b (2308.01814) | Neural tangent and µ-limits for adaptive optimizers (Thm 2.4.x, 2.5.x, 2.7.x) | Extended TP language conditions; memoryless/memoryful optimizer assumptions; abcd stability/faithfulness | Width → ∞ under adaptive updates | Adaptive analogue of kernel-vs-feature dichotomy | Compare SGD, momentum, Adam with matched scale laws | Optimizer state dynamics violate assumed class |
| TP4b | NE⊗ORᵀ Master Theorem (Thm 2.6.10) | Operator-form constraints and boundedness assumptions | Width → ∞ | Deterministic operator-level limits | Operator tracking diagnostics in training traces | Practical operator estimation noise |
| TP5 (2203.03466) | µTransfer invariance (core claim) | Model family in µP; matching architecture semantics across scales | Width scaling practical (finite but large) | Near-stable optimal HPs across widths | Tune small model, transfer to large, measure regret gap | Partial µP compliance; optimizer/schedule mismatch |
| TP6 (2310.02244) | Depth-µP classification and depthwise transfer | Residual architecture class; block structure assumptions; depth-limit ordering | Width → ∞ then depth → ∞ (or controlled finite depth) | Depthwise scaling laws; transfer feasibility by block type | Depth sweep with fixed width + transfer experiments | 2-layer block limitations; feature diversity collapse |

## Epiphysics instrumentation fields (attach to every run)

- `parametrization_class`: standard / NTK / µP / depth-µP candidate
- `optimizer_family`: SGD / momentum / Adam / other
- `width_vector` and `depth_vector`
- `layer_update_norms[t,l]`
- `ntk_drift[t]` (or adaptive analogue)
- `representation_drift[t]` (chosen internal feature metric)
- `spectral_stats[t]` (Jacobian/Hessian/operator proxies)
- `transfer_regret` (small→large HP transfer gap)

## Minimum “assumption stress test” checklist

Before claiming TP-consistent behavior, validate:

1. Width/depth scaling regime actually reached.
2. Parametrization implemented exactly (not approximated).
3. Optimizer and schedule match theorem class.
4. Nonlinearity/normalization fall within assumption envelope.
5. Finite-size effects quantified (error bars vs width/depth).

## File map

- Series index: `docs/research/tensor_programs/index.md`
- First-pass notes: `docs/research/tensor_programs/notes_needed_for_epiphysics.md`
- This matrix: `docs/research/tensor_programs/theorem_and_assumption_matrix.md`
