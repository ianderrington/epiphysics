---
title: "Epimechanics — Part 1.5: Causors"
description: >-
  Epimechanics provides the grammar - state, force, energy, coupling. But what are the fundamental
  building blocks from which generalized mass, auto-causal density, maintenance cost, and robustness
  are composed? The periodic table problem for a general mechanics.
date: 2026-03-17T00:00:00.000Z
draft: true
author:
  name: "Ian Derrington"
co_authors:
  - name: "Parnian Barekatain"
    role: "Contributing Author"
contentType: article
mediaTypes:
  - text
series: "Epimechanics"
series_order: 1.5
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
  - Six candidate causors - causal bond, bond strength, loop order, basin depth, entropy production rate, repair rate
  - Mass and maintenance cost are different quantities built from different combinations of the same causors
  - Connection to assembly theory, information geometry, and the Representational Efficiency principle
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## Where We Are

[Part 1](./01_generalized_mechanics.md) defined the grammar of Epimechanics — how state $X$, force $F$, energy $W$, and coupling $T^i{}_j$ relate to each other. Two key quantities emerged:

**Generalized mass** $\mathcal{M} = \int \rho_{\text{causal}} \, d\mu$ — the total causal density of an entity. This determines resistance to state change: high $\mathcal{M}$ means more force is needed to alter the entity's trajectory. An institution with dense internal processes has high $\mathcal{M}$; a new startup has low $\mathcal{M}$.

**Auto-causal density** $\rho_{\text{ac}}$ — the fraction of causal activity that sustains the entity's own existence. A flame has high $\rho_{\text{ac}}$ (combustion maintains the heat that maintains combustion). A rock has near-zero $\rho_{\text{ac}}$ (nothing about the rock actively maintains itself).

Part 1 showed how these quantities *relate* — force equals mass times acceleration, energy is capacity for state change, coupling determines how strongly entities interact. But it left a question open: what are these quantities *made of*?

---

## The Periodic Table Problem

Physics had $F = ma$ for two centuries before understanding what mass is made of. The equation worked — you could predict trajectories, design bridges, launch projectiles — but mass was a black box. Then came atoms, then subatomic particles, then the Standard Model. Now we know: mass comes from the Higgs field coupling and from binding energy in composite particles.

Epimechanics is at the earlier stage. We have the grammar:

$$F = \mathcal{M}\ddot{X} + \dot{\mathcal{M}}\dot{X}$$

This works — you can describe institutional inertia, belief persistence, market momentum. But $\mathcal{M}$ is still a black box. What is it made of? What determines whether an entity has high or low $\mathcal{M}$? Why do some high-$\mathcal{M}$ entities require constant maintenance while others persist for millennia?

This is the periodic table problem. Chemistry needed a periodic table — a finite set of elements that combine to produce all substances. Epimechanics needs the same: a finite set of **causors** that combine to produce all the quantities the grammar uses.

---

## Causors vs Causal Descriptors

<abbr title="Causor: a higher-order causal mechanism/structure that produces state change (typically implemented by interacting bonds and loops).">Causor</abbr> is the core term in this chapter (see [Glossary](./glossary.md)).

