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

## Causal Event (*state couplet*, $e$)

The primitive of Epimechanics. An ordered pair $e = (\mathcal{S}_{\text{in}}, \mathcal{S}_{\text{out}})$ where $\mathcal{S}_{\text{out}}$ is determined by $\mathcal{S}_{\text{in}}$. No physical content is assumed — no energy, no units, no conservation laws. Also called a *state couplet* to emphasize the pairing of input and output states. The cause-plex $\mathcal{C} = (E, \prec)$ is a partial order on a set $E$ of causal events. See [Cause-Plex and Spacetime](./causeplex_spacetime.md) §1.

## Cause-Plex ($\mathcal{C}$)

A locally finite strict partial order $(E, \prec)$ of causal events — the fundamental structure from which spacetime, energy, and entities emerge. Each element $e \in E$ is a causal event (state couplet); $\prec$ encodes causal precedence. Defined formally in [Cause-Plex and Spacetime](./causeplex_spacetime.md) §1.

## Bond Operator ($b$)

A Structure Layer structural element: a recurring pattern of causal events connecting two regions of the cause-plex. Bonds carry state information between entities and ground the concept of interaction at the primitive level. See [Part 1.5: Causors](./01_5_causors.md).

## Loop Operator ($\mathcal{L}$)

A Structure Layer structural element: a closed recurring pattern of causal events — a causal loop that returns to its initial state. Auto-causal density $\rho_{\mathrm{ac}} > 0$ requires at least one stable loop operator. See [Part 1.5: Causors](./01_5_causors.md).

## Cause-Plex Index (CI)

A scalar measure of the loop composition richness of a cause-plex — how many topologically distinct loop structures it supports. Observer-class entities require $\mathrm{CI} > \mathrm{CI}_{\min}$, the threshold for topologically non-trivial loops (knot-type diversity, requiring $n_s \geq 3$ spatial dimensions). See [Cause-Plex and Spacetime](./causeplex_spacetime.md) §10.

## Causal Action ($A_{\text{causal}}$)

A measure of the total directed causal influence exerted by an entity across other entities over its lifetime. Related to the fitness×truth product in representational evolution. Introduced in [Part 1: Generalized Mechanics](./01_generalized_mechanics.md) §4b; developed formally in [Part 4: Time and Soul](./04_time_and_soul.md).

## Coupling Notation Reference

Epimechanics uses several coupling quantities for different purposes:

| Symbol | Name | Direction | Definition | Introduced |
|--------|------|-----------|------------|------------|
| $\kappa$ | Scalar coupling | Incoming | How strongly a field acts on an entity | Part 1 |
| $T^i{}_j$ | Coupling tensor | Incoming | Direction-dependent coupling between field and entity state components | Part 1 |
| $\kappa_{\text{sys}}$ | Systemic coupling | Inter-scale | $\partial \rho_{\text{ac}}^{\text{meta}} / \partial \rho_{\text{ac}}^{\text{sub}}$ — sub-entity's contribution to meta-entity persistence | Part 2 |
| $\Gamma_{ij}$ | Inter-substrate coupling | Inter-substrate | Coupling strength between substrates $i$ and $j$ of a meta-entity | Part 2 |
| $C_{\text{coupling}}$ | Outgoing causal power | Outgoing | Normalized capacity to influence others' states | Part 3 |
| $\mathbf{K}_{Ej}$ | Soul coupling tensor | Propagation | Maps entity $j$'s state deviation into representational space | Part 4 |
| $\kappa_b$ | Keystone index | Structural | $\Delta \rho_{\text{ac}} / \Delta \sigma_b$ — sensitivity of auto-causal density to bond strength | Part 2.5 |

$\kappa$ and $T^i{}_j$ describe incoming sensitivity (how forces affect the entity). $C_{\text{coupling}}$ describes outgoing power (how the entity affects others). $\Gamma$, $\kappa_{\text{sys}}$, and $\mathbf{K}$ describe inter-entity or inter-scale relationships. $\kappa_b$ is structural (bond criticality within an entity).

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

## Self-Sufficiency ($\sigma$)

Fraction of minimum required causal power that internal loops can supply without external coupling: $\sigma = \mathcal{P}_{\text{internal}} / \mathcal{P}_{\min}$. $\sigma = 1$: fully self-sufficient. $\sigma > 1$: surplus (can export). $\sigma < 1$: dependent on external input. Defined in [Part 2.5: Entity Interaction](./02_5_entity_interaction.md).

## Attack Surface Density ($\rho_{\text{attack}}$)

Vulnerability measure: sum over accessible keystone bonds of their keystone index times the auto-causal density of their loop: $\rho_{\text{attack}}(\partial E) = \sum_{b \in \partial E} \kappa_b \cdot \rho_{\text{ac}}(\mathcal{L}_b)$. High when keystones are accessible and belong to high-$\rho_{\text{ac}}$ loops. Defined in [Part 2.5: Entity Interaction](./02_5_entity_interaction.md).

## Keystone Index ($\kappa_b$)

Sensitivity of auto-causal density to bond strength: $\kappa_b = \Delta \rho_{\text{ac}} / \Delta \sigma_b$. High $\kappa_b$ indicates a load-bearing bond whose degradation cascades through the entity's loop structure. Defined in [Part 2.5: Entity Interaction](./02_5_entity_interaction.md).

## Meta-Representation Weight ($\mu_{\text{meta}}$)

Degree to which an entity's model represents itself *as* a model — subject to error, revision, and incompleteness. $\mu_{\text{meta}} \in [0,1]$. Zero for transparent self-models (thermostats, simple organisms); approaching 1 for entities with well-developed meta-cognitive capacity. Required for full moral agency. Defined in [Part 3: Intelligence, Consciousness, Agency](./03_intelligence_consciousness_agency.md).

## Causal Power ($\mathcal{P}$)

Rate of work on state trajectories: $\mathcal{P} = dW/dt = \mathbf{F} \cdot \mathbf{v}_X$. Units: energy per time. Outgoing causal power $\mathcal{P}_{E \to j}$ is the rate at which entity $E$'s actions do work on entity $j$'s state. Defined in [Part 2.5: Entity Interaction](./02_5_entity_interaction.md); used extensively in agency formula (Part 3).

## Q1–Q5 Structural Descriptors

Five continuous parameters characterizing any bond or loop composition:
- **Q1 (Energy mode):** kinetic ↔ potential — where received energy goes
- **Q2 (Output target):** state / bond / loop — what the output connects to  
- **Q3 (Topology):** open chain ↔ closed loop
- **Q4 (Leverage ratio Λ):** output event cluster size / input event cluster size
- **Q5 (Timescale):** bond latency relative to loop period (derived from Q1–Q4)

Defined in [Part 1.5: Causors](./01_5_causors.md).
