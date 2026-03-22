---
title: "TP Bridge Report: Instrumentation, Results, and Readiness"
description: >-
  A visual report on the Tensor Programs bridge instrumentation built for Epiphysics:
  what was implemented, what was tested, and what is next.
date: 2026-03-21T00:00:00.000Z
draft: false
author:
  name: "Epiphysics"
contentType: article
series: "Experiments"
coverImage:
  url: ./images/tp_bridge/tp_bridge_dashboard.png
  alt: "Dashboard of representation drift, NTK drift, and layer update norms"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

## What this report is

This is a **readiness + instrumentation report** for TP bridge experiments. It is not a final scientific claim. It shows that the measurement pipeline is now operational.

## Dashboard

![TP Bridge Dashboard](./images/tp_bridge/tp_bridge_dashboard.png)

### Axis labels (how to read)

- **X-axis (all plots):** training step `t`
- **Representation Drift Y-axis:** relative drift from initialization (`t=0`)
- **NTK Drift Y-axis:** relative Frobenius drift from initialization
- **Layer Update Norms Y-axis:** L2 norm of per-step parameter update

## What was implemented

- Trace generation (real training runs):
  - `experiments/src/run_tp_bridge_toy_mlp_purepy.py` (baseline)
  - `experiments/src/run_tp_bridge_residual_mlp_trace.py` (residual 2-block MLP)
  - `experiments/src/run_tp_bridge_seq_mixer_trace.py` (residual token/channel mixer)
- Metrics computation (schema-preserving):
  - `experiments/src/tp_bridge_metrics.py`
- Width/LR sweep:
  - `experiments/src/run_tp_bridge_width_sweep_purepy.py`
- Chart rendering:
  - `experiments/src/render_tp_bridge_images.py`

## Key outputs

- Baseline trace/metrics:
  - `experiments/results/tp_bridge/toy_trace_real.json`
  - `experiments/results/tp_bridge/toy_metrics_real.json`
- Architecture-realistic traces/metrics:
  - `experiments/results/tp_bridge/arch_residual_trace_real.json`
  - `experiments/results/tp_bridge/arch_residual_metrics_real.json`
  - `experiments/results/tp_bridge/seq_mixer_trace_real.json`
  - `experiments/results/tp_bridge/seq_mixer_metrics_real.json`
- Architecture image bundles:
  - `experiments/results/tp_bridge/arch_residual_images/`
  - `experiments/results/tp_bridge/seq_mixer_images/`
- Sweep table: `experiments/results/tp_bridge/sweep/sweep_results.md`

## Initial interpretation

- **Residual MLP (architecture-realistic):** high NTK drift final (`0.6203`) with substantial representation drift (`0.2745`) and favorable transfer regret (`-0.4817`) indicates strong feature-learning dynamics with good small→large transfer in this run.
- **Sequence mixer (architecture-realistic):** lower representation/NTK drift (`0.0644` / `0.2914`) plus small positive transfer regret (`+0.0279`) suggests a more stable but slightly less transfer-friendly regime.
- Across both architecture runs, **layer update norms remain nontrivial** (not frozen), so the bridge captures genuine parameter motion beyond toy behavior.

## Schema compatibility (preserved)

All new runners keep the same `tp_bridge_metrics` contract and summary keys:
- `representation_drift_*`
- `ntk_drift_*`
- `layer_update_norm_*`
- `transfer_regret`

No schema drift was introduced in metrics JSON.

## How this fits Epimechanics

These metrics are operational proxies for representational dynamics:

- representation drift → representation state motion proxy,
- NTK drift → frozen-vs-restructuring regime signal,
- layer updates → where representational work occurs,
- transfer regret → scale-transfer efficiency signal.

This enables better falsifiable experiments before broader theory claims.

## Current limitations

- Current live runs are toy-level and pure Python.
- Not yet architecture-realistic (no large-model framework runs yet).
- Spectral diagnostics in live runs still optional.

## Next step (required)

Move the same instrumentation to architecture-realistic training traces while preserving the exact metric schema and visual reporting format.
