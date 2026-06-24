# Growth Strategy Copilot

## 1. Project Overview

Growth Strategy Copilot is a rules-first, AI-ready business analysis workspace for subscription growth teams. It connects business context, operating data, metric diagnosis, user segmentation, strategy prioritization, experiment planning, and executive reporting in one guided workflow.

The current MVP is optimized for a synthetic fitness subscription case. It is a decision-support prototype, not a chatbot, causal inference system, or production forecasting tool.

## 2. Live Demo

**Production:** [growth-strategy-copilot.vercel.app](https://growth-strategy-copilot.vercel.app)

Select **Start Demo with Fitness Sample** to load the recommended business context and a deterministic 160-row synthetic dataset. No login, database, upload, or API key is required.

The sample data demonstrates the analysis workflow. It should not be used for production-level causal inference, retention claims, or experiment sizing.

## 3. Why I Built This

This project grew from a business analytics competition focused on growth strategy for a fitness subscription platform. The work required translating user behavior, market signals, and business problems into segment-specific recommendations and a management-ready narrative.

That experience exposed a repeatable workflow across growth analysis projects: define the business context, validate metrics, diagnose bottlenecks, segment users, prioritize strategies, design experiments, and communicate the result. Growth Strategy Copilot explores how that workflow can become an AI-assisted product.

The goal is not to let AI freely generate business conclusions. A rule engine owns metric calculation, bottleneck detection, user segmentation, and strategy scoring. The AI boundary is designed for interpretation, communication, and structured report generation. The central product question is: how can AI support business analysis without weakening analytical credibility?

## 4. Product Problem

Growth analysts and product teams often work across spreadsheets, SQL outputs, documents, and slide decks. This creates three recurring problems:

- The connection between a metric, a diagnosis, and a recommendation is difficult to audit.
- Generic AI tools can produce polished recommendations without proving that the evidence supports them.
- Strategies are often presented without a clear target segment, priority rationale, or validation plan.

Teams need decision support that is faster than a fragmented manual process and more disciplined than an open-ended AI prompt.

## 5. Product Solution

Growth Strategy Copilot separates deterministic analysis from narrative generation. It calculates defined metrics, applies visible diagnosis rules, assigns behavior-based segments, and scores bounded strategy templates before producing a report.

Every recommendation can be traced to:

- Uploaded-data metrics and threshold signals.
- Business Setup context, including the primary goal and target users.
- Affected segment size and evidence strength.
- Implementation effort and prior strategy attempts.
- A corresponding experiment with success criteria and guardrails.

Potential causes are presented as **Root Cause Hypotheses**, with evidence type, rule confidence, and a next validation step. This avoids presenting correlation as confirmed causality.

## 6. Core Workflow

```text
Business Setup
  -> Data Upload
  -> Metric Diagnosis
  -> User Segmentation
  -> Root Cause Hypotheses
  -> Strategy Prioritization
  -> Experiment Design
  -> Executive Report
```

Each stage produces structured output used by the next stage. Business Setup affects targeting and priority alignment; uploaded data determines metrics and evidence; P0/P1 strategies become experiments; the report packages the same analysis without introducing new facts.

## 7. Key Features

- Business context that influences target-segment emphasis and strategy ranking.
- CSV validation and a one-click synthetic fitness dataset.
- Explicit subscription metrics, funnel denominators, and methodology notes.
- Evidence-backed findings and Root Cause Hypotheses with validation steps.
- Six mutually exclusive behavior segments with setup-target labels.
- Five strategy templates scored by impact, confidence, and implementation effort.
- A transparent Priority Matrix with P0/P1/P2 recommendations.
- P0/P1 experiment plans with randomization units, guardrails, decision rules, and feasibility notes.
- Executive Summary, Detailed Analysis, and Presentation Outline report views.
- Markdown report export and browser-local workspace persistence.
- English / Chinese localization for the full interface and report layer.

## 8. Rule Engine vs AI Layer

| Responsibility | Rule engine | AI or narrative layer |
|---|---|---|
| Metric calculation and denominator definitions | Owns | Must preserve |
| Data-quality checks and threshold diagnosis | Owns | May explain |
| User-segment assignment | Owns | May summarize |
| Strategy impact, effort, and priority scoring | Owns | May articulate rationale |
| Evidence type and hypothesis status | Owns labels | May improve cautious wording |
| Experiment structure and guardrails | Owns minimum requirements | May tailor presentation |
| Executive and presentation narrative | Provides facts | Owns synthesis and wording |
| Output validation | Defines structured schema | Must conform |

The current release uses deterministic report generation and mock structured output. A future AI provider can improve explanation and narrative quality without taking ownership of calculated facts or decision rules.

The following should remain rule-driven:

- Metric definitions and calculations.
- Data-quality checks and diagnostic thresholds.
- Segment assignment.
- Strategy and priority scoring.
- Previous-strategy penalties.
- Experiment success criteria and guardrails.
- Source provenance and schema validation.

## 9. Demo Walkthrough

The recommended product walkthrough takes three to five minutes.

1. **Dashboard** - Select **Start Demo with Fitness Sample** and introduce the product as a structured decision-support workspace.
2. **Business Setup** - Show the preconfigured problem, target users, primary goal, and previous strategies. Explain that this context affects prioritization.
3. **Data Upload** - Confirm that 160 synthetic rows and all 16 required fields are loaded, then select **Run Diagnosis**.
4. **Diagnosis** - Lead with the main bottleneck, metric definitions, evidence-backed findings, and Root Cause Hypotheses.
5. **Segmentation** - Show how behavior rules turn aggregate signals into action groups and how setup targets affect ordering.
6. **Strategy** - Present the P0 focus, Priority Matrix, transparent score components, and previous-attempt penalty.
7. **Experiments** - Open one P0/P1 experiment and review its hypothesis, groups, metrics, guardrails, and statistical decision rule.
8. **Report** - Switch between Executive Summary, Detailed Analysis, and Presentation Outline. Emphasize that quantified lifts are test targets, not forecasts.

Use **Reset Demo** to clear browser-local workspace state and repeat the walkthrough. See [docs/screenshot-guide.md](docs/screenshot-guide.md) for project showcase capture guidance.

## 10. Video Demo

The video demo is designed to present the product as a concise portfolio case study: what problem it addresses, how the workflow operates, and how rule-based analysis connects to strategy, experiments, and reporting.

- Demo guide and scripts: [docs/video-demo-guide.md](docs/video-demo-guide.md)
- Recording checklist: [docs/video-recording-checklist.md](docs/video-recording-checklist.md)
- Suggested production URL to record: <https://growth-strategy-copilot.vercel.app>
- Recommended video length: 2-3 minutes

## 11. Bilingual Localization

Growth Strategy Copilot supports English / Chinese localization for product demos and different user contexts. The default interface is English, while Chinese mode localizes navigation, metric explanations, strategy cards, experiment design, and report output.

The selected language is stored in browser localStorage and persists after refresh. Internal strategy IDs, CSV fields, TypeScript types, and JSON schema keys remain English so that data contracts and calculations do not diverge by language.

## 12. Deployment

### Local development

Requirements: Node.js 20.9 or later and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js.

Recommended validation commands:

```bash
npm run type-check
npm run test:logic
npm run lint
npm run build
npm run start
```

### Deploy to Vercel through GitHub

1. Push the project to GitHub.
2. Open Vercel and select **Add New Project**.
3. Import the GitHub repository.
4. Confirm that the framework preset is **Next.js**.
5. Use `npm run build` as the build command.
6. Do not add environment variables for the current mock demo.
7. Deploy and verify the production URL with [docs/deployment-checklist.md](docs/deployment-checklist.md).

Vercel's default Next.js configuration is sufficient; no `vercel.json` is required.

### Deploy with the Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

`vercel` creates a preview deployment and `vercel --prod` creates a production deployment. The generated `.vercel` directory is ignored by Git and must not be committed.

### Environment variables and browser state

The current demo uses mock analysis and does not require an API key. A future server-side AI integration may use `OPENAI_API_KEY`, configured in Vercel Project Settings rather than source code.

Workspace state and language preference are stored in browser localStorage. State is browser- and device-specific and is not synchronized through Vercel, authentication, or a database. See [docs/deployment-notes.md](docs/deployment-notes.md) for details.

## 13. Limitations

- The sample is synthetic, point-in-time data and cannot establish causality.
- The 30-day Active User Rate is a recency proxy, not cohort month-two retention.
- Acquisition volume exists in the sample, but acquisition trend and media efficiency are not evaluated.
- Strategy templates are intentionally bounded and do not replace domain review.
- Experiment sizing requires production baselines, minimum detectable effect, statistical power, and traffic estimates.
- The MVP has no authentication, cloud database, project collaboration, or cross-device synchronization.
- The current release uses mock structured output rather than a real AI provider.
- Non-fitness business types are report context only in the current release.

## 14. Future Roadmap

The roadmap has three stages:

1. **Demo-ready MVP** - Complete the rules-first workflow, deterministic sample, localization, experiment plans, reports, and public deployment.
2. **AI integration** - Add a governed narrative layer with structured output validation, factual consistency checks, evaluation cases, and deterministic fallback content.
3. **Business expansion** - Add domain-specific content subscription and SaaS templates, production data contracts, cohort retention, campaign data, benchmarks, historical analysis, and strategy outcome review.

The detailed plan is available in [docs/future-roadmap.md](docs/future-roadmap.md). Key design choices are documented in [docs/product-decision-log.md](docs/product-decision-log.md).

## 15. Tech Stack

- **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS.
- **Charts:** Recharts.
- **Validation:** Zod and browser-side CSV schema checks.
- **Analysis:** Deterministic TypeScript rules for metrics, diagnosis, segmentation, strategy scoring, and experiment generation.
- **State:** React context and browser localStorage.
- **AI boundary:** Mock structured analysis endpoint with a replaceable provider interface.
- **Deployment:** Vercel.

## 16. Repository Structure

```text
app/
  api/analyze/route.ts       Mock structured analysis endpoint
  dashboard/                 Demo entry and workspace overview
  business-setup/            Business context form
  data-upload/               CSV validation and sample loader
  diagnosis/                 Metrics, funnel, and hypotheses
  segmentation/              Rule-based behavior cohorts
  strategy/                  Dynamic scoring and priority matrix
  experiments/               P0/P1 experiment plans
  report/                    Executive and presentation report views
components/
  WorkspaceProvider.tsx      Browser state, Start Demo, and Reset Demo
  FunnelChart.tsx            Explicit-denominator lifecycle funnel
  SegmentChart.tsx           Segment distribution
  StrategyCard.tsx           Collapsible strategy decision card
  PriorityMatrix.tsx         Rule-scored impact/effort visualization
  ExperimentCard.tsx         Collapsible experiment plan
  CaseStudySnapshot.tsx      Executive case-study overview
  ReportPreview.tsx          Markdown and table rendering
lib/
  sampleData.ts              Deterministic synthetic fitness dataset
  metrics.ts                 Metric and funnel calculations
  diagnosisRules.ts          Threshold rules and hypotheses
  segmentation.ts            Target-aware segment ordering
  strategyGenerator.ts       Dynamic scoring and experiment templates
  reportGenerator.ts         Executive and presentation output
  analysisEngine.ts          Analysis orchestration
  i18n.ts                    English / Chinese presentation dictionary
  types.ts                   Domain types and structured schema
docs/
  screenshot-guide.md        Project showcase capture guidance
  product-decision-log.md    Product rationale and trade-offs
  future-roadmap.md          Staged product roadmap
  deployment-checklist.md    Preview and production QA checklist
  deployment-notes.md        Runtime, state, and security notes
  video-demo-guide.md        Video script, shot list, and recording guide
  video-recording-checklist.md
                              Pre-recording and post-production checklist
```
