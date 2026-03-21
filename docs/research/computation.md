---
title: "Research Note: Computation, Representation, and Information"
description: >-
  Definitions of computation, representation, information, and prediction within
  Epimechanics. Computation is producing a representation — discriminating,
  partitioning, compressing — and varies in depth from passive encoding to
  self-referential modeling. Connections to Shannon, Landauer, Constructor
  Theory, Church-Turing, Kolmogorov, and autopoiesis.
date: 2026-03-21T00:00:00.000Z
draft: true
author:
  name: "Ian Derrington"
contentType: article
series: "Epimechanics"
tags:
  - Epimechanics
  - Computation
  - Representation
  - Information
  - Constructor Theory
  - Auto-causal density
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
feedback:
  enabled: true
---

## Core Definitions

**Entity.** Anything with causal presence. Entity and causal interaction are a co-definitional primitive pair — neither is prior to the other. The framework is silent on causally inert possibilia.

**State.** The posited referent that representations approximate. Epimechanics assumes states exist but does not claim direct access to them.

**Computation.** Producing a representation — discriminating, partitioning, compressing. Computation varies in depth (passive → active → adaptive → self-referential) and happens at every scale. This is pancomputational; the depth spectrum is the discriminator, the same way the entity definition is pan-entity and $\rho_{\text{ac}}$ is the discriminator.

**Representation.** The product of computation — an approximation of state. $X$. A representation may be predictively effective or not. Some representations compress well (they track causal structure); others do not.

**Information.** Predictive information — the degree to which a representation's distinctions reduce uncertainty about future states, above background noise. Formally: mutual information between $X$ and dynamics.

**Prediction.** Reduction of uncertainty about future states given a representation's information content.

### The Chain

Entity → Computation → Representation → Information → Prediction.

This chain is recursive, not linear. The computing entity is itself known only through representations computed by other entities (or itself). Every link presupposes the others.

---

## The Depth Spectrum

Computation varies in depth. The following are landmarks on what we conjecture is a continuous spectrum, not discrete categories.

### Level 0: Passive Encoding

Structure constrains but does not maintain itself against degradation. Examples: crystal lattice constraining phonon propagation, a canyon constraining water flow. $\rho_{\text{ac}}$ is low; the encoding degrades without external maintenance.

### Level 1: Active Replication

Structure reproduces. Examples: DNA template-directed replication, autocatalytic chemical cycles. $\rho_{\text{ac}}$ is moderate — the system sustains its structure through reproduction, creating causal loops at the lineage level.

### Level 2: Adaptive Modeling

Structure updates based on feedback. Examples: immune systems, neural networks, bacterial chemotaxis. $\rho_{\text{ac}}$ is high — multiple nested causal loops maintain and update internal structure.

### Level 3: Self-Referential Modeling

Structure models its own modeling. Examples: conscious introspection, formal systems reasoning about their own provability, self-modifying code. $\rho_{\text{ac}}$ is high and recursive — the causal loops include the system's own loop structure as an object of representation.

---

## Connections

### Shannon

Predictive information is a specific application of mutual information. Shannon entropy measures uncertainty in a distribution; predictive information measures how much a representation reduces that uncertainty about dynamics specifically. Shannon gives the measure; Epimechanics specifies what is being measured — the predictive content of $X$ with respect to future states.

### Landauer

