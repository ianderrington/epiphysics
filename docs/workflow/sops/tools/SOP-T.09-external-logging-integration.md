---
type: sop
category: tool
sop_id: SOP-T.09
title: External Logging Integration
phase: null
audience: [developers, devops, security]
tags: [logging, monitoring, cloudwatch, splunk, grafana, compliance]
status: draft
created: 2025-12-24
updated: 2025-12-24
version: '1.0'
---

# SOP-T.09: External Logging Integration

**Audience**: Developers, DevOps, Security Engineers  
**Purpose**: Configure external log destinations for centralized monitoring, compliance, and analytics

---

## Overview

Supernal Coding provides **two complementary logging systems**:

1. **Unified Log Management (REQ-WORKFLOW-209)** - Local log capture via `sc build/test/run`
2. **External Log Forwarding** - Forward structured events to external systems (CloudWatch, Splunk, Grafana, etc.)

This SOP covers **External Log Forwarding** - connecting Supernal to enterprise logging platforms.

---

## When to Use External Logging

### ✅ Use External Logging For:

- **Compliance Requirements** (HIPAA, SOC2, PCI-DSS)
  - Tamper-proof audit trails
  - Long-term log retention (7+ years)
  - Centralized security event logging

- **Production Monitoring**
  - Real-time alerting on errors
  - Performance metrics aggregation
  - Cross-service correlation

- **Team Collaboration**
  - Shared log access across teams
  - Centralized dashboards (Grafana, Kibana)
  - Historical analysis and trends

- **Enterprise Integration**
  - Existing SIEM systems (Splunk, DataDog)
  - Corporate logging infrastructure
  - Cloud-native observability (AWS, GCP, Azure)

### ❌ Don't Use External Logging For:

- **Local Development** - Use `sc logs` for fast local queries
- **Individual Developer Logs** - Use local file storage
- **Sensitive Data Without Redaction** - Configure secret redaction first

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Supernal Coding Application                        │
│                                                      │
│  sc build/test/run                                  │
│      ↓                                              │
│  LogManager (REQ-WORKFLOW-209)                      │
│      ↓ structured events                            │
│  LogCollector                                       │
│      ↓                                              │
│  ┌──────────────────────────────────┐              │
│  │  Buffer (file-based, 100MB)      │              │
│  │  - Async write                   │              │
│  │  - Auto-flush every 30s          │              │
│  │  - Crash recovery                │              │
│  └──────────────────────────────────┘              │
│      ↓                                              │
└──────┼──────────────────────────────────────────────┘
       ↓
┌──────┴──────────────────────────────────────────────┐
│  External Destinations (Configured)                 │
│                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │ CloudWatch  │  │   Splunk    │  │  Grafana   │ │
│  │   Logs      │  │     HEC     │  │    Loki    │ │
│  └─────────────┘  └─────────────┘  └────────────┘ │
│                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │     S3      │  │   Webhook   │  │    OTLP    │ │
│  │   Archive   │  │   Custom    │  │  (DataDog) │ │
│  └─────────────┘  └─────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## Supported Destinations

| Destination | Status | Use Case | Compliance |
|------------|---------|----------|-----------|
| **File** | ✅ Implemented | Local archive, rotation | ✅ Basic |
| **AWS CloudWatch** | 🚧 Plugin Needed | AWS-native logging | ✅ HIPAA, SOC2 |
| **AWS S3** | 🚧 Plugin Needed | Long-term archive | ✅ HIPAA, SOC2 |
| **Splunk HEC** | 🚧 Plugin Needed | Enterprise SIEM | ✅ All |
| **OTLP** | 🚧 Plugin Needed | Grafana, DataDog, Honeycomb | ✅ SOC2 |
| **Webhook** | 🚧 Plugin Needed | Custom endpoints, Loki | ⚠️ Depends |

**Note**: CloudWatch, Splunk, OTLP, Webhook, and S3 plugins are **planned** but not yet implemented. See implementation section below.

---

## Quick Start: Local File Destination

### 1. Initialize Logging

```bash
# Initialize with local file destination
sc logging init --destination=file

# Or install full system (global + local)
sc logging install
```

### 2. Verify Configuration

```bash
# Check status
sc logging status

# Should show:
# Status: Enabled
# Destinations (1):
#   [*] local-archive (file)
```

### 3. Test Logging

```bash
# Emit a test event
sc logging test

# View logs
sc logging tail -n 20
```

