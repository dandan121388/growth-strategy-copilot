"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Download, Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useWorkspace } from "./WorkspaceProvider";
import { useLanguage } from "./LanguageProvider";
import { getLocalizedReport, localizedReportToMarkdown } from "@/lib/localizedReport";

const titleKeys: Record<string, string> = {
  "/dashboard": "dashboard", "/business-setup": "businessSetup", "/data-upload": "dataUpload",
  "/diagnosis": "diagnosis", "/segmentation": "segmentation", "/strategy": "strategy",
  "/experiments": "experiments", "/report": "report",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { context, analysis } = useWorkspace();
  const { language, t, d } = useLanguage();
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const exportReport = () => {
    if (!analysis) return;
    const blob = new Blob([localizedReportToMarkdown(getLocalizedReport(analysis, language), language)], { type: "text/markdown" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = language === "zh" ? "growth-strategy-analysis-zh.md" : "growth-strategy-analysis-en.md"; a.click(); URL.revokeObjectURL(url);
  };
  return <div className="min-h-screen bg-canvas">
    <Sidebar mobileOpen={mobileNavigationOpen} onClose={() => setMobileNavigationOpen(false)} />
    <div className="min-w-0 md:pl-[232px]">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button onClick={() => setMobileNavigationOpen(true)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 md:hidden" aria-label={language === "zh" ? "打开导航" : "Open navigation"} aria-expanded={mobileNavigationOpen}><Menu size={21} /></button>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-slate-400">{d(context.companyName)}</p>
            <h1 className="truncate text-sm font-bold text-ink">{titleKeys[path] ? t(`shell.${titleKeys[path]}`) : t("common.productName")}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex"><span className={`h-2 w-2 rounded-full ${analysis ? "bg-emerald-500" : "bg-amber-400"}`} />{analysis ? t("common.analysisReady") : t("common.setupInProgress")}</div>
          {analysis ? <button onClick={exportReport} className="btn-secondary h-9 px-3"><Download size={15} /> <span className="hidden sm:inline">{t("common.export")}</span></button> : <Link href="/data-upload" className="btn-secondary h-9 px-3">{t("common.loadData")}</Link>}
        </div>
      </header>
      <main className="mx-auto min-w-0 max-w-[1450px] overflow-x-hidden p-4 sm:p-6 lg:p-7">{children}</main>
    </div>
  </div>;
}
