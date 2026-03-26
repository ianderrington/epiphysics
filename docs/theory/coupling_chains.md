---
title: Epimechanics — Coupling Chain Examples
description: >-
  Worked examples of entity-coupling chains across biology, economics, and
  society. Dimensional analysis applied to real processes: each chain shows
  entities as typed unit-carriers and coupling tensors as transducer-dependent
  conversion factors.
date: 2026-03-24T00:00:00.000Z
draft: false
author:
  name: Ian Derrington
series: Epimechanics
categories:
  - Physics
  - Biology
  - Economics
  - Systems thinking
tags:
  - Epimechanics
  - Dimensional analysis
  - Coupling tensor
  - Examples
coverImage:
  url: ./images/coupling_chains-1-1-1-2.png
  alt: >-
    A chain of glowing orbs suspended in deep space, each connected to the next by arcing beams of light, force rippling along the chain like a wave — teal and amber colors, motion blur on the central orb suggesting it transmits energy to its neighbors, dark background, no text
---

## What This Document Is

A living collection of **coupling chain examples** for Epimechanics, organized by domain.

Each example traces how cause propagates through a real system as a chain of entity-to-entity conversions. The method is ordinary **dimensional analysis** — track units at every step, cancel what cancels, and what remains tells you what the chain computes. The extension: "units" here are *entities* (ATP, dollars, votes, norms) not just meters and seconds. The coupling at each step is **transducer-dependent** — the same entity pair can have different conversion ratios depending on what converts them.

See [Part 1.5: Causors](./01_5_causors.md) for the formal treatment. These examples operate at the coarse-grained scale where energy is a well-defined conserved quantity (Layer C) — the right description for biological, economic, and social systems. The foundational primitive is the causal event; energy is its coarse-grained form where time-translation symmetry holds.

---

## How to Read a Chain Table

| Step | From entity | Transducer | To entity | Ratio / notes |
|---|---|---|---|---|
| N | what flows in | what converts it | what flows out | approximate conversion |

**Key terms:**
- **$\eta$** — coupling efficiency (0–1); lossy steps have $\eta < 1$
- **Cooperative coupling** — nonlinear; output switches sharply over narrow input range (Hill function)
- **Geometric coupling** — lossless in ideal case (lever arms, gear ratios)
- **State-dependent coupling** — the tensor element itself depends on current entity levels (regulation, feedback)

---

## Domain 1: Biology

### B1. Moving a Muscle

From a motor cortex signal to mechanical work at a joint.

#### Chain Table

| Step | From | Transducer | To | Notes |
|---|---|---|---|---|
| 1 | Motor cortex signal | Axonal conduction | Action potential (motor neuron) | Near 1:1 fidelity |
| 2 | Motor neuron AP | Synaptic vesicle fusion (NMJ) | ACh quanta | ~10⁶ ACh molecules released |
| 3 | ACh | nAChR binding → ion flux | Muscle end-plate potential | ~1 muscle AP triggered |
| 4 | Muscle AP | T-tubule / DHPR voltage sensor | DHPR conformational change | Mechanical, near 1:1 |
| 5 | DHPR activation | RyR1 channel opening | Ca²⁺ ions (from SR) | ~10⁶ Ca²⁺/channel/ms |
| 6 | Ca²⁺ | Troponin C binding | TnC·Ca²⁺ complex | Cooperative, Hill n≈4 |
| 7 | TnC·Ca²⁺ | Tropomyosin shift | Exposed actin binding sites | ~7 sites/tropomyosin unit |
| 8 | Actin site + myosin head | Cross-bridge formation | Attached cross-bridge | 1:1 |
| 9 | ATP + myosin·actin | Myosin ATPase hydrolysis | Power stroke + ADP + Pi | 1 ATP → ~5–10 pN, ~10 nm |
| 10 | Power stroke | Cross-bridge cycling | Fiber force | ~10⁸ cross-bridges/cm² |
| 11 | Fiber force | Tendon + lever arm | Joint torque → movement | Geometry-dependent |

#### Tensor Contraction

$$\mathcal{P}_{\text{muscle}} = T^{\text{torque}}_{\text{force}} \cdot T^{\text{force}}_{\text{XB}} \cdot T^{\text{XB}}_{\text{Ca}^{2+}} \cdot T^{\text{Ca}^{2+}}_{\text{AP}} \cdot T^{\text{AP}}_{\text{ACh}} \cdot T^{\text{ACh}}_{\text{signal}} \cdot \dot{n}_{\text{signal}}$$

#### Key Efficiencies

