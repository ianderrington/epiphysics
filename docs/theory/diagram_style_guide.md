---
title: "Causant Diagram Style Guide"
description: >-
  Minimal, reusable visual standard for Epimechanics diagrams using Mermaid-first
  notation so diagrams can be embedded at all report levels.
date: 2026-03-22T00:00:00.000Z
draft: true
author:
  name: "Ian Derrington"
contentType: article
series: "Epimechanics"
---

## Purpose

Use one simple diagram language across theory, research notes, and reports.

**Default:** Mermaid in markdown.  
**Escalate to image/SVG only when Mermaid cannot express the needed geometry.**

---

## Core Notation

### Nodes
- Rectangles = state-bearing entities/subsystems
- Rounded nodes = aggregates/meta-entities

### Edges (Causants)
- Directed edge `A --> B` = causant relation
- Edge label format: `σ, τ, r`
  - `σ` = strength
  - `τ` = latency
  - `r` = reliability

### Loop semantics
- A closed directed cycle indicates potential auto-causality.
- Loop-order can be annotated in node text or edge labels.

### Maintenance semantics
- `Ṡ_int` = internal entropy production
- `Ṙ_repair` = repair rate
- `C_maint = Ṡ_int - Ṙ_repair`

---

## Template 1 — Causant Interaction Graph

```mermaid
flowchart LR
  A[Subsystem A] -->|σ=0.8, τ=1, r=0.9| B[Subsystem B]
  B -->|σ=0.6, τ=2, r=0.8| C[Subsystem C]
  C -->|σ=0.7, τ=1, r=0.85| A

  classDef loopEdge stroke:#2563eb,stroke-width:2px;
```

---

## Template 2 — Loop Emergence (Bond vs Loop Level)

```mermaid
flowchart LR
  subgraph Micro[Bond-level view]
    A1[A] --> B1[B]
    B1 --> C1[C]
    C1 --> A1
  end

  subgraph Macro[Loop-level view]
    L((Closed loop))
    RAC[ρ_ac > 0]
    L --> RAC
  end

  Micro --> Macro
```

---

## Template 3 — Maintenance Balance

```mermaid
flowchart TD
  Sint[Ṡ_int: entropy production] --> Net[C_maint]
  Rrep[Ṙ_repair: repair rate] --> Net
  Net[Net maintenance pressure
C_maint = Ṡ_int - Ṙ_repair]
```

---

## Authoring Rules

1. Keep diagrams small (5–12 nodes).
2. One conceptual claim per diagram.
3. Use consistent symbols (`σ, τ, r, ρ_ac, Ṡ_int, Ṙ_repair`).
4. If a page has >3 diagrams, include a mini legend block once.
5. Prefer multiple simple diagrams over one dense diagram.
