# Response to WP-A: CR from (L) + Spacelike Separation
# Draft for Adversarial Review

**Date:** 2026-03-26  
**Status:** Response to prior review's WP-A objection  
**Prior verdict:** UNSOUND — CR not shown to follow from self-description  
**This document:** WP-A is answered by a structural argument from (L) alone. CR is not an independent axiom in the cause-plex — it is a theorem.

---

## The WP-A Objection (from prior review)

The reviewer argued:

> "Construct a universe where observers use joint measurements directly for composite systems, never needing to decompose into components. Such a universe is still self-describing. Therefore CR does not follow from self-description."

This objection is valid in general. It does not apply to cause-plexes.

---

## The Response: Joint Measurement Is Structurally Impossible Under (L)

**Locality Assumption (L)** (spacetime paper, Definition 1.4):

For each event $e \in E$:
1. $|D(e)| < \infty$ — finite state domain
2. $D_\text{out}(e)$ is disjoint from $D_\text{in}(e')$ for all $e'$ not immediately preceding $e$

**Definition (non-interacting subsystems):** Subsystems $A$ and $B$ are non-interacting in the cause-plex sense if and only if they are **spacelike separated**: $A \perp B$, meaning no causal path connects any event in $A$'s state domain to any event in $B$'s state domain.

$$A \perp B \iff \nexists \text{ causal path from } D(A) \text{ to } D(B)$$

**Lemma (no joint measurement of spacelike-separated systems).**  
*In any cause-plex satisfying (L), no single event $e$ can jointly measure spacelike-separated subsystems $A$ and $B$.*

*Proof.* Suppose for contradiction that event $e$ jointly measures $A$ and $B$. Then:
- $e$ reads from $D_\text{in}(e)$ which must contain state information about both $A$ and $B$
- Therefore $D_\text{in}(e) \cap D(A) \neq \emptyset$ and $D_\text{in}(e) \cap D(B) \neq \emptyset$

For $e$ to have read $A$'s state, there must be a causal path from $A$'s events to $e$. For $e$ to have read $B$'s state, there must be a causal path from $B$'s events to $e$. Therefore $e$ has causal contact with both $A$ and $B$.

But then $A$ and $B$ share a common causal descendant $e$ — meaning $D(A)$ and $D(B)$ are connected through $e$'s causal past. This contradicts $A \perp B$ (spacelike separation): by definition, if $A \perp B$ then no event has causal contact with both.

More precisely: "no causal path from $D(A)$ to $D(B)$" means there is no event $e$ that is a causal descendant of both. A joint measurement event $e$ would be exactly such a common descendant. Contradiction. $\square$

**Corollary.** In any cause-plex satisfying (L), the only way to characterize non-interacting composite system $(A, B)$ is through separate measurements of $A$ and separate measurements of $B$ — sequential, not joint.

---

## CR Follows as a Theorem

**Theorem CR.** *In a cause-plex satisfying (L), any amplitude assignment consistent with the event structure satisfies Condition CR: composite systems $(A \perp B)$ are characterizable only from separate component characterizations.*

*Proof.* By the Lemma, no joint measurement of $(A, B)$ exists when $A \perp B$. Therefore the only observational access to the joint state is through separate measurements of $A$ and $B$. A complete characterization of $(A, B)$ must be constructible from the results of separate $A$-measurements and separate $B$-measurements. This is exactly Condition CR. $\square$

**Therefore:** The reviewer's counterexample — a self-describing universe with direct joint measurements — is structurally impossible in any cause-plex satisfying (L). CR is not an independent axiom. It is a consequence of event locality.

---

## Updated Chain: CR from (L), No New Postulates

The full derivation now reads:

| Step | Claim | Source | Status |
|---|---|---|---|
| (L) | Events act on local bounded domains | Definition | ✅ |
| $A \perp B$ | Spacelike-separated = non-interacting | Definition | ✅ |
| No joint measurement | Lemma above | From (L) + $A \perp B$ | ✅ |
| CR | Composite characterization = component-wise | From Lemma | ✅ |
| SU(2) eliminated | $f_{\mathbb{H}}(n_A n_B) \neq f_{\mathbb{H}}(n_A) \cdot f_{\mathbb{H}}(n_B)$ | Algebra | ✅ (pending WP-B fix) |
| $G = \mathrm{U}(1)$ | Unique remaining candidate | From above chain | ✅ conditional |

---

## Remaining Open Issues (acknowledged)

### WP-B: Parameter count at cause-plex level vs Layer C

The $f(n) = 2n^2 - n$ count for quaternionic density matrices is a Layer C construct. The SU(2) elimination currently requires this count. The question: can "number of parameters to characterize a system" be stated at the cause-plex primitive level, independently of density matrices?

**Proposed primitive-level statement:**

A system $A$ with state domain $D(A)$ is characterized by a function $\rho_A: \mathcal{O}_A \to \mathbb{R}$ mapping observables to real measurement outcomes. The number of parameters needed to specify $\rho_A$ completely is $\dim(\mathcal{O}_A)$ — the dimension of the observable space.

For composite system $(A, B)$: $\rho_{AB}: \mathcal{O}_A \times \mathcal{O}_B \to \mathbb{R}$ must be fully determined by $\rho_A$ and $\rho_B$ separately (from CR). This forces:

$$\dim(\mathcal{O}_{AB}) = \dim(\mathcal{O}_A) \cdot \dim(\mathcal{O}_B)$$

This is the tensor product condition at the observable level, not the density matrix level. It is statable at the cause-plex primitive level: observables are real-valued measurement outcomes at Layer C (Noether: conserved quantities are real), and the dimension count is a combinatorial property of the observable algebra.

Under this formulation, the SU(2) failure becomes: in quaternionic QM, $\dim(\mathcal{O}_{AB}) < \dim(\mathcal{O}_A) \cdot \dim(\mathcal{O}_B)$ — the observable space of the composite is smaller than the product of component observable spaces. This means some degrees of freedom of $(A, B)$ are unobservable even in principle from separate measurements of $A$ and $B$.

This is Layer-C-grounded but not circular: we're not assuming QM and then checking it. We're asking what observable algebra is forced by (L) + spacelike separation + real observables (Noether).

**Status:** Plausible but needs formalization. The key claim — "$\dim(\mathcal{O}_{AB}) < \dim(\mathcal{O}_A) \cdot \dim(\mathcal{O}_B)$ for quaternionic case" — needs to be derived from the observable algebra structure, not imported from density matrix counting.

### WP-C: Formal relation to local tomography

Local tomography (LT) states: any state of a composite system is uniquely determined by the statistics of local measurements on the components.

CR states: any state of a spacelike-separated composite is characterizable from separate component measurements.

**Claim:** CR $\Leftrightarrow$ LT in the cause-plex context, where "local" in LT corresponds to "spacelike-separated component" in CR. The equivalence follows because in the cause-plex, "local" and "spacelike-separated" are the same concept — locality (L) defines what is spatially separate.

**If this equivalence holds:** CR is not a new principle — it is LT stated in cause-plex language. What is new is the *derivation*: LT was previously an independent physical axiom (Aaronson, Baez); in the cause-plex it follows from (L) + spacelike separation. So the contribution is: LT is not a primitive physical axiom — it follows from event locality.

**Status:** The equivalence claim needs a formal proof. If it holds, the contribution is: "LT is derived from (L), not postulated."

### WP-D: Step 1 assumptions ledger

Getting to $G \in \{\mathrm{U}(1), \mathrm{SU}(2)\}$ requires:

| Assumption | Status |
|---|---|
| Stability $\Rightarrow$ $|w|=1$ (Prop 3.1) | ✅ Proved |
| $n_t = 1$ (one real time dimension) | ✅ Conditional (observer selection) |
| $S[\gamma] \in \mathbb{R}$ (real action) | ✅ Conditional (Layer C) |
| CC (amplitude continuity) | 🔵 Postulate |
| $f: \mathbb{R} \to G$ (1-parameter homomorphism) | ✅ From above |
| Hurwitz classification | ✅ Standard theorem |
| $G$ compact Lie group | 🔵 Regularity assumption |
| $\mathbb{O}$ eliminated | ✅ $S^7$ not Lie group |
| $\mathbb{R}$ eliminated | ✅ $S^0$ disconnected / trivial |

Two postulates remain in Step 1: CC and compact Lie regularity. These are independent of CR and of comparable strength to prior postulates. They should be flagged explicitly.

---

## Revised Main Theorem

**Theorem (U(1) from locality — conditional).**  
*Let $\mathcal{C}^*$ be a multiway cause-plex satisfying (L). Assume: (i) observer-class entities exist ($\rho_{ac} > 0$, $n_t = 1$); (ii) Condition CC (amplitude continuity); (iii) compact Lie regularity of $G$. Then the unique amplitude group is $G = \mathrm{U}(1)$.*

*Proof sketch.*
1. $n_t = 1$ + Noether → $S[\gamma] \in \mathbb{R}$ (Layer C)
2. Prop 3.1 → $|w|=1$, $G$ compact
3. CC + real action → $f: \mathbb{R} \to G$ continuous homomorphism
4. Hurwitz + 1-parameter → $G \in \{\mathrm{U}(1), \mathrm{SU}(2)\}$
5. (L) + spacelike separation → CR (Theorem CR above)
6. CR → $\dim(\mathcal{O}_{AB}) = \dim(\mathcal{O}_A) \cdot \dim(\mathcal{O}_B)$
7. Quaternionic ($\mathrm{SU}(2)$) case fails step 6 → eliminated
8. $G = \mathrm{U}(1)$ uniquely. $\square$

**Explicit condition set:** (L) [definition], Q' [Postulate Q'], observer existence [$\rho_{ac} > 0$], CC [postulate], compact Lie regularity [regularity assumption], Layer C scoping [$n_t = 1$ + time-translation symmetry].

