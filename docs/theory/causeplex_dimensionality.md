---
title: "Why 3+1: Observer-Selection Constraints on Spacetime Dimensionality in the Cause-Plex Framework"
description: >-
  The cause-plex framework does not derive 3+1 dimensional spacetime from first
  principles. Instead, it explains why observers necessarily find themselves in 3+1
  by showing that other dimensionalities fail to support the structural requirements
  for observer-class entities. This paper develops the selective convergence argument:
  n_t = 1 follows from the causal partial order; n_s = 3 follows from Tangherlini's
  orbital stability result and the knot-topology requirement for topologically
  non-trivial loop structures. The argument is honestly labeled as an observer-selection
  conjecture, not a derivation, and is shown to be strictly more defensible than
  Wolfram's singular convergence claim.
date: 2026-03-25T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
series: "Epimechanics"
tags:
  - Epimechanics
  - Spacetime
  - Dimensionality
  - Observer selection
  - Causal structure
  - Knot theory
  - Tangherlini
coverImage:
  url: ./images/causeplex_dimensionality-1-1-2.png
---

> **Prerequisites.** This paper assumes the cause-plex framework as developed in [Cause-Plex and Spacetime](./causeplex_spacetime.md): the Lorentzian metric and Lorentz invariance are derived from causal structure (Malament 1977 + event counting); the metric signature has exactly one timelike dimension from P1. The present paper addresses what fixes the number of *spatial* dimensions at 3.

> **Positioning.** This is an observer-selection argument, not a derivation. The distinction is important: the argument does not derive $n_s = 3$ from the cause-plex primitive; it explains why any observer capable of asking the question would find themselves in $n_s = 3$. This is the honest and correct claim.

---

## Abstract

We present the *selective convergence argument* for why the physical world has 3+1 spacetime dimensions in the cause-plex framework. The cause-plex primitive — a locally finite strict partial order of causal events — does not uniquely determine dimensionality. However, the subset of cause-plexes supporting observer-class entities (those with $\rho_{\mathrm{ac}} > 0$ and $\mathrm{CI} > \mathrm{CI}_{\min}$) is tightly constrained: $n_t = 1$ is forced by the causal ordering (P1 fails for $n_t \neq 1$); $n_s = 3$ is the unique value satisfying both Tangherlini's orbital stability requirement ($n_s \leq 3$) and the knot-topology requirement for topologically diverse loop structures ($n_s \geq 3$). The argument is an observer-selection conjecture — rigorously grounded but not a derivation from primitives. It is compared to string theory's landscape approach and Wolfram's singular convergence claim, and shown to be more honest and more precisely grounded than either.

---

## 1. The Problem

The cause-plex framework derives the Lorentzian metric structure of spacetime from causal order (Malament 1977) and event counting (number-volume conjecture). What it does not derive is the specific *dimensionality* of the manifold — the number of timelike and spacelike directions.

This is not a gap in the derivation; it is a feature. The cause-plex $(E, \prec)$ is an abstract partial order — it does not come pre-labeled with spatial dimensions. The dimensions emerge in the continuum limit, and what determines them is not the abstract structure but the physical content: specifically, whether the resulting manifold supports the kind of complex auto-causal loop structures that constitute observers.

The question is: why do we observe $(-,+,+,+)$ rather than $(-,+,+)$ or $(-,+,+,+,+)$?

---

## 2. Honest Status

The selective convergence argument is a **structurally grounded version of the weak anthropic principle**. It does not derive 3+1 dimensionality from the cause-plex primitive; it explains why observers would necessarily find themselves in 3+1 by showing that other dimensionalities fail to support the structural requirements for observer-class entities.

This is a correct and honest claim. The dimensionality entry in the spacetime paper's summary table is marked ⚠️ (observer-selection argument) accordingly — not ✅ (derived).

---

## 3. How Other Frameworks Handle Dimensionality

| Framework | Why these dimensions? | Mechanism | Honest status |
|---|---|---|---|
| Standard Model / GR | Assumes 3+1 | None | Empirical input |
| String theory | 10D from Weyl anomaly; 4D via compactification | Internal consistency + landscape + anthropic selection | 10D derived; 4D needs observer selection |
| Wolfram (singular convergence) | All rules converge for any complex observer | Claimed; unsupported by the ruliad structure | Overclaims |
| Epimechanics (selective convergence) | $n_t = 1$ from P1; $n_s = 3$ from stability filter on observer-class entities | Tangherlini + knot topology + observer selection | Observer-selection conjecture; rigorous and honest |

**String theory comparison.** String theory requires 10 dimensions from the Weyl anomaly — an internal consistency condition. To recover 4D, the 6 extra dimensions are compactified on Calabi-Yau manifolds, of which there are approximately $10^{500}$ consistent choices (the string landscape). String theory cannot uniquely predict 4D and ultimately needs observer selection from the landscape. The cause-plex framework's observer-selection argument enters explicitly and upfront — which is more transparent.

