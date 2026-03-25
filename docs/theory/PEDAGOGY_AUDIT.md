# Pedagogy and Content Audit
Date: 2026-03-25

## Summary

The Epimechanics series is intellectually rigorous and internally dense, with careful forward-reference notices and honest epistemic labeling (D/P/C, ✅/⚠️). However, there is a **critical reading-order contradiction** between the series navigation tables (index.md and series_map.md) and the actual dependency structure of the documents: both navigation files list Part 1.5 *before* Part 1, yet Part 1.5's opening section explicitly says "Part 1 defined the grammar." Additionally, the index.md describes Part 1.5 using outdated "six causors" language that no longer matches the document's current Layer A/B/C architecture. Several terms important to the framework (cause-plex, bond operator, loop operator, CI, causal action) are absent from the glossary. Most other issues are minor: stale ephemeral content in series_map, a few broken cross-references to research notes, and some duplication between index.md and individual documents.

---

## A. Forward References and Undefined Terms

### 00_prelude.md (Part 0)
- **References `../research/computation.md`** — this file may not exist; not in the audited file list. If it exists but is a stub, it should be marked as such. If it doesn't exist, the link should be removed or replaced with a note.
- **References `../research/definitional_convergence.md`** — same issue. The specific claim ("when the seven definitions are quotiented by their equivalences, they converge to a four-node graph whose spectral radius is the golden ratio φ") is striking enough that a missing or broken link is particularly harmful here.
- **Uses `kappa_s`** (self-coupling) as a derived quantity but does not define it; it is formally defined in Part 4. Since Part 0 only gestures at it briefly this is acceptable, but the forward reference should be explicit (currently it is not).
- **Uses "auto-causal density"** extensively before Part 1 formally introduces it — this is pedagogically fine since Part 0 is a conceptual introduction.

### 01_5_causors.md (Part 1.5)
- **Opening "Where We Are" says "Part 1 defined the grammar"** — if readers follow the navigation tables (which put 1.5 before Part 1), they will not yet have read Part 1. This is not a forward-reference issue per se but a reading-order issue (see Section B).
- **References `[Part 2.5](./02_5_entity_interaction.md)` for `sigma_self`** — this file exists but is not in the main series and has no status label. A reader may not know what it is.
- **"Causal action" $A_{\text{causal}}$ appears in the Layer C table** here but is more formally introduced in Part 1 Section 4b. The index.md caption says "Part 1.5 introduces causal action" — the actual priority is ambiguous; see Misplaced Content.

### 01_generalized_mechanics.md (Part 1)
- **Section 1b uses `T_local`, `R`, `Pi_out`, and `I`** (from Parts 3 and 4) before they are defined. This is handled with an explicit `> Forward references.` callout — **well done**; no action needed.
- **Says "see Part 1.5 on cross-level tracing"** — but `cross_level_tracing.md` is a standalone Theory Note, not Part 1.5 itself. The cross-reference label is slightly misleading.
- **$\kappa_s$ (self-coupling) is introduced as "used later in Parts 4 and 5"** — the text says it's a derived quantity; this is consistent with how Part 4 uses it, but the definition given here (temporal autocorrelation of $\rho_{\text{ac}}$) is not labeled as the formal definition; Part 4 provides a more precise statement. These should be explicitly reconciled.
- **`c_D` (domain propagation speed)** first appears in the $E_{\text{int}}$ equation in Section 2b without definition — the definition comes pages later via an embedded discussion. Should be flagged at first use.

### 02_meta_entities.md (Part 2)
- **`sigma_self` (self-sufficiency)** is mentioned in a note within Part 1.5 as "introduced in Part 2.5" — if Part 2 comes before Part 2.5 in reading order, this is a forward reference issue. Part 2.5 is not in the main series navigation.
- **Uses `C(t)` as meta-entity aggregate coupling** — good definition provided inline.
- **`gamma_c` (critical decoupling threshold)** is introduced in Part 4 (for T_local of meta-entities) and Part 2 discusses the concept but does not use the symbol. No issue, but consistency check: Part 4 introduces `gamma_c` while Part 2's eigenvalue discussion is its conceptual precursor.

