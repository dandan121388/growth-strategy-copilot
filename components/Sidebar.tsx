"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Blocks, ChartNoAxesCombined, FlaskConical, Languages, LayoutDashboard, Lightbulb, Settings2, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";

const nav = [
  ["dashboard", "/dashboard", LayoutDashboard], ["businessSetup", "/business-setup", Settings2],
  ["dataUpload", "/data-upload", UploadCloud], ["diagnosis", "/diagnosis", ChartNoAxesCombined],
  ["segmentation", "/segmentation", Blocks], ["strategy", "/strategy", Lightbulb],
  ["experiments", "/experiments", FlaskConical], ["report", "/report", BarChart3],
] as const;

export function Sidebar({ mobileOpen = false, onClose = () => undefined }: { mobileOpen?: boolean; onClose?: () => void }) {
  const path = usePathname();
  const { language, setLanguage, t } = useLanguage();
  return <>
    <button onClick={onClose} aria-label={language === "zh" ? "关闭导航" : "Close navigation"} className={cn("fixed inset-0 z-30 bg-navy/45 backdrop-blur-[1px] transition md:hidden", mobileOpen ? "block" : "hidden")} />
    <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-[min(86vw,232px)] flex-col border-r border-white/10 bg-[#142c43] text-white shadow-2xl transition-transform duration-200 md:z-30 md:w-[232px] md:translate-x-0 md:shadow-none", mobileOpen ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex items-start justify-between border-b border-white/10 px-5 py-5">
        <div><div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-sm font-black">GS</div><p className="text-sm font-bold tracking-tight">{t("common.productName")}</p></div>
        <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden" aria-label={language === "zh" ? "关闭导航" : "Close navigation"}><X size={20} /></button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {nav.map(([key, href, Icon]) => {
          const active = path === href;
          return <Link onClick={onClose} key={href} href={href} className={cn("flex min-h-10 items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition", active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white")}>
            <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />{t(`sidebar.${key}`)}{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#65c9be]" />}
          </Link>;
        })}
      </nav>
      <div className="m-3 space-y-3">
        <div className="hidden rounded-lg border border-white/10 bg-white/5 p-3 lg:block"><p className="text-[10px] font-bold uppercase tracking-widest text-[#79cbc2]">{t("sidebar.engine")}</p><p className="mt-1.5 text-xs leading-5 text-slate-300">{t("sidebar.ruleBased")}<br />{t("sidebar.structured")}</p></div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-2"><div className="mb-2 flex items-center gap-2 px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400"><Languages size={12} />{language === "zh" ? "语言" : "Language"}</div><div className="grid grid-cols-2 gap-1"><button onClick={() => setLanguage("en")} className={cn("min-h-9 rounded-md px-2 py-1.5 text-[11px] font-semibold transition", language === "en" ? "bg-white text-navy" : "text-slate-300 hover:bg-white/10")}>{t("common.english")}</button><button onClick={() => setLanguage("zh")} className={cn("min-h-9 rounded-md px-2 py-1.5 text-[11px] font-semibold transition", language === "zh" ? "bg-white text-navy" : "text-slate-300 hover:bg-white/10")}>{t("common.chinese")}</button></div></div>
      </div>
    </aside>
  </>;
}
