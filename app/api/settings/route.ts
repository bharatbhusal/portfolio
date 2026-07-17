import { NextRequest } from "next/server";
import { getAllSettings, setSetting } from "@/models/settings";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";

export async function GET() {
  try {
    const settings = await getAllSettings();
    const masked = settings.map((s) => ({
      key: s.key,
      value:
        s.key === "github_token" && s.value
          ? "••••" + s.value.slice(-4)
          : s.value,
    }));
    return apiSuccess(masked);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { key, value } = (await req.json()) as {
      key: string;
      value: string;
    };

    if (!key || typeof value !== "string") {
      return apiError(ErrorCode.MISSING_REQUIRED_FIELD, "key and value are required");
    }

    const allowedKeys = ["github_username", "github_token"];
    if (!allowedKeys.includes(key)) {
      return apiError(ErrorCode.VALIDATION_ERROR, "Invalid key");
    }

    await setSetting(key, value);
    return apiSuccess(null);
  } catch (error) {
    return handleApiError(error);
  }
}
