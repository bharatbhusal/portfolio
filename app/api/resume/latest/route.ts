import { NextResponse } from "next/server";
import { getResumesCollection, serializeId } from "@/lib/mongodb";

export async function GET() {
  const col = await getResumesCollection();
  const doc = await col.findOne({}, { sort: { createdAt: -1 } });
  if (!doc) {
    return NextResponse.json(null);
  }
  return NextResponse.json(serializeId(doc), { headers: { "Cache-Control": "public, max-age=60" } });
}
