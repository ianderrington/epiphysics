---
title: "Epimechanics Application: The Future Cost of Decisions"
description: >-
  Every decision creates an entity — a commitment — with ongoing entropy production. The true cost
  of a decision is assembly cost plus the integral of maintenance cost over expected duration. Buying
  a house, having a child, taking a job analyzed as entity creation with thermodynamic consequences.
date: 2026-03-18T00:00:00.000Z
draft: true
author:
  name: "Ian Derrington"
contentType: article
mediaTypes:
  - text
series: "Epimechanics"
categories:
  - Systems thinking
  - Decision making
  - Everyday life
tags:
  - Decisions
  - Entropy
  - Commitment
  - Coupling tensor
  - Epimechanics
bullets:
  - Every decision creates an entity (a commitment) with ongoing entropy production
  - "True cost = assembly cost + integral of maintenance cost over expected duration"
  - "Buying a house, having a child, taking a job: each analyzed as entity creation with distinct thermodynamic signatures"
  - "The coupling tensor T^i_j explains how stress in one commitment propagates into others"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
---

## 0. What This Document Is

This is an **application** of the [Epimechanics framework](../index.md) to decision-making. The central claim: every significant decision creates an entity — a commitment — that has its own generalized mass $\mathcal{M}$, entropy production rate $\dot{S}_{\text{int}}$, stability basin $\Delta V$, and coupling to other entities via the tensor $T^i{}_j$. Sections are tagged: **relabeling** (renaming known concepts), **structural** (predictions from the grammar), or **novel** (predictions that neither decision theory nor physics alone would generate).

---

## 1. Decisions as Entity Creation

**Tag: structural.**

When you make a significant decision — buying a house, having a child, taking a job, starting a business, adopting a pet, committing to a relationship — you are creating an entity. Not metaphorically. You are establishing a structured configuration of causal bonds (financial obligations, time commitments, emotional connections, legal contracts) that:

1. **Resists change** (has generalized mass $\mathcal{M}$). A mortgage is hard to undo. A child cannot be un-had. A job creates habits, routines, and dependencies that resist alteration.

2. **Produces entropy** (has $\dot{S}_{\text{int}} > 0$). The house degrades, the child needs constant care, the job generates administrative burden. Every commitment generates ongoing disorder that must be managed.

3. **Sits in a stability basin** (has $\Delta V$). Some commitments are easy to exit (a month-to-month apartment lease: shallow $\Delta V$). Others are very hard to exit (a marriage with children: deep $\Delta V$, requiring enormous energy to leave).

4. **Couples to other commitments** (has off-diagonal $T^i{}_j$). A job constrains where you can live. Where you live constrains which schools your children attend. Your children's needs constrain which jobs you can take. The coupling is not one-way; it is a web.

The Epimechanics contribution is in making these dynamics *quantitative* and, more importantly, in identifying the specific quantity that most people underestimate.

---

## 2. The True Cost Formula

**Tag: novel.**

**Claim.** The true cost of a decision is:

$$C_{\text{true}} = C_{\text{assembly}} + \int_0^{T_{\text{duration}}} \left( \dot{S}_{\text{int}}(t) - \dot{R}_{\text{repair}}(t) \right) dt$$

where:

- $C_{\text{assembly}}$ is the upfront cost: the down payment, the wedding, the job search, the adoption process
- $\dot{S}_{\text{int}}(t)$ is the entropy production rate at time $t$: how much disorder the commitment generates per unit time
- $\dot{R}_{\text{repair}}(t)$ is the repair rate at time $t$: how much of that disorder the commitment self-corrects
- $T_{\text{duration}}$ is the expected duration of the commitment

**Why this is novel:** Decision theory and behavioral economics document that people underestimate ongoing costs — this is well-known under names like "total cost of ownership," "planning fallacy," and "sunk cost bias." What the Epimechanics framework adds is *why* the underestimation is systematic and *which* costs are most likely to be missed:

