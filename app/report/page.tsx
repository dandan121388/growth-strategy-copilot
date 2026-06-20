"use client";

import { useState } from "react";
import { Check, Clipboard, Download, FileText, Presentation } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { ReportPreview } from "@/components/ReportPreview";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { CaseStudySnapshot } from "@/components/CaseStudySnapshot";
import { SampleDataNotice } from "@/components/SampleDataNotice";
import { bottleneckLabel } from "@/lib/i18n";
import { getLocalizedReport, localizedReportToMarkdown } from "@/lib/localizedReport";

type Tab = "executive" | "detailed" | "presentation";

export default function ReportPage() {
  const { analysis } = useWorkspace();
  const { language, t } = useLanguage();
  const [tab, setTab] = useState<Tab>("executive");
  const [copied, setCopied] = useState(false);
  if (!analysis) return <><PageHeader eyebrow={t("report.eyebrow")} title={t("report.title")} description={t("report.description")} /><EmptyState /></>;

  const report = getLocalizedReport(analysis, language);
  const presentationText = report.presentation_outline.map((slide) => `${slide.slide_title}\n${t("report.coreMessage")}: ${slide.core_message}\n${t("report.supportingEvidence")}: ${slide.supporting_evidence}\n${t("report.recommendedVisual")}: ${slide.recommended_visual}`).join("\n\n");
  const copy = async () => {
    const text = tab === "executive" ? report.executive_summary : tab === "detailed" ? report.detailed_report : presentationText;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea"); area.value = text; area.style.position = "fixed"; area.style.opacity = "0";
      document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
    }
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };
  const download = () => {
    const blob = new Blob([localizedReportToMarkdown(report, language)], { type: "text/markdown" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a");
    anchor.href = url; anchor.download = language === "zh" ? "growth-strategy-analysis-zh.md" : "growth-strategy-analysis-en.md"; anchor.click(); URL.revokeObjectURL(url);
  };
  const coverage = [t("report.context"), t("report.metrics"), t("report.segments"), t("report.hypotheses"), t("report.scoring"), t("report.plan")];

  return <>
    <PageHeader eyebrow={t("report.eyebrow")} title={t("report.title")} description={t("report.description")} actions={<div className="flex gap-2"><Button variant="outline" onClick={copy}>{copied ? <Check size={15} /> : <Clipboard size={15} />}{copied ? t("report.copied") : t("report.copy")}</Button><Button onClick={download}><Download size={15} /> {t("report.export")}</Button></div>} />
    <CaseStudySnapshot analysis={analysis} />
    <div className="mb-5"><SampleDataNotice compact /></div>
    <section className="grid gap-5 xl:grid-cols-[1fr_280px]"><div className="card overflow-hidden"><div className="flex overflow-x-auto border-b border-line bg-slate-50/60 p-2">{([ ["executive", t("report.executive"), FileText], ["detailed", t("report.detailed"), Clipboard], ["presentation", t("report.presentation"), Presentation] ] as const).map(([id, label, Icon]) => <button key={id} onClick={() => setTab(id)} className={`flex h-9 shrink-0 items-center gap-2 rounded-md px-3 text-xs font-semibold transition ${tab === id ? "bg-white text-navy shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:text-slate-700"}`}><Icon size={14} />{label}</button>)}</div>
      {tab === "presentation" ? <div className="space-y-3 p-6">{report.presentation_outline.map((slide, index) => <div key={slide.slide_title} className="flex gap-4 rounded-lg border border-line p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-navy text-xs font-bold text-white">{index + 1}</span><div className="min-w-0"><p className="text-sm font-bold">{slide.slide_title.replace(`Slide ${index + 1}: `, "").replace(`第 ${index + 1} 页：`, "")}</p><dl className="mt-3 space-y-2 text-xs leading-5"><div><dt className="font-bold text-slate-500">{t("report.coreMessage")}</dt><dd className="text-slate-700">{slide.core_message}</dd></div><div><dt className="font-bold text-slate-500">{t("report.supportingEvidence")}</dt><dd className="text-slate-600">{slide.supporting_evidence}</dd></div><div><dt className="font-bold text-slate-500">{t("report.recommendedVisual")}</dt><dd className="font-medium text-teal">{slide.recommended_visual}</dd></div></dl></div></div>)}</div> : <ReportPreview content={tab === "executive" ? report.executive_summary : report.detailed_report} />}
      </div>
      <aside className="space-y-4"><div className="card p-5"><p className="eyebrow">{t("report.coverage")}</p><div className="mt-4 space-y-3">{coverage.map((item) => <div key={item} className="flex items-center gap-2 text-xs text-slate-600"><Check size={13} className="text-emerald-500" />{item}</div>)}</div></div><div className="rounded-xl bg-navy p-5 text-white"><p className="text-[10px] font-bold uppercase tracking-widest text-[#79cbc2]">{t("report.decisionFocus")}</p><p className="mt-3 text-sm font-bold">{bottleneckLabel(analysis.diagnosis.main_bottleneck, language)}</p><p className="mt-2 text-xs leading-5 text-slate-300">{t("report.p0Text", { count: analysis.strategies.filter((strategy) => strategy.priority === "P0").length })}</p></div><div className="card p-4 text-[11px] leading-5 text-slate-500"><b className="text-slate-700">{t("report.provenance")}</b><br />{t("report.provenanceText")}</div></aside>
    </section>
  </>;
}