### 4. Integrate with Unified Log Management

Edit `supernal.yaml`:

```yaml
log_management:
  enabled: true
  integration:
    log_collector: true  # Forward to LogCollector destinations
```

Now `sc build/test/run` logs will forward to configured destinations.

---

## Configuration: AWS CloudWatch (Plugin Required)

### Prerequisites

- AWS CLI configured (`aws configure`)
- IAM permissions for CloudWatch Logs
- Log group created (or auto-create enabled)

### Setup

```bash
# Add CloudWatch destination
sc logging destination add aws-cloudwatch --id=production-logs

# Edit supernal.yaml
```

```yaml
logging:
  forwarding:
    enabled: true
    destinations:
      - id: production-logs
        type: aws-cloudwatch
        region: us-east-1  # or ${AWS_REGION}
        log_group: /supernal/production
        log_stream_prefix: ${HOSTNAME}
        credentials:
          # Use IAM role (recommended) or environment variables
          # AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
        retention_days: 30  # Optional: CloudWatch retention
        enabled: true
```

### Test

```bash
# Test connection
sc logging test --destination=production-logs

# View CloudWatch logs
aws logs tail /supernal/production --follow
```

### Environment Variables

```bash
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=...
```

---

## Configuration: Splunk HEC (Plugin Required)

### Prerequisites

- Splunk Enterprise or Cloud account
- HEC (HTTP Event Collector) token

### Setup

```bash
# Add Splunk destination
sc logging destination add splunk-hec --id=splunk-prod
```

```yaml
logging:
  forwarding:
    enabled: true
    destinations:
      - id: splunk-prod
        type: splunk-hec
        endpoint: https://splunk.example.com:8088
        token_env: SPLUNK_HEC_TOKEN  # Store token in env var
        index: main
        source: supernal
        sourcetype: json
        verify_ssl: true
        enabled: true
```

### Test

```bash
# Set token
export SPLUNK_HEC_TOKEN=your-hec-token-here

# Test connection
sc logging test --destination=splunk-prod
```

### Search in Splunk

```spl
index=main sourcetype=json source=supernal
| table timestamp, severity, action, status
| sort -timestamp
```

---

## Configuration: Grafana Loki via OTLP (Plugin Required)

### Prerequisites

- Grafana Cloud account or self-hosted Loki
- OTLP endpoint URL

### Setup

```bash
# Add OTLP destination
sc logging destination add otlp --id=grafana-loki
```

```yaml
logging:
  forwarding:
    enabled: true
    destinations:
      - id: grafana-loki
        type: otlp
        endpoint: https://otlp-gateway.grafana.net
        protocol: http  # or grpc
        headers:
          Authorization: Basic ${GRAFANA_AUTH_TOKEN}
        compression: gzip
        enabled: true
```

### Test

```bash
# Set auth token (base64 encoded user:password)
export GRAFANA_AUTH_TOKEN=$(echo -n "user:password" | base64)

# Test connection
sc logging test --destination=grafana-loki
```

### Query in Grafana

```logql
{job="supernal"} |= "error"
| json
| severity = "error"
```

---

## Configuration: Generic Webhook (Plugin Required)

### Use Cases

- Custom log aggregators
- Slack/Discord notifications
- Internal APIs
- Grafana Loki push API

### Setup

```bash
# Add webhook destination
sc logging destination add webhook --id=custom-webhook
```

```yaml
logging:
  forwarding:
    enabled: true
    destinations:
      - id: custom-webhook
        type: webhook
        endpoint: https://logs.example.com/ingest
        method: POST
        headers:
          Content-Type: application/json
          Authorization: Bearer ${WEBHOOK_TOKEN}
        batch_size: 100  # Events per request
        timeout_seconds: 10
        retry:
          enabled: true
          max_attempts: 3
          backoff_seconds: 5
        enabled: true
```

### Payload Format

Webhook receives JSON array:

```json
[
  {
    "id": "evt_abc123",
    "timestamp": "2025-12-24T11:23:45.678Z",
    "type": "operational",
    "severity": "error",
    "action": "build.failed",
    "status": "failure",
    "metadata": {
      "exitCode": 1,
      "duration_ms": 5432
    }
  }
]
```

---

## Configuration: AWS S3 Archive (Plugin Required)

### Prerequisites

- S3 bucket created
- IAM permissions for S3 PutObject

### Setup

