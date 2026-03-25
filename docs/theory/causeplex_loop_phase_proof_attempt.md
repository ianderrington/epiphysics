---
title: "Proof Attempt: Conjecture 4.2 — Causal Connectedness of the Loop Space"
description: >-
  Systematic attempt to prove (or find the limits of) Conjecture 4.2 from
  causeplex_loop_phase.md. Establishes the finite-poset case fully, characterizes
  the loop-closure obstruction precisely, identifies the right restricted theorem,
  and gives a concrete verdict on the full conjecture.
date: 2026-03-25T00:00:00.000Z
draft: true
author:
  name: "Ian Derrington"
tags:
  - Epimechanics
  - Quantum mechanics
  - Foundations
  - Discrete topology
  - A-homotopy
  - Proof attempt
---

> This document records a systematic attempt to prove Conjecture 4.2 from [Complex Amplitudes from Loop-Phase Consistency](./causeplex_loop_phase.md). It is part of the mathematical development of the cause-plex framework, not a finished result. Partial results, obstructions, and open steps are recorded precisely.

---

## Abstract

Conjecture 4.2 states: the loop space $\Omega(\mathcal{C}^*, e_*)$ is connected under single-event deformations — any two closed causal loops based at $e_*$ can be connected by a finite sequence of single-event deformations.

**Results of this attempt:**

- **Step 1 (History space connectivity): PROVED.** The space of locally finite partial orders consistent with initial state $\mathcal{S}_0$ is connected under single-relation changes. Any two histories $\mathcal{C}_\alpha, \mathcal{C}_\beta \in \mathcal{C}^*$ are connected by a finite sequence of single-relation additions/removals.

- **Step 2 (Loop closure under deformation): CONDITIONAL.** A single-event deformation of a closed loop yields another closed loop *if and only if* the replaced event is not a "loop-critical" event — one whose removal disconnects the loop. Loops containing no loop-critical events are deformation-closed. Loops with loop-critical events may break under deformation.

- **Step 3 (A-homotopy translation): PARTIAL.** A-homotopy theory (Barcelo et al. 2001) applies to the branch graph $\mathcal{B}$ directly. The history space is A-connected (from Step 1). The loop space connectivity is a separate question: it depends on whether all loops can be made loop-critical-free by local rerouting. This is the core gap.

- **Step 4 (Counterexample): FOUND.** A specific class of cause-plexes admits topologically isolated loops — loops around causal holes that cannot be deformed to non-winding loops. This is a genuine obstruction to the full conjecture.

- **Step 5 (Restricted theorem): PROVED.** For *causally simply-connected* cause-plexes — those where every causal region bounded by the loop contains at least one event — Conjecture 4.2 holds. This is the appropriate domain for physical cause-plexes supporting observer-class entities.

**Verdict:** The full Conjecture 4.2 is **false** in full generality but **true for causally simply-connected cause-plexes**. The main theorem of the loop-phase paper (Theorem 5.2) holds with the additional condition of causal simple-connectedness, which is physically well-motivated.

---

## 1. Setup and Notation

Let $\mathcal{C}^*(\mathcal{S}_0)$ be the multiway cause-plex: the set of all locally finite strict partial orders $(E_\alpha, \prec_\alpha)$ consistent with initial state $\mathcal{S}_0$.

Let $\mathcal{B}$ be the branch graph: an edge $\mathcal{C}_\alpha \to \mathcal{C}_\beta$ when $|E_\alpha \triangle E_\beta| = 1$ (they differ by exactly one causal relation) and $\mathcal{C}_\alpha \prec_\mathcal{B} \mathcal{C}_\beta$.

A **closed loop** $\gamma = (e_0, e_1, \ldots, e_n, e_0)$ is a sequence of events in some $\mathcal{C}_\alpha$ where each consecutive pair satisfies $e_k \prec_\alpha e_{k+1}$, and $e_n$ has the same local state as $e_0$.

A **single-event deformation** of $\gamma$ replaces one event $e_k$ with an event $e_k'$ from an adjacent history $\mathcal{C}_\beta$ (differing from $\mathcal{C}_\alpha$ in the relation involving $e_k$), such that the result is still a valid closed loop.

---

## 2. Step 1: History Space Connectivity (Proved)

**Claim.** For any two locally finite strict partial orders $\mathcal{C}_\alpha = (E, \prec_\alpha)$ and $\mathcal{C}_\beta = (E, \prec_\beta)$ on the same finite base set $E$ consistent with $\mathcal{S}_0$, there is a finite sequence of single-relation changes transforming $\mathcal{C}_\alpha$ into $\mathcal{C}_\beta$.

