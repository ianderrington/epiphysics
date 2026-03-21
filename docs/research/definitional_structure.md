---
title: "Research Note: Formal Structure of the Definitional Architecture"
description: >-
  Graph-theoretic, category-theoretic, and self-referential analysis of Epimechanics'
  seven core definitions. The definitional graph is strongly connected with diameter 5,
  formalizable as a traced self-dual compact closed category, and coherently self-applicable.
date: 2026-03-21T00:00:00.000Z
draft: true
author:
  name: "Ian Derrington"
contentType: article
series: "Epimechanics"
tags:
  - Epimechanics
  - Foundations
  - Category theory
  - Self-reference
  - Graph theory
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
feedback:
  enabled: true
---

## Motivation

Epimechanics rests on seven core definitions: **Causation** (C), **Entity** (E), **State** (S), **Computation** (Co), **Representation** (R), **Information** (I), and **Prediction** (P). These definitions are organized into co-primitive pairs, a bridge, and a derived pair — see the [computation research note](./computation.md) for the full narrative. The question addressed here is structural: what formal properties does this definitional architecture possess, and what do those properties imply?

Three analyses were performed: graph-theoretic, category-theoretic, and self-referential. The results are mutually reinforcing and expose several open questions. The convergence result and spectral analysis are presented in standalone form in [The Golden Ratio in Epimechanics' Definitional Structure](./definitional_convergence.md).

---

## Definitional Organization

The seven definitions decompose as follows:

| Role | Definitions | Relationship |
|---|---|---|
| Co-primitive pair 1 | Causation $\leftrightarrow$ Entity | Neither prior; co-definitional |
| Bridge | State | Connects ontological to epistemological |
| Co-primitive pair 2 | Computation $\leftrightarrow$ Representation | Neither prior; co-definitional |
| Derived pair | Information $\leftrightarrow$ Prediction | Derived from the four primitives + State |

A key equivalence links the two pairs: **Entity $\leftrightarrow$ Representation** — causal presence is coextensive with representability. The recursive chain closes the loop:

$$E \to \text{Co} \to R \to I \to P \to E$$

---

## Graph Theory

The definitional graph has **7 nodes and 11 directed edges**. It is **strongly connected** with **diameter 5**.

### Adjacency matrix

$$M = \begin{pmatrix} & C & E & S & \text{Co} & R & I & P \\ C & 0 & 1 & 0 & 0 & 0 & 0 & 0 \\ E & 1 & 0 & 0 & 1 & 1 & 0 & 0 \\ S & 1 & 0 & 0 & 1 & 1 & 1 & 0 \\ \text{Co} & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\ R & 0 & 1 & 0 & 1 & 0 & 1 & 0 \\ I & 0 & 0 & 0 & 0 & 0 & 0 & 1 \\ P & 0 & 1 & 0 & 0 & 0 & 0 & 0 \end{pmatrix}$$

### Key properties

- **Not idempotent**: $M^2 \neq M$. One-step definitional dependence does not reproduce itself.
- **Transitive closure**: $M^* = J$ (the all-ones matrix) at $k = 6$. Every definition eventually reaches every other.
- **Near-minimum edge count**: 11 edges for 7 nodes is close to the minimum for strong connectivity (7 edges in a cycle). The graph is efficient but fragile.
- **Bottleneck**: The return path $I \to P \to E$ has no redundant route. If either edge is severed, strong connectivity is lost.
- **Fixed-point at saturation**: $M^* = J = J \cdot J$. The saturated dependency structure is idempotent — applying definitional closure again changes nothing. This validates the claim that the definitions form a self-consistent whole, but only at the level of full transitive closure, not one-step dependence.

---

## Category Theory

The definitional architecture formalizes as a **traced self-dual compact closed category** — an object in $\text{Int}(\text{Chu}(\text{Set}, 2))$.

### Co-primitives as isomorphisms

The co-primitive pairs are categorical isomorphisms:

$$C \cong E \qquad \text{Co} \cong R$$

The Entity $\leftrightarrow$ Representation equivalence further identifies $E \cong R$, which by transitivity collapses all four co-primitives:

$$C \cong E \cong R \cong \text{Co} \equiv \Phi$$

The fully quotiented category has four objects: $\{\Phi, S, I, P\}$.

### Chu space formalization

The ontological/epistemological divide admits a Chu space representation:

$$\text{Chu}(A, X, r) \quad \text{where } A = \{C, E, S\},\; X = \{\text{Co}, R, I, P\},\; r = \text{definitional dependency}$$

The Chu space evaluation matrix $r: A \times X \to \{0, 1\}$:

$$r = \begin{pmatrix} & \text{Co} & R & I & P \\ C & 0 & 0 & 0 & 0 \\ E & 1 & 1 & 0 & 0 \\ S & 1 & 1 & 1 & 0 \end{pmatrix}$$

Chu duality captures the swap between ontological and epistemological perspectives — the same structure viewed from the other side.

### The recursive chain as endomorphism

The chain $E \to \text{Co} \to R \to I \to P \to E$ is an endomorphism on $E$, generating a **free monad**. By **Lambek's lemma**, the initial algebra of this endofunctor is a fixed point: $F(\mu F) \cong \mu F$. The entity that emerges from the recursive definitional chain is self-consistent.

### Coherence condition

Two paths from State to Information exist:

1. **Direct**: $S \xrightarrow{i_2} I$ (State directly yields information)
2. **Indirect**: $S \xrightarrow{r_2} R \xrightarrow{i_1} I$ (State yields representation, then information)

The coherence condition requires $i_2 = i_1 \circ r_2$ — a natural transformation constraint asserting that extracting information from state directly equals extracting it via representation. This is non-trivial and may warrant elevation to a postulate.

**Lawvere's fixed-point theorem** guarantees the existence of a self-consistent interpretation: any surjective definitional map from the definitions to the space of properties they define must have a fixed point.

---

## Self-Reference

The definitions can be applied to themselves — the definitional architecture is itself an entity with causal presence, representable, and computable. The analysis yields:

- **Self-consistent**: No contradictions arise when each definition is applied reflexively. The definitions predicate causal constraint, not truth or falsity, so Liar-type paradoxes do not arise.
- **Approximately self-stable**: Applying the definitions reproduces them up to the Lawvere fixed point. The recursive chain, applied to the definitional system itself, yields the same system.
- **Not self-grounding**: The definitions cannot justify their own existence. This is correct and expected — empirical validation is required. The framework is a structural postulate, not a logical necessity.
- **Incomplete in the Godelian sense**: The definitional system cannot assess its own completeness or define its own truth predicate (Tarski). This is a feature, not a bug — it motivates the empirical program of Epiphysics.

The circularity is **holistic coherence**, not vicious regress. The same structure appears in set theory (set, element, and membership are mutually defined) and in autopoiesis (the organization produces the components that produce the organization).

---

## What Is $\Phi$?

When all isomorphisms are applied ($C \cong E \cong R \cong \text{Co}$), the four co-primitives collapse to a single object $\Phi$. What concept unifies "what exists," "how it relates," "how we approximate," and "what we produce"?

Several candidates were evaluated:

| Candidate | Strength | Problem |
|---|---|---|
| "Distinction" (Spencer-Brown) | Formally clean — drawing a distinction simultaneously creates entity, causation, computation, representation | Risk of epistemic contamination (implies observer) |
| "Process" (Whitehead) | Conceptually right — actual occasions unify substance and relation | Whitehead's occasions "perish"; Epimechanics needs persistence |
| "Interaction" | Physically natural (QFT: interactions are the only observables) | Presupposes entities that interact — circular |
| "Relation" (Rovelli) | Consistent with relational QM | Requires relata — circular unless turtles all the way down |
| "Event" / "It from bit" (Wheeler) | Captures Entity ≅ Representation directly | Privileges information over causation — partial |

**Strongest candidate: consequential differentiation** — the bare fact that differences exist and differences have consequences. Bateson's "difference that makes a difference." This unifies all four co-primitives without requiring an observer:

- Entity = what is differentiated
- Causation = the difference propagates (has consequences)
- Computation = differentiating is the minimal operation
- Representation = the difference encodes its own boundary

The reduced framework becomes $\{\Phi, S, I, P\}$:
- $\Phi$ = consequential differentiation (the single primitive)
- $S$ = patterns of $\Phi$ applied to $\Phi$ (configurations of distinctions)
- $I$ = how much future-$\Phi$ is constrained by past-$\Phi$
- $P$ = $I$ projected forward

**On the postulate.** The Entity $\cong$ Representation equivalence is a well-motivated postulate: for entities we can interact with, causal presence entails detectability, which entails some degree of representability. But "some degree" is doing load-bearing work — an entity detectable only through bulk effects (dark matter's gravitational signature) is barely representable. Whether "barely representable" is sufficient for the equivalence is a substantive question, not a tautology. The $\Phi$ collapse depends on this postulate holding. If it fails, the four co-primitives remain distinct and the spectral radius stays at $\approx 2.247$.

---

## The $I \to P \to E$ Bottleneck

The return path from Information back to Entity passes through a single chain $I \to P \to E$ with no redundant routes. Analysis concludes: **this is a feature, not a bug.**

The bottleneck encodes a deliberate commitment: **information is epistemically inert until it becomes prediction, and prediction is what reconnects the epistemological to the ontological.** Adding a direct $I \to E$ edge ("an entity is anything about which information exists") would collapse the distinction between knowing and predicting — the very distinction the layered architecture is designed to maintain.

The path $I \to P \to E$ says: you cannot go directly from having information to having an entity. You must first convert information into prediction (constrain expectations about future states), and prediction is what touches the world of entities. This is the framework's claim that epistemology reconnects to ontology only through prediction, not through information alone.

The right response to fragility is not adding edges but **strengthening the existing ones** — making the $I \to P$ and $P \to E$ definitions more precise and harder to dispute.

---

## Candidate Algebraic Constraints

The QM analogy (entities ~ states, causation ~ operators) remains structural until an algebraic constraint analogous to $[a, a^\dagger] = 1$ is identified. Three candidates, in order of depth:

### Candidate 1: Eigenvector persistence equation

$$\mathbf{T}(Y) \cdot Y = \lambda Y, \quad |\lambda| = 1 \text{ for persistent entities}$$

Already present in the [self-multiplication research note](./self_multiplication.md). Defines entities as eigenvectors of their own self-multiplication operator. Predicts a discrete spectrum of persistence eigenvalues. Not a commutation relation — it is a fixed-point condition for one operator, not a relation between two.

### Candidate 2: Entity-causation commutator

$$[C_Z, E_Y] = \kappa_{ZY} \cdot E_Y$$

where $E_Y$ is the projection onto entity $Y$'s eigenspace and $C_Z$ is the causal influence operator from entity $Z$ (the cross-term $\mathbf{T}(X_{\text{notY}}) \cdot X_{\text{isY}}$). The commutator measures: **does identifying something as an entity change how causation acts on it?**

- If $[C_Z, E_Y] = 0$: entity boundaries are causally inert — decompose first or apply forces first, same result
- If $[C_Z, E_Y] \neq 0$: partitioning the system into entities changes the causal dynamics — entity identification and causal action don't commute

This is the closest structural analogue to $[a, a^\dagger] = 1$. The coupling constant $\kappa_{ZY}$ determines the degree of non-commutativity.

**Predicts:** Strongly coupled entities ($\kappa$ large) cannot be independently identified — their boundaries are entangled. Weakly coupled entities ($\kappa \to 0$) have observer-independent boundaries. **Testable:** In systems with strong inter-entity coupling (symbiotic organisms, tightly coupled markets), entity decomposition should be representation-sensitive. In weakly coupled systems, it should be robust.

### Candidate 3: Composition-conservation identity

$$\lambda_{1+2} = \lambda_1 \cdot \lambda_2 + \kappa_{12}$$

The persistence eigenvalue of a composite entity equals the product of the parts' eigenvalues plus a coupling correction $\kappa_{12}$.

- $\kappa_{12} < 0$: coupling costs persistence (parasitism, destructive interference)
- $\kappa_{12} > 0$: coupling creates emergent stability (mutualism, autocatalytic loops)
- $\kappa_{12} = 0$: independent entities, multiplicative persistence

**Predicts:** Composite entities are generically less or more persistent than the product of their parts, with the discrepancy measurable as coupling strength. **Testable:** Measure persistence eigenvalues of subsystems independently vs. composite. The discrepancy is $\kappa_{12}$.

### The deepest version

All three candidates may unify under a single principle: **$\mathbf{T}$ is a function of its own eigenvectors, and the self-consistency of this self-reference is the fundamental constraint.** The eigenvector equation defines entities; the commutator defines coupling; the composition law defines how entities combine. All are derivable from the spectral structure of $\mathbf{T}(X) \cdot X$ under the constraint that $\mathbf{T}$ depends on $X$, which depends on $\mathbf{T}$.

This self-consistency condition — $\mathbf{T}$ determined by its eigenvectors, which are determined by $\mathbf{T}$ — is the algebraic analogue of the definitional graph's self-referential closure. The algebra mirrors the architecture.

---

## Remaining Open Questions

**1. Does $\Phi$ exist?** The collapse of four co-primitives to one depends on the Entity $\cong$ Representation postulate. If the postulate holds, $\Phi$ is the fused causal-representational primitive. The open question is whether the postulate holds for all entities or only for those above some representational threshold — and if so, what characterizes $\Phi$ beyond "the thing we get after quotienting."

**2. The coherence condition.** The constraint $i_2 = i_1 \circ r_2$ (two paths to Information agree) asserts that extracting information from state directly equals extracting it via representation. If true, elevate to a postulate. If false, the failure mode identifies where direct and representation-mediated information extraction diverge.

**3. Which algebraic constraint?** Candidates 1-3 above may be aspects of a single spectral self-consistency condition. Formalizing this requires specifying the tensor structure of $\mathbf{T}$ and deriving the commutator and composition law from it. This is the central mathematical open problem.

**4. Connection to self-multiplication.** The [self-multiplication research note](./self_multiplication.md) proposes $\mathbf{T}(X) \cdot X$ as the generative mechanism. The traced monoidal structure discovered here — the recursive chain as endomorphism generating a free monad — may provide the categorical foundation. The transition tensor $\mathbf{T}$ is the endofunctor; the Lambek fixed point is the stable entity. Unifying the graph-theoretic architecture with the self-multiplication dynamics is a priority.

**5. Self-consistency verification.** The definitional graph is strongly connected and self-applicable. But is it at its fixed point, or would further iteration (applying the definitions to refine the definitions) shift the structure? The framework's own axioms (X is an approximation, not reality) **prohibit** an exact fixed point — D(D) = D would mean the definitions are the territory, not the map. The framework predicts its own improvability: each iteration should converge toward an attractor, not reproduce exactly. A computational experiment: formalize the definitions as a rewriting system and iterate. Does it converge? To what?

---

## Convergence Under Self-Application

The seven definitions, when quotiented by their declared equivalences ($C \cong E$, $\text{Co} \cong R$, $E \cong R$), collapse in one expansion+quotient cycle:

| Step | Equivalence Applied | Nodes | Count |
|------|-------------------|-------|-------|
| 0 | — | $\{C, E, S, \text{Co}, R, I, P\}$ | 7 |
| 1 | $C \cong E$ | $\{\Phi_1, S, \text{Co}, R, I, P\}$ | 6 |
| 2 | $\text{Co} \cong R$ | $\{\Phi_1, S, \Phi_2, I, P\}$ | 5 |
| 3 | $E \cong R \Rightarrow \Phi_1 \cong \Phi_2$ | $\{\Phi, S, I, P\}$ | 4 |

**Termination.** The cascade stops at 4 nodes. $I \not\cong P$ (measure $\neq$ process — they are adjoint, not equivalent). $S \not\cong \Phi$ (representation $\neq$ reality — the framework's first axiom forbids this). No further quotienting is possible.

Information-theoretically, $I(D^n)$ is monotonically non-decreasing and bounded by $H(G)$, so convergence is guaranteed. The converged form is the 4-node graph $\{\Phi, S, I, P\}$.

### The fixed-point adjacency matrix

$$A_{\text{fixed}} = \begin{pmatrix} & \Phi & S & I & P \\ \Phi & 1 & 1 & 0 & 0 \\ S & 1 & 0 & 0 & 0 \\ I & 1 & 1 & 0 & 1 \\ P & 0 & 1 & 1 & 0 \end{pmatrix}$$

$\Phi$ has a self-loop (the causal-representational primitive references itself). $\Phi \leftrightarrow S$ and $I \leftrightarrow P$ form two 2-cycles. The cycles connect via $I \to \Phi$, $I \to S$, $P \to S$. No edge from $\Phi$ or $S$ directly to $I$ or $P$ — information and prediction are downstream.

### Spectral analysis

The eigenvalues of $A_{\text{fixed}}$:

| Eigenvalue | Value | $|\lambda|$ | Interpretation |
|---|---|---|---|
| $\lambda_1$ | $\phi = \frac{1+\sqrt{5}}{2} \approx 1.618$ | $\phi$ | Dominant mode — the $\Phi \leftrightarrow S$ cycle amplifies |
| $\lambda_2$ | $1$ | $1$ | Persistent mode — the $I \leftrightarrow P$ cycle sustains itself exactly |
| $\lambda_3$ | $-1$ | $1$ | Oscillatory persistence — alternating sign, stable magnitude |
| $\lambda_4$ | $-1/\phi \approx -0.618$ | $1/\phi$ | Decaying mode — transient, dies out |

**The golden ratio as spectral radius.** The dominant eigenvalue is $\phi$ — the golden ratio. This is a structural consequence: the $\Phi \leftrightarrow S$ pair (self-loop on $\Phi$ plus the 2-cycle $\Phi \leftrightarrow S$) produces a characteristic polynomial $\lambda^2 - \lambda - 1 = 0$ in its subblock, whose roots are $\phi$ and $-1/\phi$. This is the same eigenstructure as the Fibonacci recurrence — a self-referential growth process where each term depends on the previous two.

**The $I \leftrightarrow P$ pair at $|\lambda| = 1$.** The evaluative cycle is a persistent eigenvector — it sustains itself without growth or decay. In the language of the [self-multiplication research note](./self_multiplication.md), the information-prediction cycle IS a persistent entity with $|\lambda| = 1$.

**Global properties:**
- Determinant $= 1$: the transformation preserves volume. No information is created or destroyed by definitional self-application.
- Trace $= 1$: self-reference is concentrated in $\Phi$ (the single self-loop), not distributed.
- Characteristic polynomial: $\lambda^4 - \lambda^3 - 2\lambda^2 + \lambda + 1 = 0$.

### Interpretation

The golden ratio appearing in the definitional structure connects the framework's architecture to its dynamics:

1. **The $\Phi \leftrightarrow S$ cycle is Fibonacci-like.** Each iteration's "output" (how well $\Phi$ approximates $S$) depends on the previous two iterations — the current representation and the representation it improved upon. This is exactly how Fibonacci growth works: $F_n = F_{n-1} + F_{n-2}$.

2. **The growth is structural, not pathological.** $|\lambda_1| = \phi > 1$ means the $\Phi \leftrightarrow S$ interaction amplifies under iteration. But this is not divergence — it is the definitional system's self-referential depth increasing. Each iteration of "reality constrains representation constrains reality" adds a layer of self-referential structure. The framework becomes richer, not unstable.

3. **The evaluative pair is the stable backbone.** $|\lambda_{2,3}| = 1$ means the $I \leftrightarrow P$ cycle neither grows nor decays. Information and prediction are the framework's "ground state" — the persistent structure around which the $\Phi \leftrightarrow S$ amplification occurs.

4. **The decaying mode washes out.** $|\lambda_4| = 1/\phi < 1$ means one component of the definitional structure dies under iteration. This is the non-self-referential content — definitional structure that doesn't participate in the $\Phi \leftrightarrow S$ or $I \leftrightarrow P$ cycles. It is transient and irrelevant to the fixed point.

---

## Gaps Identified

A stress test (applying each definition reflexively and cross-referentially) identified several structural gaps. These are consequences to be derived from the core definitions, not additional axioms:

- **Null / noise / baseline:** $\rho_{\text{causal}} = 0$ is already the null. Low-information causation is already noise. The definitions handle these cases — they do not need separate commitments.
- **Composition:** Already implicit in causation ($A$ causes $B$, $B$ causes $A$ — that IS composition). Falls out of causal structure.
- **Persistence cost:** Should emerge from iterated dynamics ($|\lambda| = 1$ maintenance requires energy throughput). A consequence of the self-multiplication framework, not a foundational postulate.
- **Time:** Implicit in causation (temporal ordering) and computation (process). Correctly absent from the core vocabulary.
- **Scale:** Falls out of composition in [Part 2](../theory/02_meta_entities.md).
- **Agency:** Correctly deferred to [Part 3](../theory/03_intelligence_consciousness_agency.md).
- **Boundary:** Handled by spectral gaps in the [self-multiplication note](./self_multiplication.md).
