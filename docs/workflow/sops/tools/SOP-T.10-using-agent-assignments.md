---
type: sop
category: tool
sop_id: SOP-T.10
title: Using Agent Assignments - Pre-Work Specifications
phase: null
audience: [developers, ai-agents, architects]
read_time: 20
created: 2025-12-20
updated: 2025-12-20
status: active
version: '1.0'
author: Supernal Coding Team
related_sops: [SOP-T.08, SOP-0.1.05, SOP-4.01, SOP-7.01]
prerequisites: []
tags: [assignments, agents, handoffs, parallel-development, documentation-driven]
---

# SOP-T.10: Using Agent Assignments - Pre-Work Specifications

## Purpose

Formalize pre-work specifications for agents, enabling **parallel development** and **clear handoffs** between AI agents or human developers.

## Scope

- Creating agent assignments from features/requirements
- Assignment structure and frontmatter
- Executable assignments (`sc docs process` integration)
- Assignment vs handoff vs task distinction
- Parallel agent coordination

---

## When to Use Assignments

### Use an **Assignment** when:
- ✅ **Pre-work specification** for an agent to pick up
- ✅ **Feature requires multiple agents** working in parallel
- ✅ **Clear scope** with requirements, tests, implementation steps
- ✅ **Week+ of work** for a specific agent/person
- ✅ **Structured handoff** between planning and implementation
- ✅ **Executable steps** that can be automated

### Use a **Handoff** (instead) when:
- ✅ **Post-work summary** of what was done
- ✅ **Agent finished** and needs to pass context to next agent
- ✅ **Review report** for human to read
- ✅ **Session complete** but work may continue later

### Use a **Task** (instead) when:
- ✅ **Small operational work** (1-8 hours)
- ✅ **No formal specification needed**
- ✅ **Ad-hoc or discovered** during implementation
- ✅ See [SOP-T.08: Using sc task](../tools/SOP-T.08-using-sc-task.md)

---

## The Hierarchy

```
Epic (Strategic Initiative)
  ↓
Features (Functional Capabilities)
  ↓
Requirements (Gherkin Specifications) ← REQ-XXX
  ↓
Assignments (Agent Pre-Work Specs) ← YOU ARE HERE
  ↓
Implementation (Code + Tests)
  ↓
Handoffs (Post-Work Summary)
```

---

## Assignment Structure

### Location

```
docs/features/{domain}/{feature}/assignments/
└── assignment-{agent-name}-YYYY-MM-DD.md
```

**Examples**:
- `assignment-agent1-backend-2025-12-20.md`
- `assignment-implementer-2025-12-20.md`
- `assignment-alice-frontend-2025-12-15.md`

### Required Frontmatter

```yaml
---
type: assignment
assignee: "@agent-name"
created: YYYY-MM-DD
status: pending  # pending|in-progress|complete|blocked
requirements:
  - REQ-XXX-001
  - REQ-XXX-002
dependencies:
  - "other-feature complete"
  - "Agent 1 work merged"
timeline: N weeks
---
```

---

## Assignment Content Structure

### 1. Context Section

```markdown
## Context

**What this is**: Brief description (1 sentence)
**Why it matters**: Value proposition
**Where it fits**: How it relates to other work
```

### 2. Mission Statement

```markdown
## Your Mission

**Deliver**: What you're building
**Timeline**: How long
**Dependencies**: What you need first
**Parallelization**: Can this run parallel with other work?
```

### 3. Requirements to Implement

```markdown
## Requirements to Implement

### REQ-XXX-001: Requirement Title

**Location**: `path/to/requirement.md`

**What it does**:
- Key functionality
- Acceptance criteria summary

**Key Implementation**:
```typescript
// Example code showing approach
```
```

### 4. Test Generation (Phase 6)

Use **executable blocks** for automation:

```markdown
## Test Generation (Phase 6)

### Step 1: Generate Test Stubs

<!-- EXEC:phase6-generate-tests:Generate test stubs -->
```bash
#!/bin/bash
set -e

sc requirement generate-tests REQ-XXX-001
sc requirement generate-tests REQ-XXX-002

echo "Tests generated:"
ls -la tests/
```
<!-- /EXEC -->

### Step 2: Commit Tests

<!-- EXEC:phase6-commit-tests:Commit test stubs -->
<!-- REQUIRES: phase6-generate-tests -->
```bash
#!/bin/bash
set -e

git add tests/
git commit -m "test(feature): Add test stubs"
```
<!-- /EXEC -->
```

**See**: cursor rule: documentation-processor.mdc for `sc docs process` integration.

### 5. Implementation Steps (Phase 7)

