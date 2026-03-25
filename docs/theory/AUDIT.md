# Adversarial Audit: Epimechanics Theory Documents

**Audited documents:**
- `01_5_causors.md` — Part 1.5: Causors
- `causeplex_spacetime.md` — Cause-Plex and Spacetime
- `causeplex_quantum.md` — Cause-Plex and Quantum Mechanics
- `02_5_entity_interaction.md` — Part 2.5: Entity Interaction
- `02_meta_entities.md` — Part 2: Meta-Entities (skim)

**Audit type:** Rigorous adversarial academic review  
**Date:** 2026-03-25  
**Status of documents audited:** `01_5_causors.md`, `causeplex_spacetime.md`, `02_5_entity_interaction.md`, `02_meta_entities.md` marked `draft: false`; `causeplex_quantum.md` marked `draft: true`

---

## Table of Contents

1. [Philosophy — Foundational Consistency](#1-philosophy--foundational-consistency)
2. [Results — What Is Actually Proved vs. Assumed vs. Handwaved](#2-results--what-is-actually-proved-vs-assumed-vs-handwaved)
3. [Organization](#3-organization)
4. [Sections — Fine-Grained Assessment](#4-sections--fine-grained-assessment)
5. [Remaining Work — Prioritized](#5-remaining-work--prioritized)
6. [Adversarial Challenges](#6-adversarial-challenges)

---

## 1. Philosophy — Foundational Consistency

### 1.1 Does the primitive cleanly ground all derived quantities without circularity?

**Partially. There are two serious circularity problems and one near-miss.**

**Critical circularity #1: The cause-plex action uses energy before energy is derived.**

`causeplex_quantum.md` Definition 3.1 defines the cause-plex action as:
$$S[\gamma] = \sum_{k=1}^n \Delta E(e_k) \cdot \tau_{e_k}$$

But $\Delta E$ is explicitly defined "where time-translation symmetry holds (i.e. where energy is a well-defined conserved quantity)." This is a Layer C quantity being used inside the Layer 0 / Layer A structure. The framework's central claim is that energy is *derived* via Noether's theorem applied to the cause-plex action — but the action itself is written in terms of energy. This is circular.

The same circularity affects the Noether application in `causeplex_spacetime.md` Section 5.2: "continuous time-translation invariance of the cause-plex action gives a conserved quantity." What action? The action is not defined at Layer 0 without energy. Noether's theorem requires a Lagrangian, and the Lagrangian in Part 1 is explicitly noted (Open Question Q5 in `01_5_causors.md`) as a postulate. This open question is not resolved in the spacetime paper; it is simply silently assumed when needed.

**Critical circularity #2: The proof of P3 (finite minimum event latency) uses the continuum limit to derive a discrete property.**

The proof sketch in `causeplex_spacetime.md` Section 2 says: "In the continuum limit, this implies a minimum spacing between causally related events." But P3 is supposed to be a property of the discrete cause-plex before any continuum limit is taken. The continuum limit requires P3 to make sense (events must be finitely spaced before you can take a limit of infinitesimally spaced events). Using the continuum limit to derive P3 inverts the logical direction. P3 should either be treated as an independent postulate (alongside local finiteness) or derived from local finiteness directly without passing through a continuum argument.

**Near-miss: Energy conservation derivation assumes continuous symmetry without proving it.**

`causeplex_spacetime.md` Section 5.1 says: "In the continuum limit ($\tau_{\min} \to 0$, many events per reference period), discrete translation symmetry becomes continuous time-translation symmetry." This is asserted, not derived. The passage from discrete translation invariance to continuous time-translation symmetry is a non-trivial step (it requires the cause-plex dynamics to be smooth in the continuum limit, which itself requires proving that the lattice artifacts vanish). This is not a fatal problem but it should be marked as an assumption or open problem, not stated as a straightforward consequence.

### 1.2 Is the Layer 0 / Layer A / Layer B / Layer C architecture maintained throughout?

**In `01_5_causors.md`: Yes, explicitly and carefully.**  
**In `causeplex_spacetime.md` and `causeplex_quantum.md`: The layer framework is barely referenced and occasionally violated.**

Specific violations:

- `causeplex_spacetime.md` Section 6 (coarse-graining ladder) gestures at the layer structure but does not use the Layer 0/A/B/C notation at all. "Quantum fields" and "force" appear as the coarse-grained levels, but their relationship to the bond/loop structures of Layer A is unspecified.

- `causeplex_quantum.md` Section 3.1 operates with a "cause-plex action" defined using energy (Layer C), while claiming to work at Layer 0. The paper should either (a) acknowledge that this is a Layer C construction or (b) provide a Layer 0 definition of action that doesn't presuppose energy.

- `02_5_entity_interaction.md` correctly notes in its Layer note sidenote that it operates at Layer C. But several concepts used in the body — notably the coupling tensor $T^{\text{loop}}_{\text{import}}$ and its relationship to Layer A loop structures — are asserted at Layer C without explicit derivation from the bond/loop substrate.

Higher-level terms do not explicitly "slip back" into explanatory positions (the label discipline rule is well-maintained in `01_5_causors.md`), but the layer boundary is blurred in the physics papers.

### 1.3 Is the label discipline rule applied consistently?

**Yes in the epimechanics documents; inconsistently in the physics papers.**

The label discipline rule ("labels are outputs not inputs") is defined in `01_5_causors.md` and applied well there. The house problem example is a good demonstration. `02_5_entity_interaction.md` and `02_meta_entities.md` follow this discipline well.

However, in `causeplex_spacetime.md` Section 8.5, terms like "complex auto-causal loops" and "observer-class entities" appear in the stable observer manifold theorem as input conditions without being reduced to structural descriptions. The theorem requires $\text{CI} > \text{CI}_{\min}$ but $\text{CI}_{\min}$ is never defined precisely — what count of bond operations constitutes "sufficient loop richness"? This is label use in explanation position: "observer-class entities require 3+1 dimensions" is vacuous unless "observer-class" is precisely grounded.

### 1.4 Hidden assumptions that should be explicit postulates

The following are used as if derived but function as hidden postulates:

| Hidden assumption | Location | Should become |
|---|---|---|
| The Lagrangian formulation applies in the continuum limit | `causeplex_spacetime.md` §5 | Explicit postulate or open problem |
| State domain inclusion implies causal precedence | `causeplex_spacetime.md` §2 P2 proof | Structural postulate in the primitive |
| Discrete translation symmetry → continuous time-translation symmetry | `causeplex_spacetime.md` §5.1 | Open problem or smoothness postulate |
| The cause-plex is "realized by the physical world" | `01_5_causors.md` | Empirical grounding assumption (should be stated) |
| $\text{CI}_{\min}$ threshold for observer-class entities | `causeplex_spacetime.md` §8.5 | Explicit definition or range |
| The "branchlike direction" of $\mathcal{C}^*$ has metric signature $(+)$ | `causeplex_quantum.md` §3.2 | Postulate, not consequence |
| Gorard's (2020) multiway convergence result applies to the cause-plex $\mathcal{C}^*$ | `causeplex_quantum.md` §4.2 | Requires proof of structural correspondence |

---

## 2. Results — What Is Actually Proved vs. Assumed vs. Handwaved

The following ratings are used:
- ✅ **Formally proved** (within this document)
- 📖 **Follows from cited results** (correctly cited, result applies)
- 🧭 **Well-motivated postulate** (reasonable assumption, should be labeled as such)
- ⚠️ **Conditional** (depends on unproven intermediate claim)
- ❌ **Handwave/gap** (claims derivation but doesn't actually derive)

### From `causeplex_spacetime.md`

| Claim | Rating | Notes |
|---|---|---|
| P1: causal partial order exists | ✅ | Definitional |
| P2: spacelike events commute | ⚠️ | "Proof" requires hidden assumption that state domain overlap ↔ causal precedence; this is not proved from P1 and locality alone, it needs an explicit postulate linking domain access to causal ordering |
| P3: finite minimum event latency | ❌ | Proof uses continuum limit to derive a discrete property; inverted logic |
| Proper time as event count ratio | 🧭 | Reasonable definition, but the reference oscillation must itself be a stable cause-plex structure — circularity risk if the reference clock depends on properties being derived |
| Metric determined up to conformal factor | 📖 | Malament (1977) is correctly cited and applies — but requires the cause-plex to be a "distinguishing spacetime," which is asserted not proved |
| Conformal factor fixed by event counting | ⚠️ | Correctly labeled "conditional"; the number=volume conjecture is open |
| Full Lorentzian metric | ⚠️ | Conditional on both Malament application and number=volume conjecture |
| Lorentz invariance | 📖 | Follows from Malament + continuum limit, conditional on above |
| Metric signature $(-,+,+,+)$ | ❌ | Summary table marks this ✅ but the body correctly describes it as the "Stable Observer Manifold Theorem (Proposed)" — the table is overclaiming; see §6 |
| Energy from Noether | ❌ | Requires Lagrangian formulation, not derived; requires discrete→continuous symmetry step, not derived; circular if action uses energy |
| Flat spacetime = uniform event density | 🧭 | Reasonable interpretation of Minkowski spacetime; not derived |
| GR interpretation | 🧭 | Consistent with CDT/causal set results; not derived |
| Einstein field equation | ✅ marked as 🔬 Open | This is honestly labeled |

### From `causeplex_quantum.md`

| Claim | Rating | Notes |
|---|---|---|
| Multiway cause-plex $\mathcal{C}^*$ is well-defined | ✅ | Definition is clear |
| Postulate Q' (all histories coexist) | 🧭 | Honestly labeled as a postulate |
| Imaginary unit $i$ from Wick rotation | ❌ | Not a derivation — see §6 for full analysis |
| $i$ is "forced by Lorentzian signature" | ❌ | The branchlike direction of the multiway graph is not a spacetime dimension; treating it as one conflates different mathematical structures |
| Born rule from Gorard + Gleason | ⚠️ | Gorard (2020) is a Wolfram Institute preprint, not peer-reviewed in a standard journal; the convergence of the multiway graph to $\mathbb{CP}^N$ with Fubini-Study metric is Gorard's claim and needs independent verification; given those premises, Gleason's theorem correctly applies |
| Classical limit via stationary phase | 📖 | Standard result, correctly applied |
| Entanglement as correlated branch structure | 🧭 | Reasonable structural characterization but "proof" of Proposition 5.3 is nearly empty |
| Cause-plex action definition | ❌ | Uses energy in definition; circular given that energy is supposed to be derived from Noether applied to this action |

### Flagged circular definitions

1. **"Causal event as primitive → energy → action → Noether → energy"**  
   Causors doc: energy emerges from cause-plex via Noether. Spacetime doc: Noether applied to "cause-plex action." Quantum doc: action defined as $\sum \Delta E(e) \cdot \tau_e$. Energy appears on both sides.

2. **"State domain overlap ↔ causal precedence" (P2 proof)**  
   The proof assumes: if $s \in D_{\text{out}}(e_1) \cap D_{\text{in}}(e_2)$ then $e_1 \prec e_2$. But causal precedence in Definition 1.2 is the binary relation $\prec$, not defined in terms of state domain access. The proof needs an additional axiom: "state domain dependency → causal precedence."

3. **"Observer-class entities require 3+1 ↔ 3+1 supports observer-class entities"**  
   The selective convergence argument's conclusion — that 3+1 is "uniquely" required — uses "sufficient loop composition richness" and $\text{CI}_{\min}$ which are defined in terms of the entities that exist in 3+1. See §6.

---

## 3. Organization

### 3.1 Reading order

The intended series order is:
```
01_generalized_mechanics.md
→ 01_5_causors.md
→ causeplex_spacetime.md
→ causeplex_quantum.md
→ 02_meta_entities.md
→ 02_5_entity_interaction.md
```

**Problem 1: Forward references in 01_5_causors.md.**  
The Q5 (timescale) descriptor says "see Cause-Plex and Spacetime for the full treatment." The three properties P1-P3 are introduced in `01_5_causors.md` but formally derived (or attempted) in `causeplex_spacetime.md`. A reader following series order encounters the claims before the derivations — fine — but the claims in `01_5_causors.md` should be clearly labeled as informal statements to be formalized later, not already-established results.

**Problem 2: causeplex_quantum.md is `draft: true` but is referenced throughout the series.**  
The self-grounding stack table in `causeplex_spacetime.md` includes Level 3 (quantum mechanics) as "⚠️ Requires one structural postulate" — implying the quantum paper is nearly complete. But the quantum paper itself is a draft and contains at least one fundamental gap (the imaginary unit). The draft status should be surfaced in the series index and in the spacetime paper's references to quantum.

**Problem 3: Q5 (timescale) appears as a Layer B structural question in `01_5_causors.md` but is then "resolved" as a derived quantity in `causeplex_spacetime.md` Corollary to Definition 3.2.**  
If Q5 is derived, it shouldn't appear as a structural question alongside Q1-Q4. The resolution is good but the presentation creates a contradiction: Q5 is introduced as structural and then demoted to derived. This should be explicit in `01_5_causors.md`: "Q5 is listed here for completeness; it is derived from cause-plex event count ratios, not an independent structural parameter — see [Cause-Plex and Spacetime]."

### 3.2 Redundant sections

- **Self-grounding stack table appears twice in `causeplex_spacetime.md`**: once in Section 8 (summary table) and again at the very end of the document (after the open problems). These should be merged into one location.
- **$\rho_{\text{attack}}$ is defined twice**: in `01_5_causors.md` (at the end of the Auto-Causality section) and in `02_5_entity_interaction.md` (Section 6). The definition in `01_5_causors.md` is briefer; the full development is in `02_5_entity_interaction.md`. The `01_5_causors.md` appearance should be a forward reference only, not a full definition.
- **"Information is not primitive" sidenote** in `01_5_causors.md` Q2 section: this is a correct and interesting claim but is not developed. It appears as a sidenote and is then never connected to the broader framework. Either develop it or move it to an open question.

### 3.3 Missing sections

- **A Layer 0 → Layer A connection derivation is missing.** How does a recurring pattern of causal events (bond, Layer A) emerge from the primitive $(E, \prec)$ (Layer 0)? The document asserts that "a bond is a recurring pattern of causal events" but doesn't show how recurring patterns are identified within a locally finite poset without imposing additional structure. A section on coarse-graining from Layer 0 to Layer A would significantly strengthen the framework.

- **Relationship between cause-plex and causal set theory is not a dedicated section.** The identity of the cause-plex with a causal set (at the physics level) is acknowledged in footnotes and sidenotes but never addressed head-on. A reader familiar with causal set theory will notice that everything in Sections 1-4 of `causeplex_spacetime.md` is standard causal set theory. The framework's distinctive contribution (bonds, loops, Q1-Q4, meta-entities) is at the coarse-grained level — this should be stated explicitly in a "Relationship to Causal Set Theory" section.

- **The discrete-to-continuum limit is never formally specified.** Multiple derivations require "in the continuum limit" but the limit itself ($\tau_{\min} \to 0$, $N \to \infty$, etc.) is not formally defined. What is kept fixed? What is varied? Causal dynamical triangulations (CDT) has a well-defined continuum limit procedure; the cause-plex framework should reference this or define its own.

### 3.4 Scope overlap

`causeplex_spacetime.md` and `causeplex_quantum.md` have heavy scope overlap with causal set theory. The distinctive contributions of the cause-plex framework need to be made explicit. Currently the papers read as: "here is causal set theory, and here is Wolfram's multiway graph, and we call the combination 'cause-plex.'" The added value — selective convergence, Q1-Q4 descriptors, the entity taxonomy, the connection to biology and sociology — is in `01_5_causors.md` and `02_x` documents, not in the physics papers themselves.

---

## 4. Sections — Fine-Grained Assessment

### Strong sections (keep as-is or with minor polish)

| Section | Document | Why strong |
|---|---|---|
| Layer architecture table | `01_5_causors.md` | Clean, precise, correctly tracks Layer 0→C |
| Q1-Q4 entity type table | `01_5_causors.md` | Useful, internally consistent, makes specific predictions |
| The House Problem | `01_5_causors.md` | Excellent working example of label discipline applied to a non-obvious case |
| Self-containment spectrum table | `01_5_causors.md` | Quantitative, calibrated against known physics, connects theory to measurement |
| Malament's theorem section | `causeplex_spacetime.md` §4.1–4.2 | Correctly cited, clearly explained, honest about what is and isn't proved |
| Dependency trap worked example | `02_5_entity_interaction.md` §4b | Rigorous causal chain, three stages clearly defined, policy implication correctly stated as empirical not political |
| Keystone bond / $\rho_{\text{attack}}$ analysis | `02_5_entity_interaction.md` §6 | Best section in the interaction document; precise, counterintuitive, generalizes well across scales |
| Interaction dynamics §7 | `02_5_entity_interaction.md` | Trajectory analysis using integral of $\kappa_{\text{sys}}$ over time is the right framing; examples span multiple scales |

### Weak sections (need significant work)

| Section | Document | Problems |
|---|---|---|
| P3 proof sketch | `causeplex_spacetime.md` §2 | Circular logic; should be marked as postulate |
| §5.1 discrete→continuous symmetry | `causeplex_spacetime.md` | Asserted, not shown; needs formal treatment or open problem label |
| §3.2 Imaginary phase from Wick rotation | `causeplex_quantum.md` | Not a derivation; see §6 of this audit |
| Proposition 5.3 proof sketch | `causeplex_quantum.md` | Proof is nearly empty: "holds precisely when the branch graphs have no shared nodes" restates the definition, doesn't prove it |
| Open Questions (Q1-Q5 in `01_5_causors.md`) | `01_5_causors.md` | Q3 and Q4 are genuine research questions but poorly framed; Q1 is answered (partially) in `causeplex_spacetime.md` but this isn't cross-referenced |
| Q2 output target / "Information is not primitive" sidenote | `01_5_causors.md` | The sidenote is correct but undeveloped; if Shannon entropy is a Layer C observable, this should be derived, not asserted |

### Good content, poor structure

| Section | Document | Issue |
|---|---|---|
| §8.5 Selective Convergence | `causeplex_spacetime.md` | Content is good; this should be its own document (`causeplex_dimensionality.md`) — it is too long and conceptually dense to live inside the spacetime paper as a subsection |
| Open Problems in `causeplex_spacetime.md` | `causeplex_spacetime.md` | OP1-OP4 are scattered after §8, then there's a second "Self-Grounding Stack" table, then References — the ending of this document is structurally chaotic |
| "Connections" section | `01_5_causors.md` | Good content (Assembly Theory, Wolfram, Representational Efficiency) but interrupts the theory before the Open Questions; move to an appendix or after Open Questions |
| Multi-scale loop structure (§5 in entity interaction) | `02_5_entity_interaction.md` | The Mermaid diagram is good; the nested analysis is sound; but "cross-scale coupling" subsection is too brief for its importance — it introduces the most complex issue (coupling tensor must be evaluated at all scales) and dismisses it in 4 sentences |

---

## 5. Remaining Work — Prioritized

### Priority 1: Must Fix Before Any Wider Sharing

**1a. Resolve the energy/action circularity.**

The most fundamental problem. Currently: energy is derived from Noether applied to the cause-plex action, but the cause-plex action is defined using energy. 

*Fix*: Either (a) define the cause-plex action at Layer 0 without using energy — perhaps as a count of causal events weighted by some structural property derived from $(E, \prec)$ alone — or (b) acknowledge that the action is a Layer C construct and the Noether application only holds at Layer C, making energy a coarse-grained description at that level, not a derivation from primitives. Option (b) is actually consistent with the framework's stated philosophy ("energy is the conserved quantity where time-translation symmetry holds") but requires rewriting the "energy derived from Noether" claim as "energy is what we call the conserved quantity that exists where time-translation symmetry holds" — which is less a derivation and more a definition.

**1b. Fix the P3 derivation or reclassify it as a postulate.**

P3 is currently listed as "✅ Derived" in the summary table but the proof uses the continuum limit to derive a discrete property. Either provide a genuine derivation of finite minimum latency from local finiteness alone (without passing through the continuum), or reclassify P3 as a well-motivated postulate (alongside local finiteness). The physical motivation (Planck time) is fine; it's the logical status that's wrong.

**1c. Reclassify the imaginary unit "derivation" in `causeplex_quantum.md`.**

The Wick rotation argument is currently presented as Proposition 3.2 with a "Proof sketch." The argument is suggestive but not a proof. At minimum it should be demoted to "Heuristic 3.2" or "Conjecture 3.2" with an explicit statement of what would be needed for a genuine proof. As presented, it misleads the reader into thinking the complex phase weight is derived when it remains an assumption (or at best, structurally motivated).

### Priority 2: Medium-Priority Improvements

**2a. Dedicate a section to the relationship between the cause-plex framework and causal set theory.**

At the physics level (Sections 1-4 of `causeplex_spacetime.md`), the cause-plex is a causal set. The Bombelli-Lee-Meyer-Sorkin (1987) paper introduces the same definitions. The framework needs to explicitly answer: "what does epimechanics add to causal set theory?" The answer is strong (Q1-Q4 descriptors, bond/loop coarse-graining, biological/social applications, the selective convergence argument) but it is never stated directly. Without this, the physics papers will be rejected by referees who recognize the overlap and see no acknowledgment of it.

**2b. Move §8.5 (Selective Convergence) to its own document.**

`causeplex_spacetime.md` is already long. Section 8.5 is arguably the most important and most original part of the physics argument but it gets buried. As a standalone `causeplex_dimensionality.md`, it can be developed fully: the Tangherlini analysis can be presented more carefully, the knot topology argument can be expanded, and the "Stable Observer Manifold Theorem" can be stated as a conjecture with a clearer proof roadmap.

**2c. Remove duplicate self-grounding stack table or merge into one authoritative location.**

The table at the end of `causeplex_spacetime.md` (after the open problems section) appears to be a slightly updated version of the table in Section 8. These should be one table, in one place, with consistent status markers. Currently the main Section 8 table says the metric signature is "✅ Selective convergence" while the proposed theorem calls it a "proof sketch." These should agree.

**2d. Add explicit Layer connections to `causeplex_spacetime.md` and `causeplex_quantum.md`.**

These documents operate primarily at the physics level without connecting to the Layer 0/A/B/C architecture. At minimum, a short "Layer architecture connection" section should appear in each, explaining which layer of the architecture each result lives at. This binds the physics papers to the larger framework instead of leaving them as disconnected formalisms.

**2e. Define $\text{CI}_{\min}$ precisely in the Stable Observer Manifold Theorem.**

The theorem requires $\text{CI} > \text{CI}_{\min}$ for "observer-class entities." What is this threshold? The knot theory argument (requires topologically distinct loop types) could anchor this: $\text{CI}_{\min}$ is the minimum CI for a cause-plex containing at least one topologically non-trivial loop (a loop not isotopically equivalent to a circle in 3D space). This would give a structural definition, not an observer-relative one.

### Genuinely Deferred/Open (should be labeled as such)

The following are currently mixed in with derived results or poorly flagged as open:

| Item | Current status | Should be |
|---|---|---|
| Einstein field equation from cause-plex dynamics | ✅ correctly labeled 🔬 Open | Continue as labeled |
| $\hbar$ as derived quantity from local finiteness | OP-Q3 in quantum paper | Flag as "deeply open; requires new physics to derive $\hbar$ from discrete combinatorics" |
| Quantum field theory from cause-plex | Listed as "Research direction" | Label explicitly as "out of scope for current framework; see roadmap" |
| Preferred basis / decoherence in cause-plex | OP 7.4 | Correctly labeled |
| Born rule from discrete path measure (without Gorard) | Conjecture 7.1 | Correctly flagged |
| Lagrangian from cause-plex structure | Open Question Q5 in 01_5_causors | Should be elevated to Priority 1 in remaining work — it is a prerequisite for the Noether application |
| Whether $Q1-Q4$ is a complete descriptor basis | Open Question Q3 in 01_5_causors | Correctly flagged |

---

## 6. Adversarial Challenges

### 6.1 Strongest objection to the core claim

**Core claim:** Causal events as primitive → quantum mechanics + general relativity (+ biological/social entity theory).

**Strongest objection:** The framework claims to derive the imaginary unit $i$ in the path integral from structural properties of the cause-plex. This is the linchpin of the quantum derivation. The argument fails:

The Wick rotation argument in Proposition 3.2 treats the "branchlike direction" of the multiway cause-plex as a spatial dimension with metric signature $(+)$. But the branchlike direction is not a physical dimension — it is a meta-level direction over the space of all possible histories. The Lorentzian metric, which has been derived for individual cause-plex histories, does not apply across the multiway graph. The $(-)$-to-$(+)$ signature mismatch that motivates the Wick rotation is a mismatch within one history's spacetime metric, not between a causal and a branchlike direction in the multiway structure.

Put concretely: Wick rotation $t \to it$ is a mathematical trick used to evaluate path integrals by converting oscillatory integrals to damped integrals. Its physical content is "Minkowski spacetime is related by analytic continuation to Euclidean spacetime." Using this to argue that the complex phase *must* appear in quantum amplitudes is circular: Wick rotation presupposes the path integral, it doesn't derive it. The argument therefore establishes, at best, that if you have a path integral defined on a Lorentzian cause-plex, the complex weights are consistent with the signature. It does not establish that those weights must be complex.

The result is that Postulate Q' (multiway structure) is doing all the real work, and the imaginary unit is either separately postulated or borrowed from Gorard's preprint. This is honest and reasonable, but the document's presentation implies a derivation it hasn't achieved.

### 6.2 Where a hostile reviewer attacks

**Attack 1: Gorard (2020) is not peer-reviewed mainstream physics.**

The derivation of the Born rule rests on Gorard's claim that the multiway graph converges to $\mathbb{CP}^N$ with the Fubini-Study metric. This result appears in a Wolfram Institute publication (`Complex Systems`), not in *Physical Review Letters*, *Communications in Mathematical Physics*, or equivalent. The result has not been independently verified by the quantum gravity community. Citing it as established (via Gleason's theorem) is premature. A hostile reviewer will note this immediately and dismiss the quantum derivation on these grounds alone.

*Fix:* Label the Born rule derivation as "conditional on Gorard (2020), which is a preprint result awaiting independent verification." Or provide an independent derivation.

**Attack 2: The "Stable Observer Manifold Theorem" is labeled as a theorem but is a conjecture.**

Section 8.5 introduces the "Stable Observer Manifold Theorem (Proposed)" with a "Proof sketch" that ends "The theorem is sound; the proof sketch needs formalization." A theorem without a complete proof is a conjecture. Calling it a theorem and then admitting the proof is incomplete will be caught by any referee. The summary table in Section 8 marks the metric signature as "✅ Selective convergence" — the checkmark implies the claim is established. A hostile reviewer will contrast the table (checkmark) with the body text ("proof sketch needs formalization") and flag this as misrepresentation.

**Attack 3: The framework does not engage with existing causal set theory.**

At the physics level, the cause-plex is a causal set (locally finite poset). The Bombelli et al. (1987) paper is cited, but the extensive subsequent literature on causal set dynamics is not engaged with. Specifically:

- Sorkin's quantum measure theory (1994) already derives quantum mechanics on causal sets in a way that avoids the multiway graph apparatus.
- The Benincasa-Dowker action (2010) provides a scalar field theory on causal sets.
- Henson (2006) reviews the status of deriving Lorentz invariance from causal sets.

A reviewer who knows this literature will ask: what does the cause-plex add? The distinctive contributions need to be stated and the existing results need to be cited. As currently written, the physics papers appear unaware of 30+ years of causal set theory.

**Attack 4: The P2 proof has a hidden assumption.**

The proof of P2 (spacelike events commute) in Section 2 of `causeplex_spacetime.md` concludes: "if $s \in D_{\text{out}}(e_1) \cap D_{\text{in}}(e_2)$, then $e_2$ reads a state written by $e_1$, which means $e_1$ causally precedes $e_2$." This argument assumes that reading a state written by another event implies causal precedence. But causal precedence (the $\prec$ relation) is defined as an abstract partial order in Definition 1.2 — it is not defined in terms of state domain access. The argument needs an additional axiom linking domain access to causal ordering. Without this, P2's proof is circular or gap-containing.

### 6.3 Comparison to existing work: what is missing or misleading

**Causal set theory (Bombelli et al. 1987; Sorkin et al.):**
The document cites Bombelli et al. but treats causal set theory as a "related result" rather than acknowledging that Sections 1-4 of `causeplex_spacetime.md` are essentially a restatement of causal set theory with different notation. This is not misleading per se, but it will frustrate readers who know causal sets and will raise questions about novelty. The document needs a "How epimechanics extends causal set theory" section that honestly states: "At the foundational physics level, we use the causal set framework. Our extensions are (a) typed bond coarse-graining, (b) the selective convergence argument for dimensionality, and (c) the biological/social entity taxonomy."

**Wolfram's Hypergraph (Wolfram 2020; Gorard 2020):**
The comparison table in Section 8.5 is fair. However, the document understates the criticism of Wolfram's approach from mainstream physics. Aaronson (2020) published a detailed critique arguing that Wolfram's framework is too flexible to make falsifiable predictions; Hossenfelder (2020) argued the approach cannot recover quantum gravity. These criticisms apply in modified form to the cause-plex framework and should be engaged with, even briefly. The document currently discusses Wolfram as a peer framework without noting the controversy.

**Loop quantum gravity (Rovelli, Smolin et al.):**
Entirely absent. LQG also derives discrete causal spacetime structure from quantized geometry. The spin foam models cited in Section 7.2 are from LQG. The paper should acknowledge that it is entering contested territory where multiple discrete quantum gravity programs exist and should locate itself relative to them.

**Anthropic principle literature:**
The selective convergence argument is a structural version of the weak anthropic principle. Barrow & Tipler (1986), Carter (1974), and Tegmark (1997) are the foundational references. Tegmark (1997) is correctly cited for the dimensionality stability analysis. But the document does not acknowledge the substantial literature on anthropic reasoning and the philosophical debate about whether observer-selection arguments constitute explanations. The framing "we observe 3+1 because 3+1 is the stable manifold that supports observers" is structurally identical to standard anthropic arguments. The document should either engage with this literature or acknowledge the parallel explicitly.

### 6.4 Is the selective convergence argument actually stronger than Wolfram's, or does it just restate the anthropic principle?

**Honest assessment: It is stronger than Wolfram's in one specific way, and it does partially restate the anthropic principle, but not in a circular way.**

**Stronger than Wolfram in one way:** Wolfram claims singular convergence — all possible rules give the same physics for any sufficiently complex observer. This is a strong claim that appears unsupported by the structure of the ruliad (why would all complex rules converge?). The cause-plex framework claims only selective convergence — the rules that support complex observers are restricted to a stable neighborhood of manifold space. This is a strictly weaker and therefore more defensible claim.

**Partially restates the anthropic principle:** "We observe 3+1 because 3+1 supports observers" is, logically, the weak anthropic principle (Carter 1974): "what we can expect to observe must be restricted by the conditions necessary for our presence as observers." The document's structural version adds specific physics content (Tangherlini's result on orbital stability, knot theory on loop diversity), which is stronger than a generic anthropic claim — it specifies *why* other dimensionalities fail, not just that they do.

**But it does not derive 3+1 from pure cause-plex structure.** The document's summary table says the metric signature is "✅ Selective convergence" as if the checkmark means "derived." The selective convergence argument explains why observers would find themselves in 3+1; it does not derive that the universe is 3+1 from the cause-plex primitive. These are different claims. The checkmark is misleading.

A better formulation: "The cause-plex framework, combined with the observer-selection fact that we are complex auto-causal entities, predicts that we would observe 3+1 dimensional spacetime. This is not a derivation of 3+1 from the primitive, but it is a stronger prediction than Wolfram's singular convergence claim because it grounds the observer-selection condition in specific structural stability results (Tangherlini, knot theory) rather than generic complexity arguments."

---

## Summary: Top Findings

### The three most important problems

1. **Energy/action circularity**: The cause-plex action is defined using energy, but energy is supposed to be derived via Noether applied to that action. This is the framework's most fundamental internal contradiction and must be resolved before the physics derivations can be claimed rigorous.

2. **The imaginary unit is not derived**: Proposition 3.2 in `causeplex_quantum.md` is presented as a proof but is a motivated analogy. The branchlike direction of the multiway graph is not a spacetime dimension, and treating it as one to apply Wick rotation conflates distinct structures. Postulate Q' plus Gorard's result may be sufficient to get QM, but the $i$ derivation doesn't close independently.

3. **Misrepresentation of proof status in summary tables**: The Section 8 status table in `causeplex_spacetime.md` marks metric signature as "✅ Selective convergence" (conflating explanation-by-observer-selection with derivation), and the self-grounding stack table marks quantum mechanics as almost closed. These tables will be the first thing a referee reads and they overclaim. Fixing the tables to accurately reflect what is proved, what is conjectured, and what is open is urgent.

---

*Audit produced by EPIPHYSICS-OPEN-SOURCE agent. For author response or revision tracking, maintain a `AUDIT_RESPONSE.md` alongside this file.*
