"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { ArrowRight, CheckCircle2, Database, FileSpreadsheet, Loader2, UploadCloud } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { SampleDataNotice } from "@/components/SampleDataNotice";
import { sampleFields } from "@/lib/sampleData";
import type { UserRecord } from "@/lib/types";

const numericFields = ["sessions_per_week", "course_started", "course_completed", "completion_rate", "last_active_days_ago", "payment_amount", "campaign_exposure"];
function normalize(row: Record<string, string>): UserRecord {
  const result = { ...row } as unknown as UserRecord;
  numericFields.forEach((key) => ((result as unknown as Record<string, unknown>)[key] = Number(row[key] || 0)));
  result.coupon_used = ["true", "1", "yes"].includes(String(row.coupon_used).toLowerCase());
  return result;
}

export default function DataUploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { users, setUsers, dataSource, setDataSource, loadSample, runDiagnosis } = useWorkspace();
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleFile = (file?: File) => { if (!file) return; setLoading(true); setError(""); Papa.parse<Record<string, string>>(file, { header: true, skipEmptyLines: true, complete: (results) => {
    const missing = sampleFields.filter((field) => !results.meta.fields?.includes(field));
    if (missing.length) { setError(language === "zh" ? `缺少必需字段：${missing.join(", ")}` : `Missing required fields: ${missing.join(", ")}`); setLoading(false); return; }
    setUsers(results.data.map(normalize)); setDataSource(`${file.name} · ${results.data.length} rows`); setLoading(false);
  }, error: (parseError) => { setError(parseError.message); setLoading(false); } }); };
  const missingValues = users.reduce((sum, row) => sum + sampleFields.filter((key) => row[key] === "" || row[key] === null || row[key] === undefined).length, 0);
  const run = () => { const result = runDiagnosis(); if (result) router.push("/diagnosis"); };
  const qualityCards = [
    [t("dataUpload.rows"), users.length, t("dataUpload.records")],
    [t("dataUpload.fields"), sampleFields.length, t("dataUpload.schema")],
    [t("dataUpload.missing"), missingValues, missingValues ? (language === "zh" ? "建议检查" : "Review recommended") : t("dataUpload.noGaps")],
    [t("dataUpload.quality"), missingValues ? (language === "zh" ? "待检查" : "Review") : t("dataUpload.ready"), t("dataUpload.checks")],
  ];
  const displayedDataSource = language === "zh" && dataSource.startsWith("Sample Fitness Dataset") ? dataSource.replace("Sample Fitness Dataset", "健身订阅样例数据").replace("synthetic rows", "条合成记录") : dataSource;
  return <>
    <PageHeader eyebrow={t("dataUpload.eyebrow")} title={t("dataUpload.title")} description={t("dataUpload.description")} />
    <div className="mb-5"><SampleDataNotice /></div>
    <section className="grid gap-4 lg:grid-cols-2">
      <button onClick={() => inputRef.current?.click()} className="card group flex min-h-[180px] items-center gap-5 p-6 text-left transition hover:border-teal/40 hover:shadow-md"><span className="rounded-xl bg-slate-100 p-4 text-navy transition group-hover:bg-navy group-hover:text-white"><UploadCloud /></span><div><h3 className="font-bold">{t("dataUpload.upload")}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{t("dataUpload.uploadText")}</p><span className="mt-3 inline-block text-xs font-bold text-teal">{t("dataUpload.choose")}</span></div><input ref={inputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])} /></button>
      <button onClick={() => loadSample()} className="card group flex min-h-[180px] items-center gap-5 border-teal/20 bg-gradient-to-br from-white to-teal/[0.035] p-6 text-left transition hover:border-teal/50 hover:shadow-md"><span className="rounded-xl bg-teal/10 p-4 text-teal"><Database /></span><div><div className="flex items-center gap-2"><h3 className="font-bold">{t("dataUpload.sample")}</h3><StatusBadge tone="teal">{t("dataUpload.recommended")}</StatusBadge></div><p className="mt-2 text-sm leading-6 text-slate-500">{t("dataUpload.sampleText")}</p><span className="mt-3 inline-block text-xs font-bold text-teal">{t("dataUpload.load")}</span></div></button>
    </section>
    {error && <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
    {loading && <div className="mt-4 flex items-center gap-2 text-sm text-slate-500"><Loader2 className="animate-spin" size={16} /> {t("dataUpload.parsing")}</div>}
    {users.length > 0 && <section className="mt-5 space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{qualityCards.map(([label, value, note], index) => <div key={String(label)} className="card p-4"><div className="flex items-center justify-between"><p className="text-xs font-semibold text-slate-500">{label}</p>{index === 3 && <CheckCircle2 size={15} className="text-emerald-500" />}</div><p className="mt-2 text-xl font-bold">{value}</p><p className="mt-1 text-[11px] text-slate-400">{note}</p></div>)}</div>
      <div className="card overflow-hidden"><div className="flex items-center justify-between border-b border-line px-5 py-4"><div className="flex items-center gap-2"><FileSpreadsheet size={17} className="text-teal" /><h3 className="text-sm font-bold">{t("dataUpload.preview")}</h3></div><StatusBadge tone="green">{displayedDataSource}</StatusBadge></div><div className="overflow-x-auto"><table className="w-full min-w-[1150px] text-left text-[11px]"><thead><tr className="bg-slate-50 text-[9px] uppercase tracking-wider text-slate-500">{sampleFields.slice(0, 10).map((field) => <th className="px-4 py-3" key={field}>{field.replaceAll("_", " ")}</th>)}</tr></thead><tbody>{users.slice(0, 6).map((row) => <tr key={row.user_id} className="border-t border-line">{sampleFields.slice(0, 10).map((field) => <td className="whitespace-nowrap px-4 py-3 text-slate-600" key={field}>{String(row[field])}</td>)}</tr>)}</tbody></table></div><div className="border-t border-line bg-slate-50/60 px-5 py-3 text-[11px] text-slate-400">{t("dataUpload.showing", { shown: Math.min(6, users.length), total: users.length, fields: sampleFields.length })}</div></div>
      <div className="flex justify-end"><button onClick={run} className="btn-primary">{t("dataUpload.run")} <ArrowRight size={15} /></button></div>
    </section>}
  </>;
}
