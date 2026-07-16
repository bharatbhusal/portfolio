import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import { clearAuthCookie } from "@/services/auth";

export async function POST() {
  const response = NextResponse.json<ApiResponse<null>>({
    success: true,
    message: "Logged out",
  });

  return clearAuthCookie(response);
}
