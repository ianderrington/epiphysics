# Verification Report
Date: 2026-03-25

## Overall Verdict

The loop-phase paper (`causeplex_loop_phase.md`) has made substantial progress since the prior AUDIT and is approaching a submittable state for a mathematical foundations / quantum-gravity programme paper. The proof chain Proposition 3.1 → Lemma 4.3 → Theorem 4.4 → Proposition 4.6 → Theorem 5.2 is now largely sound, with Lemma 4.3 formally proved by a clean three-step density argument. However, **one formal gap persists inside Theorem 4.4** (Step 3: the claim that causal simple-connectedness implies loop-critical events always have global reroutes) and this gap is inconsistently acknowledged across the document — the abstract and Section 7 declare the theorem fully proved while Section 9 (prior to the correction applied in this review) still listed Lemma 4.3 as "argued, one formal step remains." Additionally, the main paper's status table (§8.1) marks the Aaronson quaternion elimination as ✅ "Proved" when it is only ✅ "Argued via Aaronson (2004), which is explicitly informal." The spacetime paper's P2 fix is clean and CD is well-motivated. The single most important remaining issue is **formalizing Step 3 of Theorem 4.4** (the local-to-global rerouting lemma), which the proof-attempt document itself identifies but the main paper does not carry forward as a named open problem.

---

## A. Proof Chain

### Step 0: Proposition 3.1 (Stability → |w| = 1)

**Status: ✅ Proved.**

- Premises: well-formed amplitude assignment (Definition 2.8), stable persistent loops.
- The argument is valid: composition rule gives $w(\gamma^n) = w(\gamma)^n$; |w| ≠ 1 implies divergence or collapse; stable loops rule out both.
- **One hidden assumption**: the argument assumes the probability is computed as $|w(\gamma^n)|^2$ with no normalization factor that could absorb the growth. This is consistent with Definition 2.9, which uses a fixed normalization measure $\mu$. The assumption is implicit but defensible.
- **Remark 3.4** correctly restricts the claim to cause-plexes with $\rho_{\mathrm{ac}} > 0$, which is what is needed for the rest of the chain. No problems.

### Step 1: Lemma 4.3 (Observer-class → causally simply-connected)

**Status: ✅ Proved — three-step argument is complete, with caveats.**

The three steps:

**Step 1 (define $\ell_{\mathrm{ac}}$):** Well-defined. $\ell_{\mathrm{ac}}$ is the diameter of the smallest recurring auto-causal loop. The examples (molecular bond lengths, Compton wavelength) are appropriate calibration.

**Step 2 ($\rho_{\mathrm{ac}} > 0$ → event density at scale $\ell_{\mathrm{ac}}$):** This is the key step. The argument: a self-sustaining causal loop of scale $\ell_{\mathrm{ac}}$ requires at least one causal event per region of diameter $\ell_{\mathrm{ac}}$ per period — otherwise the loop cannot close because "causal influence cannot propagate across [an event-free segment]." This relies on the **locality assumption (L)** from the spacetime paper (events act on bounded local state domains, causal influence propagates only through event chains). The reliance on (L) is explicitly acknowledged in Remark 4.3b. The step is sound given (L).

**Step 3 (event density → causal simple-connectedness):** The argument: a causal void creating a non-contractible loop at scale $\ell$ must be a region of diameter $\geq \ell$ with no causal events; by Step 2 no such void exists at scale $\geq \ell_{\mathrm{ac}}$. This is valid. The contrapositive is clean.

**Caveats (not fatal):**
- The claim is restricted to scales $\geq \ell_{\mathrm{ac}}$, with Remark 4.3a handling sub-$\ell_{\mathrm{ac}}$ scales. The remark is physically sound: amplitude assignment $w$ is defined on loops accessible to the entity, so sub-$\ell_{\mathrm{ac}}$ topology is irrelevant to the argument.
- The proof relies on $\rho_{\mathrm{ac}}$ as defined in Part 1.5 (Causors). This definition is from a companion document and is not restated in the loop-phase paper. For a self-contained submission, Remark 4.3b's pointer to "Part 1.5: Causors" should be supplemented by a one-sentence restatement of the relevant definition.
- The CI condition ($\mathrm{CI} > \mathrm{CI}_{\min}$) appears in the Lemma statement but plays no role in the proof — the proof uses only $\rho_{\mathrm{ac}} > 0$ and the loop closure argument. **Either CI should appear in the proof, or it should be dropped from the Lemma statement.** This is a minor but real inconsistency.

