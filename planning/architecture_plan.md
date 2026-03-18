# Physics of Metaphysics: Complete Architecture and Restructuring Plan

## Context and Motivation

### What exists today

The Physics of Metaphysics is a blog series at:
`docs/musings/existence_physics_and_life/physics-for-metaphysics/`

It currently consists of 8 published posts + 1 index + 1 working notes file, totaling ~3,900 lines of published content. All files are in a single flat directory.

| Current File | series_order | Lines | Content Summary |
|---|---|---|---|
| `index.md` | 0 | 182 | Series overview, navigation table, key equations reference |
| `physics_as_metaphysics_01_generalized_mechanics.md` | 1 | 627 | State X, velocity, mass M, momentum, force F=Ma+dM/dt*v, energy, Lagrangian, coupling k and T^i_j, fields Phi, thermodynamics, fluid dynamics, phase transitions |
| `physics_as_metaphysics_01b_uncertainty_coordinates_relativity.md` | 1.5 | 286 | Observer effects, coordinate incommensurability between entities, reference frame relativity |
| `physics_as_metaphysics_01c_thermodynamic_emergence_of_life.md` | 1.7 | 378 | Life as thermodynamic phase transition, dissipative structures, autocatalysis, information coupling criterion |
| `physics_as_metaphysics_02_meta_entities.md` | 2 | 255 | Causal emergence (Hoel), near-decomposability (Simon), synergy (Daniels/Krakauer/Flack), three substrates (physical/informational/mimetic), extended mind, case studies |
| `physics_as_metaphysics_03_intelligence_consciousness_agency.md` | 3 | 279 | Intelligence as predictive accuracy I(E), consciousness tensor C_ijk (allo/auto x content x temporal), agency A = coupling x meta-rep x consciousness |
| `physics_as_metaphysics_04_time_and_soul.md` | 4 | 340 | Local time T_local (causal coherence duration), non-local time (representational footprint R(E,t)), soul = R(E,t) as vector-valued function, sign/amplitude/duration/breadth, antifragility, mimetic fitness |
| `physics_as_metaphysics_05_ontology_and_open_questions.md` | 5 | 525 | Full ontology glossary, Wolfram/Ruliad connection, Assembly Theory connection, 9 open questions, 16 testable predictions, governance applications, coda |
| `physics_as_metaphysics_06_decision_and_trajectory.md` | 6 | 588 | POMDP formalization (state/action/observation/transition/reward mapping), belief states, Bayesian updating, policy, value functions, sociological application, cooperative/competitive strategy, case studies |
| `physics_as_metaphysics_working_notes.md` | N/A | 494 | Draft assembly notes, agent outputs |

**Images**: 14 SVG diagrams + 7-8 PNG cover images in `images/` subdirectory.

### Why restructure

1. **The series jumped ahead of its foundations.** Parts 1-4 build from mechanics to entities to mind to soul. Then Part 6 leaps to POMDP decision theory and game theory without establishing: information theory (Shannon entropy, mutual information), nonlinear dynamics and chaos (attractors, bifurcations, Lyapunov exponents), evolution and selection (replicator dynamics, fitness landscapes, ESS), logic and computation (Turing machines, Godel limits, computational complexity), or probability and Bayesian inference (which Part 6 assumes but never derives).

2. **Part 5 was written as "the final part" but isn't.** Parts 1c and 6 were added after it. The synthesis chapter must be last.

3. **Individual files are too large.** Part 1 (627 lines) covers ~8 distinct topics. Part 6 (588 lines) covers individual decision, multi-agent systems, and game theory. These need splitting.

4. **The series doesn't systematically engage with established theories.** It cites many frameworks (IIT, GWT, Active Inference, Assembly Theory, etc.) but doesn't formally position itself against them — what it shares, what it adds, where it differs.

5. **The structure must accommodate future content.** New chapters on foundations, emergence, evolution, and strategy need homes. A flat file structure can't scale.

### What the site supports technically

From codebase investigation:

- **Routing**: `src/app/[section]/[...slug]/page.tsx` — supports unlimited nesting depth. A file at `physics-for-metaphysics/part-01/ch-01/01-section.md` renders at the corresponding URL.
- **Collection pages**: Any directory with an `index.md` renders as a collection page with card grids of child items. Breadcrumb navigation is automatic.
- **Ordering**: `.pages` YAML config files control ordering within directories. Numbered filename prefixes (`01-`, `02-`) provide alphabetical fallback.
- **Series frontmatter**: `series` and `series_order` fields are parsed via gray-matter but not formally typed in TypeScript. They pass through to the frontend.
- **No code changes needed** for the restructuring — the site already handles nested directories, collection rendering, and breadcrumbs.

### Design principles

- **Preserve all existing content.** No prose is deleted — it is split and relocated.
- **Each section = one markdown file** of comfortable reading length (~100-400 lines).
- **Stub files for unwritten content.** New sections start as `draft: true` files with a one-paragraph description of what will go there. This creates the skeleton for iterative development.
- **Dependency ordering.** Each part builds on the previous. No concept is used before it is defined.
- **Positioning against established theories.** Each chapter includes a "Positioning" note identifying which established frameworks it relates to and how.

---

## Complete Table of Contents

8 Parts, 25 Chapters, ~104 Sections. Each section = one markdown file.

**[EXISTS]** = content already written in current files.
**[NEW]** = needs to be written (stub initially).
**Source** = which current file and section the content comes from.

---

### Part I: Mathematical Foundations [MOSTLY NEW]

*Purpose: Establish the formal tools the framework requires. Not original work — but sets notation, identifies which mathematical results carry over to abstract state spaces, and which don't. Grounds everything that follows.*

