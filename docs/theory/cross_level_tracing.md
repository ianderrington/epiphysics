---
title: "Cross-Level Tracing: From Fundamental Physics to Emergent Entities"
description: >-
  How does Epimechanics' atomic decomposition (bonds, loops, basins) connect across scales?
  What survives coarse-graining, what doesn't, and where the framework stands against existing
  multi-scale approaches.
date: 2026-03-17T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
contentType: article
mediaTypes:
  - text
series: "Epimechanics"
categories:
  - Philosophy
  - Physics
  - Systems thinking
tags:
  - Epimechanics
  - Foundations
  - Coarse-graining
  - Multi-scale
  - Causal structure
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
---

> **Context.** This document extends the [Structural Primitives](./00_atomic_structure.md) (Part 0.5). For the mechanical grammar, see [Part 1: Generalized Mechanics](./01_generalized_mechanics.md). For the Representational Efficiency principle, see [Part 5](./05_ontology_and_open_questions.md).

---

## Cross-Level Tracing: From Fundamental Physics to Emergent Entities

### Status: a research program, not a result

Epimechanics proposes that the atomic decomposition (bonds, loops, basins, $\dot{S}_{\text{int}}$, $\dot{R}_{\text{repair}}$) applies at every scale — from quarks to institutions. This is a conjecture with one confirmed case, a partial proof, and zero demonstrations at higher levels:

- **Physics → Chemistry**: established by quantum chemistry, not by Epimechanics' specific procedure. The derivation works because the microscopic Hamiltonian, state space, and coarse-graining kernel are all known.
- **The structural template**: the theorem that coarse-graining a Lagrangian system produces effective dynamics with potential, coupling, and thermodynamic structure (a structural descendant of the micro-grammar). This is a partial result — it shows structural inheritance, not computational tractability.
- **Chemistry → Institutions**: zero principled derivations exist at any intermediate step.

The framework is therefore a methodology for attempting cross-level derivation, together with a specific hypothesis about what to measure. It is not an established multi-scale theory.

### What the Lagrangian is and is not across scales

The Lagrangian is the **fundamental** grammar. At the microscopic level, dynamics are Hamiltonian: conservative, time-reversible, and subject to Noether's theorem (every continuous symmetry yields a conserved quantity).

At coarse-grained levels, integrating out fast degrees of freedom produces an **effective** grammar that is a structural descendant, not a copy. Specifically:

**What survives coarse-graining:**
- Potential landscape $V(X)$ — its shape (basins, barriers, gradients) determines the forces on macro-variables
- Coupling structure — the topology of which macro-variables influence which others ($T^i{}_j$ at the coarse level)
- Thermodynamic identities — entropy, free energy, fluctuation-dissipation relations

**What does not survive:**
- The variational principle — coarse-grained dynamics are generalized Langevin ($V$ + dissipation kernel + noise), not pure Euler-Lagrange
- Noether conservation — dissipative systems do not conserve energy in the Noether sense; they have entropy production. Claiming Noether conservation at the institutional level is wrong
- Time-reversibility — coarse-grained dynamics have a thermodynamic arrow

Calling this "the same grammar across scales" is misleading. The coarse-grained grammar inherits the potential landscape and coupling topology from the Lagrangian but adds dissipation and noise that have no Lagrangian origin. (Dissipation can be formally included via a Rayleigh function — see [Part 1, Section 4b](./01_generalized_mechanics.md) — but this is bookkeeping, not derivation from a variational principle.)

### V is about shape, not energy bookkeeping

$V(X)$ determines forces through its **shape**: where are the basins (stable configurations), barriers (transition states), and gradients (driving forces)? Its value lies in topology and geometry, not in converting everything to Joules. A kilogram of diamond and a kilogram of TNT have similar total energy but utterly different potential landscapes — different basin depths, different barrier heights, different causal profiles. The framework's own atomic decomposition (bonds, loops, basins) is about this structural information. Forced Joule-equivalence at higher levels (what is the Joule-value of institutional trust?) obscures rather than clarifies.

### Multiple realizability and structural realism

The same institutional function can be realized by different micro-configurations: a team coordinates via email, phone, or face-to-face meetings. The macro "bond" is defined by its functional role (information exchange enabling coordination), not by its physical implementation. This means the coarse-grained description is **autonomous** from the micro description — the macro level has its own structural identity.

This framework adopts **functional-structural realism**: the atomic decomposition describes the abstract structural skeleton of entities — bonds, loops, basins — which is multiply realizable across substrates. This weakens any claim to derive macro from micro (the derivation path is many-to-one, so it cannot be run in reverse to predict the specific micro-realization). But it makes the universality claim coherent: the same structural template applies because it describes the functional architecture, not the physical implementation.

### Positioning against existing frameworks

