# Causal Coupling Mechanisms: A Hypothesis Space

**Date:** 2026-03-29
**Status:** Hypothesis framing — attention as one instance, not the answer

---

## The Reframe

Attention is ONE mechanism for learning causal coupling. There may be better ones.

**The general problem:** Given observations, learn the coupling tensor $T^i{}_j$ that captures causal structure.

**Attention's approach:** Soft weighting via dot-product similarity, constrained by masking.

**The question:** Is this optimal? Or is it just what we happened to find first?

---

## The Hypothesis Space

Any causal coupling mechanism must:
1. **Identify relevant causes** — which past states influence the current state
2. **Weight their influence** — how much each cause contributes
3. **Respect causal order** — not condition on effects
4. **Scale computably** — work on large state spaces

### Known Mechanisms

| Mechanism | How it learns coupling | Strengths | Weaknesses |
|-----------|----------------------|-----------|------------|
| **Attention (softmax)** | Dot-product similarity → soft weights | Differentiable, parallel | O(n²), all-to-all even when sparse |
| **Sparse attention** | Learned or fixed sparsity patterns | More efficient | Pattern must match true causality |
| **Linear attention** | Kernel approximation | O(n) | Less expressive |
| **State space models (S4, Mamba)** | Recurrent with structured matrices | O(n), captures long-range | Fixed coupling structure |
| **Graph neural networks** | Message passing on explicit graph | Respects known structure | Requires graph as input |
| **Recurrent (LSTM, GRU)** | Hidden state accumulation | O(n), sequential | Bottleneck, vanishing gradients |
| **Convolution** | Local fixed receptive field | Very efficient | Only local coupling |

### What Makes One Better?

**Hypothesis:** The optimal mechanism depends on the causal structure of the data.

- **Dense, global causality** → Full attention works
- **Sparse causality** → Sparse attention or SSMs
- **Local causality** → Convolution
- **Hierarchical causality** → Recursive / tree structures
- **Known graph** → GNNs

**The mistake:** Assuming one mechanism fits all data.

---

## Predicting Mechanism from Causal Structure

**Core claim:** If we know the causal structure of a domain, we can predict (or derive) the optimal coupling mechanism.

### Causal Properties → Mechanism Properties

| Causal property | Implies mechanism property |
|-----------------|---------------------------|
| Coupling is sparse | Mechanism should be sparse |
| Coupling is local in sequence | Convolution-like windows |
| Coupling has fixed pattern | Structured matrices (S4) |
| Coupling is hierarchical | Multi-scale / tree attention |
| Coupling changes with context | Learned dynamic routing |
| Long-range but sparse | Sparse attention with learned pattern |

### The ρ_ac Connection

**Hypothesis:** High ρ_ac (auto-causal, self-sustaining) data benefits from mechanisms with recurrence/persistence.

- State space models have built-in state persistence
- Attention with strong residuals similar
- Pure feedforward attention lacks this

**Prediction:** For high-ρ_ac data (biological, self-sustaining systems), SSMs or recurrent mechanisms may outperform pure attention.

---

## Scaling Laws and Limits

### Current Scaling Laws (Kaplan, Hoffmann)

$$L = \left(\frac{N_c}{N}\right)^{\alpha_N} + \left(\frac{D_c}{D}\right)^{\alpha_D} + E_\infty$$

- Loss decreases with model size N and data size D
- But hits a floor $E_\infty$ — irreducible error

### What Determines the Floor?

**Hypothesis:** $E_\infty$ is determined by the mismatch between mechanism and true causal structure.

$$E_\infty \propto D_{KL}(\text{learned coupling} \| \text{true coupling})$$

If the mechanism can't represent the true causal structure:
- More data won't help
- More parameters won't help
- You're bottlenecked by mechanism expressivity

### Predicting Scaling Limits

**If we can measure the causal structure:**

1. Compute the true $T^i{}_j$ (from domain knowledge or causal discovery)
2. Compute what each mechanism can represent
3. The gap predicts $E_\infty$

**Applications:**
- Predict which domains will hit walls sooner
- Know when to switch mechanisms
- Design mechanism to match domain

---

## Learning the Mechanism

### Current: Fixed mechanism, learned parameters

We choose attention, then learn the weights.

### Proposed: Learn the mechanism itself

**Meta-learning approach:**
1. Define a space of possible coupling mechanisms
2. Learn which mechanism fits each domain
3. Or: learn a domain-specific mechanism

**Neural Architecture Search (NAS) did this crudely.** But NAS searched over arbitrary architectures, not causally-principled ones.

**Causally-informed NAS:**
1. Estimate causal structure of target domain
2. Search over mechanisms that can represent that structure
3. Much smaller search space, more principled

### Mixture of Mechanisms

Different parts of the same sequence may have different causal structure.

**Example in language:**
- Syntax: local dependencies (convolution-like)
- Semantics: long-range (attention-like)  
- Discourse: hierarchical (tree-like)

