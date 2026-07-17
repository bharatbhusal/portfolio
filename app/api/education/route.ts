import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";
import type { EducationItem } from "@/types";
import { getAllEducation, createEducation } from "@/services/education";
import { educationSchema } from "@/validations/education";

export async function GET() {
  try {
    const education = await getAllEducation();
    return apiSuccess(education);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = educationSchema.safeParse(body);

    if (!result.success) {
      return apiError(
        ErrorCode.VALIDATION_ERROR,
        Object.values(result.error.flatten().fieldErrors).flat().join(", "),
      );
    }

    const created = await createEducation(result.data as EducationItem);
    return apiSuccess(created, "Education created");
  } catch (error) {
    return handleApiError(error);
  }
}
