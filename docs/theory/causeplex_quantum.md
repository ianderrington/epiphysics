---
title: "Cause-Plex and Quantum Mechanics: Deriving Quantum Structure from Multiway Causal Order"
description: >-
  We derive quantum mechanical structure from the multiway cause-plex — the collection
  of all causally consistent histories consistent with a given initial state. Given
  Postulate Q' (the cause-plex is multiway), quantum mechanics follows via two convergent
  arguments: (1) Sorkin's grade-2 quantum measure — the minimal consistent probability
  theory on a multiway structure forces complex amplitudes; (2) a loop-phase argument
  native to the cause-plex — closed loop amplitude weights must form a minimal continuous
  group, which is uniquely U(1). The Wick rotation analogy provides corroborating
  structural motivation. Together these arguments, plus Gorard's continuum limit result,
  recover the full quantum formalism.
date: 2026-03-25T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
series: "Epimechanics"
tags:
  - Epimechanics
  - Quantum mechanics
  - Multiway cause-plex
  - Path integral
  - Born rule
  - Entanglement
  - Causal structure
  - Foundations
coverImage:
  url: ./images/causeplex_quantum-1-1-2.png
---

> **In plain English:** Quantum mechanics — the theory of how particles behave — has always seemed strange: things can be in two places at once, measurements change outcomes, and particles interfere with themselves. This paper explains why all of that is inevitable, not mysterious. The key move: instead of one history of the universe (what classical physics assumes), consider all possible histories simultaneously. When you sum over all those histories with appropriate weights, interference appears naturally — some paths reinforce, others cancel. The weights must be complex phases (the $i$ in $e^{iS/\hbar}$) — see the [Amplitude Fixed-Point paper](./amplitude-phase-fixed-point-paper.md) for why that's the only self-consistent choice. Entanglement — the spooky correlations between distant particles — is simply two systems that share a common ancestor in their causal history. No action at a distance; just correlated branch structure.

> **Layer architecture note.** This paper operates at **Layer 0** (causal event primitive, multiway cause-plex $\mathcal{C}^*$) and **Layer A** (quantum mechanics as the amplitude theory of the multiway structure in the continuum limit). Postulate Q' (all histories coexist) is a Layer 0 structural claim. The Hilbert space, Born rule, and Schrödinger equation are Layer A emergent descriptions. Classical mechanics (Layer A, single dominant path), thermodynamics (Layer B), and biology/society (Layer C) are downstream in the coarse-graining ladder — see [Part 1.5: Causors](./01_5_causors.md).

> **Prerequisites.** This paper builds directly on [Cause-Plex and Spacetime](./causeplex_spacetime.md). The cause-plex $\mathcal{C} = (E, \prec)$ is a locally finite strict partial order of causal events (Definitions 1.1–1.2 there). Results used here: the Lorentzian metric derives from causal structure (Malament + event counting); the metric signature $(-,+,+,+)$ follows from the observer-selection argument (Section 8.5 there); energy is the conserved quantity under time-translation symmetry at Layer C (Section 5 there). Readers unfamiliar with those results should read the spacetime paper first.

---

## Abstract

The classical cause-plex — a locally finite partially ordered set of causal events — yields classical mechanics and the Lorentzian spacetime metric in the continuum limit. This paper extends the framework to quantum mechanics by introducing the multiway cause-plex $\mathcal{C}^*$: the collection of all locally finite partial orders consistent with a given initial state, together with a branch graph encoding their relationships. We show that the imaginary unit $i$ in the Feynman path integral weight $e^{iS/\hbar}$ is not a free choice: it is strongly motivated by the signature mismatch between the timelike $(-)$ causal direction and the spacelike $(+)$ branchlike direction of $\mathcal{C}^*$ — a Wick rotation argument grounded in the Lorentzian structure of stable observer manifolds. We present this as the strongest available structural motivation; a complete formal derivation remains an open problem (Section 7.1). Combined with Gorard's (2020) result that a multiway graph with complex phase weights converges in the continuum limit to complex projective Hilbert space, a single structural postulate (Q': the cause-plex is multiway) suffices to recover the full quantum formalism including interference, the Born rule, and the Schrödinger equation. Entanglement is characterized as correlated branch structure in the joint multiway cause-plex. The framework positions the multiverse as the multiway cause-plex itself, with observer-accessible branches restricted by the selective convergence argument to the stable Lorentzian slice. Remaining open problems are identified precisely.

---

## 1. Introduction

The cause-plex $\mathcal{C} = (E, \prec)$ — a locally finite partially ordered set of causal events — provides a discrete combinatorial substrate from which spacetime, energy, and classical mechanics emerge. Causal ordering yields the time direction; event density, via Malament's theorem and the number-volume conjecture, recovers the Lorentzian metric; Noether's theorem applied to cause-plex symmetries yields conserved quantities. The result, detailed in the companion paper [Cause-Plex and Spacetime], is a classical trajectory: one sequence of events, one history, one deterministic path through state space.