| Coupling | Type | $\eta$ |
|---|---|---|
| NMJ (AP → muscle AP) | Near-digital | Very high |
| DHPR → RyR1 | Mechanical (voltage-gated) | Very high |
| Ca²⁺ → TnC | Cooperative, Hill n≈4 | Switch-like |
| ATP → power stroke | Thermodynamic | ~25–40% |
| Tendon/lever | Geometric | ~100% (ideal) |

> [!sidenote]
> **Ca²⁺ cooperativity is a state-dependent tensor element.** $T^{\text{actin}}_{\text{Ca}^{2+}} = [\text{Ca}^{2+}]^n / (K_d^n + [\text{Ca}^{2+}]^n)$, $n \approx 4$. This switch-like nonlinearity is how a graded neural firing rate maps to graded force despite individual sarcomeres being nearly digital.

---

### B2. Cellular Energy: Glucose → Mechanical Work

From food to usable causal power inside a cell.

#### Chain Table

| Step | From | Transducer | To | Ratio |
|---|---|---|---|---|
| 1 | Glucose | Glycolysis | Pyruvate + 2 ATP + 2 NADH | 1 glucose → 2 pyruvate |
| 2 | Pyruvate | Pyruvate dehydrogenase | Acetyl-CoA + CO₂ + NADH | 1:1 |
| 3 | Acetyl-CoA | Krebs cycle | 3 NADH + 1 FADH₂ + 1 GTP | 1 turn/acetyl-CoA |
| 4 | NADH | ETC Complex I, III, IV | Proton gradient (ΔΨ_m) | ~2.5 ATP equiv/NADH |
| 5 | FADH₂ | ETC Complex II, III, IV | Proton gradient | ~1.5 ATP equiv/FADH₂ |
| 6 | Proton gradient | ATP synthase | ATP | ~30–32 ATP/glucose (net) |
| 7 | ATP | Myosin / kinesin / pump | Mechanical or transport work | ~30.5 kJ/mol |

#### Tensor Contraction

$$\mathcal{P}_{\text{cell}} = T^{\text{J}}_{\text{ATP}} \cdot T^{\text{ATP}}_{\text{NADH}} \cdot T^{\text{NADH}}_{\text{Krebs}} \cdot T^{\text{Krebs}}_{\text{glucose}} \cdot \dot{n}_{\text{glucose}}$$

$$\approx 30.5\ \text{kJ/mol} \times 2.5\ \text{ATP/NADH} \times 3\ \text{NADH/turn} \times 1\ \text{turn/acetyl-CoA} \times \dot{n}_{\text{glucose}}$$

#### Overall Efficiencies

| Stage | $\eta$ |
|---|---|
| Glycolysis | ~40% |
| Krebs + ETC | ~35–40% |
| ATP synthase | ~75–90% |
| Myosin ATPase | ~25–40% |
| **Glucose → mechanical work (total)** | **~20–25%** |

---

### B3. Kinesin vs Myosin — Same Coupling, Different Context

Both are ATP→displacement transducers; same coupling type ($T^{\text{nm}}_{\text{ATP}}$), different track and load.

#### Chain Table (Kinesin)

| Step | From | Transducer | To | Ratio |
|---|---|---|---|---|
| 1 | ATP | Kinesin ATPase | Conformational change | 1 ATP/step |
| 2 | Conformational change | Head–microtubule binding | 8 nm displacement | 1:1 |
| 3 | Displacement | Stalk → cargo linker | Vesicle movement | Geometric |

#### Comparison

| Property | Myosin II | Kinesin-1 |
|---|---|---|
| Track | Actin | Microtubule |
| Step size | ~10 nm | ~8 nm |
| ATP/step | 1 | 1 |
| Speed | ~1–10 μm/s | ~0.5–1 μm/s |
| Processivity | Low (ensemble) | High (walks alone) |
| $T^{\text{nm}}_{\text{ATP}}$ | ~10 nm/ATP | ~8 nm/ATP |

---

## Domain 2: Economics

### E1. Capital Investment → Economic Output

From a dollar of investment to GDP output — the macroeconomic coupling chain.

#### Chain Table

| Step | From | Transducer | To | Notes |
|---|---|---|---|---|
| 1 | Savings / capital | Financial intermediation (bank/market) | Investment dollars allocated | Efficiency depends on financial system quality |
| 2 | Investment dollars | Firm production function | Physical capital (machines, infrastructure) | $I \to \Delta K$; depreciation reduces net |
| 3 | Physical capital + labor | Production (Cobb-Douglas) | Output (goods/services) | $Y = A \cdot K^\alpha L^{1-\alpha}$, $\alpha \approx 0.3$ |
| 4 | Output | Market pricing | Revenue | Price × quantity; depends on demand |
| 5 | Revenue | Firm → wages + profit | Labor income + returns to capital | Split set by labor share |
| 6 | Income | Consumer spending | Demand (multiplier effect) | Keynesian multiplier $k = 1/(1-MPC)$ |
| 7 | Demand | Firm investment signal | Next round of investment | Closes the loop (auto-causal) |