### Step 2: Theorem 4.4 (Loop space connectivity for CSS cause-plexes)

**Status: ⚠️ Proved as sketch — Step 3 requires formal completion.**

The proof has four numbered steps:

**Step 1 (history space connectivity):** Marked "proved in full, see proof attempt §2." The proof in the proof-attempt document (§2) is indeed complete and rigorous: work with Hasse diagrams, remove then add covering relations in order, count finitely many steps. ✅

**Step 2 (loop tracking along history changes):** Given loops $\gamma_1$ in $\mathcal{C}_{\alpha_1}$ and $\gamma_2$ in $\mathcal{C}_{\alpha_2}$, follow the path in $\mathcal{B}$. At each step the loop either (a) passes through a non-critical event, or (b) passes through a critical event. Case (a) is handled by Proposition 4.5. ✅

**Step 3 (critical events reroute by causal simple-connectedness):** *"causal simple-connectedness guarantees every bounded causal region contains events — so in the adjacent history $\mathcal{C}_\beta$, an alternative routing through the region exists."*

This is **the gap.** The proof-attempt document (§6, Step 3 of proof sketch) explicitly calls this out: "Step 3 of the proof sketch uses causal simple-connectedness in a non-trivial way and would require formalization — specifically, the claim that global causal simple-connectedness implies local loop-critical events always have global reroutes. This is intuitively clear but needs a precise lemma." The main paper does not acknowledge this unfinished step; it presents Step 3 as established. The gap is: showing that CSS implies not merely that the interior of a bounded region is non-empty, but that there exists a *valid causal path* within that region that maintains loop closure. Non-emptiness does not automatically guarantee a causally ordered path from the required entry point to the required exit point.

**Step 4 (conclusion):** Conditional on Step 3. If Step 3 holds, the argument closes correctly: the deformation tracks the history path, arriving in $\mathcal{C}_{\alpha_2}$, then further deformation within the simply-connected history reaches $\gamma_2$.

**Assessment of Step 3 gap severity:** The gap is real but the intuition is correct and the argument is nearly there. What is needed is a lemma of the form: "In a CSS cause-plex, for any loop-critical event $e_k \in \gamma$ and any adjacent history $\mathcal{C}_\beta$ where the relation supporting $e_k$'s role is removed, there exists an alternative causal path in $\mathcal{C}_\beta$ from $e_{k-1}$ to $e_{k+1}$ that preserves loop closure." This is a local-to-global argument in a locally finite poset and should be 1–2 pages to prove properly.

### Step 3: Proposition 4.6 (Connectivity of w-image) and Corollary 4.7

**Status: ✅ Proved (conditional on Theorem 4.4).**

- Premise: CC (continuity of $w$) + Theorem 4.4 (connected loop space).
- Conclusion: continuous image of a connected set is connected.
- This is standard topology, correctly applied.
- Corollary 4.7 (generates a connected subgroup) follows from the image being connected and $w$ being a group homomorphism. Valid.

### Step 4: Theorem 5.2 (Main theorem — U(1) is forced)

**Status: ✅ Mostly sound — one citation issue, one overclaim.**

The proof chain in Theorem 5.2:

1. Proposition 3.1 → $w(\gamma) \in G_1$. ✅
2. Lemma 4.3 → CSS. ✅ (proved, with CI caveat above)
3. Theorem 4.4 → loop space connected. ⚠️ (Step 3 gap propagates here)
4. Prop 4.6 + Cor 4.7 → connected subgroup of $G_1$. ✅ (conditional on 3)
5. Hurwitz → $G \in \{\mathbb{R}, \mathbb{C}, \mathbb{H}, \mathbb{O}\}$. ✅ (classical result)
6. $\mathbb{O}$ eliminated ($S^7$ not a group). ✅
7. $\mathbb{R}$ eliminated ($S^0$ disconnected). ✅
8. $\mathbb{H}$ eliminated (Result 5.1, Aaronson). ⚠️ (see below)
9. $G = \mathbb{C}$, $G_1 = \mathrm{U}(1)$. ✅ given 1–8.