The insight that multi-scale systems have structure worth formalizing is not new. Epimechanics should be positioned honestly against existing work:

- **Simon's nearly decomposable systems** [(1962)](https://doi.org/10.2307/2025193): the observation that "some bonds average out, some survive" coarse-graining is Simon's core insight, stated sixty years earlier. Epimechanics adds the specific six-quantity decomposition as a hypothesis about *what* to measure at each level.
- **Rosen's (M,R)-systems** [(1991)](https://doi.org/10.7312/rose92974): closure to efficient causation is the category-theoretic version of auto-causal loops ($\rho_{\text{ac}} > 0$). Epimechanics adds the quantitative decomposition (basin depth, entropy production, repair rate) that Rosen's categorical framework lacks, but inherits Rosen's difficulty with empirical operationalization.
- **Sloppy models** [(Transtrum, Machta, Sethna, 2013)](https://doi.org/10.1103/PhysRevE.83.036701): parameter space compression explains why effective theories work — most microscopic parameters are irrelevant to macro behavior. The Representational Efficiency principle may be the same insight in different notation. If it is, Epimechanics should say so and identify what, if anything, the Lagrangian framing adds beyond the information-geometric formulation. This remains an open question.
- **Empowerment** [(Klyubin, Polani, Nehaniv, 2005)](https://doi.org/10.1007/11553090_12): an information-theoretic measure of an agent's causal capacity over its environment, closely related to the shape of $V$ (how much of state space can the agent access). Epimechanics' $V$-landscape framework is structurally similar; the specific relationship has not been worked out.

### Status of cross-level derivation

| Transition | Status | Note |
|---|---|---|
| Physics → Chemistry | **Established** (by quantum chemistry — not by Epimechanics' procedure) | The atomic decomposition is consistent with this transition but was not used to derive it |
| Chemistry → Biology | **Partial** (molecular dynamics; origin of life unsolved) | Molecular simulations bridge parts of this gap; no end-to-end derivation of organismal dynamics from chemistry |
| Biology → Psychology | **Correlates exist** (computational neuroscience; no principled derivation) | Neural correlates of psychological states exist, but correlates are not derivations |
| Psychology → Institutions | **Unsolved** (no accepted coarse-graining method) | Agent-based models and game theory address fragments; no principled methodology |
| Ruliad → Physics | **Speculative** (no derivation exists) | Wolfram's computational universe hypothesis; no demonstrated path to known physics |

### Falsification conditions

The cross-level conjecture is falsifiable by at least two tests:

1. **Eigenstructure correlation test.** Measure response matrices (how perturbations propagate) at adjacent scales in a specific system. If the eigenstructure of these matrices shows no statistical correlation between levels — if the macro response matrix cannot be predicted from the micro bond structure — then the structural template fails for that transition.

2. **Persistence prediction test.** The atomic decomposition predicts that entity persistence duration scales with $\dot{R}_{\text{repair}} / \dot{S}_{\text{int}}$ (repair rate relative to entropy production). If this ratio fails to predict persistence across two or more levels in a given system, the decomposition is not universal.

### What Epimechanics specifically adds

Beyond existing multi-scale frameworks, Epimechanics contributes four specific hypotheses:

1. **The atomic decomposition** — six quantities (bond, strength, loop order, basin depth, $\dot{S}_{\text{int}}$, $\dot{R}_{\text{repair}}$) as a concrete, falsifiable claim about what to measure at each level. This is more specific than Simon's near-decomposability and more quantitative than Rosen's categorical closure.

2. **The Representational Efficiency principle** — connecting optimal representation to mechanical structure. This may reduce to sloppy models' parameter compression in a Lagrangian frame; if so, the contribution is the mechanical interpretation, not a new result. If it generates predictions that sloppy models do not, it is a genuine addition. This has not been tested.

3. **Computation as renormalization survival** — defining computation as the process by which structure persists across coarse-graining. This connects computation to scale in a way that is precise enough to test (does computational capacity correlate with renormalization-group fixed-point structure?) but has not been tested.

4. **The belief field framework** — connecting prediction error to the potential landscape ($V$ as the cost of wrong predictions). This is a specific operationalization of predictive processing in mechanical language; its relationship to existing free-energy-principle formulations [(Friston, 2010)](https://doi.org/10.1038/nrn2787) should be worked out explicitly.

Whether these are substantive contributions or relabeling depends on empirical test — which is the work of epiphysics ([Part 0, Section 5](./00_prelude.md)).

---

> **See also:** [Structural Primitives](./00_atomic_structure.md) (Part 0.5) for the six atomic quantities. [Part 1: Generalized Mechanics](./01_generalized_mechanics.md) for the Lagrangian framework and Rayleigh dissipation. [Part 5](./05_ontology_and_open_questions.md) for the Representational Efficiency principle.
