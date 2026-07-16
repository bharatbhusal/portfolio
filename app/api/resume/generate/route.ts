import { NextRequest, NextResponse } from "next/server";
import { buildResumeContext, buildSystemPrompt, buildUserPrompt, postProcessResume } from "@/lib/resume";
import { generateResume } from "@/lib/llm";
import { getResumesCollection } from "@/lib/mongodb";
import { checkApiRateLimit, checkPdfRateLimit, extractIp } from "@/lib/rate-limit";
import type { JobRole } from "@/types/resume";

export async function POST(req: NextRequest) {
  try {
    const ip = extractIp(req.headers);

    // Per-user API rate limit (30s)
    const apiCheck = await checkApiRateLimit(ip);
    if (!apiCheck.allowed) {
      return NextResponse.json(
        { error: `Rate limited. Try again in ${Math.ceil((apiCheck.retryAfterMs || 0) / 1000)}s.` },
        { status: 429 }
      );
    }

    // Service-wide PDF rate limit (5min)
    const pdfCheck = checkPdfRateLimit();
    if (!pdfCheck.allowed) {
      return NextResponse.json(
        { error: `Resume just generated. Try again in ${Math.ceil((pdfCheck.retryAfterMs || 0) / 1000)}s.` },
        { status: 429 }
      );
    }

    const { role } = (await req.json()) as { role: JobRole };
    if (!role) {
      return NextResponse.json({ error: "role is required" }, { status: 400 });
    }

    const ctx = await buildResumeContext();
    const systemPrompt = buildSystemPrompt(role);
    const userPrompt = buildUserPrompt(ctx, role);
    const rawOutput = await generateResume(systemPrompt, userPrompt);
    const resume = await postProcessResume(rawOutput as unknown as Record<string, unknown>, ctx);

    // Save to MongoDB
    const col = await getResumesCollection();
    const doc = {
      ...resume,
      role,
      createdAt: new Date(),
    };
    const result = await col.insertOne(doc);

    return NextResponse.json(
      { ...doc, _id: result.insertedId.toString() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Resume generation failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
