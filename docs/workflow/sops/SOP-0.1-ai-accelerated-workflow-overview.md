---
type: sop
category: overview
sop_id: SOP-0.1
title: AI-Accelerated Workflow
phase: null
group: null
part_number: null
audience: [developers, ai-agents, architects, product-owners]
read_time: 45
created: 2025-11-21
updated: 2025-11-23
status: needs_approval
version: '1.0'
author: Supernal Coding Team
reviewedBy: []
reviewDates: []
related_sops: [SOP-0]
prerequisites: []
tags: [ai, workflow, overview, collaboration]
---

# SOP-0.1: AI-Accelerated Workflow

**Purpose**: Core principles and practical strategies for working effectively with AI in software development  
**Scope**: All AI-assisted development work across all phases  
**Audience**: Developers, architects, product managers working with AI coding assistants

---

## Overview

This SOP provides a comprehensive guide to AI-accelerated software development, organized by **how people work**: AI foundations, time-series workflow progression, and reference standards.

**Structure**: 14 general (cross-cutting) parts + phase-specific SOPs:

- **General SOPs (01-07, 10-16)**: Cross-cutting AI techniques applicable to any phase
- **Phase-Specific SOPs (1.XX, 2.XX, etc.)**: Detailed workflow for each phase

**Aligned with**: Supernal's 12-phase workflow model (Discovery → Operations)

---

## Table of Contents

### 🤖 General: AI Foundations

**Cross-cutting AI techniques for effective collaboration**

