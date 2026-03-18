# Experiments

Planned empirical tests of Epimechanics predictions.

## Experiment 1: Representation Compression Race

**Question:** Do learned representations that minimize description length spontaneously develop Lagrangian-like structure (conserved quantities, symplectic geometry)?

**Protocol:** Train autoencoders on dynamical-system trajectories at varying bottleneck widths. Measure whether the learned latent space exhibits Poisson brackets, conserved Noether charges, or symplectic structure as compression increases.

**Status:** Protocol designed. Not yet run.

## Experiment 2: Prediction Cost vs. Representation Complexity

**Question:** Is there a measurable trade-off between representation complexity (description length) and prediction integration cost, with a minimum at quadratic kinetic energy?

**Protocol:** For a fixed dynamical system, parameterize families of coordinate representations. Measure total predictive cost = description length + numerical integration cost. Check whether the minimum coincides with the representation that yields quadratic kinetic energy.

**Status:** Protocol designed. Not yet run.

## Experiment 3: Emergent Forces from Coarse-Graining

**Question:** When a fine-grained simulation is coarse-grained, do the effective forces in the coarse-grained description have the structure predicted by the coupling tensor formalism?

**Protocol:** Run a multi-agent simulation with known microscopic rules. Coarse-grain at multiple scales. Compare the emergent effective forces against the coupling tensor predictions from Part 2 (meta-entities).

**Status:** Protocol designed. Not yet run.

## Experiment 4: Active Inference as Lagrangian Optimization

**Question:** Can active inference agents be shown to implicitly minimize a Lagrangian, and does making this explicit improve performance?

**Protocol:** Implement active inference agents in a standard RL benchmark. Compare standard free-energy minimization against an explicitly Lagrangian formulation. Measure sample efficiency, robustness to distribution shift, and representation interpretability.

**Status:** Protocol designed. Not yet run.
