import type { AnalysisResult, BusinessContext, UserRecord } from "./types";
import { calculateMetrics } from "./metrics";
import { diagnoseGrowth } from "./diagnosisRules";
import { segmentUsers } from "./segmentation";
import { generateExperiments, generateStrategies } from "./strategyGenerator";
import { generateReport } from "./reportGenerator";

export function runAnalysis(context: BusinessContext, users: UserRecord[]): AnalysisResult {
  const metrics = calculateMetrics(users);
  const diagnosis = diagnoseGrowth(metrics, users);
  const segments = segmentUsers(users, context.targetUsers);
  const strategies = generateStrategies(context, diagnosis, segments, metrics);
  const experiments = generateExperiments(strategies);
  const report = generateReport({ context, metrics, diagnosis, segments, strategies, experiments });
  return {
    project_summary: {
      project_name: context.companyName, business_type: context.businessType,
      main_problem: context.currentProblems.join(", "), primary_goal: context.primaryGoal,
    }, metrics, diagnosis, segments, strategies, experiments, report,
  };
}
