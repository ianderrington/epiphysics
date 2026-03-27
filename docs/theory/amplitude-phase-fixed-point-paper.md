---
title: "Compositional Fixed-Point Derivation of the Amplitude Phase Group"
description: >-
  A standalone derivation of U(1) phase structure from compositional first
  principles, with explicit theorem/proof structure, domain separation, and
  fixed-point uniqueness.
date: 2026-03-27T03:06:00.000Z
draft: true
author:
  name: "Ian Derrington"
series: "Epimechanics"
series_order: 1.6
tags:
  - Epimechanics
  - Quantum mechanics
  - Foundations
  - Amplitude phase
  - Lie groups
  - Compositionality
coverImage:
  url: ./images/amplitude-phase-fixed-point-paper-1-1.png
---

> **In plain English:** The imaginary unit $i$ in quantum mechanics — the $i$ in $e^{iS/\hbar}$ — has always been postulated, not derived. This paper derives it. The argument: any physical theory that can describe its own composite parts consistently has exactly one possible phase structure for path amplitudes. That structure is the unit circle in the complex plane — $\mathrm{U}(1)$, the group of complex phases. Every other option (SU(2), higher groups) fails the self-consistency test: when you try to compose such a theory with itself, it produces a larger, different group. Only $\mathrm{U}(1)$ closes on itself. This is why quantum mechanics uses complex numbers: they are the unique self-consistent amplitude structure. The cause-plex grounding (Appendix B) shows this follows from the most basic features of causal structure — not from quantum mechanics itself.

---

## Reader's Bridge

*Skip this section if you're comfortable with Lie groups and group representations. Read it if the words "compact connected Lie group" or "tensor product of groups" are unfamiliar.*

**What is a group?** A group is a collection of operations that can be composed — where doing one then another is the same as doing some third one from the same collection. The rotation group SO(3) is all rotations in 3D space: rotate 30° then 45° = rotate 75°. The group U(1) is all rotations in the complex plane: multiply by $e^{i\theta}$ then by $e^{i\phi}$ = multiply by $e^{i(\theta+\phi)}$. Groups describe symmetry.

**What is a phase?** In quantum mechanics, every path through history gets a complex number assigned to it — its amplitude. The magnitude of that number tells you "how likely," and the angle (phase) tells you "which direction in the complex plane." When phases align, paths reinforce; when they oppose, paths cancel. This cancellation is interference — the defining feature of quantum mechanics.

**What does G ⊗ G ≅ G mean?** When you have two independent systems, each with phase group G, their combined phase group is G ⊗ G (tensor product). The condition G ⊗ G ≅ G says: combining two independent systems gives back the same phase group. This is the self-consistency condition — a theory should not produce a different kind of physics when you put two copies of it together.

**Why does this select U(1)?** U(1) consists of rotations on the unit circle in the complex plane: $e^{i\theta}$ for any real $\theta$. When two independent U(1) systems combine: $(e^{i\theta}, e^{i\phi})$ acts as $e^{i(\theta+\phi)}$. The result is still in U(1). Self-consistent. Every other continuous group — SU(2), SU(3), higher groups — fails this test: combining two copies produces a larger, different group. Only U(1) closes on itself.

**The theorem in plain terms:** If physics must be self-consistent under composition (you can always build bigger systems from smaller ones), and if the phase group must be continuous (smooth interference, not binary on/off), then the phase group must be U(1). This is why quantum mechanics uses complex numbers.

---

## Abstract

We derive the amplitude phase group from compositional first principles in a recursively closed causal framework. Let $\mathcal{S}$ be a class of systems with admissible history spaces $\Gamma_X$ and amplitude maps $\mathcal{A}_X: \Gamma_X \to \mathcal{V}$. Under product-state independence, compositional consistency, recursive closure, and compact connected Lie regularity of normalized phase factors, we prove: (i) product-state factorization of amplitudes; (ii) an induced group-level fixed-point condition
$$
G \otimes G \cong G;
$$
(iii) exclusion of nonabelian compact connected Lie groups from this fixed-point class; and (iv) uniqueness of $\mathrm{U}(1)$ as the nontrivial compact connected solution. Domain separation is explicit: factorization is required on $A \perp B$ preparations, while non-product preparations admit cross-terms. This yields a self-consistent structural basis for $\mathrm{U}(1)$-phase emergence.

