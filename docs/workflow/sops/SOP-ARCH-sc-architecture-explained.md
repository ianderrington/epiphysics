---
sop_id: SOP-ARCH
title: "SC Architecture Explained: How Everything Works Together"
type: sop
category: architecture
phase: null
audience: [developer, architect, ciso, all]
created: 2025-12-17
updated: 2025-12-17
status: approved
version: "1.0"
tags: [architecture, system-design, components, data-flow, extensibility]
estimatedTime: "70min"
learningModule: true
prerequisites: [sop-hello-world]
---

# SC Architecture Explained: How Everything Works Together

**Goal**: Understand Supernal Coding's architecture well enough to use it effectively, extend it for your needs, and troubleshoot issues.

**Time**: 70 minutes  
**Audience**: All users (content adapts by role)

---

## What You'll Learn

After this module, you'll be able to:

1. ✅ **Explain** how SC components interact
2. ✅ **Trace** data from requirement to dashboard
3. ✅ **Import** external resources into SC
4. ✅ **Customize** SC for your team's needs
5. ✅ **Troubleshoot** common integration issues

---

## Section 1: The Big Picture (10 minutes)

### SC as a Complete System

Supernal Coding isn't just a CLI tool—it's a complete workflow system that maintains compliance and traceability automatically.

### The Ecosystem

```
┌─────────────────────────────────────────────────┐
│           Human + AI Collaboration              │
│  (User guides Cursor, Cursor uses SC commands)  │
└────────────┬────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────┐
│          .cursor/rules/ (Behavior Guide)         │
│  - SOPs define workflow phases                  │
│  - Compliance cards define requirements         │
│  - Naming conventions ensure consistency        │
│  - Dynamic rules show current state             │
└────────────┬────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────┐
│         supernal-code-package (Engine)          │
│  - CLI commands (sc requirement, sc test, etc.) │
│  - Requirements management                       │
│  - Test generation & execution                  │
│  - Compliance validation                        │
│  - Evidence collection                          │
└────────────┬────────────────────────────────────┘
             │
        ┌────┴────┬────────┬────────┐
        ↓         ↓        ↓        ↓
   [docs/]  [tests/]  [src/]  [.supernal/]
        │         │        │        │
        └─────────┴────────┴────────┘
                    │
                    ↓
        ┌───────────────────────┐
        │  supernal-dashboard    │
        │  (Visualization)       │
        │  - Real-time updates   │
        │  - Quality gates       │
        │  - Traceability views  │
        └───────────────────────┘
```

### Key Insight

**SC is NOT**:
- ❌ Just a CLI tool you run manually
- ❌ A checklist you follow
- ❌ A documentation generator

**SC IS**:
- ✅ A workflow system that AI follows
- ✅ An enforcement engine that maintains compliance
- ✅ A traceability system that connects everything
- ✅ A visualization platform that shows system state

### How It Works in Practice

**Traditional Development**:
```
Developer → Writes code → Manually creates tests → 
Manually documents → Manually tracks compliance → 
Manually creates commit → Hopes everything connects
```

**With SC**:
```
Developer → Tells Cursor what to build →
Cursor (following .cursor/rules/) →
  1. Creates requirement (sc requirement new)
  2. Generates tests (sc requirement generate-tests)
  3. Implements code (following compliance)
  4. Runs tests (sc test - logs evidence)
  5. Creates commit (sc git commit - with traceability)
  6. Updates dashboard (automatic)
→ Everything connected automatically
```

### Concept Check

**Q1**: What guides Cursor's behavior when using SC?  
**A**: `.cursor/rules/` - Contains SOPs, compliance cards, and workflow rules

**Q2**: Where does evidence get stored?  
**A**: `.supernal/` directory - Contains test results, compliance checks, and traceability data

**Q3**: Who executes SC commands in the recommended workflow?  
**A**: AI (Cursor) executes, human validates the output

---

## Section 2: Component Deep Dive (15 minutes)

### 2.1: supernal-code-package (The Engine)

**What It Is**: The core SC engine providing CLI commands and libraries for managing requirements, tests, compliance, and evidence.

**Key Commands by Workflow Phase**:

**Phase 5: Requirements**
```bash
# Create new requirement
sc requirement new "Feature Name" --epic=auth --priority=high

# Validate requirement structure
sc requirement validate REQ-042

# Generate test stubs from requirement
sc requirement generate-tests REQ-042

# List all requirements
sc requirement list --status=todo
```

**Phase 6-7: Testing & Implementation**
```bash
# Run tests with evidence logging
sc test tests/auth/

# Check test-requirement linkage
sc test-map requirements

# Show test coverage
sc test-map coverage
```

**Phase 8+: Integration & Validation**
```bash
# Commit with traceability
sc git commit src/auth/ tests/auth/ -m "feat(auth): login (REQ-042)"

# Validate entire system
sc validate --all

# Check compliance coverage
sc compliance check
```

**Phase 11: Production**
```bash
# Generate audit report
sc compliance export --framework=soc2 --format=pdf

# Generate traceability matrix
sc trace export --format=csv
```

### How Cursor Uses It

**User says**: "Create a requirement for password reset"

