import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";

export async function GET() {
  try {
    const username = process.env.ADMIN_USERNAME;
    return NextResponse.json<ApiResponse<{ username: string }>>({
      success: true,
      data: { username: username! },
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to get user info" },
      { status: 500 },
    );
  }
}
