import { NextResponse } from "next/server";
import { ErrorCode, getErrorMessage } from "./errors";
import type { ApiResponse } from "@/types/api";

export function apiSuccess<T>(data: T, message?: string, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json<ApiResponse<T>>(
    { success: true, data, message },
    { status }
  );
}

export function apiError(code: ErrorCode, customMessage?: string, status = 400): NextResponse<ApiResponse<never>> {
  return NextResponse.json<ApiResponse<never>>(
    { success: false, error: getErrorMessage(code, customMessage) },
    { status }
  );
}

export function apiPaginated<T>(data: T[], total: number, page: number, pages: number): NextResponse {
  return NextResponse.json({ success: true, data, total, page, pages });
}

export async function handleApiError(error: unknown): Promise<NextResponse<ApiResponse<never>>> {
  console.error("API Error:", error);

  if (error instanceof Error) {
    if (error.message.includes("not found") || error.message.includes("Not Found")) {
      return apiError(ErrorCode.NOT_FOUND, error.message, 404);
    }
    if (error.message.includes("validation") || error.message.includes("Validation")) {
      return apiError(ErrorCode.VALIDATION_ERROR, error.message, 422);
    }
  }

  return apiError(ErrorCode.INTERNAL_ERROR, undefined, 500);
}
