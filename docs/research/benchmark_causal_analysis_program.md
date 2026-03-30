# Benchmark Causal Analysis Program

**Date:** 2026-03-29
**Status:** Research program design — extract predictions from existing public data

---

## The Approach

We don't need to run new experiments. We need to:

1. **Characterize datasets** — extract causal structure metrics from public benchmarks
2. **Characterize models** — classify architectures by what causal structures they can represent
3. **Correlate** — do models that match dataset causality perform better?
4. **Predict** — given a new dataset's causal profile, predict which architecture wins

---

## Part 1: Dataset Causal Characterization

### Target Benchmarks (Public, Many Models Tested)

**Language:**
- GLUE/SuperGLUE — many models, diverse tasks
- WikiText-103 — perplexity benchmark
- The Pile — diverse pretraining corpus
- MMLU — knowledge/reasoning

**Vision:**
- ImageNet — classification
- COCO — detection/segmentation
- Kinetics — video classification
- Something-Something — temporal reasoning

**Multimodal:**
- VQA — visual question answering
- LAION — image-text pairs

**Structured:**
- OGB (Open Graph Benchmark) — graph tasks
- MoleculeNet — molecular property prediction
- Weather/climate benchmarks

**Time Series:**
- ETT (Electricity Transformer) — forecasting
- Traffic, Exchange — standard forecasting benchmarks
- PhysioNet — medical time series

### Causal Metrics to Extract

For each dataset, compute:

| Metric | Definition | How to Estimate |
|--------|------------|-----------------|
| **Coupling sparsity** | Fraction of variable pairs with significant dependence | Mutual information matrix, threshold |
| **Locality** | How quickly coupling decays with distance | Correlation vs. lag/distance |
| **ρ_ac** | Fraction of variance in auto-causal loops | Granger causality, cycle detection |
| **Hierarchy depth** | Levels of nested structure | Hierarchical clustering, tree depth |
| **Timescale spread** | Ratio of longest to shortest dependencies | Autocorrelation decay spectrum |
| **Stationarity** | How much coupling changes over dataset | Windowed analysis variance |

### Estimation Methods

**For sequences (text, time series):**
```python
def estimate_causal_metrics(sequences):
    # Coupling sparsity
    mi_matrix = compute_mutual_information_matrix(sequences)
    sparsity = (mi_matrix < threshold).mean()
    
    # Locality
    locality = fit_decay_curve(mi_matrix, distance_matrix)
    
    # ρ_ac (auto-causal density)
    granger_graph = compute_granger_causality(sequences)
    cycles = find_cycles(granger_graph)
    rho_ac = flow_through_cycles / total_flow
    
    # Timescale spread
    acf = compute_autocorrelation(sequences)
    timescales = extract_decay_timescales(acf)
    spread = max(timescales) / min(timescales)
    
    return {
        'sparsity': sparsity,
        'locality': locality,
        'rho_ac': rho_ac,
        'timescale_spread': spread
    }
```

**For graphs:**
```python
def estimate_graph_causal_metrics(graphs):
    # Sparsity is direct
    sparsity = 1 - average_density(graphs)
    
    # Locality from graph distance
    locality = clustering_coefficient(graphs)
    
    # ρ_ac from cycles
    cycles = find_all_cycles(graphs)
    rho_ac = edges_in_cycles / total_edges
    
    # Hierarchy from tree-likeness
    hierarchy = treeness_score(graphs)
    
    return metrics
```

---

## Part 2: Model Architecture Characterization

### Architectures to Classify

**Attention-based:**
- Transformer (full attention)
- Sparse Transformer (fixed sparse)
- Longformer (local + global)
- BigBird (random + local + global)
- Performer (linear attention)

**State Space:**
- S4
- Mamba
- H3
- RWKV

**Recurrent:**
- LSTM
- GRU
- xLSTM

**Convolutional:**
- TCN (Temporal Convolutional Network)
- WaveNet
- ConvNeXt

**Graph:**
- GCN
- GAT
- GraphSAGE

**Hybrid:**
- Mamba + Attention
- Conv + Attention

### Architecture Causal Capacity

For each architecture, characterize:

| Property | What it means |
|----------|---------------|
| **Max coupling range** | Longest dependency it can capture |
| **Coupling pattern** | Dense / sparse / local / structured |
| **State persistence** | Does it maintain state across steps? |
| **Parallelizability** | O(n) vs O(n²) |
| **Hierarchy support** | Multi-scale processing? |

### Architecture Capacity Table

| Architecture | Range | Pattern | State | Parallel | Hierarchy |
|--------------|-------|---------|-------|----------|-----------|
| Full Attention | ∞ | Dense | No | Yes | Via layers |
| Sparse Attention | ∞ | Sparse (fixed) | No | Yes | Depends |
| Local Attention | Window | Local | No | Yes | Limited |
| S4/Mamba | ∞ | Structured | Yes | Yes | Limited |
| LSTM | ∞ | Implicit | Yes | No | Limited |
| TCN | Receptive field | Local | No | Yes | Via dilation |
| GNN | Graph | Explicit | No | Yes | Message steps |

---

## Part 3: The Matching Hypothesis

### Core Prediction

$$\text{Performance} \propto \text{Match}(\text{Architecture Capacity}, \text{Dataset Causality})$$

More precisely:

$$\Delta \text{Loss} = f(\text{Capacity} - \text{Required})$$

- If capacity < required: model can't represent true structure, hits floor
- If capacity > required: model works but may be inefficient
- If capacity ≈ required: optimal efficiency

### Operationalizing "Match"

For each (dataset, architecture) pair, compute:

```python
def compute_match_score(dataset_metrics, arch_capacity):
    scores = []
    
    # Sparsity match
    if dataset_metrics['sparsity'] > 0.9:
        # Dataset is sparse
        if arch_capacity['pattern'] == 'sparse':
            scores.append(1.0)
        elif arch_capacity['pattern'] == 'dense':
            scores.append(0.5)  # Works but inefficient
    
    # Range match
    if dataset_metrics['timescale_spread'] > 100:
        # Long-range dependencies
        if arch_capacity['range'] == 'infinite':
            scores.append(1.0)
        else:
            scores.append(arch_capacity['range'] / dataset_metrics['max_range'])
    
    # State match (for high ρ_ac)
    if dataset_metrics['rho_ac'] > 0.5:
        if arch_capacity['state']:
            scores.append(1.0)
        else:
            scores.append(0.5)  # Can work via residuals
    
    return aggregate(scores)
```

---

## Part 4: Data Sources for Validation

### Model Performance Data

**Papers With Comparisons:**
- "Mamba: Linear-Time Sequence Modeling" — compares to Transformers on multiple benchmarks
- "Hungry Hungry Hippos (H3)" — systematic comparisons
- "RWKV" — Transformer vs RNN comparisons
- Long Range Arena paper — specifically tests long-range
- FlashAttention papers — efficiency comparisons

**Leaderboards:**
- Papers With Code — benchmark results
- Hugging Face Open LLM Leaderboard
- MTEB (embedding benchmarks)
- lm-evaluation-harness results

**What we need:**
- Same benchmark, multiple architectures
- Report loss/accuracy, not just "best"
- Ideally: scaling curves

### Existing Analyses

Some papers already compare architectures systematically:
- "What Makes a Good Tokenizer?" — tokenization analysis
- "Scaling Laws for Neural Language Models" — Kaplan et al.
- "Training Compute-Optimal LLMs" — Hoffmann et al.
- "An Empirical Study of Scaling Laws" — various

We can mine these for:
- Performance vs. compute curves
- Where different architectures plateau
- Which benchmarks favor which architectures

---

## Part 5: Concrete Execution Plan

### Phase 1: Dataset Characterization (2-4 weeks)

1. **Select 10-20 benchmarks** with multiple architecture results
2. **Download/access raw data** where possible
3. **Compute causal metrics** for each
4. **Create dataset causal profile table**

Deliverable: `dataset_causal_profiles.csv`

### Phase 2: Architecture Characterization (1-2 weeks)

1. **List architectures** tested on selected benchmarks
2. **Classify each** by causal capacity
3. **Create architecture capacity table**

Deliverable: `architecture_capacities.csv`

### Phase 3: Performance Data Collection (2-3 weeks)

