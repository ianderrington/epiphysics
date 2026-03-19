---
title: "Epimechanics — Part 0.5: The Atomic Problem — What Are Entities Made Of?"
description: >-
  Epimechanics provides the grammar - state, force, energy, coupling. But what are the fundamental
  building blocks from which generalized mass, auto-causal density, maintenance cost, and robustness
  are composed? The periodic table problem for a general mechanics.
date: 2026-03-17T00:00:00.000Z
draft: true
author:
  name: "Ian Derrington"
contentType: article
mediaTypes:
  - text
series: "Epimechanics"
series_order: 0.5
categories:
  - Philosophy
  - Physics
  - Systems thinking
tags:
  - Epimechanics
  - Foundations
  - Assembly theory
  - Causal structure
coverImage:
  url: ./images/epimechanics_00_atomic_structure-1-1.png
  alt: >-
    Abstract visualization of causal bonds forming loops of varying depth and stability -
    some tightly bound in deep energy wells (diamond-like), others loosely connected in shallow
    basins (sandcastle-like). Bonds glow with different strengths. Dark background, molecular
    aesthetic crossed with network topology.
bullets:
  - Epimechanics has the grammar but not the periodic table - what are entities made of?
  - Six candidate atomic quantities - causal bond, bond strength, loop order, basin depth, entropy production rate, repair rate
  - Mass and maintenance cost are different quantities built from different combinations of the same atoms
  - Connection to assembly theory, information geometry, and the Representational Efficiency principle
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
---

## The Problem

[Epimechanics](./index.md) provides a mechanics - state, force, energy, coupling, thermodynamics - that applies to any representation of any system. [Part 1](./epimechanics_01_generalized_mechanics.md) defines the grammar. [Part 5](./epimechanics_05_ontology_and_open_questions.md) assembles the full ontology and states the Representational Efficiency principle: all representations have epimechanical structure; good ones are predictively efficient at minimal computational cost.

But the grammar has a gap. It defines $\mathcal{M} = \int \rho_{\text{causal}} \, d\mu$ without specifying what $\rho_{\text{causal}}$ is *made of*. It defines auto-causal density $\rho_{\text{ac}}$ without decomposing it into components. It treats $\mathcal{M}$ as if it were a single quantity - but as a simple example shows, it cannot be.

**The house problem.** A well-built house has high $\mathcal{M}$ - dense structural connections (foundation, framing, plumbing, electrical, insulation, all tightly integrated). It sits in a deep energy minimum. Its entropy production rate is low (a well-sealed structure degrades slowly). Its maintenance cost is near-zero for years. A poorly built house might have *lower* $\mathcal{M}$ (fewer connections, cheaper materials, less integration) but *higher* maintenance cost - because its stability basin is shallow and its entropy production rate is high. Rain gets in, joints loosen, pipes corrode.

**The implication:** $\mathcal{M}$ (total causal density) and maintenance cost are *different quantities*. They are built from different combinations of more fundamental components. Saying "maintenance cost is proportional to causal density" is like saying "weight is proportional to volume" - true for uniform density, false in general.

This is the periodic table problem. Physics had $F = ma$ for two centuries before understanding what mass is *made of*. Chemistry had reaction equations before knowing what substances are made of. Epimechanics has $F = \mathcal{M}\ddot{X} + \dot{\mathcal{M}}\dot{X}$ (scalar approximation; see [Part 1](./epimechanics_01_generalized_mechanics.md) for the general tensorial form) - and now needs to understand what $\mathcal{M}$ is made of, in a way that distinguishes diamonds from sandcastles.

---

## Candidate Atomic Quantities

The following are proposed as domain-independent primitives - the "atoms" from which $\mathcal{M}$, $\rho_{\text{ac}}$, maintenance cost, robustness, and other derived quantities are composed. Each is defined abstractly; domain-specific operationalizations follow in Section 3.

### Units and dimensional analysis

The framework commits to the following: **a causal event is an energy exchange, measured in Joules at the physical level.** This fixes the dimensional chain:

