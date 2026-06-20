"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { ExperimentCard } from "@/components/ExperimentCard";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { useLanguage } from "@/components/LanguageProvider";

export default function ExperimentsPage() {
  const { analysis } = useWorkspace();
  const { t } = useLanguage();
  if (!analysis) return <><PageHeader eyebrow={t("experiments.eyebrow")} title={t("experiments.title")} description={t("experiments.description")} /><EmptyState /></>;
  return <>
    <PageHeader eyebrow={t("experiments.eyebrow")} title={t("experiments.title")} description={t("experiments.description")} actions={<Link href="/report" className="btn-primary">{t("experiments.report")} <ArrowRight size={15} /></Link>} />
    <section className="mb-5 grid gap-3 sm:grid-cols-3"><div className="card p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t("experiments.ready")}</p><p className="mt-2 text-2xl font-bold text-navy">{analysis.experiments.length}</p><p className="mt-1 text-xs text-slate-500">{t("experiments.coverage")}</p></div><div className="card p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t("experiments.cadence")}</p><p className="mt-2 text-2xl font-bold text-navy">{t("experiments.weekly")}</p><p className="mt-1 text-xs text-slate-500">{t("experiments.review")}</p></div><div className="card flex items-center gap-3 p-4"><span className="rounded-lg bg-emerald-50 p-2 text-emerald-600"><ShieldCheck size={19} /></span><div><p className="text-xs font-bold">{t("experiments.guardrails")}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{t("experiments.guardrailText")}</p></div></div></section>
    <section className="grid gap-5 xl:grid-cols-2">{analysis.experiments.map((experiment, index) => <ExperimentCard key={experiment.experiment_name} experiment={experiment} index={index} />)}</section>
  </>;
}
