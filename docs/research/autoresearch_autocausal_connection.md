# Autoresearch as Auto-Causal Loop: The Grounded Connection

**Date:** 2026-03-29
**Status:** Core insight — this is the concrete instantiation

---

## What Autoresearch Is

Karpathy's autoresearch (March 2026):

```
Loop:
  1. Agent modifies train.py (the model/optimizer)
  2. Run training for fixed 5 minutes
  3. Measure val_bpb (validation bits per byte)
  4. Keep if improved, discard if not
  5. Repeat
```

**The metric is grounded:** val_bpb. Lower = better. Vocab-size-independent. Directly comparable.

**The loop is auto-causal:** The system modifies itself based on measured performance. The output (better model) feeds back into the input (next experiment's starting point).

---

## Why This Matters for Epimechanics

### This IS ρ_ac in Practice

The autoresearch loop has high auto-causal density:

```
Agent observes current state → 
Agent modifies code → 
Training runs → 
Metric measured → 
Agent observes new state (including metric) →
Agent modifies code (informed by what worked) →
...
```

The "entity" (the evolving codebase) persists because:
- Successful changes are kept
- Failed changes are discarded
- The selection mechanism IS the causal loop

**This is exactly what ρ_ac measures:** The fraction of causal flow that maintains/reproduces the entity.

### Grounded Measurement

You said: "would have to be expected relative performance because otherwise is not grounded"

Autoresearch IS grounded:
- **Absolute metric:** val_bpb (bits per byte)
- **Fixed time budget:** 5 minutes per experiment
- **Same hardware:** All experiments on same GPU
- **Direct comparison:** Did this change improve or not?

No assumptions about what "should" work. Just: did it work?

---

## The Simpler Framing

You said: "what this is probably is more simple than that but different"

Here's the simpler version:

### The Only Thing That Matters

**Can the system improve itself on a grounded metric?**

That's it. Not:
- Topological invariants
- Betti numbers
- Spectral gaps

Just: **Does the loop close? Does the metric improve?**

### The Causal Structure of Self-Improvement

```
State_t → Action → State_{t+1}
    ↑                    |
    |                    v
    ←── Selection ←── Metric
```

If Metric(State_{t+1}) > Metric(State_t): keep
Else: revert

**This is auto-causality.** The metric selects for states that reproduce themselves (via being kept).

---

## What This Implies for Architecture Understanding

### Forget Predicting Performance

Don't try to predict "this architecture will get loss X."

Instead: **Can this architecture participate in a self-improving loop?**

### The Right Question

Not: "What is the capacity of architecture G?"

But: "Can architecture G be part of a system that improves on a grounded metric?"

### Trainability = Loop-Closability

An architecture is "trainable" if:
1. Gradient descent can find improvements
2. Those improvements are measurable
3. The measurement can guide the next step

This is a **causal loop** property, not a static property of G.

---

## Meta-Model Perspective

### The Model IS the Loop

Autoresearch doesn't just train a model. It IS a model — a meta-model:

- **State:** Current train.py code
- **Action:** Edit code
- **Transition:** Run training, measure metric
- **Reward:** Δval_bpb

The "model" is the entire loop, not just the neural network inside.

### Generating New Architectures

In autoresearch, new architectures ARE generated:
- Agent proposes modifications
- Some are kept (work)
- Some are discarded (don't work)
- The population evolves

**No Monte Carlo over model space.** Just: try things, keep what works.

### OOD = Breaking the Loop

When does autoresearch fail OOD?
- When the agent's proposals stop improving the metric
- When the metric stops being informative
- When the loop stops closing

**OOD robustness = loop robustness**

---

## Connection to Epimechanics Theory

### Reframe Everything

| Old Framing | New Framing |
|-------------|-------------|
| Capacity of G | Can G participate in improving loop? |
| Trainability | Does gradient close the loop? |
| Generalization | Does the loop transfer to new data? |
| Architecture search | Let the loop find it |

### ρ_ac Revisited

$$\rho_{\text{ac}} = \frac{\text{causal flow that maintains the entity}}{\text{total causal flow}}$$

For autoresearch:
- **Entity:** The evolving codebase
- **Maintains:** Selection based on val_bpb
- **Total flow:** All changes attempted

$$\rho_{\text{ac}}(\text{autoresearch}) = \frac{\text{improvements kept}}{\text{all experiments run}}$$

This is directly measurable. No theory needed.

### What Makes ρ_ac High?

A loop has high ρ_ac when:
1. **Metric is informative:** Distinguishes good from bad
2. **Actions are effective:** Changes actually affect metric
3. **Selection is tight:** Good changes kept, bad discarded

If any of these break, ρ_ac drops, entity dissolves.

---

## Implications for Research Program

### Don't Predict — Measure

Instead of:
> "We predict architecture X will have loss Y based on topology"

Do:
> "Run the loop. Did it improve? How fast? How far?"

### The Grounded Metrics

What's actually measurable:
- **Improvement rate:** Δmetric per experiment
- **Improvement ceiling:** Where does it plateau?
- **Loop efficiency:** Fraction of experiments that improve
- **Robustness:** Does the loop keep working over time?

### Meta-Experiments

Run autoresearch with different:
- Starting architectures
- Agent prompts (program.md)
- Selection thresholds
- Time budgets

Measure: Which configurations improve fastest?

**This is grounded comparative research.** No theory required — just measurement.

---

## What Topology/Theory IS Good For

### Understanding Why

After you observe:
> "Configuration A improves faster than B"

Theory helps explain:
> "A has better gradient flow because of X"

But the observation comes first. Theory explains, doesn't predict.

### Designing New Loops

Theory can suggest:
- What makes a good metric (grounded, informative)
- What makes actions effective (gradient exists, is useful)
- What makes selection work (metric correlates with goal)

But validation is still: run the loop, see if it works.

---

## The Autoresearch Pattern Generalized

### Beyond LLM Training

The pattern applies anywhere:
- **Code improvement:** Modify code, run tests, keep if pass
- **Scientific discovery:** Propose hypothesis, run experiment, keep if confirmed
- **Evolution:** Mutate genome, live/reproduce, keep if survive
- **Learning:** Try behavior, get feedback, keep if positive

All are auto-causal loops with:
1. State
2. Action
3. Grounded metric
4. Selection

### The General Principle

**Entities persist when they can close the loop.**

- RNA that copies itself
- Code that passes tests
- Models that lower loss
- Ideas that spread

ρ_ac = how well the loop closes.

---

## Summary

### The Simpler Truth

Forget topology, Betti numbers, spectral gaps.

The question is:
> **Can the system improve itself on a grounded metric?**

Autoresearch shows this in practice:
- Metric: val_bpb
- Loop: agent → code → train → measure → agent
- Result: ~100 experiments overnight, measurable improvement

### What Epimechanics Adds

A vocabulary for describing loops:
- **ρ_ac:** How tightly the loop closes
- **Bonds:** The causal connections in the loop
- **Q1-Q5:** Properties of those connections

But the vocabulary only matters if it helps understand/improve the loops.

### The Research Direction

1. **Build loops** (like autoresearch)
2. **Measure what works** (improvement rate, ceiling, robustness)
3. **Use theory to explain** (why did A work better than B?)
4. **Use theory to suggest** (what loop structure might work better?)
5. **Validate by building** (run it, see if it works)

Grounded in measurement. Not assumption.

---

*Autoresearch is the concrete instantiation of auto-causal loops. Study it. Extend it. Let the loop teach you what works.*
