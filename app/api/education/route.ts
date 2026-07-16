import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import type { EducationItem } from "@/types";
import { getAllEducation, createEducation } from "@/services/education";
import { educationSchema } from "@/validations/education";

export async function GET() {
  try {
    const education = await getAllEducation();
    return NextResponse.json<ApiResponse<typeof education>>({
      success: true,
      data: education,
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to fetch education" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = educationSchema.safeParse(body);

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

    const created = await createEducation(result.data as EducationItem);
    return NextResponse.json<ApiResponse<typeof created>>({
      success: true,
      data: created,
      message: "Education created",
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to create education" },
      { status: 500 },
    );
  }
}
