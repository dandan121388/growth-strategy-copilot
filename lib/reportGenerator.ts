import type { AnalysisResult, BusinessContext, Diagnosis, Experiment, Metrics, ReportContent, SegmentSummary, Strategy } from "./types";
import { money, pct } from "./utils";

interface Inputs { context: BusinessContext; metrics: Metrics; diagnosis: Diagnosis; segments: SegmentSummary[]; strategies: Strategy[]; experiments: Experiment[] }

export const FITNESS_SCOPE_NOTE = "Current MVP is optimized for fitness subscription analysis. Other business types are currently used as report context only.";
export const ACQUISITION_SCOPE_NOTE = "Acquisition volume is available, but acquisition trend is not evaluated in the current dataset.";

export function generateReport({ context, metrics, diagnosis, segments, strategies, experiments }: Inputs): ReportContent {
  const p0 = strategies.filter((strategy) => strategy.priority === "P0");
  const recommended = p0.length ? p0 : strategies.slice(0, 2);
  const topSegments = [...segments].sort((a, b) => b.user_count - a.user_count).slice(0, 3);
  const scopeNote = context.businessType === "Fitness Subscription Platform" ? "" : `\n\n**MVP scope note**  \n${FITNESS_SCOPE_NOTE}`;
  const executive = `# Executive Summary${scopeNote}

**Business setup context**  
Stated problem: ${context.currentProblems.join(", ")}. Primary goal: ${context.primaryGoal}. Target users: ${context.targetUsers.join(", ")}.

**Uploaded-data scope**  
${ACQUISITION_SCOPE_NOTE} Early retention appears weak based on current activity and completion signals; cohort month-2 retention is not measured.

**Key findings from uploaded data**  
Activation is ${pct(metrics.activationRate)}, paid conversion is ${pct(metrics.paidConversionRate)}, 30-day active user rate is ${pct(metrics.retentionRate)}, and observed churn is ${pct(metrics.churnRate)}. ARPU is ${money(metrics.arpu)}.

**Main rule-based bottleneck**  
${diagnosis.main_bottleneck}. Rule confidence: ${diagnosis.rule_confidence.level} — ${diagnosis.rule_confidence.rationale}

**Recommended priority strategies**  
${recommended.map((strategy) => `- ${strategy.priority} · ${strategy.strategy_name} (priority score ${strategy.priority_score}): ${strategy.action_plan}`).join("\n")}

**Quantified test targets — not forecasts**  
- Activation: target +8% relative lift
- Paid conversion: target +5% relative lift
- Churn-risk reactivation: target +6% relative lift
- Channel efficiency: target +10% LTV/CAC improvement

**Next steps**  
Validate root-cause hypotheses, confirm production sample requirements, then sequence ${experiments.length} P0/P1 experiments using the stated guardrails.

**Limitations**  
The sample data is synthetic and point-in-time. It should not be used for production causal inference, acquisition-trend claims, cohort month-2 retention claims or experiment sizing.`;

  const detailed = `# Growth Strategy Analysis — ${context.companyName}

## 1. Business Setup Context
- Business type: ${context.businessType}
- Business model: ${context.businessModel}
- Stated problems: ${context.currentProblems.join(", ")}
- Primary goal: ${context.primaryGoal}
- Target users: ${context.targetUsers.join(", ")}
- Previous strategies attempted: ${context.previousStrategies || "Not provided"}
${context.businessType === "Fitness Subscription Platform" ? "" : `- MVP scope: ${FITNESS_SCOPE_NOTE}`}

## 2. Uploaded Data and Methodology
- ${ACQUISITION_SCOPE_NOTE}
- Activation = users completing at least one course / total users.
- Paid conversion = paid users / total users.
- 30-day active user rate = users active within 30 days / total users; this is not cohort month-2 retention.
- Churn rate = users marked churned / total users.
- ARPU = total payment amount / total users.

## 3. Key Metrics Overview
| Metric | Result | Source |
|---|---:|---|
| Total users | ${metrics.totalUsers} | Uploaded data |
| Activation rate | ${pct(metrics.activationRate)} | Uploaded data |
| Paid conversion | ${pct(metrics.paidConversionRate)} | Uploaded data |
| Average completion | ${pct(metrics.averageCompletionRate)} | Uploaded data |
| 30-day active user rate | ${pct(metrics.retentionRate)} | Uploaded data |
| Observed churn rate | ${pct(metrics.churnRate)} | Uploaded data |
| ARPU | ${money(metrics.arpu)} | Uploaded data |

## 4. Growth Funnel Diagnosis
${metrics.funnel.map((stage) => `- ${stage.name} / total users: ${pct(stage.value)} (${stage.count} users)`).join("\n")}

## 5. User Segmentation
${topSegments.map((segment) => `- **${segment.segment_name} (${segment.user_count})** — ${segment.key_behavior}. Direction: ${segment.recommended_direction}.${segment.targeted_by_setup ? " Targeted by business setup." : ""}`).join("\n")}

## 6. Root Cause Hypotheses
${diagnosis.root_causes.map((rootCause) => `### ${rootCause.hypothesis}\n- Evidence: ${rootCause.evidence}\n- Evidence type: ${rootCause.evidence_type}\n- Confidence: ${rootCause.confidence}\n- Validate next: ${rootCause.what_to_validate_next}`).join("\n\n")}

## 7. Strategy Recommendations
${strategies.map((strategy) => `### ${strategy.priority} · ${strategy.strategy_name}\n${strategy.action_plan}\n\n- Triggered by: ${strategy.triggered_by.join("; ")}\n- Target: ${strategy.target_segment}${strategy.targeted_by_setup ? " · Targeted by setup" : ""}\n- Scores: impact ${strategy.impact}, confidence ${strategy.confidence_score}, effort ${strategy.effort}, priority ${strategy.priority_score}\n- Rationale: ${strategy.priority_rationale}${strategy.attempt_note ? `\n- Prior attempt: ${strategy.attempt_note}` : ""}`).join("\n\n")}

## 8. Priority Method
Priority score = impact score + confidence score - effort score - attempted-strategy penalty. Impact uses bottleneck severity, affected segment size and primary-goal alignment. Confidence uses evidence strength and sample support.

## 9. Experiment Plan
${experiments.map((experiment) => `### ${experiment.experiment_name}\n- Hypothesis: ${experiment.hypothesis}\n- Randomization unit: ${experiment.randomization_unit}\n- Success criteria: ${experiment.success_criteria}\n- Statistical decision rule: ${experiment.statistical_decision_rule}\n- Feasibility: ${experiment.feasibility_note}`).join("\n\n")}

## 10. Quantified Test Targets, Next Steps and Product Limitations
- Activation: +8% relative lift
- Paid conversion: +5% relative lift
- Churn-risk reactivation: +6% relative lift
- Channel efficiency: +10% LTV/CAC improvement

These are experiment targets, not guaranteed forecasts. Confirm instrumentation, sample size and guardrails before launch.

- Product limitation: synthetic point-in-time data.
- Product limitation: no production causal inference or experiment sizing.
- Product limitation: no acquisition trend or cohort month-2 retention measurement.`;

  return {
    executive_summary: executive,
    detailed_report: detailed,
    presentation_outline: [
      {
        slide_title: "Slide 1: Business Problem",
        core_message: "Current activity, activation and monetization signals indicate multiple lifecycle constraints.",
        supporting_evidence: `${context.currentProblems.join(", ")} from business setup; ${ACQUISITION_SCOPE_NOTE}`,
        recommended_visual: "Problem statement with data-vs-context source legend",
      },
      {
        slide_title: "Slide 2: Key Metrics Overview",
        core_message: "Activation, paid conversion and 30-day active-user rate are below configured diagnostic thresholds.",
        supporting_evidence: `${pct(metrics.activationRate)} activation, ${pct(metrics.paidConversionRate)} paid conversion, ${pct(metrics.retentionRate)} 30-day active user rate and ${pct(metrics.churnRate)} observed churn.`,
        recommended_visual: "KPI scorecards with threshold markers",
      },
      {
        slide_title: "Slide 3: Growth Funnel Diagnosis",
        core_message: `The main rule-based bottleneck is ${diagnosis.main_bottleneck}.`,
        supporting_evidence: `Activation is ${pct(metrics.activationRate)}; retained paid users represent ${pct(metrics.funnel.find((stage) => stage.name === "Retained Paid Users")?.value ?? 0)} of total users.`,
        recommended_visual: "Funnel chart with explicit denominator labels and bottleneck markers",
      },
      {
        slide_title: "Slide 4: User Segmentation",
        core_message: "Behavior segments reveal distinct activation, conversion and reactivation opportunities.",
        supporting_evidence: topSegments.map((segment) => `${segment.segment_name}: ${segment.user_count}`).join("; "),
        recommended_visual: "Segment distribution chart plus targeted-by-setup tags",
      },
      {
        slide_title: "Slide 5: Root Cause Hypotheses",
        core_message: "Direct data signals support the bottlenecks, while value perception and re-engagement timing remain hypotheses.",
        supporting_evidence: diagnosis.root_causes.map((rootCause) => `${rootCause.hypothesis} (${rootCause.evidence_type}, ${rootCause.confidence})`).join("; "),
        recommended_visual: "Hypothesis table with evidence type and validation step",
      },
      {
        slide_title: "Slide 6: Strategy Roadmap",
        core_message: `Priority reflects the ${context.primaryGoal} goal, affected segment size, evidence and implementation effort.`,
        supporting_evidence: recommended.map((strategy) => `${strategy.priority} ${strategy.strategy_name}: score ${strategy.priority_score}`).join("; "),
        recommended_visual: "Impact-effort matrix with score rationale callouts",
      },
      {
        slide_title: "Slide 7: Experiment Plan",
        core_message: `${experiments.length} P0/P1 strategies have testable hypotheses, guardrails and feasibility notes.`,
        supporting_evidence: experiments.map((experiment) => `${experiment.experiment_name}: ${experiment.success_criteria}`).join("; "),
        recommended_visual: "Experiment roadmap with randomization unit and decision rule",
      },
      {
        slide_title: "Slide 8: Expected Impact and Next Steps",
        core_message: "Validate relative-lift targets before scaling; the targets are not forecasts.",
        supporting_evidence: "Activation +8%, paid conversion +5%, churn-risk reactivation +6%, channel LTV/CAC +10% relative targets.",
        recommended_visual: "Target metric table and phased next-step timeline",
      },
    ],
  };
}

export function toMarkdown(result: AnalysisResult) {
  const slides = result.report.presentation_outline.map((slide) => `## ${slide.slide_title}\n- Core message: ${slide.core_message}\n- Supporting evidence: ${slide.supporting_evidence}\n- Recommended visual: ${slide.recommended_visual}`).join("\n\n");
  return `${result.report.executive_summary}\n\n---\n\n${result.report.detailed_report}\n\n---\n\n# Presentation Outline\n\n${slides}`;
}