### 03_intelligence_consciousness_agency.md (Part 3)
- **References `../research/computation.md`** — same concern as Part 0.
- **`W^(D)` (domain relevance weight tensor) in the agency formula** is defined structurally but the note "Epimechanics specifies the structure but not the values" is appropriately honest.
- **$\mu_{\text{meta}}$ (meta-representational weight)** — described as "an open research question" whether it can be operationalized independently of C. This is an honest admission, not a gap.

### 04_time_and_soul.md (Part 4)
- **`kappa_s` is defined here** (temporal autocorrelation of $\rho_{\text{ac}}$) as a formal definition — but Part 1 already gave this definition informally. These are consistent but slightly redundant.
- **The "Fitness × Truth" argument and nitrogen example** are well-placed here since they illustrate $A_{\text{causal}}$, but Part 0 also uses "fitness×truth" without defining $A_{\text{causal}}$ — the forward reference in Part 0 ("See Part 1.5 and Part 4 for the formal treatment") correctly handles this.
- No unhandled forward references found.

### 05_ontology_and_open_questions.md (Part 5)
- This document is a restatement/synthesis. All terms used are properly defined in prior parts with back-references. No forward-reference issues found.

### Physics Papers (causeplex_spacetime, causeplex_quantum, causeplex_loop_phase, step3_lemma)
- **All three papers have explicit prerequisite statements in headers** — good. The dependency chain (spacetime → quantum → loop-phase → step3_lemma) is correctly stated.
- **causeplex_loop_phase references `rho_ac` from "Part 1.5" via Definition 2.10** — but Definition 2.10 is defined within the loop_phase paper itself, which also says "Full development in Part 1.5." This is a slightly circular-feeling cross-reference but not a real problem since the paper is self-contained.
- **step3_lemma.md is clearly labeled** as a mathematical appendix. No pedagogy issues.

### Glossary
Missing important terms that are used throughout the series without a canonical glossary entry:
- **cause-plex** ($\mathcal{C}$) — the central structural concept of the physics papers and Part 1.5; not in glossary
- **bond operator** ($b$) — Layer A primitive in Part 1.5; not in glossary
- **loop operator** ($\mathcal{L}$) — Layer A primitive in Part 1.5; not in glossary
- **causal action** ($A_{\text{causal}}$) — used in Parts 1, 1.5, and 4; not in glossary
- **Cause-Plex Index (CI)** — appears in Part 1.5 and physics papers; not in glossary
- **coupling tensor** ($T^i{}_j$) — used throughout; not in glossary
- **local time** ($T_{\text{local}}$) and **non-local time** ($T_{\text{nonlocal}}$) — central to Part 4; not in glossary
- **agency** ($A$) — central to Part 3; not in glossary
- **soul** ($\mathbf{R}(E,t)$) — central to Part 4; not in glossary
- **state space** ($S$) — foundational; not in glossary

Current glossary entries (causor, causal operator, causal density, LSQ, generalized mass, auto-causal density, stability basin depth, repair rate, internal entropy production, maintenance cost) match the older "six causors" vocabulary. The glossary needs to be expanded to cover the full framework.

---

## B. Reading Order Issues

### CRITICAL: Part 1.5 listed before Part 1 in navigation, but Part 1.5 requires Part 1

Both `index.md` and `series_map.md` have the same error:

**index.md navigation table order** (lines ~128–137):
```
Part 0: Foundations
Part 1.5: Causors        ← listed SECOND
Glossary
Part 1: Generalized Mechanics  ← listed FOURTH
```

**series_map.md reading path**:
```
Part 0 → Part 1.5 → Part 1 → Part 1b → ...
```

**But**: Part 1.5 opens with "Part 1 defined the grammar of Epimechanics — how state X, force F, energy W, and coupling T^i_j relate." A reader following the navigation tables will reach this sentence having NOT read Part 1. They will encounter undefined terms ($\mathcal{M}$, $\rho_{\text{ac}}$, $T^i{}_j$) that Part 1 defines.