**Cursor does**:
1. Reads `.cursor/rules/add-requirement.mdc`
2. Sees: "Use `sc requirement new` command"
3. Executes: `sc requirement new "Password Reset" --epic=auth --priority=high`
4. Validates output
5. Reports: "Created REQ-AUTH-042"

**User validates**: Checks dashboard, sees REQ-AUTH-042 listed

---

### 2.2: supernal-dashboard (The Visualization)

**What It Is**: Web-based dashboard showing real-time system state—requirements, tests, compliance, quality gates, and traceability.

**Key Views**:

**Requirements View**:
- All requirements with status
- Progress indicators
- Linked tests and compliance
- Dependency visualization

**Tests View**:
- Test results and coverage
- Requirement linkage
- Failed test details
- Historical trends

**Compliance View**:
- Framework coverage (SOC2, HIPAA, etc.)
- Control implementation status
- Evidence completeness
- Gap analysis

**Quality View**:
- Quality gates status
- Code coverage metrics
- Technical debt tracking
- Security scan results

**Traceability View**:
- Full chain: compliance → requirement → test → code → commit → evidence
- Visual graph representation
- Click to navigate chain

### How It Works

**Real-Time Updates**:
```
1. You commit code (via Cursor/sc)
2. Git hook runs validations
3. Evidence logged to .supernal/
4. Dashboard watches .supernal/
5. Dashboard auto-updates
6. You see changes immediately
```

**No Manual Updates Required**: Dashboard reads filesystem, git history, and evidence files directly.

### Role-Specific Views

**For Developers**:
- "My Requirements" - Assigned to you
- "My Tests" - Tests you've written
- "Blockers" - What's preventing progress

**For CISOs**:
- "Compliance Status" - Framework coverage
- "Evidence Gaps" - Missing evidence
- "Audit Readiness" - Export packages

**For Architects**:
- "System Health" - Overall quality metrics
- "Technical Debt" - Areas needing refactoring
- "Team Metrics" - Velocity and quality trends

---

### 2.3: .cursor/rules/ (The Behavior Guide)

**What It Is**: Rules and SOPs that guide Cursor's behavior when working with SC.

**Rule Categories**:

**Workflow Rules** (How to work):
- `phase-aligned-workflow.mdc` - Enforces 12-phase SOP
- `search-before-implement.mdc` - Prevents duplicates
- `add-requirement.mdc` - How to create requirements
- `git-commit-smart.mdc` - Commit message format

**Quality Rules** (What quality means):
- `test-requirement-linkage.mdc` - Test traceability
- `feature-risk-assessment.mdc` - Risk documentation
- `document-and-commit.mdc` - Documentation standards

**Dynamic Rules** (Current state - auto-generated):
- `agent-state.mdc` - File management status
- `feature-state.mdc` - Active work tracking
- `enforcement.mdc` - Policy violations

