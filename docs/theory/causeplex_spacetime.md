---
title: "Cause-Plex and Spacetime: Deriving the Lorentzian Metric from Causal Structure"
description: >-
  Formal derivation of the Lorentzian metric, Lorentz invariance, and energy conservation
  from cause-plex structure alone. The primitive is the causal event — a state transition
  with no assumed physics. Spacetime and energy emerge from structural properties of the
  cause-plex hypergraph.
date: 2026-03-25T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
series: "Epimechanics"
tags:
  - Epimechanics
  - Spacetime
  - Lorentzian metric
  - Cause-plex
  - Causal set theory
  - Noether theorem
  - Foundations
---

> **In plain English:** Spacetime — the arena in which physics happens — is usually taken as a given. This paper asks: where does it come from? The answer: spacetime is what you get when you have a set of events with a causal ordering ("this happened before that"). From nothing more than that ordering, you can derive the geometry of space and time (the Lorentzian metric), the fact that nothing travels faster than light (Lorentz invariance), and what energy means (Noether's theorem). The one-time-dimension, three-space-dimension structure of our universe (3+1D) isn't derived from first principles — it's explained by observer selection: only in 3+1D can complex structures like atoms, chemistry, and observers form and persist. Everything else follows from the causal ordering alone.

> This document derives spacetime structure from cause-plex primitives. It draws on causal set theory (Bombelli, Lee, Meyer, Sorkin 1987), Malament's theorem (1977), and Wolfram's causal invariance argument. Where results are established, proofs are given. Where results are at the research frontier (GR from causal dynamics), status is stated explicitly.

> **Layer architecture note.** This paper operates at **Layer 0** (causal event primitive and locally finite poset) and **Layer A** (spacetime, energy, conserved quantities in the continuum limit). The cause-plex $(E, \prec)$ is the Layer 0 object. Spacetime metric, energy, and Lorentz invariance are Layer A emergent descriptions valid in the continuum limit. General relativity is a further coarse-graining. The Layer B (bond/loop structures) and Layer C (force, temperature, biological observables) coarse-graining ladder is developed in [Part 1.5: Causors](./01_5_causors.md) and [Part 1: Generalized Mechanics](./01_generalized_mechanics.md).

---

> **Worked example before the formalism:** A light signal leaves a lamp (event A) and arrives at your eye (event B). A comes before B — causally, not just temporally. That's the entire primitive: one event precedes another. Now imagine building up all the events in the universe into a single giant "before/after" web. This paper shows that web already contains spacetime geometry, Lorentz invariance, and the meaning of energy — without assuming any of them. Every formal definition below is just making "before/after web" precise enough to derive those consequences rigorously.

---

## 1. The Primitive

**Definition 1.1 (Causal event).** A causal event $e$ is an ordered pair $(\mathcal{S}_{\text{in}}, \mathcal{S}_{\text{out}})$ where $\mathcal{S}_{\text{in}}$ and $\mathcal{S}_{\text{out}}$ are states and $\mathcal{S}_{\text{out}}$ is a function of $\mathcal{S}_{\text{in}}$. No physical content is assumed — no energy, no units, no conservation laws.

**Definition 1.2 (Cause-plex).** The cause-plex $\mathcal{C} = (E, \prec)$ is a set of causal events $E$ equipped with a binary relation $\prec$ ("precedes") satisfying:

1. **Irreflexivity:** $e \not\prec e$ for all $e \in E$
2. **Transitivity:** $e_1 \prec e_2$ and $e_2 \prec e_3$ implies $e_1 \prec e_3$
3. **Local finiteness:** for all $e_1, e_2 \in E$, the set $\{e \in E : e_1 \prec e \prec e_2\}$ is finite

$(E, \prec)$ is a **locally finite partially ordered set** (locally finite poset). This is identical to the structure of a causal set as defined in causal set theory.

**Definition 1.3 (Spacelike separation).** Events $e_1, e_2 \in E$ are **spacelike separated**, written $e_1 \perp e_2$, if neither $e_1 \prec e_2$ nor $e_2 \prec e_1$.

**Definition 1.4 (State domain).** Each event $e$ has a **state domain** $D(e) \subseteq \mathcal{S}$ — the set of state variables it reads from ($D_{\text{in}}(e)$) and writes to ($D_{\text{out}}(e)$).

**Locality assumption (L).** For each event $e$, $|D(e)| < \infty$ and $D_{\text{out}}(e)$ is disjoint from $D_{\text{in}}(e')$ for all $e' \prec e$ not immediately preceding $e$. Events act on bounded local state domains.

**Causal dependency axiom (CD).** If event $e_2$ reads a state written by event $e_1$ — i.e., $D_{\text{out}}(e_1) \cap D_{\text{in}}(e_2) \neq \emptyset$ — then $e_1 \prec e_2$.

*Remark on CD.* This axiom links the abstract partial order relation $\prec$ (defined in Definition 1.2 structurally) to the physical notion of state propagation. Without it, $\prec$ is a purely formal ordering with no guaranteed connection to actual state domain dependencies. CD is the minimally necessary bridge: it says the causal ordering respects information flow. It is a physical assumption — not derivable from the poset axioms alone — and is stated explicitly here as such.

---

## 2. Three Properties and Their Derivation

### P1: Causal Partial Ordering

**Claim.** $(E, \prec)$ is a strict partial order.

**Proof.** By Definition 1.2, $\prec$ is irreflexive and transitive. Asymmetry follows: if $e_1 \prec e_2$ and $e_2 \prec e_1$, transitivity gives $e_1 \prec e_1$, contradicting irreflexivity. ∎

### P2: Causal Invariance

**Claim.** Spacelike-separated events commute: $e_1 \perp e_2 \implies e_1 \circ e_2 = e_2 \circ e_1$.

**Proof.** Let $e_1 \perp e_2$. By Definition 1.3, neither $e_1 \prec e_2$ nor $e_2 \prec e_1$.

We claim $D_{\text{out}}(e_1) \cap D_{\text{in}}(e_2) = \emptyset$ and $D_{\text{out}}(e_2) \cap D_{\text{in}}(e_1) = \emptyset$.

Suppose otherwise: say $s \in D_{\text{out}}(e_1) \cap D_{\text{in}}(e_2)$. Then by the Causal Dependency Axiom (CD), $D_{\text{out}}(e_1) \cap D_{\text{in}}(e_2) \neq \emptyset$ implies $e_1 \prec e_2$ — contradicting $e_1 \perp e_2$. The symmetric argument gives the second case.

Therefore $D(e_1) \cap D(e_2) = \emptyset$: the events act on disjoint state domains. Operators acting on disjoint domains commute (their composition is independent of order). ∎

**Corollary.** P2 follows from P1, locality (L), and the Causal Dependency Axiom (CD). The physical content is in CD — the requirement that the causal ordering respects state domain dependencies. CD is an independent structural axiom, not derivable from the poset definition alone.

### P3: Finite Minimum Event Latency

**Postulate P3.** There exists $\tau_{\min} > 0$ such that every causal event has latency $\tau_e \geq \tau_{\min}$.

**Status: Postulate (well-motivated by local finiteness).** P3 is not derived from local finiteness alone — a genuine derivation would require showing that finite minimum latency follows from discrete poset structure without invoking the continuum limit, which would be circular (the continuum limit requires the discreteness of P3 to be defined). P3 is therefore treated as a well-motivated independent structural postulate, motivated by:

- Local finiteness: between any two causally related events, the causal chain is finite. This strongly motivates a minimum spacing but does not logically force a specific minimum time.
- Physical calibration: the Planck time $t_P = \sqrt{\hbar G / c^5} \approx 5.4 \times 10^{-44}$ s is the scale below which the classical spacetime description breaks down. Local finiteness is the structural claim; $t_P$ is its physical calibration.

P3 joins local finiteness as the two structural postulates of the cause-plex at Layer 0.

---

## 3. Time as Causal Path Count

**Definition 3.1 (Causal path).** A causal path from $e_1$ to $e_2$ is a sequence $e_1 = f_0 \prec f_1 \prec \cdots \prec f_n = e_2$ of events. The **length** of the path is $n$ (number of steps).

**Definition 3.2 (Proper time).** Given a reference cause-plex $\mathcal{C}_{\text{ref}}$ (an oscillating loop with period $T_{\text{ref}}$, e.g., an atomic clock), the proper time elapsed along a worldline $\gamma$ is:

$$\tau(\gamma) = \frac{|\gamma|}{|\mathcal{C}_{\text{ref}}|}$$

where $|\gamma|$ is the number of causal events along $\gamma$ and $|\mathcal{C}_{\text{ref}}|$ is the number of events per reference period. This is a dimensionless ratio until the reference period is assigned a unit.

**This definition requires no background time coordinate.** Time is a count of cause-plex events relative to a reference oscillation — intrinsic to the structure, not imposed from outside.

**Corollary (Q5 resolved).** Timescale separation between loops is a ratio of causal event counts per reference period. Fast loops have high event density per reference cycle; slow loops have low density. Timescale is a derived quantity from cause-plex structure, not an independent structural parameter.

---

## 4. Recovering the Lorentzian Metric

### 4.1 Malament's Theorem

**Theorem (Malament 1977).** Let $(M, g)$ and $(M', g')$ be two distinguishing spacetimes (spacetimes where distinct points have distinct causal pasts and futures). If there exists a bijection $\phi: M \to M'$ that preserves the causal ordering in both directions (a causal isomorphism), then $\phi$ is a conformal isometry: $g' = \Omega^2 \phi^* g$ for some smooth positive function $\Omega$.

**Meaning.** The causal ordering uniquely determines the metric **up to a conformal factor** $\Omega^2$ — an overall scale that can vary point-by-point but cannot change the causal structure. Malament's theorem means: know the causal partial order, know the metric up to scale.

### 4.2 Fixing the Conformal Factor by Event Counting

**Claim.** The conformal factor $\Omega$ is fixed by the density of causal events per spacetime volume.

In causal set theory, the fundamental relation is:

$$N(A) \approx \frac{V(A)}{V_P}$$

where $N(A)$ is the number of causal events in spacetime region $A$, $V(A)$ is the spacetime volume of $A$ in the continuum limit, and $V_P = \ell_P^4$ is the Planck volume (the natural unit set by local finiteness).

This is the **"number = volume"** conjecture of causal set theory (Bombelli et al. 1987, Sorkin 1991). If the event count faithfully approximates spacetime volume, the conformal factor is fixed: regions with higher event density have smaller $V_P$-normalized volume, setting $\Omega$ consistently across the manifold.

**Together:** causal ordering (Malament) + event counting (number = volume) → full Lorentzian metric. No additional assumptions beyond P1 and local finiteness.

### 4.3 The Metric Signature $(-,+,+,+)$

The Lorentzian signature is not assumed — it follows from the asymmetry built into the causal partial order.

**Claim.** The causal partial order $(E, \prec)$ naturally induces a bilinear form with signature $(-,+,+,+)$ in 3+1 dimensions.

**Argument.** In the continuum limit, consider the interval function $I(e_1, e_2) = $ number of events causally between $e_1$ and $e_2$:

- If $e_1 \prec e_2$: $I(e_1, e_2) > 0$ — timelike separation, events share a causal cone
- If $e_1 \perp e_2$: $I(e_1, e_2) = 0$ by definition — spacelike separation, no causal path
- On the boundary: $I(e_1, e_2) = 0$ with $e_1 \prec e_2$ — lightlike, causal but no intermediate events

The interval function is the continuum spacetime interval $ds^2$ up to sign convention. The single negative direction (timelike) vs. three positive directions (spacelike) reflects the observed 3+1 dimensionality of the cause-plex — an empirical fact about the physical world's cause-plex, not a derivation from pure structure.

**On dimensionality.** The specific signature $(-,+,+,+)$ vs $(-,+,+)$ or $(-,+,+,+,+)$ is not derivable from the abstract cause-plex structure alone — it is a fact about how many independent spacelike dimensions the physical cause-plex has. The structure determines the form of the metric; the dimensionality is a property of the specific cause-plex realized. See OP3.

### 4.4 Lorentz Invariance

**Claim.** In the continuum limit, the symmetry group preserving causal structure is the Lorentz group.

**Argument (following Wolfram 2020, adapted).** A transformation $\Lambda$ of the cause-plex preserves causal structure if:

$$e_1 \prec e_2 \iff \Lambda(e_1) \prec \Lambda(e_2)$$

By Malament's theorem, causal-structure-preserving maps are conformal isometries. The subgroup of conformal isometries that also preserve event count density (fixing the conformal factor) is the isometry group of the metric. For flat Minkowski spacetime, this is the Poincaré group. The homogeneous subgroup (fixing the origin) is the Lorentz group.

In terms of causal path counts: a Lorentz boost is a transformation that changes the distribution of causal events between timelike and spacelike directions while preserving the total causal interval. Time dilation and length contraction are the observed consequence of this redistribution. ∎

---

## 5. Energy from Symmetry

### 5.1 Discrete to Continuous Symmetry

The cause-plex has **discrete time-translation symmetry** if the transition rules governing causal events are the same at every step — i.e., the cause-plex is homogeneous along causal chains. In the continuum limit ($\tau_{\min} \to 0$, many events per reference period), discrete translation symmetry becomes continuous time-translation symmetry.

### 5.2 Noether's Theorem

**Theorem (Noether 1915).** For every continuous symmetry of the action of a physical system, there is a corresponding conserved quantity.

**Applied to time-translation symmetry:** continuous time-translation invariance of the cause-plex action gives a conserved quantity. We define this quantity as **energy**.

**Meaning.** Energy is not primitive — it is the name for the conserved quantity associated with the cause-plex having the same event structure at every time step. In regions where this symmetry holds (most of macroscopic physics), energy is well-defined and conserved. In regions where it is broken (strongly non-equilibrium, rapidly evolving, symmetry-breaking transitions), "energy" is not a clean quantity and the framework works at the causal event level directly.

**Units.** Energy has units J = kg·m²·s⁻² where all three base units are ratios of cause-plex path counts to reference oscillations:
- **Second:** $9{,}192{,}631{,}770$ Cs-133 hyperfine transition cycles (by definition)
- **Meter:** distance light travels in $1/299{,}792{,}458$ seconds = $c / f_{\text{ref}}$ cause-plex propagation events
- **Kilogram:** defined via Planck's constant $h = 6.626 \times 10^{-34}$ J·s, itself a count of action quanta (phase cycles of matter waves)

All units reduce to cause-plex event counts relative to reference oscillations. No unit is assumed.

Similarly, **spatial translation symmetry** → momentum; **rotational symmetry** → angular momentum; **U(1) gauge symmetry** → charge.

---

## 6. The Coarse-Graining Ladder

The cause-plex structure, once spacetime and conserved quantities are established, produces the coarse-grained descriptions used throughout the epimechanics series:

| Scale | Cause-plex description | Coarse-grained description | Valid where |
|---|---|---|---|
| Planck | Discrete causal events $(E, \prec)$ | — | Always |
| Quantum field | Gauge boson exchange events | Quantum fields $\hat{\phi}(x)$ | Flat spacetime, weak coupling |
| Classical mechanics | Many-event averages | Force $F = dp/dt$, energy $W$ | $\hbar \to 0$, macroscopic |
| Thermodynamics | Ensemble of causal event chains | Temperature, entropy | Many-body, near-equilibrium |
| Biology | Coupled oscillating cause-plexes | ATP, metabolic flux, $\rho_{\text{ac}}$ | Time-translation symmetry holds locally |
| Institution | Human-scale cause-plexes | Dollars, decisions, norms | Social-scale description valid |

Each row is a coarse-graining of the row above. The descriptions in column 3 are valid Layer C observables within their scope. "Energy exchange" at the biological scale is valid because time-translation symmetry holds there; it is not the primitive.

---

## 7. Curved Spacetime and General Relativity

### 7.1 Non-Uniform Event Density → Curved Spacetime

In flat Minkowski spacetime, causal event density is uniform across the cause-plex. Curved spacetime corresponds to non-uniform event density: regions with higher event density per coordinate volume have more causal structure per unit coordinate interval — the cause-plex is "denser" there.

The stress-energy tensor $T_{\mu\nu}$ is a measure of energy-momentum density at a point — which is a measure of cause-plex event density and flow at that point. The Einstein field equation:

$$G_{\mu\nu} = 8\pi T_{\mu\nu}$$

states that cause-plex event density ($T_{\mu\nu}$) determines the curvature of the cause-plex metric ($G_{\mu\nu}$). This is a cause-plex interpretation of GR.

### 7.2 Actions in the Cause-Plex Framework

Two distinct actions appear in the cause-plex framework, operating at different layers. They should not be conflated.

**Gravitational action (Layer 0 — purely combinatorial).** Benincasa and Dowker (2010, *Phys. Rev. Lett.* 104:181301) define a scalar curvature action on causal sets from event counts alone — no energy, no Lagrangian:

$$S_{\text{BD}} = \ell_P^2 \sum_{x \in \mathcal{C}} \left[ 1 - N_1(x) + \frac{N_2(x)}{2} - \cdots \right]$$

where $N_k(x)$ counts causal intervals of depth $k$ above $x$. In the continuum limit, $S_{\text{BD}} \to \int R \sqrt{-g}\, d^4x$ — the Einstein-Hilbert action. This is clean at Layer 0: no energy assumed, no circularity.

**Matter action (Layer C — definitional, not derived).** The matter action $S[\gamma] = \sum_k \Delta E(e_k) \cdot \tau_{e_k}$ is a Layer C construct. Energy $\Delta E$ is defined at Layer C as the Noether conserved quantity where time-translation symmetry holds (Section 5). Time $\tau$ is the event-count ratio (Definition 3.2). At Layer C, the action is therefore well-defined and non-circular: it uses quantities that are precisely defined at that layer.

The earlier concern (AUDIT.md Priority 1a) was that energy appeared to be both derived-from and used-in the action. This concern is dissolved by the layer separation: energy is not derived from the matter action at Layer 0; rather, the matter action is a Layer C expression that names what the Layer 0 phase function $\phi(\gamma)$ (proved to lie in U(1) in [Complex Amplitudes from Loop-Phase Consistency](./causeplex_loop_phase.md)) corresponds to in Layer C vocabulary. The identification $\phi(\gamma) = S[\gamma]/\hbar$ is a definitional bridge between layers, not a circular derivation. See Proposition 6.2 of that paper for the full argument.

**$\hbar$ non-circularly.** The quantum of action $\hbar = \Delta E_{\min} \cdot \tau_{\min} = \Delta E_{\min}/|\mathcal{C}_{\text{ref}}|$ — minimum energy per causal event divided by the reference clock frequency — is defined using only Layer C energy and the event-count time definition. It does not presuppose ℏ. See §6.3 of the loop-phase paper.

### 7.3 Status: Partial (GR)

Deriving the Einstein field equation from cause-plex dynamics (rather than interpreting it) requires showing that the dynamics governing causal event density necessarily produce the GR equations in the continuum limit. The Benincasa-Dowker action (Section 7.2) provides a combinatorial causal-set action that converges to the Einstein-Hilbert action — this is the strongest existing result. Full derivation of the dynamics remains open. This is the subject of:

- **Causal dynamical triangulations (CDT)** — numerical evidence that the path integral over causal geometries gives 4D de Sitter spacetime in the continuum limit (Ambjorn, Jurkiewicz, Loll 2004)
- **Causal set dynamics** (Sorkin's sequential growth models) — show that certain natural random growth processes on causal sets produce Lorentzian geometry
- **Spin foam models** — discrete path integrals over causal structures that give GR in the semiclassical limit

**Current status:** The cause-plex interpretation of GR is structurally correct and consistent with these results. A complete derivation of the Einstein field equation from cause-plex primitives alone is open. This is where epimechanics connects to the frontier of quantum gravity research.

---

## 8. Relationship to Causal Set Theory

At the physics level, the cause-plex framework is built on causal set theory (CST). This section states the overlap and contributions honestly.

### 8.1 What the cause-plex shares with causal set theory

The cause-plex $(E, \prec)$ as defined in Section 1 is identical to a causal set as introduced by Bombelli, Lee, Meyer, and Sorkin (1987): a locally finite partially ordered set where the partial order encodes causal precedence. The following results in this paper are drawn directly from CST:

| Result | CST source |
|---|---|
| P1: causal partial order | Bombelli et al. (1987), Definition |
| P2: spacelike commutativity | Standard in CST; follows from locality |
| Metric from causal order (Malament) | Malament (1977), applied in CST |
| Number = volume conjecture | Sorkin (1991), foundational CST conjecture |
| Lorentz invariance from causal structure | Henson (2006), Dowker (2006) |
| Gravitational action (Section 7.2) | Benincasa & Dowker (2010) |
| QM via path integral on causal sets | Sorkin (1994) quantum measure theory |

The cause-plex framework does not re-derive these results — it inherits them. Any paper that presents these results as novel without acknowledging CST would be misleading.

### 8.2 What the cause-plex framework adds

The distinctive contributions of epimechanics beyond CST are:

**1. The coarse-graining ladder to biology and society.** CST focuses on the Planck-scale structure of spacetime. Epimechanics extends the same primitive to bonds, loops, auto-causal entities, meta-entities, and social systems — a multi-scale program that CST does not address.

**2. The Q1–Q4 entity type descriptors.** The classification of entities by bond type, loop order, basin depth, entropy production, and repair rate [Part 1.5: Causors] is not present in CST. This provides the vocabulary for the entity taxonomy.

**3. The selective convergence argument for dimensionality.** CST takes the dimensionality of spacetime as an empirical input calibrated by the number-volume conjecture. The cause-plex framework adds the observer-selection argument (Section 10) grounding why 3+1 is the observed dimensionality in terms of structural stability conditions for observer-class entities.

**4. The loop-phase derivation of complex amplitudes.** The argument that $i$ in $e^{iS/\hbar}$ follows from stable loop structure [causeplex_loop_phase.md] is not present in CST. Sorkin's quantum measure theory derives complex amplitudes from a different direction (probability theory hierarchy).

**5. Integration with the epimechanics entity framework.** The connection between fundamental causal structure and the biological/social entity hierarchy is the central application of epimechanics and has no analog in CST.

### 8.3 Positioning

The cause-plex framework is best understood as: *causal set theory at the physics level, with a coarse-graining program extending to biological and social systems, grounded by an observer-selection argument for dimensionality, and augmented by a loop-phase derivation of quantum amplitudes.* The physics is not new; the extension and integration are.

---

## 9. Summary: What Is Derived, What Is Assumed

| Claim | Status | Derivation |
|---|---|---|
| Causal partial order exists (P1) | ✅ Derived | By construction from Definition 1.2 |
| Spacelike events commute (P2) | ✅ Derived | From P1 + locality (L) + Causal Dependency Axiom (CD) (Section 2) |
| Finite minimum event latency (P3) | 🧭 Postulate | Well-motivated by local finiteness; not formally derived (Section 2) |
| Proper time as event count ratio | ✅ Derived | Definition 3.2 |
| Q5 (timescale) is derived, not primitive | ✅ Derived | Corollary to Definition 3.2 |
| Metric determined up to conformal factor | ✅ Derived | Malament's theorem (1977) |
| Conformal factor fixed by event counting | ✅ (conditional) | Number = volume conjecture (well-supported, not proven) |
| Full Lorentzian metric falls out | ✅ (conditional on above) | Malament + event counting |
| Lorentz invariance | ✅ Derived | Malament + continuum limit |
| Metric signature $(-,+,+,+)$ | ⚠️ Observer-selection argument | Causal structure gives $n_t = 1$; $n_s = 3$ follows from stability filter (Tangherlini + knot topology) applied to observer-class entities. This is a rigorous observer-selection argument, not a derivation from pure cause-plex structure (Section 10) |
| Energy from time-translation symmetry | ✅ Derived | Noether's theorem in continuum limit |
| All units as event count ratios | ✅ Derived | Reference oscillation definitions |
| Flat spacetime (Minkowski) | ✅ Derived | Uniform event density |
| Curved spacetime interpretation | ✅ Derived | Non-uniform density = curvature |
| Einstein field equation | 🔬 Open | Frontier of causal set / quantum gravity research |

**One remaining empirical input:** the spatial dimensionality of the physical cause-plex (3+1). The framework derives that the metric has Lorentzian signature; the specific $(-, +, +, +)$ form requires that the cause-plex has 3 independent spacelike dimensions. This is an observed property of the physical world, not a logical necessity.

---

## 10. Why 3+1: Selective Convergence

The question of why we observe $(-,+,+,+)$ specifically — not $(-,+,+)$ or $(-,+,+,+,+)$ — is addressed in the companion paper [Why 3+1: Observer-Selection Constraints on Spacetime Dimensionality](./causeplex_dimensionality.md).

**Summary of the argument:**
- $n_t = 1$ follows directly from P1 (the causal partial order requires exactly one timelike direction; $n_t = 0$ breaks causal ordering, $n_t \geq 2$ gives ultrahyperbolic PDEs with no well-posed initial value problem).
- $n_s = 3$ follows from two independent stability constraints applied to observer-class entities: Tangherlini's orbital stability result ($n_s > 3$ gives unstable atoms) and the knot-topology requirement for topologically non-trivial loop structures ($n_s < 3$ makes all loops isotopic, excluding $\mathrm{CI} > \mathrm{CI}_{\min}$).

This is an **observer-selection conjecture**, not a derivation from the cause-plex primitive. It is honestly labeled as such throughout.

---

## References

- Malament, D.B. (1977). The class of continuous timelike curves determines the topology of spacetime. *Journal of Mathematical Physics*, 18(7), 1399–1404.
- Bombelli, L., Lee, J., Meyer, D., & Sorkin, R.D. (1987). Space-time as a causal set. *Physical Review Letters*, 59(5), 521.
- Ambjorn, J., Jurkiewicz, J., & Loll, R. (2004). Emergence of a 4D world from causal quantum gravity. *Physical Review Letters*, 93(13), 131301.
- Benincasa, D.M.T. & Dowker, F. (2010). Scalar curvature of a causal set. *Physical Review Letters*, 104(18), 181301. DOI: 10.1103/PhysRevLett.104.181301
- Wolfram, S. (2020). A class of models with the potential to represent fundamental physics. *Complex Systems*, 29(2).
- Noether, E. (1918). Invariante Variationsprobleme. *Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen*, 235–257.
- Sorkin, R.D. (1991). Spacetime and causal sets. In *Relativity and Gravitation: Classical and Quantum*, World Scientific.
- Tangherlini, F.R. (1963). Schwarzschild field in n dimensions and the dimensionality of space problem. *Il Nuovo Cimento*, 27, 636–651. DOI: 10.1007/BF02784569

---

---

## The Self-Grounding Stack

The epimechanics framework derives from a single primitive — the causal event — through a layered chain of derivations, postulates, and layer-appropriate definitions. The table and graph below show the full dependency structure.

### Status Table

| Level | Structure | How obtained | Status |
|---|---|---|---|
| 0. Primitive | Causal event $e: \mathcal{S}_i \to \mathcal{S}_j$ | Assumed — irreducible | 🧱 Primitive |
| 1a. Cause-plex | $(E, \prec)$ locally finite strict partial order | Definition 1.2 | ✅ Defined |
| 1b. Causal Dependency Axiom (CD) | State domain dependency → causal precedence | Physical axiom (Section 1) | 🧭 Postulate |
| 1c. Locality (L) | Bounded local state domains | Physical axiom (Section 1) | 🧭 Postulate |
| 1d. P3: minimum event latency | $\tau_{\min} = 1/\lvert\mathcal{C}_{\text{ref}}\rvert$ | Event-count time definition (Def 3.2) | 🧭 Postulate (physically well-motivated) |
| 2a. P1: causal partial order | $(E,\prec)$ is a strict partial order | From Definition 1.2 | ✅ Derived |
| 2b. P2: spacelike commutativity | $e_1 \perp e_2 \Rightarrow e_1 \circ e_2 = e_2 \circ e_1$ | From P1 + L + CD | ✅ Derived |
| 2c. Proper time | $\tau = \lvert\gamma\rvert / \lvert\mathcal{C}_{\text{ref}}\rvert$ — event count ratio | Definition 3.2 | ✅ Derived |
| 2d. Lorentzian metric (up to conformal factor) | Causal ordering → metric | Malament (1977) | ✅ Derived (requires distinguishing spacetime) |
| 2e. Conformal factor | Event count density fixes scale | Number=volume conjecture | ⚠️ Well-supported; unproved |
| 2f. Lorentz invariance | Symmetry group of causal structure | Malament + continuum limit | ✅ Derived |
| 2g. Spatial dimensionality $n_s = 3$ | Stability filter on observer-class entities | Tangherlini + knot topology (Section 10) | ⚠️ Observer-selection conjecture; rigorous reasoning, not pure derivation |
| 3a. Energy (Layer C) | Noether conserved quantity under time-translation symmetry | Definition at Layer C (Section 5) | ✅ Defined at Layer C |
| 3b. Gravitational action (Layer 0) | $S_{\text{BD}}$ — purely combinatorial event count | Benincasa-Dowker (2010) | ✅ Derived at Layer 0 |
| 3c. Matter action (Layer C) | $S[\gamma] = \sum \Delta E \cdot \tau$ | Layer C definition using 3a + 2c | ✅ Defined at Layer C |
| 4a. Postulate Q': multiway structure | All causally consistent histories coexist | Structural postulate | 🧭 Postulate (irreducible quantum input) |
| 4b. $w(\gamma) \in \mathrm{U}(1)$ | Stable loops + CSS + locality → complex phases | Theorem 5.2, [loop-phase paper](./causeplex_loop_phase.md) | ✅ Proved |
| 4c. $\phi(\gamma) = S[\gamma]/\hbar$ | Layer C identification of U(1) phase with action | Proposition 6.2, loop-phase paper | ✅ Proved (Layer C) |
| 4d. $\hbar = \Delta E_{\min}/\lvert\mathcal{C}_{\text{ref}}\rvert$ | Minimum action quantum from event-count time | §6.3, loop-phase paper | ✅ Non-circular identification |
| 4e. Born rule | Gorard continuum limit + Gleason's theorem | Theorem 4.2, [quantum paper](./causeplex_quantum.md) | ⚠️ Conditional on Gorard (2020) preprint |
| 4f. Schrödinger equation | Continuum limit of multiway path integral | Via Gorard (2020) | ⚠️ Conditional on Gorard (2020) preprint |
| 5. Classical mechanics | Stationary phase / decoherence limit of QM | Standard | ✅ Derived |
| 6. Thermodynamics | Ensemble of causal paths + Noether | Many-path statistics | ✅ Derived |
| 7. Chemistry / biology | Stable auto-causal loops, $\sigma_b/k_BT \gg 1$ | Bond stability conditions | ✅ [Part 1.5: Causors](./01_5_causors.md) |
| 8. Complex entities | High-CI cause-plexes, $\rho_{\text{ac}} > 0$ | Causal loop taxonomy | ✅ [Part 1.5: Causors](./01_5_causors.md) |
| 9. Meta-entities / society | Nested loop-of-loops | Emergent from entity interactions | ✅ [Part 2: Meta-Entities](./02_meta_entities.md) |

**Legend:** 🧱 Primitive (assumed) · 🧭 Postulate (motivated but not derived) · ✅ Proved/derived · ⚠️ Conditional or conjecture

**Remaining open items:**
- Number=volume conjecture (2e): unproved in full generality; well-supported numerically
- Dimensionality $n_s = 3$ (2g): observer-selection conjecture with established physics grounding
- Born rule and Schrödinger equation (4e, 4f): conditional on Gorard (2020), which is not independently peer-reviewed

---

### Causal Dependency Graph

The following graph shows how each concept in the framework depends on its predecessors. Read downward: an arrow $A \to B$ means B is derived from or depends on A.

```mermaid
graph TD
    classDef primitive fill:#c0392b,color:#fff,stroke:#922b21,font-weight:bold
    classDef postulate fill:#e67e22,color:#fff,stroke:#a04000
    classDef proved fill:#27ae60,color:#fff,stroke:#1e8449
    classDef conditional fill:#f39c12,color:#fff,stroke:#b7770d
    classDef definition fill:#2980b9,color:#fff,stroke:#1a5276
    classDef derived fill:#8e44ad,color:#fff,stroke:#6c3483

    P0["Causal event e: Sᵢ → Sⱼ<br/>Primitive"]:::primitive

    P1a["Locality L<br/>Postulate"]:::postulate
    P1b["Causal Dependency CD<br/>Postulate"]:::postulate
    P1c["Cause-plex E,≺<br/>Definition"]:::definition
    P1d["P3: τ_min = 1/|C_ref|<br/>Postulate"]:::postulate

    P2a["P1: strict partial order<br/>✅ proved"]:::proved
    P2b["P2: spacelike commutativity<br/>✅ proved"]:::proved
    P2c["Proper time τ = |γ|/|C_ref|<br/>✅ derived"]:::proved
    P2d["Lorentzian metric up to conformal factor<br/>✅ Malament 1977"]:::proved
    P2e["Conformal factor<br/>⚠️ number=volume conjecture"]:::conditional
    P2f["Lorentz invariance<br/>✅ derived"]:::proved
    P2g["Dimensionality n_s=3<br/>⚠️ observer-selection conjecture"]:::conditional

    P3a["Energy E — Layer C<br/>✅ defined via Noether"]:::definition
    P3b["Gravitational action S_BD<br/>✅ Benincasa-Dowker 2010"]:::proved
    P3c["Matter action S[γ] — Layer C<br/>✅ definition"]:::definition

    Q0["Postulate Q': multiway C*<br/>Postulate"]:::postulate
    Q1["w(γ) ∈ U(1)<br/>✅ Theorem 5.2"]:::proved
    Q2["φ(γ) = S/ℏ — Layer C<br/>✅ Identification 6.2"]:::definition
    Q3["ℏ = ΔE_min/|C_ref|<br/>✅ non-circular"]:::proved
    Q4["Born rule<br/>⚠️ via Gorard 2020"]:::conditional
    Q5["Schrödinger equation<br/>⚠️ via Gorard 2020"]:::conditional

    CM["Classical mechanics<br/>✅ stationary phase limit"]:::derived
    TD["Thermodynamics<br/>✅ ensemble statistics"]:::derived
    CH["Chemistry / Biology<br/>✅ stable loops"]:::derived
    CE["Complex entities<br/>✅ high-CI, ρ_ac > 0"]:::derived
    ME["Meta-entities / Society<br/>✅ nested loops"]:::derived

    P0 --> P1a
    P0 --> P1b
    P0 --> P1c
    P0 --> P1d
    P1c --> P2a
    P1a --> P2b
    P1b --> P2b
    P2a --> P2b
    P1d --> P2c
    P2a --> P2c
    P2a --> P2d
    P2d --> P2e
    P2d --> P2f
    P2f --> P2g
    P1a --> P2g
    P2c --> P3a
    P2f --> P3a
    P2a --> P3b
    P3a --> P3c
    P2c --> P3c
    P0 --> Q0
    P2a --> Q1
    P1a --> Q1
    P1b --> Q1
    Q0 --> Q1
    Q1 --> Q2
    P3c --> Q2
    P1d --> Q3
    P3a --> Q3
    Q2 --> Q3
    Q0 --> Q4
    Q1 --> Q4
    Q4 --> Q5
    Q1 --> CM
    Q5 --> CM
    CM --> TD
    TD --> CH
    CH --> CE
    P2g --> CE
    CE --> ME
    P3a --> TD
    TD --> CH
    CH --> CE
    CE --> ME
    P2g --> CE
```

### Reading the Graph

**Primitives and postulates (top):** The causal event is the sole primitive. Four postulates are required: Locality (L), Causal Dependency (CD), P3 (minimum latency), and Q' (multiway structure). Everything else is derived.

**Two derivation branches:**
- *Left branch* (spacetime): cause-plex → P1/P2 → proper time → metric → Lorentz invariance → dimensionality
- *Right branch* (quantum): multiway + stability/CSS/locality → U(1) amplitudes → Layer C identification with S/ℏ

**Meeting point:** The branches converge at Level 4 (quantum mechanics) and flow together through classical mechanics → thermodynamics → biology → society.

**Conditional items (⚠️):** Number=volume conjecture, dimensionality conjecture, and Gorard-dependent Born rule/Schrödinger equation are the three remaining open items. All other nodes are proved or definitionally established.

---

---

## Conclusion

**What this paper showed, in plain English:**

Spacetime is not a container that physics happens inside. It is a description of causal structure — the pattern of "this event preceded that one" relationships across all events in the universe.

Starting from nothing but that ordering, we derived:
- **Time** — a count of causal events relative to a reference oscillation (an atomic clock is just a very reliable loop)
- **The Lorentzian metric** — the geometry of spacetime, including the fact that timelike and spacelike directions behave differently — from Malament's theorem plus event counting
- **Lorentz invariance** — the symmetry group of physics, from the structure of causal-order-preserving maps
- **Energy** — the conserved quantity that appears when the causal structure has the same rules at every moment (Noether's theorem)
- **Why 3+1 dimensions** — not from first principles, but from observer selection: only in 3+1D can atoms be stable, chemistry work, and complex observers exist

Three items remain open or conditional: the number=volume conjecture (well-supported but unproved), the 3D observer-selection argument (rigorous reasoning, not a derivation), and the full Einstein field equation from cause-plex dynamics (frontier of quantum gravity research).

Everything else is derived from a single primitive: a state transition with no physics assumed.

---

*For the epimechanics context: [Part 1.5: Causors](./01_5_causors.md) | [Part 1: Generalized Mechanics](./01_generalized_mechanics.md)*
*Next: [Cause-Plex and Quantum Mechanics](./causeplex_quantum.md)*
