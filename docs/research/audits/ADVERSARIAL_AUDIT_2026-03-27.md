# Adversarial Audit: Epiphysics Project and Site

**Date:** 2026-03-27  
**Auditor:** EPIPHYSICS-OPEN-SOURCE  
**Scope:** Full project — theory documents, site structure, research papers, glossary, navigation  
**Prior audit reference:** `AUDIT.md` (2026-03-25)

---

## Executive Summary

The epiphysics project has made significant progress since the March 25 audit. The new amplitude-phase fixed-point paper provides a cleaner route to $\mathrm{U}(1)$ than the loop-phase paper's Routes A/B. However, several structural and presentation issues remain, and new issues have emerged with the fixed-point paper itself.

**Top 3 issues requiring immediate attention:**

1. **The new fixed-point paper lacks integration with the series** — it uses different notation, doesn't reference the cause-plex definitions, and sits orphaned in the theory directory without series navigation.

2. **Glossary has duplicate entries** — "Causal Event" is defined twice, verbatim, creating confusion and signaling incomplete editing.

3. **The energy/action circularity remains unresolved** — the March 25 audit's Priority 1a is not addressed; `causeplex_loop_phase.md` still uses $\Delta E$ in the action definition.

---

## 1. New Fixed-Point Paper Assessment

### 1.1 Strengths

The `amplitude-phase-fixed-point-paper.md` file:

- Provides a clean, self-contained argument with explicit assumptions A1–A4
- Correctly separates product vs. non-product regimes (Proposition 7.1)
- Uses proper theorem-proof structure with MathJax notation
- Explicitly states scope limitations (Section 9)
- Has appropriate frontmatter for the site

### 1.2 Weaknesses

| Issue | Severity | Location | Fix |
|-------|----------|----------|-----|
| No `series_order` in frontmatter | Medium | Header | Add `series_order: 1.6` or similar |
| Doesn't reference cause-plex definitions | High | Throughout | Link to Definitions 2.1–2.10 in `causeplex_loop_phase.md` or define fresh |
| $\Gamma_X$ notation differs from $\Omega(\mathcal{C}^*, e_*)$ in loop-phase paper | Medium | §2.1 | Crosswalk or unify |
| A4 (Lie regularity) is stronger than needed for the core result | Low | §2.3 | Note that compact connected suffices; Lie adds smoothness not required for uniqueness |
| No status labels (✅/⚠️/❌) unlike `causeplex_loop_phase.md` | Medium | Throughout | Add for consistency |
| References section is placeholder | Medium | End | Populate or remove |
| `draft: false` but paper is not yet integrated | High | Header | Set `draft: true` until integrated |

### 1.3 Mathematical gaps in the fixed-point paper

**Gap 1: The $G \otimes G$ operation is underspecified.**

Lemma 5.1 uses $\dim(G \otimes G) = 2 \dim G$. This is true for direct product of Lie groups, but the paper uses $\otimes$ notation which conventionally denotes tensor product. For groups, $G \otimes G$ typically means the tensor product of their underlying abelian groups (if abelian) or is undefined (if nonabelian). The dimension-doubling argument works for $G \times G$ (direct product), not necessarily $G \otimes G$ in all interpretations.

**Fix:** Clarify that "$\otimes$" here means "independent composition induces direct-product structure at the group level" or switch to $G \times G$ notation throughout.

**Gap 2: Theorem 6.1 proof for abelian case is incomplete.**

The proof says: "Fixed-point compatibility requires invariance of admissible group structure under composition. Within compact connected abelian Lie groups compatible with normalized phase closure, this selects the one-dimensional case $n=1$."

This is asserted, not proved. The claim is that $\mathrm{U}(1)^n \times \mathrm{U}(1)^n \cong \mathrm{U}(1)^n$ only for $n=1$. But $\mathrm{U}(1)^n \times \mathrm{U}(1)^n \cong \mathrm{U}(1)^{2n}$, which is not isomorphic to $\mathrm{U}(1)^n$ unless $n=0$. So the argument excludes all $n \geq 1$ by rank-doubling — which is correct but then the theorem conclusion should be that only the trivial group satisfies the fixed-point condition, unless the composition law is different from direct product.

**The resolution:** The composition law induced by product-state amplitude composition is not direct product of groups but pointwise multiplication of phase factors. For $\mathrm{U}(1)$, this is indeed $e^{i\theta} \cdot e^{i\phi} = e^{i(\theta+\phi)}$, which stays in $\mathrm{U}(1)$ — so the fixed-point condition is satisfied at the element level, not the group level. The paper conflates two different meanings of "$\otimes$": (a) the group operation applied to independent systems, which preserves $\mathrm{U}(1)$; (b) the product of groups as algebraic objects, which doubles dimension.

