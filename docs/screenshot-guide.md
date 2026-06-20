# Screenshot Guide

This guide defines a consistent screenshot set for a portfolio case study or public project page. The objective is to communicate the product's reasoning workflow rather than document every screen.

## Capture Setup

- Use a 1440 x 900 or 1512 x 982 browser viewport so the workspace resembles a 13-inch laptop presentation.
- Select **Reset Demo**, then **Start Demo with Fitness Sample**, and run the sample diagnosis.
- Keep browser zoom at 100% and hide bookmarks, personal extensions, and unrelated tabs.
- Capture the English workflow first. Use one separate image to demonstrate Chinese localization.
- Keep the sidebar and project header visible unless a screenshot intentionally focuses on one detailed card.
- Preserve synthetic-data notices when they provide important analytical context.
- Use PNG for interface screenshots. Add annotations in the surrounding case-study layout, not inside the product.

## Recommended Screenshots

### 1. `dashboard-overview.png`

**Page:** Dashboard

**Show:**

- Product positioning statement and subtitle.
- **Start Demo with Fitness Sample** action.
- Four project summary cards.
- Analysis pipeline from Business Setup to Report.

**Capture note:** Capture the initial state so that the sample entry point and guided workflow are visible.

**Suggested caption:** A guided business analysis workspace that connects context, data, diagnosis, strategy, and reporting.

### 2. `diagnosis-bottleneck.png`

**Page:** Diagnosis

**Show:**

- Highlighted main bottleneck.
- Activation Rate, Paid Conversion, and 30-day Active User Rate cards.
- Lifecycle funnel and at least one evidence-backed finding.
- Root Cause Hypotheses heading when space allows.

**Capture note:** Preserve metric definitions and the synthetic-sample notice where possible. This is the primary analytical screenshot.

**Suggested caption:** Rules calculate metrics and threshold signals before any narrative recommendation is produced.

### 3. `segmentation-overview.png`

**Page:** Segmentation

**Show:**

- Segment distribution chart and legend.
- Largest opportunity group.
- At least one **Targeted by setup** label.
- The first rows of the segment playbook.

**Capture note:** Keep segment names, counts, and recommended directions readable. Avoid a chart-only crop.

**Suggested caption:** Mutually exclusive behavior segments convert aggregate signals into action groups.

### 4. `strategy-priority-matrix.png`

**Page:** Strategy

**Show:**

- P0 decision-focus strip.
- Priority summary cards.
- Full Priority Matrix, legend, and scoring note.
- The first P0 strategy heading when space allows.

**Capture note:** Use a clean matrix view. Include a tooltip only if it remains legible and does not obscure other strategies.

**Suggested caption:** Strategy priority is calculated from business impact, evidence confidence, and implementation effort.

### 5. `experiment-design.png`

**Page:** Experiments

**Show:**

- One complete experiment card.
- Hypothesis, eligible users, control group, and treatment group.
- Primary metrics and success criteria.
- Expanded Randomization Unit, Minimum Sample Note, and Statistical Decision Rule.

**Capture note:** Focus on one experiment rather than several unreadable cards. Keep the source strategy visible.

**Suggested caption:** P0/P1 recommendations become falsifiable tests with guardrails and decision rules.

### 6. `report-executive-summary.png`

**Page:** Report

**Show:**

- Case Study Snapshot.
- Executive Summary view.
- Report coverage and decision-focus sidebar.
- Copy and Export Markdown actions.

**Capture note:** Use a viewport that communicates the summary structure without requiring the reader to inspect long paragraphs.

**Suggested caption:** The executive report reuses computed facts and separates uploaded-data evidence from business context.

### 7. `chinese-localization.png`

**Page:** Diagnosis, Strategy, or Report

**Show:**

- Sidebar with Chinese mode selected.
- Localized page title, field labels, and analytical explanation.
- At least one localized strategy, experiment, or report section.
- Stable analytical abbreviations such as ARPU, LTV/CAC, and P0 where appropriate.

**Capture note:** Diagnosis provides strong localization evidence because it combines navigation, metric methodology, and dynamic findings. Report is a suitable alternative when the case study emphasizes communication.

**Suggested caption:** The interface and report layers support professional Chinese output while internal schemas and rule IDs remain stable.

## Screenshot Naming Convention

Use lowercase kebab-case and keep the recommended names unchanged:

```text
dashboard-overview.png
diagnosis-bottleneck.png
segmentation-overview.png
strategy-priority-matrix.png
experiment-design.png
report-executive-summary.png
chinese-localization.png
```

For working revisions, append a version outside the final export, such as `diagnosis-bottleneck-v2.png`. Avoid operating-system-generated screenshot names in the repository.

## Recommended Project Showcase Order

1. **Product overview:** `dashboard-overview.png` with a one-sentence product proposition.
2. **Problem and approach:** A short workflow diagram or text summary.
3. **Credible diagnosis:** `diagnosis-bottleneck.png` as the primary analytical image.
4. **From insight to audience:** `segmentation-overview.png`.
5. **From audience to decision:** `strategy-priority-matrix.png`.
6. **From decision to validation:** `experiment-design.png`.
7. **Executive communication:** `report-executive-summary.png`.
8. **Localization quality:** `chinese-localization.png`.
9. **Limitations and roadmap:** A concise summary linked to the decision log and roadmap.

Use one clear message per image. The narrative should move from evidence to decision to validation, matching the product workflow.
