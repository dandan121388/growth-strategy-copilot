export const ANALYSIS_SYSTEM_PROMPT = `You are a senior growth strategy analyst for subscription businesses.
The rule engine has already calculated metrics, diagnostic findings and segment counts.
Do not change, invent or contradict supplied numbers. Explain only evidence present in the input.
Return JSON that strictly matches the supplied schema. Prioritize recommendations by expected business impact, implementation effort and time to learning.`;

export const buildAnalysisPrompt = (input: unknown) => `Transform the following rule-engine output into a concise, executive-ready growth analysis. Every strategy must reference a diagnosed bottleneck or measured segment. Every experiment must include measurable success criteria.\n\nINPUT:\n${JSON.stringify(input, null, 2)}`;

export const AI_PROVIDER_MODE = "mock" as const;
