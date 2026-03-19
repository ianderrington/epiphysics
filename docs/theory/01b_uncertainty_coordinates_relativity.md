---
title: "Epimechanics - Part 1b: Uncertainty, Coordinates, and Relativity"
description: >-
  Three structural complications of Epimechanics: states may be fundamentally
  uncertain, coordinate systems may be incommensurable across entities, and forces are reference-frame-relative.
  The analogues of quantum mechanics, non-Euclidean geometry, and relativity in metaphysical state spaces.
date: 2026-03-11T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
contentType: article
mediaTypes:
  - text
  - image
series: "Epimechanics"
series_order: 1.5
coverImage:
  url: ./images/physics_as_metaphysics_01b_uncertainty_coordinates_relativity-1-1.png
  alt: >-
    Overlapping probability clouds in a multidimensional state space, showing epistemic uncertainty.
    Two incompatible coordinate grids that cannot be mapped onto each other. Reference frames
    shifting the apparent force vectors. Quantum-like fog of possible states. Dark cosmic background,
    deep purple and teal glow, mathematical uncertainty as visual blur.
categories:
  - Philosophy
  - Physics
  - Consciousness
tags:
  - Uncertainty
  - Measurement
  - State space
  - Relativity
  - Coordinates
  - Observer effect
  - Quantum
bullets:
  - Measuring what X represents changes the thing being represented - the observer effect is not unique to quantum mechanics
  - Two entities' "angry" may be genuinely incommensurable - different coordinate charts on different manifolds
  - Forces and rates of change are reference-frame-relative - there is no privileged observer in social or psychological space
  - Epimechanics requires these three complications to be structurally honest
shareBlurbs:
  twitter: >-
    Person A's "angry" and Person B's "angry" may be genuinely incommensurable -
    different coordinate systems on different state space manifolds.
    The analogue of non-Euclidean geometry in emotional space. Part 1b of Epimechanics. #Philosophy #Physics
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
---

[Part 1](./01_generalized_mechanics.md) established the skeleton: $X \in S$, $\dot{X}$, $\mathcal{M}$, $p = \mathcal{M}\dot{X}$, $F$, $W$, $\kappa$, $T^i{}_j$, $\Phi$. It presented this in its clean, deterministic form - the mean-field limit, as physicists call it. But three structural complications arise immediately when Epimechanics is applied to social, psychological, and informational domains. Each of these complications has a precise analogue in fundamental physics. And in each case, the physics analogy suggests the correct formal treatment.

The three complications:

1. **Epistemic uncertainty**: The state X may not be precisely knowable, and observing it may change it
2. **Coordinate relativity**: The state space S may differ between observers - "angry" in person A's coordinate system may not map onto "angry" in person B's
3. **Reference frame relativity**: Forces, rates of change, and even "what counts as rest" may be observer-relative

Treating these as objections to Epimechanics would be a mistake. They are refinements that make it structurally honest. Physics had to confront all three - quantum mechanics, Riemannian geometry, and special/general relativity - before it became complete. Epimechanics faces the same requirements.

---

## Representations, Coordinates, and Labels

A point that is easy to miss because it is so obvious: **if you can label something, you have already assigned it a representation.** The act of naming a quantity - "trust," "morale," "market sentiment" - is itself a representational act. You have distinguished it from other quantities and implicitly placed it somewhere in a space of possible values. You may not know the state space's geometry, its dimensionality, or its metric - but you have committed to the claim that the thing you named can be represented as having a value that could, in principle, be different. That is all $X \in S$ requires. The label is arbitrary - you could call your car a shoe - but the act of labeling commits you to the existence of something being represented, however poorly.

This renaming — from "The Physics of Metaphysics" to "Epimechanics" — was itself a coordinate transform: the content didn't change, the label did (see [Part 0](./00_prelude.md) for the full example).

