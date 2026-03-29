# Epimechanics Diagram Specifications

## Diagram 1: States and Representations

### Purpose
Explain the foundational distinction between potential state space (territory) and representations (maps), establishing the notation used throughout the series.

### Core Concepts to Convey

1. **𝒳 (Potential State Space)**
   - The territory — all states a system *could* occupy
   - Exists independently of any observer
   - Contains both actual and merely possible configurations
   - Visual: A manifold/surface representing the space of possibilities

2. **x ∈ 𝒳 (A Specific State)**
   - A particular point/configuration within the potential space
   - Could be actual (currently obtaining) or potential (possible but not current)
   - The representation doesn't care which — it models "state"
   - Visual: A highlighted point on the manifold

3. **X (Representation)**
   - A model of state — the map
   - NOT the same as x (a specific state)
   - X is a *system/function* that produces encodings of states
   - X(x) is the encoding of specific state x
   - Forms X can take:
     - Point estimate: X(x) = x̂ (single value, lossy)
     - Distribution: X(x) = P(·|observations) (uncertainty quantified)
     - Partial observation: X(x) = π_i(x) (subset of dimensions)
     - Compressed encoding: X(x) = encode(x) (any information-preserving structure)

4. **ℱ(X(x), x) (Representational Fidelity)**
   - Measures how well the *output of the representation system* tracks the *target state*
   - Correct signature: ℱ(X(x), x), not ℱ(X, x)
   - ℱ → 1: representation captures target accurately
   - ℱ → 0: representation is uninformative about target
   - Definition: ℱ = 1 - d(X(x), x) where d is appropriate divergence

5. **Key Insight: Representations Are States**
   - X must be instantiated somewhere (neurons, silicon, ink)
   - That instantiation has its own potential state space 𝒳'
   - This creates a recursive structure
   - Grounding: physical substrate eventually grounds the regress

### Visual Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                     STATES AND REPRESENTATIONS                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────────────┐         X(·)          ┌──────────────────┐   │
│   │  POTENTIAL STATE │  ──────────────────►  │  REPRESENTATION  │   │
│   │    SPACE  𝒳      │    representation     │     SPACE        │   │
│   │                  │       function        │                  │   │
│   │   [manifold]     │                       │   X(x) lives     │   │
│   │                  │                       │   here           │   │
│   │      • x         │                       │                  │   │
│   │   (a state)      │                       │   • x̂ (point)    │   │
│   │                  │                       │   • P(·) (dist)  │   │
│   │   the territory  │                       │   • π(x) (partial)│   │
│   └──────────────────┘                       └──────────────────┘   │
│                                                                      │
│              ℱ(X(x), x) = fidelity                                  │
│              how well X(x) tracks x                                  │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│  KEY INSIGHT: Representations are themselves states.                 │
│  X is instantiated in substrate with its own 𝒳'. Recursion grounds  │
│  in physical implementation.                                         │
└─────────────────────────────────────────────────────────────────────┘
```

### What NOT to Include
- Don't label X as "the map" without clarifying it's a function/system
- Don't write ℱ(X, x) — this conflates the system with its output
- Don't suggest X "is" a distribution — it *can produce* distributions
- Don't ignore the grounding problem for the recursion

### Notation Table (for legend)
| Symbol | Type | Meaning |
|--------|------|---------|
| 𝒳 | Space | Potential state space (all possible states) |
| x | Element | A specific state, x ∈ 𝒳 |
| X | Function | Representation system, X: 𝒳 → Encodings |
| X(x) | Output | The encoding of state x |
| ℱ | Metric | Fidelity, ℱ: Encodings × 𝒳 → [0,1] |

---

## Diagram 2: Four-Layer Architecture

### Purpose
Show how observable physical quantities (energy, mass) emerge from a substrate-independent causal primitive through successive levels of structure.

### Core Concepts to Convey

1. **Event Layer (Foundation)**
   - The primitive: causal event e: 𝒮_i → 𝒮_j (state transition)
   - No physics assumed — just "something caused something else"
   - Cause-plex 𝒞 = (E, ≺) where:
     - E = set of causal events
     - ≺ = causal precedence (strict partial order)
   - This is substrate-independent

2. **Structure Layer (Patterns)**
   - **Bond b**: Recurring causal connection between regions
     - Formation criterion: stable correlation — changes in region i reliably produce changes in region j
     - b: X_i ⇉ X_j (double arrow = recurring, not single event)
   - **Loop ℒ**: Closed composition of bonds returning to origin
     - ℒ: X_i → X_j → ... → X_i
     - Minimal structure for auto-causality (self-sustaining)
   - These are *patterns* in the cause-plex, not new primitives

3. **Descriptor Layer (Properties Q1-Q5)**
   - Continuous parameters characterizing bonds/loops:
   - **Q1: Transfer mode** — where received input goes
     - Kinetic-like (immediate propagation) ↔ Potential-like (stored)
     - NOTE: "Energy mode" is misleading since energy emerges above
   - **Q2: Output target** — what the output connects to
     - State (endpoint) / Bond (relay) / Loop (feedback)
   - **Q3: Topology** — open chain ↔ closed loop
   - **Q4: Leverage ratio Λ** — output magnitude / input magnitude
   - **Q5: Timescale** — bond latency relative to loop period
     - Derived from Q1-Q4 + reference clock
   - These classify *structural* properties, not physical observables

4. **Observable Layer (Emergence via Symmetry)**
   - Quantities that exist only where appropriate symmetries hold:
   - **Energy W**: Time-translation symmetry (Noether)
   - **Momentum p**: Spatial translation symmetry (Noether)
   - **Generalized mass ℳ**: Σ bond strengths = ∫ρ_causal dμ
   - **Auto-causal density ρ_ac**: Loop-level property (not bond-level)
   - **Causal power 𝒫**: F · v (rate of work)
   - **Maintenance cost C_maint**: entropy rate - repair rate

### Inter-Layer Relationships

```
Observable Layer  ←── symmetry conditions ───  (energy requires time-translation)
       ↑
   aggregation
       │
