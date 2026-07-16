import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import { loginSchema } from "@/validations/auth";
import {
  comparePassword,
  signJwt,
  setAuthCookie,
} from "@/services/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: result.error.flatten().fieldErrors
            ? Object.values(result.error.flatten().fieldErrors)
                .flat()
                .join(", ")
            : "Invalid input",
        },
        { status: 400 },
      );
    }

    const { username, password } = result.data;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Admin credentials not configured" },
        { status: 500 },
      );
    }

    if (username !== adminUsername) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // For env-based auth, compare plaintext (admin password from env)
    // If using bcrypt, store hash in env and compare with comparePassword()
    if (password !== adminPassword) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = await signJwt({ username });
    const response = NextResponse.json<ApiResponse<{ username: string }>>({
      success: true,
      data: { username },
      message: "Login successful",
    });

    return setAuthCookie(response, token);
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