1. **Scrape/collect** performance results from papers, leaderboards
2. **Normalize** (same metrics, same test sets)
3. **Create performance matrix** (architecture × dataset)

Deliverable: `performance_matrix.csv`

### Phase 4: Analysis (2-4 weeks)

1. **Compute match scores** for all (architecture, dataset) pairs
2. **Correlate** match score with performance
3. **Test predictions:**
   - Does match predict relative performance?
   - Does mismatch predict scaling limit?
   - Do specific metrics (ρ_ac, sparsity) predict specific architecture advantages?

4. **Visualize:**
   - Match score vs. performance scatter
   - Architecture ranking by dataset causal type
   - Scaling curves colored by match

Deliverable: Analysis report + figures

### Phase 5: Prediction Validation (ongoing)

1. **Hold out some benchmarks** from analysis
2. **Predict** best architecture from causal profile alone
3. **Check** against actual results
4. **Refine** metrics based on errors

---

## Part 6: Specific Predictions to Test

### Prediction 1: Mamba > Transformer on high-ρ_ac data

**Rationale:** Mamba has state persistence, Transformers don't (except via residuals). High ρ_ac data has self-sustaining loops that benefit from state.

**Test:** Find benchmarks with varying ρ_ac, plot Mamba-Transformer gap vs. ρ_ac.

### Prediction 2: Sparse attention ≈ dense attention on sparse data

**Rationale:** If true coupling is sparse, dense attention wastes capacity on zero-weight connections.

**Test:** Estimate coupling sparsity of benchmarks, check if sparse architectures match dense on high-sparsity data.

### Prediction 3: Long context models only help when timescale spread is high

**Rationale:** If all dependencies are local, long context is wasted.

**Test:** Compare long-context (100k+) vs. short-context (4k) models. Advantage should correlate with dataset timescale spread.

### Prediction 4: GNNs beat Transformers on data with explicit graph structure

**Rationale:** GNNs encode the structure; Transformers must learn it.

**Test:** On OGB benchmarks, compare GNN vs. graph Transformer performance.

### Prediction 5: Scaling limit (E_∞) correlates with mechanism mismatch

**Rationale:** If mechanism can't represent true coupling, no amount of scale helps.

**Test:** Fit scaling curves, extract E_∞, correlate with match score.

---

## Part 7: Tools and Infrastructure

### Data Collection
- `paperswithcode` API for benchmark results
- `huggingface` datasets for raw data
- Scraping paper tables (careful with accuracy)

### Causal Analysis
- `tigramite` — Granger causality, PCMCI
- `networkx` — cycle detection, graph metrics
- `statsmodels` — autocorrelation, time series analysis
- Custom code for MI estimation

### Visualization
- `matplotlib`, `seaborn` for static
- `plotly` for interactive exploration
- Standardized figure templates

### Reproducibility
- All metrics computation in versioned code
- Raw data sources documented
- Analysis notebooks in repo

---

## Part 8: Expected Outcomes

### If Predictions Hold

1. **Paper:** "Predicting Architecture Performance from Dataset Causal Structure"
2. **Tool:** Causal dataset profiler → architecture recommender
3. **Impact:** More principled architecture selection, less blind search

### If Predictions Fail

1. **Learn why:** Which metrics don't predict? Why?
2. **Refine theory:** Adjust causal metrics based on empirical signal
3. **Still valuable:** Systematic comparison framework, dataset characterization

### Either Way

- Publicly release dataset causal profiles
- Contribute to understanding of architecture-data fit
- Foundation for more targeted experiments

---

## Part 9: Open Questions

1. **How to estimate causal metrics from pretrained embeddings?**
   - Can we probe existing models instead of raw data?

2. **Does tokenization confound the analysis?**
   - Same data, different tokenizers → different causal structure?

3. **How to handle multi-task benchmarks?**
   - GLUE has diverse tasks — aggregate or separate?

4. **What about data mixture effects?**
   - Pretraining on diverse data — which causal structure dominates?

5. **Compute cost of causal analysis?**
   - Can we approximate cheaply for large datasets?

---

*This is a concrete research program. Public data, testable predictions, potential for real impact on architecture selection.*