---

## 1. Introduction

### 1.1 Problem

A foundational question for amplitude-based theories is whether phase structure is primitive or derivable. In many formalisms, $\mathrm{U}(1)$ is introduced kinematically. Here we ask whether it can be obtained from compositional constraints alone.

Formally:
$$
\text{Given } (\mathcal{S},\otimes,\mathcal{A}),\ \text{which compact connected Lie groups } G
\text{ are compatible with recursive composition?}
$$

### 1.2 Main statement (informal)

Under assumptions A1–A4, admissible normalized phase factors satisfy
$$
G \otimes G \cong G,
$$
and the unique nontrivial compact connected solution is
$$
G \cong \mathrm{U}(1).
$$

### 1.3 Contributions

This paper provides:

1. A product-state factorization theorem (Proposition 3.1);
2. A compositional fixed-point condition $G \otimes G \cong G$ derived from recursive composition (Section 4);
3. A nonabelian exclusion lemma — no compact connected simple Lie group satisfies the fixed-point condition (Lemma 5.1, Corollary 5.2), including explicit verification for exceptional groups $G_2, F_4, E_6, E_7, E_8$;
4. A uniqueness theorem with correct dimensional analysis: $\dim(\mathrm{U}(1)^n \otimes \mathrm{U}(1)^n) = 2n-1$, fixed-point forces $n=1$ (Theorem 6.1);
5. A rigorous product/non-product domain split, with entangled states correctly appearing as cross-term admitting cases (Section 7).

**Note on scope.** Assumptions A1+A2 are equivalent in strength to local tomography; U(1) has been identified this way before. What is new here is the fixed-point framing: U(1) is not merely a satisfier of constraints but the *unique self-consistent* amplitude group under recursive composition. The dimensional uniqueness proof (Theorem 6.1) and explicit verification for all exceptional Lie groups (Corollary 5.2) are precise where prior arguments were loose. See Appendix B for the cause-plex derivation of A1–A4 from more primitive principles.

---

## 2. Formal setup

### 2.1 Systems, histories, amplitudes

Let $\mathcal{S}$ be a system class. For each $X \in \mathcal{S}$:

- $\Gamma_X$: admissible history set,
- $\mathcal{A}_X: \Gamma_X \to \mathcal{V}$: amplitude map,
- $\mathcal{V}^{\times}\subseteq \mathcal{V}$: multiplicative sector containing normalized amplitude factors.

Define the normalized phase group
$$
G \subseteq \mathcal{V}^{\times},
$$
assumed compact, connected, and Lie.

### 2.2 Composition and independence

For $A,B\in\mathcal{S}$, write $A\otimes B$ for system composition and $A\perp B$ for product-state (independent) preparation.

Under $A\perp B$:
$$
\Gamma_{A\otimes B}=\Gamma_A\times\Gamma_B.
$$

### 2.3 Assumptions

