---
type: sop
category: tools
sop_id: SOP-T.09
title: Domain Management
description: Managing formal architectural domains for feature organization
phase: null
group: D. Tools & Commands
part_number: null
audience: [developers, architects, ai-agents]
read_time: 10
created: 2025-12-17
updated: 2025-12-17
status: active
version: '1.0'
author: Supernal Coding Team
template_source: https://github.com/supernalintelligence/supernal-coding
project_name: 'supernal-coding'
reviewedBy: []
reviewDates: []
related_sops: [SOP-0.1.18, SOP-4.01, SOP-3.04]
prerequisites: []
tags: [domains, architecture, features, organization]
---

# SOP-T.09: Domain Management

**Version**: 1.0  
**Created**: 2025-12-17  
**Status**: Active

---

## Purpose

Manage formal architectural domains that organize features by subsystem boundaries.

---

## Core Concept

**Domains are formal architectural subsystems, not auto-discovered folders.**

Domains represent:
- Architectural boundaries (microservices, deployment units)
- Team ownership (different teams, specialized knowledge)
- Technology boundaries (different stacks, unique dependencies)
- Business capabilities (distinct value, separate stakeholders)

**Domains are defined in Phase 0-1 (Architecture), not during implementation.**

---

## Configuration

Domains are defined in `supernal.yaml`:

```yaml
features:
  path: docs/features
  
  # Formal domain list (REQUIRED)
  domains:
    - ai-workflow-system
    - admin-operations
    - compliance-framework
    - content-management
    - dashboard-platform
    - developer-tooling
    - documentation-platform
    - integrations
    - licensing-platform
    - workflow-management
  
  # Domain naming rules (enforced)
  domain_naming:
    pattern: '^[a-z]+(-[a-z]+)*$'
    max_length: 30
    reserved:
      - archive
      - archived
      - temp
      - test
      - planning
      - design
      - requirements
      - tests
      - research
      - implementation
```

---

## Commands

### Feature Creation (Complete Workflow)

```bash
# 1. Create feature in appropriate domain
sc planning feature create --id=my-feature --domain=developer-tooling --epic=epic-name

# 2. Follow complete feature development flow:
#    - Write planning docs with **File**: pattern
#    - Run: sc docs process <planning-doc> --commit
#    - Create/fill test stubs
#    - Run: sc test <feature-tests>
#    - Update feature status & commit
#
# See complete workflow: cursor rule feature-flow.mdc
```

**Reference**: See cursor rule: feature-flow.mdc - Detailed workflow from idea to tested implementation

### List Domains

```bash
# Show all configured domains
sc domain list

# Output:
# Configured Domains (10):
#   - ai-workflow-system (3 features)
#   - admin-operations (1 feature)
#   - compliance-framework (7 features)
#   - content-management (0 features)
#   - dashboard-platform (20 features)
#   - developer-tooling (37 features)
#   - documentation-platform (3 features)
#   - integrations (11 features)
#   - licensing-platform (6 features)
#   - workflow-management (16 features)
```

### Show Domain Info

```bash
# Show details for specific domain
sc domain show developer-tooling

# Output:
# Domain: developer-tooling
# Features: 37
# Architecture: Core Systems
# Owner: @dev-tools-team
# Description: CLI, validation, and developer utilities
# 
# Features:
#   - validation-framework
#   - cli-commands
#   - config-loader
#   [...]
```

### Validate Domain Structure

```bash
# Validate all features have valid domains
sc domain validate

# Output:
# ✅ 104 features validated
# ✅ All domains valid
# 
# Domain Distribution:
#   - developer-tooling: 37 features
#   - dashboard-platform: 20 features
#   - workflow-management: 16 features
#   [...]
```

### Request New Domain

