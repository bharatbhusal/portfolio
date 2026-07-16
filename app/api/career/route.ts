import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import type { CareerItem } from "@/types";
import { getAllCareer, createCareer } from "@/services/career";
import { careerSchema } from "@/validations/career";

export async function GET() {
  try {
    const career = await getAllCareer();
    return NextResponse.json<ApiResponse<typeof career>>({
      success: true,
      data: career,
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to fetch career" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = careerSchema.safeParse(body);

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

    const created = await createCareer(result.data as CareerItem);
    return NextResponse.json<ApiResponse<typeof created>>({
      success: true,
      data: created,
      message: "Career created",
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to create career" },
      { status: 500 },
    );
  }
}
