# Theorem AL: Amplitude Locality from (L) + Q'
# Proof Sketch for Adversarial Review

**Date:** 2026-03-26  
**Status:** Proof sketch — adversarial review requested  
**Claim:** In the multiway cause-plex satisfying event locality (L) and Postulate Q', any amplitude assignment consistent with the event structure satisfies Condition AL (amplitude locality), from which FA (action as sufficient statistic) follows as a corollary.

---

## Setup and Definitions

**Locality Assumption (L)** (spacetime paper, Definition 1.4):
For each event $e \in E$:
- $|D(e)| < \infty$ (finite state domain)
- $D_\text{out}(e) \cap D_\text{in}(e') = \emptyset$ for all $e'$ not immediately preceding $e$ (disjoint output domains across non-adjacent events)

In words: each event reads from and writes to a bounded local neighborhood. No event can access the state domain of a non-adjacent event.

**Postulate Q'** (quantum paper, Section 2): The cause-plex is multiway — all causally consistent histories $\mathcal{C}_\alpha \in \mathcal{C}^*$ coexist simultaneously. Individual events $e \in E_\alpha$ in each history have definite local states.

**Definition 2.8 (composition rule):** An amplitude assignment $w: \Omega(\mathcal{C}^*, e_*) \to G$ satisfies:
$$w(\gamma_1 \cdot \gamma_2) = w(\gamma_1) \cdot w(\gamma_2)$$

**Condition AL (to be proved):** The amplitude contribution of event $e$ to loop $\gamma$ depends only on the local data of $e$ — specifically $(\Delta E(e), \tau_e)$ — and not on:
- which loop $\gamma$ the event belongs to
- the global topology of $\gamma$
- non-local state data from events spacelike-separated from $e$

**Condition FA (corollary target):** $\ker S \subseteq \ker w$ — two loops with the same total action have the same amplitude.

---

## Theorem AL

**Theorem AL.** *Let $\mathcal{C}^*$ be a multiway cause-plex satisfying (L) and Q'. Let $w: \Omega \to G$ be an amplitude assignment satisfying the composition rule (Definition 2.8). Then $w$ satisfies Condition AL.*

---

## Proof Sketch

The argument has three steps.

### Step 1: The composition rule decomposes $w$ over events

Let $\gamma = (e_1, e_2, \ldots, e_n)$ be a loop of $n$ events. By the composition rule applied iteratively:

$$w(\gamma) = w(e_1 \cdot e_2 \cdots e_n) = w(e_1) \cdot w(e_2) \cdots w(e_n)$$

where we abuse notation and write $w(e_k)$ for the amplitude of the unit loop consisting of the single event $e_k$ traversed within $\gamma$.

**Claim:** this decomposition is valid — the composition rule applies to single events as unit loops, not just to multi-event loops.

**Support:** The composition rule holds for all pairs of composable loops in $\Omega$. A single event $e$ traversed as a loop (state transitions from $\mathcal{S}_\text{in}(e)$ back to equivalent state) is a valid element of $\Omega$. The composition of unit loops is a loop of those events in sequence. The rule applies. $\square$

### Step 2: Each $w(e_k)$ can only depend on the local data of $e_k$

By Step 1, $w(e_k)$ is the amplitude contribution of event $e_k$. We claim it can only depend on local data of $e_k$.

**Argument:** Suppose $w(e_k)$ depended on some non-local data $X$ — specifically, on the state domain of some event $e_j$ with $e_k \perp e_j$ (spacelike separated) or $e_j$ not immediately adjacent to $e_k$ in the causal order.

By (L): $D_\text{out}(e_k) \cap D_\text{in}(e_j) = \emptyset$ and $D_\text{out}(e_j) \cap D_\text{in}(e_k) = \emptyset$ for non-adjacent events.

For $w(e_k)$ to depend on $X \in D(e_j)$, the amplitude assignment mechanism must be able to *read* $X$ when computing the contribution at $e_k$. But in the cause-plex, the only information accessible at event $e_k$ is what is in $D(e_k)$ — the local state domain at that event. This is precisely what (L) enforces: events act on, and therefore can only "know about," their local state domains.

The amplitude assignment is a function over the cause-plex. If the cause-plex itself respects (L) — events only access local data — then any assignment that is *consistent with the event structure* (i.e., computable from the cause-plex data at each event) must also only access local data at each event.

Therefore $w(e_k)$ is a function of $(\mathcal{S}_\text{in}(e_k), \mathcal{S}_\text{out}(e_k))$ — the local state transition at $e_k$ — which by Layer C decomposes into $(\Delta E(e_k), \tau_{e_k})$.

**Therefore:** $w(e_k) = g(\Delta E(e_k), \tau_{e_k})$ for some function $g: \mathbb{R} \times \mathbb{R}_{>0} \to G$.

This is Condition AL. $\square$

### Step 3: FA follows as a corollary

From Steps 1 and 2:
$$w(\gamma) = \prod_{k=1}^n g(\Delta E(e_k), \tau_{e_k})$$

The composition rule requires $w$ to be a group homomorphism from $(\Omega, \cdot)$ to $(G, \cdot)$. Combined with the event factorization, $g$ must satisfy:

$$g(\Delta E_1 + \Delta E_2, \tau_1 + \tau_2) = g(\Delta E_1, \tau_1) \cdot g(\Delta E_2, \tau_2)$$

(when events in adjacent unit loops combine). This forces $g$ to be a homomorphism $\mathbb{R} \times \mathbb{R}_{>0} \to G$, factoring as:

$$g(\Delta E, \tau) = h(\Delta E \cdot \tau)$$

for some homomorphism $h: \mathbb{R} \to G$, since $\Delta E \cdot \tau$ is the natural invariant combining the two real parameters into the action contribution at one event.

Therefore:
$$w(\gamma) = \prod_k h(\Delta E(e_k) \cdot \tau_{e_k}) = h\!\left(\sum_k \Delta E(e_k) \cdot \tau_{e_k}\right) = h(S[\gamma])$$

This is $w = h \circ S$, which means $\ker S \subseteq \ker w$ — Condition FA. $\square$

---

## Where the Argument Could Break

The proof sketch has four potential weak points. The adversarial review should focus on these:

### Weak point 1: Step 1 — are single events valid unit loops?

The composition rule applies to elements of $\Omega(\mathcal{C}^*, e_*)$ — loops *based at $e_*$*. A single event $e$ is only a valid element of $\Omega$ if it constitutes a closed loop returning to the base state.

**Problem:** Most events are not closed loops. The event $e: \mathcal{S}_\text{in} \to \mathcal{S}_\text{out}$ with $\mathcal{S}_\text{out} \neq \mathcal{S}_\text{in}$ is not a loop. The decomposition in Step 1 works only if every segment of $\gamma$ is itself a valid loop — which requires $\gamma$ to be decomposable into unit cycles.

**Possible fix:** Restrict to the sub-monoid of loops that are products of unit cycles (a standard assumption in discrete path integrals). State this explicitly as a condition on $\gamma$, or show that every loop in an observer-class cause-plex can be so decomposed.

**Severity: HIGH** — if this fails, Step 1 collapses and the entire factorization breaks.

### Weak point 2: Step 2 — "consistent with event structure" is doing heavy lifting

The argument says: because events obey (L), amplitude assignments *consistent with the event structure* must also obey (L). But "consistent with event structure" is not formally defined.

**Problem:** An amplitude assignment is a function $w: \Omega \to G$ — it's defined on loops, not on events. There is no formal requirement that it "computes from" the event data in any particular way. A purely mathematical amplitude assignment could in principle assign arbitrary values to loops without reading event-local data at all — it just needs to satisfy the composition rule.

The argument needs a bridge principle: something that says amplitude assignments must be *computed from* the cause-plex data, not just *defined over* it.

**Possible fix:** Add a formal **Computability Condition (CC2):** the amplitude of a loop is a function of the sequence of local event data along the loop, not of any external or global data. This is closely related to but distinct from Condition CC (continuity). CC2 is the "no magic" condition — amplitudes must arise from local event data.

If CC2 is accepted, it is well-motivated by (L) but is not formally derived from it. It should be stated as a postulate co-equal with (L) rather than derived from it.

**Severity: HIGH** — this is the core of the argument. If "consistent with event structure" isn't formalized, the whole derivation relies on an unnamed assumption.

### Weak point 3: Step 3 — the factorization $g(\Delta E, \tau) = h(\Delta E \cdot \tau)$

The argument says the two-parameter function $g(\Delta E, \tau)$ must factor as $h(\Delta E \cdot \tau)$ because the composition rule forces it to be a homomorphism.

**Problem:** A homomorphism $g: \mathbb{R} \times \mathbb{R}_{>0} \to G$ does NOT in general factor through the product $\Delta E \cdot \tau$. It factors through the product only if one adds the additional requirement that $g$ is invariant under rescaling $(\Delta E, \tau) \to (\lambda \Delta E, \tau/\lambda)$ (i.e., $g$ depends only on $\Delta E \cdot \tau$, not on $\Delta E$ and $\tau$ independently).

**Example of failure:** $g(\Delta E, \tau) = e^{i\alpha \Delta E} \cdot e^{i\beta \tau}$ is a perfectly valid homomorphism $\mathbb{R} \times \mathbb{R}_{>0} \to \mathrm{U}(1)$ with two independent parameters $\alpha, \beta$, and does NOT factor through $\Delta E \cdot \tau$ unless $\alpha = \beta \cdot (\text{const})$.

**What this means:** the argument as written only shows the *image* of $w$ lies in a compact connected abelian group generated by *two* real parameters — potentially $\mathrm{U}(1)^2$, not $\mathrm{U}(1)^1$. The factorization through the product requires an additional physical input: that the action is the natural invariant, not $\Delta E$ and $\tau$ separately.

**Possible fix:** The *definition* of the cause-plex action $S[\gamma] = \sum_k \Delta E(e_k) \cdot \tau_{e_k}$ already encodes the choice that the relevant invariant is the product. But why is the product the right combination and not some other function of $(\Delta E, \tau)$? This requires either a symmetry argument (dimensional analysis: the only dimensionally correct combination of energy × time with units of action is the product) or an explicit postulate.

The dimensional argument: energy has units $[E]$, time has units $[T]$, action has units $[E][T]$. The unique bilinear combination is $\Delta E \cdot \tau$. This is valid but relies on units being meaningful in the cause-plex, which requires Layer C.

**Severity: MEDIUM** — the $\mathrm{U}(1)^2$ issue is real but likely resolvable by the dimensional argument + Layer C. Needs to be made explicit.

### Weak point 4: Does the Q' realism commitment actually justify event-local data?

The argument uses Q' to say individual events have definite local states. But Bell/Nobel results show local realism fails.

The response given above (Section on Bell) was: AL operates at the amplitude layer, not the outcome layer. Events in each branch have definite data; measurement non-realism comes from summing over branches.

**The adversarial challenge:** In the multiway cause-plex, which "history" does an event $e$ with local data $(\Delta E(e), \tau_e)$ belong to? If the full multiway structure $\mathcal{C}^*$ is fundamental, and a single event $e$ belongs to *multiple* histories $\mathcal{C}_\alpha$ with possibly different local contexts, then the "local data of $e$" is not well-defined without specifying which history.

Formally: $e$ as a token element of multiple histories could have different $\Delta E$ values in different histories (if energy is defined contextually). In that case, $w(e)$ is not a function of *the* local data of $e$ but of the local data of $e$ *in history $\mathcal{C}_\alpha$*.

**Possible fix:** Define events as labeled by history — $e = (e_\text{token}, \alpha)$ where $\alpha$ indexes the history. Then local data is well-defined per $(e, \alpha)$ pair. But this changes the loop space definition and may reintroduce complexity.

**Severity: MEDIUM-HIGH** — this is a genuine issue with multiway ontology that affects the proof. Needs a precise definition of "event local data in $\mathcal{C}^*$."

---

## Net Assessment (Self-Evaluation)

Weak points ranked by severity:

1. **Step 1 (unit loop decomposition)** — HIGH: factorization may not apply to events that aren't themselves loops
2. **Step 2 (computability bridge)** — HIGH: "consistent with event structure" needs formalization as CC2
3. **Weak point 4 (event identity in multiway)** — MEDIUM-HIGH: local data of an event may be history-dependent
4. **Step 3 (factorization through product)** — MEDIUM: $\mathrm{U}(1)^2$ risk, resolvable by dimensional argument

**Honest verdict on current proof sketch: CONDITIONAL**

If weak points 1 and 2 can be patched — either by restricting to unit-cycle-decomposable loops (WP1) and by formalizing CC2 as an explicit postulate (WP2) — the argument becomes a clean conditional theorem:

> **Theorem AL (conditional).** In a multiway cause-plex satisfying (L), Q', and CC2 (amplitude computability from local event data), any amplitude assignment satisfying the composition rule satisfies Condition AL. FA follows as a corollary given dimensional uniqueness of action.

The conditions (L), Q', CC2 are all motivated from cause-plex primitives and do not import external physics. Postulate R and Aaronson are not needed. A\_rich is not needed.

**Is this more foundational than the existing Section 5?**

Yes — conditionally. The condition set {(L), Q', CC} is strictly more internal to the cause-plex framework than {A\_rich + Postulate R + locality/tomography}. If CC2 is accepted as a natural companion to (L) in amplitude language, this is a cleaner and more principled derivation. The adversarial review should test whether CC2 is genuinely derivable from (L) or requires independent motivation.
