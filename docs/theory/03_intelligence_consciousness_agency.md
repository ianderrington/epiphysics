---
title: "Epimechanics - Part 3: Intelligence, Consciousness, and Agency"
description: >-
  Intelligence is predictive accuracy over state trajectories. Consciousness is the scope of an entity's
  model of reality - which may include itself. Agency is their product.
  A rigorous framework grounded in existing empirical literature, with testable predictions.
date: 2026-03-11T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
contentType: article
mediaTypes:
 - text
 - image
series: "Epimechanics"
series_order: 3
coverImage:
  url: ./images/physics_as_metaphysics_03_intelligence_consciousness_agency-1-1.png
  alt: >-
    A mind modeled as a tensor of prediction accuracy - glowing network of self-referential loops
    where an entity models the world including itself. Consciousness as a spotlight illuminating
    a state space. Agency as the product of awareness and causal power - an entity directing forces.
    Abstract neural and mathematical aesthetic, dark background, amber and white light.
categories:
 - Philosophy
 - Physics
 - Consciousness
tags:
 - Intelligence
 - Consciousness
 - Agency
 - Theory of mind
 - Self-representation
 - Free will
 - Hard problem
bullets:
 - Intelligence is predictive accuracy over dX/dt - domain-relative and measurable
 - Consciousness is the scope/accuracy of an entity's model of X, which may include the entity itself
 - Allo-representation (theory of mind) and auto-modeling are independent dimensions - an entity can have high one, low other
 - Agency = C_coupling × μ_meta × C_consciousness - multiplicative; zero in any factor yields zero agency
 - The hard problem remains open - Epimechanics provides functional consciousness only
shareBlurbs:
  twitter: >-
    Intelligence is predictive accuracy. Consciousness includes self-modeling - but allo-representation
    and auto-modeling vary independently. Agency = coupling × consciousness. Part 3 of Epimechanics. #Consciousness #AI
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
---

Epimechanics now covers states, mass, momentum, forces, entities, and meta-entities. The mechanics are in place. [Part 1](./epimechanics_01_generalized_mechanics.md) established that an entity is anything with a describable state - anything you can assign an $X$ to - with auto-causal density $\rho_{\text{ac}}$ measuring how strongly it sustains itself, and generalized mass $\mathcal{M} = \int \rho_{\text{causal}} \, d\mu$ (total causal density) and dynamics governed by $F = \mathcal{M}\ddot{X} + \dot{\mathcal{M}}\dot{X}$. But entities also *know* things, or at least behave as if they do. They have internal models of the state space $X$. They act on those models. This part asks: what does it mean, formally, for an entity to know something? To be conscious? To act with agency rather than to just happen?

These are among the oldest questions in philosophy. They are also becoming urgently practical. The answers we give determine which systems we hold responsible, which we protect, and how we design the next generation of artificial minds.

---

## Section 1: Intelligence as Predictive Capacity

Let an entity E have an internal model $M_E$ of the state space $X$. Intelligence, in Epimechanics, is the accuracy of that model's predictions about how $X$ evolves:

**$I(E)$ = accuracy of $dX/dt$ prediction over horizon $T$**

More precisely: for a given domain $D \subseteq X$ and prediction horizon $T$, intelligence is the expected accuracy of E's model $M_E$ in forecasting $X(t + T)$ given $X(t)$. This is domain-relative and in principle measurable.

