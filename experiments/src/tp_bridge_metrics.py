#!/usr/bin/env python3
"""
TP ↔ Epiphysics bridge metrics (pure Python; no third-party deps).
"""

from __future__ import annotations

import argparse
import json
import math
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Any, Dict, List, Optional


@dataclass
class BridgeSummary:
    representation_drift_mean: Optional[float]
    representation_drift_final: Optional[float]
    layer_update_norm_mean: Optional[float]
    layer_update_norm_max: Optional[float]
    ntk_drift_mean: Optional[float]
    ntk_drift_final: Optional[float]
    spectral_radius_mean: Optional[float]
    spectral_radius_max: Optional[float]
    transfer_regret: Optional[float]


def l2(v: List[float]) -> float:
    return math.sqrt(sum(x * x for x in v))


def flatten(m: List[List[float]]) -> List[float]:
    return [x for row in m for x in row]


def mean(xs: List[float]) -> Optional[float]:
    return (sum(xs) / len(xs)) if xs else None


def representation_drift(repr_ts: List[List[float]]) -> List[float]:
    x0 = repr_ts[0]
    denom = l2(x0) + 1e-12
    out = []
    for xt in repr_ts:
        diff = [a - b for a, b in zip(xt, x0)]
        out.append(l2(diff) / denom)
    return out


def layer_update_norms(params_by_layer: List[List[List[float]]]) -> List[List[float]]:
    # [T][L][P] -> [T-1][L]
    out = []
    for t in range(1, len(params_by_layer)):
        step = []
        prev_layers = params_by_layer[t - 1]
        curr_layers = params_by_layer[t]
        for lp, lc in zip(prev_layers, curr_layers):
            d = [a - b for a, b in zip(lc, lp)]
            step.append(l2(d))
        out.append(step)
    return out


def frob(m: List[List[float]]) -> float:
    return l2(flatten(m))


def ntk_drift(ntk_ts: List[List[List[float]]]) -> List[float]:
    k0 = ntk_ts[0]
    denom = frob(k0) + 1e-12
    out = []
    for kt in ntk_ts:
        diff = [[a - b for a, b in zip(r1, r0)] for r1, r0 in zip(kt, k0)]
        out.append(frob(diff) / denom)
    return out


def spectral_radius_from_eigs(hessian_eigs_ts: List[List[float]]) -> List[float]:
    return [max(abs(x) for x in row) for row in hessian_eigs_ts]


def transfer_regret(hp_transfer: Dict[str, Any]) -> Optional[float]:
    if not hp_transfer:
        return None
    metric = str(hp_transfer.get("metric", "loss")).lower()
    small = hp_transfer.get("small_best", {}).get("value")
    large = hp_transfer.get("large_eval", {}).get("value")
    if small is None or large is None:
        return None
    small = float(small)
    large = float(large)
    if metric in {"loss", "error", "nll"}:
        return large - small
    return small - large


def compute(trace: Dict[str, Any]) -> Dict[str, Any]:
    repr_ts = trace.get("repr")
    params_ts = trace.get("params_by_layer")
    ntk_ts = trace.get("ntk")
    hess_eigs = trace.get("hessian_eigs")

    per_step: Dict[str, Any] = {}

    rep_d = None
    if isinstance(repr_ts, list) and repr_ts and isinstance(repr_ts[0], list):
        rep_d = representation_drift(repr_ts)
        per_step["representation_drift"] = rep_d

    upd = None
    if isinstance(params_ts, list) and len(params_ts) >= 2:
        upd = layer_update_norms(params_ts)
        per_step["layer_update_norms"] = upd

    nkd = None
    if isinstance(ntk_ts, list) and ntk_ts and isinstance(ntk_ts[0], list):
        nkd = ntk_drift(ntk_ts)
        per_step["ntk_drift"] = nkd

    srad = None
    if isinstance(hess_eigs, list) and hess_eigs and isinstance(hess_eigs[0], list):
        srad = spectral_radius_from_eigs(hess_eigs)
        per_step["spectral_radius"] = srad

    treg = transfer_regret(trace.get("hp_transfer", {}))

    upd_flat = [x for row in (upd or []) for x in row]

    summary = BridgeSummary(
        representation_drift_mean=mean(rep_d or []),
        representation_drift_final=(rep_d[-1] if rep_d else None),
        layer_update_norm_mean=mean(upd_flat),
        layer_update_norm_max=(max(upd_flat) if upd_flat else None),
        ntk_drift_mean=mean(nkd or []),
        ntk_drift_final=(nkd[-1] if nkd else None),
        spectral_radius_mean=mean(srad or []),
        spectral_radius_max=(max(srad) if srad else None),
        transfer_regret=treg,
    )

    return {
        "summary": asdict(summary),
        "per_step": per_step,
        "metadata": trace.get("metadata", {}),
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("input", help="Path to input JSON trace")
    ap.add_argument("-o", "--output", help="Path to output JSON metrics", required=True)
    args = ap.parse_args()

    inp = Path(args.input)
    out = Path(args.output)

    trace = json.loads(inp.read_text())
    metrics = compute(trace)

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(metrics, indent=2))
    print(f"wrote {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
