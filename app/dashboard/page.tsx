"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Check, Play, RotateCcw, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { StatusBadge } from "@/components/StatusBadge";
import { useLanguage } from "@/components/LanguageProvider";
import { FITNESS_SCOPE_NOTE } from "@/lib/reportGenerator";
import { bottleneckLabel, strategyZh } from "@/lib/i18n";

const pipeline = ["businessSetup", "dataUpload", "diagnosis", "strategy", "experiments", "report"] as const;

export default function DashboardPage() {
  const router = useRouter();
  const { context, users, analysis, startDemo, resetDemo } = useWorkspace();
  const { language, t, d } = useLanguage();
  const completed = analysis ? 6 : users.length ? 2 : 1;
  const topStrategy = analysis?.strategies.find((strategy) => strategy.priority === "P0");
  const summaries = [
    [t("dashboard.currentProject"), d(context.companyName), t("dashboard.activeWorkspace")],
    [t("dashboard.businessType"), d(context.businessType), d(context.businessModel)],
    [t("dashboard.bottleneck"), analysis ? bottleneckLabel(analysis.diagnosis.main_bottleneck, language) : t("dashboard.pendingDiagnosis"), analysis ? (language === "zh" ? `${analysis.diagnosis.key_findings.length} 条有指标依据的发现` : `${analysis.diagnosis.key_findings.length} evidence-backed findings`) : t("dashboard.runSample")],
    [t("dashboard.p0"), topStrategy ? (language === "zh" ? strategyZh[topStrategy.strategy_name]?.name ?? topStrategy.strategy_name : topStrategy.strategy_name) : t("dashboard.notPrioritized"), analysis ? t("dashboard.scored") : t("dashboard.afterDiagnosis")],
  ];
  const beginDemo = () => { startDemo(); router.push("/business-setup"); };
  const reset = () => { resetDemo(); router.replace("/dashboard"); };

  return <>
    <PageHeader eyebrow={t("dashboard.eyebrow")} title={t("dashboard.title")} description={t("dashboard.description")} actions={<div className="flex flex-wrap gap-2"><button onClick={reset} className="btn-secondary"><RotateCcw size={15} /> {t("dashboard.reset")}</button><button onClick={beginDemo} className="btn-primary"><Sparkles size={15} /> {t("dashboard.start")}</button></div>} />
    <div className="mb-5 flex items-center gap-2 text-[11px] font-medium text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-teal" />{t("dashboard.path")}</div>
    {context.businessType !== "Fitness Subscription Platform" && <div className="mb-5 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800"><AlertCircle className="mt-0.5 shrink-0" size={15} />{language === "zh" ? "当前 MVP 针对健身订阅分析进行了优化，其他业务类型目前仅作为报告背景使用。" : FITNESS_SCOPE_NOTE}</div>}
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{summaries.map(([label, value, note], index) => <div key={label} className="card min-h-[138px] p-4"><div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p><span className={`h-1.5 w-1.5 rounded-full ${index < 2 ? "bg-teal" : analysis ? "bg-emerald-500" : "bg-slate-300"}`} /></div><p className="mt-5 line-clamp-2 text-[15px] font-bold leading-5 text-ink">{value}</p><p className="mt-2 text-[11px] text-slate-400">{note}</p></div>)}</section>

    <section className="card mt-5 p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="eyebrow">{t("dashboard.pipeline")}</p><h3 className="mt-1 text-base font-bold">{t("dashboard.pipelineTitle")}</h3></div><span className="text-xs font-semibold text-slate-400">{completed} / 6 {t("common.complete").toLowerCase()}</span></div>
      <div className="mt-7 grid gap-0 sm:grid-cols-6">{pipeline.map((step, index) => { const done = index < completed; const active = index === completed; return <div key={step} className="relative flex gap-3 pb-5 sm:block sm:pb-0"><div className={`absolute left-[13px] top-7 h-[calc(100%-20px)] w-px sm:left-[calc(50%+15px)] sm:top-[13px] sm:h-px sm:w-[calc(100%-30px)] ${index === pipeline.length - 1 ? "hidden" : done ? "bg-teal" : "bg-slate-200"}`} /><span className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold sm:mx-auto ${done ? "border-teal bg-teal text-white" : active ? "border-navy bg-white text-navy ring-4 ring-navy/5" : "border-slate-200 bg-white text-slate-400"}`}>{done ? <Check size={13} /> : index + 1}</span><div className="sm:mt-3 sm:text-center"><p className={`text-xs font-semibold ${done || active ? "text-ink" : "text-slate-400"}`}>{t(`sidebar.${step}`)}</p><p className="mt-0.5 text-[10px] text-slate-400">{done ? t("common.complete") : active ? t("common.nextStep") : t("common.pending")}</p></div></div>; })}</div>
    </section>

    <section className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]"><Link href="/business-setup" className="card group overflow-hidden transition hover:border-slate-300 hover:shadow-md"><div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-white"><Play size={20} fill="currentColor" /></div><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold">{d("Fitness Subscription Growth Diagnosis")}</h3><StatusBadge tone="green">{t("dashboard.ready")}</StatusBadge></div><p className="mt-2 text-sm text-slate-500">{d("Fitness Subscription Platform")}</p><p className="mt-2 text-sm leading-6 text-slate-600"><b className="text-slate-700">{t("dashboard.problem")}</b> {t("dashboard.sampleProblem")}</p></div><ArrowRight className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-teal" /></div><div className="border-t border-line bg-slate-50/60 px-6 py-3 text-[11px] text-slate-500">{language === "zh" ? "样例项目 · 预配置业务背景 · 160 条用户记录" : "Sample project · Preconfigured business context · 160 user records"}</div></Link>
      <div className="card p-5"><p className="eyebrow">{t("dashboard.principles")}</p><div className="mt-4 space-y-4">{[t("dashboard.principle1"), t("dashboard.principle2"), t("dashboard.principle3")].map((item) => <div key={item} className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal/10 text-teal"><Check size={13} /></span><p className="text-sm font-medium text-slate-700">{item}</p></div>)}</div></div>
    </section>
  </>;
}
