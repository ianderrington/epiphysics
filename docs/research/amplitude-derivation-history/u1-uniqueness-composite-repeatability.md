# U(1) Uniqueness from Composite Repeatability
# Draft for Adversarial Review

**Date:** 2026-03-26  
**Status:** Draft — adversarial review requested  
**Context:** Part of the "minimal self-describing cause-plex" program. Previous reviews established:
- U(1) is sufficient for self-description ✅
- Stability forces |w|=1 ✅ (Proposition 3.1)  
- Distinguishability forces G ≠ {1} ✅
- Repeatability forces composition rule ✅
- Two gaps remain: (1) real observables, (2) uniqueness — why not SU(2)?

**This document attacks Gap 2 only:** show that SU(2) as amplitude group violates at least one self-description condition, forcing $G = \mathrm{U}(1)$ as the unique solution.

---

## The Uniqueness Problem

We have four self-description conditions:

| Condition | Formal requirement | Status |
|---|---|---|
| **D** (Distinguishability) | $G \neq \{1\}$ | ✅ trivial |
| **S** (Stability) | $|w|=1$, $G$ compact | ✅ Prop 3.1 |
| **R** (Real observables) | $S[\gamma] \in \mathbb{R}$ | ⚠️ conditional (Layer C) |
| **Rep** (Repeatability) | composition rule $w(\gamma_1 \cdot \gamma_2) = w(\gamma_1)w(\gamma_2)$ | ✅ definitional |

U(1) satisfies all four. So does SU(2) (all four conditions are satisfied by SU(2) — nothing above eliminates it). Therefore the four conditions are not yet sufficient for uniqueness.

The claim to be evaluated: **a fifth condition, composite repeatability, is implied by self-description and eliminates SU(2).**

---

## The Fifth Condition: Composite Repeatability

### Motivation

A self-describing cause-plex must contain observers. Observers are not elementary — they are composite entities: bound structures of many interacting parts (Part 1.5: Causors). An observer measuring a composite system $(A, B)$ must be able to reproduce the measurement. Reproducibility for composite systems requires that:

1. The state space of $(A, B)$ is determined by the state spaces of $A$ and $B$ independently when non-interacting
2. The amplitude of a composite path factors correctly into contributions from $A$ and $B$

This is the **tensor product condition**: the joint state space of two non-interacting subsystems is the tensor product of their individual state spaces.

### Formal Statement

**Condition CR (Composite Repeatability):** For any two non-interacting subsystems $A$ and $B$ in the cause-plex, the joint amplitude assignment $w_{AB}$ satisfies:

$$f(n_A n_B) = f(n_A) \cdot f(n_B)$$

where $f(n)$ counts the number of real parameters required to specify a mixed state (density matrix) for an $n$-dimensional system over amplitude group $G$.

**Motivation:** If CR fails, then the number of parameters needed to describe the joint system $(A,B)$ is not determined by the individual systems $A$ and $B$ alone. An observer measuring $(A,B)$ would require additional information beyond what is determined by measuring $A$ and $B$ separately. This means composite measurements are not reproducible from component measurements — a fundamental failure of self-description.

A universe where you can fully characterize $A$ and fully characterize $B$ but still cannot predict the behavior of $(A,B)$ from those characterizations is not self-describing in any operationally meaningful sense.

---

## The SU(2) Failure

### Computing $f(n)$ for different amplitude groups

For a system with $n$-dimensional Hilbert space over amplitude group $G$, the mixed state is a density matrix $\rho$ — a positive semidefinite Hermitian matrix with trace 1 over $G$.

**Over $\mathbb{C}$ (G = U(1)):**
$$\rho \in M_n(\mathbb{C}),\quad \rho^\dagger = \rho,\quad \text{tr}(\rho) = 1,\quad \rho \geq 0$$
Real parameters: $n^2 - 1$ (Hermitian $n \times n$ matrices with trace 1)
$$f_{\mathbb{C}}(n) = n^2 - 1$$

Check CR: $f_{\mathbb{C}}(n_A n_B) = (n_A n_B)^2 - 1$. Does this equal $f(n_A) \cdot f(n_B) = (n_A^2 - 1)(n_B^2 - 1)$? 

No — but the relevant tensor product formula for composite systems is:

$$\dim(\mathcal{H}_{AB}) = \dim(\mathcal{H}_A) \otimes \dim(\mathcal{H}_B) = n_A \cdot n_B$$

The parameter count satisfies: the joint system has $n_A n_B$-dimensional Hilbert space, and $(n_A n_B)^2 - 1$ parameters for its density matrix. The individual systems have $n_A^2 - 1$ and $n_B^2 - 1$ parameters. These are consistent with the tensor product structure: $\mathcal{H}_{AB} = \mathcal{H}_A \otimes \mathcal{H}_B$. This is what Condition CR requires — the **dimension** of the joint state space equals the product of individual dimensions. ✅

**Over $\mathbb{H}$ (G = SU(2) / quaternionic QM):**

