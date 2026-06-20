# Screenshot Guide

This guide defines a consistent screenshot set for a portfolio case study, interview deck or project page. The objective is to show the product's reasoning workflow, not to document every screen.

## Capture setup

- Use a 1440 × 900 or 1512 × 982 browser viewport so the layout resembles a 13-inch laptop presentation.
- Start with **Reset Demo**, then select **Start Demo with Fitness Sample** and run the sample diagnosis.
- Keep browser zoom at 100% and hide bookmarks, personal extensions and unrelated tabs.
- Capture the English workflow first. Use a separate final image to demonstrate Chinese localization.
- Do not crop out the sidebar or project header unless the screenshot specifically focuses on a detailed card.
- Keep synthetic-data notices visible where they provide important context.
- Use PNG for interface screenshots. Avoid adding annotations inside the product; place callouts in the portfolio layout instead.

## Recommended screenshots

### 1. `dashboard-overview.png`

**Page:** Dashboard

**Show:**

- Product positioning statement and subtitle.
- **Start Demo with Fitness Sample** button.
- Four project summary cards.
- Analysis pipeline from Business Setup to Report.

**Capture note:** Take the screenshot before running diagnosis so the sample entry point and guided workflow are visible. Keep the first viewport uncluttered.

**Portfolio caption:** “A guided business-analysis workspace that connects context, data, diagnosis, strategy and reporting.”

### 2. `diagnosis-bottleneck.png`

**Page:** Diagnosis

**Show:**

- Highlighted main bottleneck banner.
- Core metric cards, especially Activation Rate, Paid Conversion and 30-day Active User Rate.
- Lifecycle funnel and at least one evidence-backed finding.
- Root Cause Hypotheses heading if it fits without making the text unreadable.

**Capture note:** This is the most important analytical screenshot. Preserve metric definitions and the synthetic-sample notice where possible.

**Portfolio caption:** “Rules calculate metrics and threshold signals before any narrative recommendation is produced.”

### 3. `segmentation-overview.png`

**Page:** Segmentation

**Show:**

- Segment distribution chart and legend.
- Largest opportunity group.
- At least one **Targeted by setup** label.
- The first rows of the segment playbook.

**Capture note:** Make segment names, counts and recommended directions readable. Avoid a crop containing only the chart.

**Portfolio caption:** “Mutually exclusive behavior segments convert aggregate signals into action groups.”

### 4. `strategy-priority-matrix.png`

**Page:** Strategy

**Show:**

- P0 decision-focus strip.
- Priority summary cards.
- Full Priority Matrix, legend and scoring-method note.
- The heading of the first P0 strategy card if space allows.

**Capture note:** Hover over a matrix point only if the tooltip remains legible and does not obscure other strategies. A clean matrix is preferable for the portfolio page.

**Portfolio caption:** “Strategy priority is calculated from business impact, evidence confidence and implementation effort.”

### 5. `experiment-design.png`

**Page:** Experiments

**Show:**

- One complete experiment card.
- Hypothesis, eligible users, control group and treatment group.
- Primary metrics and success criteria.
- Expand execution details to include Randomization Unit, Minimum Sample Note and Statistical Decision Rule.

**Capture note:** Crop around one experiment rather than showing several unreadable cards. Keep the experiment name and source strategy visible.

**Portfolio caption:** “P0/P1 recommendations are translated into falsifiable tests with guardrails and decision rules.”

### 6. `report-executive-summary.png`

**Page:** Report

**Show:**

- Case Study Snapshot.
- Executive Summary tab.
- Report coverage and decision-focus sidebar.
- Copy and Export Markdown actions.

**Capture note:** Use a viewport that shows the summary structure without requiring the reader to inspect long paragraphs. A second crop of the Presentation Outline is optional, not required.

**Portfolio caption:** “The management report reuses computed facts and clearly separates data evidence from business context.”

### 7. `chinese-localization.png`

**Page:** Prefer Diagnosis, Strategy or Report

**Show:**

- Sidebar with **中文** selected.
- Chinese page title, field labels and analytical explanation.
- At least one translated strategy, experiment or report section.
- English abbreviations such as ARPU, LTV/CAC or P0 where professionally appropriate.

**Capture note:** Diagnosis is the strongest single-page localization proof because it combines UI labels, metric methodology and dynamic evidence. Report is a good alternative if the portfolio emphasizes communication.

**Portfolio caption:** “The presentation and report layers support professional Chinese output while internal schemas and rule IDs remain stable.”

## Screenshot naming convention

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

For revisions, add a date or version only outside the final portfolio export, for example `diagnosis-bottleneck-v2.png`. Do not use names such as `Screenshot 2026-06-19.png` in the repository or portfolio source.

## Recommended portfolio layout order

1. **Hero:** `dashboard-overview.png` with a one-sentence product proposition.
2. **Problem and approach:** A short workflow diagram or text summary; no additional screenshot required.
3. **Credible diagnosis:** `diagnosis-bottleneck.png` as the largest analytical image.
4. **From insight to audience:** `segmentation-overview.png`.
5. **From audience to decision:** `strategy-priority-matrix.png`.
6. **From decision to validation:** `experiment-design.png`.
7. **Management communication:** `report-executive-summary.png`.
8. **Localization and implementation quality:** `chinese-localization.png`.
9. **Limitations and roadmap:** Text summary linked to the decision log and roadmap.

Use one clear message per image. The portfolio narrative should move from evidence to decision to validation, matching the product workflow.
