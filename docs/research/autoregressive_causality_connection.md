# Autoregressive Models and Causal Structure: An Epimechanics Perspective

**Date:** 2026-03-29
**Status:** Exploratory — working through the connection

---

## The Core Question

Can epimechanics explain why autoregressive models work, and can it derive better training objectives (like masking strategies) from causal principles?

---

## Two Kinds of Representation

You mentioned "two representations generally" — I think you mean:

1. **Continuous/analog representation** — state as a point in continuous space (X ∈ ℝⁿ)
2. **Discrete/digital representation** — state as a sequence of tokens (X ∈ V*)

The claim might be: **Tokenization is itself a causal operation** — it's a compression that preserves causal structure while discarding causally-irrelevant detail.

---

## Why Autoregressive Models Might Be "Fundamentally Better"

### The Causal Argument

An autoregressive model predicts:
$$P(x_t | x_{t-1}, x_{t-2}, ..., x_1)$$

This is **causally correct** — it respects the arrow of time. The model only conditions on the past, never the future.

A bidirectional model (like BERT's MLM) predicts:
$$P(x_t | x_{t-1}, ..., x_1, x_{t+1}, ..., x_T)$$

This is **causally incorrect** — it conditions on the future, which is not available at inference time for generation.

**But wait:** BERT works great for understanding. So "causal correctness" isn't the whole story.

### The Model-Free Argument

Here's the deeper point:

**Autoregressive models are model-free given the right tokenization.**

What does this mean?

- A "model" in the traditional sense is a parameterized function that maps inputs to outputs
- An autoregressive model over tokens doesn't assume any functional form for the dynamics — it just learns P(next | past)
- The tokenization does the work of defining what "state" means
- Given the tokenization, the autoregressive objective is **universal** — it works for any sequential process

**The tokenization IS the representation choice.** Once you've chosen how to discretize the world into tokens, the autoregressive objective follows from causality alone.

### Connection to Epimechanics

In epimechanics terms:

- The **cause-plex** is the graph of causal events
- **Tokenization** is a coarse-graining that maps continuous state to discrete symbols
- A **good tokenization** preserves causal structure: if A → B in the continuous system, then token(A) → token(B) in the discrete system
- **Autoregressive prediction** is learning the transition structure of the coarse-grained cause-plex

**Claim:** A tokenization that preserves causal structure makes autoregressive prediction optimal. A tokenization that destroys causal structure makes it impossible.

---

## Deriving Masking from Auto-Causality

### Current Masking Approaches

- **Random masking (BERT):** Mask 15% of tokens randomly, predict them
- **Span masking (T5):** Mask contiguous spans
- **Causal masking (GPT):** Mask all future tokens

### What Would Causally-Derived Masking Look Like?

If we take the causal structure seriously:

1. **Identify causal bonds** in the token sequence — which tokens causally influence which others?
2. **Mask based on causal structure** — mask tokens that are causally downstream of unmasked tokens
3. **The prediction objective becomes:** Given causes, predict effects

For video/images ("frames or stills"):

- **Temporal causality:** Frame t causes frame t+1 (forward prediction)
- **Spatial causality:** In a single frame, some regions cause others (e.g., object → shadow)
- **Hierarchical causality:** Low-level features cause high-level features

**A causally-derived masking strategy would:**
1. Analyze the causal graph of the data
2. Mask effects, keep causes
3. Train the model to predict effects from causes

This is different from random masking — it's structured by the actual causal flow.

---

## The ρ_ac Connection

Here's where it gets interesting:

**Auto-causal density (ρ_ac)** measures the fraction of causal flow that loops back on itself.

For a model learning from data:
- High ρ_ac in the data → the data has self-sustaining structure → the model can learn to predict without external information
- Low ρ_ac → the data depends on external causes not in the dataset → prediction is fundamentally limited

**Hypothesis:** The learnability of a dataset is related to its ρ_ac. Datasets with higher ρ_ac (more closed causal loops) are more learnable by autoregressive models.

**Why?** Because autoregressive models assume the future is determined by the past. If the true causal structure has lots of external inputs (low ρ_ac), this assumption is violated.

---

## Deriving Tokenization from Causal Structure

The deepest question: **Can we derive the right tokenization from first principles?**

Current tokenization is ad-hoc:
- BPE for text (statistical, not causal)
- Patches for images (spatial, not causal)
- Frames for video (temporal, somewhat causal)

**A causally-principled tokenization would:**
1. Identify the natural "causal units" of the data — regions/intervals where internal causation is strong and external coupling is weak
2. Define tokens as these causal units
3. The token vocabulary emerges from the causal structure of the domain

This connects to **causal coarse-graining** (Erik Hoel's work) — the "right" level of description is where causal information is maximized.

---

## Concrete Proposals

### 1. Causal Tokenization for Video

Instead of uniform patches/frames:
1. Run optical flow to identify causal relationships between regions
2. Cluster regions by causal coupling strength
3. Define tokens as causally-coherent regions (not rectangular patches)
4. Train autoregressive model on these causal tokens

**Prediction:** Causal tokenization should outperform patch tokenization for prediction tasks, because it respects the structure the model needs to learn.

### 2. ρ_ac-Derived Masking

For any dataset:
1. Estimate the causal graph (using Granger causality, transfer entropy, or learned structure)
2. Compute ρ_ac for different subsets of tokens
3. Mask tokens with low ρ_ac (those that depend most on external causes)
4. This focuses the model on learning the self-sustaining structure

**Prediction:** ρ_ac-derived masking should be more sample-efficient than random masking, because it focuses on learnable structure.

### 3. Representation Learning as Lagrangian Discovery

If the optimal representation has Lagrangian structure (the REP conjecture), then:
1. The latent space of a well-trained model should have conserved quantities
2. We can check this: train a model, extract latents, test for conservation laws
3. Models that discover Lagrangian structure should generalize better

**This connects autoregressive training to physics:** The model is discovering the "equations of motion" of the data in a coordinate system where those equations are simple.

---

## The Two Representations Revisited

You said "two representations generally" — I think the deep point is:

1. **Continuous (analog):** State as position in a manifold. Good for physics, bad for computation.
2. **Discrete (digital):** State as symbol sequence. Good for computation, requires choosing tokenization.

**The bridge:** A good tokenization is a map from continuous to discrete that preserves causal structure.

**Autoregressive models are optimal for discrete representations** because discrete symbols have a natural ordering (the sequence) and causality flows along that ordering.

**The question becomes:** How do we find the tokenization that makes this true?

---

## What This Could Prove

If the framework holds:

1. **Why autoregressive works:** It aligns with causal structure when tokenization is right
2. **How to improve tokenization:** Derive it from causal analysis of the domain
3. **Why some datasets are harder:** Low ρ_ac means external causes dominate
4. **How to design masking:** Mask based on causal graph, not randomly
5. **Why models generalize:** They discover Lagrangian structure in the data

---

## Open Questions

1. **Is tokenization the only bottleneck?** Or does model architecture also need to respect causality?

2. **How do we estimate causal structure without a model?** Chicken-and-egg: we need causal structure to design the tokenization, but we need the tokenization to learn the structure.

3. **What about non-sequential data?** Images don't have a natural causal ordering. Does this framework extend?

4. **Can we actually compute ρ_ac for real datasets?** It requires knowing the causal graph, which is what we're trying to learn.

5. **Is there a "causal tokenization theorem"?** A formal result showing that causal tokenization + autoregressive = optimal?

---

## Next Steps

1. **Formalize the claim:** Write down precisely what "autoregressive is optimal given causal tokenization" means mathematically.

2. **Test on synthetic data:** Generate data from known causal graphs, compare causal vs. arbitrary tokenization.

3. **Apply to video:** Implement causal tokenization for video prediction, compare to patches.

4. **Connect to existing work:** How does this relate to causal representation learning, world models, etc.?

---

*This is speculative but potentially important. The connection between autoregressive models and causal structure could be the bridge between epimechanics and practical ML.*
