#!/usr/bin/env python3
"""
Generate a REAL (non-synthetic) TP bridge trace from a tiny pure-Python MLP training run.
No third-party dependencies.
"""

from __future__ import annotations

import argparse
import json
import math
import random
from pathlib import Path
from typing import List, Tuple


def tanh(x: float) -> float:
    return math.tanh(x)


def dtanh_from_tanh(t: float) -> float:
    return 1.0 - t * t


def dot(a: List[float], b: List[float]) -> float:
    return sum(x * y for x, y in zip(a, b))


class TinyMLP:
    def __init__(self, hidden: int, seed: int = 0):
        rnd = random.Random(seed)
        self.hidden = hidden
        self.w1 = [rnd.uniform(-0.5, 0.5) for _ in range(hidden)]
        self.b1 = [0.0 for _ in range(hidden)]
        self.w2 = [rnd.uniform(-0.5, 0.5) for _ in range(hidden)]
        self.b2 = 0.0

    def forward(self, x: float) -> Tuple[float, List[float], List[float]]:
        z1 = [self.w1[j] * x + self.b1[j] for j in range(self.hidden)]
        h = [tanh(z) for z in z1]
        yhat = dot(self.w2, h) + self.b2
        return yhat, h, z1

    def flat_params_by_layer(self) -> List[List[float]]:
        return [self.w1 + self.b1, self.w2 + [self.b2]]

    def jacobian_output_wrt_params(self, x: float) -> List[float]:
        # Order: w1(hidden), b1(hidden), w2(hidden), b2(1)
        yhat, h, _ = self.forward(x)
        # dy/dw2_j = h_j ; dy/db2=1
        dy_dw2 = list(h)
        dy_db2 = 1.0
        # dy/dh_j = w2_j ; dy/dz1_j = w2_j*(1-h_j^2)
        dy_dz1 = [self.w2[j] * dtanh_from_tanh(h[j]) for j in range(self.hidden)]
        dy_dw1 = [dy_dz1[j] * x for j in range(self.hidden)]
        dy_db1 = dy_dz1
        return dy_dw1 + dy_db1 + dy_dw2 + [dy_db2]


def make_dataset(n: int = 64, seed: int = 1) -> List[Tuple[float, float]]:
    rnd = random.Random(seed)
    data = []
    for _ in range(n):
        x = rnd.uniform(-1.0, 1.0)
        y = 2.0 * x + 0.3 * x * x + rnd.gauss(0.0, 0.05)
        data.append((x, y))
    return data


def batch_loss(model: TinyMLP, data: List[Tuple[float, float]]) -> float:
    total = 0.0
    for x, y in data:
        yhat, _, _ = model.forward(x)
        e = yhat - y
        total += 0.5 * e * e
    return total / max(1, len(data))


def train_and_trace(hidden: int, lr: float, steps: int, seed: int) -> Tuple[dict, float]:
    model = TinyMLP(hidden=hidden, seed=seed)
    data = make_dataset(seed=seed + 100)
    probe = [-1.0, -0.5, 0.0, 0.5, 1.0]

    trace = {
        "metadata": {
            "run_type": "real_toy_training",
            "model": "tiny_mlp_purepy",
            "parametrization_class": "standard",
            "optimizer_family": "SGD",
            "width_vector": [hidden],
            "depth_vector": [2],
            "lr": lr,
            "steps": steps,
        },
        "repr": [],
        "params_by_layer": [],
        "ntk": [],
    }

    for step in range(steps + 1):
        # log representation as mean hidden activations over dataset
        h_mean = [0.0 for _ in range(hidden)]
        for x, _y in data:
            _yhat, h, _z1 = model.forward(x)
            for j in range(hidden):
                h_mean[j] += h[j]
        h_mean = [v / len(data) for v in h_mean]
        trace["repr"].append(h_mean)
        trace["params_by_layer"].append(model.flat_params_by_layer())

        # empirical NTK on probe inputs
        jacs = [model.jacobian_output_wrt_params(x) for x in probe]
        gram = []
        for i in range(len(probe)):
            row = []
            for k in range(len(probe)):
                row.append(dot(jacs[i], jacs[k]))
            gram.append(row)
        trace["ntk"].append(gram)

        if step == steps:
            break

        # batch gradient descent
        gw1 = [0.0 for _ in range(hidden)]
        gb1 = [0.0 for _ in range(hidden)]
        gw2 = [0.0 for _ in range(hidden)]
        gb2 = 0.0

        for x, y in data:
            yhat, h, _z1 = model.forward(x)
            err = yhat - y

            for j in range(hidden):
                gw2[j] += err * h[j]
            gb2 += err

            for j in range(hidden):
                dz = err * model.w2[j] * dtanh_from_tanh(h[j])
                gw1[j] += dz * x
                gb1[j] += dz

        inv_n = 1.0 / len(data)
        for j in range(hidden):
            model.w1[j] -= lr * gw1[j] * inv_n
            model.b1[j] -= lr * gb1[j] * inv_n
            model.w2[j] -= lr * gw2[j] * inv_n
        model.b2 -= lr * gb2 * inv_n

    final_loss = batch_loss(model, data)
    return trace, final_loss


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--steps", type=int, default=40)
    ap.add_argument("--lr", type=float, default=0.05)
    ap.add_argument("--small-width", type=int, default=8)
    ap.add_argument("--large-width", type=int, default=32)
    ap.add_argument("--seed", type=int, default=42)
    ap.add_argument("--output", default="experiments/results/tp_bridge/toy_trace_real.json")
    args = ap.parse_args()

    small_trace, small_loss = train_and_trace(args.small_width, args.lr, args.steps, args.seed)
    large_trace, large_loss = train_and_trace(args.large_width, args.lr, args.steps, args.seed + 1)

    # Use large trace as main artifact, with transfer annotation from small->large reuse of lr.
    large_trace["metadata"]["transfer_from_small_width"] = args.small_width
    large_trace["metadata"]["large_width"] = args.large_width
    large_trace["hp_transfer"] = {
        "metric": "loss",
        "small_best": {"value": small_loss, "width": args.small_width, "lr": args.lr},
        "large_eval": {"value": large_loss, "width": args.large_width, "lr": args.lr},
    }

    out = Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(large_trace, indent=2))
    print(f"wrote {out}")
    print(f"small_loss={small_loss:.6f} large_loss={large_loss:.6f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
