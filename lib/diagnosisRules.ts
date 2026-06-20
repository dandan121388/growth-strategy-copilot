import type { Diagnosis, Metrics, UserRecord } from "./types";
import { pct } from "./utils";

const confidenceForSample = (size: number): "High" | "Medium" | "Low" => size >= 100 ? "High" : size >= 30 ? "Medium" : "Low";

export function diagnoseGrowth(metrics: Metrics, users: UserRecord[]): Diagnosis {
  const findings: Diagnosis["key_findings"] = [];
  const metricConfidence = confidenceForSample(users.length);

  if (metrics.activationRate < 0.4) findings.push({
    finding: "Activation bottleneck detected",
    evidence: `Only ${pct(metrics.activationRate)} of users completed at least one course, below the configured 40% diagnostic threshold.`,
    business_interpretation: "Many users fail to reach the first measurable value event and may not form an early training habit.",
    confidence: metricConfidence,
  });
  if (metrics.paidConversionRate < 0.1) findings.push({
    finding: "Paid conversion bottleneck detected",
    evidence: `Paid conversion is ${pct(metrics.paidConversionRate)}, below the configured 10% diagnostic threshold.`,
    business_interpretation: "The current user base contains engagement that is not translating into paid membership.",
    confidence: metricConfidence,
  });
  if (metrics.retentionRate < 0.35) findings.push({
    finding: "Weak 30-day active-user signal detected",
    evidence: `The 30-day active user rate is ${pct(metrics.retentionRate)}, below the configured 35% threshold.`,
    business_interpretation: "Early retention appears weak based on current activity and completion signals; cohort month-2 retention is not available.",
    confidence: metricConfidence,
  });
  if (metrics.churnRate > 0.3) findings.push({
    finding: "High churn risk detected",
    evidence: `${pct(metrics.churnRate)} of users are marked churned, above the configured 30% risk threshold.`,
    business_interpretation: "The observed churn status is high enough to constrain LTV if it persists in production cohorts.",
    confidence: metricConfidence,
  });
  metrics.channelRetention.filter((channel) => metrics.retentionRate - channel.retention > 0.15).forEach((channel) => findings.push({
    finding: `Channel quality issue detected: ${channel.channel}`,
    evidence: `${channel.channel} 30-day active user rate is ${pct(channel.retention)}, ${((metrics.retentionRate - channel.retention) * 100).toFixed(1)} points below the overall rate.`,
    business_interpretation: "This channel has weaker downstream activity quality in the current sample; acquisition trend and spend efficiency are not evaluated.",
    confidence: confidenceForSample(channel.users),
  }));

  if (!findings.length) findings.push({
    finding: "No critical threshold breach detected",
    evidence: "All headline metrics are above configured diagnostic thresholds.",
    business_interpretation: "Improvement should focus on segment-level optimization rather than one critical bottleneck.",
    confidence: metricConfidence,
  });

  const newUsers = users.filter((user) => user.user_segment === "New");
  const newCompletion = newUsers.length ? newUsers.filter((user) => user.course_completed > 0).length / newUsers.length : 0;
  const activeUnpaid = users.filter((user) => user.sessions_per_week >= 3 && user.subscription_status === "free").length;
  const inactiveUsers = users.filter((user) => user.last_active_days_ago >= 14).length;
  const lowestChannel = metrics.channelRetention[0];
  const bottlenecks = [
    metrics.activationRate < 0.4 ? "Activation" : "",
    metrics.retentionRate < 0.35 ? "30-day active-user retention" : "",
    metrics.paidConversionRate < 0.1 ? "paid conversion" : "",
  ].filter(Boolean);
  const main = bottlenecks.length > 1 ? `${bottlenecks.slice(0, -1).join(", ")} and ${bottlenecks.at(-1)}` : bottlenecks[0] || findings[0].finding;
  const containsIndirectEvidence = true;
  const ruleLevel: Diagnosis["rule_confidence"]["level"] = users.length >= 100 && !containsIndirectEvidence ? "High" : users.length >= 30 ? "Medium" : "Low";

  return {
    main_bottleneck: main,
    key_findings: findings,
    rule_confidence: {
      level: ruleLevel,
      rationale: `${users.length} rows support direct metric rules, while root-cause interpretation includes indirect proxy signals and requires validation.`,
    },
    root_causes: [
      {
        hypothesis: "New users may lack a sufficiently structured onboarding path",
        evidence: `Only ${pct(newCompletion)} of ${newUsers.length} recent sign-ups complete a course.`,
        evidence_type: "Direct signal",
        confidence: newUsers.length >= 30 ? "High" : newUsers.length >= 10 ? "Medium" : "Low",
        what_to_validate_next: "Compare onboarding exposure, first-session course starts and day-7 completion by onboarding variant.",
      },
      {
        hypothesis: "Membership value perception may be insufficient",
        evidence: `${activeUnpaid} users are active at least 3 times per week but remain unpaid. This is an indirect signal because the current dataset does not include paywall visits or benefit-page exposure.`,
        evidence_type: "Indirect signal",
        confidence: activeUnpaid >= 10 ? "Medium" : "Low",
        what_to_validate_next: "Instrument paywall views, benefit-page exposure, trial starts and conversion by message variant.",
      },
      {
        hypothesis: "Some acquisition channels may bring users with weaker downstream activity quality",
        evidence: `${lowestChannel?.channel ?? "The lowest-volume channel"} has the lowest 30-day active user rate at ${pct(lowestChannel?.retention ?? 0)} across ${lowestChannel?.users ?? 0} users.`,
        evidence_type: "Direct signal",
        confidence: confidenceForSample(lowestChannel?.users ?? 0),
        what_to_validate_next: "Compare activation, active-user rate, paid conversion, CAC and LTV using larger channel cohorts.",
      },
      {
        hypothesis: "Re-engagement timing may be insufficient",
        evidence: `${inactiveUsers} users have been inactive for at least 14 days. This is an indirect signal because the current dataset does not include notification timing or campaign delivery logs.`,
        evidence_type: "Indirect signal",
        confidence: inactiveUsers >= 30 ? "Medium" : "Low",
        what_to_validate_next: "Join notification delivery logs to inactivity windows and compare reactivation by send timing.",
      },
    ],
  };
}
