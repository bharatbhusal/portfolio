import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";
import type { EducationItem } from "@/types";
import { getEducationById, updateEducation, deleteEducation } from "@/services/education";
import { educationSchema } from "@/validations/education";
import { connectDB } from "@/lib/mongodb";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const education = await getEducationById(id);

    if (!education) {
      return apiError(ErrorCode.EDUCATION_NOT_FOUND, "Education not found", 404);
    }

    return apiSuccess(education);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = educationSchema.partial().safeParse(body);

    if (!result.success) {
      return apiError(
        ErrorCode.VALIDATION_ERROR,
        Object.values(result.error.flatten().fieldErrors).flat().join(", "),
      );
    }
    await connectDB();
    const updated = await updateEducation(id, result.data as Partial<EducationItem>);
    if (!updated) {
      return apiError(ErrorCode.EDUCATION_NOT_FOUND, "Education not found", 404);
    }

    return apiSuccess(updated, "Education updated");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const deleted = await deleteEducation(id);

    if (!deleted) {
      return apiError(ErrorCode.EDUCATION_NOT_FOUND, "Education not found", 404);
    }

    return apiSuccess(null, "Education deleted");
  } catch (error) {
    return handleApiError(error);
  }
}
