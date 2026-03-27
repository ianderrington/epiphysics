---
title: "Epimechanics — Coupling Promotion and the Scale Tower"
description: >-
  Proposed criterion for when a scale-ℓ loop is promotable to a scale-(ℓ+1)
  couplet, with corrected auto-causal density definition and implications for
  discrete entity levels.
date: 2026-03-26T00:00:00.000Z
draft: true
author:
  name: "Ian Derrington"
contentType: article
mediaTypes:
  - text
series: "Epimechanics"
series_order: 1.7
categories:
  - Philosophy
  - Physics
  - Systems thinking
tags:
  - Epimechanics
  - Coupling promotion
  - Auto-causal density
  - Entity hierarchy
  - Cause-plex
bullets:
  - Proposes a non-tautological promotion criterion from loops to higher-level couplets
  - Redefines ρ_ac^ℓ as density of coupling-compatible loop pairs, not just stable loops
  - Explains discrete scale levels as closure bifurcations in loop compositions
  - Clarifies the witness structure behind A_dens in the loop-phase argument
---

## Scope and Status

This document supplies the missing architectural bridge between [Part 1.5: Causors](./01_5_causors.md) and [Part 2: Meta-Entities](./02_meta_entities.md).

Status labels used here:
- ✅ **Proved** (from stated primitives in this document)
- ⚠️ **Conditional** (holds if explicitly named assumptions hold)
- ❌ **Conjecture** (proposal not yet proved)

---

## 1) Promotion Criterion (Core Claim)

### Criterion

Let \(\gamma\) be a stable loop at scale \(\ell\). We say \(\gamma\) is **promotable** to a scale-\((\ell+1)\) couplet iff there exists another scale-\(\ell\) loop \(\gamma'\) such that

\[
S_{\text{out}}(\gamma)=S_{\text{in}}(\gamma').
\]

A scale-\((\ell+1)\) loop exists when enough such compatible loops are present at sufficient density that their compositions close.

**Status: ❌ Conjecture (architectural proposal).**

This is not derived from Layer 0 primitives yet; it is a proposed bridge axiom for entity-level construction.

---

## 2) Why This Is Non-Tautological

The criterion is not “a higher loop exists when a higher loop exists.” It introduces a checkable precondition at scale \(\ell\): compatibility of loop outputs/inputs.

\[
\text{Compat}(\gamma,\gamma') \iff S_{\text{out}}(\gamma)=S_{\text{in}}(\gamma').
\]

This can be evaluated from scale-\(\ell\) couplet functions alone, before observing any realized scale-\((\ell+1)\) closure.

**Status: ⚠️ Conditional.**
Holds if loop states are well-defined and compositional equality is operationally testable in the chosen representation.

---

## 3) Corrected Definition of Auto-Causal Density

Previous wording (“density of stable recurring loops”) was too weak for scale promotion.

Define instead:

\[
\rho_{\mathrm{ac}}^{\ell}(R)
= \text{density of coupling-compatible loop pairs in region }R\text{ at scale }\ell.
\]

Equivalently, \(\rho_{\mathrm{ac}}^{\ell}\) counts pairs \((\gamma,\gamma')\) with
\(S_{\text{out}}(\gamma)=S_{\text{in}}(\gamma')\),
not merely isolated stable loops.

**Status: ❌ Conjecture (proposed corrected definition).**

---

## 4) The Scale Tower

Each level’s entities are compositional closures of coupling-compatible loops from the prior level:

\[
\text{Entities}_{\ell+1} = \operatorname{Closure}\big(\text{CompatibleLoopCompositions}_{\ell}\big).
\]

The grammar is reused at every level (state, coupling, closure), while state spaces and empirical constants change by level.

**Status: ⚠️ Conditional.**
Conditioned on the promotion criterion and closure existence assumptions.

---

## 5) Why Levels Are Discrete

Closure of compositions is a fixed-point condition. Fixed-point existence/non-existence under parameter variation is thresholded (bifurcation-like), so small coupling changes can create or destroy closure classes.

Therefore level transitions are discrete by composition mathematics, not by stipulation.

**Status: ⚠️ Conditional.**
This is mathematically standard once a concrete composition operator and topology are specified; those are not yet fully formalized for all domains.

---

## 6) Repair to the Loop-Phase A_dens Reading

Under the corrected \(\rho_{\mathrm{ac}}^{\ell}\):

\[
\rho_{\mathrm{ac}}^{\ell} > 0
\Rightarrow \exists (\gamma,\gamma')\text{ coupling-compatible pair}
\Rightarrow \exists \text{scale-}\ell\text{ couplet witness along their chain.}
\]

So the witness is not a density average by itself; it is the explicit compatible loop pair.

**Status: ⚠️ Conditional.**
Conditioned on adopting the corrected \(\rho_{\mathrm{ac}}\) definition and compatibility criterion.

---

## 7) Minimal Assumption Ledger

- **A_promote:** Promotion criterion above is valid. **Status: ❌ Conjecture**
- **A_comp:** Loop in/out states are well-defined and comparable. **Status: ⚠️ Conditional**
- **A_close:** Sufficient compatible density yields higher-scale closure. **Status: ⚠️ Conditional**

No claim in this document is marked ✅ beyond definitional bookkeeping.

---

## 8) What This Document Changes Operationally

1. Replaces loop-only \(\rho_{\mathrm{ac}}\) with compatibility-sensitive \(\rho_{\mathrm{ac}}^{\ell}\).
2. Supplies a non-tautological route from Part 1.5 loop structure to Part 2 meta-entity emergence.
3. Converts A_dens from an averaging intuition to a witness-based statement.
4. Narrows the open problem: prove (or falsify) A_promote and A_close from stated primitives.

**Overall status: ❌ Conjectural bridge with explicit conditional consequences.**
