---
sop_id: SOP-HELLO-WORLD
title: "SOP-Hello-World: Build Your First Compliant Feature with AI"
type: sop
category: onboarding
phase: null
audience: [developer, ciso, all]
created: 2025-12-17
updated: 2025-12-17
status: approved
version: "2.0"
tags: [onboarding, hello-world, cursor, compliance, walkthrough, interactive]
estimatedTime: "30-45min"
learningModule: true
---

# SOP-HELLO-WORLD: Build Your First Compliant Feature with AI

**The Core Pattern**: Tell AI what you want → AI helps you plan → You iterate together → Get tests passing + compliant → Done

**Time**: 30-45 minutes  
**What You'll Build**: A password reset feature that's compliant from day one

---

## The Big Idea

You don't learn commands. You learn the **conversation pattern** with AI:

1. **Plan Big**: "I want password reset"
2. **Plan Down**: AI breaks it into pieces (requirements, tests, implementation)
3. **Plan Simplest First**: Start with basic flow, add complexity
4. **Iterate**: Back-and-forth until tests pass and compliance is met
5. **Validate**: At each step, you verify AI did it right

**Goal**: All tests passing ✅ + All compliance met ✅

---

## Prerequisites

- ✅ Cursor IDE installed
- ✅ `sc` CLI installed (`npm install -g supernal-coding`)
- ✅ A project directory
- ✅ Basic development knowledge
- ✅ **Your company context** ready to provide

---

## Before You Start: Gather Your Context

AI works best when you provide **strategic context upfront**. Before starting, know:

### Company Context
- **Industry**: Healthcare, fintech, e-commerce, SaaS, etc.
- **Company type**: Startup, enterprise, government, etc.
- **Company size**: Team size, users, scale

### Compliance Requirements
- **Frameworks**: SOC2, HIPAA, GDPR, PCI-DSS, FedRAMP, etc.
- **Certification status**: In progress, certified, planning
- **Specific controls**: Any high-risk areas or recent audit findings

### Strategic Goals (Longer-term)
- **Security model**: Zero-trust, defense-in-depth, etc.
- **Architecture direction**: Microservices, monolith, serverless, etc.
- **Performance targets**: Response times, scale requirements
- **Quality goals**: Test coverage, code quality standards

### Current Systems (What exists now)
- **Auth system**: JWT, sessions, OAuth, SSO, etc.
- **Database**: PostgreSQL, MySQL, MongoDB, etc.
- **Framework**: Node.js, Python, Go, etc.
- **Infrastructure**: AWS, GCP, Azure, on-prem, etc.

### Immediate Need (What you're building today)
- **Feature description**: What you want to build
- **User journey**: How users will interact with it
- **Timeline**: Any deadlines or dependencies
- **Constraints**: Budget, resources, technical limitations

**Example Context Statement**:
> "Healthcare scheduling SaaS, SOC2 Type II certified + HIPAA, zero-trust security model, JWT auth (15min access/7day refresh), Node.js + PostgreSQL, 50K users, need password reset feature today for Q1 compliance audit."

**Why this matters**: AI uses this context to automatically:
- Select the right compliance cards
- Generate appropriate tests (including compliance-specific)
- Implement with the right patterns (zero-trust, audit logging, etc.)
- Avoid rework (gets it right the first time)

---

## The Conversation Pattern

### Stage 1: Plan Big (Provide Context First)

