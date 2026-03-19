---
title: "Epimechanics - Part 1: The Generalized Mechanics"
description: >-
  Physics, understood abstractly, is the skeleton of metaphysics.
  A complete framework deriving state, velocity, mass, momentum, force, energy, coupling constants, and fields in terms of a single abstract state variable X.
date: 2026-03-11T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
contentType: article
mediaTypes:
 - text
 - image
series: "Epimechanics"
series_order: 1
coverImage:
  url: ./images/physics_as_metaphysics_01_generalized_mechanics-1-1.png
  alt: >-
    Abstract visualization of a generalized state variable X moving through a high-dimensional state space.
    Glowing trajectory curves, force vectors as arrows, energy as color intensity gradients.
    Dark background with luminous mathematical scaffolding - physics equations dissolving into
    philosophical and biological domains. Blueprint aesthetic, electric blue and gold.
categories:
 - Philosophy
 - Physics
 - Systems thinking
tags:
 - Metaphysics
 - Physics
 - Abstraction
 - Coupling
 - State space
 - Dynamical systems
bullets:
 - Position, velocity, mass, momentum, force, energy, and fields are all instances of one abstract skeleton with state variable X
 - Generalized mass M is the total causal density of an entity - institutional inertia maps to high M
 - The full force equation F = M·a + dM/dt·v captures both inertial resistance and structural-change interaction effects
 - Energy is the capacity to change state X; E = Mc² generalizes to stored internal energy
 - Scalar coupling κ and the existential coupling tensor T_ij both describe how strongly any entity interfaces with any domain
 - Off-diagonal tensor terms capture stress cascades - economic disruption bleeding into psychological collapse
shareBlurbs:
  twitter: >-
    "A person who has energy" isn't a vague metaphor. It's $W = F \cdot \Delta X$ with the variable left abstract.
    Metaphysics is physics at a higher level of generality. Part 1 of Epimechanics series. #Physics #Philosophy
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
---

The standard move when connecting physics to social or metaphysical ideas is analogy. *Society is like a physical system*. *Ideas behave like particles*. *Culture flows like a fluid*.

The claim here is that the mathematical structure of physics - state, derivative, force, energy, coupling - does not depend on the substrate being physical. When the state variable $X$ is left abstract, the same equations can describe a wide range of systems with quantities that change continuously under influences. Physics as it is taught is one instantiation - state spaces are physical, constants are measured, and the potential landscape $V(X)$ is known. What follows explores the general case: the same formal skeleton applied to any domain, with domain-specific empirical content filling in what the skeleton leaves open. At coarse-grained levels, this grammar acquires dissipation and stochastic terms absent at the fundamental level — see Part 0.5 on cross-level tracing.