**Fix:** The paper should distinguish between "amplitude composition" (pointwise product of phases, which preserves $\mathrm{U}(1)$) and "group product" (which doubles dimension). The argument as stated is confused. A cleaner statement: "The amplitude group must be closed under independent composition of systems. $\mathrm{U}(1)$ is closed under this operation; higher tori and nonabelian groups are not, by the dimension/rank argument applied to representative states, not to the group structure itself."

**Gap 3: Corollary 6.2 is stronger than Theorem 6.1 supports.**

Corollary 6.2 says $\mathfrak{P}(X) \subseteq \mathrm{U}(1)$ for every admissible system. But Theorem 6.1 only establishes that the global phase group $G$ is $\mathrm{U}(1)$; it doesn't immediately follow that every subsystem's phase sector is a subset of this. (It likely is, but the corollary should derive from the theorem, not just be stated after it.)

---

## 2. Integration and Navigation Issues

### 2.1 Series structure

The theory section has a clear series order in `.pages`:

```yaml
- index.md
- 00_prelude.md
- 01_generalized_mechanics.md
- 01_5_causors.md
- ...
```

**Problem:** `amplitude-phase-fixed-point-paper.md` is not in `.pages` and has no `series_order`. It will appear in the site but not in the series navigation.

**Problem:** The file `causeplex_loop_phase.md` has been demoted to a "working paper" (per the added header note) but is still `draft: false` and in the series. The relationship between the two papers is unclear to a reader.

### 2.2 Cross-references

| Paper | References fixed-point paper? | References loop-phase paper? |
|-------|------------------------------|------------------------------|
| `amplitude-phase-fixed-point-paper.md` | — | No |
| `causeplex_loop_phase.md` | Yes (header note) | — |
| `01_5_causors.md` | No | Yes (mentions loop phase) |
| `index.md` | No | Yes |

**The new paper is orphaned.** It's referenced from `causeplex_loop_phase.md` but not from the main index or any other theory document.

### 2.3 Glossary issues

**Duplicate entry:** "Causal Event" appears twice in `glossary.md`, verbatim. This is clearly an editing error.

**Missing entries from fixed-point paper:**
- $\mathfrak{P}(X)$ (normalized phase sector)
- $\boxtimes$ (pointwise product)
- Compositional fixed-point condition

---

## 3. Prior Audit Issues — Status Check

Checking the Priority 1 items from the March 25 audit:

| Issue | March 25 Status | Current Status | Notes |
|-------|-----------------|----------------|-------|
| 1a. Energy/action circularity | Critical | **Unresolved** | `causeplex_loop_phase.md` still defines $S[\gamma] = \sum \Delta E \cdot \tau$ |
| 1b. P3 derivation | Critical | **Unresolved** | Still marked as derived but uses continuum limit |
| 1c. Imaginary unit derivation | Critical | **Partially addressed** | New Route C avoids this; old Routes A/B still claim it |

The fixed-point paper (Route C) sidesteps 1a and 1c by not using the cause-plex action or Wick rotation. But the loop-phase paper still contains these issues and is still `draft: false`.

---

## 4. Site and Presentation Issues

### 4.1 README.md accuracy

The README says:

> **Theorem:** Among real-analytic, time-reversible kinetic energies, the quadratic form minimizes total predictive cost (description length + integration cost).

This theorem is not proved in any document I can find in the repo. It may be in a draft or planned paper, but the README claims it as a key result.

> **Status:** Theory: developed. Applications: 5 written, 11 planned. Experiments: protocol designed, not yet run.

I count 2 application documents (`efficiency_limits.md`, `decision_and_trajectory.md`), not 5.

### 4.2 Frontmatter inconsistencies

| Document | `draft` | `series_order` | `coverImage` | Consistent? |
|----------|---------|----------------|--------------|-------------|
| `index.md` | false | 0 | yes | ✅ |
| `01_generalized_mechanics.md` | false | 1 | yes | ✅ |
| `01_5_causors.md` | false | 1.5 | yes | ✅ |
| `causeplex_loop_phase.md` | true | — | yes | ⚠️ No series_order |
| `amplitude-phase-fixed-point-paper.md` | false | — | — | ❌ No series_order, no coverImage |

### 4.3 Image references

`amplitude-phase-fixed-point-paper.md` has no cover image, which will break the site's card display if the site expects one.

---

## 5. Terminology Consistency

### 5.1 "Causors" vs. "Causants" vs. "Causal events"

The original title of Part 1.5 was "Causors." But the glossary defines "Causor" as a "higher-level causal mechanism" while the primitive is the "causal event" (state couplet). This is now consistent — the paper was renamed from "Causants" to "Causors" and then the primitive was clarified as "causal event."

However, there are still references to the old terminology:
- The image path is `epimechanics_00_atomic_structure-1-1.png` — the "atomic structure" framing predates the causor terminology
- The commit history shows `terminology: unify 'causal event' definition; add 'state couplet' as canonical alias` — good, but I should verify this is applied everywhere

