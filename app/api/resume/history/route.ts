import { NextRequest } from "next/server";
import Resume from "@/models/resume";
import { apiPaginated, handleApiError } from "@/lib/api-utils";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "6", 10)));
    const skip = (page - 1) * limit;
    await connectDB();
    const [raw, total] = await Promise.all([
      Resume.find({}, { basics: 1, createdAt: 1 })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Resume.countDocuments(),
    ]);

    const docs = raw.map((doc) => ({ ...doc, _id: doc._id.toString() }));

    return apiPaginated(docs, total, page, Math.ceil(total / limit));
  } catch (error) {
    return handleApiError(error);
  }
}