```bash
# Create architecture proposal for new domain
sc domain request machine-learning \
  --reason="Need separate subsystem for ML features" \
  --owner="@ml-team"

# Output:
# 📝 Domain proposal created: .supernal/domain-proposals/machine-learning.yaml
# 📄 Next steps:
#   1. Create ADR: docs/architecture/decisions/ADR-XXX-add-domain-machine-learning.md
#   2. Document architecture: docs/architecture/domains/machine-learning.md
#   3. Update supernal.yaml
#   4. Get approval from architecture team
```

---

## Domain Lifecycle

### Stage 1: Proposed
- Architecture review in progress
- ADR being created
- Not yet in `supernal.yaml`

### Stage 2: Approved
- ADR approved
- Added to `supernal.yaml`
- Documentation created in `docs/architecture/domains/`

### Stage 3: Active
- Has features
- Team assigned
- In production use

### Stage 4: Deprecated
- Being phased out
- Features migrating to other domains
- Marked in documentation

### Stage 5: Archived
- All features moved
- Removed from `supernal.yaml`
- Documentation archived

---

## Adding a New Domain

**This is an architectural decision requiring ADR.**

### Process

**Step 1: Architecture Review**
- Why is this a separate subsystem?
- What are the boundaries?
- Who owns it?
- How does it deploy?

**Step 2: Create ADR**
```bash
# Create architecture decision record
touch docs/architecture/decisions/ADR-XXX-add-domain-machine-learning.md
```

**Step 3: Document Domain**
```bash
# Create domain documentation
touch docs/architecture/domains/machine-learning.md
```

**Step 4: Update Configuration**
```yaml
# supernal.yaml
features:
  domains:
    - existing-domain-1
    - existing-domain-2
    - machine-learning  # ← Add new domain
```

**Step 5: Commit Architecture Change**
```bash
git add supernal.yaml docs/architecture/
git commit -m "arch: Add machine-learning domain (ADR-XXX)"
```

**Step 6: Create Features**
```bash
# Now features can be created in new domain
sc planning feature create --domain=machine-learning --id=ml-pipeline
```

---

## Validation (Hard Fail)

### CLI Validation

```bash
$ sc planning feature create --domain=dev-tools --id=tool

❌ ERROR: Invalid domain 'dev-tools'

Valid domains (architectural subsystems):
  - developer-tooling  ← Did you mean this? (85% similar)
  - ai-workflow-system
  - compliance-framework
  [...]

Domains are formal architectural boundaries.
See: docs/architecture/domains/README.md

To add a new domain, create an ADR first.

BLOCKED. Fix the domain and try again.
```

### Pre-Commit Hook

```bash
$ git commit -m "feat: Add feature"

❌ COMMIT BLOCKED: Invalid domain detected

Feature: docs/features/invalid-domain/new-feature/
Domain: invalid-domain
Status: NOT in allowed domains

Valid domains:
  - ai-workflow-system
  - admin-operations
  [...]

Fix:
1. Move to valid domain:
   git mv docs/features/invalid-domain/new-feature/ \
          docs/features/developer-tooling/new-feature/

2. Or add domain to supernal.yaml (requires ADR)

COMMIT REJECTED.
```

---

## Domain Documentation

### Required Files

**1. Domain Overview**
```
docs/architecture/domains/README.md
```

Lists all domains with:
- Purpose
- Team ownership
- Architecture subsystem mapping
- Feature count

**2. Per-Domain Documentation**
```
docs/architecture/domains/{domain-name}.md
```

