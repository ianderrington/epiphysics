# TP Bridge Metrics Interpretation

- **Representation drift (final = 1.2599)**: internal features changed substantially over training.
- **NTK drift (final = 0.1307)**: suggests **feature-learning / non-frozen-kernel** dynamics.
- **Mean layer update norm (0.0186)**: nontrivial parameter motion throughout training.
- **Transfer regret (-0.0321)**: transferred setting did not degrade large-width loss (good sign).

Interpretation is heuristic and should be validated on larger, architecture-realistic runs.