**You say**:
> "I want to build a password reset feature for my SaaS app. Here's the context:
> 
> **Company**: Healthcare scheduling platform
> **Compliance**: SOC2 Type II (we're certified), HIPAA (handling PHI)
> **Strategic Goal**: Zero-trust security model, audit-ready at all times
> **Current Auth**: JWT tokens (15min access, 7day refresh)
> **Users**: Healthcare providers and admin staff
> 
> **What I want**:
> Password reset via email link that expires in 1 hour. User journey:
> 1. User clicks 'Forgot Password'
> 2. Enters email
> 3. Gets email with reset link
> 4. Clicks link, enters new password
> 5. Password updated, user can log in
> 
> Help me build this using Supernal Coding with full traceability."

**AI responds**:
> "Perfect! I have the context. Since this is a healthcare app:
> - **Compliance**: SOC2 + HIPAA means we need encryption, audit logging, and access controls
> - **Strategic Goal**: Zero-trust means we'll invalidate all sessions on reset
> - **Auth System**: JWT means we'll need token blacklisting
> 
> I'll:
> 1. Create requirement (REQ-AUTH-042) linked to SOC2 + HIPAA cards
> 2. Add audit logging for all reset attempts (HIPAA requirement)
> 3. Generate comprehensive tests (including HIPAA scenarios)
> 4. Implement with compliance comments in code
> 5. Verify all tests pass and compliance met
> 
> Let me start by creating the requirement with your context..."

**What just happened**: You provided **strategic context** upfront (company, compliance, goals). AI uses this to make smart decisions about which compliance cards to link, what tests to generate, and how to implement. No back-and-forth guessing.

---

### Stage 2: Plan Down (Break Into Pieces)

**AI responds**:
> "Perfect! Let me break this down into a requirement. I'll use SC to create it properly.
> 
> Running: `sc requirement new "Password Reset via Email" --epic=auth --priority=high`"

**Terminal shows**:
```
✅ Created REQ-AUTH-042: Password Reset via Email
📁 File: docs/requirements/core/req-auth-042-password-reset.md
```

**AI continues**:
> "I've created the requirement. Based on your context (healthcare + SOC2 + HIPAA + zero-trust), I'm linking:
> - **comp-soc2-005**: Access Control (password complexity, token security)
> - **comp-soc2-007**: Audit Logging (all reset attempts)
> - **comp-hipaa-003**: PHI Access Controls (session invalidation)
> - **comp-hipaa-008**: Audit Trail Requirements (detailed logging)
>
> The requirement includes:
> - **User Story**: As a healthcare provider, I want to securely reset my password
> - **Acceptance Criteria** (from your journey + compliance):
>   - Reset link sent to user's email
>   - Link expires after 1 hour (HIPAA: prevent unauthorized access)
>   - New password meets complexity requirements (SOC2-005)
>   - All JWT tokens invalidated (zero-trust model)
>   - All reset attempts logged with IP/timestamp (HIPAA-008)
> 
> Here's what I've created..."

**You see** (requirement file):
```markdown
---
id: REQ-AUTH-042
title: Password Reset via Email
status: todo
priority: high
epic: auth
complianceCards:
  - comp-soc2-005  # Access Control
  - comp-soc2-007  # Audit Logging
  - comp-hipaa-003 # PHI Access Controls
  - comp-hipaa-008 # Audit Trail Requirements
tests: []  # Will add after generating
---

# REQ-AUTH-042: Password Reset via Email

## User Story
As a healthcare provider, I want to securely reset my password via email so that I can regain access if I forget it, while maintaining HIPAA compliance.

## Business Context
- **Company**: Healthcare scheduling platform
- **Compliance**: SOC2 Type II, HIPAA
- **Strategic Goal**: Zero-trust security model
- **Users**: Healthcare providers accessing PHI

## Acceptance Criteria
- [ ] User can request password reset from login page
- [ ] Reset email sent within 30 seconds
- [ ] Reset link contains secure token (min 32 chars, cryptographically random)
- [ ] Link expires after 1 hour
- [ ] New password validated for complexity (min 12 chars, mixed case, numbers, symbols)
- [ ] All JWT tokens (access + refresh) invalidated after reset (zero-trust)
- [ ] All reset attempts logged with: email, timestamp, IP, success/failure (HIPAA audit)
- [ ] Rate limiting: 5 attempts per 15 minutes (prevent abuse)

## Compliance Requirements

**comp-soc2-005 (Access Control)**:
- Password complexity: min 12 chars, upper+lower+number+symbol
- Token must be single-use only
- Token must be cryptographically secure (crypto.randomBytes)

**comp-soc2-007 (Audit Logging)**:
- Log all reset requests (email, timestamp, IP)
- Log successful resets
- Log failed attempts with reason

**comp-hipaa-003 (PHI Access Controls)**:
- Invalidate all sessions on password change
- Prevent access with old credentials immediately
- Token expiry strictly enforced (1 hour)

**comp-hipaa-008 (Audit Trail Requirements)**:
- All authentication events logged
- Logs include: user identifier, timestamp, action, outcome, IP
- Logs immutable and tamper-evident
```

**You validate**:
- ✅ Requirements make sense for healthcare context
- ✅ Both SOC2 and HIPAA cards linked (our compliance needs)
- ✅ Acceptance criteria include zero-trust (strategic goal)
- ✅ Audit logging meets HIPAA requirements

**You say**: 
> "This looks good. The HIPAA audit requirements are critical - make sure the logs are immutable. Let's proceed."

**AI**: "Noted! I'll use append-only logging for HIPAA compliance. Proceeding to test generation..."

**What just happened**: AI used your **strategic context** (healthcare, HIPAA, zero-trust) to automatically link the right compliance cards and create appropriate requirements. You didn't have to tell it which cards to use - it inferred from your company/goals.

---

### Stage 3: Plan Simplest First (Start Small)

**AI responds**:
> "Now let's generate tests for this requirement. I'll create tests that verify each acceptance criterion.
>
> Running: `sc requirement generate-tests REQ-AUTH-042`"

**Terminal shows**:
```
✅ Generated test file: tests/requirements/req-042/req-042-password-reset.test.js
✅ Updated requirement with test path
📋 8 test scenarios created
```

**AI continues**:
> "I've created 10 test cases (8 functional + 2 HIPAA-specific):
> 
> **Functional Tests**:
> 1. ✅ Basic happy path (request → email → reset)
> 2. ✅ Invalid email handling
> 3. ✅ Expired token handling
> 4. ✅ Token reuse prevention
> 5. ✅ Password complexity validation
> 6. ✅ JWT token invalidation (all tokens)
> 7. ✅ Audit logging verification
> 8. ✅ Rate limiting (5 requests/15min)
>
> **HIPAA-Specific Tests**:
> 9. ✅ Immutable audit logs (append-only, tamper detection)
> 10. ✅ Zero-trust: Old tokens rejected immediately after reset
>
> Right now, all tests will fail because we haven't implemented anything. That's expected! Let's verify they run..."

**AI runs**: `npm test tests/requirements/req-042/`

**Terminal shows**:
```
 FAIL  tests/requirements/req-042/req-042-password-reset.test.js
  REQ-AUTH-042: Password Reset via Email
    ✗ should send reset email when valid email provided (5 ms)
    ✗ should reject invalid email format (3 ms)
    ✗ should reject expired reset token (4 ms)
    ✗ should prevent token reuse (4 ms)
    ✗ should validate password complexity (3 ms)
    ✗ should invalidate all JWT tokens (5 ms)
    ✗ should log all reset attempts (4 ms)
    ✗ should rate limit reset requests (4 ms)
    ✗ [HIPAA] should enforce immutable audit logs (5 ms)
    ✗ [HIPAA] should reject old tokens immediately (4 ms)

Tests: 0 passed, 10 failed, 10 total
```

**AI says**:
> "Perfect! All tests are running (and failing as expected). Now let's implement the simplest version first - just the request and email sending. We'll iterate from there."

**You validate**:
- ✅ Tests exist and run
- ✅ Tests cover acceptance criteria + HIPAA requirements
- ✅ Tests fail (nothing implemented yet - expected)

**What just happened**: AI started with the **simplest** (tests first), so we know exactly what "done" looks like. The strategic context (healthcare + HIPAA + zero-trust) drove which tests to generate.

---

### Stage 4: Iterate (Back and Forth)

#### Iteration 1: Basic Implementation

**AI says**:
> "Let's implement the basic reset request flow. I'll create:
> 1. API endpoint: `POST /api/auth/reset-request`
> 2. Token generation function
> 3. Email sending function
>
> Running implementation..."

**AI creates files**:
```javascript
// src/auth/password-reset.js
const crypto = require('crypto');
const { sendEmail } = require('../utils/email');
const { createToken } = require('../utils/tokens');

// REQ-AUTH-042: comp-soc2-005 (Access Control)
async function requestPasswordReset(email) {
  // Validate email format
  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }
  
  // Generate secure token (32 chars min per SOC2)
  const token = crypto.randomBytes(32).toString('hex');
  
  // Store token with 1-hour expiry
  await storeResetToken(email, token, { expiresIn: '1h' });
  
  // Send email with reset link
  const resetLink = `https://app.example.com/reset?token=${token}`;
  await sendEmail({
    to: email,
    subject: 'Password Reset Request',
    body: `Click here to reset: ${resetLink}\nExpires in 1 hour.`
  });
  
  // REQ-AUTH-042: comp-soc2-007 (Audit Logging)
  await auditLog('password_reset_requested', {
    email,
    timestamp: new Date(),
    ip: req.ip
  });
  
  return { success: true };
}
```

**AI runs tests**:
```
npm test tests/requirements/req-042/
```

**Terminal shows**:
```
 PASS  tests/requirements/req-042/req-042-password-reset.test.js
  REQ-AUTH-042: Password Reset via Email
    ✓ should send reset email when valid email provided (45 ms)
    ✓ should reject invalid email format (12 ms)
    ✗ should reject expired reset token (4 ms)
    ✗ should prevent token reuse (5 ms)
    ✗ should validate password complexity (4 ms)
    ✗ should invalidate all JWT tokens (5 ms)
    ✗ should log all reset attempts (4 ms)
    ✗ should rate limit reset requests (4 ms)
    ✗ [HIPAA] should enforce immutable audit logs (5 ms)
    ✗ [HIPAA] should reject old tokens immediately (4 ms)

