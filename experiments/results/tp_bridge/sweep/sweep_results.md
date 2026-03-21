# TP Bridge Width Sweep (purepy toy)

| lr | small→large | rep_drift_final (mean) | ntk_drift_final (mean) | transfer_regret (mean) | class |
|---:|---|---:|---:|---:|---|
| 0.020 | 8→16 | 1.3399 | 0.1221 | -0.1121 | feature-learning|good-transfer|high-rep-drift |
| 0.020 | 16→32 | 0.9237 | 0.0625 | -0.1162 | mixed|good-transfer|high-rep-drift |
| 0.020 | 32→64 | 0.4080 | 0.0368 | -0.0490 | mixed|good-transfer|low-rep-drift |
| 0.050 | 8→16 | 1.3166 | 0.3491 | -0.0450 | feature-learning|good-transfer|high-rep-drift |
| 0.050 | 16→32 | 0.8396 | 0.1369 | -0.0153 | feature-learning|good-transfer|high-rep-drift |
| 0.050 | 32→64 | 0.3917 | 0.0404 | -0.0012 | mixed|good-transfer|low-rep-drift |
| 0.100 | 8→16 | 1.2612 | 0.4388 | -0.0033 | feature-learning|good-transfer|high-rep-drift |
| 0.100 | 16→32 | 0.8582 | 0.1434 | -0.0010 | feature-learning|good-transfer|high-rep-drift |
| 0.100 | 32→64 | 0.4144 | 0.0374 | -0.0006 | mixed|good-transfer|low-rep-drift |
