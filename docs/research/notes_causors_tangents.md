---
title: 'Causors: Removed Tangents and Future Ideas'
description: >-
  Content removed from Part 1.5 (Causors) during March 2026 refactor.
  Interesting ideas that didn't fit the focused Structure Layer document
  but may be useful for future papers or sidenotes.
date: 2026-03-29T00:00:00.000Z
draft: true
---

# Causors: Removed Tangents and Future Ideas

Content extracted from `01_5_causors.md` during the March 2026 refactor that separated Event Layer into `00b_event_layer.md`. These are interesting ideas that broke the flow of the main document but may be valuable for:
- Future sidenotes
- Standalone papers
- Examples in applications docs
- FAQ / pedagogy docs

---

## 1. Energy Accessibility and Uranium Example

> **Energy accessibility is relational.** Uranium stores energy in nuclear bonds. For a cell, no bond chain connects uranium to the cell's causal structure — the energy is inaccessible. For a nuclear plant, a full bond chain exists. The energy content of matter is the same; what differs is whether the cause-plex connecting it to the entity exists. "Potential potential energy" is the name for energy stored in matter that requires intermediate entities (transducer chains) to access.

**Why removed:** Good pedagogical example but interrupts the Q1-Q5 flow. Could be a sidenote or moved to an applications doc about energy systems.

**Potential homes:**
- Sidenote in Q1 (Energy Mode) section
- Applications doc on energy systems
- FAQ: "What is potential potential energy?"

---

## 2. Information Is Not Primitive

> **"Information" is not primitive.** Information transfer is always implemented by a gating composition — a small event cluster directing a large one. Shannon entropy is a description of probability distributions over causal states. It is an Observable Layer observable: a summary of gating structure from an observer's perspective. Making it primitive creates circular definitions.

**Why removed:** Important conceptual point but tangential to the main bond/loop exposition. Deserves its own treatment.

**Potential homes:**
- Dedicated paper: "Information in Epimechanics"
- Section in Part 3 (Intelligence/Consciousness)
- Glossary entry for "Information"

---

## 3. Proton QCD Confinement Discussion

The self-containment table included detailed discussion of proton stability:

> **Protons:** QCD confinement ~938 MeV / $k_BT$ ≈ 10³⁷ at 300K | ~0 | Yes | Real sub-bonds (quarks + gluons); confinement makes dissolution effectively impossible at normal conditions

**Why simplified:** The table still includes protons but the QCD confinement detail was excessive for the main narrative. The point (protons are extremely stable) comes through without the physics detail.

**Potential homes:**
- Physics appendix
- Causeplex spacetime paper
- Footnote in self-containment section

---

## 4. Label Discipline Section (Full Version)

Original full version:

> **Label Discipline**
>
> A standing warning that applies throughout this document:
>
> **Qualitative labels are derived outputs, not inputs.** Terms like "robust," "fragile," "self-maintaining," "startup," or "institution" summarize structural configurations. They have no independent explanatory content. Using them in explanation position is circular.
>
> The correct direction:
> $$\text{structural configuration} \xrightarrow{\text{causor analysis}} \text{predicted properties} \xrightarrow{\text{summary}} \text{label}$$
>
> When a label appears as an example, it is a pointer to a structural configuration — the reader should ask what specific bond structure and topology the label summarizes.

**Why removed:** This is methodological guidance that applies to the whole framework, not just Part 1.5. It's also somewhat preachy in tone.

**Potential homes:**
- Part 0 (Foundations) — methodological section
- Glossary entry for "Label"
- Reader's guide / methodology appendix

---

## 5. The House Problem (Detailed Version)

Original included a full worked example:

> **The House Problem (Resolved Without Circular Labels)**
>
> Consider two houses:
>
> **House A:** Steel-reinforced concrete foundation, engineered timber with redundant load paths, weather-sealed envelope, durable plumbing and electrical systems. Structurally: many high-$\sigma_b$ bonds, redundant topology (no single bond is a keystone), low exposure of bonds to entropy-producing environment (sealed envelope limits thermal cycling and moisture ingress).
>
> **House B:** Unreinforced masonry, single load paths, porous envelope, corrosion-prone materials. Structurally: lower-$\sigma_b$ bonds, single-path topology (several bonds are keystones), high bond exposure to degrading environment.
>
> From the cause-plex structure, Q1-Q4 predict:
>
> | Structural description | $\mathcal{M}$ | $\Delta V$ | $\dot{S}_{\text{int}}$ | $\dot{R}_{\text{repair}}$ | $C_{\text{maint}}$ | Label |
> |---|---|---|---|---|---|---|
> | High-$\sigma_b$, redundant, sealed | High | Deep | Low | 0 | Low | "Well-built" |
> | Low-$\sigma_b$, single-path, porous | Medium | Shallow | High | 0 | High | "Cheap" |
>
> The labels are summaries of the structural descriptions. "Well-built" explains nothing — the structural configuration (bond material + topology + redundancy) explains everything. The counter-intuitive result (more bonds, less maintenance) follows because $\Delta V$ depends on *redundancy* (no keystone bonds), not bond count, and $\dot{S}_{\text{int}}$ depends on bond *exposure*, not bond count.

**Why removed:** Good worked example but too long for the main document. The Q1-Q5 entity type table already makes the point more concisely.

