---
title: "Representational Efficiency: Why Optimal Description Has Lagrangian Structure"
description: >-
  A standalone academic paper proving that among real-analytic, time-reversible
  kinetic energies, the quadratic form minimizes total predictive cost; arguing
  that Lagrangian structure outperforms generic ODEs for symmetric systems; and
  conjecturing that optimal dynamical description has Lagrangian structure.
  Includes the full proof, perturbative analysis, and an empirical testing program.
date: 2026-03-18T00:00:00.000Z
draft: true
author:
  name: "Ian Derrington"
contentType: article
series: "Epimechanics"
tags:
  - Epimechanics
  - Information theory
  - Lagrangian mechanics
  - Rate-distortion
  - Representational efficiency
coverImage: ./images/paper_representational_efficiency-1-1.png
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

# Representational Efficiency: Why Optimal Description Has Lagrangian Structure

**Ian Derrington**

tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## Abstract

We ask why the mathematical structure of physics — Lagrangian mechanics with quadratic kinetic energy — appears as the natural language for describing dynamical systems. We establish three results at different levels of rigor. *Proven:* among real-analytic, non-negative, zero-at-rest, time-reversible kinetic energies, the positive-definite quadratic form minimizes total predictive cost (description length plus integration cost). *Argued:* the Lagrangian framework is more compressed than generic ODE specifications for systems possessing symmetries, because Noether's theorem provides conservation laws automatically. *Conjectured:* these results suggest — but do not prove — that the information-theoretically optimal representation of dynamical systems has Lagrangian structure with quadratic kinetic energy. We develop the perturbative hierarchy of corrections when the quadratic model is insufficient, identify the irreversible case as the principal open problem, and propose four empirical tests that would confirm or refute the conjecture. The result, if it generalizes, implies that Lagrangian structure is what optimal description looks like — in any domain, not only physics.

tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## 1. Introduction

Physics has a distinctive mathematical form. Across classical mechanics, electromagnetism, general relativity, and quantum field theory, the same architecture recurs: a state space, a Lagrangian function, variational equations of motion, symmetries linked to conservation laws by Noether's theorem, and kinetic energy that is quadratic in velocities. Why?

The standard answer is empirical: we discovered these structures by fitting equations to data about the physical world, and they happen to work. On this view, the Lagrangian form is a contingent fact about physics — nature could have been different, and if it were, we would use different mathematics.

We propose an alternative: the Lagrangian form may not be contingent but necessary — not because reality "is" Lagrangian, but because representations that minimize predictive cost at a given accuracy will tend toward Lagrangian structure. The argument is information-theoretic. A representation must be specified (description length) and then solved (integration cost). The representation that minimizes the sum of these costs — the total predictive cost — is the one with the fewest parameters, the simplest equations of motion, and the most automatic conservation laws. We prove one piece of this claim (the quadratic kinetic energy is optimal among time-reversible, real-analytic alternatives), argue for another (Lagrangian beats generic ODE when symmetries exist), and conjecture the rest.

This reframes a metaphysical question as a mathematical one. We do not ask "why does nature obey Lagrangian mechanics?" — a question that may have no answer. We ask "why does optimal description have Lagrangian structure?" — a question that admits proof.

The paper proceeds as follows. Section 2 defines predictive cost precisely, distinguishing description length from integration cost and specifying the comparison rules. Section 3 proves that the quadratic kinetic energy is the minimum-complexity form satisfying physical constraints, for time-reversible systems. Section 4 presents the compression argument for why Lagrangian specifications outperform generic ODEs when symmetries exist. Section 5 develops the perturbative hierarchy of corrections. Section 6 discusses the irreversible case. Section 7 proposes four empirical tests. Section 8 discusses implications.

tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## 2. Definitions

### 2.1 Predictive Cost

**Definition 1.** The *predictive cost* $C(X, \varepsilon)$ of a representation $X$ at accuracy $\varepsilon$ is

$$C(X, \varepsilon) \;=\; \mathcal{K}(L, \varepsilon) \;+\; C_{\text{integrate}}(L)$$

where:

- $\mathcal{K}(L, \varepsilon)$ is the **description length** — the number of bits required to specify the model $L$ to sufficient precision for predictions at accuracy $\varepsilon$. For a model with $p$ continuous parameters each specified to precision $\delta(\varepsilon)$:

$$\mathcal{K} \;\approx\; p \cdot \log_2\!\bigl(1/\delta\bigr)$$

This is Minimum Description Length in the sense of Rissanen [1] — well-defined, computable, and data-dependent.