#### Tensor Contraction

$$Y = T^{Y}_{K} \cdot T^{K}_{I} \cdot T^{I}_{\$} \cdot \dot{n}_{\$_{\text{saved}}}$$

$$\approx A K^{\alpha-1} L^{1-\alpha} \cdot (1 - \delta)^{-1} \cdot \eta_{\text{finance}} \cdot \dot{S}$$

#### Key Couplings

| Coupling | Type | Notes |
|---|---|---|
| Savings → investment | Intermediation efficiency | Varies: ~60–90% in developed markets |
| Investment → capital | Diminishing returns | Exponent $\alpha \approx 0.3$ |
| Capital → output | Cobb-Douglas | Depends on TFP ($A$) |
| Income → demand | Multiplier (auto-causal loop) | MPC ≈ 0.7 → multiplier ≈ 3.3 |

> [!sidenote]
> **The loop closure at step 7 is auto-causal.** Demand generates income generates demand — this is the Keynesian multiplier as a causal loop operator $\mathcal{L}$. Its strength (the multiplier) depends on the marginal propensity to consume, which is itself state-dependent (falls in recessions).

---

### E2. Labor → Wage → Consumption → Firm Revenue

The household-firm coupling loop — the basic circuit of a market economy.

#### Chain Table

| Step | From | Transducer | To | Notes |
|---|---|---|---|---|
| 1 | Human time (hours) | Labor market | Wage income ($) | $w = \partial Y / \partial L$ (marginal product) |
| 2 | Wage income | Household budget | Consumption expenditure | $C = MPC \cdot Y_d$; $MPC \approx 0.7$ |
| 3 | Consumption | Retail/service market | Firm revenue | Price × volume |
| 4 | Firm revenue | Profit allocation | Investment + wages | Reinvestment rate varies |
| 5 | Wages paid | Household income | Back to step 2 | Loop closes |

#### Coupling Efficiencies

| Step | Losses / leakages |
|---|---|
| Labor → wage | Monopsony, bargaining power, taxes |
| Wage → consumption | Savings rate (leakage), debt repayment |
| Consumption → revenue | Imports (leakage from domestic loop) |
| Revenue → wages | Profit extraction, automation substitution |

> [!sidenote]
> **Import leakage is a coupling break.** When consumption buys imported goods, the loop $\text{wage} \to \text{consumption} \to \text{domestic revenue}$ is broken — the tensor element $T^{\text{domestic revenue}}_{\text{consumption}}$ falls below 1. This is why trade deficits weaken domestic multipliers.

---

## Domain 3: Society

### S1. Political Signal → Policy → Behavior Change

From a citizen preference to a measurable change in population behavior.

#### Chain Table

| Step | From | Transducer | To | Notes |
|---|---|---|---|---|
| 1 | Citizen preference | Voting / advocacy | Electoral signal | Aggregation via voting rules (first-past-post, proportional, etc.) |
| 2 | Electoral signal | Representative selection | Political mandate | Mandate strength depends on margin, system |
| 3 | Political mandate | Legislative process | Law / regulation | Committee, amendment, veto points reduce $\eta$ |
| 4 | Law | Enforcement / implementation | Compliance incentive | Fine, subsidy, norm — different coupling types |
| 5 | Compliance incentive | Individual decision-making | Behavior change | Depends on salience, enforcement probability |
| 6 | Aggregate behavior | Social norm formation | New baseline expectation | Loop closes — norm reinforces behavior |

#### Tensor Contraction

$$\Delta B = T^{B}_{C} \cdot T^{C}_{L} \cdot T^{L}_{M} \cdot T^{M}_{V} \cdot \Delta P_{\text{preference}}$$

where $B$ = behavior, $C$ = compliance incentive, $L$ = law, $M$ = mandate, $V$ = vote.

#### Key Couplings

| Coupling | Type | Efficiency notes |
|---|---|---|
| Preference → vote | Aggregation loss | Gerrymandering, turnout, system design |
| Mandate → law | Legislative friction | Veto players, filibuster, lobbying |
| Law → compliance | Deterrence coupling | Enforcement probability × penalty |
| Compliance → norm | Auto-causal loop | Norm strength grows with adoption (S-curve) |

