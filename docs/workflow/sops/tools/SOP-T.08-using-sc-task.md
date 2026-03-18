---
type: sop
id: SOP-T.08
title: Using sc task - Task Management CLI
version: 1.1.0
status: active
created: 2025-12-11
updated: 2025-12-17
tags: [task, cli, workflow, kanban]
related: [SOP-0.1.05, SOP-T.01, EPIC-003]
phase1Complete: true
---

# SOP-T.08: Using `sc task` - Task Management CLI

## Purpose

Guide for using the `sc task` command-line interface to manage operational work items (tasks) that are too small for formal requirements.

## Scope

- Creating and managing tasks
- Task vs requirement distinction
- Linking tasks to requirements/epics
- Importing tasks from GitHub/Jira
- Task workflow (todo → in-progress → done)

## When to Use Tasks vs Requirements

### Use a **Task** when:
- ✅ Small operational work (1-8 hours)
- ✅ No user-facing value
- ✅ Ad-hoc or discovered during work
- ✅ Internal cleanup/maintenance
- ✅ Simple outcome ("rename files", "fix warnings")
- ✅ No Gherkin scenarios needed

**Examples**:
- Rename architecture files to kebab-case
- Fix linter warnings
- Setup git hooks
- Update README
- Investigate slow test
- Refactor internal function

### Use a **Requirement** when:
- ✅ User-facing feature or capability
- ✅ Formal specification needed
- ✅ Acceptance criteria required
- ✅ Multiple days/weeks of work
- ✅ Needs testing strategy
- ✅ Requires Gherkin scenarios

**Examples**:
- User authentication system
- Dashboard visualization
- API endpoint design
- Compliance validation
- Multi-step workflow

### The Hierarchy

```
Epic (Strategic)
  ↓
Requirement (Specification)
  ↓
Task (Operational)  ← YOU ARE HERE
  ↓
Commits (Implementation)
```

---

## Basic Task Commands

### Create a Task

```bash
# Interactive (prompts for details)
sc task new "Fix linter warnings in API routes"

# Quick create (minimal prompts, defaults)
sc task new "Update README" --quick

# With metadata upfront
sc task new "Setup git hooks" \
  --priority=high \
  --epic=EPIC-003 \
  --assignee=@me
```

**What happens**:
1. Generates unique ID (TASK-XXX)
2. Creates file: `docs/planning/tasks/todo/TASK-XXX-{slug}.md`
3. Initializes YAML frontmatter
4. Opens in editor (optional)

### List Tasks

```bash
# All tasks
sc task list

# Filter by status
sc task list --status=todo
sc task list --status=in-progress
sc task list --status=done

# Filter by priority
sc task list --priority=critical
sc task list --priority=high

# Filter by assignee
sc task list --assignee=@me
sc task list --assignee=@alice

# Combine filters
sc task list --status=todo --priority=high --assignee=@me

# JSON output (for scripting)
sc task list --format=json
```

### View Task Details

```bash
# Show full task
sc task show TASK-001

# Output:
# TASK-001: Rename architecture files to kebab-case
# Status: in-progress
# Priority: medium
# Assignee: @me
# Created: 2025-12-11
# Updated: 2025-12-11
# Epic: EPIC-003
# 
# Description:
# SCREAMING_SNAKE_CASE files are hard to read...
# 
# Checklist:
# [x] Create rename script
# [x] Execute renames
# [ ] Update cross-references
# [ ] Test dashboard
```

### Update Task

```bash
# Change status
sc task update TASK-001 --status=in-progress
sc task update TASK-001 --status=done

# Change priority
sc task update TASK-001 --priority=high

# Change assignee
sc task update TASK-001 --assignee=@alice

# Update multiple fields
sc task update TASK-001 \
  --status=in-progress \
  --priority=high \
  --assignee=@me
```

---

## Task Workflow

### Standard Workflow

```bash
# 1. Create task (auto-generates TASK-001, TASK-002, etc.)
sc task new "Fix bug in authentication"
# → TASK-042 created in: docs/planning/tasks/active/unassigned/
# → Status: todo

# 2. Assign to yourself (moves to your directory)
sc task assign TASK-042 --me
# → File moved to: docs/planning/tasks/active/@alice/

# 3. Start work (changes status to in-progress)
sc task start TASK-042
# → Status changed: in-progress
# → startedAt timestamp recorded
# → Updated timestamp

# 4. Do the work
# ... fix the bug ...
git commit -m "fix: authentication bug (TASK-042)"

# 5. Complete task
sc task complete TASK-042
# → File moved to: docs/planning/tasks/completed/2025-12/@alice/
# → Status changed: done
# → completedAt timestamp recorded

# 6. (Optional) Cancel task if needed
sc task cancel TASK-043 --reason="Duplicate of TASK-042"
# → File moved to: docs/planning/tasks/cancelled/2025-12/@alice/
```

