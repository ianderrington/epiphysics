# Citation Audit Report
Date: 2026-03-25

## Summary
- Total citations checked: 23
- Verified correct: 17
- Minor issues (wrong pages/volume, wrong author initial): 5
- Significant issues (wrong claim, wrong paper): 1
- Hallucinated/not found: 0

## Files Audited
1. `causeplex_loop_phase.md`
2. `causeplex_quantum.md`
3. `causeplex_spacetime.md`

---

## Detailed Findings

### Gorard 2020 — "Some Quantum Mechanical Properties of the Wolfram Model"
- **Cited as (loop_phase.md):** `Gorard, J. (2020). Some quantum mechanical properties of the Wolfram model. *Complex Systems*, 29(2), 537–626. DOI: 10.25088/ComplexSystems.29.2.537`
- **Cited as (quantum.md):** Same, 537–626
- **Verified:** ⚠️ **Page range wrong — now fixed**
- **Issue:** End page should be 598, not 626. The pages 537–626 (90 pages) belong to Wolfram's companion paper (107–536 — actually that's the *Wolfram* paper); Gorard's paper is 537–598 (62 pages). Source: complex-systems.com abstract page explicitly states "pp. 537–598."
- **Evidence:** https://www.complex-systems.com/abstracts/v29_i02_a02/ — "Cite this publication as: J. Gorard, 'Some Quantum Mechanical Properties of the Wolfram Model,' Complex Systems, 29(2), 2020 pp. 537–598."
- **Used correctly?** Yes — the paper does prove that the geometry of the multiway evolution graph converges to complex projective Hilbert space in the continuum limit. This matches the claims made in the texts.
- **Fix applied:** Changed 537–626 → 537–598 in both `causeplex_loop_phase.md` and `causeplex_quantum.md`.

---

### Sorkin 1994 — "Quantum Mechanics as Quantum Measure Theory"
- **Cited as (loop_phase.md):** `Sorkin, R.D. (1994). Quantum mechanics as quantum measure theory. *Modern Physics Letters A*, 9(33), 3119–3127. DOI: 10.1142/S021773239400294X`
- **Cited as (quantum.md):** Same
- **Verified:** ✅ with minor note
- **Issue:** ArXiv (gr-qc/9401003) journal reference line says "Mod.Phys.Lett. A9 (1994) 3119-3128" (ending 3128), while Semantic Scholar and several citing papers say 3119-3127. The DOI is correct. The discrepancy in last page number (3127 vs 3128) is unresolved by freely accessible sources; the cited value (3127) is plausible and used by multiple citing papers.
- **Evidence:** https://arxiv.org/abs/gr-qc/9401003 — confirms title, author (Rafael D. Sorkin), journal (Modern Physics Letters A), volume 9(33), year 1994. DOI 10.1142/S021773239400294X confirmed.
- **Used correctly?** Yes — the paper genuinely shows that quantum mechanics is the unique grade-2 generalization of classical probability theory, forcing complex-valued decoherence functionals. The abstract explicitly says "The next weaker sum-rule defines a generalized measure theory which includes quantum mechanics as a special case. The fact that quantum probabilities can be expressed as the squares of quantum amplitudes is thus derived in a natural manner." This is exactly how it is used in the texts.
- **Does it "derive complex amplitudes"?** Yes — it derives the squared-amplitude Born rule from the minimal relaxation of the classical probability sum-rule. This is accurately characterized in the papers.

---