Descriptor Layer  ←── Q1-Q5 computed from ───  (structural analysis)
       ↑
   pattern recognition
       │
Structure Layer   ←── bonds/loops found in ──  (recurring patterns)
       ↑
   primitive
       │
Event Layer       ←── causal events form ────  (the cause-plex)
```

### Visual Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│              FOUR-LAYER ARCHITECTURE                                 │
│         from causal events to observable quantities                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ OBSERVABLE LAYER          [where symmetries hold]            │    │
│  │ ℳ (mass)  W (energy)  𝒫 (power)  ρ_ac  C_maint              │    │
│  │                                                              │    │
│  │ Energy ← time-translation symmetry (Noether)                 │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                          ↑ aggregation + symmetry                    │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ DESCRIPTOR LAYER         [structural properties]             │    │
│  │ Q1: transfer mode (kinetic ↔ potential-like)                │    │
│  │ Q2: output target (state / bond / loop)                      │    │
│  │ Q3: topology (open ↔ closed)                                 │    │
│  │ Q4: leverage ratio Λ                                         │    │
│  │ Q5: timescale (latency / period)                             │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                          ↑ structural analysis                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ STRUCTURE LAYER          [patterns in cause-plex]            │    │
│  │                                                              │    │
│  │   Bond b: X_i ⇉ X_j      Loop ℒ: X_i → X_j → ... → X_i      │    │
│  │   (recurring connection)  (closed causal cycle)              │    │
│  │                                                              │    │
│  │   Formation: stable correlation in cause-plex                │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                          ↑ pattern recognition                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ EVENT LAYER              [the primitive]                     │    │
│  │                                                              │    │
│  │   Causal event: e : 𝒮_i → 𝒮_j  (state transition)           │    │
│  │   Cause-plex: 𝒞 = (E, ≺)  where ≺ = causal precedence       │    │
│  │                                                              │    │
│  │   No physics assumed. Substrate-independent.                 │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ↑ EMERGENCE: read bottom-up                                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Critical Fixes from Previous Version
1. ✅ Include Q5 (timescale)
2. ✅ Rename Q1 from "energy mode" to "transfer mode" — avoids circularity
3. ✅ Add bond formation criterion (stable correlation)
4. ✅ Specify ≺ as causal precedence (strict partial order)
5. ✅ Show inter-layer mappings (aggregation, pattern recognition, etc.)
6. ✅ Explicitly note which symmetry yields which observable

---

## Implementation Options

### Option A: TikZ (LaTeX)
- Pros: Publication-quality, precise, integrates with papers
- Cons: Verbose, harder to iterate
- Best for: Final paper versions

### Option B: D3.js / Observable
- Pros: Interactive, web-native, can animate
- Cons: Requires JS, more complex
- Best for: Website with exploration

### Option C: Mermaid/Graphviz (text-based)
- Pros: Version-controllable, easy to iterate
- Cons: Less visual control
- Best for: Quick iteration, documentation

### Option D: Programmatic SVG (Python/JS)
- Pros: Reproducible, parameterizable
- Cons: More code to maintain
- Best for: Consistent style across many diagrams

### Option E: Typst
- Pros: Modern, cleaner than LaTeX, good for technical docs
- Cons: Newer ecosystem
- Best for: Modern documentation

### Option F: AI Image Generation with Structured Prompts
- Pros: Can produce polished visuals quickly
- Cons: Less precise control, may hallucinate
- Best for: Conceptual illustrations, not precise technical diagrams

### Recommendation
For these specific diagrams:
1. **Typst or TikZ** for the precise technical versions (reproducible, exact)
2. **D3.js** if we want interactive web versions
3. **NOT AI image generation** — these need precise notation and relationships

---

## JSON Schema for Diagram Generation

If using programmatic generation, here's a schema:

```json
{
  "diagram": {
    "id": "state_representation",
    "title": "States and Representations",
    "type": "concept_map",
    "elements": [
      {
        "id": "potential_space",
        "type": "space",
        "symbol": "𝒳",
        "label": "Potential State Space",
        "description": "all states system could occupy",
        "visual": "manifold",
        "position": {"x": 0.2, "y": 0.5}
      },
      {
        "id": "specific_state",
        "type": "element",
        "symbol": "x",
        "label": "specific state",
        "parent": "potential_space",
        "visual": "point",
        "position": {"x": 0.25, "y": 0.45}
      },
      {
        "id": "representation",
        "type": "function",
        "symbol": "X",
        "label": "Representation",
        "signature": "X: 𝒳 → Encodings",
        "visual": "box_with_forms",
        "position": {"x": 0.7, "y": 0.5},
        "forms": ["point_estimate", "distribution", "partial_observation"]
      },
      {
        "id": "fidelity",
        "type": "metric",
        "symbol": "ℱ",
        "label": "Fidelity",
        "signature": "ℱ(X(x), x) → [0,1]",
        "position": {"x": 0.5, "y": 0.8}
      }
    ],
    "relations": [
      {
        "from": "potential_space",
        "to": "representation",
        "type": "function_application",
        "label": "X(·)",
        "description": "representation function"
      }
    ],
    "annotations": [
      {
        "type": "insight_box",
        "content": "Representations are themselves states, instantiated in substrates with their own 𝒳'",
        "position": "bottom"
      }
    ]
  }
}
```

This schema could drive:
- SVG generation (Python script)
- TikZ generation (template filling)
- D3.js rendering (direct JSON consumption)
