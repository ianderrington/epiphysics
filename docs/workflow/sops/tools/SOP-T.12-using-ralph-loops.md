---
type: sop
category: tool
sop_id: SOP-T.12
title: Using Ralph Loops - Autonomous Agent Execution
phase: null
audience: [developers, ai-agents, architects]
read_time: 15
created: 2026-01-30
updated: 2026-01-30
status: active
version: '1.0'
author: Supernal Coding Team
related_sops: [SOP-T.10, SOP-7.01]
prerequisites: []
tags: [ralph, autonomous, agent-loops, specs, automation]
---

# SOP-T.12: Using Ralph Loops - Autonomous Agent Execution

## Purpose

Define the workflow for **autonomous agent loops (ralph)** that execute spec-driven tasks with minimal human intervention. Ralph loops enable focused, single-PR implementations from well-defined specifications.

## Scope

- Creating and validating spec files
- Running ralph loops
- One spec = One PR workflow
- Pre-flight validation requirements
- Parallel ralph execution

---

## Core Principle

**One Spec → One Ralph → One PR**

Ralph loops are autonomous execution cycles where an AI agent:
1. Reads a validated spec file
2. Completes tasks one at a time
3. Updates a plan file with progress
4. Produces a single focused PR

---

## When to Use Ralph Loops

### Use Ralph When:
- ✅ **Spec is well-defined** with clear Goal, Output, Tasks
- ✅ **5-25 atomic tasks** that can be completed sequentially
- ✅ **Isolated changes** that won't conflict with other work
- ✅ **Tests are defined** or can be generated
- ✅ **One PR of work** (not multi-week efforts)

### Use Assignments Instead When:
- ❌ **Week+ of work** requiring multiple PRs
- ❌ **Complex coordination** between agents
- ❌ **Unclear requirements** needing discovery
- ❌ **See**: [SOP-T.10: Using Agent Assignments](SOP-T.10-using-agent-assignments.md)

---

## Spec File Pattern

**CRITICAL: Ralph validates specs before execution. Invalid specs are rejected.**

### Required Structure

```markdown
# [Descriptive Title]

## Goal
[1-2 sentences: What will be accomplished?]

## Output
`src/path/to/file.ts`
`src/path/to/other.ts`

## Requirements
[Detailed bullet points or numbered requirements]

## Tasks

- [ ] First specific task
- [ ] Second specific task
- [ ] Create unit tests
- [ ] Verify tests pass
```

### Validation Rules

| Rule | Severity | Fix |
|------|----------|-----|
| Missing `# Title` | ERROR | Add descriptive H1 heading |
| Missing `## Goal` | ERROR | Add Goal section with 1-2 sentences |
| Empty Goal section | ERROR | Write actual outcome, not TODO |
| Missing `## Output` | ERROR | List output file paths in backticks |
| Missing `## Tasks` | ERROR | Add Tasks section |
| No checkbox format | ERROR | Use `- [ ]` not numbered lists |
| <2 tasks | WARN | Add more specific tasks |
| >3000 words | WARN | Split into multiple specs |
| >25 tasks | WARN | Split into multiple specs |

**Reference**: [SPEC-PATTERN.md](../../../../supernal-code-package/docs/ralph/SPEC-PATTERN.md)

---

## Workflow

### 1. Create Spec

```bash
# Create from template
sc spec create user-notifications --with-plan

# Or manually create following SPEC-PATTERN.md
```

### 2. Fill In Spec

Edit the generated spec to add:
- **Goal**: What problem this solves
- **Output**: Files that will be created/modified
- **Requirements**: Detailed behavior
- **Tasks**: Atomic, testable steps

### 3. Validate (Pre-flight Check)

```bash
# Check for errors
sc spec validate my-feature-spec.md

# Auto-fix common issues
sc spec validate my-feature-spec.md --fix

# Must pass before ralph will run
```

**Example validation output:**
```
$ sc spec validate my-feature-spec.md

Validating: my-feature-spec.md

[ERROR] Line 12: Tasks section missing checkbox format
        Found: "1. Create the thing"
        Expected: "- [ ] Create the thing"

❌ Validation FAILED: 1 error

See spec pattern: docs/ralph/SPEC-PATTERN.md
```

### 4. Create Worktree (Isolation)

```bash
# Create isolated worktree for ralph
sc agent assign my-feature
cd .worktrees/my-feature
```

### 5. Run Ralph

```bash
# Start autonomous loop
sc agent loop start my-feature-spec.md

# With auto-commit on completion
sc agent loop start my-feature-spec.md --auto-commit

# Monitor progress
sc agent loop status
sc agent loop logs
```