Tests: 2 passed, 8 failed, 10 total
```

**AI says**:
> "Progress! 2 tests passing. The basic flow works. Now we need to handle token expiry, reuse, and HIPAA audit requirements. Let me implement that..."

**You validate**:
- ✅ Code exists and compiles
- ✅ 2 tests now passing (progress! 20%)
- ✅ Compliance comments in code
- ⏳ 8 tests still failing (expected - iterating)

**You say**:
> "Good start. Make sure the HIPAA audit logging is truly immutable - we had an audit finding on that last year."

**AI**: "Understood! I'll use a write-once database table with hash chaining for tamper detection. Implementing now..."

---

#### Iteration 2: Token Validation

**AI implements**:
```javascript
// REQ-AUTH-042: Token validation with expiry
async function resetPassword(token, newPassword) {
  // Validate token exists and not expired
  const resetData = await getResetToken(token);
  if (!resetData || resetData.expired) {
    // REQ-AUTH-042: comp-soc2-007 (Audit failed attempts)
    await auditLog('password_reset_failed', {
      token: token.substring(0, 8) + '...',
      reason: 'expired_or_invalid',
      timestamp: new Date()
    });
    throw new Error('Token expired or invalid');
  }
  
  // Check token not already used
  if (resetData.used) {
    await auditLog('password_reset_failed', {
      reason: 'token_reuse_attempted'
    });
    throw new Error('Token already used');
  }
  
  // Validate password complexity (SOC2)
  if (!meetsComplexityRequirements(newPassword)) {
    throw new Error('Password does not meet complexity requirements');
  }
  
  // Update password
  await updateUserPassword(resetData.email, newPassword);
  
  // Mark token as used
  await markTokenUsed(token);
  
  // Invalidate all existing JWT tokens for this user
  await invalidateAllTokens(resetData.email);
  
  // REQ-AUTH-042: comp-soc2-007 (Audit success)
  await auditLog('password_reset_completed', {
    email: resetData.email,
    timestamp: new Date()
  });
  
  return { success: true };
}
```

**AI runs tests again**:
```
 PASS  tests/requirements/req-042/req-042-password-reset.test.js
  REQ-AUTH-042: Password Reset via Email
    ✓ should send reset email when valid email provided (45 ms)
    ✓ should reject invalid email format (12 ms)
    ✓ should reject expired reset token (18 ms)
    ✓ should prevent token reuse (15 ms)
    ✓ should validate password complexity (22 ms)
    ✓ should invalidate all JWT tokens (31 ms)
    ✗ should log all reset attempts (8 ms)
    ✗ should rate limit reset requests (12 ms)
    ✗ [HIPAA] should enforce immutable audit logs (6 ms)
    ✗ [HIPAA] should reject old tokens immediately (7 ms)