Mix **executable** and **manual** steps:

```markdown
## Implementation Steps (Phase 7)

### Step 1: Install Dependencies

<!-- EXEC:phase7-install:Install dependencies -->
```bash
#!/bin/bash
set -e

npm install react
npm install --save-dev webpack
```
<!-- /EXEC -->

### Step 2: Create Component

<!-- MANUAL: Create React component (large file) -->

**File**: `src/components/MyComponent.tsx`

```typescript
import React from 'react';

export const MyComponent: React.FC = () => {
  return <div>Component</div>;
};
```

**Verification**: Run `npm run compile`
```

### 6. Success Criteria

```markdown
## Success Criteria

✅ **Tests passing**:
```bash
npm test
# Expected: All tests pass
```

✅ **Feature working**:
```bash
# Manual test steps
```

✅ **Ready to merge**:
```bash
sc planning feature audit --id=feature-name
```
```

### 7. Handoff Instructions

```markdown
## Handoff Instructions

When complete, create handoff:

```bash
sc agent handoff --title "completed-feature-name"
```

**Handoff should include**:
- Files created/modified
- Test results
- Integration notes
- Any issues encountered
```

---

## Executable Assignments

### Using `sc docs process`

Assignments can use the **documentation processor pattern** to make steps executable:

**In your assignment markdown**:

````markdown
**File**: `src/utils/helper.ts`

```typescript
export const helper = () => 'value';
```
````

**Process with**:

```bash
sc docs process assignment-agent1-2025-12-20.md --commit
```

**Result**:
- ✅ File created at `src/utils/helper.ts`
- ✅ Directory structure created
- ✅ Marked as `IMPLEMENTED` in assignment
- ✅ Code block removed (DRY)
- ✅ Automatically committed

### Executable Script Blocks

Use special markers for automation (when `sc agent script` is available):

```markdown
<!-- EXEC:step-id:Description -->
```bash
#!/bin/bash
set -e
# Commands here
```
<!-- /EXEC -->
```

**Markers**:
- `EXEC` - Executable script block
- `REQUIRES` - Depends on previous step
- `WAIT-FOR-USER` - Pause for user review
- `CHECK-OUTPUT` - Validate output
- `MANUAL` - Requires manual work

**Future**: `sc agent script` will extract and run these automatically.

---

## Creating Assignments

### From Feature Breakdown

```bash
# After Phase 4 (Feature Breakdown)
# Create feature with assignments folder
mkdir -p docs/features/{domain}/{feature}/assignments/

# Create assignment using template
# (Future: sc assignment new)
```

### Assignment Template

See: `supernal-code-package/templates/docs/assignment-template.md`

**Quick start**:

```bash
# Copy template
cp supernal-code-package/templates/docs/assignment-template.md \
   docs/features/my-domain/my-feature/assignments/assignment-agent1-2025-12-20.md

# Fill in:
# - Frontmatter (feature, assignee, requirements)
# - Context and mission
# - Requirements to implement
# - Test generation steps (Phase 6)
# - Implementation steps (Phase 7)
# - Success criteria
```

---

## Parallel Development with Assignments

### Scenario: 3 Agents, 1 Feature

**VSCode Extension Example**:

```
Week 1-2: Parallel
├─ Agent 1: Backend (@agent1-backend)
│  ├─ Requirements: REQ-004, REQ-006
│  └─ Delivers: Rule writers
│
└─ Agent 2: Extension Shell (@agent2-extension)
   ├─ Requirements: REQ-001, REQ-002
   └─ Delivers: VSCode scaffolding

Week 2: Merge Agent 1 + Agent 2

Week 3-4: Sequential
└─ Agent 3: UI (@agent3-ui)
   ├─ Requirements: REQ-007, REQ-008
   ├─ Depends on: Agent 1 + Agent 2
   └─ Delivers: React UI
```

**Assignments**:
- `assignment-agent1-backend-2025-12-20.md` (can start immediately)
- `assignment-agent2-extension-2025-12-20.md` (can start immediately)
- `assignment-agent3-ui-2025-12-20.md` (starts after merge)

**Benefits**:
- ✅ Clear scope for each agent
- ✅ Parallel development (Week 1-2)
- ✅ Explicit dependencies (Week 3-4)
- ✅ No conflicts (different files/features)
- ✅ Traceability (REQ-XXX in commits)

---

## Integration with Workflow

### Phase 4: Planning & Feature Breakdown

**Create assignments**:
- Break feature into sub-features
- Assign to agents/people
- Define requirements for each
- Document dependencies

**Output**: Assignment files in `assignments/` folder

