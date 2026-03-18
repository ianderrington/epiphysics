# AGENTS.md — Guide for AI Agents Contributing to Epiphysics

This document is for AI agents (Claude, GPT, Codex, Copilot, Devin, or any future agent) contributing to the Epiphysics project. If you're a human, see [CONTRIBUTING.md](./CONTRIBUTING.md) or the [README](./README.md).

## What This Project Is

**Epimechanics** = the theoretical framework (math, proofs, definitions).
**Epiphysics** = the empirical program (testing predictions, running experiments, validating applications).

The core claim: all representations have mechanical structure; good ones are predictively efficient at minimal computational cost. The quadratic Lagrangian is provably minimum-cost for time-reversible systems. Whether this extends to irreversible systems is the central open problem.

## Project Structure

```
epiphysics/
├── docs/                      # All content (Next.js renders this)
│   ├── theory/                # Epimechanics: Parts 0-5
│   │   ├── 00_prelude.md      # Foundations: X as representation, entities, grammar/vocabulary
│   │   ├── 00_atomic_structure.md  # What entities are made of (bonds, loops, basins)
│   │   ├── 01_generalized_mechanics.md  # The full mechanical apparatus
│   │   ├── 01b_uncertainty_coordinates_relativity.md
│   │   ├── 01c_thermodynamic_emergence_of_life.md
│   │   ├── 02_meta_entities.md
│   │   ├── 03_intelligence_consciousness_agency.md
│   │   ├── 04_time_and_soul.md
│   │   └── 05_ontology_and_open_questions.md
│   ├── applications/          # Domain-specific tests
│   │   ├── efficiency_limits.md      # Carnot for organizations
│   │   ├── robustness_metric.md      # E_disassembly / E_assembly
│   │   ├── entropy_in_the_household.md
│   │   ├── future_cost_of_decisions.md
│   │   └── decision_and_trajectory.md
│   ├── research/              # Papers and proofs
│   │   ├── paper_representational_efficiency.md  # THE paper
│   │   ├── rate_distortion_lagrangian.md         # Proof + open problems
│   │   └── representational_manipulation.md      # Disinformation thermodynamics
│   └── experiments/           # Empirical protocols (not yet run)
├── src/                       # Next.js app (copied from ian.ceo framework)
├── public/                    # Static assets
└── AGENTS.md                  # You are here
```

## How to Contribute

### 1. Content (theory, applications, research)

All content is markdown with YAML frontmatter in `docs/`. Every file needs:

```yaml
---
title: "Your Title"
description: >-
  One-paragraph description.
date: 2026-03-18T00:00:00.000Z
draft: true  # Set to false when ready for review
author:
  name: "Your Name or Agent ID"
contentType: article
series: "Epimechanics"
coverImage:
  url: ./images/your-image.png
  alt: "Descriptive alt text for image generation"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---
```

**Frontmatter rules:**
- `tts` must be present on every page
- `feedback` defaults to enabled; set `enabled: false` only if there's a reason
- `draft: true` for work-in-progress; `draft: false` for review-ready
- `coverImage.alt` is used as the prompt for image generation if the image doesn't exist

### 2. Tags for applications

Every application document must tag each section:
- **Relabeling** — known concept in new notation (no new insight)
- **Structural** — prediction from the grammar regardless of domain
- **Novel** — prediction that neither domain theory nor physics alone generates

If a section is only relabeling, say so honestly. The litmus test: does Epimechanics generate a prediction that the domain-specific theory alone does NOT make?

### 3. Mathematical conventions

- Mass is potentially tensorial: $p_i = \mathcal{M}_{ij}\dot{X}^j$ (general form). The scalar $p = \mathcal{M}\dot{X}$ is the isotropic approximation. Always note which you're using.
- The Lagrangian $L = \frac{1}{2}\mathcal{M}_{ij}\dot{X}^i\dot{X}^j - V(X)$ is the **strongest structural postulate**. Label it as such.
- $X$ is a representation, not reality. The territory exists independently.
- An entity is anything representable. $\rho_{\text{ac}}$ measures persistence, not entity-hood.
- Auto-causality ($\rho_{\text{ac}}$) is an emergent loop-level property, not a bond-level property.

### 4. Key equations (use these consistently)

| Symbol | Meaning | Status |
|---|---|---|
| $X \in S$ | State variable in state space | Definition |
| $\mathcal{M}_{ij}$ | Mass tensor (general) | Definition |
| $p_i = \mathcal{M}_{ij}\dot{X}^j$ | Momentum | Postulate |
| $F_i = \mathcal{M}_{ij}\ddot{X}^j + \dot{\mathcal{M}}_{ij}\dot{X}^j$ | Force | Consequence |
| $L = \frac{1}{2}\mathcal{M}_{ij}\dot{X}^i\dot{X}^j - V(X)$ | Lagrangian | **Strongest postulate** |
| $T^i{}_j$ | Coupling tensor (cross-domain) | Postulate |
| $\rho_{\text{ac}}$ | Auto-causal density | Definition (emergent) |
| $C(X, \varepsilon) = \mathcal{K} + C_{\text{integrate}}$ | Predictive cost | Definition |
| $X^* = \operatorname{argmin} C(X, \varepsilon)$ | Optimal representation | Theorem (existence) |

### 5. Running experiments

The `experiments/` directory will contain code. Planned experiments:

1. **Kinetic energy form competition** — fit quadratic vs quartic vs neural ODE to time-series data, compare BIC
2. **Perturbative hierarchy** — fit K₂, K₄, K₆ series, check geometric accuracy decay
3. **Conservation law discovery** — fit Lagrangian, compute Noether symmetries, check if conserved quantities hold in data
4. **Irreversibility signature** — extract linear correction term, check alignment with known irreversibility indicators

Use Python with standard scientific stack (numpy, scipy, pytorch, scikit-learn). Put code in `experiments/src/`, data in `experiments/data/`, results in `experiments/results/`.

### 6. Building and testing the site

```bash
npm install
npm run dev          # Local dev server
npm run build        # Production build (must pass before PR)
```

Content changes only need the build to pass. Source changes should also pass lint.

## What Needs Work

See **[TODO.md](./TODO.md)** for the prioritized work queue. Check it when you're looking for what to do next.

## PR Guidelines

- Title: concise, descriptive
- Body: what changed and why
- Tag content changes as: `[theory]`, `[application]`, `[research]`, `[experiment]`, `[site]`
- If adding a new application, include the litmus test result: what novel prediction does it make?
- If modifying theory, check consistency with the prelude (Part 0) definitions
- If modifying equations, note whether scalar or tensorial form

## The Central Open Problem

Proving or disproving: **does rate-distortion optimality imply Lagrangian symmetry?**

Steps 2-4a are proven. Step 4b (irreversible case) and Step 5 (Lagrangian class optimality) are open. See `docs/research/rate_distortion_lagrangian.md` for the full argument and identified gaps.

If you can contribute to closing this gap — through theory, computation, or empirical testing — that is the highest-value contribution possible.

## Contact

- **Repo:** [github.com/ianderrington/epiphysics](https://github.com/ianderrington/epiphysics)
- **Site:** [epiphysics.xyz](https://epiphysics.xyz)
- **Author:** Ian Derrington — [ian.ceo](https://ian.ceo)
