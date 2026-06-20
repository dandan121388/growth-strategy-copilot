export type Language = "en" | "zh";
type TranslationTree = { [key: string]: string | TranslationTree };

export const translations: Record<Language, TranslationTree> = {
  en: {
    common: {
      productName: "Growth Strategy Copilot", english: "English", chinese: "中文", export: "Export", loadData: "Load data",
      analysisReady: "Analysis ready", setupInProgress: "Setup in progress", complete: "Complete", pending: "Pending", nextStep: "Next step",
      targeted: "Targeted by setup", attempted: "Already attempted", users: "users", high: "High", medium: "Medium", low: "Low",
      sampleTitle: "Synthetic sample notice.", sampleNotice: "Sample data is synthetic and used to demonstrate the analysis workflow. It should not be used for production-level causal inference or experiment sizing.",
    },
    sidebar: {
      dashboard: "Dashboard", businessSetup: "Business Setup", dataUpload: "Data Upload", diagnosis: "Diagnosis", segmentation: "Segmentation",
      strategy: "Strategy", experiments: "Experiments", report: "Report", engine: "Analysis engine", ruleBased: "Rule-based diagnosis", structured: "Structured AI-ready output",
    },
    shell: {
      dashboard: "Workspace Overview", businessSetup: "Business Context Setup", dataUpload: "Data Workspace", diagnosis: "Metric Diagnosis",
      segmentation: "User Segmentation", strategy: "Strategy Recommendations", experiments: "Experiment Design", report: "Executive Report",
    },
    dashboard: {
      eyebrow: "Growth decision-support workspace", title: "Diagnose growth signals. Prioritize what to test next.",
      description: "A rules-first workspace that connects operating data, user segments, strategy scoring and experiment planning—without relying on a chat interface.",
      reset: "Reset Demo", start: "Start Demo with Fitness Sample", path: "Recommended 3–5 minute path: setup → sample data → diagnosis → decision plan",
      currentProject: "Current Project", businessType: "Business Type", bottleneck: "Main Growth Bottleneck", p0: "Recommended P0 Strategy",
      activeWorkspace: "Active workspace", pendingDiagnosis: "Pending diagnosis", runSample: "Run sample analysis to identify", notPrioritized: "Not yet prioritized",
      afterDiagnosis: "Generated after diagnosis", scored: "Rule-scored · test-ready", pipeline: "Analysis pipeline", pipelineTitle: "From context to executive decision",
      sampleProblem: "Early retention appears weak based on current activity and completion signals. Acquisition trend is not evaluated.", problem: "Problem:", ready: "Ready for analysis",
      principles: "Workspace principles", principle1: "Metrics before narrative", principle2: "Segment-specific strategies", principle3: "Experiments with success criteria",
    },
    businessSetup: {
      eyebrow: "Step 01 · Business setup", title: "Define the decision context", description: "Capture the business model, observed problems and target outcomes. This context guides interpretation—not metric calculation.",
      demoTitle: "Demo-ready setup.", demoText: "Recommended fitness context and the synthetic sample dataset are already loaded. Review the assumptions, then continue.",
      company: "Company / Project Name", businessType: "Business Type", businessModel: "Business Model", currentProblem: "Current Business Problem", selectAll: "Select all that apply",
      targetUsers: "Target Users", primaryGoal: "Primary Goal", previous: "Previous strategies attempted", previousPlaceholder: "Summarize prior onboarding, pricing or campaign tests",
      local: "Context is stored locally in this browser.", save: "Save & Continue",
    },
    dataUpload: {
      eyebrow: "Step 02 · Data upload", title: "Connect operating data", description: "Upload a user-level CSV or load the curated fitness dataset. The schema is validated before diagnosis.",
      upload: "Upload CSV", uploadText: "Bring a user-level export using the documented 16-field schema.", choose: "Choose file →", sample: "Use Sample Fitness Dataset", recommended: "Recommended",
      sampleText: "160 deterministic synthetic records with activation, conversion, churn and channel-quality signals.", load: "Load instantly →", parsing: "Parsing and validating dataset…",
      rows: "Rows loaded", records: "Records available", fields: "Detected fields", schema: "Required schema complete", missing: "Missing values", noGaps: "No gaps detected",
      quality: "Data quality", ready: "Ready", checks: "Basic checks passed", preview: "Data Preview", run: "Run Diagnosis", showing: "Showing {shown} of {total} rows · {fields} detected fields",
    },
    diagnosis: {
      eyebrow: "Step 03 · Diagnosis", title: "Diagnose the growth system", description: "The engine computes exact metrics first, then translates threshold breaches into evidence-backed decision signals.",
      viewSegments: "View Segmentation", focus: "Decision focus · Main bottleneck", notCause: "Rule-based prioritization signal from the current synthetic sample—not a confirmed causal conclusion.",
      evidenceSignals: "{count} evidence signals", ruleConfidence: "Rule confidence: {level}", totalUsers: "Total Users", activation: "Activation Rate", paidConversion: "Paid Conversion",
      avgCompletion: "Avg. Completion", active30: "30-day Active User Rate", churn: "Observed Churn Rate", arpu: "ARPU", loaded: "Loaded user records",
      activationNote: "Completed ≥1 course / total", paidNote: "Paid users / total", completionNote: "Average completed / started", activeNote: "Active ≤30 days ago / total",
      churnNote: "Marked churned / total", arpuNote: "Payment amount / total", lifecycle: "Lifecycle funnel", funnelTitle: "Progressive funnel / total users", denominator: "Explicit denominator",
      bottleneckDiagnosis: "Bottleneck diagnosis", hypotheses: "Root Cause Hypotheses", hypothesisSubtitle: "Evidence strength and next validation step", hypothesis: "Hypothesis", evidence: "Evidence",
      evidenceType: "Evidence Type", confidence: "Confidence", validateNext: "What to validate next", methodology: "Metric definitions and methodology",
      methodologyText: "Activation uses course completion. Paid conversion uses subscription status. The 30-day Active User Rate is a recency proxy, not cohort month-2 retention. Funnel stages are progressive subsets divided by total users. Acquisition volume is available, but acquisition trend is not evaluated.",
    },
    segmentation: {
      eyebrow: "Step 04 · Segmentation", title: "Translate behavior into action groups", description: "A mutually exclusive rule hierarchy converts activity, payment, recency and price sensitivity into strategy-ready cohorts.",
      generate: "Generate Strategy", distribution: "Segment distribution", base: "User base by primary behavior", largest: "Largest opportunity group", observed: "Observed behavior",
      direction: "Recommended direction", playbook: "Segment playbook", subtitle: "Behavior, problem and strategic direction", segment: "Segment", userCount: "Users", behavior: "Key behavior", problem: "Main problem",
      assignment: "Assignment priority:", assignmentText: "churn-risk → high-value → high-potential → price-sensitive → new → light. This prevents double-counting while preserving the most actionable signal.", targetShort: "TARGET",
    },
    strategy: {
      eyebrow: "Step 05 · Strategy", title: "Prioritize growth interventions", description: "Five strategy templates are scored against current findings, target segments, goal alignment, evidence and implementation effort.",
      design: "Design Experiments", p0Focus: "P0 decision focus", startWith: "Start with {count} highest-priority tests", p0First: "P0 · Test first", p1Next: "P1 · Sequence next", p2Later: "P2 · Revisit later",
      p0Note: "Highest current rule score", p1Note: "Validate after P0 instrumentation", p2Note: "Lower current evidence or fit", matrix: "Strategy Priority Matrix", matrixTitle: "Business Impact vs. Implementation Effort",
      hover: "Hover for scores", scoring: "Scoring method:", scoringText: "Priority is calculated from bottleneck severity, affected segment size, goal alignment, evidence strength, sample support and implementation effort. A similar previous strategy applies a transparent −2 iteration penalty.",
      priorityScore: "Priority score", problemSolved: "Problem solved", action: "Recommended action", impact: "Impact", confidence: "Confidence", effort: "Effort", priority: "Priority",
      details: "View evidence & delivery details", triggered: "Triggered by", rationale: "Priority rationale", difficulty: "difficulty", impactMetrics: "Impact metrics", risk: "Risk",
    },
    experiments: {
      eyebrow: "Step 06 · Experiments", title: "Turn strategy into evidence", description: "P0 and P1 strategies are translated into target cohorts, treatment definitions, metrics and explicit decision thresholds.",
      report: "Build Executive Report", ready: "Experiments ready", coverage: "Covering every P0 and P1 strategy", cadence: "Recommended cadence", weekly: "Weekly", review: "Leading-indicator review",
      guardrails: "Guardrails included", guardrailText: "Retention, opt-out, refund and volume checks", experiment: "Experiment", from: "From", eligible: "Eligible users", hypothesis: "Hypothesis",
      control: "Control group", treatment: "Treatment group", primary: "Primary metrics", success: "Success criteria", details: "View execution & statistical details", randomization: "Randomization Unit",
      feasibility: "Feasibility Note", minimum: "Minimum Sample Note", decision: "Statistical Decision Rule", secondary: "Secondary metrics", risk: "Risk",
    },
    report: {
      eyebrow: "Step 07 · Executive report", title: "Package the decision narrative", description: "Switch between a management summary, detailed analysis and an eight-slide presentation outline.",
      copy: "Copy view", copied: "Copied", export: "Export Markdown", executive: "Executive Summary", detailed: "Detailed Analysis", presentation: "Presentation Outline",
      caseStudy: "Case study snapshot", interviewReady: "Interview-ready", caseTitle: "Fitness Subscription Growth Diagnosis", caseDescription: "The synthetic dataset contains sample acquisition volume and shows weak early activation, low paid conversion and high churn-risk signals. It supports workflow demonstration, not production causal claims.",
      coverage: "Report coverage", context: "Business setup context", metrics: "Uploaded-data metrics", segments: "User segmentation", hypotheses: "Root cause hypotheses", scoring: "Strategy scoring", plan: "Experiment plan",
      decisionFocus: "Decision focus", p0Text: "Start with {count} P0 interventions and preserve pre-agreed guardrails.", provenance: "Source provenance", provenanceText: "Metrics and findings come from uploaded data. Stated problems, goals, target users and prior attempts come from Business Setup. Strategy priorities combine both through transparent rules.",
      coreMessage: "Core message", supportingEvidence: "Supporting evidence", recommendedVisual: "Recommended visual",
    },
  },
  zh: {
    common: {
      productName: "增长策略 Copilot", english: "English", chinese: "中文", export: "导出", loadData: "加载数据",
      analysisReady: "分析已完成", setupInProgress: "配置进行中", complete: "已完成", pending: "待处理", nextStep: "下一步",
      targeted: "业务配置已选中", attempted: "已尝试类似策略", users: "位用户", high: "高", medium: "中", low: "低",
      sampleTitle: "合成样例说明。", sampleNotice: "样例数据为合成数据，仅用于演示分析流程，不应作为生产级因果推断或实验样本量测算的依据。",
    },
    sidebar: {
      dashboard: "工作台", businessSetup: "业务配置", dataUpload: "数据导入", diagnosis: "指标诊断", segmentation: "用户分层",
      strategy: "策略建议", experiments: "实验设计", report: "分析报告", engine: "分析引擎", ruleBased: "规则驱动诊断", structured: "结构化 AI 就绪输出",
    },
    shell: {
      dashboard: "工作台概览", businessSetup: "业务背景配置", dataUpload: "数据工作区", diagnosis: "指标诊断",
      segmentation: "用户分层", strategy: "策略建议", experiments: "实验设计", report: "管理层报告",
    },
    dashboard: {
      eyebrow: "增长决策支持工作台", title: "识别增长信号，明确下一步验证重点", description: "以规则为基础，串联运营数据、用户分层、策略评分与实验规划，不依赖聊天式交互。",
      reset: "重置演示", start: "使用健身样例开始演示", path: "建议 3–5 分钟演示路径：业务配置 → 样例数据 → 指标诊断 → 决策方案",
      currentProject: "当前项目", businessType: "业务类型", bottleneck: "主要增长瓶颈", p0: "建议优先验证的 P0 策略",
      activeWorkspace: "当前工作区", pendingDiagnosis: "等待诊断", runSample: "运行样例分析后识别", notPrioritized: "尚未确定优先级",
      afterDiagnosis: "诊断完成后生成", scored: "规则评分 · 可进入验证", pipeline: "分析流程", pipelineTitle: "从业务背景到管理决策",
      sampleProblem: "当前活跃度与课程完成信号显示早期留存偏弱；现有数据不评估获客趋势。", problem: "问题：", ready: "可开始分析",
      principles: "工作台原则", principle1: "先指标，后叙事", principle2: "面向分层制定策略", principle3: "用成功标准约束实验",
    },
    businessSetup: {
      eyebrow: "步骤 01 · 业务配置", title: "明确分析与决策背景", description: "记录业务模式、已观察问题和目标结果。业务背景影响结论解释，不改变指标计算口径。",
      demoTitle: "演示配置已就绪。", demoText: "推荐的健身订阅业务背景和合成样例数据已加载。确认假设后即可继续。",
      company: "公司 / 项目名称", businessType: "业务类型", businessModel: "商业模式", currentProblem: "当前业务问题", selectAll: "可多选",
      targetUsers: "目标用户", primaryGoal: "首要目标", previous: "已尝试策略", previousPlaceholder: "简述此前尝试过的新手引导、定价或营销策略",
      local: "业务配置仅保存在当前浏览器。", save: "保存并继续",
    },
    dataUpload: {
      eyebrow: "步骤 02 · 数据导入", title: "连接运营数据", description: "上传用户级 CSV，或使用内置健身样例。系统会在诊断前校验字段结构。",
      upload: "上传 CSV", uploadText: "导入包含 16 个标准字段的用户级数据。", choose: "选择文件 →", sample: "使用健身订阅样例数据", recommended: "推荐",
      sampleText: "160 条确定性合成记录，覆盖激活、转化、流失与渠道质量信号。", load: "立即加载 →", parsing: "正在解析并校验数据…",
      rows: "已加载行数", records: "可用记录", fields: "识别字段", schema: "必需字段完整", missing: "缺失值", noGaps: "未发现缺失",
      quality: "数据质量", ready: "可分析", checks: "基础检查已通过", preview: "数据预览", run: "运行诊断", showing: "当前显示 {shown}/{total} 行 · 共识别 {fields} 个字段",
    },
    diagnosis: {
      eyebrow: "步骤 03 · 指标诊断", title: "诊断增长系统", description: "系统先计算确定性指标，再将阈值信号转化为有证据支持的决策提示。",
      viewSegments: "查看用户分层", focus: "决策重点 · 主要增长瓶颈", notCause: "以下为当前合成样例中的规则优先级信号，不代表已确认的因果关系。",
      evidenceSignals: "{count} 条证据信号", ruleConfidence: "规则置信度：{level}", totalUsers: "用户总数", activation: "激活率", paidConversion: "付费转化率",
      avgCompletion: "平均课程完成率", active30: "30 天活跃用户率", churn: "已观测流失率", arpu: "ARPU", loaded: "已加载用户记录",
      activationNote: "完成至少 1 门课程 / 总用户", paidNote: "付费用户 / 总用户", completionNote: "平均已完成课程 / 已开始课程", activeNote: "距上次活跃 ≤30 天 / 总用户",
      churnNote: "标记为已流失 / 总用户", arpuNote: "支付金额 / 总用户", lifecycle: "生命周期漏斗", funnelTitle: "递进式漏斗 / 总用户", denominator: "分母口径已标注",
      bottleneckDiagnosis: "瓶颈诊断", hypotheses: "根因假设", hypothesisSubtitle: "证据强度与下一步验证", hypothesis: "假设", evidence: "证据",
      evidenceType: "证据类型", confidence: "置信度", validateNext: "下一步验证", methodology: "指标定义与方法说明",
      methodologyText: "激活率基于课程完成行为；付费转化率基于订阅状态；30 天活跃用户率是活跃时效代理指标，不等同于月度 Cohort 留存。漏斗阶段均为递进子集并以总用户为分母。当前数据包含获客量，但不评估获客趋势。",
    },
    segmentation: {
      eyebrow: "步骤 04 · 用户分层", title: "将行为信号转化为可执行人群", description: "通过互斥规则，将活跃度、付费状态、活跃时效和价格敏感度转化为可用于策略设计的用户群。",
      generate: "生成策略建议", distribution: "分层分布", base: "按主要行为划分的用户结构", largest: "最大机会人群", observed: "已观察行为",
      direction: "建议方向", playbook: "分层策略表", subtitle: "行为、问题与建议方向", segment: "用户分层", userCount: "用户数", behavior: "关键行为", problem: "主要问题",
      assignment: "分层优先级：", assignmentText: "流失风险 → 高价值 → 高潜 → 价格敏感 → 新用户 → 轻度用户。该顺序用于避免重复计数，并优先保留更具行动价值的信号。", targetShort: "目标",
    },
    strategy: {
      eyebrow: "步骤 05 · 策略建议", title: "确定增长策略优先级", description: "五个策略模板根据当前诊断、目标人群、目标一致性、证据强度和执行难度进行评分。",
      design: "设计验证实验", p0Focus: "P0 决策重点", startWith: "优先验证 {count} 项高优先级策略", p0First: "P0 · 优先验证", p1Next: "P1 · 后续推进", p2Later: "P2 · 后续复核",
      p0Note: "当前规则评分最高", p1Note: "建议在 P0 埋点后验证", p2Note: "当前证据或匹配度较低", matrix: "策略优先级矩阵", matrixTitle: "业务影响与执行难度",
      hover: "悬停查看评分", scoring: "评分方法：", scoringText: "优先级综合增长瓶颈严重度、受影响人群规模、目标一致性、证据强度、样本支持度和执行难度。若业务配置显示已尝试类似策略，则透明扣减 2 分。",
      priorityScore: "优先级得分", problemSolved: "拟解决问题", action: "建议行动", impact: "业务影响", confidence: "置信度", effort: "执行难度", priority: "优先级",
      details: "查看证据与执行细节", triggered: "触发依据", rationale: "优先级说明", difficulty: "执行难度", impactMetrics: "影响指标", risk: "风险",
    },
    experiments: {
      eyebrow: "步骤 06 · 实验设计", title: "将策略转化为可验证证据", description: "将 P0/P1 策略转化为目标人群、对照与实验方案、核心指标和明确决策阈值。",
      report: "生成管理层报告", ready: "已生成实验", coverage: "覆盖全部 P0/P1 策略", cadence: "建议复盘频率", weekly: "每周", review: "跟踪领先指标",
      guardrails: "已设置护栏指标", guardrailText: "活跃、退订、退款和规模约束", experiment: "实验", from: "对应策略", eligible: "适用用户", hypothesis: "实验假设",
      control: "对照组", treatment: "实验组", primary: "核心指标", success: "成功标准", details: "查看执行与统计细节", randomization: "随机分组单位",
      feasibility: "可行性说明", minimum: "最小样本说明", decision: "统计决策规则", secondary: "辅助指标", risk: "潜在风险",
    },
    report: {
      eyebrow: "步骤 07 · 管理层报告", title: "形成可用于决策的分析叙事", description: "可切换管理层摘要、详细分析和 8 页汇报大纲。",
      copy: "复制当前视图", copied: "已复制", export: "导出 Markdown", executive: "管理层摘要", detailed: "详细分析", presentation: "汇报大纲",
      caseStudy: "案例分析概览", interviewReady: "适合面试展示", caseTitle: "健身订阅增长诊断", caseDescription: "合成样例包含一定获客量，并显示出早期激活偏弱、付费转化偏低和流失风险较高等信号。该案例用于演示分析流程，不用于生产级因果判断。",
      coverage: "报告覆盖范围", context: "业务配置背景", metrics: "上传数据指标", segments: "用户分层", hypotheses: "根因假设", scoring: "策略评分", plan: "实验计划",
      decisionFocus: "决策重点", p0Text: "优先推进 {count} 项 P0 验证，并保留预设护栏指标。", provenance: "信息来源", provenanceText: "指标和诊断来自上传数据；业务问题、目标用户和历史策略来自业务配置；策略优先级通过透明规则综合两类信息。",
      coreMessage: "核心信息", supportingEvidence: "支持证据", recommendedVisual: "建议图表",
    },
  },
};

