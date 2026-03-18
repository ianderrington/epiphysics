---
type: sop
category: ai-technique
sop_id: SOP-0.1.02a
title: Effective Chat Sessions
phase: null
group: A
part_number: 2a
audience: [developers, ai-agents]
read_time: 20
created: 2025-12-17
updated: 2025-12-17
status: draft
version: '1.0'
author: Supernal Coding Team
reviewedBy: []
reviewDates: []
related_sops: [SOP-0.1, SOP-0.1.01, SOP-0.1.02, SOP-0.1.03]
prerequisites: [SOP-0.1.01, SOP-0.1.02]
tags: [ai, chat, sessions, workflow, coordination, multi-chat]
---

# Effective Chat Sessions

**Part of**: [SOP-0.1: AI-Accelerated Workflow](../SOP-0.1-ai-accelerated-workflow-overview.md)

**Purpose**: Practical guidance for running productive single-chat sessions and coordinating multiple parallel chats

---

## Overview

Effective AI collaboration requires structured session management:
- **Single chat**: Clear goals, focused execution, frequent commits, recovery patterns
- **Multiple chats**: Coordinated parallel work, conflict prevention, integration strategy

This SOP provides tactical workflows for both scenarios.

---

## Part 1: Single Chat Session Best Practices

### Starting Strong: Set Clear Goals

**At the beginning of every chat, establish**:

```markdown
## Session Goal

**What I want to accomplish**: [Specific, measurable outcome]

**Success looks like**:
- ✅ [Concrete deliverable 1]
- ✅ [Concrete deliverable 2]
- ✅ [Tests pass]
- ✅ [Committed to git]

**Time box**: [Expected duration]

**Context**:
- Working on: [Feature/requirement]
- Current state: [What's already done]
- Constraints: [Tech stack, patterns, limits]
```

**Why this works**:
- ✅ AI understands the target
- ✅ You can check progress against goal
- ✅ Prevents scope creep
- ✅ Clear stopping point

**Example**:
```
## Session Goal

**What I want to accomplish**: Implement user login API endpoint with JWT

**Success looks like**:
- ✅ POST /api/auth/login endpoint working
- ✅ JWT token generation
- ✅ Unit tests pass
- ✅ Integration test passes
- ✅ Code committed with REQ-042

**Time box**: 2 hours

**Context**:
- Working on: REQ-042 (User Authentication)
- Current state: User model exists, password hashing done
- Constraints: Node.js + Express, follow existing auth patterns
```

---

### Think Before Doing: Question-Driven Development

**Before AI generates code, ask it to think out loud.**

#### The Anti-Pattern

```
You: "Implement user login with JWT"
AI: [Generates 200 lines of code immediately]
You: [Discovers it doesn't match your patterns, has security issues, is over-engineered]
```

**Time wasted**: 30+ minutes reviewing/fixing generated code

#### The Better Way

```
You: "Before implementing login, explain:

1. What problem are we solving?
2. What are 3 different approaches we could take?
3. What are the trade-offs of each?
4. What could go wrong?
5. What edge cases should we handle?

Show me a plan first, don't generate code yet."
```

**AI Response**: Detailed analysis revealing assumptions, edge cases, and potential issues

**You**: Correct assumptions, refine approach, THEN ask for code

**Result**: First implementation is 80% correct vs 20% correct

#### Why This Works

**✅ Surfaces assumptions early**
```
AI: "I'm assuming JWT tokens with 15-minute expiry..."
You: "No, we need 1-hour expiry with refresh tokens"
# Caught BEFORE writing code
```

**✅ Catches edge cases**
```
AI: "Edge cases: expired tokens, malformed tokens, missing tokens..."
You: "Also handle revoked tokens - user logs out elsewhere"
# Added to requirements BEFORE implementation
```

**✅ Prevents over-engineering**
```
AI: "We could use Redis, JWT blacklist, or database sessions..."
You: "Just JWT with refresh tokens. Keep it simple."
# Avoided unnecessary complexity
```