**Proposal:** Route different aspects through different mechanisms.

This is related to mixture-of-experts, but the routing is based on causal structure, not learned arbitrarily.

---

## Deriving Mechanisms from First Principles

### The Goal

Given causal structure, derive the optimal mechanism — not search for it.

### What "Optimal" Means

1. **Representational sufficiency:** Can represent the true $T^i{}_j$
2. **Computational efficiency:** Minimal operations for the representation
3. **Sample efficiency:** Learns from minimal data
4. **Generalization:** Works on new data from same causal process

### Sketch of Derivation

**Given:** Causal graph $G$ over state variables
**Want:** Mechanism $M$ that learns $T^i{}_j$ efficiently

**Step 1:** Identify structure of $G$
- Sparsity pattern
- Locality
- Hierarchies
- Symmetries

**Step 2:** Match to mechanism class
- Sparse $G$ → sparse mechanism
- Symmetric $G$ → equivariant mechanism
- Hierarchical $G$ → multi-scale mechanism

**Step 3:** Derive parameters
- Receptive field size from causal chain length
- Number of heads from number of bond types
- Depth from longest causal path

**This inverts the current approach:** Instead of trying mechanisms and seeing what works, derive the right mechanism from domain analysis.

---

## Connection to Epimechanics

### Q1-Q5 as Mechanism Requirements

The Q1-Q5 bond descriptors might predict mechanism requirements:

| Descriptor | Mechanism implication |
|------------|----------------------|
| Q1: Energy type (kinetic/potential) | Momentum vs. position coupling |
| Q2: Target (direct/gate/enable) | Attention vs. gating mechanisms |
| Q3: Loop membership | Need for recurrence/state |
| Q4: Leverage ratio | Weight magnitude priors |
| Q5: Timescale | Attention span / context length |

**Hypothesis:** Analyzing Q1-Q5 of a domain predicts optimal mechanism.

### ρ_ac as Recurrence Requirement

$$\rho_{\text{ac}} > \text{threshold} \implies \text{need recurrence/state}$$

Pure feedforward attention has no persistent state. For high-ρ_ac data, this may be insufficient.

**Prediction:** State space models (Mamba, S4) should outperform attention on high-ρ_ac domains.

---

## Experimental Program

### Experiment 1: Mechanism vs. Causal Structure Match

**Setup:**
1. Generate data with known causal structures:
   - Dense global coupling
   - Sparse local coupling
   - Hierarchical coupling
   - Recurrent/loopy coupling

2. Train multiple mechanisms on each:
   - Full attention
   - Sparse attention
   - State space model
   - Convolution

3. Measure:
   - Final loss
   - Sample efficiency
   - Generalization to new initial conditions

**Prediction:** Best mechanism matches causal structure of data.

### Experiment 2: Predict Scaling Limits

**Setup:**
1. Characterize causal structure of domain
2. Identify mechanism's representational capacity
3. Predict $E_\infty$ before training
4. Train and verify

**Success criterion:** Predicted $E_\infty$ matches observed within tolerance.

### Experiment 3: ρ_ac and Recurrence

**Setup:**
1. Generate datasets with varying ρ_ac
2. Train attention vs. state space models
3. Compare performance

**Prediction:** SSM advantage increases with ρ_ac.

### Experiment 4: Derive Mechanism from Domain

**Setup:**
1. Analyze causal structure of a new domain
2. Derive mechanism using the principled approach
3. Compare to:
   - Default attention
   - NAS-found architecture

**Prediction:** Derived mechanism competitive with or better than NAS, with far less search.

---

## The Bigger Picture

### Why This Matters

We're hitting scaling limits. More data and compute give diminishing returns. The next breakthrough may be:

**Match mechanism to domain structure.**

Instead of one architecture for everything, understand what each domain needs.

### Connection to AGI/Foundation Models

Current foundation models use one mechanism (attention) for all domains. This works because:
1. Attention is expressive (can approximate many structures)
2. Scale covers inefficiency

But: inefficient. We may be using 10x-100x more compute than necessary.

**If we could derive mechanisms:** Much more efficient training, same or better performance.

### The Epimechanics Contribution

Epimechanics provides vocabulary for describing causal structure:
- Q1-Q5 for bond types
- ρ_ac for loop structure
- Coupling tensor sparsity

This vocabulary could bridge: domain analysis ↔ mechanism selection.

---

## Summary

**Attention is a hypothesis, not the answer.**

The right mechanism depends on the causal structure of the data. We should:

1. **Characterize** the causal structure of domains
2. **Predict** which mechanisms will work best
3. **Derive** mechanisms from structure, not search blindly
4. **Explain** scaling limits via mechanism-structure mismatch

Epimechanics may provide the vocabulary to do this systematically.

---

*This reframes the question: not "is attention causal?" but "what mechanism best captures causality for this domain?"*