export function getTranslation(language: Language, path: string, params: Record<string, string | number> = {}) {
  const value = path.split(".").reduce<string | TranslationTree | undefined>((current, key) => typeof current === "object" ? current[key] : undefined, translations[language]);
  const text = typeof value === "string" ? value : path;
  return Object.entries(params).reduce((result, [key, replacement]) => result.replaceAll(`{${key}}`, String(replacement)), text);
}

const zhDomain: Record<string, string> = {
  "Fitness Subscription Growth Diagnosis": "健身订阅增长诊断",
  "Fitness Subscription Platform": "健身订阅平台", "Content Subscription Platform": "内容订阅平台", "Online Education Platform": "在线教育平台", "SaaS Tool Platform": "SaaS 工具平台", "Membership E-commerce Platform": "会员制电商平台",
  "Monthly Subscription": "月度订阅", "Freemium + Paid Plan": "免费增值 + 付费方案", "Course Package": "课程包", "Membership Model": "会员制", "Hybrid Model": "混合模式",
  "User growth slowdown": "用户增长放缓", "Low activation rate": "激活率偏低", "Low paid conversion": "付费转化偏低", "Weak active-user retention signals": "活跃用户留存信号偏弱", "High churn rate": "流失率偏高", "Low campaign ROI": "营销活动 ROI 偏低", "Weak user engagement": "用户参与度偏弱",
  "New users": "新用户", "Light users": "轻度用户", "High-potential users": "高潜用户", "Paid users": "付费用户", "High-value users": "高价值用户", "Churn-risk users": "流失风险用户", "Price-sensitive users": "价格敏感用户",
  "Increase activation": "提升激活率", "Improve retention": "改善活跃用户留存", "Increase paid conversion": "提升付费转化", "Reduce churn": "降低流失", "Improve LTV": "提升 LTV", "Improve marketing ROI": "改善营销 ROI",
  "New Users": "新用户", "Light Users": "轻度用户", "High-potential Users": "高潜用户", "High-value Users": "高价值用户", "Churn-risk Users": "流失风险用户", "Price-sensitive Users": "价格敏感用户", "Users from low-active-rate channels": "低活跃率渠道用户",
  "Acquisition": "获客", "Activation": "激活", "Engagement": "参与", "Conversion": "转化", "Retained Paid Users": "留存付费用户", "Renewed Paid Users": "续费用户",
  "High": "高", "Medium": "中", "Low": "低", "Direct signal": "直接信号", "Indirect signal": "间接信号", "Missing data": "缺失数据",
  "Medium difficulty": "中等难度", "Low to Medium difficulty": "较低至中等难度",
};