**✅ Gives you veto power**
```
AI: "Approach 1: Custom auth. Approach 2: Passport.js. Approach 3: Auth0"
You: "Use Passport.js - matches our existing patterns"
# Decision made upfront
```

#### Question Templates

**Before implementing**:
```
"Before writing code:
- What's the simplest solution?
- What could break?
- What are we assuming?
- Show me 3 approaches with pros/cons"
```

**When reviewing existing code**:
```
"Explain this code:
- What problem does it solve?
- Why is it structured this way?
- What are the trade-offs?
- What could be improved?"
```

**When something fails**:
```
"Analyze why this failed:
- What did we expect to happen?
- What actually happened?
- What assumptions were wrong?
- How should we fix it?"
```

**When choosing between options**:
```
"Compare these approaches:
- Option A: [description]
- Option B: [description]

For each, explain:
- Pros/cons
- Complexity
- Maintenance burden
- Performance implications"
```

#### Real Example

**Bad** (No questions):
```
You: "Add password reset"
AI: [Generates password reset with email tokens, database table, complex workflow]
You: "Wait, we don't have email configured yet..."
```

**Good** (Questions first):
```
You: "We need password reset. Before implementing, explain:
- What do we need? (email service, token storage, expiry handling)
- What approaches exist?
- What's our current email situation?"

AI: "To implement password reset, you'll need:
1. Email service (currently not configured)
2. Token storage (could use existing JWT or database)
3. Expiry mechanism
...

Approaches:
1. Email-based tokens (requires email service setup)
2. Security questions (less secure, not recommended)
3. Admin reset (manual, but no email needed)

I see no email configuration in the codebase."

You: "Right. Let's do admin reset for now, email reset in Phase 2."
# Saved hours of work on wrong approach
```

#### The 5-Question Framework

**Always ask these 5 before generating code**:

1. **"What problem are we solving?"** (Clarify requirements)
2. **"What approaches exist?"** (Explore options)
3. **"What are the trade-offs?"** (Informed decisions)
4. **"What could go wrong?"** (Risk assessment)
5. **"Show me a plan first"** (Review before building)

#### Integration with Other Principles

**With Goal Setting**:
```
Session Goal: Implement login

FIRST: "Explain authentication approaches"
THEN: Set refined goal based on analysis
THEN: Implement chosen approach
```

**With Recovery**:
```
Code failed → Don't immediately try another approach

FIRST: "Analyze why this failed"
THEN: Understand root cause
THEN: Fix properly
```

**With Tangent Management**:
```
AI suggests optimization

FIRST: "Explain the performance impact and implementation cost"
THEN: Decide if it's worth the tangent
THEN: Defer or implement
```

#### When to Skip Questions

✅ **Do skip for**:
- Trivial changes (fixing typos, formatting)
- Repeating established patterns
- Simple documentation updates

❌ **Never skip for**:
- New features
- Security-related code
- Complex business logic
- Architecture decisions
- Database schema changes

#### Measuring Effectiveness

**Before adopting this habit**:
- First code attempt: 20% correct
- 3-4 iterations to get it right
- 2 hours per feature

**After adopting this habit**:
- First code attempt: 80% correct
- 1-2 iterations to refine
- 45 minutes per feature

**Time savings**: ~60% reduction in implementation time

---

### Staying Focused: Tangent Management

**During the session, recognize tangent types**:

#### ✅ **Productive Tangent** (Follow It)
- Discovers blocking issue that must be fixed
- Reveals security vulnerability
- Finds better approach that saves time
- Uncovers missing requirement

**Action**: 
```
"Let's address this blocking issue first, then return to [original goal]"
```

#### ⚠️ **Minor Tangent** (Note and Defer)
- Optimization that's not critical
- Refactoring that can wait
- Nice-to-have feature
- Documentation improvement

**Action**:
```
"Good idea. Let's track this: sc task new 'Optimize X' --feature=auth --priority=low

Now, back to implementing login endpoint..."
```

#### ❌ **Distraction** (Avoid)
- Unrelated feature requests
- Gold plating
- Premature optimization
- Scope expansion

