# Brainstorm Consolidation: What's Grounded vs. Speculative

**Date:** 2026-03-30
**Purpose:** Honest assessment of where we are and what to do next

---

## What We Actually Have (Grounded)

### From Epimechanics Theory

1. **Vocabulary:** Causal events, cause-plex, bonds, loops, coupling tensor, ρ_ac
2. **CST foundation:** Spacetime from causal partial order (established, not ours)
3. **The REP conjecture:** Optimal representations are Lagrangian (unproven)

### From Existing ML

1. **Autoresearch:** Concrete system that improves on grounded metric (val_bpb)
2. **Architecture differences:** Transformers, Mamba, etc. perform differently on different data (observed, not explained)
3. **Scaling laws:** Empirical relationships between compute/data/performance (Kaplan, Hoffmann)

### What's Measurable

1. **val_bpb** — bits per byte, directly comparable
2. **Benchmark performance** — accuracy, loss on standard datasets
3. **Attention patterns** — extractable from trained models
4. **Granger causality** — computable from time series

---

## What We've Speculated (Ungrounded)

### Theory Without Validation

1. **Topology predicts performance** — proposed Betti numbers, spectral gap, etc. No evidence they predict anything.
2. **ρ_ac match predicts performance** — intuitive but never tested.
3. **Q1-Q5 descriptors are useful** — no validation that classification predicts behavior.
4. **Carrying capacity formalization** — C(M,D) defined but not measured.

### Measures Without Validation

1. **All the causality measures** — computable, but do they correlate with anything that matters?
2. **All the auto-causality measures** — same problem.
3. **Topological invariants** — computable, but predictive of what?

### Predictions Without Tests

1. **Mamba > Transformer on high-ρ_ac data** — never tested.
2. **Sparse attention matches sparse causality** — never tested.
3. **Eigenvalues near 1 indicate auto-causality** — plausible but not validated.

---

## The Honest Assessment

**We have:**
- A vocabulary (possibly useful, possibly just relabeling)
- Many proposed measures (computable but unvalidated)
- Many predictions (untested)

**We don't have:**
- Any validated predictions
- Any derivations from first principles that produce known results
- Any historical matching showing the theory works

**The risk:** We've built an elaborate framework that predicts nothing.

---

## What Would Ground This

### Option A: Derive Known Results

If epimechanics is real, it should **derive** things we already know:
- Why do Transformers work on language?
- Why does attention help?
- Why do residual connections help?
- Why do scaling laws have their specific exponents?

**Test:** Can we derive any of these from the framework? If not, the framework isn't predictive.

### Option B: Predict Novel Results

Make predictions that:
- Are specific (not "X might be better than Y")
- Are testable (we can run the experiment)
- Are surprising (not obvious from existing knowledge)

**Test:** Run the experiments. Did predictions hold?

### Option C: Match Historical Data

Take existing benchmark results and check:
- Do our measures correlate with performance?
- Can we retrodict which architectures worked on which data?

**Test:** Correlation analysis on public data.

### Option D: Run Autoresearch and Analyze

Use autoresearch as the empirical ground:
- What changes improve val_bpb?
- Do those changes correspond to our measures?
- Can we predict which changes will help?

**Test:** Log experiments, correlate with measures.

---

## Concrete Next Steps

### Immediate (Grounding)

1. **Pick ONE measure.** Don't try to validate everything. Pick the simplest:
   - Maybe: attention sparsity
   - Or: representation persistence
   - Or: autocorrelation of data

2. **Pick ONE benchmark.** Don't try to analyze all data:
   - Maybe: WikiText (language, well-studied)
   - Or: Something-Something (video, temporal structure)

3. **Compute the measure.** Actually compute it for real models on real data.

4. **Check correlation.** Does the measure correlate with known performance?

### Short-term (Validation)

5. **If correlation exists:** Try to predict on held-out data/models.

6. **If no correlation:** Either the measure is wrong or the theory is wrong. Revise.

7. **Run autoresearch.** See what actually improves performance. Does it match predictions?

### Medium-term (Derivation)

8. **Try to derive a known result.** Pick something simple:
   - Why does next-token prediction work?
   - Why do residual connections help gradient flow?
   
9. **If derivation works:** The theory has teeth.

10. **If derivation fails:** The theory is vocabulary, not physics.

---

## What to Stop Doing

1. **Stop proposing new measures** until we validate one.
2. **Stop making predictions** until we test one.
3. **Stop writing theory** until we ground it.

---

## The Core Question

**Is epimechanics predictive or just descriptive?**

- **Predictive:** Makes specific claims that can be tested and might be wrong.
- **Descriptive:** Provides vocabulary that can describe anything but predicts nothing.

**We don't know yet.** We've written a lot of descriptive content. We haven't validated any predictions.

---

## Prioritized Action List

### This Week

| Priority | Action | Why |
|----------|--------|-----|
| 1 | Run autoresearch on our own machine | Get hands-on with grounded improvement loop |
| 2 | Log what architectural changes the agent proposes | See what actually gets tried |
| 3 | Compute ONE measure on the autoresearch models | See if measure tracks val_bpb |

### This Month

| Priority | Action | Why |
|----------|--------|-----|
| 4 | Analyze autoresearch logs for patterns | What predicts improvement? |
| 5 | Check if pattern matches any proposed measure | Validation or refutation |
| 6 | If match: test on different data | Generalization |
| 6 | If no match: revise theory | Honesty |

### This Quarter

| Priority | Action | Why |
|----------|--------|-----|
| 7 | Attempt derivation of known result | Test if theory is predictive |
| 8 | Write up findings (positive or negative) | Contribute to knowledge |

---

## Files to Keep vs. Archive

### Keep (Grounded)

- `docs/theory/00_prelude.md` — vocabulary, still useful
- `docs/theory/00b_event_layer.md` — CST foundation, established
- `docs/research/autoresearch_autocausal_connection.md` — concrete pattern
- `docs/research/carrying_capacity_and_X.md` — grounding concept

### Archive (Speculative, Revisit After Validation)

- `docs/research/model_topology_theory.md` — unvalidated predictions
- `docs/research/benchmark_causal_analysis_program.md` — too ambitious without grounding
- `docs/research/measures_of_causality_autocausality.md` — measures without validation
- `docs/research/attention_as_causal_coupling.md` — hypothesis, not tested
- `docs/research/causal_coupling_mechanisms_hypothesis.md` — hypothesis, not tested

### Keep as Brainstorm Reference

- All brainstorm files — record of thinking
- This file — honest assessment

---

## The Minimum Viable Test

If we do ONE thing, it should be:

**Run autoresearch. Track what changes. See if any of our measures correlate with improvement.**

If yes → we have something
If no → revise or abandon

---

## Summary

We've built a lot of theory. None of it is validated. The next step is not more theory — it's testing.

**Specific test:** Does any proposed measure correlate with val_bpb improvement in autoresearch?

That's the grounding point. Everything else is speculation until that's answered.

---

*Honesty check: We don't know if any of this works. Time to find out.*