export function domainLabel(value: string, language: Language) {
  return language === "zh" ? zhDomain[value] ?? value : value;
}

export const segmentZh: Record<string, { name: string; behavior: string; problem: string; direction: string }> = {
  "New Users": { name: "新用户", behavior: "注册时间较短，课程完成行为有限", problem: "起步路径不清晰，早期习惯尚未形成", direction: "7 天新手训练路径" },
  "Light Users": { name: "轻度用户", behavior: "每周训练不超过 2 次", problem: "使用习惯较弱，价值感知不连续", direction: "轻量化周度习惯机制" },
  "High-potential Users": { name: "高潜用户", behavior: "每周活跃 3 次以上但尚未付费", problem: "意愿较强，但缺少合适的转化触发", direction: "个性化高级会员试用" },
  "High-value Users": { name: "高价值用户", behavior: "已付费且每周活跃 4 次以上", problem: "需要维护忠诚度并提升推荐意愿", direction: "用户认可与推荐激励" },
  "Churn-risk Users": { name: "流失风险用户", behavior: "连续 14 天以上未活跃或已被标记为风险", problem: "训练动力和使用节奏正在减弱", direction: "个性化召回策略" },
  "Price-sensitive Users": { name: "价格敏感用户", behavior: "使用优惠券或多次接触营销活动", problem: "价格与价值之间的权衡尚不清晰", direction: "以价值为核心的会员沟通" },
};

