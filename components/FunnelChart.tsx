"use client";

import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Metrics } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";

const colors = ["#17324d", "#285675", "#16877d", "#4ba69d", "#7dc3bc", "#acd9d4"];

export function FunnelChart({ data }: { data: Metrics["funnel"] }) {
  const { language, d } = useLanguage();
  const rows = data.map((item) => ({ ...item, name: d(item.name), percent: Math.round(item.value * 100) }));
  return <div className="h-[260px] min-w-0 w-full sm:h-[285px]"><ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} initialDimension={{ width: 300, height: 260 }}><BarChart data={rows} layout="vertical" margin={{ top: 4, right: 38, left: 0, bottom: 4 }} barCategoryGap={13}>
    <CartesianGrid horizontal={false} stroke="#edf0f3" /><XAxis type="number" domain={[0, 100]} hide /><YAxis type="category" dataKey="name" width={128} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
    <Tooltip cursor={{ fill: "#f8fafc" }} formatter={(value) => [`${value}%`, language === "zh" ? "占总用户比例" : "Share of total users"]} contentStyle={{ borderRadius: 8, border: "1px solid #e4e9ef", fontSize: 12 }} />
    <Bar dataKey="percent" radius={[0, 5, 5, 0]} maxBarSize={25}>{rows.map((_, i) => <Cell key={i} fill={colors[i]} />)}<LabelList dataKey="percent" position="right" formatter={(v: unknown) => `${v}%`} style={{ fontSize: 11, fontWeight: 700, fill: "#334155" }} /></Bar>
  </BarChart></ResponsiveContainer></div>;
}