**Chapter 1: Logic and Computation** [NEW]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 1.1 | Formal systems, consistency, completeness | NEW | — | Hilbert's program, what formal systems can and cannot do |
| 1.2 | Turing machines and computability | NEW | — | What can be computed; Church-Turing thesis |
| 1.3 | Godel's incompleteness | NEW | Extract from Part 5 S3.9 | Self-referential limits; currently buried in open questions |
| 1.4 | Computational complexity | NEW | — | P/NP, PSPACE; grounds the intractability of POMDP solving (Ch 18) |

*Positioning: vs. Constructor Theory (Deutsch/Marletto) — computation as fundamental vs. construction as fundamental. vs. Wolfram's computation universality.*

**Chapter 2: Information Theory** [NEW]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 2.1 | Shannon entropy and surprise | NEW | — | Quantifying uncertainty; connects to thermodynamic entropy (Ch 8) |
| 2.2 | Mutual information and channel capacity | NEW | — | Quantifying communication between entities |
| 2.3 | Kolmogorov complexity and compression | NEW | — | Quantifying structure; connects to Schmidhuber's compression progress (Ch 14) |
| 2.4 | Causal information and effective information | NEW | — | Hoel's EI; currently assumed in Part 2 but never derived |

*Positioning: Shannon -> Kolmogorov -> Hoel pipeline. Relation to Friston's free energy (variational free energy as information-theoretic quantity). Why EI is the right criterion for causal emergence.*

**Chapter 3: Dynamical Systems and Chaos** [NEW]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 3.1 | Linear vs. nonlinear dynamics | NEW | — | When superposition fails; why social systems are inherently nonlinear |
| 3.2 | Attractors, basins, and bifurcations | NEW | — | The geometry of trajectories; attractor landscapes |
| 3.3 | Chaos | NEW | — | Sensitive dependence, Lyapunov exponents, strange attractors |
| 3.4 | Stability analysis | NEW | — | When systems resist vs. amplify perturbation; Jacobian eigenvalues |

*Positioning: vs. Strogatz (Nonlinear Dynamics and Chaos), Lorenz, Mandelbrot. Direct connection to social phase transitions already discussed in Part 1 S7 but without formal grounding.*

**Chapter 4: Probability and Bayesian Inference** [NEW]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 4.1 | Probability as degree of belief | NEW | — | Bayesian vs. frequentist; de Finetti, Jaynes |
| 4.2 | Bayes' rule and belief updating | NEW | — | The mechanics of learning; grounds Ch 18's belief state formalism |
| 4.3 | Prior, likelihood, posterior | NEW | — | The anatomy of inference |
| 4.4 | Bayesian networks and causal models | NEW | — | Pearl's do-calculus; grounds the counterfactual R(E,t) in Ch 17 |

*Positioning: vs. frequentist statistics; vs. Pearl's causal inference; connection to active inference (Friston).*

---

### Part II: Generalized Mechanics [EXISTS — RESTRUCTURE]

*Purpose: The physics skeleton extended to abstract state spaces. This is the core original contribution of the series: showing that the mathematical structure of physics (state, force, energy, coupling, fields) applies to any state space.*

**Chapter 5: State, Motion, and Mass** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 5.1 | The state variable X and state space S | EXISTS | Part 1 S1 (lines ~62-100) | X as universal state variable; S as manifold |
| 5.2 | Velocity dX/dt | EXISTS | Part 1 S2 (lines ~100-130) | Rate of change as diagnostic |
| 5.3 | Generalized mass M | EXISTS | Part 1 S2b (lines ~130-180) | Causal density as inertia; M = integral of rho_causal |
| 5.4 | Momentum p = Mv | EXISTS | Part 1 S2b (lines ~180-200) | Resistance to trajectory deflection |

**Chapter 6: Force, Energy, and Action** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 6.1 | Force F = Ma + dM/dt * v | EXISTS | Part 1 S3 (lines ~200-270) | The full force equation with variable-mass cross-term |
| 6.2 | Energy and the Lagrangian L = T - V | EXISTS | Part 1 S4, S4b (lines ~270-390) | Kinetic, potential, internal energy; E=Mc^2 generalized |
| 6.3 | The action principle and Noether's theorem | EXISTS | Part 1 S4b (lines ~350-390) | Symmetries -> conservation laws |
| 6.4 | Conjugate pairs and uncertainty bounds | EXISTS | Part 1b S1.5 | Position-momentum and energy-time uncertainty |

*Positioning: vs. classical Lagrangian/Hamiltonian mechanics. What carries over exactly and what is analogical.*

**Chapter 7: Coupling, Fields, and Interaction** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 7.1 | Scalar coupling k | EXISTS | Part 1 S5a (lines ~390-420) | Sensitivity to field forces |
| 7.2 | The coupling tensor T^i_j | EXISTS | Part 1 S5b (lines ~420-460) | Cross-domain propagation; ACE studies as measurement |
| 7.3 | Fields Phi(x) | EXISTS | Part 1 S6 (lines ~460-490) | Domains of influence; culture/reputation/information as fields |
| 7.4 | Field sources and mean-field construction | EXISTS | Part 1 S6b (lines ~490-515) | Fields generated by entities; mean-field approximation |

*Positioning: vs. gauge field theory; vs. lattice models; what "field" means in abstract state spaces.*

**Chapter 8: Many-Body Mechanics** [EXISTS + NEW]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 8.1 | Thermodynamic quantities | EXISTS | Part 1 S7 (lines ~515-560) | Temperature, pressure, entropy, free energy in state space |
| 8.2 | Fluid dynamics of state-space flow | EXISTS | Part 1 S7 (lines ~560-590) | Navier-Stokes analogue; viscosity; Reynolds number |
| 8.3 | Phase transitions and critical phenomena | EXISTS | Part 1 S7 (lines ~590-615) | Spontaneous symmetry breaking in many-body systems |
| 8.4 | Nonlinearity and chaos in state space | NEW | — | Connect Ch 3 (chaos theory) to generalized mechanics |
| 8.5 | Network dynamics and graph-theoretic structure | NEW | — | Barabasi, Newman; network topology effects on dynamics |

