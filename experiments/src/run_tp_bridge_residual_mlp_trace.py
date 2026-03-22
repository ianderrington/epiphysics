#!/usr/bin/env python3
"""
Architecture-leaning TP bridge trace: residual 2-block MLP (pure Python, no deps).
Emits trace schema compatible with tp_bridge_metrics.py.
"""

from __future__ import annotations

import argparse
import json
import math
import random
from pathlib import Path
from typing import List, Tuple


def relu(x: float) -> float:
    return x if x > 0.0 else 0.0


def drelu(x: float) -> float:
    return 1.0 if x > 0.0 else 0.0


def dot(a: List[float], b: List[float]) -> float:
    return sum(x * y for x, y in zip(a, b))


def matvec(w: List[List[float]], x: List[float], b: List[float]) -> List[float]:
    return [dot(row, x) + bj for row, bj in zip(w, b)]


def outer(a: List[float], b: List[float]) -> List[List[float]]:
    return [[ai * bj for bj in b] for ai in a]


def vadd(a: List[float], b: List[float]) -> List[float]:
    return [x + y for x, y in zip(a, b)]


def vsub(a: List[float], b: List[float]) -> List[float]:
    return [x - y for x, y in zip(a, b)]


class ResidualMLP:
    def __init__(self, d: int, h: int, seed: int = 0):
        rnd = random.Random(seed)
        s = 1.0 / math.sqrt(max(1, d))

        def rand_mat(r: int, c: int, scale: float) -> List[List[float]]:
            return [[rnd.uniform(-scale, scale) for _ in range(c)] for _ in range(r)]

        def zeros(n: int) -> List[float]:
            return [0.0 for _ in range(n)]

        self.d, self.h = d, h
        # Block 1
        self.w11 = rand_mat(h, d, s)
        self.b11 = zeros(h)
        self.w12 = rand_mat(d, h, s)
        self.b12 = zeros(d)
        # Block 2
        self.w21 = rand_mat(h, d, s)
        self.b21 = zeros(h)
        self.w22 = rand_mat(d, h, s)
        self.b22 = zeros(d)
        # Head
        self.wh = [rnd.uniform(-s, s) for _ in range(d)]
        self.bh = 0.0

    def forward(self, x: List[float]):
        # block 1
        z11 = matvec(self.w11, x, self.b11)
        a11 = [relu(v) for v in z11]
        z12 = matvec(self.w12, a11, self.b12)
        r1 = vadd(x, z12)

        # block 2
        z21 = matvec(self.w21, r1, self.b21)
        a21 = [relu(v) for v in z21]
        z22 = matvec(self.w22, a21, self.b22)
        r2 = vadd(r1, z22)

        y = dot(self.wh, r2) + self.bh
        cache = (x, z11, a11, z12, r1, z21, a21, z22, r2)
        return y, r2, cache

    def flat_params_by_layer(self) -> List[List[float]]:
        f = lambda m: [x for row in m for x in row]
        return [
            f(self.w11) + self.b11 + f(self.w12) + self.b12,
            f(self.w21) + self.b21 + f(self.w22) + self.b22,
            self.wh + [self.bh],
        ]

    def grads_for_output(self, cache, dL_dy: float):
        x, z11, a11, _z12, r1, z21, a21, _z22, r2 = cache
        d = self.d

        # Head
        g_wh = [dL_dy * v for v in r2]
        g_bh = dL_dy
        g_r2 = [dL_dy * w for w in self.wh]

        # Block 2 second linear (z22 -> r2)
        g_z22 = g_r2[:]  # residual add
        g_w22 = outer(g_z22, a21)
        g_b22 = g_z22[:]
        # back to a21
        g_a21 = [sum(self.w22[i][j] * g_z22[i] for i in range(d)) for j in range(self.h)]

        # Block 2 first linear (z21 -> a21)
        g_z21 = [g_a21[j] * drelu(z21[j]) for j in range(self.h)]
        g_w21 = outer(g_z21, r1)
        g_b21 = g_z21[:]
        g_r1_via_b2 = [sum(self.w21[i][j] * g_z21[i] for i in range(self.h)) for j in range(d)]

        # residual path r1->r2
        g_r1 = vadd(g_r2, g_r1_via_b2)

        # Block 1 second linear (z12 -> r1)
        g_z12 = g_r1[:]
        g_w12 = outer(g_z12, a11)
        g_b12 = g_z12[:]
        g_a11 = [sum(self.w12[i][j] * g_z12[i] for i in range(d)) for j in range(self.h)]

        # Block 1 first linear
        g_z11 = [g_a11[j] * drelu(z11[j]) for j in range(self.h)]
        g_w11 = outer(g_z11, x)
        g_b11 = g_z11[:]

        return {
            "w11": g_w11, "b11": g_b11, "w12": g_w12, "b12": g_b12,
            "w21": g_w21, "b21": g_b21, "w22": g_w22, "b22": g_b22,
            "wh": g_wh, "bh": g_bh,
        }

    def apply_grads(self, g, lr: float, inv_n: float):
        s = lr * inv_n
        for i in range(self.h):
            for j in range(self.d):
                self.w11[i][j] -= s * g["w11"][i][j]
            self.b11[i] -= s * g["b11"][i]
        for i in range(self.d):
            for j in range(self.h):
                self.w12[i][j] -= s * g["w12"][i][j]
            self.b12[i] -= s * g["b12"][i]

        for i in range(self.h):
            for j in range(self.d):
                self.w21[i][j] -= s * g["w21"][i][j]
            self.b21[i] -= s * g["b21"][i]
        for i in range(self.d):
            for j in range(self.h):
                self.w22[i][j] -= s * g["w22"][i][j]
            self.b22[i] -= s * g["b22"][i]

        for i in range(self.d):
            self.wh[i] -= s * g["wh"][i]
        self.bh -= s * g["bh"]