### 6. Review and Merge

- Ralph commits to feature branch
- Review the single PR
- Merge when satisfied

---

## Ralph Commands

### Spec Management

```bash
sc spec create <name> [options]   # Create spec from template
sc spec validate <file> [options] # Pre-flight validation
sc spec list                      # List specs in project
```

### Loop Execution

```bash
sc agent loop start <spec>        # Start ralph loop
sc agent loop parallel <dir>      # Run multiple specs
sc agent loop status [id]         # Show progress
sc agent loop abort [id]          # Stop execution
sc agent loop logs [id]           # View JSONL logs
sc agent loop feedback <id> <msg> # Send guidance
sc agent loop resume [id]         # Resume from state
```

### Options

| Option | Description |
|--------|-------------|
| `--headless` | No terminal output (CI/automation) |
| `--auto-commit` | Commit on completion |
| `--max-iterations <n>` | Limit iterations (default: 10) |
| `--mock` | Use mock Claude for testing |

---

## Spec Types

### Feature Spec
Standard template for new functionality.
```bash
sc spec create user-auth --type feature
```

### Fix Spec
Adds Problem and Root Cause sections.
```bash
sc spec create login-timeout --type fix
```

### Refactor Spec
Adds Current State and Target State sections.
```bash
sc spec create auth-cleanup --type refactor
```

### Types Spec
Simplified for TypeScript types/interfaces.
```bash
sc spec create api-types --type types
```

---

## Parallel Ralph Execution

### Multiple Specs in Directory

```bash
# Create specs for each component
specs/
├── 01-types-spec.md
├── 02-api-spec.md
└── 03-ui-spec.md

# Run all in parallel
sc agent loop parallel specs/
```

### Monitoring Parallel Loops

```bash
# Check all running loops
sc agent loop status

# View specific loop
sc agent loop logs ralph-1706635200-12345
```

---

## Safety Features

### Built-in Protections

1. **Pre-flight Validation** - Specs must pass validation
2. **Iteration Limit** - Max 10 iterations by default
3. **Abort File** - Create `.ralph-abort` to stop
4. **Depth Control** - Prevents infinite recursion
5. **Rate Limiting** - 2s delay between iterations
6. **Fresh Context** - Each iteration gets clean context

### Manual Abort

```bash
# Create abort signal file
touch .ralph-abort

# Or use command
sc agent loop abort
```

---

## Best Practices

### ✅ DO

- Validate specs before running
- Keep specs focused (one feature)
- Include "Create unit tests" as a task
- Declare all output files
- Use worktrees for isolation
- Monitor with `sc agent loop status`

### ❌ DON'T

- Run ralph on unvalidated specs
- Create specs with >25 tasks
- Mix unrelated changes in one spec
- Skip the validation step
- Run on main branch directly

---

## Troubleshooting

### Spec Validation Fails

```bash
# Check what's wrong
sc spec validate my-spec.md

# Auto-fix common issues
sc spec validate my-spec.md --fix

# Reference the pattern
cat docs/ralph/SPEC-PATTERN.md
```

### Ralph Gets Stuck

```bash
# Check status
sc agent loop status

# View logs
sc agent loop logs

# Send guidance
sc agent loop feedback "Focus on task 3"

# Abort if needed
sc agent loop abort
```

### Too Many Iterations

Split the spec into smaller specs with fewer tasks (5-15 each).

---

## Related Documentation

- **SPEC-PATTERN.md**: [Spec file reference](../../../../supernal-code-package/docs/ralph/SPEC-PATTERN.md)
- **SOP-T.10**: [Using Agent Assignments](SOP-T.10-using-agent-assignments.md) - For larger work
- **SOP-7.01**: [Implementation](../phase-7-build/SOP-7.01-implementation-with-ai-pair-programming.md)
- **ralphing-explained.md**: [How ralph works](../../../../docs/research_and_analysis/ralphing-explained.md)

---

## Quick Reference

| Task | Command |
|------|---------|
| Create spec | `sc spec create name --with-plan` |
| Validate spec | `sc spec validate file.md` |
| Auto-fix spec | `sc spec validate file.md --fix` |
| Create worktree | `sc agent assign name` |
| Start ralph | `sc agent loop start spec.md` |
| Check status | `sc agent loop status` |
| View logs | `sc agent loop logs` |
| Abort | `sc agent loop abort` |

---

**Last Updated**: 2026-01-30
**Status**: Active
**Spec Pattern**: [SPEC-PATTERN.md](../../../../supernal-code-package/docs/ralph/SPEC-PATTERN.md)