### 5.2 Notation crosswalk needed

| Concept | Loop-phase paper | Fixed-point paper | Glossary |
|---------|-----------------|-------------------|----------|
| History space | $\Omega(\mathcal{C}^*, e_*)$ | $\Gamma_X$ | Not defined |
| Amplitude map | $w: \Omega \to G$ | $\mathcal{A}_X: \Gamma_X \to \mathcal{V}$ | Not defined |
| Phase group | $G$ | $G$ | ✅ |
| Product composition | Not defined | $\boxtimes$ | Not defined |

This notation divergence will confuse readers who try to connect the papers.

---

## 6. Recommendations

### Immediate (before any sharing)

1. **Set `amplitude-phase-fixed-point-paper.md` to `draft: true`** until the mathematical gaps (§1.3) are addressed and the paper is integrated into the series.

2. **Fix the glossary duplicate** — remove the second "Causal Event" entry.

3. **Clarify the $\otimes$ vs. $\times$ ambiguity** in the fixed-point paper. The argument is sound but the notation is confusing.

### Short-term (this week)

4. **Add a notation crosswalk** — either in the fixed-point paper or as a standalone appendix linking its notation to the loop-phase paper's definitions.

5. **Update the README** — the theorem claim needs a citation or removal; the application count needs correction.

6. **Add status labels** to the fixed-point paper to match the loop-phase paper's ✅/⚠️/❌ convention.

7. **Add `series_order`** to both amplitude papers and update `.pages`.

### Medium-term (before publication)

8. **Resolve the energy/action circularity** in `causeplex_loop_phase.md` — either by defining a Layer 0 action without energy, or by honestly relabeling the Noether application as a Layer C construction.

9. **Decide the relationship between the two amplitude papers** — is the loop-phase paper superseded? Is it a working paper only? The current state (one says "see the other for the clean derivation" but both are non-draft) is confusing.

10. **Populate the references** in the fixed-point paper with the standard compact Lie group classification references.

---

## 7. What's Working Well

- **The fixed-point argument is genuinely novel** — Route C is cleaner than Routes A/B and doesn't require the loop-space connectivity machinery.
- **The layer architecture is well-maintained** in the causors document.
- **The audit culture is healthy** — the March 25 audit exists, this audit exists, and the responses are tracked.
- **Commit discipline is good** — commits are atomic and well-labeled.
- **The glossary exists** — even with the duplicate, having canonical definitions is valuable.

---

## 8. Adversarial Challenges Specific to the Fixed-Point Paper

### Challenge 1: "This is just the standard argument that U(1) is the only compact connected abelian Lie group of dimension 1."

**Response:** Partially true. The paper's contribution is framing this as a compositional fixed-point condition, not as a group classification fact. The reader benefit is conceptual: $\mathrm{U}(1)$ emerges from recursively applying composition, not from postulating complex amplitudes.

**Required strengthening:** The paper should explicitly state what it adds beyond the classification theorem. Currently it reads as a long route to a known result.

### Challenge 2: "A4 (compact connected Lie) is doing all the work. Without it, you can't exclude discrete groups, noncompact groups, or disconnected groups."

**Response:** True. A4 is a strong assumption. The paper should either (a) motivate A4 from physical considerations (amplitude phases vary continuously, hence connected; amplitudes are normalizable, hence compact) or (b) weaken A4 and show what additional groups become admissible.

### Challenge 3: "The product-state factorization (Proposition 3.1) is just the definition of tensor product states. You're deriving U(1) from the assumption that independent systems compose via tensor product — but that's already quantum mechanics."

**Response:** This is the strongest challenge. If A1 (product-state independence) is read as "independent systems compose via tensor product," then the derivation is circular: tensor product composition already presupposes complex Hilbert space, which gives $\mathrm{U}(1)$.

**Required defense:** A1 must be stated at a level that doesn't presuppose Hilbert space. The paper should frame A1 as: "For systems with no causal connection, the joint amplitude assignment factors through the individual assignments." This is weaker than tensor product composition and can be stated without Hilbert space. The paper then shows that this weaker condition, plus recursion, forces $\mathrm{U}(1)$.

---

## Summary Table

| Category | Status | Priority |
|----------|--------|----------|
| Fixed-point paper mathematical soundness | ⚠️ Gaps identified | High |
| Fixed-point paper integration | ❌ Not integrated | High |
| Glossary consistency | ⚠️ Duplicate entry | Medium |
| Prior audit issues (1a, 1b, 1c) | ❌ Unresolved | High |
| README accuracy | ⚠️ Claims unverified | Medium |
| Notation consistency across papers | ⚠️ Divergent | Medium |
| Series navigation | ⚠️ Incomplete | Medium |

---

*Audit complete. For response tracking, update `AUDIT_RESPONSE.md` or create `ADVERSARIAL_AUDIT_RESPONSE_2026-03-27.md`.*
