"use client";

import { Beaker, CheckCircle2, ChevronDown, Users } from "lucide-react";
import type { Experiment } from "@/lib/types";
import { experimentZh, strategyZh } from "@/lib/i18n";
import { StatusBadge } from "./StatusBadge";
import { useLanguage } from "./LanguageProvider";

const metricZh: Record<string, string> = {
  "First-week course completion rate": "首周课程完成率", "30-day active-user rate": "30 天活跃用户率", "First course start rate": "首次课程启动率",
  "Average session duration": "平均单次使用时长", "Paid conversion rate": "付费转化率", "Paid conversion": "付费转化率", "Trial-to-paid conversion": "试用转付费率", "Trial activation": "试用激活率", ARPU: "ARPU",
  "Refund rate": "退款率", "Reactivation rate": "重新激活率", "7-day reactivation rate": "7 天重新激活率", "30-day retained reactivation": "30 天持续激活率", "Course start rate": "课程启动率", "Renewal rate": "续费率", "Message opt-out rate": "消息退订率", "LTV/CAC": "LTV/CAC", "Projected LTV/CAC": "预测 LTV/CAC",
  "Active users by channel": "各渠道活跃用户", "30-day retained-user CAC": "30 天留存用户 CAC", "Activation by channel": "各渠道激活率", "Acquisition volume": "获客量", "Signup volume": "注册量", "Paid page conversion": "付费页转化率", "Membership trial start": "会员试用启动率", "Membership trial starts": "会员试用启动率", "Paywall exit rate": "付费页退出率",
};

export function ExperimentCard({ experiment, index }: { experiment: Experiment; index: number }) {
  const { language, t } = useLanguage();
  const localized = language === "zh" ? experimentZh[experiment.experiment_name] : undefined;
  const strategyName = language === "zh" ? strategyZh[experiment.strategy_name]?.name ?? experiment.strategy_name : experiment.strategy_name;
  const duration = language === "zh" ? experiment.duration.replace(/weeks?/gi, "周") : experiment.duration;
  const minimumSample = language === "zh" ? "当前 160 行样例仅用于诊断流程演示。正式实验启动前需要结合基线转化率、目标提升幅度和统计功效重新估算样本量。" : experiment.minimum_sample_note;
  const decisionRule = language === "zh" ? "当实验组核心指标达到预设相对提升目标，且护栏指标未出现实质性恶化时，方可进入扩大验证或上线决策。" : experiment.statistical_decision_rule;
  const metric = (value: string) => language === "zh" ? metricZh[value] ?? value : value;
  return <article className="card overflow-hidden">
    <div className="p-5">
      <div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3"><span className="rounded-lg bg-teal/10 p-2 text-teal"><Beaker size={18} /></span><div><p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t("experiments.experiment")} {String(index + 1).padStart(2, "0")}</p><h3 className="mt-1 text-base font-bold text-ink">{localized?.name ?? experiment.experiment_name}</h3><p className="mt-1 text-xs text-teal">{t("experiments.from")}: {strategyName}</p></div></div><StatusBadge tone="navy">{duration}</StatusBadge></div>
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600"><Users className="mt-0.5 shrink-0 text-teal" size={14} /><span><b className="text-slate-700">{t("experiments.eligible")}:</b> {localized?.target ?? experiment.target_users}</span></div>
      <div className="mt-4 rounded-lg border border-teal/15 bg-teal/[0.04] p-4"><p className="label text-teal">{t("experiments.hypothesis")}</p><p className="text-sm leading-6 text-slate-700">{localized?.hypothesis ?? experiment.hypothesis}</p></div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2"><div><p className="label">{t("experiments.control")}</p><p className="text-xs leading-5 text-slate-600">{localized?.control ?? experiment.control_group}</p></div><div><p className="label">{t("experiments.treatment")}</p><p className="text-xs leading-5 text-slate-600">{localized?.treatment ?? experiment.treatment_group}</p></div></div>
      <div className="mt-4 grid gap-4 border-t border-line pt-4 sm:grid-cols-2"><div><p className="label">{t("experiments.primary")}</p><div className="space-y-1.5">{experiment.primary_metrics.map((item) => <p key={item} className="flex items-center gap-2 text-xs text-slate-700"><CheckCircle2 size={13} className="text-teal" />{metric(item)}</p>)}</div></div><div><p className="label">{t("experiments.success")}</p><p className="text-xs leading-5 text-slate-700">{localized?.success ?? experiment.success_criteria}</p></div></div>
    </div>

    <details className="group border-t border-line bg-slate-50/40"><summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"><span>{t("experiments.details")}</span><ChevronDown size={15} className="transition group-open:rotate-180" /></summary><div className="space-y-3 border-t border-line p-5">
      <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-lg border border-line bg-white p-3"><p className="label">{t("experiments.randomization")}</p><p className="text-xs leading-5 text-slate-600">{localized?.randomization ?? experiment.randomization_unit}</p></div><div className="rounded-lg border border-line bg-white p-3"><p className="label">{t("experiments.feasibility")}</p><p className="text-xs leading-5 text-slate-600">{localized?.feasibility ?? experiment.feasibility_note}</p></div></div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">{t("experiments.minimum")}</p><p className="mt-1.5 text-[11px] leading-5 text-amber-800">{minimumSample}</p></div>
      <div className="rounded-lg border border-teal/15 bg-teal/[0.04] p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-teal">{t("experiments.decision")}</p><p className="mt-1.5 text-[11px] leading-5 text-slate-700">{decisionRule}</p></div>
      <div className="grid gap-3 sm:grid-cols-2"><p className="text-[11px] leading-5 text-slate-500"><b>{t("experiments.secondary")}:</b> {experiment.secondary_metrics.map(metric).join(" · ")}</p><p className="text-[11px] leading-5 text-slate-500"><b>{t("experiments.risk")}:</b> {localized?.risk ?? experiment.potential_risk}</p></div>
    </div></details>
  </article>;
}