**Evidence that 1 should precede 1.5**:
- `series_order` metadata: Part 1 = `1`, Part 1.5 = `1.5` (by the numbers, 1 comes before 1.5)
- Bottom nav of Part 1.5: `[← Part 1: Generalized Mechanics]` — confirms 1 is the predecessor
- Part 1's bottom nav: `[→ Part 1b] | [→ Part 2]` — does not link to 1.5, suggesting 1.5 is a "branch" not the main sequence
- Part 1 contains forward references to "see Part 1.5" — these are forward references, correct IF Part 1 comes first

**Resolution needed**: The correct reading order is `Part 0 → Part 1 → Part 1b → Part 1.5 → Part 1c → Part 2 → ...` or alternatively `Part 0 → Part 1 → Part 1.5 → Part 1b → ...` depending on whether 1b or 1.5 is the conceptual priority. Either way, Part 1 must come before Part 1.5. Both index.md and series_map.md need correction.

### Physics papers prerequisites

The physics papers correctly state prerequisites and form a proper dependency chain. The recommended reading path in series_map for the physics track (spacetime → quantum → loop_phase) is correct.

### series_map.md "What Was Fixed Today" ephemeral content

The series_map.md contains a dated section "**What Was Fixed Today (2026-03-25)**" with a table of 15 resolved issues. This is ephemeral content that will mislead future readers (they will see "fixed today" long after it was written). This should be moved to a CHANGELOG.md or removed. It is not reference content.

### Part 1 navigation links

Part 1's bottom navigation says `[→ Part 1b]` but does not link to Part 1.5. Given the series_map reads 0→1→1.5→1b, this is inconsistent. The navigation links at each document's bottom should match the agreed reading order.

---

## C. Misplaced Content

### "Six candidate causors" description in index.md is stale

The index.md navigation table describes Part 1.5 as: "Six candidate causors (bond, strength, loop order, basin depth, entropy production, repair rate); auto-causality is emergent at the loop level."

This description is from the **archived v1** of the document (`01_5_causors_v1_archive.md`). The current version of Part 1.5 has a completely different architecture:
- Layer A structures: Bond operator ($b$) and Loop operator ($\mathcal{L}$)
- Layer B descriptors: Q1 Energy Mode, Q2 Output Target, Q3 Topology, Q4 Leverage Ratio (Q5 derived)
- Layer C: Derived quantities (energy, mass, etc.)

The old six causors (strength, basin depth, entropy production, repair rate) are now Layer C derived quantities or Layer B descriptors, not Layer A causors. The index description needs to be updated.

### Assembly Theory discussion in Part 1 (Section 2b)

Section 2b of Part 1 contains ~600 words on Assembly Theory and the "assembly space funnel." This is substantive enough to be a Theory Note but logically belongs in Part 1 since it operationalizes generalized mass. **Recommendation**: keep in place but add a cross-reference to `effective_mass.md` (already exists) and consider whether the assembly funnel diagram belongs in Part 1.5 instead.

### Causal action — introduced in three places

$A_{\text{causal}}$ is introduced in:
1. Part 1 Section 4b ("Connection to causal action")
2. Part 1.5 Layer C table
3. Part 4 Section 1d (full treatment with fitness×truth)

The index.md caption for Part 1 says "Part 1.5 introduces causal action" but Part 1 itself introduces it first. **Recommendation**: add a consistent "first introduced in Part 1 Section 4b, formally developed in Part 4 Section 1d" note to align the three appearances.

### Part 0's "convergence to four-node graph with spectral radius φ" claim

This claim ("when the seven definitions are quotiented by their equivalences, they converge to a four-node graph whose spectral radius is the golden ratio φ") is placed in a footnote-like aside in Part 0 and deferred to `../research/definitional_convergence.md`. This is a striking mathematical claim that, if not supported by an existing document, appears to be ungrounded. Either the document needs to exist and be linked correctly, or the claim should be marked speculative or removed until the supporting document is written.

---

## D. Pedagogical Issues

### Part 1.5: "Energy Is Not Primitive" may confuse readers arriving after Part 1

