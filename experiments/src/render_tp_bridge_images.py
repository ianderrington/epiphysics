#!/usr/bin/env python3
"""Render TP bridge metrics into SVG images (no third-party deps)."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import List, Tuple


def _line_path(points: List[Tuple[float, float]]) -> str:
    if not points:
        return ""
    d = [f"M {points[0][0]:.2f} {points[0][1]:.2f}"]
    for x, y in points[1:]:
        d.append(f"L {x:.2f} {y:.2f}")
    return " ".join(d)


def _scale_series(vals: List[float], x0: float, y0: float, w: float, h: float) -> List[Tuple[float, float]]:
    if not vals:
        return []
    n = len(vals)
    vmin, vmax = min(vals), max(vals)
    if vmax == vmin:
        vmax = vmin + 1e-9
    pts = []
    for i, v in enumerate(vals):
        x = x0 + (i / max(1, n - 1)) * w
        y = y0 + h - ((v - vmin) / (vmax - vmin)) * h
        pts.append((x, y))
    return pts


def render_line_chart(title: str, vals: List[float], out_path: Path, color: str = "#2563eb") -> None:
    W, H = 1000, 500
    m = 60
    x0, y0 = m, m
    w, h = W - 2 * m, H - 2 * m

    pts = _scale_series(vals, x0, y0, w, h)
    path = _line_path(pts)

    vmin = min(vals) if vals else 0.0
    vmax = max(vals) if vals else 1.0

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="{m}" y="32" font-size="24" font-family="Arial" fill="#111827">{title}</text>
  <line x1="{x0}" y1="{y0+h}" x2="{x0+w}" y2="{y0+h}" stroke="#9ca3af" stroke-width="2"/>
  <line x1="{x0}" y1="{y0}" x2="{x0}" y2="{y0+h}" stroke="#9ca3af" stroke-width="2"/>
  <text x="{x0}" y="{y0+h+30}" font-size="14" font-family="Arial" fill="#374151">t=0</text>
  <text x="{x0+w-40}" y="{y0+h+30}" font-size="14" font-family="Arial" fill="#374151">t=end</text>
  <text x="{x0-10}" y="{y0+h+5}" text-anchor="end" font-size="12" font-family="Arial" fill="#6b7280">{vmin:.4f}</text>
  <text x="{x0-10}" y="{y0+5}" text-anchor="end" font-size="12" font-family="Arial" fill="#6b7280">{vmax:.4f}</text>
  <path d="{path}" fill="none" stroke="{color}" stroke-width="3"/>
</svg>
'''
    out_path.write_text(svg)


def render_multi_line_chart(title: str, matrix: List[List[float]], out_path: Path) -> None:
    W, H = 1000, 500
    m = 60
    x0, y0 = m, m
    w, h = W - 2 * m, H - 2 * m

    rows = matrix or []
    if not rows:
        out_path.write_text("<svg xmlns='http://www.w3.org/2000/svg' width='800' height='200'><text x='20' y='40'>No data</text></svg>")
        return

    cols = len(rows[0])
    series = [[r[c] for r in rows] for c in range(cols)]
    all_vals = [v for s in series for v in s]
    vmin, vmax = min(all_vals), max(all_vals)
    if vmax == vmin:
        vmax = vmin + 1e-9

    colors = ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#06b6d4"]
    paths = []
    labels = []
    for c, vals in enumerate(series):
        pts = []
        n = len(vals)
        for i, v in enumerate(vals):
            x = x0 + (i / max(1, n - 1)) * w
            y = y0 + h - ((v - vmin) / (vmax - vmin)) * h
            pts.append((x, y))
        color = colors[c % len(colors)]
        paths.append(f'<path d="{_line_path(pts)}" fill="none" stroke="{color}" stroke-width="2.5"/>')
        labels.append(f'<text x="{x0 + 10 + 130*c}" y="{y0-18}" font-size="13" fill="{color}" font-family="Arial">layer {c}</text>')

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="{m}" y="32" font-size="24" font-family="Arial" fill="#111827">{title}</text>
  <line x1="{x0}" y1="{y0+h}" x2="{x0+w}" y2="{y0+h}" stroke="#9ca3af" stroke-width="2"/>
  <line x1="{x0}" y1="{y0}" x2="{x0}" y2="{y0+h}" stroke="#9ca3af" stroke-width="2"/>
  <text x="{x0-10}" y="{y0+h+5}" text-anchor="end" font-size="12" font-family="Arial" fill="#6b7280">{vmin:.4f}</text>
  <text x="{x0-10}" y="{y0+5}" text-anchor="end" font-size="12" font-family="Arial" fill="#6b7280">{vmax:.4f}</text>
  {''.join(paths)}
  {''.join(labels)}
</svg>
'''
    out_path.write_text(svg)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("metrics", help="Path to metrics JSON")
    ap.add_argument("--out-dir", default="experiments/results/tp_bridge/images")
    args = ap.parse_args()

    metrics = json.loads(Path(args.metrics).read_text())
    per = metrics.get("per_step", {})

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    rep = per.get("representation_drift", [])
    ntk = per.get("ntk_drift", [])
    upd = per.get("layer_update_norms", [])

    render_line_chart("Representation Drift", rep, out_dir / "representation_drift.svg", "#2563eb")
    render_line_chart("NTK Drift", ntk, out_dir / "ntk_drift.svg", "#7c3aed")
    render_multi_line_chart("Layer Update Norms", upd, out_dir / "layer_update_norms.svg")

    print(f"wrote images to {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
