---
title: "Epimechanics Glossary"
description: >-
  Canonical definitions for core Epimechanics terms. Hover-enabled abbreviations in theory pages
  should match these definitions.
date: 2026-03-22T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
contentType: article
series: "Epimechanics"
coverImage:
  url: ./images/physics_as_metaphysics_00_series_overview-1-1.png
  alt: "Concept map of Epimechanics core terms and relationships."
---

## Causor

A **causor** is *that-which-causes*: a higher-level causal mechanism/structure (often loop/operator-like) that produces state change. In Epimechanics, it is the functional middle term in the triad:

$$\text{Cause} \rightarrow \text{Causor} \rightarrow \text{Effect}$$

Note: scalar/model variables (e.g., basin depth, entropy production rate) are typically descriptors of causor structures, not causors themselves.

## Causal Operator

A **causal operator** is the formal mathematical representation of a causor, mapping cause-state to effect-state under specified conditions.

## Causal Density ($\rho_C$)

Effective causal pathway density at a chosen scale; informally, how many non-negligible causal routes are active per unit region.

## Labeling/Separability Quality (LSQ)

How cleanly observed states can be partitioned into distinct causal operator regimes. Higher LSQ generally improves predictability by reducing causal aliasing.

## Generalized Mass ($\mathcal{M}$)

Total causal content of an entity, defined as the integral of causal density over its region in state space.

## Auto-Causal Density ($\rho_{\text{ac}}$)

Density of self-sustaining causal loop structure; a loop-level emergent property, not a single-bond property.

## Stability Basin Depth ($\Delta V$)

Energy barrier between a current configuration and its nearest dissolution pathway.

## Repair Rate ($\dot{R}_{\text{repair}}$)

Rate at which degraded structure is restored.

## Internal Entropy Production ($\dot{S}_{\text{int}}$)

Rate at which disorder is produced inside an entity's structure.

## Maintenance Cost ($C_{\text{maint}}$)

Net structural degradation pressure, typically $\dot{S}_{\text{int}} - \dot{R}_{\text{repair}}$.

---

## Cause-Plex ($\mathcal{C}$)

A locally finite strict partial order $(E, \prec)$ of causal events — the fundamental structure from which spacetime, energy, and entities emerge. Each element $e \in E$ is a causal event (state transition); $\prec$ encodes causal precedence. Defined formally in [Cause-Plex and Spacetime](./causeplex_spacetime.md) §1.

## Bond Operator ($b$)

A Layer A structural element: a recurring pattern of causal events connecting two regions of the cause-plex. Bonds carry state information between entities and ground the concept of interaction at the primitive level. See [Part 1.5: Causors](./01_5_causors.md).

## Loop Operator ($\mathcal{L}$)

A Layer A structural element: a closed recurring pattern of causal events — a causal loop that returns to its initial state. Auto-causal density $\rho_{\mathrm{ac}} > 0$ requires at least one stable loop operator. See [Part 1.5: Causors](./01_5_causors.md).

## Cause-Plex Index (CI)

A scalar measure of the loop composition richness of a cause-plex — how many topologically distinct loop structures it supports. Observer-class entities require $\mathrm{CI} > \mathrm{CI}_{\min}$, the threshold for topologically non-trivial loops (knot-type diversity, requiring $n_s \geq 3$ spatial dimensions). See [Cause-Plex and Spacetime](./causeplex_spacetime.md) §10.

## Causal Action ($A_{\text{causal}}$)

A measure of the total directed causal influence exerted by an entity across other entities over its lifetime. Related to the fitness×truth product in representational evolution. Introduced in [Part 1: Generalized Mechanics](./01_generalized_mechanics.md) §4b; developed formally in [Part 4: Time and Soul](./04_time_and_soul.md).

## Coupling Tensor ($T^i{}_j$)

A rank-2 tensor encoding how changes in the state of entity $j$ influence the state of entity $i$ across domain boundaries. The diagonal captures self-coupling; off-diagonal captures cross-domain coupling. Introduced in [Part 1: Generalized Mechanics](./01_generalized_mechanics.md).

## State Space ($S$)

The space of all possible values of the state variable $X$ for a given entity or system. The geometry of $S$ (metric, topology) determines what kinds of dynamics are possible. See [Part 1: Generalized Mechanics](./01_generalized_mechanics.md).

## Local Time ($T_{\text{local}}$)

The duration over which an entity maintains causal coherence — the integral of its causal presence over physical time. Zero at dissolution; potentially infinite for entities that become substrate-independent (encoded in culture, DNA, etc.). Defined in [Part 4: Time and Soul](./04_time_and_soul.md).

## Non-Local Time ($T_{\text{nonlocal}}$)

Total causal influence-time across all substrates an entity has affected — the integral of its representational footprint $R(E,t)$ over all time. The "how long does an entity matter" measure. Defined in [Part 4: Time and Soul](./04_time_and_soul.md).

## Agency ($A$)

The product of outgoing causal coupling strength, meta-representational weight, and consciousness: $A = C_{\text{coupling}} \times \mu_{\text{meta}} \times C_{\text{consciousness}}$. Multiplicative: zero in any factor yields zero agency. Defined in [Part 3: Intelligence, Consciousness, Agency](./03_intelligence_consciousness_agency.md).

## Soul ($\mathbf{R}(E,t)$)

The complete signed representational propagation function of an entity — a causal biography encoding how and where the entity's causal influence has propagated, weighted by sign (constructive/destructive) and magnitude. A formal renaming of non-local time extended to a vector quantity. Defined in [Part 4: Time and Soul](./04_time_and_soul.md).
