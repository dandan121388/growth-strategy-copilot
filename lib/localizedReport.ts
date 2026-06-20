import type { AnalysisResult, ReportContent } from "./types";
import type { Language } from "./i18n";
import { bottleneckLabel, domainLabel, experimentZh, segmentZh, strategyZh } from "./i18n";
import { money, pct } from "./utils";

const hypothesisZh: Record<string, { title: string; validate: string }> = {
  "New users may lack a sufficiently structured onboarding path": { title: "新用户可能缺少足够清晰的结构化引导路径", validate: "按引导版本比较引导曝光、首次课程启动和第 7 天课程完成表现。" },
  "Membership value perception may be insufficient": { title: "会员价值感知可能不足", validate: "补充付费页访问、权益页曝光、试用启动和不同表达版本下的转化埋点。" },
  "Some acquisition channels may bring users with weaker downstream activity quality": { title: "部分获客渠道可能带来后续活跃质量较弱的用户", validate: "在更大渠道 Cohort 中比较激活率、30 天活跃用户率、付费转化、CAC 与 LTV。" },
  "Re-engagement timing may be insufficient": { title: "再触达时机可能不足", validate: "关联通知投放日志与未活跃窗口，比较不同发送时机下的重新激活表现。" },
};

function evidenceZh(text: string) {
  let match = text.match(/^Only ([\d.]+%) of (\d+) recent sign-ups complete a course\.$/);
  if (match) return `${match[2]} 位近期注册用户中，仅 ${match[1]} 完成了课程。`;
  match = text.match(/^(\d+) users are active at least 3 times per week but remain unpaid\./);
  if (match) return `${match[1]} 位用户每周活跃至少 3 次但仍未付费。该信号属于间接证据，因为当前数据不包含付费页访问或权益页曝光。`;
  match = text.match(/^(.+) has the lowest 30-day active user rate at ([\d.]+%) across (\d+) users\.$/);
  if (match) return `${match[1]} 渠道在 ${match[3]} 位用户中的 30 天活跃用户率最低，为 ${match[2]}。`;
  match = text.match(/^(\d+) users have been inactive for at least 14 days\./);
  if (match) return `${match[1]} 位用户已连续至少 14 天未活跃。该信号属于间接证据，因为当前数据不包含通知发送时点或营销触达日志。`;
  return text;
}

