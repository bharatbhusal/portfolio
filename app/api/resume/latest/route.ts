import { NextResponse } from "next/server";
import Resume from "@/models/resume";

export async function GET() {
  const doc = await Resume.findOne({}).sort({ createdAt: -1 }).lean();
  if (!doc) {
    return NextResponse.json(null);
  }
  const serialized = { ...doc, _id: doc._id.toString() };
  if (process.env.NODE_ENV === "development") {
    serialized.createdAt = new Date(0).toISOString();
  }
  return NextResponse.json(serialized, {
    headers: { "Cache-Control": "public, max-age=60" },
  });
}