**Compliance Rules** (What's required):
- Individual compliance card files (e.g., `comp-soc2-001.mdc`)
- Framework-specific requirements
- Security best practices

### How Cursor Uses Rules

**Example Flow**:

1. **User**: "Create a requirement for login"
2. **Cursor reads**: `.cursor/rules/add-requirement.mdc`
3. **Rule says**: 
   ```markdown
   Use `sc requirement new` command with:
   - Title (required)
   - Epic (optional but recommended)
   - Priority (high/medium/low)
   ```
4. **Cursor executes**: `sc requirement new "User Login" --epic=auth --priority=high`
5. **Cursor validates**: Checks output, confirms REQ-XXX created
6. **Cursor reports**: "Created REQ-AUTH-001 for user login"

### Creating Custom Rules

**Your Team's Naming Convention**:

```markdown
<!-- .cursor/rules/team-naming.mdc -->
---
description: Team-specific naming conventions
alwaysApply: true
---

Once added, Cursor will enforce this automatically.

---

## Section 3: Data Flow & Traceability (10 minutes)

### The Complete Traceability Chain

Understanding how data flows from requirement to dashboard is key to troubleshooting and validation.

### Stage 1: Requirement Creation

**What Happens**:
```
User tells Cursor: "Create requirement for user login"
         ↓
Cursor runs: sc requirement new "User Login" --epic=auth
         ↓
File created: docs/requirements/core/req-core-042-user-login.md
         ↓
Frontmatter includes:
  - id: REQ-CORE-042
  - status: todo
  - tests: [] (empty initially)
  - complianceCards: [] (to be added)
         ↓
Git commit: "docs: add REQ-CORE-042 user login requirement"
         ↓
Dashboard updates: Shows REQ-CORE-042 in "To Do"
```

**Evidence Created**:
- Requirement file in docs/
- Git commit with message
- Dashboard shows new requirement

---

### Stage 2: Test Generation

**What Happens**:
```
User tells Cursor: "Generate tests for REQ-CORE-042"
         ↓
Cursor runs: sc requirement generate-tests REQ-CORE-042
         ↓
File created: tests/requirements/req-042/req-042-user-login.test.js
         ↓
Requirement updated:
  frontmatter:
    tests:
      - tests/requirements/req-042/req-042-user-login.test.js
         ↓
Test file structure:
  describe('REQ-CORE-042: User Login', () => {
    // Scenario: Successful login
    it('should authenticate valid credentials', () => {
      // Test implementation
    });
  });
         ↓
Git commit: "test: add tests for REQ-CORE-042"
         ↓
Dashboard updates: Shows test file linked to REQ-CORE-042
```

**Evidence Created**:
- Test file in tests/
- Requirement frontmatter updated
- Git commit with linkage
- Dashboard shows test linkage

---

### Stage 3: Implementation

**What Happens**:
```
User tells Cursor: "Implement REQ-CORE-042"
         ↓
Cursor creates: src/auth/login.js
         ↓
File includes:
  - bcrypt password hashing
  - JWT token generation
  - Compliance comments (// REQ-CORE-042: comp-soc2-005)
         ↓
Test file imports implementation:
  const { loginUser } = require('../../src/auth/login');
         ↓
Cursor runs: sc test tests/requirements/req-042/
         ↓
Tests fail (expected - not implemented yet)
         ↓
Cursor implements functionality
         ↓
Cursor runs: sc test again
         ↓
Tests pass ✅
         ↓
Git commit: "feat(auth): implement user login (REQ-CORE-042)"
         ↓
Dashboard updates: Shows REQ-CORE-042 implemented, tests passing
```

**Evidence Created**:
- Implementation file in src/
- Test results in .supernal/evidence/
- Git commit with feature tag
- Dashboard shows complete chain

---

### Stage 4: Evidence Collection

**What Happens**:
```
sc test command runs
         ↓
Collects:
  - Test results (pass/fail)
  - Coverage data
  - Execution time
  - Linked requirements
         ↓
Writes to: .supernal/evidence/test-results-<timestamp>.json
         ↓
Dashboard reads evidence file
         ↓
Updates views:
  - Requirements: REQ-CORE-042 ✅ passing
  - Tests: 8/8 passing
  - Traceability: Complete chain visible
```

**Evidence File Structure**:
```json
{
  "timestamp": "2025-12-17T19:00:00Z",
  "requirements": ["REQ-CORE-042"],
  "tests": {
    "total": 8,
    "passed": 8,
    "failed": 0
  },
  "coverage": {
    "lines": 95,
    "branches": 88
  },
  "complianceCards": ["comp-soc2-005", "comp-soc2-007"]
}
```

---

### Stage 5: Compliance Verification

**What Happens**:
```
User tells Cursor: "Verify compliance for REQ-CORE-042"
         ↓
Cursor runs: sc compliance check
         ↓
System verifies:
  - Requirement has complianceCards: [...]
  - Implementation has compliance comments
  - Tests cover compliance scenarios
  - Evidence exists
         ↓
Generates report: .supernal/evidence/compliance-check-<timestamp>.json
         ↓
Dashboard shows:
  - comp-soc2-005: ✅ Implemented (REQ-CORE-042)
  - comp-soc2-007: ✅ Implemented (REQ-CORE-042)
```

---

### Interactive Exercise: Trace a Real Requirement

**Your Turn**:

1. Pick any REQ-XXX from your dashboard
2. Find requirement file: `find docs/requirements/ -name "*req-XXX*"`
3. Open file, find `tests:` in frontmatter
4. Open test file, find `require()` or `import` statements
5. Find implementation files referenced
6. Search git history: `git log --grep="REQ-XXX"`
7. View evidence: `ls .supernal/evidence/ | grep -i req-XXX`

**Verification Checklist**:
- [ ] Found requirement file
- [ ] Found test files in frontmatter
- [ ] Found implementation via imports
- [ ] Found git commits referencing REQ-XXX
- [ ] Found evidence files
- [ ] Dashboard shows complete chain

**Ask Cursor**: "Trace REQ-XXX for me and show me the complete chain"

Cursor will execute the above steps and show you results.

---

## Section 4: Resource System (10 minutes)

### What `sc resource import` Does

**Purpose**: Convert external data formats → SC format while maintaining traceability and external IDs.

**Supported Types**:
1. Requirements (Jira, Asana, GitHub Issues, CSV)
2. Compliance frameworks (Custom YAML, NIST, ISO)
3. Test results (Jest, Pytest, JUnit XML)
4. Documentation (Confluence, Notion, Markdown)

---

### Use Case 1: Import Existing Requirements

**Scenario**: You have 50 requirements in Jira, need them in SC

**Solution**:

```bash
# Step 1: Export from Jira
# (Use Jira UI: Export → JSON)
# Output: jira-export.json

# Step 2: Import to SC
sc resource import requirements \
  --source=jira-export.json \
  --format=jira \
  --epic=auth \
  --map-fields="summary=title,description=description,priority=priority"

# Step 3: Verify
sc requirement list --epic=auth
```

**What Gets Created**:
```
docs/requirements/auth/
  ├── req-auth-001-user-registration.md
  ├── req-auth-002-password-reset.md
  ├── ...
  └── req-auth-050-session-timeout.md
```

**Frontmatter Includes**:
```yaml
---
id: REQ-AUTH-001
title: "User Registration"
external_id: "AUTH-123"  # Original Jira ID
external_system: "jira"
external_url: "https://jira.company.com/browse/AUTH-123"
---
```

**Bidirectional Sync** (optional):
```bash
# Export changes back to Jira
sc resource export requirements \
  --destination=jira \
  --epic=auth
```

---

### Use Case 2: Import Custom Compliance Framework

**Scenario**: Internal security controls not in SOC2/HIPAA

**Create Framework File** (`internal-controls.yaml`):

```yaml
framework:
  id: internal-security
  name: "Internal Security Controls"
  version: "2.0"
  owner: "Security Team"

controls:
  - id: ctrl-001
    title: "Multi-Factor Authentication"
    requirement: "All user accounts must use MFA"
    category: access-control
    priority: critical
    implementation:
      - "Use TOTP (Time-based One-Time Password)"
      - "Backup codes for account recovery"
      - "Enforce MFA for all admin accounts"
    validation:
      - "Test MFA flow"
      - "Verify backup code generation"
      - "Audit admin MFA enforcement"
    
  - id: ctrl-002
    title: "Data Encryption at Rest"
    requirement: "All PII must be encrypted at rest"
    category: data-protection
    priority: high
    implementation:
      - "Use AES-256 encryption"
      - "Key rotation every 90 days"
      - "Store keys in secure vault"
```

**Import Framework**:
```bash
sc resource import compliance \
  --source=internal-controls.yaml \
  --format=yaml

# Result: Creates docs/compliance/frameworks/internal-security/
# With individual card files: ctrl-001.md, ctrl-002.md, etc.
```

**Use in Requirements**:
```yaml
# In requirement frontmatter
complianceCards:
  - comp-soc2-005
  - ctrl-001  # Your internal control
```

**Cursor can now reference**:
```
"Ensure this meets ctrl-001 requirements for MFA"
```

---

### Use Case 3: Import Test Results

**Scenario**: Running tests outside SC, want evidence in dashboard

**Solution**:

```bash
# Step 1: Run your existing test suite
npm test -- --json > test-results.json

# Step 2: Import results
sc resource import test-results \
  --source=test-results.json \
  --format=jest \
  --link-requirements  # Auto-link based on test names

# Step 3: View in dashboard
# Dashboard now shows:
# - Test coverage from external suite
# - Requirements linked to tests
# - Evidence for compliance
```

**Result**: `.supernal/evidence/imported-jest-<timestamp>.json`

---

### Use Case 4: Import Team Documentation

**Scenario**: Team wiki in Notion, want it in SC docs

**Solution**:

```bash
# Step 1: Export from Notion (Markdown format)
# Output: notion-export/ directory

# Step 2: Import to SC
sc resource import docs \
  --source=notion-export/ \
  --dest=docs/team-wiki/ \
  --preserve-structure \
  --convert-links  # Convert Notion links to relative paths

# Result: docs/team-wiki/ populated with markdown files
```

---

### Hands-On Exercise

**Download and import a sample**:

```bash
# Get sample data
curl -O https://docs.supernal-local.dev/samples/sample-jira.json

# Import it
sc resource import requirements \
  --source=sample-jira.json \
  --format=jira \
  --epic=sample

# Verify
sc requirement list --epic=sample

# Check dashboard
# Should show imported requirements with external_id
```

**Verification**:
- [ ] Files created in `docs/requirements/sample/`
- [ ] Frontmatter includes `external_id`
- [ ] Dashboard shows imported requirements
- [ ] Can trace back to original Jira IDs

---

## Section 5: Customization & Extension (15 minutes)

### 5.1: Team Configuration (supernal.yaml)

**Purpose**: Set team-wide defaults and behavior

**Common Customizations**:

```yaml
# supernal.yaml

project:
  name: "My Project"
  org: "my-company"
  default_branch: "main"

requirements:
  default_priority: medium
  id_format: "REQ-{category}-{num}"  # e.g., REQ-AUTH-001
  auto_generate_tests: true
  categories: [core, auth, api, ui]

compliance:
  frameworks: [soc2, internal-security]
  required_cards_per_requirement: 1
  auto_link_cards: true

git_hooks:
  pre_commit:
    checks:
      requirement_validation: true
      test_linkage: true
      compliance_check: true
      secret_scanning: true
    block_on_errors: true

testing:
  frameworks: [jest, pytest]
  evidence_collection: true
  auto_link_requirements: true

dashboard:
  port: 3006
  auto_open: false
  views: [requirements, tests, compliance, quality]
```

**Effect**: All team members get consistent behavior

---

### 5.2: Custom Compliance Cards

**Create Your Own Control**:

```bash
# Create directory
mkdir -p docs/compliance/frameworks/my-framework/

# Create card file
```

**Card Template** (`ctrl-custom-001.md`):

```markdown
---
card_id: ctrl-custom-001
title: "API Rate Limiting"
category: security
priority: high
framework: my-framework
---

# Control: API Rate Limiting

## Requirement

All public APIs must implement rate limiting:
- 100 requests/minute per IP
- 1000 requests/hour per authenticated user
- Return 429 Too Many Requests when exceeded

## Implementation Guidance

**Recommended Approach**:
- Use Redis for distributed rate limiting
- Implement sliding window algorithm
- Include rate limit headers in responses

**Code Example**:
\`\`\`javascript
// Rate limiter middleware
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);
\`\`\`

## Validation

- [ ] Rate limits enforced in code
- [ ] Tests verify limit enforcement
- [ ] 429 status code returned
- [ ] Rate limit headers included
- [ ] Distributed system support (if applicable)

## Evidence Required

- Implementation code (middleware/decorator)
- Unit tests showing enforcement
- Integration tests showing 429 response
- API documentation showing limits

## Related Controls

- comp-soc2-001 (Access Control)
- comp-soc2-007 (Audit Logging)
```

**Link to Requirements**:
```yaml
# requirement frontmatter
complianceCards:
  - ctrl-custom-001
```

---

### 5.3: Custom Dashboard Views

**Create Role-Specific Views**:

```typescript
// apps/supernal-dashboard/src/views/custom/DevOpsView.tsx

import React from 'react';
import { RequirementsList } from '@/components/requirements/RequirementsList';
import { ComplianceStatus } from '@/components/compliance/ComplianceStatus';
import { DeploymentMetrics } from '@/components/metrics/DeploymentMetrics';

export function DevOpsView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Deploy-Ready Requirements</h2>
        <RequirementsList 
          filter={{ status: 'done', hasTests: true, hasEvidence: true }}
        />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Compliance Status</h2>
        <ComplianceStatus frameworks={['soc2', 'internal-security']} />
      </div>
      
      <div className="col-span-2">
        <h2 className="text-2xl font-bold mb-4">Deployment Metrics</h2>
        <DeploymentMetrics timeRange="30d" />
      </div>
    </div>
  );
}
```

**Register View**:
```typescript
// apps/supernal-dashboard/src/config/views.ts

export const CUSTOM_VIEWS = {
  'devops': {
    component: DevOpsView,
    title: 'DevOps Dashboard',
    icon: Rocket,
    roles: ['devops', 'sre', 'architect']
  }
};
```

**Access**: Dashboard sidebar now shows "DevOps Dashboard" for those roles

---

### 5.4: Custom CLI Commands

**Extend SC with Team-Specific Commands**:

```javascript
// .sc-plugins/notify-team.js

module.exports = {
  name: 'notify-team',
  description: 'Send Slack notification about requirement status',
  
  options: [
    { flag: '--requirement <id>', description: 'Requirement ID' },
    { flag: '--message <text>', description: 'Custom message' }
  ],
  
  async run(args) {
    const { requirement, message } = args;
    
    // Load requirement
    const req = await loadRequirement(requirement);
    
    // Build Slack message
    const slackMessage = {
      text: `Requirement ${requirement} updated`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${req.title}*\n${message || req.status}`
          }
        }
      ]
    };
    
    // Send to Slack
    await postToSlack(process.env.SLACK_WEBHOOK, slackMessage);
    
    console.log(`✅ Team notified about ${requirement}`);
  }
};
```

**Enable Plugin**:
```yaml
# supernal.yaml
plugins:
  enabled: true
  directory: .sc-plugins
