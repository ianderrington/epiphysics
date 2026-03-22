# Epiphysics Daily Loop (Current)

Purpose: keep theory work, experiments, and issue execution moving every day with auditable outputs.

## 0) Open the loop (5 min)

- Read:
  - `docs/experiments/epiphy-7day-falsification-plan.md`
  - `DECISIONS.md`
- Confirm active cycle/day and current gating status.

**Output:** one-line "today objective" entry in `DECISIONS.md`.

---

## 1) Check issues / queue (15–25 min)

Scope:
- repo TODOs
- experiment blockers
- theory consistency gaps
- externally reported issues

Rules:
- classify each item: `critical`, `today`, `queued`, `parked`
- cap active WIP to 1 core hypothesis lane + 2 support tasks

**Output:** prioritized short list for today.

---

## 2) Simple research pass (45–90 min)

Goal:
- gather only what is needed to unblock current experiment/issue
- avoid broad speculative research

Method:
- run a focused question list (max 3)
- save only decision-relevant findings
- tag findings with source links/paths

**Output:** short research memo (bullets + citations + impact on plan).

---

## 3) Prioritize + plan updates (20–30 min)

- update day plan against active gates:
  - Track A reliability gate
  - Track B theory-test eligibility
- lock any thresholds/ranges before running
- note expected stop condition for each phase

**Output:** updated day plan and explicit kill criteria for today’s run.

---

## 4) Execute issues + experiments (2–6h blocks)

Execution rules:
- hard timebox per phase
- run null/baseline checks first where required
- do not promote claims if Track A gate fails
- capture failures as first-class results

**Output:**
- run artifacts (tables/plots/logs)
- pass/fail/inconclusive judgment per experiment

---

## 5) Report (15–30 min)

Daily report format:
1. What was run
2. What passed/failed
3. What changed in assumptions
4. What is next
5. What needs review/escalation (e.g., FLUX/VERIFY)

**Output:** concise status update to Mission Control + `DECISIONS.md` entry.

---

## Cadence Guardrails

- Evidence over narrative
- One active core hypothesis lane
- No application-note drafting until cycle gates pass
- Max 2 full falsification cycles before mandatory framework-review memo

---

## Ownership

- EPIPHYSICS: lead execution + synthesis
- FLUX: optimization review / process tuning
- VERIFY: rigor audits / anti-bias checks
