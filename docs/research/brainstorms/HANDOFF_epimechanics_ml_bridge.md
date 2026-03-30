# HANDOFF: Epimechanics ↔ Machine Learning Bridge

**Date:** 2026-03-29
**Author:** EPIPHYSICS agent session
**Purpose:** Complete handoff document for continuing this research direction
**Status:** Foundation laid, ready for implementation

---

## Executive Summary

This document captures a day's work connecting epimechanics (a framework for describing causal structure across domains) to practical machine learning. The core insight: **autoregressive models work because they respect causal structure, and the "right" tokenization is one that preserves causal relationships.**

This is not philosophy — it's a testable claim with concrete experimental designs and potential applications to representation learning, video prediction, and training objective design.

---

## Part 1: What Was Accomplished Today

### 1.1 Foundational Documents Refactored

Three core theory documents were created/refined:
- `docs/theory/00_prelude.md` — Foundations (vocabulary, commitments)
- `docs/theory/00b_event_layer.md` — Event Layer (causal primitives, cause-plex)
- `docs/theory/01_5_causors.md` — Causors (bonds, loops, Q1-Q5 descriptors)

**Key improvements:**
- Honest attribution: CST (causal set theory) gets credit for spacetime derivation
- Our proposals labeled as untested hypotheses
- "How to Use This" section with testable steps
- Worked examples (candle flame through all four layers)

### 1.2 Research Direction Established

The empirical validation program was designed:
- `docs/research/empirical_validation_proposal.md` — Full experimental design
- `docs/research/validation_brainstorm.md` — Expanded possibilities
- `docs/research/causal_representation_learning_connection.md` — ML bridge
- `docs/research/autoregressive_causality_connection.md` — AR models and causality

### 1.3 Critical Insight Identified

**The inverse Lagrangian problem:** Any smooth dynamical system can be given Lagrangian form in some coordinates. This could make the core claim (optimal representations are Lagrangian) trivially true.

**Resolution needed:** The claim must be "has a *simple/natural* Lagrangian" — one that's sparse, low-dimensional, with visible conserved quantities. Not just "a Lagrangian exists."

---

## Part 2: The Core Theoretical Claims

### Claim 1: Representational Efficiency ↔ Mechanical Structure

**Statement:** The representation that minimizes predictive cost also has maximal Lagrangian symmetry and sparse coupling.

**Formal version:**
$$X^* = \underset{X}{\operatorname{argmin}}\; C(X, \varepsilon) \implies X^* \text{ has sparse } T^i{}_j \text{ and admits } L(X, \dot{X})$$

where:
- $C(X, \varepsilon)$ = bits needed to predict at accuracy $\varepsilon$
- $T^i{}_j = \partial \dot{X}^i / \partial X^j$ = coupling tensor
- $L(X, \dot{X})$ = Lagrangian function

**Status:** Conjecture. Not proven. The connection between information-theoretic optimality and Lagrangian structure is the central open problem.

**Why plausible:**
- Symmetries → conserved quantities → constraints → fewer bits to specify future
- Sparse coupling → independent subsystems → parallel prediction → computational efficiency
- Low dimensionality → smaller state space → faster search

### Claim 2: Independent Mechanisms ↔ Sparse Coupling

**Statement:** Schölkopf's "independent causal mechanisms" principle is equivalent to sparse coupling in epimechanics.

**Formal version:**
$$\text{Mechanisms } M_i \text{ independent} \iff T^i{}_j \approx 0 \text{ for most } (i,j)$$

**Status:** This is closer to established. The causal representation learning literature already connects mechanism independence to sparse Jacobians.

### Claim 3: Auto-Causal Density Predicts Persistence

**Statement:** Systems with higher ρ_ac (more closed causal loops) persist longer under perturbation.

**Formal version:**
$$\rho_{\text{ac}} = \frac{\text{causal flow through loops}}{\text{total causal flow}}$$

$$\text{Persistence}(\text{system}) \propto \rho_{\text{ac}}(\text{system})$$

