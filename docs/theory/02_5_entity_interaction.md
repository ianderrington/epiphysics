---
title: 'Epimechanics — Part 2.5: Entity Interaction'
description: >-
  How entities sustain, strengthen, weaken, or dissolve each other through
  external coupling. Trade, dependency, parasitism, and predation analyzed as
  coupling chain relationships between auto-causal loops. The foundation for
  understanding complex multi-entity systems.
date: 2026-03-24T00:00:00.000Z
draft: false
author:
  name: Ian Derrington
series: Epimechanics
series_order: 2.5
categories:
  - Philosophy
  - Physics
  - Systems thinking
  - Economics
tags:
  - Epimechanics
  - Entity interaction
  - Auto-causal loops
  - Trade
  - Dependency
  - Coupling tensor
bullets:
  - >-
    An entity exists as long as its auto-causal loops are maintained — existence
    is a dynamic condition, not a static one
  - >-
    External coupling can strengthen, weaken, or dissolve another entity's loops
    — the sign of the effect depends on what is imported and what it does to
    internal bonds
  - >-
    Trade is the most common form of external coupling — beneficial when it adds
    loop inputs without replacing internal loops; dangerous when it atrophies
    the loops it substitutes
  - >-
    Dependency traps form when an entity's internal loops weaken faster than the
    value it gains from imports
  - >-
    The same interaction type can be mutualistic, commensal, parasitic, or
    predatory depending on timescale and state
coverImage:
  url: ./images/epimechanics_02_5_entity_interaction-1-1-1-1.png
  alt: >-
    Two luminous spiral vortices facing each other on a dark background, connected by flowing streams of light — one vortex gold, one cyan — the streams between them suggesting exchange, tension, and dependency, abstract and ethereal, no text or labels
---

> [!sidenote]
> **Layer note.** This document operates at the coarse-grained scale where time-translation symmetry holds and "energy" is a well-defined conserved quantity (Layer C in the [causor framework](./01_5_causors.md)). At this scale, "energy exchange" is the right description of bonds and coupling. The foundational primitive is the causal event; energy is its coarse-grained description where symmetry permits.

## Where We Are

[Part 2](./02_meta_entities.md) established that entities — including meta-entities like nations, firms, and religions — persist through auto-causal loops: closed causal structures where the output regenerates the conditions for the next iteration. Systemic coupling $\kappa_{\text{sys}}$ measures whether a sub-loop contributes to ($\kappa_{\text{sys}} > 0$), drains from ($\kappa_{\text{sys}} < 0$), or is decoupled from ($\kappa_{\text{sys}} = 0$) a containing entity.

But Part 2 treated entities largely in isolation. Real entities are never isolated. They exist in a **causal ecology** — a network of other entities whose loops they couple to, import from, export to, and sometimes compete with or consume.

This part asks: how does coupling between entities affect each entity's ability to sustain its own loops? When does external coupling help, and when does it harm?

---

## 1. Entity Existence as a Dynamic Condition

An entity exists as long as at least one auto-causal loop is maintained above its dissolution threshold. This is not a binary — it is a **survival condition** that must be continuously satisfied:

$$\text{Entity } E \text{ exists} \iff \exists \mathcal{L}_i : \rho_{\text{ac}}(\mathcal{L}_i) > 0 \text{ and } \dot{R}_{\text{repair}} \geq \dot{S}_{\text{int}}$$

In plain terms: at least one self-sustaining loop must be intact, and the repair rate must keep pace with internal entropy production. Fail either condition and the entity dissolves — not dramatically, but by the same process that dissolves a flame when the fuel runs out or a firm when revenue falls below operating cost.

### The Survival Threshold

Every entity has a **survival threshold** — a minimum causal power $\mathcal{P}_{\min}$ below which its core loops cannot be maintained:

$$\mathcal{P}_{\text{available}} \geq \mathcal{P}_{\min}$$

where $\mathcal{P}_{\text{available}}$ is the total causal power the entity can draw on (from internal loops + external inputs) and $\mathcal{P}_{\min}$ is the minimum required to repair bonds at the rate they degrade.

