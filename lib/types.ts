import { z } from "zod";

export type BusinessType =
  | "Fitness Subscription Platform"
  | "Content Subscription Platform"
  | "Online Education Platform"
  | "SaaS Tool Platform"
  | "Membership E-commerce Platform";

export interface BusinessContext {
  companyName: string;
  businessType: BusinessType;
  businessModel: string;
  currentProblems: string[];
  targetUsers: string[];
  primaryGoal: string;
  previousStrategies: string;
}

export interface UserRecord {
  user_id: string;
  signup_date: string;
  user_segment: string;
  acquisition_channel: string;
  subscription_status: "free" | "paid";
  plan_type: string;
  sessions_per_week: number;
  course_started: number;
  course_completed: number;
  completion_rate: number;
  last_active_days_ago: number;
  payment_amount: number;
  renewal_status: string;
  churn_status: "active" | "risk" | "churned";
  campaign_exposure: number;
  coupon_used: boolean;
}

export interface Metrics {
  totalUsers: number;
  activationRate: number;
  paidConversionRate: number;
  averageCompletionRate: number;
  retentionRate: number;
  churnRate: number;
  arpu: number;
  funnel: { name: string; value: number; count: number }[];
  channelRetention: { channel: string; retention: number; users: number }[];
}

export interface Finding {
  finding: string;
  evidence: string;
  business_interpretation: string;
  confidence: "High" | "Medium" | "Low";
}

export type EvidenceType = "Direct signal" | "Indirect signal" | "Missing data";

export interface RootCauseHypothesis {
  hypothesis: string;
  evidence: string;
  evidence_type: EvidenceType;
  confidence: "High" | "Medium" | "Low";
  what_to_validate_next: string;
}

export interface Diagnosis {
  main_bottleneck: string;
  key_findings: Finding[];
  root_causes: RootCauseHypothesis[];
  rule_confidence: {
    level: "High" | "Medium" | "Low";
    rationale: string;
  };
}

export interface SegmentSummary {
  segment_name: string;
  user_count: number;
  key_behavior: string;
  main_problem: string;
  recommended_direction: string;
  targeted_by_setup: boolean;
}

export interface Strategy {
  strategy_name: string;
  target_segment: string;
  problem_solved: string;
  action_plan: string;
  expected_metrics: string[];
  difficulty: string;
  time_to_impact: string;
  risk: string;
  priority: "P0" | "P1" | "P2";
  impact: number;
  effort: number;
  confidence_score: number;
  priority_score: number;
  triggered_by: string[];
  priority_rationale: string;
  targeted_by_setup: boolean;
  already_attempted: boolean;
  attempt_note?: string;
}

export interface Experiment {
  experiment_name: string;
  strategy_name: string;
  hypothesis: string;
  target_users: string;
  control_group: string;
  treatment_group: string;
  primary_metrics: string[];
  secondary_metrics: string[];
  duration: string;
  success_criteria: string;
  potential_risk: string;
  randomization_unit: string;
  minimum_sample_note: string;
  statistical_decision_rule: string;
  feasibility_note: string;
}

export interface PresentationSlide {
  slide_title: string;
  core_message: string;
  supporting_evidence: string;
  recommended_visual: string;
}

export interface ReportContent {
  executive_summary: string;
  detailed_report: string;
  presentation_outline: PresentationSlide[];
}

export interface AnalysisResult {
  project_summary: {
    project_name: string;
    business_type: string;
    main_problem: string;
    primary_goal: string;
  };
  metrics: Metrics;
  diagnosis: Diagnosis;
  segments: SegmentSummary[];
  strategies: Strategy[];
  experiments: Experiment[];
  report: ReportContent;
}

const findingSchema = z.object({
  finding: z.string(), evidence: z.string(), business_interpretation: z.string(),
  confidence: z.enum(["High", "Medium", "Low"]),
});

export const aiAnalysisSchema = z.object({
  project_summary: z.object({
    project_name: z.string(), business_type: z.string(), main_problem: z.string(), primary_goal: z.string(),
  }),
  diagnosis: z.object({
    main_bottleneck: z.string(), key_findings: z.array(findingSchema),
    root_causes: z.array(z.object({
      hypothesis: z.string(), evidence: z.string(), evidence_type: z.enum(["Direct signal", "Indirect signal", "Missing data"]),
      confidence: z.enum(["High", "Medium", "Low"]), what_to_validate_next: z.string(),
    })),
    rule_confidence: z.object({ level: z.enum(["High", "Medium", "Low"]), rationale: z.string() }),
  }),
  segments: z.array(z.object({
    segment_name: z.string(), user_count: z.number(), key_behavior: z.string(), main_problem: z.string(), recommended_direction: z.string(), targeted_by_setup: z.boolean(),
  })),
  strategies: z.array(z.object({
    strategy_name: z.string(), target_segment: z.string(), problem_solved: z.string(), action_plan: z.string(),
    expected_metrics: z.array(z.string()), difficulty: z.string(), time_to_impact: z.string(), risk: z.string(), priority: z.enum(["P0", "P1", "P2"]),
    impact: z.number(), effort: z.number(), confidence_score: z.number(), priority_score: z.number(), triggered_by: z.array(z.string()),
    priority_rationale: z.string(), targeted_by_setup: z.boolean(), already_attempted: z.boolean(), attempt_note: z.string().optional(),
  })),
  experiments: z.array(z.object({
    experiment_name: z.string(), strategy_name: z.string(), hypothesis: z.string(), target_users: z.string(), control_group: z.string(),
    treatment_group: z.string(), primary_metrics: z.array(z.string()), secondary_metrics: z.array(z.string()), duration: z.string(),
    success_criteria: z.string(), potential_risk: z.string(), randomization_unit: z.string(), minimum_sample_note: z.string(),
    statistical_decision_rule: z.string(), feasibility_note: z.string(),
  })),
  report: z.object({ executive_summary: z.string(), detailed_report: z.string(), presentation_outline: z.array(z.object({
    slide_title: z.string(), core_message: z.string(), supporting_evidence: z.string(), recommended_visual: z.string(),
  })) }),
});