The physical world is not classical. Quantum mechanics exhibits interference between trajectories never realized, probabilistic measurement outcomes, and non-local correlations between entangled systems that no single causal history can explain. The classical cause-plex, by construction a single realized history, cannot account for these phenomena.

The standard resolution, due to Feynman (1948), is the path integral: the transition amplitude between states is a coherent sum over all paths, each weighted by the phase $e^{iS/\hbar}$. Probabilities are squared moduli of these amplitudes. This formulation correctly predicts all quantum phenomena but leaves the origin of the complex weight $e^{iS/\hbar}$ — and in particular the imaginary unit $i$ — as a formal postulate rather than a derived consequence of causal structure.

Wolfram (2020) and Gorard (2020) showed that a multiway rewriting system — a graph containing all possible update sequences simultaneously — naturally produces quantum-mechanical behavior in the continuum limit, provided path weights are taken to be complex phases. Gorard proves rigorously that the multiway graph with such weights converges to complex projective Hilbert space with the Fubini-Study metric, recovering the Schrödinger equation and Born rule. The imaginary unit, however, enters Gorard's framework as an assumed weighting rule, justified by a suggestive analogy to Wick rotation but not formally derived.

The present paper addresses this gap via three convergent arguments (Section 3.2). The first, and the target native derivation, is the **loop-phase argument**: every persistent cause-plex entity is a stable recurring loop, and closed-loop amplitude weights must form a consistent group under path composition. The minimal continuous group is U(1) — complex phases — forced by observed interference. The second is **Sorkin's grade-2 quantum measure** (1994): given Postulate Q' (the cause-plex is multiway), the classical grade-1 probability measure is immediately insufficient, and the minimal consistent generalization forces complex amplitudes. This is currently the strongest citation-backed path. The third is the **Wick rotation argument**: the multiway cause-plex has two separation types with opposite metric signatures, and extending amplitudes between them requires multiplication by $i$. This is corroborating structural motivation rather than an independent derivation. Together, all three arguments point to $w(\gamma) = e^{iS/\hbar}$ as the unique minimal consistent choice. Open Problem 7.1 states what each path requires to close fully.

The paper proceeds as follows. Section 2 defines the multiway cause-plex and branch graph. Section 3 derives the path amplitude and establishes the origin of the imaginary phase. Section 4 treats interference, the Born rule, and the classical limit. Section 5 characterizes entanglement as correlated branch structure. Section 6 develops the multiverse interpretation and its relationship to selective convergence. Section 7 states remaining open problems with honest assessments of their status.

**Main results:**
1. The multiway cause-plex $\mathcal{C}^*$ is a well-defined discrete structure generalizing the classical cause-plex.
2. Three convergent arguments support $w(\gamma) = e^{iS/\hbar}$: the loop-phase group argument (native to cause-plex, target formalization); Sorkin's grade-2 quantum measure (current strongest path, established result); and Wick rotation (corroborating structural motivation). See Section 3.2 and Open Problem 7.1.
3. Given Postulate Q' (the cause-plex is multiway) and Gorard's continuum limit, the full quantum formalism follows.
4. The multiverse is the multiway cause-plex; observer-accessible branches are those in the stable Lorentzian slice.

---

## 2. The Multiway Cause-Plex

Let $\mathcal{C} = (E, \prec)$ denote the classical cause-plex: a locally finite strict partial order of causal events (Definition 1.2, [Cause-Plex and Spacetime]). A single such cause-plex represents one causally consistent history.

**Definition 2.1 (Multiway cause-plex).** Given initial state $\mathcal{S}_0$, the *multiway cause-plex* is

$$\mathcal{C}^*(\mathcal{S}_0) = \{(E_\alpha, \prec_\alpha) : (E_\alpha, \prec_\alpha) \text{ is a locally finite strict partial order consistent with } \mathcal{S}_0\}$$

the collection of all locally finite partial orders consistent with $\mathcal{S}_0$.

**Definition 2.2 (Branch graph).** The *branch graph* $\mathcal{B}$ is the directed graph with node set $\mathcal{C}^*$ and edges

$$\mathcal{C}_\alpha \to \mathcal{C}_\beta \iff |E_\alpha \triangle E_\beta| = 1 \text{ and } \mathcal{C}_\alpha \prec_{\mathcal{B}} \mathcal{C}_\beta$$

Two cause-plexes are adjacent in $\mathcal{B}$ if they differ by a single causal event and the direction of the edge follows the causal ordering between those events.

This structure is directly analogous to Wolfram's multiway graph [Wolfram 2020, Gorard 2020], with the distinction that nodes represent physically grounded causal event structures rather than abstract string configurations.