export const strategyZh: Record<string, { name: string; problem: string; action: string; risk: string }> = {
  "7-Day Beginner Training Path": { name: "7 天新手训练路径", problem: "早期激活偏弱，首周训练习惯尚未形成", action: "为新用户提供结构化的 7 天轻量训练路径，结合每日短课程推荐、完成提醒和进度反馈。", risk: "过度引导可能降低用户自主探索空间" },
  "High-Potential User Premium Trial": { name: "高潜用户高级会员试用", problem: "活跃用户尚未转化为付费会员", action: "向高活跃未付费用户提供 3 天高级会员试用，并在试用结束前解释个性化会员价值。", risk: "过多试用可能削弱用户对标准价格的认知" },
  "Churn-risk Win-back Campaign": { name: "流失风险用户召回策略", problem: "近期活跃度和续费意愿信号偏弱", action: "依据历史训练行为触发个性化短课程推荐和限时权益，引导风险用户恢复使用。", risk: "推荐相关性不足可能增加消息疲劳" },
  "Channel Quality Reallocation": { name: "渠道质量与预算重分配", problem: "部分渠道的后续活跃质量相对较弱", action: "减少低活跃质量渠道的预算占比，并在 LTV/CAC 护栏下测试更高意向的获客来源。", risk: "短期新增用户规模可能下降" },
  "Membership Value Communication": { name: "会员价值感知强化", problem: "活跃或价格敏感用户尚未完成付费转化", action: "围绕个性化价值、进度追踪、专属计划和明确结果，测试会员权益页与付费页表达。", risk: "仅调整表达可能无法改变用户的实际支付意愿" },
};

