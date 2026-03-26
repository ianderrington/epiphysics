---
title: "Complex Amplitudes from Loop-Phase Consistency in the Multiway Cause-Plex"
description: >-
  Consolidated single-document version combining the main loop-phase paper,
  Step 3 rerouting lemma details, and proof-attempt counterexample analysis;
  all theorem statuses are explicitly labeled as Proved, Conditional, or Conjecture.
date: 2026-03-25T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
series: "Epimechanics"
tags:
  - Epimechanics
  - Quantum mechanics
  - Foundations
  - Loop topology
  - Complex amplitudes
  - Causal structure
  - Path integral
---

## Abstract

We analyze when loop amplitudes in the multiway cause-plex must take the form $e^{i\phi}$. The result is split into three parts: (i) stability of iterated loops forces $|w|=1$; (ii) causal continuity plus loop-space connectivity forces connected image in the unit sphere; (iii) division-algebra minimality plus local tomography constraints select $\mathbb{C}$ and hence $\mathrm{U}(1)$. We include the full Step 3 rerouting argument inside this document and incorporate counterexample analysis: full unconstrained loop-space connectedness is false in general (causal-void annulus), while the restricted CSS theorem is the physically relevant statement.

Status labels used throughout are exactly:
- ✅ **Proved**
- ⚠️ **Conditional** (proved under a named explicit assumption)
- ❌ **Conjecture**

---

## 1. Introduction

Standard path-integral quantum mechanics uses $e^{iS/\hbar}$ as a postulate. This paper asks which amplitude group is forced by loop structure in a multiway causal substrate.

We keep a strict distinction:
- Layer 0 structural claim: $w(\gamma)\in\mathrm{U}(1)$
- Layer C physical naming claim: $\phi(\gamma)=S[\gamma]/\hbar$

---

## 2. Definitions and Setup

**Definition 2.1 (Causal event).** A causal event (*state couplet*) $e$ is an ordered pair $(\mathcal{S}_{\mathrm{in}}, \mathcal{S}_{\mathrm{out}})$ where $\mathcal{S}_{\mathrm{out}}$ is determined by $\mathcal{S}_{\mathrm{in}}$. No physical content is assumed.

**Definition 2.2 (Cause-plex).** The cause-plex $\mathcal{C} = (E, \prec)$ is a locally finite strict partial order.

**Definition 2.3 (Multiway cause-plex).**
$$\mathcal{C}^*(\mathcal{S}_0) = \{(E_\alpha, \prec_\alpha) : \text{locally finite strict partial order consistent with } \mathcal{S}_0\}$$

**Definition 2.4 (Branch graph).** The branch graph $\mathcal{B}$ connects adjacent histories differing by one covering-relation change.