**Action**:
```
"That's outside our session goal. Let's finish login endpoint first."
```

---

### Commit Checkpoints: Frequent and Small

**Commit often at these moments**:

#### ✅ **Logical Units Complete**

**CRITICAL**: Only commit files you actually modified during your work

```bash
# After implementing core function (ONLY the files you changed)
git add src/auth/login.ts
sc git commit -m "feat(auth): implement login endpoint (REQ-042)"

# After tests pass (ONLY the test file you created)
git add tests/auth/login.test.ts
sc git commit -m "test(auth): add login endpoint tests (REQ-042)"

# After fixing issue (ONLY the validation file you modified)
git add src/auth/validation.ts
sc git commit -m "fix(auth): validate email format (REQ-042)"

# ❌ NEVER do this - commits unrelated files
git add .  # BAD - commits everything
git add -A  # BAD - commits all changes
```

#### ✅ **Before Major Changes**
```bash
# Working implementation, about to refactor
sc git commit -m "feat(auth): working login (REQ-042) - pre-refactor checkpoint"

# Now refactor safely, can revert if needed
```

#### ✅ **End of Sub-Task**
```bash
# Completed API endpoint, moving to middleware
sc git commit -m "feat(auth): complete login endpoint (REQ-042)"

# Starting middleware work...
```

**Why commit often**:
- ✅ Easy to revert mistakes
- ✅ Clear progress tracking
- ✅ Safe experimentation points
- ✅ Preserves working states
- ✅ Better git history

**Rule of thumb**: If you've made 3+ related changes, commit them.

**Important**: Use `sc git commit` for smart commits with automatic:
- Task detection and closure prompts
- Requirement traceability
- Scope validation
- WIP registry integration

**See**: cursor rule: git-commit-smart.mdc for complete commit guidelines

---

### Recovery Patterns: When Things Go Wrong

#### Pattern 1: **Code Doesn't Work**

**Symptoms**:
- Tests failing
- Build broken
- Unexpected behavior

**Recovery**:
```bash
# 1. Check what changed
git status
git diff

# 2. If minor issue, fix it
# ... fix code ...
npm test

# 3. If major issue, revert to last working commit
git log --oneline -5
git reset --hard HEAD~1  # Go back one commit

# 4. Restart with better understanding
"Let's approach this differently..."
```

#### Pattern 2: **AI Going Off Track**

**Symptoms**:
- Suggestions don't match your patterns
- Proposing over-complex solutions
- Not following existing code structure

**Recovery**:
```markdown
"Stop. Let me clarify:

We have existing patterns in [file]. Let's follow those.

Current approach is too complex. Simplify to:
1. [Step 1]
2. [Step 2]

Show me a plan first, don't generate code yet."
```

#### Pattern 3: **Lost Context**

**Symptoms**:
- AI forgetting earlier decisions
- Contradicting previous suggestions
- Repeating old mistakes

**Recovery - Option A: Summarize in Current Chat**:
```markdown
"Summarize our progress:

Key Decisions:
- [Decision 1]
- [Decision 2]

Current Implementation:
- [What's working]
- [What's in progress]

Next: [What we need to do]"
```

**Recovery - Option B: Start New Chat**:
```bash
# 1. Commit current work (even if WIP)
sc workflow wip register src/auth/*.ts --feature=auth --reason="Context reset"

# 2. Start new chat with context
[New Chat]

## Context
Working on: REQ-042 User Authentication
Completed: User model, password hashing, login endpoint structure
Current issue: JWT token generation not working correctly
Code: src/auth/login.ts, tests/auth/login.test.ts

Task: Fix JWT token generation to include correct claims and expiry
```

#### Pattern 4: **Accumulated Bad Changes**

**Symptoms**:
- Multiple things broken
- Code sprawl (many files touched)
- Unclear what's working vs. broken

