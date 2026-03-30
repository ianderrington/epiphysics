# FINAL HANDOFF: Epimechanics Research Program

**Date:** 2026-03-29
**Session:** Full day development
**Status:** Foundation complete, ready for implementation

---

## What Was Built Today

### Theory Documents (docs/theory/)

| File | Content |
|------|---------|
| `00_prelude.md` | Foundations — vocabulary, commitments, REP conjecture |
| `00b_event_layer.md` | Event Layer — causal primitives, cause-plex, what's CST vs ours |
| `01_5_causors.md` | Causors — bonds, loops, Q1-Q5 descriptors, worked examples |

**Key refinement:** Honest attribution. CST gets credit for spacetime derivation. Our contribution is the multi-scale extension (untested hypothesis).

### Research Documents (docs/research/)

| File | Content |
|------|---------|
| `empirical_validation_proposal.md` | Full experimental design |
| `validation_brainstorm.md` | Expanded possibilities, alternative approaches |
| `causal_representation_learning_connection.md` | Bridge to ML (CRL, LNN, SINDy) |
| `autoregressive_causality_connection.md` | AR models and causal structure |
| `attention_as_causal_coupling.md` | Attention = learned coupling tensor |
| `causal_coupling_mechanisms_hypothesis.md` | Attention as ONE mechanism, not THE answer |
| `benchmark_causal_analysis_program.md` | Validate from public benchmark data |
| `model_topology_theory.md` | **Quantitative predictions from topology** |
| `HANDOFF_epimechanics_ml_bridge.md` | Earlier handoff (superseded by this) |

---

## The Core Theoretical Framework

### Level 1: Epimechanics Primitives

**Causal event:** $e: \mathcal{S}_i \to \mathcal{S}_j$ (state transition)

**Cause-plex:** $(E, \prec)$ — partial order of causal events

**Bond:** Recurring causal pattern $b: X_i \rightrightarrows X_j$

**Loop:** Closed composition of bonds $\mathcal{L}: X_i \rightrightarrows ... \rightrightarrows X_i$

**Coupling tensor:** $T^i{}_j = \partial \dot{X}^i / \partial X^j$

**Auto-causal density:** $\rho_{\text{ac}} = \text{(flow through loops)} / \text{(total flow)}$

### Level 2: Q1-Q5 Bond Descriptors

| Descriptor | Question | Values |
|------------|----------|--------|
| Q1 | Energy type | Kinetic / Potential |
| Q2 | Target | Direct / Gate / Enable |
| Q3 | Loop membership | Open chain / Closed loop |
| Q4 | Leverage | Λ = output/input |
| Q5 | Timescale | τ_bond / τ_system |

### Level 3: The Conjectures

**REP (Representational Efficiency Principle):** Optimal representations have Lagrangian structure — sparse coupling, conserved quantities, low dimension.

**Status:** Conjecture. Plausible but unproven.

---

## The ML Bridge

### Core Insight

**Tokenization + Mechanism = Learned Causal Structure**

- **Tokenization:** Defines causal units (what are the entities?)
- **Mechanism:** Learns coupling (how do they interact?)
- **AR objective:** Enforces causality (predict effects from causes)

### Attention as Coupling

The attention matrix $A_{ij}$ IS the coupling tensor $T^i{}_j$:
- $A_{ij}$ = how much token $j$ influences token $i$
- Causal masking = enforcing $j \prec i$
- Sparse attention = sparse coupling
- Multi-head = multiple bond types

**But:** Attention is ONE mechanism. Not necessarily optimal.

### Mechanism-Data Match

| Data Causal Structure | Best Mechanism |
|----------------------|----------------|
| Dense global | Full attention |
| Sparse | Sparse attention, SSMs |
| Local | Convolution |
| High ρ_ac (loops) | Recurrence, state space |
| Hierarchical | Multi-scale |

**Scaling limit hypothesis:** $E_\infty \propto \text{mismatch}(\text{mechanism}, \text{data structure})$

---

## The Quantitative Theory

### Model Topology

A neural network is a computational graph $G = (V, E, W)$.

**Topological invariants** (computable without training):

| Invariant | Definition | What it predicts |
|-----------|------------|------------------|
| Betti numbers $\beta_k$ | Holes in the graph | Loop structure, recurrence |
| Spectral gap $\lambda_2$ | Fiedler eigenvalue | Information mixing, gradient flow |
| Path entropy | Distribution of path lengths | Computational diversity |
| Effective dimension | Rank of weight matrices | Capacity, compression |
| MDL(G) | Description length | Generalization bound |

### Quantitative Predictions

$$\text{Capacity}(G) \leq f(\beta_0, \beta_1, ..., n_{\text{params}})$$

$$\text{Convergence rate} \propto \lambda_2(G)$$

$$\text{Generalization gap} \propto \frac{\text{MDL}(G)}{\text{Dataset size}}$$