**Wolfram comparison.** Wolfram claims *singular convergence*: all possible computational rules converge to the same physics for any sufficiently complex observer. This is stronger than the evidence supports. The cause-plex framework claims only *selective convergence*: those cause-plexes that support complex observers are restricted to a stable neighborhood of manifold space. This is a strictly weaker and more defensible claim.

---

## 4. The Selective Convergence Argument

**Claim.** The dimensionality of the physical world is fixed by a stability filter: cause-plexes that support complex auto-causal loop structures are restricted to a small stable region of manifold space. We observe 3+1 because we are on one of those stable manifolds — not because it is the only possible outcome, but because it is the only neighborhood that permits our kind of loop structure.

**Formal statement:**

> *We observe 3+1 dimensional spacetime not because it is uniquely derivable from the cause-plex primitive, but because 3+1 is the stable manifold neighborhood in which complex auto-causal loops — the structural requirement for observers — can form and persist.*

---

## 5. Fixing $n_t = 1$: From the Causal Partial Order

**Claim.** The cause-plex must have exactly one timelike dimension.

**Argument.** The cause-plex $(E, \prec)$ is a strict partial order — irreflexive, asymmetric, transitive. This is the definition of a single causal direction. In the continuum limit:

- $n_t = 0$: no causal ordering at all (elliptic PDEs). P1 fails — the partial order doesn't exist.
- $n_t = 1$: the causal partial order holds; PDEs are hyperbolic; deterministic forward propagation from initial data exists.
- $n_t \geq 2$: ultrahyperbolic PDEs. No well-posed initial value problem — state cannot be propagated forward deterministically. The causal partial order loses its structure: there is no clean "before/after," so P1 fails.

$n_t = 1$ is the unique value consistent with the cause-plex being a well-defined strict partial order with deterministic causal propagation. **This step is rigorous** — it follows directly from the definition of the cause-plex.

---

## 6. Fixing $n_s = 3$: From Observer-Class Stability

Given $n_t = 1$, we need to determine $n_s$. Two independent arguments constrain it from above and below.

### 6.1 Upper bound: $n_s \leq 3$ from orbital stability

**Tangherlini (1963):** In $n_s > 3$ spatial dimensions, gravitational and electromagnetic potentials scale as $r^{-(n_s-2)}$ rather than $r^{-1}$. Bertrand's theorem requires $1/r^2$ force laws for stable closed orbits. For $n_s > 3$:

- No stable closed orbits → no stable atoms
- No stable atoms → no chemistry
- No covalent bonds → no molecular structures
- No bond stability ($\sigma_b < k_BT$) → no persistent auto-causal loops
- No persistent loops → $\rho_{\mathrm{ac}} \to 0$, no observer-class entities

Therefore $n_s > 3$ is excluded for observer-class cause-plexes.

### 6.2 Lower bound: $n_s \geq 3$ from loop topology

**Knot theory argument:** In $n_s < 3$, knot theory is trivial — all closed loops are isotopic (continuously deformable into each other). In $n_s = 3$, loops can be topologically distinct (knots, links), creating topological diversity in bond structures.

**Why this matters:** Observer-class entities require $\mathrm{CI} > \mathrm{CI}_{\min}$, where $\mathrm{CI}_{\min}$ is the minimum cause-plex index for topologically non-trivial loop structures.

**Definition ($\mathrm{CI}_{\min}$).** The minimum CI for observer-class entities is the smallest CI value at which a cause-plex contains at least one topologically non-trivial loop — a closed causal loop not isotopically equivalent to a circle in 3D space. This threshold requires $n_s \geq 3$, making the argument non-circular: $\mathrm{CI} > \mathrm{CI}_{\min}$ means specifically "entity with topologically non-trivial loop structure exists," not merely "observer exists."

In $n_s < 3$: all loops are isotopic → no topological diversity → $\mathrm{CI} \leq \mathrm{CI}_{\min}$ → no observer-class entities.

Therefore $n_s < 3$ is excluded for observer-class cause-plexes.

### 6.3 Unique solution

Combining §6.1 and §6.2: $n_s \leq 3$ and $n_s \geq 3$, so $n_s = 3$.

---

## 7. Tegmark's Stability Table

Tegmark (1997) independently mapped the stability of physics across different $(n_s, n_t)$ signatures, confirming the argument:

| Manifold $(n_s, n_t)$ | PDE type | Stable atoms? | Sufficient loop richness? | Observers possible? |
|---|---|---|---|---|
| $(1,1)$, $(2,1)$ | Hyperbolic | Yes | No — trivial knot theory | No |
| $(3,1)$ | Hyperbolic | **Yes** | **Yes** | **Yes** |
| $(n_s > 3, 1)$ | Hyperbolic | No — Tangherlini | Moot | No |
| $(n_s, n_t \geq 2)$ | Ultrahyperbolic | No | No | No |
| $(n_s, 0)$ | Elliptic | No | No | No |

