import { NextRequest } from "next/server";
import { buildResumeContext, buildSystemPrompt, buildUserPrompt, postProcessResume } from "@/lib/resume";
import { generateResume } from "@/lib/llm";
import { getResumesCollection } from "@/lib/mongodb";
import { checkApiRateLimit, checkPdfRateLimit, extractIp } from "@/lib/rate-limit";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";
import type { JobRole } from "@/types/resume";

export async function POST(req: NextRequest) {
  try {
    const ip = extractIp(req.headers);

    const apiCheck = await checkApiRateLimit(ip);
    if (!apiCheck.allowed) {
      return apiError(
        ErrorCode.RATE_LIMIT_EXCEEDED,
        `Rate limited. Try again in ${Math.ceil((apiCheck.retryAfterMs || 0) / 1000)}s.`,
        429,
      );
    }

    const pdfCheck = checkPdfRateLimit();
    if (!pdfCheck.allowed) {
      return apiError(
        ErrorCode.RATE_LIMIT_EXCEEDED,
        `Resume just generated. Try again in ${Math.ceil((pdfCheck.retryAfterMs || 0) / 1000)}s.`,
        429,
      );
    }

    const { role } = (await req.json()) as { role: JobRole };
    if (!role) {
      return apiError(ErrorCode.MISSING_REQUIRED_FIELD, "role is required");
    }

    const ctx = await buildResumeContext();
    const systemPrompt = buildSystemPrompt(role);
    const userPrompt = buildUserPrompt(ctx, role);
    const rawOutput = await generateResume(systemPrompt, userPrompt);
    const resume = await postProcessResume(rawOutput as unknown as Record<string, unknown>, ctx);

    const col = await getResumesCollection();
    const doc = {
      ...resume,
      role,
      createdAt: new Date(),
    };
    const result = await col.insertOne(doc);

    return apiSuccess({ ...doc, _id: result.insertedId.toString() });
  } catch (error) {
    console.error("Resume generation failed:", error);
    return handleApiError(error);
  }
}