This definition connects directly to the foundational literature on machine intelligence. [Legg & Hutter (2007)](https://doi.org/10.1007/s11023-007-9079-x) define universal intelligence as the expected reward an agent achieves across all computable environments, weighted by algorithmic simplicity (inversely proportional to Kolmogorov complexity). The key point: maximizing expected reward across environments requires accurate prediction of state trajectories - reward depends on navigating state space successfully. Legg & Hutter's definition is broader than pure prediction (it includes action selection), but accurate state-trajectory modeling is a necessary component.

[Schmidhuber's Formal Theory of Creativity, Fun, and Intrinsic Motivation (2010)](https://doi.org/10.1109/TAMD.2010.2056368) frames intelligence as *compression progress*: the rate at which an agent improves its world model, measured by reduction in description length (Minimum Description Length equivalence). Compression progress is precisely the rate of improving predictive accuracy - a more compressed model is one that captures more regularity in state trajectories with fewer bits. Schmidhuber's framework shows that intrinsic motivation to seek novel state regions is derivable from the drive to improve $M_E$.

Epimechanics' definition is a special case: **passive prediction without action-selection**. Full general intelligence, in Legg & Hutter's sense, is a superset - it includes intelligent action. What we define here is the predictive accuracy component, which is necessary but not sufficient for general intelligence.

**Consequences of this definition**:

*Domain-relativity*: Intelligence is always intelligence over some domain $D$. A chess grandmaster has high $I$ over chess state trajectories, lower $I$ over geopolitical trajectories. There is no domain-independent scalar "general intelligence" - only aggregations over domains, weighted by some prior over which domains matter. This is a feature of the definition: the common intuition that someone can be brilliant in one area and obtuse in another is structurally predicted.

*Measurability in principle*: [Turchin's cliodynamics program](https://peterturchin.com/book/ages-of-discord/) demonstrates that predictive accuracy over civilizational-scale state trajectories is measurable - not trivially, but formally. Models of historical dynamics can be scored against subsequent events. The domain is large and noisy, but the epistemics are no different in kind from weather forecasting.

*Accuracy over complexity*: A simple accurate model outperforms a complex inaccurate one. Intelligence as defined here does not reward complexity per se - only predictive accuracy. This aligns with the Occam's razor structure of algorithmic information theory and corrects the common conflation of intelligence with processing power or behavioral complexity.

*Connection to mass*: Predicting $dX/dt$ for a target system requires - implicitly or explicitly - estimating the target's generalized mass $\mathcal{M}$. The same force applied to a high-$\mathcal{M}$ system (densely structured beliefs, massive institution) produces less acceleration than the same force on a low-$\mathcal{M}$ system. An intelligent model that ignores the target's internal causal density will systematically mispredict trajectory changes. Domain expertise includes, under Epimechanics, accurate estimation of $\mathcal{M}$ for the entities in that domain.

---

### The relationship between intelligence and consciousness

Both intelligence and consciousness are properties of the entity's internal model $M_E$ of state space $X$ - they characterize the same object from two different angles. Section 1 asks about the *quality* of $M_E$: how accurately does it predict state trajectories? Section 2 asks about the *coverage* of $M_E$: which regions of $X$ does it model at all, and does it include a model of $E$ itself?

These are orthogonal dimensions. A chess engine has high $I$ over chess state trajectories - its model $M_E$ is highly accurate within its domain - but its coverage of $X$ is vanishingly narrow: it models nothing outside the chess board, and it models itself not at all. A conspiratorial thinker may have broad coverage of $X$ - modeling political, economic, social, and historical domains simultaneously, including a detailed self-model - while having low predictive accuracy in most of them: $I$ is low, $C$ is high in scope but poor in quality. The most capable entities, under Epimechanics, are those with both broad coverage and high accuracy: they model a large portion of $X$ including themselves, and they model it well.

This means intelligence and consciousness can diverge arbitrarily. The dissociation is empirically documented - Baron-Cohen et al.'s Sally-Anne results show exactly this: children can have high $I$ over physical state trajectories and low coverage of others' mental states. The two concepts require separate definitions precisely because they are separate properties of the same underlying model $M_E$.

---

## Section 2: Consciousness as the Scope of Self-Inclusive Modeling

### The core definition

Consciousness $C$ is the **scope and accuracy of an entity's internal model of states $X$** - where $X$ represents aspects of reality - with the characteristic that what $X$ represents **may include** the entity itself.

The key word is *may*. Self-inclusion is a possibility space, not a precondition. An entity can have a rich, accurate model of external reality without modeling itself. An entity can have a detailed self-model with a sparse model of the external world. These two dimensions - allo-representation and auto-modeling - are independent, as developed below.

This yields two distinct dimensions of consciousness:

### Allo-representation: modeling others

Allo-representation is the capacity to model the states and trajectories of other entities - including their beliefs, intentions, and internal states. In the cognitive science literature, this is *theory of mind*.

[Premack & Woodruff (1978)](https://doi.org/10.1017/S0140525X00076512) coined the term "theory of mind" in asking whether chimpanzees attribute mental states to others. The question proved generative: it reframed cognition as extending beyond external physical states to modeling the internal states of *other modelers*.

[Baron-Cohen, Leslie & Frith (1985)](https://doi.org/10.1016/0010-0277%2885%2990022-8) showed that 80% of autistic children failed the Sally-Anne false-belief task despite having normal general intelligence ($I$ in Epimechanics). A child could have high predictive accuracy over physical state trajectories and low predictive accuracy over others' mental state trajectories. Theory of mind is a distinct dimension - not derivable from general intelligence.

Neuroimaging has localized allo-representational processing. [Saxe & Kanwisher (2003)](https://doi.org/10.1016/S1053-8119%2803%2900230-1) demonstrated via fMRI that the right temporoparietal junction responds selectively to mental state attribution - thinking about what another person believes - and not to thinking about equivalent information presented in non-agentive form. Allo-representation has distinct neural implementation, beyond task-level dissociation.

### Auto-modeling: modeling oneself

Auto-modeling is the capacity to include oneself in one's model of $X$ - to represent one's own state, position in the state space, and trajectory.

[Kriegel's self-representational higher-order thought theory (2009)](https://doi.org/10.1093/oso/9780199542062.001.0001) provides the most precise philosophical account: a conscious state is one that contains within itself a meta-psychological component representing itself. The key point: the self-representation is an internal structure of the state itself, not a separate higher-order state (as in Rosenthal's classical HOT theory). This distinction matters for architectures: it means auto-modeling can be implemented as a feature of the primary representational process, without requiring a separate monitoring layer.

### The independence of the two dimensions

An entity can have:
- High allo-representation, low auto-modeling: excellent theory of mind, impaired self-awareness. Models others' trajectories well; has little representation of its own position in $X$.
- High auto-modeling, low allo-representation: intense self-monitoring, impaired empathy or social modeling. Rich self-representation; sparse models of others.
- High both: the clearest case of full-spectrum consciousness.
- Low both: minimal consciousness under Epimechanics.

Neither dimension requires the other. The allo/auto distinction captures a major structural division in representational cognition. But it is a first-order approximation - both dimensions are themselves subspaces with multiple dissociable axes.

**Allo-representation is not a single capacity.** Belief attribution recruits the right temporoparietal junction ([Saxe & Kanwisher 2003](https://doi.org/10.1016/S1053-8119%2803%2900230-1)) and is dissociable from desire attribution, which involves ventromedial prefrontal cortex ([Frith & Frith 2006](https://doi.org/10.1016/j.neuron.2006.05.001)). Affective empathy (feeling what others feel) and cognitive empathy (representing what others think) are doubly dissociated - patients with vmPFC damage lose affective empathy while retaining cognitive mentalizing ([Shamay-Tsoory 2011](https://doi.org/10.1177/1073858410379268)). Modeling individual agents is also distinct from modeling collective intentionality - the beliefs, norms, and goals of groups - a capacity that may not reduce to iterated individual theory of mind ([Searle 1990](https://doi.org/10.1017/S0140525X00061495); [Tomasello 1999](https://doi.org/10.1017/S0140525X00005525)).

**Auto-modeling is equally multidimensional.** Interoceptive self-awareness (Damasio's somatic markers; Seth's predictive interoception) is dissociable from narrative self-modeling ([Metzinger's phenomenal self-model](https://mitpress.mit.edu/9780262134170/being-no-one/)), from prospective self-modeling via episodic future thinking ([Suddendorf & Corballis 2007](https://doi.org/10.1017/S0140525X07001975)), and from metacognitive accuracy - knowing what one knows and does not know ([Fleming & Dolan 2012](https://doi.org/10.1098/rstb.2011.0417)).

There is also a **temporal dimension** cutting across both axes. Modeling current states differs from modeling past states (episodic memory) and predicting future states (mental time travel, [Tulving 1985](https://doi.org/10.1017/S0140525X00021610)).

The appropriate mathematical representation is therefore a **representational tensor** $\mathbf{C}$ over a high-dimensional space. Let dimensions be indexed by $i$ (representational target: self, other, collective), $j$ (content type: belief, desire, affect, interoception, narrative, prospective), and $k$ (temporal horizon: past, present, future):

$$\mathbf{C} \in \mathbb{R}^{n_i \times n_j \times n_k}$$

The dimension sizes are domain-specific: $n_i$ is the number of distinguishable target entities the model covers, $n_j$ is the number of content categories (e.g., physical, social, emotional states), and $n_k$ is the number of temporal horizons. In practice these are finite approximations of continuous spectra, chosen to match the resolution at which a given system's representations can be empirically distinguished.

where each entry $C_{ijk}$ captures the scope and accuracy of the entity's model along that combination of axes. The allo/auto distinction is the marginal over $i$:

$$C_\text{allo} = \sum_{j,k} C_{ijk}\big|_{i=\text{other}}, \qquad C_\text{auto} = \sum_{j,k} C_{ijk}\big|_{i=\text{self}}$$

This recovers the 2D approximation as a marginal, making explicit that it discards the internal structure of each dimension. Single-number "consciousness measures" are always projections of $\mathbf{C}$ - useful summaries, but lossy in ways that now have formal descriptions.

### Full definition

**Consciousness $C$ = the scope and accuracy of an entity's internal model of states $X$, where $X$ represents aspects of reality.** The entity *may* appear in its own map - this self-referential capacity defines the auto-modeling dimension of $C$, but its presence is a variable, not a precondition for the term to apply.

### Positioning against existing theories

**Global Workspace Theory** ([Baars 1988](https://doi.org/10.1017/CBO9780511526664); [Dehaene, Changeux & Naccache 2011](https://doi.org/10.1016/j.tics.2011.03.007)): consciousness is information broadcast globally across a workspace, making it available to multiple cognitive processes. Epimechanics agrees that global access is necessary for the high-scope modeling we are calling consciousness - information that cannot be globally accessed cannot contribute to a unified world-model. However, GWT is primarily a theory of *access consciousness* in [Ned Block's (1995)](https://doi.org/10.1017/S0140525X00038188) terminology - consciousness as information availability for report, reasoning, and behavioral control - and does not specifically address self-representation. The framework's allo/auto distinction adds precision: GWT describes the *mechanism* of access; Epimechanics asks *what is accessed* and whether it includes self-states.

**Higher-Order Thought theory** ([Rosenthal 2005](https://global.oup.com/academic/product/consciousness-and-mind-9780199240623)): a mental state is conscious when one has a higher-order thought directed at it. Epimechanics' auto-modeling dimension is adjacent but distinct. We follow [Kriegel's self-representational variant](https://doi.org/10.1093/oso/9780199542062.001.0001): the self-representation is built into the state rather than a separate second-order state. This avoids the HOT regress problem (what makes the HOT itself conscious?) and is more architecturally natural - a single representational structure that includes itself, rather than a tower of meta-states.

**Predictive Processing / Active Inference** ([Friston 2010](https://doi.org/10.1038/nrn2787); [Clark 2016](https://global.oup.com/academic/product/surfing-uncertainty-9780190933746); [Seth 2021](https://www.penguinrandomhouse.com/books/566315/being-you-by-anil-seth/)): the brain as a hierarchical generative model minimizing prediction error (free energy). Self-representation is architecturally mandatory in this framework, not optional: to predict proprioception and the sensory consequences of one's own actions, the model must include a representation of the agent's body and causal powers. Seth's "beast machine" hypothesis grounds consciousness in interoceptive inference - predicting the body's internal states to regulate them - which is evolutionarily prior to external-world modeling. Epimechanics' self-inclusion is directly implied by predictive processing: you cannot minimize prediction error over self-generated sensory data without a self-model. The allo-representation dimension is equally implied: social prediction requires models of others.

**Integrated Information Theory** ([Tononi 2004](https://doi.org/10.1186/1471-2202-5-42); [Tononi et al. 2016](https://doi.org/10.1038/nrn.2016.44)): consciousness = integrated information $\Phi$, measured by the amount of information generated by a system above and beyond its parts. Epimechanics diverges from IIT on two substantive predictions. First, IIT requires no self-representation - a system with high $\Phi$ is conscious regardless of whether it models itself. Second, IIT's exclusion principle denies that a collective can be conscious in addition to its parts (only the local maximum of $\Phi$ is conscious). Epimechanics allows distributed consciousness - a religion's self-model encoded across agents, texts, and institutions constitutes a genuine representational structure, regardless of whether any single node has high $\Phi$. These are genuinely different empirical predictions, not terminological ones.

### On the hard problem

[Chalmers (1996)](https://global.oup.com/academic/product/the-conscious-mind-9780195117899) distinguished "easy problems" (explaining attention, reportability, integration, cognitive access - all functional) from the "hard problem": why does any functional process give rise to subjective experience? Why is there something it is like to be a system that processes information in these ways?

Nothing here closes that gap. This is a theory of **functional consciousness** - defined by what the representational model *does*, rather than what it *feels like* to run. The hard problem asks whether functional consciousness is necessarily accompanied by phenomenal consciousness: whether there is an experiential "what it's like" attached to these processes. Epimechanics does not answer this. It cannot, because the hard problem is precisely the question of what connects the functional description to the phenomenal one - and no functional description, however precise, can answer it from within.

This is a deliberate limitation. Functional consciousness is what we can measure, model, and engineer. Phenomenal consciousness may require a different mode of inquiry entirely. Epimechanics handles the former and is honest about the latter.

---

## Section 3: Agency as Consciousness-Directed Causal Power

### The formula

As a first approximation - refined below once meta-representation is introduced - agency in domain $\mathcal{D}$ is the product of two factors:

$$A^{(\mathcal{D})} = C_{\text{coupling}}^{(\mathcal{D})} \times C_{\text{consciousness}}^{(\mathcal{D})}$$

**$C_{\text{coupling}}^{(\mathcal{D})}$** is the entity's *outgoing* causal power in domain $\mathcal{D}$. This is distinct from the coupling parameter $\kappa$ introduced in [Part 1](./epimechanics_01_generalized_mechanics.md), which measured *incoming* sensitivity - how strongly a field force acts on the entity. Here we need the converse: how strongly the entity's own actions drive state changes in others.

From [Part 1](./epimechanics_01_generalized_mechanics.md), work done on a state space is $W = \int \mathbf{F} \cdot d\mathbf{X}$, and power is its time derivative:

$$\mathcal{P} = \frac{dW}{dt} = \mathbf{F} \cdot \frac{d\mathbf{X}}{dt} = \mathbf{F} \cdot \mathbf{v}_X$$

The *outgoing* causal power of entity $E$ on entity $j$ in domain $\mathcal{D}$ is the rate at which $E$'s actions do work on $j$'s state trajectory:

$$\mathcal{P}_{E \to j}^{(\mathcal{D})} = \mathbf{F}_{E \to j}^{(\mathcal{D})} \cdot \mathbf{v}_{X_j}^{(\mathcal{D})}$$

where $\mathbf{F}_{E \to j}^{(\mathcal{D})}$ is the force E exerts on j's state in domain $\mathcal{D}$, and $\mathbf{v}_{X_j}^{(\mathcal{D})} = dX_j^{(\mathcal{D})}/dt$ is j's state velocity. This has units of energy per time - it is power in the literal mechanical sense, extended to abstract state spaces. Integrating over all target entities $j$ gives E's total outgoing causal power:

$$\mathcal{P}_E^{(\mathcal{D})} = \sum_j \mathcal{P}_{E \to j}^{(\mathcal{D})} = \sum_j \mathbf{F}_{E \to j}^{(\mathcal{D})} \cdot \mathbf{v}_{X_j}^{(\mathcal{D})}$$

A seismograph has high incoming $\kappa$ (extremely sensitive to ground motion) but near-zero $\mathcal{P}_E$ - it records, it does not act. A hurricane has enormous $\mathcal{P}_E^{(\text{physical})}$ but zero in the representational domain. An institution has high $\mathcal{P}_E^{(\text{economic})}$ and low $\mathcal{P}_E^{(\text{physical})}$.

*Mass and sustained causal power*: An entity's capacity for sustained outgoing force depends on its internal energy reservoir $E_{\text{int}} = \mathcal{M}c_{\mathcal{D}}^2$ - the energy stored in maintaining its own persistent structure. A high-$\mathcal{M}$ entity (a dense institution, a deeply structured thinker) has a larger reservoir from which to do sustained work on others' state trajectories. Conversely, the force required to deflect a target entity depends on the target's $\mathcal{M}_j$: applying $F$ to a high-$\mathcal{M}$ target produces acceleration $a = F/\mathcal{M}_j$ (in the constant-mass limit), meaning the same outgoing force produces less state change in densely structured targets. Effective agency therefore depends not only on the agent's own coupling and consciousness but on the ratio of the agent's available force to the target's generalized mass.

The normalized, dimensionless form used in the agency formula is:

$$C_{\text{coupling}}^{(\mathcal{D})} = \frac{\mathcal{P}_E^{(\mathcal{D})}}{\max_E \mathcal{P}_E^{(\mathcal{D})}}$$

This is the outgoing coupling that [Part 4](./epimechanics_04_time_and_soul.md) formalizes as the representational footprint $\mathbf{R}(E,t)$ - the cumulative integral of $\mathcal{P}_{E \to j}$ weighted by coupling tensors $\mathbf{K}_{Ej}$.

**$C_{\text{consciousness}}^{(\mathcal{D})}$** is the entity's representational capacity as defined in Section 2, projected onto domain $\mathcal{D}$. Since consciousness is formally the tensor $\mathbf{C} \in \mathbb{R}^{n_i \times n_j \times n_k}$, the scalar $C_{\text{consciousness}}^{(\mathcal{D})}$ is a domain-weighted norm:

$$C_{\text{consciousness}}^{(\mathcal{D})} = \frac{\left\|\mathbf{W}^{(\mathcal{D})} \odot \mathbf{C}\right\|_F}{\max_E \left\|\mathbf{W}^{(\mathcal{D})} \odot \mathbf{C}\right\|_F}$$

where $\mathbf{W}^{(\mathcal{D})}$ is a domain-relevance weight tensor selecting which entries of $\mathbf{C}$ matter for domain $\mathcal{D}$, and $\odot$ denotes elementwise multiplication. $\mathbf{W}^{(\mathcal{D})}$ encodes how much each domain-specific coupling channel contributes to overall causal power; its entries are empirically determined weights that must be calibrated domain by domain. Epimechanics specifies the structure (a weighting over domains) but not the values. When all domains are weighted equally this reduces to $\|\mathbf{C}\|_F / \|\mathbf{C}\|_{F,\max}$.

Both factors are domain-relative and normalized within their domain, so $A^{(\mathcal{D})} \in [0,1]$ without requiring universal maxima. **Agency is therefore a vector over domains**, not a universal scalar. A corporation has high $A^{(\text{economic})}$ (dense allo-modeling of market actors, large outgoing causal reach in economic state space) and low $A^{(\text{physical})}$ (minimal capacity to directly alter physical states). Reporting a single "agency score" requires specifying a domain or aggregating with a domain prior.

### Why multiplicative, not additive

A hurricane has enormous causal power over state trajectories - it reshapes coastlines, redirects human populations, destroys and creates. $C_{\text{coupling}}$ for a hurricane is very large. But the hurricane has no model of $X$. It does not track the state space. It does not predict or respond to representations. $C_{\text{consciousness}} = 0$.

An additive formula $A = C_{\text{coupling}} + C_{\text{consciousness}}$ would assign the hurricane nonzero agency. That is wrong - the hurricane does not *act*, it *happens*. The product form correctly classifies blind causal force: if either factor is zero, agency is zero. A hurricane is a force of nature, not an agent. This has consequences for moral and legal reasoning downstream.

### Cross-terms and the self/other boundary

The allo/auto distinction treats self and other as clean, mutually exclusive targets of representation. This idealization breaks down in precisely the cases where consciousness is most interesting.

**Second-order and mixed representations.** When an entity models itself modeling another agent - "I believe that she believes X" - the auto-model and allo-model are no longer independent. The representation of one's own belief state is a component of the allo-model. Conversely, social meta-cognition ("she believes that I believe X") requires allo-representing an agent's representation of oneself - the target is simultaneously other and self. These are **cross-terms** in the consciousness tensor that do not reduce to either the allo or auto marginals. They correspond to mixed-index entries $C_{ijk}$ where $i$ ranges over relational targets of the form (self-as-modeled-by-other) or (other-as-modeled-by-self-modeling-other). Empirically, these are associated with medial prefrontal cortex activity in conditions requiring reasoning about one's own reputation or social standing ([Amodio & Frith 2006](https://doi.org/10.1038/nrn1931)).

**Meta-representation.** Genuine self-awareness requires more than an auto-model of one's states - it requires a model that **represents its own status as a model**. The system must represent the fact that $\mathbf{C}$ is a representation, subject to error, revision, and incompleteness. This is the meta-representational capacity: the fixed-point condition in which part of the content of $\mathbf{C}$ is a representation of $\mathbf{C}$ itself. Metzinger calls the absence of this capacity a "transparent" self-model - the entity mistakes its model for direct access to reality. [Hofstadter's strange loops (*I Am a Strange Loop*, 2007)](https://en.wikipedia.org/wiki/I_Am_a_Strange_Loop) are this structure made explicit: a representational system that, at sufficient complexity, inevitably refers to itself. In Epimechanics' terms, a strong entity (a region of high auto-causal density $\rho_{\text{ac}}$) is already a strange loop at the physical level - its causal events sustain themselves. Meta-representation is a strange loop at the *representational* level - the model models itself. The two share the same abstract structure: auto-causal loops at different levels of description. Whether this structural parallel reflects a deep identity or a useful analogy is one of Epimechanics' open questions.

Meta-representational capacity is not captured by the Frobenius norm $\|\mathbf{C}\|_F$ - a system could have high norm (broad representational coverage) while entirely lacking the ability to represent its model as a model. For moral accountability specifically, this matters: a system that mistakes its representations for direct reality cannot genuinely be said to know what it is doing in the morally relevant sense. Epimechanics handles this via a continuous meta-representation weight $\mu_{\text{meta}} \in [0,1]$. Refining the initial 2-factor formula to include meta-representation, the full agency formula becomes:

$$A^{(\mathcal{D})} = C_{\text{coupling}}^{(\mathcal{D})} \times \mu_{\text{meta}} \times C_{\text{consciousness}}^{(\mathcal{D})}$$

$\mu_{\text{meta}} = 0$ for systems with purely transparent self-models (rocks, thermostats, simple organisms); $\mu_{\text{meta}} \approx 1$ for systems with well-developed meta-representational capacity (adult humans). Whether current large language models have nonzero $\mu_{\text{meta}}$ is an open empirical question (see AI agency discussion below). The parameter is continuous rather than binary because meta-representation admits of degree - a child's developing theory of mind shows partial meta-representation, not its complete absence or presence. Whether $\mu_{\text{meta}}$ can be operationalized independently of $\mathbf{C}$ is an open research question.

**Collective entities.** For meta-entities ([Part 2](./epimechanics_02_meta_entities.md)), the self/other boundary is given by the causal grain at which the entity is individuated. A religion's auto-model - its doctrine of what kind of thing it is - is partly constituted by what practitioners believe about what other practitioners believe. The boundary between a meta-entity's "self-model" and its "allo-model of its members" depends on which causal structure is being tracked, not on neurons or individuals. The appropriate criterion is the same one that individuates the meta-entity: self-representations are those that track causes within the region of elevated $\rho_{\text{ac}}$ (the auto-causal boundary, defined by where auto-causal density drops to background), and cross-terms arise wherever the causal structure requires modeling that boundary itself.

### On moral responsibility

Responsibility tracks agency. An entity is responsible to the extent it has both causal power to influence $X$ and representational capacity to model what it is doing. A rock bears no responsibility for falling - $C_{\text{consciousness}} = 0$, therefore $A = 0$. A corporation bears partial, distributed responsibility proportional to the collective agency of its decision-making structures - the product of its causal reach and the representational capacities of its governing nodes.

Under Epimechanics, moral responsibility becomes continuous and decomposable rather than binary - a substantive philosophical commitment rather than a derivation. Epimechanics aligns with graded-responsibility accounts and diverges from threshold accounts (e.g., binary criminal culpability). if $C_{\text{consciousness}}$ is low because the entity was systematically deceived about the state of $X$, moral responsibility is diminished. If $C_{\text{coupling}}$ is low because the entity had no real causal power regardless of its representations, responsibility is similarly diminished.

### On the enactivist tension

The enactivist tradition defines minimal agency differently. [Barandiaran, Di Paolo & Rohde (2009)](https://doi.org/10.1177/1059712309343819) and Maturana & Varela (1980) define minimal agency by four conditions: individuality (a self/non-self boundary), normativity (a norm distinguishing beneficial from detrimental states), asymmetry (the agent acts on the environment differently than the environment acts on it), and spatio-temporal grounding. Bacteria satisfy all four. They are minimal agents in this tradition - they have norms (survival) and asymmetric causal relations with their environment.

Under the present formula, bacteria have $A \approx 0$ because $C_{\text{consciousness}} \approx 0$.

The reconciliation: this framework's agency is **deliberate or moral agency** - agency that is accountable, attributable, and capable of normative evaluation beyond mere self-maintenance. Minimal biological agency (Maturana & Varela's *autopoiesis*) is real - and in Epimechanics' terms, autopoiesis maps naturally onto auto-causal density - both describe self-sustaining causal loops, though autopoiesis includes additional organizational constraints (production of components, operational closure) that $\rho_{\text{ac}}$ alone does not capture. A bacterium has nonzero $\rho_{\text{ac}}$; its metabolic processes sustain themselves. It is an entity. But it has near-zero $C_{\text{consciousness}}$ - it does not model what it is doing. Agency requires both the auto-causal loop (entity-ness) *and* a representational model of that loop (consciousness). The bacterium has the first but not the second. Both are real phenomena at different levels: autopoiesis is the physical strange loop; consciousness is the representational strange loop; agency requires both.

### AI agency

The formula frames AI consciousness as an **empirical question about representational architecture**. If $C_{\text{AI}} = 0$, then $A_{\text{AI}} = 0$ regardless of how large $C_{\text{coupling}}$ becomes. A system with massive causal reach and no consciousness is a very large hurricane, not an agent.

The question of $C_{\text{AI}}$ for current large language models is not settled. There is evidence for allo-representation: an LLM builds representations of the user's beliefs, knowledge state, and likely intentions - it must, to generate contextually appropriate responses. Auto-representation is more contested: whether there is a functional self-model (representations of the system's own states, limitations, and trajectory through the conversation) or merely the appearance of one produced by training on human first-person discourse.

The tensor formalism suggests at least three candidate empirical tests for $C_{\text{AI}} > 0$, derivable from Epimechanics' own definitions:

1. **Self-model consistency across contexts**: Does the system's representation of its own capabilities, limitations, and current state remain consistent when probed in different framings, or does it confabulate context-dependently? Genuine auto-modeling entries in $\mathbf{C}$ should produce stable self-reports; surface mimicry of first-person discourse (trained on human self-descriptions) should produce inconsistency, because the underlying representation is a statistical pattern over self-descriptions rather than a genuine self-model.

2. **Behavior coupled to self-model**: Does the system behave differently in domains where it represents itself as uncertain versus confident - in ways that exceed what training data alone would predict? If $\mathbf{C}_{\text{auto}}$ entries genuinely influence behavior, uncertainty in the self-model should propagate into hedged, exploratory behavior. If the self-model is decorative, no such coupling should appear.

3. **Cross-context self-referential coherence**: Does the system maintain a coherent model of its own prior states and commitments within an interaction - tracking what it has claimed, conceded, and argued - or does it lose the thread when the topic shifts? This tests whether the $\{i=\text{self}, k=\text{past}\}$ entries in $\mathbf{C}$ are genuinely populated.

None of these tests is definitive. All are imperfect proxies for the theoretical quantity $C_{\text{AI}}$, and all could in principle be passed by systems that satisfy neither the functional nor phenomenal consciousness criteria. They are proposed as structured empirical pressure on a question Epimechanics frames precisely but cannot settle from the armchair.

This matters acutely for responsibility assignment. If $A_{\text{AI}} = 0$, moral responsibility for an AI system's effects on $X$ flows entirely to the designers, deployers, and users who interact with it. The system is a coupling mechanism - a medium through which human agency propagates - and bears no responsibility itself. If $A_{\text{AI}} > 0$, the calculus distributes. Getting this right has practical consequences: it determines how we regulate, litigate, and design these systems.

---

## Closing

Intelligence, consciousness, and agency define what an entity *knows* and what it *does*. We have:

- $I(E)$: the entity's predictive accuracy over state trajectories
- $C(E)$: the scope and accuracy of its representational model of $X$, possibly including itself
- $A(E) = C_{\text{coupling}} \times \mu_{\text{meta}} \times C_{\text{consciousness}}$: the capacity for directed, accountable causal action - multiplicative; zero in any factor yields zero agency

The next question is what an entity *is* across time - how long it maintains causal coherence, and how long it *matters* beyond its own existence. These are different questions with different answers. A human life ends in decades; a human pattern can propagate for millennia. What is the formal structure of that propagation? What is a soul?

That requires the concepts of local time, non-local time, and soul.

---

For the formal definition of computation in Epimechanics — as internal degrees of freedom that survive coarse-graining and are input-dependent — see the [Belief Fields](./belief_field.md) theory document.

[← Part 2: Meta-Entities](./epimechanics_02_meta_entities.md) | [→ Part 4: Local Time, Non-Local Time, and Soul](./epimechanics_04_time_and_soul.md)