```

**Usage**:
```bash
sc notify-team --requirement REQ-042 --message "Ready for review"
```

---

### 5.5: Custom Cursor Rules

**Add Team Conventions**:

```markdown
<!-- .cursor/rules/api-conventions.mdc -->
---
description: Team API design conventions
alwaysApply: true
---

# API Design Conventions

## RESTful Endpoints

**Format**: `/api/v{version}/{resource}/{id?}/{action?}`

**Examples**:
- ✅ `/api/v1/users` - List users
- ✅ `/api/v1/users/123` - Get user
- ✅ `/api/v1/users/123/activate` - Action on user
- ❌ `/api/getUser` - Not RESTful
- ❌ `/users/activate/123` - Wrong order

## HTTP Methods

- **GET** - Retrieve (no side effects)
- **POST** - Create new resource
- **PUT** - Replace entire resource
- **PATCH** - Update partial resource
- **DELETE** - Remove resource

## Response Format

**Success** (200-299):
\`\`\`json
{
  "data": { /* response data */ },
  "metadata": {
    "timestamp": "2025-12-17T19:00:00Z",
    "requestId": "abc123"
  }
}
\`\`\`

**Error** (400-599):
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [ /* validation errors */ ]
  }
}
\`\`\`

## Implementation

When Cursor creates API endpoints, it must:
1. Follow URL format above
2. Use correct HTTP method
3. Return standard response format
4. Include rate limiting
5. Add compliance comments if handling PII
```