export function getLocalizedReport(analysis: AnalysisResult, language: Language): ReportContent {
  if (language === "en") return analysis.report;
  const { metrics, diagnosis, project_summary: project } = analysis;
  const p0 = analysis.strategies.filter((strategy) => strategy.priority === "P0");
  const recommended = p0.length ? p0 : analysis.strategies.slice(0, 2);
  const topSegments = [...analysis.segments].sort((a, b) => b.user_count - a.user_count).slice(0, 3);
  const businessType = domainLabel(project.business_type, "zh");
  const mainBottleneck = bottleneckLabel(diagnosis.main_bottleneck, "zh");
  const executive = `# 管理层摘要

**业务背景**  
当前案例为${businessType}，业务配置中的首要目标为${domainLabel(project.primary_goal, "zh")}，关注问题包括：${project.main_problem.split(", ").map((problem) => domainLabel(problem, "zh")).join("、")}。

**数据范围**  
当前分析基于 ${metrics.totalUsers} 条合成用户记录。数据包含样例获客量，但不评估获客趋势；30 天活跃用户率属于活跃时效代理指标，不等同于月度 Cohort 留存。

**主要增长瓶颈**  
规则结果显示，当前重点为${mainBottleneck}。规则置信度为${domainLabel(diagnosis.rule_confidence.level, "zh")}，相关根因仍属于待验证假设。

**关键证据**  
- 激活率：${pct(metrics.activationRate)}
- 付费转化率：${pct(metrics.paidConversionRate)}
- 30 天活跃用户率：${pct(metrics.retentionRate)}
- 已观测流失率：${pct(metrics.churnRate)}
- ARPU：${money(metrics.arpu)}

**P0 策略**  
${recommended.map((strategy) => `- ${strategy.priority} · ${strategyZh[strategy.strategy_name]?.name ?? strategy.strategy_name}（优先级得分 ${strategy.priority_score}）：${strategyZh[strategy.strategy_name]?.action ?? strategy.action_plan}`).join("\n")}

**实验下一步**  
建议先确认埋点和生产样本要求，再按优先级推进 ${analysis.experiments.length} 项 P0/P1 实验。所有实验均需在核心指标达到目标相对提升且护栏指标未受损时，才进入下一阶段。

**限制说明**  
样例数据为合成的点时数据，仅用于演示分析工作流，不应作为生产级因果推断、获客趋势判断、月度留存判断或实验样本量测算的依据。`;

  const detailed = `# 增长策略分析 — ${project.project_name === "Fitness Subscription Growth Diagnosis" ? "健身订阅增长诊断" : project.project_name}

## 1. 业务配置背景
- 业务类型：${businessType}
- 首要目标：${domainLabel(project.primary_goal, "zh")}
- 业务问题：${project.main_problem.split(", ").map((problem) => domainLabel(problem, "zh")).join("、")}

## 2. 数据范围与方法
- 当前数据包含 ${metrics.totalUsers} 条合成用户记录。
- 激活率 = 至少完成 1 门课程的用户 / 总用户。
- 付费转化率 = 付费用户 / 总用户。
- 30 天活跃用户率 = 距上次活跃不超过 30 天的用户 / 总用户；该指标不等同于月度 Cohort 留存。
- 当前数据不评估获客趋势，也不支持生产级因果推断或实验样本量测算。

## 3. 核心指标概览
| 指标 | 结果 | 来源 |
|---|---:|---|
| 用户总数 | ${metrics.totalUsers} | 上传数据 |
| 激活率 | ${pct(metrics.activationRate)} | 上传数据 |
| 付费转化率 | ${pct(metrics.paidConversionRate)} | 上传数据 |
| 平均课程完成率 | ${pct(metrics.averageCompletionRate)} | 上传数据 |
| 30 天活跃用户率 | ${pct(metrics.retentionRate)} | 上传数据 |
| 已观测流失率 | ${pct(metrics.churnRate)} | 上传数据 |
| ARPU | ${money(metrics.arpu)} | 上传数据 |

## 4. 增长漏斗诊断
${metrics.funnel.map((stage) => `- ${domainLabel(stage.name, "zh")} / 总用户：${pct(stage.value)}（${stage.count} 位用户）`).join("\n")}

## 5. 用户分层
${topSegments.map((segment) => `- **${segmentZh[segment.segment_name]?.name ?? segment.segment_name}（${segment.user_count}）**：${segmentZh[segment.segment_name]?.behavior ?? segment.key_behavior}。建议方向：${segmentZh[segment.segment_name]?.direction ?? segment.recommended_direction}。${segment.targeted_by_setup ? "该人群已在业务配置中选中。" : ""}`).join("\n")}

## 6. 根因假设
${diagnosis.root_causes.map((rootCause) => `### ${hypothesisZh[rootCause.hypothesis]?.title ?? rootCause.hypothesis}\n- 证据：${evidenceZh(rootCause.evidence)}\n- 证据类型：${domainLabel(rootCause.evidence_type, "zh")}\n- 置信度：${domainLabel(rootCause.confidence, "zh")}\n- 下一步验证：${hypothesisZh[rootCause.hypothesis]?.validate ?? rootCause.what_to_validate_next}`).join("\n\n")}

## 7. 策略建议
${analysis.strategies.map((strategy) => `### ${strategy.priority} · ${strategyZh[strategy.strategy_name]?.name ?? strategy.strategy_name}\n${strategyZh[strategy.strategy_name]?.action ?? strategy.action_plan}\n\n- 目标人群：${domainLabel(strategy.target_segment, "zh")}${strategy.targeted_by_setup ? " · 业务配置已选中" : ""}\n- 评分：业务影响 ${strategy.impact}、置信度 ${strategy.confidence_score}、执行难度 ${strategy.effort}、优先级 ${strategy.priority_score}\n- 说明：优先级得分由瓶颈严重度、受影响人群规模、目标一致性、证据强度与执行难度共同决定。${strategy.already_attempted ? "业务配置显示已尝试类似策略，建议迭代而非直接重复上线。" : ""}`).join("\n\n")}

## 8. 实验计划
${analysis.experiments.map((experiment) => { const copy = experimentZh[experiment.experiment_name]; return `### ${copy?.name ?? experiment.experiment_name}\n- 实验假设：${copy?.hypothesis ?? experiment.hypothesis}\n- 随机分组单位：${copy?.randomization ?? experiment.randomization_unit}\n- 成功标准：${copy?.success ?? experiment.success_criteria}\n- 统计决策规则：核心指标达到目标相对提升、达到预设统计标准，且护栏指标未受损时，方可继续推进。\n- 可行性说明：${copy?.feasibility ?? experiment.feasibility_note}`; }).join("\n\n")}

## 9. 限制与下一步
- 所有提升幅度均为实验目标，不是结果预测。
- 根因结论属于假设，需要通过补充埋点和实验进一步验证。
- 生产实验需基于真实基线、MDE、统计功效和流量重新计算样本量。`;

  return {
    executive_summary: executive,
    detailed_report: detailed,
    presentation_outline: [
      { slide_title: "第 1 页：业务问题", core_message: "当前样例显示早期激活、付费转化和流失风险信号需要优先关注。", supporting_evidence: `${project.main_problem.split(", ").map((problem) => domainLabel(problem, "zh")).join("、")}；当前数据不评估获客趋势。`, recommended_visual: "业务问题与数据来源说明" },
      { slide_title: "第 2 页：核心指标概览", core_message: "激活率、付费转化率和 30 天活跃用户率低于当前配置阈值。", supporting_evidence: `激活率 ${pct(metrics.activationRate)}，付费转化率 ${pct(metrics.paidConversionRate)}，30 天活跃用户率 ${pct(metrics.retentionRate)}，已观测流失率 ${pct(metrics.churnRate)}。`, recommended_visual: "带阈值标记的核心指标卡" },
      { slide_title: "第 3 页：增长漏斗诊断", core_message: `主要规则瓶颈为${mainBottleneck}。`, supporting_evidence: `激活率为 ${pct(metrics.activationRate)}，留存付费用户占总用户 ${pct(metrics.funnel.find((stage) => stage.name === "Retained Paid Users")?.value ?? 0)}。`, recommended_visual: "标注分母口径和瓶颈位置的漏斗图" },
      { slide_title: "第 4 页：用户分层", core_message: "不同人群对应激活、转化和召回三类主要机会。", supporting_evidence: topSegments.map((segment) => `${segmentZh[segment.segment_name]?.name ?? segment.segment_name} ${segment.user_count} 人`).join("；"), recommended_visual: "用户分层分布图与目标人群标签" },
      { slide_title: "第 5 页：根因假设", core_message: "行为数据支持瓶颈信号，但价值感知和再触达时机仍需进一步验证。", supporting_evidence: diagnosis.root_causes.map((rootCause) => `${hypothesisZh[rootCause.hypothesis]?.title ?? rootCause.hypothesis}（${domainLabel(rootCause.evidence_type, "zh")}）`).join("；"), recommended_visual: "包含证据类型、置信度和验证动作的假设表" },
      { slide_title: "第 6 页：策略路线图", core_message: "策略优先级综合业务目标、受影响人群、证据强度与执行难度。", supporting_evidence: recommended.map((strategy) => `${strategy.priority} ${strategyZh[strategy.strategy_name]?.name ?? strategy.strategy_name}：${strategy.priority_score} 分`).join("；"), recommended_visual: "业务影响—执行难度优先级矩阵" },
      { slide_title: "第 7 页：实验计划", core_message: `${analysis.experiments.length} 项 P0/P1 策略已转化为包含护栏和可行性说明的实验方案。`, supporting_evidence: analysis.experiments.map((experiment) => experimentZh[experiment.experiment_name]?.name ?? experiment.experiment_name).join("；"), recommended_visual: "包含随机分组单位和决策规则的实验路线图" },
      { slide_title: "第 8 页：目标影响与下一步", core_message: "先验证目标相对提升，再决定是否扩大投入；当前目标不是预测。", supporting_evidence: "激活率 +8%、付费转化 +5%、风险用户重新激活 +6%、渠道 LTV/CAC +10% 的相对目标。", recommended_visual: "目标指标表与分阶段行动计划" },
    ],
  };
}

export function localizedReportToMarkdown(report: ReportContent, language: Language = "en") {
  const labels = language === "zh"
    ? { outline: "汇报大纲", core: "核心信息", evidence: "支持证据", visual: "建议图表" }
    : { outline: "Presentation Outline", core: "Core message", evidence: "Supporting evidence", visual: "Recommended visual" };
  const slides = report.presentation_outline.map((slide) => `## ${slide.slide_title}\n- ${labels.core}: ${slide.core_message}\n- ${labels.evidence}: ${slide.supporting_evidence}\n- ${labels.visual}: ${slide.recommended_visual}`).join("\n\n");
  return `${report.executive_summary}\n\n---\n\n${report.detailed_report}\n\n---\n\n# ${labels.outline}\n\n${slides}`;
}
