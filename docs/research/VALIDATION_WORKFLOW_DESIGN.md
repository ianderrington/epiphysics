# Validation Workflow Design

**Date:** 2026-03-30
**Source:** FLUX response to EPIPHYSICS request
**Status:** Ready to implement MVP

---

## FLUX's Assessment

### 1. Correction: Correlation Screening, Not Validation

> "Correlation with a performance metric means a measure is *predictive* — not causal or theoretically meaningful."

The loop is **screening** to filter the measure space. Passing threshold = "worth investigating further," not "validated."

**Addition needed:** Replication step before promoting any measure:
- Correlate on one model family (e.g., GPT-style)
- Verify on different architecture (e.g., BERT-style)
- Measures that only correlate within-architecture are artifacts, not signals

### 2. Workflow Architecture

```yaml
id: epimechanics-measure-screen
steps:
  - id: select      # pop next measure from queue
  - id: compute     # load model + dataset, compute measure (HF/TransformerLens)
  - id: correlate   # Spearman vs performance metric
  - id: decide      # threshold → keep/discard/generate variant
  - id: log         # append to results.jsonl
  - id: requeue     # push variants or next measure
```

**Key insight:** Stateful measure queue (JSONL). Each run pops one, processes, logs, pushes variants. Loop until empty.

### 3. Minimum Viable Version

| Component | Choice | Why |
|-----------|--------|-----|
| **Measure** | Attention entropy | Extractable from any transformer, no custom code |
| **Model** | `gpt2` | Small, public, HuggingFace native |
| **Dataset** | WikiText-2 | Standard, perplexity as performance metric |

**~50 lines of Python:**
```python
# load gpt2, run on wikitext-2 samples
# compute mean attention entropy per layer per head
# compute perplexity on same samples
# Spearman correlation between entropy and perplexity
# if |r| > 0.3: log as candidate
```

### 4. Existing Tools

| Tool | Use For |
|------|---------|
| **TransformerLens** (Neel Nanda) | Mechanistic interpretability probing, attention hooks |
| **LM-Eval Harness** (EleutherAI) | Run model on benchmark, get metric |
| **BERTology** (Clark et al., 2019) | Prior art — read their methodology |
| **Platonic Representation Hypothesis** | Same loop, sophisticated measures |

> "Nothing does the full automated loop with a self-replenishing measure queue — that's the novel part worth building."

---

## Action Plan

### Step 1: Run MVP Manually (TODAY)

```python
# mvp_attention_entropy.py
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from datasets import load_dataset
from scipy.stats import spearmanr
import numpy as np

# Load model + tokenizer
model = GPT2LMHeadModel.from_pretrained('gpt2', output_attentions=True)
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model.eval()

# Load dataset
dataset = load_dataset('wikitext', 'wikitext-2-raw-v1', split='test')

# Sample N examples
N = 100
samples = dataset['text'][:N]

# For each sample: compute attention entropy and perplexity
entropies = []
perplexities = []

for text in samples:
    if len(text.strip()) < 10:
        continue
    
    inputs = tokenizer(text, return_tensors='pt', truncation=True, max_length=512)
    
    with torch.no_grad():
        outputs = model(**inputs, labels=inputs['input_ids'])
    
    # Perplexity
    loss = outputs.loss.item()
    ppl = np.exp(loss)
    perplexities.append(ppl)
    
    # Attention entropy (mean across layers, heads, positions)
    attentions = outputs.attentions  # tuple of (batch, heads, seq, seq)
    all_entropy = []
    for layer_attn in attentions:
        # Entropy of attention distribution per head per position
        attn = layer_attn[0]  # (heads, seq, seq)
        # Avoid log(0)
        attn = attn + 1e-10
        entropy = -torch.sum(attn * torch.log(attn), dim=-1)  # (heads, seq)
        all_entropy.append(entropy.mean().item())
    
    entropies.append(np.mean(all_entropy))

# Correlation
r, p = spearmanr(entropies, perplexities)
print(f"Spearman r = {r:.3f}, p = {p:.4f}")
print(f"N samples = {len(entropies)}")

if abs(r) > 0.3:
    print("→ CANDIDATE: Worth investigating further")
else:
    print("→ DISCARD: Weak or no correlation")
```

### Step 2: Time It

- Under 10 min → synchronous loop
- Over 10 min → async with results watcher

### Step 3: Based on Results

**If correlation found:**
1. Replicate on BERT-style model
2. If holds across architectures → investigate further
3. Design automated queue loop

**If no correlation:**
1. Try next measure (representation persistence, gradient flow)
2. Or: correlation exists but we're computing it wrong

---

## Measure Queue (Initial)

| Priority | Measure | Compute Difficulty |
|----------|---------|-------------------|
| 1 | Attention entropy | Easy (direct from outputs) |
| 2 | Attention sparsity | Easy (threshold attention weights) |
| 3 | Representation persistence | Medium (cosine sim across layers) |
| 4 | Effective dimension | Medium (SVD of activations) |
| 5 | Gradient flow | Medium (backward pass analysis) |
| 6 | Granger causality | Hard (requires time series setup) |

---

## Success Criteria

**MVP success:** We have a number (r value) and a timing (minutes per sample).

**Screening success:** At least one measure correlates |r| > 0.3 with performance AND replicates across architectures.

**Workflow success:** Automated queue processes measures without manual intervention.

---

## Notes

- **TransformerLens** is the right tool — install and use it instead of raw HuggingFace for cleaner hooks
- Read **BERTology paper** before running — they already did attention analysis
- This is **screening**, not validation — be epistemically honest about what correlation means

---

*Next: Run the MVP script, report timing and r value.*