```bash
# Add S3 destination
sc logging destination add aws-s3 --id=s3-archive
```

```yaml
logging:
  forwarding:
    enabled: true
    destinations:
      - id: s3-archive
        type: aws-s3
        region: us-east-1
        bucket: my-company-supernal-logs
        prefix: logs/${YEAR}/${MONTH}/${DAY}/
        format: jsonl  # or parquet
        compression: gzip
        encryption:
          type: AES256  # or aws:kms
          kms_key_id: alias/logs-encryption  # if using KMS
        lifecycle:
          transition_to_glacier_days: 90
          expiration_days: 2555  # 7 years for compliance
        enabled: true
```

### Test

```bash
# Set credentials
export AWS_REGION=us-east-1
export S3_BUCKET=my-company-supernal-logs

# Test upload
sc logging test --destination=s3-archive

# Verify in S3
aws s3 ls s3://my-company-supernal-logs/logs/
```

---

## Compliance Modes

### HIPAA Compliance

```yaml
logging:
  forwarding:
    enabled: true
    compliance_mode: hipaa
    destinations:
      - type: aws-cloudwatch
        region: us-east-1
        log_group: /supernal/hipaa-audit
        encryption:
          kms_key_id: arn:aws:kms:us-east-1:123456789012:key/...
      - type: aws-s3
        bucket: hipaa-compliant-logs
        encryption:
          type: aws:kms
          kms_key_id: alias/hipaa-logs
        retention_policy:
          years: 7  # HIPAA requires 6+ years
```

**HIPAA Requirements**:
- ✅ Encryption at rest (KMS)
- ✅ Encryption in transit (TLS 1.2+)
- ✅ Access logging enabled
- ✅ 7-year retention
- ✅ Tamper-proof storage (S3 Object Lock)

### SOC2 Compliance

```yaml
logging:
  forwarding:
    enabled: true
    compliance_mode: soc2
    destinations:
      - type: splunk-hec
        endpoint: https://splunk.example.com:8088
        index: soc2-audit
        retention_days: 395  # SOC2 requires 13 months
      - type: aws-s3
        bucket: soc2-audit-logs
        encryption: { type: AES256 }
```

**SOC2 Requirements**:
- ✅ Centralized logging (Splunk, CloudWatch)
- ✅ Log integrity (checksums, signatures)
- ✅ 13-month retention minimum
- ✅ Access controls and audit trails
- ✅ Incident detection and response

---

## Secret Redaction

### Automatic Redaction

Configure patterns in `supernal.yaml`:

```yaml
log_management:
  parsing:
    redact_patterns:
      - pattern: 'token["\s:=]+([a-zA-Z0-9_-]{20,})'
        replacement: 'token=<REDACTED>'
      - pattern: 'password["\s:=]+([^\s"]+)'
        replacement: 'password=<REDACTED>'
      - pattern: 'api[_-]?key["\s:=]+([a-zA-Z0-9_-]{20,})'
        replacement: 'api_key=<REDACTED>'
      - pattern: 'Bearer\s+([a-zA-Z0-9_-]+)'
        replacement: 'Bearer <REDACTED>'
      - pattern: 'AWS[A-Z0-9]{16,}'
        replacement: '<AWS_KEY_REDACTED>'
```

### Validation

```bash
# Test redaction
echo "token=sk-abc123def456" | sc logging test

# Should log:
# "token=<REDACTED>"
```

---

## Monitoring & Alerts

### Destination Health

```bash
# Check destination health
sc logging status

# Example output:
# Destinations (3):
#   [*] cloudwatch-prod (healthy, 1234 events, 0 errors)
#   [!] splunk-prod (unhealthy, last error: connection timeout)
#   [*] s3-archive (healthy, 5678 events, 2 errors)
```

### Alert Configuration

**CloudWatch Alarms**:

```bash
# Alert on high error rate
aws cloudwatch put-metric-alarm \
  --alarm-name supernal-high-error-rate \
  --metric-name EventsFailed \
  --namespace Supernal/Logging \
  --statistic Sum \
  --period 300 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold
```

**Splunk Alerts**:

```spl
index=main sourcetype=json source=supernal severity=error
| stats count by action
| where count > 10
```

---

## Troubleshooting

### Destination Not Receiving Logs

**Check 1: Configuration**
```bash
sc logging config validate
```