**Issue with step 8 (Aaronson elimination):** The proof text says "Result 5.1 (Aaronson), violated by locality of cause-plex." But Result 5.1 is correctly labeled as "informal" — "Aaronson's paper is explicitly informal and exploratory; it does not constitute a formal proof of uniqueness." The status table in §8.1 marks "Quaternions eliminated by locality" as ✅ "Argued via Aaronson (2004)." This is fine in the text but the ✅ symbol in the table suggests the same level of rigor as the provably-correct steps. The table should use ⚠️ for this entry to distinguish it from formally proved steps.

**Issue with step 3 reference:** In the proof of Theorem 5.2, the text lists "Theorem 4.4: causal simple-connectedness → $\Omega(\mathcal{C}^*, e_*)$ is connected." This is correct in what it cites. No numbering error here.

**Corollary 4.4 reference error:** The text in Section 5.1 contains "Connected (from Corollary 4.4)" but the relevant result is **Corollary 4.7**, not Corollary 4.4. (Corollary 4.4 does not exist; the numbering skips from Theorem 4.4 to Proposition 4.5 to Proposition 4.6 to Corollary 4.7.) This is a **numbering error** in the paragraph introducing the classification table in Section 5.1. Fixed below.

---

## B. P2 Fix (Spacetime Paper)

### Is CD clearly stated and distinct from other axioms?

**Status: ✅ Yes.**

The Causal Dependency Axiom (CD) is stated immediately after Definition 1.4 (state domain) and before the three Properties (P1, P2, P3). It reads: "If event $e_2$ reads a state written by event $e_1$ — i.e., $D_{\mathrm{out}}(e_1) \cap D_{\mathrm{in}}(e_2) \neq \emptyset$ — then $e_1 \prec e_2$."

CD is distinct from:
- The poset axioms (irreflexivity, transitivity, local finiteness) which are purely structural
- Locality (L) which bounds the size of state domains
- P3 (finite minimum event latency) which concerns timing

The *Remark on CD* explicitly distinguishes it from the poset axioms: "This axiom links the abstract partial order relation ≺ (defined structurally) to the physical notion of state propagation. Without it, ≺ is a purely formal ordering with no guaranteed connection to actual state domain dependencies." This is exactly the clarification the AUDIT demanded (Attack 4 in §6.2 of AUDIT.md).

### Does P2 follow cleanly from P1 + L + CD?

**Status: ✅ Yes — the proof is now clean.**

The proof:
1. $e_1 \perp e_2$ means neither $e_1 \prec e_2$ nor $e_2 \prec e_1$ (by Definition 1.3).
2. Suppose $s \in D_{\mathrm{out}}(e_1) \cap D_{\mathrm{in}}(e_2)$; then by CD, $e_1 \prec e_2$ — contradiction.
3. Symmetric argument for the reverse.
4. Therefore $D(e_1) \cap D(e_2) = \emptyset$ — disjoint domains commute.

The hidden assumption identified in the AUDIT (Attack 4) — "state domain overlap → causal precedence" — is now made explicit as CD. The proof no longer has a gap.

### Does adding CD create new problems elsewhere?

**Potential concern:** CD states $D_{\mathrm{out}}(e_1) \cap D_{\mathrm{in}}(e_2) \neq \emptyset \Rightarrow e_1 \prec e_2$. This is a *sufficient* condition for causal precedence from state propagation, not a biconditional. Events can be causally ordered ($e_1 \prec e_2$) without $e_2$ reading $e_1$'s output (e.g., via a chain $e_1 \prec e_m \prec e_2$ with $e_2$ reading $e_m$'s output). This is fine — CD does not over-constrain.

**No circularity with P1:** P1 establishes the partial order axioms structurally. CD then connects that structure to physics. The logical order is correct.

**Interaction with Lemma 4.3 in the loop paper:** Remark 4.3b in the loop paper cites locality assumption (L) as the basis for "causal influence propagates only through chains of events." With CD now explicit, this remark should ideally also cite CD. This is a minor cross-document consistency issue (see Section C below).

---

## C. Internal Consistency

### Cross-paper citation accuracy

**Loop paper → Spacetime paper:**
- The loop paper (§4.3 Remark 4.3b) cites "the locality assumption (L) from the spacetime companion paper." L is correctly defined in the spacetime paper. ✅
- The loop paper (§5.2) cites "Assumption L (locality)" as one of the premises of Theorem 5.2. L is the correct reference. ✅
- Remark 4.3b does not cite CD, even though the argument that "causal influence propagates only through event chains" is now explicitly grounded by CD in the spacetime paper. This is a **minor gap**: the remark should be updated to read "a consequence of locality (L) and the Causal Dependency Axiom (CD)." Not fatal, but imprecise.

