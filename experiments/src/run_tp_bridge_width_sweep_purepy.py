#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path
from statistics import mean

from run_tp_bridge_toy_mlp_purepy import train_and_trace
from tp_bridge_metrics import compute


def classify(ntk_final: float, rep_final: float, treg: float) -> str:
    regime = "kernel-like" if ntk_final < 0.03 else ("mixed" if ntk_final < 0.10 else "feature-learning")
    transfer = "good-transfer" if treg <= 0 else "bad-transfer"
    rep = "high-rep-drift" if rep_final > 0.5 else "low-rep-drift"
    return f"{regime}|{transfer}|{rep}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--widths", default="8,16,32,64")
    ap.add_argument("--lrs", default="0.02,0.05,0.1")
    ap.add_argument("--steps", type=int, default=40)
    ap.add_argument("--seeds", type=int, default=3)
    ap.add_argument("--out-dir", default="experiments/results/tp_bridge/sweep")
    args = ap.parse_args()

    widths = [int(x) for x in args.widths.split(",") if x.strip()]
    lrs = [float(x) for x in args.lrs.split(",") if x.strip()]

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    rows = []

    for lr in lrs:
        for i in range(len(widths) - 1):
            ws, wl = widths[i], widths[i + 1]
            rep_vals, ntk_vals, treg_vals = [], [], []
            for s in range(args.seeds):
                small_trace, small_loss = train_and_trace(ws, lr, args.steps, seed=100 + s)
                large_trace, large_loss = train_and_trace(wl, lr, args.steps, seed=200 + s)
                large_trace["hp_transfer"] = {
                    "metric": "loss",
                    "small_best": {"value": small_loss},
                    "large_eval": {"value": large_loss},
                }
                m = compute(large_trace)
                summ = m["summary"]
                rep_vals.append(summ["representation_drift_final"])
                ntk_vals.append(summ["ntk_drift_final"])
                treg_vals.append(summ["transfer_regret"])

            rep_m, ntk_m, treg_m = mean(rep_vals), mean(ntk_vals), mean(treg_vals)
            rows.append({
                "lr": lr,
                "small_width": ws,
                "large_width": wl,
                "rep_final_mean": rep_m,
                "ntk_final_mean": ntk_m,
                "transfer_regret_mean": treg_m,
                "classification": classify(ntk_m, rep_m, treg_m),
            })

    (out_dir / "sweep_results.json").write_text(json.dumps(rows, indent=2))

    md = [
        "# TP Bridge Width Sweep (purepy toy)",
        "",
        "| lr | small→large | rep_drift_final (mean) | ntk_drift_final (mean) | transfer_regret (mean) | class |",
        "|---:|---|---:|---:|---:|---|",
    ]
    for r in rows:
        md.append(
            f"| {r['lr']:.3f} | {r['small_width']}→{r['large_width']} | {r['rep_final_mean']:.4f} | {r['ntk_final_mean']:.4f} | {r['transfer_regret_mean']:.4f} | {r['classification']} |"
        )
    (out_dir / "sweep_results.md").write_text("\n".join(md) + "\n")

    print(f"wrote {out_dir / 'sweep_results.json'}")
    print(f"wrote {out_dir / 'sweep_results.md'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