**Check 2: Credentials**
```bash
# CloudWatch
aws logs describe-log-groups

# Splunk
curl -k https://splunk.example.com:8088/services/collector/health \
  -H "Authorization: Splunk $SPLUNK_HEC_TOKEN"
```

**Check 3: Network/Firewall**
```bash
# Test connectivity
curl -v https://splunk.example.com:8088

# Check DNS
nslookup splunk.example.com
```

**Check 4: Buffer Status**
```bash
# Check buffer directory
ls -lh .supernal/logs/buffer/

# Check for stuck events
sc logging storage stats
```

### High Latency

**Symptom**: Slow log forwarding, backup in buffer

**Solutions**:
1. Increase batch size (fewer requests)
2. Add more destinations (parallel forwarding)
3. Increase flush interval (less frequent)
4. Use async destinations (don't block)

```yaml
logging:
  forwarding:
    buffer:
      flush_interval_seconds: 60  # Increase from 30
    destinations:
      - type: splunk-hec
        batch_size: 500  # Increase from 100
        timeout_seconds: 30  # Increase timeout
```

### Compliance Audit Failures

**Issue**: Logs missing, tampered, or expired

**Solutions**:
1. Enable S3 Object Lock (immutability)
2. Configure lifecycle policies (retention)
3. Enable access logging (audit trail)
4. Use KMS encryption (tamper-proof)

```yaml
logging:
  forwarding:
    destinations:
      - type: aws-s3
        bucket: compliance-logs
        encryption:
          type: aws:kms
          kms_key_id: alias/compliance
        object_lock:
          mode: GOVERNANCE  # or COMPLIANCE
          retain_until_date: 2032-12-31
        access_logging:
          target_bucket: audit-logs
          target_prefix: s3-access-logs/
```

---

## Implementation Status

### Phase 1: Complete ✅

- File destination (local archive)
- Buffer management
- LogCollector integration
- CLI commands (`sc logging`)

### Phase 2: In Progress 🚧

**Plugins Needed** (REQ-WORKFLOW-209 extension):

1. **CloudWatch Destination**
   - AWS SDK integration
   - Log stream management
   - Batch uploads
   - Retry logic

2. **Splunk HEC Destination**
   - HEC protocol implementation
   - Token authentication
   - Event batching
   - Index routing

3. **OTLP Destination**
   - OTLP/HTTP and OTLP/gRPC
   - Trace context propagation
   - Compression (gzip)
   - Multi-backend support (Grafana, DataDog, Honeycomb)

4. **Webhook Destination**
   - Generic HTTP POST
   - Custom headers
   - Retry with exponential backoff
   - Circuit breaker pattern

5. **S3 Destination**
   - Batch uploads with buffering
   - Parquet format support
   - KMS encryption
   - Lifecycle policy integration

### Phase 3: Planned 📋

- Kafka destination
- Azure Monitor destination
- GCP Cloud Logging destination
- Elasticsearch destination
- Prometheus remote write

---

## Related Documentation

- [REQ-WORKFLOW-209: Unified Log Management](../../../requirements/workflow/req-workflow-209-unified-log-management-with-wrapper-commands.md)
- [Unified Log Management - Usage Guide](../../../features/developer-tooling/unified-log-management/USAGE-GUIDE.md)
- [Unified Log Management - MCP Integration](../../../features/developer-tooling/unified-log-management/MCP-INTEGRATION-GUIDE.md)
- [SOP-T.01: Using sc CLI](SOP-T.01-using-sc-cli.md)
- [SOP-3.03: Compliance Requirements](../phase-3-design/SOP-3.03-compliance-requirements.md)

---

## Best Practices

### ✅ DO:

- **Use multiple destinations** for redundancy
- **Configure secret redaction** before enabling
- **Test destinations** before production (`sc logging test`)
- **Monitor destination health** regularly
- **Set retention policies** per compliance needs
- **Use KMS encryption** for sensitive data
- **Enable access logging** for audit trails

### ❌ DON'T:

- **Don't store secrets** in supernal.yaml (use env vars)
- **Don't skip validation** (`sc logging config validate`)
- **Don't ignore health alerts** (unhealthy destinations)
- **Don't disable encryption** for compliance logs
- **Don't bypass secret redaction** for external systems
- **Don't forget to test** disaster recovery scenarios

---

**Last Updated**: 2025-12-24  
**Version**: 1.0  
**Status**: Draft (plugins in development)  
**Review Cycle**: Update when plugins are implemented