| Entity | Core loop | $\mathcal{P}_{\min}$ analogue |
|---|---|---|
| Cell | Metabolism (ATP production) | Basal metabolic rate |
| Organism | Respiration + repair | Resting energy expenditure |
| Firm | Revenue cycle | Fixed costs + depreciation |
| Nation-state | Tax base + governance loop | Minimum viable state budget |
| Language | Speaker reproduction | Minimum viable speech community |
| Belief system | Practitioner transmission | Minimum viable mimetic network |

**Key insight:** $\mathcal{P}_{\min}$ is not fixed — it depends on the entity's current bond structure. A larger, more complex entity typically has higher $\mathcal{P}_{\min}$. This means entities can become **maintenance-trapped**: growing increases complexity faster than it increases causal power, until the entity cannot sustain itself without continuous external input.

---

## 2. External Coupling: The Basic Mechanism

No entity is self-contained. Every entity imports entity-carriers from outside — food, energy, materials, information, personnel, capital — that feed its internal loops. This import relationship is **external coupling**:

$$\dot{\mathcal{P}}_{\text{external}} = T^{\text{loop}}_{\text{import}} \cdot \dot{n}_{\text{import}}$$

where $T^{\text{loop}}_{\text{import}}$ is the coupling tensor element converting imported entity-carriers into internal loop causal power, and $\dot{n}_{\text{import}}$ is the import rate.

The sign and magnitude of the effect on the receiving entity depends entirely on what the imported entity-carriers do to internal bonds:

### Three Effects of Imports on Internal Loops

**1. Additive input** — the import feeds a loop that already exists and would continue without it, but runs faster with it.

*Example:* Importing food supplements a cell's ATP production. The metabolic loop still functions; the import increases its rate. Cut the import and the loop slows but doesn't stop (up to a point).

$$\Delta \rho_{\text{ac}} > 0, \quad \frac{\partial \Delta \rho_{\text{ac}}}{\partial \dot{n}_{\text{import}}} > 0$$

**2. Substitutive input** — the import replaces what an internal loop was producing, allowing that loop to atrophy.

*Example:* Importing food cheaply enough that domestic agriculture collapses. The import still feeds the population — but the internal production loop is gone. If the import stops, the population cannot feed itself.

$$\Delta \rho_{\text{ac}} \approx 0 \text{ (short term)}, \quad \text{but } \frac{\partial \mathcal{L}_{\text{internal}}}{\partial t} < 0$$

**3. Bond-degrading input** — the import actively degrades internal bonds, increasing $\dot{S}_{\text{int}}$ and reducing $\dot{R}_{\text{repair}}$.

*Example:* Lead-contaminated products. The import enters the system but increases internal entropy production — degrading neural development, reducing cognitive capacity, weakening the very loops that process inputs. The entity is importing harm alongside utility.

$$\Delta \rho_{\text{ac}} < 0, \quad \dot{S}_{\text{int}} \uparrow$$

All three effects can operate simultaneously in different parts of the same entity. Trade in manufactured goods may be additive for consumers, substitutive for domestic manufacturers, and potentially bond-degrading if products contain harmful materials.

---

## 3. Interaction Types: A Taxonomy

External coupling has a sign relative to each entity involved. The taxonomy:

| Type | Effect on receiver | Effect on sender | Example |
|---|---|---|---|
| **Mutualistic** | Loops strengthened | Loops strengthened | Trade in complementary goods; symbiosis |
| **Commensal** | Loops strengthened | Neutral | Technology transfer; open-source software |
| **Parasitic** | Loops weakened | Loops strengthened | Extractive trade; addiction supply |
| **Competitive** | Loop gain reduced | Loop gain increased (zero-sum) | Resource competition |
| **Predatory** | Loops actively dissolved | Resources captured | Military conquest; hostile acquisition |
| **Mutualistic with lag** | Short-term drain, long-term strength | Short-term drain, long-term strength | R&D investment; education spending |

**Critical point:** the same interaction can change type depending on timescale, intensity, or state. Trade that begins mutualistic can become parasitic as dependency deepens. Addiction supply is mutualistic for the supplier and initially commensal for the receiver (pleasure without cost) before becoming parasitic as the receiver's loops degrade.

This is why the interaction type must be evaluated not just at $t$ but over a trajectory:

