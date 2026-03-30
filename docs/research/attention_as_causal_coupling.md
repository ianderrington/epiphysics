# Attention Networks as Causal Coupling Discovery

**Date:** 2026-03-29
**Status:** Core insight — this may be the key connection

---

## The Insight

**Attention is learned causal coupling.**

The attention matrix $A_{ij}$ in a transformer directly encodes: "how much does token $j$ influence the representation of token $i$?"

This IS the coupling tensor $T^i{}_j$ in epimechanics terms.

---

## The Formal Correspondence

### Attention Mechanism

Standard attention:
$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right) V$$

The attention weights:
$$A_{ij} = \text{softmax}\left(\frac{q_i \cdot k_j}{\sqrt{d}}\right)$$

**$A_{ij}$ = how much token $j$ contributes to the new representation of token $i$**

### Epimechanics Coupling Tensor

$$T^i{}_j = \frac{\partial \dot{X}^i}{\partial X^j}$$

**$T^i{}_j$ = how much state $j$ influences the rate of change of state $i$**

### The Correspondence

| Attention | Epimechanics |
|-----------|--------------|
| $A_{ij}$ (attention weight) | $T^i{}_j$ (coupling strength) |
| Causal masking (lower triangular) | Causal partial order ($j \prec i$) |
| Sparse attention | Sparse coupling |
| Multi-head attention | Multiple coupling types (Q1-Q5?) |
| Layer depth | Temporal unfolding |

---

## Why Causal Masking Works

In autoregressive transformers, we mask future tokens:
$$A_{ij} = 0 \text{ if } j > i$$

**This enforces causal structure:** Token $i$ can only attend to tokens that come before it (its potential causes).

**In epimechanics terms:** We're enforcing $T^i{}_j = 0$ unless $j \prec i$ in the causal order.

Without causal masking (BERT-style), the model conditions on both causes and effects — which works for understanding but breaks for generation.

---

## What Attention Learns

### Hypothesis 1: Attention discovers causal structure

If the data has causal structure, attention should learn to put weight on causes:
- High $A_{ij}$ when $j$ actually causes $i$
- Low $A_{ij}$ when $j$ is independent of $i$

**Testable:** Compare learned attention to known causal graph. Do they align?

### Hypothesis 2: Sparse attention = sparse coupling

Efficient transformers use sparse attention (local windows, learned patterns).

**Prediction:** Sparse attention patterns should match the actual causal structure of the data. If data has local causal structure, local attention should work. If data has long-range causal structure, you need long-range attention.

### Hypothesis 3: Multi-head = multiple bond types

Multi-head attention learns different attention patterns in parallel.

**Interpretation:** Each head might capture a different type of causal relationship (Q1-Q5):
- One head for local dependencies (Q5: fast)
- One head for global dependencies (Q5: slow)
- One head for enabling relationships (Q2: enable)
- etc.

**Testable:** Do attention heads specialize by relationship type?

---

## Attention as Lagrangian Structure Discovery

If the REP conjecture is true (optimal representations are Lagrangian), then:

1. Attention learns the coupling structure
2. The learned coupling should be sparse (most $A_{ij} \approx 0$)
3. The dynamics in attention space should conserve something

### Conservation in Attention

**Hypothesis:** Well-trained transformers have conserved quantities in their representations.

For a sequence passing through layers:
$$h^{(l+1)} = f(h^{(l)}, A^{(l)})$$

**Question:** Is there a quantity $E(h)$ such that $E(h^{(l+1)}) \approx E(h^{(l)})$?

If yes, the transformer has discovered a Noether-like conservation law.

**How to test:**
1. Pass sequences through trained transformer
2. Compute candidate conserved quantities (norms, inner products, projections)
3. Check which are approximately constant across layers

---

## Deriving Attention from Causal Principles

### Current: Attention is postulated

The attention mechanism was designed based on intuition about relevance and alignment (Bahdanau 2014, Vaswani 2017).

### Proposed: Attention derived from causality

**Claim:** Attention is the optimal mechanism for learning causal coupling from sequences.

**Argument sketch:**
1. We want to learn $T^i{}_j$ (how much $j$ influences $i$)
2. We only observe sequences, not direct causal interventions
3. The best proxy: correlation weighted by temporal precedence
4. This is exactly what attention computes: $A_{ij} \propto \text{similarity}(q_i, k_j)$ where $j \leq i$

**If this is true:** Attention isn't just a useful mechanism — it's the *right* mechanism for causal structure discovery from passive observation.

---

## Implications for Architecture Design

### 1. Attention pattern should match data causality

**Current practice:** Fixed patterns (local, global, sparse random)

**Proposed:** Learn the pattern from causal analysis of the domain
- For language: word-level causality (syntax, semantics)
- For video: spatial-temporal causality (motion, occlusion)
- For code: dependency causality (variables, functions)