**Recovery**:
```bash
# 1. Assess damage
git status
git diff --stat

# 2. If not committed yet, selective reset
git checkout -- src/broken-file.ts  # Revert specific file

# 3. If committed, interactive rebase
git log --oneline -10
git rebase -i HEAD~5  # Interactively remove bad commits

# 4. Or nuclear option: reset to known good state
git reflog  # Find last known good commit
git reset --hard abc123f

# 5. Start over with better plan
"Let's restart. Here's what we need..."
```

---

### Session Closure: End Strong

**Before ending the session**:

#### ✅ **Checklist**

```markdown
## Session Close

**Goal achieved?**
- [ ] All success criteria met
- [ ] Tests passing
- [ ] Code committed
- [ ] No WIP files left untracked

**If goal NOT achieved**:
- [ ] WIP-register in-progress files: `sc workflow wip register <files> --feature=X`
- [ ] Document blockers: `sc task new "Blocked: [issue]" --feature=X`
- [ ] Create handoff if needed (only if explicitly requested)

**Clean up**:
- [ ] Run: `git status` - Nothing uncommitted (or WIP-tracked)
- [ ] Run: `npm test` - All tests pass
- [ ] Run: `npm run build` - Build succeeds

**Next session start**:
- [ ] Clear starting point documented
```

#### ✅ **Summary for Next Time**

Save this in feature docs or task notes:

```markdown
# Session Summary: [Date]

## Completed
- ✅ Login endpoint implemented (REQ-042)
- ✅ JWT token generation working
- ✅ Tests passing (12 new tests)
- ✅ Committed: 4 commits

## In Progress
- 🔄 Refresh token rotation (50% done)
- Files: src/auth/refresh.ts (WIP-tracked)

## Blockers
- ⚠️ Need Redis configuration for session storage
- Created: TASK-123 "Set up Redis for sessions"

## Next Steps
1. Complete refresh token rotation
2. Implement rate limiting
3. Add E2E tests
```

---

## Part 2: Multi-Chat Coordination (Parallel Work)

### When to Use Multiple Chats

**Scenarios for parallel chats**:

#### ✅ **Use Multiple Chats When**:

1. **Independent Features**
   - Chat 1: User authentication
   - Chat 2: Product catalog UI
   - No overlap, different files