**Status:** Untested hypothesis. This is the most directly testable claim.

### Claim 4: Autoregressive Models Are Optimal Given Causal Tokenization

**Statement:** If the tokenization preserves causal structure, autoregressive prediction is optimal.

**Formal version:**

Let $T: \mathcal{S} \to V^*$ be a tokenization (map from continuous states to token sequences).

$T$ is **causal** if: $s_1 \to s_2$ in continuous dynamics implies $T(s_1)$ precedes $T(s_2)$ in sequence.

**Claim:** For causal tokenizations, the optimal predictor is:
$$P(x_t | x_{<t}) = P(x_t | \text{causes of } x_t)$$

which is exactly what autoregressive models learn.

**Status:** Intuitive but not formalized. Needs theorem.

---

## Part 3: The ML Connection — Detailed

### 3.1 Why Autoregressive Models Work

**The standard view:** AR models work because they're expressive and scale well.

**The causal view:** AR models work because they align with causal structure. They condition on the past (causes) to predict the future (effects). This is the *right* inductive bias for any causal process.

**Key insight:** The tokenization does the heavy lifting. Once you've discretized the world into tokens:
- Causal structure becomes sequential structure
- Predicting next token = predicting effect from causes
- No model of dynamics needed — just conditional probability

**This explains:**
- Why AR works across domains (text, images, video, code)
- Why tokenization choices matter so much
- Why wrong tokenizations fail (they break causal structure)

### 3.2 Deriving Tokenization from Causal Structure

**Current practice:** Tokenization is ad-hoc
- BPE for text (statistical, not causal)
- Patches for images (spatial grid, not causal)
- Frames for video (temporal, somewhat causal)

**Proposed approach:** Derive tokenization from causal analysis

**Algorithm sketch:**
```
1. Given: continuous observations X(t)
2. Estimate causal graph: which X^i influences which X^j?
3. Identify causal clusters: groups of variables with strong internal coupling, weak external coupling
4. Define tokens as causal clusters
5. Order tokens by causal flow (causes before effects)
6. Train AR model on this tokenization
```

**Prediction:** Causal tokenization outperforms arbitrary tokenization for prediction tasks.

### 3.3 Deriving Masking from Causal Structure

**Current practice:** Mask randomly (BERT, MAE)

**Proposed approach:** Mask based on causal graph

**For training:**
- Identify which tokens are effects of which others
- Mask effects, keep causes
- Train to predict effects from causes

**For video specifically:**
```
1. Compute optical flow / causal dependencies between regions
2. Identify causal graph: region A at time t → region B at time t+1
3. Mask downstream regions (effects)
4. Train to predict masked regions from unmasked (causes)
```

**Prediction:** Causal masking is more sample-efficient than random masking.

### 3.4 ρ_ac as Learnability Measure

**Hypothesis:** ρ_ac of a dataset predicts how learnable it is by AR models.

**Intuition:**
- High ρ_ac → most of the future is determined by the past in the data
- Low ρ_ac → the future depends on external causes not in the data

**For a dataset:**
$$\rho_{\text{ac}}(\text{dataset}) = \frac{\text{predictable variance}}{\text{total variance}}$$

This is related to but not identical with standard predictability measures.

**Applications:**
- Dataset difficulty estimation before training
- Identifying which parts of data are learnable
- Curriculum design (train on high-ρ_ac examples first)

### 3.5 Latent Space Lagrangian Structure

**Hypothesis:** Well-trained models discover Lagrangian structure in their latent spaces.

**Test:**
```
1. Train a model (VAE, world model, etc.) on dynamical data
2. Extract latent trajectories z(t)
3. Fit Lagrangian: L_θ(z, ż) using LNN
4. Check: 
   - Does L fit well? (low prediction error)
   - Are there conserved quantities? (∂H/∂t ≈ 0)
   - Is coupling sparse? (||∂ż^i/∂z^j||_0 small)
```

