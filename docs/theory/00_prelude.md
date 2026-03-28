---
title: "Epimechanics — Part 0: Foundations"
description: >-
  What Epimechanics is, what it claims, what it doesn't claim, and the conceptual
  foundations everything else rests on. Representations, entities, the grammar/vocabulary
  distinction, and the relationship between Epimechanics (the theory) and Epiphysics
  (the empirical program).
date: 2026-03-17T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
contentType: article
mediaTypes:
  - text
  - image
series: "Epimechanics"
series_order: 0
coverImage:
  url: ./images/epimechanics_00_prelude-1-1.png
  alt: >-
    A foundation being laid — abstract geometric blocks assembling into a framework,
    with labels like X, S, ρ, F floating above each block. Below the foundation,
    raw reality is obscured by fog. Above, the mechanical apparatus is under construction.
    Blueprint aesthetic, deep blue and gold.
categories:
  - Philosophy
  - Physics
  - Systems thinking
tags:
  - Epimechanics
  - Foundations
  - Representations
  - Entities
bullets:
  - What Epimechanics claims and doesn't claim
  - X is a representation, not reality — Hoffman's Interface Theory
  - Entities are anything with causal presence (equivalently, anything representable) — auto-causal density represents persistence, not entity-hood
  - Epimechanics (theory) vs Epiphysics (empirical program)
  - All representations have epimechanical structure — good ones are predictively efficient
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

> ### If you only read one thing
>
> **Epiphysics** is the empirical science of **Epimechanics** — a framework that asks: what is physics, really, _before_ we specify particles, forces, or dimensions?
>
> The answer: **causation**. If you have things that cause other things (events with inputs and outputs), everything else — _spacetime_, _quantum mechanics_, _energy_, _life_, _consciousness_ — follows as mathematical consequence.
>
> This document lays the co-definitions the framework rests upon. **Accept them and the rest is derivation.**

## What This Document Does

Part 0 lays the foundation. Everything in the Epimechanics series rests on a small set of co-defined concepts stated here. If you accept them, the rest follows as mathematics. If you reject any, you know exactly where the framework breaks for you.

### Core vocabulary

Seven terms organize into two **co-primitive pairs**, a **bridge concept**, and a **derived pair**:

**First co-primitive pair (ontological):**

- **Causation** — the relation by which one entity's state constrains another's. Detected via intervention: if intervening on $X$ changes $Y$, $X$ causes $Y$.
- **Entity** — anything with causal presence; equivalently, anything representable. Causation connects entities; entities are what causation connects. Neither is prior.

**Bridge concept:**

- **State** — what determines an entity's causal dispositions. The referent that representations approximate. States exist; direct access is limited.

**Second co-primitive pair (epistemological):**

- **Computation** — producing a representation: discriminating, partitioning, compressing. At the granular level, this acts like logical gates chaining across a causal graph.
- **Representation** — the product of computation: an approximation of state. This is $X$.

**Derived pair:**

- **Information** — the degree to which a representation reduces uncertainty about future states. Formally: $I(X) = H(\text{future}) - H(\text{future} \mid X)$.
- **Prediction** — reduction of that uncertainty.

The pairs require each other: computation and representation need entities and causation to be *about* something; entities and causation are only accessible *through* computation and representation. State is where they meet.

### The framework's commitments

From these co-definitions, five commitments follow:

1. **Representation, not reality** — $X$ is a model of state, not state itself
2. **Causation as primitive** — the intervention test grounds all other concepts
3. **Entity as causal presence** — anything representable is an entity
4. **Grammar vs vocabulary** — Epimechanics provides structure (state, force, energy); domain sciences provide content
5. **Efficiency principle** — all representations have mechanical structure; good ones have *simple* mechanical structure

---

## 1. X Is a Representation

$X$ is not the thing itself. It is a formal description of the thing's condition — the way a map describes territory. The territory exists independently; $X$ is our model of it.