export const experimentZh: Record<string, { name: string; hypothesis: string; target: string; control: string; treatment: string; success: string; risk: string; randomization: string; feasibility: string }> = {
  "7-Day Beginner Path A/B Test": { name: "7 天新手路径 A/B 测试", hypothesis: "结构化新手路径可能提升首周课程完成率和 30 天活跃用户率。", target: "新注册用户", control: "现有首页推荐流程", treatment: "个性化 7 天新手训练路径", success: "实验组课程完成率相对提升至少 8%，30 天活跃用户率相对提升至少 5%，且平均使用时长不下降。", risk: "过多引导可能降低用户自主性", randomization: "在符合条件的新用户注册时进行用户级随机分组", feasibility: "若课程开始、课程完成、活跃时效和付费事件均已稳定埋点，则具备 MVP 实验条件。" },
  "Contextual Premium Trial A/B Test": { name: "情境化高级会员试用 A/B 测试", hypothesis: "基于行为触发的 3 天高级会员试用，可能比通用付费页更有效地促进高潜用户转化。", target: "每周活跃 3 次以上的未付费用户", control: "标准会员付费页", treatment: "包含个性化价值说明和到期提醒的试用方案", success: "付费转化率相对提升至少 5%，且退款率增幅不超过 1 个百分点。", risk: "试用权益可能削弱标准价格认知", randomization: "用户首次满足试用条件时进行用户级随机分组", feasibility: "需要具备试用资格、付费页曝光、支付和退款事件。" },
  "Behavioral Win-back A/B Test": { name: "行为召回 A/B 测试", hypothesis: "基于历史课程行为的个性化召回提示，可能比通用提醒更有效地促进风险用户恢复活跃。", target: "连续 14–30 天未活跃且尚未确认流失的用户", control: "通用召回提醒", treatment: "个性化短课程推荐与历史进度提示", success: "重新激活率相对提升至少 6%，且消息退订率保持在 2% 以下。", risk: "推荐相关性不足可能增加消息疲劳", randomization: "用户进入未活跃窗口时进行用户级随机分组", feasibility: "需要将消息投放日志、用户活跃和重新激活事件进行关联。" },
  "High-Intent Channel Mix Test": { name: "高意向渠道组合测试", hypothesis: "将部分预算转向更高意向渠道，可能改善留存用户的获客效率。", target: "可比较获客 Cohort 中的新潜客", control: "当前渠道预算组合", treatment: "将低活跃率渠道 20% 的预算转向更高意向来源", success: "预计 LTV/CAC 相对改善至少 10%，且有效新增规模不低于对照组的 85%。", risk: "短期顶层新增用户量可能下降", randomization: "按匹配的渠道—市场或地域 Cohort 分组，不采用用户级随机化", feasibility: "当前样例缺少渠道花费、归因和可比市场信息，因此仅具备条件性可行性。" },
  "Membership Value Message A/B Test": { name: "会员价值表达 A/B 测试", hypothesis: "以结果为导向的会员价值表达，可能提升价格敏感用户的付费页转化率。", target: "进入会员权益页面的价格敏感未付费用户", control: "现有会员权益表达", treatment: "突出个性化结果、进度与专属计划的表达", success: "付费页转化率相对提升至少 5%，且退款率不增加。", risk: "表达变化可能无法解决底层支付意愿问题", randomization: "用户首次进入符合条件的付费页时进行用户级随机分组", feasibility: "在付费页访问和权益页曝光完成埋点前，不建议启动正式实验。" },
};

