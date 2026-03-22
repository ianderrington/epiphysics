# TP Bridge Metrics (Quick Use)

Compute TP↔Epiphysics bridge metrics from a JSON trace.

## Run on real trace (baseline pure Python toy training)

```bash
python3 experiments/src/run_tp_bridge_toy_mlp_purepy.py \
  --output experiments/results/tp_bridge/toy_trace_real.json

python3 experiments/src/tp_bridge_metrics.py \
  experiments/results/tp_bridge/toy_trace_real.json \
  -o experiments/results/tp_bridge/toy_metrics_real.json
```

## Run architecture-realistic traces (schema-preserving)

```bash
python3 experiments/src/run_tp_bridge_residual_mlp_trace.py \
  --output experiments/results/tp_bridge/arch_residual_trace_real.json
python3 experiments/src/tp_bridge_metrics.py \
  experiments/results/tp_bridge/arch_residual_trace_real.json \
  -o experiments/results/tp_bridge/arch_residual_metrics_real.json

python3 experiments/src/run_tp_bridge_seq_mixer_trace.py \
  --output experiments/results/tp_bridge/seq_mixer_trace_real.json
python3 experiments/src/tp_bridge_metrics.py \
  experiments/results/tp_bridge/seq_mixer_trace_real.json \
  -o experiments/results/tp_bridge/seq_mixer_metrics_real.json
```

## Run on synthetic fixture

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