1. People estimate $C_{\text{assembly}}$ reasonably well (it is visible, immediate, and often quoted by sellers).
2. People dramatically underestimate $\int \dot{S}_{\text{int}} \, dt$ because entropy production is invisible, gradual, and non-salient until it accumulates past a threshold.
3. People almost never account for the coupling terms — how a new commitment increases $\dot{S}_{\text{int}}$ of existing commitments through the off-diagonal elements of $T^i{}_j$.

The framework predicts not just that costs are underestimated, but *which component* is most severely underestimated and *why*: the integral of maintenance cost, especially the coupling-mediated cross-terms.

---

## 3. Three Decisions Analyzed

### 3.1 Buying a House

**Tag: structural.**

A house is a physical entity with well-characterized thermodynamic properties:

| Quantity | Meaning | Typical value |
|---|---|---|
| $C_{\text{assembly}}$ | Purchase price + closing costs + moving costs + furnishing | Large, one-time, highly visible |
| $\dot{S}_{\text{int}}$ | Entropy production: roof degradation, plumbing corrosion, paint fading, appliance wear, landscaping overgrowth, HVAC filter clogging | Continuous, material-dependent (see [Entropy in the Household](./entropy_in_the_household.md)) |
| $\dot{R}_{\text{repair}}$ | Self-repair rate: zero. Houses do not fix themselves. All repair is external. | 0 |
| $\Delta V$ | Stability basin: depends on construction quality. Well-built = deep basin, low maintenance. Cheap = shallow basin, high maintenance. | Material-dependent |
| $T_{\text{duration}}$ | Expected ownership duration | 7-30 years typically |

The true cost is therefore:

$$C_{\text{true,house}} = C_{\text{purchase}} + \int_0^{T_{\text{own}}} \dot{S}_{\text{int}}(t) \, dt$$

Since $\dot{R}_{\text{repair}} = 0$ for a house, the entire entropy production must be absorbed by the owner as maintenance cost. And $\dot{S}_{\text{int}}(t)$ is not constant — it *increases* over time as the structure ages, materials degrade, and shallow-basin components (cheap fixtures, worn seals) begin cascading failures through the coupling tensor.

**Specific prediction:** The maintenance cost curve for a house is *convex* (accelerating), not linear. Early years have low maintenance; later years have rapidly increasing maintenance. The inflection point occurs when accumulated entropy in one subsystem (e.g., roof) propagates through coupling terms to accelerate entropy production in connected subsystems (e.g., ceiling, insulation, electrical). This is the "everything breaks at once" phenomenon that homeowners report — it is not coincidence but cascade failure mediated by the coupling tensor.

### 3.2 Having a Child

**Tag: structural.**

A child is a far-from-equilibrium entity with extremely high entropy production rate. Unlike a house, a child has nonzero $\dot{R}_{\text{repair}}$ — children are self-repairing biological systems. But for approximately 18 years, $\dot{S}_{\text{int}} > \dot{R}_{\text{repair}}$, meaning continuous external energy input (parental care) is required.

| Quantity | Meaning | Characteristic |
|---|---|---|
| $C_{\text{assembly}}$ | Pregnancy/adoption costs, initial setup | Moderate, visible |
| $\dot{S}_{\text{int}}$ | Entropy production: physical needs (food, shelter, clothing, medical), cognitive needs (education, stimulation), emotional needs (attention, security, guidance) | Very high — far-from-equilibrium systems produce entropy at rates proportional to their metabolic rate and developmental velocity |
| $\dot{R}_{\text{repair}}$ | Self-repair: the child's own homeostatic and developmental systems | Nonzero but < $\dot{S}_{\text{int}}$ for ~18 years; gradually increases toward self-sufficiency |
| $\Delta V$ | Stability basin: a child's physical and psychological resilience | Moderate and increasing with age |
| $T_{\text{duration}}$ | Commitment duration | ~18 years of primary responsibility; lifelong emotional coupling |

The true cost curve for a child has a distinctive shape:

$$C_{\text{maint}}(t) = \dot{S}_{\text{int}}(t) - \dot{R}_{\text{repair}}(t)$$