Tests: 6 passed, 4 failed, 10 total
```

**AI says**:
> "Excellent! 6 out of 10 passing (60%). The core logic works. Now let's add:
> - Audit logging (standard)
> - Rate limiting (SOC2)
> - Immutable logs (HIPAA)
> - Zero-trust token invalidation (your strategic goal)
>
> These are the compliance-critical pieces..."

**You validate**:
- ✅ 6/10 tests passing (60%)
- ✅ Token security implemented
- ✅ Password validation working
- ⏳ 4 HIPAA/compliance tests still need work

**You say**:
> "The rate limiting is important for SOC2. And make absolutely sure the immutable logs pass - that's our highest HIPAA risk."

---

#### Iteration 3: Final Compliance (Rate Limiting + HIPAA Audit)

**AI implements**:
```javascript
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');

// REQ-AUTH-042: Rate limiting to prevent abuse (SOC2)
const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window per IP
  message: 'Too many reset requests, please try again later',
  handler: (req, res) => {
    // REQ-AUTH-042: comp-soc2-007 (Audit rate limit hits)
    auditLog('password_reset_rate_limited', {
      ip: req.ip,
      timestamp: new Date()
    });
    res.status(429).json({ error: 'Too many requests' });
  }
});

// REQ-AUTH-042: comp-hipaa-008 (Immutable audit logs)
class ImmutableAuditLog {
  constructor() {
    this.lastHash = crypto.createHash('sha256').update('genesis').digest('hex');
  }
  
