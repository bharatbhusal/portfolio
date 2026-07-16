import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import { getPersonalInfo, updatePersonalInfo } from "@/services/personal-info";
import { personalInfoSchema } from "@/validations/personal-info";

export async function GET() {
  try {
    const info = await getPersonalInfo();
    return NextResponse.json<ApiResponse<typeof info>>({
      success: true,
      data: info,
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to fetch personal info" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const result = personalInfoSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: Object.values(result.error.flatten().fieldErrors)
            .flat()
            .join(", "),
        },
        { status: 400 },
      );
    }

    const updated = await updatePersonalInfo(result.data);
    return NextResponse.json<ApiResponse<typeof updated>>({
      success: true,
      data: updated,
      message: "Personal info updated",
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to update personal info" },
      { status: 500 },
    );
  }
}
