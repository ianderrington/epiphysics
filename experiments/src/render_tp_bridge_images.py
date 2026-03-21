#!/usr/bin/env python3
"""Render TP bridge metrics into labeled SVG images (and optional dashboard PNG)."""

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


def render_line_chart(title: str, vals: List[float], out_path: Path, y_label: str, color: str = "#2563eb") -> None:
    W, H = 1000, 520
    m = 80
    x0, y0 = m, m
    w, h = W - 2 * m, H - 2 * m

    pts = _scale_series(vals, x0, y0, w, h)
    path = _line_path(pts)

    vmin = min(vals) if vals else 0.0
    vmax = max(vals) if vals else 1.0

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="{m}" y="34" font-size="26" font-family="Arial" fill="#111827">{title}</text>
  <line x1="{x0}" y1="{y0+h}" x2="{x0+w}" y2="{y0+h}" stroke="#9ca3af" stroke-width="2"/>
  <line x1="{x0}" y1="{y0}" x2="{x0}" y2="{y0+h}" stroke="#9ca3af" stroke-width="2"/>
  <text x="{x0 + w/2:.0f}" y="{y0+h+42}" text-anchor="middle" font-size="15" font-family="Arial" fill="#374151">Training step (t)</text>
  <text x="24" y="{y0 + h/2:.0f}" text-anchor="middle" transform="rotate(-90 24 {y0 + h/2:.0f})" font-size="15" font-family="Arial" fill="#374151">{y_label}</text>
  <text x="{x0}" y="{y0+h+22}" font-size="13" font-family="Arial" fill="#374151">t=0</text>
  <text x="{x0+w-45}" y="{y0+h+22}" font-size="13" font-family="Arial" fill="#374151">t=end</text>
  <text x="{x0-12}" y="{y0+h+5}" text-anchor="end" font-size="12" font-family="Arial" fill="#6b7280">{vmin:.4f}</text>
  <text x="{x0-12}" y="{y0+5}" text-anchor="end" font-size="12" font-family="Arial" fill="#6b7280">{vmax:.4f}</text>
  <path d="{path}" fill="none" stroke="{color}" stroke-width="3"/>
</svg>
'''
    out_path.write_text(svg)


def render_multi_line_chart(title: str, matrix: List[List[float]], out_path: Path, y_label: str) -> None:
    W, H = 1000, 520
    m = 80
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
        labels.append(f'<text x="{x0 + 12 + 120*c}" y="{y0-20}" font-size="13" fill="{color}" font-family="Arial">layer {c}</text>')

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="{m}" y="34" font-size="26" font-family="Arial" fill="#111827">{title}</text>
  <line x1="{x0}" y1="{y0+h}" x2="{x0+w}" y2="{y0+h}" stroke="#9ca3af" stroke-width="2"/>
  <line x1="{x0}" y1="{y0}" x2="{x0}" y2="{y0+h}" stroke="#9ca3af" stroke-width="2"/>
  <text x="{x0 + w/2:.0f}" y="{y0+h+42}" text-anchor="middle" font-size="15" font-family="Arial" fill="#374151">Training step (t)</text>
  <text x="24" y="{y0 + h/2:.0f}" text-anchor="middle" transform="rotate(-90 24 {y0 + h/2:.0f})" font-size="15" font-family="Arial" fill="#374151">{y_label}</text>
  <text x="{x0-12}" y="{y0+h+5}" text-anchor="end" font-size="12" font-family="Arial" fill="#6b7280">{vmin:.4f}</text>
  <text x="{x0-12}" y="{y0+5}" text-anchor="end" font-size="12" font-family="Arial" fill="#6b7280">{vmax:.4f}</text>
  {''.join(paths)}
  {''.join(labels)}
</svg>
'''
    out_path.write_text(svg)


def interpret(summary: dict) -> str:
    rep = summary.get("representation_drift_final")
    ntk = summary.get("ntk_drift_final")
    upd = summary.get("layer_update_norm_mean")
    treg = summary.get("transfer_regret")

    lines = ["# TP Bridge Metrics Interpretation", ""]
    if rep is not None:
        lines.append(f"- **Representation drift (final = {rep:.4f})**: internal features changed substantially over training.")
    if ntk is not None:
        regime = "kernel-like" if ntk < 0.03 else ("mixed" if ntk < 0.10 else "feature-learning / non-frozen-kernel")
        lines.append(f"- **NTK drift (final = {ntk:.4f})**: suggests **{regime}** dynamics.")
    if upd is not None:
        lines.append(f"- **Mean layer update norm ({upd:.4f})**: nontrivial parameter motion throughout training.")
    if treg is not None:
        if treg <= 0:
            lines.append(f"- **Transfer regret ({treg:.4f})**: transferred setting did not degrade large-width loss (good sign).")
        else:
            lines.append(f"- **Transfer regret ({treg:.4f})**: transfer incurred loss penalty; scaling/parametrization may need adjustment.")
    lines.append("")
    lines.append("Interpretation is heuristic and should be validated on larger, architecture-realistic runs.")
    return "\n".join(lines)


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

    render_line_chart("Representation Drift", rep, out_dir / "representation_drift.svg", "Relative drift from t=0", "#2563eb")
    render_line_chart("NTK Drift", ntk, out_dir / "ntk_drift.svg", "Relative Frobenius drift from t=0", "#7c3aed")
    render_multi_line_chart("Layer Update Norms", upd, out_dir / "layer_update_norms.svg", "L2 norm of parameter update")

    summary = metrics.get("summary", {})
    (out_dir / "implications.md").write_text(interpret(summary))

    print(f"wrote images + interpretation to {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
