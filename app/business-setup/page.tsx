"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { useLanguage } from "@/components/LanguageProvider";
import type { BusinessContext, BusinessType } from "@/lib/types";

const businessTypes: BusinessType[] = ["Fitness Subscription Platform", "Content Subscription Platform", "Online Education Platform", "SaaS Tool Platform", "Membership E-commerce Platform"];
const businessModels = ["Monthly Subscription", "Freemium + Paid Plan", "Course Package", "Membership Model", "Hybrid Model"];
const problems = ["User growth slowdown", "Low activation rate", "Low paid conversion", "Weak active-user retention signals", "High churn rate", "Low campaign ROI", "Weak user engagement"];
const userTypes = ["New users", "Light users", "High-potential users", "Paid users", "High-value users", "Churn-risk users", "Price-sensitive users"];
const goals = ["Increase activation", "Improve retention", "Increase paid conversion", "Reduce churn", "Improve LTV", "Improve marketing ROI"];

function MultiSelect({ options, value, onChange, labelFor }: { options: string[]; value: string[]; onChange: (value: string[]) => void; labelFor: (value: string) => string }) {
  return <div className="flex flex-wrap gap-2">{options.map((option) => { const selected = value.includes(option); return <button type="button" key={option} onClick={() => onChange(selected ? value.filter((item) => item !== option) : [...value, option])} className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${selected ? "border-teal bg-teal/[0.06] text-teal" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>{selected && <Check size={12} />}{labelFor(option)}</button>; })}</div>;
}

export default function BusinessSetupPage() {
  const router = useRouter();
  const { context, setContext, users, dataSource } = useWorkspace();
  const { language, t, d } = useLanguage();
  const [form, setForm] = useState<BusinessContext>(context);
  const update = <K extends keyof BusinessContext>(key: K, value: BusinessContext[K]) => setForm((current) => ({ ...current, [key]: value }));
  const save = () => { if (!form.companyName.trim() || !form.currentProblems.length || !form.targetUsers.length) return; setContext(form); router.push("/data-upload"); };
  return <>
    <PageHeader eyebrow={t("businessSetup.eyebrow")} title={t("businessSetup.title")} description={t("businessSetup.description")} />
    {users.length > 0 && dataSource.includes("Sample Fitness Dataset") && <div className="mb-5 rounded-lg border border-teal/20 bg-teal/[0.04] p-3 text-xs leading-5 text-slate-600"><b className="text-teal">{t("businessSetup.demoTitle")}</b> {t("businessSetup.demoText")}</div>}
    <form onSubmit={(event) => { event.preventDefault(); save(); }} className="card overflow-hidden">
      <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-7">
        <div className="sm:col-span-2"><label className="label">{t("businessSetup.company")}</label><input className="input" value={form.companyName} onChange={(event) => update("companyName", event.target.value)} placeholder={language === "zh" ? "例如：健身订阅增长诊断" : "e.g. Fitness Subscription Growth Diagnosis"} /></div>
        <div><label className="label">{t("businessSetup.businessType")}</label><select className="input" value={form.businessType} onChange={(event) => update("businessType", event.target.value as BusinessType)}>{businessTypes.map((item) => <option key={item} value={item}>{d(item)}</option>)}</select></div>
        <div><label className="label">{t("businessSetup.businessModel")}</label><select className="input" value={form.businessModel} onChange={(event) => update("businessModel", event.target.value)}>{businessModels.map((item) => <option key={item} value={item}>{d(item)}</option>)}</select></div>
        <div className="sm:col-span-2"><label className="label">{t("businessSetup.currentProblem")} <span className="normal-case tracking-normal text-slate-400">· {t("businessSetup.selectAll")}</span></label><MultiSelect options={problems} value={form.currentProblems} onChange={(value) => update("currentProblems", value)} labelFor={d} /></div>
        <div className="sm:col-span-2"><label className="label">{t("businessSetup.targetUsers")}</label><MultiSelect options={userTypes} value={form.targetUsers} onChange={(value) => update("targetUsers", value)} labelFor={d} /></div>
        <div><label className="label">{t("businessSetup.primaryGoal")}</label><select className="input" value={form.primaryGoal} onChange={(event) => update("primaryGoal", event.target.value)}>{goals.map((item) => <option key={item} value={item}>{d(item)}</option>)}</select></div>
        <div><label className="label">{t("businessSetup.previous")}</label><textarea className="textarea" value={form.previousStrategies} onChange={(event) => update("previousStrategies", event.target.value)} placeholder={t("businessSetup.previousPlaceholder")} /></div>
      </div>
      <div className="flex items-center justify-between border-t border-line bg-slate-50/60 px-5 py-4 sm:px-7"><p className="text-[11px] text-slate-400">{t("businessSetup.local")}</p><button className="btn-primary" disabled={!form.companyName.trim() || !form.currentProblems.length || !form.targetUsers.length}>{t("businessSetup.save")} <ArrowRight size={15} /></button></div>
    </form>
  </>;
}
