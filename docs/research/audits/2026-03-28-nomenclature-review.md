# Nomenclature Review: 2026-03-28 Foundational Changes

**Reviewer:** VERIFY (eval-agent)  
**Date:** 2026-03-28  
**Commits reviewed:** `4d9de41` → `541a323` (8 commits total)  
**Scope:** Layer renaming, state/representation distinction, definitional consistency

---

## Executive Summary

The changes are well-executed and directionally correct. The state/representation distinction is the most conceptually significant move — it grounds the framework more honestly and connects better to the physics analogy. The layer renaming is clean and unambiguous. Two residual inconsistencies require attention; one is consequential, five files have stray old-framing that escaped the sweep.

**Overall verdict:** ✅ Mergeable with targeted follow-up fixes noted below.

---

## 1. Internal Consistency

### 1.1 Layer Renaming (Event/Structure/Descriptor/Observable)

**Result: Consistent ✅**

The rename from Layer 0/A/B/C to Event/Structure/Descriptor/Observable is propagated correctly across all directly affected files:

- `01_5_causors.md` — Four-Layer Architecture diagram updated
- `causeplex_spacetime.md` — Layer architecture note updated
- `causeplex_loop_phase.md` — Layer labels updated
- `series_map.md` — Subgraph labels updated
- `glossary.md` — Bond/loop operator definitions updated
- `coupling_chains.md` — Layer note updated
- `02_5_entity_interaction.md` — Layer note updated

No instances of the old Layer 0/A/B/C terminology remain in the scanned files.

### 1.2 State/Representation Distinction

**Result: One residual inconsistency (consequential) ⚠️**

The 𝒳/X distinction is consistently applied in:
- `00_prelude.md` — ✅ 
- `01_generalized_mechanics.md` — ✅ (Section 1 is now the clearest statement of the distinction)
- `01b_uncertainty_coordinates_relativity.md` — ✅ (line 110: "models actual state within the potential state space 𝒳")
- `glossary.md` — ✅
- `05_ontology_and_open_questions.md` — ✅
- `index.md` — ✅

**Residual inconsistency in Part 3 (consequential):**

`03_intelligence_consciousness_agency.md`, line 62:

> `M_E` is a representation — itself a state instantiated in E's substrate — that **models some actual state 𝒳**.

This is wrong post-rename. `𝒳` is the *potential state space* (the territory). A representation doesn't model the potential state space — it models a specific state `x ∈ 𝒳`. The sentence should read "models some actual state `x ∈ 𝒳`" or "models the state of domain 𝒳."

This matters because intelligence is later defined as predictive accuracy over `dX/dt`. If `M_E` models `𝒳` (the full potential space), the claim becomes trivially true for any non-degenerate model. The intent is clearly that `M_E` represents some particular actual state — what the entity's world looks like right now.

**Fix needed:**
```
"...that models some actual state x ∈ 𝒳"
```

### 1.3 Quick-Reference Table (Part 1)

The table at the top of `01_generalized_mechanics.md` maps:

| Physics | Generalized | Plain |
|---|---|---|
| Configuration space | Potential state space 𝒳 | All states the system could occupy |
| Position (measured) | Representation X | **A model of actual state within 𝒳** |

The second row says X is a model of "actual state." This is slightly in tension with the final definition adopted in commit `541a323`, where X "can model actual, potential, or any state." The table leans toward the specific case (X models what is currently the case), while the body text broadens it. This isn't a contradiction — the table is a quick-reference heuristic, not a formal definition — but readers who stop at the table get a narrower picture than the body text intends.

**Recommendation:** Add a note "(can also model potential or hypothetical states — see Section 1)" to the table row, or rephrase to "A model of state within 𝒳."

---

## 2. Downstream Implications

### 2.1 Part 2 (Meta-Entities)

`02_meta_entities.md` line 51 uses the old entity framing: "an entity is anything with a describable state — anything you can assign an X to." This phrase hasn't been updated to the post-`4d9de41` framing where entities are "anything with causal presence" (the `describable state` phrasing is pre-definitional-consistency fix).

Three places in Parts 2, 4, 5 use "describable state" as the entity definition:
- `02_meta_entities.md:51`
- `04_time_and_soul.md:64`
- `05_ontology_and_open_questions.md:167`

Part 1, Part 0, and the glossary now consistently use "causal presence" (ρ_causal > 0). The "describable state" phrasing isn't wrong per se (it's extensionally equivalent — if something has causal presence, it's representable), but it creates a surface inconsistency across the series. A reader who reads Part 2 before Part 1 gets "anything with a describable state" as the definition, which front-loads the epistemological framing before the ontological one.

