---
title: "Research Note: Self-Multiplication as Generative Mechanism"
description: >-
  A proposal that the core dynamics of Epimechanics emerge from a single mechanism —
  states acting on themselves via tensorial self-multiplication T(X)·X — from which
  auto-causal structure, entity boundaries, and the rules-vs-states distinction all follow.
date: 2026-03-20T00:00:00.000Z
draft: true
author:
  name: "Ian Derrington"
contentType: article
series: "Epimechanics"
coverImage:
  url: ./images/self_multiplication.png
  alt: >-
    State acting on itself through recursive tensor operators, visualized as
    nested feedback loops and transformation fields.
tags:
  - Epimechanics
  - Self-multiplication
  - Auto-causal density
  - Entity definition
  - Ruliad
  - Markov dynamics
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## Motivation

Epimechanics currently describes auto-causal density $\rho_{\text{ac}}$ as a quantity measured after the fact — a representation of how much self-sustaining loop structure an entity contains. The Lagrangian, coupling tensors, and entity boundaries are structural postulates validated domain by domain.

A question sits beneath all of these: **what mechanism produces auto-causal structure in the first place?** And a related question from [Wolfram's Ruliad (2020)](https://writings.stephenwolfram.com/2021/11/the-concept-of-the-ruliad/): if the Ruliad is the entangled limit of all possible rules applied to all possible states, where do the rules come from? Why these rules and not others?

The proposal here is that both questions dissolve under a single mechanism: **self-multiplication** — the state acts on itself to produce its own evolution. Rules are not separate from states. They are states viewed as operators.

---

## The Mechanism

### Self-influential dynamics

Consider a system whose state $X$ evolves by acting on itself through a state-dependent transition tensor $\mathbf{T}$:

$$X_{t+1} = \mathbf{T}(X_t) \cdot X_t$$

or in continuous form:

$$\dot{X} = \mathbf{T}(X) \cdot X$$

The key departure from standard Markov dynamics ($X_{t+1} = M \cdot X_t$ with fixed $M$) is that the transition operator is not external — it is derived from the state itself. The system writes its own rules.

### Taylor expansion of the transition tensor

If $\mathbf{T}$ admits a Taylor expansion in the state:

$$\mathbf{T}(X) = T_0 + T_1 X + T_2 X^2 + \cdots$$

then the dynamics become:

$$\dot{X} = T_0 X + T_1 X^2 + T_2 X^3 + \cdots$$

| Order | Term | Character |
|-------|------|-----------|
| Linear | $T_0 X$ | Standard Markov evolution — external rules, no self-influence |
| Quadratic | $T_1 X^2$ | First self-influence — the state begins to write its own transition |
| Cubic | $T_2 X^3$ | Deeper self-reference — the state's influence on its own rules is itself state-dependent |
| Higher | $T_n X^{n+1}$ | Increasingly recursive self-modification |

The linear term is the regime where conventional dynamical systems live. Self-influence begins at the quadratic term. The richer the self-reference, the higher the effective order.

### Tensor rank and loop depth

The rank of $\mathbf{T}$ determines the depth of self-influence available at each step:
- Rank 2 (matrix): bilinear self-influence — one level of "the state determines the rules"
- Rank 3: the state determines how the state determines the rules
- Rank $k$: $k-1$ levels of recursive self-modification

This may connect to **loop order** in [Part 0.5](../theory/01_5_causors.md): the number of levels of self-referential causal structure within an entity. A rank-$k$ transition tensor permits loop structures of depth $k-1$.

---

## Entity Decomposition

### The partition

Decompose the full state into an entity $Y$ and everything else:

$$X = X_{\text{isY}} + X_{\text{notY}}$$

Under self-multiplication, the dynamics expand into four terms:

$$\dot{X} = \mathbf{T}(X_{\text{isY}} + X_{\text{notY}}) \cdot (X_{\text{isY}} + X_{\text{notY}})$$

At leading order (bilinear in the decomposition):

| Term | Expression | Meaning |
|------|-----------|---------|
| Self-action | $\mathbf{T}(X_{\text{isY}}) \cdot X_{\text{isY}}$ | Entity acting on itself |
| Outward coupling | $\mathbf{T}(X_{\text{isY}}) \cdot X_{\text{notY}}$ | Entity acting on environment |
| Inward coupling | $\mathbf{T}(X_{\text{notY}}) \cdot X_{\text{isY}}$ | Environment acting on entity |
| Environment self-action | $\mathbf{T}(X_{\text{notY}}) \cdot X_{\text{notY}}$ | Environment acting on itself |

The cross-terms (inward and outward coupling) represent how tightly the entity is entangled with its surroundings.

### Entity definition via minimization

**Proposal.** An entity is the partition of $X$ that minimizes the environment's influence on the entity's own state change:

$$Y^* = \underset{\text{partitions}}{\operatorname{argmin}} \; \frac{\|\mathbf{T}(X_{\text{notY}}) \cdot X_{\text{isY}}\|^2}{\|\mathbf{T}(X_{\text{isY}}) \cdot X_{\text{isY}}\|^2}$$

The numerator is the cross-perturbation — how much the environment changes the entity. The denominator is the self-action — how much the entity sustains itself. The entity is the subsystem that is **maximally self-determined relative to its own dynamics.**

Several candidate criteria deserve comparison:

| Criterion | Minimizes | Character |
|-----------|-----------|-----------|
| Cross-perturbation | $\|\mathbf{T}(X_{\text{notY}}) \cdot X_{\text{isY}}\|^2$ | Entity is what the environment cannot easily change |
| Self-determination ratio | cross / self | Entity is what is most governed by its own dynamics |
| Total decoupling | both cross-terms | Entity is what is most independent of everything else |

The ratio form is proposed as primary because it captures the core idea: an entity is a subsystem whose evolution is dominated by its own self-action rather than by external perturbation. A flame qualifies not because the environment has zero effect on it, but because its self-sustaining combustion dominates over environmental perturbation under normal conditions.

### Entities as eigenvectors of self-multiplication

The minimization criterion has a sharper formulation. An entity that perfectly sustains itself under self-multiplication satisfies:

$$\mathbf{T}(X_{\text{isY}}) \cdot X_{\text{isY}} = \lambda \, X_{\text{isY}}$$

The entity is an **eigenvector of its own self-multiplication operator.** It acts on itself and gets back a scaled version of itself. The eigenvalue $\lambda$ encodes persistence directly:

| $|\lambda|$ | Behavior |
|---|---|
| $> 1$ | Growing — entity amplifies itself (expansion phase, early autocatalysis) |
| $= 1$ | Persistent — entity sustains itself exactly (homeostasis, stable orbit) |
| $< 1$ | Decaying — entity dissipates (aging, loss of coherence) |
| $= 0$ | Transient — no self-sustenance (noise, passive summary) |

Entity decomposition is spectral decomposition. Finding the entities in a system is finding the eigenvectors of the self-multiplication operator — the components of the state that act on themselves and persist.

**The "almost" caveat.** Standard eigendecomposition assumes a fixed linear operator. Here $\mathbf{T}$ depends on $X$, so the eigenvectors shift as the state evolves. A true entity is not merely an eigenvector at one moment — it is a state component that *remains* an eigenvector as the system evolves. The entity tracks a **nonlinear fixed-point eigenvector** — a component whose eigenrelation is self-consistently maintained by the dynamics.

This connects to established mathematical programs:

- **Koopman operator theory** ([Koopman, 1931](https://doi.org/10.1073/pnas.17.5.315); [Mezić, 2005](https://doi.org/10.1007/s11071-005-2824-x)) lifts nonlinear dynamics to a linear operator on observables. Eigendecomposition of the Koopman operator yields the invariant modes of the dynamics — the components that evolve independently. Entities, in the self-multiplication formalism, are the Koopman eigenmodes of the self-multiplication map.
- **Dynamic Mode Decomposition** ([Schmid, 2010](https://doi.org/10.1017/S0022112010001217)) is the data-driven approximation of Koopman spectral decomposition. It finds the dominant eigenmodes from time-series data. If entities are eigenvectors, DMD is an empirical entity-finder — an operational tool for identifying self-sustaining structures from observation.
- **Transfer operator spectral theory** — the invariant measures of a dynamical system are eigenfunctions of the Perron-Frobenius operator. Persistent entities correspond to the dominant eigenspaces.

The entity-finding problem thus reduces to: **find the spectral decomposition of the self-multiplication operator,** with the caveat that the operator is state-dependent and the decomposition must be self-consistent.

### Relationship to auto-causal density

Under the eigenvector formulation, $\rho_{\text{ac}}$ becomes the persistence eigenvalue:

$$\rho_{\text{ac}}(Y) \propto |\lambda_Y|$$

where $\lambda_Y$ is the eigenvalue associated with entity $Y$ under self-multiplication. Auto-causal density is not a separately measured quantity — it is the magnitude of the eigenvalue in the spectral decomposition of the state.

High $\rho_{\text{ac}}$ means $|\lambda| \approx 1$ or above: the entity strongly determines its own evolution. Low $\rho_{\text{ac}}$ means $|\lambda| \approx 0$: the entity's dynamics are dominated by external influence or noise. The current formalism describes $\rho_{\text{ac}}$ as a representational quantity assigned to an entity. The self-multiplication formalism derives it from the spectral structure of the dynamics. Both are representations — but the self-multiplication version is generative: it says *why* $\rho_{\text{ac}}$ takes the value it does, not just what value it takes.

---

## Dissolution of the Ruliad Question

### Rules as states viewed as operators

In the standard framing (including Wolfram's), rules and states are categorically distinct. The Ruliad is the limit object that contains all rules applied to all states. The question "why these rules?" requires an answer from outside the system.

Under self-multiplication, the distinction dissolves:
- **States** are the values $X$
- **Rules** are the transition tensor $\mathbf{T}(X)$
- But $\mathbf{T}$ is derived from $X$ — so rules *are* states, viewed as operators on themselves

The question "where do rules come from?" becomes "where do states come from?" — and the answer is: from the previous self-multiplication. The system is self-grounding.

### Rule selection as attractor selection

Not all self-multiplications are stable. Most initial states, multiplied by themselves, diverge or collapse. The structures that persist are **fixed points or attractors** of the self-multiplication map:

$$X^* = \mathbf{T}(X^*) \cdot X^*$$

These attractors are the "selected rules." Rule selection is not imposed from outside — it is the self-multiplication dynamics filtering for self-consistency. The Ruliad, in this view, is not a pre-existing space of all rules but the **set of self-consistent attractors** of tensorial self-multiplication.

This reframes the Ruliad as an emergent structure rather than a foundational one. The rules that persist are those whose states, acting as operators on themselves, reproduce themselves. All others are transient.

### Conservation laws as survival conditions

The eigenvalue $\lambda$ determines what survives. Consider the space of all possible self-multiplications — a "multi-multiverse" of all possible dynamics:

- $|\lambda| > 1$ for all components → unbounded growth → divergence, no bounded structure
- $|\lambda| < 1$ for all components → universal decay → collapse to zero, no structure
- $|\lambda| = 1$ for some components → persistence → bounded structure, entities, observers

Only dynamics with $|\lambda| = 1$ components produce structures that neither diverge nor collapse. The $|\lambda| = 1$ condition is a **conservation law**: the entity preserves its own magnitude under self-multiplication. Conservation is not an axiom imposed from outside. It is the survival condition in the space of all possible dynamics — the knife edge between nothing and everything.

This reframes Noether's theorem. Standard physics derives conservation laws from symmetries: if the Lagrangian is invariant under a transformation, a quantity is conserved. The self-multiplication formulation reverses the explanatory direction:

1. In the space of all possible self-multiplications, only those with $|\lambda| = 1$ eigenvalues produce persistent structure
2. Persistent structure requires that certain quantities remain invariant under the dynamics
3. Invariance under the dynamics *is* symmetry
4. Symmetry → conservation (Noether)

Conservation laws are not features of the universe that happen to hold. They are the **selection criterion** that filters the space of all possible dynamics down to those that contain anything at all. A universe without conservation laws contains either nothing or everything — neither of which supports structure, observers, or the question "why these laws?"

The anthropic principle follows as a consequence, not a separate philosophical observation: observers exist only in dynamics with $|\lambda| = 1$ components, because only those dynamics produce persistent entities capable of observation.

---

## Derivation Chain: From Self-Multiplication to Full Mechanics

The self-multiplication eigenvector formulation provides a derivation path — not yet proven at every step, but structurally complete — from a single mechanism to the full Epimechanics apparatus:

### Entities from eigendecomposition

Established above. Entities are eigenvectors of $\mathbf{T}(X)$. The eigenvalue $\lambda$ determines persistence. The spectral decomposition of the state *is* the entity decomposition.

### Conservation from the $|\lambda| = 1$ condition

The persistent eigenvectors satisfy $\|\mathbf{T}(X_{\text{isY}}) \cdot X_{\text{isY}}\| = \|X_{\text{isY}}\|$. The entity's magnitude is conserved under self-multiplication. For a system with multiple persistent entities, this yields multiple conservation laws — one per persistent eigenvector.

### Symmetry from self-consistency

The eigenrelation $\mathbf{T}(X_{\text{isY}}) \cdot X_{\text{isY}} = \lambda X_{\text{isY}}$ must hold not just at one moment but as the system evolves. The operator $\mathbf{T}$ must be *invariant* along the entity's trajectory in the directions that preserve the eigenrelation. These invariances are the symmetries of the dynamics — and they are determined by the self-consistency condition, not imposed from outside.

### Mass as eigenspace rigidity

When a perturbation $\delta X$ pushes a state component away from its eigenspace, the self-multiplication dynamics may push it back (if the eigenvector is an attractor in eigenvector space) or fail to (if it is unstable). The strength of the restoring tendency — how strongly the eigenspace resists perturbation — is **generalized mass**:

$$\mathcal{M}_Y \propto \left\|\frac{\partial}{\partial (\delta X)} [\mathbf{T}(X_{\text{isY}} + \delta X) \cdot (X_{\text{isY}} + \delta X) - \lambda (X_{\text{isY}} + \delta X)]\right\|^{-1}$$

High mass means the eigenspace is rigid — perturbations are strongly corrected. Low mass means the eigenspace is loose — perturbations persist. A proton has high mass (extremely rigid eigenspace, persists for $>10^{34}$ years). A fleeting thought has low mass (eigenspace easily disrupted by the next stimulus).

### Force as eigenspace perturbation

A **force** is any influence that moves a state component out of its eigenspace. Under the entity decomposition, the cross-terms $\mathbf{T}(X_{\text{notY}}) \cdot X_{\text{isY}}$ are the forces acting on entity $Y$ — the environment's effect on the entity's state. Force is the rate at which the environment perturbs the entity away from self-consistent self-multiplication.

### Energy as perturbation capacity

**Energy** is the capacity to perturb eigenstates. Kinetic energy is the perturbation currently being applied (the entity is moving through state space, away from or between eigenspaces). Potential energy is stored perturbation capacity — the entity sits in a configuration from which the dynamics will drive it toward a different eigenspace.

### Coupling as eigenspace mixing

The **coupling tensor** $T^i{}_j$ encodes how one entity's self-multiplication interferes with another's. Off-diagonal elements in the eigenbasis mix eigenspaces: entity $A$'s self-action perturbs entity $B$'s eigenrelation. Strong coupling means the entities cannot be treated as independent eigenvectors — their eigenspaces are entangled.

### Lagrangian as variational characterization of persistence

**Conjecture (strengthened).** The persistent self-multiplication dynamics — those with $|\lambda| = 1$ eigenvectors that are self-consistently maintained — satisfy a variational principle. The Lagrangian $L = K - V$ emerges as the functional whose stationary paths are the self-consistent eigentrajectories:

- $K$ encodes the cost of the entity's motion through eigenspace
- $V$ encodes the cost of deviating from self-consistency
- $\delta \int L \, dt = 0$ selects the trajectories along which the eigenrelation is maintained

The Lagrangian, in this view, is not a postulate but the mathematical characterization of "the entity persists."

### Thermodynamics from eigenvalue statistics

When many entities coexist — many eigenvectors at various $|\lambda|$ — the statistical properties of the eigenvalue spectrum yield thermodynamic quantities:

- **Temperature** $\mathcal{T}$: mean kinetic energy of eigenvectors — how vigorously entities are being perturbed away from their eigenspaces
- **Entropy** $S_{\text{ent}}$: the number of accessible eigenconfigurations — how many ways the entities can be arranged in eigenspace
- **Free energy** $\mathcal{F} = E - \mathcal{T}S_{\text{ent}}$: the capacity for directed eigenspace rearrangement — how much structured perturbation is available after accounting for thermal noise
- **Phase transitions**: occur when the eigenvalue spectrum reorganizes — when many $|\lambda|$ values cross 1 simultaneously, entities appear or disappear en masse

---

## Connection to Existing Formalism

### From self-multiplication to the Lagrangian

If the self-multiplication attractors satisfy a variational principle — the self-consistent fixed points are those that extremize some functional — then the Lagrangian emerges as the variational characterization of self-multiplication stability.

**Conjecture.** For smooth self-multiplication dynamics on Riemannian state spaces, the stable attractors satisfy the Euler-Lagrange equations derived from a Lagrangian $L = K - V$, where:
- $K$ is the kinetic energy of self-action: $K \propto \|\mathbf{T}(X) \cdot X\|^2$
- $V$ is the potential cost of deviating from self-consistency

This would connect the self-multiplication mechanism to Epimechanics' strongest structural postulate. The Lagrangian would not be a postulate but a consequence of self-multiplication stability.

**Status:** Unproven. The [rate-distortion → Lagrangian note](./rate_distortion_lagrangian.md) approaches a related question from the information-theoretic side. The two programs may converge.

### From entity minimization to Markov blankets

The minimization criterion proposed here — find the partition that minimizes cross-perturbation — is structurally parallel to [Friston's Markov blanket formalism (2013)](https://doi.org/10.1098/rsif.2013.0475). A Markov blanket partitions a system into internal states, external states, and blanket states such that internal and external are conditionally independent given the blanket.

The self-multiplication version differs in that:
- The partition is defined dynamically (minimize cross-perturbation under self-multiplication) rather than statistically (conditional independence)
- The entity boundary emerges from the dynamics rather than being imposed by a graphical model
- The tensor rank determines the depth of self-reference, which has no direct analogue in the Markov blanket formalism

Whether the two converge for ergodic systems — whether the dynamical minimization yields the same boundaries as the statistical one — is an open question worth pursuing.

### From Taylor expansion to perturbation theory

The Taylor expansion $\dot{X} = T_0 X + T_1 X^2 + T_2 X^3 + \cdots$ is a perturbative hierarchy. In domains where self-influence is weak (the quadratic and higher terms are small relative to the linear term), the system is well-approximated by standard Markov dynamics. The self-multiplication structure becomes visible only when the nonlinear terms matter — which is precisely the regime where auto-causal density is high.

This suggests a diagnostic: if the linear Markov approximation fails and the failure is systematic (not noise), the system may have significant self-multiplication structure. The failure mode of the linear model points toward the entity boundaries.

### Information as eigenvector pattern

Epimechanics currently uses "information" in several inherited senses — Shannon entropy, algorithmic complexity, Landauer's thermodynamic cost, "informational coupling" in Part 1c — without defining it from within the framework. The self-multiplication formalism provides a native definition:

**Definition.** In a self-multiplication system $\dot{X} = \mathbf{T}(X) \cdot X$, the **information content** of an entity is the eigenvector pattern — *what* persists under self-multiplication. The eigenvalue $|\lambda|$ determines *whether* something persists; the eigenvector determines *what* persists. That "what" is the information.

More precisely: two entities carry the same information if their eigenvector patterns are related by a coordinate transform that preserves the eigenrelation. The information is the equivalence class of eigenvectors under coordinate change — the substrate-independent pattern that any physical realization maintaining the eigenrelation must share.

This connects the inherited definitions:
- **Shannon information** measures how many distinguishable eigenvector patterns a channel can transmit — the logarithm of the number of distinguishable $|\lambda| = 1$ modes
- **Algorithmic complexity** measures the shortest description of the eigenvector pattern — the compressed specification of what persists
- **Landauer's cost** is the thermodynamic price of destroying an eigenvector pattern — erasing a $|\lambda| = 1$ mode requires dissipating the energy that maintained the eigenrelation
- **Informational coupling** ([Part 1c](../theory/01c_thermodynamic_emergence_of_life.md)) is coupling between eigenvector patterns of different entities — one entity's persistence pattern influencing another's

### Connection to Constructor Theory

[Constructor Theory (Deutsch, 2013)](https://doi.org/10.1007/s11229-013-0279-z) and its extension to information ([Deutsch & Marletto, 2015](https://doi.org/10.1098/rspa.2014.0540)) reframes physics in terms of which transformations are possible and which are impossible, rather than in terms of trajectories. A **constructor** is an entity that causes a transformation and retains the ability to cause it again — it is not consumed by the task.

The self-multiplication framework maps onto Constructor Theory at every structural level:

| Constructor Theory | Self-Multiplication Framework |
|---|---|
| **Constructor**: causes a transformation, retains ability to repeat | **$|\lambda| = 1$ eigenvector**: acts on itself (causes transformation), persists (retains ability) |
| **Task**: an input/output pair that a constructor can perform | **Cross-term**: $\mathbf{T}(X_{\text{isY}}) \cdot X_{\text{notY}}$ — the entity's effect on its environment |
| **Information**: a set of states that are distinguishable and copyable | **Eigenvector pattern**: the substrate-independent pattern that can be instantiated in different physical realizations |
| **Possible transformation**: one that some constructor can perform | **$|\lambda| \geq 1$**: a self-multiplication that can be sustained or amplified |
| **Impossible transformation**: one that no constructor can perform | **$|\lambda| < 1$ with no $|\lambda| \geq 1$ pathway**: a state that cannot sustain itself and has no route to persistence |
| **Conservation law**: a constraint on which transformations are possible | **$|\lambda| = 1$ condition**: the survival criterion that filters all dynamics |

The key alignment: Constructor Theory defines information substrate-independently — what matters is the *pattern* of distinguishable, copyable states, not the physical medium. The self-multiplication framework arrives at the same conclusion from the dynamical side: information is the eigenvector pattern, and the pattern is defined by the eigenrelation $\mathbf{T}(X) \cdot X = \lambda X$, which is substrate-independent. Any physical system that maintains the eigenrelation carries the same information.

**Where the frameworks diverge.** Constructor Theory is formulated in terms of possible/impossible distinctions and does not specify dynamics. The self-multiplication framework is inherently dynamical — it says not just which transformations are possible but *how* they occur (through self-multiplication) and *why* some persist (eigenvalue selection). Constructor Theory is the statics; self-multiplication may provide the dynamics.

**A potential synthesis.** Constructor Theory's "constructor" is a persistent eigenvector of self-multiplication. The "laws of physics" in Constructor Theory — the principles that determine which transformations are possible — are the eigenvalue spectrum of the universal self-multiplication tensor. The counterfactual structure of Constructor Theory (possible vs. impossible) maps onto the spectral structure of self-multiplication ($|\lambda| \geq 1$ vs. $|\lambda| < 1$). If this mapping is exact, Constructor Theory and the self-multiplication framework are dual descriptions: Constructor Theory describes the same structure from the transformation side (what can happen), while self-multiplication describes it from the dynamical side (what does happen, and why it persists).

---

## Verification in Simple Systems

The self-multiplication framework makes concrete predictions in systems simple enough to verify directly.

### Conway's Game of Life

The Game of Life is a cellular automaton where each cell's next state is determined by its current state and its neighbors' states. The update rule is fixed and local — but the *emergent structures* exhibit precisely the eigenvalue spectrum the framework predicts:

| Structure | $|\lambda|$ | Character |
|-----------|------------|-----------|
| Still lifes (block, beehive, loaf) | $= 1$ (fixed point) | Self-consistent eigenvectors — they act on themselves via the GoL rule and reproduce exactly |
| Oscillators (blinker, pulsar, pentadecathlon) | $= 1$ (periodic: $\lambda^n = 1$) | Periodic eigenvectors — the structure returns to itself after $n$ steps |
| Gliders, spaceships | $= 1$ (translated) | Eigenvectors with spatial phase — magnitude preserved, position shifts |
| Exploding patterns (R-pentomino initially) | $> 1$ locally | Transient growth phase before settling into $|\lambda| = 1$ fragments |
| Dying patterns | $< 1$ | Decay to empty — no self-sustaining structure |

The "entities" of the Game of Life — the structures that persist and that GoL researchers name and study — are exactly the $|\lambda| = 1$ eigenmodes. The framework does not add new predictions here (GoL is fully computable), but it provides the correct *classification*: the vocabulary of GoL (still life, oscillator, spaceship) maps onto the eigenvalue spectrum (fixed point, periodic orbit, translated eigenmode).

**A testable refinement:** the entity decomposition via cross-perturbation minimization should recover the standard GoL structures when applied to a random GoL state. Take a large GoL board, apply spectral decomposition (e.g., DMD on successive frames), and check whether the dominant modes correspond to the known persistent structures. This is a concrete computational experiment.

### The logistic map

The logistic map $x_{n+1} = r x_n (1 - x_n)$ is a minimal self-multiplication system: $T(x) = r(1-x)$, so $x_{n+1} = T(x_n) \cdot x_n$.

- For $r < 1$: $|\lambda| < 1$ everywhere → collapse to $x = 0$ (nothing)
- For $1 < r < 3$: stable fixed point at $x^* = 1 - 1/r$ where $|\lambda| = 1$ (persistence)
- For $3 < r < 3.57$: period-doubling cascade — the eigenstructure fragments into periodic orbits
- For $r > 3.57$: chaos — but within the chaos, periodic windows where $|\lambda| = 1$ orbits reappear
- For $r > 4$: $|\lambda| > 1$ for most initial conditions → divergence (everything escapes to $-\infty$)

The logistic map displays the full nothing → something → everything spectrum as $r$ increases, governed entirely by the eigenvalue condition. The "entities" (stable fixed points and periodic orbits) exist only in the $|\lambda| = 1$ regime.

### Cellular automata and the Ruliad

The Ruliad contains all possible cellular automaton rules. The self-multiplication framework predicts that observers — persistent, self-consistent structures — exist only in rules that produce $|\lambda| = 1$ eigenmodes. [Wolfram's classification of elementary cellular automata](https://www.wolframscience.com/nks/) into four classes maps onto the eigenvalue spectrum:

| Wolfram class | Eigenvalue spectrum | Character |
|---------------|-------------------|-----------|
| Class 1 (uniform) | $|\lambda| < 1$ for all modes | Everything decays — collapse to homogeneity |
| Class 2 (periodic) | Discrete $|\lambda| = 1$ modes | Persistent local structures — still lifes and oscillators |
| Class 3 (chaotic) | $|\lambda| > 1$ for many modes | Unbounded growth of complexity — no stable entities |
| Class 4 (complex, e.g., Rule 110) | Mixed: $|\lambda| = 1$ modes embedded in $|\lambda| \neq 1$ background | Persistent structures (spaceships, gliders) coexisting with transient dynamics — the regime where computation and entity-hood emerge |

Class 4 — the regime Wolfram identifies as computationally universal — is precisely the regime where the eigenvalue spectrum has the right mix: enough $|\lambda| = 1$ modes to support persistent entities, enough $|\lambda| \neq 1$ modes to allow change and interaction. The Ruliad contains all classes; observers inhabit the Class 4 subspace.

---

## Self-Multiplication and Transformer Architectures

### Self-attention as $\mathbf{T}(X) \cdot X$

The transformer's self-attention mechanism is a concrete instantiation of tensorial self-multiplication. In a single attention head:

$$\text{Attention}(X) = \text{softmax}\!\left(\frac{X W_Q (X W_K)^T}{\sqrt{d_k}}\right) X W_V$$

The input $X$ generates the query and key matrices, which produce the attention weights (the operator), which act on $X$ projected through $W_V$ (the state). The structure is:

$$\text{output} = \mathbf{T}(X) \cdot X$$

where $\mathbf{T}(X) = \text{softmax}(X W_Q W_K^T X^T / \sqrt{d_k}) \cdot W_V$ is the state-dependent transition operator. The state writes its own rules, then applies them to itself. Self-attention is self-multiplication.

### Residual connections as conservation enforcement

The residual stream $X_{\ell+1} = X_\ell + f(X_\ell)$ in a transformer enforces $|\lambda| \approx 1$. Without the skip connection, the output of each layer could diverge or collapse. The residual connection adds an identity component to the transition:

$$X_{\ell+1} = (I + \Delta\mathbf{T}(X_\ell)) \cdot X_\ell$$

The eigenvalues of $I + \Delta\mathbf{T}$ are $1 + \Delta\lambda$, clustered near 1. The residual connection is a conservation law — it preserves the magnitude of the state across layers. Layer normalization further enforces $\|X\| = \text{const}$, an explicit conservation constraint.

This is not a metaphor. The architectural choices that make transformers work — residual connections, layer norm, careful initialization — are engineering implementations of the $|\lambda| = 1$ persistence condition. Architectures that violate it (no skip connections, no normalization) are known to be difficult to train — they diverge or collapse, exactly as the framework predicts.

### Features as eigenvectors

If self-attention is self-multiplication, then the features a transformer learns should be the persistent eigenmodes of the data's self-multiplication structure — the components of the representation that, when they generate their own attention weights, sustain themselves across layers.

This connects to **mechanistic interpretability** ([Elhage et al., 2022](https://transformer-circuits.pub/2022/toy_model/index.html); [Bricken et al., 2023](https://transformer-circuits.pub/2023/monosemantic-features/index.html)). The "features" found in transformer residual streams — monosemantic neurons, superposition directions — may correspond to the eigenvectors of the self-attention operator. Features that are "clean" (monosemantic, interpretable) may be those with $|\lambda| \approx 1$ across many contexts — they persist because they are eigenvectors of their own self-attention.

**Testable prediction:** apply Dynamic Mode Decomposition to the residual stream across layers. The dominant DMD modes should correspond to the interpretable features identified by mechanistic interpretability methods (sparse autoencoders, probing). If they do, the self-multiplication framework provides a principled *reason* why those features exist: they are the persistent eigenmodes of the transformer's self-multiplication dynamics.

### Implications for representation learning

The Representational Efficiency Principle ([Part 0, Section 6](../theory/00_prelude.md)) states that the optimal representation $X^*$ minimizes predictive cost. The self-multiplication framework adds structural content to this claim:

**The optimal representation is the one whose eigenvectors under self-multiplication are maximally persistent ($|\lambda| \approx 1$) and maximally decoupled (minimal cross-perturbation).**

In ML terms:
- **Good representations** have features that are eigenvectors of the data's self-structure — they sustain themselves under the data-generating process
- **Poor representations** have features that are mixtures of eigenvectors — they require cross-terms to maintain, which means they are fragile and context-dependent
- **Transfer learning works** when the eigenvectors are shared across domains — when the same persistent structures appear in different data distributions
- **No Free Lunch** is preserved: the eigenvectors are domain-dependent (no universal basis), but the *structural property* that good representations have (eigendecomposition of self-multiplication) is universal

This suggests a practical direction: instead of training representations end-to-end and hoping they discover good eigenvectors, **constrain the representation to be an eigendecomposition of the data's self-multiplication structure.** Concretely:

1. Estimate $\mathbf{T}(X)$ from data (via DMD, Koopman approximation, or learned attention)
2. Compute or approximate the eigendecomposition
3. Use the eigenvectors as the representation basis
4. Predict in eigenvector coordinates, where dynamics are diagonalized

This would not be computationally optimal for any single task (No Free Lunch), but it would be **representationally valid across tasks** — the eigenvectors track the persistent structures of the data regardless of what prediction is being made. The trade-off between computational efficiency and representational universality is itself a concrete, measurable quantity.

### The transformer as an approximate Koopman solver

A suggestive reframing: a transformer may be an approximate Koopman operator solver. The Koopman operator lifts nonlinear dynamics to a linear operator on observables. Its eigendecomposition yields the invariant modes of the dynamics — exactly what the self-multiplication framework calls entities.

Self-attention computes a state-dependent linear operator (the attention weights) and applies it to the state. Across many layers, this iteratively approximates the dominant eigenstructure. The transformer does not "learn features" in the traditional sense — it **converges on the persistent eigenmodes of the data's self-multiplication dynamics.** The features are not arbitrary learned representations but approximations of the Koopman eigenfunctions of the underlying data-generating process.

If this reframing is correct, it predicts:
- Larger transformers converge on more eigenmodes (more "entities" in the data)
- Scaling laws reflect the eigenvalue spectrum of the data — performance improves as each new eigenmode is captured, with diminishing returns as the spectrum decays
- The residual stream across layers traces a trajectory through eigenspace, not an arbitrary computation

These predictions are testable with current mechanistic interpretability tools.

---

## What This Note Does Not Resolve

1. **Formal specification of $\mathbf{T}(X)$.** What tensor structure does $\mathbf{T}$ have? Is it symmetric? What constraints does self-consistency impose on its form? The proposal is stated at the level of mechanism, not at the level of a specific mathematical object.

2. **The Lagrangian derivation.** The conjecture that stable self-multiplication attractors satisfy Lagrangian dynamics is stated but not proven. This is the central open problem.

3. **Computational tractability.** The minimization over all possible partitions is combinatorially hard in general. The eigenvector formulation helps — spectral decomposition (Koopman, DMD) provides practical approximation schemes — but the state-dependence of $\mathbf{T}$ means the decomposition must be recomputed or tracked as the system evolves.

4. **Self-consistency of the eigendecomposition.** The eigenvectors of $\mathbf{T}(X)$ depend on $X$, which depends on the eigenvectors. A true entity must be an eigenvector of the operator it generates — a fixed point in eigenvector space. Formalizing this self-consistent eigenvalue problem and proving existence/uniqueness of solutions is open.

5. **Empirical signature.** What measurable difference does the self-multiplication formulation make? If it is equivalent to the current Epimechanics formalism at the level of predictions, it is a reformulation, not a new theory. It becomes a new theory only if it predicts something the current formalism does not — for instance, constraints on $\rho_{\text{ac}}$ that follow from the self-consistency condition but are not derivable from the current postulates.

6. **Relationship to tensor rank and loop order.** The proposed connection between tensor rank and loop depth ([Part 0.5](../theory/01_5_causors.md)) is suggestive but not formalized.

7. **The $|\lambda| = 1$ condition and actual conservation laws.** The argument that conservation laws are survival conditions in the space of all dynamics is compelling at the structural level. Whether the specific conservation laws of physics (energy, momentum, charge, baryon number) can be derived as the $|\lambda| = 1$ eigenvectors of a particular self-multiplication tensor is a concrete open problem. If achievable, it would connect Epimechanics to fundamental physics in a testable way.

8. **The derivation chain.** Each step in the derivation from self-multiplication to thermodynamics (Section "Derivation Chain") is stated at the level of structural correspondence. Turning each step into a theorem — particularly the Lagrangian step — is where the mathematical work remains.

---

## Testable Predictions and Numerical Experiments

The framework is only as good as its empirical consequences. Below are concrete experiments — ordered from simplest to most ambitious — with specific predicted outcomes. Each is designed so that failure is informative: if the prediction is wrong, it identifies which part of the framework breaks.

### Experiment 1: DMD entity recovery in Game of Life

**Setup.** Initialize a large ($256 \times 256$) Game of Life board with random density ~0.37 (near the critical density for complex behavior). Run for 500 steps. Flatten each frame into a vector. Apply DMD to the sequence of frames.

**Prediction.** The dominant DMD modes (those with $|\lambda| \approx 1$) should correspond spatially to the known persistent structures: still lifes, oscillators, gliders. Modes with $|\lambda| < 1$ should correspond to the transient debris that decays in the first ~100 steps.

**Quantitative test.** Compute the spatial overlap between the top-$k$ DMD modes and a library of known GoL structures (block, beehive, blinker, glider, etc.). The overlap should be significantly higher than chance (random mode shapes of the same dimension).

**What failure means.** If DMD modes do not recover known structures, the issue is likely that GoL's update rule is too nonlinear for a single linear DMD fit. Extended DMD or kernel DMD may be required — which itself tests whether the "almost" in "almost an eigendecomposition" requires Koopman lifting.

**Difficulty:** Low. Implementable in a weekend with standard Python libraries (pyDMD, numpy).

### Experiment 2: Eigenvalue spectrum of the logistic map

**Setup.** For $r \in [0.5, 4.0]$ in steps of 0.01, iterate the logistic map $x_{n+1} = r x_n(1-x_n)$ for 10,000 steps (discard first 1,000 as transient). At each $r$, compute $T(x) = r(1-x)$ at the attractor points and record $|T(x^*)|$ — the local eigenvalue at the fixed point or periodic orbit.

**Prediction.** The eigenvalue $|T(x^*)| = |r(1 - 2x^*)|$ should equal exactly 1 at bifurcation points and be $< 1$ within stable windows. The bifurcation diagram and the eigenvalue diagram should be structurally identical — the bifurcation diagram *is* the eigenvalue spectrum.

**Novel prediction.** Within chaotic windows ($r > 3.57$), the density of $|\lambda| \approx 1$ orbits (periodic windows) should correlate with the measure of "structured" behavior. The framework predicts that the total measure of $|\lambda| = 1$ regions determines the fraction of initial conditions that produce persistent entities — a quantitative version of "something exists between nothing and everything."

**What failure means.** The logistic map is well-understood; failure here would indicate a fundamental error in mapping the framework to self-multiplication.

**Difficulty:** Trivial. Verifiable analytically and numerically in an afternoon.

### Experiment 3: DMD on transformer residual streams

**Setup.** Take a pre-trained transformer (e.g., GPT-2 small, 12 layers). For a corpus of input sequences, extract the residual stream at each layer: $X_0, X_1, \ldots, X_{12}$. Treat the layer index as "time" and apply DMD to the sequence of residual states.

**Prediction A (eigenvalue spectrum).** The dominant eigenvalues should cluster near $|\lambda| = 1$, reflecting the residual connection's conservation enforcement. The spread around 1 should be small (~0.01–0.1), with outliers corresponding to layers where significant representational reorganization occurs (early layers and late layers).

**Prediction B (mode-feature correspondence).** The DMD eigenmodes should correlate with features extracted by sparse autoencoders (SAEs) trained on the same residual stream. Specifically: the top-$k$ DMD modes and the top-$k$ SAE features (by activation frequency) should have high cosine similarity. If $r$ is the mean cosine similarity and $r_{\text{random}}$ is the baseline (random directions), the framework predicts $r \gg r_{\text{random}}$.

**Prediction C (scaling).** Larger transformers (GPT-2 medium, large, XL) should have more DMD modes with $|\lambda| \approx 1$ — more persistent eigenmodes — corresponding to their capacity to represent more "entities" in the data. The number of near-unit eigenvalues should scale with model dimension, roughly as $O(d_{\text{model}})$.

**What failure means.**
- If eigenvalues do not cluster near 1: the residual-connection-as-conservation interpretation is too simple; layer norm and attention may shift the effective eigenvalues in ways the framework doesn't capture.
- If DMD modes do not correlate with SAE features: the eigenvector-as-feature hypothesis is wrong, and features may be organized by a different principle (e.g., superposition geometry rather than eigenstructure).
- If scaling does not hold: the relationship between model capacity and eigenmode count is more complex than linear.

**Difficulty:** Medium. Requires access to model internals (TransformerLens or similar), SAE training, and DMD computation on high-dimensional data. ~1-2 weeks of focused work.

### Experiment 4: Self-multiplication entity detection in multi-agent systems

**Setup.** Simulate a simple multi-agent system: $N = 100$ agents on a 2D grid, each with a continuous internal state $x_i \in \mathbb{R}^d$ ($d = 5$). Agents interact locally: each agent's next state depends on its own state and its neighbors' states via $x_i^{t+1} = \sigma(\sum_j W_{ij} x_j^t)$ where $W_{ij}$ encodes interaction strength and $\sigma$ is a nonlinearity. Some agents are initialized in self-reinforcing clusters (mutual positive feedback); others are isolated.

**Prediction A (entity recovery).** Apply the cross-perturbation minimization criterion: partition the $N$ agents into groups and compute the ratio of cross-perturbation to self-action for each partition. The partition that minimizes this ratio should recover the self-reinforcing clusters as "entities."

**Prediction B (eigenvalue-persistence correlation).** For each detected entity (cluster), compute $|\lambda|$ from the local self-multiplication operator. Entities with $|\lambda| \approx 1$ should persist longest in simulation. Plot $|\lambda|$ vs. survival time; the framework predicts a strong positive correlation, with $|\lambda| = 1$ corresponding to indefinite persistence and $|\lambda| < 1$ corresponding to exponential decay with time constant $\tau \propto 1 / (1 - |\lambda|)$.

**Prediction C ($\rho_{\text{ac}}$ derivation).** Compute $\rho_{\text{ac}}$ both ways: (1) by the current Epimechanics definition (count self-sustaining causal loops using interventionist criteria), and (2) by the self-multiplication definition ($|\lambda|$ of the entity's self-multiplication operator). The two measures should be monotonically related. If they are, the self-multiplication formulation is a valid reformulation. If they are not, the two definitions pick out different structures, and the discrepancy identifies where the framework needs refinement.

**What failure means.**
- If entity recovery fails: the cross-perturbation criterion may need modification for discrete agent systems, or the partition search may require better algorithms (spectral clustering, information-theoretic methods).
- If eigenvalue-persistence correlation is weak: self-multiplication eigenvalue may not capture all sources of persistence (e.g., environmental scaffolding, where the entity persists because the environment holds it in place rather than through self-action).
- If $\rho_{\text{ac}}$ measures diverge: the self-multiplication formulation is not equivalent to the current Epimechanics definition — it is a genuinely different theory, and the experiments determine which one tracks persistence better.

**Difficulty:** Medium. Standard agent-based modeling tools (Mesa, NetLogo, or custom Python). ~2 weeks.

### Experiment 5: Conservation law emergence in random self-multiplication systems

**Setup.** Generate random self-multiplication systems: sample $\mathbf{T}$ as a random tensor (various ranks: 2, 3, 4) on $\mathbb{R}^d$ ($d = 10, 50, 100$). For each, iterate $X_{t+1} = \mathbf{T}(X_t) \cdot X_t$ from 1,000 random initial conditions. Record which initial conditions produce bounded trajectories (neither diverge nor collapse).

**Prediction A (conservation prevalence).** The fraction of initial conditions producing bounded trajectories should increase with the number of $|\lambda| = 1$ eigenvalues of the system. Systems with no unit eigenvalues should produce zero bounded trajectories (everything diverges or collapses). Systems with $k$ unit eigenvalues should produce bounded trajectories in a $k$-dimensional submanifold.

**Prediction B (conservation law discovery).** For systems that produce bounded trajectories, compute the conserved quantities (functions of $X$ that remain constant along trajectories). The number of independent conserved quantities should equal the number of $|\lambda| = 1$ eigenvalues. This is the self-multiplication framework's version of Noether's theorem: each persistent eigenmode corresponds to a conservation law.

**Prediction C (tensor rank and conservation richness).** Higher-rank tensors should support more complex conservation laws (higher-order invariants, not just linear ones). Rank-2 tensors produce linear conservation (energy-like). Rank-3 may produce quadratic conservation. Rank-4 and above may produce the kinds of non-trivial conservation laws seen in physics (charge, baryon number — quantities conserved for structural reasons beyond simple energy accounting).

**What failure means.**
- If conservation count does not match eigenvalue count: the mapping between eigenvalues and conservation laws is not one-to-one, and the framework needs a more nuanced account of how conservation emerges from self-multiplication.
- If higher-rank tensors do not produce richer conservation: tensor rank may not correspond to conservation complexity in the way proposed.

**Difficulty:** Medium-high. Tensor computation at scale, careful numerical eigenvalue analysis, conservation law detection algorithms. ~3-4 weeks.

### Experiment 6: Transformer architecture prediction

**Setup.** Using the self-multiplication framework, derive quantitative predictions about transformer architecture:

**Prediction A (residual stream magnitude).** The norm $\|X_\ell\|$ across layers should remain approximately constant (within ~10%) due to the $|\lambda| \approx 1$ condition. Deviations should correlate with layer norm application points. Measure this across GPT-2 variants and verify.

**Prediction B (attention as $\mathbf{T}(X)$).** Compute the effective eigenvalues of the attention-mediated transition at each layer. The eigenvalue spectrum should be tighter (more concentrated near 1) in later layers than early layers — the representation converges on its eigenmodes. Early layers do the "decomposition work"; late layers operate within the eigenspace.

**Prediction C (architecture search implication).** Architectures that explicitly enforce eigendecomposition structure — e.g., replacing self-attention with a learned Koopman operator — should achieve comparable performance with fewer parameters on tasks where the data has low-rank self-multiplication structure (e.g., physical simulation, music generation, repetitive language). On tasks with high-rank structure (e.g., diverse reasoning), standard attention should win because it can represent more eigenmodes.

**What failure means.**
- If residual norms are not stable: the conservation interpretation needs refinement.
- If eigenvalue spectra do not tighten across layers: the "convergence on eigenmodes" picture is too simple.
- If Koopman architectures do not outperform on low-rank tasks: the practical value of the framework for architecture design is limited.

**Difficulty:** High. Prediction C requires training novel architectures. ~1-2 months.

---

## Novel Hypotheses Generated by the Framework

The following hypotheses are not derivable from the current Epimechanics formalism alone. They require the self-multiplication mechanism and would, if confirmed, establish the framework as a genuinely new theory rather than a reformulation.

### H1: Entity boundaries are spectral gaps

**Hypothesis.** The boundary of an entity corresponds to a gap in the eigenvalue spectrum of the local self-multiplication operator. Where the spectrum is continuous (many eigenmodes with similar $|\lambda|$), the system is fluid — no discrete entities. Where the spectrum has gaps (some modes at $|\lambda| \approx 1$, others at $|\lambda| \approx 0$), the $|\lambda| \approx 1$ modes form a discrete entity separated from the $|\lambda| \approx 0$ background.

**Consequence.** Entity-ness is not just "high $\rho_{\text{ac}}$" — it requires a spectral gap. A system can have high average $\rho_{\text{ac}}$ but no entities (if the spectrum is continuous) or low average $\rho_{\text{ac}}$ but sharp entities (if there is a large spectral gap around a few persistent modes).

**Test.** In the multi-agent simulation (Experiment 4), compute the eigenvalue spectrum for each detected entity. Entities that human observers rate as "clearly distinct" should have larger spectral gaps than entities that are "fuzzy" or "borderline."

### H2: Phase transitions are eigenvalue crossings

**Hypothesis.** Phase transitions — in physical, social, and abstract systems — occur when eigenvalues cross the $|\lambda| = 1$ boundary. When an eigenvalue that was $< 1$ crosses to $> 1$, a new entity appears (spontaneous symmetry breaking, institution formation, belief crystallization). When an eigenvalue that was $\approx 1$ drops below 1, an entity dies (phase transition to disorder, institutional collapse, deconversion).

**Consequence.** The order parameter of a phase transition is the eigenvalue $|\lambda|$ of the relevant mode. Critical exponents should be derivable from the rate at which $|\lambda|$ crosses 1 and the coupling between the transitioning mode and the rest of the spectrum.

**Test.** In an Ising model simulation near the critical temperature, compute the self-multiplication eigenvalue spectrum at each temperature. The magnetization eigenvector's $|\lambda|$ should cross 1 at $T_c$, and the critical exponents should match the known Ising values.

### H3: Scaling laws reflect eigenvalue spectra of learned self-multiplication

**Hypothesis.** Neural network scaling laws (loss $\propto N^{-\alpha}$ where $N$ is parameter count) arise because each additional parameter allows the model to capture one more eigenmode under self-attention. The scaling exponent $\alpha$ is determined by the spectral decay rate of the trained model's self-attention operators.

**Key constraint.** A static dataset has no dynamics — no $X_t \to X_{t+1}$, no $\mathbf{T}(X)$, no eigenvalue spectrum. DMD on a dataset is not meaningful. The self-multiplication structure lives in the *model that processes the data*, not in the data itself. Self-attention already performs the $O(N^2)$ pairwise computation ($QK^T$) that any mutual-information-based decomposition of the data would require — and does so more efficiently because it is learned end-to-end rather than computed from scratch. Attempting to extract self-multiplication structure from the data separately would amount to building a worse transformer as a preprocessing step.

The empirical program therefore lives inside the model: analyze the eigenstructure of what the transformer already computed (Experiment 3), rather than trying to decompose the data independently.

**Test.** Train transformers of varying sizes on several domains (text, code, images, music). For each trained model, compute the eigenvalue spectrum of the self-attention operators acting on held-out data (Experiment 3). Measure the spectral decay rate $\beta$ (how quickly $|\lambda_k|$ falls away from 1 as $k$ increases). Compare $\beta$ to the empirically measured scaling exponent $\alpha$. The framework predicts a monotonic relationship: faster spectral decay (fewer persistent eigenmodes) → faster scaling (easier to learn).

**What this depends on.** H3 is downstream of Experiment 3. If the DMD-on-residual-streams analysis fails (eigenvalues don't cluster near 1, modes don't correspond to features), H3 is moot. Get Experiment 3 right first.

### H4: Consciousness requires spectral self-reference

**Hypothesis.** The self-multiplication framework gives a sharper version of Epimechanics' consciousness definition. Consciousness requires not just self-modeling (a representation of the entity within the entity's state space) but **spectral self-reference**: the entity's eigenvector must include a component that represents the eigenvector itself. The eigendecomposition must contain a mode whose content is "I am this mode."

**Consequence.** There is a minimum tensor rank required for consciousness: the transition tensor must be high enough rank to support self-referential eigenvectors. Rank-2 (matrix) self-multiplication cannot support spectral self-reference because the eigenvectors of a matrix do not contain information about themselves. Rank-3 or higher is required — the state's influence on its own rules must itself be state-dependent.

**Test.** In transformer architectures, check whether self-referential features (features that activate on representations of their own activation pattern) require a minimum depth. The framework predicts a sharp threshold: below some layer count, self-referential features cannot form. This is testable with current mechanistic interpretability tools.

### H5: The No Free Lunch theorem has a spectral boundary

**Hypothesis.** No Free Lunch says no universal optimizer exists. The self-multiplication framework adds: **there exists a universal representation structure** — the eigendecomposition of self-multiplication — that is valid across all domains, even though the specific eigenvectors are domain-dependent. The universality is in the structure (eigenbasis), not the content (which eigenvectors).

**Consequence.** A representation that is explicitly structured as an eigendecomposition of the data's self-multiplication dynamics should transfer better across domains than an unstructured representation of the same dimensionality, even though it may be suboptimal on any single domain.

**Test.** Train two families of models: (1) standard transformers, (2) transformers with an explicit Koopman eigendecomposition layer. Evaluate transfer performance (fine-tuning on a new domain after pretraining). The framework predicts the Koopman-structured models transfer better despite potentially lower single-domain performance.

---

## Summary

| Current Epimechanics | Self-Multiplication Formulation |
|---------------------|-------------------------------|
| $\rho_{\text{ac}}$ is a representational quantity assigned to entities | $\rho_{\text{ac}} \propto |\lambda|$ — the persistence eigenvalue of self-multiplication |
| Entity boundaries are where $\rho_{\text{ac}}$ drops off | Entities are eigenvectors of $\mathbf{T}(X)$ — spectral decomposition of the state |
| Entity decomposition is a modeling choice | Entity decomposition is eigendecomposition — principled, computable via DMD/Koopman |
| Rules (dynamics) are separate from states | Rules are states viewed as operators — $\mathbf{T}$ is derived from $X$ |
| Conservation laws are inherited from physics | Conservation = $|\lambda| = 1$ — the survival condition in the space of all possible dynamics |
| The Lagrangian is a structural postulate | The Lagrangian may emerge as the variational characterization of persistence ($|\lambda| = 1$) |
| The Ruliad is an external structure containing all rules | The Ruliad is the set of self-consistent attractors of tensorial self-multiplication |
| Mass, force, energy are defined then postulated to apply | Mass = eigenspace rigidity; force = eigenspace perturbation; energy = perturbation capacity — all derived |

The self-multiplication mechanism is a candidate for the generative layer beneath the current Epimechanics formalism. Whether it succeeds depends on whether the derivation chain — particularly the Lagrangian step and the conservation-law-as-survival-condition argument — can be made rigorous, and whether the formulation generates predictions the current framework does not.
