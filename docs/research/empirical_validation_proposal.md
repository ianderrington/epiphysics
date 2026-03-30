# Empirical Validation of Epimechanics: A Research Proposal

**Date:** 2026-03-29
**Status:** Draft for review
**Goal:** Design experiments that could validate or falsify the core claims of epimechanics

---

## Executive Summary

Epimechanics claims that optimal representations of dynamical systems have Lagrangian structure — sparse coupling, conserved quantities, and low-dimensional state spaces. This proposal outlines a research program to test this claim empirically by connecting three existing research directions:

1. **Causal Representation Learning** — discovering causal variables from raw observations
2. **Physics-Informed Machine Learning** — learning physical structure (Hamiltonians, Lagrangians) from data
3. **Sparse Dynamics Identification** — finding minimal equation sets that govern system behavior

The central hypothesis: these three approaches converge on the same representations, and those representations are characterized by the structural properties epimechanics describes (Q1-Q5, sparse coupling, auto-causal loops).

---

## Part 1: The Core Claims to Test

### Claim 1: Representational Efficiency ↔ Lagrangian Structure

**Statement:** The representation that minimizes predictive cost also has maximal Lagrangian symmetry and sparse coupling.

**Why this matters:** If true, finding good representations (an ML problem) is equivalent to finding physical structure (a physics problem). This would explain why neural networks trained on physical systems often discover conserved quantities implicitly.

**How to test:** 
- Learn representations from data using information-theoretic criteria (rate-distortion, MDL)
- Check whether the learned representations admit simple Lagrangian descriptions
- Compare Lagrangian fit quality across representations with different information-theoretic properties

### Claim 2: Independent Mechanisms ↔ Sparse Coupling

**Statement:** Schölkopf's "independent causal mechanisms" principle is equivalent to sparse coupling in the epimechanics sense.

**Why this matters:** If true, causal discovery and mechanical structure discovery are the same problem. Methods from one field transfer to the other.

**How to test:**
- Learn representations using causal independence criteria
- Measure coupling tensor sparsity in learned representations
- Check correlation: do more "causally independent" representations have sparser coupling?

### Claim 3: Q1-Q5 Descriptors Are Predictive

**Statement:** Classifying bonds/loops by Q1-Q5 predicts system behavior without domain-specific knowledge.

**Why this matters:** If true, epimechanics provides a universal vocabulary for cross-domain comparison. If false, Q1-Q5 is just relabeling.

**How to test:**
- Measure Q1-Q5 for a system without knowing its domain
- Predict entity type from Q1-Q5 profile
- Verify prediction against known system behavior

### Claim 4: Auto-Causal Density Correlates with Persistence

**Statement:** Systems with higher ρ_ac (closed causal loops) persist longer under perturbation.

**Why this matters:** This is a quantitative prediction about system stability from structural properties alone.

**How to test:**
- Measure loop structure of various systems
- Compute ρ_ac
- Correlate with measured persistence/stability under perturbation

---

## Part 2: Experimental Design

### Experiment 1: The Representation-Lagrangian Connection

**Objective:** Test whether information-theoretically optimal representations have Lagrangian structure.

**Systems to study:**
- Simple pendulum (ground truth known)
- Double pendulum (chaotic but Lagrangian)
- Coupled oscillators (multiple conserved quantities)
- Turbulent flow (non-Lagrangian at macro scale?)
- Economic time series (unknown structure)

**Protocol:**

```
Phase 1: Physical systems with known structure
──────────────────────────────────────────────
1. Generate/collect trajectory data
   - Simulation or real video
   - Multiple initial conditions
   
2. Learn representations Z using multiple methods:
   a. PCA (linear, variance-based)
   b. β-VAE (nonlinear, information bottleneck)
   c. ICA (statistical independence)
   d. Causal representation learning (mechanism independence)
   e. Ground truth coordinates (for comparison)

3. For each representation Z:
   a. Fit Lagrangian Neural Network: L_θ(Z, Ż)
   b. Measure fit quality: MSE on held-out trajectories
   c. Check for conserved quantities: ∂H/∂t ≈ 0?
   d. Measure coupling sparsity: ||T^i_j||_0

4. Analyze:
   - Does information-theoretic quality correlate with Lagrangian fit?
   - Does causal independence correlate with sparse coupling?
   - Which method gets closest to ground truth performance?

Phase 2: Systems with unknown structure
───────────────────────────────────────
5. Apply best-performing method to:
   - Biological oscillators (circadian rhythms, glycolysis)
   - Economic cycles (business cycles, market oscillations)
   - Neural dynamics (EEG, spike trains)

6. For each:
   - Learn representation
   - Fit Lagrangian
   - Check structure (conserved quantities, sparsity)
   - Make predictions
   - Validate against held-out data
```

