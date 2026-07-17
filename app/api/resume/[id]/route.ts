import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { getResumesCollection, serializeId } from "@/lib/mongodb";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return apiError(ErrorCode.VALIDATION_ERROR, "Invalid ID");
    }

    const col = await getResumesCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    if (!doc) {
      return apiError(ErrorCode.RESUME_NOT_FOUND, "Resume not found", 404);
    }

    return apiSuccess(serializeId(doc));
  } catch (error) {
    return handleApiError(error);
  }
}