**Effect**: Cursor now enforces these conventions when creating APIs

---

### Hands-On Exercise

**Customize Your Setup**:

**Task 1: Update supernal.yaml**
```yaml
requirements:
  id_format: "REQ-{category}-{num}"  # Change format
```

**Task 2: Create Custom Compliance Card**
```bash
mkdir -p docs/compliance/frameworks/team-security
# Create ctrl-team-001.md following template
```

**Task 3: Add Custom Rule**
```bash
# Create .cursor/rules/team-naming.mdc with your conventions
```

**Verification**:
- [ ] Config changes applied (`sc validate --config`)
- [ ] New card appears in dashboard
- [ ] Cursor follows custom rule (test with prompt)

**Ask Cursor**: "Create an API endpoint following our conventions"  
Cursor should reference `.cursor/rules/api-conventions.mdc` and follow it.

---

## Section 6: Role-Specific Workflows (10 minutes)

### For Developers: Daily Workflow

**Morning Check-In**:
```
1. Tell Cursor: "Show me my assigned requirements"
   → Cursor: "You have 3 requirements:
      - REQ-AUTH-042 (in progress)
      - REQ-API-015 (blocked by REQ-AUTH-042)
      - REQ-UI-023 (ready to start)"

2. Tell Cursor: "What's blocking REQ-API-015?"
   → Cursor analyzes dependencies, shows blockers

3. Tell Cursor: "Show me the dashboard"
   → Cursor: Opens dashboard at http://localhost:3006
```

