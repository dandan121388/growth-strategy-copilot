import type { BusinessContext, Diagnosis, EvidenceType, Experiment, Metrics, SegmentSummary, Strategy } from "./types";
import { isSegmentTargeted } from "./segmentation";

interface StrategyTemplate {
  strategy_name: string;
  target_segment: string;
  problem_solved: string;
  action_plan: string;
  expected_metrics: string[];
  difficulty: string;
  time_to_impact: string;
  risk: string;
  finding_terms: string[];
  aligned_problems: string[];
  aligned_goals: string[];
  attempt_terms: string[];
  engineering_complexity: number;
  operational_dependency: number;
  evidence_type: EvidenceType;
}

const templates: StrategyTemplate[] = [
  {
    strategy_name: "7-Day Beginner Training Path", target_segment: "New Users",
    problem_solved: "Low activation and weak first-week habit formation",
    action_plan: "Launch a structured 7-day lightweight training plan with daily short-course recommendations, completion cues and visible progress feedback.",
    expected_metrics: ["First-week completion rate", "30-day active user rate", "Paid conversion"], difficulty: "Medium", time_to_impact: "2–4 weeks",
    risk: "Over-guided onboarding may reduce exploration freedom",
    finding_terms: ["Activation bottleneck", "30-day active-user"], aligned_problems: ["Low activation rate", "Weak active-user retention signals", "Weak user engagement"], aligned_goals: ["Increase activation", "Improve retention"],
    attempt_terms: ["7-day", "beginner path", "onboarding", "training path"], engineering_complexity: 2, operational_dependency: 2, evidence_type: "Direct signal",
  },
  {
    strategy_name: "High-Potential User Premium Trial", target_segment: "High-potential Users",
    problem_solved: "Active users do not convert to paid plans",
    action_plan: "Offer a 3-day premium trial to active unpaid users and explain personalized membership value before trial expiration.",
    expected_metrics: ["Paid conversion rate", "Trial-to-paid conversion", "ARPU"], difficulty: "Low to Medium", time_to_impact: "1–3 weeks",
    risk: "Excessive trials may weaken price perception",
    finding_terms: ["Paid conversion bottleneck"], aligned_problems: ["Low paid conversion"], aligned_goals: ["Increase paid conversion", "Improve LTV"],
    attempt_terms: ["premium trial", "free trial", "3-day trial", "trial offer"], engineering_complexity: 2, operational_dependency: 1, evidence_type: "Direct signal",
  },
  {
    strategy_name: "Churn-risk Win-back Campaign", target_segment: "Churn-risk Users",
    problem_solved: "Weak recent activity and renewal intention",
    action_plan: "Trigger personalized short-course recommendations and limited-time benefits based on each user’s previous training behavior.",
    expected_metrics: ["Reactivation rate", "Renewal rate", "Churn reduction"], difficulty: "Medium", time_to_impact: "2–4 weeks",
    risk: "Irrelevant messages may increase user fatigue",
    finding_terms: ["High churn risk", "30-day active-user"], aligned_problems: ["High churn rate", "Weak active-user retention signals", "Weak user engagement"], aligned_goals: ["Improve retention", "Reduce churn"],
    attempt_terms: ["win-back", "winback", "reactivation", "re-engagement", "churn campaign"], engineering_complexity: 2, operational_dependency: 2, evidence_type: "Direct signal",
  },
  {
    strategy_name: "Channel Quality Reallocation", target_segment: "Users from low-active-rate channels",
    problem_solved: "Some acquisition channels show weaker downstream user quality",
    action_plan: "Reduce budget allocation to channels with weak downstream activity and test higher-intent acquisition sources using LTV/CAC guardrails.",
    expected_metrics: ["Retained-user CAC", "30-day active user rate by channel", "LTV/CAC"], difficulty: "Medium", time_to_impact: "4–6 weeks",
    risk: "Short-term new user volume may decline",
    finding_terms: ["Channel quality issue"], aligned_problems: ["Low campaign ROI", "User growth slowdown"], aligned_goals: ["Improve marketing ROI"],
    attempt_terms: ["channel reallocation", "media mix", "budget reallocation", "acquisition budget"], engineering_complexity: 2, operational_dependency: 3, evidence_type: "Direct signal",
  },
  {
    strategy_name: "Membership Value Communication", target_segment: "Price-sensitive Users",
    problem_solved: "Engaged or price-sensitive users do not convert",
    action_plan: "Test paywall and membership-benefit messaging around personalized value, progress tracking, exclusive plans and concrete outcomes.",
    expected_metrics: ["Paid page conversion", "Membership trial starts", "ARPU"], difficulty: "Medium", time_to_impact: "2–4 weeks",
    risk: "Poor messaging may not change willingness to pay",
    finding_terms: ["Paid conversion bottleneck"], aligned_problems: ["Low paid conversion"], aligned_goals: ["Increase paid conversion", "Improve LTV"],
    attempt_terms: ["paywall", "membership value", "benefit page", "pricing message", "value communication", "discount campaign"], engineering_complexity: 2, operational_dependency: 2, evidence_type: "Indirect signal",
  },
];

