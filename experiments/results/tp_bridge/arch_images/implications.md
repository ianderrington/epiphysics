# TP Bridge Metrics Interpretation

- **Representation drift (final = 0.2745)**: internal features changed substantially over training.
- **NTK drift (final = 0.6203)**: suggests **feature-learning / non-frozen-kernel** dynamics.
- **Mean layer update norm (0.0147)**: nontrivial parameter motion throughout training.
- **Transfer regret (-0.4817)**: transferred setting did not degrade large-width loss (good sign).

Interpretation is heuristic and should be validated on larger, architecture-realistic runs.