---
title: "Experiments"
description: >-
  Planned empirical tests for Epiphysics. Lagrangian vs neural ODE, conservation law discovery,
  perturbative hierarchy, and irreversibility signatures.
date: 2026-03-18T00:00:00.000Z
draft: false
author:
  name: "Epiphysics"
contentType: article
coverImage:
  url: /images/default-projects.jpg
  alt: "Experimental protocols for Epiphysics"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
---

> **Status: Not yet started.** These experiments are designed and specified but have not been run. We are looking for collaborators with access to longitudinal data in organizational science, social psychology, or ML training dynamics.

## Planned Experiments

The theory is developed. The experiments need to be run. Four empirical tests are designed:

### Test 1: Kinetic Energy Form Competition
Fit quadratic, quadratic+linear, quartic, and neural ODE models to real time-series data. Compare BIC. Does the quadratic Lagrangian outpredict alternatives at matched complexity?

### Test 2: Perturbative Hierarchy
Fit the series K₂, K₄, K₆ to low-dimensional data. Does accuracy improve geometrically while parameter cost grows polynomially? What is the optimal truncation d*?

### Test 3: Conservation Law Discovery
From the best-fit Lagrangian, compute symmetries, derive Noether conservation laws, check if they hold in the data. Conservation laws in non-physical domains would be a genuine scientific discovery.

### Test 4: Irreversibility Signature
For irreversible systems, extract the linear correction aᵢ and check whether it aligns with known irreversibility indicators.

See the [full experimental protocol](./README.md) and the [research note on rate-distortion](../research/rate_distortion_lagrangian.md) for details.

## Instrumentation Reports

- [TP Bridge Report: Instrumentation, Results, and Readiness](./tp_bridge_report.md) — visual report of the current TP-bridge measurement stack, outputs, and next-step readiness.
