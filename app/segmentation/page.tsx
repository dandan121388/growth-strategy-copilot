"use client";

import Link from "next/link";
import { ArrowRight, Layers3, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { SegmentChart } from "@/components/SegmentChart";
import { SegmentTable } from "@/components/SegmentTable";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { StatusBadge } from "@/components/StatusBadge";
import { segmentZh } from "@/lib/i18n";

export default function SegmentationPage() {
  const { analysis } = useWorkspace();
  const { language, t } = useLanguage();
  if (!analysis) return <><PageHeader eyebrow={t("segmentation.eyebrow")} title={t("segmentation.title")} description={t("segmentation.description")} /><EmptyState /></>;
  const largest = [...analysis.segments].sort((a, b) => b.user_count - a.user_count)[0];
  const localizedLargest = language === "zh" ? segmentZh[largest.segment_name] : undefined;
  return <>
    <PageHeader eyebrow={t("segmentation.eyebrow")} title={t("segmentation.title")} description={t("segmentation.description")} actions={<Link href="/strategy" className="btn-primary">{t("segmentation.generate")} <ArrowRight size={15} /></Link>} />
    <section className="grid gap-5 lg:grid-cols-[1.35fr_1fr]"><div className="card p-5"><p className="eyebrow">{t("segmentation.distribution")}</p><h3 className="mt-1 text-base font-bold">{t("segmentation.base")}</h3><SegmentChart segments={analysis.segments} /></div>
      <div className="card p-5"><div className="flex items-center gap-3"><span className="rounded-lg bg-navy/10 p-2 text-navy"><Layers3 size={18} /></span><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t("segmentation.largest")}</p><div className="mt-1 flex flex-wrap items-center gap-2"><p className="text-lg font-bold">{localizedLargest?.name ?? largest.segment_name}</p>{largest.targeted_by_setup && <StatusBadge tone="teal">{t("common.targeted")}</StatusBadge>}</div></div></div><div className="mt-5 rounded-lg bg-slate-50 p-4"><div className="flex items-end justify-between"><div><p className="text-3xl font-bold text-navy">{largest.user_count}</p><p className="mt-1 text-xs text-slate-500">{t("common.users")} · {((largest.user_count / analysis.metrics.totalUsers) * 100).toFixed(1)}% {language === "zh" ? "占用户总量" : "of base"}</p></div><Users className="text-slate-300" /></div></div><dl className="mt-5 space-y-4 text-xs"><div><dt className="label">{t("segmentation.observed")}</dt><dd className="leading-5 text-slate-600">{localizedLargest?.behavior ?? largest.key_behavior}</dd></div><div><dt className="label">{t("segmentation.direction")}</dt><dd className="font-semibold leading-5 text-teal">{localizedLargest?.direction ?? largest.recommended_direction}</dd></div></dl></div>
    </section>
    <section className="card mt-5 overflow-hidden"><div className="border-b border-line px-5 py-4"><p className="eyebrow">{t("segmentation.playbook")}</p><h3 className="mt-1 text-base font-bold">{t("segmentation.subtitle")}</h3></div><SegmentTable segments={analysis.segments} /></section>
    <div className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-3 text-[11px] leading-5 text-slate-500"><b className="text-slate-700">{t("segmentation.assignment")}</b> {t("segmentation.assignmentText")}</div>
  </>;
}
