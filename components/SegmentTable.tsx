"use client";

import type { SegmentSummary } from "@/lib/types";
import { segmentZh } from "@/lib/i18n";
import { StatusBadge } from "./StatusBadge";
import { useLanguage } from "./LanguageProvider";

export function SegmentTable({ segments }: { segments: SegmentSummary[] }) {
  const { language, t } = useLanguage();
  return <div className="overflow-x-auto"><table className="w-full min-w-[840px] text-left text-xs"><thead><tr className="border-b border-line bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-500"><th className="px-4 py-3">{t("segmentation.segment")}</th><th className="px-4 py-3 text-right">{t("segmentation.userCount")}</th><th className="px-4 py-3">{t("segmentation.behavior")}</th><th className="px-4 py-3">{t("segmentation.problem")}</th><th className="px-4 py-3">{t("segmentation.direction")}</th></tr></thead><tbody>{segments.map((segment) => { const localized = language === "zh" ? segmentZh[segment.segment_name] : undefined; return <tr key={segment.segment_name} className="border-b border-line last:border-0 hover:bg-slate-50/50"><td className="px-4 py-3.5 font-bold text-ink"><div className="flex flex-wrap items-center gap-2">{localized?.name ?? segment.segment_name}{segment.targeted_by_setup && <StatusBadge tone="teal">{t("common.targeted")}</StatusBadge>}</div></td><td className="px-4 py-3.5 text-right text-base font-bold text-navy">{segment.user_count}</td><td className="max-w-[210px] px-4 py-3.5 leading-5 text-slate-600">{localized?.behavior ?? segment.key_behavior}</td><td className="max-w-[210px] px-4 py-3.5 leading-5 text-slate-600">{localized?.problem ?? segment.main_problem}</td><td className="max-w-[210px] px-4 py-3.5 font-medium leading-5 text-teal">{localized?.direction ?? segment.recommended_direction}</td></tr>; })}</tbody></table></div>;
}
