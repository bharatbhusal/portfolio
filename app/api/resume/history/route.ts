import { NextRequest, NextResponse } from "next/server";
import Resume from "@/models/resume";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "6", 10)));
  const skip = (page - 1) * limit;

  const [raw, total] = await Promise.all([
    Resume.find({}, { basics: 1, createdAt: 1 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Resume.countDocuments(),
  ]);

  const docs = raw.map((doc) => ({ ...doc, _id: doc._id.toString() }));

  return NextResponse.json({
    docs,
    total,
    page,
    pages: Math.ceil(total / limit),
  }, { headers: { "Cache-Control": "public, max-age=60" } });
}