**Severity: Low.** The definitions are co-extensional. Flag for a future consistency pass.

### 2.2 Part 3 (Intelligence, Consciousness, Agency)

Beyond the `M_E` issue above (Section 1.2), Part 3's intro paragraph in Section 1 makes an important connection that's now stronger:

> "M_E is a representation — itself a state instantiated in E's substrate — that models some actual state 𝒳."

The observation that "representations are themselves states" (now established early in Part 1) is exactly what grounds why M_E is a real physical object subject to epimechanical analysis. This connection is now cleaner, but Part 3 doesn't explicitly reference Part 1's Section 1 as the source. The forward-reference in Part 1 ("Updated Part 3 intro to connect M_E back to the state/representation distinction") is noted in commit `d4e8518`, but the actual updated text in Part 3 is sparse — just one reference to Part 1's notation. A more explicit pointer would help.

### 2.3 Part 1b (Uncertainty, Coordinates, Relativity)

Line 110: "a representation X models actual state within the potential state space 𝒳" — correct per the new framing, though again "actual state" is the specific case. Given Part 1b is specifically about cases where the actual state is *uncertain* or *indefinite*, this framing is fine here — the uncertainty analysis that follows explains why X takes distributional forms.

### 2.4 Part 4 and Part 5

No structural issues found. Both continue to use `𝒳` and `X` in ways consistent with the new framing, though the "describable state" legacy phrasing noted above appears in Part 4.

### 2.5 Parts 2.5, 1.5, Index

These look clean. The layer renaming in `index.md` is updated correctly. The index's "states and representations" section was rewritten in commit `7f87ca6` and reads well.

---

## 3. Conceptual Clarity

### 3.1 Does the State/Representation Distinction Clarify?