  async append(event, data) {
    const entry = {
      event,
      data,
      timestamp: new Date().toISOString(),
      previousHash: this.lastHash
    };
    
    // Calculate hash of current entry
    const entryString = JSON.stringify(entry);
    entry.hash = crypto.createHash('sha256').update(entryString).digest('hex');
    
    // Write to append-only table (no UPDATE or DELETE permissions)
    await db.auditLog.create(entry);
    
    this.lastHash = entry.hash;
    return entry;
  }
  
  async verify() {
    // Verify chain integrity
    const logs = await db.auditLog.findAll({ order: [['createdAt', 'ASC']] });
    let expectedHash = crypto.createHash('sha256').update('genesis').digest('hex');
    
    for (const log of logs) {
      if (log.previousHash !== expectedHash) {
        throw new Error('Audit log tampering detected!');
      }
      expectedHash = log.hash;
    }
    return true; // Chain intact
  }
}

// REQ-AUTH-042: Zero-trust token invalidation
async function invalidateAllUserTokens(userId) {
  // Add user to token blacklist
  await db.tokenBlacklist.create({
    userId,
    invalidatedAt: new Date(),
    reason: 'password_reset'
  });
  
  // Update user's token version (makes all old tokens invalid)
  await db.users.update(
    { tokenVersion: db.sequelize.literal('token_version + 1') },
    { where: { id: userId } }
  );
  
  return true;
}

// Apply to reset endpoint
app.post('/api/auth/reset-request', resetLimiter, async (req, res) => {
  // ... existing logic
});
```

**AI runs full test suite**:
```
 PASS  tests/requirements/req-042/req-042-password-reset.test.js
  REQ-AUTH-042: Password Reset via Email
    ✓ should send reset email when valid email provided (45 ms)
    ✓ should reject invalid email format (12 ms)
    ✓ should reject expired reset token (18 ms)
    ✓ should prevent token reuse (15 ms)
    ✓ should validate password complexity (22 ms)
    ✓ should invalidate all JWT tokens (31 ms)
    ✓ should log all reset attempts (28 ms)
    ✓ should rate limit reset requests (35 ms)
    ✓ [HIPAA] should enforce immutable audit logs (42 ms)
    ✓ [HIPAA] should reject old tokens immediately (38 ms)

Tests: 10 passed, 10 total
Time: 2.856s
```

**AI says**:
> "✅ All tests passing! Now let me verify compliance against your specific context...
>
> Running: `sc compliance check --requirement REQ-AUTH-042`"

**Terminal shows**:
```
🔍 Compliance Check: REQ-AUTH-042

✅ comp-soc2-005 (Access Control):
   - Token generation: cryptographically secure ✓
   - Password complexity: enforced (12+ chars, mixed case) ✓
   - Single-use tokens: implemented ✓
   
✅ comp-soc2-007 (Audit Logging):
   - Reset requests: logged ✓
   - Failed attempts: logged ✓
   - Successful resets: logged ✓
   - Rate limit hits: logged ✓

✅ comp-hipaa-003 (PHI Access Controls):
   - Session invalidation: all tokens blacklisted ✓
   - Zero-trust enforcement: token version incremented ✓
   - Immediate access revocation: verified ✓
   
✅ comp-hipaa-008 (Audit Trail Requirements):
   - All auth events logged: ✓
   - Logs include required fields (user, timestamp, action, outcome, IP): ✓
   - Immutable logs: hash-chained, append-only ✓
   - Tamper detection: implemented and tested ✓

📋 Summary:
   - All acceptance criteria met: 8/8 ✓
   - All compliance requirements met: 4/4 (SOC2 + HIPAA) ✓
   - All tests passing: 10/10 ✓
   - Code coverage: 96% ✓
   - Strategic goals met: Zero-trust model implemented ✓

✅ REQ-AUTH-042 is COMPLETE and COMPLIANT
   Ready for healthcare production deployment