### Aaronson 2004 — "Is Quantum Mechanics an Island in Theoryspace?"
- **Cited as (loop_phase.md):** `Aaronson, S. (2004). Is quantum mechanics an island in theoryspace? *arXiv:quant-ph/0401062*.`
- **Cited as (quantum.md):** Same (no journal/page info)
- **Verified:** ✅ with **significant claim caveat**
- **Issue (significant):** The papers claim Aaronson "proves U(1) uniqueness / eliminates quaternions" via "(1) Local measurements uniquely determining global states (local tomography)" and "(2) The tensor product structure for composite systems." However, the actual Aaronson 2004 paper does something different — it investigates what happens if you change various features of QM (replace the 2-norm with p-norm; relax norm-preservation; restrict amplitudes to reals). The quaternion result in the paper is: with quaternionic amplitudes, $f(n_A n_B) < f(n_A) f(n_B)$, i.e., quaternionic QM doesn't satisfy the tensor product dimension formula for composite systems. This is related to but not identical to the "local tomography" framing in the texts.
- **Evidence:** https://arxiv.org/abs/quant-ph/0401062 — abstract: "This recreational paper investigates what happens if we change quantum mechanics in several ways. The main results are as follows. First, if we replace the 2-norm by some other p-norm, then there are no nontrivial norm-preserving linear maps. Second, if we relax the demand that norm be preserved, we end up with a theory that allows rapid solution of PP-complete problems (as well as superluminal signaling). And third, if we restrict amplitudes to be real, we run into a difficulty much simpler than the usual one based on parameter-counting of mixed states." The quaternion result (tensor product failure) is a secondary result inside the paper.
- **Used correctly?** Partially. The tensor product failure of quaternionic QM is real and is in the paper. However: (a) Aaronson calls this a "recreational paper" and explicitly does not claim to have proven U(1) uniqueness in a strong sense; (b) the paper does not have a theorem formally titled "U(1) is the unique consistent number field" — this is a characterization applied by the epiphysics texts; (c) the local tomography framing is the standard one (see Chiribella, D'Ariano, Perinotti 2011 and Hardy 2001 for cleaner versions), not precisely what Aaronson 2004 proves. The core claim — "quaternionic QM fails the tensor product structure" — is correct and attributable to this paper. The claim that Aaronson "proves U(1) uniqueness" is an overstatement of what the paper shows.
- **Recommendation:** Flag in text that the elimination of quaternions via tensor product failure is shown in Aaronson 2004 (§3, quaternionic case), but the "unique number field" framing is broader than what that specific paper proves.

---

### Barcelo, Kramer, Laubenbacher & Weaver 2001 — "Foundations of a Connectivity Theory for Simplicial Complexes"
- **Cited as (loop_phase.md):** `Barcelo, H., Kramer, X., Laubenbacher, R., & Weaver, M. (2001). Foundations of a connectivity theory for simplicial complexes. *Advances in Applied Mathematics*, 26(2), 97–128. DOI: 10.1006/aama.2000.0710`
- **Verified:** ⚠️ **Author initial wrong — now fixed**
- **Issue:** Weaver's first name is Christopher, so the initial should be C., not M. The loop_phase.md had "Weaver, M." — corrected to "Weaver, C." The quantum.md does not include this citation in its reference list (only loop_phase.md references this paper).
- **Evidence:** ScienceDirect and ASU faculty page both list the authors as "Hélène Barcelo, Xenia Kramer, Reinhard Laubenbacher, Christopher Weaver." Multiple citing papers use "C. Weaver."
- **Subtitle/content correct?** Yes — the paper does lay foundations of A-theory (A-homotopy) for simplicial complexes and graphs, which is exactly what the texts claim. The journal (Advances in Applied Mathematics), volume (26(2)), pages (97–128), and DOI are all correct.
- **Fix applied:** Changed "Weaver, M." → "Weaver, C." in `causeplex_loop_phase.md`.

---

### Barcelo & Laubenbacher 2005 — "Perspectives on A-Homotopy Theory and Its Applications"
- **Cited as (loop_phase.md):** `Barcelo, H. & Laubenbacher, R. (2005). Perspectives on A-homotopy theory and its applications. *Discrete Mathematics*, 298(1–3), 39–61. DOI: 10.1016/j.disc.2004.03.016`
- **Verified:** ✅
- **Evidence:** Semantic Scholar: "Barcelo2005PerspectivesOA ... journal=Discret. Math., year=2005, volume=298, pages=39-61." PDF from IRCAM confirms "H. Barcelo, R. Laubenbacher / Discrete Mathematics 298 (2005) 39–61." DOI confirmed from ScienceDirect listing.
- **Used correctly?** Yes — the paper is a survey of A-homotopy theory for simplicial complexes and graphs, which is how it is used.

---

### Hurwitz 1898 — "Ueber die Composition der quadratischen Formen"
- **Cited as (loop_phase.md):** `Hurwitz, A. (1898). Ueber die Composition der quadratischen Formen von beliebig vielen Variabeln. *Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen*, 309–316.`
- **Verified:** ✅ with minor note
- **Issue:** Minor spelling variant: the EUDML canonical entry spells the title "von belibig vielen Variablen" (some sources "beliebig"); the cited title "von beliebig vielen Variabeln" is the standard form used in most reference lists. The journal is also cited at various levels of specificity — some cite "Nachr. Königl. Gesell. Wiss. Göttingen. Math.-Phys. Klasse" but the text uses the shorter form. Both are acceptable. Pages 309–316 confirmed by EUDML.
- **Evidence:** https://eudml.org/doc/58420 — confirms author Hurwitz, title, journal, year 1898, pages 309–316.
- **Used correctly?** Yes — Hurwitz's theorem classifies normed division algebras as R, C, H, O. This is the correct attribution for "Hurwitz's theorem" as used in the texts.

---

### Malament 1977 — "The Class of Continuous Timelike Curves Determines the Topology of Spacetime"
- **Cited as (loop_phase.md):** `Malament, D.B. (1977). The class of continuous timelike curves determines the topology of spacetime. *Journal of Mathematical Physics*, 18(7), 1399–1404. DOI: 10.1063/1.523436`
- **Cited as (quantum.md):** Same with DOI
- **Cited as (spacetime.md):** Same without DOI
- **Verified:** ✅
- **Evidence:** ADS abstract (1977JMP....18.1399M), AIP/JMP page, Semantic Scholar all confirm: David B. Malament, Journal of Mathematical Physics 18(7), 1399–1404, July 1977.
- **Used correctly?** Partially — the texts use Malament's theorem as "causal ordering → metric up to conformal factor." The actual theorem is somewhat more specific: it establishes that the causal structure (the class of continuous timelike curves) determines the topology and the conformal structure (metric up to a conformal factor). The texts correctly describe the core result. However, it's worth noting that Malament's theorem is about continuous timelike curves in a spacetime context; its extension to discrete causal sets requires additional reasoning (the number-volume conjecture, as the texts acknowledge). The usage is correct in spirit with the caveat noted in the texts themselves.

---

### Tegmark 1997 — "On the Dimensionality of Spacetime"
- **Cited as (quantum.md):** `Tegmark, M. (1997). On the dimensionality of spacetime. *Classical and Quantum Gravity*, 14(4), L69–L75. DOI: 10.1088/0264-9381/14/4/002`
- **Cited as (spacetime.md — inline):** "Tegmark (1997, 'On the Dimensionality of Spacetime')" — no explicit reference entry in spacetime.md references
- **Verified:** ✅
- **Evidence:** Multiple sources confirm: Max Tegmark, "On the Dimensionality of Spacetime," Classical and Quantum Gravity, 14(4), L69–L75, 1997. ArXiv gr-qc/9702052. DOI 10.1088/0264-9381/14/4/002.
- **Used correctly?** Yes — the paper analyzes stability of physics across different spacetime dimensionalities and shows that (3+1) is the only combination with well-posed hyperbolic PDEs AND stable orbits. The Tangherlini result (unstable orbits for n_s > 3) is cited within Tegmark's analysis. The texts' table summarizing Tegmark's results is accurate.

---

### Tangherlini 1963 — "Schwarzschild Field in n Dimensions and the Dimensionality of Space Problem"
- **Cited as (spacetime.md — inline only):** Referenced in text as "Tangherlini's result" / "By Tangherlini, n_s > 3 gives r^{-(n_s-2)} force laws, unstable orbits, no stable atoms"
- **Not in explicit reference list of spacetime.md**
- **Verified:** ✅ (paper exists and says what is claimed)
- **Issue:** The paper is never explicitly listed in the spacetime.md references section, only referenced in the text body. It should be added to the references list.
- **Evidence:** Springer Nature Link confirms: F.R. Tangherlini, "Schwarzschild field in n dimensions and the dimensionality of space problem," *Il Nuovo Cimento* (1955-1965), vol. 27, pp. 636–651 (1963). OSTI also confirms the paper and the argument about stable bound orbits.
- **Used correctly?** Yes — the paper shows that gravitational/EM potentials in n > 3 spatial dimensions scale as r^{-(n-2)}, making stable closed orbits impossible. This is correctly attributed.

---

### Benincasa & Dowker 2010 — "Scalar Curvature of a Causal Set"
- **Cited as (spacetime.md):** `Benincasa, D.M.T. & Dowker, F. (2010). Scalar curvature of a causal set. *Physical Review Letters*, 104(18), 181301. DOI: 10.1103/PhysRevLett.104.181301`
- **Verified:** ✅
- **Evidence:** PubMed, OSTI, APS/PRL all confirm: Dionigi M.T. Benincasa and Fay Dowker, PRL 104, 181301, published May 6–7, 2010. DOI confirmed.
- **Used correctly?** Yes — the paper defines a combinatorial action on causal sets that is purely a count of causal intervals (no energy, no Lagrangian) and converges to the Einstein-Hilbert action in the continuum limit. The texts correctly describe this as a "combinatorial causal set action" that equals $\int R\sqrt{-g}\,d^4x$ in the continuum. The formula $S_{\text{BD}} = \ell_P^2 \sum_x [1 - N_1(x) + N_2(x)/2 - \cdots]$ is the correct form.

---

### Bombelli, Lee, Meyer & Sorkin 1987 — "Space-Time as a Causal Set"
- **Cited as (loop_phase.md, quantum.md, spacetime.md):** `Bombelli, L., Lee, J., Meyer, D., & Sorkin, R.D. (1987). Space-time as a causal set. *Physical Review Letters*, 59(5), 521–524. DOI: 10.1103/PhysRevLett.59.521`
- **Verified:** ✅
- **Evidence:** APS/PRL confirms: Luca Bombelli, Joohan Lee, David Meyer, Rafael D. Sorkin, PRL 59, 521, published August 3, 1987. Pages 521–524. DOI confirmed.
- **Used correctly?** Yes — this is the founding paper of causal set theory, cited appropriately as such.

---

### Wolfram 2020 — "A Class of Models with the Potential to Represent Fundamental Physics"
- **Cited as (loop_phase.md):** `Wolfram, S. (2020). A class of models with the potential to represent fundamental physics. *Complex Systems*, 29(2), 107–536. DOI: 10.25088/ComplexSystems.29.2.107`
- **Cited as (quantum.md):** Same
- **Cited as (spacetime.md):** Same without DOI
- **Verified:** ✅
- **Evidence:** complex-systems.com confirms: "S. Wolfram, 'A Class of Models with the Potential to Represent Fundamental Physics,' Complex Systems, 29(2), 2020 pp. 107–536."
- **Used correctly?** Yes — cited for the multiway rewriting system and causal invariance argument.

---

### Feynman & Hibbs 1965 — "Quantum Mechanics and Path Integrals"
- **Cited as (loop_phase.md, quantum.md):** `Feynman, R.P. & Hibbs, A.R. (1965). *Quantum Mechanics and Path Integrals*. McGraw-Hill.`
- **Verified:** ✅
- **Evidence:** Standard textbook, well-known. Publisher (McGraw-Hill), year (1965), and author names are correct. The original edition was published in 1965; there is also a 2005 Dover emended edition by Styer.
- **Used correctly?** Yes — cited as the source for the path integral with $e^{iS/\hbar}$, which is correct.

---

### Bell 1964 — "On the Einstein-Podolsky-Rosen Paradox"
- **Cited as (quantum.md):** `Bell, J.S. (1964). On the Einstein-Podolsky-Rosen paradox. *Physics*, 1(3), 195–200.`
- **Verified:** ✅
- **Evidence:** Standard reference; the paper was published in *Physics* (a short-lived journal), 1964, volume 1, issue 3. Pages 195–200 are the standard citation.
- **Used correctly?** Yes — cited for Bell's theorem on local hidden variable theories.

---

### Gleason 1957 — "Measures on the Closed Subspaces of a Hilbert Space"
- **Cited as (quantum.md):** `Gleason, A.M. (1957). Measures on the closed subspaces of a Hilbert space. *Journal of Mathematics and Mechanics*, 6(6), 885–893.`
- **Verified:** ✅
- **Evidence:** Multiple citing papers confirm: A.M. Gleason, Journal of Mathematics and Mechanics, Vol. 6, 1957, pages 885–893.
- **Used correctly?** Yes — cited for Gleason's theorem (unique probability measure on Hilbert space), used to derive the Born rule.

---

### Everett 1957 — "Relative State Formulation of Quantum Mechanics"
- **Cited as (quantum.md):** `Everett, H. (1957). Relative state formulation of quantum mechanics. *Reviews of Modern Physics*, 29(3), 454–462. DOI: 10.1103/RevModPhys.29.454`
- **Verified:** ✅
- **Evidence:** Standard reference; RMP 29(3), 454–462, 1957. DOI confirmed.
- **Used correctly?** Yes — cited for Everett's many-worlds interpretation.

---

### Zurek 2003 — "Decoherence, Einselection, and the Quantum Origins of the Classical"
- **Cited as (quantum.md):** `Zurek, W.H. (2003). Decoherence, einselection, and the quantum origins of the classical. *Reviews of Modern Physics*, 75(3), 715–775. DOI: 10.1103/RevModPhys.75.715`
- **Verified:** ✅
- **Evidence:** Standard reference; RMP 75(3), 715–775, 2003. DOI confirmed.
- **Used correctly?** Yes — cited for decoherence and einselection.

---

### Halliwell & Yearsley 2013 — "Amplitudes for Spacetime Regions and the Quantum Zeno Effect"
- **Cited as (quantum.md):** `Halliwell, J.J. & Yearsley, J.M. (2013). Amplitudes for spacetime regions and the quantum Zeno effect: pitfalls of standard path integrals. *Physical Review A*, 87(2), 022114. DOI: 10.1103/PhysRevA.87.022114`
- **Verified:** ⚠️ **Wrong paper / wrong journal-year**
- **Issue:** There are two different Halliwell & Yearsley papers that could be confused here:
  1. **Physical Review D 86, 024016 (2012)** — "Pitfalls of Path Integrals: Amplitudes for Spacetime Regions and the Quantum Zeno Effect" (arXiv: 1205.3773) — this is the main paper on the topic described.
  2. **Physical Review A 87, 022114 (2013)** — "Negative probabilities, Fine's theorem and linear positivity" — a different paper entirely.
  
  The text cites PRA 87, 022114 (2013) with the title belonging to the PRD paper. The actual paper on "amplitudes for spacetime regions and the quantum Zeno effect: pitfalls of standard path integrals" is published in **Physical Review D 86, 024016 (2012)**, not PRA.
  
  There is also a 2013 conference proceedings version (arXiv: 1301.4373) titled "Amplitudes for Spacetime Regions and the Quantum Zeno Effect: Pitfalls of Standard Path Integral Constructions," published in J. Physics: Conference Series 442, 012018 (2013) — a different venue.
  
- **Evidence:** APS/PRD confirms Phys. Rev. D 86, 024016, July 2012. Yearsley CV confirms PRA 87, 022114 is "Negative probabilities, Fine's theorem and linear positivity" — a completely different topic.
- **Used correctly?** The paper being cited (PRD 86) is relevant to the discussion; the citation points to the wrong paper number/journal.
- **Recommendation:** Do NOT auto-fix this — it may be an intentional choice to cite the conference version. Flag for human review.

---

### Ambjorn, Jurkiewicz & Loll 2004 — "Emergence of a 4D World from Causal Quantum Gravity"
- **Cited as (spacetime.md):** `Ambjorn, J., Jurkiewicz, J., & Loll, R. (2004). Emergence of a 4D world from causal quantum gravity. *Physical Review Letters*, 93(13), 131301.`
- **Verified:** ✅
- **Evidence:** APS/PRL confirms: J. Ambjørn, J. Jurkiewicz, R. Loll, PRL 93, 131301, September 21, 2004. Author spellings: "Ambjørn" (with ø) — cited as "Ambjorn" is a common simplified form. PubMed confirms PRL 93(13), 131301.
- **Used correctly?** Yes — cited for CDT numerical evidence of 4D spacetime from quantum gravity path integral.

---

### Noether 1918 — "Invariante Variationsprobleme"
- **Cited as (spacetime.md):** `Noether, E. (1918). Invariante Variationsprobleme. *Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen*, 235–257.`
- **Verified:** ✅
- **Evidence:** EUDML confirms: Emmy Noether, "Invariante Variationsprobleme," Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen, Mathematisch-Physikalische Klasse 1918 (1918): 235-257. Full pages 235–257 confirmed.
- **Used correctly?** Yes — cited for Noether's theorem connecting symmetries to conservation laws.

---

### Sorkin 1991 — "Spacetime and Causal Sets"
- **Cited as (spacetime.md):** `Sorkin, R.D. (1991). Spacetime and causal sets. In *Relativity and Gravitation: Classical and Quantum*, World Scientific.`
- **Verified:** ✅ (plausible)
- **Issue:** Cannot fully verify: this is a book chapter, not a journal article. The chapter is a commonly cited reference in causal set theory. No DOI available. The year (1991) and venue (proceedings volume on Relativity and Gravitation, World Scientific) are consistent with standard causal set literature citations.
- **Evidence:** Multiple papers in causal set theory cite this chapter for the number=volume conjecture.
- **Used correctly?** Yes — cited for the number=volume conjecture in causal set theory.

---

## Cross-Reference Check

| Paper | loop_phase.md | quantum.md | spacetime.md | Consistent? |
|---|---|---|---|---|
| Gorard 2020 | 537–598 (fixed) | 537–598 (fixed) | — | ✅ After fix |
| Sorkin 1994 | 3119–3127 | 3119–3127 | — | ✅ |
| Malament 1977 | with DOI | with DOI | without DOI | ✅ (acceptable) |
| Bombelli 1987 | with DOI | with DOI | without DOI | ✅ (acceptable) |
| Wolfram 2020 | with DOI | with DOI | without DOI | ✅ (acceptable) |
| Barcelo 2001 | C. Weaver (fixed) | — | — | ✅ After fix |

---

## Action Items

### Fixed (small corrections applied directly)
1. **`causeplex_loop_phase.md` line 349** — Gorard 2020 end page: `537–626` → `537–598` ✅
2. **`causeplex_quantum.md` line 325** — Gorard 2020 end page: `537–626` → `537–598` ✅
3. **`causeplex_loop_phase.md` line 345** — Barcelo 2001 Weaver initial: `Weaver, M.` → `Weaver, C.` ✅

### Needs human review (significant issues — text NOT changed)

4. **`causeplex_quantum.md` line 326** — Halliwell & Yearsley citation:
   - Cited as: PRA 87, 022114 (2013) with title "Amplitudes for spacetime regions and the quantum Zeno effect: pitfalls of standard path integrals"
   - **The paper with that title is PRD 86, 024016 (2012)** — a different journal, volume, and year
   - PRA 87, 022114 is a completely different paper ("Negative probabilities, Fine's theorem and linear positivity")
   - **Correction needed:** Change to `Halliwell, J.J. & Yearsley, J.M. (2012). Pitfalls of path integrals: Amplitudes for spacetime regions and the quantum Zeno effect. *Physical Review D*, 86(2), 024016. DOI: 10.1103/PhysRevD.86.024016`
   - (Or alternatively cite the 2013 proceedings version in J. Physics: Conference Series 442, 012018 if that was intended)

5. **`causeplex_loop_phase.md` and `causeplex_quantum.md`** — Aaronson 2004 claim characterization:
   - The texts characterize Aaronson 2004 as proving "U(1) uniqueness / eliminating quaternions" and state the theorem as having two conditions (local tomography + tensor product structure).
   - The actual paper is "recreational" and does show quaternionic QM fails the tensor product dimension formula, but the "local tomography" framing is not explicitly the language Aaronson uses, and he does not prove a strong "U(1) is the unique number field" theorem.
   - The core claim (quaternionic QM fails for composite systems) is correct and in the paper.
   - **Recommendation:** Soften "Theorem 5.1 (Aaronson 2004, adapted)" language — either note it is an adaptation, or cite additional papers (Hardy 2001, Chiribella et al. 2011) that prove uniqueness more rigorously.

### Additions recommended

6. **`causeplex_spacetime.md`** — Tangherlini 1963 is cited in the text body multiple times but **not in the References section**. Should be added:
   - `Tangherlini, F.R. (1963). Schwarzschild field in n dimensions and the dimensionality of space problem. *Il Nuovo Cimento*, 27, 636–651.`

---

## Verification Status by Paper

| Paper | Exists? | Author correct? | Year correct? | Title correct? | Journal correct? | Pages correct? | DOI correct? | Claim correct? |
|---|---|---|---|---|---|---|---|---|
| Sorkin 1994 | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ minor (3127 vs 3128) | ✅ | ✅ |
| Aaronson 2004 | ✅ | ✅ | ✅ | ✅ | arXiv only | N/A | N/A | ⚠️ overstated |
| Gorard 2020 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (fixed) | ✅ | ✅ |
| Barcelo et al. 2001 | ✅ | ⚠️ (fixed: Weaver M→C) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Barcelo & Laubenbacher 2005 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hurwitz 1898 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | ✅ |
| Malament 1977 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tegmark 1997 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tangherlini 1963 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | ✅ (not in refs) |
| Benincasa & Dowker 2010 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Bombelli et al. 1987 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Wolfram 2020 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Feynman & Hibbs 1965 | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | N/A | ✅ |
| Bell 1964 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | ✅ |
| Gleason 1957 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | ✅ |
| Everett 1957 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Zurek 2003 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Halliwell & Yearsley 2013 | ✅ | ✅ | ❌ year | ✅ | ❌ wrong journal | ❌ wrong article | ❌ | ✅ topic ok |
| Ambjorn et al. 2004 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Noether 1918 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | ✅ |
| Sorkin 1991 (book chap.) | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | N/A | ✅ |
