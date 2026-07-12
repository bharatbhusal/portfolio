import { NextRequest, NextResponse } from "next/server";
import { getResumesCollection, serializeId } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "6", 10)));
  const skip = (page - 1) * limit;

  const col = await getResumesCollection();
  const [raw, total] = await Promise.all([
    col.find({}, { projection: { basics: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    col.countDocuments(),
  ]);

  const docs = raw.map(serializeId);

  return NextResponse.json({
    docs,
    total,
    page,
    pages: Math.ceil(total / limit),
  }, { headers: { "Cache-Control": "public, max-age=60" } });
}