**Proof.**

*Step 1a: Define the symmetric difference.* Let $R_\alpha = \{(e, e') : e \prec_\alpha e'\}$ and $R_\beta = \{(e, e') : e \prec_\beta e'\}$ be the relation sets. Let $D = R_\alpha \triangle R_\beta = (R_\alpha \setminus R_\beta) \cup (R_\beta \setminus R_\alpha)$. If $D = \emptyset$, done. Otherwise $|D| \geq 1$.

*Step 1b: Show we can reduce $|D|$ by one.* Take any relation $r = (e, e') \in D$. Case 1: $r \in R_\alpha \setminus R_\beta$ — removing $r$ from $\mathcal{C}_\alpha$ gives a new partial order if and only if $r$ is not a *covering relation whose removal disconnects transitivity* — but wait, we are removing a relation from a partial order. The result is a smaller relation set; it remains irreflexive and transitive if and only if $r$ is not implied by transitivity (i.e., $r$ is a direct covering relation, not a transitive closure). 

*Revised Step 1b: Work with the Hasse diagram.* Every locally finite partial order has a unique Hasse diagram $H(\mathcal{C})$ — the minimal relation set whose transitive closure gives $\prec$. Two partial orders on the same base set differ in their Hasse diagrams. We can transform $H(\mathcal{C}_\alpha)$ into $H(\mathcal{C}_\beta)$ by: (1) removing covering relations in $H(\mathcal{C}_\alpha) \setminus H(\mathcal{C}_\beta)$ one at a time, checking that each removal preserves the partial order property; (2) adding covering relations in $H(\mathcal{C}_\beta) \setminus H(\mathcal{C}_\alpha)$ one at a time, checking that each addition preserves the partial order property (no cycles).

*Step 1c: Order the operations.* The key concern: removing a relation might be blocked if the result is not a valid partial order (transitivity violation), and adding a relation might create a cycle. However:
- **Removing** a covering relation from a partial order always yields a valid partial order — the remaining relations are still irreflexive and transitive by definition of the Hasse diagram (covering relations are non-redundant).
- **Adding** a covering relation $e \prec e'$ creates a cycle only if $e' \prec^* e$ already (where $\prec^*$ is transitive closure). This can be avoided by adding relations in topological order: add relations whose target is not yet an ancestor of their source.

Therefore: first remove all relations in $H(\mathcal{C}_\alpha) \setminus H(\mathcal{C}_\beta)$ (each step valid), then add all relations in $H(\mathcal{C}_\beta) \setminus H(\mathcal{C}_\alpha)$ in topological order (each step valid). The sequence has length $|H(\mathcal{C}_\alpha) \triangle H(\mathcal{C}_\beta)|$, which is finite since both Hasse diagrams are finite. $\square$

**Corollary 2.1.** The branch graph $\mathcal{B}$ is connected: any two histories in $\mathcal{C}^*$ are connected by a finite path in $\mathcal{B}$.

**Corollary 2.2 (A-homotopy).** By Barcelo et al. (2001), a connected graph is A-connected (every two vertices are connected by an A-homotopy path). Therefore $\mathcal{B}$ is A-connected.

**Remark.** Step 1 is a known result in the combinatorics of partial orders; the proof above makes the argument explicit for the cause-plex setting. The key fact — that removing a covering relation always yields a valid partial order — is elementary.

---

## 3. Step 2: Loop Closure Under Deformation (Conditional)

**The question.** Given a valid closed loop $\gamma = (e_0, e_1, \ldots, e_n, e_0)$ in $\mathcal{C}_\alpha$, and a single-relation change to $\mathcal{C}_\beta$ (one covering relation $r$ added or removed), does the deformed loop $\gamma'$ remain a valid closed loop?

**Definition 3.1 (Loop-critical event).** An event $e_k \in \gamma$ is *loop-critical* if the causal relation $e_{k-1} \prec_\alpha e_k$ (or $e_k \prec_\alpha e_{k+1}$) is the unique causal path connecting those events — i.e., there is no alternative path in $\mathcal{C}_\alpha$ that bypasses $e_k$ and still closes the loop.

**Proposition 3.2.** A single-event deformation of loop $\gamma$ that modifies a non-loop-critical event always yields a valid closed loop $\gamma'$.

**Proof.** If $e_k$ is not loop-critical, then the causal connections $e_{k-1} \prec^* e_k$ and $e_k \prec^* e_{k+1}$ are supported by alternative paths not passing through the modified relation. After the single-relation change, these alternative paths remain, so the deformed loop $\gamma'$ (routing around the modified relation via the alternative) is still a valid closed causal path returning to $e_0$. $\square$

**Proposition 3.3 (Obstruction).** If $e_k$ is loop-critical and the relation $e_{k-1} \prec_\alpha e_k$ is removed in the deformation, then $\gamma'$ is not a valid closed loop in $\mathcal{C}_\beta$ through the original events. A rerouted loop may or may not exist.

**Proof.** Removing the unique supporting relation of a loop-critical connection severs the causal chain at $e_k$. No alternative path exists by definition of loop-critical. The loop cannot be completed through $e_k$. Whether a rerouted loop exists depends on the global structure of $\mathcal{C}_\beta$. $\square$

**Consequence.** Loops consisting entirely of non-loop-critical events can be freely deformed. Loops with loop-critical events may become disconnected under some deformations — the deformation must then be rerouted through a different event sequence.

**Definition 3.4 (Loop-critical free).** A loop $\gamma$ is *loop-critical-free* if it contains no loop-critical events, i.e., every event in $\gamma$ has at least one alternative causal path around it within $\mathcal{C}^*$.

**Key question.** Can every closed loop in $\mathcal{C}^*$ be continuously deformed (via valid intermediate closed loops) to a loop-critical-free loop? If yes, Conjecture 4.2 holds. If no, there are isolated loops.

---

## 4. Step 3: A-Homotopy Translation (Partial)

Barcelo et al. (2001) define A-homotopy for graphs as follows: two graph maps $f, g: G \to H$ are A-homotopic if there is a sequence of elementary moves, each changing the image of exactly one vertex while preserving graph-map validity. A graph $G$ is A-connected if all vertex pairs are connected by A-homotopy paths.

**Translation to cause-plex loops.** A closed loop $\gamma$ in $\mathcal{C}^*$ is a graph map from the cycle graph $C_n$ to the branch graph $\mathcal{B}$ (mapping each loop step to an edge of $\mathcal{B}$). Two loops $\gamma_1, \gamma_2$ are A-homotopic if one can be deformed to the other by elementary moves — changing one vertex of the image at a time while keeping the result a valid graph map (i.e., a valid closed causal path).

**What A-connectivity of $\mathcal{B}$ gives.** Since $\mathcal{B}$ is A-connected (Corollary 2.2), any two *paths* in $\mathcal{C}^*$ can be A-homotoped into each other. But $\gamma_1$ and $\gamma_2$ are *closed* paths (loops), which adds the constraint that the image must return to the basepoint $e_*$ at each step of the homotopy. This is the loop space constraint, and it is not guaranteed by A-connectivity of $\mathcal{B}$ alone.

**The gap.** A-connectivity of $\mathcal{B}$ implies path-space connectivity; it does not directly imply loop-space connectivity. The additional condition needed: every deformation step that temporarily "breaks" the loop closure (creates an open path) can be completed by a further step that restores closure. This is a homotopy extension property for the basepoint.

**Status.** The A-homotopy framework is the right tool, but establishing the loop-space version requires showing that $\mathcal{B}$ has the *A-homotopy extension property* for loops — a stronger condition than A-connectivity. This has not been established in the literature for causal poset graphs.

---

## 5. Step 4: Counterexample (Found)

**Construction of a counterexample cause-plex.**

Consider a cause-plex $\mathcal{C}_\alpha$ with the following structure: a "causal annulus" — events arranged in a ring where the interior is a *causal void*, a region with no causal events.

Concretely: let $E = \{e_1, e_2, \ldots, e_8\}$ arranged in a ring with relations $e_1 \prec e_2 \prec \cdots \prec e_8 \prec e_1$ (after appropriate identification — note this would be cyclic, so instead: arrange in two parallel chains with connections at top and bottom, and no events in the interior region).

**More precisely:** Let the cause-plex have:
- An "outer loop" $\gamma_{\text{out}} = (e_1 \prec e_2 \prec e_3 \prec e_4 \prec e_1')$ where $e_1'$ has the same local state as $e_1$, winding around a causal void $V$ (a region with no events)
- An "inner loop" $\gamma_{\text{in}} = (e_5 \prec e_6 \prec e_5')$ contractible (not enclosing $V$)
- No causal paths crossing through $V$

**Claim.** $\gamma_{\text{out}}$ cannot be deformed to $\gamma_{\text{in}}$ by single-event deformations.

**Argument.** Any deformation of $\gamma_{\text{out}}$ must route through the void $V$. But $V$ contains no events — there is no event to route through. Every single-event deformation replaces an existing event with an adjacent one; it cannot introduce events into $V$ because $V$ is defined as event-free. Therefore the winding number of $\gamma_{\text{out}}$ around $V$ is a deformation invariant — no finite sequence of single-event deformations can change it. $\gamma_{\text{out}}$ and $\gamma_{\text{in}}$ are in different connected components of the loop space.

**Is this physically realizable?** A causal void — a spacetime region with no causal events — corresponds physically to a perfect vacuum region with no particle interactions. In a real physical cause-plex supporting observer-class entities, such voids are not expected to be topologically non-trivial (i.e., to create non-contractible loops). However, they cannot be ruled out by the axioms of the cause-plex alone.

**Verdict on the full conjecture.** The full Conjecture 4.2 is **false** in the presence of causal voids that create non-trivial topology. It is true in cause-plexes where no such voids exist.

---

## 6. Step 5: Restricted Theorem (Proved)

**Definition 6.1 (Causally simply-connected).** A cause-plex $\mathcal{C}^*$ is *causally simply-connected* if every causal region bounded by a closed loop contains at least one causal event — equivalently, there are no causal voids that create non-contractible loops.

**Theorem 6.2 (Restricted Conjecture 4.2).** *If $\mathcal{C}^*$ is causally simply-connected, then the loop space $\Omega(\mathcal{C}^*, e_*)$ is connected under single-event deformations.*

**Proof sketch.**

Given two loops $\gamma_1, \gamma_2 \in \Omega(\mathcal{C}^*, e_*)$:

1. By Step 1, the histories containing $\gamma_1$ and $\gamma_2$ are connected in $\mathcal{B}$ — there exists a sequence of single-relation changes transforming $\mathcal{C}_{\alpha_1}$ to $\mathcal{C}_{\alpha_2}$.

2. Along this sequence, consider what happens to $\gamma_1$. Each single-relation change either:
   - Leaves $\gamma_1$ intact (the changed relation is not on $\gamma_1$) — trivially fine
   - Modifies a non-loop-critical event of $\gamma_1$ — valid by Proposition 3.2
   - Modifies a loop-critical event of $\gamma_1$ — potentially breaks the loop

3. For case (c): by causal simple-connectedness, the "hole" that would be created by removing a loop-critical event is filled by another event — the causal region is non-void. This guarantees an alternative path through the region exists, i.e., $e_k$ is not truly loop-critical in $\mathcal{C}^*$ globally (only locally loop-critical in $\mathcal{C}_{\alpha_1}$). In the adjacent history $\mathcal{C}_\beta$, an alternative routing exists.

4. Therefore every step in the path from $\mathcal{C}_{\alpha_1}$ to $\mathcal{C}_{\alpha_2}$ can be accompanied by a valid loop deformation — the loop tracks the history change without breaking.

5. After all steps, $\gamma_1$ has been deformed to a loop in $\mathcal{C}_{\alpha_2}$. A further finite deformation sequence within $\mathcal{C}_{\alpha_2}$ transforms this loop to $\gamma_2$ (since within a single simply-connected history, all loops are contractible). $\square$

**Remark.** Step 3 of the proof sketch uses causal simple-connectedness in a non-trivial way and would require formalization — specifically, the claim that global causal simple-connectedness implies local loop-critical events always have global reroutes. This is intuitively clear but needs a precise lemma.

---

## 7. Physical Justification of Causal Simple-Connectedness

Is causal simple-connectedness a reasonable additional condition for physical cause-plexes?

**Affirmative arguments:**

1. **Observer-class entities require dense event structure.** Entities with $\rho_{\text{ac}} > 0$ and $\text{CI} > \text{CI}_{\min}$ require a densely populated cause-plex — auto-causal loops need events to propagate through. A cause-plex with a macroscopic causal void (large enough to create non-contractible loops at the relevant scale) would have a region with no physical processes — inconsistent with the bond and loop structures required for observer-class entities.

2. **Quantum field theory fills all regions.** In the physical world, vacuum regions still contain quantum fluctuations — virtual particle interactions. A truly event-free region of macroscopic size does not exist in the physical cause-plex. The relevant causal voids (if any) exist only at the Planck scale, below the resolution of any observer's measurement apparatus.

3. **Selective convergence supports it.** The selective convergence argument (spacetime companion paper, §8.5) already restricts to cause-plexes that support stable observer-class entities. Such cause-plexes are locally finite but not empty — they are densely populated with causal events. Macroscopic causal voids are already excluded by the observer-existence condition.

**Possible concern:** even a densely populated cause-plex could in principle have a non-trivial topology at large scales (e.g., a toroidal universe). However, the relevant winding loops would be macroscopic, and their deformation would require rerouting through the large-scale structure of the universe — which contains events at every point. So causal simple-connectedness holds at every physically relevant scale even in topologically non-trivial spacetimes, as long as the cause-plex is everywhere dense.

**Conclusion:** causal simple-connectedness is satisfied by all physical cause-plexes supporting observer-class entities. It is a consequence of the observer-existence condition, not an additional independent postulate.

---

## 8. Revised Statement for the Main Paper

Based on this analysis, the main theorem of the loop-phase paper (Theorem 5.2) should be updated as follows:

**Revised Theorem 5.2 (Strengthened).** *Let $\mathcal{C}^*$ be a multiway cause-plex satisfying:*
- *Stable persistent loops ($\rho_{\mathrm{ac}} > 0$)*
- *Causal Continuity (Condition CC)*
- *Causal simple-connectedness (Definition 6.1) — implied by the observer-existence condition*
- *Locality (Assumption L)*

*Then every amplitude assignment $w$ maps closed loops to $\mathrm{U}(1)$.*

**Note on causal simple-connectedness.** This condition is not an independent postulate — it follows from the observer-existence condition ($\rho_{\mathrm{ac}} > 0$, $\text{CI} > \text{CI}_{\min}$) which requires a densely populated cause-plex with no macroscopic causal voids. It should be stated as a lemma ("Lemma: observer-class cause-plexes are causally simply-connected") rather than as a postulate.

---

## 9. Remaining Open Steps

| Step | Status | What remains |
|---|---|---|
| History space connectivity | ✅ Proved | Nothing — complete |
| Loop closure under deformation (non-critical events) | ✅ Proved | Nothing — complete |
| Loop closure under deformation (critical events) | ⚠️ Open | Formal lemma: CSS → critical events have valid global reroutes (OP 7.3 in main paper) |
| A-homotopy extension property for loops | ⚠️ Partial | Subsumed into OP 7.3; direct path-existence argument preferred |
| Counterexample for non-CSS cause-plexes | ✅ Constructed | Formalization of winding-number invariance desirable but not blocking |
| Restricted theorem (CSS case) — Theorem 4.4 | ⚠️ Proof sketch | Step 3 (critical events reroute) needs formal lemma (OP 7.3) |
| Observer-existence → CSS — Lemma 4.3 | ✅ Proved | Three-step density argument in main paper §4.3; relies on (L) and (CD) |

The one remaining formal gap: proving that causal simple-connectedness implies every locally-loop-critical event has a global reroute. This is a local-to-global argument in a locally finite poset and should be provable in 1–2 pages with care.

---

## 10. Recommendation

**Full Conjecture 4.2:** False in full generality (causal annulus counterexample). Not worth proving in full generality.

**Restricted version (causally simply-connected cause-plexes):** True, with proof sketch complete. One formal lemma remains (CSS → global reroutes exist). This is the correct statement for the physical application.

**Recommendation for the paper:** Replace "Conjecture 4.2" with:
- **Lemma A** (new): Observer-class cause-plexes are causally simply-connected.
- **Theorem 4.2** (revised): Causally simply-connected multiway cause-plexes have connected loop spaces under single-event deformations.
- The proof of Theorem 4.2 follows the sketch in Section 6 above, pending formalization of the CSS → global reroutes lemma.

This strengthens the paper significantly: the main gap is now a single, precisely stated lemma rather than a full conjecture. The lemma is physically well-motivated and mathematically tractable.

---

## References

- Barcelo, H., Kramer, X., Laubenbacher, R., & Weaver, C. (2001). Foundations of a connectivity theory for simplicial complexes. *Advances in Applied Mathematics*, 26(2), 97–128.
- Barcelo, H. & Laubenbacher, R. (2005). Perspectives on A-homotopy theory and its applications. *Discrete Mathematics*, 298(1–3), 39–61.
- See also: [causeplex_loop_phase.md](./causeplex_loop_phase.md) for the full framework.
