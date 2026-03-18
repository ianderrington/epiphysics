---
type: sop
category: tools
sop_id: SOP-T.11
title: Feature Flow Workflow
description: Complete feature development workflow from idea to tested implementation
phase: null
group: D. Tools & Commands
part_number: null
audience: [developers, ai-agents, architects]
read_time: 15
created: 2025-12-26
updated: 2025-12-26
status: active
version: '1.0'
author: Supernal Coding Team
template_source: https://github.com/supernalintelligence/supernal-coding
project_name: 'supernal-coding'
reviewedBy: []
reviewDates: []
related_sops: [SOP-4.01, SOP-T.09, SOP-T.01]
prerequisites: [SOP-4.01]
tags: [features, workflow, implementation, testing, documentation-processor]
---

# SOP-T.11: Feature Flow Workflow

**Version**: 1.0  
**Created**: 2025-12-26  
**Status**: Active

---

## Purpose

Execute the complete feature development workflow from idea formalization through tested implementation, using Supernal Coding's documentation-driven development approach.

---

## When to Use

Use this workflow when:
- Creating a new feature from an idea
- Implementing a planned requirement
- Building a multi-file feature systematically
- Coordinating multi-agent development work

---

## Complete Workflow

### Step 1: Formalize the Idea (Phase 4)

**Create feature structure with proper domain assignment:**

```bash
# Create feature in appropriate domain
sc planning feature create \
  --id=my-feature \
  --domain=developer-tooling \
  --epic=epic-name \
  --priority=high \
  --phase=drafting
```

**What this creates:**
- `docs/features/{domain}/my-feature/README.md` with frontmatter
- Required directories: `design/`, `planning/`, `requirements/`

**Validate domain assignment:**
```bash
# Ensure domain exists in supernal.yaml
sc domain list

# Validate feature structure
sc planning feature audit --id=my-feature
```

---

### Step 2: Write Planning Documentation

**Create implementation plan using documentation processor pattern:**

```bash
# Create planning document
touch docs/features/{domain}/my-feature/planning/2025-12-26-implementation.md
```

**Use this exact format in your planning doc:**

```markdown
# My Feature Implementation Plan

## Overview
[Feature description and approach]

## Step 1: Create Types

**File**: `src/types/my-feature.ts`

```typescript
export interface MyFeature {
  id: string;
  name: string;
  createdAt: Date;
}
```

## Step 2: Create Service

**File**: `src/services/my-feature.ts`

```typescript
import { MyFeature } from '../types/my-feature';

export class MyFeatureService {
  async create(data: Partial<MyFeature>): Promise<MyFeature> {
    // Implementation
  }
}
```

## Step 3: Create Tests

**File**: `tests/services/my-feature.test.ts`

```typescript
import { MyFeatureService } from '../../src/services/my-feature';

describe('MyFeatureService', () => {
  it('should create feature with valid data', async () => {
    // Test implementation
  });
});
```
```

**Key pattern**: Use `**File**: \`path/to/file\`` followed by code block

---

### Step 3: Generate Implementation from Documentation

**Use documentation processor to create files automatically:**

```bash
# Process planning document (creates files + commits)
sc docs process \
  docs/features/{domain}/my-feature/planning/2025-12-26-implementation.md \
  --commit

# Or without auto-commit (review first)
sc docs process \
  docs/features/{domain}/my-feature/planning/2025-12-26-implementation.md

# Review what would be created (dry-run)
sc docs process \
  docs/features/{domain}/my-feature/planning/2025-12-26-implementation.md \
  --dry-run
```

**What happens:**
- ✅ Files created at specified paths
- ✅ Directories created automatically
- ✅ Generation headers added to files
- ✅ Planning doc updated: `**File IMPLEMENTED**:`
- ✅ Code blocks removed from documentation (DRY principle)
- ✅ Automatic commit with traceability (if using `--commit`)

**After processing:**
```markdown
## Step 1: Create Types

**File IMPLEMENTED**: `src/types/my-feature.ts`  
Generated from: `2025-12-26-implementation.md` | Commit: abc123f | 2025-12-26
```

---

### Step 4: Create Test Stubs

**If tests not included in planning doc, create stubs:**