Part 1 uses energy throughout as a core quantity. Part 1.5 then opens with "The Foundational Problem: Energy Is Not Primitive" — which could be jarring for a reader who just spent time internalizing Part 1's energy-based framework. The resolution (energy is derived at Layer C where time-translation symmetry holds) is stated, but the transition needs a smoother pedagogical bridge: something like "Part 1 used energy as a well-defined quantity. Here we ask where energy comes from, and find it emerges from the cause-plex at a more fundamental level — which is why Part 1's energy-based language is valid at the scale where the framework is applied."

### Part 0: "Definition convergence graph spectral radius = φ" — circular/ungrounded

The claim that the seven core definitions converge to a four-node graph with spectral radius φ appears in Part 0's opening definitional section. A fresh reader will reasonably ask "how is that derived?" The reference to a research note that may not exist leaves this claim hanging. Until supported, it should be either labeled "conjecture" or removed from Part 0 (which is supposed to be foundational commitments, not research speculation).

### index.md is very long and partially duplicates the series documents

index.md is ~1,800 words of narrative (excluding the navigation tables and equation table). Much of it repeats content from Parts 0–5 with slight variations. For readers using it as an entry point this is useful; for readers returning to check something specific it is confusing because some equations and claims appear slightly differently here than in the source documents. **Recommendation**: index.md's narrative sections should be clearly labeled as a "series introduction written to be read once" and internal consistency with source documents should be validated on each major revision.

### series_map.md "What's Genuinely Open" vs Part 5's "Nine Open Questions"

series_map.md says "Only three items remain unresolved after today's work" and lists: number=volume conjecture, dimensionality n_s=3, and Born rule via Gorard. Part 5 (Section 3) lists **nine** open questions for the broader framework. These are different things — the three in series_map are physics-paper specific; the nine in Part 5 are framework-wide — but a reader consulting series_map could incorrectly infer that most of the framework's open questions have been resolved. **Recommendation**: add a sentence to series_map's "What's Genuinely Open" section explicitly noting these are open problems for the physics papers only, and that Part 5 covers nine broader framework open questions.

### Equilibrium vs. far-from-equilibrium: repeated caveat but not resolved

Multiple documents (Part 1 Section 7a, index.md equation table, Part 5 Section 1) include the note that "equipartition definition requires near-equilibrium; most social systems are far from equilibrium." This caveat is correct and important, but it appears 4+ times without ever pointing to a document that addresses it. The `01c_thermodynamic_emergence_of_life.md` Theory Note covers thermodynamic emergence; it should be explicitly referenced each time this caveat appears.

### Part 3: no explicit worked example of the agency formula

The agency formula $A = C_{\text{coupling}} \times \mu_{\text{meta}} \times C_{\text{consciousness}}$ is introduced with multiple conceptual examples (hurricane, corporation, rock) but no worked numerical estimate — not even an order-of-magnitude illustration. For a central formula of the framework, a brief quantitative illustration (even with made-up numbers) would be pedagogically valuable.

---

## E. Index and Navigation

### index.md navigation table: Part 1.5 listed before Part 1
(See Section B above — this is the critical order error.)

**Fix applied**: None yet — flagging for judgment. The fix requires deciding the canonical reading order and updating both the table in index.md and the reading path in series_map.md.

### series_map.md Theory Notes section: duplicate "Effective Mass" entry
series_map.md Theory Notes lists "Effective Mass" twice:
```
| [Effective Mass](./effective_mass.md) | Part 1.5 | How the medium shapes... |
...
| [Effective Mass](./effective_mass.md) | Part 1.5 | Bare vs. effective mass |
```
Both entries link to the same file. One should be removed.

### series_map.md: "Proof Attempt" entry lists a file not in the theory index
series_map.md lists `causeplex_loop_phase_proof_attempt.md` in the Physics Foundations tree, and index.md also lists it in the Theory Notes table. This document exists (visible in the directory listing) but it was not in the audit list. It should be consistently labeled with a status (draft/speculative).

### Cross-links: Part 1's bottom navigation does not match reading path

Part 1's footer: `[→ Part 1b: Uncertainty, Coordinates, and Relativity] | [→ Part 2: Meta-Entities]`

