"use client";

import { CartesianGrid, Label, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import type { Strategy } from "@/lib/types";
import { strategyZh } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

export function PriorityMatrix({ strategies }: { strategies: Strategy[] }) {
  const { language, t } = useLanguage();
  const priorityColors = { P0: "#16877d", P1: "#17324d", P2: "#94a3b8" };
  const data = strategies.map((strategy) => ({ x: strategy.effort, y: strategy.impact, z: 180, name: language === "zh" ? strategyZh[strategy.strategy_name]?.name ?? strategy.strategy_name : strategy.strategy_name, priority: strategy.priority, score: strategy.priority_score, confidence: strategy.confidence_score, fill: priorityColors[strategy.priority] }));
  return <div className="h-[320px] min-w-0 sm:h-[360px]"><ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} initialDimension={{ width: 300, height: 320 }}><ScatterChart margin={{ top: 20, right: 18, bottom: 35, left: 2 }}>
    <CartesianGrid stroke="#edf0f3" /><XAxis type="number" dataKey="x" domain={[0, 10]} tickCount={6} tick={{ fontSize: 10, fill: "#64748b" }}><Label value={`${t("strategy.effort")} →`} offset={-24} position="insideBottom" style={{ fontSize: 11, fill: "#64748b" }} /></XAxis>
    <YAxis type="number" dataKey="y" domain={[0, 10]} tickCount={6} tick={{ fontSize: 10, fill: "#64748b" }}><Label value={`${t("strategy.impact")} →`} angle={-90} position="insideLeft" style={{ fontSize: 11, fill: "#64748b" }} /></YAxis><ZAxis type="number" dataKey="z" range={[130, 230]} />
    <ReferenceLine x={5} stroke="#cbd5e1" strokeDasharray="4 4" /><ReferenceLine y={5} stroke="#cbd5e1" strokeDasharray="4 4" />
    <Tooltip cursor={{ strokeDasharray: "3 3" }} content={({ active, payload }) => active && payload?.length ? <div className="rounded-lg border border-line bg-white p-3 shadow-lg"><p className="max-w-[190px] text-xs font-bold">{payload[0].payload.name}</p><p className="mt-1 text-[11px] text-slate-500">{payload[0].payload.priority} · {t("strategy.priority")} {payload[0].payload.score} · {t("strategy.impact")} {payload[0].payload.y} · {t("strategy.confidence")} {payload[0].payload.confidence} · {t("strategy.effort")} {payload[0].payload.x}</p></div> : null} />
    <Scatter data={data} shape="circle" />
  </ScatterChart></ResponsiveContainer></div>;
}
