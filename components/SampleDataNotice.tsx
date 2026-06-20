"use client";

import { FlaskConical } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export const SAMPLE_DATA_LIMITATION = "Sample data is synthetic and used to demonstrate the analysis workflow. It should not be used for production-level causal inference or experiment sizing.";

export function SampleDataNotice({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  return <div className={`flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 text-amber-900 ${compact ? "p-3 text-[11px] leading-5" : "p-4 text-xs leading-6"}`}><FlaskConical className="mt-0.5 shrink-0 text-amber-600" size={compact ? 14 : 16} /><div><b className="font-bold">{t("common.sampleTitle")}</b> {t("common.sampleNotice")}</div></div>;
}
