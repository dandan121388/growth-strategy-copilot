import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

export function MetricCard({ label, value, note, tone = "neutral" }: { label: string; value: string; note: string; tone?: "positive" | "negative" | "neutral" }) {
  const Icon = tone === "positive" ? ArrowUpRight : tone === "negative" ? ArrowDownRight : Minus;
  return <div className="card p-4">
    <div className="flex items-start justify-between"><p className="text-xs font-semibold text-slate-500">{label}</p><span className={`rounded-md p-1 ${tone === "positive" ? "bg-emerald-50 text-emerald-600" : tone === "negative" ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-400"}`}><Icon size={13} /></span></div>
    <p className="mt-3 text-2xl font-bold tracking-tight text-ink">{value}</p><p className="mt-1 text-[11px] text-slate-400">{note}</p>
  </div>;
}