export function findingLabel(value: string, language: Language) {
  if (language === "en") return value;
  if (value.startsWith("Activation bottleneck")) return "检测到激活瓶颈";
  if (value.startsWith("Paid conversion bottleneck")) return "检测到付费转化瓶颈";
  if (value.startsWith("Weak 30-day active-user")) return "检测到 30 天活跃用户信号偏弱";
  if (value.startsWith("High churn risk")) return "检测到较高流失风险";
  if (value.startsWith("Channel quality issue detected:")) return `检测到渠道质量问题：${domainLabel(value.split(":")[1].trim(), language)}`;
  return value;
}

export function bottleneckLabel(value: string, language: Language) {
  if (language === "en") return value;
  return value.replace("Activation", "激活").replace("30-day active-user retention", "30 天活跃用户留存信号").replace("paid conversion", "付费转化").replace(" and ", "与").replace(", ", "、");
}

const rootCauseZh: Record<string, { hypothesis: string; validate: string }> = {
  "New users may lack a sufficiently structured onboarding path": { hypothesis: "新用户可能缺少足够清晰的结构化引导路径", validate: "按引导版本比较引导曝光、首次课程启动和第 7 天课程完成表现。" },
  "Membership value perception may be insufficient": { hypothesis: "会员价值感知可能不足", validate: "补充付费页访问、权益页曝光、试用启动和不同表达版本下的转化埋点。" },
  "Some acquisition channels may bring users with weaker downstream activity quality": { hypothesis: "部分获客渠道可能带来后续活跃质量较弱的用户", validate: "在更大的渠道 Cohort 中比较激活率、30 天活跃用户率、付费转化率、CAC 与 LTV。" },
  "Re-engagement timing may be insufficient": { hypothesis: "再触达时机可能不足", validate: "关联通知投放日志与未活跃窗口，比较不同发送时机下的重新激活表现。" },
};

