"use client";

import { ChevronDown, Clock3, Gauge, Repeat2, Target, TriangleAlert, Zap } from "lucide-react";
import type { Strategy } from "@/lib/types";
import { findingLabel, strategyZh } from "@/lib/i18n";
import { StatusBadge } from "./StatusBadge";
import { useLanguage } from "./LanguageProvider";

const metricZh: Record<string, string> = {
  "First-week completion rate": "首周课程完成率", "Second-week retention": "次周活跃留存", "30-day active user rate": "30 天活跃用户率", "Paid conversion": "付费转化率",
  "Paid conversion rate": "付费转化率", "Trial-to-paid conversion": "试用转付费率", ARPU: "ARPU", "Reactivation rate": "重新激活率",
  "Renewal rate": "续费率", "Churn reduction": "流失率改善", CAC: "CAC", "Retained-user CAC": "留存用户 CAC", "Retention by channel": "各渠道活跃留存", "30-day active user rate by channel": "各渠道 30 天活跃用户率", "LTV/CAC": "LTV/CAC",
  "Paid page conversion": "付费页转化率", "Membership trial start": "会员试用启动率", "Membership trial starts": "会员试用启动率",
};

function localizeTrigger(trigger: string, language: "en" | "zh", d: (value: string) => string) {
  if (language === "en") return trigger;
  if (trigger.startsWith("Business setup problem:")) return `业务配置问题：${d(trigger.split(":").slice(1).join(":").trim())}`;
  if (trigger.startsWith("Segment opportunity:")) return `用户分层机会：${d(trigger.split(":").slice(1).join(":").trim())}`;
  return findingLabel(trigger, language);
}

export function StrategyCard({ strategy, index }: { strategy: Strategy; index: number }) {
  const { language, t, d } = useLanguage();
  const localized = language === "zh" ? strategyZh[strategy.strategy_name] : undefined;
  const rationale = language === "zh"
    ? `优先级得分由业务影响 ${strategy.impact} + 置信度 ${strategy.confidence_score} - 执行难度 ${strategy.effort}${strategy.already_attempted ? " - 已尝试策略迭代扣分 2" : ""} 计算。`
    : strategy.priority_rationale;
  const attemptNote = language === "zh" && strategy.already_attempted
    ? "业务配置显示已尝试过相似方案，建议先复盘既有结果并迭代，而非直接重复上线。"
    : strategy.attempt_note;
  const timeToImpact = language === "zh" ? strategy.time_to_impact.replace(/weeks?/gi, "周") : strategy.time_to_impact;
  return <article className={`card overflow-hidden ${strategy.priority === "P0" ? "border-teal/30" : ""}`}>
    <div className="flex items-start gap-4 border-b border-line p-5">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${strategy.priority === "P0" ? "bg-teal" : "bg-navy"}`}>{String(index + 1).padStart(2, "0")}</span>
      <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-base font-bold text-ink">{localized?.name ?? strategy.strategy_name}</h3><StatusBadge tone={strategy.priority === "P0" ? "teal" : strategy.priority === "P1" ? "navy" : "slate"}>{strategy.priority}</StatusBadge>{strategy.targeted_by_setup && <StatusBadge tone="teal">{t("common.targeted")}</StatusBadge>}{strategy.already_attempted && <StatusBadge tone="amber">{t("common.attempted")}</StatusBadge>}</div><p className="mt-1 text-xs font-medium text-teal">{d(strategy.target_segment)}</p></div>
      <div className="text-right"><p className="text-[10px] uppercase tracking-wider text-slate-400">{t("strategy.priorityScore")}</p><p className="mt-1 text-lg font-bold text-navy">{strategy.priority_score}</p></div>
    </div>

    <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.35fr_0.9fr]">
      <div><p className="label"><Target className="mr-1 inline" size={12} /> {t("strategy.problemSolved")}</p><p className="text-sm leading-6 text-slate-700">{localized?.problem ?? strategy.problem_solved}</p></div>
      <div><p className="label">{t("strategy.action")}</p><p className="text-sm leading-6 text-slate-600">{localized?.action ?? strategy.action_plan}</p></div>
      <div className="grid grid-cols-2 gap-2">{[[t("strategy.impact"), strategy.impact], [t("strategy.confidence"), strategy.confidence_score], [t("strategy.effort"), strategy.effort], [t("strategy.priority"), strategy.priority_score]].map(([label, value]) => <div key={String(label)} className="rounded-lg border border-line bg-slate-50/50 p-2.5"><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-base font-bold text-navy">{value}</p></div>)}</div>
    </div>

    <details className="group border-t border-line bg-slate-50/40"><summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"><span>{t("strategy.details")}</span><ChevronDown size={15} className="transition group-open:rotate-180" /></summary><div className="grid gap-5 border-t border-line px-5 py-4 lg:grid-cols-[1fr_1.35fr_1fr]">
      <div><p className="label"><Zap className="mr-1 inline" size={12} /> {t("strategy.triggered")}</p><div className="space-y-1">{strategy.triggered_by.map((trigger) => <p key={trigger} className="text-[11px] leading-5 text-slate-600">• {localizeTrigger(trigger, language, d)}</p>)}</div></div>
      <div><p className="label">{t("strategy.rationale")}</p><p className="rounded-md bg-white p-3 text-[11px] leading-5 text-slate-600">{rationale}</p>{attemptNote && <p className="mt-2 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-800"><Repeat2 className="mt-0.5 shrink-0" size={13} />{attemptNote}</p>}</div>
      <div><div className="space-y-3 text-xs"><div className="flex items-center gap-2 text-slate-600"><Gauge size={14} className="text-teal" />{d(strategy.difficulty)} {t("strategy.difficulty")}</div><div className="flex items-center gap-2 text-slate-600"><Clock3 size={14} className="text-teal" />{timeToImpact}</div><div className="flex items-start gap-2 text-slate-500"><TriangleAlert size={14} className="mt-0.5 shrink-0 text-amber-500" />{localized?.risk ?? strategy.risk}</div></div><div className="mt-4 flex flex-wrap gap-1.5">{strategy.expected_metrics.map((metric) => <span key={metric} className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-600">{language === "zh" ? metricZh[metric] ?? metric : metric}</span>)}</div></div>
    </div></details>
  </article>;
}
