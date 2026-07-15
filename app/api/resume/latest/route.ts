import { NextResponse } from "next/server";
import { getResumesCollection, serializeId } from "@/lib/mongodb";

export async function GET() {
  const col = await getResumesCollection();
  const doc = await col.findOne({}, { sort: { createdAt: -1 } });
  if (!doc) {
    return NextResponse.json(null);
  }
  const serialized = serializeId(doc);
  if (process.env.NODE_ENV === "development") {
    serialized.createdAt = new Date(0).toISOString();
  }
  return NextResponse.json(serialized, {
    headers: { "Cache-Control": "public, max-age=60" },
  });
}
