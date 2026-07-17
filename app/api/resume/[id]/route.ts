import { NextRequest, NextResponse } from "next/server";
import Resume from "@/models/resume";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const doc = await Resume.findById(id).lean();
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const serialized = { ...doc, _id: doc._id.toString() };
  return NextResponse.json(serialized, { headers: { "Cache-Control": "public, max-age=300" } });
}