const segmentSizeScore = (count: number, total: number) => {
  const share = total ? count / total : 0;
  return share >= 0.25 ? 3 : share >= 0.1 ? 2 : count > 0 ? 1 : 0;
};

const priorityFromScore = (score: number): Strategy["priority"] => score >= 7 ? "P0" : score >= 5 ? "P1" : "P2";

export function generateStrategies(context: BusinessContext, diagnosis: Diagnosis, segments: SegmentSummary[], metrics: Metrics): Strategy[] {
  const attemptedText = context.previousStrategies.toLowerCase();
  return templates.map((template) => {
    const triggeredFindings = diagnosis.key_findings.filter((finding) => template.finding_terms.some((term) => finding.finding.includes(term)));
    const matchedProblems = context.currentProblems.filter((problem) => template.aligned_problems.includes(problem));
    const segment = segments.find((item) => item.segment_name === template.target_segment);
    const affectedCount = template.strategy_name === "Channel Quality Reallocation"
      ? metrics.channelRetention.filter((channel) => metrics.retentionRate - channel.retention > 0.15).reduce((sum, channel) => sum + channel.users, 0)
      : segment?.user_count ?? 0;
    const bottleneckSeverity = triggeredFindings.length ? 3 : 1;
    const affectedSegmentSize = segmentSizeScore(affectedCount, metrics.totalUsers);
    const goalAlignment = template.aligned_goals.includes(context.primaryGoal) ? 2 : 0;
    const impact = Math.min(10, bottleneckSeverity + affectedSegmentSize + goalAlignment);
    const findingConfidence = triggeredFindings.some((finding) => finding.confidence === "High") ? 3 : triggeredFindings.length ? 2 : 1;
    const evidenceStrength = template.evidence_type === "Indirect signal" ? Math.min(2, findingConfidence) : findingConfidence;
    const sampleSupport = metrics.totalUsers >= 100 && affectedCount >= 10 ? 2 : affectedCount >= 5 ? 1 : 0;
    const confidenceScore = Math.min(5, evidenceStrength + sampleSupport);
    const effort = template.engineering_complexity + template.operational_dependency;
    const alreadyAttempted = Boolean(attemptedText.trim()) && template.attempt_terms.some((term) => attemptedText.includes(term));
    const attemptPenalty = alreadyAttempted ? 2 : 0;
    const priorityScore = Math.max(0, Math.min(10, impact + confidenceScore - effort - attemptPenalty));
    const targetedBySetup = isSegmentTargeted(template.target_segment, context.targetUsers);
    const triggeredBy = [
      ...(triggeredFindings.length ? triggeredFindings.map((finding) => finding.finding) : [`Segment opportunity: ${template.target_segment}`]),
      ...matchedProblems.map((problem) => `Business setup problem: ${problem}`),
    ];
    const rationale = `Impact ${impact} = severity ${bottleneckSeverity} + segment size ${affectedSegmentSize} + goal alignment ${goalAlignment}; confidence ${confidenceScore}; effort ${effort}${matchedProblems.length ? `; setup context confirms ${matchedProblems.join(", ")}` : ""}${alreadyAttempted ? "; attempted-strategy penalty −2" : ""}.`;

    return {
      strategy_name: template.strategy_name, target_segment: template.target_segment, problem_solved: template.problem_solved,
      action_plan: template.action_plan, expected_metrics: template.expected_metrics, difficulty: template.difficulty,
      time_to_impact: template.time_to_impact, risk: template.risk, priority: priorityFromScore(priorityScore),
      impact, effort, confidence_score: confidenceScore, priority_score: priorityScore, triggered_by: triggeredBy,
      priority_rationale: rationale, targeted_by_setup: targetedBySetup, already_attempted: alreadyAttempted,
      attempt_note: alreadyAttempted ? "Needs iteration rather than first launch; setup indicates a similar approach was already attempted." : undefined,
    };
  }).sort((a, b) => Number(b.targeted_by_setup) - Number(a.targeted_by_setup) || b.priority_score - a.priority_score || b.impact - a.impact);
}

const minimumSampleNote = "The current 160-row sample is for diagnosis demonstration only. A production experiment requires a larger sample sized from baseline rate, MDE and statistical power before launch.";