**Remark 2.3.** The classical cause-plex corresponds to a single node in $\mathcal{C}^*$, or equivalently to a directed path through $\mathcal{B}$. Classical mechanics arises in the coarse-grained limit in which a single dominant path is selected. Quantum mechanics arises when the full structure of $\mathcal{C}^*$ is retained.

**Definition 2.4 (Branchlike separation).** Two cause-plexes $\mathcal{C}_\alpha, \mathcal{C}_\beta \in \mathcal{C}^*$ at the same causal moment (identical causal pasts) are *branchlike separated*. No causal path in $E$ connects them. Branchlike separation is spacelike in character: it is orthogonal to the causal direction.

**Postulate Q' (Multiway structure).** *The physical cause-plex is multiway: all causally consistent histories $\mathcal{C}_\alpha \in \mathcal{C}^*$ coexist simultaneously.*

Postulate Q' is the irreducible quantum input. It asserts that reality is not a single causal history but the full multiway cause-plex. Every interpretation of quantum mechanics encodes an equivalent claim: the wave function describes a superposition of histories (Copenhagen), all branches are real (Everett), or the pilot wave guides a particle through a field encoding all possibilities. Postulate Q' is the minimal structural version, requiring only that $\mathcal{C}^*$ rather than a single $\mathcal{C}_\alpha$ is the fundamental object.

---

## 3. Path Amplitudes and the Origin of the Imaginary Phase

### 3.1 The Path Integral in Cause-Plex Terms

The amplitude for transitioning from $\mathcal{S}_i$ to $\mathcal{S}_f$ is defined as the coherent sum over all causal paths $\gamma$ in $\mathcal{C}^*$ connecting these states:

$$\mathcal{A}(\mathcal{S}_i \to \mathcal{S}_f) = \sum_{\gamma: \mathcal{S}_i \to \mathcal{S}_f} w(\gamma)$$

where $w(\gamma)$ is the path weight, to be determined. This is the discrete analogue of Feynman's path integral [Feynman & Hibbs 1965].

**Definition 3.1 (Cause-plex action).** The action along a causal path $\gamma = (e_1, e_2, \ldots, e_n)$ in $\mathcal{C}^*$ is

$$S[\gamma] = \sum_{k=1}^n \Delta E(e_k) \cdot \tau_{e_k}$$

where $\Delta E(e_k)$ is the energy difference at event $e_k$ (defined where time-translation symmetry holds, i.e. where energy is a well-defined conserved quantity) and $\tau_{e_k}$ is the event latency. In the continuum limit, $S[\gamma] \to \int L\,dt$ where $L = T - V$ is the classical Lagrangian.

### 3.2 The Origin of the Imaginary Phase

The path weight must produce interference — constructive summation along some paths, destructive cancellation along others. Real-valued weights produce only classical probability trees with no cancellation. The question is whether the complex phase weight $w(\gamma) = e^{iS[\gamma]/\hbar}$ is postulated or can be derived from cause-plex structure.

Three convergent arguments address this. The first is native to the cause-plex framework and is the target derivation. The second uses established results from quantum measure theory. The third provides corroborating structural motivation. Together they make a strong case; none individually constitutes a complete formal proof. Open Problem 7.1 states what a closure requires.

---

**Argument 1: Loop-phase consistency (native to the cause-plex — target derivation)**

Every persistent entity in the cause-plex is a stable recurring loop: a pattern of causal events that returns to its initial state (Definition, [Part 1.5: Causors](./01_5_causors.md)). When such a loop completes one cycle, the accumulated amplitude weight $w$ must be *self-consistent*: the weight assigned to a closed causal path must compose consistently with itself and with other loops.

The set of consistent weights for closed loops must therefore form a **group under multiplication** — the amplitude of composing two closed loops must itself be a valid closed-loop amplitude.

What groups are available?

| Weight group | Interference? | QM it produces | Problem |
|---|---|---|---|
| $\{+1\}$ (real positive) | None | Classical probability | No cancellation; can't explain double-slit |
| $\{+1, -1\}$ ($\mathbb{Z}_2$) | Binary (on/off) | Real Hilbert space | Experimentally distinguishable from standard QM; weaker [Aaronson 2004] |
| U(1) (complex unit circle) | Full continuous | Standard complex QM | Minimal continuous group |
| Quaternion unit sphere | Overcomplete | Quaternionic QM | Overdetermines; inconsistent with observed locality [Aaronson 2004] |

**The minimal continuous group consistent with observed interference is U(1).** Weights of the form $w(\gamma) = e^{i\phi(\gamma)}$ — complex phases — are the unique minimal continuous choice. This forces $i$.

**Conjecture 3.2a (Loop-phase closure).** *The requirement that closed-loop amplitude weights in $\mathcal{C}^*$ form a minimal continuous group under path composition forces $w(\gamma) \in \mathrm{U}(1)$, giving $w(\gamma) = e^{iS[\gamma]/\hbar}$.*

