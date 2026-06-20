"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { runAnalysis } from "@/lib/analysisEngine";
import { generateSampleData } from "@/lib/sampleData";
import type { AnalysisResult, BusinessContext, UserRecord } from "@/lib/types";

const defaultContext: BusinessContext = {
  companyName: "Fitness Subscription Growth Diagnosis",
  businessType: "Fitness Subscription Platform",
  businessModel: "Monthly Subscription",
  currentProblems: ["Weak active-user retention signals", "Low paid conversion"],
  targetUsers: ["New users", "High-potential users", "Churn-risk users"],
  primaryGoal: "Improve retention",
  previousStrategies: "Generic onboarding emails and broad discount campaigns.",
};

interface WorkspaceValue {
  context: BusinessContext; setContext: (value: BusinessContext) => void;
  users: UserRecord[]; setUsers: (value: UserRecord[]) => void;
  analysis: AnalysisResult | null; runDiagnosis: () => AnalysisResult | null;
  dataSource: string; setDataSource: (value: string) => void;
  isHydrated: boolean; loadSample: () => UserRecord[];
  startDemo: () => void; resetDemo: () => void;
}

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [context, setContextState] = useState(defaultContext);
  const [users, setUsersState] = useState<UserRecord[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [dataSource, setDataSource] = useState("No dataset loaded");
  const [isHydrated, setHydrated] = useState(false);
  const skipNextPersist = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem("gsc-workspace");
      if (saved) {
        const parsed = JSON.parse(saved);
        const migratedContext: BusinessContext = parsed.context ? {
          ...parsed.context,
          currentProblems: (parsed.context.currentProblems ?? []).map((problem: string) => problem.includes("Declining") && problem.includes("retention") ? "Weak active-user retention signals" : problem),
        } : defaultContext;
        const savedUsers: UserRecord[] = Array.isArray(parsed.users) ? parsed.users : [];
        // Client hydration intentionally restores the browser-local demo workspace.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setContextState(migratedContext);
        setUsersState(savedUsers);
        if (savedUsers.length) setAnalysis(runAnalysis(migratedContext, savedUsers));
        if (parsed.dataSource) setDataSource(parsed.dataSource);
      }
    } catch { /* Start with safe defaults when local state is invalid. */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;
    if (skipNextPersist.current) { skipNextPersist.current = false; return; }
    try { window.localStorage.setItem("gsc-workspace", JSON.stringify({ context, users, analysis, dataSource })); } catch { /* Keep the in-memory demo usable when storage is unavailable. */ }
  }, [context, users, analysis, dataSource, isHydrated]);

  const setContext = useCallback((value: BusinessContext) => { setContextState(value); setAnalysis(null); }, []);
  const setUsers = useCallback((value: UserRecord[]) => { setUsersState(value); setAnalysis(null); }, []);
  const loadSample = useCallback(() => {
    const rows = generateSampleData(); setUsersState(rows); setDataSource("Sample Fitness Dataset · 160 synthetic rows"); setAnalysis(null); return rows;
  }, []);
  const startDemo = useCallback(() => {
    const demoContext: BusinessContext = { ...defaultContext, currentProblems: [...defaultContext.currentProblems], targetUsers: [...defaultContext.targetUsers] };
    const rows = generateSampleData();
    setContextState(demoContext); setUsersState(rows); setDataSource("Sample Fitness Dataset · 160 synthetic rows"); setAnalysis(null);
  }, []);
  const resetDemo = useCallback(() => {
    skipNextPersist.current = true;
    if (typeof window !== "undefined") {
      try { window.localStorage.removeItem("gsc-workspace"); } catch { /* Reset in-memory state even if storage is unavailable. */ }
    }
    setContextState({ ...defaultContext, currentProblems: [...defaultContext.currentProblems], targetUsers: [...defaultContext.targetUsers] });
    setUsersState([]); setAnalysis(null); setDataSource("No dataset loaded");
  }, []);
  const runDiagnosis = useCallback(() => {
    if (!users.length) return null;
    const result = runAnalysis(context, users); setAnalysis(result); return result;
  }, [context, users]);

  const value = useMemo(() => ({ context, setContext, users, setUsers, analysis, runDiagnosis, dataSource, setDataSource, isHydrated, loadSample, startDemo, resetDemo }), [context, setContext, users, setUsers, analysis, runDiagnosis, dataSource, isHydrated, loadSample, startDemo, resetDemo]);
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return value;
}
