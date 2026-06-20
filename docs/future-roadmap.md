# Future Roadmap

The roadmap keeps analytical ownership with deterministic rules while progressively adding AI communication capability and broader business coverage.

## Phase 1: Demo-ready MVP

**Status:** Complete

**Objective:** Demonstrate an end-to-end, credible growth-analysis workflow that can be run locally and explained in three to five minutes.

### Completed scope

- Professional SaaS workspace with Dashboard, Business Setup, Data Upload, Diagnosis, Segmentation, Strategy, Experiments and Report.
- One-click fitness subscription demo with 160 deterministic synthetic user records.
- CSV schema validation, data preview and basic quality checks.
- Rule-based calculation of activation, paid conversion, average completion, 30-day active-user rate, observed churn and ARPU.
- Explicit funnel denominators and metric-methodology notes.
- Evidence-backed findings and Root Cause Hypotheses with evidence types and validation steps.
- Mutually exclusive behavior segmentation with Business Setup target labels.
- Transparent strategy scoring and P0/P1/P2 Priority Matrix.
- Structured experiment plans with randomization, success criteria, sample warnings and feasibility notes.
- Executive Summary, Detailed Analysis, Presentation Outline and Markdown export.
- English and Chinese UI and report localization with browser persistence.
- Synthetic-data, causal-inference and experiment-sizing limitations displayed in the product.

### Phase 1 exit criteria

- The full sample flow runs locally without external credentials.
- Core rules have deterministic tests.
- Production build passes.
- The product can be explained from data to decision to experiment in a short interview demonstration.

## Phase 2: AI Integration

**Objective:** Improve explanation, synthesis and report quality without transferring quantitative judgment to the model.

### Planned work

- Connect a real AI API behind the existing analysis boundary.
- Send only computed metrics, structured findings, segment summaries, strategy scores and business context to the model.
- Use structured output schema for diagnosis explanations, strategy narratives, experiment wording and reports.
- Validate model responses before rendering and reject outputs that change metric values, score fields or schema structure.
- Keep metric calculation, data-quality checks, thresholds, segmentation, priority scoring and experiment guardrails rule-driven.
- Add prompt versioning, model-output evaluation cases and deterministic fallback content.
- Evaluate factual consistency, evidence attribution, uncertainty language, bilingual writing quality and report usefulness.
- Add cost, latency and failure-state monitoring before enabling AI by default.

### AI responsibility boundary

AI may:

- Explain calculated findings in clearer business language.
- Synthesize several rule outputs into a concise decision narrative.
- Adapt report wording for analyst, product or management audiences.
- Produce English or Chinese narrative while preserving defined terminology.

AI must not:

- Recalculate or redefine metrics.
- Assign users to different segments.
- Change strategy scores or priority labels.
- Present a hypothesis as confirmed causality.
- Remove limitations, source provenance or experiment guardrails.

### Phase 2 exit criteria

- Structured output validation succeeds reliably across representative cases.
- AI and fallback reports preserve identical facts and scores.
- Evaluation tests detect hallucinated metrics and causal overstatement.
- The product remains fully usable when the AI provider is unavailable.

## Phase 3: Business Expansion

**Objective:** Move from a single-case prototype toward a reusable growth decision-support platform with domain-specific data contracts.

### Industry templates

- **Content subscription platform:** content discovery, consumption depth, creator/category affinity, trial conversion and renewal.
- **SaaS platform:** workspace activation, feature adoption, seat expansion, plan conversion, renewal and account-level health.
- Define separate event schemas, funnels, diagnostic thresholds, segment rules and strategy libraries for each vertical.

### Data and analysis expansion

- Historical project tracking and versioned analysis snapshots.
- Strategy execution status and post-launch effect review.
- Cohort retention tables with signup month and period-level activity.
- Campaign exposure, delivery, spend and attribution data.
- Channel CAC, LTV and payback-period analysis.
- Benchmark datasets with source, industry, geography and confidence metadata.
- Experiment registry with exposure logs, sample-size planning and decision history.

### Product workflow expansion

- Compare analysis runs over time instead of relying on a point-in-time snapshot.
- Link recommendations to owners, milestones and experiment outcomes.
- Feed validated experiment results back into strategy confidence and future prioritization.
- Support project-level access control, comments and management review states.
- Add reusable report templates without weakening source provenance.

### Phase 3 exit criteria

- Each new industry has validated metric definitions and representative datasets.
- Historical and cohort views are backed by real time-series data.
- Strategy reviews can compare expected targets with measured outcomes.
- Benchmark use is transparent, attributable and appropriate for the selected business context.

## Roadmap principle

Expansion should follow evidence quality, not feature count. New AI capability or industry coverage is valuable only when the product can still explain where each conclusion came from, what remains uncertain and how the recommendation will be validated.