This argument is native to the cause-plex framework — it derives $i$ from the loop structure that already grounds the entity taxonomy, rather than importing external machinery. It is a conjecture pending formalization: what needs to be proved is that (a) path composition in $\mathcal{C}^*$ requires the weight group to be continuous, and (b) U(1) is the unique minimal such group (Aaronson's result then applies directly).

> **Plain meaning:** Stable things (particles, atoms, you) are patterns that repeat. When a pattern repeats, its amplitude weight multiplies with itself. For that to stay consistent — never exploding, never collapsing — the weight must sit on the unit circle in the complex plane. The only continuous group of unit-circle weights is U(1) — complex phases. So the imaginary unit isn't a mysterious choice; it's the only consistent option for anything that persists.

---

**Argument 2: Sorkin's grade-2 quantum measure (current best derivation path)**

Sorkin (1994) shows that classical probability theory is the first in a natural hierarchy of sum-rules. The classical (grade-1) rule requires $P(A \cup B) = P(A) + P(B)$ for disjoint events. This is adequate for a single-history cause-plex. But Postulate Q' asserts that the cause-plex is multiway — all histories coexist simultaneously. On a multiway structure, the grade-1 rule immediately fails: the probability of an outcome cannot be computed by summing independent history contributions, because histories interfere.

The *minimal consistent generalization* of probability theory to a multiway structure is the grade-2 quantum measure: a decoherence functional $D(A, B)$ on *pairs* of histories. Requiring:
1. $D(A, A) \geq 0$ (non-negative diagonal — probabilities are non-negative)
2. $D$ is sesquilinear — linear in the second argument, conjugate-linear in the first

forces $D$ to be complex-valued. The Born rule $P(\text{outcome}) = D(A, A) = |\mathcal{A}|^2$ then follows.

**Result (Sorkin 1994).** *Quantum mechanics is the unique grade-2 generalization of classical probability theory. Complex amplitudes are forced by the minimal relaxation of the classical sum-rule consistent with a multiway history structure.*

In cause-plex terms: if Postulate Q' holds and we require a consistent probability theory, the classical grade-1 measure is provably insufficient, and the minimal extension is Sorkin's grade-2 measure — which requires complex amplitudes. The imaginary unit is not freely chosen; it is the minimal structure forced by taking the multiway cause-plex seriously as the fundamental object.

**Remark 3.2b.** This is currently the strongest citation-backed argument. It does not require the branch graph to be a spacetime dimension and does not rely on analogy. Its premise — that we need a consistent probability theory on $\mathcal{C}^*$ — follows directly from Postulate Q'. Sorkin (1994) is peer-reviewed and the result is accepted within the causal set community.

> **Plain meaning:** Classical probability works when there's one timeline. Quantum mechanics needs multiple timelines existing at once. When you try to do probability theory over many coexisting histories, the simplest rule that works requires complex numbers — not as a choice, but as a mathematical necessity. This was proved by Sorkin in 1994 and is the cleanest route to understanding why quantum mechanics looks the way it does.

---

**Argument 3: Wick rotation from signature (corroborating structural motivation)**

The cause-plex in Lorentzian signature $(-,+,+,+)$ has the causal direction carrying signature $(-)$. The branchlike direction — separating distinct histories — carries signature $(+)$, orthogonal to the causal direction. The consistent extension of an amplitude accumulated in the timelike $(-)$ direction to the branchlike $(+)$ direction is a Wick rotation $t \to it$, mapping $e^{-S_E/\hbar}$ (Euclidean, real) to $e^{iS/\hbar}$ (Lorentzian, complex).

This is corroborating structural motivation, not an independent derivation. The argument is incomplete because the branch graph $\mathcal{B}$ is a meta-level graph over histories, and it is not established that the spacetime metric extends to $\mathcal{B}$ in the way required for Wick rotation to be forced rather than merely natural. See Open Problem 7.1 for the precise gap. This argument parallels Gorard [2020, §3].

> **Plain meaning:** In our universe, time has a minus sign in the geometry and space has plus signs — the Lorentzian signature. When you move from "what's physically real" to "what's a quantum superposition," you're crossing between those two signatures. That crossing is exactly a multiplication by $i$. So the imaginary unit encodes the geometry of our spacetime — it's the bridge between the causal direction (time) and the branch direction (quantum superposition).

---

**Summary.** Three arguments converge on $w(\gamma) = e^{iS[\gamma]/\hbar}$:

| Argument | Source | Status | What it shows |
|---|---|---|---|
| Loop-phase group | Cause-plex native | Conjecture 3.2a — needs formalization | $i$ forced by minimal continuous group on closed loop amplitudes |
| Sorkin grade-2 | Sorkin (1994), peer-reviewed | Strong — applies directly given Q' | $i$ forced by minimal probability theory on multiway structure |
| Wick rotation | Gorard (2020), structural analogy | Corroborating — incomplete as derivation | $i$ consistent with Lorentzian signature mismatch |

The current basis for the paper rests on Arguments 2 and 3 together, with Argument 1 as the target native formalization. No single argument is yet a complete proof; all three pointing in the same direction is significant evidence.

**Corollary 3.4 (Selective convergence).** Observers capable of performing quantum measurements exist only in cause-plexes with Lorentzian signature $(-,+,+,+)$ (spacetime companion paper, Section 8.5). The Wick rotation and hence the complex path weight $e^{iS/\hbar}$ is therefore the unique description available to any observer. Quantum mechanics with complex amplitudes is not contingent on a choice of framework — it is the description forced upon any observer by the signature structure of the stable manifolds they inhabit.

### 3.3 Planck's Constant

$\hbar = 1.054 \times 10^{-34}$ J·s is the quantum of action — the minimum action per causal event. Dimensionally, $\hbar$ has units of energy $\times$ time, which in cause-plex terms is $\Delta E_{\min} \cdot \tau_{\min}$: the product of the minimum energy exchange and the minimum event latency. Both follow from local finiteness of the cause-plex.

**Note on $\hbar$.** The quantum of action $\hbar = \Delta E_{\min} \cdot \tau_{\min}$ is non-circular when $\tau_{\min}$ is defined as $1/|\mathcal{C}_{\text{ref}}|$ (one event per reference clock period) rather than as the Planck time. See Proposition 6.2 and §6.3 of the loop-phase companion paper.

---

## 4. Interference, the Born Rule, and the Classical Limit

### 4.1 Constructive and Destructive Interference

When many causal paths in $\mathcal{C}^*$ converge on $\mathcal{S}_f$ with aligned phases, their amplitudes reinforce:

$$|\mathcal{A}(\mathcal{S}_i \to \mathcal{S}_f)|^2 \propto N_{\text{paths}}^2 \quad \text{(coherent)}$$

When paths arrive with phases differing by $\pi$, they cancel:

$$\mathcal{A} = \sum_\gamma e^{iS[\gamma]/\hbar} \approx 0 \quad \text{(destructive)}$$

The classical trajectory corresponds to the region of maximum phase coherence — paths near the stationary-action condition $\delta S = 0$ have nearly identical phases and reinforce maximally. This is the cause-plex interpretation of the correspondence principle.

**Example 4.1 (Double slit).** Two causal paths exist from source to screen — one through each slit. At screen positions where path lengths differ by half a wavelength, the phase difference is $\pi$, giving $\mathcal{A} \approx 0$. The cause-plex has routes to those positions; the multiway sum is zero because the routes destructively interfere. The paths are not forbidden — they are present in $\mathcal{C}^*$ but contribute amplitudes that cancel.

### 4.2 The Born Rule

**Theorem 4.2 (Born rule, conditional on Gorard 2020).** *If the multiway cause-plex with path weights $e^{iS/\hbar}$ converges in the continuum limit to complex projective Hilbert space $\mathbb{CP}^N$ with the Fubini-Study metric, then the unique consistent probability measure is*

$$P(\mathcal{S}_f) = |\mathcal{A}(\mathcal{S}_i \to \mathcal{S}_f)|^2$$

*Proof:* On $\mathbb{CP}^N$ equipped with the Fubini-Study metric, by Gleason's theorem [Gleason 1957], the Born rule is the unique consistent probability measure. $\square$

**Note on Gorard (2020).** The convergence of the multiway graph to $\mathbb{CP}^N$ with Fubini-Study metric is established in Gorard (2020, §4–5), published in *Complex Systems* (Wolfram Institute). This result has not yet been independently verified in the mainstream quantum gravity or mathematical physics literature. Theorem 4.2 is therefore conditional on Gorard's convergence claim. An independent derivation via Sorkin's discrete path measure (Conjecture 7.2) would remove this dependency.

**Interpretation.** $P(\mathcal{S}_f)$ is the squared density of causally convergent paths to the outcome after phase cancellation. High-probability outcomes correspond to regions of $\mathcal{C}^*$ where many branches converge coherently; low-probability outcomes correspond to sparse or canceling convergence.

### 4.3 The Classical Limit

Classical mechanics is recovered when the classical action satisfies $S \gg \hbar$. In this regime, the phase $e^{iS/\hbar}$ oscillates extremely rapidly for any deviation from the stationary path. Off-shell contributions cancel by destructive interference, leaving only the contribution from paths near $\delta S = 0$. The multiway cause-plex collapses effectively to a single dominant history — the classical trajectory.

**Decoherence.** For a system $E$ strongly coupled to an environment $\mathcal{C}_{\text{env}}$, environmental causal events continuously interact with $E$'s state domain, selecting specific branches of $\mathcal{C}^*_E$ at a rate given by the decoherence time $\tau_D$. For macroscopic objects, $\tau_D$ is so short relative to the system's dynamical timescales that quantum superposition is eliminated before observation. The multiway structure remains present but is operationally classical [Zurek 2003].

---

## 5. Entanglement as Correlated Branch Structure

**Definition 5.1 (Causal entanglement).** Entities $A$ and $B$ are *causally entangled* if their cause-plexes share a common ancestor event $e_0 \in E$ with

$$D_{\text{out}}(e_0) \cap D(A) \neq \emptyset \quad \text{and} \quad D_{\text{out}}(e_0) \cap D(B) \neq \emptyset$$

where $D_{\text{out}}(e_0)$ is the output state domain of $e_0$ and $D(X)$ is the state domain of $X$.

**Remark 5.2.** $e_0$ wrote to the state domains of both $A$ and $B$ simultaneously, creating correlations in their joint cause-plex that persist across spacelike separation. In the multiway cause-plex, $A$ and $B$ share branch points: their causal histories are not independent, and their joint multiway structure $\mathcal{C}^*_{AB}$ does not factorize as $\mathcal{C}^*_A \times \mathcal{C}^*_B$.

**Proposition 5.3.** *Entities $A$ and $B$ are separable if and only if* $\mathcal{C}^*_{AB} = \mathcal{C}^*_A \times \mathcal{C}^*_B$.

*Proof sketch.* Separability requires that measurement of $A$ places no constraint on $B$'s branch structure. This holds precisely when the branch graphs of $A$ and $B$ have no shared nodes — i.e., when $\mathcal{C}^*_{AB}$ factorizes. $\square$

**Non-locality without non-local causation.** When $A$ is measured, a branch of $\mathcal{C}^*$ is selected. Since $B$'s branch structure shares nodes with $A$'s, selecting $A$'s branch simultaneously constrains $B$'s accessible branches — without any direct causal event crossing the spacelike separation between them. The correlation is in the shared branch structure arising from $e_0$, not in any direct causal influence.

This is consistent with Bell's theorem [Bell 1964]: no local hidden variable theory can reproduce quantum correlations. In the cause-plex framework, the correlations are not encoded in local hidden state variables but in the non-local shared branch structure of $\mathcal{C}^*_{AB}$. The entanglement entropy

$$S(A) = -\mathrm{Tr}(\rho_A \log \rho_A)$$

measures the density of shared branch points between $A$ and $B$ in $\mathcal{C}^*_{AB}$.

---

## 6. The Multiverse: Causes, Branches, and Selective Convergence

The multiway cause-plex is the multiverse — defined precisely, not metaphorically.

**Causal and branchlike directions.** Causal events propagate in the timelike direction (signature $-$): one event follows from another along $\prec$. Branches are separated in the orthogonal branchlike direction (signature $+$): two cause-plexes at the same causal moment are connected by no causal path, analogous to spacelike separation in ordinary spacetime.

| Object | Physical meaning |
|---|---|
| Each $\mathcal{C}_\alpha \in \mathcal{C}^*$ | One universe — one complete causally consistent history |
| Branch graph $\mathcal{B}$ | The full multiverse and its inter-universe relationships |
| Branchlike separation $d(\mathcal{C}_\alpha, \mathcal{C}_\beta)$ | "Distance" between universes in units of single-event differences |
| Amplitude $\mathcal{A}(\mathcal{S}_i \to \mathcal{S}_f)$ | Coherent sum over all branches of $\mathcal{C}^*$ reaching $\mathcal{S}_f$ |
| Probability $\|\mathcal{A}\|^2$ | Branch convergence density to the outcome, squared |

The Wick rotation ($i$) is the signature of crossing between the branch dimension and the causal dimension — between universes and within one. Quantum mechanics is the description a causal observer inside one branch obtains by accounting for all others.

**Selective convergence.** Not all branches in $\mathcal{C}^*$ support observers. The spacetime companion paper (Section 8.5) establishes that entities with $\rho_{\text{ac}} > 0$ and cause-plex index $\mathrm{CI} > \mathrm{CI}_{\min}$ — observer-class entities — require Lorentzian signature $(-,+,+,+)$ and stable bond structures. Branches on unstable manifolds (wrong signature, unstable covalent bonds from Tangherlini's result) do not support such entities.

The observer-accessible multiverse is therefore not all of $\mathcal{C}^*$ but the stable slice: those branches with Lorentzian signature and sufficient bond stability. This is strictly stronger than Everett's many-worlds (all branches equally real, no observer constraint) and strictly stronger than Wolfram's singular convergence (only one physics possible). The cause-plex position is selective convergence: the multiverse is real and full; the observer-accessible portion is the narrow stable slice where the Lorentzian signature forces the complex amplitudes that constitute quantum mechanics.

---

## 7. Open Problems

### Open Problem 7.1 (Formal closure of the imaginary phase)

Three convergent arguments support $w(\gamma) = e^{iS/\hbar}$ (Section 3.2). None is yet a complete proof. This problem has two parts:

**Part A: Formalize Conjecture 3.2a (loop-phase closure).**
Show that path composition in $\mathcal{C}^*$ requires the closed-loop amplitude weight group to be continuous, and that U(1) is the unique minimal continuous group satisfying this. Given these, Aaronson (2004) shows that quaternionic QM fails the tensor product dimension formula and that complex numbers are the minimal consistent choice given local tomography and composition — confirming $\mathbb{C}$ as the right field. This is the native cause-plex route and the preferred target.

**Part B: Ground the Wick rotation argument.**
Show that the branch graph $\mathcal{B}$ carries a well-defined metric consistent with the spacetime metric of its constituent histories, with signature $(+)$ in the branchlike direction. Then show that the amplitude consistency condition forces Wick rotation. This closes the gap in Argument 3 (Section 3.2).

**Current strongest path (no new work required):** Sorkin (1994) already establishes that quantum mechanics is the unique grade-2 probability theory on a multiway history structure (Argument 2, Section 3.2). Given Postulate Q', this directly forces complex amplitudes. Part A and Part B are the deeper, cause-plex-native routes worth developing.

**Status:** Part A — Conjecture (target formalization). Part B — Open. Sorkin path — Closeable with established results.

The full mathematical program for Part A is developed in the companion paper [Complex Amplitudes from Loop-Phase Consistency](./causeplex_loop_phase.md). Lemma 4.3 there (observer-class cause-plexes are causally simply-connected) is formally proved by a three-step density argument. The Critical-Events Rerouting Lemma (formerly Open Problem 7.3) is proved in [causeplex_loop_phase_step3_lemma.md](./causeplex_loop_phase_step3_lemma.md) via three sub-lemmas (L1: CSS guarantees intermediate events; L2: incorporate via history transitions; L3: perform the replacement). Theorem 5.2 (U(1) is the unique amplitude group) is fully proved. The phase-action identification $\phi = S/\hbar$ is established as Proposition 6.2 (a Layer C definitional identification — not a derivation from Layer 0, but a naming of the U(1) phase in Layer C vocabulary). $\hbar$ is identified non-circularly as $\Delta E_{\min}/|\mathcal{C}_{\text{ref}}|$ — the minimum energy per event divided by the reference clock event count. The full result $w(\gamma) = e^{iS[\gamma]/\hbar}$ is complete.

References: Sorkin (1994), Aaronson (2004), Barcelo et al. (2001, 2006), Halliwell & Yearsley (2012).

---

### Conjecture 7.2 (Born rule from path measure)

Given Postulate Q' and the continuum limit of Gorard (2020), the Born rule $P = |\mathcal{A}|^2$ holds on the resulting Hilbert space by Gleason's theorem. Formalizing the path measure on $\mathcal{C}^*$ in the framework of Sorkin's causal set path integral [Sorkin 1994] would provide a fully discrete derivation without appeal to the continuum limit.

**Status:** Closeable. References: Sorkin (1994), Halliwell & Yearsley (2012).

---

### ~~Open Problem 7.3~~ ($\hbar$ as derived quantity) — Resolved

The circularity in the earlier formulation ($\tau_{\min} \approx t_{\text{Planck}} = \sqrt{\hbar G/c^5}$, which uses $\hbar$ to define $\tau_{\min}$) is dissolved by using the event-count definition of time from the spacetime companion paper (Definition 3.2):

$$\tau_{\min} = \frac{1}{|\mathcal{C}_{\text{ref}}|} \quad \Rightarrow \quad \hbar = \frac{\Delta E_{\min}}{|\mathcal{C}_{\text{ref}}|}$$

$\tau_{\min}$ is the minimum time step in units of reference oscillation cycles — a normalization constant, not a Planck-scale quantity. It has no reference to $\hbar$. The quantum of action $\hbar$ is then the ratio of minimum energy per causal event to the reference clock frequency — empirically fixed, structurally identified. See §6.3 of [Complex Amplitudes from Loop-Phase Consistency](./causeplex_loop_phase.md) for the full derivation.

**Status: Closed.**

---

### Open Problem 7.4 (Quantum field theory)

Single-particle quantum mechanics follows from the multiway cause-plex with fixed state domain cardinality. Quantum field theory requires variable particle number: events that create or annihilate state domain variables. Renormalization corresponds to coarse-graining cause-plex events below the observer's resolution scale.

**Status:** Research direction. Not yet formulated precisely within the cause-plex framework.

---

### Open Problem 7.5 (Measurement and preferred basis)

Decoherence from environmental coupling (Section 4.3) is consistent with Everett's interpretation [Everett 1957]: no collapse, only branch weighting. The preferred basis problem — which observable is selected as the pointer basis by decoherence — has known solutions in standard quantum mechanics via einselection [Zurek 2003]. The cause-plex version requires characterizing which branch decompositions of $\mathcal{C}^*$ are preferred by environmental coupling structure.

**Status:** Open; consistent with standard decoherence theory but not yet spelled out in cause-plex terms.

---

## References

- Bell, J.S. (1964). On the Einstein-Podolsky-Rosen paradox. *Physics*, 1(3), 195–200.
- Bombelli, L., Lee, J., Meyer, D., & Sorkin, R.D. (1987). Space-time as a causal set. *Physical Review Letters*, 59(5), 521–524. DOI: 10.1103/PhysRevLett.59.521
- Everett, H. (1957). Relative state formulation of quantum mechanics. *Reviews of Modern Physics*, 29(3), 454–462. DOI: 10.1103/RevModPhys.29.454
- Feynman, R.P. & Hibbs, A.R. (1965). *Quantum Mechanics and Path Integrals*. McGraw-Hill.
- Gleason, A.M. (1957). Measures on the closed subspaces of a Hilbert space. *Journal of Mathematics and Mechanics*, 6(6), 885–893.
- Gorard, J. (2020). Some quantum mechanical properties of the Wolfram model. *Complex Systems*, 29(2), 537–598. DOI: 10.25088/ComplexSystems.29.2.537
- Halliwell, J.J. & Yearsley, J.M. (2012). Amplitudes for spacetime regions and the quantum Zeno effect: pitfalls of standard path integrals. *Physical Review D*, 86(2), 024016. DOI: 10.1103/PhysRevD.86.024016
- Malament, D.B. (1977). The class of continuous timelike curves determines the topology of spacetime. *Journal of Mathematical Physics*, 18(7), 1399–1404. DOI: 10.1063/1.523436
- Sorkin, R.D. (1994). Quantum mechanics as quantum measure theory. *Modern Physics Letters A*, 9(33), 3119–3127. DOI: 10.1142/S021773239400294X
- Tegmark, M. (1997). On the dimensionality of spacetime. *Classical and Quantum Gravity*, 14(4), L69–L75. DOI: 10.1088/0264-9381/14/4/002
- Wolfram, S. (2020). A class of models with the potential to represent fundamental physics. *Complex Systems*, 29(2), 107–536. DOI: 10.25088/ComplexSystems.29.2.107
- Zurek, W.H. (2003). Decoherence, einselection, and the quantum origins of the classical. *Reviews of Modern Physics*, 75(3), 715–775. DOI: 10.1103/RevModPhys.75.715
- Aaronson, S. (2004). Is quantum mechanics an island in theoryspace? *arXiv:quant-ph/0401062*.

---

---

## Conclusion

**What this paper showed, in plain English:**

Classical physics gives you one history. But the physical world isn't classical — particles interfere with themselves, measurements have probabilistic outcomes, and entangled particles are correlated across arbitrary distances. None of that fits a single causal history.

This paper takes one structural step: instead of one history, consider all possible causal histories simultaneously (the multiway cause-plex). From that single move, everything quantum mechanical follows:

- **Interference** — paths to the same outcome can reinforce or cancel, because you're summing over all of them
- **The imaginary unit $i$** — the path weights must be complex phases ($e^{iS/\hbar}$), not real numbers, because real weights can't produce cancellation. Three independent arguments converge on this: loop-phase consistency, Sorkin's quantum measure theory, and the Wick rotation from causal to branchlike direction. The standalone derivation is in the [Amplitude Fixed-Point paper](./amplitude-phase-fixed-point-paper.md).
- **The Born rule** ($P = |\mathcal{A}|^2$) — follows from Gleason's theorem once the multiway structure converges to Hilbert space (Gorard 2020)
- **Entanglement** — not mysterious action at a distance; just two systems that share a common ancestor event, so their causal histories have correlated branch structure

**What remains open:** The Born rule derivation is conditional on Gorard's (2020) convergence result, which has not yet been independently peer-reviewed. The preferred-basis problem (why decoherence picks specific measurement outcomes) is consistent with standard decoherence theory but not yet spelled out in cause-plex terms.

**The multiverse:** The multiway cause-plex *is* the multiverse — defined precisely, not metaphorically. Observer-accessible branches are the stable Lorentzian slice: branches where atoms are stable, chemistry works, and complex structures can form. Quantum mechanics with complex amplitudes is the description forced on any observer by the structure of the branches they can inhabit.

---

*[Part 1.5: Causors](./01_5_causors.md) | [Cause-Plex and Spacetime](./causeplex_spacetime.md)*
