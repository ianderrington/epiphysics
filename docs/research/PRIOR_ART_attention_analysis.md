# Prior Art: Attention Analysis

**Date:** 2026-03-30
**Status:** Literature review — what's already known

---

## Key Finding: This Has Been Extensively Studied

Attention entropy and attention patterns have been analyzed in depth. We're not discovering anything new by correlating attention entropy with perplexity.

---

## What's Already Known

### 1. Attention Entropy and Training Stability

**Paper:** "Stabilizing Transformer Training by Preventing Attention Entropy Collapse" (Zhai et al., ICML 2023)

**Findings:**
- Attention entropy **collapses** during training instability (goes to near-zero)
- This correlates with training divergence
- Preventing entropy collapse stabilizes training

**Implication:** Attention entropy is already known to matter for training dynamics. Not a novel measure.

### 2. Attention Patterns in BERT

**Paper:** "What Does BERT Look At?" (Clark et al., 2019)

**Findings:**
- Attention heads specialize: some attend to previous/next tokens, some to [SEP], some broadly
- Different heads capture different linguistic relations
- Many heads are "redundant" — pruning them doesn't hurt performance

**Paper:** "A Primer in BERTology" (Rogers et al., 2020)

**Findings:**
- Comprehensive review of 150+ papers analyzing BERT
- Attention patterns categorized: vertical (attend to one token), diagonal (attend to adjacent), block (attend to segment), heterogeneous
- Attention ≠ explanation (what model attends to isn't necessarily what it "uses")

### 3. Attention Entropy and Context Length

**Paper:** "Attention Entropy is a Key Factor" (2024)

**Findings:**
- Attention entropy affects parallel context encoding
- "Correlation does not imply causation" — they explicitly note this
- Attention sinks (high attention to first tokens) affect entropy patterns

---

## What This Means for Our Validation

### The Bad News

Attention entropy is **not a novel measure**. Running our MVP would replicate existing work, not discover new signal.

### The Good News

The existing work tells us:
1. **Attention entropy matters** — it's causally linked to training stability
2. **Attention patterns are structured** — not random, capture linguistic relations
3. **But attention ≠ causality** — what's attended to isn't necessarily causal

### The Real Question

The existing work analyzes attention **within** a model. 

Our question is different: **Does attention structure predict performance across models/architectures?**

That's less studied. But we should frame it correctly:
- Not: "Does attention entropy correlate with perplexity?" (known: yes, during training)
- But: "Do models with certain attention structures generalize better?" (less known)

---

## Revised Approach

### What's Worth Testing

Instead of attention entropy (well-studied), test measures that are:
1. **Cross-model** — compare across architectures, not within
2. **Less studied** — representation geometry, coupling structure
3. **Connected to our theory** — ρ_ac-like measures, not generic statistics

### Candidate Measures (Revised)

| Measure | Prior Art Status | Worth Testing? |
|---------|------------------|----------------|
| Attention entropy | Extensively studied | No (replicate) |
| Attention sparsity | Studied (pruning literature) | Maybe |
| Representation persistence | Less studied | Yes |
| Layer-wise similarity (CKA) | Studied but not linked to performance | Maybe |
| Effective dimension | Studied in some contexts | Yes |
| Granger causality between layers | Novel application | Yes |

### Better MVP

Instead of attention entropy, try:

**Representation persistence:** Does information maintain across layers?
```python
# Cosine similarity between layer L and layer L+1 representations
# Averaged across positions, across layers
# Correlate with perplexity
```

This is closer to our ρ_ac concept (self-maintaining structure) and less well-studied.

---

## Lessons Learned

1. **Check prior art before running experiments** — we almost replicated known work
2. **The screening loop is still valid** — just need better measure selection
3. **Our theoretical measures may actually be novel** — ρ_ac, coupling tensor structure, etc.

---

## Updated Priority

| Priority | Measure | Prior Art | Why Test |
|----------|---------|-----------|----------|
| 1 | Representation persistence | Limited | Closest to ρ_ac |
| 2 | Effective dimension | Some | Capacity-related |
| 3 | Cross-layer Granger causality | Novel | Direct causality measure |
| 4 | Attention sparsity | Moderate | Simple, different angle |

---

*Before running any experiment, search for prior art. We save time and avoid reinventing wheels.*