This skips Part 1.5 entirely. If Part 1.5 is the next step after Part 1 (as the series_order metadata implies), the navigation should be `[→ Part 1.5: Causors]` or the reading order should explicitly position 1.5 as an optional "deep dive" branch.

### index.md: Part 5 Section 6 referenced but Section 6 is "Coda"

index.md references "[Part 5, Section 6](./05_ontology_and_open_questions.md)" for the self-application test vs. structural realism, but that section is titled "Coda" in the document. The index should use the section title for navigation clarity, or Part 5 should number the Coda.

---

## F. Consistency Issues

### CRITICAL: "Six causors" description in index.md is from the old v1 architecture

**index.md** (navigation table, Part 1.5 row):
> "Six candidate causors (bond, strength, loop order, basin depth, entropy production, repair rate)"

**Current 01_5_causors.md** has: Bond operator + Loop operator (Layer A), Q1–Q4 descriptors (Layer B), derived quantities at Layer C. The old "six causors" are no longer causors — they are either Layer A structures or Layer C descriptors.

**Fix applied below**: Updated the index.md navigation table description for Part 1.5.

### "causants" vs "causors" — agent files vs theory documents

AGENTS.bespoke.md and TOOLS.md reference "causants" (the older term used before the current "causors" terminology was adopted). The theory documents consistently use "causors." The agent configuration files use "causants" referring to `01_5_causants.md` (which is the old filename). This is an agent-workspace issue, not a theory-document issue, but it may cause confusion. The TOOLS.md file lists `01_5_causants.md` as a key file but the actual file is `01_5_causors.md`.

### "Causal action" introduction priority

- **index.md** (Part 1 caption): "...causal action and its connection to fitness×truth selection" — implies Part 1.5 introduces it
- **Part 1 Section 4b** actually introduces it first: "Connection to causal action"
- **Part 4 Section 1d** provides the full development
- **Part 1.5 Layer C table** lists it as a derived quantity

**Consistent attribution** should be: "first introduced in Part 1, formally developed in Part 4."

### series_map.md proof status legend vs. document status labels

series_map.md uses ✅ / ⚠️ / 🧭 for proof status. Individual theory documents generally do not use status labels for sections (they use callouts like `[!sidenote]` and explicit caveat paragraphs). This is fine — the series_map is the authoritative proof-status tracker — but the legend should clarify this explicitly ("see series_map.md for proof status; individual documents use prose caveats").

### causeplex_quantum.md and causeplex_loop_phase.md are marked `draft: true`

These physics papers are marked `draft: true` in their frontmatter, but series_map.md lists their results as ✅ or ⚠️ (proved/conditional). If the content is considered publication-ready enough to have formal proof status, the `draft: true` label is inconsistent. **Recommendation**: change to `draft: false` or add a status note explaining the draft label.

### Part 3 uses "soft lower bound" on $\mu_{\text{meta}}$ but it's defined in [0,1]

No formal lower bound other than 0 is given for $\mu_{\text{meta}}$. This is consistent — it's a normative parameter — but Part 3's claim that "bacteria satisfy minimal agency criteria" under the enactivist tradition is not reconciled with the Epimechanics formula. If $\mu_{\text{meta}} = 0$ for bacteria, agency = 0 under Epimechanics. The tension between the two accounts deserves a sentence of explicit comparison.

---

## Priority Action Items

1. **[CRITICAL] Fix reading order in index.md and series_map.md** — Part 1 must precede Part 1.5. Both the navigation table in index.md and the reading path in series_map.md list Part 1.5 before Part 1, but Part 1.5's own text requires Part 1 as a prerequisite. Update index.md navigation table to put Part 1 before Part 1.5. Update series_map.md reading path accordingly.
   - Files: `index.md` (navigation table), `series_map.md` (reading path)

2. **[HIGH] Update index.md Part 1.5 description from "six causors" to current architecture** — The description "Six candidate causors (bond, strength, loop order, basin depth, entropy production, repair rate)" is from the archived v1 and does not match the current document.
   - File: `index.md`, navigation table row for Part 1.5
   - **Fix applied below**