**Success criteria:**
- Causal/information-theoretic representations fit Lagrangians better than random (p < 0.01)
- Learned conserved quantities match known physics where applicable
- Predictions on held-out data outperform baseline models

**Failure criteria:**
- No correlation between representation quality and Lagrangian fit
- Random representations fit Lagrangians equally well
- No conserved quantities discovered even in known-Lagrangian systems

### Experiment 2: The Q1-Q5 Prediction Test

**Objective:** Test whether Q1-Q5 classification predicts system behavior.

**Protocol:**

```
1. Select 20 diverse systems across domains:
   - 5 physical (pendulum, spring, fluid, plasma, crystal)
   - 5 chemical (oscillators, reactions, catalysis)
   - 5 biological (cells, organisms, ecosystems)
   - 5 social (markets, organizations, networks)

2. For each system, blind to domain:
   a. Learn representation Z from time series
   b. Identify bonds: large |∂Ż^i/∂Z^j|
   c. Identify loops: cycles in coupling graph
   d. Measure Q1-Q5 for each bond:
      - Q1: Energy flow direction (from dynamics)
      - Q2: Target type (from coupling structure)
      - Q3: Loop membership (from graph analysis)
      - Q4: Leverage ratio (from amplitude analysis)
      - Q5: Timescale ratio (from frequency analysis)
   
3. From Q1-Q5 profile, predict:
   - Entity type (from the classification table)
   - Stability under perturbation
   - Characteristic timescales
   - Keystone bonds (highest κ_b)

4. Reveal true system identity and validate predictions
```

**Success criteria:**
- Entity type predictions correct >70% of time
- Keystone bond predictions match known critical points
- Stability predictions correlate with measured robustness

**Failure criteria:**
- Random Q1-Q5 assignment performs equally well
- Predictions no better than domain-specific baselines
- Q1-Q5 values don't cluster by known entity types

### Experiment 3: Auto-Causal Density and Persistence

**Objective:** Test whether ρ_ac predicts system persistence.

**Protocol:**

```
1. Select systems with measurable persistence:
   - Chemical oscillators (time until damping)
   - Cell lines (generations until senescence)
   - Companies (years until failure)
   - Flames (time until extinction under perturbation)

2. For each:
   a. Learn representation and coupling structure
   b. Identify loops
   c. Compute ρ_ac = (causal flow through loops) / (total causal flow)
   d. Measure persistence empirically

3. Analyze:
   - Correlation between ρ_ac and persistence
   - Controlling for system size, energy input, etc.
```

**Success criteria:**
- Significant positive correlation (r > 0.5, p < 0.01)
- ρ_ac adds predictive power beyond simpler measures

**Failure criteria:**
- No correlation or negative correlation
- Simpler measures (e.g., system size) fully explain persistence

---

## Part 3: Technical Approaches

### Learning Representations

**Option A: β-VAE (Variational Autoencoder with information constraint)**
- Pro: Well-understood, good at finding disentangled representations
- Con: May not capture causal structure specifically

**Option B: Causal VAE variants (e.g., CausalVAE, DEAR)**
- Pro: Explicitly models causal relationships
- Con: Requires assumptions about causal graph structure

**Option C: Contrastive learning with temporal structure**
- Pro: Exploits time as a natural intervention
- Con: Less theory about what it finds

**Option D: Independent Mechanisms approach**
- Pro: Directly targets causal independence
- Con: Less developed tooling

**Recommendation:** Try multiple approaches and compare. The method that produces representations with best Lagrangian fit is evidence for the epimechanics claim.

### Fitting Lagrangians

**Lagrangian Neural Networks (Cranmer & Greydanus 2020)**
- Input: coordinates q, velocities q̇
- Output: Lagrangian L(q, q̇)
- Training: Enforce Euler-Lagrange equations via automatic differentiation
- Conserved quantities emerge automatically

**Implementation:** JAX code available at github.com/MilesCranmer/lagrangian_nns

### Measuring Coupling Sparsity

**Direct approach:** Compute Jacobian J^i_j = ∂ẋ^i/∂x^j, measure ||J||_0 or ||J||_1

**SINDy approach:** Fit sparse dynamics ẋ = Θ(x)ξ where ξ is sparse, measure ||ξ||_0

**Graph approach:** Build coupling graph, measure degree distribution, clustering coefficient

### Computing Q1-Q5

| Descriptor | How to measure from data |
|------------|-------------------------|
| Q1 (energy type) | Sign of ∂E/∂t along bond activation |
| Q2 (target type) | Does bond output affect state directly or another bond? |
| Q3 (loop membership) | Cycle detection in coupling graph |
| Q4 (leverage ratio) | ||output amplitude|| / ||input amplitude|| |
| Q5 (timescale) | Bond activation frequency / loop period |