*Positioning: vs. statistical mechanics (Boltzmann, Gibbs); vs. Ising models; vs. network science (Barabasi). Why social phase transitions follow the same mathematics as physical ones.*

**Chapter 9: Uncertainty, Coordinates, and Relativity** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 9.1 | The observer effect | EXISTS | Part 1b S1 (lines ~65-140) | Measurement changes state; Heisenberg/Bohr/Breuer |
| 9.2 | Coordinate relativity | EXISTS | Part 1b S2 (lines ~140-210) | Different entities have incommensurable state spaces |
| 9.3 | Reference frame relativity | EXISTS | Part 1b S3 (lines ~210-286) | Forces and rates are observer-relative |

---

### Part III: Emergence and Life [PARTIALLY EXISTS]

*Purpose: How structure arises from dynamics, and when that structure becomes alive. Bridges the abstract mechanics of Part II to the concrete entities of Part IV.*

**Chapter 10: Self-Organization and Emergence** [NEW]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 10.1 | Dissipative structures | NEW | — | Prigogine; order from energy throughput |
| 10.2 | Autocatalysis and positive feedback | NEW | — | When systems bootstrap themselves; Kauffman's autocatalytic sets |
| 10.3 | Causal emergence | NEW | Formalize from Part 2 S1 | Hoel/Simon/Daniels criteria; currently cited but not derived |
| 10.4 | Near-decomposability and hierarchy | NEW | Formalize from Part 2 S1 | Simon's architecture of complexity |

*Positioning: vs. Santa Fe school (Holland, Kauffman, Gell-Mann); vs. Assembly Theory (Cronin/Walker); what "emergence" means formally vs. informally.*

**Chapter 11: The Thermodynamic Emergence of Life** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 11.1 | Life as phase transition | EXISTS | Part 1c S1-2 | Energy rate density; critical threshold |
| 11.2 | The information coupling criterion | EXISTS | Part 1c S3 | What distinguishes life from non-living dissipative structures |
| 11.3 | From chemistry to biology | EXISTS | Part 1c S4 | Autocatalytic closure; origin of life |
| 11.4 | Predictions | EXISTS | Part 1c S5 | Five falsifiable predictions |

**Chapter 12: Evolution and Selection** [NEW]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 12.1 | Replicator dynamics | NEW | — | Mathematics of differential reproduction |
| 12.2 | Fitness landscapes | NEW | — | Peaks, valleys, ruggedness (Kauffman, Wright) |
| 12.3 | Evolutionary stable strategies | NEW | — | Maynard Smith; Nash equilibria in evolutionary context |
| 12.4 | Multi-level selection | NEW | — | Genes, organisms, groups, meta-entities (Wilson, Nowak) |
| 12.5 | Cultural evolution | NEW | — | Memetics as evolutionary dynamics; connects to Ch 17 mimetic fitness |

*Positioning: vs. Price equation; vs. inclusive fitness (Hamilton); vs. cultural evolution (Boyd/Richerson, Henrich). This chapter provides the formal bridge from life (Ch 11) to memetic fitness (Ch 17) and cooperative strategy (Ch 19).*

---

### Part IV: Entities and Mind [EXISTS — RESTRUCTURE]

*Purpose: What things are, what they know, and what they do. Builds on emergence (Part III) to define entity-ness, intelligence, consciousness, and agency.*

**Chapter 13: Entities** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 13.1 | Auto-causal density rho_ac | EXISTS | Part 1 S1b + Part 2 S1 | The criterion for entity-ness; strange loops |
| 13.2 | When aggregates become entities | EXISTS | Part 2 S1 | Three criteria: Hoel (EI), Simon (near-decomposability), Daniels/Krakauer/Flack (synergy) |
| 13.3 | Meta-entities and three substrates | EXISTS | Part 2 S2 | Physical, informational, mimetic; coupling among substrates |
| 13.4 | The extended mind and entity boundaries | EXISTS | Part 2 S4 | Clark/Chalmers; dynamic boundaries; kappa_c threshold |
| 13.5 | Case studies | EXISTS | Part 2 S3, S5 | Religion, scientific method, dying language, AI; implications |

*Positioning: vs. IIT's exclusion principle (framework allows distributed consciousness, IIT doesn't); vs. mereology; vs. Latour's ANT (non-human actants).*

**Chapter 14: Intelligence and Consciousness** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 14.1 | Intelligence as predictive accuracy I(E) | EXISTS | Part 3 S1 | Domain-relative; connects to Legg-Hutter, Schmidhuber |
| 14.2 | Consciousness as representational scope C | EXISTS | Part 3 S2 | Scope and accuracy of internal model of X |
| 14.3 | The consciousness tensor C_ijk | EXISTS | Part 3 S2 | i=target (self/other/collective), j=content type, k=temporal horizon |
| 14.4 | Allo-representation and auto-modeling | EXISTS | Part 3 S2 | Theory of mind vs. self-awareness; independence of dimensions |

*Positioning: vs. GWT (Baars/Dehaene), HOT (Rosenthal), IIT (Tononi), Predictive Processing (Friston/Clark/Seth). Each is formally compared in existing text.*

**Chapter 15: Agency** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 15.1 | The agency formula | EXISTS | Part 3 S3 | A = C_coupling x mu_meta x C_consciousness; multiplicative |
| 15.2 | Moral responsibility | EXISTS | Part 3 S3 | Continuous, decomposable; responsibility tracks agency |
| 15.3 | The enactivist tension | EXISTS | Part 3 S3 | Minimal agency (Maturana/Varela) vs. deliberate agency |
| 15.4 | AI agency | EXISTS | Part 3 S3 | Empirical tests for C_AI > 0; three candidate tests |