This abstraction has precedent. [Strogatz's *Nonlinear Dynamics and Chaos* (1994)](https://www.stevenstrogatz.com/books/nonlinear-dynamics-and-chaos-with-applications-to-physics-biology-chemistry-and-engineering) presents the phase space formalism as applicable to physics, biology, chemistry, and engineering simultaneously - large classes of systems from completely different domains described by the same mathematical skeleton. Strogatz's framework uses states and trajectories - the phase space formalism. Epimechanics extends this further, proposing that the full mechanical apparatus (mass, force, energy, Lagrangian) also carries over when causal density provides the analogue of mass. [Norbert Wiener's *Cybernetics* (1948)](https://mitpress.mit.edu/9780262730099/cybernetics/) elevated state, feedback, and control to a universal level covering machines, organisms, and societies. The [Scholarpedia article on state space](https://www.scholarpedia.org/article/State_space) states directly: "Large classes of engineering, biological, social, and economic systems may be represented by state-determined system models." Epimechanics extends this tradition further - to the informational and mimetic substrates that constitute minds, cultures, and distributed entities, and to the coupling structure that connects entities to domains of reality.

This is the full Epimechanics framework, one concept at a time.

---

## 1. X as Universal Coordinate

**Physics**: Position is a vector specifying where an object is in geometric space - a measurable value assigned to a system at a moment in time.

**Generalized**: Let X be a *representation* of any measurable or definable aspect of any system. $X$ is not the thing itself - it is a formal description of the thing's condition, the way a map is a description of territory. The territory exists independently; $X$ is our model of it. Physical position is one instance of X. But X can equally represent a person's level of trust in an institution, a market's current price level, a culture's ideological center of mass, or a neural network's complete weight configuration. $X$ lives in some space of possible values - a **state space** $S$ - and it changes over time at some rate $\dot{X} = dX/dt$.

[Hoffman's Interface Theory of Perception (*The Case Against Reality*, 2019)](https://doi.org/10.1093/oso/9780393254693.001.0001) makes the sharpest version of this point: our perceptions are not accurate depictions of reality but fitness-tuned interfaces - the desktop icon does not resemble the magnetic patterns on the disk. $X$ has the same status. It is an interface through which we interact with reality, not a photograph of reality. Some interfaces track real structure well enough to make predictions; others are arbitrary or misleading. The framework's claim is not that $X$ accurately depicts reality - it is that when $X$ is chosen to track real causal structure, the mechanical relationships derived from $X$ (force, energy, coupling) predict how that structure changes over time.

An *entity*, in Epimechanics, is anything we can represent with an $X$ - anything we can describe, name, or model. Auto-causal density $\rho_{\text{ac}}$ measures how strongly it sustains itself (formally defined in Section 1b immediately below).

Here are a few concrete cases:

- **Physical position**: X is a vector in ℝ³. Standard physics.
- **Emotional valence**: X is a scalar (or vector in circumplex affect space) measuring a person's emotional state. It has a value, it changes over time, and its dynamics can be modeled.
- **Market price**: X is a scalar (or vector in multi-asset space) measuring the price level of one or many goods.
- **Ideological position**: X is a point in a multi-dimensional belief space - economic left/right, social liberal/conservative, internationalist/nationalist. Political science models this routinely.
- **Neural network state**: X is the full weight and activation vector - a high-dimensional point in parameter space.

In every case, the structure is shared: a system has a state X, that state lives in some state space S, and the state changes over time. Physical position is X evaluated in three-dimensional Euclidean space - one specific, empirically rich instantiation. The examples above are others. What Epimechanics asks is: what structure remains when we abstract from the specific state space? The answer - state, derivative, mass, force, energy, coupling - is the content of Epimechanics.

### Labeling is state assignment

The choice of $X$ is a representational act - labeling something places it in a state space. Not all representations are equal: some track measurable properties, some are assigned by the observer, and some are invariant across reference frames. [Part 1b](./01b_uncertainty_coordinates_relativity.md) develops these distinctions and how representations transform between coordinate systems.

**Form**: $X \in S$, where S is the state space of the system.

![A curved manifold representing state space S, with a point X on its surface, a tangent plane T_X S, and a trajectory showing the entity's path through state space](/docs/theory/images/state_space_manifold.svg)

> [!sidenote]
> *Note on smoothness*: The calculus assumes $X(t)$ is differentiable. In practice, $X$ is a coarse-grained average; stochastic extensions ([Fokker-Planck](https://en.wikipedia.org/wiki/Fokker%E2%80%93Planck_equation), [Langevin](https://en.wikipedia.org/wiki/Langevin_equation)) handle noise.

---

## 1b. Entities: What Has State

Epimechanics begins with $X$ - a state variable. But what *has* a state? The word "entity" needs a definition, because the question "what counts as an entity?" determines everything that follows: what has a trajectory, what has mass, what couples to fields, and what can be a source of fields.

### Auto-causal density: one concept, not three

An **entity** is anything with a describable state - anything you can assign an $X$ to. What makes some entities more interesting than others is **auto-causal density** - the degree to which a structure's causal events produce the conditions for their own continuation.

$$\rho_{\text{ac}}(x) = \text{density of causal events at } x \text{ that sustain the structure producing them}$$

**Note:** $\rho_{\text{ac}}(x)$ is evaluated at point $x$ but reflects the loop structure passing through $x$ — it is an emergent property of causal cycles, not measurable from single-point bond data alone (see Part 0.5 on emergent auto-causality).

A flame's combustion maintains the heat that maintains combustion. An organism's metabolism maintains the cells that perform metabolism. An institution's processes maintain the institution that runs the processes. [Hofstadter (*I Am a Strange Loop*, 2007)](https://en.wikipedia.org/wiki/I_Am_a_Strange_Loop) explored a related concept - 'strange loops' - self-referential structures whose high-level patterns causally influence the low-level processes that produce them. Auto-causal density generalizes this: it includes non-representational self-sustaining structures (like flames) as well as the representational ones Hofstadter focused on.

This is one concept, not several stitched together. Earlier formulations of Epimechanics split entity-hood into "causal density," "self-coupling," and "external coupling" as if these were independent properties. They are not. "Internal" presupposes a boundary; the boundary is where auto-causal density drops off; so "internal" is defined by auto-causal density, not the other way around. "Self-coupling" is what auto-causal density *measures* - the strength of the self-referential loop. These are different names for the same thing seen from different angles: the density of causal events that produce themselves.

External coupling - whether the structure interacts with the rest of the state space - is the one genuinely separate property. But it is nearly always nonzero for anything that exists: a cloud that blocks sunlight is externally coupled whether or not anyone is looking at it. Auto-causal density is proposed as an objective property of the structure, not of an observer - though identifying and measuring it requires specifying a causal model, which introduces modeling choices.

### Entity-ness is continuous

Entity-ness is a spectrum. The auto-causal density $\rho_{\text{ac}}$ varies continuously from zero (random noise, no self-referential structure) to very high (tightly organized, strongly self-maintaining):

| System | $\rho_{\text{ac}}$ | Duration | Character |
|--------|---------------------|----------|-----------|
| Proton | Very high | $> 10^{34}$ years | Quarks and gluons in tight self-referential loop |
| Organism | Very high | Years to centuries | Metabolic, neural, immune loops maintaining the structures that perform them |
| Institution | High | Decades to millennia | Meetings, policies, communications maintaining the institution that organizes them |
| Meme (viral idea) | Moderate | Hours to years | Self-reinforcing pattern that hijacks attention and triggers retransmission; high initial $\rho_{\text{ac}}$ but often low persistence |
| Hurricane | Moderate | Days to weeks | Thermodynamic feedback loop (warm ocean → convection → pressure drop → more convection) |
| Cloud | Low | Minutes to hours | Local thermodynamics loosely sustains the shape; the self-referential loop is weak |
| Fleeting thought | Very low | Seconds | Brief neural activation, minimal self-sustaining structure |
| Random fluctuation | $\approx 0$ | Instantaneous | No self-referential structure |

A cloud is an entity - a low-$\rho_{\text{ac}}$ entity. It has a state, it has (low) mass, it exerts (weak) influence on other systems (blocking sunlight, producing rain). It is not wrong to call it an entity; it is wrong to call it a *strong* entity. The spectrum is the point: entity-ness admits of degree. A cloud, a meme, a hurricane, an organism, and an institution are all entities - they differ not in kind but in the density and persistence of their auto-causal structure.

This spectrum connects directly to life-likeness ([Part 1c](./01c_thermodynamic_emergence_of_life.md)). Epimechanics predicts that higher $\rho_{\text{ac}}$ corresponds to: greater resistance to perturbation (the entity restores itself after disruption), longer persistence ($T_{\text{local}}$ is larger), stronger causal influence on other systems ($\Pi_{\text{out}}$ is higher), and - when combined with informational coupling ($I > 0$) and hereditary transmission ($\mathbf{R} > 0$) - the characteristics we associate with life. The emergence of life is, in these terms, the emergence of entities with very high $\rho_{\text{ac}}$ sustained by thermodynamic energy throughput and informational self-organization.

> **Forward references.** The quantities $T_{\text{local}}$ (persistence duration) and $\mathbf{R}$ (representational footprint) are formally defined in [Part 4](./04_time_and_soul.md) (Time and Soul); $\Pi_{\text{out}}$ (outward causal power) and $I$ (informational coupling / intelligence) are formally defined in [Part 3](./03_intelligence_consciousness_agency.md) (Intelligence, Consciousness, and Agency). They are previewed here to motivate the entity spectrum; full definitions are not required until those later parts.

The generalized mass $\mathcal{M}$ (Section 2b) is the integral of total causal density over the entity's region - analogous to how physical mass is the integral of energy density over a volume. Note that $\rho_{\text{causal}} \geq \rho_{\text{ac}}$: mass includes all causal events, not just the self-sustaining ones. A gas cloud has high mass (dense molecular interactions) but low entity-ness (those interactions don't sustain the cloud's shape):

$$\mathcal{M} = \int_{\text{entity}} \rho_{\text{causal}}(x) \, d\mu(x)$$

Self-coupling $\kappa_s$ (used later in Parts 4 and 5) becomes a derived quantity: the temporal autocorrelation of the auto-causal region - how persistently the loop sustains itself over time.

In [assembly theory's](https://doi.org/10.1038/s41586-023-06600-9) terms, auto-causal density has a suggestive parallel with assembly theory's Assembly = AI × copy number: structural complexity (assembly index) may serve as a proxy for the depth of the self-referential structure, while copy number reflects persistence. The mapping is suggestive rather than proven - assembly index measures constructional complexity, not causal self-reference directly. The assembly criterion provides an experimentally measurable proxy - already accessible via mass spectrometry for molecular entities.

### Boundaries

Entities have boundaries, but these are gradients, not sharp edges. The boundary is the region where $\rho_{\text{ac}}$ drops from high (inside) to the background level (outside):

$$\partial E = \{x \in S : \rho_{\text{ac}}(x) = \rho_{\text{threshold}}\}$$

The boundary depends on the threshold - just as the "boundary" of a cloud depends on what humidity level you use. For highly entity-like structures (organisms, protons), the gradient is steep and the boundary is sharp. For weakly entity-like structures (clouds, cultural trends), the gradient is shallow and the boundary is fuzzy.

The boundary is:
- **Dynamic**: it expands when auto-causal density increases and contracts when it decreases.
- **Substrate-specific**: a hermit has a narrow physical boundary but a broad informational one if their ideas are widely read.
- **Asymmetric**: entity A may influence entity B without B influencing A.

[Bateson (*Steps to an Ecology of Mind*, 1972)](https://press.uchicago.edu/ucp/books/book/chicago/S/bo3620295.html) anticipated this: "The boundary of the self is where information ceases to flow."

![An entity as a bounded region in state space: dense internal causal network (generalized mass), self-coupling maintaining coherence, external coupling to forces and fields](/docs/theory/images/entity_structure.svg)

### From entities to meta-entities

With auto-causal density as the single primitive, the mechanics can proceed. Every concept that follows - velocity, mass, momentum, force, energy, coupling, fields - is a property of entities or a relationship between them. High-$\rho_{\text{ac}}$ regions are strongly entity-like; high-$\rho_{\text{causal}}$ regions have substantial mass. The two often coincide but need not.

The question of when a *collection* of entities develops its own auto-causal density - when the aggregate sustains itself through its own internal loops rather than through the loops of its parts - is the meta-entity question, addressed in [Part 2](./02_meta_entities.md).

---

## 2. dX/dt as Rate of Change

**Physics**: Velocity is the time derivative of position - the rate at which spatial coordinates change.

**Generalized**: $v_X = \frac{dX}{dt}$ is the rate at which any state X changes. In physics it is velocity. In a person's life it is the rate of belief revision, skill acquisition, or emotional drift. In an economy it is the rate of price change - inflation is $dX/dt$ for price X.

The sociophysics literature has modeled this directly and rigorously since [Galam, Gefen & Shapir (1982)](https://doi.org/10.1007/BF01012507), who applied statistical physics to social phenomena and showed that opinion dynamics exhibit the same phase transition behavior as magnetic spin systems. A society's mean ideological position has a $dX/dt$; tipping points occur when the second derivative changes sign; order-disorder transitions correspond to the breakdown of social consensus. [Ball's *Critical Mass* (2004)](https://us.macmillan.com/books/9780374530419/criticalmass/) surveys this work accessibly. [Sznajd-Weron & Sznajd (*Int. J. Mod. Phys. C*, 2000)](https://doi.org/10.1142/S0129183100000936) formalized a specific social force model - the Sznajd model - in which local conformity pressure produces global phase transitions in opinion space.

These are the same derivative, evaluated on different state spaces.

**Metaphysical examples**:
- A person in crisis has high $|dX/dt|$ - their psychological state is changing rapidly. Multiple dimensions of X are shifting simultaneously.
- Stability means $dX/dt \approx 0$ - state is not changing, not because nothing is happening but because influences are balanced.
- A market bubble is a sustained period of high $dX/dt$ (price rising rapidly) followed by a sign reversal (crash): $d^2X/dt^2$ flips from positive to negative.
- A person in flow has high $dX/dt$ in skill state, low $dX/dt$ in emotional state - domain-specific rate of change is the actionable concept.

**Form**:

$$v_X = \frac{dX}{dt}$$

---

## 2b. Generalized Mass as Internal Causal Density

**Physics**: Mass has three faces that turn out to be the same thing. Inertial mass is resistance to acceleration: $F = ma$. Gravitational mass is coupling strength to the gravitational field. And Einstein's $E = mc^2$ reveals that mass *is* stored energy - energy locked into the internal structure of a persistent configuration.

The fact that these three faces give the same number is not a logical necessity - it is a deep empirical fact. You can measure a rock's mass by **weighing** it (gravitational interaction with Earth), by **pushing** it (applying known force, measuring acceleration), or by **annihilating** it (measuring the energy released). Three different experimental procedures. The same number. This is the [equivalence principle](https://en.wikipedia.org/wiki/Equivalence_principle), and it is one of the most important non-tautological results in physics. $F = ma$ is not a tautology *because* $m$ is measured by weighing (one procedure) and the prediction $a = F/m$ is tested by pushing (a different procedure). The two experiments are independent. The agreement between them is the empirical content.

In [Wolfram's hypergraph framework](https://arxiv.org/abs/2004.08210), this unification becomes structural. A particle is a persistent localized structure in the hypergraph. Energy is the timelike flux of causal edges - the density of causal connections flowing forward in time. A particle's mass is the **rest-frame causal event density of its internal structure**: the rate and density of causal events occurring within the persistent configuration that constitutes the particle. A proton is more massive than an electron because its internal structure (three quarks, gluon field) is causally denser - more causal events per unit time maintain and perpetuate it. This adds a fourth face: mass measured by **counting** internal causal events.

**Generalized**: Section 1b defined an entity as anything with a describable state, with auto-causal density $\rho_{\text{ac}}$ measuring how strongly it sustains itself. The **generalized mass** $\mathcal{M}$ is the integral of total causal density - all causal events within the entity's region, self-sustaining or not:

$$\mathcal{M}(E,t) = \int_{\text{entity}} \rho_{\text{causal}}(E, x, t) \, d\mu(x)$$

This parallels how physical mass is the integral of energy density over a spatial volume. Higher $\rho_{\text{causal}}$ means more causal activity. Epimechanics proposes that this corresponds to greater resistance to state change - more force needed to alter the trajectory - by analogy with how physical mass (energy density) resists acceleration. This correspondence is a structural postulate, not a derivation.

### Why this is not a tautology - and what remains open

"High $\mathcal{M}$ resists change" sounds tautological. The non-tautological content depends on whether $\mathcal{M}$ can be measured independently of resistance. In physics, this is settled: mass measured by weighing agrees with mass measured by pushing agrees with mass measured by annihilating ($E/c^2$). Three different procedures, the same number. This agreement - the [equivalence principle](https://en.wikipedia.org/wiki/Equivalence_principle) - is what makes $F = ma$ a testable prediction rather than a definition.

Epimechanics aspires to the same structure. $\mathcal{M}$ can be approached from multiple independent directions: **structural** (characterize internal causal connections), **dynamic** (apply perturbation, measure response), **energetic** (observe dissolution, measure released capacity), and **constructive** (count assembly steps). If these agree, the generalized mass concept earns empirical status. If they disagree, Epimechanics is wrong about mass in that domain.

**An important honesty check.** This equivalence is the framework's *aspiration*, not a current result. Establishing the physics equivalence principle took centuries. Epimechanics has not yet demonstrated equivalence in any non-physical domain. Furthermore, most domains lack a natural unit of causal event - there is no "atom of causation" for an institution. Epimechanics can currently claim only **ordinal agreement**: independent approaches should produce correlated *rankings*, even when absolute counts are grain-dependent. A 50,000-person bureaucracy has more internal causal structure than a 10-person startup at any reasonable grain. The ranking is robust even when the count is not.

This ordinal prediction is weaker than full equivalence but not trivial - it can fail (structurally complex but dynamically fragile entities would break the unified mass concept). The long-term goal is cardinal agreement with domain-specific units. [Part 5, Section 4.0](./05_ontology_and_open_questions.md) develops the full discussion of what Epimechanics predicts, what it does not, and where the tautology boundaries lie.

Generalized mass determines the relationship between velocity and momentum. The proper form is a sum over the entity's internal structure:

$$p = \int_{\text{entity}} \rho_{\text{causal}}(x) \cdot \dot{x} \, d\mu(x)$$

where $\dot{x}$ is the local velocity at each point within the entity's region. The coarse-grained approximation treats the entity as a single point with a bulk velocity $\dot{X}$:

$$p \approx \mathcal{M} \cdot \dot{X}, \quad \text{where} \quad \dot{X} = \frac{\int \rho_{\text{causal}}(x) \cdot \dot{x} \, d\mu(x)}{\mathcal{M}}$$

$\dot{X}$ is the $\rho_{\text{causal}}$-weighted average of internal velocities - the center-of-mass velocity in state space. This is the same coarse-graining that gives a fluid element its bulk velocity: the momentum of the element is really the integral of $\rho \mathbf{v}$ over the volume, but at the macro level we write $p = M v_{\text{bulk}}$.

The internal velocities that average out - the spread of sub-entity velocities around $\dot{X}$ - do not disappear. They become **temperature** (Section 7a): $\mathcal{T} \propto \text{Var}_{\rho_{\text{causal}}}(\dot{x})$, the variance of internal velocities weighted by causal density. A "hot" entity has sub-components moving in diverse directions; a "cold" entity has sub-components moving in lockstep.

This structure is hierarchical. An organism's momentum is the $\rho_{\text{causal}}$-weighted average of its organs' momenta. An organ's momentum is the average of its cells'. A cell's is the average of its molecules'. At each level, $p \approx \mathcal{M} \cdot \dot{X}$ holds as an approximation, with the internal velocity spread becoming the temperature at that level.

**Metaphysical examples**:
- A **deeply held belief** has high $\mathcal{M}$ because it is causally dense - connected to identity, memories, emotional associations, behavioral habits, and social commitments. Changing the belief requires rearranging all of those internal connections simultaneously. A surface preference has low $\mathcal{M}$ - few internal connections maintain it, so small forces shift it easily.
- An **institution** has high $\mathcal{M}$ proportional to its internal operational density: personnel structures, policy frameworks, contractual obligations, communication networks, cultural norms. "Institutional inertia" maps to high $\mathcal{M}$ - the institution resists state change because its auto-causal events are dense and tightly coupled.
- A **new startup** has low $\mathcal{M}$ - few internal structures, light processes, minimal institutional memory. It can pivot quickly (low resistance to $d^2X/dt^2$). As it grows, causal density increases: more employees, more procedures, more dependencies. $\mathcal{M}$ grows. The organization becomes harder to redirect. This is the same mathematical structure as physical mass - causal density determining resistance to state change - applied to a different projection of the state space.

**Connection to self-coupling**: [Part 4](./04_time_and_soul.md) will introduce $\kappa_s(E,t)$ - the self-coupling that determines whether an entity maintains coherence at all. Mass and self-coupling are related but distinct: $\kappa_s > 0$ means the entity exists (its internal causal connections sustain its configuration against dissolution). $\mathcal{M}$ measures *how dense* those connections are - how much force is needed to change the entity's state while it persists. A dying language has $\kappa_s$ approaching zero (it is losing coherence) even if the remaining speakers still carry dense internal structure ($\mathcal{M}$ still nonzero in the surviving nodes). An entity can have high mass and still die - the connections were dense but not self-sustaining.

**$E = \mathcal{M}c_{\mathcal{D}}^2$ - stored energy in internal structure**: In physics, $E = mc^2$ says the energy stored in a body's internal structure equals its mass times the square of the maximum causal propagation speed. Generalized: the energy locked into maintaining an entity's persistent configuration is proportional to $\mathcal{M}$ times $c_{\mathcal{D}}^2$, where $c_{\mathcal{D}}$ is the maximum speed at which causal influence propagates in domain $\mathcal{D}$. Every domain has a finite propagation speed: information travels at finite speed through social networks, causal influence propagates at finite speed through institutional hierarchies, ideas spread at finite speed through epistemic communities. When an entity's internal structure is disrupted - a belief system shatters, an institution collapses - the energy that was maintaining that structure is released as capacity for state change. This is the same mathematical relationship as $E = mc^2$ - causal density times maximum propagation speed squared - applied at a higher level of abstraction. Whether the structural isomorphism reflects a deeper identity (as the Wolfram conjecture suggests) or a powerful formal analogy is an open question addressed in the Coda below.

**Form**: $p = \mathcal{M} \cdot \dot{X}$, where $\mathcal{M}$ is the entity's total causal content — the integral of causal event density over the entity's region — its generalized mass.

**The mass tensor generalization.** The form $p = \mathcal{M} \cdot \dot{X}$ treats mass as a scalar - the same resistance to change in every direction through state space. This is valid when the state space is **isotropic** with respect to the entity. For abstract entities, it generally does not hold: a belief system resists identity-related change far more than aesthetic change. The resistance is direction-dependent, which means mass is properly a **tensor**:

$$p_i = \mathcal{M}_{ij} \, \dot{X}^j$$

where $\mathcal{M}_{ij}$ is a **mass tensor** - a symmetric positive-definite matrix whose eigenvalues give the resistance to change along each principal axis of the state space. The scalar form is recovered when $\mathcal{M}_{ij} = \mathcal{M} \cdot \delta_{ij}$ (isotropic mass). The corresponding generalizations are: force $F_i = \mathcal{M}_{ij}\ddot{X}^j + \dot{\mathcal{M}}_{ij}\dot{X}^j$; kinetic energy $T = \frac{1}{2}\mathcal{M}_{ij}\dot{X}^i\dot{X}^j$; Lagrangian $L = \frac{1}{2}\mathcal{M}_{ij}\dot{X}^i\dot{X}^j - V(X)$.

The mass tensor $\mathcal{M}_{ij}$ handles **within-entity anisotropy** - different resistance in different directions for the same entity. This is distinct from the coupling tensor $T^i{}_j$ (Section 5b), which handles **cross-domain propagation** - how a force in one domain produces a response in another. They are different tensors serving different purposes: $\mathcal{M}_{ij}$ acts on the entity's own velocity to produce momentum; $T^i{}_j$ acts on external field forces to produce the force experienced by the entity.

> [!sidenote]
> *Note on the scalar approximation.* The scalar form $p = \mathcal{M} \cdot \dot{X}$ assumes isotropic resistance. The general form is tensorial: $p_i = \mathcal{M}_{ij}\dot{X}^j$. See the caveat on the Lagrangian for the full generalization.

> [!sidenote]
> *Note on matter*: In Epimechanics, **matter** is any persistent configuration with nonzero $\mathcal{M}$ - any structure whose causal events maintain it against dissolution. Physical matter is the special case: persistent localized structures in the physical hypergraph. But a belief system actively maintained by cognitive reinforcement loops is matter in the cognitive domain. An institution sustained by ongoing internal processes is matter in the organizational domain. The word "matter" becomes coextensive with "entity that has internal causal structure."

### Assembly theory and the measurability of $\mathcal{M}$

[Assembly theory (Cronin, Walker et al., 2023)](https://arxiv.org/abs/2206.02279) provides an independent route to the same concept from chemistry and origins-of-life research. The **assembly index** (AI) of an object is the minimum number of joining operations required to construct it from basic building blocks. The **copy number** counts how many instances exist. Their product - **Assembly** = AI × copy number - quantifies the amount of causation required to produce complex objects in abundance. [Cronin et al. (*Nature*, 2023)](https://doi.org/10.1038/s41586-023-06600-9) showed that the assembly index is experimentally measurable via mass spectrometry and infrared spectroscopy, and that biological samples consistently produce higher assembly indices than abiotic ones.

The connection to generalized mass is direct. The assembly index is a **static, constructive** measure: how many steps to build the structure. Generalized mass $\mathcal{M}$ is a **dynamic, maintenance** measure: how many causal events sustain it. For persistent structures, the two should be correlated - a structure requiring many construction steps typically requires proportionally many causal events per maintenance cycle. The assembly index therefore provides an experimentally measurable lower bound on $\mathcal{M}$:

$$\mathcal{M} \geq f(\text{AI})$$

for some monotonically increasing function $f$ that maps construction complexity to maintenance cost. The precise form of $f$ is domain-specific and empirically determinable - but the structural prediction is that assembly index and generalized mass are positively correlated across all domains.

This connection extends beyond chemistry. The **social assembly index** of an institution is the minimum number of organizational steps to construct it from individuals - a startup has low social AI; a government bureaucracy has high social AI. The **mimetic assembly index** of a cultural pattern is the minimum number of conceptual steps to construct it from basic cognitive building blocks - a slogan has low mimetic AI; a philosophical framework has high mimetic AI. In each case, Epimechanics predicts $\mathcal{M} \propto \text{AI}$: institutional inertia proportional to organizational construction complexity; pattern fidelity proportional to conceptual construction complexity.

Assembly theory also introduces a hierarchy of state spaces that maps onto Epimechanics' Lagrangian formulation. Cronin and Walker define nested **assembly spaces**: the *assembly universe* (all possible combinations), the *assembly possible* (what physical laws permit), the *assembly contingent* (what actual pathways can reach), and the *assembly observed* (what actually exists). This is the state-space funnel $S \supset S_{\text{possible}} \supset S_{\text{contingent}} \supset S_{\text{observed}}$, where each level is a constraint. The action principle $\delta \int L \, dt = 0$ is precisely what selects $S_{\text{contingent}}$ from $S_{\text{possible}}$: only trajectories that extremize the action are realized. Cronin and Walker's claim that "information is in the path, not the initial conditions" is the action principle stated in different language.

![Assembly space funnel: all possible configurations narrow through physical law constraints and action principle selection to the actually observed state](/docs/theory/images/assembly_funnel.svg)

> [!sidenote]
> *Note on status*: Assembly theory has been [criticized as equivalent to Lempel-Ziv compression](https://arxiv.org/abs/2403.06629) ([Jaeger 2024](https://doi.org/10.1007/s00239-024-10163-2)). Epimechanics uses its measurable quantities as operationalizations, not as foundational theory.

---

## 3. Force as Causal Power

**Physics**: Force is defined operationally: $F = dp/dt$, the rate of change of momentum. Force is whatever produces a change in momentum - and therefore a change in the rate of change of state.

**Generalized**: A force, in the most general sense, is any influence that changes the momentum of a system - its tendency to continue along its current trajectory. An argument that shifts someone's rate of belief revision is a force. An incentive structure that alters how quickly a market moves is a force. A social norm that resists behavioral change - holding $dX/dt$ near zero - is a restoring force, exactly analogous to a spring.

The definition generalizes without metaphor because the definition of force in physics is already abstract. Newton's second law in its general form is $F = dp/dt$ - the rate of change of generalized momentum. The content of X, the nature of p, and the mechanism of F are left open by the mathematics. Physics fills in those blanks with specific physical mechanisms. Epimechanics leaves them open intentionally.

[Philip Ball's *Critical Mass* (2004)](https://us.macmillan.com/books/9780374530419/criticalmass/) formalizes social forces as spin-alignment interactions that produce macroscopic phase transitions in collective behavior. The [Sznajd-Weron & Sznajd model](https://doi.org/10.1142/S0129183100000936) is a concrete implementation: a "social validation" force in which pairs of aligned agents convert neighbors, producing a restoring force toward consensus. The mathematical form - a force that accelerates the rate of state change toward a fixed point - is precisely $F = -k\Delta X$, the harmonic restoring force of classical mechanics.

**Metaphysical examples**:
- Peer pressure produces $d^2X/dt^2 \neq 0$ in the behavioral state of an individual. Its direction is toward social conformity (a fixed point in state space). Its magnitude depends on social density and the strength of the enforcement mechanism.
- Gravity in a gravitational field is $F = -GMm/r^2$. The analogous concept in social space is a norm field that pulls behavior toward a cultural attractor with an intensity that decays with social distance.
- Habituation is a restoring force: when $dX/dt$ is high for too long, a damping force emerges that drives the system back toward equilibrium.

**Form**:

$$F = \frac{dp}{dt}$$

where $p = \mathcal{M} \cdot \dot{X}$ is the generalized momentum.

![Force deflects a trajectory through state space: momentum p along the tangent, force F at an angle, the actual path curving away from the undeflected trajectory](/docs/theory/images/force_and_momentum.svg)

*The full expansion*: Because $\mathcal{M}$ is not generally constant - entities gain and lose internal structure over time - the force equation expands via the product rule:

$$F = \frac{d(\mathcal{M}\dot{X})}{dt} = \mathcal{M}\ddot{X} + \dot{\mathcal{M}}\dot{X}$$

(Scalar approximation; the general tensorial form is $F_i = \mathcal{M}_{ij}\ddot{X}^j + \dot{\mathcal{M}}_{ij}\dot{X}^j$ - see Section 2b, note on the mass tensor.)

The first term, $\mathcal{M}\ddot{X}$, is the familiar $F = ma$ - force equals mass times acceleration, the resistance of existing internal structure to changes in trajectory.

The second term, $\dot{\mathcal{M}}\dot{X}$, is the variable-mass contribution - well known in physics from [Tsiolkovsky's rocket equation](https://en.wikipedia.org/wiki/Tsiolkovsky_rocket_equation), where a rocket accelerates by expelling mass ($\dot{m} < 0$), and from any system where mass is gained or lost during motion. In the generalized case this term is the norm: entities routinely gain and lose internal causal structure while moving through state space. Losing internal structure while in motion ($\dot{\mathcal{M}} < 0$, $\dot{X} \neq 0$) is rocket-like - the entity accelerates even without additional external force. Gaining internal structure while in motion ($\dot{\mathcal{M}} > 0$, $\dot{X} \neq 0$) is the opposite - the entity decelerates as it accumulates causal density, like a snowball gathering mass on a slope.

![Three trajectories diverging from the same initial state under the same force: constant mass (steady), gaining mass (decelerating), and losing mass (accelerating/unraveling)](/docs/theory/images/variable_mass_trajectories.svg)

This term captures real phenomena:
- A person in crisis ($\dot{X}$ large) who is simultaneously losing support structures ($\dot{\mathcal{M}} < 0$) accelerates through state space faster than external forces alone would predict. The "unraveling" effect - where losing structure causes faster change which causes further structure loss - is a positive feedback loop between $\dot{\mathcal{M}}$ and $\ddot{X}$.
- Therapy that restructures internal connections ($\dot{\mathcal{M}} \neq 0$) while the person is simultaneously navigating life changes ($\dot{X} \neq 0$) produces interaction effects that neither the structural change nor the life change would produce alone.
- An institution undergoing reform ($\dot{\mathcal{M}} \neq 0$) during a crisis ($\dot{X} \neq 0$) experiences forces from the interaction of structural change and environmental pressure. Reform during stability ($\dot{X} \approx 0$) eliminates the cross-term; the same reform during crisis does not.

In the constant-mass limit ($\dot{\mathcal{M}} = 0$), the equation reduces to the familiar $F = \mathcal{M}\ddot{X}$. This limit is valid when internal structure is stable - when the entity is not simultaneously gaining or losing causal density. For simple physical objects at everyday scales, mass is effectively constant and the cross-term vanishes. For social, psychological, and institutional systems, $\dot{\mathcal{M}} = 0$ is the exception, not the rule.

---

## 4. Energy as Capacity for Change

**Physics**: Work (energy transfer) is $W = F \cdot \Delta X$ - force applied over a displacement in state. Energy is the capacity to do work: the capacity to produce change in X.

**Generalized**: Energy is the scalar measure of an entity's capacity to change the state of a system. When we say a person "has energy," we mean exactly this: they can apply force over a range of state change. The statement is $W = F \cdot \Delta X$ with X left abstract.

This mapping has independent rigorous support at multiple levels:

**Friston's free energy principle** ([2006](https://doi.org/10.1016/j.jphysparis.2006.10.001), [2010](https://doi.org/10.1038/nrn2787)) formalizes this for biological systems: organisms minimize variational free energy, an information-theoretic bound on surprise, and in doing so maintain their organized states against entropic dissolution. The "free energy" in Friston's framework is a functional - an upper bound on the sensory surprise an organism would experience given its internal model of the world. Minimizing it is equivalent to maximizing the evidence for the organism's model of itself and its environment. The connection to physical energy is not metaphorical: the variational free energy is derived from the same thermodynamic free energy Helmholtz formalized in 1882. Epimechanics' "capacity to change X" is Friston's "free energy capacity" in the limit where X is the full state of the system.

**Landauer's principle** ([1961](https://doi.org/10.1147/rd.53.0183)) made the connection between information and physical energy exact: erasing one bit of information necessarily dissipates at least $k_B T \ln 2$ of heat into the environment. Information is physical. The capacity to process information - to revise beliefs, to update state variables, to reorganize a system's configuration - has a thermodynamic cost. This is a measurement result, experimentally confirmed.

**Shannon entropy**

$$H = -\sum_i p_i \log p_i$$

is formally identical to thermodynamic Boltzmann/Gibbs entropy (up to a constant factor and a sign convention), a connection von Neumann identified when Shannon was naming the quantity. The information-theoretic "energy" of a message - the surprise it contains - is the same mathematical object as its thermodynamic energy contribution.

**Metaphysical examples**:
- A persuasive argument has rhetorical energy proportional to the force of its logic (how strongly it changes the listener's rate of belief revision) times the range of belief states it can move across ($\Delta X$). A weak argument applied repeatedly - small F, many small $\Delta X$ - accumulates the same total work as a single decisive argument. Exactly as in physics.
- A person's "emotional energy" is their capacity to sustain $dX/dt$ in emotional state against restoring forces (habituation, social conformity pressure, emotional regulation). When that energy is depleted, $dX/dt$ falls back toward equilibrium even if the external forces that initiated it remain present.
- Organizational energy is the institution's capacity to move its collective state X in the face of institutional inertia and external resistance.

**Form**:

$$W = \int F \cdot dX$$

(the generalized work integral over state trajectory)

![Energy landscape: potential V(X) with basins of attraction, an entity trajectory, and the decomposition into kinetic T, potential V, and internal energy](/docs/theory/images/energy_landscape.svg)

*Kinetic and potential energy*: With generalized mass $\mathcal{M}$ defined, the two forms of energy separate cleanly:

$$T = \frac{1}{2}\mathcal{M}\lvert\dot{X}\rvert^2$$

is the **kinetic energy** - the energy of motion through state space.

> **Metric caveat.** The norm $\lvert\dot{X}\rvert^2 \equiv g_{ij}\,\dot{X}^i\dot{X}^j$ presupposes a metric $g_{ij}$ on the tangent space of $S$. For physical position in Euclidean space this is the standard dot product. For abstract state spaces - beliefs, institutions, ecological niches - the metric is a non-trivial structural choice that determines what "distance" and "speed" mean in that domain; it carries empirical content and must be specified domain by domain. See [Part 5, Open Question 2](./05_ontology_and_open_questions.md#open-question-2-the-geometry-of-state-space) for further discussion. A person rapidly revising beliefs has high kinetic energy in the epistemic dimension. A market in free fall has high kinetic energy in the price dimension.
>
> Additionally, this form uses the scalar mass approximation. The general tensorial form is $T = \frac{1}{2}\mathcal{M}_{ij}\dot{X}^i\dot{X}^j$, where the mass tensor $\mathcal{M}_{ij}$ encodes direction-dependent resistance (see Section 2b, note on the mass tensor). The scalar form $\frac{1}{2}\mathcal{M}\lvert\dot{X}\rvert^2$ is the isotropic special case where $\mathcal{M}_{ij} = \mathcal{M} \cdot g_{ij}$.

$$V = V(X)$$

is the **potential energy** - energy stored in the entity's position within a field, available to be converted into state change. A person in an unstable social position has high potential energy: capacity for state change stored in their configuration relative to the social field, waiting for a perturbation to release it. A compressed spring, a person on the verge of a decision, an institution at the tipping point of reform - all have high $V(X)$ relative to the attractor they are about to fall toward.

$V$'s value lies in its topology — the shape of the landscape (where basins, barriers, and gradients are) — not in converting everything to a single energy number.

Total energy is:

$$E_{\text{total}} = T + V + E_{\text{int}}$$

The first two terms - kinetic energy of motion and potential energy of position - are familiar from elementary physics. The third, **internal energy** $E_{\text{int}}$, is the energy locked into maintaining the entity's persistent causal structure. It is distinct from both motion through state space and position within external fields: it is the energy cost of being a persistent structure at all. When an entity's internal structure is disrupted - a belief system shatters, an institution collapses - internal energy is released as capacity for state change, just as nuclear fission releases the energy stored in atomic structure.

**On the form of $E_{\text{int}}$**: In physics, $E = mc^2$ is not an assertion - it is derived from the Lorentz metric of spacetime. The energy-momentum 4-vector $p^\mu = (E/c, \vec{p})$ has an invariant norm $\eta_{\mu\nu}p^\mu p^\nu = m^2c^2$, which gives $E_0 = mc^2$ in the rest frame. The $c^2$ factor arises specifically because the spacetime metric is pseudo-Riemannian with signature $(+,-,-,-)$ and $c$ converts between time and space dimensions.

For a general state space, the internal energy is $E_{\text{int}} = f(\mathcal{M}, c_{\mathcal{D}})$ where the function $f$ depends on the metric structure of $S$. If $S$ has a pseudo-Riemannian metric with a maximum propagation speed $c_{\mathcal{D}}$, then $f = \mathcal{M}c_{\mathcal{D}}^2$ by the same derivation. The qualitative claim - that internal causal structure stores capacity for state change, released when the structure breaks down - holds regardless of the specific form of $f$.

> [!sidenote]
> *Why the $c^2$ form may survive coarse-graining*: The $c^2$ form may survive coarse-graining because every scale has a maximum causal propagation speed, creating an effective light-cone structure. Whether this is rigorous is an open question ([Part 5, Section 2](./05_ontology_and_open_questions.md)).

**On the coarse-graining argument for $E_{\text{int}} = \mathcal{M}c_{\mathcal{D}}^2$**: All higher-level phenomena - biological, psychological, social - are implemented in physical substrate with Lorentz invariance. When coarse-graining from fundamental physics upward (quarks to atoms to cells to organisms to institutions), you integrate out fast degrees of freedom at each scale, producing an effective theory for the slow ones. The key structural question is whether the pseudo-Riemannian metric signature survives this coarse-graining.

It should, for a topological reason: at every scale, there exists a maximum speed at which causal influence propagates. Neural signals: ~100 m/s. Social information via modern media: bounded by human processing speed at ~seconds per decision. Institutional change: bounded by decision cycles at ~days. Each domain has its own effective $c_{\mathcal{D}}$ - the bottleneck speed of the causal chain at that scale - and all are bounded from above by $c$. This maximum speed defines an effective light cone at each scale: causally connected events (inside) vs. causally disconnected events (outside).

If the coarse-graining preserves this structure - and it should, because causal ordering is topological and topological properties tend to survive coarse-graining - then the 4-vector structure that produces $E = mc^2$ also survives at each effective scale: $E_{\text{int},\ell} = \mathcal{M}_\ell \cdot c_{\mathcal{D},\ell}^2$, where $\mathcal{M}_\ell$ is the effective mass at scale $\ell$ and $c_{\mathcal{D},\ell}$ is the effective maximum propagation speed. The $c^2$ form is then not an analogy imported from physics but a structural invariant inherited through renormalization group flow. Whether this argument is rigorous - whether coarse-graining *always* preserves pseudo-Riemannian structure or can break it at certain phase transitions - is an open question connecting to the Ruliad program ([Part 5, Section 2](./05_ontology_and_open_questions.md)).

*Energy-time conjugacy*: In physics, an energy-time uncertainty relation holds alongside the position-momentum relation:

$$\sigma_E \cdot \sigma_t \geq C'$$

*Note*: The energy-time relation has a different status from the position-momentum relation. In non-relativistic quantum mechanics, time is a parameter, not an observable - there is no time operator $\hat{t}$ analogous to the position operator $\hat{x}$. The energy-time bound is derived from the Mandelstam-Tamm relation (the rate of change of expectation values) rather than from a canonical commutator. The two relations are not on identical formal footing, though both impose irreducible uncertainty bounds. In relativistic quantum field theory, time and energy are treated more symmetrically as components of a 4-vector, which restores a closer parallel.

where $C'$ is a constant determined by the system's structure. You cannot simultaneously specify exactly how much capacity for state change a system has and exactly when that capacity will be deployed. This is structural, following from the Hamiltonian formalism that produces the position-momentum uncertainty (though, as noted above, the formal derivations differ).

In the Wolfram hypergraph framework, energy is the timelike flux of causal edges and time is the parameter of causal graph evolution. Their conjugacy is built into the structure: specifying the exact rate of causal edge flow (energy) at an instant requires sampling the graph at that instant, which blurs the temporal resolution.

The generalized implications are immediate:
- A person "full of energy" has high $E$ with uncertain timing - *when* they will act is indeterminate. A precisely scheduled action has definite $t$ but uncertain $E$ - exactly how much state change it will produce is fuzzy.
- Revolutionary movements have enormous $E$ (capacity to change the state of political systems) with fundamentally unpredictable $t$. The energy-time uncertainty principle applied to social state spaces predicts exactly this unpredictability.
- An institution that specifies exactly when it will act (rigid scheduling, fixed deadlines) necessarily accepts uncertainty in how much state change each action produces. An institution that demands precise outcomes ($E$ tightly controlled) necessarily accepts uncertainty in timing.

---

## 4b. The Lagrangian, Least Action, and Equilibrium Principles

Epimechanics so far has asserted $F = dp/dt$ and $p = \mathcal{M}\dot{X}$ as postulates. But in physics, these are not postulates - they are consequences of a deeper principle. In physics, the most fundamental formulation of mechanics is not $F = ma$ but the **principle of stationary action**. Epimechanics proposes (as its strongest structural postulate) that this extends to generalized state spaces:

$$\delta S = 0, \quad S = \int_0^T L(X, \dot{X}, t) \, dt$$

The actual trajectory $X(t)$ is the one that makes the action functional $S$ stationary - not any trajectory, but the *optimal* one. The Lagrangian $L$ is kinetic minus potential energy:

$$L = T - V = \frac{1}{2}\mathcal{M}\lvert\dot{X}\rvert^2 - V(X)$$

(Scalar mass approximation; the general form is $L = \frac{1}{2}\mathcal{M}_{ij}\dot{X}^i\dot{X}^j - V(X)$ - see Section 2b, note on the mass tensor.)

> **Caveat: Epimechanics' strongest structural postulate.** This specific quadratic form is not derived - it is *posited*. In physics, the form of the Lagrangian is determined by experiment and symmetry constraints, not by first principles. Three commitments are embedded in this choice that carry real empirical weight. First, the quadratic kinetic term $\frac{1}{2}\mathcal{M}\lvert\dot{X}\rvert^2$ presupposes an inner product (metric) on the tangent space of $S$; different metrics yield different physics, and selecting the "right" metric for a non-physical domain (beliefs, institutions, markets) is an open empirical problem, not a formal consequence of Epimechanics. Second, the $T - V$ structure assumes conservative dynamics - energy is traded between kinetic and potential forms without loss. Most social, psychological, and biological systems are dissipative; extending the framework to such systems requires a [Rayleigh dissipation function](https://en.wikipedia.org/wiki/Rayleigh_dissipation_function) or a non-conservative variational principle (see "The status of these principles" below). Third, whether any system outside physics actually admits this specific Lagrangian is an empirical question: Epimechanics provides the *grammar* (state space, action principle, Euler-Lagrange equations), but the *vocabulary* (which $L$ applies in which domain) must be filled in domain by domain through observation and measurement.

The [Euler-Lagrange equation](https://en.wikipedia.org/wiki/Euler%E2%80%93Lagrange_equation) - the condition $\delta S = 0$ - yields:

$$\frac{d}{dt}\frac{\partial L}{\partial \dot{X}} = \frac{\partial L}{\partial X}$$

Evaluating: $\partial L / \partial \dot{X} = \mathcal{M}\dot{X} = p$ (generalized momentum), and $\partial L / \partial X = \frac{1}{2}(\partial \mathcal{M}/\partial X)|\dot{X}|^2 - \nabla V$. In the simplest case where $\mathcal{M}$ does not depend on $X$ (mass is independent of position in state space), this reduces to $-\nabla V = F$, giving:

$$\frac{dp}{dt} = F \quad \Longrightarrow \quad \mathcal{M}\ddot{X} + \dot{\mathcal{M}}\dot{X} = -\nabla V$$

The full force equation from Section 3 - including the $\dot{\mathcal{M}}\dot{X}$ cross-term - is **derived**, not assumed. It follows from a single optimization principle: entities follow trajectories through state space that make the action stationary. The derivation is standard Euler-Lagrange mechanics applied to the proposed Lagrangian $L = \frac{1}{2}\mathcal{M}|\dot{X}|^2 - V(X)$: compute $\partial L / \partial X$ and $\frac{d}{dt}(\partial L / \partial \dot{X})$, apply the product rule to the time derivative (since $\mathcal{M}$ may depend on $t$), and equate. The variable-mass cross-term $\dot{\mathcal{M}}\dot{X}$ emerges automatically from the product rule - it is not an additional assumption. This is the same calculation that produces Newton's laws in physics; only the state space differs.

> [!sidenote]
> *Note on "derived":* The force equation is derived *from the Lagrangian* - but the Lagrangian itself is a structural postulate (see caveat above). "Derived" here means "follows as a mathematical consequence of the proposed $L$," not "follows from first principles without assumptions." The derivation is standard and can be found in any classical mechanics text (e.g., [Goldstein, Poole, & Safko, *Classical Mechanics*, 3rd ed.](https://doi.org/10.1119/1.1484149), Chapter 2; [Taylor, *Classical Mechanics*](https://doi.org/10.1017/CBO9781139005111), Chapter 7).

**Why this matters**: The principle of stationary action is more general than $F = dp/dt$ in three ways:

1. **It defines conjugate momentum.** The momentum $p = \partial L / \partial \dot{X}$ falls out of the Lagrangian. If the Lagrangian has additional terms (dissipation, non-conservative forces, coupling between domains), the conjugate momentum automatically adjusts.

2. **It produces conservation laws via [Noether's theorem (1918)](https://doi.org/10.1080/00411457108231446).** Every continuous symmetry of the Lagrangian corresponds to a conserved quantity. If $L$ does not depend explicitly on time ($\partial L / \partial t = 0$), energy is conserved. If $L$ does not depend on position in some dimension ($\partial L / \partial X^i = 0$), momentum in that dimension is conserved. The conservation laws are not separate postulates - they are consequences of the system's symmetries.

3. **It constrains which trajectories are physically possible.** Not every path through state space is realized. Only those that extremize the action are. This is a powerful structural constraint: it means entity trajectories are not arbitrary - they are *optimal* in a precise mathematical sense.

**Generalized examples**:
- A person navigating a career transition follows a path through professional state space. The action principle says this path extremizes $\int (T - V) \, dt$ - balancing the kinetic energy of change against the potential landscape of opportunities, constraints, and costs. The actual trajectory is not random; it is the one that optimally trades off momentum against the gradient of the potential field.
- A market finding a new equilibrium after a shock follows the path of stationary action through price-state space. The price trajectory overshoots, oscillates, and settles - the dynamics of Euler-Lagrange solutions in a potential well.
- An institution reforming under pressure follows a trajectory that balances the kinetic energy of change ($\frac{1}{2}\mathcal{M}\lvert\dot{X}\rvert^2$) against the potential landscape of institutional constraints ($V(X)$). Too little kinetic energy and the system stays trapped in a local minimum. Too much and it overshoots the target attractor.

### Equilibrium principles

The action principle governs dynamics - trajectories over time. Complementary principles govern equilibrium - where systems come to rest:

**Minimum energy**: At constant entropy, systems tend toward configurations that minimize total energy. Beliefs settle into attractor basins. Institutions find stable configurations. Markets find price equilibria. Each is a minimum of the potential $V(X)$ - a point where $\nabla V = 0$ and the Hessian $\nabla^2 V$ is positive definite (the state is at a local minimum, not a saddle point or maximum).

**Minimum free energy**: At constant temperature, systems minimize the [Helmholtz free energy](https://en.wikipedia.org/wiki/Helmholtz_free_energy) $\mathcal{F} = E_{\text{total}} - T_{\text{thermo}} \cdot S_{\text{entropy}}$ - balancing the drive toward low energy against the drive toward high entropy (disorder, exploration of state space). [Friston's free energy principle](https://doi.org/10.1038/nrn2787) is structurally analogous: organisms minimize *variational* free energy - an information-theoretic upper bound on surprise - which plays a formally similar role to thermodynamic free energy though it is defined in a different space (over probability distributions rather than thermodynamic states). This acts as a generalized equilibrium principle - it says living systems maintain themselves at the minimum of a free energy functional defined over their state space. The connection to the Lagrangian formulation is suggestive: Friston's variational free energy plays a role analogous to the potential $V(X)$ in the Euler-Lagrange equation, and the active inference framework that follows from it describes the dynamics of an entity following the path of stationary action through its state space.

**Maximum entropy production**: Far-from-equilibrium systems - which is what all living and social entities are - may tend to maximize the rate of entropy production under certain conditions. [Dewar (2003)](https://doi.org/10.1088/0305-4470/36/3/303) proposed a derivation from information theory, though the Maximum Entropy Production Principle remains contested and does not hold universally. Where it does apply, it acts as a variational principle complementary to least action. The implication for Epimechanics: persistent structures (entities with $\kappa_s > 0$) are precisely those configurations that efficiently process energy gradients - they exist *because* they increase the rate at which the environment approaches equilibrium. An entity is, in this view, a dissipative structure that the universe maintains because it is thermodynamically useful. [Prigogine's (*Order Out of Chaos*, 1984)](https://www.penguinrandomhouse.com/books/643445/order-out-of-chaos-by-ilya-prigogine-and-isabelle-stengers/) established this for physical and chemical systems; Epimechanics extends it to informational and social structures.

### The status of these principles in Epimechanics

The Lagrangian $L = \frac{1}{2}\mathcal{M}\lvert\dot{X}\rvert^2 - V(X)$ and the action principle $\delta S = 0$ are proposed here as the foundational formulation of Epimechanics - more fundamental than the force equation, which is derived from them. Whether this Lagrangian is the *correct* one for all generalized systems remains open: systems with dissipation (friction, damping, information loss) require additional terms; systems with non-conservative forces (forces that depend on velocity or history) may not admit a standard Lagrangian at all. These complications are real and well-studied in physics - the [Rayleigh dissipation function](https://en.wikipedia.org/wiki/Rayleigh_dissipation_function) handles velocity-dependent damping; [non-holonomic constraints](https://en.wikipedia.org/wiki/Nonholonomic_system) require extended variational principles. Epimechanics inherits both the power and the limitations of the Lagrangian formulation.

What is *not* open is the structural claim: if a system admits a Lagrangian description at all, then conservation laws follow from symmetries, the force equation is derived rather than postulated, and trajectories are optimal rather than arbitrary. The question for each domain of application is whether the Lagrangian description applies - and if so, what symmetries the domain possesses and what conservation laws they produce.

---

## 5a. Coupling Constant κ

**Physics**: Coupling constants (G in gravity, α the fine structure constant in electromagnetism) specify how strongly a particle or field interacts with a force. A particle with zero electric charge has zero electromagnetic coupling - the field exists, but exerts no influence on that particle.

**Generalized**: Every entity has a coupling variable $\kappa$ for every domain of reality. This is the same mathematical structure:

$$F_{\text{entity}} = \kappa \cdot F_{\text{field}}$$

The field exerts a force; how strongly that force acts on a given entity depends entirely on the entity's coupling constant to that field.

[Stankovski et al. (*Reviews of Modern Physics*, 2017)](https://doi.org/10.1103/RevModPhys.89.045001) formalize coupling functions across physical, biological, and social systems, demonstrating that coupling form - not just coupling strength - encodes the mechanism of interaction. Their framework applies to coupled oscillators across all these domains: the coupling function determines not just whether coupling is present but *how* one system's state influences another's rate of change. This is a direct operationalization of $\kappa$ across radically different system types.

**Metaphysical examples**:
- Two people encounter the same economic shock (same $F_{\text{field}}$). One is financially fragile - high $\kappa$ to the economic field - and their state changes drastically: loss of housing, employment, and stability cascade. The other has reserves, social capital, and diversified income sources - low $\kappa$ - and barely moves. Their coupling constants differ, not their intelligence or moral character. This is a precise structural claim.
- Two researchers read the same paper (same $F_{\text{field}}$). One in an adjacent field has high $\kappa$ - the ideas connect immediately to their existing framework and produce large $d^2X/dt^2$ in their belief state. One in a remote field has low $\kappa$ - the ideas don't land, produce no state change. Coupling constants to the epistemic field differ.
- A person immersed in a cultural field has different $\kappa$ than someone at its periphery, even if the field values are identical at their location.

**Form**: $F_{\text{entity}} = \kappa \cdot F_{\text{field}}$, where $\kappa$ is the entity's coupling constant to that field.

---

## 5b. The Existential Coupling Tensor $T^i{}_j$

The scalar $\kappa$ is the simplest case - and often the wrong one. In reality, X is multi-dimensional. A person's state is a vector with simultaneous components in emotional, cognitive, physical, social, economic, and other dimensions. A scalar coupling treats all dimensions as independent and identical: economic force → economic state change, full stop.

But the structure of coupling matters more than its magnitude. Economic stress bleeds into psychological state. Psychological state feeds back into social behavior. Social isolation drives physical health outcomes. Physical illness depletes cognitive resources. These cross-dimensional propagation paths are not captured by a scalar $\kappa$. They require a **coupling tensor** $T^i{}_j$:

$$F_{\text{entity}}^i = T^i{}_j \, F_{\text{field}}^j$$

(contraction over source index $j$; free index $i$ labels the response dimension)

Where:
- **$j$** (lower index) indexes the source dimension of the field force (which dimension of reality is exerting influence)
- **$i$** (upper index) indexes the response dimension of the entity's state (which dimension of the entity's state changes)
- **$T^i{}_i$ (diagonal)**: within-dimension coupling. Economic force → economic state change. Compartmentalized response.
- **$T^i{}_j$ ($i \neq j$) (off-diagonal)**: cross-domain coupling. Economic force → psychological state change. The bleeding-through.

The off-diagonal terms are where the real explanatory work happens.

Two entities with identical diagonal terms (same within-dimension sensitivity to each field) but different off-diagonal structure respond completely differently to identical disruption:

- **Highly compartmentalized entity** (large diagonal, small off-diagonal T): economic disruption stays economic. The psychological, physical, and social dimensions remain stable. This person can sustain function in multiple life domains even while one collapses.
- **Highly integrated entity** (large off-diagonal T): economic shock becomes psychological crisis becomes physical illness becomes social withdrawal in cascade. The entire state vector shifts simultaneously. The same financial disruption that inconveniences the compartmentalized person unravels the integrated person's entire existence.

This distinction is not captured by any scalar description. It is the tensor T that encodes the structure of vulnerability.

![Coupling comparison: compartmentalized entity confines economic shock to one domain, while integrated entity cascades across domains](/docs/theory/images/coupling_comparison.svg)

Epimechanics immediately suggests measurable predictions: entities with high off-diagonal T in particular coupling channels should show correlated state changes across domains; interventions that reduce off-diagonal coupling (therapeutic compartmentalization, resilience training, social support networks) should reduce the cascade amplitude.

*On the mathematical status of $T^i{}_j$*: Epimechanics already assumes $S$ is a smooth manifold - it must be, because the Lagrangian formulation (Section 4b) requires $\partial L / \partial \dot{X}$ to exist, which requires differentiable structure. If $S$ is a manifold, then the tangent space $T_X S$ exists at every point, and the coupling is properly defined as a **coordinate-free bilinear map**:

$$T: T_X^* S \to T_X S$$

![The coupling tensor as a coordinate-free bilinear map: force covector input, tensor T maps it to response vector output; domain labels are a coordinate representation](/docs/theory/images/coupling_tensor_map.svg)

mapping force covectors (elements of the cotangent space - the direction and magnitude of an applied influence) to response vectors (elements of the tangent space - the direction and magnitude of the entity's state change). This is a tensor by definition - no approximation, no hedging. It is a $(1,1)$-tensor on $S$.

The notation $T^i{}_j$ is then the **coordinate representation** of this tensor in a particular chart on $S$. The labels "economic," "psychological," "physical" are not fundamental structure - they are a **coordinate choice**: a particular way of projecting the high-dimensional state space into human-interpretable axes. Different observers - a therapist, an economist, a neuroscientist - would choose different coordinate charts on the same underlying manifold, producing different matrix representations of the same tensor. The tensor $T$ is the same object in all charts; what changes is its representation $T^i{}_j$.

This resolves several apparent difficulties:

- **Domain boundaries are coordinate artifacts.** The worry that "economic" and "psychological" are not cleanly separable is a statement about the coordinate chart, not the tensor. A phenomenon that is simultaneously economic and psychological is a vector in $T_X S$ that has nonzero components in both directions *in that particular chart*. In a different chart (a neuroscientist's coordinates, say), the same vector might have components along entirely different axes. The off-diagonal elements of $T^i{}_j$ - the stress cascades from economic to psychological - are coordinate-dependent features of a coordinate-independent object.
- **Cognitive reframing is a coordinate transformation.** When therapy reframes anger as fear, or recasts failure as learning, it changes the coordinate chart on the psychological subspace of $S$. The coupling tensor $T$ does not change - the entity's structural response to forces is the same - but its representation $T^i{}_j$ changes because the axes have rotated. This is how coordinate transformations work in physics: the physics is invariant; the description depends on the chart.
- **The "correct" domain decomposition is a convenience, not a fact.** There is no privileged decomposition of $S$ into economic, psychological, physical, etc. - just as there is no privileged decomposition of spacetime into x, y, z, t. Some charts are more convenient than others for particular problems. The coupling tensor's eigenstructure (its principal axes and eigenvalues) is chart-independent and may reveal a natural decomposition - domains that are genuinely decoupled from each other - but this is a discovery about $T$'s structure, not an assumption built into the formalism.

The genuine open question is not "is $T^i{}_j$ a tensor?" - it is, given the manifold assumption that the Lagrangian formulation already requires - but **what is the geometry of $S$?** What is its dimensionality? Its topology? Its curvature? These are empirical questions about the structure of the state spaces entities inhabit, and they determine the structure of the tensors defined on them. (See [Part 5, Open Question 2](./05_ontology_and_open_questions.md).)

---

## 6. Fields as Domains of Influence

**Physics**: A field assigns a value (scalar, vector, or tensor) to every point in space. The gravitational field assigns a force vector to every point in space - specifying what force would act on a test mass placed there. The electromagnetic field assigns both electric and magnetic vector quantities. Fields are real; they carry energy; they mediate interactions.

**Generalized**: Any domain of influence that assigns values across a space is a field. The space need not be geometric.

- **Culture** is a field over social space. It assigns default norms, behavioral expectations, and implicit pressures to every position within it. Moving to a different position in social space (different community, profession, or peer group) changes the field values acting on you.
- **Reputation** is a field over organizational space. It assigns different force values at different positions - what you can accomplish depends on where in the organizational space you stand.
- **Information environment** is a field over epistemic space. It assigns, at each epistemic position, the evidential forces pushing the occupant toward or away from particular beliefs.
- **Economic incentive structure** is a field over behavioral space. It assigns payoff gradients that exert force on agents' behavioral state variables.

### What generates a field?

In physics, fields are not free-floating - they are generated by sources. Mass-energy generates the gravitational field (Einstein's field equations: $G_{\mu\nu} = 8\pi G \, T_{\mu\nu}$). Charges and currents generate the electromagnetic field (Maxwell's equations). The potential $V(x)$ at any point is the integrated contribution of all sources.

The same structure applies in Epimechanics. A field $\Phi(x)$ is generated by the entities embedded in it. The potential at any position $X$ in state space is the superposition of causal influences from all other entities:

$$V(X) = \int \phi(X, X') \, \rho(X') \, dX'$$

where $\phi(X, X')$ is the pairwise interaction kernel - how strongly an entity at state $X'$ influences position $X$ - and $\rho(X')$ is the density of entities at position $X'$ in state space. This is the **mean-field construction**: the field experienced by any one entity is the aggregate of all other entities' contributions, weighted by the interaction kernel and the density of sources.

A cultural norm field is generated by the behavioral states of a population: each person's behavior contributes to the norm pressure felt by every other person. The interaction kernel $\phi$ encodes how influence decays with social distance - a close peer contributes more to the local field than a distant stranger. The field is real in the sense that its effects are measurable and its sources are identifiable. In Epimechanics, it is the formal expression of social influence, stated in the mathematical language of field theory.

An economic incentive field is generated by the aggregate of all agents' supply, demand, and pricing behavior. The field at a given point in behavioral space (a particular product, price, and market position) is the gradient of payoff created by all other agents' actions. The interaction kernel is the market mechanism itself.

This mean-field construction explains why fields feel "given" from the perspective of any individual entity: each entity is one source among many, so the field it experiences is dominated by the contributions of all the others. The field changes slowly relative to any individual's actions - just as a single molecule in a gas does not noticeably change the pressure. This is the regime where the field description is valid. When individual entities are large enough to significantly alter the field (a monopolist in a market, a charismatic leader in a social movement), the mean-field approximation breaks down and the full many-body dynamics must be tracked.

![Mean-field construction: entities generating the field they sit in - each radiates influence, the aggregate creates the potential landscape V(X)](/docs/theory/images/mean_field.svg)

The field is real; entities in it are subject to forces whether or not they are aware of them. A fish in water is in a field. A person in a culture is in a field. The forces act regardless of the entity's model of them.

**Metaphysical example**: Moving from one country to another changes the field you are embedded in. Your coupling tensor $T^i{}_j$ is unchanged - your values, capabilities, personality, and response structures persist across the move. But the field values $\Phi(x)$ at your new location differ, so the forces $F^i = T^i{}_j \, \nabla^j\Phi(x)$ acting on your state differ. It is not you that changed. It is $F_{\text{field}}$ evaluated at a new position x.

This separates two distinct sources of behavioral change: changes in the entity's coupling structure (therapy, education, trauma, growth - changes to $T^i{}_j$) versus changes in field values (moving, economic shifts, policy changes - changes to $\Phi(x)$). Both can produce identical behavioral outcomes; they have different causal signatures.

**Form**: $\Phi(x)$ = value of field at position x;

$$F^i = T^i{}_j \, \nabla^j\Phi(x)$$

---

## 6b. Interactions Between Entities

Two entities interact when their coupling produces mutual state change. Entity $A$ at state $X_A$ exerts force on entity $B$ through the field $\Phi$ that $A$ helps generate (via the mean-field construction above), and $B$ responds according to its coupling tensor $T^i{}_j$:

$$F_{A \to B} = T^i{}_j(B) \cdot \nabla^j \Phi_A(X_B)$$

where $\Phi_A$ is $A$'s contribution to the field at $B$'s position. The reverse interaction $F_{B \to A}$ follows the same form with indices swapped. Newton's third law (equal and opposite reaction) does NOT hold in general in abstract state spaces - the coupling tensors of $A$ and $B$ may be entirely different, producing asymmetric interaction. A charismatic speaker exerts large force on an audience; the audience exerts small force on the speaker. The asymmetry is structural - it reflects different coupling structures, not a violation of conservation.

Interactions can be:
- **Conservative**: total energy $T + V$ is preserved. Entity $A$ loses energy that $B$ gains. Rare in social systems.
- **Dissipative**: energy is lost to the environment. Common: most social interactions dissipate energy as heat, noise, or unstructured state change.
- **Generative**: the interaction taps internal energy ($E_{\text{int}} = \mathcal{M}c_{\mathcal{D}}^2$) of one or both entities, converting structural energy into kinetic or potential energy. A conversation that "energizes" both participants is generative: internal causal structure is being reorganized in ways that release capacity for state change.

---

## 7. The Thermodynamic and Fluid-Dynamic Levels

The mechanics developed in Sections 1-6b describe individual entities: their state, mass, momentum, forces, energy, coupling, boundaries, and interactions. When many entities occupy the same state space simultaneously, two higher levels of description emerge - just as in physics, where the mechanics of individual particles gives rise to thermodynamics and fluid dynamics at the macro scale.

### 7a. Statistical mechanics and thermodynamics of state spaces

Let $N$ entities occupy a state space $S$, each with state $X_i$, mass $\mathcal{M}_i$, and velocity $\dot{X}_i$. The distribution of entities across state space is described by the density $\rho(X, t)$. From this ensemble, thermodynamic quantities emerge as statistical aggregates:

**Temperature** $\mathcal{T}$: the average kinetic energy per entity:

$$\mathcal{T} \propto \left\langle \frac{1}{2}\mathcal{M}\lvert\dot{X}\rvert^2 \right\rangle$$

Temperature measures how much agitation is present - how rapidly entities are changing state. A "hot" social system has entities moving fast through state space (rapid opinion change, high behavioral volatility). A "cold" system has entities near rest (stable consensus, behavioral rigidity). A market in a period of high volatility has high $\mathcal{T}$; a market in a stable equilibrium has low $\mathcal{T}$.

> [!caveat] **Equilibrium limitation.** This equipartition definition requires near-equilibrium. Most social systems are far from equilibrium. Non-equilibrium extensions (Jarzynski equality, fluctuation theorems) exist but are not yet incorporated.

**Pressure** $P$: the force per unit boundary in state space. When many entities are crowded into a small region of state space - a narrow consensus under tension, a market with many participants concentrated at similar prices - pressure builds. The pressure is the aggregate force that entities at the boundary exert on the constraints holding them in place. A population under ideological conformity pressure has high $P$ if the conformity is enforced (the constraint is rigid) and the population has kinetic energy (individuals are trying to move but are prevented).

**Entropy** $S_{\text{ent}}$: the logarithm of the number of accessible microstates consistent with the observed macro-state:

$$S_{\text{ent}} = -\int \rho(X) \ln \rho(X) \, dX$$

(the continuous analogue of the Gibbs/Shannon entropy). High entropy means many possible configurations of individual entity states are consistent with the aggregate description - the system is disordered, unpredictable at the individual level. Low entropy means the macro-state tightly constrains individual states - the system is ordered, predictable.

**Free energy** $\mathcal{F} = E_{\text{total}} - \mathcal{T} \cdot S_{\text{ent}}$: the capacity for *directed* state change - total energy minus energy locked in thermal fluctuations. This is the available energy that can do work on external systems. An organization's "usable energy" is its free energy: total capacity for change minus the portion absorbed by internal noise, disagreement, and undirected activity. [Friston's free energy principle](https://doi.org/10.1038/nrn2787) is the biological instantiation: organisms minimize variational free energy, maintaining themselves at the minimum of a free energy landscape.

**Phase transitions**: At critical parameter values, the macro-state changes qualitatively. Consensus → polarization. Stable market → crash. Peace → revolution. Liquid → gas. The sociophysics literature has documented these rigorously: [Galam, Gefen & Shapir (1982)](https://doi.org/10.1007/BF01012507) showed that opinion dynamics exhibit the same phase transition behavior as magnetic spin systems, with critical exponents, order parameters, and universality classes. [Castellano, Fortunato & Loreto (*Reviews of Modern Physics*, 2009)](https://doi.org/10.1103/RevModPhys.81.591) survey the field fully. Phase transitions in social state spaces are the same mathematical phenomenon (spontaneous symmetry breaking in a many-body system) occurring in a different state space.

![Phase transition: order parameter (consensus) vs temperature (volatility), with early-warning signals diverging near the critical point](/docs/theory/images/phase_transition.svg)

**Equation of state**: The relationship between $P$, $\mathcal{T}$, and $\rho$ constrains which macro-states are accessible. In an ideal gas, $PV = Nk_BT$. In a social system, the analogous equation of state relates the pressure of conformity to the temperature of behavioral volatility and the density of agents in state space. Deriving domain-specific equations of state is an open empirical challenge - but the structural prediction is that such relationships exist and are measurable.

### 7b. Fluid dynamics of state-space flow

When the entity density $\rho(X, t)$ and velocity field $\mathbf{v}(X, t) = \langle \dot{X} \rangle_{X}$ are smooth, the dynamics of the ensemble satisfy fluid equations.

**Continuity equation** (conservation of entities):

$$\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \mathbf{v}) = \sigma$$

where $\sigma(X, t)$ is a source/sink term for entity creation and destruction - births, deaths, conversions, institutional founding and dissolution. In physics, the continuity equation has $\sigma = 0$ (particle number is conserved). In social systems, entities are created and destroyed, so $\sigma \neq 0$ in general.

**Navier-Stokes analogue** (momentum balance in state space):

$$\rho\left(\frac{\partial \mathbf{v}}{\partial t} + \mathbf{v} \cdot \nabla \mathbf{v}\right) = -\nabla P + \mu \nabla^2 \mathbf{v} + \mathbf{F}_{\text{ext}}$$

This is the [Navier-Stokes equation](https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations) applied to flow through state space rather than physical space:

- **$\rho(\partial \mathbf{v}/\partial t + \mathbf{v} \cdot \nabla \mathbf{v})$**: inertial terms - the acceleration of the flow, including the nonlinear advection term $\mathbf{v} \cdot \nabla \mathbf{v}$ that produces turbulence.
- **$-\nabla P$**: pressure gradient - entities flow away from crowded regions of state space toward less dense regions. A buildup of agents at a consensus point creates pressure; if the consensus breaks, the flow outward is driven by $-\nabla P$.
- **$\mu \nabla^2 \mathbf{v}$**: **viscous forces**, where $\mu$ is the generalized viscosity - the resistance of the medium to shearing in state space. High viscosity means neighboring entities in state space resist moving at different velocities: conformist cultures, tightly regulated markets, institutional inertia that enforces uniform rates of change. Low viscosity means entities move independently: fragmented societies, deregulated markets, weak institutional coupling.
- **$\mathbf{F}_{\text{ext}}$**: external forces - field gradients, policy interventions, environmental shocks acting on the flow.

**Reynolds number** $Re = \rho v L / \mu$: the ratio of inertial to viscous forces, where $v$ is a characteristic flow speed, $L$ is a characteristic length scale in state space, and $\mu$ is the viscosity. The Reynolds number determines the character of the flow:

- **Low $Re$ (laminar flow)**: viscous forces dominate. State change is orderly, predictable, and smooth. A tightly controlled institution with strong norms: everyone changes state at similar rates in similar directions.
- **High $Re$ (turbulent flow)**: inertial forces dominate. State change is chaotic, unpredictable, and sensitive to small perturbations. A society near a phase transition, a market in crisis, a political system under stress: small triggers produce large, unpredictable cascades of state change.

The transition from laminar to turbulent flow at a critical Reynolds number is a universal phenomenon - it occurs in every fluid system, physical or abstract, that satisfies the Navier-Stokes structure. The prediction for social systems: there exists a measurable critical $Re$ above which orderly collective state change becomes turbulent. [Lorenz-Spreen et al. (*Nature Communications*, 2019)](https://doi.org/10.1038/s41467-019-09311-w), already cited in Part 4, documented that the attention dynamics of cultural content have been accelerating - which, in the fluid framework, corresponds to increasing the characteristic velocity $v$, which increases $Re$, which drives the system toward turbulence. The increasing unpredictability of cultural dynamics is, in Epimechanics, a Reynolds number effect.

![Laminar vs turbulent flow through state space: orderly parallel streamlines at low Reynolds number vs chaotic crossing trajectories at high Reynolds number](/docs/theory/images/laminar_vs_turbulent.svg)

> [!sidenote]
> *Note on the status of these equations*: The NS equations are derived from microscopic dynamics via Chapman-Enskog expansion. Whether local equilibrium holds in social/cognitive domains is an empirical question.

---

## Summary: The Generalized Mechanics

| Physics Concept | Generalized Concept | Mathematical Form |
|---|---|---|
| Position | State of any system | $X \in S$ |
| Velocity | Rate of state change | $\dot{X} = dX/dt$ |
| Mass | Total causal density | $\mathcal{M} = \int \rho_{\text{causal}} \, d\mu$ |
| Momentum | Mass times velocity (scalar approx.; general: $p_i = \mathcal{M}_{ij}\dot{X}^j$) | $p = \mathcal{M} \cdot \dot{X}$ |
| Force | Rate of change of momentum (scalar approx.; general: $F_i = \mathcal{M}_{ij}\ddot{X}^j + \dot{\mathcal{M}}_{ij}\dot{X}^j$) | $F = \mathcal{M}\ddot{X} + \dot{\mathcal{M}}\dot{X}$ |
| Kinetic energy | Energy of motion (scalar approx.; general: $T = \frac{1}{2}\mathcal{M}_{ij}\dot{X}^i\dot{X}^j$) | $T = \frac{1}{2}\mathcal{M}\lvert\dot{X}\rvert^2$ |
| Potential energy | Energy stored in position within a field | $V = V(X)$ |
| Internal energy | Energy stored in entity's causal structure | $E_{\text{int}} = f(\mathcal{M}, c_{\mathcal{D}})$; $= \mathcal{M}c_{\mathcal{D}}^2$ if state space is pseudo-Riemannian |
| Work | Capacity to produce state change | $W = \int F \cdot dX$ |
| Lagrangian | Kinetic minus potential energy (scalar approx.; general: $L = \frac{1}{2}\mathcal{M}_{ij}\dot{X}^i\dot{X}^j - V(X)$) | $L = \frac{1}{2}\mathcal{M}\lvert\dot{X}\rvert^2 - V(X)$ |
| Action principle | Trajectories extremize the action | $\delta \int L \, dt = 0$ derives $F = dp/dt$ |
| Conjugate pairs | Position-momentum; energy-time | $\sigma_X \sigma_p \geq C$; $\sigma_E \sigma_t \geq C'$ |
| Coupling constant | Entity's sensitivity to a domain's forces (scalar) | $F_{\text{entity}} = \kappa \, F_{\text{field}}$ |
| Coupling tensor | Structured cross-domain sensitivity | $F_{\text{entity}}^i = T^i{}_j \, F_{\text{field}}^j$ |
| Field | Any domain assigning influence across a space | $\Phi(x)$, $F^i = T^i{}_j \, \nabla^j\Phi(x)$ |
| Field source (mean-field) | Field generated by aggregate of all entities | $V(X) = \int \phi(X,X') \rho(X') dX'$ |
| Auto-causal density | How strongly a region of state space sustains itself | $\rho_{\text{ac}}(x)$ = density of self-sustaining causal events |
| Generalized mass (from $\rho_{\text{causal}}$) | Total causal content of an entity | $\mathcal{M} = \int \rho_{\text{causal}} \, d\mu$ |
| Entity boundary | Gradient where auto-causal density drops to background | $\partial E = \{x : \rho_{\text{ac}}(x) = \rho_{\text{threshold}}\}$ |
| Temperature | Average kinetic energy per entity | $\mathcal{T} \propto \langle \frac{1}{2}\mathcal{M}\lvert\dot{X}\rvert^2 \rangle$ |
| Entropy | Accessible microstates of the ensemble | $S_{\text{ent}} = -\int \rho \ln \rho \, dX$ |
| Free energy | Capacity for directed change | $\mathcal{F} = E - \mathcal{T} S_{\text{ent}}$ |
| Continuity | Conservation of entities in state space | $\partial\rho/\partial t + \nabla \cdot (\rho \mathbf{v}) = \sigma$ |
| Navier-Stokes analogue | Momentum balance of entity flow | $\rho(D\mathbf{v}/Dt) = -\nabla P + \mu\nabla^2\mathbf{v} + \mathbf{F}_{\text{ext}}$ |
| Reynolds number | Laminar vs. turbulent state change | $Re = \rho v L / \mu$ |

### Concept Dependency

![Concept dependency graph showing how every quantity in Epimechanics derives from the state variable X and generalized mass M, through the Lagrangian and action principle, to thermodynamics and fluid dynamics](/docs/theory/images/concept_dependency.svg)

Physics, understood abstractly, is the skeleton of metaphysics.

---

## Closing

Epimechanics as developed above treats the state space $S$ as given - specified by whatever dimensions are relevant to the system in question. A deeper question is whether there is a fundamental state space from which all others are projections. [Stephen Wolfram's hypergraph physics](https://arxiv.org/abs/2004.08210) proposes exactly this: the **ruliad** - the space of all possible computations - as the ultimate state space, with every physical and abstract domain as a projection. The structural correspondences between Epimechanics and the Wolfram model are developed in detail in [Part 5](./05_ontology_and_open_questions.md): every concept in the skeleton - $X$, $\dot{X}$, $\mathcal{M}$, $p$, $F$, $W$, $\kappa$ - has a precise counterpart in the hypergraph formalism.

Physics is the special case. The state space is physical 3+1D spacetime, the entities are particles and fields, and the coupling is measured in Coulombs and kilograms.

But the structure - $X$, $\dot{X}$, $\mathcal{M}$, $p = \mathcal{M}\dot{X}$, $F$, $W$, $\kappa$, $T^i{}_j$, $\Phi$ - is substrate-independent. It describes any system in which states exist, states change, influences drive those changes, and entities differ in their sensitivity to those influences. That description fits physical systems. It equally fits minds, markets, cultures, relationships, and ideas.

The next part asks a harder question first: if X is defined in a state space S, how confident are we that S is the same for all entities? That X can be measured without changing it? That forces look the same from all reference frames? These complications - the analogues of quantum mechanics, non-Euclidean geometry, and relativity - must be addressed before Epimechanics can be applied honestly.

[→ Part 1b: Uncertainty, Coordinates, and Relativity](./01b_uncertainty_coordinates_relativity.md) | [→ Part 2: Meta-Entities](./02_meta_entities.md)
