---
title: "Epimechanics Application: Decision and Trajectory"
description: >-
  How entities with bounded observation select actions under uncertainty.
  Epimechanics formalized as a partially observable decision process -
  belief states, policies, value functions, and the Bayesian dynamics of choosing.
date: 2026-03-15T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
contentType: article
mediaTypes:
  - text
  - image
series: "Epimechanics"
series_order: 6
coverImage:
  url: ./images/decision_and_trajectory-1-1.png
  alt: >-
    An entity at a branching point in state space, with probabilistic trajectories fanning outward
    as translucent paths of varying brightness. A partial fog obscures distant regions of the landscape -
    partial observability. The entity's internal belief state glows as a probability cloud.
    Decision as directed force selection under uncertainty. Dark background, amber and cyan light.
categories:
  - Philosophy
  - Physics
  - Systems thinking
tags:
  - Decision theory
  - POMDP
  - Bayesian inference
  - Policy
  - Value function
  - Partial observability
  - Action selection
  - Trajectory optimization
bullets:
  - Epimechanics is proposed to map onto a POMDP: X is state, outgoing causal power is action, consciousness is the observation function, intelligence is the transition model
  - An entity's belief state b(t) is its internal probability distribution over X - the Bayesian shadow of consciousness
  - Policy pi(b) is the mapping from belief to action; agency is what makes this mapping non-trivial
  - The value function J*(b) connects decision to soul - the expected integral of representational footprint R under an optimal policy
  - Sociological prediction becomes a measurement problem in the same framework that governs individual choice
shareBlurbs:
  twitter: >-
    Every entity is a decision process running on partial information.
    Consciousness is the observation function. Intelligence is the transition model.
    Agency is what makes policy non-trivial. Part 6 of Epimechanics. #Philosophy #DecisionTheory
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

[Parts 1](../theory/01_generalized_mechanics.md) through [5](../theory/05_ontology_and_open_questions.md) built Epimechanics: entities, forces, intelligence, consciousness, agency, and soul. But Epimechanics, as stated, is primarily *descriptive* - it characterizes what entities are, how they couple to fields, and what they leave behind. It does not yet formalize how entities *choose*. An entity with nonzero agency ($A > 0$) selects actions, rather than passively responding to forces. The selection process is not captured by the force equation $F = \mathcal{M}\ddot{X} + \dot{\mathcal{M}}\dot{X}$ alone, because that equation describes the *result* of forces on state trajectories, not the *generation* of forces by agents operating under uncertainty.

This part asks: given an entity with bounded consciousness (partial access to $X$), nonzero intelligence (predictive accuracy over $dX/dt$), and nonzero agency (consciousness-directed causal power) - how does it select among possible actions? What is the formal structure of choosing?

The answer draws on the theory of Markov decision processes, generalized to partial observability. The claim is stronger than resemblance: the mechanics maps onto a decision process when viewed from the entity's interior, and the decision process maps onto mechanics when viewed from the exterior. The two descriptions are proposed to be dual.

---

## Section 1: The POMDP Structure of the Generalized Mechanics

A **partially observable Markov decision process** (POMDP) is defined by a tuple $(S, \mathcal{A}, P, r, \Omega, O, \gamma)$:

