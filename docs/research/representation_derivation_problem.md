# The Representation Derivation Problem

**Date:** 2026-03-29
**Status:** Core unsolved problem

---

## The Real Question

The framework claims:
1. Optimal representations have simple mechanical structure (sparse T^i_j, high symmetry)
2. The right level of description is where causal structure is sparse

**But we never derive which representation is optimal.** We just assume someone hands us X^i and T^i_j, then we analyze it.

**The actual test of epimechanics:**
Given a system (raw observations), can the framework *derive* what the state variables should be?

If not, we're just relabeling whatever representation domain science already uses.

---

## What Would "Deriving Representation" Mean?

### Input (what we observe):
- Raw time series data from sensors
- No prior knowledge of what variables matter

### Output (what framework should produce):
- Optimal state variables X^i
- Coupling tensor T^i_j
- Prediction of future states

### The Criterion:
The Representational Efficiency Conjecture says X* minimizes predictive cost:

$$X^* = \underset{X \in \mathcal{R}}{\operatorname{argmin}}\; C(X, \varepsilon)$$

**Can we actually compute this?**

---

## Existing Approaches (Not Ours)

### 1. Principal Component Analysis (PCA)
- Input: High-dimensional time series
- Output: Linear combinations that capture variance
- Problem: Finds variance, not causal structure

### 2. Independent Component Analysis (ICA)
- Input: Mixed signals
- Output: Statistically independent components
- Problem: Independence ≠ causal relevance

### 3. Dynamic Mode Decomposition (DMD)
- Input: Time series
- Output: Modes of the dynamics matrix
- Problem: Linear assumption, no causal structure

### 4. Causal Discovery (PC algorithm, etc.)
- Input: Observational data
- Output: Causal graph (what causes what)
- **This is closer** — but gives graph, not representation

### 5. Information Bottleneck (Tishby)
- Input: Data X, relevance variable Y
- Output: Compressed representation Z that preserves prediction
- **This is the information-theoretic version of REP**

---

## What Epimechanics Should Add

If epimechanics just rediscovers Information Bottleneck, it adds nothing.

**The claim is stronger:** The optimal representation has *mechanical* structure — Lagrangian, sparse coupling, conserved quantities.

**Test:** Given raw data, can we:
1. Find the representation that minimizes predictive cost (this is Information Bottleneck)
2. Show it has Lagrangian structure (this would be novel)
3. Use that structure to predict things IB alone can't

---

## A Concrete Protocol (If We Can Do It)

### System: Simple pendulum from video

**Raw input:** 
- Video frames of a swinging pendulum
- No physics knowledge assumed

**Step 1: Find minimal predictive representation**
- Use Information Bottleneck or autoencoder
- Compress video to latent variables Z
- Z should predict future frames

**Step 2: Check if Z has mechanical structure**
- Does Z have conserved quantities? (Noether test)
- Does Z have Lagrangian form L = T - V?
- Is the coupling sparse?

**Step 3: The novel prediction**
- If Z has Lagrangian structure, energy is conserved
- Predict: video of damped pendulum should show energy decrease at rate matching friction model
- Predict: inverted pendulum should be unstable (no stable fixed point in the Lagrangian)

**What this tests:**
- Does the learned representation *automatically* have mechanical structure?
- If yes, epimechanics is describing something real about optimal representations
- If no, the mechanical structure was imposed, not discovered

---

## The Hard Part

### How do you check if a learned representation has Lagrangian structure?

Given latent variables Z from an autoencoder:
1. Compute Ż (time derivative)
2. Try to fit L = ½ M Ż² - V(Z) 
3. Check if Euler-Lagrange equations match actual dynamics
4. Measure the fit residual

**If the residual is small:** The representation naturally has Lagrangian form
**If the residual is large:** It doesn't, or we haven't found the right coordinates

### The coordinate problem:

Even if the true representation is Lagrangian, the learned Z might be a nonlinear transformation that obscures it. 

Example: Pendulum in Cartesian (x, y) vs angle (θ)
- Both describe the same system
- Only θ gives simple Lagrangian L = ½ml²θ̇² - mgl(1-cosθ)
- (x, y) gives complicated constraints

**Can we find the coordinates where the Lagrangian is simple?**

This is the real question. If we can automate this, we've built something novel.

---

## Possible Approaches

### 1. Symmetry-Finding Algorithms
- Given dynamics, find transformations that leave equations invariant
- Noether's theorem then gives conserved quantities
- Conserved quantities suggest good coordinates

### 2. Sparse Regression on Dynamics (SINDy)
- Sparse Identification of Nonlinear Dynamics (Brunton et al.)
- Finds sparse representation of dynamics from data
- Could be extended to find coordinates where dynamics are sparse

### 3. Lagrangian Neural Networks
- Neural networks constrained to have Lagrangian structure
- If they fit data well, the system "is" Lagrangian in some coordinates
- Greydanus et al. (2019) — Hamiltonian Neural Networks

### 4. Causal Representation Learning
- Learn representations where intervention effects are sparse
- ICA + causality = finding independent causal factors
- Schölkopf et al. (2021) — Toward Causal Representation Learning

---

## The Minimum Viable Test

**Claim to test:** Systems with simple causal structure admit sparse Lagrangian representations.

**Protocol:**
1. Take 3 systems:
   - Simple pendulum (known to be Lagrangian)
   - Double pendulum (Lagrangian but chaotic)
   - Turbulent fluid (not obviously Lagrangian at macro scale)

2. For each, from raw sensor data:
   - Learn compressed representation (autoencoder)
   - Fit Lagrangian to learned representation
   - Measure fit quality (residual)

3. **Prediction:** Fit quality should correlate with "simplicity" of causal structure
   - Pendulum: excellent fit
   - Double pendulum: good fit (Lagrangian exists, just chaotic)
   - Turbulence: poor fit (no simple Lagrangian at this scale)

4. **Falsification:** If turbulence fits better than pendulum, something is wrong.

---

## What We Don't Know How To Do

1. **Automatically find good coordinates** — we can check if given coordinates are Lagrangian, but finding them is hard

2. **Define "predictive cost" computably** — Kolmogorov complexity is uncomputable; approximations (MDL, rate-distortion) may not match mechanical simplicity

3. **Prove the connection** — even if it works empirically, why should information-theoretic optimality imply Lagrangian structure?

---

## Next Steps

1. **Literature review:** What have Lagrangian Neural Networks and SINDy actually achieved? Can they find representations, or just fit given ones?

2. **Toy implementation:** Take pendulum video, learn representation, check Lagrangian fit. Does it work at all?

3. **Formalize the conjecture:** Write down precisely what we predict, so it's falsifiable.

---

## The Honest Assessment

Right now, epimechanics *describes* systems in mechanical language but doesn't *derive* the representation from first principles. 

The framework is useful if:
- It provides vocabulary for cross-domain comparison
- It suggests where to look for structure

The framework is *true* only if:
- Optimal representations actually have Lagrangian structure
- This can be demonstrated, not just assumed

We don't know if it's true. That's what the empirical program needs to find out.

---

*This is the hard problem. If we solve it, the framework is real. If we can't, it's philosophy.*
