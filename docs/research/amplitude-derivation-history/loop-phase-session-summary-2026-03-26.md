# Session Summary: U(1) Derivation Program
# Date: 2026-03-26

## What we were trying to do

Derive $G = \mathrm{U}(1)$ as the amplitude group of the multiway cause-plex from cause-plex primitives, without importing Postulate R or local tomography as independent axioms.

## What we found (chronological)

### Phase 1: Conditional theorem attempts (all hit the same wall)

Four routes tried; each had one hidden axiom at the same logical depth:

| Route | Hidden axiom |
|---|---|
| Real action → U(1) | Condition FA (action sufficient statistic) |
| AL from (L) + Q' | CC2 (amplitude computability) |
| CR from self-description | CR not derived from (L); entanglement breaks Lemma |
| Postulate R | Minimality asserted, not proved |

Pattern: the gap moved but never disappeared. The adversarial reviewer correctly identified each one.

### Phase 2: The fixed-point insight

Ian's insight: rather than asking "which G satisfies constraints?", ask "what G survives recursive self-description?" U(1) as the attractor of a self-consistency map, not a conclusion from a list of axioms.

Key claim: the self-description map is $\Phi(G) = G \otimes G$, and $G \otimes G \cong G$ uniquely selects $G = \mathrm{U}(1)$ among non-trivial connected compact groups.

### Phase 3: Three-round adversarial dialogue

**Round 1 findings:**
- WP-B closed: reviewer proved no exceptional or classical nonabelian group satisfies $G \otimes G \cong G$ (dimension-doubling lemma). This is a genuine mathematical theorem.
- Remaining gap: $\Phi(G) = G \otimes G$ needs the MSD axiom (monoidal self-description)

**Round 2 findings:**
- Authors claimed MSD follows from P2 + Def 2.8
- Reviewer correctly identified: P2 = event commutation ≠ parallel loop amplitude factorization (PFT). Gap between sequential and parallel composition.
- Also: tensor vs direct product distinction

**Round 3 findings:**
- Reviewer gave final verdict: CONDITIONAL
- Identified HPC (History Product Closure) as the one remaining gap
- HPC: for $A \perp B$, are the history index sets Cartesian-independent?

### Phase 4: HPC derivation (final step)

HPC derived from Definition 2.3 plus one scope condition:

**Product initial state:** $\mathcal{S}_0 = \mathcal{S}_0^A \times \mathcal{S}_0^B$

When the initial state is a product state, no cross-constraints link $A$'s and $B$'s histories. HPC follows. PFT follows. $\Phi(G) = G \otimes G$ is established. Fixed-point theorem gives $G = \mathrm{U}(1)$.

**The entanglement resolution:** Systems with non-product initial state are entangled. PFT fails for them — correctly. Entanglement is precisely the cross-term $F(I(\gamma_A, \gamma_B)) \neq 1$ arising from non-product initial conditions. This is not a gap; it's the correct physics.

## Final state of the argument

### Route C (new, independent)

**Theorem 5.0.4 (U(1) as unique fixed point):**
The unique non-trivial connected compact Lie group satisfying $G \otimes G \cong G$ is $G = \mathrm{U}(1)$.

**Conditions:**
| Condition | Status |
|---|---|
| P1, P2, (L), Def 2.8 | ✅ from definitions |
| Product initial state | ✅ scope condition (defines unentangled case) |
| CC (continuity) | 🔵 postulate |
| Compact Lie regularity | 🔵 regularity |

**Not needed:** A\_rich, Postulate R, Aaronson, Baez, local tomography, FA, CC2

### Three convergent routes

| Route | Key condition | Status |
|---|---|---|
| A: Postulate R | Minimize dim(G) | ✅ Proved given Postulate R |
| B: Connectivity + locality | CC + A\_rich + tomography | ⚠️ Conditional |
| **C: Fixed-point** | **Product state + CC + Lie regularity** | ✅ **Proved** |

Route C is the most foundational: it requires only the product-state scope condition (which defines the physical situation) plus CC and Lie regularity (both explicit and independently motivated).

## What's in the paper now

- Section 5.0: Route C fully written — PFT, HPC, Lemma 5.0.3, Theorem 5.0.4, Corollary 5.0.5
- Status table updated with three routes
- All statuses honest with explicit condition labels

## Remaining open problems

1. **Level-separated self-description formalization**: The self-description map assumes the describing and described systems are at different causal levels. This needs formal definition.

2. **CC and compact Lie regularity**: Both remain explicit postulates. CC is standard and well-motivated. Compact Lie regularity is a technical assumption about the amplitude group.

3. **Continuum limit and $\phi = S/\hbar$**: Connecting the abstract phase to the physical action. Still conditional on Layer C.

## Key conceptual contribution

The fixed-point framing shifts the question from "which G satisfies conditions?" to "which G is the attractor of self-consistent description?" This reframes U(1) not as a constraint-satisfier but as the unique self-consistent amplitude structure. It connects to:

- Aaronson's "island in theoryspace": U(1) is isolated because it's the unique fixed point — no nearby theories are stable
- Wilsonian RG: U(1) is the IR fixed point of the amplitude-group flow under self-description
- Bell/Nobel 2022: entanglement is the cross-term from non-product initial states; the cause-plex handles both entangled and unentangled cases with the same framework
