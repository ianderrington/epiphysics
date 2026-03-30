# Empirical Test Design for Epimechanics

**Date:** 2026-03-29
**Status:** Draft - seeking simplest non-tautological tests

---

## The Tautology Problem

The framework risks being circular:
1. We observe a system's behavior
2. We fit Q1-Q5 parameters to match the behavior
3. We "predict" the behavior we already observed

**Non-tautological test requirement:** Measure structural parameters from one set of observations, predict behavior in a *different* set of observations.

---

## Candidate Simple Systems

### 1. Chemical Oscillators (e.g., Belousov-Zhabotinsky reaction)

**Why this system:**
- Well-characterized chemistry (known bond energies)
- Observable oscillation (measurable period, amplitude)
- Tunable parameters (reagent concentrations)
- Clear loop structure (autocatalytic feedback)

**Non-tautological test design:**

| Step | Measure from | Predict for |
|------|--------------|-------------|
| 1 | Measure bond strengths σ_b from standard chemistry tables | — |
| 2 | Measure reaction rates from kinetics literature | — |
| 3 | Construct coupling tensor T^i_j from reaction network | — |
| 4 | Predict oscillation period from loop structure | Compare to measured period |
| 5 | Predict stability basin (what perturbations kill oscillation) | Compare to experimental perturbation studies |

**Key independence:** Bond energies and reaction rates come from independent chemistry literature, not from observing *this* oscillator. The prediction is whether the *combination* produces the observed period and stability.

**Measurable quantities:**
- σ_b: Bond dissociation energies (kJ/mol) — from NIST
- τ_b: Reaction half-lives — from kinetics literature
- T^i_j: Stoichiometric coefficients × rate constants
- Period T: Measured oscillation period
- ΔV: Concentration perturbation that stops oscillation

**What would falsify the framework:**
- Predicted period off by >10% from measured
- Predicted stability basin qualitatively wrong (stable when predicted unstable or vice versa)

---

### 2. Minimal Metabolic Networks (e.g., glycolysis oscillations in yeast)

**Why this system:**
- 10-enzyme network (small enough to enumerate)
- Known enzyme kinetics (Km, Vmax from literature)
- Observable oscillations in NADH fluorescence
- Perturbable (enzyme inhibitors)

**Non-tautological test design:**

| Step | Measure from | Predict for |
|------|--------------|-------------|
| 1 | Get enzyme kinetic parameters from BRENDA database | — |
| 2 | Construct coupling tensor from reaction stoichiometry | — |
| 3 | Identify loop structure (which reactions feed back) | — |
| 4 | Calculate ρ_ac from loop closure | — |
| 5 | Predict: oscillation frequency | Compare to measured |
| 6 | Predict: which enzyme inhibition kills oscillation fastest | Compare to perturbation experiments |

**Key independence:** Enzyme kinetics are measured in isolation, not in the oscillating system. We predict emergent behavior from component properties.

**What would falsify:**
- Predicted keystone bonds (highest κ_b) don't match experimentally-determined rate-limiting steps
- ρ_ac doesn't correlate with system's persistence under stress

---

### 3. Electronic Oscillators (e.g., ring oscillator)

**Why this system:**
- Simplest possible loop (3-5 inverters)
- Fully characterized components (transistor models)
- Tunable (supply voltage, temperature)
- Measurable period to high precision

**Non-tautological test design:**

| Step | Measure from | Predict for |
|------|--------------|-------------|
| 1 | Get transistor switching times from SPICE models | — |
| 2 | Construct coupling tensor (each inverter couples to next) | — |
| 3 | τ_b = gate delay from transistor physics | — |
| 4 | Predict oscillation period T = n × τ_b | Compare to measured |
| 5 | Predict voltage threshold where oscillation stops | Compare to measured |

**This is almost too simple** — the prediction T = n × τ_gate is already known from circuit theory. The test is whether the epimechanics framing *adds* anything.

**What epimechanics might add:**
- Unified description of ring oscillator and BZ reaction in same framework
- Prediction of relative stability (which is more robust to noise?)

---

## The Coupling Tensor Problem

**How to construct T^i_j non-tautologically:**

The coupling tensor describes how state variable i affects state variable j:

$$T^i{}_j = \frac{\partial \dot{X}^i}{\partial X^j}$$

**For chemical systems:**
- X^i = concentration of species i
- T^i_j = stoichiometric coefficient × rate constant × concentration dependencies
- These come from reaction kinetics, measured independently

**For the test to be non-tautological:**
1. Measure kinetic parameters in non-oscillating conditions
2. Predict oscillation from the assembled tensor
3. Verify against oscillation measurements

**The sparse coupling hypothesis:**
Epimechanics claims optimal representations have sparse T^i_j. Test:
- Compare dense vs sparse model of same system
- Which predicts better with fewer parameters?
- If sparse wins, that's evidence for the framework

---

## Simplest Possible Test: The Candle

**Why start here:**
- We already use it as the pedagogical example
- Simple enough to enumerate
- Observable (burn rate, temperature, extinction threshold)

**Bonds to measure:**
| Bond | σ_b source | τ_b source |
|------|------------|------------|
| Heat → wax melting | Heat of fusion (literature) | Thermal conductivity calculation |
| Melting → vaporization | Heat of vaporization (literature) | Mass transfer rate |
| Vapor → combustion | Activation energy (literature) | Reaction kinetics |
| Combustion → heat | Heat of combustion (literature) | Flame temperature |

**Non-tautological prediction:**
Given these independently-measured parameters, predict:
1. Minimum wick diameter for sustained flame
2. Maximum wind speed before extinction
3. Burn rate (g/hour)

Compare to measured values. If predictions match within 20%, the framework captured something real. If not, either the measurements are wrong or the framework is.

---

## Representation Tensor Construction

**The challenge:** What are the state variables X^i?

For the candle:
- X^1 = wax temperature (K)
- X^2 = wax mass (g)  
- X^3 = vapor concentration (mol/m³)
- X^4 = flame temperature (K)
- X^5 = O₂ concentration (mol/m³)

**These are NOT chosen to fit the data** — they're chosen based on physical intuition about what matters. The test is whether this representation, with independently-measured coupling parameters, predicts behavior.

**Alternative representations to test:**
- Coarser: X = {solid wax, flame present/absent} — 2 variables
- Finer: Include spatial gradients — 100+ variables

**The efficiency test:** Which representation gives the best prediction per parameter? If coarse works nearly as well as fine, that's evidence for representational efficiency.

---

## Next Steps

1. **Pick one system** (suggest: BZ reaction — best literature)
2. **Assemble parameters from literature** (not from our observations)
3. **Construct coupling tensor** from reaction network
4. **Make blind prediction** of oscillation period and stability
5. **Compare to published experimental data**
6. **Report result honestly** — match or mismatch

This is a weekend project for someone with chemistry background. The framework either predicts something or it doesn't.

---

## Open Questions

1. **What counts as "independent" measurement?** If we use oscillation data to calibrate one parameter, have we contaminated the test?

2. **What prediction accuracy is meaningful?** Factor of 2? 10%? Order of magnitude?

3. **What if the framework predicts correctly but so does existing theory?** Then it's relabeling, not discovery. Need to find cases where epimechanics predicts and standard theory doesn't.

4. **Can we derive T^i_j from first principles?** Or do we always need to measure it? If always measure, what's the value-add?

---

*This document is a working draft. The goal is to design tests that could actually falsify the framework.*