**Potential homes:**
- Applications doc on built structures
- Pedagogical supplement
- FAQ: "How do I apply Q1-Q5 to a concrete example?"

---

## 6. Noether Derivation Details

The original had a more detailed discussion of how energy emerges from symmetry:

> From the symmetries of the cause-plex:
>
> | Cause-plex symmetry | Conserved quantity (Noether) | Name |
> |---|---|---|
> | Time-translation invariance | $\sum_i p_i \dot{q}_i - L$ | Energy |
> | Spatial translation invariance | $\sum_i m_i \dot{q}_i$ | Momentum |
> | Rotational invariance | $\sum_i r_i \times p_i$ | Angular momentum |
> | U(1) gauge symmetry | $\sum_i q_i$ | Charge |
>
> **Energy is what we call the conserved quantity when the cause-plex has time-translation symmetry.** In regions where this symmetry holds (most of everyday physics), energy is well-defined and conserved. In regions where it is broken (strongly non-equilibrium, rapidly evolving, or symmetry-breaking systems), energy is not a clean quantity — and the framework must work at the causal event level directly.
>
> **Units emerge from reference events.** The second is defined by counting Cs-133 hyperfine transitions (9,192,631,770 per second by definition). The meter falls out from the second and $c$. The kilogram falls out from Planck's constant, the second, and the meter. All units are ratios of cause-plex path counts to reference cause-plex path counts. No unit is assumed.

**Why moved:** This is Event Layer content — it's now in `00b_event_layer.md` where it belongs.

**Status:** ✅ Already incorporated into 00b_event_layer.md

---

## 7. Wolfram Ruliad Connection (Detailed)

> **Wolfram's Ruliad**
>
> The cause-plex is a specific subgraph of the ruliad — the one realized by the physical world. The ruliad derivation works from abstract update rules; the cause-plex derivation works from physical causal events. If causal invariance (P2) follows from the energy exchange primitive that emerges at Observable Layer, the cause-plex derivation is strictly more grounded than the ruliad approach. See [Cause-Plex and Spacetime](./causeplex_spacetime.md).

**Why simplified:** The connection to Wolfram is covered in 00b_event_layer.md and in the causeplex papers. The claim about "strictly more grounded" is speculative and needs more development.

**Potential homes:**
- Causeplex spacetime paper (already there)
- Dedicated comparison paper: "Epimechanics vs Wolfram Physics"
- Part 5 (Ontology) discussion

---

## 8. Assembly Theory Connection (Detailed)

> **Assembly Theory**
>
> Assembly theory (Cronin & Walker, 2023) counts the minimum bond-formation operations to construct an object — the assembly index AI. The cause-plex extends this:
>
> 1. **Typed bonds.** AI counts undifferentiated bond operations. CI tracks Q1-Q4 bond structure. Same CI can produce completely different entity types depending on bond mode, target, and topology.
> 2. **From construction to maintenance.** AI measures build complexity; $C_{\text{maint}}$ measures keep complexity.
> 3. **From static to dynamic.** AI is a snapshot; the cause-plex tracks how bonds evolve, degrade, and repair.
>
> **Selection criterion:** High-CI objects with $\rho_{\text{ac}} > 0$ require selection *and* sustained causal input — doubly improbable without a generative process. High-CI objects with $\rho_{\text{ac}} = 0$ require selection but not ongoing input (crystals, diamonds).

**Status:** ✅ Kept in abbreviated form in 01_5_causors.md Section 8.

---

## 9. Future Diagram Ideas

From the session handoff, noted for future work:

> **Self-representation vs other-representation for conscious entities**
>
> Diagram showing:
> - Entity E with internal model X_E that includes representation of self
> - Contrast with entity that models external world but not self
> - Consciousness as the loop closure of self-representation
> - Visual: nested circles or strange loop structure

**Tools suggested:** Penrose, Manim for better diagram quality than TikZ

---

## 10. Open Questions (Extended List)

Some open questions were trimmed for the main document:

### Q: Does causal invariance (P2) follow from the primitive?

The Lorentzian metric and Lorentz invariance follow from P1-P3. P2 (spacelike-separated events commute) is physically motivated but not yet derived from the causal event primitive alone. This is the central open problem for the full foundational derivation.

**Status:** Now in 00b_event_layer.md

### Q: Does energy conservation follow from cause-plex time-translation symmetry?

Noether's theorem requires a Lagrangian formulation and continuous symmetry. Can this be derived from the discrete cause-plex structure, or does the Lagrangian need to be postulated at the continuum limit?

**Status:** Mentioned in 00b but could be expanded

### Q: What is the relationship between CI and stability?

High-CI objects may have deep stability basins — but need not (fragile complexity). Is there a formal relationship between construction complexity and thermodynamic stability?

**Status:** ✅ Kept in 01_5_causors.md Section 10

### Q: Can the Lagrangian be derived from cause-plex structure?

$L = \frac{1}{2}\mathcal{M}|\dot{X}|^2 - V(X)$ is a structural postulate in Part 1. If $\mathcal{M}$ is composed of bonds and $V(X)$ is determined by basin structure, can the quadratic kinetic energy be derived from the cause-plex rather than postulated?

**Status:** ✅ Kept in 01_5_causors.md Section 10

---

*This file is a scratchpad. Content here is not published but preserved for future use.*