### File Organization

```
docs/planning/tasks/
├── active/
│   ├── unassigned/
│   │   └── TASK-003-update-docs.md
│   └── @alice/
│       └── TASK-001-fix-test.md
├── completed/
│   └── 2025-12/
│       └── @alice/
│           └── TASK-001-fix-test.md
└── cancelled/
    └── 2025-12/
        └── @bob/
            └── TASK-002-experimental-approach.md
```

**Files move using `git mv` to preserve history**.

### Next Priority Task

```bash
# Show highest priority task (sorted by priority, then age)
sc task next

# Output:
# TASK-007 (critical) - Fix production deployment issue
# Age: 2 hours
# 
# This is the highest priority task.
# 
# Start work: sc task start TASK-007

# Get next task from your assigned tasks
sc task next --me
```

**Priority sorting**:
1. `critical` (urgent production issues)
2. `high` (blocks other work)  
3. `medium` (normal work, default)
4. `low` (nice to have)

**Tie-breaking**: Same priority → Oldest task first (by `created` date)

---

## Linking Tasks

### Link to Requirement

```bash
# Link task to requirement
sc task link TASK-001 REQ-042

# Unlink
sc task unlink TASK-001 REQ-042

# View requirement with linked tasks
sc requirement show REQ-042
# Shows:
#   Linked Tasks:
#     - TASK-001 (in-progress) - Rename architecture files
#     - TASK-015 (done) - Add frontmatter
```

**When to link**:
- Task implements part of a requirement
- Task discovered while working on requirement
- Task blocks requirement progress

### Link to Epic

```bash
# Set epic when creating
sc task new "Setup CI/CD" --epic=EPIC-002

# Update epic later
sc task update TASK-001 --epic=EPIC-003

# View all tasks for epic
sc task list --epic=EPIC-003
```

### Link to Feature

```bash
# Link task to feature
sc task update TASK-001 --feature=task-system
```

---

## Importing from External Systems

### Import from GitHub Issue

```bash
# Import GitHub issue as task
sc task import github 42

# What happens:
# 1. Fetches issue #42 from GitHub
# 2. Creates TASK-XXX with issue metadata
# 3. Links to external issue
# 4. Preserves GitHub URL

# Created task contains:
# externalIssue:
#   type: github
#   id: "#42"
#   url: "https://github.com/owner/repo/issues/42"
```

**Workflow Example**:
```bash
# User reports bug via dashboard → GitHub issue #123 created

# Developer imports as task
sc task import github 123
# → TASK-050 created

# Work on task
sc task start TASK-050
# ... fix bug ...
sc task complete TASK-050

# CLI asks: "Update GitHub issue #123? [y/N]"
# User: y
# → Comment added to GitHub: "Task TASK-050 completed"
```

### Import from Jira Issue

```bash
# Import Jira issue as task
sc task import jira SC-123

# What happens:
# 1. Fetches issue SC-123 from Jira
# 2. Creates TASK-XXX with Jira metadata
# 3. Links to external issue
# 4. Preserves Jira URL

# Created task contains:
# externalIssue:
#   type: jira
#   id: "SC-123"
#   url: "https://company.atlassian.net/browse/SC-123"
```

**Sprint Planning Example**:
```bash
# Sprint starts, import high-priority Jira issues
sc task import jira SC-101
sc task import jira SC-102
sc task import jira SC-103

# View imported tasks
sc task list --status=todo

# Work through tasks
sc task next
sc task start TASK-051
```

### Batch Import

```bash
# Import multiple GitHub issues
sc task import github 42 43 44 45

# Import from Jira query
sc task import jira --jql "project=SC AND sprint=10"

# Import with specific epic
sc task import github 42 --epic=EPIC-003
```

---

## Kanban Board View

### CLI Board

```bash
# View kanban board in terminal
sc task board

# Output (ASCII table):
# ┌──────────────┬──────────────┬──────────────┐
# │ TODO (5)     │ IN PROGRESS  │ DONE (12)    │
# ├──────────────┼──────────────┼──────────────┤
# │ TASK-001     │ TASK-003     │ TASK-000     │
# │ Rename files │ Fix linter   │ Setup hooks  │
# │ Priority: M  │ Priority: H  │ Completed    │
# │              │              │              │
# │ TASK-002     │              │ TASK-004     │
# │ Update docs  │              │ Fix bug #42  │
# │ Priority: L  │              │ Completed    │
# └──────────────┴──────────────┴──────────────┘

# Filter board
sc task board --epic=EPIC-003
sc task board --assignee=@me
```

