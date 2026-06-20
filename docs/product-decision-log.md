# Product Decision Log

This document records the main product decisions behind the MVP. Each decision protects analytical credibility or keeps the prototype focused enough for a clear product demonstration.

## 1. Default to English and Support Chinese

**Decision:** English is the default interface language, with a persistent English / Chinese switch for the complete workflow and reports.

**Rationale:** English reflects common SaaS analytics terminology and makes the public project accessible to an international audience. Chinese localization supports different product contexts and demonstrates that localization includes analytical content, not only navigation labels.

**Implementation boundary:** Internal IDs, CSV fields, TypeScript types, and JSON schema keys remain English. Localization belongs to the presentation and report layers so calculations and data contracts do not diverge by language.

**Trade-off:** User-entered free text and arbitrary uploaded categorical values are not automatically translated.

## 2. Use a Fitness Subscription Platform as the First Vertical

**Decision:** Optimize the first release for a fitness subscription platform rather than present a generic multi-industry workspace.

**Rationale:** The scenario comes from prior commercial-analysis competition experience and provides a coherent set of behaviors: course starts, completion, activity frequency, subscription status, renewal, and churn risk. A concrete vertical produces more credible metrics and recommendations than shallow templates for many industries.

**Implementation boundary:** Other business types can be captured as report context, but the current metric and strategy interpretation remains fitness-oriented.

**Trade-off:** The MVP demonstrates depth in one use case rather than immediate horizontal coverage.

## 3. Use a Rule Engine Instead of Allowing AI to Diagnose Directly

**Decision:** Metrics, thresholds, segment assignment, and strategy scores are deterministic and inspectable.

**Rationale:** An open-ended model can produce plausible but unsupported conclusions, vary its reasoning between runs, or confuse metric denominators. The rule engine establishes a stable factual layer. AI can explain that layer but cannot overwrite it.

**Implementation boundary:** Metric definitions, diagnosis rules, segment hierarchy, scoring formula, guardrails, and source provenance remain rule-driven even after a real AI provider is connected.

**Trade-off:** Rule coverage is narrower and must be maintained explicitly, but the result is easier to test and audit.

## 4. Rename Root Cause Analysis to Root Cause Hypotheses

**Decision:** Present possible causes as hypotheses with evidence type, rule confidence, and a next validation step.

**Rationale:** The synthetic point-in-time dataset can reveal behavior signals but cannot establish why users behave that way. Labels such as Direct signal, Indirect signal, and Missing data prevent correlation from being presented as causal proof.

**Implementation boundary:** Each hypothesis must include observed evidence and state which additional event, exposure, or experiment data would validate it.

**Trade-off:** The wording is less dramatic than a confirmed diagnosis, but it is more credible and actionable.

## 5. Make Strategy Priority a Transparent Score

**Decision:** Calculate priority from bottleneck severity, affected segment size, goal alignment, evidence strength, and implementation effort. Similar previous attempts receive an explicit iteration penalty.

**Rationale:** A fixed strategy list would make Business Setup decorative and the Priority Matrix untrustworthy. Transparent scoring shows why one intervention should be tested before another and allows stakeholders to challenge the assumptions.

**Implementation boundary:** The score determines P0/P1/P2 labels and matrix position. Narrative text can explain the rationale but cannot change the score.

**Trade-off:** The simplified score is a prioritization aid, not an ROI forecast or financial business case.

## 6. Do Not Connect a Real AI API in the Current MVP

**Decision:** Use deterministic and mock structured output while designing a replaceable AI boundary.

**Rationale:** The main product risk is not model fluency; it is whether context, data, diagnosis, strategy, and experiments form a credible workflow. A real model would add cost, latency, credential setup, and output variance before that workflow is validated.

**Implementation boundary:** The MVP keeps a structured schema and clear responsibility split so a provider can be added later without redesigning the core analysis.

**Trade-off:** Narrative variation is limited, but demonstrations remain repeatable and do not depend on network access or API credentials.

## 7. Delay Additional Industry Templates

**Decision:** Delay content subscription and SaaS templates until their metric definitions, data requirements, and strategy rules can be designed properly.

**Rationale:** Replacing labels while reusing fitness assumptions would create superficial industry coverage and weaken credibility. Each vertical needs a defensible event model, funnel, benchmark set, and strategy library.

**Implementation boundary:** New industries belong in Phase 3 after the AI boundary, production data contracts, and evaluation approach are stable.

**Trade-off:** The product has a narrower demonstration scope today, but future templates can become genuine domain modules instead of cosmetic variants.