**Definition 2.5 (Causal loop).**
$$\gamma = (e_0 \prec e_1 \prec \cdots \prec e_n = e_0')$$
with $e_0'$ in the same local state as $e_0$.

**Definition 2.6 (Loop space).** $\Omega(\mathcal{C}^*, e_*)$ is the set of all based closed loops.

**Definition 2.7 (Loop concatenation).** $\gamma_1\cdot\gamma_2$ is traversal of $\gamma_1$ then $\gamma_2$.

**Definition 2.8 (Amplitude assignment).**
$$w: \Omega(\mathcal{C}^*, e_*) \to G,\quad w(\gamma_1 \cdot \gamma_2)=w(\gamma_1)\cdot w(\gamma_2).$$

**Definition 2.9 (Probability measure).**
$$P(\mathcal{S}_f) = \left|\sum_{\gamma: e_* \to \mathcal{S}_f} w(\gamma)\right|^2 \cdot \mu$$
with $P\ge 0$ and $\sum_f P=1$.

**Definition 2.10 (Auto-causal density $\rho_{\mathrm{ac}}$).** Density of stable recurring loops with $|w(\gamma)|=1$.

---

## 3. Part 1: Stability Forces $|w| = 1$

**Proposition 3.1 — ✅ Proved.** If loops iterate stably, then $|w(\gamma)|=1$.

**Proof.**
$$w(\gamma^n)=w(\gamma)^n.$$
If $|w(\gamma)|>1$, amplitudes diverge; if $|w(\gamma)|<1$, they collapse to zero. Either contradicts stable persistence. Hence $|w(\gamma)|=1$. $\square$

**Corollary 3.2 — ✅ Proved.** Image of $w$ lies in the unit sphere $G_1$.

---

## 4. Part 2: Causal Continuity and Loop-Space Connectivity

### 4.1 Single-event deformation

Single-event deformation changes one loop event across an adjacent history while preserving loop closure.

### 4.2 Causal continuity

**Postulate CC.**
$$|w(\gamma') - w(\gamma)| \leq C \cdot d(\gamma, \gamma').$$

This remains an explicit postulate.

### 4.3 Causal simple-connectedness and Theorem 4.4

**Definition 4.2 (CSS).** No event-free bounded causal void induces non-contractible loop sectors at the relevant scale.

**Lemma 4.3 — ⚠️ Conditional (Assumption A\_dens).**
Observer-class cause-plexes with $\rho_{\mathrm{ac}}>0$ are CSS at scales $\ell\ge \ell_{\mathrm{ac}}$, **assuming**:

**Assumption A\_dens (event-density bridge).** Positive auto-causal density implies non-empty interior event support in every bounded loop-enclosed region at scales $\ell\ge \ell_{\mathrm{ac}}$.

Under A\_dens, the standard three-step argument gives CSS. $\square$

---

**Lemma 4.3a (A\_dens characterization) — ⚠️ Conditional (Homogeneity condition H).**

*Statement.* Let $\mathcal{C}^*$ be an observer-class cause-plex with $\rho_{\mathrm{ac}} > 0$. Suppose:

**Condition H (Observer-class spatial homogeneity).** Positive auto-causal density is spatially uniform at scales $\ell \ge \ell_{\mathrm{ac}}$: for every bounded region $\mathcal{V}$ with diameter $\ge \ell_{\mathrm{ac}}$, $\rho_{\mathrm{ac}}$ restricted to $\mathcal{V}$ is positive.

Under Condition H, every bounded loop-enclosed region at scales $\ge \ell_{\mathrm{ac}}$ contains at least one causal event, establishing A\_dens.

*Proof sketch.* Let $\mathcal{V}$ be a bounded loop-enclosed region with diameter $\ge \ell_{\mathrm{ac}}$. By Condition H, $\rho_{\mathrm{ac}}|_\mathcal{V} > 0$, so at least one stable recurring loop has support in $\mathcal{V}$. By Definition 2.10 and Definition 2.1, such a loop consists of causal events (state couplets). Hence $\mathcal{V}$ contains at least one causal event. $\square$

*Assessment.* The proposed derivation of A\_dens from $\rho_{\mathrm{ac}} > 0$ alone — via Definition 2.1 + CD — contains a gap. The CD axiom constrains causally related events but does not enforce event distribution across regions spacelike-separated from active loops. Global density $> 0$ does not imply local support everywhere. Condition H makes this bridge explicit. It is physically motivated (translation invariance / cosmological principle in observer-class regimes) but is an additional condition, not a consequence of existing primitives.

**Lemma 4.3b (A\_rich characterization) — ⚠️ Conditional (Definition 2.3 + consistency condition C).**

*Statement.* Let $\mathcal{C}^*$ be a cause-plex with $\rho_{\mathrm{ac}} > 0$ and let $(a,b)$ be a covering relation in some $\mathcal{C}_\alpha \in \mathcal{C}^*$. Suppose $c$ is an event with $a \prec c \prec b$ in some history $\mathcal{C}_\delta \in \mathcal{C}^*$ (guaranteed by CSS / Lemma L1). Suppose further:

**Condition C ($\mathcal{S}_0$-consistency of local insertion).** Adding $c$ with relations $(a,c)$ and $(c,b)$ to $\mathcal{C}_\alpha$ produces a locally finite strict partial order consistent with $\mathcal{S}_0$. Equivalently: $c \not\prec_\alpha a$ (no reverse order) and the insertion does not violate any global constraint from the initial state.

Under Condition C, A\_rich holds: there exists a finite adjacent-history sequence in $\mathcal{B}$ realizing the local insertion.

*Proof.* Construct the sequence explicitly:

**Step 1.** Form $\mathcal{C}^{(1)}$ by adding covering relation $(a, c)$ to $\mathcal{C}_\alpha$. Since $c$ is new to $\mathcal{C}_\alpha$ (or lacks this order relation), $c \not\prec_\alpha a$, so no cycle is created; the resulting structure is a locally finite strict partial order. By Definition 2.3, $\mathcal{C}^{(1)} \in \mathcal{C}^*$. By Definition 2.4, $\mathcal{C}_\alpha$ and $\mathcal{C}^{(1)}$ are adjacent in $\mathcal{B}$ (differ by one covering relation). Existing loop validity is preserved by Lemma R (monotonicity).

**Step 2.** Form $\mathcal{C}^{(2)}$ by adding covering relation $(c, b)$ to $\mathcal{C}^{(1)}$. Acyclicity check: suppose $b \prec_{\mathcal{C}^{(1)}} c$; then since $a \prec c$ (from Step 1) we get $a \prec c \prec^+ b \prec c$, contradicting strict partial order. So $b \not\prec_{\mathcal{C}^{(1)}} c$; the addition is valid. By Definition 2.3, $\mathcal{C}^{(2)} \in \mathcal{C}^*$; by Definition 2.4, adjacent to $\mathcal{C}^{(1)}$. In $\mathcal{C}^{(2)}$, the relation $a \prec c \prec b$ holds, and the original covering $(a,b)$ is no longer a covering (since $c$ is now strictly between them).

The two-step sequence $\mathcal{C}_\alpha \to \mathcal{C}^{(1)} \to \mathcal{C}^{(2)}$ realises the local insertion via adjacent-history moves in $\mathcal{B}$, establishing A\_rich under Condition C. $\square$

*Assessment.* The proposed derivation of A\_rich from Definition 2.3 alone is substantially correct but requires Condition C to close. For observer-class cause-plexes with $\rho_{\mathrm{ac}} > 0$, Condition C is physically well-motivated: the active local structure that generates stable loops near $(a,b)$ implies that local event insertions do not violate $\mathcal{S}_0$-consistency. The key improvement over the current paper state is that A\_rich is no longer opaque — it has an explicit two-step construction, and the only remaining condition (C) is precisely named. This is a genuine reduction in assumption complexity: from "it exists somehow" to "it follows from these two definitions plus this one named consistency condition."

---

**Theorem 4.4 (Restricted loop-space connectivity for CSS cause-plexes) — ⚠️ Conditional (H + C).**
If $\mathcal{C}^*$ is CSS, then $\Omega(\mathcal{C}^*, e_*)$ is connected under single-event deformations, **assuming**:

- **A\_dens** (above), and
- **A\_rich (multiway richness realizability):** whenever a compatible intermediate event is required by a local reroute, there exists an adjacent-history realization sequence in $\mathcal{C}^*$ preserving strict partial-order consistency with $\mathcal{S}_0$.

#### 4.3.1 Step 1: History-space connectivity — ✅ Proved
For finite comparable histories, Hasse-diagram relation edits connect any two histories by finite adjacent moves.

#### 4.3.2 Step 2: Loop tracking under non-critical edits — ✅ Proved
If edited segment is non-critical, closure persists.

#### 4.3.3 Step 3: Critical-events rerouting (flattened)

**Lemma L1 (intermediate event exists) — ⚠️ Conditional (H + C).**
Given covering relation $(a,b)$ used critically in a loop, there exists $c$ and history $\mathcal{C}_\delta$ with
$$a \prec_\delta c \prec_\delta b.$$

**Lemma L2 (incorporation of $c$ via adjacent transitions) — ⚠️ Conditional (C).**
There is a finite sequence of single-relation additions yielding a history where $a\prec c\prec b$, preserving prior loop validity (monotonicity under relation addition).

**Lemma R (monotonicity) — ✅ Proved.**
Adding a covering relation and reclosing transitively never removes existing order pairs; thus existing loop steps remain valid.

**Lemma L3 (replacement/reroute) — ⚠️ Conditional (C).**
In the enriched history, replace critical segment through one of two cases:

- Case 1 direct: $c\prec e_{k+1}$, immediate single-event replacement.
- Case 2 extension: add $(c,e_{k+1})$ in an adjacent history if cycle-free; global consistency checked by irreflexivity contradiction.

If $e_{k+1}\prec^* c$ then with $c\prec b\prec e_{k+1}$ one gets $c\prec^* c$, impossible in strict partial order.

**General case (multiple critical events) — ⚠️ Conditional (C).**
Sequential rerouting terminates in locally finite posets (Noetherian descent on interval complexity).

Hence Step 3 is established under A\_rich, completing Theorem 4.4 under stated assumptions. $\square$

---

**Proposition 4.5 — ✅ Proved.** Non-critical deformations preserve closure.

**Proposition 4.6 — ⚠️ Conditional (Theorem 4.4 + CC).** Image $w(\Omega)$ is connected in $G_1$.

**Corollary 4.7 — ⚠️ Conditional.** $w(\Omega)$ generates a connected subgroup of $G_1$.

---

## 5. Part 3: Minimality Forces $G = \mathrm{U}(1)$

### 5.1 Algebraic candidates

By Hurwitz: $\mathbb{R},\mathbb{C},\mathbb{H},\mathbb{O}$.

### 5.2 Elimination

- $\mathbb{O}$ excluded (unit sphere not associative group for required composition structure).
- $\mathbb{R}$ excluded by disconnected $S^0$ once connected-image condition holds.
- $\mathbb{H}$ excluded by local tomography/tensor-product constraints (Baez 2012) with experimental support against real alternatives (Renou et al. 2021).

**Theorem 5.2 (Main structural theorem) — ⚠️ Conditional (CC + H + C + locality/tomography premises).**
Then
$$w(\gamma)=e^{i\phi(\gamma)},\quad \phi: \Omega(\mathcal{C}^*,e_*)\to\mathbb{R}.$$

Proof chain: Proposition 3.1 + Section 4 connectivity + elimination above. $\square$

---

## 6. From $\mathrm{U}(1)$ to $e^{iS/\hbar}$

### 6.1 Layer separation

Layer 0: $w\in\mathrm{U}(1)$.
Layer C: identify phase with action ratio.

### 6.2 Additivity

**Proposition 6.1 — ✅ Proved.**
$$\phi(\gamma_1\cdot\gamma_2)=\phi(\gamma_1)+\phi(\gamma_2)\pmod{2\pi}.$$

### 6.3 Action identification

$$S[\gamma] = \sum_{k=1}^n \Delta E(e_k) \cdot \tau_{e_k}, \qquad \phi(\gamma)=\frac{S[\gamma]}{\hbar}.$$

### 6.4 Identification statement

**Identification 6.2 — ⚠️ Conditional (Layer C structure assumptions).**
At Layer C (time-translation symmetry + Noether energy definitions in force),
$$\phi(\gamma) = \frac{S[\gamma]}{\hbar}, \quad \hbar = \Delta E_{\min}\cdot\tau_{\min} = \frac{\Delta E_{\min}}{|\mathcal{C}_{\text{ref}}|}.$$
This is a naming/bridge step, not a standalone microscopic derivation of specific system Lagrangians.

---

## 7. Open Problems

### 7.1 A\_dens formalization gap

Precisely formalize the bridge from $\rho_{\mathrm{ac}}>0$ to interior-event guarantees at all loop-relevant scales.

### 7.2 A\_rich realizability gap

Formalize necessary/sufficient compatibility conditions under which local intermediate insertions are always realizable in adjacent-history chains.

### 7.3 Loop-reroute complexity bound

Give explicit upper bounds on deformation length for eliminating $m$ critical events.

### 7.4 Layer-C predictive closure

Derive concrete Lagrangian sectors from cause-plex microstructure to turn structural phase results into parameterized predictions.

---

## 8. Discussion

### 8.1 Status table (honest labels)

| Claim | Status |
|---|---|
| Stable loop amplitudes have unit magnitude | ✅ **Proved** |
| History space connected under single-relation edits | ✅ **Proved** |
| Full unrestricted loop-space connectedness | ❌ **Conjecture** (counterexample exists) |
| Counterexample via causal void / annulus obstruction | ✅ **Proved** |
| Observer-class $\Rightarrow$ CSS | ⚠️ **Conditional** (Homogeneity condition H; see Lemma 4.3a) |
| CSS loop-space connectivity (Theorem 4.4 restricted) | ⚠️ **Conditional** (H + consistency condition C; see Lemmas 4.3a–4.3b) |
| Connected image subgroup from CC + connectivity | ⚠️ **Conditional** |
| $\mathbb{R}$ elimination | ⚠️ **Conditional** (connectivity premises) |
| $\mathbb{H}$ elimination (tomography/tensor constraints) | ⚠️ **Conditional** (locality/tomography mapping) |
| $G=\mathrm{U}(1)$ | ⚠️ **Conditional** (Theorem 5.2 premises) |
| $\phi=S/\hbar$ Layer C identification | ⚠️ **Conditional** |

### 8.2 Interpretation

The structural core remains strong: with continuity + connectivity + composition + locality/tomography constraints, U(1) is forced. But this document now explicitly separates what is proved outright from what depends on named assumptions.

---

## 9. Scope and Limitations

This is a structural-constraint paper, not a full predictive QFT derivation. It does not yet derive specific field content, couplings, or renormalization flow.

---

## 10. Conclusion

The prior optimistic claim that all open problems were resolved is not retained. The present consolidated statement is:

1. Unit-modulus loop amplitudes are proved.
2. Full unconstrained loop-space connectedness is false (counterexample).
3. Restricted CSS connectivity result supports the U(1) conclusion under explicit assumptions (A\_dens, A\_rich, CC, locality/tomography mapping).
4. Layer C phase-action identification is retained as conditional structural correspondence.

Accordingly, the strongest honest claim is **conditional structural derivation** of U(1), not unconditional completion.

---

## 11. Proof Notes and Residual Open Questions

### 11.1 Counterexample carried forward from proof-attempt

A causal-void annulus gives winding sectors that cannot be changed by finite single-event deformations. Therefore unrestricted Conjecture 4.2 is false in full generality.

### 11.2 Why restricted theorem is still useful

Physical use targets observer-class regimes; CSS is plausible there, but the bridge requires explicit assumptions (A\_dens).

### 11.3 Step 3 technical residue

The rerouting chain is operationally detailed, but realizability across all compatible histories is encoded as A\_rich and should be formalized as a theorem rather than left implicit.

### 11.4 Practical next proof targets

1. Formal theorem for A\_dens from existing epimechanics primitives.
2. Formal theorem for A\_rich using compatibility constraints from $\mathcal{S}_0$.
3. Constructive algorithm and complexity bounds for global reroute sequence length.
4. Explicit examples where assumptions hold and fail.

---

## References

- Aaronson, S. (2004). *arXiv:quant-ph/0401062*.
- Baez, J.C. (2012). *Foundations of Physics* 42, 819–855.
- Renou, M.-O. et al. (2021). *Nature* 600, 625–629.
- Barcelo, H. et al. (2001). *Advances in Applied Mathematics* 26(2), 97–128.
- Barcelo, H. & Laubenbacher, R. (2005). *Discrete Mathematics* 298(1–3), 39–61.
- Feynman, R.P. & Hibbs, A.R. (1965). *Quantum Mechanics and Path Integrals*.
- Hurwitz, A. (1898).
- Sorkin, R.D. (1994). *Modern Physics Letters A* 9(33), 3119–3127.