**Prediction:** Models that generalize well have more Lagrangian latent structure than models that don't.

---

## Part 4: Experimental Designs

### Experiment 1: Causal vs. Arbitrary Tokenization

**Objective:** Test whether causal tokenization improves prediction.

**System:** Video prediction (simplest case with clear causal structure)

**Protocol:**
```
Dataset: Moving MNIST, or real video with simple dynamics

Tokenizations to compare:
A. Grid patches (8x8, standard)
B. Random patches (same number, random shapes)
C. Causal patches (clustered by optical flow similarity)
D. Causal + temporal (causal patches, ordered by causal flow)

For each tokenization:
1. Train AR transformer (same architecture, same compute)
2. Measure prediction error on held-out video
3. Measure sample efficiency (performance vs. training data)

Success criterion: C or D significantly outperforms A and B
```

**Why this works:** Video has clear causal structure (objects persist, motion is smooth). If causal tokenization doesn't help here, it won't help anywhere.

### Experiment 2: Causal vs. Random Masking

**Objective:** Test whether causal masking is more efficient.

**System:** Video or time series with known causal structure

**Protocol:**
```
Dataset: Simulated physics (pendulum, fluid), known causal graph

Masking strategies:
A. Random (mask 15% of tokens uniformly)
B. Span (mask contiguous spans)
C. Causal (mask effects, keep causes, using known causal graph)
D. Anti-causal (mask causes, keep effects — should fail)

For each strategy:
1. Train MAE-style model
2. Measure reconstruction error
3. Measure downstream task performance (prediction, control)

Success criterion: C outperforms A, B; D performs worst
```

### Experiment 3: ρ_ac and Learnability

**Objective:** Test whether ρ_ac predicts learning difficulty.

**Protocol:**
```
Generate synthetic datasets with controlled ρ_ac:
1. Dynamical systems with varying amounts of external noise
2. ρ_ac = 1: fully deterministic, closed system
3. ρ_ac = 0: pure noise, no structure

For each dataset:
1. Compute ρ_ac from known dynamics
2. Train AR model
3. Measure final prediction error

Analysis:
- Plot prediction error vs. ρ_ac
- Fit: error = f(ρ_ac)

Success criterion: Strong negative correlation (higher ρ_ac → lower error)
```

### Experiment 4: Lagrangian Structure in Learned Representations

**Objective:** Test whether good models discover Lagrangian structure.

**Protocol:**
```
Systems: Pendulum, double pendulum, 3-body problem (known Lagrangians)

Models to compare:
A. VAE (standard)
B. β-VAE (disentangled)
C. World model (dynamics-aware)
D. Contrastive (SimCLR-style)

For each model:
1. Train on trajectory data
2. Extract latent representation z(t)
3. Fit LNN: L_θ(z, ż)
4. Measure:
   - Lagrangian fit quality (MSE)
   - Conservation law satisfaction (∂H/∂t)
   - Coupling sparsity (||J||_0)

Success criterion: Models that generalize better have better Lagrangian fit
```

---

## Part 5: Technical Implementation Notes

### 5.1 Estimating Causal Structure

**For video:**
- Optical flow gives instantaneous causal coupling
- Track objects across frames
- Build graph: region → region it flows into

**For time series:**
- Granger causality (linear)
- Transfer entropy (nonlinear)
- PCMCI algorithm (handles confounders)

**For learned representations:**
- Jacobian of dynamics: J^i_j = ∂f^i/∂x^j
- Sparsify: keep only large entries
- This gives the coupling graph

### 5.2 Computing ρ_ac

**Definition:**
$$\rho_{\text{ac}} = \frac{\sum_{\text{loops}} \text{flow through loop}}{\sum_{\text{all bonds}} \text{flow through bond}}$$