*Positioning: vs. enactivism (Varela, Di Paolo); vs. 4E cognition; vs. Dennett's intentional stance.*

---

### Part V: Time and Legacy [EXISTS — RESTRUCTURE]

*Purpose: What things leave behind. How long entities maintain causal coherence, and how long they matter beyond it.*

**Chapter 16: Local and Non-Local Time** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 16.1 | Local time T_local | EXISTS | Part 4 S1 | Duration of causal coherence; kappa_s threshold |
| 16.2 | Non-local time and representational footprint R(E,t) | EXISTS | Part 4 S2 | R = sum_j K_Ej * delta_X_j; counterfactual causal presence |
| 16.3 | Empirical grounding | EXISTS | Part 4 S2 | Michel/Ngrams (73-yr half-life), Weng/meme lifetimes, h-index |

**Chapter 17: Soul** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 17.1 | Formal definition | EXISTS | Part 4 S3 | Soul(E) = R(E,t): [0,inf) -> R^m; vector-valued |
| 17.2 | Sign, amplitude, duration, breadth | EXISTS | Part 4 S3 | Three independent dimensions; sign requires value basis v |
| 17.3 | Antifragility and soul trajectory curvature | EXISTS | Part 4 S3 | d^2R/dt^2 detects productive negatives; Taleb/hormesis |
| 17.4 | Soul-agency connection and mimetic fitness | EXISTS | Part 4 S4 | Dawkins' three dimensions; pattern mass; Bass diffusion |
| 17.5 | Case studies | EXISTS | Part 4 S5 | Meme, person, religion, AI system |

*Positioning: vs. Parfit's Relation R (extended from intra-personal to inter-personal); vs. Dawkins' memetics (mimetic fitness formalized).*

---

### Part VI: Decision and Strategy [PARTIALLY EXISTS]

*Purpose: How things choose and interact. The interior view — what the entity faces when it must act under uncertainty.*

**Chapter 18: Decision Under Uncertainty** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 18.1 | The POMDP structure | EXISTS | Part 6 S1 | Full mapping: X->state, P_E->action, C->observation, I->transition, R->reward |
| 18.2 | The belief state and Bayesian dynamics | EXISTS | Part 6 S2 | b(s) = P(S_t=s|history); Bayesian filter; belief inertia as M_b |
| 18.3 | Policy | EXISTS | Part 6 S3 | pi(b)->a; System 1 vs System 2; exploration-exploitation |
| 18.4 | Value functions and trajectory optimization | EXISTS | Part 6 S4 | V*(b) = expected soul; Bellman equation; self-determination ratio |

*Positioning: vs. rational choice theory (homo economicus); vs. prospect theory (Kahneman/Tversky); vs. bounded rationality (Simon); vs. active inference (Friston — the POMDP as free energy minimization).*

**Chapter 19: Interaction and Game Theory** [PARTIALLY EXISTS + NEW]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 19.1 | Two-entity interaction dynamics | NEW | — | Formal treatment of pairwise coupling; precedes game theory |
| 19.2 | N-entity systems and emergence of strategy | NEW | — | When does strategic behavior emerge from mechanics? |
| 19.3 | Competitive dynamics | EXISTS | Part 6 S7.1-7.2 | Zero-sum, minimax, arms races, predator-prey |
| 19.4 | Cooperative dynamics | EXISTS | Part 6 S7.3-7.4 | Nash bargaining, reciprocity, credible commitment |
| 19.5 | Mixed-motive interactions | EXISTS | Part 6 S7.4 | Schelling; R_common + R_private decomposition |

*Positioning: vs. von Neumann/Morgenstern (game theory foundations); vs. Nash (equilibrium); vs. Axelrod (evolution of cooperation); vs. Maynard Smith (ESS — connects to Ch 12); vs. mechanism design (Hurwicz, Myerson).*

**Chapter 20: Strategic Consciousness and Institutional Design** [PARTIALLY EXISTS + NEW]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 20.1 | Strategic consciousness requirements | EXISTS | Part 6 S7.6 | Recursive modeling depth; cognitive hierarchy (Camerer) |
| 20.2 | Strategy and soul | EXISTS | Part 6 S7.5 | Competitive vs. cooperative legacies; Nowak's five mechanisms |
| 20.3 | Mechanism design | NEW | — | Engineering coupling structures for cooperation |
| 20.4 | Institutional design | NEW | — | Applied generalized mechanics: how to build institutions that sustain cooperation |

---

### Part VII: Society and Prediction [PARTIALLY EXISTS + NEW]

*Purpose: Collective dynamics at civilizational scale. The macro view — societies as many-entity systems with measurable thermodynamic quantities.*