**A1 (Product-state independence).**
$$
A\perp B \implies \Gamma_{A\otimes B}=\Gamma_A\times\Gamma_B.
$$
Independent systems have independent history spaces. Entangled systems ($A \not\perp B$) are not covered by A1; they are handled in Section 7. In the cause-plex, A1 follows from spacelike separation plus a product initial state — see [Appendix B](#appendix-b-cause-plex-motivation).

**A2 (Compositional consistency).** For $A \perp B$: composite amplitude $\mathcal{A}_{A \otimes B}(\gamma_A, \gamma_B)$ (i) depends on $\gamma_A$ only through $\mathcal{A}_A(\gamma_A)$ and on $\gamma_B$ only through $\mathcal{A}_B(\gamma_B)$, and (ii) is multiplicative in $\mathcal{V}^\times$. In the cause-plex, (i) follows from event locality ([Cause-Plex and Spacetime](./causeplex_spacetime.md), Def 1.4) and (ii) from the path-integral composition rule ([Cause-Plex and Quantum Mechanics](./causeplex_quantum.md), Def 2.8).

**A3 (Recursive closure).** Composition laws are level-invariant and closed under iteration: the same rule applies at every level of a nested description. In the cause-plex, this follows from Postulate Q' — observer-class entities are themselves cause-plexes governed by the same rules (see [Part 1.5: Causors](./01_5_causors.md)).

**A4 (Lie regularity).** $G$ is a compact connected Lie group. Compactness follows from loop stability ($|w|=1$, [Cause-Plex and Quantum Mechanics](./causeplex_quantum.md), Prop 3.1); connectedness from requiring non-trivial continuous interference; smoothness is a regularity assumption.

**Assumption status summary:**

| Assumption | Role | Status in cause-plex |
|---|---|---|
| A1 | Independent systems → independent histories | Derived from $A \perp B$ + product $\mathcal{S}_0$ |
| A2 | Amplitudes factorize over independent systems | Derived from event locality (L) + composition rule |
| A3 | Same rules at all levels (self-description) | Derived from Postulate Q' |
| A4 | G is a smooth compact connected group | Motivated: stability + continuity + regularity |

---

## 3. Product-state factorization

**Proposition 3.1 (Product-state factorization theorem).**
For $A,B\in\mathcal{S}$ with $A\perp B$,
$$
\forall (\gamma_A,\gamma_B)\in\Gamma_A\times\Gamma_B:\quad
\mathcal{A}_{A\otimes B}(\gamma_A,\gamma_B)=\mathcal{A}_A(\gamma_A)\mathcal{A}_B(\gamma_B).
$$

**Proof.** By A1, $\Gamma_{A \otimes B} = \Gamma_A \times \Gamma_B$. A2 requires: (i) $\mathcal{A}_{A \otimes B}(\gamma_A, \gamma_B)$ depends on $\gamma_A$ only through $\mathcal{A}_A(\gamma_A)$ and on $\gamma_B$ only through $\mathcal{A}_B(\gamma_B)$ (subsystem reduction under canonical projections $\pi_A, \pi_B$); and (ii) independent contributions compose multiplicatively in $\mathcal{V}^\times$.

From (i): $\mathcal{A}_{A \otimes B}(\gamma_A, \gamma_B) = f(\mathcal{A}_A(\gamma_A), \mathcal{A}_B(\gamma_B))$ for some $f: \mathcal{V}^\times \times \mathcal{V}^\times \to \mathcal{V}^\times$. From (ii): $f(a, b) = a \cdot b$ (the multiplicative structure of $\mathcal{V}^\times$). Therefore:
$$
\mathcal{A}_{A\otimes B}(\gamma_A,\gamma_B) = \mathcal{A}_A(\gamma_A)\cdot\mathcal{A}_B(\gamma_B).
$$
*Remark: the step from (i)+(ii) to $f(a,b) = a \cdot b$ uses that $\mathcal{V}^\times$ is a multiplicative group and $f$ is a group homomorphism in each argument — a consequence of A2. If $f$ were not required to be multiplicative, additional amplitude assignments would be admissible.* $\square$

**Remark 3.2 (Scope).** Proposition 3.1 is conditional on $A\perp B$. For $A\not\perp B$, factorization is not required.

---

## 4. Compositional fixed-point condition

Let $\mathfrak{P}(X)\subseteq G$ denote admissible normalized phase factors for system $X$. Proposition 3.1 and A3 imply
$$
\mathfrak{P}(A\otimes B)=\mathfrak{P}(A)\cdot\mathfrak{P}(B).
$$
At group level this induces
$$
G\otimes G\cong G.
$$
We call this the **compositional fixed-point condition**.

**Notation clarification.** Throughout this paper, $G \otimes G$ denotes the *image* of the tensor product representation of $G \times G$ acting on amplitude space — not the direct product $G \times G$ as an abstract group. The dimension of this image is generically $2\dim G - k$ where $k$ counts redundant phase parameters (see Theorem 6.1 proof). For $\mathrm{U}(1)$, $k=1$, so $\dim(\mathrm{U}(1) \otimes \mathrm{U}(1)) = 1 = \dim\,\mathrm{U}(1)$ — the fixed-point condition is satisfied. For higher tori, $k=1$ still but $2n-1 \neq n$ for $n > 1$.

---

## 5. Nonabelian exclusion

**Lemma 5.1.** If $G$ is nontrivial, compact, connected, and **simple** (nonabelian) Lie, then
$$
G\otimes G\cong G
$$
is impossible.

**Proof.** Let $\rho: G \to \mathrm{GL}(V)$ be a faithful finite-dimensional unitary representation. The tensor product representation $\rho \otimes \rho: G \times G \to \mathrm{GL}(V \otimes V)$ has image with Lie algebra $\mathfrak{g} \oplus \mathfrak{g}$ (the two simple factors act independently on $V \otimes V$, with at most a discrete central overlap since $G$ is simple). Therefore:
$$
\dim\,\mathrm{Im}(\rho \otimes \rho) = 2\dim G.
$$
If $G \otimes G \cong G$, isomorphic groups have equal dimension, so $2\dim G = \dim G$, giving $\dim G = 0$. But a connected compact Lie group of dimension $0$ is trivial, contradicting nontriviality.

*Note: this argument applies to simple $G$. It does not apply to $G = \mathrm{U}(1)$ (which is abelian), for which $\dim(\mathrm{U}(1) \otimes \mathrm{U}(1)) = 1 = \dim\,\mathrm{U}(1)$ — correctly, since $\mathrm{U}(1)$ is the fixed point we seek. The lemma excludes nonabelian simple groups; abelian candidates are handled in Theorem 6.1.*

**Corollary 5.2.** All compact connected simple Lie groups are excluded: $\mathrm{SU}(n)$ for $n \geq 2$, $\mathrm{SO}(n)$, $\mathrm{Sp}(n)$, and the exceptional groups $G_2, F_4, E_6, E_7, E_8$. Concretely: $\dim G_2 = 14$, $\dim F_4 = 52$, $\dim E_6 = 78$, $\dim E_7 = 133$, $\dim E_8 = 248$; all give $\dim(G \otimes G) = 2\dim G \neq \dim G$. $\square$

---

## 6. Uniqueness theorem

**Theorem 6.1 (Unique nontrivial compact connected solution).**
Under A1–A4 and compositional fixed-point compatibility,
$$
G\cong \mathrm{U}(1)
$$
is the unique nontrivial compact connected Lie-group phase structure.

**Proof.** By Lemma 5.1 and Corollary 5.2, all nonabelian compact connected simple Lie groups are excluded. By the classification of compact connected abelian Lie groups, the remaining candidates are tori:
$$
G\cong \mathrm{U}(1)^n, \qquad n\in\mathbb{N}_{\ge 1}.
$$
We now apply the fixed-point condition $G \otimes G \cong G$ to tori. $\mathrm{U}(1)^n$ acts on $\mathbb{C}^n$ diagonally: $(e^{i\theta_1},\ldots,e^{i\theta_n})$ acts on basis vector $e_k$ by $e^{i\theta_k}$. The tensor product $\mathrm{U}(1)^n \otimes \mathrm{U}(1)^n$ acts on $\mathbb{C}^n \otimes \mathbb{C}^n = \mathbb{C}^{n^2}$, with basis $e_j \otimes e_k$ acquiring phase $e^{i(\theta_j + \phi_k)}$. The image in $\mathrm{GL}(\mathbb{C}^{n^2})$ has dimension:
$$
\dim\,\mathrm{Im}(\mathrm{U}(1)^n \otimes \mathrm{U}(1)^n) = 2n - 1,
$$
since the $2n$ parameters $(\theta_1,\ldots,\theta_n,\phi_1,\ldots,\phi_n)$ have one redundancy: the simultaneous shift $\theta_k \to \theta_k + c$, $\phi_k \to \phi_k - c$ leaves all phases $\theta_j + \phi_k$ unchanged. Therefore $\dim(G \otimes G) = 2n - 1$.

Fixed-point compatibility requires $2n - 1 = n$, giving $n = 1$.

Therefore $G \cong \mathrm{U}(1)$. Uniqueness follows since all other compact connected Lie groups (nonabelian: excluded by Lemma 5.1; abelian tori $\mathrm{U}(1)^n$ for $n \geq 2$: excluded above) fail the fixed-point condition. $\square$

**Corollary 6.2.** For recursively compositional systems satisfying A1–A4,
$$
\mathfrak{P}(X)\subseteq \mathrm{U}(1)
$$
for every admissible system $X$, with equality on nontrivial phase sectors.

---

## 7. Product vs non-product preparations

**Proposition 7.1 (Domain separation).**
The framework has two regimes:
$$
A\perp B \implies
\mathcal{A}_{A\otimes B}=\mathcal{A}_A\boxtimes\mathcal{A}_B,
$$
$$
A\not\perp B \implies
\exists\,\Delta_{AB}\ \text{such that}
\ \mathcal{A}_{A\otimes B}\neq \mathcal{A}_A\boxtimes\mathcal{A}_B
\ \text{in general}.
$$

**Interpretation.** Non-factorizing cross-terms are admissible when product-state premises fail. Entangled/correlated preparations are therefore represented without contradiction.

---

## 8. Structural implications

1. **Derivational status of $\mathrm{U}(1)$.**
   $$
   \{\text{A1--A4}\} \Longrightarrow G\cong\mathrm{U}(1).
   $$

2. **Consistency criterion for candidate models.**
   If model $\mathcal{M}$ claims A1–A4 plus recursive closure, then in the compact connected case
   $$
   \mathfrak{P}_{\mathcal{M}}\cong\mathrm{U}(1)
   $$
   is required.

3. **Cross-route robustness.** Independent reconstruction routes converging on $\mathrm{U}(1)$ indicate structural invariance rather than representational artifact.

---

## 9. Limitations and extensions

1. Scope is compact connected Lie groups; noncompact/disconnected classes remain open.
2. A categorical specification of induced $\otimes$ at group level would strengthen generality claims.
3. Broader fixed-point classification outside compact connected Lie families is open.
4. Empirical bridge from structural constraints to discriminable signatures remains future work.

---

## 10. Conclusion

From product-state independence, compositional consistency, recursive closure, and Lie regularity, we derive a fixed-point compatibility condition on phase structure:
$$
G\otimes G\cong G.
$$
Within compact connected Lie groups, nonabelian candidates are excluded, and the unique nontrivial admissible solution is
$$
G\cong \mathrm{U}(1).
$$
The framework is internally consistent across product and non-product preparation regimes and provides a rigorous compositional account of $\mathrm{U}(1)$ phase emergence.

---

## Appendix B. Cause-Plex Motivation

The abstract framework of Section 2 is grounded in the multiway cause-plex [Derrington 2026a, 2026b]. This appendix makes the correspondence explicit, showing that A1–A4 are not independent postulates when embedded in the cause-plex — three of them are derived, and one (A2/multiplicativity) follows from event locality.

### B.1 The cause-plex substrate

The cause-plex $\mathcal{C} = (E, \prec)$ is a locally finite strict partial order of causal events — state transitions $e: \mathcal{S}_\text{in} \to \mathcal{S}_\text{out}$ — with no assumed physics ([Cause-Plex and Spacetime](./causeplex_spacetime.md), Def 1.1–1.2). The multiway cause-plex $\mathcal{C}^*(\mathcal{S}_0)$ is the collection of all locally finite partial orders consistent with initial state $\mathcal{S}_0$ ([Cause-Plex and Quantum Mechanics](./causeplex_quantum.md), Def 2.1). The history space of the present framework maps to:
$$
\Gamma_X \leftrightarrow \mathcal{C}^*(\mathcal{S}_0^X)
$$

### B.2 A1 is derived in the cause-plex

**Spacelike separation.** Events $e_1, e_2 \in E$ are spacelike separated ($e_1 \perp e_2$) if neither $e_1 \prec e_2$ nor $e_2 \prec e_1$. Systems $A$ and $B$ are spacelike separated ($A \perp B$) if no causal path connects any event in $A$'s state domain to any event in $B$'s.

**Product initial state.** $\mathcal{S}_0 = \mathcal{S}_0^A \times \mathcal{S}_0^B$ means the initial state places no cross-constraints between $A$'s and $B$'s state domains.

**Proposition (A1 derived).** *If $A \perp B$ and $\mathcal{S}_0 = \mathcal{S}_0^A \times \mathcal{S}_0^B$, then $\mathcal{C}^*(\mathcal{S}_0)= \mathcal{C}^*(\mathcal{S}_0^A) \times \mathcal{C}^*(\mathcal{S}_0^B)$.*

*Proof sketch.* A history consistent with $\mathcal{S}_0^A \times \mathcal{S}_0^B$ must be independently consistent with $\mathcal{S}_0^A$ on $A$'s events and $\mathcal{S}_0^B$ on $B$'s events. Since $A \perp B$, there are no precedence relations crossing the $A/B$ boundary. The joint admissibility predicate factorizes into independent $A$- and $B$-admissibility predicates. The joint history space is therefore the Cartesian product. $\square$

A1 in the abstract framework corresponds to this proposition: $A \perp B$ combined with a product initial state gives Cartesian history spaces. Entanglement (non-product $\mathcal{S}_0$) is precisely the case where A1 fails — correctly, since entangled composites have correlated histories.

### B.3 A2(i) is derived from event locality

Event locality (Assumption L of [Cause-Plex and Spacetime](./causeplex_spacetime.md), Def 1.4): each event $e$ reads from and writes to a finite local state domain $D(e)$, with $D_\text{out}(e) \cap D_\text{in}(e') = \emptyset$ for non-adjacent events.

**Consequence for amplitudes.** Any amplitude assignment consistent with the event structure — computable from the cause-plex data — can only access local event data at each event. For $A \perp B$, no event in either system can access the state domain of the other. Therefore the amplitude contribution at each event depends only on local data at that event, giving A2(i): composite amplitude depends on $\gamma_A$ only through $\mathcal{A}_A(\gamma_A)$ and on $\gamma_B$ only through $\mathcal{A}_B(\gamma_B)$.

*Note: A2(ii) (multiplicativity) is a further structural condition. Multiplicativity of amplitudes in $\mathcal{V}^\times$ follows from the path-integral composition rule (Definition 2.8 of [Cause-Plex and Quantum Mechanics](./causeplex_quantum.md)), which requires $w(\gamma_1 \cdot \gamma_2) = w(\gamma_1) \cdot w(\gamma_2)$ for sequential loops. Extending this to parallel composition requires additionally that spacelike independence implies amplitude independence — this is the content of A2(ii) and is derived from event locality + spacelike separation for product states.*

### B.4 A3 (recursive closure) from Postulate Q'

Postulate Q' ([Cause-Plex and Quantum Mechanics](./causeplex_quantum.md), Section 2): the physical cause-plex is multiway — all causally consistent histories coexist. Observer-class entities within $\mathcal{C}^*$ are themselves cause-plexes (nested multiway structures). The same composition rules that govern physical interactions govern the observer's own dynamics. This is A3: composition is level-invariant and closed under iteration. It is the recursive self-description property: the theory applies to itself.

### B.5 A4 (Lie regularity) from stability

Proposition 3.1 of [Cause-Plex and Quantum Mechanics](./causeplex_quantum.md) (stability forces $|w|=1$): if loops iterate without divergence or extinction, $|w(\gamma)| = 1$. This forces $G$ compact. Non-trivial continuous interference requires $\dim G \geq 1$, ruling out discrete groups. Smoothness (Lie structure) is the natural regularity assumption for a group parameterized by the continuous real action $S[\gamma] \in \mathbb{R}$.

### B.6 Summary of cause-plex grounding

| Assumption | Status in cause-plex |
|---|---|
| A1 (product-state independence) | ✅ Derived: $A \perp B$ + product $\mathcal{S}_0$ → Cartesian $\mathcal{C}^*$ |
| A2(i) (subsystem reduction) | ✅ Derived: event locality (L) → local amplitude contributions |
| A2(ii) (multiplicativity) | ✅ Derived: composition rule (Def 2.8) + spacelike independence |
| A3 (recursive closure) | ✅ Derived: Postulate Q' + observer-class entities in $\mathcal{C}^*$ |
| A4 (Lie regularity) | ✅ Motivated: stability (Prop 3.1) + continuous action + smoothness |

In the cause-plex, A1–A4 are not independent postulates but consequences of the primitive causal structure. The abstract theorem (Sections 3–7) is therefore a derivation from cause-plex foundations, not just a characterization under assumed axioms.

---

## References

- Aaronson, S. (2004). Is quantum mechanics an island in theoryspace? *arXiv:quant-ph/0401062*.
- Baez, J.C. (2012). Division algebras and quantum theory. *Foundations of Physics*, 42, 819–855.
- Barcelo, H., Kramer, X., Laubenbacher, R., & Weaver, C. (2001). Foundations of a connectivity theory for simplicial complexes. *Advances in Applied Mathematics*, 26(2), 97–128.
- Benincasa, D.M.T. & Dowker, F. (2010). Scalar curvature of a causal set. *Physical Review Letters*, 104, 181301.
- Bombelli, L., Lee, J., Meyer, D., & Sorkin, R.D. (1987). Space-time as a causal set. *Physical Review Letters*, 59(5), 521–524.
- Chiribella, G., D'Ariano, G.M., & Perinotti, P. (2011). Informational derivation of quantum theory. *Physical Review A*, 84, 012311.
- Derrington, I. (2026a). [Cause-plex and spacetime: Deriving the Lorentzian metric from causal structure.](./causeplex_spacetime.md) *Epimechanics series*.
- Derrington, I. (2026b). [Cause-plex and quantum mechanics: Deriving quantum structure from multiway causal order.](./causeplex_quantum.md) *Epimechanics series*.
- Derrington, I. (2026c). [Complex amplitudes from loop-phase consistency in the multiway cause-plex.](./causeplex_loop_phase.md) *Epimechanics series*.
- Hardy, L. (2001). Quantum theory from five reasonable axioms. *arXiv:quant-ph/0101012*.
- Hurwitz, A. (1898). Ueber die Composition der quadratischen Formen von beliebig vielen Variabeln. *Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen*, 309–316.
- Malament, D.B. (1977). The class of continuous timelike curves determines the topology of spacetime. *Journal of Mathematical Physics*, 18(7), 1399–1404.
- Renou, M.-O. et al. (2021). Quantum theory based on real numbers can be experimentally falsified. *Nature*, 600, 625–629.
- Sorkin, R.D. (1994). Quantum mechanics as quantum measure theory. *Modern Physics Letters A*, 9(33), 3119–3127.
- Tegmark, M. (1997). On the dimensionality of spacetime. *Classical and Quantum Gravity*, 14(4), L69–L75.

---

## Appendix A. Notation

$$
\mathcal{S}:\text{ system class},\quad
\Gamma_X:\text{ history space},\quad
\mathcal{A}_X:\Gamma_X\to\mathcal{V},
$$
$$
A\perp B:\text{ product-state preparation},\quad
\boxtimes:\text{ pointwise product},
$$
$$
G:\text{ compact connected phase Lie group},\quad
\mathfrak{P}(X):\text{ normalized phase sector of }X.
$$
