---
title: "Notation Crosswalk: Tensor Programs ↔ Epimechanics"
description: >-
  Working symbol map between Tensor Programs formalism and Epimechanics notation,
  including validity boundaries and non-equivalences.
date: 2026-03-21T00:00:00.000Z
draft: false
author:
  name: "epiphysics-open-source"
contentType: article
series: "Research Notes"
coverImage:
  url: ./images/notation-crosswalk.png
  alt: "Two-column mapping between neural scaling notation and representational mechanics symbols"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

## Why this exists

TP notation is optimized for infinite-width neural limits. Epimechanics notation is optimized for representational mechanics across domains. This crosswalk lets us reuse TP results without pretending the theories are identical.

## Crosswalk table

| Tensor Programs concept | TP notation (typical) | Closest Epimechanics concept | Epimechanics notation | Mapping status | Notes |
|---|---|---|---|---|---|
| Representation state in model internals | activations / hidden states (`h`, `x`, layerwise vectors) | Representation state | `X \in S` | **Partial** | TP internal vectors are implementation-level coordinates; Epimechanics `X` can be broader and cross-domain. |
| Parameter update magnitude | SGD/Adam update recursions, scale exponents (`a,b,c,d`) | Kinetic-like representational change rate | `\dot{X}` and momentum `p_i = \mathcal{M}_{ij}\dot{X}^j` | **Analogy only** | Update norms can be empirical proxies for `\|\dot X\|`, not literal equality. |
| Width/depth scaling coefficients | `abc` / `abcd` parametrization exponents | Effective mass/coupling scaling constraints | `\mathcal{M}_{ij}`, `T^i{}_j` | **Hypothesis-level** | Good candidate bridge: exponents constrain responsiveness and cross-layer coupling. Requires explicit calibration. |
| Kernel regime | frozen NTK / tangent limit | Near-linear response regime | local quadratic approximation around trajectory | **Structural analogy** | Corresponds to low internal restructuring; useful baseline, not full equivalence. |
| Feature-learning regime / µP | maximal-update limits | High internal restructuring regime | higher representation-geometry evolution | **Structural analogy** | Good for testing when representation basis itself changes substantially. |
| NTK kernel | `\Theta(x,x')` | Effective local response operator | Jacobian/Hessian-derived response tensors | **Partial** | NTK is architecture/training specific; can be embedded as one response observable. |
| Master Theorem limits | NETSOR / NETSORᵀ / NE⊗ORᵀ limits | Asymptotic law under scaling | large-system limit statements | **Compatible form** | Great methodological import: explicit assumptions + convergent observables. |
| Spectral laws (TP3) | singular value/eigenvalue distributions | Stability/conditioning geometry | spectral stats of `\mathcal{M}`, Jacobian, Hessian | **High utility** | Strongest quantitative bridge for instrumentation. |
| Hyperparameter transfer invariance (TP5) | µTransfer | Control invariance under scaling | approximately conserved optimal-control settings | **Empirical bridge** | Treat as invariance test over resource scale, linked to representational efficiency claims. |
| Depth-µP scaling (TP6) | depthwise transfer laws | Hierarchical depth dynamics in meta-entities | multi-scale coupling in layered entities | **Hypothesis-level** | Promising for AI-organization analogies, but needs explicit ontological care. |

## Non-equivalences (important)

1. **TP is not an ontological theory of entities.** It is a formal scaling theory for neural computations.
2. **Epimechanics `X` is not restricted to neuron activations.** It includes any representable system state.
3. **Mass tensor `\mathcal{M}_{ij}` is not directly “network width.”** Width may influence empirical proxies, but not identity.
4. **Auto-causality `\rho_{ac}` has no direct TP primitive.** Must be constructed from dynamics/feedback observables.
5. **Lagrangian postulate remains independent.** TP can inform test design; it does not prove Epimechanics postulates.

## Practical mapping rules for experiments

When logging TP-inspired experiments for Epiphysics, include:

- `tp_parametrization`: standard / NTK / µP / depth-µP
- `epi_state_proxy`: what was used as `X` (e.g., hidden state stack, feature map stats)
- `velocity_proxy`: chosen `\dot X` proxy (e.g., per-step feature drift)
- `mass_proxy`: chosen `\mathcal{M}` proxy (e.g., inverse sensitivity / conditioning metric)
- `coupling_proxy`: chosen `T` proxy (cross-layer or cross-module transfer sensitivity)
- `regime_label`: kernel-like / feature-learning-like / mixed

## Mapping confidence legend

- **Compatible form**: mathematical style aligns; direct reuse usually safe.
- **Partial**: careful reinterpretation needed.
- **Structural analogy**: useful conceptual bridge, not formal identity.
- **Hypothesis-level**: candidate mapping to test, not assume.

## Implementation status

Implemented baseline module:
- `experiments/src/tp_bridge_metrics.py`

Current outputs:
- representation drift,
- layer update norms,
- NTK drift,
- spectral radius (from provided eigenspectra),
- transfer regret.

Fixture + sample output:
- `experiments/src/tp_bridge_example_trace.json`
- `experiments/results/tp_bridge/example_metrics.json`

Next increment:
- connect this script to real experiment traces (instead of synthetic fixture).
