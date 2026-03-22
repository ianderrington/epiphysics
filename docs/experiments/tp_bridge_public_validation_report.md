---
title: "Public Validation Report: TP Bridge Experimental Progress"
description: >-
  Consolidated public report of TP bridge experimental validation progress,
  including instrumentation status, architecture-level runs, results tables,
  and next-phase falsification targets.
date: 2026-03-21T00:00:00.000Z
draft: false
author:
  name: "Epiphysics"
contentType: article
series: "Experiments"
coverImage:
  url: ./images/tp_bridge/tp_bridge_dashboard.png
  alt: "Composite dashboard showing representation drift, NTK drift, and layer update norms"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

## Executive summary

This is the public progress report for the TP bridge validation track.

Goal: demonstrate **corrected computational regimes** with reproducible instrumentation, then escalate from toy runs to architecture-like runs while preserving metric semantics.

Current status:
- ✅ Metrics stack operational end-to-end
- ✅ Real-run traces generated (not synthetic-only)
- ✅ Architecture-like runs added (residual + sequence mixer variants)
- ⚠️ Still pure-Python and small-scale; framework-level large-model validation is next

## What was built

Core pipeline artifacts:

- Trace generation:
  - `experiments/src/run_tp_bridge_toy_mlp_purepy.py`
  - `experiments/src/run_tp_bridge_width_sweep_purepy.py`
  - `experiments/src/run_tp_bridge_residual_mlp_trace.py`
- Metrics engine:
  - `experiments/src/tp_bridge_metrics.py`
- Visualization:
  - `experiments/src/render_tp_bridge_images.py`

## Metric contract (preserved across runs)

Every valid run reports:

1. `representation_drift`
2. `ntk_drift`
3. `layer_update_norms`
4. `transfer_regret`

This contract is the backbone of cross-run comparability.

## Result snapshots

| Run | Model | rep_drift_final | ntk_drift_final | layer_update_norm_mean | transfer_regret | Regime read |
|---|---|---:|---:|---:|---:|---|
| Toy real run | tiny_mlp_purepy | 1.2599 | 0.1307 | 0.0186 | -0.0321 | feature-learning / non-frozen |
| Architecture run | residual_mlp_2block_purepy | 0.2745 | 0.6203 | 0.0147 | -0.4817 | strong non-frozen dynamics |
| Architecture run | seq_mixer_2block_purepy | 0.0644 | 0.2914 | 0.0036 | +0.0279 | mixed to non-frozen, weaker transfer |

Interpretation:
- Non-frozen dynamics are consistently detectable.
- Transfer quality is configuration-sensitive (not uniformly positive once architectures vary).
- This is exactly why the regime diagnostics are necessary before strong claims.

## Visual evidence

### Baseline dashboard

![TP Bridge Dashboard](./images/tp_bridge/tp_bridge_dashboard.png)

### Architecture update visuals

![Architecture Representation Drift](./images/tp_bridge/tp_bridge_arch_representation_drift.png)

![Architecture NTK Drift](./images/tp_bridge/tp_bridge_arch_ntk_drift.png)

![Architecture Layer Update Norms](./images/tp_bridge/tp_bridge_arch_layer_update_norms.png)

## Progress timeline

1. Imported TP series sources and built ingestion framework.
2. Implemented metric schema and renderer.
3. Ran real toy training traces + width/LR sweeps.
4. Escalated to architecture-like pure-Python traces.
5. Published explainers and report pages with images.

## What this validates (and what it doesn’t)

Validated now:
- reproducible instrumentation,
- consistent metric contract across run types,
- practical regime classification signals.

Not yet validated:
- large-scale framework runs (e.g., production PyTorch stacks),
- broad task diversity,
- full Epimechanics falsification outcomes.

## Next phase (required for stronger public demonstration)

1. Framework-level integration (real training stacks).
2. Expanded matrix of tasks/optimizers/parametrizations.
3. Explicit pass/fail criteria with failure inventory.
4. Versioned report updates with changelog and reproducible run commands.

## Key paths

- Public explainer: `docs/research/tp_bridge_explainer_plain_english.md`
- Architecture update: `docs/research/tp_bridge_architecture_trace_update.md`
- Experiments report: `docs/experiments/tp_bridge_report.md`
- This report: `docs/experiments/tp_bridge_public_validation_report.md`
- Raw outputs: `experiments/results/tp_bridge/`