$$\int_0^T \kappa_{\text{sys, receiver}}(t') \, dt' \gtrless 0$$

If the integral is positive over the relevant horizon, the interaction net-strengthens the receiver. If negative, it net-weakens.

---

## 4. Trade as Loop-Coupling: Worked Examples

### 4a. Simple Beneficial Trade

Two entities $A$ and $B$, each with an internal production loop. $A$ produces X efficiently; $B$ produces Y efficiently. Each needs both X and Y to sustain its loops.

**Without trade:**

$$\mathcal{P}_A = \mathcal{P}_{X,A}^{\text{internal}} + \mathcal{P}_{Y,A}^{\text{internal}} - C_{Y,A}^{\text{inefficiency}}$$

Both entities spend resources producing their inefficient good, reducing overall loop strength.

**With trade:**

$$\mathcal{P}_A = \mathcal{P}_{X,A}^{\text{internal}} + T^{Y}_{\text{trade}} \cdot \mathcal{P}_{X,A}^{\text{export}} - C_{\text{transport}}$$

$A$ specializes in X, trades for Y. If the exchange is fair and transport costs low, both loops run stronger. This is the mutualistic case — comparative advantage as a coupling efficiency gain.

**The tensor element $T^Y_X$** (how much Y you get per unit X exported) is set by relative prices, bargaining power, and market structure. It is not fixed — it is a state-dependent coupling coefficient.

### 4b. The Dependency Trap

The dependency trap forms when substitutive imports accumulate faster than the entity can adapt.

**Stage 1: Import begins (mutualistic)**

Entity $A$ can produce good Y domestically but imports it cheaper from $B$. $\mathcal{P}_A$ rises — consumers benefit, resources freed.

**Stage 2: Internal loop atrophies (transition)**

Domestic Y-producers can't compete → exit the market. The internal Y-production loop weakens: workers retrain (slowly), capital depreciates, supply chains dissolve, institutional knowledge scatters.

$$\dot{\mathcal{L}}_{Y,A} < 0$$

**Stage 3: Dependency established (parasitic or fragile)**

The internal Y-loop is now below viability. If import from $B$ continues, $A$ is fine — but $A$'s loop maintenance now depends on $B$'s continued supply. $A$'s $\mathcal{P}_{\min}$ hasn't changed; what changed is that the internal loop providing it is gone.

$$T^{\mathcal{P}}_{\text{import}} > 0 \text{ but } \mathcal{L}_{Y,A} \approx 0$$

**Stage 4: Coupling disruption (crisis)**

$B$ cuts supply (political conflict, natural disaster, economic shock). $A$'s loop suddenly can't source Y. Restoring the internal loop takes years — capital, expertise, and supply chains must be rebuilt from near-zero.

**The dependency trap in causal terms:**

$$\Delta V_{A} \downarrow \text{ as } \mathcal{L}_{Y,A} \downarrow$$

The entity's stability basin depth decreases as its internal loops atrophy — it becomes more sensitive to external disruption, not less, even if average performance improved. The entity traded resilience for efficiency.

> [!sidenote]
> **This is not an argument against trade.** It is a description of what trade does to internal loop structure. The relevant question is: which internal loops are worth maintaining at higher cost for resilience, and which can safely be externalized? This is an empirical question about loop criticality, not a political one.

### 4c. Bond-Degrading Imports: The Lead Example

Lead-contaminated products (paint, pipes, food additives) are a canonical case of bond-degrading import. The import appears to add value (cheap paint, affordable plumbing) while simultaneously degrading the receiver's bond network.

**The coupling chain:**

$$\text{Lead exposure} \xrightarrow{T_1} \text{Neurotoxicity} \xrightarrow{T_2} \text{Cognitive impairment} \xrightarrow{T_3} \text{Reduced loop efficiency (individual)} \xrightarrow{T_4} \text{Reduced loop efficiency (collective)}$$

The entity-level effect: $\dot{S}_{\text{int}}$ rises (more internal bond degradation), $\dot{R}_{\text{repair}}$ falls (reduced capacity to repair), $C_{\text{maint}}$ increases. The entity gets cheaper paint but pays in degraded causal capacity.

The coupling is **delayed and distributed** — the bond degradation occurs years after the import, is distributed across many individuals, and is mediated by biological mechanisms that make the causal chain hard to attribute. This is why bond-degrading imports are often tolerated: the import's benefit is immediate and concentrated; the harm is delayed and diffuse.

**Generalization:** any import that:
- Enters the entity's bond network
- Increases internal entropy production
- Is causally separated from its harm by time, space, or mediation

...is potentially bond-degrading. Financial contagion, misinformation, addictive products, and environmental pollution all follow this pattern. The coupling tensor element $T^{\dot{S}_{\text{int}}}_{\text{import}}$ is the key quantity — how much internal entropy production does one unit of import generate?

### 4d. Self-Sufficiency and Resilience

An entity's **self-sufficiency** is the fraction of its $\mathcal{P}_{\min}$ that internal loops can supply without external coupling:

$$\sigma = \frac{\mathcal{P}_{\text{internal}}}{\mathcal{P}_{\min}}$$

- $\sigma = 1$: fully self-sufficient (no external loop inputs needed)
- $\sigma > 1$: surplus — can export without threatening internal loops
- $\sigma < 1$: dependent — requires external coupling to survive
- $\sigma \to 0$: near-dissolution — almost entirely dependent

**Resilience** is $\Delta V$ — how large an external disruption the entity can absorb without falling below $\mathcal{P}_{\min}$. Self-sufficiency and resilience are related but not identical:

- High $\sigma$, high $\Delta V$: robust entity (maintains loops internally, hard to disrupt)
- High $\sigma$, low $\Delta V$: self-sufficient but fragile (internal loops intact but barely viable)
- Low $\sigma$, high $\Delta V$: deeply integrated but resilient (dependent on trade but many diverse suppliers)
- Low $\sigma$, low $\Delta V$: vulnerable (dependent and easily disrupted)

The optimal strategy depends on the threat environment. In a stable, cooperative causal ecology: maximize specialization ($\sigma$ low, efficiency high). In an unstable or adversarial ecology: maintain critical internal loops ($\sigma$ high for key loops) even at efficiency cost.

---

## 5. Multi-Scale Loop Structure: From Cell to Civilization

The same analysis applies at every scale. Each level has its own loops, its own $\mathcal{P}_{\min}$, and its own external coupling structure. The levels nest:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#EAF2FF', 'primaryTextColor': '#0F172A', 'primaryBorderColor': '#7AA2E3', 'lineColor': '#334155', 'fontSize': '13px'}}}%%
flowchart TD
  subgraph Civilization
    direction TB
    subgraph Nation["Nation-State"]
      direction TB
      subgraph Economy["Economic Loop"]
        direction TB
        subgraph Firm["Firm"]
          direction TB
          subgraph Human["Human"]
            direction TB
            Cell["🔬 Cell\n(ATP loop)"]
          end
          Human -->|"labor"| Firm
        end
        Firm -->|"goods/revenue"| Economy
      end
      Economy -->|"tax/services"| Nation
    end
    Nation -->|"trade/diplomacy"| Civilization
  end

  External["🌍 External\nEntities"] -.->|"imports"| Nation
  Nation -.->|"exports"| External
```

Each nested level:
- Has its own auto-causal loops
- Has its own $\mathcal{P}_{\min}$
- Imports from and exports to the level above and below
- Can be strengthened or weakened by coupling at any level

**Cross-scale coupling:** An import that is beneficial at one scale can be harmful at another. Cheap imported goods benefit consumers (individual scale, $\sigma$ maintained) while atrophying domestic production loops (firm scale, $\sigma$ falls) while increasing trade deficit (national scale, $\Delta V$ falls). The coupling tensor must be evaluated at all relevant scales simultaneously.

---

## 6. Structural Vulnerability and Intelligent Destruction

The predatory coupling analysis above assumes dissolution requires sustained force exceeding the receiver's $\Delta V$. This is wrong in an important class of cases — and the exception is more practically significant than the rule.

### Keystone Bonds

Not all bonds in an entity contribute equally to its auto-causal loops. Some bonds are **load-bearing** — their integrity is required for the loop to function. Remove them and the loop collapses. Others are redundant or peripheral — their removal degrades performance but doesn't stop the loop.

Define the **keystone index** $\kappa_b$ of bond $b$:

$$\kappa_b = \frac{\Delta \rho_{\text{ac}}}{\Delta \sigma_b}$$

How much does auto-causal density fall per unit reduction in this bond's strength? A bond with high $\kappa_b$ is a keystone — small reductions cause large drops in loop integrity. A bond with low $\kappa_b$ is peripheral.

Most entities have a **Pareto structure** of bond criticality: a small number of keystone bonds account for most of the entity's structural integrity, while the majority of bonds are redundant or load-sharing. This is why biological systems tolerate most mutations (peripheral bonds) but a few mutations are lethal (keystone bonds).

**The SNP example.** A single nucleotide polymorphism (SNP) is a one-letter change in a genome of ~3 billion letters — a perturbation of energy cost near zero. Most SNPs are neutral or weakly deleterious (peripheral bonds). But some hit keystone positions:

- A SNP in the p53 tumor suppressor gene → loss of apoptosis regulation → cancer
- A SNP in the sickle cell hemoglobin gene → malformed red blood cells → systemic oxygen delivery failure
- A SNP in BRCA1/2 → loss of DNA repair → cascade genomic instability

The perturbation energy is minimal. The dissolution effect is organism-level. The difference is **where** the perturbation lands.

### Loop Amplification: The Entity Dissolves Itself

The SNP case reveals something deeper: **the entity's own auto-causal loops amplify the perturbation**. A SNP is copied into every daughter cell by the cell's own replication machinery. The loop that normally sustains the organism (cell division) becomes the mechanism of propagation of the damaging change. The attacker supplies the initial perturbation; the entity supplies the energy for its own dissolution.

This is the general condition for **intelligent destruction**:

$$\mathcal{P}_{\text{required}} = \epsilon_{\text{keystone}} \ll \frac{\Delta V}{\tau_{\text{dissolution}}}$$

when the perturbation:
1. **Enters at a keystone bond** — high $\kappa_b$, so small $\Delta \sigma_b$ causes large $\Delta \rho_{\text{ac}}$
2. **Is propagated by the entity's own loops** — the auto-causal machinery copies and amplifies the perturbation rather than correcting it
3. **Evades the entity's repair mechanisms** — $\dot{R}_{\text{repair}}$ fails to detect or correct it

When all three conditions hold, the required external energy approaches zero. The entity does the work of its own dissolution.

### The Infection Condition

For a perturbation to propagate through an entity's loops — to "infect" the larger structure — it must satisfy an $R_0 > 1$ condition (borrowing from epidemiology):

$$R_0 = T^{\text{propagation}}_{\text{perturbation}} \cdot T^{\text{evasion}}_{\text{repair}} > 1$$

- $T^{\text{propagation}}_{\text{perturbation}}$: how many copies does one instance of the perturbation generate per loop cycle?
- $T^{\text{evasion}}_{\text{repair}}$: what fraction evades correction?

If $R_0 > 1$, the perturbation spreads exponentially through the entity's loop structure. If $R_0 < 1$, the repair mechanisms clear it faster than it propagates and the entity survives.

**The infection condition generalizes across all entity types:**

| Entity | Perturbation | Loop that amplifies it | Repair mechanism | $R_0 > 1$ condition |
|---|---|---|---|---|
| Organism | SNP / prion | Cell division / protein folding | DNA repair, proteasome | Mutation rate > repair rate in critical gene |
| Organism | Virus | Host cell replication | Immune system | Viral replication rate > immune clearance |
| Institution | Corrupt norm | Hiring / promotion loop | Culture / oversight | Corrupt actors promoted faster than removed |
| Information network | False belief | Social sharing loop | Fact-checking / correction | Sharing rate > correction rate |
| Software system | Malicious dependency | Build / deployment loop | Code review / scanning | Propagation across dependents before detection |
| Language | Semantic shift | Imitation / learning loop | Prescriptive norm enforcement | New usage spreads faster than norms correct |

**Prions** are the most striking biological example: a misfolded protein that induces correct proteins to misfold on contact. No genetic change needed — just a structural template that propagates through the entity's own protein-folding machinery. $R_0 \gg 1$ in neural tissue; no known repair mechanism; fatal in all cases. The entity's own metabolic loops supply the energy.

### Intelligent Destruction: Minimal Energy, Maximal Effect

The implication for adversarial interaction is stark: **dissolution does not require matching the entity's full causal power**. It requires finding the keystone and satisfying the infection condition.

This reframes the predatory coupling analysis completely:

$$\mathcal{P}_{\text{predatory, naive}} = \frac{\Delta V_{\text{receiver}}}{\tau} \quad \text{(brute force — overpower the basin)}$$

$$\mathcal{P}_{\text{predatory, intelligent}} = \epsilon_{\text{keystone}} \quad \text{(targeted — enter the keystone, let the entity dissolve itself)}$$

The ratio can be enormous. A nuclear weapon can destroy a city through brute force; a targeted disinformation campaign aimed at a society's epistemic keystone (trust in institutions, shared factual baseline) can destabilize it with negligible energy expenditure if $R_0 > 1$.

**Historical examples of keystone targeting:**

| Target entity | Keystone attacked | Mechanism | $R_0$ condition |
|---|---|---|---|
| Organism | Immune system (HIV) | Disables repair mechanism directly | CD4+ T-cell depletion → all other infections propagate |
| Colonial economies | Indigenous governance loop | Delegitimization + replacement | Destroyed institutional repair before alternatives could form |
| Financial system (2008) | Credit rating integrity | Corrupted the trust bond underlying all derivative pricing | Contagion spread through interconnected balance sheets |
| Soviet Union | Legitimacy narrative | Internal contradiction between stated values and lived experience | Narrative collapse propagated through all three substrates simultaneously |
| Firm | Key personnel (single founder) | Dependency on irreplaceable human bond | No succession loop → dissolution on departure |

### Causal Attack Surface Density

Here is the uncomfortable symmetry: **the same property that makes an entity powerful makes it susceptible to intelligent destruction.**

Auto-causal density $\rho_{\text{ac}}$ measures how strongly an entity sustains itself — how tightly its loops regenerate their own conditions. High $\rho_{\text{ac}}$ means:
- Powerful self-maintenance
- High resistance to brute-force dissolution
- Rapid state-change amplification

But those same loops, if a keystone perturbation enters them, become **amplification engines for dissolution**. The SNP doesn't dissolve the cell directly — cell division does, copying the error into every daughter. The more auto-causal the replication loop, the faster the error propagates.

Define the **causal attack surface density** $\rho_{\text{attack}}$:

$$\rho_{\text{attack}}(\partial E) = \sum_{b \in \partial E} \kappa_b \cdot \rho_{\text{ac}}(\mathcal{L}_b)$$

where the sum is over keystone bonds $b$ accessible at the entity's boundary $\partial E$, $\kappa_b$ is the keystone index of each bond, and $\rho_{\text{ac}}(\mathcal{L}_b)$ is the auto-causal density of the loop that bond belongs to.

**$\rho_{\text{attack}}$ is high when:**
- Keystone bonds are accessible from outside (low protection at boundary)
- Those keystone bonds belong to high-$\rho_{\text{ac}}$ loops (powerful amplification if entered)

For a SNP in a replication gene: $\kappa_b$ is enormous (loss-of-function in DNA repair collapses genome integrity), and $\rho_{\text{ac}}(\mathcal{L}_{\text{replication}})$ is near-maximum (replication is the most auto-causal loop in biology — the loop that copies the loop). The product is through the roof.

**The fundamental tension:**

| Entity property | Effect on strength | Effect on attack surface |
|---|---|---|
| High $\rho_{\text{ac}}$ | ↑ Self-sustaining power | ↑ Amplification of keystone perturbations |
| Tight internal coupling | ↑ Coordination efficiency | ↑ Propagation speed of perturbations |
| Complex loop structure | ↑ Functional capability | ↑ Number of potential keystones |
| Deep $\Delta V$ | ↑ Brute-force resistance | ↓ Attack surface (harder to enter) |

The first three rows are in direct tension: the properties that make entities capable also make them more susceptible to intelligent destruction. Only $\Delta V$ (basin depth, boundary protection) provides resistance to both attack modes simultaneously.

This is not a paradox — it is the **structural cost of auto-causality**. An entity that sustains itself through powerful loops necessarily hands those loops over as amplifiers to anything that enters at a keystone. The cell's replication fidelity is the genome's protection; the cell's replication power is the genome's vulnerability. You cannot have high $\rho_{\text{ac}}$ for free.

**The SNP in context.** A human genome has ~3 billion base pairs. The vast majority of positions are low-$\kappa_b$ (peripheral). A small number — tumor suppressors, DNA repair genes, developmental regulators — have $\kappa_b \gg 1$. The genome's attack surface density is concentrated in these positions, not distributed uniformly. The high overall $\rho_{\text{ac}}$ of the organism means that once a high-$\kappa_b$ position is perturbed, the organism's own metabolic loops propagate the effect — cancer is the organism's auto-causal machinery running without its keystone governor.

**Generalizes across scales:**

| Entity | High-$\rho_{\text{ac}}$ loop exploited | Keystone attacked | Attack surface density |
|---|---|---|---|
| Cell | DNA replication | Tumor suppressor gene | Extreme |
| Organism | Immune amplification | T-cell receptor (HIV) | Extreme |
| Firm | Hiring/promotion loop | Cultural integrity norm | High |
| Financial system | Credit propagation | Rating agency trust | High |
| Society | Information sharing | Epistemic common ground | High |
| Software | Dependency resolution | Trusted package (supply chain) | High |

In every case: the entity's most auto-causal loop becomes the propagation mechanism. High $\rho_{\text{ac}}$ at the loop level → high $\rho_{\text{attack}}$ at the boundary level, given accessible keystones.

> [!sidenote]
> **This feeds directly into the auto-causal density discussions in [Part 1.5](./01_5_causors.md) and [Part 2](./02_meta_entities.md).** The $\rho_{\text{ac}}$ quantity defined there is simultaneously the measure of entity robustness (against brute force) and entity vulnerability (to intelligent keystone targeting). A complete entity characterization requires both $\rho_{\text{ac}}$ (loop strength) and $\rho_{\text{attack}}$ (loop-amplified vulnerability). They are not independent — they are two faces of the same structural property.

### The Defensive Implication: Structural Robustness

An entity's true resilience is not its average $\Delta V$ but its **worst-case keystone vulnerability**:

$$\Delta V_{\text{effective}} = \min_b \left( \frac{\Delta \sigma_b^{\text{critical}}}{\kappa_b} \right)$$

The minimum over all bonds of: how much can this bond be degraded before the loop fails, divided by its keystone index. An entity can have enormous average bond strength but be fragile to a targeted attack on a single high-$\kappa_b$ bond.

**Structural robustness design principles:**

1. **Identify keystones** — map which bonds have high $\kappa_b$; don't assume it's obvious from size or apparent importance
2. **Redundancy at keystones** — add parallel bonds for high-$\kappa_b$ positions; reduce $\kappa_b$ by distributing the load
3. **Strengthen repair at keystones** — increase $\dot{R}_{\text{repair}}$ specifically for keystone positions; this directly reduces effective $R_0$
4. **Minimize single-loop dependency** — if one loop's failure can dissolve the entity, the entity has a structural keystone regardless of how strong that loop is
5. **Diversity of loop architecture** — multiple independent loop pathways for critical functions; analogous to biological redundancy (two kidneys, bilateral neural pathways)

> [!sidenote]
> **Antifragility** (Taleb) is the special case where $\kappa_b$ is negative for certain bond classes — stress actually strengthens the keystone bond. Immune memory, muscle hypertrophy, and psychological post-traumatic growth are biological antifragile mechanisms. In all cases, the loop that normally propagates damage instead converts damage into bond-strengthening. This is $R_0 < 0$ for the damaging perturbation — each propagation cycle reduces rather than increases the perturbation's effect.

---

## 7. When Interaction Becomes Predatory

Predatory interaction is the extreme end of the parasitic spectrum: the sender actively degrades the receiver's loops, not as a side effect but as the primary mechanism of value extraction.

The predatory coupling chain:

$$\text{Predatory force} \xrightarrow{T_1} \text{Bond disruption in receiver} \xrightarrow{T_2} \Delta \mathcal{M}_{\text{receiver}} < 0 \xrightarrow{T_3} \rho_{\text{ac,receiver}} \downarrow \xrightarrow{T_4} \text{Resources freed} \xrightarrow{T_5} \text{Captured by sender}$$

The receiver's loop dissolution is the mechanism by which the sender gains. This is structurally different from competition (where both entities maintain their loops and compete for the same input) and from parasitism (where the sender benefits from the receiver's continued existence). Predation aims at the receiver's loop dissolution.

**The energy cost of predation:** Dissolving another entity's loops requires causal power. The sender must exert force exceeding the receiver's $\Delta V$:

$$\mathcal{P}_{\text{predatory}} > \frac{\Delta V_{\text{receiver}}}{\tau_{\text{dissolution}}}$$

This is why predation is costly — it requires sustained force application above the receiver's stability threshold. Entities with deep $\Delta V$ are expensive to predete; entities with shallow $\Delta V$ are cheap to dissolve. Arms races are competitions to raise one's own $\Delta V$ and lower the opponent's — directly targeting this inequality.

> [!sidenote]
> **Conflict systems** — war, economic warfare, information warfare — are multi-entity predatory interactions with additional complexity: multiple coupled auto-causal loops, external actor coupling, and feedback between harm and loop regeneration. These are addressed in [Coupling Chains: Conflict Systems](./coupling_chains_conflict.md), built on this foundation.

---

## 7. Interaction Dynamics: How Relationships Evolve

Interaction types are not fixed — they evolve as entities and their coupling structure change. Three common trajectories:

### 7a. Mutualism → Dependency

Two entities begin trading. Initial coupling is mutualistic — both loops strengthen. As trade deepens, internal loops begin to atrophy (substitutive effect). If not managed, one or both entities slide toward dependency. The relationship still looks mutualistic (both benefit from continued trade) but has become fragile — loop dissolution in either entity threatens both.

*Examples:* US-China manufacturing dependency; European energy dependency on Russian gas; pharmaceutical global supply chain concentration.

### 7b. Parasitism → Mutualism

An initially parasitic relationship can become mutualistic if the parasite integrates into the host's loop structure — providing something the host loop now needs, creating positive $\kappa_{\text{sys}}$.

*Examples:* Mitochondria (see [Part 2](./02_meta_entities.md)); domestic industries initially protected by the state that later become competitive exporters; immigrant communities initially a resource drain that later become productive contributors.

### 7c. Mutualism → Predation

When one entity grows strong enough relative to the other, mutualistic coupling can be replaced by predatory coupling — the stronger entity no longer needs the weaker one's loops and begins extracting from them directly.

*Examples:* Colonial trade relationships; platform companies that initially helped merchants and later extracted from them; supply chain monopsony.

The key variable is **bargaining power** — which entity sets the tensor element $T^i_j$ (the terms of trade). When bargaining power is equal, coupling stays mutualistic. When it diverges, the stronger entity can shift the tensor element in its favor, extracting value without proportional return.

---

## 8. Open Questions

1. **Can $\sigma$ (self-sufficiency) be measured empirically?** For physical entities (cells, organisms), metabolic self-sufficiency is measurable. For nations, input-output tables and trade dependency metrics exist. Can these be formalized as $\sigma$ measures consistent across scales?

2. **What is the critical $\sigma$ for resilience?** Is there a universal threshold below which entities become too dependency-fragile to survive disruption? Or is the threshold domain- and ecology-specific?

3. **How do interaction types shift across timescales?** The trajectory analysis ($\int_0^T \kappa_{\text{sys}}(t') dt'$) requires knowing how $\kappa_{\text{sys}}(t)$ evolves. Can coupling dynamics be modeled from entity-level loop structure and environmental state?

4. **Can bond-degrading imports be detected before the harm manifests?** The delayed, distributed nature of bond-degrading imports makes them hard to identify causally. Are there leading indicators — early bond degradation signals — that precede population-level harm?

5. **What governs the transition from parasitism to predation?** Is it purely a matter of relative power? Are there structural features of the coupling relationship that predict escalation?

---

[← Part 2: Meta-Entities](./02_meta_entities.md) | [→ Part 3: Intelligence, Consciousness, and Agency](./03_intelligence_consciousness_agency.md)

*For coupling chain worked examples across biology, economics, and society: [Coupling Chain Examples](./coupling_chains.md)*
*For conflict as predatory multi-entity interaction: [Coupling Chains: Conflict Systems](./coupling_chains_conflict.md)*