| Quantity | Definition | Units (physical level) |
|---|---|---|
| $\rho_{\text{causal}}$ | Energy density of causal events | J per unit measure ($\text{J/m}^3$ for spatial systems) |
| $\mathcal{M} = \int \rho_{\text{causal}} \, d\mu$ | Total causal content (integral of $\rho_{\text{causal}}$ over entity's region). Related to internal energy via $E_{\text{int}} = \mathcal{M} \cdot c_D^2$. In natural units ($c_D = 1$), $\mathcal{M}$ and $E_{\text{int}}$ coincide numerically but they measure different things: $\mathcal{M}$ measures causal structure, $E_{\text{int}}$ measures the energy maintaining it. | J |
| Mass-equivalent | $\mathcal{M} / c_D^2$ | kg |
| $E_{\text{int}} = \mathcal{M} \, c_D^2$ | Internal energy (tautology at physical level) | J |

This is dimensionally consistent with Chaisson's energy rate density: $\dot{\varepsilon}_m = \text{power} / \text{mass} = (\text{d}\mathcal{M}/\text{d}t) / (\mathcal{M}/c_D^2) = \text{W/kg}$, which is exactly his measured quantity.

**For abstract state spaces**, the measure $d\mu$ has domain-specific units (e.g., per-agent, per-belief, per-organizational-unit), and "energy" must be operationalized domain by domain. Bond strength $\sigma_b$ at the institutional level might be measured in dollars-to-sever, hours-of-disruption, or bits-of-information-lost — all legitimate energy-equivalents within their domain.

**The conversion factor is not a constant — it is a state-dependent coupling.** A dollar converts to different amounts of directed state change (effective energy) depending on local context: prices, labor costs, institutional efficiency, crisis vs stability. The exchange rate between domain units and fundamental energy is itself a field — it varies across state space, determined by the local coupling tensor $T^i{}_j$ between the financial domain and the physical-action domain. This parallels physics: the electromagnetic coupling constant $\alpha$ runs with energy scale (vacuum polarization changes its effective value at different energies). The "strength" of a dollar is a running coupling constant, not a fixed conversion factor. The framework predicts this: the effective energy of any domain-specific unit is $\sigma_{\text{effective}} = T^i{}_j(X) \cdot \sigma_{\text{domain}}$ — bond strength in domain $j$ mapped through the local coupling tensor to effective causal capacity in domain $i$.

The hierarchical tensor summation of bond strengths (each in domain-appropriate units, each weighted by the local coupling tensor) composes to give $\mathcal{M}$ at each level.

**This is the framework's measurement frontier.** At the physical level, units are clean: Joules, meters, seconds. At biological levels, they are operationalizable (ATP hydrolysis, metabolic watts). At institutional and cognitive levels, the "energy" of a causal bond depends on context through the coupling tensor — it is measurable but not universal. The framework provides the grammar ($\mathcal{M} = \sum T^i{}_j \cdot \sigma_b$); the domain provides the units and the coupling tensor must be empirically determined. Dimensional cleanliness degrades as abstraction increases, and this is honest: the difficulty is real, not hidden.

### 1. Causal Bond ($b$)

A single directed causal connection between two state variables: a change in $X_i$ produces a change in $X_j$. This is the atomic unit of causal structure (dimensionless — it is a structural element, not a measured quantity). In [Pearl's framework](https://doi.org/10.1017/CBO9780511803161), it corresponds to a single edge in a causal DAG.

A causal bond has:
- **Direction**: $i \to j$ (asymmetric in general)
- **Strength** $\sigma_b$: how much change in $X_j$ is produced per unit change in $X_i$
- **Latency** $\tau_b$: the time delay between cause and effect
- **Reliability** $r_b \in [0,1]$: the probability that the causal connection fires when activated

### 2. Bond Strength ($\sigma_b$)

The energy required to sever a single causal bond (Joules at the physical level; domain-specific energy-equivalent at higher levels — e.g., dollars, disruption-hours, bits lost). Analogous to bond dissociation energy in chemistry.

Strong bonds are hard to break: a covalent bond between carbon atoms, a deeply ingrained habit, a legal contract. Weak bonds break easily: a van der Waals interaction, a casual acquaintance, a verbal agreement.

### 3. Loop Order ($\ell$)

The length of the shortest self-referential causal cycle passing through a given point (dimensionless integer). A loop of order 1 is direct self-causation ($X_i \to X_i$). A loop of order 2 is $X_i \to X_j \to X_i$. A loop of order $\ell$ passes through $\ell$ intermediate states before returning.

Loop order determines the *character* of auto-causal structure:
- $\ell = 1$: direct self-reinforcement (a thermostat, a habit loop)
- $\ell = 2$: mutual reinforcement (symbiosis, reciprocal trust)
- $\ell \gg 1$: long-range auto-causality (an institution whose budget funds the department that generates the revenue that justifies the budget - many intermediaries)

Shorter loops respond faster to perturbation (the feedback signal returns sooner). Longer loops are slower but can be more robust - disrupting one link doesn't immediately break the cycle if alternative paths exist.

### Auto-causality is emergent - the zero-value step problem

An important point about loop order: **individual bonds in a causal loop may have zero auto-causal density on their own, while the loop as a whole has nonzero $\rho_{\text{ac}}$.** Consider an autocatalytic cycle: enzyme A catalyzes production of substrate B; B is consumed by enzyme C; C produces a cofactor required by A. No individual step sustains itself - A alone does nothing without C's cofactor, B alone is just a substrate, C alone lacks its input. Each bond has $\rho_{\text{ac}} = 0$. But the cycle A → B → C → A has $\rho_{\text{ac}} > 0$ - it collectively sustains its own continuation.

This is exactly [Kauffman's autocatalytic set](https://doi.org/10.1093/oso/9780195079517.001.0001): no single reaction catalyzes itself, but the set collectively catalyzes its own production. The same structure appears everywhere:

- **Metabolic cycles**: the citric acid cycle's individual reactions are not self-sustaining; the cycle is
- **Institutional feedback**: the budget funds the department that generates the revenue that justifies the budget - no single step is auto-causal; the loop is
- **Social reciprocity**: A trusts B, B cooperates with C, C supports A - no individual trust relationship sustains itself; the triangle does
- **Neural assemblies**: individual neurons don't fire themselves; recurrent circuits do

**Implication for the atomic framework:** $\rho_{\text{ac}}$ is NOT a bond-level property. It is a **loop-level emergent property** - the first level at which auto-causality appears. Bonds are the atoms; loops are the "molecules." You cannot measure $\rho_{\text{ac}}$ by examining individual bonds any more than you can measure wetness by examining individual water molecules.

This connects directly to [Hoel et al.'s causal emergence](https://doi.org/10.1073/pnas.1314922110): the loop-level description has more causal information than the bond-level description ($EI(\text{macro}) > EI(\text{micro})$). The loop IS the entity at its most fundamental level - the smallest unit of self-sustaining causal structure.

The six atomic quantities should therefore be understood at two levels:
- **Bond level**: causal bond $b$, bond strength $\sigma_b$, latency $\tau_b$, reliability $r_b$ - these are properties of individual causal connections
- **Loop level**: loop order $\ell$, $\rho_{\text{ac}}$, basin depth $\Delta V$, entropy production $\dot{S}_{\text{int}}$, repair rate $\dot{R}_{\text{repair}}$ - these are emergent properties of configurations of bonds

Bonds are to loops as atoms are to molecules. The interesting chemistry happens at the molecular level.

### 4. Stability Basin Depth ($\Delta V$)

The energy barrier between the entity's current configuration and the nearest dissolution pathway (Joules at the physical level; domain-specific energy-equivalent at higher levels). Formally: the height of the lowest saddle point on the potential energy surface surrounding the entity's equilibrium position.

$$\Delta V = V_{\text{saddle}} - V_{\text{equilibrium}}$$

Deep basins mean the entity can absorb large perturbations without leaving its configuration. Shallow basins mean small perturbations can push it over the edge.

- **Diamond**: $\Delta V$ is enormous (requires ~7 eV per bond to disrupt the lattice)
- **Well-built house**: $\Delta V$ is large (engineered to withstand storms, earthquakes within design spec)
- **Sandcastle**: $\Delta V$ is tiny (a wave, a footstep, gravity alone over hours)
- **A new startup's culture**: $\Delta V$ is shallow (one bad hire, one crisis can reshape it entirely)
- **A centuries-old institution**: $\Delta V$ is deep (survives wars, scandals, leadership changes)

### 5. Entropy Production Rate ($\dot{S}_{\text{int}}$)

The rate at which the entity's internal structure generates disorder that must be managed (W/K at the physical level; domain-specific entropy-rate at higher levels). Every causal bond produces some entropy - some fraction of the causal activity degrades the structure rather than maintaining it.

$$\dot{S}_{\text{int}} = \sum_{\text{bonds}} \dot{s}_b$$

where $\dot{s}_b$ is the entropy production per bond per unit time. This depends on:
- The bond's operating conditions (a pipe in freezing weather produces more entropy than one in a climate-controlled building)
- The bond's age and degradation state
- Environmental coupling (how strongly external perturbations drive the bond away from its equilibrium)

$\dot{S}_{\text{int}}$ is what makes entities mortal. Even the most robust structure produces *some* entropy. If this is not exported or repaired, it accumulates until the structure fails. [Prigogine](https://doi.org/10.1126/science.201.4358.777) showed that living systems persist by exporting entropy to their environment faster than they produce it internally. When export fails, the entity dissolves.

### 6. Repair Rate ($\dot{R}_{\text{repair}}$)

The rate at which the auto-causal structure restores broken or degraded bonds (bonds restored per unit time; dimensionally must match $\dot{S}_{\text{int}}$ for $C_{\text{maint}}$ to be well-defined). This is the operational definition of "self-sustaining" - the entity does degrade, but it fixes itself faster than it breaks.

$$\dot{R}_{\text{repair}} = \text{bonds restored per unit time}$$

The net maintenance cost is:

$$C_{\text{maintenance}} = \dot{S}_{\text{int}} - \dot{R}_{\text{repair}}$$

- When $\dot{R}_{\text{repair}} > \dot{S}_{\text{int}}$: the entity is *self-maintaining*. No external maintenance needed. (A living organism in favorable conditions.)
- When $\dot{R}_{\text{repair}} \approx \dot{S}_{\text{int}}$: marginal. The entity persists but is fragile. (A machine that requires regular servicing.)
- When $\dot{R}_{\text{repair}} < \dot{S}_{\text{int}}$: the entity decays. External maintenance is required to persist. (A building, a road, a garden.)
- When $\dot{R}_{\text{repair}} = 0$: no self-repair. All maintenance is external. (A rock - but rocks have very low $\dot{S}_{\text{int}}$ too, so they persist.)

---

## Building Higher Quantities from Atoms

The six atomic quantities combine to produce the framework's higher-level concepts:

| Derived Quantity | Atomic Composition | What It Means |
|---|---|---|
| **Generalized mass** $\mathcal{M}$ | $\sum_{\text{bonds}} \sigma_b$ | Total causal content — sum of bond strengths; determines resistance to state change |
| **Auto-causal density** $\rho_{\text{ac}}$ | **Emergent** - density of *closed loops*, not individual bonds; individual steps may have $\rho_{\text{ac}} = 0$ while the loop has $\rho_{\text{ac}} > 0$ | Self-sustaining fraction of causal structure (a loop-level property) |
| **Maintenance cost** $C_{\text{maint}}$ | $\dot{S}_{\text{int}} - \dot{R}_{\text{repair}}$ | Net entropy accumulation rate - NOT proportional to $\mathcal{M}$ |
| **Robustness** | $\Delta V / \langle \text{perturbation} \rangle$ | Basin depth relative to typical environmental shocks |
| **Assembly index** (AI) | Minimum sequence of bond-formation operations from primitives | Construction complexity - a lower bound on $\mathcal{M}$ |
| **Durability** | $\Delta V \times \dot{R}_{\text{repair}} / \dot{S}_{\text{int}}$ | How long the entity persists without external intervention |
| **Fragility** | $(\partial \mathcal{M} / \partial \text{perturbation})$ near $\Delta V$ boundary | How sharply mass drops when basin boundary is approached |
| **Antifragility** | $\partial \Delta V / \partial \text{stress} > 0$ | Basin depth *increases* under perturbation (the entity gets stronger from stress) |

**Note:** $\mathcal{M} = \sum \sigma_b$ is the isotropic (scalar) approximation. When bond strengths vary by direction, $\mathcal{M}$ becomes a tensor $\mathcal{M}_{ij}$ whose eigenvalues give directional resistance. The bond network's anisotropy determines the mass tensor's structure (see Part 1, Section 2b).

### Why $\mathcal{M}$ and maintenance cost diverge

The house example is now resolved:

| Entity | $\mathcal{M}$ (bond sum) | $\Delta V$ (basin depth) | $\dot{S}_{\text{int}}$ | $\dot{R}_{\text{repair}}$ | $C_{\text{maint}}$ |
|---|---|---|---|---|---|
| Well-built house | High | Deep | Low | 0 (no self-repair) | Low (low $\dot{S}$, needs occasional external repair) |
| Cheap house | Medium | Shallow | High | 0 | High (high $\dot{S}$, constant external repair) |
| Diamond | Very high | Very deep | Near-zero | 0 | Near-zero |
| Sandcastle | Low | Very shallow | Medium | 0 | Very high (dissolves without constant rebuilding) |
| Living organism | Very high | Moderate | High | High (self-repair) | Low while alive ($\dot{R} > \dot{S}$); infinite when dead ($\dot{R} = 0$) |
| Startup | Low | Shallow | High | Moderate (adaptive) | Moderate (but fragile) |
| Ancient institution | High | Deep | Moderate | Moderate (self-maintaining processes) | Low (deep basin + self-repair) |

The table shows that $\mathcal{M}$ and $C_{\text{maint}}$ are *independent*. They share some atomic components (both depend on bond structure) but combine them differently. $\mathcal{M}$ is about *total bond strength*. $C_{\text{maint}}$ is about *net entropy accumulation*. A system can be massive and cheap to maintain (diamond) or light and expensive to maintain (sandcastle).

---

## Connection to Assembly Theory

[Assembly theory (Cronin & Walker, 2023)](https://doi.org/10.1038/s41586-023-06600-9) measures one of these atoms: the minimum number of bond-formation operations to construct an object. The assembly index AI is a static, constructive measure - it counts how many steps to *build* the structure.

The atomic framework here extends assembly theory in two directions:

1. **From construction to maintenance.** AI tells you how hard the entity was to build. $C_{\text{maint}} = \dot{S}_{\text{int}} - \dot{R}_{\text{repair}}$ tells you how hard it is to *keep*. These are different: a complex molecule (high AI) in a stable configuration (deep $\Delta V$) is hard to build and easy to keep. A complex molecule in an unstable configuration (shallow $\Delta V$) is hard to build and hard to keep.

2. **From counting to dynamics.** AI counts construction steps. The atomic framework adds *dynamics*: how do the bonds evolve over time? Which degrade? How fast? What repair mechanisms exist? This is the difference between a blueprint (AI) and a maintenance manual ($\dot{S}_{\text{int}}$, $\dot{R}_{\text{repair}}$, $\Delta V$).

The prediction: **AI and durability should be correlated but not identical.** High-AI entities tend to have deeper stability basins (complex structures tend to have more pathways to self-stabilize) - but the correlation is imperfect. Fragile complexity exists (a complex but poorly designed bridge). Durable simplicity exists (a stone wall).

---

## Bare Mass and Effective Mass

An entity's resistance to state change is not purely internal. It depends on the medium the entity moves through.

**Bare mass** $\mathcal{M}_{\text{bare}}$ is the entity's internal causal activity in isolation — its own bonds, loops, and self-maintaining structure. **Effective mass** $\mathcal{M}_{\text{eff}}$ is what you actually measure: the total resistance to state change in context, including the medium's response to the entity's motion.

$$\mathcal{M}_{\text{eff}} = \mathcal{M}_{\text{bare}} + \mathcal{M}_{\text{coupling}}(X, \dot{X})$$

where $\mathcal{M}_{\text{coupling}}$ depends on position (where in state space) and velocity (how fast and in what direction the entity moves). The coupling contribution is not a constant — it is a field property of the medium.

**Physics grounding (not analogy).** An electron has bare mass 0.511 MeV. In a silicon crystal, its effective mass is 0.26$m_e$ along one axis and 1.08$m_e$ along another. The crystal's band structure — the periodic potential landscape — reshapes the electron's inertia directionally. Effective mass is tensorial, and the medium determines its anisotropy. This is standard condensed matter physics.

**Caveat on additivity.** In condensed matter, effective mass arises from the curvature of $E(\mathbf{k})$: $m^*_{ij} = \hbar^2 (\partial^2 E / \partial k_i \partial k_j)^{-1}$. It is not computed by adding bare mass plus a coupling term — it emerges from the electron-lattice system as a whole. The additive decomposition $\mathcal{M}_{\text{eff}} = \mathcal{M}_{\text{bare}} + \mathcal{M}_{\text{coupling}}$ is therefore a *linearized approximation*: valid when the entity-medium coupling is weak enough that bare and coupling contributions are separable, but potentially misleading for strongly coupled systems where the entity's identity is constituted by its medium. The honest statement is: effective mass is the operationally measured quantity; bare mass is a counterfactual (how the entity would respond in isolation); the decomposition is useful when the counterfactual is meaningful.

**Generalization to non-physical systems.** A CEO pivoting their company drags the entire organizational structure — high $\mathcal{M}_{\text{eff}}$ from institutional coupling. A new hire pivots freely — low $\mathcal{M}_{\text{coupling}}$. The same idea encounters different effective mass in receptive versus hostile cultures: a proposal aligned with institutional momentum has *reduced* $\mathcal{M}_{\text{eff}}$ (the medium assists motion), while one opposing it has increased $\mathcal{M}_{\text{eff}}$.

**Caveat on "bare mass in isolation."** For a CEO, "bare mass" requires imagining them outside their institution — but a CEO *is* constituted partly by the institution. The counterfactual may not be cleanly separable. This is less problematic for entities with clear medium boundaries (electron in crystal, company in regulatory environment) and more problematic for entities defined by their medium (person-in-culture, idea-in-language). The framework is most honest when it acknowledges: bare mass is well-defined when the entity-medium boundary is sharp; it becomes a useful approximation, not a fundamental decomposition, when that boundary is diffuse.

**The medium can assist, resist, or block — and it can do different things in different directions.**

| Condition | $\mathcal{M}_{\text{eff}}$ vs $\mathcal{M}_{\text{bare}}$ | What's happening | Example |
|---|---|---|---|
| No medium | $\mathcal{M}_{\text{eff}} = \mathcal{M}_{\text{bare}}$ | Entity in isolation | Free electron in vacuum |
| Assisting medium | $\mathcal{M}_{\text{eff}} < \mathcal{M}_{\text{bare}}$ | Medium pushes with you | Restructuring during an industry-wide shift; idea matching the zeitgeist; electron in light-mass band |
| Neutral medium | $\mathcal{M}_{\text{eff}} \approx \mathcal{M}_{\text{bare}}$ | Medium doesn't couple significantly | Employee in a large org making changes nobody notices |
| Resisting medium | $\mathcal{M}_{\text{eff}} > \mathcal{M}_{\text{bare}}$ | Medium pushes against you | Reform against institutional culture; idea in a hostile community |
| Constraining medium | $\mathcal{M}_{\text{eff}} \gg \mathcal{M}_{\text{bare}}$ | Medium blocks motion entirely | Person in prison; company under injunction; censored speech; electron in insulator band gap |

The constraining case is especially important: it's not just high $\mathcal{M}_{\text{eff}}$ — it's $\mathcal{M}_{\text{eff}}$ that is **directionally infinite along certain axes while finite along others**. A person in prison has effectively infinite mass in physical state space (can't move) but finite mass in cognitive state space (can still think, write, plan). The prison is a highly anisotropic coupling to the medium — it blocks some dimensions of motion while leaving others open. This is exactly what the mass tensor captures: the eigenvalues of $\mathcal{M}_{ij}$ can range from near-zero (free motion along assisted directions) to effectively infinite (completely blocked directions), all for the same entity in the same medium.

**Connection to the mass tensor.** The mass tensor $\mathcal{M}_{ij}$ defined in [Part 1](./epimechanics_01_generalized_mechanics.md) is the effective mass tensor — it includes both internal structure and medium coupling. Part 1 attributes anisotropy to "within-entity" structure (a belief system resists identity change more than aesthetic change). This is incomplete: anisotropy comes from *both* internal structure *and* the medium. The belief system's resistance to identity change is high partly because the social medium (reputation, relationships, institutional roles) couples strongly along that axis. The mass tensor's eigenvalues reflect entity-plus-medium, not entity alone. This is why the same entity has different $\mathcal{M}_{ij}$ in different contexts: bare mass is approximately constant; the medium changes.

| Symbol | Name | What it measures |
|---|---|---|
| $\mathcal{M}_{\text{bare}}$ | Bare mass | Internal causal activity in isolation (counterfactual) |
| $\mathcal{M}_{\text{coupling}}$ | Coupling mass | Medium's contribution to effective inertia (position- and velocity-dependent) |
| $\mathcal{M}_{\text{eff}} = \mathcal{M}_{\text{bare}} + \mathcal{M}_{\text{coupling}}$ | Effective mass | Total resistance to state change in context — the operationally measured quantity |
| $\mathcal{M}_{ij}$ | Mass tensor | Effective mass decomposed by direction; eigenvalues = resistance along principal axes of entity-plus-medium system |

---

## The Persistence Reversal

At the bottom of the entity hierarchy, constituents outlive composites. At the top, composites outlive constituents. This reversal is not a curiosity — it marks the boundary between passive and active stability, and it is the structural signature of the [life transition](./01c_thermodynamic_emergence_of_life.md).

### The pattern

In passive systems, disassembly reveals durable parts:

- **Protons outlive atoms.** Ionize an atom; the proton is fine.
- **Atoms outlive molecules.** Break a bond; the atoms survive.
- **Molecules outlive cells.** Lyse a cell; most molecules persist.

Somewhere a crossover occurs. In actively maintained systems, the composite outlives its parts:

- **Cells outlive their molecules.** Metabolism replaces substrate continuously; the cellular pattern persists while individual molecules are degraded and replaced.
- **Organisms outlive their cells.** Most cells are replaced every 7-10 years; *you* persist.
- **Institutions outlive their people.** Employees leave, retire, die; the institution persists — sometimes for centuries.

### What causes the reversal

In the atomic framework's terms, the crossover happens where $\dot{R}_{\text{repair}} > 0$ — where entities actively replace degraded components rather than relying on passive stability alone.

Below the crossover: **passive stability**. Persistence comes from deep basins ($\Delta V \gg$ perturbation) and strong bonds ($\sigma_b$ high). No information directs repair because no repair occurs. Constituents are more stable than composites because composites depend on bonds between constituents, and bonds are weaker than the constituents they connect.

Above the crossover: **active stability**. Persistence comes from repair rate exceeding entropy production ($\dot{R}_{\text{repair}} > \dot{S}_{\text{int}}$). The composite outlives its constituents because the composite's auto-causal loops ($\rho_{\text{ac}} > 0$) direct the replacement of degraded parts. This IS the life transition defined in [Part 1c](./01c_thermodynamic_emergence_of_life.md): the point where auto-causal maintenance crosses the threshold from zero to positive.

### Survivorship bias is the mechanism, not a flaw

Most composites are ephemeral. Most molecules break. Most organizations dissolve. Most religions are forgotten. We observe the survivors because only survivors exist to be observed. This is not purposive selection — it is a structural filter. Things that persist, persist. Things that don't, don't.

The atomic framework predicts *what* makes some survive: binding fraction $f_{\text{binding}}$ (how much of the entity's $\mathcal{M}$ is in the pattern vs. in the parts), repair coverage (does $\dot{R}_{\text{repair}}$ cover all constituent types?), basin depth $\Delta V$, and informational encoding quality. Existence is the filter that selects for persistence mechanisms — not as a value statement but as a structural fact.

### The information requirement

The reversal requires **information** — a pattern that directs the replacement of degraded components with functional ones.

A crystal is robust (deep $\Delta V$) but does not outlive its atoms because it has no informational repair mechanism. An organism outlives its molecules because DNA encodes the pattern and metabolism executes replacement. The crystal's persistence is passive (deep basin); the organism's persistence is active (information-directed repair).

| Mechanism | What persists | Example | Requires information? |
|---|---|---|---|
| Deep passive basin | Structure itself | Diamond, proton, planet | No |
| Active chemical repair | Chemical pattern | Flame, autocatalytic cycle | Minimal |
| Active informational repair | Information directing repair | Cell (DNA $\to$ protein $\to$ maintenance) | Yes |
| Active memetic repair | Cultural pattern directing human replacement | Institution, religion, language | Yes — culture, documentation, ritual |
| Active technological repair | Automated pattern directing component replacement | Self-healing software, autonomous maintenance systems | Yes — encoded in code |

Each level up requires more sophisticated information encoding — and is more fragile to information corruption. A proton cannot have its "instructions" corrupted. An institution can — and that is precisely what propaganda, disinformation, and [representational manipulation](../research/representational_manipulation.md) do: they corrupt the informational substrate that directs repair, causing the entity to replace functional components with dysfunctional ones, or to stop replacing them at all.

### Multi-substrate constituents

[Meta-entities](./02_meta_entities.md) at institutional scale are not composed of a single constituent type. An institution comprises people + technology + physical infrastructure + legal frameworks + cultural patterns + financial reserves. Each constituent type has a different persistence timescale and replacement mechanism:

| Constituent type | Typical lifespan | Replacement mechanism |
|---|---|---|
| Individual knowledge | Days-years | Training, documentation |
| People (in role) | Years | Hiring, onboarding |
| Technology systems | Years-decades | Upgrades, migration |
| Physical infrastructure | Decades-centuries | Maintenance, renovation |
| Legal structures | Decades-centuries | Amendment, reinterpretation |
| Cultural patterns | Generations | Socialization, ritual |

The institution's effective $\dot{R}_{\text{repair}}$ must cover ALL constituent types. The weakest link — the constituent type with the lowest $\dot{R}_{\text{repair}} / \dot{S}_{\text{int}}$ ratio — determines the institution's vulnerability. A company with excellent technology migration but no knowledge management will fail when key people leave. A church with strong ritual but crumbling buildings will lose its congregation. The persistence bottleneck is always the least-repaired substrate.

> **Testable prediction (P-Persist-1).** An institution's failure mode is predictable from its repair-rate profile: measure $\dot{R}/\dot{S}$ for each constituent type; the type with the lowest ratio is where the institution will fail first. This is auditable before failure occurs.

### Connection to binding fraction

Define the **binding fraction** $f_{\text{binding}}$ as the ratio of $\mathcal{M}$ attributable to the pattern (the relational structure, the loop topology) versus the parts (the individual constituents). A composite outlives its constituents when:

- $f_{\text{binding}}$ is high — the pattern dominates the parts in determining the entity's identity
- $\dot{R}_{\text{repair}}$ covers all constituent types — no unrepaired bottleneck exists
- $\Delta V$ exceeds the perturbation environment — the entity can absorb shocks without leaving its basin
- Auto-causal loops reproduce the *information* needed to replace components, not just the components themselves — the repair mechanism is self-sustaining

When all four conditions hold, the composite is more persistent than any of its constituents. The entity becomes, in a precise sense, more real than its parts — not metaphysically, but operationally: it has greater durability, greater robustness, and greater causal influence on its environment.

> **Testable prediction (P-Persist-2).** The transition from 'fragile collection' to 'robust entity' should exhibit a critical threshold $f_{\text{binding}}^*$ — analogous to a percolation threshold. Below: removing a key constituent cascades into dissolution. Above: removing any single constituent is absorbed. This threshold should be predictable from the entity's loop topology and testable by progressive constituent removal.

### Adversarial caveat

This analysis is structural and qualitative. $f_{\text{binding}}$ and $\dot{R}_{\text{repair}}$ have not been measured for any institution. The predictions — weakest-link vulnerability, information corruption as primary attack vector, binding fraction as a determinant of persistence reversal — are testable but untested. The framework provides a research program: measure these quantities across domains, test whether the persistence reversal occurs where the framework predicts ($\dot{R}_{\text{repair}} > \dot{S}_{\text{int}}$), and determine whether the weakest-link prediction holds empirically. Until such measurements exist, this section is a structured hypothesis, not a result.

---

## Connection to the Representational Efficiency Principle

[Part 5](./epimechanics_05_ontology_and_open_questions.md) states that the optimal representation $X^*$ minimizes predictive cost. The atomic framework says *what makes one representation cheaper than another*: a representation is predictively efficient when it decomposes the system into bonds, loops, and basins whose dynamics are *separable* - predictable independently, then composed.

The Representational Efficiency principle's conjecture - that optimal representations have maximal Lagrangian symmetry, sparse coupling tensor, and minimal dimensionality - now has a micro-level explanation:

- **Symmetry** ↔ bonds with identical strength and dynamics (when bonds are uniform, symmetries emerge and reduce the prediction problem)
- **Sparse coupling** ↔ loops that don't share bonds (independent subsystems)
- **Low dimensionality** ↔ few distinct bond types (the system's behavior is determined by a small number of bond classes, not by each individual bond)

The "right" representation is the one whose state variables correspond to natural clusters of bonds - the mesoscale structures that have their own dynamics. This is exactly what coarse-graining does in physics: identify the collective degrees of freedom (phonons, quasiparticles) that capture the system's behavior more efficiently than tracking individual atoms.

---

## Domain Examples

### Physical domain
- **Bond**: intermolecular force (covalent, ionic, van der Waals, hydrogen)
- **Bond strength**: bond dissociation energy (measured in eV or kJ/mol)
- **Loop order**: crystal lattice periodicity, molecular ring structures
- **Basin depth**: activation energy for decomposition
- **$\dot{S}_{\text{int}}$**: thermal entropy production (second law)
- **$\dot{R}_{\text{repair}}$**: zero for non-living matter; metabolic repair for living matter

### Institutional domain
- **Bond**: a regular causal interaction between organizational units (a meeting, a reporting line, a contractual obligation, a communication channel)
- **Bond strength**: how much disruption is required to sever the interaction (firing someone, canceling a contract, reorganizing a department)
- **Loop order**: length of feedback cycles (daily standup = short loop; annual review = long loop; budget-revenue cycle = medium loop)
- **Basin depth**: how much institutional stress the organization can absorb before restructuring (well-funded institution with deep reserves vs. thinly capitalized startup)
- **$\dot{S}_{\text{int}}$**: rate of process degradation, knowledge loss, alignment drift
- **$\dot{R}_{\text{repair}}$**: rate of process improvement, training, cultural reinforcement, institutional memory maintenance

### Cognitive domain
- **Bond**: a causal connection between cognitive states (a belief supporting another belief, a memory triggering an emotion, a habit linking a cue to a behavior)
- **Bond strength**: how much evidence/effort to break the connection (deeply conditioned associations are strong; casual opinions are weak)
- **Loop order**: length of self-reinforcing cognitive cycles (rumination = short loop; identity-belief-behavior-social reinforcement = long loop)
- **Basin depth**: how much contradictory evidence a belief system can absorb before restructuring (deep conviction vs. tentative hypothesis)
- **$\dot{S}_{\text{int}}$**: rate of forgetting, confusion, belief drift
- **$\dot{R}_{\text{repair}}$**: rate of rehearsal, reinforcement, active recall, social validation

---

## Cross-Level Tracing: From Fundamental Physics to Emergent Entities

### Status: a research program, not a result

Epimechanics proposes that the atomic decomposition (bonds, loops, basins, $\dot{S}_{\text{int}}$, $\dot{R}_{\text{repair}}$) applies at every scale — from quarks to institutions. This is a conjecture with one confirmed case, a partial proof, and zero demonstrations at higher levels:

- **Physics → Chemistry**: established by quantum chemistry, not by Epimechanics' specific procedure. The derivation works because the microscopic Hamiltonian, state space, and coarse-graining kernel are all known.
- **The structural template**: the theorem that coarse-graining a Lagrangian system produces effective dynamics with potential, coupling, and thermodynamic structure (a structural descendant of the micro-grammar). This is a partial result — it shows structural inheritance, not computational tractability.
- **Chemistry → Institutions**: zero principled derivations exist at any intermediate step.

The framework is therefore a methodology for attempting cross-level derivation, together with a specific hypothesis about what to measure. It is not an established multi-scale theory.

### What the Lagrangian is and is not across scales

The Lagrangian is the **fundamental** grammar. At the microscopic level, dynamics are Hamiltonian: conservative, time-reversible, and subject to Noether's theorem (every continuous symmetry yields a conserved quantity).

At coarse-grained levels, integrating out fast degrees of freedom produces an **effective** grammar that is a structural descendant, not a copy. Specifically:

**What survives coarse-graining:**
- Potential landscape $V(X)$ — its shape (basins, barriers, gradients) determines the forces on macro-variables
- Coupling structure — the topology of which macro-variables influence which others ($T^i{}_j$ at the coarse level)
- Thermodynamic identities — entropy, free energy, fluctuation-dissipation relations

**What does not survive:**
- The variational principle — coarse-grained dynamics are generalized Langevin ($V$ + dissipation kernel + noise), not pure Euler-Lagrange
- Noether conservation — dissipative systems do not conserve energy in the Noether sense; they have entropy production. Claiming Noether conservation at the institutional level is wrong
- Time-reversibility — coarse-grained dynamics have a thermodynamic arrow

Calling this "the same grammar across scales" is misleading. The coarse-grained grammar inherits the potential landscape and coupling topology from the Lagrangian but adds dissipation and noise that have no Lagrangian origin. (Dissipation can be formally included via a Rayleigh function — see [Part 1, Section 4b](./epimechanics_01_generalized_mechanics.md) — but this is bookkeeping, not derivation from a variational principle.)

### V is about shape, not energy bookkeeping

$V(X)$ determines forces through its **shape**: where are the basins (stable configurations), barriers (transition states), and gradients (driving forces)? Its value lies in topology and geometry, not in converting everything to Joules. A kilogram of diamond and a kilogram of TNT have similar total energy but utterly different potential landscapes — different basin depths, different barrier heights, different causal profiles. The framework's own atomic decomposition (bonds, loops, basins) is about this structural information. Forced Joule-equivalence at higher levels (what is the Joule-value of institutional trust?) obscures rather than clarifies.

### Multiple realizability and structural realism

The same institutional function can be realized by different micro-configurations: a team coordinates via email, phone, or face-to-face meetings. The macro "bond" is defined by its functional role (information exchange enabling coordination), not by its physical implementation. This means the coarse-grained description is **autonomous** from the micro description — the macro level has its own structural identity.

This framework adopts **functional-structural realism**: the atomic decomposition describes the abstract structural skeleton of entities — bonds, loops, basins — which is multiply realizable across substrates. This weakens any claim to derive macro from micro (the derivation path is many-to-one, so it cannot be run in reverse to predict the specific micro-realization). But it makes the universality claim coherent: the same structural template applies because it describes the functional architecture, not the physical implementation.

### Positioning against existing frameworks

The insight that multi-scale systems have structure worth formalizing is not new. Epimechanics should be positioned honestly against existing work:

- **Simon's nearly decomposable systems** [(1962)](https://doi.org/10.2307/2025193): the observation that "some bonds average out, some survive" coarse-graining is Simon's core insight, stated sixty years earlier. Epimechanics adds the specific six-quantity decomposition as a hypothesis about *what* to measure at each level.
- **Rosen's (M,R)-systems** [(1991)](https://doi.org/10.7312/rose92974): closure to efficient causation is the category-theoretic version of auto-causal loops ($\rho_{\text{ac}} > 0$). Epimechanics adds the quantitative decomposition (basin depth, entropy production, repair rate) that Rosen's categorical framework lacks, but inherits Rosen's difficulty with empirical operationalization.
- **Sloppy models** [(Transtrum, Machta, Sethna, 2013)](https://doi.org/10.1103/PhysRevE.83.036701): parameter space compression explains why effective theories work — most microscopic parameters are irrelevant to macro behavior. The Representational Efficiency principle may be the same insight in different notation. If it is, Epimechanics should say so and identify what, if anything, the Lagrangian framing adds beyond the information-geometric formulation. This remains an open question.
- **Empowerment** [(Klyubin, Polani, Nehaniv, 2005)](https://doi.org/10.1007/11553090_12): an information-theoretic measure of an agent's causal capacity over its environment, closely related to the shape of $V$ (how much of state space can the agent access). Epimechanics' $V$-landscape framework is structurally similar; the specific relationship has not been worked out.

### Status of cross-level derivation

| Transition | Status | Note |
|---|---|---|
| Physics → Chemistry | **Established** (by quantum chemistry — not by Epimechanics' procedure) | The atomic decomposition is consistent with this transition but was not used to derive it |
| Chemistry → Biology | **Partial** (molecular dynamics; origin of life unsolved) | Molecular simulations bridge parts of this gap; no end-to-end derivation of organismal dynamics from chemistry |
| Biology → Psychology | **Correlates exist** (computational neuroscience; no principled derivation) | Neural correlates of psychological states exist, but correlates are not derivations |
| Psychology → Institutions | **Unsolved** (no accepted coarse-graining method) | Agent-based models and game theory address fragments; no principled methodology |
| Ruliad → Physics | **Speculative** (no derivation exists) | Wolfram's computational universe hypothesis; no demonstrated path to known physics |

### Falsification conditions

The cross-level conjecture is falsifiable by at least two tests:

1. **Eigenstructure correlation test.** Measure response matrices (how perturbations propagate) at adjacent scales in a specific system. If the eigenstructure of these matrices shows no statistical correlation between levels — if the macro response matrix cannot be predicted from the micro bond structure — then the structural template fails for that transition.

2. **Persistence prediction test.** The atomic decomposition predicts that entity persistence duration scales with $\dot{R}_{\text{repair}} / \dot{S}_{\text{int}}$ (repair rate relative to entropy production). If this ratio fails to predict persistence across two or more levels in a given system, the decomposition is not universal.

### What Epimechanics specifically adds

Beyond existing multi-scale frameworks, Epimechanics contributes four specific hypotheses:

1. **The atomic decomposition** — six quantities (bond, strength, loop order, basin depth, $\dot{S}_{\text{int}}$, $\dot{R}_{\text{repair}}$) as a concrete, falsifiable claim about what to measure at each level. This is more specific than Simon's near-decomposability and more quantitative than Rosen's categorical closure.

2. **The Representational Efficiency principle** — connecting optimal representation to mechanical structure. This may reduce to sloppy models' parameter compression in a Lagrangian frame; if so, the contribution is the mechanical interpretation, not a new result. If it generates predictions that sloppy models do not, it is a genuine addition. This has not been tested.

3. **Computation as renormalization survival** — defining computation as the process by which structure persists across coarse-graining. This connects computation to scale in a way that is precise enough to test (does computational capacity correlate with renormalization-group fixed-point structure?) but has not been tested.

4. **The belief field framework** — connecting prediction error to the potential landscape ($V$ as the cost of wrong predictions). This is a specific operationalization of predictive processing in mechanical language; its relationship to existing free-energy-principle formulations [(Friston, 2010)](https://doi.org/10.1038/nrn2787) should be worked out explicitly.

Whether these are substantive contributions or relabeling depends on empirical test — which is the work of epiphysics ([Part 0, Section 5](./epimechanics_00_prelude.md)).

---

## Open Questions

### Q1: Are these the right atoms?

The six quantities proposed here (bond, strength, loop order, basin depth, entropy production, repair rate) are candidates, not conclusions. The test: can they be measured independently in at least one domain, and do the derived quantities ($\mathcal{M}$, $C_{\text{maint}}$, robustness, etc.) computed from them match independent measurements of those derived quantities? This is the atomic-level version of the equivalence principle test from [Part 1, Section 2b](./epimechanics_01_generalized_mechanics.md).

### Q2: Are the atoms domain-independent?

The examples above suggest they are - "causal bond" maps naturally to chemical bonds, institutional interactions, and cognitive connections. But the *measure* on each (what units, what grain) is domain-specific. Can we define a domain-independent formalism for these atoms, the way physics defines "bond" abstractly through quantum mechanics regardless of which atoms are bonding?

### Q3: How do atoms compose into tensors?

The coupling tensor $T^i{}_j$ describes cross-domain propagation. In atomic terms: a force applied in domain $j$ propagates through bonds that cross domain boundaries to produce a response in domain $i$. The off-diagonal elements of $T$ are determined by the number, strength, and loop structure of cross-domain bonds. Can the tensor structure be *derived* from the bond network, rather than measured as a separate quantity?

### Q4: What is the relationship between assembly index and stability?

Assembly theory predicts that high-AI objects require selection (they don't arise by chance). The atomic framework adds that high-AI objects *may* have deep stability basins - but need not. Is there a formal relationship between construction complexity and thermodynamic stability? If so, it would connect assembly theory to the Representational Efficiency principle: complex structures that persist (high AI, deep basin) are the ones that correspond to efficient representations.

### Q5: Can we derive the Lagrangian from the atomic structure?

The Lagrangian $L = \frac{1}{2}\mathcal{M}|\dot{X}|^2 - V(X)$ (scalar approximation; general: $L = \frac{1}{2}\mathcal{M}_{ij}\dot{X}^i\dot{X}^j - V(X)$) is currently a structural postulate. If $\mathcal{M}$ is composed of bonds with known strengths, and $V(X)$ is determined by the basin structure, can the Lagrangian be *derived* from the bond network? This would move the quadratic kinetic energy from postulate to consequence - the strongest possible grounding of the framework.

---

## Relationship to the Series

This document sits between the [series overview](./index.md) and [Part 1](./epimechanics_01_generalized_mechanics.md). It addresses the question that Part 1's grammar leaves open: what is the grammar *about*? The grammar describes how $\mathcal{M}$, $F$, $V$, $T^i{}_j$ relate to each other. This document asks what these quantities are *made of* - and proposes that the answer, like chemistry's periodic table, is a small set of atomic quantities that combine differently in different domains to produce the observed diversity of entities.

The grammar works regardless of whether the atomic decomposition is correct - $F = \mathcal{M}\ddot{X}$ (or more generally $F_i = \mathcal{M}_{ij}\ddot{X}^j$) holds whether or not we know what $\mathcal{M}$ is made of, just as $F = ma$ held before the discovery of atoms. But the atomic decomposition, if correct, would:

1. **Resolve the house problem** - explain why $\mathcal{M}$ and maintenance cost diverge
2. **Ground the equivalence principle** - provide a micro-level explanation for why different measurement approaches to $\mathcal{M}$ agree (they're measuring different aggregates of the same atoms)
3. **Enable the applications** - the Tier 1 applications (cost of ownership, robustness metrics, future cost of decisions) all require distinguishing $\mathcal{M}$ from maintenance cost, which requires the atomic decomposition
4. **Connect to the Representational Efficiency principle** - explain *why* optimal representations have simple Lagrangian structure (because they correspond to natural bond clusters)
5. **Potentially derive the Lagrangian** - moving the framework's strongest postulate from assumption to consequence

---

[→ Part 1: The Generalized Mechanics](./epimechanics_01_generalized_mechanics.md)
