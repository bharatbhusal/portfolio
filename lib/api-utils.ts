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
    const msg = error.message;
    if (msg.includes("not found") || msg.includes("Not Found")) {
      return apiError(ErrorCode.NOT_FOUND, msg, 404);
    }
    if (msg.includes("Cast to") || msg.includes("CastError")) {
      return apiError(ErrorCode.VALIDATION_ERROR, "Invalid data format: " + msg, 422);
    }
    if (msg.includes("validation") || msg.includes("Validation")) {
      return apiError(ErrorCode.VALIDATION_ERROR, msg, 422);
    }
    if (msg.includes("duplicate") || msg.includes("E11000")) {
      return apiError(ErrorCode.VALIDATION_ERROR, "A record with this value already exists", 409);
    }
    if (msg.includes("timeout") || msg.includes("ECONNREFUSED")) {
      return apiError(ErrorCode.DATABASE_ERROR, "Database connection failed", 503);
    }
    // Surface the actual error message for other known errors
    return apiError(ErrorCode.INTERNAL_ERROR, msg, 500);
  }

  return apiError(ErrorCode.INTERNAL_ERROR, undefined, 500);
}
