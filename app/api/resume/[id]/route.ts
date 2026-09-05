import { NextRequest } from "next/server";
import Resume from "@/models/resume";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";
import { connectDB } from "@/lib/mongodb";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const doc = await Resume.findById(id).lean();
    if (!doc) {
      return apiError(ErrorCode.RESUME_NOT_FOUND, "Resume not found", 404);
    }
    const serialized = { ...doc, _id: doc._id.toString() };
    return apiSuccess(serialized);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const doc = await Resume.findByIdAndDelete(id);
    if (!doc) {
      return apiError(ErrorCode.RESUME_NOT_FOUND, "Resume not found", 404);
    }
    return apiSuccess({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}