This starts very high (infants have maximal $\dot{S}_{\text{int}}$ relative to $\dot{R}_{\text{repair}}$), decreases over childhood as the child develops self-regulation, and approaches zero around age 18 when $\dot{R}_{\text{repair}} \approx \dot{S}_{\text{int}}$ (self-sufficiency). It does not reach zero for most parents — the emotional coupling persists, and the child-entity continues to draw on parental resources, though at decreasing rate.

**What the framework adds beyond common sense:** The *shape* of the cost curve is predicted by the framework's structure, not just the existence of ongoing costs. Specifically, the framework predicts that the cost curve's slope is determined by the ratio $d(\dot{R}_{\text{repair}})/dt$ / $d(\dot{S}_{\text{int}})/dt$ — the rate at which self-repair capacity grows relative to entropy production. Interventions that accelerate self-repair development (teaching independence, building resilience) steepen the cost-reduction curve. Interventions that increase entropy production (overscheduling, excessive stimulation) flatten it.

### 3.3 Taking a Job

**Tag: structural, partially novel.**

A job creates a coupling between your state and the organization's state, mediated by the coupling tensor $T^i{}_j$. This is the most interesting case for the framework because the coupling effects are the dominant cost, not the entropy production of the job itself.

| Quantity | Meaning | Characteristic |
|---|---|---|
| $C_{\text{assembly}}$ | Job search cost, onboarding, relocation, wardrobe, learning curve | Moderate, mostly visible |
| $\dot{S}_{\text{int}}$ | Direct entropy: administrative overhead, commute wear, schedule constraints | Moderate |
| $T^i{}_j$ | **Coupling tensor**: how the organization's state propagates into your state | The dominant cost |

The coupling tensor for a job has specific structure:

$$T = \begin{pmatrix} T^{\text{econ}}{}_{\text{econ}} & T^{\text{econ}}{}_{\text{psych}} & T^{\text{econ}}{}_{\text{health}} \\ T^{\text{psych}}{}_{\text{econ}} & T^{\text{psych}}{}_{\text{psych}} & T^{\text{psych}}{}_{\text{health}} \\ T^{\text{health}}{}_{\text{econ}} & T^{\text{health}}{}_{\text{psych}} & T^{\text{health}}{}_{\text{health}} \end{pmatrix}$$

The diagonal elements ($T^{\text{econ}}{}_{\text{econ}}$, etc.) describe how stress in a domain affects itself — economic stress from the job affects your economic state, psychological stress affects your psychological state. These are straightforward.

The **off-diagonal elements** are where the framework generates insight:

- $T^{\text{psych}}{}_{\text{econ}}$: Economic stress at work (layoff risk, pay cuts, budget pressure) propagates into psychological stress at home (anxiety, sleep disruption, relationship strain). This is the "bringing work home" effect.

- $T^{\text{health}}{}_{\text{psych}}$: Psychological stress from work propagates into health outcomes (elevated cortisol, cardiovascular risk, immune suppression). This is medically well-documented but rarely quantified as a *cost of the job*.

- $T^{\text{econ}}{}_{\text{health}}$: Health problems from work stress create economic costs (medical bills, reduced productivity, disability risk). This is the second-order effect that converts psychological coupling into financial impact.

**The structural prediction:** The true cost of a job is not salary minus taxes. It is:

$$C_{\text{true,job}} = C_{\text{assembly}} + \int_0^{T_{\text{tenure}}} \left[ \dot{S}_{\text{direct}}(t) + \sum_{i \neq j} T^i{}_j \cdot \sigma_j(t) \right] dt$$

where $\sigma_j(t)$ is the stress in domain $j$ at time $t$, and the sum over off-diagonal coupling terms captures the cascade effects. The off-diagonal terms are typically *larger* than the direct entropy production — the stress propagation costs more than the direct time and effort of the job itself.

---

## 4. The Commitment Portfolio

**Tag: novel.**

At any given time, you carry a portfolio of commitments — a house, a job, a relationship, children, hobbies, obligations, subscriptions, possessions. Each is an entity with its own $\dot{S}_{\text{int}}$ and coupling to the others. The total maintenance burden is:

$$\dot{S}_{\text{total}} = \sum_k \dot{S}_k + \sum_{k < l} T^k{}_l \cdot \sigma_l$$

This is the same superlinear scaling identified in [Entropy in the Household](./entropy_in_the_household.md), but applied to the full commitment portfolio. The coupling terms create cross-commitment interactions:

- Your job's stress couples into your parenting quality ($T^{\text{parenting}}{}_{\text{job}}$).
- Your parenting demands constrain your job performance ($T^{\text{job}}{}_{\text{parenting}}$).
- Your house's maintenance demands compete with both for time and money ($T^{\text{house}}{}_{\text{time}}$, $T^{\text{house}}{}_{\text{money}}$).
- Your health mediates all of the above ($T^{\text{everything}}{}_{\text{health}}$).

**Novel prediction:** The marginal cost of a new commitment is NOT its individual $\dot{S}_{\text{int}}$ plus $C_{\text{assembly}}$. It is its individual cost PLUS the sum of new coupling terms it introduces with all existing commitments:

$$C_{\text{marginal}}(N+1) = C_{\text{assembly},N+1} + \dot{S}_{N+1} \cdot T_{\text{duration}} + \sum_{k=1}^{N} \left( T^{N+1}{}_{k} + T^{k}{}_{N+1} \right) \cdot \bar{\sigma}_k \cdot T_{\text{duration}}$$

where $\bar{\sigma}_k$ is the average stress in commitment $k$ over the commitment duration.

**This explains the "overwhelm" transition.** There is a critical portfolio size $N^*$ beyond which the coupling terms dominate and the marginal cost of any new commitment exceeds its apparent cost by a large factor. People who report feeling "overwhelmed" despite no single commitment being unmanageable are experiencing the superlinear coupling effect: each commitment is fine in isolation, but the coupling between them creates a total burden that exceeds the sum of the parts.

---

## 5. Exit Cost and Basin Depth

**Tag: structural.**

The stability basin depth $\Delta V$ of a commitment determines the exit cost — how much energy is required to dissolve the entity:

| Commitment | Basin depth $\Delta V$ | Exit cost character |
|---|---|---|
| Month-to-month apartment lease | Shallow | Low: give 30-day notice |
| Mortgage | Moderate | Moderate: sell house (transaction costs, market risk) |
| Marriage (no children) | Moderate to deep | Moderate to high: legal, emotional, financial |
| Marriage (with children) | Deep | Very high: legal, emotional, financial, ongoing co-parenting |
| Career specialization | Very deep | Very high: retraining cost, lost seniority, identity disruption |
| Cultural identity | Extremely deep | Near-prohibitive: psychological, social, existential |

The framework predicts that **the optimal commitment strategy accounts for exit cost, not just entry cost and maintenance cost.** The full decision calculus is:

$$C_{\text{total}} = C_{\text{assembly}} + \int_0^{T} C_{\text{maint}}(t) \, dt + P_{\text{exit}} \cdot \Delta V$$

where $P_{\text{exit}}$ is the probability that you will want or need to exit the commitment before $T_{\text{duration}}$. Commitments with deep basins and high $P_{\text{exit}}$ are traps — expensive to maintain AND expensive to leave.

**Structural prediction:** People systematically underestimate $\Delta V$ at the time of commitment because basin depth is determined by the coupling terms that develop *after* the commitment is made, not before. When you take a job, the coupling to your household (you move near the office), your social network (colleagues become friends), and your identity (you become "a lawyer" or "an engineer") develops gradually, deepening $\Delta V$ over time. The exit cost you face at year 5 is much higher than the exit cost you estimated at year 0.

---

## 6. Implications

**Tag: structural.**

The framework suggests several practical principles, each of which follows from the true cost formula:

1. **Prefer low-$\dot{S}$ commitments.** When choosing between equivalent options, choose the one with lower entropy production rate. A well-built house over a cheap one. A stable job over a volatile one. A low-maintenance hobby over a high-maintenance one. The ongoing cost difference compounds over the commitment duration.