---

## Part 4: Resources Required

### Computational
- GPU cluster for training VAEs and LNNs
- Storage for video/time series datasets
- JAX/PyTorch environment

### Data
- Physics simulations (easy to generate)
- Biological time series (public datasets: circadian, glycolysis)
- Economic data (public: FRED, market data)
- Video of physical systems (can record or simulate)

### Personnel
- ML researcher familiar with representation learning
- Physicist familiar with Lagrangian mechanics
- Domain expert for each application area (for validation)

### Timeline
- Month 1-2: Replicate LNN on standard physics problems
- Month 3-4: Implement representation learning pipeline
- Month 5-6: Run Experiment 1 (representation-Lagrangian connection)
- Month 7-8: Run Experiment 2 (Q1-Q5 prediction test)
- Month 9-10: Run Experiment 3 (ρ_ac and persistence)
- Month 11-12: Analysis, writing, additional experiments

---

## Part 5: Possible Outcomes and Implications

### Outcome A: Strong Validation
- Causal representations consistently have Lagrangian structure
- Q1-Q5 predicts entity behavior across domains
- ρ_ac correlates with persistence

**Implication:** Epimechanics is describing real structure. The framework provides a unified vocabulary for cross-domain science. Major theoretical result.

### Outcome B: Partial Validation
- Works for physical systems, not for biological/social
- Some Q1-Q5 descriptors predictive, others not
- ρ_ac correlates weakly

**Implication:** Epimechanics is valid in limited domains. Revise scope of claims. Still potentially useful as a vocabulary.

### Outcome C: Null Result
- No correlation between representation quality and Lagrangian fit
- Q1-Q5 no better than random
- ρ_ac doesn't predict persistence

**Implication:** Epimechanics is philosophy, not science. The mechanical vocabulary is metaphorical, not predictive. Abandon quantitative claims.

### Outcome D: Surprising Findings
- A different structural property (not Lagrangian) characterizes optimal representations
- Q1-Q5 predicts in unexpected domains but fails in expected ones
- ρ_ac correlates but with opposite sign

**Implication:** The intuitions were partially right but the formalization was wrong. Revise theory based on empirical findings.

---

## Part 6: Open Questions for Brainstorming

1. **What systems are best for initial testing?**
   - Should prioritize simplicity or realism?
   - Physical systems where ground truth is known, or novel systems where prediction matters?

2. **How do we handle systems that aren't Lagrangian?**
   - Dissipative systems, driven systems, stochastic systems
   - Generalize to Rayleigh dissipation? Stochastic Lagrangians?

3. **What's the right comparison baseline?**
   - Random representations?
   - Domain-specific state-of-art models?
   - Simple heuristics?

4. **How do we operationalize Q1-Q5 without circularity?**
   - Current definitions are somewhat qualitative
   - Need precise measurement protocols

5. **What if the representation space is wrong?**
   - Maybe Lagrangian structure exists but in different coordinates
   - How hard should we search for the right coordinates?

6. **Can we do this incrementally?**
   - Start with simplest possible test
   - What's the minimal experiment that would update our beliefs?

7. **What would convince skeptics?**
   - A physicist who thinks this is philosophy?
   - An ML researcher who thinks it's just relabeling?
   - What specific result would change their mind?

8. **Where might we be wrong that we haven't considered?**
   - Assumptions we're making implicitly
   - Alternative explanations for any positive results

---

## Part 7: Connections to Broader Research

### AI Alignment and Interpretability
If good representations have Lagrangian structure, this suggests:
- Neural networks that generalize well have discoverable conserved quantities
- Interpretability might come from finding the "Lagrangian" of a trained model
- Could inform how to build models with known conservation properties

### Causal Inference
The independent mechanisms principle connects to:
- Transportability (when do causal relationships transfer across domains?)
- Modularity (when can we intervene on one mechanism without affecting others?)
- Epimechanics might provide a *mechanical* interpretation of causal independence

### Complex Systems Science
If ρ_ac predicts persistence:
- Unified measure of "aliveness" across domains
- Could inform design of robust systems (engineering, organizations)
- Connects to autopoiesis literature in biology

### Philosophy of Science
If optimal representations are uniquely characterized:
- Addresses underdetermination of theory by data
- Suggests there is a "right" way to carve nature at its joints
- Connects to structural realism debates

---

*This proposal is a starting point for discussion. The goal is to design experiments that could genuinely falsify epimechanics, not just confirm it. We want to learn whether the framework is true, not just whether it can be made to fit data.*