Computation has thermodynamic cost because real-world representing involves irreversible steps. [Landauer (1961)](https://doi.org/10.1147/rd.53.0183) established that erasing one bit dissipates at least $k_B T \ln 2$. The cost enters through irreversibility, not through representation per se. Updating a representation requires erasing the old one before writing the new one. For adaptive systems (Level 2+), continual model updating pays Landauer's cost at every cycle. [Bennett (1973)](https://doi.org/10.1147/rd.176.0525) showed that logically reversible computation can in principle avoid dissipation — whether higher depths are inherently more irreversible remains open.

### Constructor Theory

[Deutsch & Marletto (2013, 2015)](https://doi.org/10.1007/s10701-014-9848-2) define computation through constructors: systems that perform a task and retain the ability to perform it again. Constructors are high-$\rho_{\text{ac}}$ entities whose computation is reliable and repeatable.

Constructor Theory defines computation counterfactually (what transformations are possible); Epimechanics defines it dynamically (what happens). These are complementary perspectives.

**The copyability gap.** Constructor Theory requires that information be both distinguishable and copyable. Epimechanics requires only predictive content. A canyon's shape is not copyable as an object, but its causal constraining of water flow is real computation at Level 0. This is not a deficiency — it reflects a genuine difference in what "information" means.

**The quantum case.** Constructor Theory needs two tiers: classical information (distinguishable and copyable) and superinformation (distinguishable but not fully copyable, per the [no-cloning theorem](https://doi.org/10.1038/299802a0)). Epimechanics handles both with one definition because causal encoding covers quantum states that constrain measurements without being copyable. A quantum state constrains measurement outcomes — one state's structure constraining another's trajectory — whether or not it can be cloned. This is a genuine structural advantage.

### Church-Turing

The Church-Turing thesis concerns universal computation — the class of functions computable by an effective procedure. Turing computation is the algorithmic special case at the adaptive/self-referential depth. The framework is broader and does not claim that computational universality results apply across the whole spectrum. A crystal at Level 0 computes in Epimechanics' sense but is not Turing-complete. This is deliberate: restricting "computation" to Turing-complete systems would exclude most phenomena the framework addresses.

### Kolmogorov Complexity

Good representations compress the data-generating process into fewer variables — short descriptions. [Kolmogorov complexity](https://doi.org/10.1016/S0019-9958(65)90362-8) formalizes minimal description length. Representations that compress well are precisely those that track causal structure, aligning Kolmogorov compression with high predictive information.

### Autopoiesis

[Maturana & Varela (1980)](https://doi.org/10.1007/978-94-009-8947-4) defined autopoietic systems as those that produce and maintain their own organization. $\rho_{\text{ac}}$ does similar work to organizational closure: it measures the degree to which a system's causal structure sustains itself. The difference is that Epimechanics quantifies it. Autopoietic closure corresponds roughly to the transition from Level 1 to Level 2 — where self-maintenance becomes active rather than merely replicative.

---

## Connection to Self-Multiplication

The [self-multiplication research note](./self_multiplication.md) proposes that auto-causal structure emerges from states acting on themselves: $X_{t+1} = \mathbf{T}(X_t) \cdot X_t$. If that proposal holds, computation has a natural origin story: a system computes when its self-multiplication dynamics produce stable internal structure ($\rho_{\text{ac}} > 0$) that constrains other systems.

Eigenvectors of the transition operator with $|\lambda| = 1$ are persistent entities — stable causal constraints that survive the dynamics. The eigenvalue spectrum may correspond to the depth spectrum. This is speculative; the connection is suggestive but unproven.

---

## Open Questions

1. **Continuous parameterization of depth.** The four-level spectrum is qualitative. A continuous parameterization (perhaps mutual information between encoder structure and constrained trajectory, normalized by complexity) has not yet been formalized.

2. **Minimum $\rho_{\text{ac}}$ for non-trivial computation.** Is there a threshold below which computation is negligible, or does the spectrum extend smoothly to zero?

3. **Compositionality.** How do computations compose? When do simple discriminations combine into complex representations? This likely connects to entity boundaries and coupling tensors.

4. **Reversible computation and Landauer.** Are higher depths inherently more irreversible? Bennett's reversible computation results suggest the answer is not obvious.

5. **Relationship to Tononi's $\Phi$.** [Integrated information (Tononi 2004)](https://doi.org/10.1186/1471-2202-5-42) measures how much a system's parts constrain each other beyond what the parts do independently. This resembles $\rho_{\text{ac}}$ at the loop level. The formal relationship has not been established.