export function localizedRootCause(rootCause: { hypothesis: string; evidence: string; what_to_validate_next: string }, language: Language) {
  if (language === "en") return rootCause;
  let evidence = rootCause.evidence;
  let match = evidence.match(/^Only ([\d.]+%) of (\d+) recent sign-ups complete a course\.$/);
  if (match) evidence = `${match[2]} 位近期注册用户中，仅 ${match[1]} 完成了课程。`;
  match = evidence.match(/^(\d+) users are active at least 3 times per week but remain unpaid\./);
  if (match) evidence = `${match[1]} 位用户每周活跃至少 3 次但仍未付费。这是间接信号，因为当前数据不包含付费页访问或权益页曝光。`;
  match = evidence.match(/^(.+) has the lowest 30-day active user rate at ([\d.]+%) across (\d+) users\.$/);
  if (match) evidence = `${match[1]} 渠道在 ${match[3]} 位用户中的 30 天活跃用户率最低，为 ${match[2]}。`;
  match = evidence.match(/^(\d+) users have been inactive for at least 14 days\./);
  if (match) evidence = `${match[1]} 位用户已连续至少 14 天未活跃。这是间接信号，因为当前数据不包含通知发送时点或活动触达日志。`;
  return { hypothesis: rootCauseZh[rootCause.hypothesis]?.hypothesis ?? rootCause.hypothesis, evidence, what_to_validate_next: rootCauseZh[rootCause.hypothesis]?.validate ?? rootCause.what_to_validate_next };
}

