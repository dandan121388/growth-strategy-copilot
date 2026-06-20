"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { domainLabel, getTranslation, type Language } from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  d: (value: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem("gsc-language");
      // Client hydration intentionally restores the persisted presentation language.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "zh" || saved === "en") setLanguageState(saved);
    } catch { /* Keep English when browser storage is unavailable. */ }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = language === "zh" ? "增长策略 Copilot" : "Growth Strategy Copilot";
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    if (typeof window !== "undefined") {
      try { window.localStorage.setItem("gsc-language", nextLanguage); } catch { /* Language still changes for the current session. */ }
    }
    if (typeof document !== "undefined") document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
  }, []);
  const t = useCallback((path: string, params?: Record<string, string | number>) => getTranslation(language, path, params), [language]);
  const d = useCallback((value: string) => domainLabel(value, language), [language]);
  const value = useMemo(() => ({ language, setLanguage, t, d }), [language, setLanguage, t, d]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