**Quantum paper → Loop paper:**
- The quantum paper (§7.1) refers to the loop paper as "the companion paper [Complex Amplitudes from Loop-Phase Consistency]" and states "Theorem 5.2 there is proved subject to one remaining formal lemma: that observer-class cause-plexes ($\rho_{\mathrm{ac}} > 0$) are causally simply-connected." ✅ This accurately reflects the state of the loop paper.
- However, the quantum paper does **not** reflect the remaining Step 3 gap in Theorem 4.4. It states Theorem 5.2 is "proved subject to one remaining formal lemma" (Lemma 4.3) — but Lemma 4.3 is now proved; the remaining gap is in Theorem 4.4 Step 3. The quantum paper's description of what remains is one version behind.

**Loop paper → Quantum paper:**
- Loop paper §1.2 cites "Cause-Plex and Quantum Mechanics" for "Postulate Q'." Postulate Q' is correctly defined in the quantum paper §2. ✅
- Loop paper §6 refers to "Def. 3.1, [Cause-Plex and Quantum Mechanics]" for the cause-plex action. Definition 3.1 exists in the quantum paper and is correctly referenced. ✅

**Proof-attempt document → Main loop paper:**
- The proof-attempt document was written *before* Lemma 4.3 was formally proved and before the gap in Theorem 4.4 Step 3 was named. Its Section 9 "remaining open steps" table shows "Observer-existence → CSS" as "✅ Argued (physical)." This is now **stale**: the main paper has a formal proof of this. The proof-attempt's Section 8 "Revised Theorem 5.2" recommendation has been implemented in the main paper, which is good.
- The proof-attempt document's Section 6, Step 3 of proof sketch contains the gap ("would require formalization — specifically, the claim that global causal simple-connectedness implies local loop-critical events always have global reroutes") which the main paper does not reflect. The main paper presents Theorem 4.4 as fully proved; the proof-attempt correctly identifies an unfinished step. These are **inconsistent**.

### Status table accuracy (§8.1 of loop paper)

| Claim | Table says | Accurate? |
|---|---|---|
| Stable loop amplitudes have unit magnitude | ✅ Proved | ✅ Yes |
| Causal continuity implies topological group structure | ✅ Proved given CC | ✅ Yes |
| History space connected | ✅ Proved | ✅ Yes |
| Causal voids create isolated loops | ✅ Established | ✅ Yes |
| Observer-class cause-plexes are CSS | ✅ Proved (Lemma 4.3) | ✅ Yes (with CI caveat) |
| Loop space connected for CSS cause-plexes | ✅ Proved (Theorem 4.4) | ⚠️ **Overclaims** — Step 3 not formally proved |
| Connected compact group over normed division algebra | ✅ Follows via Hurwitz | ✅ Yes |
| Quaternions eliminated by locality | ✅ Argued via Aaronson | ⚠️ **Should be** ⚠️ **not** ✅ (Aaronson informal) |
| G = U(1) uniquely | ✅ Proved given Lemma 4.3 | ⚠️ **Should cite Theorem 4.4 gap** |
| φ = S/ℏ in continuum limit | ⚠️ Conjecture 6.2 | ✅ Correct |
| Full result w(γ) = e^{iS/ℏ} | ✅ Given Conjecture 6.2 | ⚠️ Should also note Theorem 4.4 gap |

### Claims of "proved" vs. "argued"

The abstract states: "**Status of main theorem:** All three parts proved. Theorem 5.2 is complete." Given the Theorem 4.4 Step 3 gap, this overclaims. The abstract should say: "All three parts proved subject to one formal lemma in Theorem 4.4 (Step 3: CSS implies global rerouting for critical events; Open Problem 7.3)."

The Section 7 header says "~~Open Problem 7.1~~ — Resolved." This is correct for the Lemma 4.3 formalization. However, the numbering now has Open Problem 7.2 and 7.3 in the document. The strike-through of 7.1 is fine. But the introduction of Open Problem 7.3 (single-event deformation formalization) is new and not yet reflected in the Theorem 4.4 proof text, which still presents Step 3 without caveat.

---

## D. Open Problems

### Conjecture 6.2 (Phase = action in continuum limit)

**Status label:** ⚠️ Conjecture — **accurate**.

