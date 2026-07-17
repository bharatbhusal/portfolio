import { getResumesCollection, serializeId } from "@/lib/mongodb";
import { apiSuccess, handleApiError } from "@/lib/api-utils";

export async function GET() {
  try {
    const col = await getResumesCollection();
    const doc = await col.findOne({}, { sort: { createdAt: -1 } });
    if (!doc) {
      return apiSuccess(null);
    }
    const serialized = serializeId(doc);
    if (process.env.NODE_ENV === "development") {
      serialized.createdAt = new Date(0).toISOString();
    }
    return apiSuccess(serialized);
  } catch (error) {
    return handleApiError(error);
  }
}