**Feature Implementation**:
```
1. Tell Cursor: "Create requirement for password reset"
   → Cursor: sc requirement new "Password Reset" --epic=auth --priority=high
   → Output: "Created REQ-AUTH-043"

2. Tell Cursor: "Generate tests for REQ-AUTH-043"
   → Cursor: sc requirement generate-tests REQ-AUTH-043
   → Output: "Created test file with 6 test cases"

3. Tell Cursor: "Implement REQ-AUTH-043"
   → Cursor: Writes code, following compliance
   → Cursor: Runs tests
   → Cursor: "Implementation complete, 6/6 tests passing"

4. Tell Cursor: "Commit this work"
   → Cursor: sc git commit -m "feat(auth): password reset (REQ-AUTH-043)"
   → Output: "Committed with traceability"

5. Verify in dashboard: REQ-AUTH-043 shows ✅ complete
```

**Key Commands (via Cursor)**:
- "Create requirement for X"
- "Generate tests for REQ-XXX"
- "Implement REQ-XXX"
- "Run tests"
- "Commit this work"
- "Show me blockers"

**What You Validate**:
- Requirement file created correctly
- Test file structure is correct
- Implementation meets acceptance criteria
- Tests are passing
- Commit message has traceability

---

### For CISOs: Compliance Workflow

**Daily Review**:
```
1. Open dashboard → Compliance view
2. Check framework coverage:
   - SOC2: 15/18 controls implemented ✅
   - Internal: 8/12 controls implemented ⚠️

3. Review gaps:
   - comp-soc2-012: No implementation
   - ctrl-internal-005: Missing evidence

4. Tell Cursor: "Show me requirements for comp-soc2-012"
   → Cursor: "No requirements linked to this control"
   
5. Tell Cursor: "Create requirement to address comp-soc2-012"
   → Cursor creates requirement with compliance link
```

**Audit Preparation**:
```
1. Tell Cursor: "Generate SOC2 audit report"
   → Cursor: sc compliance export --framework=soc2 --format=pdf
   → Output: "Generated soc2-audit-report-2025-12-17.pdf"

2. Tell Cursor: "Show me traceability matrix"
   → Cursor: sc trace export --format=csv
   → Output: "Exported to traceability-matrix.csv"

3. Review evidence completeness:
   - Each control has linked requirements ✅
   - Each requirement has tests ✅
   - Tests have evidence ✅
   - Evidence is GPG-signed ✅

4. Export evidence package:
   → Cursor: sc compliance export --framework=soc2 --include-evidence
   → Output: "Created soc2-evidence-package.zip"
```

**Issue Response**:
```
1. Dashboard shows: ⚠️ comp-soc2-005 - Gap detected
2. Tell Cursor: "What's missing for comp-soc2-005?"
   → Cursor: "REQ-AUTH-042 implements comp-soc2-005 but tests are failing"

3. Tell Cursor: "Show me the failing tests"
   → Cursor shows test results

4. Assign to dev team:
   - Create task in dashboard
   - Link to REQ-AUTH-042
   - Set priority: high

5. Track to completion via dashboard
```

**Key Commands (via Cursor)**:
- "Generate [framework] audit report"
- "Show me compliance gaps"
- "Export evidence for [control]"
- "What requirements implement [control]?"
- "Create requirement for [control]"

**What You Verify**:
- All controls have implementations
- Evidence is complete and signed
- Traceability is intact
- Audit reports are accurate

---

### For Architects: System Design Workflow

**System Design**:
```
1. Document architecture:
   - Create docs/architecture/components/auth-system.md
   - Add diagrams and design decisions

2. Create ADRs (Architecture Decision Records):
   - Tell Cursor: "Create ADR for using JWT vs sessions"
   → Cursor creates docs/architecture/decisions/ADR-001-jwt-auth.md

3. Link requirements to architecture:
   - In requirement frontmatter:
     architecture: [auth-system, session-management]
```

**Team Setup**:
```
1. Configure supernal.yaml for team:
   - Set naming conventions
   - Add custom frameworks
   - Configure git hooks

2. Create custom Cursor rules:
   - .cursor/rules/team-architecture.mdc
   - .cursor/rules/team-security.mdc

3. Setup dashboard views:
   - Create custom views for team roles
   - Configure metrics and reports
```

**Integration**:
```
1. Import existing requirements:
   → sc resource import requirements --source=jira-export.json

2. Migrate compliance data:
   → sc resource import compliance --source=internal-controls.yaml

3. Setup CI/CD integration:
   - Configure hooks in supernal.yaml
   - Add sc validate to CI pipeline
   - Setup dashboard deploys
```

