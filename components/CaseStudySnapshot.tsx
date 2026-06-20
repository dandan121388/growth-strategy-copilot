"use client";

import type { AnalysisResult } from "@/lib/types";
import { bottleneckLabel, segmentZh, strategyZh } from "@/lib/i18n";
import { pct } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { useLanguage } from "./LanguageProvider";

export function CaseStudySnapshot({ analysis }: { analysis: AnalysisResult }) {
  const { language, t } = useLanguage();
  const p0 = analysis.strategies.filter((strategy) => strategy.priority === "P0");
  const topSegments = [...analysis.segments].sort((a, b) => b.user_count - a.user_count).slice(0, 3);
  const items = language === "zh" ? [
    ["1 · 业务背景", "健身订阅样例案例，聚焦激活、商业化与流失风险的决策支持。"],
    ["2 · 数据范围", `${analysis.metrics.totalUsers} 条合成用户记录；数据包含获客量，但不评估获客趋势。`],
    ["3 · 核心指标", `${pct(analysis.metrics.activationRate)} 激活率 · ${pct(analysis.metrics.paidConversionRate)} 付费转化率 · ${pct(analysis.metrics.retentionRate)} 30 天活跃用户率`],
    ["4 · 主要瓶颈", bottleneckLabel(analysis.diagnosis.main_bottleneck, language)],
    ["5 · 用户分层", topSegments.map((segment) => `${segmentZh[segment.segment_name]?.name ?? segment.segment_name} ${segment.user_count}`).join(" · ")],
    ["6 · P0 策略", p0.map((strategy) => strategyZh[strategy.strategy_name]?.name ?? strategy.strategy_name).join(" · ") || "当前没有达到 P0 阈值的策略"],
    ["7 · 实验计划", `${analysis.experiments.length} 个覆盖 P0/P1 策略的实验方案，包含决策规则与可行性说明。`],
    ["8 · 产品限制", "合成横截面数据；不支持因果推断、获客趋势、月度 Cohort 留存或正式实验样本量估算。"],
  ] : [
    ["1 · Business Context", "Fitness subscription sample case focused on activation, monetization and churn-risk decision support."],
    ["2 · Dataset Scope", `${analysis.metrics.totalUsers} synthetic user records; acquisition volume is present, but trend is not evaluated.`],
    ["3 · Key Metrics", `${pct(analysis.metrics.activationRate)} activation · ${pct(analysis.metrics.paidConversionRate)} paid conversion · ${pct(analysis.metrics.retentionRate)} 30-day active-user rate`],
    ["4 · Main Bottleneck", analysis.diagnosis.main_bottleneck],
    ["5 · User Segments", topSegments.map((segment) => `${segment.segment_name} ${segment.user_count}`).join(" · ")],
    ["6 · P0 Strategies", p0.map((strategy) => strategy.strategy_name).join(" · ") || "No strategy currently meets the P0 threshold"],
    ["7 · Experiment Plan", `${analysis.experiments.length} P0/P1 experiment plans with explicit decision rules and feasibility notes.`],
    ["8 · Product Limitations", "Synthetic point-in-time data; no causal inference, acquisition trend, cohort month-2 retention or production experiment sizing."],
  ];
  return <section className="card mb-5 overflow-hidden"><div className="flex flex-col justify-between gap-3 border-b border-line bg-gradient-to-r from-white to-teal/[0.04] p-5 sm:flex-row sm:items-start"><div><div className="flex items-center gap-2"><p className="eyebrow">{t("report.caseStudy")}</p><StatusBadge tone="teal">{t("report.interviewReady")}</StatusBadge></div><h3 className="mt-1 text-lg font-bold text-ink">{t("report.caseTitle")}</h3><p className="mt-2 max-w-4xl text-xs leading-5 text-slate-500">{t("report.caseDescription")}</p></div></div><div className="grid sm:grid-cols-2 xl:grid-cols-4">{items.map(([label, value]) => <div key={label} className="border-b border-line p-4 sm:border-r xl:[&:nth-child(4n)]:border-r-0 xl:[&:nth-last-child(-n+4)]:border-b-0"><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 text-xs font-medium leading-5 text-slate-700">{value}</p></div>)}</div></section>;
}
