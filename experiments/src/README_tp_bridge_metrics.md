# TP Bridge Metrics (Quick Use)

Compute TP↔Epiphysics bridge metrics from a JSON trace.

## Run

```bash
python3 experiments/src/tp_bridge_metrics.py \
  experiments/src/tp_bridge_example_trace.json \
  -o experiments/results/tp_bridge/example_metrics.json
```

## Expected input fields

- `metadata` (optional)
- `repr`: `[T][D]`
- `params_by_layer`: `[T][L][P]`
- `ntk`: `[T][N][N]`
- `hessian_eigs`: `[T][K]`
- `hp_transfer`: `{ metric, small_best.value, large_eval.value }`

## Outputs

- `summary.representation_drift_*`
- `summary.layer_update_norm_*`
- `summary.ntk_drift_*`
- `summary.spectral_radius_*`
- `summary.transfer_regret`
- full per-step arrays in `per_step`