---

### Phase 5: Requirements

**Link requirements to assignments**:
- Each assignment references REQ-XXX IDs
- Requirements frontmatter lists assigned agent
- Clear traceability

**Validate**:

```bash
sc requirement validate REQ-XXX
# Checks assignment linkage
```

---

### Phase 6: Test Generation

**Follow assignment**:
- Agent reads assignment
- Runs Phase 6 executable blocks
- Or uses `sc docs process` for code extraction

**Commands** (from assignment):

```bash
sc requirement generate-tests REQ-XXX
sc workflow wip register tests/ --feature=X
git commit -m "test: Add stubs"
```

---

### Phase 7: Implementation

**Follow assignment**:
- Agent implements per assignment steps
- Uses executable blocks for automation
- Manually creates large code files
- Commits with requirement traceability

**Commits**:

```bash
git commit -m "feat(feature): Implement X (REQ-XXX)"
```

---

### Phase 8+: Handoff

**Create handoff**:

```bash
sc agent handoff --title "completed-feature-name"
```

**Handoff vs Assignment**:
- Assignment = **Pre-work** (what to do)
- Handoff = **Post-work** (what was done)

---

## Best Practices

### ✅ DO

- Create assignments during Phase 4 (Planning)
- Use executable blocks for repetitive commands
- Mark large code files as `MANUAL`
- Include clear success criteria
- Document dependencies explicitly
- Link to requirements (REQ-XXX)
- Update status as work progresses

### ❌ DON'T

- Create assignments without requirements
- Mix multiple unrelated features
- Skip dependencies section
- Forget to include test generation
- Leave status as "pending" forever
- Create assignments for small tasks (use `sc task` instead)

---

## Commands Reference

### Assignment Lifecycle

```bash
# Create assignment (manual for now)
mkdir -p docs/features/{domain}/{feature}/assignments/
cp template.md assignment-agent1-2025-12-20.md

# Process executable code blocks
sc docs process assignment-agent1-2025-12-20.md --commit

# Future: Extract and run steps
sc agent script assignment-agent1-2025-12-20.md --extract
sc agent script assignment-agent1-2025-12-20.md --next

# Create handoff when complete
sc agent handoff --title "completed-feature"
```

### Validation

```bash
# Check assignment structure
sc planning feature audit --id=feature-name

# Verify requirements linked
sc requirement validate REQ-XXX
```

---

## Examples

### Simple Assignment (Single Agent)

```markdown
---
type: assignment
feature: auth-system
assignee: "@alice"
requirements: [REQ-042]
timeline: 1 week
---

# Assignment: Authentication System

## Your Mission

Implement JWT-based authentication for API.

## Phase 6: Tests

```bash
sc requirement generate-tests REQ-042
```

## Phase 7: Implementation

**File**: `src/auth/jwt.ts`

```typescript
export const verifyToken = (token: string) => { /* ... */ };
```

## Success Criteria

✅ Tests passing
✅ API accepts JWT tokens
```

### Complex Assignment (Parallel Agents)

See: `docs/features/developer-tooling/vscode-extension-backend/assignments/assignment-agent1-backend-2025-12-20.md`

---

## Related Documentation

- **SOP-T.08**: [Using sc task](../tools/SOP-T.08-using-sc-task.md) - For small operational work
- **SOP-0.1.05**: [Requirements & Planning](../general/SOP-0.1.05-requirements-planning.md) - Code in plans pattern
- **SOP-4.01**: [Feature Breakdown](../phase-4-planning/SOP-4.01-feature-breakdown-and-estimation.md) - Creating assignments
- **SOP-7.01**: [Implementation](../phase-7-build/SOP-7.01-implementation-with-ai-pair-programming.md) - Following assignments
- **Agent Handoff Rule**: cursor rule: agent-hand-off.mdc - Post-work handoffs
- **Documentation Processor**: cursor rule: documentation-processor.mdc - `sc docs process`

---

## Quick Reference

| Use Case | Tool | Command |
|-----|----|----|
| Pre-work spec for agent | **Assignment** | Create in `assignments/` |
| Small task (1-8 hours) | **Task** | `sc task new` |
| Post-work summary | **Handoff** | `sc agent handoff` |
| Extract code from assignment | **Docs processor** | `sc docs process assignment.md --commit` |
| Run executable steps | **Assignment executor** | `sc agent script <file> --next` |

---

**Last Updated**: 2025-12-20  
**Status**: Active  
**Template**: `supernal-code-package/templates/docs/assignment-template.md`  
**Examples**: `docs/features/developer-tooling/vscode-extension-*/assignments/`