**Algorithm:**
```python
def compute_rho_ac(coupling_graph):
    # Find all cycles in the coupling graph
    cycles = find_all_cycles(coupling_graph)
    
    # Compute flow through each edge
    edge_flows = compute_edge_flows(coupling_graph)
    
    # Sum flow through edges that participate in cycles
    loop_flow = sum(edge_flows[e] for e in edges_in_cycles(cycles))
    
    # Total flow
    total_flow = sum(edge_flows.values())
    
    return loop_flow / total_flow
```

**Challenges:**
- Cycle enumeration is expensive for large graphs
- Need to weight by flow magnitude, not just topology
- Threshold for "significant" coupling

### 5.3 Lagrangian Neural Networks

**Implementation:** Use Cranmer & Greydanus (2020)

**Key equation:**
$$\ddot{q} = (\nabla_{\dot{q}} \nabla_{\dot{q}}^\top L)^{-1} [\nabla_q L - (\nabla_q \nabla_{\dot{q}}^\top L) \dot{q}]$$

**In JAX:**
```python
def lagrangian_dynamics(L, q, q_dot):
    # L is a neural network: L(q, q_dot) -> scalar
    
    # Compute Hessian w.r.t. q_dot
    H = jax.hessian(L, argnums=1)(q, q_dot)
    
    # Compute gradients
    dL_dq = jax.grad(L, argnums=0)(q, q_dot)
    dL_dqdot = jax.grad(L, argnums=1)(q, q_dot)
    
    # Mixed partial
    d2L_dq_dqdot = jax.jacfwd(jax.grad(L, argnums=1), argnums=0)(q, q_dot)
    
    # Solve for acceleration
    q_ddot = jnp.linalg.solve(H, dL_dq - d2L_dq_dqdot @ q_dot)
    
    return q_ddot
```

### 5.4 Causal Tokenization for Video

**Algorithm:**
```python
def causal_tokenize(video):
    # video: (T, H, W, C) array
    
    # 1. Compute optical flow between frames
    flows = [compute_flow(video[t], video[t+1]) for t in range(T-1)]
    
    # 2. Build causal graph over spatial regions
    #    Edge (i,j) if region i flows into region j
    causal_graph = build_causal_graph(flows)
    
    # 3. Cluster regions by causal coupling
    #    High internal coupling, low external coupling
    clusters = spectral_clustering(causal_graph, n_clusters=N_TOKENS)
    
    # 4. Define tokens as cluster contents
    tokens = []
    for t in range(T):
        for cluster_id in range(N_TOKENS):
            token = extract_cluster(video[t], clusters, cluster_id)
            tokens.append(token)
    
    # 5. Order by causal flow (topological sort of cluster graph)
    tokens = reorder_by_causality(tokens, causal_graph, clusters)
    
    return tokens
```

---

## Part 6: Connections to Existing Work

### 6.1 Causal Representation Learning (Schölkopf et al.)

**Their claim:** Representations aligned with causal structure are identifiable and transfer better.

**Our extension:** Those representations also have Lagrangian structure (sparse coupling, conserved quantities).

**Collaboration opportunity:** Test whether CRL-derived representations fit Lagrangians better than alternatives.

### 6.2 Lagrangian/Hamiltonian Neural Networks (Greydanus, Cranmer)

**Their contribution:** Neural networks constrained to have physical structure.

**Our extension:** Use them to *test* whether learned representations are physical, not just to impose physics.

**Collaboration opportunity:** Apply LNN fitting to representations from various learning algorithms.

### 6.3 SINDy (Brunton et al.)

**Their contribution:** Sparse identification of nonlinear dynamics from data.

**Our extension:** Connect sparsity to causal structure and learnability.

**Collaboration opportunity:** Use SINDy to identify causal structure, then test tokenization/masking strategies.

### 6.4 World Models (Ha, Schmidhuber, LeCun)

**Their claim:** Good world models compress observations into latent dynamics.

**Our extension:** The latent dynamics should be Lagrangian if the world model is good.

**Test:** Do world models that predict better have more Lagrangian latent spaces?

### 6.5 Erik Hoel's Causal Emergence

**His claim:** Higher-level descriptions can have more causal power than lower-level.

