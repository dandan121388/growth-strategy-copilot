"use client";

import Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { PriorityMatrix } from "@/components/PriorityMatrix";
import { StrategyCard } from "@/components/StrategyCard";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { StatusBadge } from "@/components/StatusBadge";
import { strategyZh } from "@/lib/i18n";

export default function StrategyPage() {
  const { analysis } = useWorkspace();
  const { language, t } = useLanguage();
  if (!analysis) return <><PageHeader eyebrow={t("strategy.eyebrow")} title={t("strategy.title")} description={t("strategy.description")} /><EmptyState /></>;
  const p0Strategies = analysis.strategies.filter((strategy) => strategy.priority === "P0");
  const prioritySummary = [
    [t("strategy.p0First"), p0Strategies.length, t("strategy.p0Note")],
    [t("strategy.p1Next"), analysis.strategies.filter((strategy) => strategy.priority === "P1").length, t("strategy.p1Note")],
    [t("strategy.p2Later"), analysis.strategies.filter((strategy) => strategy.priority === "P2").length, t("strategy.p2Note")],
  ];

  return <>
    <PageHeader eyebrow={t("strategy.eyebrow")} title={t("strategy.title")} description={t("strategy.description")} actions={<Link href="/experiments" className="btn-primary">{t("strategy.design")} <ArrowRight size={15} /></Link>} />

    <section className="mb-5 rounded-xl border border-teal/20 bg-gradient-to-r from-navy to-[#204b65] p-5 text-white"><div className="flex items-start gap-3"><span className="rounded-lg bg-white/10 p-2 text-[#79cbc2]"><Flag size={18} /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#79cbc2]">{t("strategy.p0Focus")}</p><h3 className="mt-1 text-lg font-bold">{t("strategy.startWith", { count: p0Strategies.length })}</h3><div className="mt-3 flex flex-wrap gap-2">{p0Strategies.map((strategy) => <span key={strategy.strategy_name} className="rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs">{language === "zh" ? strategyZh[strategy.strategy_name]?.name ?? strategy.strategy_name : strategy.strategy_name} · {language === "zh" ? "得分" : "score"} {strategy.priority_score}</span>)}</div></div></div></section>

    <section className="mb-5 grid gap-3 sm:grid-cols-3">{prioritySummary.map(([label, value, note]) => <div className="card p-4" key={String(label)}><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold text-navy">{value}</p><p className="mt-1 text-xs text-slate-500">{note}</p></div>)}</section>

    <section className="card mb-5 p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="eyebrow">{t("strategy.matrix")}</p><h3 className="mt-1 text-base font-bold">{t("strategy.matrixTitle")}</h3></div><div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold text-slate-500"><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-teal" />P0</span><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-navy" />P1</span><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-slate-400" />P2</span><StatusBadge tone="slate">{t("strategy.hover")}</StatusBadge></div></div><PriorityMatrix strategies={analysis.strategies} /><p className="border-t border-line pt-4 text-[11px] leading-5 text-slate-500"><b className="text-slate-700">{t("strategy.scoring")}</b> {t("strategy.scoringText")}</p></section>
    <section className="space-y-4">{analysis.strategies.map((strategy, index) => <StrategyCard key={strategy.strategy_name} strategy={strategy} index={index} />)}</section>
  </>;
}