1. [Foundation](#general-01-foundation) - Core principles, when to use AI
2. [Chat Management](#general-02-chat-management) - Context isolation strategies
2a. [Effective Chat Sessions](#general-02a-effective-chat-sessions) - Single & multi-chat workflows
3. [Prompting Patterns](#general-03-prompting-patterns) - Effective AI prompts
4. [Validation & Quality](#general-04-validation-quality) - Multi-agent checks
5. [Requirements & Planning](#general-05-requirements-planning) - AI-assisted planning
6. [Design & Architecture](#general-06-design-architecture) - AI-assisted design
7. [AI Implementation Safeguards](#general-07-ai-implementation-safeguards) - Safety patterns
8. [Documentation Standards](#general-10-documentation) - JSDoc, APIs, features
9. [Decision Tracking](#general-11-decision-tracking) - ADRs, DDDs, micro-decisions
10. [Git Workflow & Code Review](#general-12-git-workflow) - Git best practices
11. [Change Control & Deployment](#general-13-change-control) - Deployment safety
12. [Evaluation & Learning](#general-14-evaluation-learning) - Retrospectives
13. [Naming Conventions Reference](#general-15-naming-conventions) - Naming standards
14. [Roles & Responsibilities](#general-16-roles-responsibilities) - Team structure

### 🔄 Phase-Specific SOPs

**Detailed workflow guidance for each phase**

- **Phase 1: Discovery** - Business vision, solution analysis
- **Phase 2: Research & Modeling** - User stories, domain models
- **Phase 3: Design** - Architecture, compliance, security
- **Phase 4: Planning** - Feature breakdown, estimation
- **Phase 5: Feature Requirements** - BDD, Gherkin specs
- **Phase 6: Tests** - Testing strategy, E2E testing
- **Phase 7: Build** - AI-assisted implementation
- **Phase 8: Epic Integration** - Feature integration
- **Phase 9: Milestone Integration** - Release preparation
- **Phase 10: Staging** - Pre-production validation
- **Phase 11: Production** - Production deployment
- **Phase 12: Operations** - Marketing, post-launch support

---

## 🤖 General: AI Foundations

### General 01: Foundation

**[→ Read Full Document](./general/SOP-0.1.01-foundation.md)**

Core principles for AI-accelerated development

**Key Topics**:

- Core Principle: Plan → Approve → Generate → Review → Iterate
- When to Use AI vs Not
- AI's Role in Development
- Human Responsibilities

**When to Read**: Start here if new to AI-assisted development

---

### General 02: Chat Management

**[→ Read Full Document](./general/SOP-0.1.02-chat-management.md)**

Context isolation strategies for multi-task development

### General 02a: Effective Chat Sessions

**[→ Read Full Document](./general/SOP-0.1.02a-effective-chat-sessions.md)**

Practical workflows for single-chat sessions and multi-chat coordination

**Key Topics**:

- Setting clear session goals
- Staying focused (tangent management)
- Commit checkpoints and frequency
- Recovery patterns when things go wrong
- Multi-chat coordination and conflict prevention
- Integration strategies for parallel work

**When to Read**: Essential for productive AI collaboration sessions

### General 03: Prompting Patterns

**[→ Read Full Document](./general/SOP-0.1.03-prompting-patterns.md)**

Effective prompting techniques for AI coding assistants

### General 04: Validation & Quality

**[→ Read Full Document](./general/SOP-0.1.04-validation-quality.md)**

Multi-agent validation and quality control strategies

### General 05: Requirements & Planning

**[→ Read Full Document](./general/SOP-0.1.05-requirements-planning.md)**

AI-assisted requirements development and planning

### General 06: Design & Architecture

**[→ Read Full Document](./general/SOP-0.1.06-design-architecture.md)**

AI-assisted architecture design and ADR creation

### General 07: AI Implementation Safeguards

**[→ Read Full Document](./general/SOP-0.1.07-ai-implementation-safeguards.md)**

Safety patterns and anti-patterns when using AI for coding

### General 10: Documentation Standards

**[→ Read Full Document](./general/SOP-0.1.10-documentation.md)**

Documentation best practices with AI assistance

### General 11: Decision Tracking

**[→ Read Full Document](./general/SOP-0.1.11-decision-tracking.md)**

Capturing architectural decisions, design decisions, and micro-decisions

### General 12: Git Workflow & Code Review

**[→ Read Full Document](./general/SOP-0.1.12-git-workflow.md)**

Git best practices and AI-assisted code review

### General 13: Change Control & Deployment

**[→ Read Full Document](./general/SOP-0.1.13-change-control.md)**

Safe deployment practices with AI assistance

### General 14: Evaluation & Learning

**[→ Read Full Document](./general/SOP-0.1.14-evaluation-learning.md)**

Post-deployment retrospectives and continuous improvement

### General 15: Naming Conventions Reference

**[→ Read Full Document](./general/SOP-0.1.15-naming-conventions.md)**

Complete naming standards reference

### General 16: Roles & Responsibilities

**[→ Read Full Document](./general/SOP-0.1.16-roles-responsibilities.md)**

Team structure and collaboration patterns

---

## 🔄 Phase-Specific SOPs

For detailed phase-specific workflows, see:

- [Phase 1: Discovery](./phase-1-discovery/)
- [Phase 2: Research & Modeling](./phase-2-research/)
- [Phase 3: Design](./phase-3-design/)
- [Phase 4: Planning](./phase-4-planning/)
- [Phase 5: Feature Requirements](./phase-5-requirements/)
- [Phase 6: Tests](./phase-6-tests/) - **Testing Strategy & E2E Testing**
- [Phase 7: Build](./phase-7-build/)
- [Phase 8: Epic Integration](./phase-8-integration/)
- [Phase 9: Milestone Integration](./phase-9-milestone/)
- [Phase 10: Staging](./phase-10-staging/)
- [Phase 11: Production](./phase-11-production/)
- [Phase 12: Operations](./phase-12-operations/)

---

Context management and isolation strategies

**Key Topics**:

- Chat Isolation Strategy
- Context Establishment
- Progressive Summarization
- Token Management

**When to Read**: When starting new work or managing complex features

---

### Part 03: Prompting Patterns

**[→ Read Full Document](./general/SOP-0.1.03-prompting-patterns.md)**

Effective AI prompting techniques

**Key Topics**:

- Investigation Prompts
- Planning Prompts
- Clarification Prompts
- Simplification Prompts
- Re-evaluation Prompts

**When to Read**: When you need better AI responses

---

### Part 04: Validation & Quality

**[→ Read Full Document](./general/SOP-0.1.04-validation-quality.md)**

Multi-agent validation and quality checks

**Key Topics**:

- Multi-Agent Validation
- Verification Checklists
- Iterative Refinement
- Quality Gates

**When to Read**: Before approving any AI-generated plans or code

---

## 🔄 Group B: Development Workflow

### Part 05: Requirements & Planning

**[→ Read Full Document](./general/SOP-0.1.05-requirements-planning.md)**

**Phase**: 0-2 (Discovery → Requirements)  
**Outputs**: BR-YYYY-NNN, US-YYYY-NNN, acceptance criteria

**Key Topics**:

- Business Requirements (BR-XXX)
- User Stories (US-XXX)
- Acceptance Criteria
- Planning Hierarchy
- Approval Gates

**Naming Conventions**:

- Business Requirements: `BR-2024-042-multi-factor-auth.md`
- User Stories: `US-2024-101-enable-mfa.md`

**When to Read**: Starting discovery or defining requirements

---

### Part 06: Design & Architecture

**[→ Read Full Document](./general/SOP-0.1.06-design-architecture.md)**

**Phase**: 3 (Design & Architecture)  
**Outputs**: ADR-NNN, DDD-{feature}-{topic}, architecture docs

**Key Topics**:

- Architecture Decision Records (ADRs)
- Design Decision Documents (DDDs)
- Technical Design
- Separation Strategies
- Coupling Principles
- Pattern Consistency

**Naming Conventions**:

- ADRs: `ADR-042-jwt-authentication.md`
- DDDs: `DDD-auth-token-management.md`
- Code folders: Feature-based (not type-based)

**When to Read**: Designing system architecture or major features

---

### Part 07: AI Implementation Safeguards

**[→ Read Full Document](./general/SOP-0.1.07-ai-implementation-safeguards.md)**

**Phase**: 4 (Before Coding)  
**Purpose**: Prevent AI from creating duplicates or wrong locations

**Key Topics**:

- Duplication Detection
- Location Verification
- Name Collision Prevention
- Pattern Analysis
- Canonical Locations

**Critical Checks**:

1. Search for existing implementations
2. Verify folder structure
3. Check for name conflicts
4. Confirm canonical location

**When to Read**: **BEFORE** AI generates any code

---

### Testing (Phase 6)

**Testing Strategy and E2E Testing** have been moved to phase-specific SOPs:

- **[→ SOP-6.01: Testing Strategy](./phase-6-tests/SOP-6.01-testing-strategy.md)** - Comprehensive testing approach
- **[→ SOP-6.02: E2E Testing](./phase-6-tests/SOP-6.02-e2e-testing.md)** - Playwright and user flow validation

**When to Read**: Phase 6 (Tests) or when setting up testing infrastructure

---

### Part 10: Documentation Standards

**[→ Read Full Document](./general/SOP-0.1.10-documentation.md)**

**Phase**: Continuous  
**Levels**: Code comments, JSDoc, Feature docs, API docs

**Key Topics**:

- Code Comments (Inline)
- Function/Class Documentation (JSDoc)
- Architecture Decision Records (ADRs)
- Feature Documentation
- Documentation Evaluation

**Naming Conventions**:

- Feature docs: `docs/features/{feature}/README.md`
- Architecture: `docs/features/{feature}/ARCHITECTURE.md`
- API docs: `docs/features/{feature}/API.md`

**When to Read**: Documenting code or features

---

### Part 11: Decision Tracking

**[→ Read Full Document](./general/SOP-0.1.11-decision-tracking.md)**

**Phase**: Continuous  
**Outputs**: ADRs, DDDs, micro-decisions, co-planning

**Key Topics**:

- Architecture Decision Records (ADRs)
- Design Decision Documents (DDDs)
- Micro-Decision Logs (DEC-NNN)
- Co-Planning Artifacts
- Traceability Conventions

**Naming Conventions**:

- Micro-decisions: `DEC-042` (within decisions.md)
- Co-planning: `co-planning-2024-11-22.md`

**When to Read**: Making or documenting decisions

---

### Part 12: Git Workflow & Code Review

**[→ Read Full Document](./general/SOP-0.1.12-git-workflow.md)**

**Phase**: 4-5 (Implementation → Merge)  
**Tools**: `sc git smart`

**Key Topics**:

- Git Branching Strategy
- Commit Strategy (Atomic Commits)
- Merge Strategy with `sc git smart`
- Approval Workflows (Multi-Tier)

**Naming Conventions**:

- Branches: `feature/US-2024-101-enable-mfa`
- Commits: `feat(auth): implement JWT token rotation (US-2024-101)`
- Tags: `v1.2.3`

**When to Read**: Branching, committing, or merging code

---

### Part 13: Change Control & Deployment

**[→ Read Full Document](./general/SOP-0.1.13-change-control.md)**

**Phase**: 5-6 (Deployment)  
**Outputs**: CHG-YYYY-NNN, deployment plans, rollback procedures

**Key Topics**:

- Change Control Process
- Impact Analysis Framework
- Risk Assessment
- Rollback Plans
- Approval Workflows

**Naming Conventions**:

- Change requests: `CHG-2024-042-migrate-to-jwt.md`

**When to Read**: Deploying changes or managing production incidents

---

### Part 14: Evaluation & Learning

**[→ Read Full Document](./general/SOP-0.1.14-evaluation-learning.md)**

**Phase**: 6 (Post-Deployment)  
**Outputs**: Evaluations, retrospectives, lessons learned

**Key Topics**:

- Post-Implementation Evaluation
- Sprint Retrospectives
- Metrics Tracking
- Lessons Learned

**Naming Conventions**:

- Evaluations: `evaluation-auth-2024-11-22.md`
- Retrospectives: `retrospective-sprint-23-2024-11-22.md`
- Incidents: `incident-critical-2024-11-22-auth-outage.md`

**When to Read**: After feature deployment or at end of sprint

---

## 📚 Group C: Reference & Standards

### Part 15: Naming Conventions Reference

**[→ Read Full Document](./general/SOP-0.1.15-naming-conventions.md)**

**Type**: Reference  
**Purpose**: Comprehensive naming standards for all artifacts

**Covers**:

- **Traceability IDs**: BR-XXX, US-XXX, TR-XXX, ADR-NNN, CHG-XXX, DEC-NNN
- **Code Organization**: Folders, files, functions, classes
- **Test Files**: Unit, integration, E2E
- **Git Conventions**: Branches, commits, tags
- **Documentation**: Feature docs, ADRs, evaluations
- **Database**: Tables, columns
- **API**: REST endpoints

**When to Read**: Any time you need to name something - files, functions, branches, documents, etc.

---

### Part 16: Roles & Responsibilities

**[→ Read Full Document](./general/SOP-0.1.16-roles-responsibilities.md)**

**Type**: Reference  
**Purpose**: Team structure and collaboration model (inspired by @inspiration)

**Roles Defined**:

- Product Owner
- Architect
- Tech Lead
- Developer
- QA Engineer
- Security Engineer
- Operations/DevOps

**Covers**:

- Role responsibilities
- AI assistance for each role
- Artifacts owned by each role
- Collaboration model
- Daily work patterns
- Weekly ceremonies
- Approval workflows
- Decision matrix

**When to Read**: Understanding team structure or collaboration workflows

---

## Quick Reference

### Key Principles (16 Core Rules)

1. **Plan before code** (system → feature → component → implementation → code)
2. **Isolate chats strategically** (new context vs continuity)
3. **Approve architecture first** (names, types, structure before code)
4. **Audit before implement** (search for duplicates, verify location, check names)
5. **Use patterns consistently** (follow existing, don't reinvent)
6. **Validate with multiple perspectives** (second opinion for critical decisions)
7. **Verify systematically** (checklists for plans, code, research)
8. **Iterate and refine** (first output is draft, not final)
9. **Team approves, Person verifies** (humans make decisions, AI accelerates)
10. **Test automatically** (pre-commit, pre-push, CI/CD, E2E)
11. **Commit atomically** (one feature per commit, clear history)
12. **Merge safely** (use `sc git smart merge`, never force push)
13. **Fast-track low-risk** (post-facto approval for speed)
14. **Document decisions** (ADRs for architecture, decision log for micro-decisions)
15. **Evaluate and learn** (post-implementation reviews, capture lessons)
16. **Control changes** (impact analysis, approval workflows, safe rollback)

### Anti-Patterns to Avoid

❌ Implementing before planning  
❌ Accepting first AI output without review  
❌ Skipping approval gates  
❌ Changing names/structure mid-implementation  
❌ Using AI for critical decisions without human approval  
❌ Working without clear requirements  
❌ Generating code that doesn't follow existing patterns  
❌ Creating duplicates of existing code (audit first!)  
❌ Creating in wrong location (verify structure first)  
❌ Name collisions (check for duplicates)  
❌ Bypassing git hooks (--no-verify) except emergencies  
❌ Committing untested code  
❌ Force pushing to main/master  
❌ Merging without CI checks passing  
❌ Making decisions without documenting them  
❌ Skipping post-implementation evaluation  
❌ Making breaking changes without impact analysis

### Success Metrics

**You're doing it right when**:

- ✅ AI saves time (not creates rework)
- ✅ Code follows existing patterns
- ✅ Plans are approved before implementation
- ✅ Team understands what AI generated
- ✅ Changes don't break existing code
- ✅ Quality standards are maintained
- ✅ Development velocity increases
- ✅ All commits pass automated checks
- ✅ Git history is clean and traceable
- ✅ Merges happen safely without incidents
- ✅ Low-risk changes ship quickly with fast-track approval
- ✅ High-risk changes get proper multi-tier approval
- ✅ No duplicate code or patterns are introduced
- ✅ Decisions are documented and traceable (ADRs, decision logs)
- ✅ Post-implementation reviews capture lessons learned
- ✅ Changes have clear impact analysis and rollback plans
- ✅ Naming is consistent (check Part 15!)
- ✅ Roles and responsibilities are clear (check Part 16!)

---

## Complete Workflow

**Phase 0-2: Discovery → Requirements**

```
1. Person defines problem/goal (Part 05)
2. AI researches and proposes solutions (Part 03)
3. Person + Team evaluate, question, refine (Part 04)
4. Document business requirements (BR-XXX) (Part 05, 15)
5. Create user stories (US-XXX) (Part 05, 15)
```

**Phase 3: Design**

```
6. AI generates architecture proposal (Part 06)
7. Architect reviews and creates ADR (Part 06, 11, 15)
8. Team approves architecture (Part 16)
```

**Phase 4: Implementation**

```
9. Create git branch (Part 12, 15)
10. AI audits for duplicates/location (Part 07)
11. AI generates detailed plan (Part 05)
12. Appropriate team approves plan (Part 16)
13. AI generates code following approved plan (Part 06)
14. Automated tests run (pre-commit hooks) (Part 08)
15. Person reviews, tests, validates (Part 04)
16. E2E tests verify user flows (Part 09)
17. Documentation updated (Part 10, 11)
18. Iterate refinements (Part 03, 04)
19. Full test suite passes (pre-push hooks) (Part 08)
20. Person approves for merge (Part 12)
21. CI/CD validates externally (Part 08)
```

**Phase 5: Deployment**

```
22. Create change request (CHG-XXX) if needed (Part 13, 15)
23. Impact analysis (Part 13)
24. Safe merge with sc git smart (Part 12)
25. Deployment & monitoring (Part 13)
```

**Phase 6: Learning**

```
26. Post-implementation evaluation (Part 14, 15)
27. Sprint retrospective (Part 14, 15, 16)
28. Capture lessons learned (Part 14)
29. Repeat for next task
```

---

## How to Use This SOP

### For New Team Members

1. Start with [Part 01: Foundation](./general/SOP-0.1.01-foundation.md)
2. Learn chat management: [Part 02](./general/SOP-0.1.02-chat-management.md)
3. Understand naming: [Part 15](./general/SOP-0.1.15-naming-conventions.md)
4. Learn your role: [Part 16](./general/SOP-0.1.16-roles-responsibilities.md)

### For Starting a Feature

1. Requirements: [Part 05](./general/SOP-0.1.05-requirements-planning.md)
2. Design: [Part 06](./general/SOP-0.1.06-design-architecture.md)
3. **Before coding**: [Part 07](./general/SOP-0.1.07-ai-implementation-safeguards.md) ⚠️
4. Testing setup: [SOP-6.01: Testing Strategy](./phase-6-tests/SOP-6.01-testing-strategy.md)

### For Code Review

1. Check naming: [Part 15](./general/SOP-0.1.15-naming-conventions.md)
2. Git workflow: [Part 12](./general/SOP-0.1.12-git-workflow.md)
3. Approval process: [Part 16](./general/SOP-0.1.16-roles-responsibilities.md)

### For Deployment

1. Change control: [Part 13](./general/SOP-0.1.13-change-control.md)
2. Post-deployment: [Part 14](./general/SOP-0.1.14-evaluation-learning.md)

### Quick Lookups

- "How do I name this?" → [Part 15](./general/SOP-0.1.15-naming-conventions.md)
- "Who approves this?" → [Part 16](./general/SOP-0.1.16-roles-responsibilities.md)
- "What phase am I in?" → Check [Group B](#group-b-development-workflow) headers

---

## Related SOPs

- [SOP-0: Complete Development Workflow](./SOP-0-overview-complete-workflow.md)
- [SOP-T.01: Using `sc` CLI](./tools/SOP-T.01-using-sc-cli.md)

---

## Recent Changes

**2024-11-22**: Major reorganization

- ✅ Eliminated duplication (docs + E2E split)
- ✅ Reorganized into 16 parts (was 13)
- ✅ Added naming conventions reference (Part 15)
- ✅ Added roles & responsibilities (Part 16)
- ✅ Aligned with @inspiration workflow structure
- ✅ Enhanced all parts with naming conventions
- ✅ Clear time-series progression (Phase 0-6)

**See**: [FINAL-REORGANIZATION-2024-11-22.md](./archived/summaries/FINAL-REORGANIZATION-2024-11-22.md) for full details

---

## Navigation

**Start here**: [Part 01: Foundation](./general/SOP-0.1.01-foundation.md)

**Or jump to specific needs**:

- Need to name something? → [Part 15: Naming Conventions](./general/SOP-0.1.15-naming-conventions.md)
- Don't know who owns this? → [Part 16: Roles & Responsibilities](./general/SOP-0.1.16-roles-responsibilities.md)
- Starting new feature? → [Part 05: Requirements & Planning](./general/SOP-0.1.05-requirements-planning.md)
- About to code? → [Part 07: AI Implementation Safeguards](./general/SOP-0.1.07-ai-implementation-safeguards.md) ⚠️
- Ready to merge? → [Part 12: Git Workflow](./general/SOP-0.1.12-git-workflow.md)
- Need to deploy? → [Part 13: Change Control](./general/SOP-0.1.13-change-control.md)
