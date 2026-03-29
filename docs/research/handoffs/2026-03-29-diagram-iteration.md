# Handoff: Epimechanics Diagram Work

**Date:** 2026-03-29
**Agent:** EPIPHYSICS-OPEN-SOURCE
**Status:** Paused for iteration

---

## Completed This Session

### 1. Definitional Consistency Audit
- Fixed entity definition conflicts
- Added $\mathcal{M}$ equivalence (sum = integral)
- Added coupling notation reference table (7 symbols)
- Clarified $C_{\text{maint}}$ sign convention
- 10+ glossary terms added

### 2. Layer Renaming
| Old | New |
|-----|-----|
| Layer 0 | Event Layer |
| Layer A | Structure Layer |
| Layer B | Descriptor Layer |
| Layer C | Observable Layer |

Updated across 10 theory documents.

### 3. State/Representation Distinction
- $\mathcal{X}$ = potential state space (territory)
- $X$ = representation (can model actual, potential, or any state)
- $\mathcal{F}(X(x), x)$ = representational fidelity
- Propagated to Parts 0, 1, 1b, 3, 5, Index, Glossary

### 4. Diagrams Created
**Files:**
- `docs/theory/images/state_representation_final-1.png`
- `docs/theory/images/four_layer_architecture_final-1.png`
- `scripts/diagrams/state_representation.tikz`
- `scripts/diagrams/four_layer_architecture.tikz`
- `docs/theory/images/DIAGRAM_SPECS.md`

**Current state:** Functional but "ok" — needs iteration with better image generation tools.

---

## Known Issues / Future Work

### Diagrams Need Improvement
1. **Self vs other representation** — conscious entities represent themselves AND others; current diagram doesn't distinguish this
2. **Grid lines on manifold** — could be more curved/geodesic-like
3. **3D surface shading** — would help manifold look more curved
4. **Distribution visualization** — current bell curve is minimal

### Consider Better Tools
- **Penrose** (penrose.cs.cmu.edu) — declarative math diagrams from notation
- **Manim** — for animated versions
- **D3.js** — for interactive web versions
- Current TikZ approach works but is labor-intensive for iteration

### Diagram Ideas Not Yet Created
- Auto-causal loop visualization
- Coupling tensor diagram
- Entity interaction (Part 2.5)
- Layer emergence animation
- Fidelity spectrum (high → low)

---

## Commits Made

```
365e8f9 fix: state space now looks like a proper manifold
8dc386f feat: redesign state_representation diagram
083b662 fix: state_representation diagram - proper alignment
c9788e2 chore: remove intermediate PNG files
1335759 fix: improve diagram aesthetics
c58239e fix: improve diagram readability and layout
2e85f7b feat: add detailed diagram specs and TikZ/Penrose source
...plus earlier commits for layer renaming, terminology fixes
```

---

## Files to Know

| File | Purpose |
|------|---------|
| `~/git/ianderrington/epiphysics` | Main repo |
| `docs/theory/` | All theory documents |
| `docs/theory/images/` | Diagrams |
| `scripts/diagrams/*.tikz` | TikZ source files |
| `docs/theory/images/DIAGRAM_SPECS.md` | Detailed specs for diagrams |
| `docs/research/audits/2026-03-28-nomenclature-review.md` | VERIFY's audit |

---

## Quick Commands

```bash
# Compile TikZ to PDF
cd ~/git/ianderrington/epiphysics/scripts/diagrams
tectonic state_representation.tikz

# Convert PDF to PNG
pdftoppm -png -r 300 state_representation.pdf ../../docs/theory/images/state_representation_final

# Check theory docs
ls ~/git/ianderrington/epiphysics/docs/theory/*.md
```

---

## Recommendations for Next Session

1. **Don't rebuild diagrams from scratch** — iterate on existing TikZ files
2. **Consider Penrose** for math-heavy diagrams — better semantic representation
3. **The self-representation concept** needs its own diagram (Part 3 material)
4. **Push commits** when ready — currently 7+ commits ahead of origin

---

*Handoff complete. Diagrams are "ok for now" per user feedback.*