```bash
# Option A: From requirement (if applicable)
sc requirement generate-tests REQ-042

# Option B: Manual test structure
mkdir -p tests/unit/my-feature
mkdir -p tests/integration/my-feature

touch tests/unit/my-feature/my-feature.test.ts
```

**Test stub template:**
```typescript
/**
 * Tests for MyFeature
 * Feature: my-feature
 * Requirement: REQ-042 (if applicable)
 */

import { MyFeatureService } from '../../src/services/my-feature';

describe('REQ-042: MyFeature', () => {
  describe('MyFeatureService', () => {
    it('should create feature with valid data', async () => {
      pending('Implement test');
    });

    it('should validate input data', async () => {
      pending('Implement test');
    });

    it('should handle edge cases', async () => {
      pending('Implement test');
    });
  });
});
```

---

### Step 5: Fill Out Tests (TDD)

**Implement test logic following TDD:**

```typescript
import { MyFeatureService } from '../../src/services/my-feature';

describe('REQ-042: MyFeature', () => {
  let service: MyFeatureService;

  beforeEach(() => {
    service = new MyFeatureService();
  });

  describe('create', () => {
    it('should create feature with valid data', async () => {
      const data = { name: 'Test Feature' };
      const result = await service.create(data);
      
      expect(result).toBeDefined();
      expect(result.id).toBeTruthy();
      expect(result.name).toBe('Test Feature');
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it('should validate input data', async () => {
      await expect(service.create({})).rejects.toThrow('Name is required');
    });

    it('should generate unique IDs', async () => {
      const result1 = await service.create({ name: 'Feature 1' });
      const result2 = await service.create({ name: 'Feature 2' });
      
      expect(result1.id).not.toBe(result2.id);
    });
  });
});
```

**Update feature frontmatter with test paths:**
```yaml
---
feature_id: "my-feature"
# ... other frontmatter ...
tests:
  - tests/unit/my-feature/my-feature.test.ts
  - tests/integration/my-feature/my-feature.integration.test.ts
---
```

---

### Step 6: Run Tests Iteratively

**Use `sc test` for iterative testing (NOT full suite):**

```bash
# Run only this feature's tests
sc test tests/unit/my-feature/

# Run specific test file
sc test tests/unit/my-feature/my-feature.test.ts

# Run with verbose output
sc test tests/unit/my-feature/ --verbose
```

**TDD Cycle:**
```bash
# 1. Run tests (should fail - red)
sc test tests/unit/my-feature/

# 2. Implement feature code
nano src/services/my-feature.ts

# 3. Run tests again (should pass - green)
sc test tests/unit/my-feature/

# 4. Refactor if needed
nano src/services/my-feature.ts

# 5. Run tests again (should still pass)
sc test tests/unit/my-feature/

# Repeat until feature complete
```

---

### Step 7: Run Full Test Suite

**Only when feature is complete:**

```bash
# Full test suite
npm test

# Or using project's TESTME.sh if it exists
./TESTME.sh
```

---

### Step 8: Update Feature Status

**Mark feature progress in frontmatter:**

```yaml
---
feature_id: "my-feature"
title: "My Feature"
domain: "developer-tooling"
phase: "complete"  # drafting → implementing → testing → complete
status: "active"
updated: "2025-12-26"
tests:
  - tests/unit/my-feature/my-feature.test.ts
  - tests/integration/my-feature/my-feature.integration.test.ts
---
```

**Add test results section to README:**

```markdown
# My Feature

## Test Coverage
- ✅ Unit tests: 100% passing (12 tests)
- ✅ Integration tests: 100% passing (5 tests)

## Test Evidence
- Unit results: `.supernal/test-results/test-2025-12-26-001.json`
- Integration results: `.supernal/test-results/test-2025-12-26-002.json`
```

---

### Step 9: Commit with Traceability

**Commit with proper conventional format:**

```bash
# Commit implementation + tests + docs
git add \
  src/services/my-feature.ts \
  src/types/my-feature.ts \
  tests/unit/my-feature/ \
  tests/integration/my-feature/ \
  docs/features/{domain}/my-feature/

git commit -m "feat(my-feature): implement feature with full test coverage (REQ-042)

- Created MyFeatureService with create/update/delete
- Added comprehensive unit tests (12 tests)
- Added integration tests (5 tests)
- Updated feature documentation

closes REQ-042"

# Or use smart commit for automatic traceability
sc git commit smart
```