$$\text{OOD accuracy} \propto \exp\left(-d(\text{model topology}, \text{data topology})\right)$$

### Monte Carlo Over Model Space

Sample architectures, compute invariants, predict performance:

```python
for G in sample_architectures(distribution_params):
    invariants = compute_topology(G)
    predicted_performance = f(invariants)
    # No training required
```

This enables:
- Search architecture space cheaply
- Estimate variance
- Find optimal regions

### Generating Architectures

**Input:** Task causal specification
**Output:** Minimal architecture with required topology

1. Analyze task causal structure
2. Determine required $\beta_k$, spectral gap, depth
3. Generate graph meeting requirements
4. Evaluate topologically
5. Train only top candidates

---

## Implementation Roadmap

### Phase 1: Topology Library (2-4 weeks)

Build tools to compute invariants:

```python
class ModelTopology:
    def __init__(self, model):
        self.graph = model_to_graph(model)
    
    def betti_numbers(self):
        return compute_homology(self.graph)
    
    def spectral_gap(self):
        L = laplacian(self.graph)
        return sorted(eigvals(L))[1]
    
    def effective_dimension(self):
        W = self.model.get_weights()
        return participation_ratio(singular_values(W))
    
    def mdl(self):
        return description_length(self.graph)
```

### Phase 2: Validation on Known Architectures (2-4 weeks)

Compute invariants for:
- Transformer variants (full, sparse, local)
- State space models (S4, Mamba)
- Recurrent (LSTM, GRU)
- Convolutional (TCN)

Correlate with known performance on standard benchmarks.

### Phase 3: Prediction Testing (4-8 weeks)

1. Compute topology of model + data
2. Predict performance
3. Compare to actual performance
4. Refine prediction functions

### Phase 4: Architecture Generation (4-8 weeks)

1. Define target topology from task
2. Generate candidate architectures
3. Evaluate topologically
4. Train top candidates
5. Compare to NAS baselines

---

## Key Files for Continuation

### Theory
- `docs/theory/00_prelude.md` — Start here for vocabulary
- `docs/theory/00b_event_layer.md` — Causal primitives
- `docs/theory/01_5_causors.md` — Bond/loop structure

### Research Direction
- `docs/research/model_topology_theory.md` — **Main quantitative theory**
- `docs/research/causal_coupling_mechanisms_hypothesis.md` — Mechanism space
- `docs/research/HANDOFF_epimechanics_ml_bridge.md` — Earlier ML bridge

### Audits
- `docs/research/audits/2026-03-29-*.md` — Review history

---

## Open Questions

### Theoretical

1. **What is the exact form of capacity bounds?** $f(\beta_k, ...)$ needs derivation
2. **How does training change topology?** Track $\beta_k(t)$, effective dim during training
3. **What's the right distance between topologies?** Wasserstein on persistence diagrams?

### Empirical

1. **Do invariants predict performance?** Need correlation studies
2. **Which invariants matter most?** Feature importance analysis
3. **Does topology-guided generation beat NAS?** Direct comparison

### Practical

1. **Compute cost of topology analysis?** Is it cheaper than training?
2. **How to handle continuous-valued weights?** Thresholding to graph?
3. **Scale to large models?** Efficient algorithms for big graphs?

---

## Summary

**What we built:**
1. Foundational theory documents (honest about what's CST vs ours)
2. ML bridge (attention as coupling, mechanisms as hypothesis space)
3. Quantitative theory (topological invariants → predictions)
4. Research program (validate on benchmarks, generate architectures)

**The core claim:**
Model topology determines capacity, trainability, generalization. We can compute this without training, predict performance, and generate optimal architectures.

**Next step:**
Build the topology library. Compute invariants for known architectures. Validate predictions.

---

## Repository State

```
~/git/ianderrington/epiphysics/
├── docs/
│   ├── theory/
│   │   ├── 00_prelude.md
│   │   ├── 00b_event_layer.md
│   │   ├── 01_5_causors.md
│   │   └── ... (other theory docs)
│   ├── research/
│   │   ├── model_topology_theory.md  ← KEY
│   │   ├── causal_coupling_mechanisms_hypothesis.md
│   │   ├── benchmark_causal_analysis_program.md
│   │   ├── attention_as_causal_coupling.md
│   │   ├── autoregressive_causality_connection.md
│   │   ├── causal_representation_learning_connection.md
│   │   ├── empirical_validation_proposal.md
│   │   ├── validation_brainstorm.md
│   │   ├── HANDOFF_epimechanics_ml_bridge.md
│   │   ├── HANDOFF_FINAL_2026-03-29.md  ← THIS FILE
│   │   └── audits/
│   │       └── 2026-03-29-*.md
│   └── applications/
│       └── index.md
└── ...
```

All changes committed and pushed to origin.

---

*This represents a full day's theoretical development. The foundation is laid for a quantitative, computable, generative theory of neural architectures based on topology.*