```

**You validate**:
- ✅ All 10 tests passing (including HIPAA-specific)
- ✅ All compliance met (SOC2 + HIPAA)
- ✅ Zero-trust model implemented (strategic goal)
- ✅ Immutable audit logs working (previous audit finding addressed)
- ✅ Code quality good (96% coverage)
- ✅ Ready to commit

**You say**:
> "Excellent! This addresses the audit finding from last year and implements our zero-trust initiative. Let's commit it with full traceability."

**What just happened**: You **iterated** with AI from 2/10 → 6/10 → 10/10 tests passing. AI did the heavy lifting (implementation, testing, compliance verification), you validated at each step and provided strategic guidance (immutable logs, zero-trust enforcement).

---

### Stage 5: Commit (Traceable)

**You say**:
> "This looks great! Let's commit it with full traceability."

**AI responds**:
> "Perfect! I'll create a commit that links everything together.
>
> Running: `sc git commit src/ tests/ docs/ -m 'feat(auth): implement password reset (REQ-AUTH-042)'`"

**Terminal shows**:
```
🔍 Pre-commit checks...
✅ All tests passing
✅ Compliance verified
✅ Requirements linked
✅ Evidence collected

📝 Commit created:
   feat(auth): implement password reset (REQ-AUTH-042)
   
   - Add password reset request endpoint
   - Add token generation and validation
   - Add rate limiting (5 requests/15min)
   - Add comprehensive audit logging
   
   Compliance: comp-soc2-005, comp-soc2-007
   Tests: 8/8 passing
   Coverage: 95%
   Evidence: .supernal/evidence/test-results-20251217.json
   
   Closes REQ-AUTH-042
```

**AI says**:
> "Committed! Now let me update the requirement status..."

**AI runs**: `sc requirement update REQ-AUTH-042 --status=done`

**Terminal shows**:
```
✅ REQ-AUTH-042 status updated: todo → done
📊 Dashboard updated
```

---

### Stage 6: Validate (Dashboard Check)

**AI says**:
> "Let's verify everything in the dashboard. Opening http://localhost:3006..."

**You see in dashboard**:

**Requirements View**:
```
REQ-AUTH-042: Password Reset via Email ✅
  Status: Done
  Tests: 8/8 passing
  Compliance: 2/2 met
  Evidence: Complete
  
  Linked Items:
  - comp-soc2-005 ✅
  - comp-soc2-007 ✅
  - 8 test cases ✅
  - 1 git commit ✅
```

**Traceability View**:
```
REQ-AUTH-042 (Password Reset)
  ↓
Compliance Requirements:
  ├─ comp-soc2-005 (Access Control) ✅
  └─ comp-soc2-007 (Audit Logging) ✅
  ↓