### Move Tasks

```bash
# Move task between columns
sc task move TASK-001 in-progress
sc task move TASK-001 done

# Equivalent to:
sc task update TASK-001 --status=in-progress
```

---

## Task Templates

### Common Patterns

```bash
# Bug fix template
sc task new "Fix: {bug description}" --template=bug-fix
# Includes:
# - Bug report link
# - Steps to reproduce section
# - Fix checklist
# - Testing checklist

# Refactoring template
sc task new "Refactor: {component}" --template=refactor
# Includes:
# - Current state description
# - Refactoring goals
# - Breaking changes checklist
# - Migration guide checklist

# Documentation template
sc task new "Document: {feature}" --template=docs
# Includes:
# - Audience section
# - Content outline
# - Examples checklist
# - Review checklist
```

### Create Custom Template

```bash
# Copy existing template
cp docs/planning/tasks/templates/bug-fix.md \
   docs/planning/tasks/templates/my-custom.md

# Edit template
# ... add your sections ...

# Use template
sc task new "My task" --template=my-custom
```

---

## Advanced Usage

### Time Tracking

```bash
# Start task (tracks start time)
sc task start TASK-001

# Work on task...
# ... time passes ...

# Complete task (calculates duration)
sc task complete TASK-001

# View task shows:
# estimatedHours: 2
# actualHours: 1.5
# efficiency: 75%
```

### Search Tasks

```bash
# Search in title/description
sc task search "authentication"

# Search with filters
sc task search "bug" --status=todo --priority=high

# Full-text search
sc task search "refactor auth middleware"
```

### Task Statistics

```bash
# View task stats
sc task stats

# Output:
# Task Statistics:
#   Total: 42
#   Todo: 15
#   In Progress: 3
#   Done: 22
#   Cancelled: 2
#   
#   By Priority:
#     Critical: 1
#     High: 8
#     Medium: 20
#     Low: 13
#   
#   Average Time:
#     Estimated: 3.2 hours
#     Actual: 2.8 hours
#     Efficiency: 87%
```

### Cleanup Old Tasks

```bash
# Archive completed tasks older than 30 days
sc task cleanup --older-than=30d --status=done

# What happens:
# - Moves to: docs/planning/tasks/archive/YYYY-MM/
# - Preserves git history
# - Updates index
```

---

## Dashboard Integration

### Kanban Board UI

1. Navigate to `/tasks` or `/planning/tasks` in dashboard
2. View tasks in kanban columns (Todo, In Progress, Done)
3. Drag-and-drop to change status
4. Click task to view details
5. Edit priority, assignee inline
6. Filter by epic, priority, assignee
7. Search by title/description

### Quick Actions

- **Create task**: Click "+" button
- **Start task**: Drag to "In Progress" column
- **Complete task**: Drag to "Done" column
- **View details**: Click task card
- **Edit**: Double-click field to edit inline
- **Link to requirement**: Click "Link" button, select REQ-XXX

---

## Best Practices

