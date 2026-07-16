import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import type { EducationItem } from "@/types";
import {
  getEducationById,
  updateEducation,
  deleteEducation,
} from "@/services/education";
import { educationSchema } from "@/validations/education";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const education = await getEducationById(id);

    if (!education) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Education not found" },
        { status: 404 },
      );
    }

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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = educationSchema.partial().safeParse(body);

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

    const updated = await updateEducation(id, result.data as Partial<EducationItem>);
    if (!updated) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Education not found" },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<typeof updated>>({
      success: true,
      data: updated,
      message: "Education updated",
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to update education" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const deleted = await deleteEducation(id);

    if (!deleted) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Education not found" },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      message: "Education deleted",
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to delete education" },
      { status: 500 },
    );
  }
}
