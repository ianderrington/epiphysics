---
type: sop
category: ai-technique
sop_id: SOP-0.1.19
title: Correct Requirement-to-Test Workflow (Dog-Fooding Guide)
phase: null
group: B
part_number: 19
audience: [developers, ai-agents]
read_time: 25
created: 2025-12-17
updated: 2025-12-21
status: active
version: '1.1'
author: Supernal Coding Team
related_sops: [SOP-5.01, SOP-6.01, SOP-T.01, REQ-WORKFLOW-168, REQ-WORKFLOW-169]
prerequisites: []
tags: [requirements, testing, workflow, dog-fooding, sc-commands, wip-registry, auto-registration]
---

# Correct Requirement-to-Test Workflow

**Purpose**: Document the CORRECT workflow for creating requirements and tests using Supernal Coding's own system.

**Critical**: This is how we dog-food our own tools. Follow this EXACTLY.

---

## Overview

**Phase Sequence**: Phase 5 (Requirements) → Phase 6 (Tests) → Phase 7 (Build)

**Critical Rule**: **Requirements MUST exist BEFORE tests**. No exceptions.

---

## Complete Workflow (Step-by-Step)

### Phase 5: Create Requirement

#### Step 1: Create Requirement

```bash
# Create new requirement
sc requirement new "Test-Feature Mapping System" \
  --epic=developer-tooling \
  --priority=high \
  --request-type=feature

# Output:
# ✅ Created requirement: REQ-WORKFLOW-158
# 📄 File: docs/requirements/workflow/req-workflow-158-test-feature-mapping-system.md
```

**Result**: Requirement file created with frontmatter:

```yaml
---
id: REQ-WORKFLOW-158
title: Test-Feature Mapping System
epic: developer-tooling
priority: high
request_type: feature
status: draft
created: 2025-12-17
tests: []  # Empty - will populate next
---
```

---

#### Step 2: Write Gherkin Scenarios

**Edit the requirement file** and add Gherkin:

```gherkin
## Scenarios

```gherkin
Feature: Test-Feature Mapping System

Scenario: Extract REQ-XXX from test files
  Given 281 test files in the repository
  When I run the extraction script
  Then I should find all REQ-XXX references
  And categorize them as valid/ambiguous/phantom

Scenario: Map requirements to features
  Given a requirement with ID REQ-WORKFLOW-158
  When I search for linked features
  Then I should find the feature README
  And the feature README should list this requirement
```
```

**Important**: Gherkin MUST be in ` ```gherkin ` code blocks.

---

#### Step 3: List Test Files You WILL Create

**Edit requirement frontmatter** to declare test files:

```yaml
---
id: REQ-WORKFLOW-158
title: Test-Feature Mapping System
tests:
  - tests/requirements/req-158/req-158-extract.test.js
  - tests/requirements/req-158/req-158-validate.test.js
  - tests/requirements/req-158/req-158-map.test.js
  - tests/requirements/req-158/req-158-integration.test.js
---
```

**Why**: This creates the traceability link BEFORE files exist.

---

#### Step 4: Validate Requirement

```bash
sc requirement validate REQ-WORKFLOW-158

# Output:
# ✅ REQ-WORKFLOW-158: Valid
# ✅ Gherkin scenarios found
# ⚠️ Warning: Test files don't exist yet (expected before Phase 6)
```

---

### Phase 6: Generate Test Stubs

#### Step 5: Generate Test Stubs from Requirement (Auto-WIP by Default)

**NEW (REQ-WORKFLOW-168)**: Test files are **automatically WIP-registered by default**:

```bash
# Default behavior: Auto-registers generated files
sc requirement generate-tests REQ-WORKFLOW-158 --feature=test-evidence-traceability

# OR short form:
sc planning req generate-tests 158 --feature=test-evidence-traceability
```

**What This Does**:

1. **Reads Gherkin** from requirement file
2. **Creates test directory**: `tests/requirements/req-158/`
3. **Generates 4 files**:
   - `req-158.feature` - Extracted Gherkin
   - `req-158.steps.js` - Step definitions (stub)
   - `req-158.unit.test.js` - Unit test (stub)
   - `req-158.e2e.test.js` - E2E test (stub)
4. **Auto-registers files in WIP registry** (REQ-168) - **DEFAULT BEHAVIOR**

**Example Output**:

```bash
✅ Test files generated for REQ-158
📁 Test directory: tests/requirements/req-158
📝 Files created:
   - req-158.feature
   - req-158.steps.js
   - req-158.unit.test.js
   - req-158.e2e.test.js

🔄 Registering test files in WIP registry...
✅ WIP-registered: tests/requirements/req-158/req-158.feature
✅ WIP-registered: tests/requirements/req-158/req-158.steps.js
✅ WIP-registered: tests/requirements/req-158/req-158.unit.test.js
✅ WIP-registered: tests/requirements/req-158/req-158.e2e.test.js

