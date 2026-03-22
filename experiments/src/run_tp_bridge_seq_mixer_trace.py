#!/usr/bin/env python3
"""
Architecture-realistic TP bridge trace: tiny residual sequence mixer (pure Python).
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


def vadd(a: List[float], b: List[float]) -> List[float]:
    return [x + y for x, y in zip(a, b)]


def matvec(m: List[List[float]], x: List[float], b: List[float]) -> List[float]:
    return [dot(row, x) + bj for row, bj in zip(m, b)]


def outer(a: List[float], b: List[float]) -> List[List[float]]:
    return [[ai * bj for bj in b] for ai in a]


class TinySeqMixer:
    """Two residual mixer blocks over T tokens with channel dim D."""

    def __init__(self, t: int, d: int, h: int, seed: int = 0):
        rnd = random.Random(seed)
        s = 1.0 / math.sqrt(max(1, d))

        def rand_mat(r: int, c: int, scale: float):
            return [[rnd.uniform(-scale, scale) for _ in range(c)] for _ in range(r)]

        def zeros(n: int):
            return [0.0 for _ in range(n)]

        self.t, self.d, self.h = t, d, h
        # block1 token-mixer and channel-mixer
        self.wt1 = rand_mat(t, t, s)
        self.bt1 = zeros(t)
        self.wc1a = rand_mat(h, d, s)
        self.bc1a = zeros(h)
        self.wc1b = rand_mat(d, h, s)
        self.bc1b = zeros(d)
        # block2
        self.wt2 = rand_mat(t, t, s)
        self.bt2 = zeros(t)
        self.wc2a = rand_mat(h, d, s)
        self.bc2a = zeros(h)
        self.wc2b = rand_mat(d, h, s)
        self.bc2b = zeros(d)
        # head over mean pooled token reps
        self.wh = [rnd.uniform(-s, s) for _ in range(d)]
        self.bh = 0.0

    def _token_mix(self, x: List[List[float]], wt: List[List[float]], bt: List[float]) -> List[List[float]]:
        # x: [T][D], mix across T for each channel independently
        out = [[0.0 for _ in range(self.d)] for _ in range(self.t)]
        for c in range(self.d):
            col = [x[i][c] for i in range(self.t)]
            mixed = matvec(wt, col, bt)
            for i in range(self.t):
                out[i][c] = mixed[i]
        return out

    def _channel_mix(self, x: List[List[float]], w1, b1, w2, b2):
        z1, a1, z2 = [], [], []
        out = []
        for i in range(self.t):
            z = matvec(w1, x[i], b1)
            a = [relu(v) for v in z]
            y = matvec(w2, a, b2)
            z1.append(z)
            a1.append(a)
            z2.append(y)
            out.append(y)
        return z1, a1, z2, out

    def forward(self, x: List[List[float]]):
        # block 1
        tm1 = self._token_mix(x, self.wt1, self.bt1)
        x1 = [[x[i][j] + tm1[i][j] for j in range(self.d)] for i in range(self.t)]
        zc1, ac1, y1, cm1 = self._channel_mix(x1, self.wc1a, self.bc1a, self.wc1b, self.bc1b)
        r1 = [[x1[i][j] + cm1[i][j] for j in range(self.d)] for i in range(self.t)]

        # block 2
        tm2 = self._token_mix(r1, self.wt2, self.bt2)
        x2 = [[r1[i][j] + tm2[i][j] for j in range(self.d)] for i in range(self.t)]
        zc2, ac2, y2, cm2 = self._channel_mix(x2, self.wc2a, self.bc2a, self.wc2b, self.bc2b)
        r2 = [[x2[i][j] + cm2[i][j] for j in range(self.d)] for i in range(self.t)]

        pooled = [sum(r2[i][j] for i in range(self.t)) / self.t for j in range(self.d)]
        y = dot(self.wh, pooled) + self.bh
        cache = (x, tm1, x1, zc1, ac1, y1, r1, tm2, x2, zc2, ac2, y2, r2, pooled)
        return y, pooled, cache

    def flat_params_by_layer(self) -> List[List[float]]:
        f = lambda m: [x for row in m for x in row]
        return [
            f(self.wt1) + self.bt1 + f(self.wc1a) + self.bc1a + f(self.wc1b) + self.bc1b,
            f(self.wt2) + self.bt2 + f(self.wc2a) + self.bc2a + f(self.wc2b) + self.bc2b,
            self.wh + [self.bh],
        ]

    def grads_for_output(self, cache, dldy: float):
        x, tm1, x1, zc1, ac1, y1, r1, tm2, x2, zc2, ac2, y2, r2, pooled = cache
        # This is a compact exact backprop for this tiny architecture.
        g = {
            'wt1': [[0.0 for _ in range(self.t)] for _ in range(self.t)], 'bt1': [0.0 for _ in range(self.t)],
            'wc1a': [[0.0 for _ in range(self.d)] for _ in range(self.h)], 'bc1a': [0.0 for _ in range(self.h)],
            'wc1b': [[0.0 for _ in range(self.h)] for _ in range(self.d)], 'bc1b': [0.0 for _ in range(self.d)],
            'wt2': [[0.0 for _ in range(self.t)] for _ in range(self.t)], 'bt2': [0.0 for _ in range(self.t)],
            'wc2a': [[0.0 for _ in range(self.d)] for _ in range(self.h)], 'bc2a': [0.0 for _ in range(self.h)],
            'wc2b': [[0.0 for _ in range(self.h)] for _ in range(self.d)], 'bc2b': [0.0 for _ in range(self.d)],
            'wh': [0.0 for _ in range(self.d)], 'bh': 0.0,
        }

        # head
        for j in range(self.d):
            g['wh'][j] = dldy * pooled[j]
        g['bh'] = dldy
        g_r2 = [[dldy * self.wh[j] / self.t for j in range(self.d)] for _ in range(self.t)]

        # block2 channel backprop
        g_x2 = [[g_r2[i][j] for j in range(self.d)] for i in range(self.t)]
        for i in range(self.t):
            gz2 = g_r2[i][:]
            for o in range(self.d):
                g['bc2b'][o] += gz2[o]
                for h in range(self.h):
                    g['wc2b'][o][h] += gz2[o] * ac2[i][h]
            ga2 = [sum(self.wc2b[o][h] * gz2[o] for o in range(self.d)) for h in range(self.h)]
            gz1 = [ga2[h] * drelu(zc2[i][h]) for h in range(self.h)]
            for h in range(self.h):
                g['bc2a'][h] += gz1[h]
                for c in range(self.d):
                    g['wc2a'][h][c] += gz1[h] * x2[i][c]
            gx = [sum(self.wc2a[h][c] * gz1[h] for h in range(self.h)) for c in range(self.d)]
            for c in range(self.d):
                g_x2[i][c] += gx[c]

        # block2 token mixer backprop (x2 = r1 + token_mix(r1))
        g_r1 = [[g_x2[i][j] for j in range(self.d)] for i in range(self.t)]
        for c in range(self.d):
            gr = [g_x2[i][c] for i in range(self.t)]
            col = [r1[i][c] for i in range(self.t)]
            for i in range(self.t):
                g['bt2'][i] += gr[i]
                for j in range(self.t):
                    g['wt2'][i][j] += gr[i] * col[j]
                    g_r1[j][c] += self.wt2[i][j] * gr[i]

        # block1 channel backprop
        g_x1 = [[g_r1[i][j] for j in range(self.d)] for i in range(self.t)]
        for i in range(self.t):
            gz2 = g_r1[i][:]
            for o in range(self.d):
                g['bc1b'][o] += gz2[o]
                for h in range(self.h):
                    g['wc1b'][o][h] += gz2[o] * ac1[i][h]
            ga1 = [sum(self.wc1b[o][h] * gz2[o] for o in range(self.d)) for h in range(self.h)]
            gz1 = [ga1[h] * drelu(zc1[i][h]) for h in range(self.h)]
            for h in range(self.h):
                g['bc1a'][h] += gz1[h]
                for c in range(self.d):
                    g['wc1a'][h][c] += gz1[h] * x1[i][c]
            gx = [sum(self.wc1a[h][c] * gz1[h] for h in range(self.h)) for c in range(self.d)]
            for c in range(self.d):
                g_x1[i][c] += gx[c]

        # block1 token mixer backprop
        for c in range(self.d):
            gx = [g_x1[i][c] for i in range(self.t)]
            col = [x[i][c] for i in range(self.t)]
            for i in range(self.t):
                g['bt1'][i] += gx[i]
                for j in range(self.t):
                    g['wt1'][i][j] += gx[i] * col[j]

        return g

    def apply_grads(self, g, lr: float, inv_n: float):
        s = lr * inv_n
        for i in range(self.t):
            self.bt1[i] -= s * g['bt1'][i]
            self.bt2[i] -= s * g['bt2'][i]
            for j in range(self.t):
                self.wt1[i][j] -= s * g['wt1'][i][j]
                self.wt2[i][j] -= s * g['wt2'][i][j]

        for h in range(self.h):
            self.bc1a[h] -= s * g['bc1a'][h]
            self.bc2a[h] -= s * g['bc2a'][h]
            for c in range(self.d):
                self.wc1a[h][c] -= s * g['wc1a'][h][c]
                self.wc2a[h][c] -= s * g['wc2a'][h][c]

        for o in range(self.d):
            self.bc1b[o] -= s * g['bc1b'][o]
            self.bc2b[o] -= s * g['bc2b'][o]
            for h in range(self.h):
                self.wc1b[o][h] -= s * g['wc1b'][o][h]
                self.wc2b[o][h] -= s * g['wc2b'][o][h]

        for j in range(self.d):
            self.wh[j] -= s * g['wh'][j]
        self.bh -= s * g['bh']


def make_dataset(n: int, t: int, d: int, seed: int) -> List[Tuple[List[List[float]], float]]:
    rnd = random.Random(seed)
    data = []
    for _ in range(n):
        x = [[rnd.uniform(-1.0, 1.0) for _ in range(d)] for _ in range(t)]
        # temporal nonlinear target
        y = 0.0
        for i in range(t):
            y += 0.25 * x[i][0]
        y += 0.35 * math.sin(x[0][1] + x[1][1])
        y += 0.15 * x[2][2] * x[3][2]
        y += rnd.gauss(0.0, 0.02)
        data.append((x, y))
    return data


def batch_loss(model: TinySeqMixer, data):
    total = 0.0
    for x, y in data:
        yhat, _rep, _cache = model.forward(x)
        e = yhat - y
        total += 0.5 * e * e
    return total / max(1, len(data))


def zero_like(model: TinySeqMixer):
    g = {
        'wt1': [[0.0 for _ in range(model.t)] for _ in range(model.t)], 'bt1': [0.0 for _ in range(model.t)],
        'wc1a': [[0.0 for _ in range(model.d)] for _ in range(model.h)], 'bc1a': [0.0 for _ in range(model.h)],
        'wc1b': [[0.0 for _ in range(model.h)] for _ in range(model.d)], 'bc1b': [0.0 for _ in range(model.d)],
        'wt2': [[0.0 for _ in range(model.t)] for _ in range(model.t)], 'bt2': [0.0 for _ in range(model.t)],
        'wc2a': [[0.0 for _ in range(model.d)] for _ in range(model.h)], 'bc2a': [0.0 for _ in range(model.h)],
        'wc2b': [[0.0 for _ in range(model.h)] for _ in range(model.d)], 'bc2b': [0.0 for _ in range(model.d)],
        'wh': [0.0 for _ in range(model.d)], 'bh': 0.0,
    }
    return g


def add_grads(dst, src):
    for k, v in dst.items():
        if isinstance(v, float):
            dst[k] += src[k]
        elif isinstance(v, list) and v and isinstance(v[0], float):
            for i in range(len(v)):
                dst[k][i] += src[k][i]
        else:
            for i in range(len(v)):
                for j in range(len(v[i])):
                    dst[k][i][j] += src[k][i][j]


def jacobian_output(model: TinySeqMixer, x: List[List[float]]) -> List[float]:
    _y, _rep, cache = model.forward(x)
    g = model.grads_for_output(cache, 1.0)
    flat: List[float] = []
    for name in ['wt1', 'bt1', 'wc1a', 'bc1a', 'wc1b', 'bc1b', 'wt2', 'bt2', 'wc2a', 'bc2a', 'wc2b', 'bc2b', 'wh', 'bh']:
        v = g[name]
        if isinstance(v, float):
            flat.append(v)
        elif isinstance(v, list) and v and isinstance(v[0], float):
            flat.extend(v)
        else:
            for row in v:
                flat.extend(row)
    return flat


def train_and_trace(width: int, lr: float, steps: int, seed: int, t: int = 4, d: int = 6):
    model = TinySeqMixer(t=t, d=d, h=width, seed=seed)
    data = make_dataset(n=80, t=t, d=d, seed=seed + 91)
    probe = [x for x, _ in data[:8]]

    trace = {
        'metadata': {
            'run_type': 'real_architecture_training',
            'model': 'seq_mixer_2block_purepy',
            'parametrization_class': 'standard',
            'optimizer_family': 'SGD',
            'width_vector': [width],
            'depth_vector': [5],
            'tokens': t,
            'channels': d,
            'lr': lr,
            'steps': steps,
        },
        'repr': [],
        'params_by_layer': [],
        'ntk': [],
    }

    for step in range(steps + 1):
        rep = [0.0 for _ in range(d)]
        for x, _y in data:
            _yh, pooled, _c = model.forward(x)
            for j in range(d):
                rep[j] += pooled[j]
        rep = [v / len(data) for v in rep]
        trace['repr'].append(rep)
        trace['params_by_layer'].append(model.flat_params_by_layer())

        jacs = [jacobian_output(model, x) for x in probe]
        gram = [[dot(jacs[i], jacs[k]) for k in range(len(jacs))] for i in range(len(jacs))]
        trace['ntk'].append(gram)

        if step == steps:
            break

        agg = zero_like(model)
        for x, y in data:
            yhat, _rep, cache = model.forward(x)
            err = yhat - y
            g = model.grads_for_output(cache, err)
            add_grads(agg, g)
        model.apply_grads(agg, lr=lr, inv_n=1.0 / len(data))

    return trace, batch_loss(model, data)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--steps', type=int, default=30)
    ap.add_argument('--lr', type=float, default=0.03)
    ap.add_argument('--small-width', type=int, default=10)
    ap.add_argument('--large-width', type=int, default=28)
    ap.add_argument('--seed', type=int, default=77)
    ap.add_argument('--output', default='experiments/results/tp_bridge/seq_mixer_trace_real.json')
    args = ap.parse_args()

    small_trace, small_loss = train_and_trace(args.small_width, args.lr, args.steps, args.seed)
    large_trace, large_loss = train_and_trace(args.large_width, args.lr, args.steps, args.seed + 1)

    large_trace['metadata']['transfer_from_small_width'] = args.small_width
    large_trace['metadata']['large_width'] = args.large_width
    large_trace['hp_transfer'] = {
        'metric': 'loss',
        'small_best': {'value': small_loss, 'width': args.small_width, 'lr': args.lr},
        'large_eval': {'value': large_loss, 'width': args.large_width, 'lr': args.lr},
    }

    out = Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(large_trace, indent=2))
    print(f'wrote {out}')
    print(f'small_loss={small_loss:.6f} large_loss={large_loss:.6f}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