**Yes, significantly.** The map/territory framing is well-established (Korzybski, Hoffman's Interface Theory) and the analogy is apt. The physics parallel is tight: `𝒳` is configuration space (all possible positions), `X` is the measured position (a representation of where the system actually is). This grounding makes the framework more honest about what the variables mean.

The observation that "representations are themselves states" (Part 1, Section 1) is the key move that prevents infinite regress and makes the framework self-consistent. A representation is a physical object — it exists in some substrate, has its own `𝒳`, and is subject to the same mechanical analysis. This is well-stated.

### 3.2 Is "Representation can model actual, potential, or any state" Too Loose?

**Partially — the looseness is a feature, but needs clearer motivation.**

The progression through today's commits:
1. d4e8518: X models "actual state"
2. c8e4a05: X is a probability distribution over possible states
3. 7f87ca6: X models actual state (as distribution)
4. 8288c59: 𝒳 is potential state space; X can be distribution or other forms
5. 541a323: X is "agnostic" — models actual, potential, or any state

The final formulation is correct but the motivation could be sharper. The reason X needs to model potential (not just actual) states is:

1. **Predictive use:** To predict future states, an entity must represent states that don't yet obtain. A forecast is a representation of a potential state.
2. **Counterfactual reasoning:** Agency (Part 3) requires modeling what *would* happen under different actions — representations of states that may never obtain.
3. **Hypothetical models:** Scientific theories are representations of possible states, not just observed ones.

These use cases are hinted at in the concrete examples (wavefunction, Bayesian posterior) but not explicitly motivated. The current phrasing ("the representation doesn't distinguish — it's a model of 'state,' whatever that might be") reads as agnosticism by fiat rather than principled generality.

**Recommendation:** Add one sentence: "This generality is required because predictive and counterfactual reasoning — the central use cases of representation in intelligence (Part 3) — require modeling states that don't currently obtain."

### 3.3 The Fidelity Definition

`ℱ(X, x) = 1 - d(X, x)` is clean and well-motivated. One observation: the notation `x ∈ 𝒳` is used throughout for the target of fidelity measurement. This is the "actual state" (lowercase, specific) vs. `𝒳` (uppercase script, the whole space). The distinction is correctly maintained in the fidelity section, but the notation convention (`x` vs `X` vs `𝒳`) is doing heavy lifting and could benefit from a notation summary box near the first use.

---

## 4. Layer Naming Evaluation

### 4.1 Clarity and Pedagogical Value

| Name | What it captures | Potential ambiguity |
|---|---|---|
| **Event Layer** | Causal event primitive, state transition | "Event" is widely used in physics (events in spacetime); minimal confusion since the paper establishes this is more primitive |
| **Structure Layer** | Bond and loop operators, structural patterns | "Structure" is generic; could mean anything. However, "structural primitives" is precise enough in context |
| **Descriptor Layer** | Q1–Q4 properties of bonds/loops | Slightly weak — "descriptor" sounds passive/observational, but Q1–Q4 are structural properties, not measurements. "Property Layer" might be more intuitive |
| **Observable Layer** | Derived quantities: mass, energy, auto-causal density | Best of the four — directly signals "what you can measure at the coarse-grained scale" |

**Overall:** The names are clearer than the opaque 0/A/B/C system. The transition from Layer A/B/C to Structure/Descriptor/Observable preserves the semantic ordering (each is built on the layer below) while making the function of each layer legible to a first-time reader.

**Minor ambiguity:** "Descriptor Layer" vs "Structure Layer" — the distinction between a structural primitive (bond, loop) and a structural descriptor (Q1–Q4) is clear to a careful reader but could blur for a skimmer. "Structural Primitive Layer" and "Structural Property Layer" would be more precise, but are wordier.

### 4.2 Consistency

The layer names are used consistently across all updated files. The mermaid diagram in `01_5_causors.md` uses abbreviated labels (LC, LB, LA, L0) with the full names as subgraph labels — this is correct and won't cause issues.

---

## 5. Missing Updates

### Files that use old entity definition phrasing:

| File | Line | Old phrasing | Status |
|---|---|---|---|
| `02_meta_entities.md` | 51 | "anything with a describable state" | Not updated |
| `04_time_and_soul.md` | 64 | "anything with a describable state" | Not updated |
| `05_ontology_and_open_questions.md` | 167 | "anything with a describable state" | Not updated |

These aren't strictly wrong but are inconsistent with the post-`4d9de41` canonical framing ("causal presence"). Low severity since the formulations are extensionally equivalent.

### File with consequential error:

| File | Line | Issue |
|---|---|---|
| `03_intelligence_consciousness_agency.md` | 62 | `M_E` "models some actual state 𝒳" — should be "x ∈ 𝒳" |

This is the one fix that's genuinely consequential. The rest are polish.

### Notation gap:

The `x` vs `X` vs `𝒳` distinction is established in Part 1 but no compact notation summary exists. As the series grows, a notation reference early in Part 1 (or in the prelude) would reduce re-reading burden. Existing glossary covers it but requires navigation.

### Files not checked (out of scope for today's changes):

- `04_time_and_soul.md` (beyond the `describable state` check)
- `01c_thermodynamic_emergence_of_life.md`
- `causeplex_quantum.md`
- Application files under `docs/applications/`

These should be verified in a follow-up pass to confirm no stray Layer A/B/C references and that the potential/actual state distinction is consistent.

---

## 6. Summary of Required Actions

### Must fix (consequential):
1. `03_intelligence_consciousness_agency.md:62` — Change "models some actual state 𝒳" → "models some actual state x ∈ 𝒳"

### Should fix (consistency):
2. Part 1 quick-reference table row for X — add note that X can model actual, potential, or any state
3. `02_meta_entities.md:51`, `04_time_and_soul.md:64`, `05_ontology_and_open_questions.md:167` — update "describable state" to "causal presence (ρ_causal > 0)" for consistency

### Consider adding (clarity):
4. Explicit motivation for why X needs to model potential (not just actual) states — one sentence in Part 1 Section 1 connecting to Part 3's use case
5. Notation summary box in Part 1 Section 1 distinguishing `x` (specific state), `X` (representation), `𝒳` (potential state space)

### No action needed:
- Layer naming — clean and consistent
- Fidelity definition — correct
- Glossary additions — well-chosen terms

---

## 7. Conceptual Assessment

The state/representation distinction adopted today is the correct move for the framework's intellectual honesty. The original formulation conflated the measured position with the space of possible positions — a category error that becomes visible the moment you try to apply it to quantum mechanics or planning. The `𝒳`/`X` split resolves this cleanly and has good precedent (Hoffman's Interface Theory, the physics configuration space/position distinction).

The claim "X is a representation of state; 𝒳 is the space of all possible states" is now the foundational distinction, established in Part 0 and Part 1 before any other machinery is introduced. This is the right pedagogical order.

The "representations are themselves states" observation is philosophically important and underappreciated in the current presentation. It closes the regress, establishes that representations are physical objects (not mysterious abstract entities), and grounds why M_E (the entity's internal model) is subject to the same mechanical analysis as any other state. Emphasizing this more strongly in Part 3 would be worthwhile.

Layer naming: Event/Structure/Descriptor/Observable is a genuine improvement over the opaque 0/A/B/C labels. No changes recommended beyond the minor "Descriptor" ambiguity noted above.

---

*Audit conducted 2026-03-28 by VERIFY (eval-agent). Evidence base: full text of all 14 files modified in today's commits, plus cross-references to Parts 2, 3, 4, and the glossary.*
