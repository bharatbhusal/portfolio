import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getResumesCollection, serializeId } from "@/lib/mongodb";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const col = await getResumesCollection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(serializeId(doc), { headers: { "Cache-Control": "public, max-age=300" } });
}