**Key Commands (via Cursor)**:
- "Create ADR for [decision]"
- "Import requirements from [source]"
- "Setup team configuration"
- "Validate architecture documentation"

**What You Verify**:
- Architecture docs are complete
- ADRs are linked to requirements
- Team configuration is consistent
- Integrations are working

---

## Comprehension Check (10 questions)

**Test your understanding**:

1. **Q**: Name the 3 main SC components  
   **A**: supernal-code-package (CLI), supernal-dashboard (visualization), .cursor/rules (behavior guide)

2. **Q**: Where is evidence stored?  
   **A**: `.supernal/` directory

3. **Q**: What guides Cursor's behavior?  
   **A**: `.cursor/rules/` - SOPs, compliance cards, and workflow rules

4. **Q**: Trace the chain: Requirement → ? → Code → ? → Dashboard  
   **A**: Requirement → **Tests** → Code → **Evidence** → Dashboard

5. **Q**: How does dashboard know which code implements REQ-042?  
   **A**: Test imports in test files link to implementation

6. **Q**: You have 100 Jira tickets. How to import?  
   **A**: `sc resource import requirements --source=jira-export.json --format=jira`

7. **Q**: Can you use custom compliance frameworks?  
   **A**: Yes, via `sc resource import compliance --source=your-framework.yaml`

8. **Q**: Where do you configure team-wide settings?  
   **A**: `supernal.yaml` in project root

9. **Q**: How to add custom Cursor rules?  
   **A**: Create `.mdc` files in `.cursor/rules/` with proper frontmatter

10. **Q**: As a developer, how do you create a requirement?  
    **A**: Tell Cursor: "Create requirement for X" → Cursor runs `sc requirement new`

**Pass Criteria**: 8/10 correct

**If you scored <8**: Review sections you missed, try hands-on exercises

---

## Hands-On Capstone Exercise (30 minutes)

### Scenario: Set Up SC for a New Microservice

**Context**: You're starting a new "Payment Service" microservice and want full SC integration.

**Tasks**:

### Task 1: Initialize Project
```bash
# Tell Cursor:
"Initialize SC for a new project called 'payment-service' 
with SOC2 and PCI-DSS compliance"

# Cursor runs:
mkdir payment-service && cd payment-service
sc init --standard --frameworks=soc2,pci-dss

# Verify:
ls .cursor/rules/  # Should show rules
ls docs/compliance/  # Should show frameworks
```

### Task 2: Import Existing Requirements
```bash
# Assume you have payment-requirements.csv:
# ID,Title,Priority,Description
# PAY-001,Process Credit Card,high,Accept credit card payments
# PAY-002,Refund Processing,medium,Process refunds
# ...

# Tell Cursor:
"Import requirements from payment-requirements.csv"

# Cursor runs:
sc resource import requirements \
  --source=payment-requirements.csv \
  --format=csv \
  --epic=payments

# Verify:
sc requirement list --epic=payments
# Should show 10 imported requirements
```

### Task 3: Customize Configuration
```bash
# Tell Cursor:
"Update supernal.yaml with our team's requirements format: REQ-PAY-{num}"

# Cursor updates supernal.yaml:
requirements:
  id_format: "REQ-PAY-{num}"
  default_priority: high  # Payments are critical
  categories: [processing, refunds, reporting, security]

# Verify:
sc validate --config
# Should show: ✅ Configuration valid
```

### Task 4: Add Custom Compliance Control
```bash
# Tell Cursor:
"Create a custom PCI-DSS compliance card for tokenization (ctrl-pci-token)"

# Cursor creates: docs/compliance/frameworks/pci-dss/ctrl-pci-token.md
# With content about:
# - Tokenization requirements
# - Implementation guidance
# - Validation criteria

# Verify:
# Dashboard → Compliance → Should show ctrl-pci-token
```

### Task 5: Create Custom Cursor Rule
```bash
# Tell Cursor:
"Create a Cursor rule that enforces our payment API conventions:
- All payment endpoints must be POST
- Must include idempotency key
- Must validate card data before processing"

# Cursor creates: .cursor/rules/payment-api-conventions.mdc
# Verify:
cat .cursor/rules/payment-api-conventions.mdc
```

### Task 6: Verify Complete Setup
```bash
# Tell Cursor:
"Validate the entire setup"

# Cursor runs:
sc validate --all

# Should show:
# ✅ Configuration valid
# ✅ Requirements loaded (10 from import)
# ✅ Compliance frameworks loaded (soc2, pci-dss)
# ✅ Custom controls loaded (ctrl-pci-token)
# ✅ Cursor rules active (42 + 1 custom)
# ✅ Dashboard accessible
```

### Task 7: Dashboard Verification
```bash
# Open dashboard
# Check:
# - Requirements view: Shows 10 imported payment requirements
# - Compliance view: Shows soc2 + pci-dss frameworks
# - Custom control (ctrl-pci-token) appears
# - No errors or warnings
```

**Success Criteria**:
- [ ] Project initialized with SC
- [ ] 10 requirements imported and visible
- [ ] Custom config applied (REQ-PAY format)
- [ ] Custom compliance card created
- [ ] Custom Cursor rule active
- [ ] Dashboard shows complete setup
- [ ] `sc validate --all` passes