Plainly stated: a **causor** is *that-which-causes* — the mechanism/structure by which a cause produces an effect. This follows the structural-causal distinction between conditions and mechanisms emphasized in modern causal modeling (especially [Pearl, 2009, 2nd ed.](https://doi.org/10.1017/CBO9780511803161)).

In this framework, causal description has three irreducible roles:

$$\text{Cause} \xrightarrow{\text{Causor}} \text{Effect}$$

- **Cause**: antecedent condition/input
- **Causor**: mechanism/operator that produces change
- **Effect**: resulting state/output

We use **causal operator** as the formal mathematical representation of a causor when writing explicit model equations.

**Important distinction:** not every quantity in the model is a causor. Variables such as bond strength, basin depth, entropy production, and repair rate are best treated as **causal descriptors/properties** of underlying causor structures (e.g., loops, operator motifs, and mechanism classes), rather than causors themselves.

## Label Discipline

A standing warning that applies throughout this document:

**Qualitative labels are derived outputs, never independent inputs.** Terms like "well-built," "fragile," "robust," "self-maintaining," "ancient institution," or "startup" are shorthand summaries of specific structural configurations in the Q1-Q5 parameter space. They have no independent explanatory content. Using them in explanation position — "it persists *because* it's robust" — is circular.

The correct direction is always:
$$\text{structural configuration} \xrightarrow{\text{Q1-Q5 + causor quantities}} \text{predicted properties} \xrightarrow{\text{summary}} \text{label}$$

Never:
$$\text{label} \rightarrow \text{explanation of properties}$$

When a label appears as an example in this document, it is a pointer to a structural configuration. The reader should ask: "what specific bond structure, topology, and timescale pattern does this label summarize?" That description is where the causal content lives.

---

## Three-Layer Architecture (Mechanisms, Descriptors, Observables)

To avoid category errors, Part 1.5 uses three layers:

- **Layer A — Causors (mechanisms/operators):** what actually produces state transitions.
- **Layer B — Descriptors (properties/parameters):** how causors are characterized.
- **Layer C — Observables/derived quantities:** what we measure from A+B in context.

| Symbol/Concept | Type |
|---|---|
| $b$, $\mathcal{L}$ | Causor operator (mechanism) — $b$ is the single bond primitive |
| Q1-Q5 functional roles | Derived bond descriptors (mode, target, topology, leverage, timescale) |
| $\sigma_b$, $\ell$, $\Delta V$ | Descriptor / parameter |
| $\dot{S}_{\text{int}}$, $\dot{R}_{\text{repair}}$ | Process observables (rate-level descriptors) |
| $\mathcal{M}$, $\rho_{ac}$, $C_{\text{maint}}$ | Derived quantities |

### Layer A: Core causors (mechanism-level)

### A0. Bond Structure — One Primitive, Derived Functional Roles

The bond operator $b$ is the single primitive causor in epimechanics: **a directed energy exchange between two entities**, producing a change in momentum $\Delta p$ and/or energy $\Delta W$ simultaneously.

$$b: X_i \xrightarrow{\Delta E, \Delta p} X_j$$

At the quantum field level, all physical interactions reduce to gauge boson exchange (photon, W/Z, gluon, graviton). At the biological scale and above, momentum dissipates fast enough that **energy** is the surviving conserved bookkeeping quantity — making $\Delta E$ the operationally relevant primitive for epimechanics in most domains.

> [!sidenote]
> **Momentum vs energy as primitive.** In classical mechanics, force ($F = dp/dt$) simultaneously produces momentum exchange ($\Delta p = \int F\,dt$) and energy exchange ($\Delta W = \int F \cdot dx$) — two views of one event, related by geometry. At viscous biological scales, momentum dissipates in nanoseconds; energy persists. This is why "energy exchange" is the right primitive for epimechanics at cellular scales and above, not a simplification.

**The bond is the only Layer A primitive.** Structural, enable, signal, and constraint roles all emerge from asking structural questions about how bonds are configured and composed — they are Layer B descriptors, derived from the primitive rather than asserted alongside it.

#### The Five Structural Questions

Every composition of bonds necessarily forces five questions. The answers are **continuous parameters**, not binary buckets — the categories below are poles on each dimension.

---

**Q1: What is the energy mode?**

Where does the exchanged energy go in the receiving entity?

$$\text{mode}(b) \in [\text{kinetic (flowing)},\ \text{potential (stored)}]$$

- **Kinetic end:** energy drives state velocity ($\dot{X}$ increases) — combustion, ATP hydrolysis, active transport
- **Potential end:** energy is stored in configuration against restoring force ($\Delta V$ increases) — covalent bonds, structural scaffolding, institutional rules

What we've called "structural bonds" are **potential-mode exchange bonds** — energy stored as basin depth rather than flow. A mode of the primitive, not a separate mechanism.

> [!sidenote]
> **Potential potential energy** follows directly from Q1. A uranium deposit stores energy in potential mode. For a cell, the exchange chain connecting uranium to the cell's bond network doesn't exist — $T^{\text{J}}_{\text{uranium,cell}} = 0$. For a nuclear plant, it does. The energy is the same; what differs is whether a kinetic-mode bond chain connecting it to the entity exists. Energy accessibility is always relational — a property of (matter, bond network) pair, not of matter alone.

---

**Q2: What is the output target?**

The output of a bond exchange can land on three structurally distinct targets:

| Target | Role name | What happens |
|---|---|---|
| A **state variable** $X_j$ directly | Direct exchange | State changes immediately |
| Another **bond** $b'$ (gates it) | Gating role | Small exchange releases large downstream exchange |
| A **loop** $\mathcal{L}$ (maintains its existence) | Enable role | Transducer entity persists; downstream chain remains accessible |

**Gating** (small $b$ triggering large $b'$) is what we called "signal" — it is a two-bond composition with leverage ratio $\Lambda = \mathcal{P}_{\text{out}}/\mathcal{P}_{\text{in}} \gg 1$, not a new bond type. A neural spike (~10⁻¹² J) gating muscle ATP release (~10⁻³ J) is a gating composition with $\Lambda \approx 10^9$.

**Enable** (exchange maintaining a loop) is an exchange bond whose output target is loop existence rather than a scalar state. Sever it and the downstream exchange chain collapses — the transducer entity dissolves, taking its exchange capacity with it.

> [!sidenote]
> **"Information" is not primitive.** Information transfer is always implemented by a gating composition ($b_{\text{gate}} \circ b_{\text{reservoir}}$) — a small exchange directing a large one. Shannon entropy is a mathematical description of probability distributions over physical states, not a physical mechanism. Treating information as a Layer A causor creates circular definitions. It is correctly a Layer C observable: a description of high-$\Lambda$ gating compositions from an observer's perspective.

---

**Q3: What is the topology?**

Is the bond chain open or closed?

$$\text{topology}(b_1 \circ \cdots \circ b_n) \in [\text{open chain},\ \text{closed loop}]$$

- **Open chain:** causal propagation — energy flows through and dissipates. No regeneration.
- **Closed loop:** the output regenerates input conditions. Auto-causality emerges from topology alone — it is not a new mechanism but a structural property of bond composition.

A pure closed loop of kinetic-mode exchange bonds is a dissipative auto-causal entity (flame). Adding potential-mode bonds to the loop produces persistence. Adding enable targets produces hierarchy.

---

**Q4: What is the leverage ratio?**

For any two-bond composition ($b_{\text{gate}} \circ b_{\text{reservoir}}$):

$$\Lambda = \frac{\mathcal{P}_{\text{out}}}{\mathcal{P}_{\text{in}}}$$

- $\Lambda \approx 1$: symmetric exchange — output power matches input power
- $\Lambda \gg 1$: gating / signal composition — small exchange directs large reservoir release
- $\Lambda \ll 1$: lossy / dissipative — most input energy lost before output

High-$\Lambda$ gating is ubiquitous in biological systems (gene regulation, neural signaling, hormonal cascades) because it is metabolically cheap to implement control. The metabolic cost is $\mathcal{P}_{\text{gate}}$; the effect is $\Lambda \cdot \mathcal{P}_{\text{gate}}$.

---

**Q5: What is the timescale structure?**

Every bond has a characteristic timescale $\tau_b$ (latency from input to output). In a loop, the ratio of bond timescales determines causal architecture:

$$\tau_{\text{fast}} \ll \tau_{\text{slow}}$$

- **Fast loops** ($\tau_b$ small): regulators — they respond to perturbation before the entity's state changes significantly. Quasi-steady-state approximation applies.
- **Slow loops** ($\tau_b$ large): structural features — they define the entity's baseline configuration. Adiabatic approximation applies.
- **Matched timescales:** resonance, oscillation, or instability — the loop cannot separate into regulator and structural components.

Timescale separation is necessary to distinguish **what regulates** from **what persists** in a compound entity. A cell's ATP/ADP ratio is regulated by a fast loop (seconds); its DNA sequence is maintained by a slow loop (cell division cycle, hours). Without Q5, these cannot be distinguished from Q1-Q4 alone.

> [!sidenote]
> Timescale structure cannot be derived from energy mode, target, topology, or leverage alone — it is an independent structural dimension of bond composition.

---

#### The Constraint Special Case

Constraints (steric hindrance, legal prohibition, logical impossibility) appear to restrict state space **without** energy exchange — which would make $b_c$ irreducible to the exchange primitive.

**Resolution:** a constraint is an exchange bond in the limit $\sigma_b \to \infty$ — the energy barrier to the transition is infinite (or effectively so on the relevant timescale), making the transition forbidden. No new mechanism is required. This is exactly how physics treats forbidden transitions: not as a different kind of process but as an energy barrier high enough to be operationally inaccessible.

$$b_c \equiv \lim_{\sigma_b \to \infty} b_{\times}$$

The causal effect of a constraint is through absence — what cannot happen — which is the limit case of an exchange bond that would require more energy than is available to fire.

---

#### From Q1–Q5 to Entity Types

The five questions together define a five-dimensional parameter space. Stable compositions cluster at recognizable poles — these are the entity types we observe:

| Q1 mode | Q2 target | Q3 topology | Q4 leverage | Q5 timescale | Entity type |
|---|---|---|---|---|---|
| Kinetic | State | Open | ~1 | Single | Dissipative process (heat flow) |
| Potential | State | Open | ~1 | Single | Structural bond (crystal lattice) |
| Kinetic | State | Closed | ~1 | Fast | Dissipative auto-causal (flame) |
| Both | Loop | Closed | ~1 | Separated | Self-maintaining entity (cell) |
| Both | Bond+Loop | Closed | ≫1 | Separated | Adaptive entity (nervous system) |
| Both | Loop-of-loops | Closed | ≫1 | Multi-scale | Meta-entity (organism, institution) |
| Meta-entities via enable | Meta-loops | Closed | ≫1 | Multi-scale | Ecology / civilization |

Each row is not a category but a region in a continuous parameter space. Real entities occupy intermediate positions and have **mixed subsystems** — gene regulation in a cell has both high-$\Lambda$ gating (fast, Q4≫1) and slow structural loops (Q5 separated), which is why the cell entry above is marked "coarse."

The composition hierarchy is:

$$b \xrightarrow{\text{Q1-Q5}} \text{functional roles} \xrightarrow{\text{composition}} \mathcal{L}_{\text{types}} \xrightarrow{\text{composition}} \text{entity types} \xrightarrow{\text{interaction}} \text{ecologies}$$

> [!open-question]
> **Are Q1-Q5 complete?** The test is: can every structural distinction between bond compositions be captured by position in the Q1-Q5 parameter space? Candidate dimensions not yet represented: spatial locality (local vs non-local bonds), stochasticity (deterministic vs probabilistic firing), and reversibility (thermodynamically reversible vs irreversible exchange). See Q1 in the Open Questions section.

---

### A1. Causal Bond Operator ($b$)

A single directed causal connection between two state variables: a change in $X_i$ produces a change in $X_j$. This is a primitive causor in the framework. In [Pearl's framework](https://doi.org/10.1017/CBO9780511803161), it corresponds to a single edge in a causal DAG. Every bond belongs to one or more of the subtypes defined in A0.

**Examples across domains:**
- **Physical**: an intermolecular force (covalent, ionic, van der Waals) — primarily $b_{\sigma}$; ATP hydrolysis — $b_{\times}$; receptor binding — $b_s$
- **Institutional**: a reporting line — $b_s$; a contractual obligation — $b_{\sigma}$; a salary — $b_{\varepsilon}$
- **Cognitive**: a belief supporting another belief — $b_s$; a memory triggering emotion — $b_s \circ b_{\times}$

A causal bond has four properties:
- **Direction**: $i \to j$ (asymmetric in general)
- **Strength** $\sigma_b$: the energy required to sever the bond (see below)
- **Latency** $\tau_b$: the time delay between cause and effect
- **Reliability** $r_b \in [0,1]$: the probability that the connection fires when activated

### A2. Loop Operator ($\mathcal{L}$)

A **loop operator** is a closed causal composition that regenerates conditions for its own continuation (directly or indirectly). This is the minimal mechanism-level unit for self-sustaining causation.

- Bond-level causation explains local propagation.
- Loop-level causation explains persistence, self-maintenance, and auto-causality.

### Layer B: Core causal descriptors (property-level)

### 1. Bond Strength ($\sigma_b$)

The energy required to sever a single causal bond. At the physical level, this is measured in Joules — analogous to bond dissociation energy in chemistry.

> [!sidenote]
> Bond strength is a **descriptor** of the bond causor, not a standalone mechanism. It is a major contributor to generalized mass: $\mathcal{M} = \sum_{\text{bonds}} \sigma_b$.

**Examples:**
- **Strong bonds** (hard to break): a covalent bond between carbon atoms (~350 kJ/mol), a deeply ingrained habit, a legal contract
- **Weak bonds** (easy to break): a van der Waals interaction (~1 kJ/mol), a casual acquaintance, a verbal agreement

### 2. Loop Order ($\ell$)

The length of the shortest self-referential causal cycle passing through a given point. A loop of order 1 is direct self-causation ($X_i \to X_i$). A loop of order 2 is $X_i \to X_j \to X_i$. A loop of order $\ell$ passes through $\ell$ intermediate states before returning.

> [!sidenote]
> Loop order is a **descriptor** of loop causors. Shorter loops respond faster to perturbation; longer loops can be more robust if alternative paths exist.

Loop order determines the *character* of auto-causal structure:
- $\ell = 1$: direct self-reinforcement (a thermostat, a habit loop)
- $\ell = 2$: mutual reinforcement (symbiosis, reciprocal trust)
- $\ell \gg 1$: long-range auto-causality (an institution whose budget funds the department that generates the revenue that justifies the budget — many intermediaries)

**Examples across domains:**
- **Physical**: crystal lattice periodicity, molecular ring structures
- **Institutional**: feedback cycles (daily standup = short loop; budget-revenue cycle = medium loop)
- **Cognitive**: rumination ($\ell$ short), identity-belief-behavior-social reinforcement ($\ell$ long)

Shorter loops respond faster to perturbation (the feedback signal returns sooner). Longer loops are slower but can be more robust — disrupting one link doesn't immediately break the cycle if alternative paths exist.

### 3. Stability Basin Depth ($\Delta V$)

The energy barrier between the entity's current configuration and the nearest dissolution pathway. Formally: the height of the lowest saddle point on the potential energy surface surrounding the entity's equilibrium position.

$$\Delta V = V_{\text{saddle}} - V_{\text{equilibrium}}$$

Deep basins mean the entity can absorb large perturbations without leaving its configuration. Shallow basins mean small perturbations can push it over the edge.

**Examples** (note: the labels below summarize structural configurations; see the House Problem section for why the structural description, not the label, is the explanation):
- **Diamond** (covalent lattice, ~7 eV/bond): $\Delta V$ is enormous — lattice disruption requires displacing atoms against strong covalent bonds in all directions
- **House with redundant load paths and sealed envelope** (what "well-built" labels): $\Delta V$ is large — no single bond failure causes structural collapse; perturbations are absorbed by redundant paths
- **Weakly-bonded granular pile** (what "sandcastle" labels): $\Delta V$ is tiny — gravity alone degrades it; no bond redundancy; any perturbation finds a dissolution path
- **New collective with few established bonds** (what "new startup's culture" labels): $\Delta V$ is shallow — few structural bonds have formed; any perturbation can reshape the configuration
- **Dense long-lived institutional network** (what "centuries-old institution" labels): $\Delta V$ is deep — many redundant structural bonds; perturbations absorbed without reconfiguration

### 4. Entropy Production Rate ($\dot{S}_{\text{int}}$)

The rate at which the entity's internal structure generates disorder that must be managed. Every causal bond produces some entropy — some fraction of causal activity degrades the structure rather than maintaining it.

$$\dot{S}_{\text{int}} = \sum_{\text{bonds}} \dot{s}_b$$

where $\dot{s}_b$ is the entropy production per bond per unit time. This depends on:
- The bond's operating conditions (a pipe in freezing weather produces more entropy than one in a climate-controlled building)
- The bond's age and degradation state
- Environmental coupling (how strongly external perturbations drive the bond away from equilibrium)

**Examples across domains:**
- **Physical**: thermal entropy production (second law)
- **Institutional**: process degradation, knowledge loss, alignment drift
- **Cognitive**: forgetting, confusion, belief drift

> [!sidenote]
> $\dot{S}_{\text{int}}$ is what makes entities mortal. [Prigogine](https://doi.org/10.1126/science.201.4358.777) showed living systems persist by exporting entropy faster than they produce it internally. When export fails, the entity dissolves.

### 5. Repair Rate ($\dot{R}_{\text{repair}}$)

The rate at which the auto-causal structure restores broken or degraded bonds. This is the operational definition of "self-sustaining" — the entity does degrade, but it fixes itself faster than it breaks.

$$\dot{R}_{\text{repair}} = \text{bonds restored per unit time}$$

**Examples across domains:**
- **Physical**: zero for non-living matter; metabolic repair for living matter
- **Institutional**: process improvement, training, cultural reinforcement, institutional memory maintenance
- **Cognitive**: rehearsal, reinforcement, active recall, social validation

The net maintenance cost is:

$$C_{\text{maintenance}} = \dot{S}_{\text{int}} - \dot{R}_{\text{repair}}$$

**Maintenance regimes:**
- When $\dot{R}_{\text{repair}} > \dot{S}_{\text{int}}$: the entity is *self-maintaining*. No external maintenance needed. (A living organism in favorable conditions.)
- When $\dot{R}_{\text{repair}} \approx \dot{S}_{\text{int}}$: marginal. The entity persists but is fragile. (A machine that requires regular servicing.)
- When $\dot{R}_{\text{repair}} < \dot{S}_{\text{int}}$: the entity decays. External maintenance is required to persist. (A building, a road, a garden.)
- When $\dot{R}_{\text{repair}} = 0$: no self-repair. All maintenance is external. (A rock — but rocks have very low $\dot{S}_{\text{int}}$ too, so they persist.)

---

## Causal Density, Labeling, and Predictability

Part 1.5 now distinguishes two different questions:

1. **How much causal structure is active?** (causal density)
2. **How cleanly can we distinguish causal regimes?** (labeling/separability quality)

A useful operational framing is:

$$\rho_C(\Omega) = \frac{|\Pi_{\text{eff}}|}{\mu(\Omega)}$$

Related terminology on **causal density** appears in prior complexity/consciousness literature (e.g., [Seth, Barrett, & Barnett, 2011](https://doi.org/10.1098/rsta.2011.0079)); here we adapt it for domain-general Epimechanics operator analysis.

where $\Pi_{\text{eff}}$ is the set of effective causal pathways in region $\Omega$ and $\mu(\Omega)$ is the region measure at the chosen scale.

And a companion concept:

- **Labeling/separability quality (LSQ):** how cleanly observed states map to distinct causal operator classes.

Working hypothesis for experiments:

- Prediction error decreases as LSQ improves.
- Prediction error increases as unresolved causal density rises.

This explains why two systems with similar apparent complexity can have very different predictability: one may have cleaner causal labeling and lower pathway aliasing.

## Canonical references (prominent)

- **Pearl, J. (2009). _Causality_ (2nd ed.)** — structural-causal framework; explicit separation of conditions, mechanisms, and effects. DOI: https://doi.org/10.1017/CBO9780511803161
- **Seth, A. K., Barrett, A. B., & Barnett, L. (2011).** Causal density and integrated information as measures of conscious level. DOI: https://doi.org/10.1098/rsta.2011.0079

## Why This Matters: The House Problem

With core causors (bond + loop mechanisms) and their descriptors defined, we can now resolve a puzzle that Part 1's grammar cannot handle.

**The house problem.** Consider two houses. House A is assembled from high-$\sigma_b$ bonds: steel-reinforced concrete foundation, engineered timber framing with redundant load paths, weather-sealed envelope, copper plumbing, distributed electrical circuits. House B is assembled from low-$\sigma_b$ bonds: unreinforced masonry, single load paths, gaps in the envelope, galvanized iron pipes prone to corrosion. Both are houses — same function, same apparent category.

If $\mathcal{M}$ (total bond strength) were the only relevant quantity, House A should require *more* maintenance: more bonds, more stuff to maintain. But House A requires *less* maintenance than House B. The grammar alone ($F = \mathcal{M}\ddot{X}$) cannot explain this — it says higher $\mathcal{M}$ means more inertia, not less degradation.

> [!warning]
> **Label discipline.** The terms "well-built" and "poorly built" are shorthand labels for the structural configurations described above. They are *outputs* of the causor analysis, not inputs to it. Using "well-built" as an explanation ("it requires less maintenance *because* it's well-built") is circular. The explanation is always the specific structural description — bond materials, topology, redundancy, load distribution — from which the causor quantities are derived.

**The causor resolution.** Starting from the structural descriptions, the Q1-Q5 framework predicts the causor quantities:

- **House A** (high-$\sigma_b$ bonds, redundant load paths, low-porosity envelope): high $\mathcal{M}$ from bond sum, deep $\Delta V$ from bond redundancy (no single keystone failure dissolves the structure), low $\dot{S}_{\text{int}}$ from tight joints and durable materials, zero $\dot{R}_{\text{repair}}$ (no self-repair) → low $C_{\text{maint}}$

- **House B** (low-$\sigma_b$ bonds, single load paths, high-porosity envelope): medium $\mathcal{M}$, shallow $\Delta V$ (single-point failures exist), high $\dot{S}_{\text{int}}$ from moisture ingress, corrosion, and thermal cycling, zero $\dot{R}_{\text{repair}}$ → high $C_{\text{maint}}$

The counter-intuitive result — more bonds, less maintenance — follows because $\Delta V$ and $\dot{S}_{\text{int}}$ depend on **bond quality and topology**, not just bond count. House A's redundant load paths mean no single bond is a keystone ($\Delta V$ deep per bond removed). House B's single load paths mean several bonds are keystones ($\Delta V$ shallow). House A's sealed envelope means few bonds are exposed to the entropy-producing environment (low $\dot{S}_{\text{int}}$). House B's gaps mean many bonds are constantly stressed.

**$\mathcal{M}$ and $C_{\text{maint}}$ are independent** because they depend on different structural properties: $\mathcal{M}$ on total bond strength, $C_{\text{maint}}$ on entropy production rate relative to basin depth and repair capacity.

| Structural description | $\mathcal{M}$ | $\Delta V$ | $\dot{S}_{\text{int}}$ | $\dot{R}_{\text{repair}}$ | $C_{\text{maint}}$ | Label (derived) |
|---|---|---|---|---|---|---|
| High-$\sigma_b$, redundant, sealed | High | Deep | Low | 0 | Low | "Well-built house" |
| Low-$\sigma_b$, single-path, porous | Medium | Shallow | High | 0 | High | "Cheap house" |
| Covalent lattice, no mobile bonds | Very high | Very deep | Near-zero | 0 | Near-zero | "Diamond" |
| Weakly-bonded granular pile | Low | Very shallow | Medium | 0 | Very high | "Sandcastle" |
| Auto-causal metabolic network | Very high | Moderate | High | High | Low (while alive) | "Living organism" |
| Low-bond, fast-forming collective | Low | Shallow | High | Moderate | Moderate | "Startup" |
| Dense, long-lived institutional network | High | Deep | Moderate | Moderate | Low | "Ancient institution" |

The labels in the rightmost column are summaries of the structural descriptions in the leftmost column. They have no independent explanatory content.

---

## Auto-Causality: Emergent, Not Self-Contained

An important clarification about causal loops: **auto-causal does not mean self-contained.**

Consider the Krebs cycle (citric acid cycle). It is auto-causal: the cycle regenerates the oxaloacetate needed to accept the next acetyl-CoA input, sustaining its own continuation. But it is not self-contained — it requires continuous input of acetyl-CoA (from food) and outputs CO₂ and electrons (to the electron transport chain). Cut off the input, and the cycle stops.

**The distinction:**
- **Auto-causal** ($\rho_{\text{ac}} > 0$): the structure participates in its own continuation. The loop regenerates conditions for its next iteration.
- **Self-contained** ($C_{\text{maint}} = 0$, $\dot{S}_{\text{int}} = 0$, no external input required): the structure persists indefinitely without any exchange with its environment.

**The self-containment hierarchy.** Self-containment is the ground state of the causor hierarchy, not an exception. Operationally stable entities at the bottom of the assembly hierarchy (electrons, protons, stable nuclei, simple atoms) persist without active maintenance — their $\sigma_b / k_BT$ ratios are high enough that thermal fluctuations can't bridge the dissolution barrier on any relevant timescale. Composite entity maintenance costs are measured *upward* from this baseline.

The progression is:

| Entity class | $C_{\text{maint}}$ | $\dot{S}_{\text{int}}$ | Operationally stable? | Notes |
|---|---|---|---|---|
| Electrons, photons | 0 | 0 | Yes — no known decay | Point particles; no sub-structure in Standard Model |
| Protons | ~0 (normal conditions) | ~0 | Yes — operationally | QCD sub-bonds (quarks + gluons) are real; confinement energy ~938 MeV makes spontaneous dissolution effectively impossible under normal conditions. Proton decay predicted by GUT but unobserved ($\tau > 10^{34}$ yr). |
| Simple atoms (H, He) | ~0 | ~0 | Yes — operationally | Electron-nuclear bonds stable; spontaneous ionization negligible at room temperature |
| Small stable molecules (N₂, H₂O) | ~0 | Very low | Yes — operationally | Bond dissociation energies high relative to thermal noise |
| Complex molecules (proteins, DNA) | Low–moderate | Low–moderate | No — require repair | Many bonds exposed to thermal fluctuations; degradation measurable on biological timescales |
| Auto-causal composites (cell, organism) | Positive | High | No — require fuel | High $\dot{S}_{\text{int}}$ from metabolic activity; repair loops required |
| Meta-entities (institution, nation) | Positive | High | No — require energy inputs | Bonds between humans degrade; require continuous renewal |

The pattern is not binary (self-contained vs not) but a spectrum tied to the ratio of bond dissociation energy to available thermal energy ($\sigma_b / k_BT$). At the extremes of this ratio, entities are operationally stable without active maintenance. As the ratio falls — larger, more complex, more thermally-exposed assemblies — maintenance becomes necessary. The causor framework addresses the middle and lower end of this spectrum: why some composites persist despite $\sigma_b / k_BT$ ratios that should cause rapid dissolution.

This applies universally:
- **Metabolic cycles**: auto-causal (regenerate intermediates) but require fuel input
- **Institutions**: auto-causal (the budget funds the department that generates the revenue that justifies the budget) but require external customers, employees, resources
- **Neural assemblies**: auto-causal (recurrent circuits maintain activation) but require sensory input and metabolic support
- **Social reciprocity**: auto-causal (A trusts B, B cooperates with C, C supports A) but requires the individuals to exist and interact

**Individual bonds have zero auto-causal density.** Consider an autocatalytic cycle: enzyme A catalyzes production of substrate B; B is consumed by enzyme C; C produces a cofactor required by A. No individual step sustains itself — A alone does nothing without C's cofactor, B alone is just a substrate, C alone lacks its input. Each bond has $\rho_{\text{ac}} = 0$. But the cycle A → B → C → A has $\rho_{\text{ac}} > 0$ — it collectively sustains its own continuation.

This is exactly [Kauffman's autocatalytic set](https://doi.org/10.1093/oso/9780195079517.001.0001): no single reaction catalyzes itself, but the set collectively catalyzes its own production.

**Implication:** $\rho_{\text{ac}}$ is NOT a bond-level property. It is a **loop-level emergent property** — the first level at which auto-causality appears. Bonds are the constituents; loops are the "molecules." You cannot measure $\rho_{\text{ac}}$ by examining individual bonds any more than you can measure wetness by examining individual water molecules.

This connects directly to [Hoel et al.'s causal emergence](https://doi.org/10.1073/pnas.1314922110): the loop-level description has more causal information than the bond-level description ($EI(\text{macro}) > EI(\text{micro})$). The loop IS the entity at its most fundamental level — the smallest unit of self-sustaining causal structure.

### Visual: Auto-causal loop with external coupling

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#EAF2FF', 'primaryTextColor': '#0F172A', 'primaryBorderColor': '#7AA2E3', 'lineColor': '#334155', 'fontSize': '14px'}}}%%
flowchart LR
  A[A] --> B[B]
  B --> C[C]
  C --> A

  D[Environment] -.->|input| B
  C -.->|output| E[External]

  classDef core fill:#EAF2FF,stroke:#7AA2E3,stroke-width:2px,color:#0F172A;
  classDef ext fill:#EEF2F7,stroke:#8A99AD,stroke-width:1.5px,color:#0F172A;

  class A,B,C core;
  class D,E ext;
```

The loop A → B → C → A is **auto-causal** (it regenerates conditions for its continuation), but it requires input from the environment and produces output. Auto-causal ≠ self-contained.

> [!sidenote]
> Each bond in the loop has its own descriptors (strength σ, latency τ, reliability r), but the diagram omits these for clarity. The key point is the loop structure, not the bond parameters.

### Local auto-causality does not guarantee contribution to containing systems

A second clarification: **auto-causality operates at specific scales of time and space.** A loop that sustains itself locally may not contribute to — or may actively drain — a containing system at a larger scale.

> [!sidenote]
> **Systemic coupling** $\kappa_{\text{sys}} = \partial \rho_{\text{ac}}^{\text{containing}} / \partial \rho_{\text{ac}}^{\text{loop}}$ measures whether a sub-loop contributes to ($\kappa_{\text{sys}} > 0$), drains from ($\kappa_{\text{sys}} < 0$), or is decoupled from ($\kappa_{\text{sys}} = 0$) its containing system. See [Part 2](./02_meta_entities.md) for full treatment.

A loop can sustain itself ($\rho_{\text{ac}} > 0$ at its own scale) while:
- Contributing nothing to the containing system's $\rho_{\text{ac}}$ (decoupled)
- Actively draining from the containing system (parasitic)
- Producing entropy without useful work (dissipative)

**Examples:**
- An idling engine: combustion sustains combustion locally, but no work done on the containing system
- A bureaucratic process that perpetuates itself but doesn't serve the organization's persistence
- A tumor: high local $\rho_{\text{ac}}$, but drains the organism's resources

> [!sidenote]
> **Parasites can become organs.** Mitochondria were originally parasitic bacteria; R&D departments initially drain resources before producing value. The relevant quantity is expected future contribution, not instantaneous $\kappa_{\text{sys}}$. See [Part 2, Section 2.5](./02_meta_entities.md) for the full temporal analysis.

---

## Derived Quantities

Core causor mechanisms (bonds, loops) together with their descriptors produce the framework's higher-level concepts.

### Causal Power

**Causal power** $\mathcal{P}$ is the rate at which an entity does work on state trajectories:

$$\mathcal{P}_{E \to j} = \mathbf{F}_{E \to j} \cdot \mathbf{v}_{X_j}$$

where $\mathbf{F}_{E \to j}$ is the force entity $E$ exerts on entity $j$'s state, and $\mathbf{v}_{X_j} = dX_j/dt$ is $j$'s state velocity. Units: energy per time (Watts). This is power in the literal mechanical sense, extended to abstract state spaces.

> [!sidenote]
> Causal power is not a seventh causor — it is a *derived quantity* that emerges from bond strengths, coupling structure, and state velocities. See [Part 3](./03_intelligence_consciousness_agency.md) for full treatment.

**Connection to Chaisson's energy rate density.** [Eric Chaisson (*Complexity*, 2011)](https://onlinelibrary.wiley.com/doi/abs/10.1002/cplx.20323) measured $\dot{\varepsilon}_m = \text{power} / \text{mass}$ (W/kg) across cosmic evolution — from galaxies to stars to planets to life to brains to civilization — and found it increases with complexity:

$$\dot{\varepsilon}_m = \frac{\mathcal{P}}{\mathcal{M}/c_D^2}$$

Higher $\dot{\varepsilon}_m$ means more causal work per unit structure. Chaisson's empirical finding is a claim about *causal power density* increasing with complexity.

### The Derived Quantities Table

| Derived Quantity | Composed From (mechanisms/descriptors) | What It Means |
|---|---|---|
| **Causal power** $\mathcal{P}$ | $\mathbf{F} \cdot \mathbf{v}$ (force × velocity) | Rate of work on state trajectories; normalized by mass gives Chaisson's $\dot{\varepsilon}_m$ |
| **Causal action** $A_{\text{causal}}$ | $\int_0^{T_{\text{local}}} \mathcal{M}_{\text{ac}}(t) \, dt$ | Total self-sustaining structure over lifetime; units of J·s (same as physical action $S$) |
| **Generalized mass** $\mathcal{M}$ | $\sum_{\text{bonds}} \sigma_b$ | Total causal content — sum of bond strengths; determines resistance to state change |
| **Auto-causal density** $\rho_{\text{ac}}$ | **Emergent** from closed loops | Self-sustaining fraction of causal structure (loop-level, not bond-level) |
| **Maintenance cost** $C_{\text{maint}}$ | $\dot{S}_{\text{int}} - \dot{R}_{\text{repair}}$ | Net entropy accumulation rate — NOT proportional to $\mathcal{M}$ |
| **Robustness** | $\Delta V / \langle \text{perturbation} \rangle$ | Basin depth relative to typical environmental shocks |
| **Assembly index** (AI) | Minimum bond-formation steps from primitives | Construction complexity — a lower bound on $\mathcal{M}$ |
| **Durability** | $\Delta V \times \dot{R}_{\text{repair}} / \dot{S}_{\text{int}}$ | How long the entity persists without external intervention |
| **Fragility** | $(\partial \mathcal{M} / \partial \text{perturbation})$ near $\Delta V$ boundary | How sharply mass drops when basin boundary is approached |
| **Antifragility** | $\partial \Delta V / \partial \text{stress} > 0$ | Basin depth *increases* under perturbation (stronger from stress) |

**Note:** $\mathcal{M} = \sum \sigma_b$ is the isotropic (scalar) approximation. When bond strengths vary by direction, $\mathcal{M}$ becomes a tensor $\mathcal{M}_{ij}$ whose eigenvalues give directional resistance. See [Part 1, Section 2b](./01_generalized_mechanics.md).

### Causal Action: Why Persistence Matters

**Causal action** is the temporal integral of auto-causal mass:

$$A_{\text{causal}}(E) = \int_0^{T_{\text{local}}} \mathcal{M}_{\text{ac}}(E, t) \, dt$$

Units: **J·s** — the same as physical action $S = \int L \, dt$ and Planck's constant ℏ. The dimensional match is structural: the principle of least action ($\delta S = 0$) selects which *trajectories* are realized; causal action measures which *entities* persist.

**High instantaneous density is not enough.** An entity can have very high $\mathcal{M}_{\text{ac}}$ for a short time and then collapse — a flash fire, a viral meme, a speculative bubble. The product $\mathcal{M}_{\text{ac}} \times T_{\text{local}}$ is what matters for long-term causal presence.

| Entity | $\mathcal{M}_{\text{ac}}$ | $T_{\text{local}}$ | $A_{\text{causal}}$ |
|---|---|---|---|
| Flash fire | Very high | Seconds | Low |
| Viral meme | High | Days–weeks | Low–moderate |
| Stone wall | Low | Centuries | High |
| Ancient institution | Moderate | Millennia | Very high |

> [!sidenote]
> See [Part 4](./04_time_and_soul.md) for full treatment of causal action, including the fitness×truth principle and the Haber process example.

### The Conquering Triad: Fitness, Death, and Truth

Selection dynamics follow a rock-paper-scissors pattern across timescales:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#EAF2FF', 'primaryTextColor': '#0F172A', 'primaryBorderColor': '#7AA2E3', 'lineColor': '#334155', 'fontSize': '14px'}}}%%
graph TD
  F["🏆 FITNESS\n(short timescales)"]
  D["💀 DEATH\n(medium timescales)"]
  T["🔬 TRUTH\n(long timescales)"]

  F -->|"beats"| T
  D -->|"beats"| F
  T -->|"beats"| D

  classDef node fill:#EAF2FF,stroke:#7AA2E3,stroke-width:2px,color:#0F172A,padding:10px;
  class F,D,T node;
```

**Fitness beats Truth** (short timescales). [Hoffman (*The Case Against Reality*, 2019)](https://wwnorton.com/books/9780393254693) proved this formally: in evolutionary competition, organisms that perceive fitness-relevant features outcompete those that perceive accurately. The organism that sees "tiger → run" beats the one carefully modeling tiger biomechanics. Truth-tracking is computationally expensive; fitness-tracking is efficient. On the timescale of individual selection events, fitness wins.

**Death beats Fitness** (medium timescales). Every fitness-maximizing strategy eventually encounters constraints it didn't model — resources deplete, environments shift, black swans arrive. The fitness-optimized entity that ignored these contingencies dies. Mining guano for nitrogen fertilizer was fitness-optimal until the guano ran out. The 2008 financial models were fitness-optimal until the housing market they ignored collapsed. Death is the filter that removes strategies decoupled from causal reality.

**Truth beats Death** (long timescales). Strategies that track causal structure — that couple fitness to truth — survive what kills fitness-only strategies. The Haber-Bosch process coupled nitrogen availability to atmospheric reality; populations that adopted it survived the constraints that would have killed guano-dependent agriculture. Science, engineering, and accurate maps are truth-tracking meta-strategies that extend $T_{\text{local}}$ by anticipating the deaths that fitness-only strategies cannot see.

**The cycle completes:** Truth-tracking is expensive, so fitness-only strategies outcompete in the short term — until Death removes them, leaving Truth-trackers to persist. Over sufficiently long timescales, selection favors high $A_{\text{causal}}$, which requires fitness×truth.

> [!sidenote]
> This triad is a *framing*, not a theorem. It organizes observations about selection dynamics across scales. The timescale boundaries are fuzzy and domain-dependent.

### Visual: Maintenance balance

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryTextColor': '#0F172A', 'lineColor': '#334155', 'fontSize': '14px'}}}%%
flowchart LR
  Sint["Ṡ_int\nEntropy production"] -->|increases| Net["C_maint\nMaintenance cost"]
  Rrep["Ṙ_repair\nRepair rate"] -->|reduces| Net

  classDef driver fill:#FFF1F2,stroke:#E58C98,stroke-width:1.5px,color:#450A0A;
  classDef repair fill:#ECFDF3,stroke:#61B08C,stroke-width:1.5px,color:#052E16;
  classDef core fill:#EAF2FF,stroke:#7AA2E3,stroke-width:2px,color:#0F172A;

  class Sint driver;
  class Rrep repair;
  class Net core;
```

---

## Measurement Across Domains

### Units at the physical level

A causal event is an energy exchange, measured in Joules. This fixes the dimensional chain:

| Quantity | Definition | Units |
|---|---|---|
| $\rho_{\text{causal}}$ | Energy density of causal events | J/m³ |
| $\mathcal{M} = \int \rho_{\text{causal}} \, d\mu$ | Total causal content | J |
| Mass-equivalent | $\mathcal{M} / c_D^2$ | kg |
| $\mathcal{P}$ | Causal power | W (J/s) |

### Functionalized energy

At biological levels, the relevant unit is not raw Joules but **functionalized energy** — energy in a form that can do causal work within the system's bond network.

**ATP** is the paradigm case. A cell sitting in glucose has access to energy, but that energy cannot do causal work until converted to ATP. ATP is energy *functionalized* — packaged in a form the cell's causal machinery can use.

> [!sidenote]
> This is why biological energy rate density is measured in metabolic watts (ATP hydrolysis rate), not raw thermal energy. The Krebs cycle converts substrate energy into functionalized form (ATP, NADH, FADH₂).

**The principle generalizes:** In any domain, the relevant energy measure is *functionalized* energy — energy that can propagate through that domain's causal bonds:
- **Biological:** ATP, NADH
- **Institutional:** budget dollars, authorized decisions, trained personnel
- **Cognitive:** attention, working memory capacity

### Entities as Unit-Carriers: Tensor Coupling Chains

The ATP example reveals something more general: **entities are typed dimensional units**, and the coupling tensor $T^i{}_j$ is a unit-conversion operator between them. This is **dimensional analysis** — the same technique every physicist (and anyone tracking units in daily life) uses to verify and trace causal chains. Write the units at every step, cancel what cancels, and what remains tells you what the chain actually computes. The extension here is that the "units" are not just meters and seconds — they are *entities* like ATP, Krebs turns, or dollars.

**Entities as typed units.** Let $\mathcal{E} = \{e_1, e_2, \ldots\}$ be a set of entity types — ATP, NADH, a Krebs cycle turn, a glucose molecule, a photon, a dollar, an authorized decision. Each carries a dimensional signature:

$$[e_i] = \prod_k U_k^{n_{ik}}$$

where $U_k$ are base units (J, s, mol, bit, ...). For example:

| Entity | Dimensional signature | Approximate value |
|---|---|---|
| ATP (hydrolysis) | J · mol⁻¹ | ~30.5 kJ/mol |
| NADH (oxidation) | J · mol⁻¹ | ~158 kJ/mol |
| Krebs turn | mol · s⁻¹ (cycle rate) | context-dependent |
| Photon (visible) | J | ~3.1 eV (~0.5 × 10⁻¹⁸ J) |

**Coupling as a unit-conversion tensor.** The coupling between entity layers $i$ and $j$ is the conversion ratio, mediated by a transducer:

$$T^i{}_j = \frac{\partial e_i}{\partial e_j}\bigg|_{\text{transducer}}$$

This is **transducer-dependent** — the same entity pair can have different coupling ratios depending on what converts them. For the Krebs→ATP step:

$$T^{\text{ATP}}_{\text{Krebs}} = \eta \cdot T^{\text{ATP,max}}_{\text{Krebs}} \approx \eta \cdot 10 \text{ ATP/turn}$$

where $\eta \in (0,1]$ is the coupling efficiency of the mitochondrion (affected by membrane potential, proton leak, uncoupling proteins). The transducer sets $\eta$; the entity types set the units.

**The full coupling chain is a tensor contraction:**

$$\mathcal{P}_{\text{effective}} = \underbrace{T^{\text{J}}_{\text{ATP}}}_{30.5 \text{ kJ/mol}} \cdot \underbrace{T^{\text{ATP}}_{\text{Krebs}}}_{10 \text{ ATP/turn}} \cdot \underbrace{T^{\text{Krebs}}_{\text{glucose}}}_{1 \text{ turn/acetyl-CoA}} \cdot \dot{n}_{\text{glucose}}$$

Each arrow in the chain is a coupling tensor element; the product gives causal power in Watts. Unit consistency is guaranteed by tracking dimensional signatures at every step.

**Block-diagonal structure for hierarchical systems.** When subsystems use non-overlapping entity vocabularies, their coupling blocks are zero — the full tensor factorizes:

$$T = \begin{pmatrix} T_{\text{glycolysis}} & T_{\text{gly→Krebs}} & 0 \\ 0 & T_{\text{Krebs}} & T_{\text{Krebs→ETC}} \\ 0 & 0 & T_{\text{ETC→ATP}} \end{pmatrix}$$

The diagonal blocks describe internal conversions; off-diagonal blocks are transducer couplings between layers. A zero off-diagonal block means causal decoupling — energy cannot propagate between those layers without an explicit transducer. To analyze one subsystem in isolation, restrict to its diagonal block and solve within that subspace.

**Higher-order couplings.** A second-order coupling describes how a coupling coefficient itself depends on entity state — i.e., regulation:

$$T^{\text{ATP}}_{\text{Krebs}} = f(\eta), \quad \eta = g\!\left(\frac{[\text{ADP}]}{[\text{ATP}]},\, \Delta\psi_m\right)$$

Here the ATP/ADP ratio and mitochondrial membrane potential $\Delta\psi_m$ modulate the coupling efficiency — the system encodes its own conversion factors as state-dependent tensors. This is what adaptive and regulatory systems do: they write higher-order terms into the coupling tensor to adjust energy routing in response to context.

> [!sidenote]
> **Entity types as basis vectors.** Treating entities as unit-carriers is equivalent to choosing a basis for the causal state space where each basis direction corresponds to a distinct entity type. The coupling tensor then maps between these basis directions — exactly as a change-of-basis matrix operates in linear algebra, but with physical units attached.

> [!example]
> **Worked examples:** Full coupling chains for muscle contraction (signal → torque), cellular energy (glucose → work), and kinesin transport are collected in [Coupling Chain Examples](./coupling_chains.md).

### Domain-specific operationalization

Bond strength $\sigma_b$ at the institutional level might be measured in:
- Dollars-to-sever (cost to break the relationship)
- Hours-of-disruption (time cost of bond failure)
- Bits-of-information-lost (knowledge destroyed when bond breaks)

All are legitimate energy-equivalents within their domain. The framework provides the grammar; the domain provides the units.

> [!sidenote]
> **The coupling tensor as conversion factor.** The exchange rate between domain units varies across state space, determined by the local coupling tensor $T^i{}_j$. A dollar converts to different amounts of state change depending on context — like how the electromagnetic coupling constant $\alpha$ runs with energy scale. See [Part 1, Section 5](./01_generalized_mechanics.md).

### The measurement frontier

At the physical level, units are clean: Joules, meters, seconds. At biological levels, they are operationalizable (ATP hydrolysis, metabolic watts). At institutional and cognitive levels, the "energy" of a causal bond depends on context — measurable but not universal.

> [!caveat]
> Dimensional cleanliness degrades as abstraction increases. This is honest: the difficulty is real, not hidden. The coupling tensor must be empirically determined for each domain.

---

## Connections to Other Frameworks

### Assembly Theory and the Cause-Plex

[Assembly theory (Cronin & Walker, 2023)](https://doi.org/10.1038/s41586-023-06600-9) measures one quantity: the minimum number of bond-formation operations to construct an object. The assembly index AI is static and constructive — it counts steps to *build*.

The causor framework extends assembly theory:
1. **From construction to maintenance.** AI tells you how hard to build; $C_{\text{maint}}$ tells you how hard to *keep*.
2. **From counting to dynamics.** AI counts steps; causors add how bonds evolve, degrade, and repair over time.
3. **From bonds to bond subtypes.** Assembly theory counts bond-formation operations without distinguishing what kind of bond is formed. The causor framework distinguishes $b_{\times}, b_{\varepsilon}, b_{\sigma}, b_s, b_c$ — and the *type* of bonds assembled determines the entity type that results.

**Prediction:** AI and durability should be correlated but not identical. Fragile complexity exists (poorly designed bridge). Durable simplicity exists (stone wall).

> [!sidenote]
> For how composites can outlive their constituents, see [The Persistence Reversal](./persistence_reversal.md). For cross-scale tracing, see [Cross-Level Tracing](./cross_level_tracing.md).

### The Cause-Plex

Assembly theory builds upward from atomic bond operations to complex molecular structures. The epimechanics analogue is the **cause-plex**: a hierarchical causal structure assembled from bond subtypes, composing into loops, composing into entities, composing into interacting ecologies of entities — each level rooted in energy and causation, each level inheriting its properties from the composition rules of the level below.

**Definition.** A cause-plex $\mathcal{C}$ of order $n$ is a causal structure assembled from $n$ bond subtype operations on a set of entities:

$$\mathcal{C}_n = \{b^{(1)}, b^{(2)}, \ldots, b^{(n)}\} \text{ with } b^{(k)} \in \{b_{\times}, b_{\varepsilon}, b_{\sigma}, b_s, b_c\}$$

where each bond operation acts on entities already assembled from the previous operations. The cause-plex index $\text{CI}(\mathcal{C})$ is the minimum number of bond subtype operations required to construct $\mathcal{C}$ from primitive entities (particles, monomers, or other irreducible units defined by the domain).

**How this extends assembly theory:**

| Property | Assembly theory | Cause-plex |
|---|---|---|
| Primitive operation | Bond formation (undifferentiated) | Bond subtype operation ($b_{\times}, b_{\varepsilon}, b_{\sigma}, b_s, b_c$) |
| Index | Assembly index AI (minimum steps to build) | Cause-plex index CI (minimum typed steps to build) |
| What it captures | Structural complexity | Causal complexity — what the structure *does* |
| Dynamic properties | None (static) | $\mathcal{M}$, $\rho_{\text{ac}}$, $C_{\text{maint}}$, $\Delta V$ emerge from composition |
| Self-sustaining? | Not represented | Auto-causality requires at least one closed loop of typed bonds |
| Energy grounding | Not explicit | Every $b_{\times}$ bond is an energy exchange; $b_{\varepsilon}$ bonds are energy-contingent |

**Why typed bonds matter.** Two structures with the same AI can have completely different causal properties depending on which bond subtypes were used:

- A crystal assembled from $n$ structural bonds ($b_{\sigma}^n$): high $\mathcal{M}$, deep $\Delta V$, zero $\rho_{\text{ac}}$, zero $C_{\text{maint}}$ — persistent but inert
- A metabolic cycle assembled from $n$ exchange + enable bonds ($b_{\times}^{n/2} \circ b_{\varepsilon}^{n/2}$, closed): moderate $\mathcal{M}$, moderate $\Delta V$, high $\rho_{\text{ac}}$, positive $C_{\text{maint}}$ — self-sustaining but requires fuel
- An institution assembled from $n$ signal + structural + enable bonds: high $\mathcal{M}$, deep $\Delta V$, moderate $\rho_{\text{ac}}$, moderate $C_{\text{maint}}$ — adaptive and persistent

Same $n$, completely different entity types. The cause-plex index CI carries more information than AI because it tracks *what kind* of causal structure is being built, not just *how much*.

**The energy grounding.** The cause-plex is rooted in energy in a precise sense: every exchange bond $b_{\times}$ in the assembly carries a dimensional signature — it converts entity-type $A$ to entity-type $B$ with a specific coupling tensor element $T^B_A$. The cause-plex is therefore not just a graph of bonds but a **typed dimensional structure**: each node is an entity-carrier with a unit signature, each edge is a bond subtype with a coupling coefficient. The entire structure is dimensionally consistent — energy is conserved (or explicitly dissipated) at every $b_{\times}$ bond.

This grounds the cause-plex in physics in a way assembly theory does not claim: the CI is not just a count of operations but a measure of how many energy-grounded causal steps were required to produce the structure's causal capacity.

**Auto-causality as a cause-plex property.** A cause-plex has $\rho_{\text{ac}} > 0$ if and only if it contains at least one closed loop of bonds that includes at least one $b_{\times}$ or $b_{\varepsilon}$ bond. A pure structural cause-plex ($b_{\sigma}$ only, no loops) has zero auto-causal density regardless of CI. Auto-causality is not a property of complexity per se — it is a property of the *loop structure* of the bond subtype composition.

This connects to assembly theory's central claim: high-AI objects require selection because they cannot arise by chance. The cause-plex framework adds: high-CI objects with $\rho_{\text{ac}} > 0$ require selection *and* sustained energy input — they are doubly improbable without a generative process.

$$\text{Requires selection} \iff \text{CI} > \text{CI}_{\text{random}}$$
$$\text{Requires energy input} \iff \exists \mathcal{L} \subset \mathcal{C} \text{ with } \rho_{\text{ac}}(\mathcal{L}) > 0$$

Living systems satisfy both. Crystals satisfy only the first. Flames satisfy only the second (low CI, high $\rho_{\text{ac}}$, short-lived). The cause-plex framework separates these two dimensions that assembly theory treats as one.

### Representational Efficiency Principle

The Representational Efficiency principle ([Part 5](./05_ontology_and_open_questions.md)) connects causors to optimal representation: the "right" description is one whose state variables correspond to natural clusters of bonds — mesoscale structures with their own dynamics.

> [!sidenote]
> This is exactly what coarse-graining does in physics: identify collective degrees of freedom (phonons, quasiparticles) that capture behavior more efficiently than tracking individual particles.

---

## Open Questions

### Q1: Are these the right mechanism-level causors and descriptors?

Current proposal: mechanism-level causors are **bond** and **loop** operators; quantities like strength, loop order, basin depth, entropy production, and repair are descriptors/observables. This split is still a hypothesis. The test: can these be measured independently in at least one domain, and do the derived quantities ($\mathcal{M}$, $C_{\text{maint}}$, robustness, etc.) computed from them match independent measurements? This is the causor-level version of the equivalence principle test from [Part 1, Section 2b](./01_generalized_mechanics.md).

### Q2: Are the mechanism-level causors domain-independent?

The examples above suggest they are — "causal bond" and "causal loop" map naturally to physical, institutional, and cognitive settings. But the *measure* on their descriptors (what units, what grain) is domain-specific. Can we define a domain-independent formalism for bond/loop causors while allowing descriptor calibration to vary by domain?

### Q3: How do mechanism-level causors and descriptors compose into tensors?

The coupling tensor $T^i{}_j$ describes cross-domain propagation. In causor terms: a force applied in domain $j$ propagates through bond/loop mechanisms that cross domain boundaries to produce a response in domain $i$. Descriptor fields (strength, latency, reliability, loop structure) weight this propagation. Can the tensor structure be *derived* from mechanism topology + descriptor fields, rather than measured as a separate quantity?

### Q4: What is the relationship between assembly index and stability?

Assembly theory predicts that high-AI objects require selection (they don't arise by chance). The causor framework adds that high-AI objects *may* have deep stability basins — but need not. Is there a formal relationship between construction complexity and thermodynamic stability? If so, it would connect assembly theory to the Representational Efficiency principle: complex structures that persist (high AI, deep basin) are the ones that correspond to efficient representations.

### Q5b: Does the Lorentzian metric fall out of the cause-plex?

If the cause-plex is the fundamental object, spacetime should emerge from it rather than be assumed as background. Three properties are required: causal partial ordering (holds by construction), causal invariance of spacelike-separated bond exchanges (open), and a finite minimum bond latency (physically motivated from QFT). If all three hold, the Lorentzian signature $(-,+,+,+)$ and Lorentz invariance follow in the continuum limit — by the same argument as Wolfram's ruliad derivation, but grounded in physical energy exchange rather than abstract rules. See working paper: [Cause-Plex and Spacetime](./causeplex_spacetime.md).

### Q6: Can we derive the Lagrangian from the causor structure?

The Lagrangian $L = \frac{1}{2}\mathcal{M}|\dot{X}|^2 - V(X)$ is currently a structural postulate. If $\mathcal{M}$ is composed of bonds with known strengths, and $V(X)$ is determined by the basin structure, can the Lagrangian be *derived* from the bond network? This would move the quadratic kinetic energy from postulate to consequence — the strongest possible grounding of the framework.

---

## Relationship to the Series

This document sits between the [series overview](./index.md) and [Part 1](./01_generalized_mechanics.md). It addresses the question that Part 1's grammar leaves open: what is the grammar *about*? The grammar describes how $\mathcal{M}$, $F$, $V$, $T^i{}_j$ relate to each other. This document asks what these quantities are *made of* — and proposes that the answer, like chemistry's periodic table, is a small set of causors that combine differently in different domains to produce the observed diversity of entities.

The grammar works regardless of whether the causor decomposition is correct — $F = \mathcal{M}\ddot{X}$ holds whether or not we know what $\mathcal{M}$ is made of, just as $F = ma$ held before understanding the substructure of mass. But the causor decomposition, if correct, would:

1. **Resolve the house problem** — explain why $\mathcal{M}$ and maintenance cost diverge
2. **Ground the equivalence principle** — provide a micro-level explanation for why different measurement approaches to $\mathcal{M}$ agree
3. **Enable the applications** — cost of ownership, robustness metrics, future cost of decisions all require distinguishing $\mathcal{M}$ from maintenance cost
4. **Connect to the Representational Efficiency principle** — explain *why* optimal representations have simple Lagrangian structure
5. **Potentially derive the Lagrangian** — moving the framework's strongest postulate from assumption to consequence

---

[→ Part 1: The Generalized Mechanics](./01_generalized_mechanics.md)