- $S$: state space
- $\mathcal{A}$: action space
- $P(s' | s, a)$: transition function - probability of next state $s'$ given current state $s$ and action $a$
- $r(s, a)$: reward function - immediate value of taking action $a$ in state $s$
- $\Omega$: observation space
- $O(o | s', a)$: observation function - probability of observing $o$ given the new state $s'$ and the action taken
- $\gamma \in [0,1)$: discount factor

The POMDP framework was formalized by [Åström (1965)](https://doi.org/10.1016/0022-247X%2865%2990154-X) and developed for AI applications by [Kaelbling, Littman & Cassandra (1998)](https://doi.org/10.1016/S0004-3702%2898%2900023-X). It is the most general single-agent decision framework in standard use. Every element maps onto the generalized mechanics.

### 1.1 State Space $S$ → Generalized State Space

The POMDP state space $S$ is the generalized state space from [Part 1](../theory/01_generalized_mechanics.md): $X \in S$, where $S$ may be physical, informational, social, or any projection of the Ruliad. The state includes not only the entity's own configuration but the full configuration of all entities and fields it interacts with. The true state is the entire relevant section of $X$ - the entity's own state, the states of other entities, and the field values at the entity's position.

This immediately establishes a structural fact: the state space is vastly larger than any entity's capacity to observe it. Even an entity with maximal consciousness $C$ models only a projection of $S$. The gap between the true state and the entity's model of it is the fundamental driver of decision-theoretic structure.

### 1.2 Action Space $\mathcal{A}$ → Outgoing Causal Power

An action $a \in \mathcal{A}$ is any exertion of outgoing causal power $\mathcal{P}_E$ ([Part 3](../theory/03_intelligence_consciousness_agency.md)). Recall:

$$\mathcal{P}_{E \to j}^{(\mathcal{D})} = \mathbf{F}_{E \to j}^{(\mathcal{D})} \cdot \mathbf{v}_{X_j}^{(\mathcal{D})}$$

An entity's action space is the set of all force vectors it can exert on the state trajectories of other entities and on its own state. The action space is constrained by the entity's coupling structure - $\mathcal{A}$ is not the set of all possible forces, but the set of forces the entity can actually generate given its coupling tensor $T^i{}_j$ and its available energy $E_{\text{int}}$.

For a person, $\mathcal{A}$ includes: speaking, writing, moving, building, persuading, coercing, withdrawing, attending, ignoring - any act that produces $\delta X_j \neq 0$ in some target entity $j$. For an institution, $\mathcal{A}$ includes: legislating, regulating, funding, defunding, communicating, restructuring. For a meta-entity like a market, $\mathcal{A}$ is the aggregate of participant actions weighted by coupling - the market "acts" through the coordinated (or uncoordinated) force generation of its constituents.

The action space has dimensionality determined by the entity's coupling structure. An entity coupled to $k$ domains with $n_i$ dimensions each has an action space of dimension $\sum_i n_i$ - but the *effective* dimensionality is typically much lower, because coupling strengths are unevenly distributed. Most entities can exert significant force in only a few domains. The effective action space is the subspace of $\mathcal{A}$ where $\Pi_{\text{out}}^{(\mathcal{D})} > \epsilon$ for some threshold $\epsilon$.

### 1.3 Transition Function $P$ → Intelligence as Predictive Model

The transition function $P(s' | s, a)$ specifies the probability of the system moving to state $s'$ given current state $s$ and action $a$. In Epimechanics, this is precisely what intelligence models:

$$I(E) = \text{accuracy of } dX/dt \text{ prediction over horizon } T$$

The entity's internal transition model $\hat{P}_E(s' | s, a)$ is its best estimate of how the state evolves under its actions. The quality of this estimate is $I(E)$ - intelligence is the fidelity of the entity's transition model.

The true transition function is determined by the generalized mechanics: forces, masses, coupling tensors, and field values determine $dX/dt$. The entity does not know $P$ exactly. It knows $\hat{P}_E$, which differs from $P$ by the entity's predictive error. The gap $\|P - \hat{P}_E\|$ is a measure of the entity's ignorance about the dynamics of the world - and reducing this gap is precisely what Schmidhuber's compression progress (the drive to improve $M_E$) is about.

Three regimes of transition-model quality matter:

**(a) Deterministic regime.** When $\hat{P}_E$ assigns probability $\approx 1$ to a single next state for each $(s, a)$ pair, the entity models the world as deterministic. This is the classical mechanics limit. The entity believes its actions have predictable consequences. This is rarely warranted outside physical mechanics - social and psychological systems have stochastic transitions even when the entity's model is good.

**(b) Stochastic regime.** When $\hat{P}_E$ assigns a distribution over next states, the entity models the world as probabilistic. This is the honest regime for most social, psychological, and informational systems. The entropy of $\hat{P}_E(s' | s, a)$ measures how uncertain the entity is about the consequences of its actions. High entropy means the action's effects are unpredictable; low entropy means the entity can forecast the result.

**(c) Model-free regime.** When the entity has no explicit $\hat{P}_E$ but instead maintains a direct mapping from states (or observations) to actions - learned by reinforcement without an internal world model - the transition function is implicit in the policy. Habits, reflexes, and procedural skills operate in this regime. The entity does not predict what will happen; it acts according to a pattern that has historically produced rewarding outcomes. [Daw, Niv & Dayan (2005)](https://doi.org/10.1038/nn1560) showed that human decision-making switches between model-based (explicit $\hat{P}_E$) and model-free (direct state-action mapping) systems, with the balance determined by cognitive load and uncertainty.

### 1.4 Observation Function $O$ → Consciousness as Observational Access

The observation function $O(o | s', a)$ specifies what the entity actually perceives of the state after acting. This is the formal structure of **consciousness** in its role as observational access.

[Part 3](../theory/03_intelligence_consciousness_agency.md) defined consciousness $C$ as the scope and accuracy of an entity's internal model of states $X$ - representing actual, possible, counterfactual, or hypothetical conditions. Here we make the connection precise: the observation function $O$ is the *mechanism* through which consciousness $C$ is realized. The entity does not observe $X$ directly. It observes $o \in \Omega$, a lossy, noisy projection of $X$ through $O$.

The consciousness tensor $\mathbf{C} \in \mathbb{R}^{n_i \times n_j \times n_k}$ from [Part 3](../theory/03_intelligence_consciousness_agency.md) determines the structure of $O$:

- **Allo-representation** determines which other entities' states are observable: high allo-representation means $O$ transmits information about others' internal states (their beliefs, intentions, emotional valence). Low allo-representation means $O$ is opaque to others - the entity sees their behavior but not their internal configuration.
- **Auto-modeling** determines which of the entity's own states are observable to itself: high auto-modeling means $O$ includes accurate proprioceptive information about the entity's own belief states, emotional states, and coupling parameters. Low auto-modeling means the entity acts without accurate self-knowledge - it may not know its own biases, limitations, or current emotional state.
- **Temporal scope** (the $k$ index of $\mathbf{C}$) determines the observation horizon: an entity with strong prospective modeling ($C_{ijk}|_{k=\text{future}}$ high) effectively observes future states through prediction, broadening $\Omega$ beyond the present.

The degree of partial observability - how much of the true state $s$ is hidden from the entity - is therefore a direct function of $\mathbf{C}$. An entity with $\|\mathbf{C}\| = 0$ (zero consciousness) observes nothing: $O$ transmits no information, and the POMDP degenerates into a process with no observational input. An entity with perfect consciousness across all dimensions would have a bijective $O$ - full observability, reducing the POMDP to a standard MDP. All real entities fall between these extremes.

[Part 1b](../theory/01b_uncertainty_coordinates_relativity.md) established that observation changes the state (the observer effect). In the POMDP formalism, this is captured by the dependence of $O$ on the action $a$: the entity's choice of how to observe - which questions to ask, which instruments to deploy, which aspects of the environment to attend to - affects what it sees. Observation is not passive reception; it is an action with consequences for subsequent states. The observation function $O(o | s', a)$ encodes this: the observation depends on what the entity did, because doing changes the state from which the observation is drawn.

### 1.5 Reward Function $r$ → Soul Trajectory Optimization

The reward function $r(s, a)$ specifies the immediate value of being in state $s$ and taking action $a$. What is the entity optimizing?

Epimechanics' answer connects decision to soul. From [Part 4](../theory/04_time_and_soul.md), the representational footprint:

$$\mathbf{R}(E,t) = \sum_j \mathbf{K}_{Ej}(t) \cdot \delta X_j(E,t)$$

measures the entity's causal influence on others' trajectories. The soul is this function across all time. An entity with agency ($A > 0$) can direct its actions to shape $\mathbf{R}(E,t)$ - to increase its amplitude, breadth, duration, or sign (relative to a value basis $\boldsymbol{\nu}$).

The POMDP reward function is therefore:

$$r(s, a) = \boldsymbol{\nu}^\top \frac{d\mathbf{R}(E, t)}{dt}\bigg|_{s, a}$$

 - the instantaneous rate of change of the entity's soul, projected onto its value basis $\boldsymbol{\nu}$, given the current state and action. An entity that optimizes this reward is steering its trajectory to maximize the valued components of its representational footprint.

This is not the only possible reward function. Three alternatives deserve formal consideration:

**(i) Autopoietic reward: survival.** $r(s,a) = \mathbf{1}[\kappa_s(E,t+dt) > 0]$ - the entity receives reward 1 for continuing to exist and 0 for dissolution. This is the minimal reward function of biological organisms: the auto-causal loop rewards its own persistence. In Epimechanics' terms, this is $T_{\text{local}}$ maximization - extend the duration of the entity's causal coherence. Maturana and Varela's autopoiesis is this reward function and nothing else.

**(ii) Hedonic reward: immediate state valence.** $r(s,a) = u(X_E(t))$ where $u$ is a utility function over the entity's own state. This is the classical utility-theoretic reward - the entity optimizes its own experienced state. Economic agents in standard rational choice theory use this reward function.

**(iii) Soul reward: representational footprint optimization.** $r(s,a) = \boldsymbol{\nu}^\top \dot{\mathbf{R}}(E,t)$ - the entity optimizes the rate of growth of its valued representational footprint. This is the reward function of entities that care about legacy, meaning, impact, and contribution. It is the most sophisticated reward function in the hierarchy: it requires not only autopoiesis (survival to continue acting) and hedonic awareness (modeling one's own state) but also allo-representation (modeling others' trajectories) and auto-modeling (representing one's own causal effects on those trajectories).

These three reward functions are not mutually exclusive. A realistic entity's reward is a weighted sum:

$$r_{\text{total}}(s,a) = w_1 \cdot r_{\text{autopoietic}} + w_2 \cdot r_{\text{hedonic}} + w_3 \cdot r_{\text{soul}}$$

with weights $w_i$ that vary across entities and across time within a single entity. A newborn operates almost entirely on $w_1$ (survival). A hedonist weights $w_2$ heavily. A person near the end of life who shifts focus to legacy, teaching, and meaning-making has increased $w_3$ at the expense of $w_1$ and $w_2$. [Carstensen's socioemotional selectivity theory (1999)](https://doi.org/10.1037/0003-066X.54.3.165) documents exactly this shift: as perceived time horizon shortens, people shift from information-acquisition goals (improving $\hat{P}_E$) to emotional and meaning goals (optimizing $r_{\text{hedonic}}$ and $r_{\text{soul}}$).

### 1.6 Discount Factor $\gamma$ → Temporal Horizon of Valuation

The discount factor $\gamma \in [0,1)$ determines how much the entity values future reward relative to present reward. The total expected value is:

$$V = \mathbb{E}\left[\sum_{t=0}^{\infty} \gamma^t r_t\right]$$

$\gamma = 0$ means the entity values only the immediate reward - pure myopia. $\gamma \to 1$ means the entity values future rewards nearly as much as present ones - long-term planning.

In Epimechanics, $\gamma$ is determined by the entity's temporal consciousness - the $k = \text{future}$ components of the consciousness tensor $\mathbf{C}$. An entity with strong prospective modeling can represent future states and therefore has the representational capacity to value them. An entity with weak prospective modeling cannot represent the future and therefore cannot weight it - $\gamma$ is low not by choice but by representational limitation.

[Frederick, Loewenstein & O'Donoghue (2002)](https://doi.org/10.1257/002205102320161311) reviewed decades of empirical research on time discounting in humans, finding that discount rates vary enormously across individuals, contexts, and domains - from near-zero (long-term investment decisions by patient agents) to very high (impulsive consumption, addiction). Epimechanics predicts this: $\gamma$ is a function of the consciousness tensor's temporal projection, which varies across entities and domains. An entity with high $C_{ijk}|_{k=\text{future}}$ in the financial domain but low $C_{ijk}|_{k=\text{future}}$ in the health domain will have high $\gamma$ for financial decisions and low $\gamma$ for health decisions - a pattern well-documented empirically as domain-specific temporal discounting.

For meta-entities, $\gamma$ is determined by institutional structure. An institution with a 30-year planning horizon (a central bank, a university endowment) has high $\gamma$. A startup optimizing for next quarter's metrics has low $\gamma$. The institutional discount factor is a structural property of the institution's representational and governance architecture, not a preference.

---

## Section 2: The Belief State and Its Dynamics

### 2.1 Definition

Because the entity cannot observe $X$ directly, it must maintain a **belief state** - an internal probability distribution over possible states:

$$b(s) = P(S_t = s \mid o_1, a_1, o_2, a_2, \ldots, o_t)$$

The belief state $b$ is a probability distribution over $S$, conditioned on the entity's entire history of observations and actions. It is the Bayesian summary of everything the entity knows about the current state of the world.

The belief state is the entity's **internal model** $M_E$ from [Part 3](../theory/03_intelligence_consciousness_agency.md), now given precise probabilistic form. Intelligence $I(E)$ is the quality of the transition model $\hat{P}_E$ that propagates beliefs forward; consciousness $C$ is the scope of the observation function $O$ that updates beliefs with new information. Together they determine the accuracy and breadth of $b$.

**Two roles of consciousness in the POMDP mapping**: [Part 3](../theory/03_intelligence_consciousness_agency.md)'s consciousness $C$ performs two distinct functions that the POMDP separates: (1) the *observation function* $O(o|s',a)$ - what the entity perceives, determined by the scope of its sensory access - and (2) the *belief state* $b(t)$ - the entity's internal model of $X$, maintained by Bayesian updating. Mapping $C$ onto $O$ alone (as in Section 1.4) captures only the first role. The belief state $b(t)$ captures the second - the representational content of the model, which is the aspect of consciousness most relevant to intelligence and agency. A high-$C$ entity has both a rich observation function (perceives much) and a well-maintained belief state (represents accurately); the POMDP decomposition makes this two-factor structure explicit.

### 2.2 Belief Update: The Bayesian Filter

When the entity takes action $a$ and receives observation $o$, the belief state updates via Bayes' rule:

$$b'(s') = \eta \cdot O(o \mid s', a) \sum_s P(s' \mid s, a) \, b(s)$$

where $\eta$ is a normalizing constant. This is the standard Bayesian filter, also known as the belief update equation for POMDPs.

The update has two components:

1. **Prediction** (the inner sum): $\bar{b}(s') = \sum_s P(s' \mid s, a) \, b(s)$ - propagate the belief forward through the transition model. This uses intelligence: the entity predicts what the state will be after acting.

2. **Correction** (the outer product): $b'(s') = \eta \cdot O(o \mid s', a) \cdot \bar{b}(s')$ - update the prediction using the observation. This uses consciousness: the entity incorporates what it actually observes.

The quality of each step is determined by the corresponding framework quantity:

- Prediction quality $\propto I(E)$: a high-intelligence entity has an accurate $\hat{P}_E$, so $\bar{b}$ is close to the true posterior. A low-intelligence entity has a poor $\hat{P}_E$, so $\bar{b}$ drifts from reality.
- Correction quality $\propto \|\mathbf{C}\|$: a high-consciousness entity has an informative $O$, so observations sharply constrain the posterior. A low-consciousness entity has a noisy $O$, so observations provide little correction - the entity's beliefs are largely determined by its predictions, not by evidence.

This yields a taxonomy of epistemic failure modes:

| Intelligence | Consciousness | Failure Mode |
|---|---|---|
| High $I$, low $C$ | Good predictions, poor observation | **Rationalist trap**: accurate world model in theory, but beliefs are insensitive to evidence because observations are uninformative. The entity is "right in principle" but unable to update from reality. |
| Low $I$, high $C$ | Poor predictions, good observation | **Reactive mode**: the entity sees clearly but cannot anticipate. Each observation is a surprise. Behavior is stimulus-driven, not planned. |
| Low $I$, low $C$ | Poor predictions, poor observation | **Drift**: beliefs wander, poorly anchored to either prediction or evidence. |
| High $I$, high $C$ | Good predictions, good observation | **Calibrated agency**: accurate predictions corrected by rich observation. The entity's beliefs track reality. |

### 2.3 Belief State Inertia

The belief state has its own generalized mass. A belief state $b$ that is sharply peaked (high confidence) around a particular state $s^*$ has high $\mathcal{M}_b$ - it takes a strong observation (high likelihood ratio) to shift the peak. A diffuse belief state (high uncertainty) has low $\mathcal{M}_b$ - even a weak observation can reshape it.

This connects directly to [Part 1](../theory/01_generalized_mechanics.md)'s concept of generalized mass as resistance to state change. A person with high conviction has a peaked $b$ - high $\mathcal{M}_b$. Shifting that conviction requires either very strong evidence (a high-likelihood observation that overwhelms the prior) or sustained moderate evidence over time (many observations, each contributing a small Bayesian update). The informal observation that "deeply held beliefs are hard to change" sounds tautological - and it is, taken alone (see [Part 1, Section 2b](../theory/01_generalized_mechanics.md) and [Part 5, Section 4.0](../theory/05_ontology_and_open_questions.md) for the full tautology discussion). The non-tautological content here is the *mechanism*: the peaked prior functions as generalized mass because the Bayesian update equation $b'(s') = \eta \cdot O(o|s',a) \cdot \bar{b}(s')$ produces smaller shifts when $b$ is sharply peaked, regardless of the evidence's strength. This is a structural prediction about the *functional form* of belief resistance, not merely a relabeling.

The force required to shift a belief state is the **Kullback-Leibler divergence** between the prior and the posterior:

$$D_{\text{KL}}(b' \| b) = \sum_s b'(s) \log \frac{b'(s)}{b(s)}$$

This measures the "distance" the belief state moves in response to new evidence. Large $D_{\text{KL}}$ means a large belief shift - the evidence was surprising. Small $D_{\text{KL}}$ means the belief barely moved - the evidence was expected or the prior was too strong to overcome.

[Tenenbaum, Kemp, Griffiths & Goodman (2011)](https://doi.org/10.1126/science.1192788) showed that human concept learning and inductive reasoning are well-described by Bayesian inference over structured hypothesis spaces. The belief state formalism is an empirically adequate model of how humans actually update under uncertainty, at least in structured domains, and goes beyond a normative ideal.

### 2.4 Belief Divergence and Coordination Failure

When multiple entities share a state space but have different observation functions $O_i$, their belief states $b_i$ can diverge even when exposed to the same underlying reality. Two entities observing the same events through different consciousness tensors $\mathbf{C}_i$ will form different beliefs, since they observe different projections of $X$.

Define the **belief divergence** between entities $i$ and $j$:

$$\Delta b_{ij}(t) = D_{\text{KL}}(b_i \| b_j) + D_{\text{KL}}(b_j \| b_i)$$

the symmetrized KL divergence between their belief states. This is a measure of how differently they model the same reality.

Coordination requires low $\Delta b_{ij}$ on the states relevant to joint action. When $\Delta b_{ij}$ is high on action-relevant states, entities will select different actions even when their reward functions are identical - they disagree not about what to want but about what is happening. This is a formal model of coordination failure driven by observational asymmetry, not preference conflict.

[Aumann's agreement theorem (1976)](https://doi.org/10.1214/aos/1176343654) proved that rational agents with common priors and common knowledge of each other's posteriors cannot agree to disagree - their beliefs must converge. The operative assumption is *common knowledge of posteriors*: each agent knows what the other believes. When this condition fails - when entities cannot accurately model each other's belief states - persistent disagreement is rational. In Epimechanics' terms, Aumann's condition fails when allo-representation is insufficient: the entities cannot model each other's observation functions well enough to compute what the other should believe given what the other has observed.

This has direct implications for social polarization. [Sunstein's *Republic.com* (2001)](https://books.google.com/books/about/Republic_com.html?id=O7AG9TxDJdgC) and subsequent work on echo chambers demonstrate that information environments that sort entities into homogeneous observation groups (everyone in group $A$ observes the same projection of $X$; everyone in group $B$ observes a different projection) produce systematic belief divergence. The POMDP framework makes this precise: different groups have different $O$, so their belief states diverge even from a common prior. The remedy is not "more information" in general but specifically *cross-group observation sharing* - mechanisms that allow entities to sample from each other's observation functions, reducing $\Delta b_{ij}$.

---

## Section 3: Policy - The Mapping from Belief to Action

### 3.1 Definition

A **policy** is a mapping from belief state to action:

$$\pi : \mathcal{B} \to \mathcal{A}$$

where $\mathcal{B}$ is the space of all possible belief states. The policy is the entity's decision rule: given what I believe about the world, what do I do?

The optimal policy $\pi^*$ maximizes expected cumulative discounted reward:

$$\pi^* = \arg\max_\pi \mathbb{E}_\pi \left[\sum_{t=0}^{\infty} \gamma^t r(s_t, a_t)\right]$$

This is the standard POMDP optimization. The expectation is taken over the stochastic transitions and observations, and the policy is evaluated over the infinite horizon.

### 3.2 Policy and Agency

The policy is the locus of agency in the POMDP formalism. A system with $A = 0$ (zero agency) has no policy - or rather, its policy is trivial: actions are determined entirely by external forces (the entity is pushed through state space by fields and other entities' forces) or by a fixed reflex (the entity responds to stimuli without belief-mediated deliberation).

Agency $A = \Pi_{\text{out}} \times \mu_{\text{meta}} \times C_{\text{consciousness}}$ determines the *quality and range* of the policy:

- **$\Pi_{\text{out}}$** determines the action space: which actions are available, and how strongly each action affects $X$. An entity with zero coupling has a trivially empty action space - the policy is vacuous because there is nothing to choose.
- **$C_{\text{consciousness}}$** determines the observation function: how much information the entity has about $X$. An entity with zero consciousness has a trivially uninformative belief state - the policy cannot condition on the world because the world is unobserved.
- **$\mu_{\text{meta}}$** determines whether the entity can represent its policy *as* a policy - whether it can deliberate about its own decision rule. An entity with $\mu_{\text{meta}} = 0$ executes a policy but does not represent the fact that it is doing so. It cannot reason about whether to change its policy. It is, in Metzinger's terms, transparent to its own decision process.

Full agency ($A \approx 1$) means the entity has a rich action space, a well-informed belief state, and the capacity to deliberate about and revise its own policy. This is the decision-theoretic unpacking of what [Part 3](../theory/03_intelligence_consciousness_agency.md) defined algebraically.

### 3.3 Stochastic Policies and Exploration

A deterministic policy $\pi(b) = a$ assigns a single action to each belief state. A stochastic policy $\pi(a | b)$ assigns a probability distribution over actions. Stochastic policies can be optimal under certain conditions.

The **exploration-exploitation tradeoff** is the fundamental tension: the entity must balance acting on its current best model (exploitation - choosing the action that maximizes expected reward under current beliefs) against gathering information to improve its model (exploration - choosing actions that are suboptimal under current beliefs but generate informative observations).

Formally, exploration has value because it reduces future uncertainty. An observation gained by an exploratory action updates $b$, which may enable better actions in the future. The value of information from exploration is:

$$\text{VOI}(a_{\text{explore}}) = \mathbb{E}_o\!\left[J^*(b'_{a,o})\right] - J^*(b)$$

where the expectation is over possible observations $o$ after the exploratory action, $b'_{a,o}$ is the posterior belief state given action $a$ and observation $o$, and $J^*$ is the value function under the optimal policy. If $\text{VOI} > 0$, exploration is worth the immediate reward sacrifice.

[Gittins (1979)](https://doi.org/10.1111/j.2517-6161.1979.tb01068.x) proved that the optimal solution to the multi-armed bandit (a simplified exploration-exploitation problem) is to assign an index to each option - the **Gittins index** - that balances immediate reward against the value of learning. The Gittins index is the formal answer to "how much should I sacrifice now to learn?" in the simplest setting. For full POMDPs, the problem is PSPACE-hard ([Papadimitriou & Tsitsiklis 1987](https://doi.org/10.1287/moor.12.3.441)) and exact solutions are intractable. Entities use approximations - heuristics, bounded rationality, satisficing.

[Simon's bounded rationality (1955)](https://doi.org/10.2307/1884852) is precisely this: agents do not compute $\pi^*$ because the computation is intractable. They compute an approximate policy $\hat{\pi}$ that is "good enough" given computational constraints. Epimechanics predicts that the quality of the approximation is bounded by the entity's intelligence $I(E)$ (the fidelity of the transition model that drives planning) and consciousness $C$ (the scope of the observation function that informs the belief state). Bounded rationality is a structural consequence of finite $I$ and finite $C$ operating in a state space $S$ that is computationally intractable to solve exactly.

### 3.4 Habitual vs. Deliberative Policy

The neuroscience of decision-making distinguishes two systems:

[Kahneman's *Thinking, Fast and Slow* (2011)](https://us.macmillan.com/books/9780374533557/thinkingfastandslow) popularized the System 1 / System 2 distinction. In the POMDP framework, these correspond to two different policy architectures:

**System 1 (habitual / model-free policy)**: $\pi_1(o) = a$ - a direct mapping from observation to action, bypassing the belief state. The entity does not update beliefs or plan; it reacts. This is computationally cheap, fast, and effective in familiar environments where the mapping from observations to good actions is stable. In reinforcement learning terms, this is a model-free policy trained by past experience - the entity has cached the mapping from situations to actions without maintaining an explicit world model.

**System 2 (deliberative / model-based policy)**: $\pi_2(b) = \arg\max_a \mathbb{E}[J^*(b') | b, a]$ - the entity updates its belief state, simulates the consequences of possible actions using its transition model $\hat{P}_E$, and selects the action that maximizes expected value. This is computationally expensive, slow, and necessary in novel environments where cached situation-action mappings are unreliable.

The [Daw, Niv & Dayan (2005)](https://doi.org/10.1038/nn1560) framework shows that the brain arbitrates between these systems based on a cost-benefit analysis: model-based planning is deployed when the environment is novel or high-stakes (the expected value of better planning exceeds the computational cost), and model-free habits are deployed when the environment is familiar or low-stakes. This arbitration itself is a meta-policy - a policy over which policy to use.

In Epimechanics, the System 1/System 2 distinction maps onto the $\mu_{\text{meta}}$ parameter. An entity executing $\pi_1$ without awareness that it is doing so has $\mu_{\text{meta}} = 0$ for that action - it is not representing its own policy as a policy. When the entity switches to $\pi_2$, it is explicitly representing its own decision process, evaluating alternatives, and choosing - $\mu_{\text{meta}} > 0$. The agency of an action is therefore a property of the specific decision process that generated it, not of the entity in general. A habitual action, even by an entity with high general agency, has $\mu_{\text{meta}} \approx 0$ for that action and therefore low agency for that specific choice.

---

## Section 4: The Value Function and Trajectory Optimization

### 4.1 The Value Function

The **value function** $V^\pi(b)$ is the expected cumulative discounted reward from belief state $b$ under policy $\pi$:

$$V^\pi(b) = \mathbb{E}_\pi \left[\sum_{t=0}^{\infty} \gamma^t r(s_t, a_t) \mid b_0 = b\right]$$

$V^\pi(b)$ answers the question: how good is it to be in belief state $b$ if I follow policy $\pi$?

The optimal value function $J^*(b) = \max_\pi V^\pi(b)$ satisfies the **Bellman equation**:

$$J^*(b) = \max_{a \in \mathcal{A}} \left[ \sum_s b(s) r(s,a) + \gamma \sum_o P(o | b, a) J^*(b'_{a,o}) \right]$$

where $b'_{a,o}$ is the belief state after taking action $a$ and observing $o$, and $P(o | b, a) = \sum_{s'} O(o | s', a) \sum_s P(s' | s, a) b(s)$ is the probability of observing $o$ given belief $b$ and action $a$.

The Bellman equation decomposes value into two terms:
1. **Immediate reward**: $\sum_s b(s) r(s,a)$ - the expected reward from the current action
2. **Continuation value**: $\gamma \sum_o P(o | b, a) J^*(b'_{a,o})$ - the discounted expected value of the future, weighted by the probability of each possible observation

### 4.2 Value Function and Soul: The Connection

The value function, when the reward function is the soul reward $r_{\text{soul}}(s,a) = \boldsymbol{\nu}^\top \dot{\mathbf{R}}(E,t)$, has a direct interpretation:

$$J^*(b) = \text{expected cumulative representational footprint from belief state } b \text{ under optimal policy}$$

This connects [Parts 4](../theory/04_time_and_soul.md) and 6: the soul is the *realized* representational footprint; the value function is the *expected* representational footprint. An entity's value function is, in this interpretation, its assessment of how much soul it can accumulate from its current epistemic position. The optimal policy $\pi^*$ is the soul-maximizing strategy - the sequence of actions that produces the largest valued representational footprint given current beliefs about the world.

This framing resolves a tension in the original soul definition. [Part 4](../theory/04_time_and_soul.md) defined the soul as a *descriptive* quantity - what difference did E make to others' trajectories? Here it becomes additionally a *normative* quantity - the value function provides a criterion for *choosing* actions that shape the soul. The entity *grows* a soul through policy execution, and the quality of its policy determines the trajectory of its representational footprint.

### 4.3 Trajectory Optimization in State Space

The POMDP framework yields a complete account of trajectory through state space. The entity's trajectory $X_E(t)$ is determined jointly by:

1. **External forces**: fields $\Phi$, other entities' actions, environmental dynamics - captured by the generalized mechanics ($F = \mathcal{M}\ddot{X} + \dot{\mathcal{M}}\dot{X}$)
2. **Self-generated forces**: the entity's own policy $\pi(b)$, which exerts forces on its own state and on others' states through outgoing causal power $\mathcal{P}_E$
3. **Belief dynamics**: the evolution of $b(t)$ through Bayesian updating, which changes the policy's outputs even when the external situation is unchanged

The trajectory is therefore not a passive response to forces - it is the *joint product* of external forces and the entity's own agency-driven force generation. For entities with $A > 0$, the trajectory is partially self-determined. The degree of self-determination is proportional to the ratio of self-generated forces to external forces:

$$\alpha_E = \frac{|\mathbf{F}_{\text{self}}|}{|\mathbf{F}_{\text{self}}| + |\mathbf{F}_{\text{ext}}|}$$

$\alpha_E = 0$ means the entity is entirely externally driven - a leaf in the wind. $\alpha_E = 1$ means the entity's trajectory is entirely self-generated - an idealization never realized in practice, because all entities couple to fields. The realistic range for high-agency entities in everyday conditions is $\alpha_E \in (0.3, 0.7)$ - substantially influenced by both external forces and self-generated policy.

---

## Section 5: Sociological Application - Collective Decision and Prediction

### 5.1 Multi-Agent Extension

When multiple agents share a state space, the single-agent POMDP becomes a **decentralized POMDP** (Dec-POMDP). Each entity $i$ has:
- Its own observation function $O_i$, determined by its consciousness $\mathbf{C}_i$
- Its own transition model $\hat{P}_i$, determined by its intelligence $I_i$
- Its own reward function $r_i$, determined by its values $\boldsymbol{\nu}_i$ and reward weights $w_i$
- Its own policy $\pi_i(b_i)$
- Its own belief state $b_i$, which includes beliefs about others' belief states (recursive modeling)

The collective dynamics are the simultaneous execution of all entities' policies, with each entity's actions appearing as state transitions to every other entity. The field $\Phi(x)$ from [Part 1](../theory/01_generalized_mechanics.md) is, in this view, the mean-field summary of all entities' action-generated forces - the aggregate effect of everyone's policy execution on the state space.

[Bernstein, Givan, Immerman & Zilberstein (2002)](https://doi.org/10.1287/moor.27.4.819.297) proved that Dec-POMDPs are NEXP-complete - computationally intractable in the worst case. This is the formal result behind the informal observation that coordinating large groups is hard. The complexity does not arise from any single entity's limitations but from the combinatorial explosion of joint policies.

### 5.2 Sociological Variables as POMDP Quantities

The user's original observation - that sociological concepts can be understood as "definable variables with discoverable causality" - now has precise formal expression:

| Sociological Concept | POMDP / Framework Quantity |
|---|---|
| Social state | State $X \in S$ ([Part 1](../theory/01_generalized_mechanics.md)) |
| Social action | Action $a \in \mathcal{A}$ - outgoing causal power ([Part 3](../theory/03_intelligence_consciousness_agency.md)) |
| Social observation | Observation $o \in \Omega$ - consciousness-filtered access to $X$ ([Part 3](../theory/03_intelligence_consciousness_agency.md)) |
| Social norms | Potential landscape $V(X)$ - attractors in the field that pull entities toward equilibrium behavior |
| Institutions | High-$\mathcal{M}$ meta-entities ([Part 2](../theory/02_meta_entities.md)) whose policies generate persistent field structure |
| Cultural beliefs | Collective belief state $\bar{b} = \frac{1}{N}\sum_i b_i$ - the population average over individual beliefs |
| Polarization | High $\Delta b_{ij}$ - divergent belief states across groups (Section 2.4) |
| Social influence | Cross-entity coupling $\kappa_{ij}$ - the mechanism by which one entity's actions enter another's observation function |
| Revolution / phase transition | Discontinuous shift in the collective belief state and policy - when the potential landscape $V(X)$ is reshaped faster than entities can adjust |
| Social prediction | Estimating $\hat{P}_{\text{social}}(s' \mid s, \{a_i\})$ - the collective transition function given all agents' policies |

### 5.3 Probabilistic Trajectories and Prediction

Sociological prediction, in this framework, is the problem of estimating the collective transition function $P_{\text{social}}(s' | s, \{a_i\})$ - the probability of the next social state given the current state and the joint actions of all entities. This is the multi-agent extension of the intelligence $I(E)$ - sociological intelligence is predictive accuracy over collective state trajectories.

The transition function decomposes into:

$$P_{\text{social}}(s' | s, \{a_i\}) = \prod_j P_j(X_j' | X_j, \{a_i\}_{i \in \mathcal{N}(j)})$$

in the mean-field approximation, where $\mathcal{N}(j)$ is the neighborhood of entity $j$ - the set of entities whose actions directly affect $j$'s state transition. This is a factored transition model: each entity's next state depends on the actions of its neighbors, and the global transition is the product of local transitions.

The approximation breaks down when long-range correlations emerge - precisely at phase transitions ([Part 5, Open Question 1, Prediction P5](../theory/05_ontology_and_open_questions.md)). Near criticality, the factored model fails because distant entities become correlated, and the transition function cannot be decomposed into local factors. This is the sociological analogue of the breakdown of mean-field theory near physical phase transitions.

[Turchin's cliodynamics (*Ages of Discord*, 2016)](https://peterturchin.com/book/ages-of-discord/) is an empirical application of this framework at civilizational scale. Turchin's five-variable structural-demographic model $(N, E, S, W, P)$ - population, elite overproduction, state fiscal health, social cohesion, political instability - is a low-dimensional projection of the collective state $X$, and his dynamical equations are an estimated transition function $\hat{P}_{\text{clio}}$. The model's predictive success over historical data (secular cycles of ~150 years verified across multiple civilizations) is evidence that the collective transition function has exploitable structure even in high-dimensional social systems.

[Epstein & Axtell's *Growing Artificial Societies* (1996)](https://mitpress.mit.edu/9780262550253/growing-artificial-societies/) demonstrated that agent-based computational models - where each agent follows a local policy $\pi_i(b_i)$ in a shared environment - can reproduce macroscopic social phenomena (wealth distributions, migration patterns, cultural differentiation) from microscopic decision rules. This is the computational implementation of the Dec-POMDP framework: define each agent's observation function, transition model, reward function, and policy; simulate; observe the emergent collective trajectory. The approach validates Epimechanics' claim that sociological prediction is a measurement and modeling problem, not a fundamentally different kind of inquiry from physical prediction.

### 5.4 Bayesian Models of Social Trajectories

The Bayesian framework provides the natural language for social prediction under uncertainty. A social scientist's model of a society is itself a belief state $b_{\text{scientist}}$ over the social state space $S$, updated by observations of social outcomes. The scientist's intelligence $I_{\text{scientist}}$ determines the quality of their transition model; their consciousness $C_{\text{scientist}}$ (in the allo-representation dimension, applied to the society) determines the quality of their observations.

[Gelman et al.'s Bayesian Data Analysis (2013)](http://www.stat.columbia.edu/~gelman/book/) provides the methodological foundation: prior distributions over model parameters encode existing knowledge; likelihood functions encode the observation model; posterior distributions encode updated beliefs given data. Epimechanics' POMDP formalism and Bayesian data analysis are the same mathematical structure applied at different levels - the former describes how entities within the system decide, the latter describes how observers of the system learn.

This recursive structure - agents are Bayesian decision-makers, and analysts of those agents are also Bayesian decision-makers - is a feature, not a regress. It means the same formal apparatus applies at every level of description: the entity deciding, the society emerging from many entities deciding, and the scientist modeling the society. The mathematics is the same; only the state space, observation function, and reward function change.

---

## Section 6: Case Studies

### 6.1 A Person Choosing a Career

**State space**: $X$ includes the person's skills, interests, financial position, social network, and the labor market conditions.

**Observation function**: Determined by the person's consciousness $\mathbf{C}$. Auto-modeling components: how well do they know their own skills, preferences, and limitations? Allo-representation components: how well do they model the expectations and responses of employers, colleagues, and family? Temporal components: can they project forward 5, 10, 20 years?

**Transition model**: The person's intelligence $I$ applied to career trajectories - their ability to predict how different choices will affect their future state. A person with high $I$ in this domain has observed many career trajectories, identified patterns, and can forecast the likely consequences of choices. A person with low $I$ in this domain is guessing.

**Reward function**: A weighted combination - $w_1$ (survival: can I pay rent?), $w_2$ (hedonic: will I enjoy this?), $w_3$ (soul: will this work matter to others?). The weights shift over the career: early career favors $w_1$; mid-career balances all three; late career often shifts toward $w_3$.

**Belief state**: The person's probability distribution over their own capacities, the market's receptiveness, and the likely trajectories of different paths. This belief state has mass - a person deeply committed to a career identity has a peaked $b$ that is hard to shift.

**Policy**: The career decision - and subsequent daily decisions within that career - are the policy $\pi(b)$. Career changes are belief-state transitions large enough to shift the policy regime.

### 6.2 A Nation Responding to a Crisis

**State space**: $X$ includes economic indicators, institutional health, social cohesion, military capacity, and the states of neighboring nations.

**Observation function**: Determined by the nation's collective consciousness $\mathbf{C}_{\text{nation}}$ - its intelligence agencies, free press, academic institutions, and public discourse. A nation with a free press and independent judiciary has a more informative $O$ than one with state-controlled media and censored academia. The consciousness of a nation is an emergent property of its institutional architecture.

**Transition model**: The nation's collective intelligence about geopolitical dynamics - its diplomatic corps, think tanks, and historical memory. Turchin's cliodynamic models are formalized versions of a civilization's transition model.

**Belief state**: The nation's collective assessment of the situation. Different institutions may maintain different belief states ($b_{\text{military}} \neq b_{\text{diplomacy}} \neq b_{\text{public}}$), and the coordination (or failure of coordination) among these sub-beliefs is a critical determinant of response quality.

**Policy**: The national response - military, diplomatic, economic, informational. The policy is generated by the nation's governance structures, which aggregate sub-policies from different institutions. The quality of the aggregation mechanism (democratic deliberation, authoritarian decree, bureaucratic process) determines whether the national policy approximates $\pi^*$ or degrades into incoherence.

**Discount factor**: Determined by institutional structure. A democracy with 4-year election cycles has $\gamma$ structurally reduced for long-horizon decisions - leaders are incentivized to weight near-term outcomes. Institutions designed for long-horizon planning (constitutions, independent central banks, sovereign wealth funds) raise $\gamma$ by insulating some decisions from short-term political pressure.

### 6.3 An AI System Selecting Outputs

**State space**: $X$ includes the conversation context, the user's (partially observable) intent and knowledge state, and the broader informational environment.

**Observation function**: The AI's access to $X$ is mediated by the input it receives - text, structured data, tool outputs. The observation function is determined by the model architecture and the information available in context. $O$ is highly informative along certain dimensions (explicit text content) and nearly opaque along others (the user's true intent, the downstream consequences of the output).

**Transition model**: The AI's ability to predict how different outputs will affect the user's trajectory - their understanding, their next actions, their downstream decisions. A model with high $I$ in this domain can anticipate how different phrasings, levels of detail, or framings will be received. A model with low $I$ generates text without modeling its consequences.

**Reward function**: Specified by training - typically a combination of helpfulness, accuracy, and safety constraints. This is an externally imposed reward function, not one the system chose. Whether the system has an *internal* reward that diverges from the training signal is an open question about AI consciousness ([Part 3](../theory/03_intelligence_consciousness_agency.md), [Part 5 Open Question 5](../theory/05_ontology_and_open_questions.md)).

**Policy**: The output selection process. Current large language models execute what is approximately a stochastic policy $\pi(a | o)$ - a probability distribution over next tokens conditioned on observations (the input context). Whether this policy is mediated by a genuine belief state $b$ or is a direct observation-to-action mapping (model-free, System 1-like) is the structural question that determines whether the system has $\mu_{\text{meta}} > 0$ for its outputs.

---

## Section 7: Cooperative and Competitive Strategy

### 7.1 The Game-Theoretic Extension

Sections 1–6 treat the entity as a single decision-maker in a world of other entities whose actions appear as state transitions. But entities also *strategize against and with each other*. When entity $i$'s optimal action depends on entity $j$'s action, and vice versa, the problem is no longer a POMDP. It is a **game**.

The formal bridge is direct. A multi-agent POMDP in which each entity's reward depends on others' actions is a **stochastic game** - also called a Markov game - defined by:

- $N$ entities, each with observation function $O_i$, transition model $\hat{P}_i$, and policy $\pi_i$
- A joint transition function $P(s' | s, a_1, \ldots, a_N)$ - the state evolves under the *combined* actions of all entities
- Reward functions $r_i(s, a_1, \ldots, a_N)$ - each entity's reward depends on what *everyone* does

[Shapley (1953)](https://doi.org/10.1073/pnas.39.10.1095) introduced stochastic games; [Littman (1994)](https://doi.org/10.1016/B978-1-55860-335-6.50027-1) extended them to the multi-agent reinforcement learning setting. The key structural fact: when $r_i$ depends on $a_j$ for $j \neq i$, the entity cannot optimize independently. It must model what others will do - and others must model what it will do. This recursive modeling is precisely the allo-representation dimension of consciousness $\mathbf{C}$.

### 7.2 Competitive Strategy: Zero-Sum and Adversarial Dynamics

A purely competitive interaction is one where one entity's gain is another's loss. In the two-entity case:

$$r_1(s, a_1, a_2) = -r_2(s, a_1, a_2)$$

This is a **zero-sum game**. The entities are fighting over a fixed quantity - territory in state space, coupling strength to a field, influence over a third entity's trajectory, access to a scarce resource.

[Von Neumann's minimax theorem (1928)](https://doi.org/10.1007/BF01448847) established that in two-player zero-sum games, a rational strategy exists: each entity maximizes its minimum guaranteed payoff. The **minimax policy** is:

$$\pi_1^* = \arg\max_{\pi_1} \min_{\pi_2} V_1^{\pi_1, \pi_2}$$

The entity assumes the adversary will play optimally against it and chooses the best response to the worst case. This is the decision-theoretic formalization of strategic caution.

In Epimechanics, competitive interactions appear as **opposing forces** in shared state-space dimensions. When entity $i$ exerts force $\mathbf{F}_i$ and entity $j$ exerts $\mathbf{F}_j$ in opposite directions on the same state variable $X_k$, the net force is $\mathbf{F}_i + \mathbf{F}_j$ - and the state moves in the direction of the stronger force, weighted by coupling. Competition is force opposition on shared states.

The intensity of competition is measurable. Define the **strategic opposition** between entities $i$ and $j$ in domain $\mathcal{D}$:

$$\Theta_{ij}^{(\mathcal{D})} = -\frac{\nabla_{a_i} r_i \cdot \nabla_{a_j} r_i}{\|\nabla_{a_i} r_i\| \cdot \|\nabla_{a_j} r_i\|}$$

When $\Theta_{ij} > 0$, $j$'s actions move $i$'s reward in the opposite direction from what $i$ wants - they are competitors. When $\Theta_{ij} < 0$, $j$'s actions move $i$'s reward in the same direction - they are cooperators. When $\Theta_{ij} = 0$, their actions are strategically independent.

Competitive dynamics have specific consequences for Epimechanics:

- **Arms races**: When both entities escalate outgoing causal power $\mathcal{P}_E$ to overcome the other's opposition, total energy expenditure rises while net state change may remain small. The entities are doing work against each other, not against the state space. This is the formal structure of military arms races, market competition, and ideological conflict: high energy, low net trajectory change, high entropy production.
- **Competitive mass accumulation**: Entities under competitive pressure tend to increase $\mathcal{M}$ - densifying internal causal structure to resist the adversary's force. Institutional bureaucratization under threat, ideological rigidification under attack, and military fortification are all instances of competitive $\dot{\mathcal{M}} > 0$.
- **Predator-prey oscillations**: When the coupling is asymmetric - entity $i$'s reward increases when $j$ is weak, while $j$'s reward increases when $i$ is absent - the dynamics produce oscillatory trajectories. [Lotka (1925)](https://doi.org/10.1073/pnas.6.7.410) and [Volterra (1926)](https://doi.org/10.1038/118558a0) formalized this for biological populations; the same structure appears in regulatory-evasion cycles (regulators tighten, regulated entities adapt, regulators tighten further) and in competitive market dynamics where incumbents and disruptors alternate dominance.

### 7.3 Cooperative Strategy: Positive-Sum and Coordination

A purely cooperative interaction is one where all entities' rewards are aligned:

$$\nabla_{a_j} r_i > 0 \quad \text{for all } i, j$$

Every entity benefits when every other entity acts well. The problem is not conflict but **coordination**: how do entities with different observation functions $O_i$, different belief states $b_i$, and limited communication channels align their policies to reach the joint optimum?

[Nash's bargaining solution (1950)](https://doi.org/10.2307/1907266) identified the cooperative outcome that maximizes the product of each entity's utility gain over the disagreement point - a unique, Pareto-optimal, symmetric solution. In Epimechanics' terms, the Nash bargaining solution is the policy profile $(\pi_1^*, \ldots, \pi_N^*)$ that maximizes:

$$\prod_i \left[ V_i^{\pi^*} - V_i^{\pi_{\text{disagree}}} \right]$$

where $V_i^{\pi_{\text{disagree}}}$ is entity $i$'s value under the non-cooperative policy. The product form ensures that no entity is sacrificed for aggregate gain - the solution is fair in the sense that each entity's improvement over the disagreement point is weighted equally in multiplicative terms.

Cooperation requires three structural conditions, each of which maps to a framework quantity:

**(a) Aligned reward functions.** $\Theta_{ij} < 0$ - each entity's actions improve the other's reward. When reward functions are fully aligned ($r_i = r_j$ for all $i, j$), the multi-agent problem reduces to a single-agent problem with distributed execution. This is the case for cells within an organism, members of a team with shared goals, or institutions within a well-functioning government.

**(b) Sufficient allo-representation.** Each entity must model the other entities' belief states and likely actions well enough to coordinate. Cooperation fails when $C_{\text{allo}}$ is too low - entities cannot predict what their partners will do, so they cannot align their own actions accordingly. [Tomasello's *A Natural History of Human Thinking* (2014)](https://www.hup.harvard.edu/books/9780674986831) argues that shared intentionality - the capacity to model and align with a partner's goals and plans - is the cognitive foundation of human cooperation and the evolutionary innovation that enabled human cultural complexity. In Epimechanics' terms, shared intentionality is high mutual allo-representation: each entity's consciousness tensor has strong entries for modeling the other's belief state, action tendencies, and goals.

**(c) Credible commitment.** Even when rewards are aligned and allo-representation is sufficient, cooperation can fail if entities cannot commit to cooperative policies. The **prisoner's dilemma** - in which each entity's individually rational action leads to a collectively worse outcome - is the canonical example. [Axelrod's *The Evolution of Cooperation* (1984)](https://www.basicbooks.com/titles/robert-axelrod/the-evolution-of-cooperation/9780465005642/) showed through computational tournaments that the strategy **tit-for-tat** (cooperate first, then mirror the other's previous action) robustly sustains cooperation in iterated interactions. The mechanism is **reciprocity**: the entity's policy conditions future cooperation on past cooperation, creating an incentive structure that makes defection costly over time.

In Epimechanics, credible commitment is a **coupling mechanism**: the entity binds its future policy to the other entity's actions, creating a cross-entity coupling $\kappa_{ij}$ that links the entities' trajectories. Contracts, treaties, reputations, and institutional norms all serve this function - they increase $\kappa_{ij}$ so that defection by one entity produces state changes in the other that propagate back as force on the defector.

### 7.4 Mixed-Motive Interactions and the Cooperation-Competition Spectrum

Most real interactions are neither purely competitive nor purely cooperative. They are **mixed-motive**: entities share some goals and conflict on others. The strategic opposition $\Theta_{ij}$ varies across state-space dimensions - entities may cooperate in one domain and compete in another simultaneously.

[Schelling's *The Strategy of Conflict* (1960)](https://www.hup.harvard.edu/books/9780674840317) demonstrated that mixed-motive interactions have a distinctive structure: entities must simultaneously manage the cooperative dimension (coordinate to reach the Pareto frontier) and the competitive dimension (bargain over where on the frontier to land). The cooperative problem is about *finding* mutually beneficial outcomes; the competitive problem is about *distributing* the gains.

Epimechanics formalizes this as a decomposition of the reward function:

$$r_i(s, \mathbf{a}) = r_{\text{common}}(s, \mathbf{a}) + r_{\text{private},i}(s, \mathbf{a})$$

where $r_{\text{common}}$ is the component shared by all entities (aligned incentives - growing the pie) and $r_{\text{private},i}$ is the component specific to entity $i$ (conflicting incentives - dividing the pie). The ratio $|r_{\text{common}}| / (|r_{\text{common}}| + |r_{\text{private}}|)$ measures the degree of alignment - values near 1 are nearly cooperative; values near 0 are nearly competitive.

### 7.5 Strategic Interaction and Soul

Competition and cooperation have different consequences for soul trajectories.

**Competitive souls** tend toward high amplitude, narrow breadth, and mixed sign. A conqueror's representational footprint $\mathbf{R}(E,t)$ is large in the entities it dominated (high $|\delta X_j|$) but negative in those entities' valued dimensions - their trajectories were redirected against their own preferences. The conqueror's soul is large in norm but negative when projected onto the value bases of those it affected. Purely competitive strategy produces souls that are intensely present in others' trajectories but destructively so.

**Cooperative souls** tend toward moderate amplitude, high breadth, and positive sign. A teacher, institution-builder, or community organizer who strengthens others' capacities produces $\delta X_j > 0$ (valued direction) across many entities $j$. The amplitude in any single entity may be modest, but the breadth - the number of entities carrying the pattern - is large. Cooperative strategy produces souls that are widely distributed and positively signed.

**Mixed-motive souls** have the most complex structure: positive $\mathbf{R}$ in some dimensions and entities, negative in others, with the sign structure reflecting the specific configuration of alignment and conflict across the entity's interactions. Most human souls are mixed-motive - cooperative in some relationships, competitive in others, with the balance shifting over time and across domains.

[Nowak's *SuperCooperators* (2011)](https://www.simonandschuster.com/books/SuperCooperators/Martin-A-Nowak/9781451626636) identifies five mechanisms that sustain cooperation in evolutionary settings: direct reciprocity (repeated interaction), indirect reciprocity (reputation), spatial selection (clustering of cooperators), group selection (competition between groups favoring internally cooperative groups), and kin selection (shared genetic interest). Each mechanism corresponds to a coupling structure that makes cooperative policies stable:

| Mechanism | Framework Coupling |
|---|---|
| Direct reciprocity | Iterated cross-entity coupling: $\kappa_{ij}(t)$ sustained by repeated interaction |
| Indirect reciprocity | Reputation as a field: $\Phi_{\text{rep}}(E)$ mediates coupling to future partners |
| Spatial selection | Proximity coupling: cooperators cluster, raising local $\bar{\Theta}_{ij} < 0$ |
| Group selection | Meta-entity competition: internally cooperative groups (high $\lambda_{\min}(\Gamma)$) outcompete fragmented ones |
| Kin selection | Shared auto-causal structure: genetic overlap means $\delta X_j(E,t)$ in kin partially sustains E's own pattern |

Each mechanism can be measured, modeled, and - critically - engineered. Institutional design is, in this framework, the deliberate construction of coupling structures that make cooperative policies stable against defection. A well-designed institution increases $\kappa_{ij}$ for cooperative interactions, raises the cost of defection (via reputation fields and enforcement), and clusters cooperators (via selection and spatial structure) - all to shift $\Theta_{ij}$ toward the cooperative regime.

### 7.6 The Strategic Consciousness Requirement

Strategy - whether competitive or cooperative - requires a specific structure in the consciousness tensor $\mathbf{C}$. An entity engaged in strategic interaction must maintain:

1. **A model of the other's policy**: $\hat{\pi}_j$ - what will the other entity do? This is allo-representation applied to action prediction, not merely state observation.
2. **A model of the other's model of oneself**: $\hat{\pi}_j(\hat{\pi}_i)$ - what does the other think I will do? This is the recursive cross-term from [Part 3](../theory/03_intelligence_consciousness_agency.md): $C_{ijk}$ where $i$ indexes the self-as-modeled-by-other.
3. **A model of the strategic structure**: is this interaction zero-sum, cooperative, or mixed? The entity must classify the interaction type to select the appropriate policy regime (minimax, coordination, or Schelling-style mixed-motive bargaining).

The depth of recursive modeling - how many levels of "I think that you think that I think..." the entity can sustain - determines the sophistication of its strategic play. [Camerer, Ho & Chong's cognitive hierarchy model (2004)](https://doi.org/10.1162/0033553041502225) shows that humans typically sustain 1–2 levels of recursive modeling, with diminishing accuracy at each level. In Epimechanics' terms, the $\mathbf{C}$ tensor's cross-term entries decay rapidly with recursion depth - most entities' allo-representation of others' allo-representation of them is noisy and shallow.

For meta-entities, strategic consciousness is distributed. A corporation's strategic analysis department models competitors' likely actions; its legal team models regulators' models of the corporation's likely actions; its public relations team models the public's model of the corporation's intentions. The meta-entity's strategic consciousness is the aggregate of these specialized representational subsystems - and the quality of internal coupling among them ([Part 2](../theory/02_meta_entities.md)'s inter-substrate coupling $\Gamma$) determines whether the meta-entity's strategic behavior is coherent or fragmented.

---

## Closing

Epimechanics now has a decision-theoretic layer. [Parts 1](../theory/01_generalized_mechanics.md)–[5](../theory/05_ontology_and_open_questions.md) described the world from the outside - states, forces, entities, souls. Part 6 describes the world from the entity's interior - beliefs, policies, value, choice. The two descriptions are dual:

| External ([Parts 1](../theory/01_generalized_mechanics.md)–[5](../theory/05_ontology_and_open_questions.md)) | Internal (Part 6) |
|---|---|
| State $X$ | Belief state $b$ over $X$ |
| Force $F$ | Action $a = \pi(b)$ - self-generated force |
| Intelligence $I$ | Transition model $\hat{P}_E$ |
| Consciousness $C$ | Observation function $O$ |
| Agency $A$ | Policy quality × action space |
| Soul $\mathbf{R}(E,t)$ | Value function $J^*(b)$ - expected soul |

Every concept defined in the earlier parts has a dual in the decision-theoretic framework. The external description tells you what an entity *is*; the internal description tells you what it *faces*. Together they provide the complete picture: an entity is anything with a describable state; a *strong* entity has high auto-causal density and maintains a probabilistic model of its environment, selects actions through a policy conditioned on that model, and accumulates a representational footprint in others' trajectories as a consequence of those actions.

The original intuition - that sociological concepts are definable variables with discoverable causality, formalizable via decision processes with state, action, and observation - is correct. Epimechanics provides the state space and dynamics; the POMDP provides the decision structure; the consciousness tensor provides the observation function; the soul provides the reward signal. The wall between description and decision was always a wall between the third-person and first-person views of the same system.

---

[← Part 5: Full Ontology and Open Questions](../theory/05_ontology_and_open_questions.md)
