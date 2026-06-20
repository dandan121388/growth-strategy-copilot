import { strict as assert } from "node:assert";
import { runAnalysis } from "./analysisEngine";
import { generateSampleData } from "./sampleData";
import type { BusinessContext } from "./types";

const users = generateSampleData();
const baseContext: BusinessContext = {
  companyName: "Credibility Test", businessType: "Fitness Subscription Platform", businessModel: "Monthly Subscription",
  currentProblems: ["Weak active-user retention signals"], targetUsers: ["New users", "Churn-risk users"],
  primaryGoal: "Improve retention", previousStrategies: "",
};
const analysis = runAnalysis(baseContext, users);
const strategy = (result: typeof analysis, name: string) => result.strategies.find((item) => item.strategy_name === name)!;

assert.equal(users.length, 160);
assert.equal(analysis.metrics.totalUsers, 160);
assert.ok(analysis.metrics.activationRate < 0.4, "sample should expose activation bottleneck");
assert.ok(analysis.diagnosis.key_findings.some((finding) => finding.finding.includes("Activation")));
assert.equal(analysis.segments.reduce((sum, segment) => sum + segment.user_count, 0), users.length);
assert.equal(analysis.strategies.length, 5);
assert.ok(analysis.experiments.length >= 3);

const marketingGoal = runAnalysis({ ...baseContext, primaryGoal: "Improve marketing ROI" }, users);
assert.ok(strategy(analysis, "7-Day Beginner Training Path").impact > strategy(marketingGoal, "7-Day Beginner Training Path").impact);
assert.ok(strategy(analysis, "Churn-risk Win-back Campaign").impact > strategy(marketingGoal, "Churn-risk Win-back Campaign").impact);
assert.ok(strategy(marketingGoal, "Channel Quality Reallocation").impact > strategy(analysis, "Channel Quality Reallocation").impact);

const conversionGoal = runAnalysis({ ...baseContext, primaryGoal: "Increase paid conversion" }, users);
assert.ok(strategy(conversionGoal, "High-Potential User Premium Trial").impact > strategy(analysis, "High-Potential User Premium Trial").impact);
assert.ok(strategy(conversionGoal, "Membership Value Communication").impact > strategy(analysis, "Membership Value Communication").impact);

const targeted = runAnalysis({ ...baseContext, targetUsers: ["Price-sensitive users"] }, users);
assert.equal(targeted.segments.find((segment) => segment.segment_name === "Price-sensitive Users")?.targeted_by_setup, true);
assert.equal(strategy(targeted, "Membership Value Communication").targeted_by_setup, true);
assert.equal(targeted.strategies[0].strategy_name, "Membership Value Communication");

const attempted = runAnalysis({ ...baseContext, previousStrategies: "We already ran a premium trial offer." }, users);
assert.equal(strategy(attempted, "High-Potential User Premium Trial").already_attempted, true);
assert.equal(strategy(attempted, "High-Potential User Premium Trial").priority_score, strategy(analysis, "High-Potential User Premium Trial").priority_score - 2);

const nonFitness = runAnalysis({ ...baseContext, businessType: "SaaS Tool Platform" }, users);
assert.ok(nonFitness.report.executive_summary.includes("Current MVP is optimized for fitness subscription analysis"));

assert.ok(analysis.metrics.funnel.some((stage) => stage.name === "Retained Paid Users"));
assert.ok(!analysis.metrics.funnel.some((stage) => stage.name === "Retention"));
assert.ok(analysis.diagnosis.root_causes.every((rootCause) => rootCause.evidence_type && rootCause.what_to_validate_next));
assert.ok(analysis.experiments.every((experiment) => experiment.randomization_unit && experiment.minimum_sample_note && experiment.statistical_decision_rule));
assert.ok(analysis.report.detailed_report.includes("| 30-day active user rate |"));
assert.ok(analysis.report.executive_summary.includes("Activation: target +8% relative lift"));
assert.ok(analysis.report.presentation_outline.every((slide) => slide.core_message && slide.supporting_evidence && slide.recommended_visual));

console.log("Credibility logic checks passed", {
  activation: analysis.metrics.activationRate,
  strategies: analysis.strategies.map((item) => `${item.priority}:${item.strategy_name}:${item.priority_score}`),
  experiments: analysis.experiments.length,
});
