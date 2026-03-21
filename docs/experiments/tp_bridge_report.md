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

- Trace generation (real training run, pure Python):
  - `experiments/src/run_tp_bridge_toy_mlp_purepy.py`
- Metrics computation:
  - `experiments/src/tp_bridge_metrics.py`
- Width/LR sweep:
  - `experiments/src/run_tp_bridge_width_sweep_purepy.py`
- Chart rendering:
  - `experiments/src/render_tp_bridge_images.py`

## Key outputs

- Real trace: `experiments/results/tp_bridge/toy_trace_real.json`
- Real metrics: `experiments/results/tp_bridge/toy_metrics_real.json`
- Sweep table: `experiments/results/tp_bridge/sweep/sweep_results.md`
- Images: `experiments/results/tp_bridge/images/`

## Initial interpretation

- Small widths trend more feature-learning-like (higher drift).
- Larger width pair (32→64 in current sweep) trends toward mixed/lower drift regime.
- Transfer regret in the toy sweep is mostly favorable (no clear degradation under transfer).

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