**Our connection:** The "right" level is where ρ_ac is maximized and Lagrangian structure is simplest.

**Collaboration opportunity:** Compare causal emergence measures to ρ_ac.

---

## Part 7: What Success Looks Like

### Immediate (3 months)

- [ ] Replicate LNN on standard physics problems
- [ ] Implement causal tokenization for video
- [ ] Compare causal vs. random tokenization on Moving MNIST
- [ ] Compute ρ_ac for synthetic datasets, correlate with learnability

### Medium-term (6-12 months)

- [ ] Publish: "Causal Tokenization Improves Video Prediction"
- [ ] Publish: "ρ_ac Predicts Dataset Learnability"
- [ ] Open-source: Causal tokenization library
- [ ] Validate on real video (not just Moving MNIST)

### Long-term (1-3 years)

- [ ] Prove: Formal theorem connecting causal tokenization to AR optimality
- [ ] Apply to: LLM tokenization (do BPE tokens respect causal structure of language?)
- [ ] Apply to: Scientific discovery (use ρ_ac to identify which systems have discoverable structure)
- [ ] Unify: Connect epimechanics, CRL, physics-informed ML into single framework

---

## Part 8: Risks and Mitigations

### Risk 1: The claims are trivially true

**Issue:** Any system might have Lagrangian structure in some coordinates (inverse problem).

**Mitigation:** Focus on *simple* Lagrangians — sparse, low-dimensional, in measurable coordinates. Define "simplicity" precisely (e.g., description length).

### Risk 2: Causal structure is too expensive to compute

**Issue:** Estimating causal graphs from data is hard and noisy.

**Mitigation:** Start with systems where causal structure is known (physics simulations, designed systems). Use approximate methods (optical flow, Granger causality) for real data.

### Risk 3: The effects are too small to matter

**Issue:** Causal tokenization might be only marginally better than random.

**Mitigation:** Choose domains where the effect should be large (video with clear causal structure). Measure effect sizes, not just significance.

### Risk 4: This is just relabeling existing ideas

**Issue:** Maybe "causal tokenization" is just a fancy name for "good tokenization."

**Mitigation:** Make specific predictions that differ from existing approaches. If causal tokenization predicts something random tokenization doesn't, it's not relabeling.

---

## Part 9: Resources and Starting Points

### Code

- **LNN:** github.com/MilesCranmer/lagrangian_nns
- **SINDy:** github.com/dynamicslab/pysindy
- **Causal discovery:** github.com/py-why/causal-learn
- **Optical flow:** OpenCV, RAFT

### Papers

1. Cranmer et al. (2020) — Lagrangian Neural Networks
2. Greydanus et al. (2019) — Hamiltonian Neural Networks
3. Schölkopf et al. (2021) — Towards Causal Representation Learning
4. Brunton et al. (2016) — SINDy
5. Hoel et al. (2013) — Causal Emergence

### Datasets

- Moving MNIST (synthetic, simple dynamics)
- Physics simulations (pendulum, fluid) — generate with PyBullet, Taichi
- Protein dynamics — MDTraj, Folding@Home
- Video prediction benchmarks — Kinetics, Something-Something

---

## Part 10: Summary for Next Session

**What we established:**

1. Epimechanics claims optimal representations have Lagrangian structure
2. This connects to ML: autoregressive models work because they respect causality
3. Tokenization is the key — good tokenization preserves causal structure
4. Masking strategies could be derived from causal graphs
5. ρ_ac might predict dataset learnability

**What needs to happen next:**

1. **Formalize:** Write down the theorems precisely
2. **Implement:** Build causal tokenization for video
3. **Test:** Compare to baselines on prediction tasks
4. **Iterate:** Refine based on results

**The big question:**

> Does causal structure determine optimal representation, and can we use this to build better ML systems?

If yes, this bridges physics and ML in a way that's practically useful.
If no, we learn why and revise.

---

*This handoff document captures a full day's work. The foundation is laid. The next step is implementation and testing.*