In quaternionic quantum mechanics, states are elements of a right quaternionic Hilbert space. The density matrix for an $n$-dimensional quaternionic system is a $n \times n$ quaternionic Hermitian positive matrix with trace 1.

Real parameters for quaternionic density matrix of dimension $n$:
$$f_{\mathbb{H}}(n) = n(2n-1)$$

(This follows from the structure of quaternionic Hermitian matrices: $n$ real diagonal entries summing to 1, giving $n-1$ free parameters, plus $\frac{n(n-1)}{2}$ quaternionic off-diagonal entries each with 4 real parameters minus the constraint... working out to $2n^2 - n$ total real parameters. Note: some references write $f_{\mathbb{H}}(n) = n(2n-1)$ and others $2n^2-n$ — these are the same: $n(2n-1) = 2n^2 - n$.)

Check CR: Does $f_{\mathbb{H}}(n_A n_B) = f_{\mathbb{H}}(n_A) \cdot f_{\mathbb{H}}(n_B)$?

$$f_{\mathbb{H}}(n_A n_B) = (n_A n_B)(2n_A n_B - 1) = 2n_A^2 n_B^2 - n_A n_B$$

$$f_{\mathbb{H}}(n_A) \cdot f_{\mathbb{H}}(n_B) = n_A(2n_A - 1) \cdot n_B(2n_B - 1) = n_A n_B (2n_A - 1)(2n_B - 1)$$
$$= n_A n_B (4n_A n_B - 2n_A - 2n_B + 1)$$
$$= 4n_A^2 n_B^2 - 2n_A^2 n_B - 2n_A n_B^2 + n_A n_B$$

These are not equal. Specifically:
$$f_{\mathbb{H}}(n_A n_B) - f_{\mathbb{H}}(n_A) \cdot f_{\mathbb{H}}(n_B) = (2n_A^2 n_B^2 - n_A n_B) - (4n_A^2 n_B^2 - 2n_A^2 n_B - 2n_A n_B^2 + n_A n_B)$$
$$= -2n_A^2 n_B^2 + 2n_A^2 n_B + 2n_A n_B^2 - 2n_A n_B$$
$$= 2n_A n_B(-n_A n_B + n_A + n_B - 1)$$
$$= 2n_A n_B(n_A - 1)(n_B - 1) \cdot (-1) \cdot (-1)$$

For $n_A, n_B \geq 2$ this is non-zero. **CR fails for quaternionic QM.** ❌

The joint system requires *fewer* parameters than the tensor product would predict. This means: quaternionic composite systems cannot be fully characterized by independently characterizing their components — they have a built-in parameter deficit.

---

## The CR Failure Means SU(2) Is Not Self-Describing

The parameter deficit has a direct operational consequence:

**Claim:** In a quaternionic cause-plex ($G = \mathrm{SU}(2)$), an observer cannot determine the state of a composite system $(A, B)$ from measurements of $A$ and $B$ separately. The joint state has *fewer* free parameters than $(\text{state of }A) \otimes (\text{state of }B)$, meaning some degrees of freedom of the joint system are inaccessible to component-wise measurement.

**Consequence for self-description:** An observer-class entity in the cause-plex is itself composite — it is a bound structure of many interacting subsystems (Part 1.5: Causors). If the observer cannot characterize composite systems from component measurements, it cannot characterize itself. A cause-plex whose observer-class entities cannot characterize themselves is not self-describing.

More precisely: self-description requires that an observer can, in principle, construct a complete description of the cause-plex from local measurements. "Local measurements" means measuring individual subsystems and combining results. If combination fails (CR fails), the complete description is impossible from local measurements. Self-description fails.

**Therefore:** $G = \mathrm{SU}(2)$ is incompatible with the self-description requirement. ❌

---

## The Full Uniqueness Argument

**Theorem (U(1) Uniqueness from Self-Description).**  
*The unique amplitude group $G$ for a self-describing cause-plex is $G = \mathrm{U}(1)$.*

**Proof sketch:**

1. By conditions D, S, Rep: $G$ is a compact group, $G \neq \{1\}$, satisfying the composition rule. By Hurwitz + real action (condition R): $G \in \{\mathrm{U}(1), \mathrm{SU}(2)\}$ (eliminating $S^0$ by D, $S^7$ by Lie group requirement).

2. By Condition CR (composite repeatability): $G = \mathrm{SU}(2)$ is eliminated — quaternionic QM fails the parameter-counting condition $f(n_A n_B) = f(n_A) \cdot f(n_B)$, meaning composite systems cannot be characterized from component measurements. A cause-plex with $G = \mathrm{SU}(2)$ is not self-describing.

3. Therefore $G = \mathrm{U}(1)$ is the unique self-describing option. $\square$

---

## Honest Assessment of What's Being Claimed

### Where the argument is strong

- The parameter-count computation is standard and correct. Quaternionic density matrices have $f_{\mathbb{H}}(n) = 2n^2 - n$ real parameters; this is well-established. The failure of $f_{\mathbb{H}}(n_A n_B) = f_{\mathbb{H}}(n_A) \cdot f_{\mathbb{H}}(n_B)$ is a straightforward algebraic fact.
- The connection between CR and "composite measurements from component measurements" is natural and well-motivated.
- This argument is *internal* to the cause-plex language: CR is a condition about what it means for a composite cause-plex entity to be characterizable, not an imported quantum information axiom.

