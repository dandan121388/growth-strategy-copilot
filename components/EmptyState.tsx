"use client";

import Link from "next/link";
import { DatabaseZap } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function EmptyState({ title, description, href = "/data-upload", action }: { title?: string; description?: string; href?: string; action?: string }) {
  const { language } = useLanguage();
  const defaults = language === "zh"
    ? { title: "需要分析数据", description: "请先返回工作台并点击“使用健身样例开始演示”，或前往数据导入页面手动加载数据。", dashboard: "返回工作台开始演示", action: "前往数据导入" }
    : { title: "Analysis data required", description: "Start the guided fitness sample from Dashboard, or go to Data Upload to load data manually.", dashboard: "Start from Dashboard", action: "Go to Data Upload" };
  return <div className="card flex min-h-[360px] flex-col items-center justify-center p-6 text-center sm:p-8"><span className="mb-4 rounded-xl bg-teal/10 p-3 text-teal"><DatabaseZap /></span><h3 className="text-lg font-bold">{title ?? defaults.title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{description ?? defaults.description}</p><div className="mt-5 flex w-full max-w-sm flex-col justify-center gap-2 sm:flex-row"><Link href="/dashboard" className="btn-primary">{defaults.dashboard}</Link><Link href={href} className="btn-secondary">{action ?? defaults.action}</Link></div></div>;
}
