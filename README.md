<div align="center">

# 🛡️ ClaimsAI

**AI-Powered Vehicle Damage Assessment for Gulf Insurance Markets**

Built for Scale AI GPS (Government, Public Sector & Security)

[![Deploy Status](https://img.shields.io/badge/deploy-live-brightgreen)](https://claims-ai-eight.vercel.app)
[![AI](https://img.shields.io/badge/AI-Claude%20Vision-blue)](https://anthropic.com)
[![License](https://img.shields.io/badge/license-MIT-gray)](LICENSE)
[![PRD](https://img.shields.io/badge/PRD-PDF-red)](ClaimsAI_PRD.pdf)

[Live Demo](https://claims-ai-eight.vercel.app) · [PRD Document](ClaimsAI_PRD.pdf) · [Architecture](#architecture)

</div>

---

## The Problem

A car insurance claims agent in Qatar spends **~45 minutes** manually reviewing damage photos, estimating repair costs from experience, and routing to a senior adjuster. The process is slow, inconsistent across agents, and generates zero data that improves accuracy over time.

## The Solution

ClaimsAI replaces manual damage assessment with a **5-stage AI pipeline** that processes claims in under 5 minutes while keeping humans in control of every decision. Every agent interaction — confirmations, rejections, overrides — flows into the training pipeline, creating a **data flywheel** that makes the model smarter with each claim.

### Key Differentiators

| Feature | What it does | Why it matters |
|---------|-------------|----------------|
| **Real AI Analysis** | Claude Vision analyzes uploaded damage photos | Not a mockup — real damage detection, severity classification, cost estimation |
| **Interactive Annotation** | Agents confirm, reject, or add damage regions on images | Every annotation = training data. Scale AI's core value proposition |
| **Arabic-First RTL** | Full Arabic interface with English toggle | Built for Qatar/Gulf, not translated from English |
| **Data Flywheel** | Agent corrections → training pipeline → model improvement | The product gets smarter with every claim |
| **7 Stakeholder Views** | Agent, Client, Sr. Adjuster, Repair Shop, Management, Audit, Batch | End-to-end product thinking, not just an agent tool |

---

## Demo

**🔗 Live: [claims-ai-eight.vercel.app](https://claims-ai-eight.vercel.app)**

Upload a real car damage photo → watch the AI pipeline analyze it → review the damage assessment with confidence breakdown → submit.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ClaimsAI Platform                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  FRONTEND — React 18 + Vite + Tailwind CSS                  │   │
│  │                                                              │   │
│  │  7 Views:                                                    │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │   │
│  │  │  Agent   │ │  Client  │ │ Sr.Review│ │  Repair  │       │   │
│  │  │Dashboard │ │  Portal  │ │  Queue   │ │   Shop   │       │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │   │
│  │  │ Manage-  │ │  Audit   │ │  Batch   │                    │   │
│  │  │  ment    │ │  Trail   │ │  Upload  │                    │   │
│  │  └──────────┘ └──────────┘ └──────────┘                    │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│                    ┌─────────▼──────────┐                           │
│                    │  /api/analyze      │                           │
│                    │  Vercel Serverless │                           │
│                    │  (Node.js, 60s)    │                           │
│                    └─────────┬──────────┘                           │
│                              │                                      │
├──────────────────────────────┼──────────────────────────────────────┤
│           5-STAGE AI PIPELINE (Claude Vision)                       │
│                              │                                      │
│  ┌────────────┐  ┌──────────▼───┐  ┌────────────┐                 │
│  │ 1. Image   │─▶│ 2. Damage   │─▶│ 3. Damage  │                 │
│  │ Preprocess │  │ Detection   │  │ Classify   │                 │
│  │ (compress) │  │ (regions)   │  │ (severity) │                 │
│  └────────────┘  └─────────────┘  └─────┬──────┘                 │
│                                          │                         │
│  ┌────────────┐  ┌─────────────┐         │                         │
│  │ 5. Route   │◀─│ 4. Cost     │◀────────┘                         │
│  │ Decision   │  │ Estimation  │                                   │
│  └──────┬─────┘  └─────────────┘                                   │
│         │                                                           │
│         ▼                                                           │
│  ┌──────────────────────────────────────┐                           │
│  │     CONFIDENCE-BASED ROUTING         │                           │
│  │  ≤ QAR 10,900 & ≥ 85% → Auto       │                           │
│  │  else → Senior Adjuster Review      │                           │
│  └──────────────────────────────────────┘                           │
│                                                                     │
│  ┌──────────────────────────────────────┐                           │
│  │        DATA FLYWHEEL                 │                           │
│  │  Agent annotations → training queue  │                           │
│  │  Repair invoices → ground truth      │                           │
│  │  Monthly retrain → accuracy ↑        │                           │
│  └──────────────────────────────────────┘                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Features

### Agent Workflow (Core)
- **Claim intake** with VIN auto-lookup for Gulf vehicles
- **Photo upload** with guided angle recommendations (clickable missing angles)
- **Multi-photo AI analysis** — sends up to 5 compressed images to Claude Vision
- **5-stage pipeline trace** — real-time progress: preprocess → detect → classify → estimate → confidence
- **Interactive damage annotation** — confirm ✓, reject ✗, or pin new regions directly on the image
- **Confidence explainability** — breakdown of why the AI scored what it did (image clarity, region consensus, pattern match, DB coverage)
- **Routing decision transparency** — shows the exact threshold math for auto-approve vs senior review
- **Safety & fraud checks** — EXIF metadata, geolocation match (Doha, Qatar), duplicate detection, manipulation analysis
- **Comparable past claims** — AI accuracy benchmarked against similar vehicles
- **Agent override tracking** — every correction enters the training pipeline with delta

### Stakeholder Views
| View | Persona | Key Features |
|------|---------|-------------|
| **Agent Dashboard** | Claims Agent | Claim queue, model health, eval metrics, canary deployment status |
| **Client Portal** | Policyholder | Step-by-step claim status tracker with timestamps |
| **Sr. Review Queue** | Senior Adjuster | Approve / Reject / Request More Info with full AI context |
| **Repair Shop Portal** | Repair Center | Supplemental damage workflow, final invoice upload (closes data loop) |
| **Management Dashboard** | Leadership | ROI trends (QAR 1.5M+ saved), agent performance, regional breakdown |
| **Audit Trail** | QCB/SAMA Compliance | Timestamped immutable log, color-coded by actor, Export PDF |
| **Batch Upload** | Agent | Bulk photo upload for multiple angles |

### Gulf / Qatar Localization
- 🌐 Arabic-first RTL interface with English toggle (Globe button)
- 💰 QAR currency with Arabic numeral support (ر.ق)
- 📅 Hijri calendar dates alongside Gregorian
- 🇶🇦 Gulf vehicle fleet: Land Cruiser, Patrol, Lexus LX, Mercedes G, Range Rover
- 👤 Arabic patronymic names: "محمد بن أحمد آل ثاني"
- 🔒 Qatar Data Privacy Law & Saudi PDPL compliance
- 🏛️ QCB/SAMA regulatory audit export

### Model Operations
- **Model versioning** — v2.3 production + v2.4 canary (10% traffic)
- **Accuracy by vehicle class** — stratified eval on 547-claim golden set
- **Operational metrics** — override rate (12% ↓), auto-approve (63%), calibration error (3.2%)
- **Training queue** — 47 agent corrections pending next retrain (July 1)
- **Error state handling** — graceful fallback to demo assessment when AI unavailable

---

## Prototype vs Production

| Feature | Prototype | Production |
|---------|-----------|------------|
| Damage detection | Claude Vision (general-purpose) | Fine-tuned YOLOv8 on labeled Gulf vehicle damage |
| Bounding boxes | Simulated SVG overlays | Real model output with pixel-level coordinates |
| Cost estimation | AI-generated estimates | CCC ONE / Mitchell API with regional Gulf rates |
| DB references | Simulated codes | Real repair operation codes from estimating databases |
| Pipeline trace | Animated timers (800ms/stage) | Real inference latency from each stage |
| Confidence score | Model-generated or mock | Calibrated ensemble uncertainty |
| Photo quality | Angle count heuristic | CV-based blur/exposure/resolution analysis |
| Fraud checks | Static "all pass" display | Real EXIF parsing, reverse image search, geolocation API |
| Training pipeline | Counter + animation | Real annotation queue → labeling platform → retrain |
| Dashboard stats | Hardcoded demo data | Live database queries |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Anthropic API key ([console.anthropic.com](https://console.anthropic.com))

### Run Locally

```bash
git clone https://github.com/hyhossein/claims-ai.git
cd claims-ai
npm install
npm run dev
```

Opens at `http://localhost:3000`. Without an API key, the AI falls back to demo data.

### Deploy to Vercel

1. Push to GitHub
2. Import in [vercel.com](https://vercel.com)
3. Add environment variable: `ANTHROPIC_API_KEY`
4. Deploy — live in 60 seconds

---

## Project Structure

```
claims-ai/
├── api/
│   └── analyze.js           # Vercel serverless → Claude Vision proxy (60s timeout)
├── src/
│   ├── App.jsx               # All views and components (605 lines)
│   ├── main.jsx              # React entry
│   └── index.css             # Tailwind
├── ClaimsAI_PRD.pdf          # Product Requirements Document (2 pages)
├── vercel.json               # Deployment config
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Co-pilot, not autopilot** | AI recommends, agent decides. Every estimate is adjustable. Preserves accountability and meets QCB requirements. |
| **Interactive annotation** | Agents annotate while they work, not as a separate task. Every annotation = training data. This IS Scale AI's value proposition. |
| **Confidence-driven routing** | Configurable thresholds (QAR 10,900 / 85% confidence). Government clients set stricter defaults. |
| **Arabic-first** | Not a translation layer. Ground-up RTL with Gulf cultural patterns: patronymic names, Hijri dates, QAR currency. |
| **Pipeline transparency** | Agents see each AI stage, not a black box. Builds trust. Essential for regulatory acceptance. |
| **Repair shop feedback loop** | Final invoices vs AI estimates = ground truth training data. This closes the flywheel. |
| **Multi-stakeholder views** | Insurance isn't just the agent. Client, adjuster, repair shop, management, and compliance each need their own experience. |

---

## Scoping Decisions

The assignment is intentionally vague. Here's how I scoped it:

**Built (core agent workflow + stakeholder ecosystem):** Claim intake → photo upload with guidance → real AI analysis → interactive annotation → confidence-based routing → review/submit. Plus 6 stakeholder views showing end-to-end product thinking.

**Deferred to PRD:** Multi-photo ensemble scoring, pre-accident photo comparison, WhatsApp notifications, Najm API integration, Takaful (Sharia-compliant) product differentiation.

**Why this cut:** The assignment asks to automate "manual review → estimate → approval." Everything built maps to those three steps, with the stakeholder views showing I've thought about the full product ecosystem, not just one user's screen.

---

## Ethical Considerations

- **No autonomous decisions on high-value claims.** Claims above QAR 10,900 or below 85% confidence always require human review. Government clients can enforce stricter thresholds.
- **Bias monitoring.** Model accuracy is stratified by vehicle class, region, and damage type. Range Rover at 85% vs Land Cruiser at 96% is a visible gap that drives targeted training data collection.
- **Transparency by default.** Agents see why the AI scored what it scored (4-factor confidence breakdown), not just a number. This builds calibrated trust, not blind trust.
- **Human override always available.** Every AI estimate is adjustable. Every override is logged and feeds back into training.
- **Data sovereignty.** Gulf government deployment requires in-country data residency. No cross-border transfer without QCB/SAMA authorization.
- **Audit trail for accountability.** Every decision, human or AI, is timestamped and immutable. QCB/SAMA auditors can reconstruct the full decision chain for any claim.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| AI | Anthropic Claude Vision (Sonnet 4.6) |
| Backend | Vercel Serverless Functions (Node.js) |
| Deployment | Vercel (auto-deploy from GitHub) |
| Icons | Lucide React |
| i18n | Custom Arabic/English with RTL support |

---

## PRD

The full Product Requirements Document is included as [`ClaimsAI_PRD.pdf`](ClaimsAI_PRD.pdf) (2 pages).

Covers: Vision, Competitive Context (Tractable/CCC/Mitchell), User Stories (6 personas including Compliance Officer), RICE-prioritized Features, Success Metrics (8 KPIs), AI Architecture, Human-AI Interaction Model, Data Strategy with Gulf-specific considerations, Data Sovereignty (Qatar Data Privacy Law, Saudi PDPL), and Risk Mitigations (5 risks including Gulf vehicle class bias).

---

## Demo Video

📹 **[Watch the 3-minute Loom walkthrough →](https://www.loom.com/share/d72cee3dc5734ae7ab4efaee754c2b52)**

*Replace https://www.loom.com/share/d72cee3dc5734ae7ab4efaee754c2b52 with your recorded demo link before submitting.*

---

## Built With

This prototype was built using **Claude (Anthropic)** as the AI coding assistant and **Claude Vision (Sonnet 4.6)** as the real-time damage analysis engine, deployed on **Vercel** with serverless functions proxying to the Anthropic API. The frontend is **React 18** with **Vite** for fast builds and **Tailwind CSS** for styling, with **Lucide React** for icons and a custom Arabic/English i18n layer with full RTL support. The entire system, from concept to deployed product with real AI, was built to demonstrate how AI tools accelerate product development.

---

## License

MIT