**Gap statement:** "identifying $\phi(\gamma) = S[\gamma]/\hbar$ requires showing that the cause-plex action (Def. 3.1, quantum paper) is the correct Lagrangian in the continuum limit." This is correctly stated.

**Closure path:** "requires formalizing the continuum limit of $\phi$" — accurate but vague. A more precise statement would be: "requires (a) showing the discrete phase function $\phi$ is additive over path segments (shown — follows from Definition 2.8); (b) showing the cause-plex path measure in the continuum limit assigns weight $e^{iS/\hbar}$ to each history (this requires the continuum limit of the cause-plex to be the path integral measure, which connects to the number-volume conjecture)."

**AUDIT.md concern (Priority 1a energy/action circularity):** The cause-plex action Def. 3.1 uses $\Delta E(e_k)$, which requires energy to be already defined. This circularity is flagged in the AUDIT and is still unresolved. Conjecture 6.2's closure path passes through this circularity. The open problem statement should acknowledge this explicitly.

### Open Problem 7.2 (Secondary: prove Conjecture 6.2)

**Status label:** "Conditional on the continuum limit of the cause-plex being well-defined." — **accurate**.

The remark "requires care with the energy-action circularity noted in AUDIT.md" is present. ✅ Good: the energy-action circularity is explicitly flagged here.

### Open Problem 7.3 (Structural: define single-event deformation precisely)

**Status label:** "Mathematical groundwork needed." — **partially accurate but understates the relevance**.

This open problem is stated as if it is purely a definitional refinement (getting the A-homotopy framework right for causal posets). But as established above, Step 3 of Theorem 4.4 depends on this. The open problem statement should make explicit: "This formalization is required to complete Step 3 of Theorem 4.4 (the critical-events-reroute step). Until it is complete, Theorem 4.4 is a proof sketch, not a full proof."

**Closure path:** "Likely requires a short companion paper on A-homotopy for causal posets." — plausible, but the gap in Step 3 is conceptually simpler than a full A-homotopy development. The specific lemma needed is: "In a CSS locally finite poset, for any covering relation $r$ whose removal would break a loop, the interior of the bounded causal region contains a valid alternative causal path maintaining loop closure." This is a self-contained lemma that could be proved in 2–3 pages without a full A-homotopy framework.

---

## E. Action Items

### Priority 1 — Must fix before submission

**E1. Fix Section 5.1 numbering error** (`causeplex_loop_phase.md`, Section 5.1, classification table preamble)
- Text reads "Connected (from Corollary 4.4)" — should be "Corollary 4.7"
- File: `causeplex_loop_phase.md`, Section 5.1
- Type: Wrong theorem number. **Direct fix.**

**E2. Acknowledge Theorem 4.4 Step 3 gap in the abstract and status table** (`causeplex_loop_phase.md`)
- Abstract claims "All three parts proved. Theorem 5.2 is complete." — should read "All three parts proved subject to one formal lemma (Theorem 4.4 Step 3; Open Problem 7.3)."
- Status table §8.1: "Loop space connected for CSS cause-plexes" should be ⚠️ not ✅.
- File: `causeplex_loop_phase.md`, Abstract + §8.1

**E3. Update Open Problem 7.3 to name it as a prerequisite for Theorem 4.4** (`causeplex_loop_phase.md`, §7.3)
- Add: "This formalization is required to complete Step 3 of the proof of Theorem 4.4. Until it is proved, Theorem 4.4 stands as a proof sketch, not a complete proof."
- File: `causeplex_loop_phase.md`, Section 7.3

**E4. Update Section 9 conclusion to correct the stale claim** (`causeplex_loop_phase.md`, §9)
- Already fixed in this review (the old text listed Lemma 4.3 as "argued; one formal step remains"; corrected to reflect the actual remaining gap in Theorem 4.4).

**E5. Fix the status table entry for "Quaternions eliminated by locality"** (`causeplex_loop_phase.md`, §8.1)
- Change ✅ to ⚠️ with note "(Aaronson 2004 is explicitly informal; argument is well-reasoned but not a formal proof)"
- File: `causeplex_loop_phase.md`, §8.1

**E6. Remove CI condition from Lemma 4.3 statement or use it in the proof** (`causeplex_loop_phase.md`, §4.3)
- The Lemma statement includes $\mathrm{CI} > \mathrm{CI}_{\min}$ but the proof uses only $\rho_{\mathrm{ac}} > 0$. Either drop CI from the hypothesis or add a brief note connecting CI to the density argument.
- File: `causeplex_loop_phase.md`, Lemma 4.3 statement

