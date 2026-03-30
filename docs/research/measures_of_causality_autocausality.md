# Measures of Causality and Auto-Causality

**Date:** 2026-03-30
**Status:** Operational definitions — what can actually be measured

---

## The Question

For a model M trained on data D, what are computable measures of:
1. **Causality** — does M capture causal structure of D?
2. **Auto-causality** — does M/D have self-sustaining loops?

---

## Part 1: Measures of Causality

### 1.1 Granger Causality

**Definition:** X Granger-causes Y if past values of X help predict Y beyond past values of Y alone.

$$\text{GC}(X \to Y) = \log \frac{\text{Var}(Y_t | Y_{<t})}{\text{Var}(Y_t | Y_{<t}, X_{<t})}$$

**For neural networks:**
- Replace regression with model predictions
- Compare: model with vs without access to X
- Difference = causal contribution of X

**Measurement:**
```python
def granger_causality(model, data, source_idx, target_idx):
    # Predict target with all inputs
    pred_full = model.predict(data)[:, target_idx]
    
    # Predict target with source masked
    data_masked = mask_feature(data, source_idx)
    pred_masked = model.predict(data_masked)[:, target_idx]
    
    # Granger causality = variance reduction
    var_full = variance(data[:, target_idx] - pred_full)
    var_masked = variance(data[:, target_idx] - pred_masked)
    
    return log(var_masked / var_full)
```

**Pros:** Well-established, computable
**Cons:** Only captures linear/predictive causality, not interventional

### 1.2 Transfer Entropy

**Definition:** Information transferred from X to Y beyond Y's own past.

$$\text{TE}(X \to Y) = I(Y_t; X_{<t} | Y_{<t})$$

**For neural networks:**
- Estimate conditional mutual information
- Use model's learned representations

**Measurement:**
```python
def transfer_entropy(model, data, source_idx, target_idx, history=5):
    # Get representations
    X_past = data[:-1, source_idx]  # X history
    Y_past = data[:-1, target_idx]  # Y history  
    Y_future = data[1:, target_idx]  # Y to predict
    
    # TE = I(Y_future; X_past | Y_past)
    # Estimate via KSG or neural estimator
    return conditional_mutual_information(Y_future, X_past, Y_past)
```

**Pros:** Information-theoretic, nonlinear
**Cons:** Hard to estimate accurately, requires density estimation

### 1.3 Interventional Causality

**Definition:** True causal effect = change in Y when we intervene on X (do-calculus).

$$\text{ACE}(X \to Y) = \mathbb{E}[Y | do(X=1)] - \mathbb{E}[Y | do(X=0)]$$

**For neural networks:**
- Intervene on activations/inputs
- Measure downstream effect
- This is what interpretability does

**Measurement:**
```python
def interventional_causality(model, data, source_idx, target_idx, intervention_value):
    # Original prediction
    pred_original = model.predict(data)[:, target_idx]
    
    # Intervene: set source to fixed value
    data_intervened = data.copy()
    data_intervened[:, source_idx] = intervention_value
    pred_intervened = model.predict(data_intervened)[:, target_idx]
    
    # Causal effect = change in prediction
    return mean(pred_intervened - pred_original)
```

**Pros:** True causality (not just correlation)
**Cons:** Requires ability to intervene, may be out-of-distribution

### 1.4 Attention as Causality Proxy

**For Transformers:** Attention weights indicate what the model "uses" to make predictions.

$$A_{ij} = \text{how much token } j \text{ influences token } i$$

**Measurement:**
```python
def attention_causality(model, data):
    # Forward pass, extract attention
    _, attention_weights = model.forward_with_attention(data)
    
    # attention_weights[layer][head][i][j] = influence of j on i
    # Aggregate across layers/heads
    causal_matrix = aggregate_attention(attention_weights)
    
    return causal_matrix
```

