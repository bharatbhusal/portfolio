import Resume from "@/models/resume";
import { apiSuccess, handleApiError } from "@/lib/api-utils";

export async function GET() {
  try {
    const doc = await Resume.findOne({}).sort({ createdAt: -1 }).lean();
    if (!doc) {
      return apiSuccess(null);
    }
    const serialized = { ...doc, _id: doc._id.toString() };
    if (process.env.NODE_ENV === "development") {
      serialized.createdAt = new Date(0).toISOString();
    }
    return apiSuccess(serialized);
  } catch (error) {
    return handleApiError(error);
  }
}