---

## Multi-Agent Pattern

**For parallel development by multiple agents:**

```bash
# Agent 1: WIP-track their files
sc workflow wip register src/my-feature/layout.tsx --feature=my-feature --userid=alice
sc workflow wip register src/my-feature/header.tsx --feature=my-feature --userid=alice

# Agent 2: WIP-track their files (parallel work)
sc workflow wip register src/my-feature/sidebar.tsx --feature=my-feature --userid=bob
sc workflow wip register tests/my-feature/layout.test.tsx --feature=my-feature --userid=bob

# Agent 1: Commit when ready
git add src/my-feature/layout.tsx src/my-feature/header.tsx
git commit -m "feat(my-feature): add layout components"
# Files auto-unregistered from WIP

# Agent 2: Commit when ready
git add src/my-feature/sidebar.tsx tests/my-feature/
git commit -m "feat(my-feature): add sidebar and tests"
```

---

## Complete Checklist

Before marking feature complete:

- [ ] Feature created with `sc planning feature create`
- [ ] Frontmatter complete and valid
- [ ] Implementation plan created with `**File**:` pattern
- [ ] `sc docs process` run successfully
- [ ] Planning doc shows `**File IMPLEMENTED**:`
- [ ] Test stubs created
- [ ] Tests implemented and passing
- [ ] Test paths added to feature frontmatter
- [ ] `sc test <feature-path>` passing
- [ ] Full test suite passing (`npm test` or `./TESTME.sh`)
- [ ] Feature phase updated (drafting → complete)
- [ ] Committed with proper message and traceability

---

## Quick Reference

```bash
# 1. Create feature
sc planning feature create --id=my-feature --domain={domain} --epic={epic}

# 2. Write planning doc with **File**: pattern
nano docs/features/{domain}/my-feature/planning/implementation.md

# 3. Generate files from docs
sc docs process docs/features/{domain}/my-feature/planning/implementation.md --commit

# 4. Create/fill test stubs
touch tests/unit/my-feature/my-feature.test.ts
nano tests/unit/my-feature/my-feature.test.ts

# 5. Run tests iteratively
sc test tests/unit/my-feature/

# 6. Run full suite when complete
npm test

# 7. Update feature status
nano docs/features/{domain}/my-feature/README.md

# 8. Commit with traceability
git commit -m "feat(my-feature): complete implementation (REQ-XXX)"
```

---

## Related Documentation

- **Complete Rule**: See cursor rule: feature-flow.mdc - Detailed AI agent guidance
- **Phase 4 Planning**: [SOP-4.01](../phase-4-planning/SOP-4.01-feature-breakdown-and-estimation.md)
- **Domain Management**: [SOP-T.09](./SOP-T.09-domain-management.md)
- **Documentation Processor**: See cursor rule: documentation-processor.mdc
- **Feature Management**: See cursor rule: feature-management.mdc
- **Test-Requirement Linkage**: See cursor rule: test-requirement-linkage.mdc
- **WIP Registry**: See cursor rule: wip-registry.mdc

---

## Best Practices

### ✅ DO

- Use `sc planning feature create` for all new features
- Write planning docs BEFORE generating code
- Use `**File**:` pattern in planning docs
- Run `sc docs process --commit` to automate generation
- Create test stubs immediately after implementation
- Run `sc test <path>` during development (not full suite)
- Update frontmatter with test paths
- Use WIP registry for multi-agent work
- Commit with traceability (REQ-XXX, TASK-XXX)

### ❌ DON'T

- Don't manually create feature directories
- Don't copy-paste code from planning docs
- Don't skip documentation processor
- Don't write tests before generating stubs
- Don't run full test suite during iteration
- Don't forget to update frontmatter
- Don't commit untested code
- Don't leave files untracked

---

**Last Updated**: 2025-12-26
**Status**: Active
**Primary Reference**: See cursor rule: feature-flow.mdc