### 2. Number of heads should match causal complexity

**Current practice:** 8, 12, 16 heads (hyperparameter)

**Proposed:** Number of heads = number of distinct causal relationship types
- If data has 3 types of causal bonds, use 3 heads
- If data has more, use more

### 3. Depth should match causal chain length

**Current practice:** 12, 24, 48 layers (more = better, until overfitting)

**Proposed:** Depth = longest causal chain in the data
- If effects propagate through 6 intermediate causes, need ≥6 layers
- More layers than needed = redundant; fewer = can't capture full causality

---

## ρ_ac in Attention Networks

### Computing ρ_ac from attention

$$\rho_{\text{ac}} = \frac{\text{attention flow through loops}}{\text{total attention flow}}$$

**For a single layer:** No loops (attention is feedforward)

**Across layers with residual connections:**
$$h^{(l+1)} = h^{(l)} + \text{Attention}(h^{(l)})$$

The residual connection creates a "loop" — the representation persists.

**Interpretation:** Residual connections implement auto-causality. The representation maintains itself across layers.

### Prediction

Models with stronger residual connections (higher implicit ρ_ac) should:
- Be more stable during training
- Generalize better
- Be more robust to perturbation

**Test:** Compare models with different residual strengths. Does ρ_ac predict these properties?

---

## Experimental Tests

### Test 1: Attention aligns with known causal structure

**Setup:**
1. Generate data from known causal graph (e.g., chain: A→B→C→D)
2. Train transformer on sequences
3. Extract attention patterns
4. Compare to true causal graph

**Prediction:** Attention weights should be high where true causal connections exist.

### Test 2: Sparse attention matches sparse causality

**Setup:**
1. Generate data with sparse causal structure (each variable has few causes)
2. Train transformer with learned sparse attention
3. Compare learned sparsity pattern to true causal sparsity

**Prediction:** Learned sparse patterns should match true causal structure.

### Test 3: Heads specialize by bond type

**Setup:**
1. Generate data with multiple causal relationship types (fast/slow, direct/gating)
2. Train multi-head transformer
3. Analyze what each head attends to

**Prediction:** Heads should specialize (one for fast dependencies, one for slow, etc.)

### Test 4: Conservation laws in transformer representations

**Setup:**
1. Train transformer on dynamical data (physics, video)
2. Extract representations at each layer
3. Search for conserved quantities

**Prediction:** Well-trained models have approximately conserved quantities.

---

## The Deep Connection

### Attention is causal inference without intervention

Pearl's hierarchy:
1. **Association:** P(Y|X) — observing correlations
2. **Intervention:** P(Y|do(X)) — causal effect
3. **Counterfactual:** P(Y_x|X=x') — what would have happened

Attention operates at level 1 (association) but approximates level 2 (intervention) through:
- Causal masking (enforcing temporal order)
- Learning (finding correlations that predict, not just correlate)

**Claim:** Autoregressive attention + next-token prediction ≈ causal structure learning

Because: predicting the future from the past is equivalent to learning P(effect | causes), which IS causal structure.

### Tokenization + Attention = Coarse-grained causality

- **Tokenization** defines the resolution (what are the causal units?)
- **Attention** learns the coupling (how do units influence each other?)
- **AR objective** enforces causality (predict effects from causes)

Together: a complete system for learning causal structure at a chosen resolution.

---

## Implications for Epimechanics

### Attention provides the mechanism for learning T^i_j

We don't need to hand-specify the coupling tensor. Attention learns it.

### Multi-head attention provides Q1-Q5 decomposition

Different heads capture different bond types. We can analyze learned heads to discover the Q1-Q5 structure of a domain.

### Transformers as cause-plex learners

A trained transformer has learned an approximation to the cause-plex of its training domain:
- Tokens = events
- Attention = causal ordering
- Layers = temporal unfolding
- Representations = state

### The test of epimechanics via transformers

If epimechanics is right:
1. Good transformers should have sparse attention (sparse coupling)
2. Good transformers should have conserved quantities (Lagrangian structure)
3. Attention patterns should cluster into Q1-Q5-like categories
4. ρ_ac computed from attention should predict generalization

These are testable on existing trained models.

---

## Next Steps

1. **Analyze attention patterns in trained models** — do they look like causal graphs?
2. **Compare to known causality** — on data where we know the true causal structure
3. **Search for conservation laws** — in transformer representations
4. **Cluster attention heads** — do they correspond to bond types?
5. **Compute ρ_ac** — from attention + residuals, correlate with performance

---

*This may be the central connection: attention networks are causal structure discovery machines. Epimechanics provides the vocabulary to describe what they're discovering.*
