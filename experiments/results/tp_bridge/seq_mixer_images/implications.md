# TP Bridge Metrics Interpretation

- **Representation drift (final = 0.0644)**: internal features changed substantially over training.
- **NTK drift (final = 0.2914)**: suggests **feature-learning / non-frozen-kernel** dynamics.
- **Mean layer update norm (0.0036)**: nontrivial parameter motion throughout training.
- **Transfer regret (0.0279)**: transfer incurred loss penalty; scaling/parametrization may need adjustment.

Interpretation is heuristic and should be validated on larger, architecture-realistic runs.