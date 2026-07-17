import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";
import type { CareerItem } from "@/types";
import { getCareerById, updateCareer, deleteCareer } from "@/services/career";
import { careerSchema } from "@/validations/career";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const career = await getCareerById(id);

    if (!career) {
      return apiError(ErrorCode.CAREER_NOT_FOUND, "Career not found", 404);
    }

    return apiSuccess(career);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = careerSchema.partial().safeParse(body);

    if (!result.success) {
      return apiError(
        ErrorCode.VALIDATION_ERROR,
        Object.values(result.error.flatten().fieldErrors).flat().join(", "),
      );
    }

    const updated = await updateCareer(id, result.data as Partial<CareerItem>);
    if (!updated) {
      return apiError(ErrorCode.CAREER_NOT_FOUND, "Career not found", 404);
    }

    return apiSuccess(updated, "Career updated");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const deleted = await deleteCareer(id);

    if (!deleted) {
      return apiError(ErrorCode.CAREER_NOT_FOUND, "Career not found", 404);
    }

    return apiSuccess(null, "Career deleted");
  } catch (error) {
    return handleApiError(error);
  }
}