Tests (8/8 passing):
  ├─ tests/requirements/req-042/*.test.js
  ↓ (imports)
Implementation:
  ├─ src/auth/password-reset.js
  ├─ src/utils/tokens.js
  ├─ src/utils/email.js
  ↓ (committed in)
Git Commit:
  └─ abc123f feat(auth): implement password reset
  ↓ (evidence)
Evidence:
  └─ .supernal/evidence/test-results-20251217.json
```

**AI says**:
> "✅ Everything is connected and traceable! Dashboard shows:
> - Requirement: Complete
> - Tests: All passing
> - Compliance: Fully met
> - Evidence: Collected and signed
>
> Your password reset feature is production-ready and audit-ready!"

---

## The Pattern You Just Learned

### The Conversation Flow

1. **You**: "I want to build X"
2. **AI**: "Let me ask clarifying questions..." (planning big)
3. **You**: "Here are the details..."
4. **AI**: "I'll break this into a requirement" (`sc requirement new`)
5. **AI**: "Now let's create tests" (`sc requirement generate-tests`)
6. **AI**: "Tests are failing (expected). Let me implement..."
7. **AI**: "2/8 passing. Let me iterate..."
8. **AI**: "6/8 passing. Almost there..."
9. **AI**: "8/8 passing! Let me verify compliance..." (`sc compliance check`)
10. **AI**: "All green! Let's commit" (`sc git commit`)
11. **AI**: "Dashboard updated. Feature complete!"

### What You Did

- ✅ Told AI what you wanted
- ✅ Answered clarifying questions
- ✅ Validated at each checkpoint
- ✅ Verified final result

### What AI Did

- ✅ Asked smart questions
- ✅ Created requirement with compliance
- ✅ Generated comprehensive tests
- ✅ Implemented iteratively
- ✅ Verified compliance automatically
- ✅ Created traceable commit
- ✅ Updated dashboard

### Why This Works

**You don't need to know**:
- ❌ Exact `sc` command syntax
- ❌ How to structure requirements
- ❌ Which compliance cards to link
- ❌ How to format commits
- ❌ How to collect evidence

**You just need to know**:
- ✅ What you want to build
- ✅ When something looks wrong
- ✅ How to validate AI's work
- ✅ The goal: Tests pass + Compliance met

---

## Checkpoints (Use These to Validate)

### Checkpoint 1: Requirement Created
```bash
./scripts/validate-hello-world-checkpoint.sh 2
```
**What to verify**:
- Requirement file exists
- Has compliance cards linked
- Has acceptance criteria

### Checkpoint 2: Tests Generated
```bash
./scripts/validate-hello-world-checkpoint.sh 3
```
**What to verify**:
- Test file exists
- Tests run (and fail initially)
- Requirement links to tests

### Checkpoint 3: Implementation Progress
```bash
npm test
```
**What to verify**:
- Some tests passing (not all yet)
- Code exists and compiles
- Progress being made

### Checkpoint 4: All Green
```bash
npm test && sc compliance check
```
**What to verify**:
- All tests passing ✅
- All compliance met ✅
- Ready to commit

### Checkpoint 5: Committed and Traceable
```bash
git log -1 --pretty=fuller
```
**What to verify**:
- Commit message has REQ-XXX
- Commit message has compliance cards
- Commit shows test results

### Checkpoint 6: Dashboard Verification
```
Open http://localhost:3006
```
**What to verify**:
- Requirement shows "Done"
- Tests show "Passing"
- Traceability chain complete
- Evidence collected

---

## Common Interaction Patterns

### Pattern: "It's not working"

**You**: "The tests are still failing after implementation"

**AI**: "Let me check... Running tests with verbose output..."

```bash
npm test -- --verbose
```

**AI**: "I see the issue. The token validation is checking for 'expires' but we're using 'expiresAt'. Let me fix that..."

**Key**: AI debugs with you. You don't troubleshoot alone.

---

### Pattern: "Add more complexity"

**You**: "Can we add 2-factor authentication to this? Our CISO wants it for all admin accounts."

**AI**: "Yes! That will require:
1. Updating REQ-AUTH-042 with 2FA acceptance criteria
2. Adding 2FA compliance requirements (comp-soc2-003, comp-hipaa-005)
3. Creating new tests for 2FA flow (TOTP generation, verification, backup codes)
4. Implementing 2FA token generation and validation
5. Updating admin login flow

Given your healthcare context, I'll also add:
- HIPAA-compliant backup code storage (encrypted)
- Audit logging for 2FA events
- Zero-trust: Require 2FA re-verification after password reset

This will add about 20 minutes. Should I proceed?"

**You**: "Yes, but make sure backup codes are printable for our older providers who don't have smartphones."

**AI**: "Noted! I'll add a PDF export for backup codes with clear printing instructions. Implementing now..."

**Key**: AI understands the **context** (healthcare, HIPAA, older users) and adapts accordingly. You provide strategic guidance (printable codes), AI executes.

---

### Pattern: "Is this compliant?"

**You**: "Are we meeting all SOC2 requirements for password reset?"

**AI**: "Let me check...

Running: `sc compliance check --requirement REQ-AUTH-042 --framework soc2`"

**Terminal shows**:
```
✅ All SOC2 requirements met for password reset:
   - Access control (comp-soc2-005) ✓
   - Audit logging (comp-soc2-007) ✓
   - No gaps detected
```

**AI**: "Yes, fully compliant! Here's the evidence..."

**Key**: AI can verify compliance at any time.

---

## What Makes This Different

### Traditional Approach
```
1. You: Write requirement document (30 min)
2. You: Figure out what tests to write (20 min)
3. You: Research compliance requirements (45 min)
4. You: Write tests manually (45 min)
5. You: Implement feature (2 hours)
6. You: Debug failing tests (1 hour)
7. You: Manually check compliance (30 min)
8. You: Realize you missed HIPAA requirements (1 hour rework)
9. You: Write commit message (5 min)
10. You: Update docs (15 min)

Total: ~6 hours
```

### SC + AI Approach (With Context)
```
1. You: "Healthcare SaaS, SOC2+HIPAA, zero-trust, JWT, need password reset" (2 min)
2. AI: Creates requirement with SOC2+HIPAA compliance linked (2 min)
3. AI: Generates comprehensive tests (functional + HIPAA-specific) (1 min)
4. AI: Implements feature (5 min)
5. AI: Iterates until tests pass (2/10 → 6/10 → 10/10) (10 min)
6. AI: Verifies compliance automatically (SOC2 + HIPAA all met) (30 sec)
7. AI: Creates traceable commit (30 sec)
8. AI: Updates dashboard (automatic)

Total: ~20 minutes (18x faster)
```

**Difference**: 
- AI does the heavy lifting (implementation, testing, compliance verification)
- You guide with strategic context and validate
- Context provided upfront eliminates back-and-forth
- Compliance built in from the start (no rework)
- Strategic goals (zero-trust) implemented automatically

---

## Troubleshooting

### "AI didn't link compliance cards"

**You say**: "Can you check if all SOC2 cards are linked to this requirement?"

**AI checks**: `sc requirement validate REQ-AUTH-042 --verbose`

**AI**: "Missing comp-soc2-003 (Encryption). Let me add that..."

---

### "Tests are flaky"

**You say**: "Test #5 is failing intermittently"

**AI**: "Let me investigate the test... I see it's a timing issue. I'll add proper async handling..."

---

### "Not sure if we're done"

**You say**: "How do I know if this is ready for production?"

**AI**: "Let me run the full validation...

```bash
sc validate --requirement REQ-AUTH-042 --full
```

**Terminal shows**:
```
✅ All acceptance criteria met
✅ All tests passing
✅ All compliance requirements met
✅ Code coverage >90%
✅ No security vulnerabilities
✅ Evidence complete and signed

✅ REQ-AUTH-042 is production-ready
```

**AI**: "Yes, it's ready! Here's the evidence package for your audit..."

---

## Summary: The Core Pattern

### Your Job
1. **Provide Context**: Company, compliance, strategic goals, immediate needs
2. **Describe** what you want (feature, user journey)
3. **Validate** at each step (Does this align with our goals?)
4. **Guide** with strategic input (priorities, constraints, risks)
5. **Verify** final result

### AI's Job
1. **Use your context** to make smart decisions (which compliance cards, what tests, how to implement)
2. **Plan** the implementation
3. **Generate** tests and code
4. **Iterate** until all green
5. **Verify** compliance automatically
6. **Commit** with traceability

### The Goal
**Tests passing ✅ + Compliance met ✅ + Strategic goals achieved ✅ = Production Ready 🚀**

### Why Context Matters

**Without context**:
```
You: "I want password reset"
AI: "Which compliance?" ← Wastes time asking
AI: "What auth system?" ← Back and forth
AI: Guesses wrong compliance cards → Rework
Result: 2 hours of back-and-forth
```

**With context upfront**:
```
You: "Healthcare SaaS, SOC2+HIPAA, zero-trust, JWT auth, password reset needed"
AI: Immediately knows:
  - Link comp-soc2-005, comp-soc2-007, comp-hipaa-003, comp-hipaa-008
  - Generate HIPAA-specific tests (immutable logs, immediate invalidation)
  - Implement with zero-trust (blacklist all tokens)
Result: 20 minutes, done right the first time
```

**Context = Efficiency**. Provide it upfront:
- **Company type**: Healthcare, fintech, e-commerce, SaaS, etc.
- **Compliance needs**: SOC2, HIPAA, GDPR, PCI-DSS, etc.
- **Strategic goals**: Zero-trust, audit-ready, high-performance, etc.
- **Current systems**: Auth method, database, framework, etc.
- **Immediate need**: What you're building today

---

## Next Steps

Now that you've learned the pattern:

1. **Try it**: Build your own feature using this conversation flow
2. **Practice**: Do it 2-3 times to internalize the pattern
3. **Expand**: Learn advanced workflows in other SOPs
4. **Help others**: Teach teammates this pattern

**Mark Complete**:
```bash
sc user complete sop-hello-world
```

Or tell AI: "Mark sop-hello-world as complete"

---

**Last Updated**: 2025-12-17  
**Status**: ✅ Active SOP  
**Estimated Time**: 30-45 minutes  
**Pattern**: Interactive AI collaboration  
**Goal**: Tests pass + Compliance met
