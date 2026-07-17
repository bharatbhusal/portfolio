import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";
import type { CareerItem } from "@/types";
import { getAllCareer, createCareer } from "@/services/career";
import { careerSchema } from "@/validations/career";

// Form data may arrive with array fields serialized as JSON strings.
// Coerce them back into arrays before Zod validation.
function coerceArrays(body: Record<string, unknown>) {
  const out = { ...body };
  for (const key of ["links", "achievements", "courses"]) {
    const v = out[key];
    if (typeof v === "string") {
      try {
        const parsed = JSON.parse(v);
        if (Array.isArray(parsed)) out[key] = parsed;
      } catch {
        // leave as-is; Zod will report the validation error
      }
    }
  }
  return out;
}

export async function GET() {
  try {
    const career = await getAllCareer();
    return apiSuccess(career);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const normalized = coerceArrays(body);
    const result = careerSchema.safeParse(normalized);

    if (!result.success) {
      return apiError(
        ErrorCode.VALIDATION_ERROR,
        Object.values(result.error.flatten().fieldErrors).flat().join(", "),
      );
    }

    const created = await createCareer(result.data as CareerItem);
    return apiSuccess(created, "Career created");
  } catch (error) {
    return handleApiError(error);
  }
}