- $C_{\text{integrate}}(L)$ is the **integration cost** — the computational cost of solving the equations of motion derived from $L$. Linear equations: $O(n)$. Nonlinear: $O(n^2)$ or worse.

Both components are necessary. Two models can have identical description length $\mathcal{K}$ but different integration costs. The isotropic quartic $K = c|\dot{X}|^4$ and the isotropic quadratic $K = \frac{1}{2}m|\dot{X}|^2$ each require one parameter, but the quartic's Euler-Lagrange equations are cubic (nonlinear) while the quadratic's are linear. The quadratic has lower $C_{\text{integrate}}$, and therefore lower total $C$, even at matched description length.

### 2.2 Comparison Rules

**Definition 2.** All complexity comparisons are at **matched symmetry level**. The generic quadratic ($a_{ij}$ arbitrary) is compared to the generic quartic ($b_{ijkl}$ arbitrary). The isotropic quadratic ($m \cdot \delta_{ij}$) is compared to the isotropic quartic ($c \cdot \delta_{ij}\delta_{kl}$). Mixing symmetry levels — comparing an isotropic quartic to a generic quadratic — is not a valid comparison.

This rule prevents a trivial objection: one can always find a highly symmetric higher-order model with fewer parameters than a generic lower-order model. Such comparisons conflate the advantage of symmetry (which the framework already accounts for in Step 2) with the advantage of low polynomial degree (which is what the theorem establishes).

### 2.3 The Optimal Representation

**Definition 3.** The *optimal representation* is

$$X^* \;=\; \underset{X \in \mathcal{R}}{\operatorname{argmin}}\; C(X, \varepsilon)$$

where $\mathcal{R}$ is the space of all representations of the system.

The existence of $X^*$ is established by multiple independent results: rate-distortion theory [2], minimum description length [1], Kolmogorov complexity [3], and Solomonoff induction [4]. These are the same result in different mathematical languages: the optimal representation exists and is characterized by maximal compression at a given accuracy.

### 2.4 Relation to MDL

