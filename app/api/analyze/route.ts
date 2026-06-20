import { NextResponse } from "next/server";
import { runAnalysis } from "@/lib/analysisEngine";
import { aiAnalysisSchema, type BusinessContext, type UserRecord } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { context: BusinessContext; users: UserRecord[] };
    if (!body.context || !Array.isArray(body.users) || !body.users.length) {
      return NextResponse.json({ error: "Business context and at least one user row are required." }, { status: 400 });
    }
    // Mock provider: deterministic rule output. Replace this block with a Responses API call later,
    // then validate the model JSON with the same schema before returning it.
    const result = runAnalysis(body.context, body.users);
    const validated = aiAnalysisSchema.parse(result);
    return NextResponse.json({ provider: "mock", result: validated });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Analysis failed" }, { status: 500 });
  }
}