[Hoffman's Interface Theory of Perception (*The Case Against Reality*, 2019)](https://wwnorton.com/books/9780393254693) makes the sharpest version of this point: our perceptions are not accurate depictions of reality but fitness-tuned interfaces. The desktop icon does not resemble the magnetic patterns on the disk. It doesn't need to — it needs to be *useful*: to let you predict what happens when you double-click. $X$ has the same status. It is an interface through which we interact with reality, not a photograph of it.

Hoffman's result raises a puzzle: if fitness beats truth in evolutionary competition, why do truth-tracking practices (science, engineering, accurate maps) exist at all? The resolution lies in *temporal extent*. Fitness-only strategies can achieve high short-term performance but are temporally bounded — they eventually collide with causal reality. Fitness×truth strategies couple effectiveness to actual causal structure, extending their duration. Over long timescales, selection favors high *causal action* (energy × time) — which means selection favors fitness×truth over fitness alone. Science persists not because truth beats fitness, but because truth *extends* fitness. See [Part 1.5](./01_5_causors.md) and [Part 4](./04_time_and_soul.md) for the formal treatment.

The interface view entails three properties:
- **$X$ can be wrong.** A representation may be inaccurate, incomplete, or misleading. "Calling a tree a car" assigns the tree a representation in a state space (vehicles) where the dynamics don't apply. The tree's measurable properties are unaffected. The mislabel is a coordinate error — it assigns the wrong $X$ to the wrong $S$.
- **$X$ can be arbitrary.** Any labeling is a representational act. You could call your car a shoe. The label commits you to the existence of something being represented, however poorly.
- **Some $X$'s are better than others.** Not because they are "more true" but because they track invariant structure, predict dynamics, and compress information more efficiently. Finding the right $X$ is the central empirical challenge.

### Observer-dependence is a spectrum, not a taxonomy

Representations vary in how much they depend on the observer. Observer-dependence is not a set of bins but a continuous spectrum, and a state's position on it is established empirically — through repeated independent observation.

At one end: a single observer assigns a label ("this tree is beautiful"). That representation is fully observer-dependent — another observer may disagree, and there is no way to adjudicate without importing a value system.

At the other end: a thousand independent observers using different methods all measure the same value ("the speed of light is $2.998 \times 10^8$ m/s"). The agreement across independent methods is what establishes invariance. It is not a property of the state itself — it is a property of *how the state behaves under change of observer*. Invariance is earned through reproducibility, not declared by definition.

Between the extremes:

- **A single measurement** — one observer, one method, one occasion. Maximally observer-dependent. Could be error, bias, or artifact.
- **Repeated measurement by one observer** — establishes reliability but not independence. The observer's biases persist.
- **Independent measurements by different observers** — reduces observer-dependence. Agreement across observers is evidence that the representation tracks something beyond any individual observer.
- **Independent measurements by different methods** — the strongest evidence. If weighing, pushing, and annihilating a rock all give the same mass, the agreement is not a property of any method — it is a property of the rock. The equivalence principle follows: convergence across independent methods establishes that the representation tracks real structure.

The process of moving states along this spectrum — from single-observer assignment toward multi-observer, multi-method convergence — is the scientific method. Science does not discover "objective truth." It identifies representations that are increasingly observer-independent by testing them against independent observations. A state that survives this process is not guaranteed to be "real" — but it is the best representation available.

Some useful (but non-exclusive) landmarks on the spectrum:

- **Observer-imposed**: the observer's coordinate choice determines the value (a name, an aesthetic rating, a category assignment). Real and causally consequential — a tree labeled "heritage" is legally protected — but another observer may impose a different value.
- **Observer-accessible**: the value can be determined through interaction (a tree's height, a market's price). Exists independent of description, though measurement may change it. Different observers using the same method should agree.
- **Observer-invariant**: all observers agree regardless of method, coordinate system, or reference frame. In physics, the speed of light $c$ and the spacetime interval are invariant under Lorentz transforms. In abstract domains, some properties may be similarly invariant — the number of nodes in a network, the topology of a causal graph — while others are not.

These are not types. A state can be observer-imposed in one context and observer-invariant in another. "Market price" is observer-accessible at any given moment, but the *existence* of a market is observer-invariant (it either has participants or doesn't). The spectrum is about how much the representation depends on who is doing the representing — and that degree is itself an empirical question answered by testing convergence across observers and methods.

### Representation is a computational act

**Building a representation is a computational act.** When a biologist tracks gene expression rather than individual molecular positions, that choice — what to measure, at what grain, in what coordinate system — constructs an $X$. A physicist tracking particle momentum has made different choices. Both have performed computation: selecting a state space, choosing coordinates, and encoding observations into a structured model. The label itself is arbitrary (you could use any word), but the act of labeling is not: it places something in a space of possible values.

Representation is not unique to conscious observers. A DNA codon encodes an amino acid — the codon's structure constrains which protein is built. A crystal lattice encodes its own continuation — the bond geometry constrains the next layer's growth. A flame's temperature profile encodes its combustion dynamics — the heat distribution constrains fuel vaporization rates. In each case, one state's structure constrains another state's trajectory. No intent or consciousness is required. What varies is depth: a crystal encodes passively, DNA encodes and replicates, a neural network encodes and updates, a conscious mind encodes and models its own encoding. Conscious labeling — deliberately assigning an $X$ — is the self-referential case on a spectrum that extends to every scale.

Epimechanics is itself an example. It was originally labeled "The Physics of Metaphysics" — a coordinate choice that placed it in a region of intellectual state space where the dynamics (empirical prediction, formal mechanics) did not apply well. Relabeling it "Epimechanics" was a coordinate transform: the content didn't change, but the representation now sits in a region where the dynamics are more applicable. A framework that emphasizes choosing the right $X$ should eventually apply that principle to its own name.

### What this commits us to

We do not claim that reality is "made of" states. We claim that for any system, you can construct a representation $X$ such that the system's behavior may be described by a trajectory through a state space $S$. The claim is a methodological commitment, not a metaphysical one. Epimechanics requires that representations exist — not that they be unique, not that they be accurate, not that they be metaphysically fundamental, and not that any particular coordinate choice be privileged over another. Like coordinates in physics, some choices of $X$ reveal more structure than others — but the underlying reality exists regardless of how well or poorly we represent it.

---

## 2. Causation Is the Working Primitive

Every concept in Epimechanics — state, force, energy, entity, consciousness, soul — is defined in terms of causal relationships. If you accept that causes produce effects and that systems can be described by representations that evolve over time, the framework's definitions follow.

Taking causation as primitive is a substantive commitment. [Neo-Humeans](https://plato.stanford.edu/entries/causation-regularity/) deny that causation is a mind-independent productive relation. [Russell (1913)](https://doi.org/10.1093/aristotelian/13.1.1) argued that the word "cause" is a relic. [Norton (2003)](https://doi.org/10.1086/392894) pressed related points about determinism.

Epimechanics takes **effective causation** as its working primitive, following the interventionist tradition: [Woodward (*Making Things Happen*, 2003)](https://doi.org/10.1093/0195155270.001.0001) and [Pearl (*Causality*, 2000)](https://doi.org/10.1017/CBO9780511803161) define causes operationally in terms of what happens when you intervene. At scales from molecular biology upward, interventions reliably produce effects, and this regularity is what "force" and "coupling" formalize. Whether effective causation is metaphysically fundamental or emerges from deeper structure is a question Epimechanics inherits but does not need to resolve.

With causation established, a key observation follows: most causal chains run in one direction and stop. A ball rolls downhill and comes to rest. A sound echoes and fades. But some causal chains loop back on themselves — the output of the process feeds back to sustain the process itself. A flame maintains the heat that maintains the combustion. An organism's metabolism maintains the cells that perform metabolism. These self-sustaining causal loops are what distinguish entities that persist from entities that vanish — and formalizing that distinction requires the concept of an entity.

---

## 3. Entities Are Anything with Causal Presence

An **entity**, in Epimechanics, is anything with causal presence ($\rho_{\text{causal}} > 0$) — equivalently, anything representable. A proton is an entity. A fleeting thought is an entity (it fires neurons, occupies cognitive resources). A cloud is an entity. The two formulations are equivalent: if something has causal presence, its effects can be detected and represented; if something can be represented, the act of representing it is a causal interaction. If something has zero causal interaction with anything, it cannot be represented and does not enter the framework's scope. The word is deliberately broad.

Entity-ness is a spectrum, not a binary. Entities differ not in kind but in structure. Two properties matter:

- **Causal density** $\rho_{\text{causal}}$ — how much causal activity is packed within the entity. A cloud has high causal density: enormous molecular interaction, turbulent flow, constant energy exchange. A rock has lower causal density: atomic bonds hold the lattice in a structurally repetitive pattern with less dynamic variation.

- **Auto-causal density** $\rho_{\text{ac}}$ — how much of that causal activity sustains itself. A rock's lattice bonds are self-sustaining: each bond's presence maintains the conditions for neighboring bonds. A cloud's molecular interactions are intense but do not maintain the cloud's structure — wind, temperature gradients, and humidity do. The cloud has high $\rho_{\text{causal}}$ but low $\rho_{\text{ac}}$.

Both quantities are representations — values we assign within a model, not properties we discover independent of a representational framework. Whether $\rho_{\text{ac}}$ is continuous, what measure $d\mu$ is appropriate (how we aggregate causal contributions), and which causal model underwrites the counting are empirical questions resolved domain by domain.

The framework's mechanical apparatus (mass, force, energy) applies to all entities. For entities with very low $\rho_{\text{ac}}$, the quantities are near-zero and carry little predictive content. What makes some entities more persistent and more dynamically self-sustaining than others is the density and structure of their self-sustaining causal loops — and that difference is what the rest of the framework formalizes.

[Part 1.5: Causors](./01_5_causors.md) develops what $\rho_{\text{ac}}$ is made of — the causal bonds, loop structures, and stability basins from which auto-causal density emerges.

---

## 4. Grammar and Vocabulary

Epimechanics provides **grammar** — structural relationships between state, mass, force, energy, coupling, field, temperature, entropy, and free energy. These relationships ($F = \mathcal{M}_{ij}\ddot{X}^j + \dot{\mathcal{M}}_{ij}\dot{X}^j$, Lagrangian mechanics, thermodynamic quantities from many-entity ensembles) are derived from calculus and variational principles. They hold for any representation of any system.

Epimechanics does **not** provide **vocabulary** — what to count, how to define force, what units to use, which operationalization is appropriate for a given domain. The vocabulary is the work of domain sciences: psychology, organizational science, economics, physics, biology, cultural evolution. The framework will only be as rigorous as the domain-specific operationalizations that fill it.

The grammar earns its keep only if:
1. The same structural form works across domains (transfer)
2. It generates predictions that domain-specific theories alone do not make (novelty)

If it merely relabels known concepts in mechanical notation, it adds nothing. The [applications](../applications/index.md) are where this test is applied, and each application section is tagged: **relabeling** (known concept, new label), **structural** (prediction from the grammar), or **novel** (prediction neither domain theory nor physics alone generates).

---

## 5. Epimechanics and Epiphysics

Two related but distinct things:

**Epimechanics** is the *theoretical framework*. The mathematics: state spaces, Lagrangians, coupling tensors, thermodynamic quantities, the Representational Efficiency principle. It says: "when a system IS represented, these structural relationships hold — and as representations gain accuracy (greater observer-independence, better predictive compression), the relationships become more predictively useful." [Parts 1–5](./index.md) develop the theoretical framework.

**Epiphysics** is the *empirical program*. Testing whether Epimechanics' predictions hold in specific domains. Measuring generalized mass, calibrating coupling tensors, verifying phase transition signatures, checking ordinal equivalence across measurement approaches. It says: "do the predictions actually hold?" The [applications](../applications/index.md) carry out the empirical program.

The distinction mirrors physics itself:
- **Classical mechanics** = the mathematical framework (Newton's laws, Lagrangian, Hamiltonian)
- **Physics** = mechanics + experimental verification + the specific constants and phenomena discovered through experiment

Epimechanics provides the equations. Epiphysics provides the measurements. The equations without measurements are pure mathematics. The measurements without equations are raw data. Together they form a science.

---

## 6. The Representational Efficiency Principle

A foundational observation: **all representations have epimechanical structure.** The observation follows from calculus. For any time-varying representation $X(t)$, you can compute $\dot{X}$, $\ddot{X}$, define $p = \mathcal{M}\dot{X}$, and write $F = dp/dt$. The mechanical formalism applies to every representation, including arbitrary or useless ones.

What distinguishes a *well-chosen* representation from a poorly chosen one is not whether it has epimechanical structure (they all have EMech structure) but whether that structure is **predictive at minimal computational cost.** A well-chosen $X$ — one that tracks the system's actual causal structure — yields a Lagrangian with visible symmetries, a coupling tensor that is sparse, and equations of motion that compress the dynamics into few variables. A poorly chosen $X$ yields equations that require tracking everything to predict anything.

The optimal representation minimizes predictive cost:

$$X^* = \underset{X \in \mathcal{R}}{\operatorname{argmin}}\; C(X, \varepsilon)$$

where $C(X, \varepsilon)$ is the computational complexity of predicting $X(t + \Delta t)$ from $X(t)$ to accuracy $\varepsilon$.

**The existence of $X^*$ is already proven** — not by Epimechanics, but by multiple independent results in information theory:

- [Rate-distortion theory (Shannon, 1959)](https://ieeexplore.ieee.org/document/5311476): for any source and distortion level $\varepsilon$, there exists an optimal encoding that minimizes information cost. **Theorem.**
- [Minimum Description Length (Rissanen, 1978)](https://doi.org/10.1214/aos/1176344611): the best model minimizes the sum of model complexity and data misfit, equivalent to Bayesian model selection with a universal prior. **Theorem.**
- [Kolmogorov complexity](https://doi.org/10.1007/978-0-387-49820-1): the shortest program producing the output defines the optimal representation. Its existence is proven; its computation is not (Chaitin's incompleteness).
- [Solomonoff induction](https://doi.org/10.1016/S0019-9958%2864%2990223-2): the prior weighting hypotheses by complexity converges to the true distribution. **Theorem** (convergence guarantee).

These are the same result stated in different mathematical languages. The optimal representation exists and is characterized by maximal compression at a given accuracy. The existence result is not a conjecture — it is established mathematics.

**What IS a conjecture** is the connection to mechanical structure: that $X^*$ necessarily has maximal Lagrangian symmetry, sparse coupling tensor, and minimal state-space dimensionality. The connection is Epimechanics' specific claim — that the information-theoretically optimal representation is also the one with the simplest mechanical form. [Part 5](./05_ontology_and_open_questions.md) develops the formal statement and the sketch of why this might hold (symmetries reduce prediction cost, sparse coupling enables parallel prediction, low dimensionality shrinks the search space). But the connection between information-theoretic optimality and Lagrangian structure is not yet proven. It is the central open problem.

The [renormalization group (Wilson, 1971)](https://doi.org/10.1103/PhysRevB.4.3174), [causal emergence (Hoel et al., 2013)](https://doi.org/10.1073/pnas.1314922110), and the [free energy principle (Friston, 2010)](https://doi.org/10.1038/nrn2787) all provide evidence for this connection from different angles — each shows that the "right" level of description has specific structural properties that reduce predictive cost. But a unified proof connecting rate-distortion optimality to Lagrangian symmetry does not yet exist.

The Representational Efficiency Principle reframes what Epimechanics claims. Epimechanics does not claim that reality "has" mechanical structure. It observes that all representations have epimechanical structure (a mathematical triviality), and proposes — with the support of information-theoretic results but without a complete proof — that representations which track real causal structure have *simple* epimechanical structure. Whether reality is "mechanical" or merely "looks mechanical through well-chosen representations" is a question Epimechanics does not need to answer. The empirical test — epiphysics — is whether the predictions hold.

[Part 5](./05_ontology_and_open_questions.md) develops the formal statement and open questions of this principle.

---

## 7. Antecedents

Epimechanics emerges from a number of antecedents including:

- [Whitehead (*Process and Reality*, 1929)](https://doi.org/10.1017/CBO9781139644037) — process ontology; events, not substances, are fundamental
- [Maturana and Varela (*Autopoiesis and Cognition*, 1980)](https://doi.org/10.1007/978-94-009-8947-4) — autopoiesis; self-producing organization
- [Kauffman (*The Origins of Order*, 1993)](https://doi.org/10.1093/oso/9780195079517.001.0001) — autocatalytic sets; collective self-catalysis
- [Ladyman and Ross (*Every Thing Must Go*, 2007)](https://global.oup.com/academic/product/every-thing-must-go-9780199573097) — ontic structural realism; structure is fundamental
- [Hoffman (*The Case Against Reality*, 2019)](https://wwnorton.com/books/9780393254693) — interface theory of perception; representations are fitness-tuned, not accurate
- [Woodward (*Making Things Happen*, 2003)](https://doi.org/10.1093/0195155270.001.0001) — interventionist causation
- [Pearl (*Causality*, 2000)](https://doi.org/10.1017/CBO9780511803161) — causal calculus; counterfactuals
- [Hoel et al. (2013)](https://doi.org/10.1073/pnas.1314922110) — causal emergence; when macro beats micro
- [Wolfram (2020)](https://arxiv.org/abs/2004.08210) — hypergraph physics; the Ruliad as universal state space
- [Lakoff and Johnson (*Metaphors We Live By*, 1980)](https://press.uchicago.edu/ucp/books/book/chicago/M/bo3637992.html) — conceptual metaphor; structural, not decorative

Epimechanics shares the structuralist intuition with Ladyman/Ross, the process orientation with Whitehead, the self-organization emphasis with Kauffman/Maturana, and the representational skepticism with Hoffman. What it adds is a specific mathematical apparatus — Lagrangian mechanics, coupling tensors, thermodynamic quantities — and the insistence that the apparatus generate testable predictions or be discarded.

---

## 8. The Triviality Objection

Any sufficiently abstract mathematical framework can be "applied" to anything — as [Putnam's model-theoretic argument (1980)](https://doi.org/10.2307/2273415) shows, formal structures can always be mapped onto arbitrary domains. If Epimechanics' equations describe beliefs, markets, and particles, this may be because they are too abstract to say anything specific about any of them.

The antidote is empirical: epiphysics. The framework must generate predictions that domain-specific theories alone do not make, and those predictions must be testable and falsifiable. [Part 5, Section 4](./05_ontology_and_open_questions.md) develops these predictions. The [applications](../applications/index.md) test them. If they hold, the framework has empirical content. If they fail, the structural isomorphism is vacuous. Self-consistency and mathematical parsimony are necessary but not sufficient. The sufficient condition is: do the predictions hold?

---

## 9. What Comes Next

With these foundations in place:

- [Part 1: Generalized Mechanics](./01_generalized_mechanics.md) — the full mechanical apparatus: state, velocity, mass, momentum, force, energy, Lagrangian, coupling, fields, thermodynamics, fluid dynamics.
- [Part 1b: Uncertainty, Coordinates, and Relativity](./01b_uncertainty_coordinates_relativity.md) — how representations transform between coordinate systems; measurement changes the state.
- [Part 1.5: Causors](./01_5_causors.md) — what are entities *made of*? The six candidate causors.
- [Parts 2–5](./index.md) — meta-entities, intelligence/consciousness/agency, time and soul, full ontology.
- [Applications](../applications/index.md) — where epiphysics happens: testing predictions in specific domains.

---

[→ Part 1: Generalized Mechanics](./01_generalized_mechanics.md) | [→ Part 1.5: Causors](./01_5_causors.md)