### Priority 2 — Important before wider sharing

**E7. Update Remark 4.3b to cite CD** (`causeplex_loop_phase.md`, Remark 4.3b)
- Currently cites only locality (L). Should read "a consequence of locality (L) and the Causal Dependency Axiom (CD) from the spacetime companion paper: causal influence propagates only through event chains."
- File: `causeplex_loop_phase.md`, Remark 4.3b

**E8. Update the quantum paper's description of remaining gaps** (`causeplex_quantum.md`, §7.1)
- Currently states Theorem 5.2 is "proved subject to one remaining formal lemma: that observer-class cause-plexes are causally simply-connected." Since Lemma 4.3 is now proved, this should be updated to: "proved subject to one remaining formal step in Theorem 4.4 (Step 3: CSS implies global rerouting for critical events; Open Problem 7.3 in the loop-phase paper)."
- File: `causeplex_quantum.md`, §7.1

**E9. Update proof-attempt document's status table** (`causeplex_loop_phase_proof_attempt.md`, §9)
- "Observer-existence → CSS" is listed as "✅ Argued (physical)" — should be "✅ Proved (three-step density argument in main paper §4.3)"
- "Restricted theorem (CSS case)" should be "✅ Proved (sketch); Step 3 of proof needs formal lemma (Open Problem 7.3 in main paper)"
- File: `causeplex_loop_phase_proof_attempt.md`, §9

**E10. Add self-contained restatement of $\rho_{\mathrm{ac}}$ definition** (`causeplex_loop_phase.md`)
- Remark 4.3b says "by definition $\rho_{\mathrm{ac}}$ measures the density of self-sustaining causal loops, see Part 1.5." For mathematical self-containment (claimed in the prerequisites), add a one-sentence definition: "$\rho_{\mathrm{ac}}$ is the number density of recurring causal loops whose amplitude satisfies $|w|=1$ and which return to their initial state within finite time; $\rho_{\mathrm{ac}} > 0$ means at least one such loop per unit volume."
- File: `causeplex_loop_phase.md`, Remark 4.3b or Definition 2.x

**E11. Add precise gap statement to Conjecture 6.2** (`causeplex_loop_phase.md`, §6)
- Acknowledge the energy-action circularity explicitly: "Note: the cause-plex action (Def. 3.1 in [Cause-Plex and Quantum Mechanics]) uses $\Delta E(e_k)$, which presupposes energy defined at Layer C (Noether). Closing Conjecture 6.2 requires either resolving this circularity or reformulating the action in terms of Layer 0 primitives (see AUDIT.md Priority 1a)."
- File: `causeplex_loop_phase.md`, §6

### Priority 3 — For complete rigor

**E12. Write the formal lemma for Theorem 4.4 Step 3**
- The specific lemma: "In a CSS locally finite causal poset, for any covering relation $r$ in the Hasse diagram of history $\mathcal{C}_\alpha$ such that $r$ is loop-critical for loop $\gamma$, the adjacent history $\mathcal{C}_\beta$ (obtained by removing $r$) contains an alternative causal path connecting the endpoints of $r$ that preserves loop closure."
- This requires: defining "preserves loop closure" precisely, and using CSS to guarantee a path through the non-void interior.
- Estimated: 2–3 pages; can be in the proof-attempt companion or in a new appendix.

**E13. Resolve the energy-action circularity in the quantum paper**
- Priority 1a from AUDIT.md remains open. The loop-phase paper is not the place to fix this, but Conjecture 6.2 cannot close without it.
- File: `causeplex_quantum.md`, §3.1 (Definition 3.1) and `causeplex_spacetime.md`, §5

---

## Summary of Direct Fixes Applied in This Review

1. **`causeplex_loop_phase.md` §9** — Corrected stale claim "Lemma 4.3 — argued; one formal step remains" to reflect the actual current state: Lemma 4.3 is proved; the remaining gap is in Theorem 4.4 Step 3 (Open Problem 7.3).

---

*Report produced by EPIPHYSICS-OPEN-SOURCE verification subagent, 2026-03-25.*
*Files reviewed: causeplex_loop_phase.md, causeplex_loop_phase_proof_attempt.md, causeplex_quantum.md, causeplex_spacetime.md, AUDIT.md*
*Direct fixes applied: 1 (stale Section 9 claim). Issues requiring judgment: flagged in E1–E13 above.*