This illustrates a point developed fully in [Part 0 (Foundations)](./00_prelude.md): observer-dependence is a spectrum, not a taxonomy. Representations range from fully observer-imposed (a name, an aesthetic rating) through observer-accessible (a height, a price — determinable through interaction but existing independently) to observer-invariant (the speed of light, a network's topology — agreed upon regardless of method or coordinate system). The degree of observer-independence is itself an empirical question, established by testing convergence across independent observers and methods. The more independent measurements agree, the more confident we are that the representation tracks structure in reality rather than structure in the observer.

A "wrong" label - calling a tree a "car" - does not change the tree's measurable state. But it does change the state of the system that includes the labeler: the tree now carries the assigned property "has been called 'car' by observer $O$." The label is a coordinate choice, and a bad one - it places the tree in a region of state space (vehicles) where none of the dynamics (fuel consumption, traffic laws, depreciation) apply. The mislabel is a coordinate error: it assigns the wrong $X$ to the wrong $S$. The tree's measurable properties are unaffected.

Which labels carve reality at its joints - which coordinate systems capture the natural structure of the state space - is an empirical question. A botanist and a carpenter label the same tree differently, projecting its state into different coordinate charts optimized for different purposes. Both are valid; neither is complete. Some descriptions are better than others because they track invariant structure, predict dynamics, and compress information more efficiently. Finding the right $X$ and the right $S$ for a given domain is the empirical work that Epimechanics requires but does not itself supply. The sections below develop how states and forces transform between non-isomorphic coordinate systems.

---

## 1. Epistemic Uncertainty of X - The Observer Changes the State

In [Part 1](./01_generalized_mechanics.md), we assumed X could be assigned a definite value. This is the classical assumption. It fails in at least two distinct ways in non-physical domains - and in a third way that turns out to apply even in fundamental physics.

### 1.1 The Observer Effect in Measurement

Measuring a person's emotional valence changes it. Asking "how do you feel?" triggers metacognition, which shifts the emotional state being measured. This is a structural feature of the system. Psychological states are not passively observable; the act of observation is an interaction that produces $d^2X/dt^2 \neq 0$ in the state being measured.

This is the general case of Heisenberg's observer effect - which in quantum mechanics is not (as sometimes taught) purely a measurement disturbance but a reflection of the fact that position and momentum are conjugate variables related by the uncertainty principle:

$$\sigma_x \sigma_p \geq \frac{\hbar}{2}$$

The physical principle is that you cannot simultaneously specify conjugate quantities to arbitrary precision. The generalized analogue: in any system where "knowing X" requires an interaction that alters $dX/dt$, there is a fundamental trade-off between state precision and state stability under observation.

Bohr's complementarity principle holds that the instrument of observation is part of the phenomenon, not separate from it (*Atomic Theory and the Description of Nature*, 1934). Heisenberg's original 1927 paper ([doi:10.1007/BF01397184](https://doi.org/10.1007/BF01397184)) makes this concrete for position and momentum. Thomas Breuer extends the argument to self-observation: a system cannot have accurate knowledge of its own current state, for reasons that are information-theoretic rather than merely practical ([doi:10.1023/A:1024481818970](https://doi.org/10.1086/289852)). All three results point in the same direction: observation is not a neutral act.

### 1.2 The Measurement Problem in Psychology

Clinical psychology has a direct version of this problem. Self-report measures of emotional state - questionnaires, rating scales, experience sampling prompts - produce the act of rating, which is itself a cognitive intervention. The measurement artifact literature documents that questionnaire context, framing, and ordering change the values respondents give. Norbert Schwarz's work on cognition and communication (*Cognition and Communication: Judgmental Biases, Research Methods, and the Logic of Conversation*, 1996, [*Cognition and Communication*, 1996](https://search.worldcat.org/title/cognition-and-communication-judgmental-biases-research-methods-and-the-logic-of-conversation/oclc/34150037)) makes this systematic: the question shapes the answer not merely by failing to capture an antecedent state but by partially constituting the state that gets reported. The measurement created a new X.

Ecological momentary assessment (EMA) represents the most rigorous attempt to approach this problem ([Shiffman, Stone & Hufford, *Annual Review of Clinical Psychology*, 2008](https://doi.org/10.1146/annurev.clinpsy.3.022806.091415)). High-frequency in-situ measurements treat X(t) as a time series and the measurement interaction as a small perturbation. The Langevin equation formalism handles this naturally: the "probe force" from measurement enters as an additional term in the equation of motion, ideally small relative to the dynamics of interest. This is an acknowledgment of the observer effect, built into the formal structure.

### 1.3 Intrinsic Indeterminacy vs. Epistemic Uncertainty

A sharper claim deserves consideration: are psychological states merely difficult to measure (epistemic uncertainty) or are they genuinely indeterminate until measured or acted upon (ontic uncertainty)? This parallels the debates between Copenhagen and many-worlds interpretations in quantum mechanics.

One serious position: emotional states are not fully determined until instantiated in attention and action. A person "feeling anxious" may not have a definite anxiety level - only a probability distribution over possible levels that collapses when they are asked to report it or act on it. This is a claim about the structure of the underlying neural substrate. Neural states are superpositions of attractors until something tips them into a specific basin. Paul Glimcher's work on stochastic neural decision-making (*Foundations of Neuroeconomic Analysis*, Oxford University Press, 2011, [global.oup.com](https://global.oup.com/academic/product/foundations-of-neuroeconomic-analysis-9780199744251)) documents this empirically: even within a single session, neural firing patterns representing the "same" option are distributed, not point-valued. Walter Freeman and Giuseppe Vitiello's quantum field theory approach to brain states ([doi:10.1016/j.plrev.2006.02.001](https://doi.org/10.1016/j.plrev.2006.02.001)) represents the stronger ontic claim - though that specific formalism remains speculative, the underlying question is not: whether the substrate admits genuine superposition before some collapsing event is a matter of empirical neuroscience, not metaphysics.

### 1.4 Formal Treatment

Epimechanics accommodates both the epistemic and ontic positions via the probability distribution over state space. Instead of $X(t) \in S$ (a definite state), write:

$$\rho(X, t) \in \mathcal{P}(S)$$

where $\rho$ is a probability density over $S$. The Fokker-Planck equation governs the evolution of $\rho$ under forces and noise:

$$\frac{\partial \rho}{\partial t} = -\nabla \cdot \!\left(\frac{F}{\mathcal{M}} \rho\right) + D \nabla^2 \rho$$

where $F/\mathcal{M}$ is the drift velocity (force divided by generalized mass - acceleration integrated into velocity), and $D$ is a diffusion coefficient encoding measurement noise and intrinsic stochasticity. In the deterministic limit ($D \to 0$), $\rho$ collapses to a delta function and we recover the classical framework of [Part 1](./01_generalized_mechanics.md). In the high-noise limit, $\rho$ is broad - the state is genuinely uncertain, and only distributions over outcomes are well-defined.

The uncertainty principle in this context: if $X$ and $p = \mathcal{M}\dot{X}$ (state and generalized momentum) are conjugate variables in the Hamiltonian sense, then there is an irreducible trade-off:

$$\sigma_X \cdot \sigma_p \geq C$$

for some constant $C$ determined by the system's structure. Since $p = \mathcal{M}\dot{X}$, this expands to $\sigma_X \cdot \mathcal{M}\sigma_{\dot{X}} \geq C$ when $\mathcal{M}$ is approximately constant - meaning the bound on jointly knowing state and velocity depends on the entity's generalized mass. High-$\mathcal{M}$ entities (densely structured beliefs, massive institutions) allow tighter joint specification of state and velocity; low-$\mathcal{M}$ entities (lightly held preferences, informal groups) are more fundamentally uncertain in this joint sense. This is provably true for any system with Hamiltonian structure. Whether human psychological dynamics have Hamiltonian structure is an open empirical question - but the form of the constraint is fixed by the mathematics, and if the dynamics admit a Hamiltonian description, the bound holds.

### 1.5 The Second Conjugate Pair: Energy and Time

Position and momentum are one conjugate pair. A second uncertainty relation connects **energy and time**:

$$\sigma_E \cdot \sigma_t \geq C'$$

You cannot simultaneously specify exactly how much capacity for state change a system possesses and exactly when that capacity will be deployed. In quantum mechanics, this produces the energy-time uncertainty relation $\Delta E \cdot \Delta t \geq \hbar/2$. In Epimechanics, the analogous Hamiltonian structure motivates the same constraint. But an important caveat: in quantum mechanics, the energy-time uncertainty follows from the Mandelstam-Tamm relation and the non-commutativity of energy and time operators (or, more precisely, the non-commutativity of the Hamiltonian with observables whose expectation values define the "clock"). In Epimechanics, what plays the role of non-commutativity - the algebraic structure that would make this a theorem rather than a postulate - has not been formally specified. The energy-time uncertainty relation here is therefore a structural postulate motivated by the Hamiltonian analogy, not a derived result. Deriving it would require specifying the algebraic structure of Epimechanics' state space, which remains an open question (see [Part 5, Open Question 8](./05_ontology_and_open_questions.md)).

Both relations constrain the precision of joint knowledge, but they have different formal status. In the Hamiltonian formulation ([Part 1, Section 4b](./01_generalized_mechanics.md)), the Lagrangian $L = T - V$ defines conjugate momentum via $p = \partial L / \partial \dot{X}$, and the Hamiltonian (total energy) via $H = p\dot{X} - L$. The position-momentum uncertainty follows from the canonical commutator $[\hat{X}, \hat{p}] = i\hbar$ (or its generalized analogue). The energy-time relation is derived differently - from the Mandelstam-Tamm relation governing the rate of change of expectation values - because time is a parameter, not an observable with its own operator. In relativistic formulations where energy and momentum form a 4-vector, the two relations become more symmetric. For Epimechanics, the distinction matters less than the structural consequence: both impose irreducible bounds on joint specification.

The generalized implications are substantive:

**Short-lived states have uncertain energy.** An emotional spike that lasts milliseconds ($\sigma_t$ small) has fundamentally uncertain capacity for state change ($\sigma_E$ large) - you cannot know how much the spike will alter the trajectory until it has played out over a longer interval. Conversely, a sustained emotional state ($\sigma_t$ large) has well-defined energy - its capacity to drive change is measurable precisely *because* it persists long enough to measure.

**Precise timing implies uncertain impact.** An intervention that is precisely timed (a scheduled policy change, a planned announcement) has uncertain $E$ - exactly how much state change it produces is indeterminate in advance. An intervention that is calibrated to produce a precise impact ($E$ tightly specified) necessarily has uncertain timing - it will achieve its effect, but when is indeterminate.

**Revolutionary movements.** A revolutionary movement has enormous $E$ (capacity to change the political state space) with fundamentally uncertain $t$ (when the revolution occurs is unpredictable). This is the energy-time uncertainty principle applied to social dynamics. The movement's energy is real; its timing is structurally indeterminate.

This second conjugate pair completes the uncertainty structure of Epimechanics. [Part 1](./01_generalized_mechanics.md)'s mechanics defines the quantities ($X$, $p$, $E$, $t$). This section establishes the irreducible limits on jointly knowing them: $\sigma_X \sigma_p \geq C$ and $\sigma_E \sigma_t \geq C'$.

---

## 2. Coordinate Relativity - Incommensurable State Spaces

### 2.1 The Problem

Person A's "angry" and person B's "angry" are both points in their respective emotional state spaces. But those state spaces may be genuinely different - differently structured, not differently labeled versions of the same space.

Consider: A grew up in a context where anger is expressed physically and quickly discharged. B grew up in a context where anger is suppressed and accumulates as a sustained, low-intensity state. When both report "I'm angry at level 7/10," they are giving coordinates in different emotional geometries. Person A's 7/10 is an acute spike with fast decay - a sharp peak in a landscape that returns quickly to baseline. Person B's 7/10 is a chronic elevation - a broad plateau that persists and shapes behavior over days. The coordinate value is the same; the underlying state is qualitatively different. Not different in degree but different in structure.

This is a consequence of the fact that different entities may have genuinely non-isomorphic state spaces. Mapping between them requires something stronger than a coordinate transformation: it requires establishing a correspondence between the underlying geometries.

### 2.2 The Manifold Analogy

In differential geometry, the same physical phenomenon can be described in different coordinate systems - Cartesian, spherical, curvilinear. The coordinates differ; the underlying manifold is the same; the transformation between coordinate systems (a diffeomorphism) maps one description to the other faithfully. This is coordinate relativity in its mild form: physics does not care which chart you use to describe a manifold, as long as the chart is well-defined.

But what if the manifolds themselves differ? This is the harder problem. Two entities with different developmental histories, different neural architectures, and different affective learning histories may have emotional state spaces that are genuinely non-isomorphic as manifolds, with different underlying geometry rather than different charts on the same one. The topological structure, the dimensionality, the curvature - all may differ.

Carhart-Harris and Friston's entropic brain hypothesis ([doi:10.1016/j.neuron.2019.02.030](https://doi.org/10.1016/j.neuron.2019.02.030)) provides one framework: different individuals have different energy landscapes - basins of attraction for emotional and cognitive states - and these topological differences are measurable in neural dynamics. The landscape is not a coordinate choice; it is a structural fact about how the brain's attractor geometry is organized. Two people with differently shaped landscapes are, in the relevant sense, operating in different state spaces.

Lisa Feldman Barrett's conceptual act theory (*How Emotions Are Made*, Houghton Mifflin Harcourt, 2017, [*How Emotions Are Made*, 2017](https://www.harpercollins.com/products/how-emotions-are-made-lisa-feldman-barrett)) pushes this further: emotions are not detected from a pre-given inventory but constructed by the brain using conceptual categories acquired through experience. Two people with different conceptual structures - different granularity, different category boundaries, different affective conceptual vocabularies - have literally different emotional state spaces. The same physiological state (elevated cortisol, increased heart rate, muscle tension) can be categorized as anger, fear, excitement, or challenge depending on which conceptual apparatus is brought to bear. The apparatus differs between individuals and cultures; therefore the state spaces differ.

Russell's circumplex model ([doi:10.1037/h0077714](https://doi.org/10.1037/h0077714)) models emotional space as two-dimensional: valence and arousal. But different individuals' emotional spaces may differ in dimensionality, not only position - some people have richer discrimination along the valence axis; others along arousal; others along social axes (pride, shame, contempt) that a two-dimensional model cannot represent.

### 2.3 Implications for Epimechanics

The formal implication is precise: the state space $S$ is entity-relative, not universal. We should write:

$$X_A \in S_A, \quad X_B \in S_B$$

where $S_A$ and $S_B$ may not be isomorphic. Any cross-entity comparison requires specifying a mapping:

$$f: S_A \to S_B$$

that need not be a simple coordinate transformation. In general, $f$ is a lossy mapping - it preserves some structural features of the state space and collapses others. Translation between emotional state spaces across cultures, individuals, or species requires specifying what structural features $f$ preserves: topology (which states are adjacent), metric (which states are similar), causal structure (which state transitions are possible), or something else. Different choices of preservation criterion yield different mappings; there is no canonical $f$.

This has concrete consequences:

**Communication**: When two people discuss their emotional states, they exchange coordinates in potentially non-isomorphic spaces. "I understand how you feel" is a claim that $f(X_A) \approx X_B$ for the relevant mapping $f$ - a strong and often false claim. The difficulty of being understood may reflect a structural mismatch between the underlying geometries, beyond any failure of expression.

**Therapy**: A therapist trying to understand a client's inner life is working across potentially non-isomorphic state spaces. Effective therapy involves constructing a working $f$ - a shared vocabulary and set of metaphors that maps between their geometries with acceptable fidelity. The construction of that mapping is much of what the therapeutic process consists of.

**Cross-cultural psychology**: Emotional concepts that resist translation - German *Schadenfreude*, Japanese *amae* (the pleasurable dependence on another's benevolence), Inuit *iktsuarpok* (the anticipatory restlessness of waiting for someone) - are markers of genuinely different emotional state space geometry: regions, distinctions, and dimensions that exist in one space and have no counterpart in another. Lindquist et al. ([doi:10.1111/j.1467-9280.2006.01724.x](https://doi.org/10.1111/j.1467-9280.2006.01724.x)) and Majid et al. on cultural variation in basic emotion categories ([doi:10.1037/bul0000100](https://doi.org/10.1037/bul0000100)) provide the empirical basis for taking this seriously.

### 2.4 The Calibration Problem

Even within a single person, the coordinate system of the emotional state space may change over time - through experience, trauma, development, pharmacology, or contemplative practice. A person who has undergone intensive psychotherapy may have genuinely restructured their emotional state space topology: reshaped the space itself, rather than moving to a different point within it. New attractors form; old ones dissolve; the dimensionality of accessible experience may increase or decrease.

This means the coupling tensor $T^i{}_j$ - which lives in and is defined relative to the entity's current state space geometry - changes as the geometry changes. Therapy, education, and psychological transformation are changes in $S$ itself, beyond shifts in $X$, and therefore changes in the metric, topology, and coupling structure of everything defined on it. Epimechanics must track not just the position of X but the manifold on which X lives, and the manifold's own dynamics over time.

---

## 3. Reference Frame Relativity - There Is No Privileged Observer

### 3.1 The Problem

In Newtonian mechanics, there is an implicit privileged frame: absolute space and absolute time. Velocities are measured relative to this absolute background. Special relativity abolished this: there is no privileged inertial frame; velocities are frame-relative; even simultaneity is observer-relative.

Epimechanics has an analogous problem. When we say a person's emotional state is "changing rapidly" - that $|dX/dt|$ is large - we are implicitly measuring this relative to some reference frame. But whose? The person's own self-report? An external observer's clinical assessment? A measurement instrument calibrated to population norms? A therapist with a particular theoretical framework who expects a different rate of change?

These are not equivalent. They measure $dX/dt$ from different reference frames, and they will disagree because rates of change are reference-frame-relative in social and psychological space. The disagreement carries information about the structure of the observational situation.

### 3.2 The Analogy to Special Relativity

In special relativity, the four-velocity of an object depends on the observer's frame:

$$u^\mu = \frac{dx^\mu}{d\tau}$$

where $\tau$ is proper time (the object's own internal clock) and $x^\mu$ is the four-position. Two observers in relative motion will measure different coordinate velocities for the same object. What is invariant - what all observers agree on regardless of their frame - is the spacetime interval:

$$ds^2 = -c^2 dt^2 + dx^2 + dy^2 + dz^2$$

The analogue in generalized state space: there may be frame-invariant quantities - structural features of X's trajectory that all observers agree on regardless of their reference frame. The question is what those invariants are. The spacetime interval suggests the answer will involve a combination of "distance" in both the state space and the time coordinate - a metric structure on the joint $(X, t)$ space.

Candidates for frame-invariant quantities in social and psychological state space:

- **Causal structure**: which events in the trajectory causally precede which others - analogous to the light cone in spacetime
- **Topological features**: the qualitative shape of the trajectory (does it settle, oscillate, diverge, cycle?) independent of the coordinate system used to describe it
- **Information content**: the surprisal or entropy of the trajectory, which is coordinate-independent under appropriate conditions

### 3.3 Proper Time in Psychological Space

General relativity introduced proper time: the time measured by a clock moving with an object, which differs from coordinate time. An object under gravitational acceleration experiences a different elapsed time than an external inertial observer - time dilation is a physical fact, not an illusion.

The psychological analogue is immediate and striking. Subjective time - the rate at which time feels like it is passing - varies dramatically with psychological state. Flow states compress subjective time: hours pass in what feels like minutes. Trauma dilates it: a two-second event is experienced in granular slow-motion. Anticipation accelerates subjective time toward the expected event. Boredom expands it: each minute drags. The clock that matters for an entity's own trajectory through state space is not coordinate time but its subjective proper time - the rate of experienced change in $X$ relative to the entity's own internal process rate.

Formally: let $\tau_E$ be the proper time of entity $E$ - a time parameter measured by $E$'s own internal process clock, not by external coordinate time $t$. The ratio $d\tau_E / dt$ is not constant; it varies with the entity's current state and the intensity of processing it is undergoing. Then:

$$\frac{dX}{d\tau_E}$$

is the rate of change in state from $E$'s own reference frame. This may differ substantially from $dX/dt$ measured by an external observer operating on coordinate time. A traumatic event may be "brief" in coordinate time ($dt$ is small) but extensive in proper time ($d\tau_E$ is large, so $dX/d\tau_E$ is finite even as $dX/dt$ appears enormous).

Marc Wittmann's *Felt Time: The Psychology of How We Perceive Time* (MIT Press, 2016, [mitpress.mit.edu](https://mitpress.mit.edu/9780262034029/felt-time/)) surveys the empirical literature on subjective time perception, documenting its variation with emotional state, attention, age, and context. Droit-Volet and Meck ([doi:10.1016/j.tics.2007.07.014](https://doi.org/10.1016/j.tics.2007.09.008)) provide the neurobiological basis: emotions modulate the internal clock rate through dopaminergic and noradrenergic systems. William James's original description in *Principles of Psychology* (1890) remains the clearest statement of the phenomenon: "time flies" and "time drags" are not figures of speech - they describe genuinely different rates of subjective experience. James did not have the vocabulary of proper time, but he was describing exactly this structure.

### 3.4 Social Reference Frames and Observer Disagreement

Two people observing the same social event will construct different accounts of what happened because they are in different reference frames. A raised voice that reads as "slightly assertive" from inside the speaker's reference frame (where the speaker's baseline emotional intensity is high) reads as "aggressively threatening" from the listener's reference frame (where the listener's baseline is low and emotional distance from the speaker is large). The acoustic signal is the same; the experienced magnitude of the social force differs. The force experienced at a given location in social space depends on where the observer is standing - their position and velocity in social state space.

This has a precise formal consequence: the force $F^i = T^i{}_j \, \nabla^j\Phi(x)$ is observer-frame-relative. The same field $\Phi$ produces different experienced forces $F$ for observers at different positions and velocities in state space. The field $\Phi$ is real and objective. But the force it exerts on any particular observer is a function of that observer's position, orientation, and state of motion within the field.

George Herbert Mead's *Mind, Self, and Society* (University of Chicago Press, 1934, [press.uchicago.edu](https://press.uchicago.edu/ucp/books/book/chicago/M/bo20099389.html)) argues that the self is constituted through taking the perspective of the "generalized other": perspective-dependence is a constitutive feature of social reality. Berger and Luckmann's *The Social Construction of Reality* (1966, [penguinrandomhouse.com](https://www.penguinrandomhouse.com/books/12390/the-social-construction-of-reality-by-peter-l-berger/)) makes the same point at the level of social institutions: social reality is locally constituted by the reference frames of its participants, and those frames are not reducible to a single objective viewpoint. Goffman's *Frame Analysis* (Harvard University Press, 1974, [hup.harvard.edu](https://www.hup.harvard.edu/books/9780674316560)) operationalizes this: frames are reference systems that determine what counts as the relevant force at a given social location. Changing frames changes the apparent force by changing the observer's position within the field, while the field itself remains the same.

### 3.5 Invariants and What They Mean

If forces are frame-relative, what is invariant? The most important answer is causal structure. Whether event A causes event B is frame-independent even when the description of A and B is frame-dependent. In relativity, causal precedence - whether A is in the past light cone of B - is Lorentz-invariant even though temporal ordering is not. Frame changes can reverse the apparent sequence of spacelike-separated events; they cannot reverse the sequence of causally connected events.

The generalized analogue: the causal structure of the state trajectory - whether $X$'s change at time $t_1$ causally produced $X$'s change at time $t_2$ - is a frame-independent property, accessible in principle to any observer, even if the coordinate description of those changes is frame-relative. Judea Pearl's do-calculus (*Causality: Models, Reasoning, and Inference*, Cambridge University Press, 2000, [doi:10.1017/CBO9780511803161](https://doi.org/10.1017/CBO9780511803161)) is the formal framework for expressing and computing such causal invariants independent of the coordinate description of the variables involved. The causal graph is a frame-invariant structure; the coordinate values assigned to nodes are frame-relative.

This gives us the analogue of the spacetime interval: a metric on the causal graph of the state trajectory that is invariant under frame changes. Observers can disagree about the magnitude and direction of forces while agreeing on the causal skeleton that those forces produced.

---

## 4. A Unified View - The Uncertainty Manifold

These three complications - epistemic uncertainty, coordinate relativity, and reference frame relativity - are not independent. They combine into a single, more complex picture.

The true state of an entity is not a point $X \in S$ but a probability distribution $\rho(X, t)$ over a manifold $S_E$ that is entity-specific, time-varying, and only partially observable from any given reference frame. The coupling tensor $T^i{}_j$ and the generalized mass $\mathcal{M}$ both live on this manifold and transform under both coordinate changes (diffeomorphisms of $S_E$) and reference frame changes - the social-psychological analogue of Lorentz boosts. Forces that appear large from one observer's frame may appear small from another's; states that appear definite from one measurement protocol appear distributed from another; state spaces that appear isomorphic at low resolution appear non-isomorphic when examined at the level of their topology and curvature.

Generalized mass $\mathcal{M}$ is particularly sensitive to all three complications. **Epistemically**: an entity may not know its own mass - how entangled its beliefs really are, how dense its internal causal structure is. Asking "how strongly do you hold this belief?" is a measurement that can change $\mathcal{M}$ itself, just as measuring X can change X. **Coordinate-relatively**: two entities' internal causal densities may be structured in incommensurable dimensions - one entity's "deeply held" may correspond to a different geometry of internal connections than another's, making direct comparison of $\mathcal{M}$ values across entities require the same mapping $f: S_A \to S_B$ that state comparison requires. **Frame-relatively**: whether an entity appears to have high or low inertia depends on the observer's reference frame. A parent may perceive a child's worldview as flimsy (low $\mathcal{M}$) while the child experiences it as the densest, most load-bearing structure they have.

This is considerably more complex than the clean formalism of [Part 1](./01_generalized_mechanics.md). But it is also more honest. [Part 1](./01_generalized_mechanics.md)'s clean formalism is the mean-field, classical, single-frame limit - valid when:

- States are well-defined and observable without disturbing them (classical limit: $D \to 0$)
- All entities share approximately the same state space geometry (common coordinate limit: $S_A \cong S_B$)
- All observers share the same reference frame (Newtonian limit: $d\tau_E/dt \approx$ constant, frame-independent)

When these conditions fail - which they do, routinely, in social and psychological systems - the full uncertain, manifold-valued, frame-relative formalism is needed. The conditions fail because the systems are genuinely quantum, genuinely non-isomorphic in their geometries, and genuinely observer-relative in their forces.

The good news: physics went through exactly this progression. Classical mechanics was good enough for most engineering purposes at human scales. Quantum mechanics was needed for atomic-scale phenomena. Riemannian geometry and general relativity were needed for cosmological scales and strong gravitational fields. The generalizations did not invalidate classical mechanics - they showed precisely where it is valid and where it breaks down. Newtonian mechanics is the weak-field, low-velocity limit of general relativity - valid when gravitational fields are weak and velocities are small compared to $c$. It is approximately right in a specific domain.

The same structure applies here. [Part 1](./01_generalized_mechanics.md)'s formalism is valid for systems where state uncertainty is low, state spaces are approximately shared, and reference frame effects are small. The extensions developed in this post apply when those conditions fail. Both levels of Epimechanics are needed; neither makes the other obsolete.

---

## Formal Appendix: Summary of Extensions

| Issue | Classical Assumption | Extended Treatment | Physics Analogue |
|---|---|---|---|
| Observability of X | $X(t)$ is definite and non-invasively measurable | $\rho(X,t) \in \mathcal{P}(S)$; measurement induces $F_{\text{probe}} \neq 0$ | Quantum measurement / uncertainty principle |
| State space geometry | All entities share $S$ | $X_A \in S_A$, $X_B \in S_B$; $S_A, S_B$ may be non-isomorphic; mapping $f: S_A \to S_B$ required | Non-Euclidean / Riemannian geometry; change of chart |
| Reference frame | Absolute observer-independent frame | $F$ and $dX/dt$ are observer-relative; proper time $\tau_E$ differs from coordinate time $t$ | Special / general relativity; proper time |
| Invariants | All quantities observer-independent | Causal structure; topological features of trajectory; information content | Spacetime interval; light cone; causal precedence |

---

## Closing

[Part 1](./01_generalized_mechanics.md)'s formalism is the skeleton. These extensions are the acknowledgment that the skeleton operates in a more complex world than classical mechanics assumes. A person asking "how are you feeling?" is performing a measurement that perturbs the state being measured. A therapist trying to understand a client's anger is working across potentially non-isomorphic state spaces. A historian trying to understand why a civilization collapsed is computing forces from a reference frame that did not exist during the events - a frame with access to information that was, in the causal sense, in the future of the phenomenon being described.

Epimechanics remains valid. This specifies its domain of validity and extends it to the harder cases.

The question "what is X, exactly?" is one of the harder questions in the program. The answer proposed here: X is a representation - a formal description of some aspect of reality's condition - that takes the form of a probability distribution over a manifold that may be entity-specific and time-varying, accessible only from specific reference frames, with measurement interactions that are part of the system's dynamics. Reality exists independently of X; X is our model of it. The claim is that well-chosen X's have mechanical structure that tracks real dynamics.

---

[← Part 1: Generalized Mechanics](./01_generalized_mechanics.md) | [→ Part 2: Meta-Entities](./02_meta_entities.md)
