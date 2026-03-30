# Causal Representation Learning: The ML/Epimechanics Connection

**Date:** 2026-03-29
**Status:** Key insight - this is where the empirical program lives

---

## The Core Insight

Three independent research programs are converging on the same problem:

| Program | Question | Answer |
|---------|----------|--------|
| **Epimechanics** | What makes a representation "good"? | Sparse coupling, Lagrangian structure, conserved quantities |
| **Causal Representation Learning** (Schölkopf) | How do we learn causal variables from raw data? | Independent mechanisms, invariance under intervention |
| **Physics-Informed ML** (Greydanus, Brunton) | How do we learn physical structure from data? | Hamiltonian/Lagrangian constraints, sparse dynamics |

**These are the same question asked three ways.**

---

## What Already Works

### Lagrangian Neural Networks (Greydanus 2020)

**What they do:**
- Take raw trajectory data (positions, velocities)
- Constrain neural network to satisfy Euler-Lagrange equations
- Learn the Lagrangian function L(q, q̇) from data

**Key result:** The network *automatically* learns conservation laws because Lagrangian structure implies them via Noether's theorem.

**Limitation:** Requires knowing the coordinates q. Doesn't derive the coordinates from raw observations (e.g., pixels).

### Hamiltonian Neural Networks (Greydanus 2019)

**What they do:**
- Same as LNN but learns Hamiltonian H(q, p)
- Automatically conserves energy

**Limitation:** Requires canonical coordinates (p, q), which are often non-obvious.

### SINDy (Brunton 2016)

**What they do:**
- Take time series data
- Find *sparse* representation of dynamics: dx/dt = f(x) where f is sparse in a function library
- Discovers governing equations from data

**Key result:** Sparse dynamics are learnable. Systems with simple structure have discoverable equations.

**Limitation:** Requires choosing the state variables x. Doesn't derive them.

### Causal Representation Learning (Schölkopf 2021)

**What they do:**
- Learn representations where *mechanisms are independent*
- Use invariance under distribution shift as a signal
- Multi-view learning to identify latent causal factors

**Key result:** Representations aligned with causal structure are identifiable under certain conditions.

**This is the missing piece:** It addresses *deriving the coordinates*, not just fitting dynamics to given coordinates.

---

## The Synthesis: What Epimechanics Could Add

The existing work has a gap:

```
Raw observations → [???] → Coordinates → Lagrangian/Hamiltonian → Predictions
                    ↑
              This step is unsolved
```

**Causal Representation Learning** addresses the first arrow (observations → coordinates).
**Lagrangian Neural Networks** address the second arrow (coordinates → Lagrangian).

**Epimechanics claims:** These two arrows are the *same* arrow. The coordinates that make mechanisms independent ARE the coordinates where the Lagrangian is simple.

**Testable prediction:**
1. Learn causal representation Z from raw data (using CRL methods)
2. Fit Lagrangian to Z
3. The fit should be *better* than fitting Lagrangian to arbitrary representation

If true: CRL + LNN = automated discovery of mechanical structure from raw data.
If false: Epimechanics is wrong about the connection.

---

## Concrete Experimental Protocol

### Phase 1: Validate on known systems

**System:** Double pendulum from video

1. **Raw input:** Video frames (pixels)
2. **Learn representation Z:** Use β-VAE or ICA variant to compress to latent space
3. **Fit Lagrangian:** Apply LNN to learned Z
4. **Measure:** Lagrangian fit quality (prediction error on held-out trajectories)
5. **Compare:** 
   - Z from unsupervised learning (no physics prior)
   - Z from causal representation learning (independence prior)
   - Z = true angles (θ₁, θ₂) as ground truth

**Prediction:** CRL-derived Z should fit Lagrangian nearly as well as true angles, and much better than unconstrained Z.

### Phase 2: Extend to non-physical systems

**System:** Economic time series (e.g., supply/demand oscillations)

1. **Raw input:** Price, quantity, inventory time series
2. **Learn representation Z:** CRL methods
3. **Fit "Lagrangian":** Generalized Lagrangian L = T - V where T, V are learned functions
4. **Check structure:**
   - Are there conserved quantities? (Noether test)
   - Is coupling sparse?
   - Do Euler-Lagrange equations fit the dynamics?

**Prediction:** If epimechanics is right, economic systems with stable oscillations should have Lagrangian structure in the right coordinates.

### Phase 3: The Q1-Q5 test

**Given a learned representation Z:**

1. Compute coupling tensor T^i_j = ∂Ż^i/∂Z^j
2. Identify bonds (large |T^i_j|) and loops (cycles in the coupling graph)
3. Assign Q1-Q5 descriptors to each bond
4. Predict entity type from the Q1-Q5 profile
5. Check if prediction matches known system type

**This closes the loop:** Raw data → representation → structure → entity type → prediction

---

## The Independent Mechanisms Principle

Schölkopf's key insight: **Causal mechanisms are independent.**

In epimechanics language: **Bonds are sparse.**

These are the same claim:
- Independent mechanisms ↔ T^i_j is sparse (most pairs don't directly couple)
- Invariance under intervention ↔ Changing one bond doesn't change others

**The connection to ML training:**

When a neural network learns a good representation:
- It's finding coordinates where the dynamics are simple
- Simple dynamics = sparse coupling = independent mechanisms
- This is why overparameterized networks generalize: they find the representation where the data has simple structure

**Epimechanics claim:** That "simple structure" is specifically *Lagrangian* structure, not just any simplicity.

---

## What Would Prove Epimechanics

1. **CRL-derived representations fit Lagrangians better** than random representations
2. **Sparse coupling correlates with independent mechanisms** in the CRL sense
3. **Q1-Q5 classification predicts system behavior** in a novel domain

## What Would Falsify Epimechanics

1. CRL-derived representations have **no better Lagrangian fit** than random
2. Sparse coupling and mechanism independence are **unrelated**
3. Q1-Q5 classification **doesn't predict anything** that simpler methods miss

---

## Immediate Next Steps

1. **Replicate LNN on double pendulum** — establish baseline
2. **Add CRL front-end** — learn representation from video, feed to LNN
3. **Compare fit quality** — does CRL help?
4. **Extend to non-physics** — try on economic/biological time series

This is a tractable research program. If it works, epimechanics has teeth. If not, we learn why.

---

## Key Papers to Build On

1. **Greydanus et al. (2019)** — Hamiltonian Neural Networks
2. **Cranmer, Greydanus et al. (2020)** — Lagrangian Neural Networks
3. **Brunton et al. (2016)** — SINDy: Sparse Identification of Nonlinear Dynamics
4. **Schölkopf et al. (2021)** — Towards Causal Representation Learning
5. **Locatello et al. (2020)** — Weakly-supervised disentanglement

The tools exist. The question is whether they connect the way epimechanics claims.
