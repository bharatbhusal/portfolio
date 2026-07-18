import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";
import { getPersonalInfo, updatePersonalInfo } from "@/services/personal-info";
import { personalInfoSchema } from "@/validations/personal-info";

export async function GET() {
  try {
    const info = await getPersonalInfo();
    return apiSuccess(info);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const result = personalInfoSchema.safeParse(body);

    if (!result.success) {
      return apiError(
        ErrorCode.VALIDATION_ERROR,
        Object.values(result.error.flatten().fieldErrors).flat().join(", "),
      );
    }

    const data = result.data;

    const updated = await updatePersonalInfo(data);
    return apiSuccess(updated, "Personal info updated");
  } catch (error) {
    return handleApiError(error);
  }
}
