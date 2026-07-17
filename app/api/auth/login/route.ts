import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";
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
      return apiError(
        ErrorCode.VALIDATION_ERROR,
        Object.values(result.error.flatten().fieldErrors).flat().join(", ") || "Invalid input",
      );
    }

    const { username, password } = result.data;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return apiError(ErrorCode.INTERNAL_ERROR, "Admin credentials not configured", 500);
    }

    if (username !== adminUsername || password !== adminPassword) {
      return apiError(ErrorCode.AUTH_INVALID_CREDENTIALS, "Invalid credentials", 401);
    }

    const token = await signJwt({ username });
    const response = apiSuccess({ username }, "Login successful");

    return setAuthCookie(response, token);
  } catch (error) {
    return handleApiError(error);
  }
}
