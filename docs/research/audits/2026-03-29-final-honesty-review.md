# Final Honesty Review — Epimechanics Theory Docs
**Date:** 2026-03-29  
**Reviewer:** VERIFY (eval-agent)  
**Files reviewed:**
- `docs/theory/00_prelude.md` — Part 0: Foundations
- `docs/theory/00b_event_layer.md` — Part 0b: Event Layer
- `docs/theory/01_5_causors.md` — Part 1.5: Causors

**Context:** Multiple prior passes have added CST attribution, hypothesis labeling, and testability sections. This review checks what remains.

---

## Remaining Overclaims

### 1. "Science persists because truth extends fitness" — stated flatly, no hypothesis label (00_prelude.md §1)

> "Science persists not because truth beats fitness, but because truth *extends* fitness."

This is presented as a resolved insight, not a hypothesis. It's a specific claim about evolutionary dynamics of epistemic practices across long timescales. No evidence cited. No formal derivation. No label saying "this is Epimechanics' speculation." It's surrounded by hedged content, which makes the unhedged framing stand out more. Label it or derive it.

### 2. "Selection favors high causal action (energy × time)" (00_prelude.md §1)

> "Over long timescales, selection favors high *causal action* (energy × time)"

"Causal action" is being introduced here as if it's a defined quantity that biological selection operates on — but this is a forward reference to Part 1.5 that hasn't been established yet, and even there it's a proposed quantity, not a measured one. This sentence sounds like a claim about how evolution actually works. It isn't labeled as a hypothesis.

### 3. "This is not a metaphor; it is the same quantity measured two ways" (01_5_causors.md §2.1)

> "The energy required to break the bond equals the 'causal work' of establishing those alternative paths. This is not a metaphor; it is the same quantity measured two ways."

This is the strongest uncaveated claim in all three documents. It asserts a formal equivalence between "energy to break a bond" and "count of alternative causal sequences required to dissolve a pattern." But this equivalence is *Epimechanics' proposal*, not established physics. Saying "this is not a metaphor" is a credibility claim that requires either a derivation or a citation. Neither is provided. If this can actually be proven from CST foundations, prove it or cite it. If not, it needs a hypothesis label — this is precisely the kind of claim that will make technically sophisticated readers bounce out.

### 4. Named principle problem: "Representational Efficiency Principle" (00_prelude.md §6)