3. **[HIGH] Expand the glossary** — Add at minimum: cause-plex, bond operator, loop operator, causal action, Cause-Plex Index (CI), coupling tensor, local time, non-local time, agency, soul, state space.
   - File: `glossary.md`

4. **[HIGH] Verify or remove `../research/definitional_convergence.md` reference in Part 0** — The claim about "spectral radius φ" either needs its supporting document to exist and be accessible, or should be labeled speculative/removed from the foundational section.
   - File: `00_prelude.md`, Section on "Core vocabulary"

5. **[MEDIUM] Remove or archive "What Was Fixed Today" from series_map.md** — This ephemeral content will mislead future readers. Convert to a CHANGELOG.md entry or append to a persistent "Development History" section at the bottom.
   - File: `series_map.md`

6. **[MEDIUM] Add a pedagogical bridge in Part 1.5** for readers who arrive from Part 1 — the "Energy Is Not Primitive" opening is abrupt. A one-paragraph bridge explaining the relationship to Part 1's energy framework would help.
   - File: `01_5_causors.md`, Section "The Foundational Problem"

7. **[MEDIUM] Fix duplicate "Effective Mass" entry in series_map.md** — Two identical entries for `effective_mass.md`.
   - File: `series_map.md`, Theory Notes section

8. **[MEDIUM] Fix Part 1 navigation footer** — Update to `[→ Part 1.5: Causors]` if Part 1.5 follows Part 1 in the agreed order, or document explicitly why Part 1 skips to 1b.
   - File: `01_generalized_mechanics.md`, bottom navigation

9. **[MEDIUM] Reconcile `kappa_s` definitions in Part 1 and Part 4** — Both give the same informal definition (temporal autocorrelation of $\rho_{\text{ac}}$). Add a cross-reference in Part 1: "this is the definition formally used in Part 4."
   - Files: `01_generalized_mechanics.md` Section 2b, `04_time_and_soul.md` Section 1

10. **[MEDIUM] Clarify "What's Genuinely Open" in series_map.md vs Nine Open Questions in Part 5** — Add one sentence noting that the three items are for the physics papers only; Part 5 covers nine broader framework open questions.
    - File: `series_map.md`

11. **[LOW] Fix TOOLS.md and AGENTS.bespoke.md** — These agent config files reference "01_5_causants.md" and "causants" — the current filename is `01_5_causors.md` and the current term is "causors."
    - Files: `../../sai-workspace/agents/epiphysics-open-source/TOOLS.md`, `AGENTS.bespoke.md`

12. **[LOW] Mark causeplex_quantum.md and causeplex_loop_phase.md as `draft: false`** — or add a note explaining why draft:true is retained despite having formal proof status.
    - Files: `causeplex_quantum.md`, `causeplex_loop_phase.md`

13. **[LOW] Add explicit reference to `01c_thermodynamic_emergence_of_life.md`** at each of the 4+ places where the "far-from-equilibrium caveat" appears, so readers have a path to the resolution.
    - Files: `01_generalized_mechanics.md` Section 7a, `index.md` equation table, `05_ontology_and_open_questions.md`

14. **[LOW] Verify `../research/computation.md` exists** — referenced in Part 0 and Part 3 for depth of computation discussion. If it doesn't exist, replace link with a note or stub.
    - Files: `00_prelude.md`, `03_intelligence_consciousness_agency.md`

---

## Small Direct Fixes Applied

### Fix 1: index.md — Part 1.5 description updated

Old text in the navigation table:
```
| [Part 1.5: Causors](./01_5_causors.md) | What are entities made of? | Six candidate causors (bond, strength, loop order, basin depth, entropy production, repair rate); auto-causality is emergent at the loop level |
```

New text:
```
| [Part 1.5: Causors](./01_5_causors.md) | What are entities made of? | Two Layer A structures (bond operator, loop operator) with Q1–Q4 descriptors (energy mode, output target, topology, leverage); derived Layer C quantities include generalized mass, auto-causal density, maintenance cost; auto-causality is a loop-level emergent property |
```