> [!sidenote]
> **Norm formation at step 6 is auto-causal and nonlinear.** Below a threshold adoption level, the norm doesn't reinforce itself. Above it, the loop self-amplifies. This is a bifurcation in the coupling tensor — the same policy can produce no behavior change or rapid cascading change depending on which side of the threshold the system starts on.

---

### S2. Information → Belief → Action → Outcome

From a piece of information entering a social network to a measurable societal outcome.

#### Chain Table

| Step | From | Transducer | To | Notes |
|---|---|---|---|---|
| 1 | Information signal | Attention / media | Salience (reach × engagement) | Algorithmic amplification modulates $\eta$ |
| 2 | Salience | Cognitive updating | Belief shift | Bayesian (weak) or identity-protective (resistant) |
| 3 | Belief shift | Social sharing | Network propagation | Viral coefficient $R_0$; >1 = epidemic spread |
| 4 | Shared belief | Social proof | Group norm shift | Depends on source credibility, in-group status |
| 5 | Norm shift | Behavioral pressure | Individual action | Conformity coupling; nonlinear near tipping point |
| 6 | Aggregate action | Institution / market response | Societal outcome | Depends on which institutions are sensitive |

#### Key Couplings

| Coupling | Type | Notes |
|---|---|---|
| Information → salience | Algorithmic | Engagement-optimized $\eta$ can amplify false signals |
| Belief update | Bayesian vs. identity-protective | Resistant updating = low $T^{\text{belief}}_{\text{info}}$ |
| Network propagation | Viral ($R_0$) | Exponential if $R_0 > 1$; dies if $R_0 < 1$ |
| Norm → action | Nonlinear / tipping | S-curve; sudden transitions near threshold |

> [!sidenote]
> **Misinformation as coupling hijack.** A false signal with high salience-coupling ($\eta_{\text{attention}}$ amplified by algorithm) but low reality-coupling ($T^{\text{outcome}}_{\text{belief}} \approx 0$) can drive large behavior changes with no corresponding change in objective outcomes. The chain breaks between step 5 and step 6 — action occurs, but causal power doesn't reach the intended state variable.

---

## Cross-Domain Pattern: The Auto-Causal Loop

Every domain above contains at least one **auto-causal loop** — a step where the output feeds back to reinforce the process:

| Domain | Loop | Entity | Nonlinearity |
|---|---|---|---|
| Biology | Krebs cycle | Acetyl-CoA → oxaloacetate | Near-linear (substrate saturation) |
| Biology | Muscle calcium | AP → Ca²⁺ → contraction → AP (motor reflex) | Cooperative (Hill) |
| Economics | Keynesian multiplier | Income → demand → income | Linear above ZLB |
| Economics | Labor-consumption circuit | Wage → spending → revenue → wage | Breaks at high import leakage |
| Society | Norm reinforcement | Behavior → norm → behavior | S-curve / tipping point |
| Society | Viral belief spread | Belief → share → belief | Exponential ($R_0$ dependent) |

In all cases: the loop persists only while coupling efficiency is sufficient. Cut a coupling (stop ATP synthesis, break the labor market, suppress information sharing) and the loop collapses.

---

---

## Extended Case: Conflict Systems

War and sustained conflict are too complex for a chain table — they involve multiple coupled auto-causal loops with state-dependent coupling coefficients. See the dedicated document:

→ [Coupling Chains: Conflict Systems](./coupling_chains_conflict.md) — Middle East as a worked example: narrative → territorial claim → actor mobilization, the violence loop, international actor coupling, representation and belief chains, and intervention point analysis.

---

## Adding New Examples

Copy this template:

```markdown
## [Domain Letter][Number]. [Name]

[One sentence: what system, what input, what output.]

### Chain Table

| Step | From | Transducer | To | Notes |
|---|---|---|---|---|
| 1 | ... | ... | ... | ... |

### Tensor Contraction

$$\mathcal{P} = T^{}_{}  \cdots \cdot \dot{n}_{\text{input}}$$

### Key Couplings

| Coupling | Type | Notes |
|---|---|---|
```

**Candidate examples:**
- **B4.** Photosynthesis (photon → glucose → ATP)
- **B5.** Neural LTP (Ca²⁺ → AMPA receptor insertion → synaptic strength)
- **E3.** Central bank rate → investment → inflation
- **E4.** Supply chain (raw material → finished good → consumer)
- **S3.** Education → human capital → productivity
- **S4.** Legal norm → contract enforcement → market trust → investment
