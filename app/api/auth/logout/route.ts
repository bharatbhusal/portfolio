import { apiSuccess } from "@/lib/api-utils";
import { clearAuthCookie } from "@/services/auth";

export async function POST() {
  const response = apiSuccess(null, "Logged out");
  return clearAuthCookie(response);
}