### DO:
- ✅ Keep tasks small (1-8 hours max)
- ✅ Use descriptive titles ("Fix auth bug in login flow")
- ✅ Link tasks to requirements when relevant
- ✅ Update status as you work
- ✅ Import GitHub/Jira issues to track external work
- ✅ Use priorities (critical bugs first!)
- ✅ Assign tasks to specific people
- ✅ Complete tasks promptly (don't let them linger)

### DON'T:
- ❌ Create tasks for large features (use requirements)
- ❌ Leave tasks in "in-progress" for days
- ❌ Skip linking to requirements (breaks traceability)
- ❌ Create duplicate tasks (search first!)
- ❌ Use vague titles ("Fix stuff", "Update code")
- ❌ Forget to complete tasks when done

### Naming Conventions

**Good**:
- "Fix: Authentication fails on password reset"
- "Refactor: User profile component for performance"
- "Docs: Add API usage examples to README"
- "Setup: Configure ESLint for TypeScript"

**Bad**:
- "Fix bug" (which bug?)
- "Update code" (what code?)
- "TODO" (too vague)
- "Things to do" (not actionable)

---

## Troubleshooting

### "Task ID already exists"
**Problem**: TASK-XXX already in use  
**Solution**: System auto-increments, this shouldn't happen. If it does:
```bash
sc task list --format=json | jq '.[-1].id'  # Find last ID
sc task new "..." --id=TASK-YYY  # Specify next ID
```

### "Cannot move task file"
**Problem**: File doesn't exist or permission issue  
**Solution**:
```bash
# Check file exists
ls docs/planning/tasks/todo/TASK-*.md

# Check git status
git status

# Manually move if needed
git mv docs/planning/tasks/todo/TASK-001-*.md \
       docs/planning/tasks/in-progress/
```

### "Failed to sync with GitHub"
**Problem**: External issue update failed  
**Solution**:
```bash
# Check GitHub auth
sc github auth status

# Re-authenticate
sc github auth login

# Manually update issue if needed
gh issue comment 42 -b "Task TASK-050 completed"
```

---

## Related Documentation

- [Task System Overview](../../../features/workflow-management/task-system/README.md)
- [Task System Analysis](../../../planning/TASK-SYSTEM-ANALYSIS.md)
- [SOP-T.01: Using sc CLI](./SOP-T.01-using-sc-cli.md)
- [SOP-0.1.05: Requirements & Planning](../general/SOP-0.1.05-requirements-planning.md)
- [GitHub Issue Integration](../../../features/integrations/github-issue-feedback/README.md)
- [Jira Integration](../../../features/integrations/jira/planning/implementation-plan.md)
- [EPIC-003: Kanban & Task Management](../../../planning/epics/epic-003-kanban-task-management.md)

---

## Appendices

### A. Task Metadata Schema

```yaml
---
type: task                    # Always "task"
id: TASK-001                  # Auto-generated, sequential (TASK-001, TASK-002, etc.)
title: "Task title"           # Brief, descriptive
status: todo                  # todo|in-progress|done|cancelled
priority: medium              # critical|high|medium|low
created: 2025-12-11T10:00:00Z # ISO 8601 timestamp
updated: 2025-12-11T10:00:00Z # ISO 8601 timestamp
startedAt: 2025-12-11T11:00:00Z # When work began (optional)
completedAt: 2025-12-11T13:00:00Z # When work finished (optional)
assignee: "@username"         # Optional: GitHub username
estimatedHours: 2             # Optional: Estimate
actualHours: 1.5              # Tracked automatically
tags: [tag1, tag2]            # Optional: Categories
linkedRequirements:           # Optional: Links to requirements
  - REQ-042
  - REQ-043
linkedEpic: ""                # Optional: EPIC-XXX
linkedFeature: ""             # Optional: feature-name
externalIssue:                # Optional: GitHub/Jira
  type: github                # github|jira
  id: "#42"                   # Issue number
  url: "https://..."          # Full URL
notes: "Additional context"   # Optional: Notes
---
```

### B. Task Statuses

| Status | Description | Location |
|--------|-------------|----------|
| `todo` | Not started | `docs/planning/tasks/active/unassigned/` or `active/@user/` |
| `in-progress` | Currently working | `docs/planning/tasks/active/@user/` |
| `done` | Completed | `docs/planning/tasks/completed/YYYY-MM/@user/` |
| `cancelled` | Abandoned | `docs/planning/tasks/cancelled/YYYY-MM/@user/` |

### C. Priority Levels

| Priority | When to Use | Example |
|----------|-------------|---------|
| `critical` | Production down, data loss | Fix: Database corruption |
| `high` | Blocking work, security issue | Fix: Auth bypass vulnerability |
| `medium` | Normal operational work | Refactor: Clean up code |
| `low` | Nice to have, cleanup | Docs: Add more examples |

---

**Version**: 1.1.0  
**Last Updated**: 2025-12-17  
**Status**: Active (Phase 1 Complete - 15/15 tests passing)  
**Next Review**: After Phase 2 (dynamic rules & dashboard) completion

## Implementation Status

### ✅ Phase 1 Complete
- Task creation with auto-ID generation (TASK-001, TASK-002, etc.)
- Task listing and filtering
- Task lifecycle (assign, start, complete, cancel)
- File organization with status-based and user-based directories
- YAML frontmatter parsing (including startedAt, completedAt)
- Priority-based sorting with tie-breaking by age
- Tests: 15/15 passing (100%)

### 🚧 Phase 2 Coming
- Dynamic rule generation (`TaskStateRuleWriter`)
- Dashboard kanban board integration
- Requirement linkage validation
- External issue import (GitHub, Jira)
- Time tracking and statistics
- Task templates