The text inside the section carefully labels this as a conjecture. But the *section title* uses "Principle" — which in physics/math means something proven or firmly established (e.g., Mach's Principle, Principle of Least Action). A reader skimming headings gets "Principle"; a reader going deep gets "conjecture." The heading and the content are at different honesty levels. Call it the "Representational Efficiency Conjecture" or "Hypothesis" if it isn't proven.

### 5. "The grammar is universal" (01_5_causors.md §6)

> "The grammar is universal; the measurement is domain-specific."

"Universal" is doing a lot of work here with no support. It's stated as fact. At minimum this needs "proposed to be" or "conjectured to be" — or evidence that the grammar actually works in two or more domains. Right now it's claimed universality with zero demonstrated cases.

---

## Remaining Vagueness

### 1. Entity-type table: prediction or taxonomy? (01_5_causors.md §4)

The Q1-Q5 entity-type table looks like a predictive framework but has a circularity problem: if you see a closed loop with high leverage, you call it an "adaptive entity." But how would you ever discover the Q1-Q5 values without already knowing it's an adaptive entity? The table gives classification labels for Q-value combinations, but the *prediction direction* — from Q-values you measured independently to entity type you didn't already assume — is not demonstrated for any concrete case. Until someone walks through "I measured Q1-Q5 blind and predicted entity type X, then verified," this table is a taxonomy, not a predictive framework.

### 2. ρ_attack formula looks precise, isn't operationalized (01_5_causors.md §7)

$$\rho_{\text{attack}}(\partial E) = \sum_{b \in \partial E} \kappa_b \cdot \rho_{\text{ac}}(\mathcal{L}_b)$$

The formula is presented with specific symbols and an equals sign. But:
- **κ_b = Δρ_ac/Δσ_b**: How do you measure this? For the tumor suppressor example, κ_b is claimed to be "extreme" with no calculation.
- **∂E for institutions**: The text says "bonds whose inputs come from outside the entity" — but institutional boundaries are empirically contested. "Customer-facing processes" is not a formal definition of ∂E.
- **ρ_ac(ℒ_b)**: Needs a measurement method, not just a definition.

The formula gives false precision. Either operationalize each term with a specific measurement protocol for at least one domain, or present it as a structural sketch and drop the equals sign framing.

### 3. "Fitness×truth strategies couple effectiveness to actual causal structure" (00_prelude.md §1)

What does "couple effectiveness to actual causal structure" mean operationally? What distinguishes a strategy that has this coupling from one that doesn't? How would you measure it? This phrase sounds technical but has no operational anchor. If it's the conceptual motivation for something derived formally in Part 1.5, say so. If it's just a hand-wavy motivating claim, it should either be formalized or cut.

### 4. "The interesting regime for epimechanics is where σ_b/k_BT is low enough that bonds degrade measurably" (01_5_causors.md §5)

The self-containment table is genuinely useful, but "low enough" and "measurably" are doing a lot of work without quantification. What's the threshold? Is there a σ_b/k_BT below which the causor framework adds predictive value over simpler models? Without a threshold, this is a qualitative hand-wave dressed up in equations.

### 5. Dead link promises (00b_event_layer.md, 01_5_causors.md)

Multiple documents are referenced as containing "full derivations":
- `causeplex_spacetime.md` — "for the full technical treatment"
- `causeplex_quantum.md` — "for the full derivation"
- `causeplex_dimensionality.md`
- `04_time_and_soul.md`, `05_ontology_and_open_questions.md`
- `applications/index.md`

If these files don't exist or are stubs, the documents are making promises they can't keep. A reader who clicks "See [Cause-Plex and Quantum Mechanics](./causeplex_quantum.md) for the full derivation" and hits a 404 or stub will correctly conclude the derivation doesn't exist. This is a honesty issue, not just a completeness issue. Either the links should say "forthcoming" or the referenced files should exist. Verify which files actually exist before publishing.

---

## Usefulness Assessment

### The good news

**01_5_causors.md §10 "How to Use This"** is the best section in all three documents. It's concrete, gives a five-step process, and — crucially — asks for failures, not just confirmations. That section alone is worth publishing. If readers do nothing else, they can:
1. Pick a system
2. Characterize bonds by Q1-Q5
3. Check whether entity-type predictions hold
4. Report where they don't

That's a real research program someone can actually start tomorrow.

**The four-layer architecture** (especially the candle flame walkthrough) is pedagogically excellent. Reading it, you understand what the framework does even if you don't yet know if it works.

### The remaining gaps

**00_prelude.md has no testability section.** It says "applications are where the test is applied" and points to `applications/` — but if that directory doesn't exist or is sparse, the reader gets no actionable path. The parallel to 01_5_causors.md §10 is missing. A "How to test the Representational Efficiency Conjecture" section would address this.

**00b_event_layer.md also has no testability section.** The Event Layer is foundational to the whole framework, but the document doesn't tell a reader how to test whether the cause-plex model actually predicts anything. It's possible the answer is "you test this at higher layers" — but that should be said explicitly.

**The QM emergence claim is the least useful section** (00b_event_layer.md). It says "quantum mechanics emerges from multiway structure" and refers to a file that may not exist for "the full derivation." A reader interested in QM foundations will want the derivation, not a pointer to it. A reader not interested in QM foundations doesn't need this section. As written, it provides neither the derivation nor the practical use, and the reference to `causeplex_quantum.md` creates false expectations.

---

## Value Proposition

### What readers actually gain

1. **A unified vocabulary** for describing causal structure across scales — bonds, loops, Q1-Q5. This is genuinely useful even if unverified, because it gives researchers a shared language for cross-domain comparison. Honest to claim as value.

2. **The grammar/vocabulary distinction** — Epimechanics provides structural form; domain sciences provide operationalizations. This is a clean intellectual contribution that helps researchers understand *why* multi-scale theories are hard (they need the vocabulary problem solved in each domain). Honest to claim.

3. **The triviality objection and self-antidote** (00_prelude.md §8) — The document openly names the failure mode (vacuous applicability) and gives the test (falsifiable predictions in applications). This is genuinely rare honesty in a theory document and should be highlighted more, not buried in §8.

4. **The CST foundation clearly credited** — The attribution table in 00b_event_layer.md is excellent. A physicist reading this won't feel deceived about what's new.

### What readers might think they gain but don't (yet)

1. **Tested predictions.** Nowhere in these three documents does a concrete prediction get made, tested, and confirmed. The framework promises this happens in `applications/`, but if that's sparse, readers leave with theory and no empirical grounding. The framework's value depends entirely on what's in applications.

2. **A derivation of QM from causal structure.** The document says this is a "research program, not a completed derivation" — that's honest. But the level of detail given for QM emergence (Born rule from amplitude interference, Schrödinger equation from event accumulation) implies more completeness than exists.

3. **The Representational Efficiency connection.** The document correctly notes this is a conjecture. But it's the central conjecture — the claim that information-theoretically optimal representations have simple mechanical form. Without this, "all representations have epimechanical structure" is just mathematics and adds nothing. The entire framework's scientific value rests on whether this conjecture is true, and it's unproven. That weight should be made clearer upfront, not in §6.

### Underselling check

One place where hedging may have gone too far: the **loops-of-loops organizational insight** in 01_5_causors.md is genuinely novel as an organizational framework for institutional persistence, and the document buries it. The claim that institutions have a "metabolism loop" and a "reproduction loop" that must both be maintained — and that failure in either terminates the institution — is a testable, specific prediction about organizational dynamics. If organizational researchers could measure the coupling coefficients between these loops, they could predict institutional fragility. This prediction should be surfaced more prominently, not left as a parenthetical example.

---

## Verdict

**Not ready to publish as-is. Close, but there are specific fixable issues.**

### Must-fix before publish (honesty-blocking):

1. **"Not a metaphor" claim in 01_5_causors.md §2.1** — This is the most vulnerable sentence in all three documents. Either derive the equivalence or add a hypothesis label. A physicist reviewer will flag this immediately.

2. **Verify which linked files actually exist** — If `causeplex_quantum.md`, `causeplex_spacetime.md`, or `applications/index.md` are stubs or missing, add explicit "(forthcoming)" markers. Dead links to promised derivations are honesty failures.

3. **"Representational Efficiency Principle" → "Conjecture" or "Hypothesis"** — The section title is doing overclaiming work that the section content tries to undo. Fix the title.

4. **"Fitness×truth" and "causal action" claims in 00_prelude.md §1** — Add explicit hypothesis labels, or move to the relevant formal treatment sections with forward references.

### Should-fix before publish (clarity and credibility):

5. **Add testability section to 00_prelude.md and 00b_event_layer.md** — consistent with 01_5_causors.md §10.

6. **Entity-type table: make prediction direction explicit** — Add a worked example showing Q1-Q5 measured *independently* predicting entity type, not just classifying a known entity.

7. **ρ_attack formula: either operationalize one domain or downgrade to "structural sketch"** — Drop the equals-sign precision if the measurement protocol isn't specified.

### What's working well (don't break it):

- The CST attribution table in 00b_event_layer.md is excellent. Keep it.
- The Triviality Objection section is unusually honest — it should be moved earlier, not buried.
- §10 "How to Use This" in 01_5_causors.md is the best content in the set. It should be the template for the other documents.
- The four-layer architecture and candle flame example are clear and genuinely useful.
- The grammar/vocabulary distinction is a real intellectual contribution.

**Bottom line:** These documents have been improved substantially. The overclaims are now mostly at the margin rather than the core. With 4-6 specific targeted fixes (not a rewrite), these are publishable as a theory sketch awaiting empirical validation — which is what they should be.