2. **Monitor coupling terms.** The most dangerous cost increases come not from the commitment itself but from coupling to other commitments. When a new commitment introduces strong coupling to existing ones (e.g., a job that requires relocating away from family), the true marginal cost is much higher than the apparent cost.

3. **Maintain exit options.** Keep $\Delta V$ manageable by preserving optionality. Avoid commitments whose basin depth grows uncontrollably with time — or, if you must make them, do so with eyes open about the exit cost.

4. **Budget for the integral, not the initial condition.** The true cost is dominated by the maintenance integral, not the assembly cost, for any commitment lasting more than a few years. A financial plan that accounts only for the mortgage payment and not for the 30-year maintenance integral is incomplete by a factor that grows with house age.

---

## 7. Limitations and Honest Assessment

### 7.1 Measurement

The framework is easier to state than to measure. $\dot{S}_{\text{int}}$ for a house can be estimated from repair records and material science. $\dot{S}_{\text{int}}$ for a child or a job is much harder to operationalize — what are the units? How do you measure "psychological entropy production rate"? The coupling tensor $T^i{}_j$ is even harder: its off-diagonal elements describe cross-domain propagation (economic stress to psychological stress) that is real but difficult to quantify.

### 7.2 What Is Genuinely Novel vs. Relabeling?

- **Relabeling:** "Commitments have ongoing costs" is common sense. "Some costs are hidden" is standard behavioral economics. The thermodynamic notation does not make these observations new.

- **Structural:** The decomposition into assembly cost, maintenance integral, and coupling terms (Section 2) follows from the framework's grammar and provides a useful classification of *which* costs are underestimated and why. The commitment portfolio analysis (Section 4) and the superlinear coupling prediction are structural contributions.

- **Genuinely novel:** The specific prediction that the marginal cost of the $(N+1)$-th commitment grows faster than linearly due to coupling (Section 4), the prediction that basin depth increases *after* commitment due to coupling development (Section 5), and the convex maintenance cost curve for houses (Section 3.1) are predictions that neither decision theory nor thermodynamics alone makes in this form.

### 7.3 The Risk of Over-Formalizing

There is a genuine risk that the mathematical notation creates an illusion of precision where none exists. Writing $T^{\text{psych}}{}_{\text{econ}} \cdot \sigma_{\text{econ}}$ does not mean we can *calculate* the psychological cost of economic stress — we can only indicate its structural position in the cost equation. The framework provides a taxonomy of costs and a prediction about their relative magnitudes (coupling terms dominate at high $N$). It does not provide a calculator.

---

## 8. Connection to the Broader Framework

This application imports from the Epimechanics series:

- **Entropy production** $\dot{S}_{\text{int}}$ and **repair rate** $\dot{R}_{\text{repair}}$ ([Atomic Decomposition](../epimechanics_00_atomic_structure.md))
- **Stability basin depth** $\Delta V$ ([Atomic Decomposition](../epimechanics_00_atomic_structure.md))
- **Coupling tensor** $T^i{}_j$ ([Part 1](../epimechanics_01_generalized_mechanics.md))
- **Generalized mass** $\mathcal{M}$ as resistance to state change ([Part 1](../epimechanics_01_generalized_mechanics.md))

It connects to:

- [The Cost of Being Moral](../../../the_cost_of_being_moral.md) — moral commitments as high-$\Delta V$, high-coupling entities
- [Entropy in the Household](./entropy_in_the_household.md) — the specific case of household entropy production
- [Robustness Metric](./robustness_metric.md) — robustness of commitments as $E_{\text{disassembly}} / E_{\text{assembly}}$
- [Time Destroyers](../../physics_of_common_sense/time_destroyers.md) — commitments that consume time through maintenance burden
- [Efficiency Limits](./efficiency_limits.md) — the organizational version of commitment-portfolio coupling

---

*This document is an application of the [Epimechanics framework](../index.md). The true cost formula is testable: compare predicted total cost (assembly + maintenance integral + coupling) to actual reported cost for homeownership, childrearing, and career tenure. If the coupling terms account for the systematic cost underestimation documented in behavioral economics, the framework has explanatory power beyond relabeling.*

---

[← Back to Applications Overview](./index.md)
