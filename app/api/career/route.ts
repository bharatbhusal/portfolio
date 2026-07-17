import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";
import type { CareerItem } from "@/types";
import { getAllCareer, createCareer } from "@/services/career";
import { careerSchema } from "@/validations/career";

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
    const result = careerSchema.safeParse(body);

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