def make_dataset(n: int, d: int, seed: int) -> List[Tuple[List[float], float]]:
    rnd = random.Random(seed)
    w_true = [rnd.uniform(-1.5, 1.5) for _ in range(d)]
    data = []
    for _ in range(n):
        x = [rnd.uniform(-1.0, 1.0) for _ in range(d)]
        # nonlinear target
        y = dot(w_true, x) + 0.4 * math.sin(2.0 * x[0]) + 0.2 * x[1] * x[2]
        y += rnd.gauss(0.0, 0.03)
        data.append((x, y))
    return data


def batch_loss(model: ResidualMLP, data):
    total = 0.0
    for x, y in data:
        yhat, _r, _c = model.forward(x)
        e = yhat - y
        total += 0.5 * e * e
    return total / max(1, len(data))


def zero_like(model: ResidualMLP):
    z = {}
    z["w11"] = [[0.0 for _ in range(model.d)] for _ in range(model.h)]
    z["b11"] = [0.0 for _ in range(model.h)]
    z["w12"] = [[0.0 for _ in range(model.h)] for _ in range(model.d)]
    z["b12"] = [0.0 for _ in range(model.d)]
    z["w21"] = [[0.0 for _ in range(model.d)] for _ in range(model.h)]
    z["b21"] = [0.0 for _ in range(model.h)]
    z["w22"] = [[0.0 for _ in range(model.h)] for _ in range(model.d)]
    z["b22"] = [0.0 for _ in range(model.d)]
    z["wh"] = [0.0 for _ in range(model.d)]
    z["bh"] = 0.0
    return z