📋 WIP Registration Summary: 4/4 succeeded
✅ Generated test files are now WIP-tracked (feature: test-evidence-traceability)
💡 Next: Implement tests, then commit with: git commit -m "test(test-evidence-traceability): Add tests (REQ-158)"
```

**Why Auto-Register by Default**:
- ✅ Prevents pre-commit hook blocking (5+ untracked files)
- ✅ Claims ownership for multi-agent coordination
- ✅ Automatic feature/requirement association
- ✅ Enforces best practices automatically
- ✅ No manual steps needed

**To Skip Auto-Registration** (not recommended):
```bash
sc requirement generate-tests REQ-158 --no-register
# Files created but NOT WIP-tracked - you must track them manually
```

---

#### Step 6: Manual WIP Registration (Only If Using --no-register)

**ONLY needed if you used `--no-register` flag above (not recommended):**

```bash
# Register all stub files manually
sc workflow wip register tests/requirements/req-158/*.js \
  --feature=test-evidence-traceability \
  --requirement=REQ-WORKFLOW-158 \
  --reason="Generated test stubs, will implement"
```

**Recommendation**: Don't use `--no-register`. The default auto-registration behavior is the correct workflow.

---

#### Step 7: Commit Test Stubs

```bash
git add tests/requirements/req-158/
git commit -m "test(test-evidence-traceability): Add test stubs (REQ-WORKFLOW-158)

Generated test framework from Gherkin scenarios.
Files are stubs (.todo() tests) - will implement next.

Related: Test-feature mapping system"
```

**Note**: If using `sc git commit`, files auto-unregister from WIP.

---

### Phase 7: Implement Tests

#### Step 8: Implement Test Logic

**Edit stub files** and change `.todo()` to actual tests:

**Before** (`req-158.unit.test.js`):
```javascript
describe('REQ-WORKFLOW-158: Test-Feature Mapping System', () => {
  it.todo('should meet functional requirements');
  // TODO: Test the functional behavior
});
```

**After**:
```javascript
import { extractRequirements } from '../../../supernal-code-package/scripts/extract-test-requirements.js';

describe('REQ-WORKFLOW-158: Test-Feature Mapping System', () => {
  it('should extract REQ-XXX from test files', async () => {
    const results = await extractRequirements('tests/');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty('requirementId');
  });

  it('should categorize requirements as valid/ambiguous/phantom', async () => {
    const validation = await validateRequirements(results);
    expect(validation).toHaveProperty('valid');
    expect(validation).toHaveProperty('ambiguous');
    expect(validation).toHaveProperty('phantom');
  });
});
```

---

#### Step 9: Run Tests

```bash
# Run specific requirement tests
npm test tests/requirements/req-158/

# OR use sc test (with evidence logging)
sc test tests/requirements/req-158/

# Output:
# PASS tests/requirements/req-158/req-158.unit.test.js
#   REQ-WORKFLOW-158: Test-Feature Mapping System
#     ✓ should extract REQ-XXX from test files (45ms)
#     ✓ should categorize requirements (23ms)
# 
# Tests: 2 passed, 2 total
```

---

#### Step 10: Commit Implementation

```bash
git add tests/requirements/req-158/req-158.unit.test.js
git add supernal-code-package/scripts/extract-test-requirements.js  # Implementation
git commit -m "feat(test-evidence-traceability): Implement extraction (REQ-WORKFLOW-158)

- Extract REQ-XXX from test files using 3 methods
- Categorize as valid/ambiguous/phantom
- Tests passing (2/2)

Related: Test-feature mapping system"
```

---

### Phase 8: Update Feature README

#### Step 11: Link Requirement to Feature

**Edit**: `docs/features/developer-tooling/test-evidence-traceability/README.md`

**Add to frontmatter**:
```yaml
---
feature_id: test-evidence-traceability
requirements:
  - REQ-WORKFLOW-125  # Existing
  - REQ-WORKFLOW-158  # NEW - Test-Feature Mapping System
---
```

**Commit**:
```bash
git add docs/features/developer-tooling/test-evidence-traceability/README.md
git commit -m "docs(test-evidence-traceability): Link REQ-WORKFLOW-158

Add Test-Feature Mapping System requirement to feature."
```

---

### Phase 9: Update Requirement Status

#### Step 12: Mark Requirement Complete

```bash
sc requirement update REQ-WORKFLOW-158 --status=done

# OR manually edit frontmatter:
# status: done
```

---

## Complete Command Reference

### Phase 5: Requirements

```bash
# 1. Create requirement
sc requirement new "Title" --epic=X --priority=high --request-type=feature

# 2. Edit requirement file (add Gherkin, declare test files)
# 3. Validate
sc requirement validate REQ-XXX
```

### Phase 6: Tests

```bash
# 4. Generate test stubs (auto-WIP registration by default)
sc requirement generate-tests REQ-XXX --feature=X

# OR skip WIP registration (not recommended)
sc requirement generate-tests REQ-XXX --no-register

# 5. Manual WIP register stubs (ONLY if --no-register used above)
sc workflow wip register tests/requirements/req-XXX/*.js --feature=X --requirement=REQ-XXX

# 6. Commit stubs
git add tests/requirements/req-XXX/
git commit -m "test(feature): Add test stubs (REQ-XXX)"
```

### Phase 7: Build

```bash
# 7. Implement tests
# 8. Run tests
sc test tests/requirements/req-XXX/

# 9. Commit implementation
git commit -m "feat(feature): Implement X (REQ-XXX)"

# 10. Update feature README
# 11. Commit README
git commit -m "docs(feature): Link REQ-XXX"

# 12. Mark requirement done
sc requirement update REQ-XXX --status=done
```

---

## Files Generated

### By `sc requirement new`

```
docs/requirements/workflow/req-workflow-158-test-feature-mapping-system.md
```

### By `sc requirement generate-tests`

```
tests/requirements/req-158/
├── req-158.feature           # Gherkin extracted from requirement
├── req-158.steps.js          # Cucumber step definitions (stub)
├── req-158.unit.test.js      # Unit tests (stub with .todo())
└── req-158.e2e.test.js       # E2E tests (stub with .todo())
```

---

## Integration with WIP Registry

**When to WIP Register**:

1. **After generating stubs** (before commit)
2. **When partially implementing** (multi-session work)
3. **When working with other agents** (claim ownership)

**WIP Registry Commands**:

```bash
# Register
sc workflow wip register <file> --feature=X --requirement=REQ-XXX

# Check status
sc workflow wip list
sc workflow wip status

# Cleanup old entries
sc workflow wip cleanup --older-than 7d
```

---

## Integration with Documentation Processor

**Alternative: Generate Implementation from Docs**

If you have a design doc with code examples:

```bash
# Process design doc to create implementation files
sc docs process docs/features/.../design.md --commit
```

This extracts code blocks marked with `**File**: \`path\`` and creates files automatically.

---

## Common Mistakes (Don't Do These)

### ❌ Creating Tests Before Requirement

```bash
# WRONG ORDER:
touch tests/feature-test.js  # ❌ No requirement yet
git commit -m "test: add tests"
```

**Fix**: Always create requirement FIRST.

---

### ❌ Not Declaring Tests in Requirement

```yaml
---
id: REQ-WORKFLOW-158
tests: []  # ❌ Empty - tests exist but not linked
---
```

**Fix**: Add test paths to `tests:` field BEFORE generating.

---

### ❌ Not Using `sc requirement generate-tests`

```bash
# WRONG:
mkdir tests/requirements/req-158
touch tests/requirements/req-158/test.js  # ❌ Manual creation
```

**Fix**: Use `sc requirement generate-tests REQ-XXX`.

---

### ❌ Not WIP Registering Stubs (When Using --no-register)

```bash
# Create stubs with --no-register flag
sc requirement generate-tests REQ-XXX --no-register
# ❌ Files created but not WIP-tracked
# ... work on something else ...
# ❌ Pre-commit hook blocks: 4 untracked files!
```

**Fix Option 1 (Recommended)**: Don't use `--no-register` - use default behavior:
```bash
sc requirement generate-tests REQ-XXX --feature=X  # Auto-registers by default
```

**Fix Option 2**: WIP register manually if you already used `--no-register`:
```bash
sc workflow wip register tests/requirements/req-XXX/*.js --feature=X --requirement=REQ-XXX
```

---

### ❌ Wrong Commit Format

```bash
# WRONG:
git commit -m "add tests"  # ❌ No feature scope, no REQ-XXX
```

**Fix**: Use conventional commits:
```bash
git commit -m "test(feature-name): Add test stubs (REQ-XXX)"
```

---

## CLI Command Features

**Every `sc` command should have**:

1. **Feature association** - Belongs to a feature in `docs/features/`
2. **Tests** - Unit + integration tests in `tests/`
3. **Documentation** - Usage in SOP or guide

**Check CLI Command Coverage**:

```bash
# List all CLI commands
sc --help

# Check which commands have tests
sc audit cli-tests

# Generate stubs for untested commands
sc audit cli-tests --fix
```

---

## Related Documentation

- [SOP-5.01: Technical Requirements Development](../phase-5-requirements/SOP-5.01-technical-requirements-development.md)
- [SOP-6.01: Testing Strategy](../phase-6-tests/SOP-6.01-testing-strategy.md)
- [SOP-T.01: Using sc CLI](../tools/SOP-T.01-using-sc-cli.md)
- cursor rule: wip-registry.mdc
- cursor rule: git-commit-smart.mdc

---

## Success Checklist

- [ ] Requirement created with `sc requirement new`
- [ ] Gherkin scenarios written in requirement
- [ ] Test files declared in requirement `tests:` field
- [ ] Requirement validated with `sc requirement validate`
- [ ] Test stubs generated with `sc requirement generate-tests --feature=X` (auto-registers by default)
- [ ] Stubs committed with proper format
- [ ] Tests implemented (not stubs)
- [ ] Tests passing (`sc test` or `npm test`)
- [ ] Implementation committed with REQ-XXX reference
- [ ] Feature README updated with requirement link
- [ ] Requirement status updated to `done`

---

**Last Updated**: 2025-12-17  
**Status**: Draft (needs approval)  
**Next**: Get team review, integrate into onboarding