**Chapter 21: Collective Dynamics** [PARTIALLY EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 21.1 | Sociological variables as POMDP quantities | EXISTS | Part 6 S5 | State/action/observation/norms/institutions mapping table |
| 21.2 | Belief divergence and polarization | EXISTS | Part 6 S2.4 | Aumann's theorem; echo chambers; Delta_b_ij |
| 21.3 | Social phase transitions | EXISTS | Part 5 S4 (P5-P7) | Early warning signals; Reynolds number; turbulence |
| 21.4 | Cliodynamics | EXISTS | Scattered (Parts 2,3,6) | Turchin's 5-variable model; secular cycles |
| 21.5 | Case studies | EXISTS | Part 6 S6 | Person choosing career, nation in crisis, AI selecting outputs |

*Positioning: vs. Turchin (cliodynamics); vs. Epstein/Axtell (agent-based models); vs. computational social science.*

**Chapter 22: Governance and Applied Framework** [PARTIALLY EXISTS + NEW]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 22.1 | Landscape vs. force interventions | EXISTS | Part 5 S4 (P10) | Reshaping V(X) vs. applying F directly |
| 22.2 | Coupling circuit-breakers | EXISTS | Part 5 S4 (P11) | Safety nets as off-diagonal T^i_j reduction |
| 22.3 | Viscosity engineering | EXISTS | Part 5 S4 (P12) | Too low -> turbulence; too high -> pressure buildup |
| 22.4 | The early-warning dashboard | EXISTS | Part 5 S4 (P13) | Temperature, pressure, correlation length, Reynolds number |
| 22.5 | AI governance | NEW | — | Meta-entity status of AI; accountability framework |

---

### Part VIII: Synthesis [EXISTS — RESTRUCTURE + EXPAND]

*Purpose: The assembled framework, its connections to fundamental physics, and honest assessment of what remains open. Must be last.*

**Chapter 23: The Full Ontology** [EXISTS]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 23.1 | Complete definitional glossary | EXISTS | Part 5 S1 (lines 58-237) | Every concept restated in most precise form |
| 23.2 | Concept dependency map | EXISTS | Part 5 S1 | SVG diagram of concept dependencies |

**Chapter 24: Connections to Fundamental Physics** [EXISTS + NEW]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 24.1 | The Wolfram/Ruliad connection | EXISTS | Part 5 S2 (lines 239-268) | Structural correspondences table |
| 24.2 | Assembly Theory connection | EXISTS | Part 5 S2 (lines 269-295) | Assembly index as lower bound on M |
| 24.3 | Constructor Theory | NEW | — | Deutsch/Marletto; possible vs. impossible transformations |
| 24.4 | Category-theoretic formulation | NEW | — | Optional/advanced; functorial structure of the framework |

*Positioning: Explicit comparison table for each: what the framework shares with, adds to, and differs from each foundational theory.*

**Chapter 25: Open Questions and Research Program** [EXISTS + EXPAND]

| Section | Title | Status | Source | Notes |
|---|---|---|---|---|
| 25.1 | Open questions | EXISTS | Part 5 S3 (lines 298-378) | Currently 9; expand with questions from new chapters |
| 25.2 | Testable predictions | EXISTS | Part 5 S4 (lines 382-466) | Currently P1-P16; expand |
| 25.3 | Operationalization | EXISTS | Part 5 S4 (lines 493-507) | Data requirements and research program |
| 25.4 | Coda | EXISTS | Part 5 S5 (lines 511-525) | Self-referential closure |

---

## Status Summary

| Part | Chapters | Sections | Exists | New | Key Gap |
|------|----------|----------|--------|-----|---------|
| I. Math Foundations | 4 | 15 | ~1 | ~14 | Entire part needs writing |
| II. Gen. Mechanics | 5 | 20 | ~17 | ~3 | Network dynamics, chaos in state space |
| III. Emergence & Life | 3 | 13 | ~4 | ~9 | Self-organization, evolution/selection |
| IV. Entities & Mind | 3 | 14 | ~14 | ~0 | Complete (restructure only) |
| V. Time & Legacy | 2 | 8 | ~8 | ~0 | Complete (restructure only) |
| VI. Decision & Strategy | 3 | 14 | ~9 | ~5 | Two-entity dynamics, mechanism/institutional design |
| VII. Society & Prediction | 2 | 10 | ~7 | ~3 | AI governance |
| VIII. Synthesis | 3 | 10 | ~8 | ~2 | Constructor theory, category theory |
| **Total** | **25** | **~104** | **~68** | **~36** | |

**~65% exists, ~35% needs writing.** New content clusters in Parts I and III.

---

## Directory Structure

Three levels of nesting: `part-NN/ch-NN-name/NN-section.md`

All under `docs/musings/existence_physics_and_life/physics-for-metaphysics/`.

```
physics-for-metaphysics/
  index.md                                    (book landing page — rewrite)
  images/                                     (shared image directory — unchanged)
  working_notes.md                            (keep, draft: true)

  part-01-mathematical-foundations/
    index.md
    ch-01-logic-and-computation/
      index.md
      01-formal-systems.md
      02-turing-machines.md
      03-godel-incompleteness.md
      04-computational-complexity.md
    ch-02-information-theory/
      index.md
      01-shannon-entropy.md
      02-mutual-information.md
      03-kolmogorov-complexity.md
      04-causal-information.md
    ch-03-dynamical-systems-and-chaos/
      index.md
      01-linear-vs-nonlinear.md
      02-attractors-and-bifurcations.md
      03-chaos.md
      04-stability-analysis.md
    ch-04-probability-and-inference/
      index.md
      01-bayesian-framework.md
      02-bayes-rule.md
      03-bayesian-networks.md

  part-02-generalized-mechanics/
    index.md
    ch-05-state-motion-mass/
      index.md
      01-state-variable.md
      02-velocity.md
      03-generalized-mass.md
    ch-06-force-energy-action/
      index.md
      01-force.md
      02-energy-and-lagrangian.md
      03-noether-and-conjugate-pairs.md
    ch-07-coupling-fields-interaction/
      index.md
      01-scalar-coupling.md
      02-coupling-tensor.md
      03-fields.md
      04-field-sources.md
    ch-08-many-body-mechanics/
      index.md
      01-thermodynamics.md
      02-fluid-dynamics.md
      03-phase-transitions.md
      04-nonlinearity-in-state-space.md
      05-network-dynamics.md
    ch-09-uncertainty-coordinates-relativity/
      index.md
      01-observer-effect.md
      02-coordinate-relativity.md
      03-reference-frame-relativity.md

  part-03-emergence-and-life/
    index.md
    ch-10-self-organization-and-emergence/
      index.md
      01-dissipative-structures.md
      02-autocatalysis.md
      03-causal-emergence.md
      04-near-decomposability.md
    ch-11-emergence-of-life/
      index.md
      01-life-as-phase-transition.md
      02-information-coupling.md
      03-autocatalytic-closure.md
      04-predictions.md
    ch-12-evolution-and-selection/
      index.md
      01-replicator-dynamics.md
      02-fitness-landscapes.md
      03-evolutionary-stable-strategies.md
      04-multi-level-selection.md
      05-cultural-evolution.md

  part-04-entities-and-mind/
    index.md
    ch-13-entities/
      index.md
      01-auto-causal-density.md
      02-meta-entities.md
      03-three-substrates.md
      04-extended-mind.md
      05-entity-case-studies.md
    ch-14-intelligence-and-consciousness/
      index.md
      01-intelligence.md
      02-consciousness.md
      03-consciousness-tensor.md
      04-allo-and-auto-modeling.md
    ch-15-agency/
      index.md
      01-agency-formula.md
      02-moral-responsibility.md
      03-enactivist-tension.md
      04-ai-agency.md

  part-05-time-and-legacy/
    index.md
    ch-16-local-and-nonlocal-time/
      index.md
      01-local-time.md
      02-representational-footprint.md
      03-empirical-grounding.md
    ch-17-soul/
      index.md
      01-formal-definition.md
      02-sign-amplitude-duration.md
      03-antifragility.md
      04-soul-agency-mimetic-fitness.md
      05-soul-case-studies.md

  part-06-decision-and-strategy/
    index.md
    ch-18-decision-under-uncertainty/
      index.md
      01-pomdp-structure.md
      02-belief-states.md
      03-policy.md
      04-value-function.md
    ch-19-interaction-and-game-theory/
      index.md
      01-two-entity-dynamics.md
      02-n-entity-systems.md
      03-competitive-dynamics.md
      04-cooperative-dynamics.md
      05-mixed-motive.md
    ch-20-strategic-consciousness/
      index.md
      01-strategic-consciousness.md
      02-strategy-and-soul.md
      03-mechanism-design.md
      04-institutional-design.md

  part-07-society-and-prediction/
    index.md
    ch-21-collective-dynamics/
      index.md
      01-sociological-variables.md
      02-belief-divergence.md
      03-social-phase-transitions.md
      04-cliodynamics.md
      05-decision-case-studies.md
    ch-22-governance/
      index.md
      01-landscape-vs-force.md
      02-coupling-circuit-breakers.md
      03-viscosity-engineering.md
      04-early-warning-dashboard.md
      05-ai-governance.md

  part-08-synthesis/
    index.md
    ch-23-full-ontology/
      index.md
      01-definitional-glossary.md
      02-concept-dependency-map.md
    ch-24-connections/
      index.md
      01-wolfram-ruliad.md
      02-assembly-theory.md
      03-constructor-theory.md
    ch-25-open-questions-and-program/
      index.md
      01-open-questions.md
      02-testable-predictions.md
      03-operationalization.md
      04-coda.md
```

---

## Old-to-New Content Mapping

This is the complete mapping from every section of every existing file to its new location. Use this to execute the split.

### Part 1: `physics_as_metaphysics_01_generalized_mechanics.md` (627 lines)

| Old Section | Old Lines (approx) | New Location | Notes |
|---|---|---|---|
| Intro paragraph | 52-60 | `part-02/index.md` | Becomes Part II introduction |
| S1: State variable X | 62-100 | `part-02/ch-05/01-state-variable.md` | |
| S1b: Entities preview | 100-130 | `part-04/ch-13/01-auto-causal-density.md` | Merge with Part 2 S1 content |
| S2: Velocity | 130-148 | `part-02/ch-05/02-velocity.md` | |
| S2b: Mass and momentum | 148-200 | `part-02/ch-05/03-generalized-mass.md` | |
| S3: Force | 200-270 | `part-02/ch-06/01-force.md` | |
| S4: Energy | 270-340 | `part-02/ch-06/02-energy-and-lagrangian.md` | |
| S4b: Lagrangian and action principle | 340-390 | `part-02/ch-06/02-energy-and-lagrangian.md` + `03-noether-and-conjugate-pairs.md` | Split at Noether boundary |
| S5a: Scalar coupling | 390-420 | `part-02/ch-07/01-scalar-coupling.md` | |
| S5b: Coupling tensor | 420-460 | `part-02/ch-07/02-coupling-tensor.md` | |
| S6: Fields | 460-490 | `part-02/ch-07/03-fields.md` | |
| S6b: Field sources | 490-515 | `part-02/ch-07/04-field-sources.md` | |
| S7: Thermodynamics | 515-560 | `part-02/ch-08/01-thermodynamics.md` | |
| S7: Fluid dynamics | 560-590 | `part-02/ch-08/02-fluid-dynamics.md` | |
| S7: Phase transitions | 590-615 | `part-02/ch-08/03-phase-transitions.md` | |
| Summary/closing | 615-627 | `part-02/ch-08/index.md` or drop | Navigation links obsolete |

### Part 1b: `physics_as_metaphysics_01b_uncertainty_coordinates_relativity.md` (286 lines)

| Old Section | Old Lines (approx) | New Location | Notes |
|---|---|---|---|
| Intro | 52-62 | `part-02/ch-09/index.md` | |
| S1: Observer effect | 65-140 | `part-02/ch-09/01-observer-effect.md` | |
| S1.5: Conjugate pairs | (within S1) | `part-02/ch-06/03-noether-and-conjugate-pairs.md` | Move to energy/action chapter |
| S2: Coordinate relativity | 140-210 | `part-02/ch-09/02-coordinate-relativity.md` | |
| S3: Reference frame relativity | 210-286 | `part-02/ch-09/03-reference-frame-relativity.md` | |

### Part 1c: `physics_as_metaphysics_01c_thermodynamic_emergence_of_life.md` (378 lines)

| Old Section | Old Lines (approx) | New Location | Notes |
|---|---|---|---|
| Intro | 57-60 | `part-03/ch-11/index.md` | |
| S1-2: Life as phase transition | 60-180 | `part-03/ch-11/01-life-as-phase-transition.md` | |
| S3: Information coupling | 180-250 | `part-03/ch-11/02-information-coupling.md` | |
| S4: Chemistry to biology | 250-320 | `part-03/ch-11/03-autocatalytic-closure.md` | |
| S5: Predictions | 320-378 | `part-03/ch-11/04-predictions.md` | |

### Part 2: `physics_as_metaphysics_02_meta_entities.md` (255 lines)

| Old Section | Old Lines (approx) | New Location | Notes |
|---|---|---|---|
| Recap + intro | 50-56 | `part-04/ch-13/index.md` | |
| S1: When aggregates become entities | 57-101 | `part-04/ch-13/02-meta-entities.md` | Three criteria (Hoel, Simon, Daniels) |
| S2: Three substrates | 103-139 | `part-04/ch-13/03-three-substrates.md` | Physical/informational/mimetic |
| S3: Case studies | 141-188 | `part-04/ch-13/05-entity-case-studies.md` | Religion, scientific method, dying language |
| S4: Extended mind | 190-207 | `part-04/ch-13/04-extended-mind.md` | Clark/Chalmers; Bateson |
| S5: Implications + Closing | 209-255 | `part-04/ch-13/05-entity-case-studies.md` (append) | AI meta-entity, governance, accountability |

### Part 3: `physics_as_metaphysics_03_intelligence_consciousness_agency.md` (279 lines)

| Old Section | Old Lines (approx) | New Location | Notes |
|---|---|---|---|
| Intro | 53-57 | `part-04/index.md` or `ch-14/index.md` | |
| S1: Intelligence | 59-82 | `part-04/ch-14/01-intelligence.md` | |
| Intelligence/consciousness transition | 85-92 | `part-04/ch-14/01-intelligence.md` (append) | |
| S2: Consciousness (core def) | 95-100 | `part-04/ch-14/02-consciousness.md` | |
| S2: Allo-representation | 105-113 | `part-04/ch-14/04-allo-and-auto-modeling.md` | |
| S2: Auto-modeling | 115-120 | `part-04/ch-14/04-allo-and-auto-modeling.md` | |
| S2: Independence of dimensions | 121-135 | `part-04/ch-14/04-allo-and-auto-modeling.md` | |
| S2: Tensor formalism | 137-146 | `part-04/ch-14/03-consciousness-tensor.md` | |
| S2: Positioning against theories | 152-168 | `part-04/ch-14/02-consciousness.md` (append) | GWT, HOT, IIT, PP |
| S3: Agency formula | 170-208 | `part-04/ch-15/01-agency-formula.md` | |
| S3: Cross-terms, meta-representation | 216-230 | `part-04/ch-15/01-agency-formula.md` | |
| S3: Moral responsibility | 231-236 | `part-04/ch-15/02-moral-responsibility.md` | |
| S3: Enactivist tension | 238-243 | `part-04/ch-15/03-enactivist-tension.md` | |
| S3: AI agency | 245-262 | `part-04/ch-15/04-ai-agency.md` | |
| Closing | 265-279 | `part-04/ch-15/index.md` or drop | Navigation links obsolete |

### Part 4: `physics_as_metaphysics_04_time_and_soul.md` (340 lines)

| Old Section | Old Lines (approx) | New Location | Notes |
|---|---|---|---|
| Intro | 53-58 | `part-05/index.md` | |
| S1: Local time | 60-99 | `part-05/ch-16/01-local-time.md` | |
| S2: Non-local time + R(E,t) | 101-122 | `part-05/ch-16/02-representational-footprint.md` | |
| S2: Empirical grounding | 124-143 | `part-05/ch-16/03-empirical-grounding.md` | Ngrams, Weng, Lorenz-Spreen, h-index |
| S3: Soul formal definition | 149-167 | `part-05/ch-17/01-formal-definition.md` | |
| S3: Sign and value basis | 175-193 | `part-05/ch-17/02-sign-amplitude-duration.md` | |
| S3: Three dimensions | 196-209 | `part-05/ch-17/02-sign-amplitude-duration.md` | |
| S3: Antifragility | 211-238 | `part-05/ch-17/03-antifragility.md` | |
| S4: Soul-agency, mimetic fitness | 242-280 | `part-05/ch-17/04-soul-agency-mimetic-fitness.md` | |
| S5: Case studies | 282-315 | `part-05/ch-17/05-soul-case-studies.md` | Meme, person, religion, AI |
| Closing | 317-340 | Drop or `part-05/ch-17/index.md` | Navigation links obsolete |

### Part 5: `physics_as_metaphysics_05_ontology_and_open_questions.md` (525 lines)

| Old Section | Old Lines (approx) | New Location | Notes |
|---|---|---|---|
| Intro | 52-56 | `part-08/index.md` | |
| S1: Full ontology | 58-237 | `part-08/ch-23/01-definitional-glossary.md` | Large (~180 lines) but is a reference table — keep intact |
| S2: Wolfram connection | 239-268 | `part-08/ch-24/01-wolfram-ruliad.md` | |
| S2: Assembly Theory | 269-295 | `part-08/ch-24/02-assembly-theory.md` | |
| S3: Nine open questions | 298-378 | `part-08/ch-25/01-open-questions.md` | Will expand with new questions |
| S4: Predictions P1-P16 | 382-466 | `part-08/ch-25/02-testable-predictions.md` | |
| S4: Governance utility P10-P13 | 466-491 | Split: some -> `part-07/ch-22/`, rest stays | Governance predictions move to Ch 22 |
| S4: Operationalization | 493-507 | `part-08/ch-25/03-operationalization.md` | |
| S5: Coda | 511-525 | `part-08/ch-25/04-coda.md` | |

### Part 6: `physics_as_metaphysics_06_decision_and_trajectory.md` (588 lines)

| Old Section | Old Lines (approx) | New Location | Notes |
|---|---|---|---|
| Intro | 52-62 | `part-06/index.md` | |
| S1: POMDP structure | 63-174 | `part-06/ch-18/01-pomdp-structure.md` | |
| S2: Belief state (2.1-2.3) | 175-230 | `part-06/ch-18/02-belief-states.md` | |
| S2.4: Belief divergence | 230-246 | `part-07/ch-21/02-belief-divergence.md` | Moves to collective dynamics |
| S3: Policy | 247-306 | `part-06/ch-18/03-policy.md` | |
| S4: Value function | 307-352 | `part-06/ch-18/04-value-function.md` | |
| S5: Sociological application | 353-410 | `part-07/ch-21/01-sociological-variables.md` | Moves to collective dynamics |
| S6: Case studies | 411-454 | `part-07/ch-21/05-decision-case-studies.md` | Moves to collective dynamics |
| S7.1-7.2: Game theory + competitive | 455-500 | `part-06/ch-19/03-competitive-dynamics.md` | |
| S7.3-7.4: Cooperative + mixed-motive | 500-540 | `part-06/ch-19/04-cooperative-dynamics.md` + `05-mixed-motive.md` | |
| S7.5: Strategy and soul | 540-555 | `part-06/ch-20/02-strategy-and-soul.md` | |
| S7.6: Strategic consciousness | 555-570 | `part-06/ch-20/01-strategic-consciousness.md` | |
| Closing + duality table | 570-588 | `part-06/ch-18/index.md` or `part-06/index.md` | The external/internal duality table is valuable |

---

## Execution: Iterative Bursts

### Burst 1: Create skeleton + migrate existing content
**Goal**: Full directory structure exists. All existing content is in its new location. New sections are draft stubs.

1. Create feature branch `restructure-physics-metaphysics`
2. Create all directories (8 parts x 2-5 chapters each)
3. Create all `index.md` files (8 part + 25 chapter = 33 index files) with frontmatter + brief intro
4. Split existing files according to Old-to-New mapping above
5. Create [NEW] section files as `draft: true` stubs with one-paragraph description
6. Rewrite top-level `index.md` as book landing page
7. Update all image references (relative paths change with nesting depth)
8. Delete old flat files
9. Test locally: `npm run dev`, navigate every page
10. Merge

### Burst 2: Write Part I — Mathematical Foundations (Chapters 1-4)
**Goal**: The formal tools are established. Not original — establishes notation and identifies which results carry over.
- ~15 sections, each ~150-300 lines
- Estimated total: ~3,000-4,000 lines of new content

### Burst 3: Write Part III gaps — Emergence and Evolution (Chapters 10, 12)
**Goal**: Self-organization, causal emergence, and evolution/selection are formally developed.
- ~9 sections
- Estimated total: ~2,000-3,000 lines of new content

### Burst 4: Write Part VI-VII gaps — Strategy and Society (Chapters 19-20, 22)
**Goal**: Interaction dynamics have formal foundations; institutional design is developed.
- ~5 sections
- Estimated total: ~1,000-1,500 lines of new content

### Burst 5: Expand Part VIII — Synthesis (Chapters 24-25)
**Goal**: Constructor theory connection; open questions and predictions expanded for new material.
- ~3 sections + expansions
- Final integration pass across all parts

---

## Technical Details

### Image handling
- Keep single shared `images/` directory at `epimechanics/images/`
- Section files (3 levels deep): `../../../images/filename.svg`
- Chapter index files (2 levels deep): `../../images/filename.svg`
- Part index files (1 level deep): `../images/filename.svg`

### Frontmatter pattern for section files
```yaml
---
title: "Section Title"
description: >-
  One-line description.
date: 2026-03-15T00:00:00.000Z
draft: false  # or true for stubs
author:
  name: "Ian Derrington"
contentType: article
series: "The Physics of Metaphysics"
series_order: 5.1  # chapter.section
categories:
  - Philosophy
  - Physics
tags:
  - [topic-specific tags]
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
---
```

### Frontmatter pattern for chapter index files
```yaml
---
title: "Chapter N: Chapter Title"
description: >-
  Brief chapter description.
date: 2026-03-15T00:00:00.000Z
draft: false
author:
  name: "Ian Derrington"
contentType: article
series: "The Physics of Metaphysics"
series_order: 5  # chapter number
coverImage:
  url: ../../images/cover-image.png
  alt: "Cover description"
categories:
  - Philosophy
  - Physics
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
---
```

### Ordering within directories
- Numbered filename prefixes (`01-`, `02-`) provide alphabetical sort
- `.pages` YAML config files can override if needed (see `src/lib/content/pages-config.ts`)

### Verification (after each burst)
- `npm run dev` — navigate every page
- Collection pages show correct card grids
- Images render at all nesting depths
- `node scripts/link-verifier.js` — catch broken cross-references
- Breadcrumbs show: Part > Chapter > Section

### Critical codebase files
- `src/lib/content/collectionUtils.ts` — verify handles 3-level nesting
- `src/lib/content/slugs.ts` — verify handles `part-01-*/ch-01-*/01-*.md` paths
- `src/lib/content/pages-config.ts` — `.pages` config for ordering
- `src/lib/content/collectionRenderer.ts` — collection page rendering
- `src/app/[section]/[...slug]/page.tsx` — dynamic route handler
