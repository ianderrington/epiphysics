---
title: "Epimechanics - Part 4: Local Time, Non-Local Time, and Soul"
description: >-
  An entity's local time is the duration of its causal coherence. Its non-local time is the integral
  of its representational footprint in all other entities across all time. Soul is a vector-valued function R(E,t),
  multi-dimensional, with sign requiring a value basis, and curvature d²R/dt² capturing antifragile dynamics.
date: 2026-03-11T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
contentType: article
mediaTypes:
  - text
  - image
series: "Epimechanics"
series_order: 4
coverImage:
  url: ./images/physics_as_metaphysics_04_time_and_soul-1-1.png
  alt: >-
    An entity's causal ripple spreading outward across time - local time as a bright nucleus,
    non-local time as concentric rings extending infinitely into other minds and institutions.
    Soul as a signed vector biography, multi-dimensional, with positive and negative influence
    currents. Abstract timelines, causal propagation waves. Dark background, violet and silver.
categories:
  - Philosophy
  - Physics
  - Systems thinking
tags:
  - Soul
  - Local time
  - Non-local time
  - Representation
  - Identity
  - Memetics
  - Parfit
bullets:
  - Local time T_local is the duration of causal coherence in primary substrate
  - Non-local time T_nonlocal = ∫R(E,t)dt - total representational influence across all time
  - Soul = R(E,t) is vector-valued - sign requires a value basis; different dimensions can be simultaneously positive and negative
  - Soul trajectory curvature d²R/dt² detects antifragility - immediate negative perturbations can enable greater positive long-run trajectories
  - Agency shapes the soul's growth during T_local; mimetic fitness determines propagation afterward
shareBlurbs:
  twitter: >-
    Soul = R(E,t) - the complete causal biography of an entity's representation in others across all time.
    It has sign (positive or negative), three dimensions, and a formal definition. Part 4 of Epimechanics. #Philosophy
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
---

We have mechanics, entity-criteria, and behavioral properties. We know how to identify an entity in state space $X$, how it exerts forces on other entities, how intelligence and consciousness and agency characterize its inner life. The final question about any entity is not what it does or knows, but what it *is* across time - and what it *leaves*.

These are not the same question. How long an entity maintains causal coherence is one thing. How long it matters beyond that coherence is another. A human body coheres for decades. The patterns it instantiates - beliefs carried by others, institutions it founded, texts it authored, habits it taught - can persist for centuries or millennia. A corporation may dissolve legally while its culture persists in the people it trained. A meme may outlast every individual who ever held it.

What is the formal structure of this persistence? This part defines the formal structure, ending with a precise definition of soul.

---

## Section 1: Local Time $T_{\text{local}}$

[Part 1](./epimechanics_01_generalized_mechanics.md) defined an entity as anything with a describable state - anything you can assign an $X$ to. What makes some entities more interesting than others is auto-causal density $\rho_{\text{ac}}$ - how strongly a structure's causal events sustain themselves. The generalized mass $\mathcal{M} = \int \rho_{\text{causal}} \, d\mu$ measures the total causal content (which includes but is not limited to the auto-causal events). $T_{\text{local}}$ asks: for how long does that auto-causal loop persist?

Define $\kappa_s(E,t)$ as the **temporal persistence** of entity $E$'s auto-causal density at time $t$ - the strength of causal connection between $E$'s state at $t$ and $E$'s state at $t + dt$ through its own internal dynamics. Formally, $\kappa_s$ is the temporal autocorrelation of $E$'s auto-causal density: $\kappa_s(E,\tau) = \operatorname{Corr}(\rho_{\text{ac}}(E, t'),\; \rho_{\text{ac}}(E, t'+\tau))$, evaluated in the limit of small $\tau$. This is a derived quantity from $\rho_{\text{ac}}$: it measures how well the auto-causal loop sustains itself over time. When $\kappa_s$ is high, the entity actively maintains its configuration - the strange loop is tightly closed. When $\kappa_s \to 0$, the entity's future states are no longer causally connected to its past states through its own dynamics: it has dissolved, died, or been repealed.

Local time is the duration of an entity's causal coherence - the span over which $\kappa_s(E,t)$ remains above a persistence threshold:

$$T_{\text{local}}(E) = \int_0^{\infty} \mathbf{1}[\kappa_s(E,t) > 0]\, dt$$

where $\mathbf{1}[\cdot]$ is the indicator function. When $\kappa_s$ drops to zero, the auto-causal loop has broken: $T_{\text{local}}$ has ended.

*Connection to generalized mass*: Since $\mathcal{M} = \int \rho_{\text{causal}} \, d\mu$ and $\kappa_s$ is the temporal persistence of the auto-causal component $\rho_{\text{ac}}$, they co-vary: when $\kappa_s$ falls, $\mathcal{M}$ typically falls with it ($\dot{\mathcal{M}} < 0$) as the entity loses causal density. If the entity is simultaneously moving through state space ($\dot{X} \neq 0$), the $\dot{\mathcal{M}}\dot{X}$ cross-term from the force equation produces an unraveling acceleration - the entity moves faster through state space precisely because it is losing the auto-causal structure that would resist that motion. This positive feedback between $\dot{\mathcal{M}} < 0$ and increasing $|\dot{X}|$ is the formal signature of cascading dissolution.