export function localizedFinding(finding: { finding: string; evidence: string; business_interpretation: string }, language: Language) {
  if (language === "en") return finding;
  let evidence = finding.evidence;
  let interpretation = finding.business_interpretation;
  if (finding.finding.startsWith("Activation bottleneck")) {
    const value = evidence.match(/Only ([\d.]+%)/)?.[1] ?? "当前";
    evidence = `激活率为 ${value}，低于配置的 40% 诊断阈值。`;
    interpretation = "较多用户尚未到达首个可衡量价值事件，早期训练习惯可能尚未形成。";
  } else if (finding.finding.startsWith("Paid conversion bottleneck")) {
    const value = evidence.match(/is ([\d.]+%)/)?.[1] ?? "当前水平";
    evidence = `付费转化率为 ${value}，低于配置的 10% 诊断阈值。`;
    interpretation = "当前用户群体中已有一定参与行为，但尚未充分转化为付费会员。";
  } else if (finding.finding.startsWith("Weak 30-day active-user")) {
    const value = evidence.match(/is ([\d.]+%)/)?.[1] ?? "当前水平";
    evidence = `30 天活跃用户率为 ${value}，低于配置的 35% 阈值。`;
    interpretation = "当前活跃时效与课程完成信号显示早期留存可能偏弱；数据不支持月度 Cohort 次月留存判断。";
  } else if (finding.finding.startsWith("High churn risk")) {
    const value = evidence.match(/^([\d.]+%)/)?.[1] ?? "当前比例";
    evidence = `${value} 的用户被标记为已流失，高于配置的 30% 风险阈值。`;
    interpretation = "如果该流失状态在真实 Cohort 中持续，可能对 LTV 形成约束。";
  } else if (finding.finding.startsWith("Channel quality issue detected:")) {
    const match = evidence.match(/^(.+) 30-day active user rate is ([\d.]+%), ([\d.]+) points below/);
    if (match) evidence = `${match[1]} 渠道的 30 天活跃用户率为 ${match[2]}，比整体水平低 ${match[3]} 个百分点。`;
    interpretation = "当前样例显示该渠道的后续活跃质量相对较弱；现有数据不评估获客趋势或投放效率。";
  }
  return { finding: findingLabel(finding.finding, language), evidence, business_interpretation: interpretation };
}