For each domain:
- Detailed purpose
- Architectural subsystem
- Technology stack
- Team & ownership
- Boundaries (what it does/doesn't do)
- Current features
- Deployment info

**3. Domain ADR**
```
docs/architecture/decisions/ADR-XXX-domain-structure.md
```

Documents domain structure decision.

---

## Domain-Architecture Mapping

Domains align with architectural subsystems:

| Domain | Architectural Subsystem |
|--------|------------------------|
| `developer-tooling` | Core Systems (CLI, Config, Storage) |
| `workflow-management` | Development Workflow (Git, WIP, Feature) |
| `ai-workflow-system` | Development Workflow (AI-assisted) |
| `compliance-framework` | Quality & Compliance (Traceability) |
| `dashboard-platform` | Integration & Extension (Dashboards) |
| `documentation-platform` | Documentation & Content (Docs, Search) |
| `integrations` | Integration & Extension (External Services) |
| `licensing-platform` | Business Capabilities (License Management) |
| `admin-operations` | Operations (Admin, System Management) |
| `content-management` | Content & Marketing (Social Media, Content Tools) |

**Reference**: System Architecture (architecture/SYSTEM-OVERVIEW-BY-SUBSYSTEM.md)

---

## Best Practices

### ✅ DO

- Define domains in Phase 0-1 (Architecture)
- Document domain boundaries clearly
- Map domains to architectural subsystems
- Require ADR for new domains
- Enforce hard validation
- Keep domain list stable (rarely changes)

### ❌ DON'T

- Auto-discover domains from filesystem
- Create domains during implementation
- Use vague domain names
- Allow typos or invalid domains
- Skip architecture review
- Create domains for single features

---

## Common Scenarios

### Scenario 1: New Project Setup

```bash
# During sc init, define domains
$ sc init

📋 Project Setup

Define architectural domains (comma-separated):
> backend-api, frontend-web, mobile-app, integrations, admin

✅ Domains configured
📄 Created: supernal.yaml
📄 Created: docs/architecture/domains/README.md
```

### Scenario 2: Feature Doesn't Fit Any Domain

```bash
# Don't create ad-hoc domain
# Request architecture review

$ sc domain request new-domain \
  --reason="Feature X doesn't fit existing domains" \
  --owner="@team"

# Architecture team reviews:
# - Can it fit in existing domain?
# - Is it truly a separate subsystem?
# - Should we refactor domain boundaries?
```

### Scenario 3: Domain Consolidation

```bash
# Two similar domains should merge
$ sc domain consolidate dev-tools developer-tooling

📊 Analysis:
    - dev-tools: 3 features
    - developer-tooling: 37 features

💡 Recommendation: Merge dev-tools → developer-tooling

🔄 Moving features:
    ✓ docs/features/dev-tools/feature-a/ → docs/features/developer-tooling/feature-a/
    [...]

✅ Consolidation complete
📝 Update supernal.yaml to remove dev-tools
```

---

## Integration with Workflow

### Phase 0-1: Discovery/Architecture
- Define domains based on system architecture
- Document in `docs/architecture/domains/`
- Add to `supernal.yaml`

### Phase 4: Planning
- Assign features to domains
- Validate domain assignment
- Create feature structure

### Phase 7: Implementation
- Features organized by domain
- Hard validation enforces correctness
- No invalid domains allowed

---

## Troubleshooting

### Problem: "Domain not in allowed list"
**Solution**: 
1. Check for typos (system suggests similar domains)
2. Use existing domain if appropriate
3. Request new domain via architecture review

### Problem: "Feature doesn't fit any domain"
**Solution**:
1. Review existing domains - can it fit?
2. Consider if it's truly a separate subsystem
3. Request architecture review for new domain

### Problem: "Too many domains"
**Solution**:
1. Review domain boundaries
2. Consider consolidation
3. Ensure each domain represents distinct subsystem

---

## Related Documentation

- [SOP-0.1.18: Feature Documentation Structure](../general/SOP-0.1.18-feature-documentation-structure.md)
- [SOP-4.01: Feature Breakdown](../phase-4-planning/SOP-4.01-feature-breakdown-and-estimation.md)
- [SOP-3.04: Architecture Design](../phase-3-design/SOP-3.04-security-analysis.md)
- [Domain System Documentation](../../../features/developer-tooling/dynamic-domain-discovery/2025-12-17-formal-domain-system.md)

---

## Future Enhancements

- `sc domain stats` - Analytics on domain health
- `sc domain migrate` - Move features between domains
- `sc domain approve` - Approval workflow for new domains
- Dashboard visualization of domain distribution

---

**Last Updated**: 2025-12-17  
**Status**: Active  
**Requirement**: Formal domain system