def add_grads(dst, src, scale=1.0):
    for i in range(len(dst["w11"])):
        for j in range(len(dst["w11"][0])):
            dst["w11"][i][j] += scale * src["w11"][i][j]
    for i in range(len(dst["b11"])):
        dst["b11"][i] += scale * src["b11"][i]
    for i in range(len(dst["w12"])):
        for j in range(len(dst["w12"][0])):
            dst["w12"][i][j] += scale * src["w12"][i][j]
    for i in range(len(dst["b12"])):
        dst["b12"][i] += scale * src["b12"][i]

    for i in range(len(dst["w21"])):
        for j in range(len(dst["w21"][0])):
            dst["w21"][i][j] += scale * src["w21"][i][j]
    for i in range(len(dst["b21"])):
        dst["b21"][i] += scale * src["b21"][i]
    for i in range(len(dst["w22"])):
        for j in range(len(dst["w22"][0])):
            dst["w22"][i][j] += scale * src["w22"][i][j]
    for i in range(len(dst["b22"])):
        dst["b22"][i] += scale * src["b22"][i]

    for i in range(len(dst["wh"])):
        dst["wh"][i] += scale * src["wh"][i]
    dst["bh"] += scale * src["bh"]


def jacobian_output(model: ResidualMLP, x: List[float]) -> List[float]:
    _y, _r, cache = model.forward(x)
    g = model.grads_for_output(cache, 1.0)
    flat = []
    for i in range(model.h):
        flat.extend(g["w11"][i])
    flat.extend(g["b11"])
    for i in range(model.d):
        flat.extend(g["w12"][i])
    flat.extend(g["b12"])

    for i in range(model.h):
        flat.extend(g["w21"][i])
    flat.extend(g["b21"])
    for i in range(model.d):
        flat.extend(g["w22"][i])
    flat.extend(g["b22"])

    flat.extend(g["wh"])
    flat.append(g["bh"])
    return flat


def train_and_trace(width: int, lr: float, steps: int, seed: int, d: int = 6):
    model = ResidualMLP(d=d, h=width, seed=seed)
    data = make_dataset(n=96, d=d, seed=seed + 77)
    probe = [x for x, _ in data[:8]]

    trace = {
        "metadata": {
            "run_type": "real_architecture_training",
            "model": "residual_mlp_2block_purepy",
            "parametrization_class": "standard",
            "optimizer_family": "SGD",
            "width_vector": [width],
            "depth_vector": [5],
            "input_dim": d,
            "lr": lr,
            "steps": steps,
        },
        "repr": [],
        "params_by_layer": [],
        "ntk": [],
    }

    for t in range(steps + 1):
        # representation = mean post-block2 vector
        rep = [0.0 for _ in range(d)]
        for x, _y in data:
            _yh, r2, _cache = model.forward(x)
            for i in range(d):
                rep[i] += r2[i]
        rep = [v / len(data) for v in rep]
        trace["repr"].append(rep)
        trace["params_by_layer"].append(model.flat_params_by_layer())

        jacs = [jacobian_output(model, x) for x in probe]
        gram = []
        for i in range(len(jacs)):
            row = []
            for k in range(len(jacs)):
                row.append(dot(jacs[i], jacs[k]))
            gram.append(row)
        trace["ntk"].append(gram)

        if t == steps:
            break

        agg = zero_like(model)
        for x, y in data:
            yhat, _r, cache = model.forward(x)
            err = yhat - y
            g = model.grads_for_output(cache, err)
            add_grads(agg, g, 1.0)

        model.apply_grads(agg, lr=lr, inv_n=1.0 / len(data))

    return trace, batch_loss(model, data)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--steps", type=int, default=30)
    ap.add_argument("--lr", type=float, default=0.03)
    ap.add_argument("--small-width", type=int, default=8)
    ap.add_argument("--large-width", type=int, default=24)
    ap.add_argument("--seed", type=int, default=42)
    ap.add_argument("--output", default="experiments/results/tp_bridge/arch_trace_real.json")
    args = ap.parse_args()

    small_trace, small_loss = train_and_trace(args.small_width, args.lr, args.steps, args.seed)
    large_trace, large_loss = train_and_trace(args.large_width, args.lr, args.steps, args.seed + 1)

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