Three cases clarify the range of this concept:

### (a) Simple physical entities

For a rock, a star, or a biological organism, $T_{\text{local}}$ is simply the lifespan - the duration from formation to disintegration. All physical entities are dissipative structures operating far from thermodynamic equilibrium, maintained by continuous energy flows against entropic degradation. [Prigogine (*Order Out of Chaos*, 1984)](https://www.penguinrandomhouse.com/books/643445/order-out-of-chaos-by-ilya-prigogine-and-isabelle-stengers/) showed that such structures are possible precisely because they export entropy to their surroundings, but they are always finite: the energy budget ends, or the structural conditions for self-maintenance fail.

### (b) Informational entities

Laws, norms, programs, and other informational entities have $T_{\text{local}}$ equal to the duration of their *specific instantiation* - not the survival of their textual form, but the active instantiation of their pattern in a functioning substrate.

A law that is repealed ends its $T_{\text{local}}$ even if its text survives in archives, law reviews, and historical databases. The text is not the entity - the pattern-as-instantiated-in-governing-practice is the entity. Reinstantiation (re-enacting the same law) creates a new entity. This resolves the Ship of Theseus problem: the question is not whether the material substrate is continuous but whether the auto-causal loop ($\kappa_s$ continuously above threshold) persists. If auto-causal density drops to zero and then restarts, two entities exist - separated in time - rather than one entity that paused.

### (c) Meta-entities

Let meta-entity $M$ be constituted by substrates $S_1, \ldots, S_n$. Each substrate pair $(S_i, S_j)$ has a coupling strength $\kappa_{ij}(t)$ - a direct application of [Part 1](./epimechanics_01_generalized_mechanics.md)'s scalar coupling, now between substrates rather than between entity and field. Collect these into a symmetric coupling matrix $\Gamma(t) \in \mathbb{R}^{n \times n}$ where $\Gamma_{ij}(t) = \kappa_{ij}(t)$. This is the **inter-substrate coupling tensor**, measuring the mutual causal coherence of the meta-entity's components.

$$T_{\text{local}}(M) = \int_0^{\infty} \mathbf{1}[\lambda_{\min}(\Gamma(t)) > \gamma_c]\, dt$$

where $\lambda_{\min}(\Gamma(t))$ is the minimum eigenvalue of $\Gamma$ at time $t$ and $\gamma_c$ is the critical decoupling threshold - below which the meta-entity's substrates are no longer sufficiently coupled to constitute a single entity. Note that $\gamma_c$ is domain-specific and must be empirically determined for each class of meta-entity; it is not a universal constant.

Consider a religion. Its substrates include: practicing communities, texts, institutional structures (churches, mosques, temples), ritual practices, trained clergy, and the belief-states encoded in individual adherents. While practitioners exist and transmit the patterns, $\lambda_{\min}(\Gamma) > \gamma_c$ - the substrates are coupled into a functioning whole. If the practitioners vanish entirely, texts survive only in archives without active transmission, and the patterns no longer reproduce, $\Gamma$ drops below $\gamma_c$ - $T_{\text{local}}$ has ended, even though informational traces persist in libraries. The religion is dead. The texts are not the religion; they are archaeological evidence of it.

The eigenvalue formulation captures the essential insight: a meta-entity persists as long as its *weakest coupling link* remains above the decoupling threshold. The minimum eigenvalue measures the most fragile connection in the network of substrates. When that fails, the entity dissolves - even if other, stronger couplings remain.

---

## Section 2: Non-Local Time and the Representational Footprint $R(E,t)$

![Soul propagation: an entity's representational footprint R(E,t) growing during local time, then decaying with a long tail as patterns persist in students, institutions, and texts](/docs/theory/images/soul_propagation.svg)

Every entity that exists exerts effects on the state space $X$ during $T_{\text{local}}$. Some of those effects propagate *beyond* $T_{\text{local}}$ - the entity's pattern persists in other entities, shaping their trajectories, even after the original entity's causal coherence has ended.

Define the **representational footprint** of $E$ at time $t$:

$$R(E,t) = \sum_j \kappa_{Ej}(t) \cdot \delta X_j(E,t)$$

where:
- $j$ runs over all entities $\neq E$ in all substrates
- $\kappa_{Ej}(t)$ is the coupling strength between E's pattern and entity $j$ at time $t$
- $\delta X_j(E,t)$ is the counterfactual state deviation of $j$ attributable to E's pattern - the difference between $j$'s actual trajectory $X_j(t)$ and what $j$ would have been absent any influence from $E$. Formally, this is the Pearl counterfactual: $\delta X_j(E,t) = X_j(t) - X_j^{do(\text{remove } E)}(t)$, the difference between entity $j$'s actual trajectory and the trajectory it would have followed had entity $E$ not existed. Computing this requires a causal model in the sense of [Pearl (*Causality*, 2000)](https://doi.org/10.1017/CBO9780511803161)

This is the *causal* definition: $\mathbf{R}$ measures what difference E's pattern makes to $j$'s trajectory. A reference to $E$ that changes nothing about the referencing entity contributes zero to $\mathbf{R}$. A belief carried by $j$ that redirects $j$'s behavior contributes nonzero $\delta X_j$.

A note on the term "representational" footprint: $\delta X_j(E,t)$ is defined as a *causal* counterfactual - the state $j$ would have been in absent $E$'s influence. Not all causal perturbations are representational in the sense of instantiating E's pattern in $j$'s internal model. A rock dislodged by a landslide causally perturbs other rocks, but the downstream rocks carry no representation of the first rock. The term "representational" applies when the causal perturbation operates specifically through the encoding of E's pattern in j's state - when j's $\delta X$ is traceable to E's pattern being instantiated in j's model $M_j$. The central case: a student whose thinking was reshaped by a teacher carries a pattern that is representationally attributable to that teacher. The coupling tensor $\mathbf{K}_{Ej}$ captures this: it is nonzero only when E's pattern channels causally through j's representational structure, rather than through physical proximity or mechanical interaction alone. In practice, the distinction is operationalized by whether removing E's pattern from $j$'s model (counterfactually) would eliminate the causal effect - the interventional criterion from [Pearl's do-calculus (*Causality*, 2000)](https://doi.org/10.1017/CBO9780511803161).

$$T_{\text{nonlocal}}(E) = \int_0^{\infty} R(E,t)\, dt$$

This integral accumulates from birth - not from death. $R(E,t)$ grows during $T_{\text{local}}$ as E's patterns propagate into other entities. It continues after $T_{\text{local}}$ as those patterns persist in their hosts. $T_{\text{nonlocal}}$ measures the total causal biography of E's pattern in others across all time.

### Empirical grounding

Non-local time is measurable. Several independent research programs have characterized $R$ and its decay empirically.

[Michel et al. (*Science*, 2011)](https://doi.org/10.1126/science.1199644) used Google Ngrams - a corpus of ~4% of all books ever printed - to track the frequency of individual names over time. They found an approximately 73-year half-life of fame in cultural memory: the frequency of a person's name in the textual corpus decays exponentially with time after peak recognition. This is a direct empirical measurement of $R$ decaying - the coupling $\kappa_{Ej}(t)$ weakening as the pattern becomes less actively instantiated in cultural transmission chains.

[Weng et al. (*Scientific Reports*, 2012)](https://doi.org/10.1038/srep00335) characterized meme lifetime distributions on social networks. The distribution is heavy-tailed: the vast majority of memes have $R = 0$ within days of origination; a small fraction persist indefinitely. This is what Epimechanics predicts - most entities' patterns have low mimetic fitness and decay rapidly; a few have patterns with structural properties that sustain replication.

[Lorenz-Spreen et al. (*Nature Communications*, 2019)](https://doi.org/10.1038/s41467-019-09311-w) demonstrated that the attention half-life of cultural content has been shortening systematically over recent decades across multiple platforms and media. The rate at which $\kappa_{Ej}(t)$ decays has accelerated - $R$ decays faster, $T_{\text{nonlocal}}$ shrinks, for a given amplitude. This is a structural change in the medium of cultural transmission.

The academic literature has developed scalar proxies for $R$ at the individual level. [Hirsch (*PNAS*, 2005)](https://doi.org/10.1073/pnas.0507655102) introduced the h-index: a scientist has h-index $h$ if $h$ of their papers have been cited at least $h$ times. This is a compressed scalar summary of $R$ for scientific contribution - it counts sustained propagation of a scientist's patterns into others' work, weighted by reach. [Bergstrom (*College & Research Libraries*, 2007)](https://doi.org/10.5860/crln.68.5.7804) extended this to journal-level influence with the Eigenfactor metric, a PageRank-style measure that weights citations by the influence of the citing source. Eigenfactor measures network-propagated $R$ - $R$ propagating transitively through the citation network, beyond direct coupling.

### Philosophical grounding

[Parfit (*Reasons and Persons*, 1984)](https://global.oup.com/academic/product/reasons-and-persons-9780198246367) argued that what matters in survival is not personal identity (strict numerical identity of the person over time) but Relation R: psychological continuity with the right kind of cause. Parfit's Relation R is defined *within* a single person over time - the chain of memories, intentions, beliefs, and desires that constitutes the persistence of a person's psychological pattern across temporal stages of themselves. What matters in survival, Parfit concluded, is this continuity of pattern, not the continuity of any particular physical substrate.

Epimechanics extends this insight across entities. Parfit's Relation R holds when E's psychological pattern is continuous with E's later stages. The representational footprint $\mathbf{R}(E,t)$ captures an analogous relation *between distinct entities*: the degree to which E's pattern is continuous with the trajectory of entity $j$. The move from intra-personal to inter-personal pattern continuity is the key extension. Parfit himself noted that Relation R can hold to degrees and can in principle hold between distinct persons - if my psychological patterns are fully instantiated in someone else after my death, there is a real sense in which what mattered to me survives, even if *I* do not. $\mathbf{R}(E,t)$ is the formal measure of exactly that: the counterfactual deviation in $j$'s trajectory traceable to E's pattern.

Epimechanics operationalizes this: $\delta X_j(E,t)$ - the counterfactual deviation in $j$'s trajectory attributable to E's pattern - is a formal measure of E's continuation in $j$. It is a well-defined causal quantity rather than a metaphor, though computing it in practice requires the counterfactual inference methods discussed in [Part 5](./epimechanics_05_ontology_and_open_questions.md)'s open questions. A student whose trajectory was redirected by a teacher, a movement shaped by a founder's vision, a culture carrying a thinker's conceptual vocabulary: these are real causal connections, formally expressible as nonzero $\delta X_j(E,t)$. Parfit's "what matters" is, in Epimechanics, the integral $T_{\text{nonlocal}}$.

---

## Section 3: Soul - The Full Representational Propagation Function

We can now define soul.

### Formal definition

From [Part 1](./epimechanics_01_generalized_mechanics.md), the state $X_j$ of any entity lives in a multi-dimensional state space - emotional, cognitive, economic, social, and other components simultaneously. The counterfactual state change $\delta X_j(E,t) \in \mathbb{R}^{n_j}$ is therefore a vector. To map each entity $j$'s state-change contribution into a common $m$-dimensional representational output space, we use a **coupling tensor** $\mathbf{K}_{Ej}(t) \in \mathbb{R}^{m \times n_j}$, where $m$ is the dimensionality of the common output space (chosen by the analyst to capture the relevant dimensions of influence) and $n_j$ is the dimensionality of entity $j$'s state space:

$$\mathbf{R}(E,t) = \sum_j \mathbf{K}_{Ej}(t) \cdot \delta X_j(E,t) \in \mathbb{R}^m$$

Soul is the vector-valued function:

$$\text{Soul}(E) \equiv \mathbf{R}(E,t) : [0,\infty) \to \mathbb{R}^m$$

The special case $m = 1$ with each $\mathbf{K}_{Ej}$ a row vector recovers a scalar projection - useful for summary statistics but losing the dimensional structure. The non-local time integral is correspondingly vector-valued:

The integral of $\mathbf{R}$ over all time is a vector in $\mathbb{R}^m$, which we call the **total causal biography**:

$$\boldsymbol{\Sigma}_{\text{nonlocal}}(E) = \int_0^{\infty} \mathbf{R}(E,t)\, dt \in \mathbb{R}^m$$

Each component $[\boldsymbol{\Sigma}_{\text{nonlocal}}]_k$ accumulates total influence along one dimension of the output space - intellectual, emotional, institutional, and so on, tracked separately. This is the full multi-dimensional record of E's causal legacy.

For many purposes a scalar summary is useful. The **non-local duration** $T_{\text{nonlocal}}$ is defined as the temporal extent over which E's footprint remains nonzero:

$$T_{\text{nonlocal}}(E) = \mu\!\left(\{t : \|\mathbf{R}(E,t)\| > \varepsilon\}\right)$$

the Lebesgue measure of the support of $\|\mathbf{R}(E,t)\|$ above a small threshold $\varepsilon > 0$. Here $\varepsilon$ is a resolution parameter analogous to a measurement floor; results should be checked for robustness under variation of $\varepsilon$. This is a scalar duration - how long E's pattern continues to exert nonzero influence anywhere in $X$. $T_{\text{nonlocal}}$ answers the question "for how long did this entity matter?"; $\boldsymbol{\Sigma}_{\text{nonlocal}}$ answers "in which dimensions and how much?"

### Sign - and why it requires a value basis

Because $\mathbf{R}$ is vector-valued, sign is not intrinsic - it must be evaluated by projection onto a **normative reference basis** $\mathbf{v}$:

$$\text{signed scalar summary} = \mathbf{v}^\top \mathbf{R}(E,t)$$

"Positive soul" means $\mathbf{v}^\top \mathbf{R}(E,t) > 0$ for an agreed value vector $\mathbf{v}$. "Negative soul" means the same projection is negative.

**What determines $\mathbf{v}$?** This is not a minor question - the entire normative content of soul evaluation rests on it. Three positions are possible:

**(i) Community-relative $\mathbf{v}$**: Different communities choose different value bases, so the sign of a soul is perspectival. Darwin's soul is positive under $\mathbf{v}_{\text{scientific}}$ and negative under $\mathbf{v}_{\text{creationist}}$. This is descriptively accurate - communities do disagree - but it gives up on any objective moral verdict.

**(ii) Grounded $\mathbf{v}$**: The value basis is anchored to something more objective - flourishing, capability, wellbeing. Sen and Nussbaum's capabilities approach ([*Development as Freedom*, 1999](https://global.oup.com/academic/product/development-as-freedom-9780198297581); [*Creating Capabilities*, 2011](https://www.hup.harvard.edu/books/9780674072350)) proposes a set of central human capabilities as an objective floor. Under this reading, $\mathbf{v}$ is grounded in whether E's patterns expand or contract the capabilities of those who carry them. This is normatively committed and contestable.

**(iii) $\mathbf{v}$ as an open parameter**: Epimechanics provides the formal machinery - $\mathbf{R}(E,t)$, its dimensions, its norm - but does not itself determine $\mathbf{v}$. Soul-*amplitude* ($\|\mathbf{R}\|$) is objective and measurable in principle. Soul-*sign* is evaluative input, not a structural property of $\mathbf{R}$. Different evaluators apply different $\mathbf{v}$ and reach different verdicts; Epimechanics makes those differences explicit and comparable rather than hiding them in definitional choices.

Epimechanics adopts position **(iii)**: the apparatus is descriptive; the evaluation is the responsibility of the evaluator. "Positive soul" is always shorthand for "positive soul *relative to value basis* $\mathbf{v}$." Making $\mathbf{v}$ explicit is a feature that prevents the machinery from smuggling in normative conclusions under the guise of formal neutrality. Different value systems $\mathbf{v}$ can be stated, compared, and debated. A scalar soul that appears to have sign built in is merely concealing which $\mathbf{v}$ was chosen.

Different value vectors $\mathbf{v}$ can disagree - a pattern that improves predictive accuracy in scientific domains ($\mathbf{v}_{\text{epistemic}}^\top \mathbf{R} > 0$) while entrenching harmful power structures ($\mathbf{v}_{\text{welfare}}^\top \mathbf{R} < 0$) is simultaneously positive and negative under different evaluations. These do not cancel - they coexist as different components. A scalar framework that adds or averages these commits a type error: harm is not erased by benefit, it is recorded in a different dimension.

**Zero soul**: An entity can exist - have nonzero coupling during $T_{\text{local}}$ - and propagate nothing. $\mathbf{R}(E,t) = \mathbf{0}$ for $t > T_{\text{local}}$. This is a structural description. Many entities, perhaps most, have approximately zero non-local representational footprint - their causal influence does not persist detectably beyond their immediate contacts and lifetime. This is a statement about propagation reach, not about the value or depth of a life.

### Three independent dimensions - corrected

- **Amplitude**: $\sup_t \|\mathbf{R}(E,t)\|$ - the peak norm of E's causal footprint. The choice of norm matters: $\ell^2$ (Euclidean) treats dimensions as commensurate; a weighted norm $\|\mathbf{R}\|_W = \sqrt{\mathbf{R}^\top W \mathbf{R}}$ reflects differential moral weights across dimensions. This choice must be made explicit; the original scalar formulation concealed it.

- **Duration**: $\mu(\{t : \mathbf{R}(E,t) \neq \mathbf{0}\})$ - the measure of the support of $\mathbf{R}$. Different components may have different durations: intellectual influence may decay faster than institutional influence. Per-component durations $\mu(\{t : [\mathbf{R}(E,t)]_k \neq 0\})$ are more informative than the scalar aggregate.

- **Breadth**: at each time $t$, the number of distinct entities $j$ with $\|\mathbf{K}_{Ej}(t)\| > 0$ - how widely is the pattern instantiated?

$\mathbf{T}_{\text{nonlocal}}$ collapses all three into a vector integral. This is sometimes the right summary statistic, but lossy. The soul - $\mathbf{R}(E,t)$ - preserves the full structure. Two entities with identical $\|\mathbf{T}_{\text{nonlocal}}\|$ can have entirely different causal biographies - different dimensional profiles, different curvatures, different sign structures across dimensions.

- *Narrow intense legacy*: high amplitude, low breadth, potentially long duration. A mentor who changed one student's life; the student became a scientist who changed a field.
- *Diffuse legacy*: high breadth, low amplitude. Background cultural assumptions, the grammar of a language.
- *Sustained tradition*: moderate amplitude and breadth, very long duration. A philosophical school influencing intellectual culture for centuries.

### Antifragility and soul trajectory curvature

Epimechanics as stated treats sign monotonically: positive $\mathbf{R}$ contributes positively, negative $\mathbf{R}$ contributes negatively. This is an implicit linearity assumption that fails in a well-documented class of cases: negative perturbations to a host entity's state can accelerate subsequent positive development, sometimes producing outcomes better than the unperturbed baseline.

**Immediate vs. integrated $\mathbf{R}$.** Define:

$$\mathbf{R}_{\text{imm}}(E,t_0) = \mathbf{R}(E,t_0), \qquad \mathbf{R}_{\text{int}}(E,t_0) = \int_{t_0}^{\infty} \mathbf{R}(E,\tau)\, d\tau$$

These can have opposite signs along the same component. A **productive negative** is a perturbation where $[\mathbf{R}_{\text{imm}}]_k < 0$ and $[\mathbf{R}_{\text{int}}]_k > 0$: the pattern causes immediate negative state deviation but net positive long-run causal contribution.

**Logistic dynamics and the inflection-point effect.** Consider a host entity $j$ whose state on some dimension evolves as:

$$\frac{dX_j}{dt} = r X_j (1 - X_j)$$

Growth is maximized at the inflection point $X_j = 1/2$. If $j$'s unperturbed equilibrium sits at a stable attractor well below $1/2$ - a "comfort trap" - then a displacement that pushes $j$ past a separatrix can redirect the trajectory toward a higher attractor. The instantaneous perturbation $\delta X_j(E,t_0) < 0$; the integrated causal effect $\int_{t_0}^{\infty} \delta X_j d\tau > 0$. The soul's instantaneous contribution is negative; its causal biography is positive.

**Soul trajectory curvature.** The second time derivative $\ddot{\mathbf{R}}(E,t)$ captures this structure. A negative $\mathbf{R}$ with $\ddot{\mathbf{R}} > 0$ (component-wise) is in the productive-negative regime - curving toward positive, driving toward a higher attractor. A negative $\mathbf{R}$ with $\ddot{\mathbf{R}} \leq 0$ is simply destructive. The curvature distinguishes them. Post-traumatic growth ([Tedeschi & Calhoun 1996](https://doi.org/10.1002/jts.2490090305)) documents exactly this pattern: a significant fraction of trauma survivors report higher functioning across multiple domains after resolution - the initial sharply negative $\mathbf{R}_{\text{imm}}$ precedes a positive $\mathbf{R}_{\text{int}}$ that exceeds the unperturbed baseline. The curvature $\ddot{\mathbf{R}} > 0$ is the signature.

**Formal antifragility condition.** [Taleb (*Antifragile*, 2012)](https://www.penguinrandomhouse.com/books/176227/antifragile-by-nassim-nicholas-taleb/) defines antifragility as a convex response function - gaining more from positive variance than is lost from negative variance of equal magnitude. An entity $E$'s patterns have antifragile structure in host $j$ if the long-run integrated causal deviation is a convex function of perturbation magnitude:

$$\frac{d^2}{d\|\delta X_j\|^2} \left[ \int_{t_0}^{\infty} \delta X_j(E,\tau)\, d\tau \right] > 0$$

This matches [Calabrese & Baldwin's hormesis result (2003)](https://doi.org/10.1038/nrd1091): low-dose stressors produce adaptive responses that increase biological fitness above the unperturbed baseline - a nonlinear, convex dose-response relationship in the productive range.

The full extended soul accounting therefore tracks the triple:

$$\left( \mathbf{R}(E,t),\; \dot{\mathbf{R}}(E,t),\; \ddot{\mathbf{R}}(E,t) \right)$$

 - value, velocity, and curvature of the representational propagation function. The value records current causal footprint. The velocity records whether influence is growing or contracting. The curvature records whether a negative phase is a productive disruption or a continuing loss.

---

## Section 4: Soul-Agency Connection and Mimetic Fitness

Section 3 introduced two complementary decompositions of the soul $\mathbf{R}(E,t)$. The **static decomposition** - amplitude, duration, breadth - characterizes the soul's overall shape: how intense, how long-lasting, and how widely distributed. The **dynamic decomposition** - $(\mathbf{R}, \dot{\mathbf{R}}, \ddot{\mathbf{R}})$ - characterizes the soul's trajectory at each moment: current footprint, growth rate, and curvature. The two are related: amplitude is the peak of $\|\mathbf{R}\|$, duration is the support of $\|\mathbf{R}\|$, and breadth counts the entities with nonzero coupling - all summaries of the time-varying $\mathbf{R}(E,t)$. The dynamic triple tells you *where the soul is going*; the static triple tells you *what it looked like in total*. Both are needed.

The three static dimensions are not fixed - they change over time through different mechanisms.

**Breadth** grows when new entities $j$ become coupled to E's pattern: $\|\mathbf{K}_{Ej}(t)\|$ transitions from zero to nonzero. This happens through direct contact (E interacts with $j$), transmission chains (E's pattern in some host $h$ propagates to $j$ via $h$'s agency), or institutional encoding (E's pattern is written into a substrate that $j$ subsequently reads). Breadth growth is primarily driven by E's *outgoing causal power* $C_{\text{coupling}}$ and by the mimetic fitness of E's patterns.

**Amplitude** grows when E's pattern produces larger $\|\delta X_j\|$ in existing hosts - when the pattern more deeply redirects their trajectories. This is driven by E's *consciousness*: an entity that can model its own representational footprint $\mathbf{R}(E,t)$ can direct its agency toward deepening existing connections rather than spreading to new ones. Teaching with attention to the student's specific model $M_j$ produces larger $\delta X_j$ than broadcasting the same content uniformly.

**Duration** is governed primarily by *mimetic fitness* - the intrinsic properties of E's patterns that determine how long they persist in host entities once instantiated, independent of E's continued agency.

The aggregate soul-growth equation during $T_{\text{local}}$ is therefore:

$$\left.\frac{d\mathbf{R}}{dt}\right|_{\text{from }E} \propto A(E,t) \cdot \nabla_{\text{mimetic}} \mathbf{R}$$

where $\nabla_{\text{mimetic}} \mathbf{R}$ is the gradient of the soul in the space of possible mimetic strategies - the direction in which E's agency can most efficiently increase $\|\mathbf{R}\|$ given the current distribution of hosts and the fitness landscape of the patterns. High $A$ allows E to follow this gradient; low $A$ means the soul grows only passively, through mechanical pattern propagation without directed steering.

High $C_{\text{coupling}}$ means the entity's actions produce larger $\delta X_j$ in others.

Two distinct mechanisms sustain autonomous propagation after $T_{\text{local}}$:

**Passive encoding**: E's pattern is stored in stable substrates - texts, institutions, codified norms, architectural forms - that carry the pattern without actively reinstantiating it. The pattern is latent, like a seed. Its future propagation depends entirely on other agents encountering and activating it. Books outlast their authors; laws outlast their framers; mathematical results outlast their discoverers. Passive encoding is durable but fragile: the substrate must survive, and an agent must later be moved to reinstantiate the pattern. $\mathbf{R}$ is zero during the latent period; it spikes when reinstantiation occurs.

**Active re-instantiation**: Other agents with their own $A > 0$ actively carry, teach, apply, and propagate E's pattern. Here, the soul's propagation is not passive - it runs on borrowed agency. A religious tradition sustained by clergy who actively teach, interpret, and adapt is propagating through active re-instantiation. The soul's duration and breadth are now functions of the agencies of the hosts, not of E. This is why communities, schools of thought, and traditions can sustain a founder's soul for millennia: the representational footprint is continuously reinstantiated by agents who carry, teach, and adapt it - whether by choice, habit, institutional structure, or social pressure.

These two mechanisms have different stability properties. Passive encoding survives only if substrates survive and are eventually encountered. Active re-instantiation requires a continuous chain of agents willing to carry the pattern - but is more adaptive, since the agents can modify the pattern to maintain its relevance. Most long-lived souls combine both: a canonical text (passive) interpreted by a living community (active).

What determines whether $R$ persists after $T_{\text{local}}$? **Mimetic fitness** - the reliability with which E's patterns, once instantiated in hosts, replicate and maintain their $\delta X$ contribution through subsequent transmission cycles.

[Dawkins (1976)](https://global.oup.com/academic/product/the-selfish-gene-9780198788607) identified three dimensions of mimetic fitness: longevity (how long a meme persists in a single host), fecundity (how many new hosts a copy spawns), and fidelity (how accurately the pattern is reproduced in transmission). All three are necessary: high fecundity with low fidelity produces drift - the pattern dissolves into noise.

These map directly onto the soul's formal dimensions: **longevity** determines the per-component duration $\mu(\{t : [\mathbf{R}]_k \neq 0\})$ - how long E's influence persists in each host before decaying. **Fecundity** determines breadth - the count of distinct entities $j$ with $\|\mathbf{K}_{Ej}\| > 0$. **Fidelity** determines the stability of the coupling tensor $\mathbf{K}_{Ej}$ across transmission cycles: low fidelity means $\mathbf{K}_{Ej}$ drifts with each copy, eventually producing $\delta X_j$ that is no longer attributable to E's original pattern. High fidelity means the tensor remains stable through long transmission chains - E's soul persists recognizably across centuries.

*Pattern mass and mimetic fidelity*: The generalized mass $\mathcal{M}$ of the pattern itself - its causal density as a structure - is a fourth determinant of mimetic fitness not captured by Dawkins' original three dimensions. A causally dense pattern (a complex, internally consistent philosophical framework, a tightly integrated theological system) has high $\mathcal{M}$: its internal connections enforce consistency during transmission, making it resistant to mutation. A simple meme has low $\mathcal{M}$ - few internal connections, so nothing prevents drift during copying. High-$\mathcal{M}$ patterns have higher fidelity but lower fecundity: they are harder to transmit (the recipient must reconstruct the full internal structure) but more stable once transmitted. Low-$\mathcal{M}$ patterns spread easily but mutate rapidly. The most durable souls tend to combine a high-$\mathcal{M}$ core (dense doctrinal or theoretical structure that maintains fidelity) with low-$\mathcal{M}$ surface patterns (simple narratives, slogans, rituals) that serve as transmission vehicles - the surface meme carries the deep structure.

The dynamics of propagation follow well-characterized mathematical forms. [Bass (1969)](https://doi.org/10.1287/mnsc.15.5.215) modeled innovation diffusion as a differential equation with two coefficients - innovation rate (adoption independent of others) and imitation rate (adoption driven by contact with existing adopters) - producing the characteristic S-curve of cumulative adoption. The S-curve structure describes the temporal shape of $R$'s rise: slow initial growth, accelerating spread, eventual saturation and decline.

[Rogers (*Diffusion of Innovations*, 2003)](https://www.simonandschuster.com/books/Diffusion-of-Innovations-5th-Edition/Everett-M-Rogers/9780743222099) identified five characteristics determining mimetic fitness across innovation types: relative advantage (the improvement over existing alternatives), compatibility (fit with existing values and practices), complexity (difficulty of adoption), trialability (ability to experiment without full commitment), and observability (visibility of results to non-adopters). These map directly onto the conditions for $\delta X_j$ to be nonzero and sustained in host entities: a pattern that is clearly better than the alternative, fits existing cognitive infrastructure, can be adopted incrementally, and whose effects are visible will propagate further and persist longer.

---

## Section 5: Four Case Studies

### (a) A meme

$T_{\text{local}}$ is a single instantiation in a single medium - from origination to loss of active transmission, ranging from hours to years. Agency = 0: memes have no consciousness, no $C_{\text{consciousness}}$, therefore $A = 0$ by the formula from [Part 3](./epimechanics_03_intelligence_consciousness_agency.md). The meme's propagation is entirely governed by the agencies of its host entities.

$R$ is characterized by very high potential breadth (memes can reach billions), heavy-tailed duration distribution (Weng et al.'s finding: most $\to 0$ within days, a few persist indefinitely), and variable sign. Consider "survival of the fittest": positive $R$ in evolutionary biology (it captures a real structural property of selection dynamics), negative $R$ in social applications ("social Darwinism") where it naturalizes and entrenches harmful power arrangements. The same pattern propagates in both directions simultaneously. The soul of a meme is not morally unified.

### (b) A person

$T_{\text{local}}$ = biological lifespan, 70-90 years for most people in the contemporary world. $R(E,t)$ accumulates throughout $T_{\text{local}}$ through children, students, colleagues, texts, recorded works, and the behavioral patterns transmitted to others by example. For most people, $R \to 0$ within 2-3 generations - consistent with Michel et al.'s ~73-year half-life. The soul's duration is modest; it overlaps with the lifespans of those who knew the person directly.

A small number of people have $R$ functions that persist across centuries, sustained by textual and institutional infrastructure that continues to instantiate their patterns. The durability of mimetic influence typically exceeds the durability of physical artifacts: a building deteriorates, but a conceptual framework, if structurally coherent and compatible with human cognition, can persist as long as the transmission infrastructure endures.

Note the asymmetry: the soul can be far larger than the person's own $T_{\text{local}}$ suggests. The person's agency shapes the soul only during $T_{\text{local}}$. After that, the soul is in the hands of hosts and institutions.

### (c) A religion

$T_{\text{local}}$ is ongoing for active world religions - centuries or millennia by the eigenvalue criterion ($\lambda_{\min}(\Gamma) > \gamma_c$). $R$ is enormous in breadth: billions of host entities at any given time. Sign is distributed: positive $R$ in the form of community, meaning-making, prosocial norms, scaffolding for identity and life transition; negative $R$ in the form of exclusion, violence, misrepresentation of natural phenomena, exploitation of institutional power.

For a religion, $T_{\text{nonlocal}}$ is not a useful summary. The ongoing $R(E,t)$ distribution - its positive and negative components, its amplitude across different substrates, its breadth and duration in different historical periods - is the appropriate description. The soul of a religion is not a scalar. It is a function with complex positive and negative structure across billions of trajectories.

### (d) An AI system

$T_{\text{local}}$ of a specific model instantiation is technically clear: from deployment to deprecation, or from model initialization to end of operation. This is measurable.

$R$ is measurable in principle: the aggregate $\delta X$ across all entities interacting with the system - the counterfactual difference in their cognitive trajectories, decisions, and outputs attributable to having interacted with the AI. For large-scale systems, this $R$ can be enormous in breadth; its amplitude and sign are empirical questions about whether the interactions improved or degraded the trajectories of those they influenced.

The central contested question: whose agency generated this $R$? If $C_{\text{AI}} = 0$ (as argued in [Part 3](./epimechanics_03_intelligence_consciousness_agency.md)'s analysis of current LLMs), then $A_{\text{AI}} = 0$ and the soul of the AI system - however large in amplitude and breadth - is not generated by the system's directed agency. It is the agency of the designers, deployers, and users, propagated through the system as a coupling medium. The AI is an instrument with large $R$, not an agent with a soul in the full sense.

If $C_{\text{AI}} > 0$, the calculus distributes. Some portion of $R$ is attributable to the system's own representational capacities and directed influence. This requires resolving the empirical question about AI consciousness - a question Epimechanics frames precisely but does not answer.

---

## Closing

Epimechanics' formal apparatus is now assembled.

**Soul** is the full causal biography of an entity's representation in others across all time - a vector-valued function $\mathbf{R}(E,t) : [0,\infty) \to \mathbb{R}^m$ with dimensional structure, three independent structural axes, formal definition, and empirical measurability in principle. Sign requires specifying a value basis; curvature $\ddot{\mathbf{R}}$ is needed to detect antifragile structure where immediate negative effects enable greater positive long-run trajectories.

Local time is the duration of causal coherence. Non-local time is the integral of the soul. They can diverge arbitrarily. An entity can have a brief $T_{\text{local}}$ and a vast $T_{\text{nonlocal}}$. An entity can have a long $T_{\text{local}}$ and a negligible soul. The most consequential entities are often not the most enduring - but the ones whose patterns were structured, mimetically fit, and aimed at the right substrates.

Agency shapes the soul's growth during $T_{\text{local}}$. At $T_{\text{local}}$'s end, the soul propagates autonomously, carried by hosts who become its agents. The original entity recedes into the state space as a counterfactual - a persistent $\delta X$ in the trajectories of all who carried its patterns.

The final part assembles the full ontology across all six parts, maps the open questions, and positions Epimechanics against its own limitations.

---

[← Part 3: Intelligence, Consciousness, and Agency](./epimechanics_03_intelligence_consciousness_agency.md) | [→ Part 5: Full Ontology and Open Questions](./epimechanics_05_ontology_and_open_questions.md)
