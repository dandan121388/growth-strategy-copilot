"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, CheckCircle2, Info } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { MetricCard } from "@/components/MetricCard";
import { FunnelChart } from "@/components/FunnelChart";
import { EmptyState } from "@/components/EmptyState";
import { StatusBadge } from "@/components/StatusBadge";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { SampleDataNotice } from "@/components/SampleDataNotice";
import { bottleneckLabel, domainLabel, localizedFinding, localizedRootCause } from "@/lib/i18n";
import { money, pct } from "@/lib/utils";
import { ACQUISITION_SCOPE_NOTE } from "@/lib/reportGenerator";

export default function DiagnosisPage() {
  const { analysis } = useWorkspace();
  const { language, t } = useLanguage();
  if (!analysis) return <><PageHeader eyebrow={t("diagnosis.eyebrow")} title={t("diagnosis.title")} description={t("diagnosis.description")} /><EmptyState /></>;
  const { metrics, diagnosis } = analysis;
  const cards = [
    [t("diagnosis.totalUsers"), String(metrics.totalUsers), t("diagnosis.loaded"), "neutral"],
    [t("diagnosis.activation"), pct(metrics.activationRate), t("diagnosis.activationNote"), metrics.activationRate < .4 ? "negative" : "positive"],
    [t("diagnosis.paidConversion"), pct(metrics.paidConversionRate), t("diagnosis.paidNote"), metrics.paidConversionRate < .1 ? "negative" : "positive"],
    [t("diagnosis.avgCompletion"), pct(metrics.averageCompletionRate), t("diagnosis.completionNote"), "neutral"],
    [t("diagnosis.active30"), pct(metrics.retentionRate), t("diagnosis.activeNote"), metrics.retentionRate < .35 ? "negative" : "positive"],
    [t("diagnosis.churn"), pct(metrics.churnRate), t("diagnosis.churnNote"), metrics.churnRate > .3 ? "negative" : "positive"],
    [t("diagnosis.arpu"), money(metrics.arpu), t("diagnosis.arpuNote"), "neutral"],
  ] as const;
  const confidenceTone = diagnosis.rule_confidence.level === "High" ? "green" : diagnosis.rule_confidence.level === "Medium" ? "amber" : "red";
  const confidenceRationale = language === "zh" ? `${metrics.totalUsers} 条记录支持直接指标规则；根因解释包含间接代理信号，仍需进一步验证。` : diagnosis.rule_confidence.rationale;
  const methodology = language === "zh"
    ? <>激活率基于课程完成行为；付费转化率基于订阅状态；30 天活跃用户率以 <code>last_active_days_ago ≤ 30</code> 为口径，是活跃时效代理指标，不等同于月度 Cohort 次月留存。漏斗各阶段均为递进子集并以总用户数为分母，其中“留存付费用户”和“续费用户”的口径比活跃用户 KPI 更窄。当前数据包含获客量，但不评估获客趋势。</>
    : <>Activation uses course completion. Paid conversion uses subscription status. The 30-day Active User Rate is a recency proxy based on <code>last_active_days_ago ≤ 30</code>, not cohort month-2 retention. Funnel stages are progressive subsets divided by total users; “Retained Paid Users” and “Renewed Paid Users” therefore use a narrower definition than the active-user KPI. {ACQUISITION_SCOPE_NOTE}</>;

  return <>
    <PageHeader eyebrow={t("diagnosis.eyebrow")} title={t("diagnosis.title")} description={t("diagnosis.description")} actions={<Link href="/segmentation" className="btn-primary">{t("diagnosis.viewSegments")} <ArrowRight size={15} /></Link>} />
    <div className="mb-5"><SampleDataNotice compact /></div>
    <section className="mb-5 flex flex-col justify-between gap-4 rounded-xl border border-teal/20 bg-gradient-to-r from-navy to-[#204b65] p-5 text-white lg:flex-row lg:items-center"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#79cbc2]">{t("diagnosis.focus")}</p><h2 className="mt-2 text-xl font-bold">{bottleneckLabel(diagnosis.main_bottleneck, language)}</h2><p className="mt-2 max-w-3xl text-xs leading-5 text-slate-300">{t("diagnosis.notCause")}</p></div><div className="flex shrink-0 flex-wrap gap-2"><StatusBadge tone="green">{t("diagnosis.evidenceSignals", { count: diagnosis.key_findings.length })}</StatusBadge><StatusBadge tone={confidenceTone}>{t("diagnosis.ruleConfidence", { level: domainLabel(diagnosis.rule_confidence.level, language) })}</StatusBadge></div></section>
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">{cards.map(([label, value, note, tone]) => <MetricCard key={label} label={label} value={value} note={note} tone={tone} />)}</section>

    <section className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_1fr]">
      <div className="card p-5"><div className="flex items-center justify-between"><div><p className="eyebrow">{t("diagnosis.lifecycle")}</p><h3 className="mt-1 text-base font-bold">{t("diagnosis.funnelTitle")}</h3></div><StatusBadge tone="slate">{t("diagnosis.denominator")}</StatusBadge></div><FunnelChart data={metrics.funnel} /></div>
      <div className="card overflow-hidden"><div className="border-b border-line bg-navy p-5 text-white"><div className="flex items-center gap-2 text-[#77c9c0]"><BrainCircuit size={17} /><p className="text-[10px] font-bold uppercase tracking-widest">{t("diagnosis.bottleneckDiagnosis")}</p></div><h3 className="mt-4 text-xl font-bold">{bottleneckLabel(diagnosis.main_bottleneck, language)}</h3><div className="mt-3 flex flex-wrap items-center gap-2"><StatusBadge tone={confidenceTone}>{t("diagnosis.ruleConfidence", { level: domainLabel(diagnosis.rule_confidence.level, language) })}</StatusBadge><span className="text-[10px] text-slate-300">{confidenceRationale}</span></div></div><div className="max-h-[420px] divide-y divide-line overflow-y-auto">{diagnosis.key_findings.map((finding) => { const copy = localizedFinding(finding, language); return <div key={finding.finding} className="p-4"><div className="flex items-start gap-3"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal" /><div><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold text-ink">{copy.finding}</p><StatusBadge tone={finding.confidence === "High" ? "green" : finding.confidence === "Medium" ? "amber" : "red"}>{domainLabel(finding.confidence, language)}</StatusBadge></div><p className="mt-1 text-xs leading-5 text-slate-500">{copy.evidence}</p><p className="mt-2 rounded-md bg-slate-50 p-2.5 text-[11px] leading-5 text-slate-600"><Info className="mr-1 inline" size={12} /> {copy.business_interpretation}</p></div></div></div>; })}</div></div>
    </section>

    <section className="card mt-5 overflow-hidden"><div className="border-b border-line px-5 py-4"><p className="eyebrow">{t("diagnosis.hypotheses")}</p><h3 className="mt-1 text-base font-bold">{t("diagnosis.hypothesisSubtitle")}</h3></div><div className="overflow-x-auto"><table className="w-full min-w-[1120px] text-left text-xs"><thead><tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500"><th className="px-5 py-3">{t("diagnosis.hypothesis")}</th><th className="px-5 py-3">{t("diagnosis.evidence")}</th><th className="px-5 py-3">{t("diagnosis.evidenceType")}</th><th className="px-5 py-3">{t("diagnosis.confidence")}</th><th className="px-5 py-3">{t("diagnosis.validateNext")}</th></tr></thead><tbody>{diagnosis.root_causes.map((rootCause) => { const copy = localizedRootCause(rootCause, language); return <tr key={rootCause.hypothesis} className="border-t border-line align-top"><td className="max-w-[220px] px-5 py-4 font-bold leading-5 text-ink">{copy.hypothesis}</td><td className="max-w-[300px] px-5 py-4 leading-5 text-slate-600">{copy.evidence}</td><td className="px-5 py-4"><StatusBadge tone={rootCause.evidence_type === "Direct signal" ? "green" : rootCause.evidence_type === "Indirect signal" ? "amber" : "red"}>{domainLabel(rootCause.evidence_type, language)}</StatusBadge></td><td className="px-5 py-4"><StatusBadge tone={rootCause.confidence === "High" ? "green" : rootCause.confidence === "Medium" ? "amber" : "red"}>{domainLabel(rootCause.confidence, language)}</StatusBadge></td><td className="max-w-[280px] px-5 py-4 leading-5 text-slate-600">{copy.what_to_validate_next}</td></tr>; })}</tbody></table></div></section>

    <section className="mt-5 rounded-lg border border-slate-200 bg-white p-4"><p className="label">{t("diagnosis.methodology")}</p><p className="text-xs leading-6 text-slate-600">{methodology}</p></section>
  </>;
}
