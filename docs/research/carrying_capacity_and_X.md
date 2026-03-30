# Carrying Capacity and the X Representation

**Date:** 2026-03-29
**Status:** Core connection — this grounds everything

---

## The Insight

A model has a **carrying capacity** — the amount of structure it can represent for a given data type/modality.

This is bounded by:
1. The model's architecture (what patterns it CAN represent)
2. The data's structure (what patterns EXIST to represent)
3. The match between them (how much of what exists can be captured)

**Carrying capacity = min(model capacity, data structure) weighted by match.**

---

## Connection to X (State Representation)

From epimechanics (00_prelude.md):

> **X** is a representation of state. Not state itself — a compression, an approximation.

The model learns an X. But:
- X is bounded by what the model can represent
- X is bounded by what the data contains
- X is only useful if it captures causally-relevant structure

### The X* Problem

There exists an optimal X* — the representation that:
- Minimizes bits needed to predict
- Maximizes causal fidelity
- Is sparse in the right basis

**But the model might not be able to represent X*.**

If model capacity < complexity of X*:
- Model learns a compressed/lossy version
- Prediction suffers
- Generalization limited

If model capacity > complexity of X*:
- Model CAN learn X*
- But might also learn noise
- Regularization needed

**Optimal:** Model capacity ≈ X* complexity

---

## Carrying Capacity Formalized

### For a Model M on Data D

$$C(M, D) = \text{mutual information between } M\text{'s representation and } D\text{'s structure}$$

Or more practically:

$$C(M, D) = \max_{W} I(X_M(W); S_D)$$

where:
- $X_M(W)$ = representation learned by model M with weights W
- $S_D$ = true structure of data D
- $I$ = mutual information

**Carrying capacity is the ceiling.** No matter how much you train, you can't exceed it.

### Decomposition

$$C(M, D) = \min(C_M, S_D) \cdot \text{Match}(M, D)$$

where:
- $C_M$ = intrinsic model capacity (architecture-dependent)
- $S_D$ = structure in data (data-dependent)
- Match = how well M's inductive bias aligns with D's structure

---

## Connection to Autoresearch

In autoresearch:
- Model architecture changes → $C_M$ changes
- Data fixed → $S_D$ fixed
- val_bpb measures how much structure is captured

**What autoresearch optimizes:** Find architecture that maximizes $C(M, D)$ for fixed D.

The val_bpb floor = what can't be captured = $S_D - C(M, D)$

---

## Connection to Data Modality

Different data types have different structure:

| Modality | Structure Type | What X Needs to Capture |
|----------|----------------|------------------------|
| Text | Sequential, hierarchical, long-range | Syntax, semantics, discourse |
| Images | Spatial, local, compositional | Objects, textures, scenes |
| Video | Spatiotemporal, causal | Motion, persistence, causation |
| Audio | Temporal, harmonic, rhythmic | Phonemes, prosody, music |
| Code | Graph, dependency, operational | Syntax, semantics, execution |

**A model optimized for one modality may have low carrying capacity for another.**

Transformer: high capacity for text (long-range), lower for local structure
CNN: high capacity for images (local), lower for long-range

---

## The Rep(X) from Theory

From the epimechanics framework:

$$\text{Rep}(X) = \text{representation of state } X$$

This is exactly what the model learns. And:

$$\text{Quality}(\text{Rep}(X)) \propto C(M, D)$$

Good representations = high carrying capacity for the relevant structure.

### What Makes a Good X?

From 00_prelude.md:
- Sparse in the right basis
- Captures causal structure
- Minimal bits for prediction

**These are all aspects of carrying capacity:**
- Sparse → efficient encoding → higher effective capacity
- Causal → captures what matters → higher useful capacity
- Minimal bits → compressed → capacity not wasted

---

## Grounding in Measurement

### How to Measure Carrying Capacity

1. **Probe tasks:** Train model, freeze, test on downstream tasks
   - High performance = high carrying capacity for that structure

2. **Compression ratio:** How much can model compress the data?
   - Higher compression = more structure captured

3. **Prediction residual:** What can't the model predict?
   - Residual = structure beyond carrying capacity

4. **Intervention tests:** Change data causally, see if model tracks
   - Tracks changes = captured causal structure

### For Autoresearch

Track these metrics across experiments:
- val_bpb (already tracked)
- Compression ratio (bits per token)
- Probe task performance (if possible)

**Correlate with architecture changes:** Which changes increase carrying capacity?

---

## Implications for Architecture Search

### The Goal

Find architecture M that maximizes $C(M, D)$ for target data D.

### Constraints

- $C_M$ is determined by architecture
- Can't exceed $S_D$ (no structure to capture)
- Match matters (right inductive bias)

### Search Strategy

1. **Estimate $S_D$:** What structure does the data have?
2. **Design for match:** Choose architecture that aligns with $S_D$
3. **Scale $C_M$ appropriately:** Enough capacity, not too much

**Autoresearch does this implicitly:** It searches for M that maximizes C(M, D), guided by val_bpb.

---

## The Bound

### No Free Lunch, Formalized

$$\text{Performance} \leq C(M, D) \leq \min(C_M, S_D)$$

You can't predict better than your carrying capacity.
You can't carry more than the data contains.
You can't carry more than your architecture allows.

### What This Means

- **Scaling limits:** Eventually hit $S_D$ ceiling (data has finite structure)
- **Architecture limits:** Eventually hit $C_M$ ceiling (model has finite capacity)
- **Match limits:** Wrong architecture → low effective capacity even if $C_M$ is high

---

## Connection to Everything Today

| Concept | Connection to Carrying Capacity |
|---------|--------------------------------|
| ρ_ac | High ρ_ac in data → certain structure → need capacity to capture loops |
| Q1-Q5 | Describe bond types → data has specific types → model needs capacity for those |
| Topology | Model topology determines $C_M$ |
| Autoresearch | Searches for M maximizing C(M, D) |
| Tokenization | Affects what structure is visible → affects effective $S_D$ |
| Attention/Mamba | Different $C_M$ profiles, different match characteristics |

---

## Actionable Implications

### For Theory

- Define $C(M, D)$ precisely (information-theoretic)
- Decompose into $C_M$, $S_D$, Match
- Derive bounds

### For Experiments

- Measure carrying capacity across architectures
- Measure structure in datasets
- Test if C(M, D) predicts performance

### For Autoresearch

- Log not just val_bpb but proxies for carrying capacity
- See if val_bpb improvement correlates with capacity increase
- Identify which architectural changes affect capacity

---

## Summary

**Carrying capacity** is the grounding concept:
- Model can only represent so much
- Data only contains so much
- Match determines how much transfers

This connects:
- X (representation) from epimechanics
- Model architecture capabilities
- Data structure
- Autoresearch optimization target

**The bound:** Performance ≤ C(M, D) ≤ min(C_M, S_D)

**The goal:** Maximize C(M, D) for your data by choosing right architecture.

---

*This grounds the theory in something measurable: how much can this model carry for this data?*