$(3,1)$ is the unique manifold signature supporting both requirements simultaneously.

---

## 8. What Entities Would Look Like in Other Dimensions

For $n_t = 1$ (required) and varying $n_s$:

| Manifold | Bond stability | Loop topology | Max entity type | $\rho_{\mathrm{ac}}$ ceiling |
|---|---|---|---|---|
| $(2,1)$ | Limited bond diversity; no 3D chirality | All loops isotopic | Low-CI composites; no stereochemistry | Low |
| $(3,1)$ — ours | Full bond diversity; stable atoms; rich knot topology | Topologically distinct loop types | Full range: cells, organisms, meta-entities | Observed maximum |
| $(4,1)$ | Atoms unstable (Tangherlini) | Moot — no stable bonds | Dissipative only | Near zero |

The $(3,1)$ manifold sits at a **maximum of loop composition richness subject to bond stability**. This is not a coincidence — it is selective convergence: the cause-plexes capable of asking the question occupy this maximum by definition.

> **Knot theory and biology.** The connection between 3D topology and biological complexity is concrete. DNA supercoiling, protein folding, and enzyme active site geometry all depend on 3D knot topology — loops that cannot be continuously deformed into each other without breaking bonds. In $n_s < 3$, all such loops are equivalent; the structural diversity underlying molecular biology vanishes. The cause-plex framework provides a structural explanation for why biology requires 3D space.

---

## 9. The Stable Observer Manifold Conjecture

**Conjecture (Stable Observer Manifold).** *A cause-plex $\mathcal{C}^*$ supporting entities with $\rho_{\mathrm{ac}} > 0$ and cause-plex index $\mathrm{CI} > \mathrm{CI}_{\min}$ requires, in the continuum limit, a manifold with exactly $n_t = 1$ timelike dimension and $n_s = 3$ spacelike dimensions.*

**Proof sketch:**

1. $n_t = 1$: required by causal partial order (P1) — proved rigorously (Section 5).
2. $n_s \geq 3$: required by $\mathrm{CI} > \mathrm{CI}_{\min}$ (knot topology, Section 6.2) — well-established.
3. $n_s \leq 3$: required by bond stability (Tangherlini, Section 6.1) — well-established.
4. Therefore $n_s = 3$ uniquely. ∎

**Status:** Step 1 is rigorous. Steps 2 and 3 rely on Tangherlini's result and the knot theory argument — both are well-established in the literature. The conjunction (step 4) requires formalizing "sufficient loop richness" precisely in terms of CI and topological bond diversity. This is Open Problem 1 of this paper.

---

## 10. Open Problems

### Open Problem 1: Formalize the Stable Observer Manifold Conjecture

**What remains.** Define "sufficient loop richness" precisely in terms of CI and topological bond diversity, and prove formally that $n_s < 3$ is insufficient for $\mathrm{CI} > \mathrm{CI}_{\min}$. The Tangherlini result and knot theory argument are both established; their conjunction as a formal theorem about cause-plex CI thresholds requires writing up.

**Approach.** The CI threshold $\mathrm{CI}_{\min}$ is defined as the minimum CI for a cause-plex containing a topologically non-trivial loop. In 3D, this corresponds to the simplest non-trivial knot (the trefoil). The formal claim needed: in $n_s < 3$, all loops in any locally finite cause-plex are isotopically trivial; in $n_s \geq 3$, non-trivial loops exist. This is a statement about the embedding space and follows from the classification of knots in low dimensions — a known result in topology, but not yet stated in cause-plex terms.

**Status:** The mathematics exists; the translation to cause-plex language remains.

### Open Problem 2: Number-Volume Conjecture

The conformal factor in the Lorentzian metric is fixed by equating causal event count with spacetime volume. This is well-supported numerically but not proved in full generality. Separate from dimensionality but required for the full metric derivation.

---

## References

- Tangherlini, F.R. (1963). Schwarzschild field in n dimensions and the dimensionality of space problem. *Il Nuovo Cimento*, 27, 636–651. DOI: 10.1007/BF02784569
- Tegmark, M. (1997). On the dimensionality of spacetime. *Classical and Quantum Gravity*, 14(4), L69–L75. DOI: 10.1088/0264-9381/14/4/002
- Malament, D.B. (1977). The class of continuous timelike curves determines the topology of spacetime. *Journal of Mathematical Physics*, 18(7), 1399–1404. DOI: 10.1063/1.523436
- Bombelli, L., Lee, J., Meyer, D., & Sorkin, R.D. (1987). Space-time as a causal set. *Physical Review Letters*, 59(5), 521–524. DOI: 10.1103/PhysRevLett.59.521
- Wolfram, S. (2020). A class of models with the potential to represent fundamental physics. *Complex Systems*, 29(2), 107–536.

---

*[Cause-Plex and Spacetime](./causeplex_spacetime.md) | [Cause-Plex and Quantum Mechanics](./causeplex_quantum.md) | [Series Map](./series_map.md)*