**Time Limit**: 30 minutes

**Assistance Available**: Ask Cursor for help at any step

---

## Troubleshooting Guide

### Problem: Dashboard not showing requirements

**Symptoms**: Created requirements but dashboard is empty

**Solution**:
1. Check `.supernal/` directory exists: `ls -la .supernal/`
2. Verify requirement files: `ls docs/requirements/`
3. Restart dashboard: Stop and run `sc dashboard` again
4. Check browser console for errors (F12)
5. Verify dashboard port: Should be http://localhost:3006

**Ask Cursor**: "Why isn't the dashboard showing my requirements?"

---

### Problem: Resource import failed

**Symptoms**: `sc resource import` command errors

**Solution**:
1. Verify source file exists: `ls -la <source-file>`
2. Check format parameter matches: `--format=jira|csv|yaml`
3. View example: `sc resource import --help`
4. Try with sample: `sc resource import requirements --source=sample.json --format=jira`

**Common Errors**:
- Wrong format parameter → Check file extension
- Missing fields in CSV → Ensure Title column exists
- Invalid JSON → Validate with `jq . <file>` or online validator

---

### Problem: Cursor not following custom rule

**Symptoms**: Created custom rule but Cursor ignores it

**Solution**:
1. Verify file location: `ls .cursor/rules/<your-rule>.mdc`
2. Check frontmatter: Must have `alwaysApply: true`
3. Verify markdown format: Use `---` for frontmatter delimiters
4. Restart Cursor: Close and reopen IDE
5. Test with explicit mention: "Following our rule in custom-rule.mdc, create..."

**Example**:
```markdown
---
description: My custom rule
alwaysApply: true  # ← REQUIRED
---

# Rule content here
```

---

### Problem: Compliance check failing

**Symptoms**: `sc compliance check` reports errors

**Solution**:
1. Verify frameworks loaded: `sc compliance list-frameworks`
2. Check framework directory: `ls docs/compliance/frameworks/`
3. Ensure requirements link cards: Check `complianceCards:` in frontmatter
4. Regenerate: `sc compliance check --verbose` for details

**Common Issues**:
- Framework not loaded → Run `sc resource import compliance`
- Cards not linked → Update requirement frontmatter
- Evidence missing → Run `sc test` to generate

---

### Problem: Test evidence not appearing

**Symptoms**: Ran tests but dashboard shows no evidence

**Solution**:
1. Check evidence directory: `ls .supernal/evidence/`
2. Verify test command: Use `sc test` (not `npm test` directly)
3. Check test file linking: Requirement frontmatter must have `tests: [...]`
4. Re-run with evidence: `sc test tests/ --collect-evidence`

---

## Assessment

**Certificate**: "SC Architecture & Integration Specialist"

**Skills Demonstrated**:
- ✅ System architecture understanding
- ✅ Data flow traceability  
- ✅ Resource import proficiency
- ✅ Customization capability
- ✅ Role-specific workflow mastery

**Next Steps**:
- **Advanced Workflows** - Multi-feature coordination
- **Dashboard Customization** - Build custom views
- **Plugin Development** - Extend SC with custom commands

---

## Quick Reference

### Key Commands

```bash
# Requirements
sc requirement new "Title" --epic=X --priority=high
sc requirement validate REQ-XXX
sc requirement generate-tests REQ-XXX

# Testing
sc test tests/
sc test-map requirements
sc test-map coverage

# Compliance
sc compliance check
sc compliance export --framework=soc2 --format=pdf

# Git
sc git commit <files> -m "message (REQ-XXX)"
sc git check

# Resources
sc resource import requirements --source=file.json --format=jira
sc resource import compliance --source=controls.yaml

# Validation
sc validate --all
sc validate --config
sc validate --requirements

# Dashboard
sc dashboard  # Opens at http://localhost:3006
```

### File Locations

```
Project Structure:
├── .cursor/rules/           # Cursor behavior rules
├── .supernal/               # Evidence and state
│   └── evidence/            # Test results, compliance
├── docs/
│   ├── requirements/        # Requirement files
│   ├── compliance/          # Compliance frameworks
│   └── architecture/        # System design
├── tests/                   # Test files
│   └── requirements/        # Requirement-linked tests
├── src/                     # Implementation
└── supernal.yaml            # Team configuration
```

---

## Related SOPs

- [SOP-HELLO-WORLD](./SOP-HELLO-WORLD-complete-secure-system.md) - Your first system (prerequisite)
- [SOP-0](./SOP-0-overview-complete-workflow.md) - Complete workflow overview
- [SOP-0.1.05](./general/SOP-0.1.05-requirements-planning.md) - Requirements & planning
- [SOP-0.1.08](./general/SOP-0.1.08-testing.md) - Testing strategy
- [SOP-7.01](./phase-7-build/SOP-7.01-implementation-with-ai-pair-programming.md) - AI-paired implementation

---

**Last Updated**: 2025-12-17  
**Status**: ✅ Active Learning Module  
**Estimated Time**: 70 minutes  
**Difficulty**: Intermediate  
**Track**: All tracks (foundation)  
**Prerequisites**: HELLO-WORLD complete






