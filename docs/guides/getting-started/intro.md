---
slug: /
---

# Welcome to Supernal Coding

**Transform any codebase into a compliant, behavior and requirement-driven system that _works natively with your AI agents_.**

## 🎯 What It Does

Supernal Coding equips your repository with:

- **🤖 AI-Friendly Structure** - Organized for AI agents to understand and work with
- **📋 Requirements Management** - Complete lifecycle from creation to validation
- **🗂️ Kanban Workflow** - Built-in kanban for tracking requirements and project progress
- **📊 Visual Dashboard** - Real-time project visualization
- **🧪 Integrated Testing** - Comprehensive test generation and validation
- **🌿 Smart Git Operations** - Intelligent branching and merging
- **🏆 Compliance Automation** - Built-in ISO 13485, FDA, GDPR, SOC2 support

## 🚀 Quick Start

```bash
# Install globally
npm install -g supernal-code

# Initialize your project
sc init --interactive

# Create your first requirement
sc planning req new "User Authentication" --priority=high
```

**🎯 Core Concept**: Every feature starts as a requirement with clear acceptance criteria, test strategies, and compliance mappings, organized into **Discovery → Foundation → Implementation → Validation → Compliance** phases.

## 🔄 How It Works

<SimpleMermaid chart={`
flowchart TB
subgraph "🚀 Discovery Phase"
A["🚀 Initialize<br/>sc init"]
B["🎯 Define Purpose<br/>Project goals & scope"]
C["👥 Gather User Stories<br/>Stakeholder needs"]
A --> B
B --> C
end

    subgraph "📋 Foundation Phase"
        D["📋 Draft Requirements<br/>High-level features"]
        E["📝 Build Specific Requirements<br/>sc planning req new 'Feature'"]
        F["🧪 Generate Tests<br/>sc planning req generate-tests"]
        G["🗂️ Organize Kanban<br/>Priority & workflow"]
        C --> D
        D --> E
        E --> F
        F --> G
    end

    subgraph "💻 Implementation Phase"
        H["🌿 Start Work<br/>sc git smart branch + sc planning req update --status=in-progress"]
        I["💻 Develop<br/>Code + Documentation"]
        J["🧪 Run Tests<br/>Validate implementation"]
        G --> H
        H --> I
        I --> J
    end

    subgraph "✅ Validation Phase"
        K["✅ Validate<br/>sc planning req validate REQ-001"]
        L["📊 Dashboard Review<br/>Visual progress check"]
        M["🔄 Merge<br/>sc git smart merge"]
        J --> K
        K --> L
        L --> M
    end

    subgraph "🏆 Compliance Phase"
        N["🏆 Compliance Check<br/>Automated validation"]
        O["📈 Reporting<br/>Audit trails"]
        M --> N
        N --> O
    end

    %% Feedback loops
    K -.->|"Issues found"| I
    L -.->|"Adjustments needed"| E
    N -.->|"Compliance gaps"| D

    %% AI Integration points - Early and continuous
    P["🤖 AI Agents<br/>Continuous assistance"]
    C -.->|"Project context"| P
    P -.->|"Requirements generation"| D
    P -.->|"Documentation creation"| E
    P -.->|"Test generation"| F
    P -.->|"Code generation"| I
    P -.->|"Validation assistance"| K

    style A fill:#e1f5fe
    style B fill:#e1f5fe
    style C fill:#e1f5fe
    style D fill:#f3e5f5
    style E fill:#f3e5f5
    style F fill:#f3e5f5
    style G fill:#f3e5f5
    style H fill:#fff3e0
    style I fill:#fff3e0
    style J fill:#fff3e0
    style K fill:#e8f5e8
    style L fill:#e8f5e8
    style M fill:#e8f5e8
    style N fill:#fce4ec
    style O fill:#fce4ec
    style P fill:#f1f8e9

`} />

---

## 📚 What's Next?

### New to Supernal Coding?

Start with [**What is Supernal Coding?**](./overview/what-is-supernal-coding) for a complete overview.

### Ready to Build?

Jump to [**Getting Started**](./index.md) for step-by-step setup.

### Need Quick Reference?

Check [**CLI Commands**](../cli-commands/complete-reference.md) or [**Workflow Example**](../../workflow/user-guides/complete-workflow-example.md).

### Want Visual Guides?

Explore [**Visual Workflows**](../../workflow/user-guides/visual-workflow-diagrams.md), [**Dashboard Guide**](../../../documentation/docs/guides/dashboard/dashboard-guide.md), or [**Compliance Visualization**](repo:supernal-coding/docs/requirements/comp/compliance-visualization.md).

---

## 🏆 Compliance-Ready

Built-in support for major frameworks _(under development)_:

- **Medical**: ISO 13485, FDA 21 CFR Part 11
- **Data**: GDPR, CCPA
- **Security**: SOC2, ISO 27001
- **Quality**: ISO 9001

## 🤝 Resources

- **GitHub**: [supernal-coding](https://github.com/supernalintelligence/supernal-coding)
- **Live Dashboard**: [Dashboard](https://coding.supernal.ai/dashboard-live)
- **Support**: Documentation and community guides
