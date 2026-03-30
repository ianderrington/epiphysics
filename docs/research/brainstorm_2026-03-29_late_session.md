# Brainstorm: Late Session 2026-03-29

**Context:** End of full-day session on epimechanics/ML bridge
**Mode:** Raw brainstorm — capture everything, extract actionable items later

---

## The Threads We're Pulling

### Thread 1: Autoresearch as Meta-Pattern

Autoresearch = auto-causal loop at the meta level
- System improves itself on grounded metric
- The loop IS the entity
- ρ_ac = improvement rate / attempt rate

**But this is a different level.** It's about the research process, not about what the models learn internally.

### Thread 2: Tensorial Predictions / Architecture Understanding

We want to understand:
- Why Mamba works differently than Transformers
- What the fundamental connectivity patterns are
- How to predict behavior from structure

**Not vague predictions.** Computable things.

### Thread 3: The Code-as-Data Problem

You raised: "sometimes code is obtuse, we might lose sight of repetition because of looping patterns"

**The problem:** Code structure doesn't map cleanly to functional structure
- Loops de-emphasize repetition (one loop = many iterations)
- Abstractions hide patterns
- Same function, different implementations

**Models need embeddings of code that capture functional structure, not just syntax.**

### Thread 4: Correlation With Data AND Model of Data

We need:
- The data (empirical)
- Our model of the data (theoretical)
- The correlation between them (validation)

Can't have one without the others.

---

## Raw Ideas (Unfiltered)

### On Code Embeddings

- Code tokens ≠ functional units
- A for-loop that runs 1000 times is 3 tokens but 1000 operations
- Need embeddings that capture operational semantics, not lexical

**Idea:** Embed code by execution trace, not by syntax
- Run code, record state changes
- Embed the trace, not the source
- Similar traces → similar embeddings (regardless of syntax)

**Idea:** Embed code by its effect on inputs
- Code = function from inputs to outputs
- Embed by sampling input-output pairs
- Similar functions → similar embeddings

### On Repetition and Structure

- Repetition in code is compressed (loops, recursion)
- But repetition in behavior is expanded (runtime)
- Models trained on code see compressed; models trained on traces see expanded

**Idea:** "Unroll" representations
- Take loopy code, unroll to trace
- Find patterns in unrolled version
- Map back to code structure

**Problem:** Combinatorial explosion for large loops

**Partial solution:** Sample traces, find statistical patterns

### On Model-Data Correlation

- The data has structure (unknown)
- Our model has structure (designed/learned)
- Good model = model structure matches data structure

**But how to measure match?**

**Idea:** Information-theoretic
- Mutual information between model states and data states
- High MI = model captures data structure
- Low MI = model missing something

**Idea:** Causal
- Intervene on data, see if model predicts correctly
- Model that predicts interventions has causal understanding

### On Mamba vs Transformer

What's actually different?
- Transformer: all-to-all attention (dense coupling)
- Mamba: structured state space (sparse, recurrent)

**Hypothesis:** They learn different coupling structures
- Transformer: learns which tokens to attend to
- Mamba: learns state dynamics

**Test:** Compare learned coupling matrices
- Extract attention patterns from Transformer
- Extract state transition matrices from Mamba
- Same data — do they find same structure?

### On Autoresearch Extended

Autoresearch runs at meta-level. But what if we brought it down?

**Idea:** Autoresearch for architecture search
- Agent proposes architecture change
- Train for 5 min
- Measure val_bpb
- Keep/discard

This IS what autoresearch does, but explicitly for architecture.

**Idea:** Autoresearch for tokenization
- Agent proposes tokenization change
- Train same model
- Measure val_bpb
- Keep/discard

Find optimal tokenization empirically.

**Idea:** Autoresearch for data ordering
- Agent proposes curriculum
- Train same model
- Measure val_bpb
- Keep/discard

Find optimal data order.

### On "Figuring Out How to Do It"

The meta-question: How do we actually make progress?

**Option A:** Theory-first
- Derive predictions from principles
- Test predictions empirically
- Iterate theory

**Option B:** Empirics-first
- Run experiments (like autoresearch)
- Observe what works
- Theorize after

**Option C:** Loop them
- Theory suggests experiments
- Experiments refine theory
- This is its own auto-causal loop

**We've been doing A all day.** Maybe shift to B/C.

### On What's Actually Predictive

You said: "we have to figure out these things in correlation with the data"

**What data do we have?**
- Public benchmarks (GLUE, ImageNet, etc.)
- Public model results (Papers With Code)
- Autoresearch logs (if we run it)
- Our own experiments

**What correlations to look for?**
- Architecture features ↔ performance
- Data features ↔ performance
- Architecture × data ↔ performance (the interaction)

**The interaction is the key.** Same architecture, different data = different performance. Same data, different architecture = different performance. We need to model the interaction.

---

## Extracting Actionable Items

### Immediate (This Week)

1. **Run autoresearch ourselves**
   - Get hands-on with the loop
   - See what the agent actually proposes
   - Measure improvement rate, ceiling

2. **Log architecture changes**
   - What does autoresearch try?
   - What works vs. what doesn't?
   - Any patterns?

3. **Compute coupling matrices**
   - For a trained Transformer: extract attention patterns
   - For a trained Mamba: extract state transitions
   - Compare structure

### Short-Term (This Month)

4. **Build code trace embedder**
   - Run code, record trace
   - Embed trace (not source)
   - Test: similar functions → similar embeddings?

5. **Benchmark data causal profiling**
   - Pick 5 benchmarks
   - Estimate causal structure (MI, Granger, etc.)
   - Correlate with known model performance

6. **Autoresearch for tokenization**
   - Modify autoresearch to vary tokenization
   - Fixed model, vary tokenization
   - Find what tokenization choices matter

### Medium-Term (Next Quarter)

7. **Theory refinement based on empirics**
   - After running experiments, what patterns emerge?
   - Update theory to explain patterns
   - Generate new predictions

8. **Model-data interaction model**
   - Formalize: performance = f(architecture, data)
   - What are the features of each?
   - How do they interact?

### Research Questions (Open)

- What makes a tokenization "good"? (Causal preservation?)
- Why does Mamba work on some data but not others?
- Can we predict improvement ceiling from architecture?
- What's the minimal change that flips good/bad?

---

## Considerations

### What We Don't Know

- Whether topology actually predicts anything useful
- Whether autoresearch patterns generalize
- Whether code embeddings help
- Whether any of this is better than just scaling

### What We Do Know

- Autoresearch works (Karpathy showed this)
- Different architectures work differently on different data
- Grounded metrics (val_bpb) are better than vague predictions
- The loop is more important than the theory

### Risks

- Over-theorizing without empirical grounding
- Under-theorizing and missing generalizable patterns
- Spending time on wrong level of abstraction
- Not actually running experiments

### Mitigations

- Run autoresearch immediately (ground in practice)
- Keep theory minimal until patterns emerge
- Iterate between levels (meta/object)
- Timebox theory, prioritize experiments

---

## The Core Tension

**Theory wants:** General principles that predict without running
**Practice shows:** You have to run it to know

**Resolution:** Theory guides what to try. Practice validates. Loop.

---

## Closing Thought

The most honest position: we don't know what actually predicts performance. We have intuitions (sparsity, loops, state) but not validation.

**Next step:** Get validation. Run things. Measure. Then theorize.

---

*End of brainstorm. Raw, unfiltered. Extract what's useful.*
