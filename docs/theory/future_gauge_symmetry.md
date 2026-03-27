---
title: "Future Work: Gauge Symmetry from Causal Loop Topology"
description: >-
  Open research program for deriving SU(2) and SU(3) as loop deformation groups
  from cause-plex structure. This document records the conjecture, its motivation,
  and what would be required to prove it.
date: 2026-03-27T00:00:00.000Z
draft: true
author:
  name: "Ian Derrington"
series: "Epimechanics"
tags:
  - Epimechanics
  - Open problems
  - Gauge theory
  - Standard Model
  - Future work
---

> **Status: Research program — not yet developed.** This document records a conjecture motivated by the amplitude fixed-point result. It is placed here to preserve the insight and define the next research direction.

---

## What Has Been Established

The [Amplitude Fixed-Point paper](./amplitude-phase-fixed-point-paper.md) establishes:

$$G_\text{scalar phase} = \mathrm{U}(1)$$

This is the group governing the global phase of path amplitudes — the U(1) of electromagnetism. It follows from: product-state independence + compositional consistency + recursive closure + Lie regularity.

The Standard Model gauge group is $\mathrm{U}(1) \times \mathrm{SU}(2) \times \mathrm{SU}(3)$. The fixed-point result gives U(1). The question is where SU(2) and SU(3) come from.

---

## The Conjecture

**Conjecture G (Gauge symmetry from loop deformation groups).**

The gauge groups SU(2) and SU(3) arise as the **symmetry groups of continuous deformations between topologically equivalent stable causal loops** in a cause-plex with $n_s = 3$ spatial dimensions.

More precisely:

1. A stable causal loop (a particle) is a recurring pattern of causal events that returns to its initial state.
2. In $n_s = 3$ spatial dimensions, stable loops can have multiple topologically distinct configurations that are continuously connected by deformations (loop rotations, color rotations).
3. The group of continuous deformations that map valid loop configurations to other valid loop configurations — while preserving loop stability — is the **gauge group** of that particle type.
4. For quarks: 3 topologically equivalent color configurations, continuously connected → SU(3)
5. For weak isospin doublets: 2 configurations → SU(2)

**The physical interpretation:** A gluon exchange is a causal event that deforms a quark loop from one color configuration to another. The 8 gluons correspond to the 8 generators of SU(3) — the 8 independent types of causal events that rotate color.

---

## Why This Is Plausible

### 1. The knot topology connection

The spacetime paper establishes that $n_s = 3$ is required for observer-class entities partly because knot theory is non-trivial in 3 dimensions — stable loops have topologically distinct configurations (different knot types) that cannot be deformed into each other. This same non-triviality gives rise to the loop configuration diversity that would support internal symmetry groups.

In $n_s < 3$: all loops are isotopic (no knot diversity) → no internal symmetry structure beyond scalar phase.
In $n_s > 3$: loop structures exist but atoms are unstable (Tangherlini) → no persistent loops to carry symmetry.
In $n_s = 3$: rich knot topology → internal symmetry groups possible.

### 2. Holonomy in gauge theory

In standard gauge theory, the gauge group is the holonomy group — the group of internal rotations a particle accumulates as it traverses a closed path through the gauge field. This is mathematically equivalent to the group of continuous deformations of the loop in the presence of a gauge connection.

The cause-plex framing reinterprets this: the gauge field is not a background field but a description of which causal events are available to deform a given loop type. The holonomy group is the group of available deformations.

### 3. Confinement as topological neutrality

Color confinement in QCD says free quarks are never observed — only color-neutral combinations (baryons: triplets; mesons: pairs). In the conjecture: only topologically trivial (holonomy-neutral) loop combinations are stable as isolated entities at macroscopic scales. Single quarks carry non-trivial topological charge and cannot exist in isolation.

---

## What Would Be Required to Prove It

1. **Define "stable loop configurations" precisely** in the cause-plex. A configuration is a topological class of the loop in the spatial slice of the cause-plex. Two configurations are equivalent if continuously deformable into each other without breaking loop stability.

2. **Show that the group of continuous deformations in 3+1D** for fundamental particle loops gives exactly 3 connected components (color) for quark-type loops and 2 for weak doublet loops. This requires identifying which specific loop topologies are stable and counting their connectivity classes.

3. **Derive confinement** from the stability condition: show that only topologically trivial (color-singlet) combinations are stable at macroscopic scales in the cause-plex.

4. **Connect to the particle spectrum**: derive why quarks have color SU(3) and not SU(4), why weak doublets have SU(2) and not SU(3). This likely requires the specific stable loop topologies of quarks and leptons, which connects to the causal loop structures in Part 1.5: Causors.

---

## Relationship to Existing Work

| Component | Status |
|---|---|
| U(1) scalar phase | ✅ Fixed-point theorem |
| SU(2) weak isospin | ❌ Conjecture G — not yet developed |
| SU(3) color | ❌ Conjecture G — not yet developed |
| Confinement | ❌ Topological neutrality — not yet developed |
| Full gauge group derivation | ❌ Requires all above |

---

## Connection to Full TOE

If Conjecture G can be proved, the full Standard Model gauge group follows from:

$$\underbrace{\mathrm{U}(1)}_{\text{scalar phase}} \leftarrow \text{fixed-point theorem}$$
$$\underbrace{\mathrm{SU}(2) \times \mathrm{SU}(3)}_{\text{loop deformation groups}} \leftarrow \text{Conjecture G}$$
$$\underbrace{3+1D}_{\text{spacetime}} \leftarrow \text{observer selection}$$

All three layers derive from the cause-plex primitive plus the observer-class stability condition. No free parameters would be introduced at the gauge group level — the Standard Model gauge group would be forced by the topology of stable causal loops in 3+1D.

The remaining open questions for a full TOE would be: fermion masses, mixing angles, coupling constants, and the number of generations. These likely require knowing the specific stable loop topologies of each fermion type, which is not yet characterized.