2. **Different Roles/Perspectives**
   - Chat 1: Implementation
   - Chat 2: Code review (separate agent reviewing Chat 1's work)

3. **Exploration vs Execution**
   - Chat 1: Spike/experiment new approach
   - Chat 2: Continue main implementation

4. **Parallel Team Members**
   - Chat 1: Developer A working on backend
   - Chat 2: Developer B working on frontend

#### ❌ **Don't Use Multiple Chats When**:

1. **Working on same files** - Conflict guaranteed
2. **Sequential dependencies** - Chat 2 needs Chat 1's output
3. **Complex integration** - Better to coordinate in one chat

---

### Preventing Conflicts

**Conflict Prevention Strategy**:

#### 1. **File-Level Isolation**

```bash
# Chat 1: Backend work
sc workflow wip register src/api/auth/*.ts --feature=auth-backend --userid=alice

# Chat 2: Frontend work  
sc workflow wip register src/components/auth/*.tsx --feature=auth-frontend --userid=bob

# No file overlap = no conflicts
```

#### 2. **Feature-Based Scoping**

```bash
# Chat 1: Commit with feature scope
git commit -m "feat(auth-backend): implement JWT (REQ-042)"

# Chat 2: Commit with different feature scope
git commit -m "feat(auth-frontend): login form (REQ-042)"

# Both work on REQ-042, different scopes
```

#### 3. **Clear Ownership**

Use WIP registry with userid:

```bash
# Chat 1 (Alice)
sc workflow wip register src/auth/login.ts --feature=auth --userid=alice

# Chat 2 (Bob) - tries to claim same file
sc workflow wip register src/auth/login.ts --feature=auth --userid=bob
# ⚠️ Error: File already WIP-tracked by @alice

# Bob checks who owns what
sc workflow wip list
# Shows: src/auth/login.ts (@alice)

# Bob works on different file
sc workflow wip register src/auth/middleware.ts --feature=auth --userid=bob
```

---

### Coordination Patterns

#### Pattern 1: **Parallel Independent Work**

**Setup**:
```
Goal: Implement user authentication (REQ-042)

Split:
- Chat 1: API endpoints (backend)
- Chat 2: React components (frontend)

Integration point: API contract (agreed upfront)
```

**Chat 1 Context**:
```markdown
## Session Goal
Implement auth API endpoints

**My scope**: Backend only
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/logout

**Other chat**: Frontend login/signup forms
**Integration**: API contract in docs/api/auth.md

**Files I own**:
- src/api/auth/*.ts
- tests/api/auth/*.test.ts
```

**Chat 2 Context**:
```markdown
## Session Goal
Implement auth UI components

**My scope**: Frontend only
- Login form component
- Signup form component
- Auth state management

**Other chat**: Backend API endpoints
**Integration**: API contract in docs/api/auth.md

**Files I own**:
- src/components/auth/*.tsx
- tests/components/auth/*.test.tsx
```

**Coordination**:
```bash
# Both chats check integration points
cat docs/api/auth.md  # API contract

# Chat 1 commits backend
git commit -m "feat(auth-backend): complete API endpoints (REQ-042)"

# Chat 2 commits frontend
git commit -m "feat(auth-frontend): complete UI components (REQ-042)"

# Integration test in separate chat or Chat 1
# Chat 3: E2E test
sc test tests/e2e/auth-flow.test.ts
```

---

#### Pattern 2: **Sequential Handoff**

**Setup**:
```
Goal: Implement complex feature with dependencies

Phase 1 (Chat 1): Data model and API
Phase 2 (Chat 2): Business logic using API
Phase 3 (Chat 3): UI using business logic
```

**Handoff Process**:

**Chat 1 Completion**:
```bash
# 1. Complete and commit
git commit -m "feat(auth): data model and API complete (REQ-042)"

# 2. Document for next chat
cat > docs/features/auth/HANDOFF-API-COMPLETE.md << 'EOF'
# Auth API Complete

## What's Done
- User model with password hashing
- Login/logout/refresh endpoints
- JWT token generation
- Unit tests passing

## Integration Points
- Endpoint: POST /api/auth/login
- Response: { token, refreshToken, expiresIn }
- See: docs/api/auth.md

## Next Chat: Implement auth middleware
- Use token validation from src/api/auth/validateToken.ts
- Attach user to req.user
- Handle expired tokens
EOF

# 3. Close chat
```

**Chat 2 Start**:
```markdown
## Context

**Previous work**: Auth API complete (see docs/features/auth/HANDOFF-API-COMPLETE.md)

**My task**: Implement auth middleware using completed API

**Files to use**:
- src/api/auth/validateToken.ts (existing)
- src/models/User.ts (existing)

**Files to create**:
- src/middleware/auth.ts (new)
- tests/middleware/auth.test.ts (new)
```

---

#### Pattern 3: **Spike in Parallel**

**Setup**:
```
Main work continues in Chat 1
Experiment/spike in Chat 2
```

**Chat 1 (Main)**: 
```markdown
## Continuing main implementation

Using current approach: JWT with Redis sessions

[Work continues normally]
```

**Chat 2 (Spike)**:
```markdown
## Experimental: Evaluate Passport.js

**Goal**: See if Passport.js is better than our current JWT approach

**Scope**: Proof of concept only
- Don't modify main code
- Create in experiments/ directory
- Document findings

**Files**:
- experiments/passport-poc/ (isolated)

**Decision point**: If successful, bring findings back to Chat 1
```

**Bringing Results Back**:
```bash
# If spike successful
# Chat 2 documents findings
cat > docs/architecture/decisions/ADR-005-passport-vs-jwt.md

# Chat 1 reads decision and continues
"Read ADR-005. Let's refactor to use Passport..."
```

---

### Integration Strategy

**After parallel work completes**:

#### 1. **Sequential Integration**
```bash
# Merge in order of dependencies
git checkout main
git merge feature/auth-backend   # Base first
npm test

git merge feature/auth-frontend  # Dependent second
npm test

# Integration tests
npm run test:e2e
```

#### 2. **Integration Testing**
```bash
# Separate chat for integration
[New Chat: Integration Testing]

## Goal
Verify auth backend + frontend work together

## Components
- Backend: Merged from Chat 1
- Frontend: Merged from Chat 2

## Tests to Run
- E2E: User can log in
- E2E: JWT token works
- E2E: Refresh token rotation
```

#### 3. **Conflict Resolution**
```bash
# If conflicts occur during merge
git status  # See conflicting files

# Resolve conflicts
# ... edit files ...

# Commit resolution
git commit -m "chore: resolve merge conflicts between auth-backend and auth-frontend"

# Verify integration
npm test
npm run test:e2e
```

---

## Quick Reference

### Single Chat Session

```markdown
1. **Start**: Set clear goal with success criteria
2. **Question**: Ask AI to explain before coding (5-question framework)
3. **Focus**: Follow goal, manage tangents (fix blockers, defer nice-to-haves, avoid distractions)
4. **Commit**: Frequently (logical units, before refactors, end of sub-tasks)
5. **Recover**: Reset to last good commit when things go wrong
6. **Close**: Verify goal met, clean up WIP, document next steps
```

### Multiple Chats

```markdown
1. **Isolate**: Different files or clear feature boundaries
2. **Coordinate**: Use WIP registry with userid to prevent conflicts
3. **Document**: Handoffs and integration points
4. **Integrate**: Test integration separately after merging
```

### Recovery Commands

```bash
# View recent commits
git log --oneline -10

# Revert last commit (keeps changes in working directory)
git reset --soft HEAD~1

# Revert last commit (discards all changes)
git reset --hard HEAD~1

# Revert specific file to last commit
git checkout -- path/to/file.ts

# Find previous state (shows reflog history)
git reflog

# Reset to specific commit (discards everything after)
git reset --hard abc123f

# Check WIP status
sc workflow wip status
sc workflow wip list

# Smart commit (with traceability)
sc git commit <files> -m "type(scope): description (REQ-XXX)"
```

**See**: cursor rule: git-commit-smart.mdc for commit message format and traceability requirements

---

## Anti-Patterns

### ❌ Single Chat Anti-Patterns

1. **No clear goal** → Aimless exploration, wasted time
2. **Never committing** → Can't recover from mistakes
3. **Committing everything** (`git add .`) → Includes unrelated changes, messy history
4. **Ignoring all tangents** → Miss critical blockers
5. **Following all tangents** → Never finish original goal
6. **Not cleaning up** → Accumulates untracked files
7. **Skipping traceability** → Can't track changes to requirements/tasks

### ❌ Multi-Chat Anti-Patterns

1. **Same files in multiple chats** → Merge conflicts guaranteed
2. **No coordination** → Duplicate work, inconsistent patterns
3. **No handoff docs** → Next chat starts blind
4. **No integration testing** → Components don't work together
5. **Too many parallel chats** → Cognitive overload, coordination failure

---

## Related Documentation

- cursor rule: git-commit-smart.mdc - Complete commit guidelines and traceability
- cursor rule: wip-registry.mdc - File tracking and coordination
- cursor rule: feature-management.mdc - Feature-based commits
- [Task System](../../../features/workflow-management/task-system/README.md) - Task tracking and closure
- [SOP-0.1.02: Chat Management](SOP-0.1.02-chat-management.md) - Context isolation strategies
- [SOP-0.1.03: Prompting Patterns](SOP-0.1.03-prompting-patterns.md) - Effective AI prompts
- [SOP-0.1.12: Git Workflow](./SOP-0.1.12-git-workflow.md) - Git best practices
- [SOP-T.08: Using sc task](../tools/SOP-T.08-using-sc-task.md) - Task commands

---

## Navigation

← Previous: [Part 2: Chat Management](SOP-0.1.02-chat-management.md)  
→ Next: [Part 3: Prompting Patterns](SOP-0.1.03-prompting-patterns.md)

[Back to Overview](../SOP-0.1-ai-accelerated-workflow-overview.md)

