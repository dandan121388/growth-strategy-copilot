import { cn } from "@/lib/utils";

export function StatusBadge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "teal" | "green" | "amber" | "red" | "slate" | "navy" }) {
  const styles = { teal: "bg-teal/10 text-teal", green: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700", red: "bg-rose-50 text-rose-700", slate: "bg-slate-100 text-slate-600", navy: "bg-navy/10 text-navy" };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold", styles[tone])}>{children}</span>;
}