**Pros:** Directly available, no extra computation
**Cons:** Attention ≠ causality (model might attend to things it doesn't use)

### 1.5 Gradient-Based Causality

**Definition:** How much does changing X affect the loss for predicting Y?

$$\text{Grad}(X \to Y) = \left\| \frac{\partial L(Y)}{\partial X} \right\|$$

**Measurement:**
```python
def gradient_causality(model, data, source_idx, target_idx):
    data.requires_grad = True
    
    # Compute loss for target
    pred = model.predict(data)
    loss = loss_fn(pred[:, target_idx], data[:, target_idx])
    
    # Gradient w.r.t. source
    loss.backward()
    grad = data.grad[:, source_idx]
    
    return norm(grad)
```

**Pros:** Differentiable, works for any model
**Cons:** Local (linearized), may not capture nonlinear effects

---

## Part 2: Measures of Auto-Causality (ρ_ac)

### 2.1 Loop Detection in Causal Graph

**Definition:** ρ_ac = fraction of causal flow through closed loops.

**Step 1:** Build causal graph from one of the above measures
**Step 2:** Detect cycles
**Step 3:** Compute flow through cycles

```python
def rho_ac_from_graph(causal_matrix, threshold=0.1):
    # Threshold to get adjacency
    adj = (causal_matrix > threshold).astype(int)
    
    # Find all cycles
    G = nx.DiGraph(adj)
    cycles = list(nx.simple_cycles(G))
    
    # Compute flow through edges in cycles
    edges_in_cycles = set()
    for cycle in cycles:
        for i in range(len(cycle)):
            edges_in_cycles.add((cycle[i], cycle[(i+1) % len(cycle)]))
    
    # Flow = sum of causal weights
    cycle_flow = sum(causal_matrix[e] for e in edges_in_cycles)
    total_flow = causal_matrix.sum()
    
    return cycle_flow / total_flow if total_flow > 0 else 0
```

### 2.2 Recurrence Ratio

**For sequential models:** How much does the model rely on recurrent/feedback connections?

**For RNN/LSTM:**
$$\rho_{\text{recurrence}} = \frac{\|W_{hh}\|_F}{\|W_{hh}\|_F + \|W_{xh}\|_F}$$

Where $W_{hh}$ = hidden-to-hidden, $W_{xh}$ = input-to-hidden.

**For Transformers with residual:**
$$\rho_{\text{residual}} = \frac{\text{residual contribution}}{\text{total contribution}}$$

```python
def recurrence_ratio_transformer(model, data):
    # Forward with hooks to capture residual vs attention contribution
    residual_norms = []
    attention_norms = []
    
    for layer in model.layers:
        x_in = layer.input
        x_attn = layer.attention(x_in)
        x_out = x_in + x_attn  # residual connection
        
        residual_norms.append(norm(x_in))
        attention_norms.append(norm(x_attn))
    
    total_residual = sum(residual_norms)
    total_attention = sum(attention_norms)
    
    return total_residual / (total_residual + total_attention)
```

### 2.3 Self-Prediction Ratio

**Definition:** How much of the model's prediction comes from predicting itself (auto-regression)?

For autoregressive models, this is definitionally 1.0 (all prediction is self-prediction).

But we can measure: **how much does the representation persist?**

```python
def representation_persistence(model, data):
    # Get representations at each layer
    reps = model.get_all_layer_representations(data)
    
    # Compute similarity between consecutive layers
    persistence = []
    for i in range(len(reps) - 1):
        sim = cosine_similarity(reps[i], reps[i+1])
        persistence.append(mean(sim))
    
    return mean(persistence)
```

High persistence = representation maintains itself = auto-causal.

### 2.4 Eigenvalue Analysis (Stability of Dynamics)

**For state-space models (Mamba, S4):**

The state transition matrix A determines dynamics. Eigenvalues of A:
- |λ| < 1: decaying (information lost)
- |λ| = 1: persistent (information maintained)
- |λ| > 1: exploding (unstable)

**Auto-causality corresponds to eigenvalues near 1** — the system maintains itself.

```python
def state_persistence_ssm(model):
    # Extract state transition matrix A
    A = model.get_state_matrix()
    
    # Compute eigenvalues
    eigenvalues = np.linalg.eigvals(A)
    
    # Fraction near unit circle
    near_unit = np.abs(np.abs(eigenvalues) - 1) < 0.1
    rho_ac = near_unit.mean()
    
    return rho_ac, eigenvalues
```

### 2.5 Information Retention Over Time

**Definition:** How much information from timestep t survives to timestep t+k?

$$\rho_{\text{retain}}(k) = \frac{I(X_t; H_{t+k})}{I(X_t; H_t)}$$

Where $H_t$ = hidden state at time t.

```python
def information_retention(model, data, k_steps):
    retentions = []
    
    for t in range(len(data) - k_steps):
        # Information at time t
        h_t = model.get_hidden_state(data[:t+1])
        I_t = mutual_information(data[t], h_t)
        
        # Information at time t+k
        h_tk = model.get_hidden_state(data[:t+k+1])
        I_tk = mutual_information(data[t], h_tk)
        
        retentions.append(I_tk / I_t if I_t > 0 else 0)
    
    return mean(retentions)
```

---

## Part 3: Measures on Data (Independent of Model)

### 3.1 Data Auto-Correlation

**Simple measure:** How much does the data predict itself at lag k?

$$\text{ACF}(k) = \text{Corr}(X_t, X_{t+k})$$

**For multivariate:** Autocorrelation matrix.

### 3.2 Data Mutual Information Decay

$$\text{MI}(k) = I(X_t; X_{t+k})$$

How this decays with k indicates the "memory" in the data.

### 3.3 Granger Causality Matrix (Data)

Compute pairwise Granger causality for all variables:

$$G_{ij} = \text{GC}(X_j \to X_i)$$

Then compute ρ_ac from cycles in G.

### 3.4 Recurrence Quantification Analysis (RQA)

From dynamical systems theory:
- Build recurrence plot: $R_{ij} = \Theta(\epsilon - \|x_i - x_j\|)$
- Measure diagonal lines (determinism)
- Measure vertical lines (laminarity)

**High determinism + high laminarity = high auto-causality** (system revisits similar states).

---

## Part 4: Summary Table

### Causality Measures

| Measure | What It Captures | Computation | Limitations |
|---------|------------------|-------------|-------------|
| Granger Causality | Predictive causality | Variance comparison | Linear, not interventional |
| Transfer Entropy | Information flow | Conditional MI | Hard to estimate |
| Interventional | True causal effect | Intervention + prediction | Requires intervention |
| Attention weights | Model's focus | Direct extraction | Attention ≠ use |
| Gradient | Sensitivity | Backprop | Local, linearized |

### Auto-Causality Measures

| Measure | What It Captures | Computation | Best For |
|---------|------------------|-------------|----------|
| Loop detection | Cycles in causal graph | Graph algorithms | Any causal graph |
| Recurrence ratio | Feedback vs feedforward | Weight norms | RNN, Transformer |
| Representation persistence | State maintenance | Layer similarities | Deep networks |
| Eigenvalue analysis | Dynamical stability | Eigendecomposition | State-space models |
| Information retention | Memory over time | MI estimation | Sequential models |

### Data Measures (Model-Independent)

| Measure | What It Captures | Computation |
|---------|------------------|-------------|
| Autocorrelation | Linear self-dependence | Correlation at lag k |
| MI decay | Nonlinear memory | MI at lag k |
| Granger matrix | Pairwise causality | VAR models |
| RQA | Recurrence patterns | Recurrence plots |

---

## Part 5: Practical Recommendations

### For Autoresearch

Track these per experiment:
1. **Attention entropy** — is attention sparse or diffuse?
2. **Gradient flow** — are gradients reaching all layers?
3. **Representation persistence** — does information maintain?

### For Comparing Architectures

1. **Build causal graph** (Granger or Transfer Entropy)
2. **Compute ρ_ac** from cycles
3. **Compare:** Do architectures with higher ρ_ac match data with higher data-ρ_ac?

### For New Datasets

1. **Compute data autocorrelation/MI decay**
2. **Build Granger causality matrix**
3. **Compute data ρ_ac**
4. **Predict:** What architecture should match?

---

## Part 6: The Key Insight

**Causality** = directed influence (A affects B)
**Auto-causality** = closed influence (A affects B affects ... affects A)

For a model to capture auto-causal structure in data:
- Model must have the capacity (architecture allows loops/recurrence)
- Model must learn to use it (training finds the loops)
- Match between model auto-causality and data auto-causality predicts performance

**The measurable prediction:**

$$\text{Performance} \propto \text{Match}(\rho_{\text{ac}}^{\text{model}}, \rho_{\text{ac}}^{\text{data}})$$

This is testable: measure ρ_ac for models and data, see if match predicts.

---

*These are operational definitions. They can be computed. The question is: do they predict anything useful?*