export function generateExperiments(strategies: Strategy[]): Experiment[] {
  const sharedDecisionRule = "Proceed only if the treatment improves the primary metric by the target relative lift, reaches the pre-agreed statistical threshold, and does not harm guardrail metrics.";
  const experiments: Record<string, Omit<Experiment, "strategy_name">> = {
    "7-Day Beginner Training Path": {
      experiment_name: "7-Day Beginner Path A/B Test", hypothesis: "A structured beginner path will increase first-week course completion and 30-day active-user rate.", target_users: "Newly registered users",
      control_group: "Existing homepage recommendation flow", treatment_group: "Personalized 7-day beginner training path",
      primary_metrics: ["First-week course completion rate", "30-day active user rate"], secondary_metrics: ["First course start rate", "Average session duration", "Paid conversion rate"],
      duration: "2–4 weeks", success_criteria: "Completion improves by ≥8% relative and 30-day active-user rate improves by ≥5% relative, with no decline in session duration.",
      potential_risk: "Too much guidance may reduce user autonomy", randomization_unit: "User-level randomization at eligible sign-up",
      minimum_sample_note: minimumSampleNote, statistical_decision_rule: sharedDecisionRule,
      feasibility_note: "Feasible if course starts, completion, activity recency and conversion are consistently tracked.",
    },
    "High-Potential User Premium Trial": {
      experiment_name: "Contextual Premium Trial A/B Test", hypothesis: "A behavior-triggered 3-day premium trial will convert active unpaid users more efficiently than a generic paywall.", target_users: "Unpaid users with 3+ weekly sessions",
      control_group: "Standard membership paywall", treatment_group: "Personalized trial offer with value recap and expiry reminder",
      primary_metrics: ["Trial-to-paid conversion", "Paid conversion rate"], secondary_metrics: ["Trial activation", "ARPU", "Refund rate"],
      duration: "3 weeks", success_criteria: "Paid conversion improves by ≥5% relative without increasing refunds by more than 1 percentage point.",
      potential_risk: "Trial availability may weaken full-price perception", randomization_unit: "User-level randomization when eligibility criteria are first met",
      minimum_sample_note: minimumSampleNote, statistical_decision_rule: sharedDecisionRule,
      feasibility_note: "Feasible if trial eligibility, paywall exposure, payment and refund events are available.",
    },
    "Churn-risk Win-back Campaign": {
      experiment_name: "Behavioral Win-back A/B Test", hypothesis: "A personalized return prompt based on prior course behavior will reactivate at-risk users better than a generic reminder.", target_users: "Users inactive for 14–30 days who have not already churned",
      control_group: "Generic return reminder", treatment_group: "Personalized short-course recommendation plus progress reminder",
      primary_metrics: ["7-day reactivation rate", "30-day retained reactivation"], secondary_metrics: ["Course start rate", "Message opt-out rate", "Renewal rate"],
      duration: "4 weeks", success_criteria: "Reactivation improves by ≥6% relative and opt-out rate remains below 2%.",
      potential_risk: "Poor recommendation relevance can create message fatigue", randomization_unit: "User-level randomization at entry to the inactivity window",
      minimum_sample_note: minimumSampleNote, statistical_decision_rule: sharedDecisionRule,
      feasibility_note: "Feasible after notification delivery logs and reactivation events are joined to user activity.",
    },
    "Channel Quality Reallocation": {
      experiment_name: "High-Intent Channel Mix Test", hypothesis: "Shifting a controlled share of spend toward higher-intent channels will improve retained-user acquisition efficiency.", target_users: "New prospects in comparable acquisition cohorts",
      control_group: "Current channel budget mix", treatment_group: "20% spend reallocated from lowest-active-rate channels to higher-intent sources",
      primary_metrics: ["30-day retained-user CAC", "Activation by channel"], secondary_metrics: ["Signup volume", "Paid conversion", "Projected LTV/CAC"],
      duration: "4–6 weeks", success_criteria: "Projected LTV/CAC improves by ≥10% while qualified signup volume remains within 15% of control.",
      potential_risk: "Short-term top-of-funnel volume may fall", randomization_unit: "Matched channel-market or geo cohort; not user-level randomization",
      minimum_sample_note: minimumSampleNote, statistical_decision_rule: sharedDecisionRule,
      feasibility_note: "Conditionally feasible; requires channel spend, campaign attribution and comparable market cohorts, which are not present in the sample dataset.",
    },
    "Membership Value Communication": {
      experiment_name: "Membership Value Message A/B Test", hypothesis: "Outcome-led membership messaging will improve paid-page conversion among price-sensitive users.", target_users: "Price-sensitive unpaid users who reach a membership surface",
      control_group: "Existing membership benefits message", treatment_group: "Personalized outcome, progress and exclusive-plan message",
      primary_metrics: ["Paid page conversion", "Membership trial starts"], secondary_metrics: ["ARPU", "Paywall exit rate", "Refund rate"],
      duration: "2–4 weeks", success_criteria: "Paid page conversion improves by ≥5% relative without increasing refund rate.",
      potential_risk: "Message changes may not address underlying willingness to pay", randomization_unit: "User-level randomization on first eligible paywall view",
      minimum_sample_note: minimumSampleNote, statistical_decision_rule: sharedDecisionRule,
      feasibility_note: "Not launch-ready until paywall views and benefit-page exposure are instrumented.",
    },
  };
  return strategies.filter((strategy) => strategy.priority !== "P2").map((strategy) => ({ strategy_name: strategy.strategy_name, ...experiments[strategy.strategy_name] }));
}