### Where the argument is potentially weak

**WP-A: Is CR actually implied by self-description?**

The claim is: "if CR fails, the cause-plex is not self-describing." The argument is that observers can't characterize composite systems from components. But is this the only notion of self-description? A quaternionic universe might have observers that can characterize composite systems directly (without reducing to component measurements) — they'd just need to make *joint* measurements. Does self-description require characterizability from component measurements specifically, or just characterizability in some form?

If self-description only requires that some description exists (not necessarily built from component measurements), CR is not implied by self-description and the argument fails.

**WP-B: The parameter count assumes a specific definition of "state"**

$f(n)$ counts parameters for density matrices. But in the cause-plex, the relevant objects are amplitude-weighted path sums, not density matrices per se. The density matrix formalism is a Layer C coarse-graining. Is the parameter-counting argument valid at the level of cause-plex primitives, or only at Layer C?

If the argument only works at Layer C, it is a Layer C result about quantum mechanics — not a foundational result about the cause-plex. That's still valuable, but it doesn't achieve the goal of deriving U(1) from cause-plex primitives.

**WP-C: Does $G = \mathrm{SU}(2)$ really correspond to "quaternionic QM"?**

The amplitude group $G$ is the group in which path weights $w(\gamma)$ take values. For $G = \mathrm{U}(1)$, path weights are complex phases — standard QM. For $G = \mathrm{SU}(2)$, path weights are unit quaternions — quaternionic QM. This correspondence is standard and correct.

But: the elimination of quaternionic QM via parameter counting is a standard result in quantum foundations (Aaronson 2004, Baez 2012). What is being claimed as new here is that the same elimination follows from "self-description" rather than from "physical locality." This is a reframing of a known result, not a new result. The adversarial question: is the reframing adding conceptual clarity, or just renaming "local tomography" as "self-description"?

**WP-D: Are there other connected compact groups beyond $\{\mathrm{U}(1), \mathrm{SU}(2)\}$?**

Step 1 of the proof sketch says we get to $G \in \{\mathrm{U}(1), \mathrm{SU}(2)\}$ via Hurwitz + real action. This requires:
- Hurwitz eliminates everything except $\mathbb{R}, \mathbb{C}, \mathbb{H}, \mathbb{O}$
- Real action + 1-parameter homomorphism gives the relevant unit circles
- $\mathbb{O}$ eliminated by Lie group requirement
- $\mathbb{R}$ eliminated by disconnectedness or non-triviality

But this step still relies on the real-action chain (Gap 1 in the previous analysis) and Hurwitz. If either of those is conditional, the candidate set $\{\mathrm{U}(1), \mathrm{SU}(2)\}$ is not established without conditions. The uniqueness argument only finishes the job — it doesn't bypass the setup.

---

## Relationship to Previous Arguments

| Route | Eliminates SU(2) by | Status |
|---|---|---|
| Aaronson 2004 | Tensor product failure (same as CR) | ✅ established, but external |
| Postulate R | Minimality (dim=1 < dim=3) | 🔵 postulate, not proved |
| **CR (this argument)** | **Self-description failure** | 🔵 conditional on WP-A,B,C |

The CR argument and the Aaronson argument eliminate SU(2) by the same algebraic fact ($f_{\mathbb{H}}(n_An_B) \neq f_{\mathbb{H}}(n_A)f_{\mathbb{H}}(n_B)$). The difference is motivation:
- Aaronson: "local tomography" — physical axiom from quantum information
- CR: "composite repeatability" — derived from self-description of the cause-plex

**If WP-A can be closed** (CR is genuinely implied by self-description, not just by local tomography), this is a meaningful improvement: the same algebraic result is now grounded in cause-plex primitives rather than imported from quantum foundations.

---

## What the Adversarial Review Should Focus On

1. **WP-A** (most important): Is composite repeatability (CR) genuinely implied by self-description, or is it an independent axiom that merely sounds like self-description? Specifically: can a self-describing universe exist that uses joint measurements rather than component measurements to characterize composite systems? If yes, CR is not forced by self-description.

2. **WP-B**: Is the $f(n)$ parameter count valid at the cause-plex level or only at Layer C? If only Layer C, what does this mean for the foundational claim?

3. **WP-C**: Is this argument genuinely different from "local tomography" or just a reframing? If just a reframing, is that reframing useful or misleading?

4. **WP-D**: Does Step 1 (getting to $\{\mathrm{U}(1), \mathrm{SU}(2)\}$) require conditions that are as strong as what CR is trying to replace?

5. **Overall**: Does this argument, if WP-A is closed, constitute a genuine proof that the minimal self-describing cause-plex has $G = \mathrm{U}(1)$? Or does it still leave open the possibility that some other amplitude structure is consistent with self-description?
