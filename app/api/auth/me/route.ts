import { apiSuccess, handleApiError } from "@/lib/api-utils";

export async function GET() {
  try {
    const username = process.env.ADMIN_USERNAME;
    return apiSuccess({ username: username! });
  } catch (error) {
    return handleApiError(error);
  }
}
