"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { SegmentSummary } from "@/lib/types";
import { segmentZh } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

const colors = ["#17324d", "#16877d", "#5aaea6", "#8bc8c2", "#cf9a56", "#7b8ea3"];

export function SegmentChart({ segments }: { segments: SegmentSummary[] }) {
  const { language, t } = useLanguage();
  const rows = segments.map((segment) => ({ ...segment, localized_name: language === "zh" ? segmentZh[segment.segment_name]?.name ?? segment.segment_name : segment.segment_name }));
  return <div className="grid min-w-0 items-center gap-2 sm:grid-cols-[1fr_210px]"><div className="h-[250px] min-w-0"><ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} initialDimension={{ width: 300, height: 250 }}><PieChart><Pie data={rows} dataKey="user_count" nameKey="localized_name" innerRadius={64} outerRadius={96} paddingAngle={2} stroke="none">{rows.map((_, i) => <Cell key={i} fill={colors[i]} />)}</Pie><Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e4e9ef", fontSize: 12 }} /></PieChart></ResponsiveContainer></div><div className="space-y-2.5">{rows.map((segment, i) => <div key={segment.segment_name} className="flex items-center gap-2 text-xs"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: colors[i] }} /><span className="min-w-0 flex-1 truncate text-slate-600">{segment.localized_name}</span>{segment.targeted_by_setup && <span className="text-[9px] font-bold text-teal">{t("segmentation.targetShort")}</span>}<b>{segment.user_count}</b></div>)}</div></div>;
}