**Not in the condition set:** A\_rich, Postulate R, Aaronson/Baez as independent axioms (LT is derived from (L)), EFD, CC2.

---

## Questions for the Adversarial Reviewer

1. **Does the Lemma hold?** Specifically: is "spacelike separated" ($A \perp B$) the correct cause-plex definition of "non-interacting" for the purposes of CR? Or can non-interacting systems in a relevant physical sense share a common causal ancestor without violating $A \perp B$?

2. **WP-B formalization:** Is the observable-space dimension argument ($\dim(\mathcal{O}_{AB}) = \dim(\mathcal{O}_A) \cdot \dim(\mathcal{O}_B)$) sufficient to replace the density-matrix parameter count, or does it import equivalent assumptions?

3. **WP-C equivalence:** Is CR $\Leftrightarrow$ LT in the cause-plex context? If yes, is "LT follows from (L)" a genuine contribution or a triviality?

4. **Entangled systems:** CR applies to non-interacting ($A \perp B$) systems. But entangled systems are correlated even when spacelike separated. Does the CR-from-(L) argument break for entangled systems — and if so, is that a problem?

5. **Overall:** Does this revised argument constitute a genuine derivation of U(1) from cause-plex primitives plus two named postulates (CC + Lie regularity)? Or does it still conceal assumptions of equivalent strength?
