import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import type { CareerItem } from "@/types";
import { getCareerById, updateCareer, deleteCareer } from "@/services/career";
import { careerSchema } from "@/validations/career";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const career = await getCareerById(id);

    if (!career) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Career not found" },
        { status: 404 },
      );
    }

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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = careerSchema.partial().safeParse(body);

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

    const updated = await updateCareer(id, result.data as Partial<CareerItem>);
    if (!updated) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Career not found" },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<typeof updated>>({
      success: true,
      data: updated,
      message: "Career updated",
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to update career" },
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
    const deleted = await deleteCareer(id);

    if (!deleted) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Career not found" },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      message: "Career deleted",
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to delete career" },
      { status: 500 },
    );
  }
}