Description length $\mathcal{K}$ is not Kolmogorov complexity. Kolmogorov complexity $K(x)$ is uncomputable (by Chaitin's incompleteness theorem [5]). $\mathcal{K}$ is the computable MDL approximation: given a model class, it counts the bits needed to specify the model and the residuals. The predictive cost $C$ extends MDL by adding integration cost — a quantity MDL does not consider, because MDL was designed for static data, not dynamical systems.

tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## 3. Theorem: Minimum-Complexity Kinetic Energy

### 3.1 Setup

The argument that the optimal representation has Lagrangian structure proceeds in steps:

1. Predictive cost decomposes into degrees of freedom $\times$ coupling density $\times$ model cost per degree of freedom.
2. Symmetries reduce effective dimension (Noether's theorem — proven externally).
3. Sparse coupling enables parallel prediction (computational complexity — proven externally).
4. Quadratic kinetic energy has minimal total cost (proven below, for the time-reversible case).
5. The Lagrangian class is more compressed than generic ODEs for symmetric systems (structural argument — Section 4).

Steps 2 and 3 are standard results. Step 4 is the new contribution of this paper.

### 3.2 Statement

**Theorem 1** (Minimum-Complexity Kinetic Energy). *Let $K: T_X S \to \mathbb{R}$ be a kinetic energy function satisfying:*

1. *(Non-negativity)* $K(\dot{X}) \geq 0$ *for all* $\dot{X}$
2. *(Zero at rest)* $K(\dot{X}) = 0$ *if and only if* $\dot{X} = 0$
3. *(Real-analyticity)* $K$ *is* $C^\omega$ — *its Taylor series converges to it*
4. *(Time-reversibility)* $K(\dot{X}) = K(-\dot{X})$

*Then among all such functions, the quadratic form*

$$K = \frac{1}{2}\, a_{ij}\, \dot{X}^i \dot{X}^j, \quad a_{ij} \text{ positive definite}$$

*has the minimal total predictive cost* $C = \mathcal{K} + C_{\text{integrate}}$.

### 3.3 Proof

**(a) Taylor expansion.** By condition (3), $K$ has a convergent Taylor expansion about $\dot{X} = 0$:

$$K(\dot{X}) = K(0) + K_i\, \dot{X}^i + \frac{1}{2}\, K_{ij}\, \dot{X}^i \dot{X}^j + \frac{1}{3!}\, K_{ijk}\, \dot{X}^i \dot{X}^j \dot{X}^k + \frac{1}{4!}\, K_{ijkl}\, \dot{X}^i \dot{X}^j \dot{X}^k \dot{X}^l + \cdots$$

where $K_i = \partial K / \partial \dot{X}^i |_0$, $K_{ij} = \partial^2 K / \partial \dot{X}^i \partial \dot{X}^j |_0$, etc. Because $K$ is real-analytic, it is fully determined by these Taylor coefficients. This is the critical distinction from $C^\infty$: the function $f(x) = e^{-1/x^2}$ (extended by $f(0) = 0$) is $C^\infty$ with all-zero Taylor coefficients at the origin yet is not identically zero. The proof relies on $K$ being determined by its Taylor coefficients. We return to this point in Section 8.1.

**(b) Condition (2) eliminates the constant.** $K(0) = 0$.

**(c) Condition (4) eliminates all odd-order terms.** Time-reversibility requires $K(\dot{X}) = K(-\dot{X})$. The $k$-th order term transforms as $(-1)^k$ under $\dot{X} \to -\dot{X}$. Therefore all odd-order terms ($k = 1, 3, 5, \ldots$) vanish:

$$K(\dot{X}) = \frac{1}{2}\, a_{ij}\, \dot{X}^i \dot{X}^j + \frac{1}{4!}\, b_{ijkl}\, \dot{X}^i \dot{X}^j \dot{X}^k \dot{X}^l + \frac{1}{6!}\, c_{ijklmn}\, \dot{X}^i \dot{X}^j \dot{X}^k \dot{X}^l \dot{X}^m \dot{X}^n + \cdots$$

**(d) The minimum-cost solution has $a_{ij}$ positive-definite.** Near $\dot{X} = 0$, the quadratic term dominates. Conditions (1)–(2) require $K \geq 0$ with $K > 0$ when $\dot{X} \neq 0$, which forces $a_{ij}$ to be positive-semidefinite. If $a_{ij}$ is positive-semidefinite but not positive-definite, there exist directions where the quadratic form vanishes. Along those directions, higher-order terms are required to ensure $K > 0$ for $\dot{X} \neq 0$ (condition 2). These additional terms increase total cost (both $\mathcal{K}$ and $C_{\text{integrate}}$). Therefore the minimum-cost solution has $a_{ij}$ positive-definite — it avoids the need for higher-order corrections by handling all directions at the quadratic level.

**Note.** $K(\dot{x}, \dot{y}) = \dot{x}^2 + \dot{y}^4$ satisfies conditions (1)–(4) with positive-semidefinite (not positive-definite) quadratic form. This demonstrates that conditions (1)–(4) alone do not force positive-definiteness. The minimum-cost argument (not the conditions themselves) is what selects the positive-definite quadratic: the semidefinite alternative requires higher-order terms to cover the null directions, increasing total cost.

**(e) The quadratic form alone satisfies all four conditions.** Setting all higher-order coefficients to zero, $K = \frac{1}{2}\, a_{ij}\, \dot{X}^i \dot{X}^j$ with $a_{ij}$ positive-definite satisfies conditions (1)–(4). No higher-order terms are required.

**(f) Each higher-order term strictly increases description length.** The number of independent components of a fully symmetric rank-$d$ tensor in $n$ dimensions is $\binom{n+d-1}{d}$:

| Order $d$ | Independent components | Growth |
|---|---|---|
| 2 | $\frac{n(n+1)}{2}$ | $O(n^2)$ |
| 4 | $\frac{n(n+1)(n+2)(n+3)}{24}$ | $O(n^4)$ |
| 6 | $\binom{n+5}{6}$ | $O(n^6)$ |
| $d$ | $\binom{n+d-1}{d}$ | $O(n^d)$ |

The description length of a kinetic energy truncated at order $d$ is:

$$\mathcal{K}(K_{\leq d}) = \sum_{k=1}^{d/2} \binom{n + 2k - 1}{2k} \cdot \mathcal{K}(\text{one coefficient})$$

This is non-decreasing in $d$, with strict inequality at generic symmetry level. At maximally symmetric levels where $\mathcal{K}$ ties (e.g., isotropic quadratic vs. isotropic quartic, both requiring 1 parameter), the quadratic wins via $C_{\text{integrate}}$ (step (g)), not via $\mathcal{K}$. In either case, the minimum total cost is achieved at $d = 2$.

**(g) The quadratic form also minimizes integration cost.** The Euler-Lagrange equations derived from quadratic $K$ are linear in $\ddot{X}$:

$$a_{ij}\,\ddot{X}^j = -\frac{\partial V}{\partial X^i}$$

These equations are linear in $\ddot{X}$ (solvable for the acceleration in $O(n^2)$ via matrix inversion, or $O(n)$ if $a_{ij}$ is constant). On a Riemannian manifold where $a_{ij} = g_{ij}(X)$ depends on position, the equations of motion include Christoffel symbols and are nonlinear in $\dot{X}$, but remain linear in $\ddot{X}$ — the acceleration can still be isolated by matrix inversion. Quartic kinetic energy produces equations implicit in $\ddot{X}$ (cubic), requiring iterative solution at $O(n^3)$ or worse. The quadratic form has strictly lower integration cost than any higher-order form, even on curved manifolds. Even when $\mathcal{K}$ is matched (e.g., isotropic quadratic vs. isotropic quartic), the quadratic has lower total cost.

**(h) Conclusion.** The quadratic form $K = \frac{1}{2}\, a_{ij}\, \dot{X}^i \dot{X}^j$ is the unique minimum-total-cost kinetic energy satisfying conditions (1)–(4). It minimizes total cost $C = \mathcal{K} + C_{\text{integrate}}$: description length is minimized at generic symmetry level (step (f)), integration cost is strictly minimized at all symmetry levels (step (g)), and where description length ties (at high symmetry), integration cost breaks the tie. $\square$

### 3.4 What the Theorem Does Not Prove

The theorem establishes that the quadratic form is optimal *within the class of kinetic energies satisfying conditions (1)–(4)*. It does not, by itself, show that the Lagrangian framework is optimal among all dynamics specifications. That is the subject of Section 4.

tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## 4. The Lagrangian Compression Argument

### 4.1 The Question

Theorem 1 shows the quadratic is best *within* the Lagrangian framework. But why use a Lagrangian at all? A system with $n$ degrees of freedom can be specified by a generic ODE $\dot{X}^i = f^i(X)$ without any variational structure.

### 4.2 The Argument

Consider a system with $n$ degrees of freedom and $k$ continuous symmetries:

| Representation | What is specified | Parameters | Conservation laws |
|---|---|---|---|
| Generic ODE: $\dot{X}^i = f^i(X)$ | $n$ independent functions | $n \times p_f$ | Must be discovered and specified independently: $+k \times p_{\text{cons}}$ |
| Lagrangian: $L(X, \dot{X})$ | One function | $p_L$ | Automatic via Noether's theorem: $+0$ |

The Lagrangian representation compresses by exploiting structure: one function generates $n$ equations of motion AND $k$ conservation laws simultaneously. The generic ODE must specify $n$ equations independently and then discover and encode each conservation law separately.

The Lagrangian is cheaper when:

$$p_L \;<\; n \times p_f + k \times p_{\text{cons}}$$

For systems with $k > 0$ — any symmetry at all — the Lagrangian gets the conservation laws for free. The compression advantage scales with $k$.

**Prediction.** The advantage of Lagrangian over non-Lagrangian representations should scale with symmetry count:

- High symmetry ($k$ large): Lagrangian much more compressed; large advantage.
- No symmetry ($k = 0$): Lagrangian adds variational-principle overhead without compression benefit; advantage vanishes or reverses.
- This is testable: compare Lagrangian vs. neural ODE prediction accuracy at matched parameter count, across domains with different symmetry counts.

### 4.3 Status: Argument, Not Proof

This section presents a structural argument, not a formal proof. The compression ratio depends on how $p_L$ compares to $n \times p_f$ for specific function classes. A formal proof would require specifying the function class and computing description lengths rigorously. We identify this explicitly as a limitation: the claim that "Lagrangian beats ODE for symmetric systems" is well-motivated but not proven.

What the argument does establish is *when and why* the Lagrangian wins: when symmetries exist to exploit. It also predicts its own failure mode: for genuinely asymmetric systems, a flexible nonparametric model (e.g., a neural ODE) may match or beat the Lagrangian.

tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## 5. The Perturbative Hierarchy

### 5.1 When the Quadratic Model Is Insufficient

The theorem establishes that the quadratic form is the minimum-complexity kinetic energy. But if the true dynamics require accuracy $\varepsilon$ beyond what the quadratic model can deliver ($\varepsilon < \varepsilon_2$), the optimal representation includes corrections. These corrections have a specific, predictable structure.

### 5.2 First-Order Correction

The next correction is the quartic term:

$$K = \frac{1}{2}\, a_{ij}\, \dot{X}^i \dot{X}^j \;+\; \frac{1}{4!}\, b_{ijkl}\, \dot{X}^i \dot{X}^j \dot{X}^k \dot{X}^l$$

This adds $\binom{n+3}{4}$ parameters. The quartic correction is worth including only when the accuracy gain $\varepsilon_2 - \varepsilon_4$ exceeds the complexity cost of the additional parameters — the standard MDL tradeoff.

### 5.3 The Hierarchy

At each order, the correction adds parameters and improves accuracy:

| Order | Parameters added | Worth including when... |
|---|---|---|
| $d = 2$ (quadratic) | $\frac{n(n+1)}{2}$ | Always (minimum viable model) |
| $d = 4$ (quartic) | $\binom{n+3}{4}$ | $(\varepsilon_2 - \varepsilon_4) > \binom{n+3}{4} \cdot \text{cost per param}$ |
| $d = 6$ (sextic) | $\binom{n+5}{6}$ | $(\varepsilon_4 - \varepsilon_6) > \binom{n+5}{6} \cdot \text{cost per param}$ |

The parameter count grows as $O(n^d)$ while accuracy improvements typically decay geometrically (each correction captures a smaller residual). Therefore there is always a **finite optimal truncation order** $d^*$ beyond which adding terms costs more than they save.

### 5.4 The Bias-Variance Interpretation

This is the bias-variance tradeoff in Lagrangian form. The quadratic model has high bias (misses higher-order structure) but low variance (few parameters to overfit). Higher-order models reduce bias but increase variance. The optimal truncation $d^*$ balances them.

### 5.5 Physical Precedent

Physics instantiates this hierarchy exactly:

- **Newtonian mechanics** = the $d = 2$ Lagrangian. Sufficient for low velocities and weak fields.
- **Special relativity** = the first non-quadratic correction. The relativistic Lagrangian $L = -mc^2\sqrt{1 - v^2/c^2}$ expands as $L \approx -mc^2 + \frac{1}{2}mv^2 + \frac{1}{8}mv^4/c^2 + \cdots$ — quadratic plus quartic and higher corrections.
- **General relativity** = corrections from curved state-space geometry (the metric $g_{ij}$ is not flat).
- **Quantum field theory** = the full perturbative hierarchy with renormalization.

Each successive theory adds parameters and gains accuracy. The hierarchy is exactly the perturbative expansion of Theorem 1 applied to physical spacetime.

**Prediction.** The same hierarchy should appear in any domain. When the quadratic Lagrangian fails to predict at required accuracy, corrections take the form of higher-even-order terms in $\dot{X}$, with parameter counts growing polynomially at each order. This gives a specific, testable prediction about the *form* of model improvement in non-physical domains.

tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## 6. The Irreversible Case

### 6.1 The Open Problem

Theorem 1 requires time-reversibility (condition 4). Most social, biological, and institutional systems are fundamentally irreversible. What happens when condition 4 is dropped?

### 6.2 What Changes

Without time-reversibility, odd powers of $\dot{X}$ are permitted:

$$K(\dot{X}) = a_i\, \dot{X}^i + \frac{1}{2}\, a_{ij}\, \dot{X}^i \dot{X}^j + \frac{1}{3!}\, a_{ijk}\, \dot{X}^i \dot{X}^j \dot{X}^k + \cdots$$

The linear term $a_i\, \dot{X}^i$ has only $n$ parameters — fewer than the quadratic term's $\frac{n(n+1)}{2}$. It is simpler. But it violates condition (1): $a_i\, \dot{X}^i$ is negative for some directions of $\dot{X}$. Pure linear kinetic energy does not satisfy the physical constraints.

### 6.3 Three Possibilities

**(a) The quadratic form still wins.** Even without time-reversibility, the quadratic may remain the minimum-complexity option satisfying conditions (1)–(3), because the linear term violates non-negativity and the norm $|\dot{X}|$ violates real-analyticity at $\dot{X} = 0$. If so, the theorem extends to the irreversible case and the quadratic Lagrangian is universally optimal.

**(b) Finsler geometry.** If smoothness at $\dot{X} = 0$ is relaxed (allowing a kink at rest), then a Finsler metric $K = F(\dot{X})$ — positively homogeneous of degree 1 — is simpler than the quadratic form for $n > 1$. This would mean optimal representations of irreversible non-smooth systems have Finslerian, not Riemannian, geometry.

**(c) Mixed form.** The optimal kinetic energy for irreversible systems may be quadratic plus a linear correction:

$$K = \frac{1}{2}\, a_{ij}\, \dot{X}^i \dot{X}^j + a_i\, \dot{X}^i$$

provided the linear term is small enough that $K$ remains non-negative. This is exactly the form of a charged particle in an electromagnetic field: $L = \frac{1}{2}m|\dot{X}|^2 + q\mathbf{A} \cdot \dot{X} - q\phi$. The linear-in-velocity term breaks time-reversal symmetry. Irreversible systems may generically have this form — a quadratic base plus a linear symmetry-breaking correction.

### 6.4 How to Resolve This

**Theoretically:** Prove or disprove that the quadratic form is the minimum-complexity kinetic energy satisfying conditions (1)–(3) alone. The key lemma: is there a smooth, non-negative, positive-away-from-zero function with fewer than $\frac{n(n+1)}{2}$ parameters that is not quadratic?

**Empirically:** For known irreversible systems (biological evolution, institutional change, market dynamics), fit competing model forms and determine whether the best-fitting kinetic energy is quadratic (supporting (a)), Finslerian (supporting (b)), or quadratic-plus-linear (supporting (c)). This is directly testable with existing data; see Section 7, Test 4.

tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## 7. Empirical Testing Program

The theoretical results generate four specific, non-trivially testable predictions. Each uses existing data and standard tools. What is required is fitting competing model forms to real data and comparing predictive performance at matched complexity.

### 7.1 Test 1: The Kinetic Energy Form Competition

**Question.** For a given system, does the quadratic kinetic energy outpredict higher-order or non-quadratic forms at matched model complexity?

**Protocol.**
1. Choose a domain with rich longitudinal data (opinion dynamics, stock prices, organizational metrics, neural network training curves).
2. Define the state variable $X(t)$ and compute $\dot{X}(t)$.
3. Fit competing kinetic energy models:
   - **Model Q** (quadratic): $K = \frac{1}{2}\, a_{ij}\, \dot{X}^i \dot{X}^j$ — $\frac{n(n+1)}{2}$ parameters.
   - **Model Q+L** (quadratic + linear): $K = \frac{1}{2}\, a_{ij}\, \dot{X}^i \dot{X}^j + a_i\, \dot{X}^i$ — $\frac{n(n+1)}{2} + n$ parameters.
   - **Model Q4** (quartic): $K = \frac{1}{2}\, a_{ij}\, \dot{X}^i \dot{X}^j + \frac{1}{4!}\, b_{ijkl}\, \dot{X}^i \dot{X}^j \dot{X}^k \dot{X}^l$ — $\frac{n(n+1)}{2} + \binom{n+3}{4}$ parameters.
   - **Model F** (Finsler): $K = F(\dot{X})$ parameterized as a neural network — variable parameters.
4. Compare using BIC (Bayesian Information Criterion) or cross-validated prediction error.

**Predictions.** For time-reversible systems, Model Q wins. For irreversible systems, Model Q+L wins. Model Q4 wins only when genuinely nonlinear velocity dependence exists.

**Power analysis caveat.** For high-dimensional state spaces ($n \gg 1$), the quartic model has $O(n^4)$ parameters, making it difficult to fit without massive datasets. Test 1 is most informative for low-dimensional systems ($n \leq 10$) where all models can be adequately fit. For high-dimensional systems, dimensionality reduction (e.g., PCA on $\dot{X}$) may be needed before model comparison, but this introduces its own assumptions. We flag this as a practical limitation.

### 7.2 Test 2: The Perturbative Hierarchy

**Question.** When the quadratic model is insufficient, do corrections follow the predicted hierarchy?

**Protocol.**
1. Choose a system where the quadratic model is known to be imperfect (high-velocity particles as positive control; volatile markets as test case).
2. Fit the perturbative series: $K_2$, $K_4$, $K_6$, etc.
3. At each order, record parameter count $P(d)$, out-of-sample error $\varepsilon(d)$, and BIC.
4. Plot $\varepsilon(d)$ vs. $P(d)$.

**Predictions.** Error decreases with $d$ but at a geometrically slowing rate. A finite $d^*$ minimizes BIC. For most systems, $d^* \leq 4$.

**Positive control.** Newtonian mechanics data yields $d^* = 2$. Relativistic particle data yields $d^* = 4$.

### 7.3 Test 3: Symmetry Discovery

**Question.** Do the best-performing models for non-physical systems have symmetries, and do those symmetries correspond to conservation laws?

**Protocol.**
1. Fit the best model from Test 1 to a non-physical domain.
2. Compute the symmetry group of the fitted Lagrangian.
3. For each symmetry, compute the conserved quantity via Noether's theorem.
4. Check whether that quantity is approximately conserved in the data.

**Why this is non-trivial.** Domain-specific theories (psychology, economics) do not predict conservation laws. If conservation laws are found empirically — predicted by the mathematical structure of the optimal model — this constitutes evidence that the mechanical framework captures real structure, not merely notation.

### 7.4 Test 4: The Irreversibility Signature

**Question.** For irreversible systems, does the optimal kinetic energy have a linear-in-velocity correction with an interpretable direction?

**Protocol.**
1. Choose systems with known irreversibility (biological aging, institutional growth, one-directional market trends).
2. Fit Model Q and Model Q+L.
3. If Q+L wins, extract the linear term $a_i$ and interpret it as a drift vector field.
4. Check: does $a_i$ align with independently known irreversibility indicators?

**Predictions.** For reversible systems: $a_i \approx 0$. For irreversible systems: $a_i \neq 0$ and its direction corresponds to the system's arrow of time. The magnitude $|a_i|$ measures the degree of irreversibility.

### 7.5 What Would Constitute Proof or Disproof

| Outcome | Implication |
|---|---|
| Q wins broadly (Tests 1–2, $d^* = 2$) | Quadratic Lagrangian is broadly optimal; the principle holds empirically |
| Q+L wins for irreversible systems with interpretable $a_i$ (Test 4) | Irreversibility correction has the predicted form; framework extends naturally |
| $d^* > 2$ (Test 2) | Quadratic insufficient; higher-order structure matters; hierarchy predicts what is missing |
| Model F wins (Test 1) | State-space geometry is non-Riemannian; framework needs Finslerian generalization |
| No Lagrangian model beats a generic neural network | Lagrangian form adds no compression; the conjecture fails |
| Symmetries found with conservation laws (Test 3) | Mechanical structure captures real dynamics |

tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## 8. Discussion

### 8.1 Acknowledged Limitations

**Real-analyticity vs. smoothness.** The proof requires condition (3): real-analyticity ($C^\omega$), not merely smoothness ($C^\infty$). This is not a technicality. The function $f(x) = e^{-1/x^2}$ is $C^\infty$ with identically zero Taylor coefficients at the origin, yet is nonzero everywhere else. For such functions, the Taylor series does not determine the function, and the parameter-counting argument in step (f) fails. We assume real-analyticity because it is physically standard — the kinetic energies in all known physical theories are real-analytic — but we acknowledge that this is an assumption, not a derivation. If nature admits non-analytic kinetic energies, the theorem does not apply.

**Step 5 is an argument, not a proof.** The claim that Lagrangian specifications are more compressed than generic ODEs for symmetric systems (Section 4) is a structural argument. It identifies the mechanism (Noether compression) and makes a testable prediction (advantage scales with symmetry count). But it does not constitute a formal proof because the compression ratio depends on the specific function class, which we do not rigorously specify.

**Integration cost is not formally defined.** We use $C_{\text{integrate}}$ as though it has a unique value, but computational cost depends on the algorithm, the desired accuracy, the time horizon, and the hardware. A more rigorous treatment would define integration cost in terms of circuit complexity or arithmetic operations per unit prediction time. We use the $O(n)$ vs. $O(n^2)$ distinction as a coarse but informative comparison.

**MDL approximation and Fisher information.** The MDL approximation $\mathcal{K} \approx p \cdot \log(1/\delta)$ used here is the crudest bound. A refined analysis using the Fisher information metric on parameter space would account for the fact that parameters near singularities of the Fisher matrix cost fewer bits. This refinement could change the comparison between models at the same parameter count but different Fisher information structure. A full MDL or rate-distortion treatment remains to be done.

**Power analysis for empirical tests.** The four tests in Section 7 are well-specified but we have not performed formal power analyses. For Test 1 in particular, the quartic model's $O(n^4)$ parameter count means that distinguishing Model Q from Model Q4 requires datasets large enough to fit the quartic model without overfitting. For $n = 10$, the quartic has $\binom{13}{4} = 715$ parameters, requiring thousands of data points at minimum. For $n = 100$, the quartic is unfittable without additional structure. The tests are most informative in low-dimensional settings.

### 8.2 Relation to Existing Work

The idea that physical laws reflect optimal information processing has precursors:

- **Jaynes** [6] derived statistical mechanics from maximum entropy — the least-biased inference given constraints. Our approach extends this: the Lagrangian is the least-biased dynamics, not just the least-biased distribution.
- **Friston's free energy principle** [7] proposes that biological systems minimize variational free energy, which is a bound on surprise. Our framework is complementary: Friston asks what agents do; we ask what structure optimal descriptions have.
- **Tegmark's mathematical universe hypothesis** [8] proposes that reality IS mathematical structure. We make the weaker claim: optimal *descriptions* have specific mathematical structure. Whether reality shares that structure is a question we do not need to answer.
- **Wolpert's no-free-lunch theorems** [9] show that no learner is universally optimal. Our result is consistent: the Lagrangian is optimal only for systems with symmetries (Section 4.3). For genuinely asymmetric systems, the advantage vanishes — exactly as no-free-lunch predicts.
- **Wilson's renormalization group** [10] shows that effective theories at different scales have specific structural relationships. Our perturbative hierarchy (Section 5) is the Lagrangian analogue: each order captures structure at a different scale of velocity.
- **Hoel et al.'s causal emergence** [11] demonstrates that macroscopic descriptions can have more causal power than microscopic ones. This is a specific instance of our general claim: the representation that maximizes predictive compression has specific structural properties.

### 8.3 What This Means

What has been proven is narrow: among real-analytic, time-reversible kinetic energies satisfying basic physical constraints, the positive-definite quadratic form minimizes total predictive cost. What has been argued is broader: the Lagrangian framework compresses better than generic ODEs for symmetric systems. What is conjectured is broader still: optimal dynamical description generically has Lagrangian structure with quadratic kinetic energy.

If the conjecture holds — if the irreversible case resolves in favor of the quadratic form or the mixed form, and if Step 5 admits a formal proof — the implication would be foundational:

**The mathematical structure of physics may not be contingent.** An information-theoretically optimal description of a smooth, symmetric dynamical system would have Lagrangian structure with quadratic kinetic energy. Physics would not have discovered one possible description among many, but what optimal description looks like.

This does not mean reality "is" a Lagrangian. It would mean that any observer — human, alien, artificial — who seeks the most compressed predictive model of a smooth dynamical system will converge on the same mathematical form. The universality of physics would be not a fact about the universe but a fact about the structure of optimal representation.

The practical implication is for non-physical domains. If the conjecture holds, then the natural language for describing any dynamical system — economic, biological, social, cognitive — is Lagrangian mechanics. Not because these systems "are" physical, but because the Lagrangian form is what efficient description looks like. The gap between what is proven and what is conjectured is substantial, and the empirical program (Section 7) tests whether the conjecture holds directly.

### 8.4 The Central Open Question

The theorem is proven for time-reversible, real-analytic systems. The structural argument covers symmetric systems. What remains:

1. **The irreversible case** (Section 6): Does the quadratic form, or the quadratic-plus-linear form, remain optimal without time-reversibility?
2. **A formal proof of Step 5**: Does the Lagrangian framework provably minimize description length over generic ODEs, for a rigorously specified function class?
3. **Empirical validation**: Do the four tests (Section 7) confirm or refute the predictions?

Each of these is tractable. The first is a mathematical problem with three specific candidate answers. The second requires specifying the function class precisely enough to compute description lengths. The third requires fitting models to data — a computational task, not a conceptual one.

tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
  enableProgress: true
---

## References

[1] J. Rissanen, "Modeling by shortest data description," *Automatica*, vol. 14, pp. 465–471, 1978. doi:10.1214/aos/1176344611

[2] C. E. Shannon, "Coding theorems for a discrete source with a fidelity criterion," *IRE National Convention Record*, Part 4, pp. 142–163, 1959. doi:10.1109/TIT.1959.1055721

[3] M. Li and P. Vitányi, *An Introduction to Kolmogorov Complexity and Its Applications*, 3rd ed. Springer, 2008. doi:10.1007/978-0-387-49820-1

[4] R. J. Solomonoff, "A formal theory of inductive inference," *Information and Control*, vol. 7, pp. 1–22, 1964. doi:10.1016/S0019-9958(64)90131-7

[5] G. Chaitin, "On the length of programs for computing finite binary sequences," *Journal of the ACM*, vol. 13, pp. 547–569, 1966.

[6] E. T. Jaynes, "Information theory and statistical mechanics," *Physical Review*, vol. 106, pp. 620–630, 1957.

[7] K. Friston, "The free-energy principle: a unified brain theory?" *Nature Reviews Neuroscience*, vol. 11, pp. 127–138, 2010. doi:10.1038/nrn2787

[8] M. Tegmark, "The mathematical universe," *Foundations of Physics*, vol. 38, pp. 101–150, 2008.

[9] D. H. Wolpert and W. G. Macready, "No free lunch theorems for optimization," *IEEE Transactions on Evolutionary Computation*, vol. 1, pp. 67–82, 1997.

[10] K. G. Wilson, "Renormalization group and critical phenomena," *Physical Review B*, vol. 4, pp. 3174–3183, 1971. doi:10.1103/PhysRevB.4.3174

[11] E. P. Hoel, L. Albantakis, and G. Tononi, "Quantifying causal emergence shows that macro can beat micro," *Proceedings of the National Academy of Sciences*, vol. 110, pp. 19790–19795, 2013. doi:10.1073/pnas.1314922110

[12] E. Noether, "Invariante Variationsprobleme," *Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen*, pp. 235–257, 1918. doi:10.1080/00411457108231446
