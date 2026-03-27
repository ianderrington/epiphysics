# The Real-Time Argument for U(1): Draft for Adversarial Evaluation

**Date:** 2026-03-26  
**Status:** Draft — send to adversarial review before incorporating  
**Claim:** U(1) as the amplitude group of quantum mechanics follows from the cause-plex having a single real time dimension, via a short chain with no open conjectures.

---

## The Argument in One Paragraph

The cause-plex action $S[\gamma] = \sum_k \Delta E(e_k) \cdot \tau_{e_k}$ is real-valued because energy $\Delta E \in \mathbb{R}$ (Noether's theorem applied to time-translation symmetry in a Lorentzian cause-plex with $n_t = 1$) and proper time $\tau \in \mathbb{R}$ (event-count ratio, Definition 3.2). The amplitude assignment $w$ must satisfy the composition rule (Definition 2.8) and be continuous in $S$ (Condition CC). These together force $w(\gamma) = f(S[\gamma]/\hbar)$ where $f: \mathbb{R} \to G$ is a continuous group homomorphism into a compact group $G$ (compact by Proposition 3.1: stability forces $|w|=1$). Every continuous homomorphism from $\mathbb{R}$ into a compact group has image isomorphic to U(1). Therefore $G = \mathrm{U}(1)$ and $w(\gamma) = e^{iS[\gamma]/\hbar}$.

---

## The Chain, Step by Step

### Step 1: $n_t = 1$ (observer selection — spacetime paper)

The cause-plex has one timelike dimension. This is established in the spacetime paper via the observer-selection argument:
- $n_t = 0$: no causal ordering, P1 fails
- $n_t \geq 2$: ultrahyperbolic PDEs, no well-posed initial value problem, no causal partial order
- $n_t = 1$: unique satisfier of P1 (causal partial ordering)

**Status:** ✅ Derived (observer-selection argument; rigorous conditional on the observer-class stability filter)

**Gap to flag:** The spacetime paper derives $n_t = 1$ via observer selection, not from pure cause-plex primitives. A skeptic can accept this as the honest status: we observe $n_t = 1$ and derive consequences, rather than deriving $n_t = 1$ from first principles.

---

### Step 2: Proper time $\tau \in \mathbb{R}$ (spacetime paper, Definition 3.2)

Proper time along a worldline $\gamma$ is:
$$\tau(\gamma) = \frac{|\gamma|}{|\mathcal{C}_{\text{ref}}|} \in \mathbb{R}_{\geq 0}$$
a ratio of event counts. Real by construction — it is a count.

**Status:** ✅ Proved (Definition 3.2, no gaps)

---

### Step 3: Energy $\Delta E \in \mathbb{R}$ (spacetime paper, Section 5)

Energy is the conserved quantity associated with time-translation symmetry of the cause-plex action by Noether's theorem. With $n_t = 1$ (one real time dimension) and time-translation symmetry at Layer C, energy is a real-valued conserved quantity.

**Status:** ✅ Proved at Layer C (Noether's theorem; conditional on time-translation symmetry holding, which is the definition of Layer C)

**Gap to flag:** Noether applies at Layer C, not at Layer 0. In regions without time-translation symmetry (rapidly evolving, symmetry-breaking), energy is not well-defined. This is a scoping issue, not a flaw: the argument holds wherever Layer C applies, which is the regime where quantum mechanics is observed.

---

### Step 4: $S[\gamma] \in \mathbb{R}$ (Definition 3.1)

$$S[\gamma] = \sum_{k=1}^n \Delta E(e_k) \cdot \tau_{e_k}$$

Product of two real quantities summed over a finite set: real by arithmetic.

**Status:** ✅ Proved given Steps 2 and 3

---

### Step 5: Composition rule forces $w = f \circ S$ (Definition 2.8)

The composition rule (Definition 2.8) states:
$$w(\gamma_1 \cdot \gamma_2) = w(\gamma_1) \cdot w(\gamma_2)$$

The action satisfies:
$$S[\gamma_1 \cdot \gamma_2] = S[\gamma_1] + S[\gamma_2]$$
(additivity over concatenation — immediate from Definition 3.1)

Together: $w$ composed with $S$ is a group homomorphism from $(\Omega, \cdot)$ with additive action values into $(G, \cdot)$. Since $S$ takes values in $\mathbb{R}$ (Step 4) and the composition rule holds, $w$ factors through $S$:

$$w(\gamma) = f\!\left(\frac{S[\gamma]}{\hbar}\right), \quad f: \mathbb{R} \to G \text{ continuous group homomorphism}$$

where $\hbar$ is the scale factor (minimum action quantum; a real positive constant by local finiteness).

**Status:** ✅ Proved given Definition 2.8 + Definition 3.1 + Condition CC (continuity)

**Gap to flag (significant):** The factorization $w = f \circ (S/\hbar)$ requires that loops with the same action value have the same amplitude. This is not immediately obvious — two topologically distinct loops could have the same action but different amplitudes if the amplitude depends on topology as well as action. 

More precisely: the composition rule forces $w$ to be a homomorphism. Action additivity means $S$ is also a homomorphism $\Omega \to \mathbb{R}$. But $w$ factors through $S$ only if $w$ is *constant on level sets of $S$* — i.e., if the amplitude depends only on the action value, not on the loop's other properties.

**This is a non-trivial assumption.** Call it **Condition FA (factorization through action)**: $w(\gamma)$ depends on $\gamma$ only through $S[\gamma]$.

Condition FA is physically motivated — the whole point of the action is that it is the complete summary of a path's contribution to the amplitude. But it is an assumption, not a consequence of the definitions as stated. It is equivalent to saying: the cause-plex action $S$ is a *sufficient statistic* for the amplitude. This should be stated explicitly as a condition.

**Without Condition FA:** $w$ is a general homomorphism $\Omega \to G$, and the image could be more complex than U(1). The real-time argument only gives U(1) if FA holds.

---

### Step 6: $f: \mathbb{R} \to G$ compact forces image $\cong \mathrm{U}(1)$

**Lemma (standard Lie theory).** *Let $f: \mathbb{R} \to G$ be a continuous group homomorphism into a compact topological group $G$. Then the closure of the image $\overline{f(\mathbb{R})}$ is a compact connected abelian Lie group, hence isomorphic to a torus $\mathrm{U}(1)^k$ for some $k \geq 0$. If $f$ is non-trivial (not the zero map), then $k \geq 1$.*

*Proof sketch.* $f$ is a continuous homomorphism from $(\mathbb{R}, +)$ into $G$. Its image is a connected subgroup (continuous image of a connected set). In a compact group, connected subgroups are compact. A compact connected abelian group is a torus $\mathrm{U}(1)^k$ by the classification of compact abelian Lie groups. $\square$

**Applied here:** $G$ is compact (Proposition 3.1). $f$ is non-trivial (trivial $f$ gives $w \equiv 1$, no interference). The image is $\mathrm{U}(1)^k$ for $k \geq 1$.

**Status:** ✅ Proved (standard result; reference: any compact Lie group textbook, e.g. Bröcker & tom Dieck)

**Gap to flag:** This gives $\mathrm{U}(1)^k$, not necessarily $\mathrm{U}(1)^1$. The image could be a higher-dimensional torus. We get $k = 1$ (single circle) only if the action is a single real number, which it is (Step 4). Since $f: \mathbb{R} \to G$ maps a 1-dimensional source, the image is at most 1-dimensional, forcing $k = 1$.

More precisely: $f(\mathbb{R})$ is the image of a 1-dimensional Lie group. Its dimension is at most 1. A torus of dimension 1 is $\mathrm{U}(1)$. So $k = 1$ follows from $S \in \mathbb{R}$ (not $\mathbb{R}^n$ for $n > 1$).

**Status:** ✅ Proved — $S \in \mathbb{R}$ (1-dimensional source) forces $k = 1$.

---

### Step 7: U(1) is the full group, not just the image

The argument above shows that the *image* of $w$ lies in $\mathrm{U}(1)$. But the *amplitude group* $G$ — the group in which $w$ takes values — could be larger, with $w$ mapping into a U(1) subgroup.

**Postulate R then applies here, narrowly:** Among all groups $G$ consistent with the constraints, we take the minimal one. Since the image is U(1), the minimal $G$ is U(1) itself.

Alternatively: since all amplitudes lie in a single U(1) subgroup of $G$, we can work with $G = \mathrm{U}(1)$ without loss. This is not Postulate R in full generality — it is the weaker claim that there is no reason to take $G$ larger than the image of $w$. Call this **Occam's group**: $G$ is the closure of the image of $w$.

**Status:** ✅ Uncontroversial given Occam's group (weaker than full Postulate R)

---

## Summary: The Condition Set

**U(1) falls out from:**

| Condition | Source | Status |
|---|---|---|
| P1 (causal partial order) | Cause-plex primitive | ✅ Definition |
| $n_t = 1$ (one real time) | Observer selection | ✅ Conditional (honest) |
| Layer C (time-translation symmetry) | Regime assumption | ✅ Scoped |
| Proposition 3.1 (stability → $\|w\|=1$) | Proved | ✅ |
| Definition 2.8 (composition rule) | Cause-plex primitive | ✅ Definition |
| Condition CC (amplitude continuity) | Physical postulate | 🔵 Explicit |
| **Condition FA (action is sufficient statistic)** | **Physical postulate** | 🔵 **Explicit — new, non-trivial** |
| Occam's group ($G$ = closure of image) | Parsimony | 🔵 Weak postulate |
| Standard Lie theory (1-param compact subgroup ≅ U(1)) | Mathematics | ✅ |

**Not needed:** A\_rich, Aaronson, Baez, local tomography, Postulate R (full form), Hurwitz (beyond the $S \in \mathbb{R}$ argument)

---

## The Honest Weak Point: Condition FA

The argument lives or dies on Condition FA (the action is a sufficient statistic for the amplitude — two loops with the same $S$ value get the same $w$).

**Why this is physical:** If the amplitude depended on loop topology *beyond* the action, then topologically inequivalent loops with the same $S$ would interfere differently. That would break Lorentz invariance — a Lorentz boost changes loop geometry without changing $S$ (since $S$ is a Lorentz scalar). So Condition FA follows from Lorentz invariance of the amplitude rule.

**Why this is non-trivial:** There exist topological field theories where the amplitude *does* depend on loop topology beyond the action (Chern-Simons theory, for instance). In those theories, FA fails. So FA is not a consequence of the cause-plex structure alone — it is an assumption about which type of quantum theory we are in.

**How to handle it:** State FA explicitly as a condition, note it follows from Lorentz invariance of amplitude assignments, and cite this as a place where the spacetime paper and the quantum paper make contact. It is not a gap — it is a precise statement of where the two papers interlock.

---

## Structural Position: Where This Goes in the Paper

**This argument is more foundational than the current Section 5.** It bypasses:
- The entire A\_rich / connectedness apparatus (Sections 4.3–4.7)
- Hurwitz's classification (only needed as motivation, not for the proof)
- Aaronson/Baez (independent corroboration, not the main argument)
- Postulate R (not needed; Occam's group is weaker and sufficient)

**Proposed paper structure:**

```
Section 3: Stability forces |w| = 1 (current — keep)
Section 4: [RETITLED] Loop-space connectedness — conditional results
           (moved to supplementary / corroboration; not load-bearing for main theorem)
Section 5: [NEW MAIN THEOREM] Real time forces U(1)
           5.1 The real-time chain: n_t=1 → S∈ℝ → f:ℝ→G → U(1)
           5.2 Condition FA: action as sufficient statistic
           5.3 Why FA follows from Lorentz invariance
           5.4 Theorem 5.1 (proved, conditions explicit)
           5.5 Postulate R and Route A as corroborating independent routes
Section 6: From U(1) to e^{iS/ℏ} (current — keep)
```

This is an entire reorganization. The loop-space connectivity work (Section 4) becomes supporting material for Route B, not the load-bearing path to U(1).

---

## Adversarial Questions This Needs to Survive

1. **FA objection:** Why can't two loops with the same action have different amplitudes? (Answer: Lorentz invariance — but needs to be made rigorous.)

2. **$n_t = 1$ objection:** This assumes the observer-selection result from the spacetime paper. Is that circular? (Answer: no — it's a chain of papers. But the dependency must be explicit.)

3. **Torus objection:** The Lie theory gives $\mathrm{U}(1)^k$. You claim $k=1$ because $S \in \mathbb{R}$. But what if the loop has multiple independent action components (e.g. internal symmetries)? Could you get $\mathrm{U}(1)^k$ for $k > 1$? (Answer: in standard QM, $k=1$ because the action is a single real number. But in gauge theories, the full amplitude group is $\mathrm{U}(1) \times \mathrm{SU}(2) \times \mathrm{SU}(3)$. This argument gives the *base* U(1); the gauge group structure requires separate treatment.)

4. **Composition rule objection:** The factorization $w = f \circ S$ requires the composition rule AND additivity of $S$. But is $S$ strictly additive over loop concatenation? (Answer: yes by Definition 3.1 — it is a sum over events, concatenation adds events. But check: does concatenation double-count shared events at the junction?)

5. **Occam's group:** "Take $G$ = closure of image" is a convenience assumption, not a theorem. A critic can say the ambient group matters. (Answer: fair — this is where Postulate R's full force enters if needed. Flag it.)

---

## Recommendation

This argument is strong enough to be the primary route to U(1) in the paper, provided:
1. Condition FA is stated explicitly and its derivation from Lorentz invariance is written out
2. The $n_t = 1$ dependency on the spacetime paper is made explicit
3. The torus objection (item 3 above) is addressed with a footnote on gauge symmetry
4. The composition rule / action additivity check (item 4) is verified explicitly

Send to adversarial review before restructuring the paper.
