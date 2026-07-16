import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import { uploadImage, getProfileImageId, deleteImage } from "@/services/image";

export async function GET() {
  try {
    const imageId = await getProfileImageId();
    return NextResponse.json<ApiResponse<{ id: string | null }>>({
      success: true,
      data: { id: imageId },
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to get profile image" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "File must be an image" },
        { status: 400 },
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "File size must be less than 5MB" },
        { status: 400 },
      );
    }

    // Delete existing profile image
    const existingId = await getProfileImageId();
    if (existingId) {
      await deleteImage(existingId);
    }

    const id = await uploadImage(file, file.name);
    return NextResponse.json<ApiResponse<{ id: string }>>({
      success: true,
      data: { id },
      message: "Image uploaded",
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to upload image" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const imageId = await getProfileImageId();
    if (!imageId) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "No image to delete" },
        { status: 404 },
      );
    }

    await deleteImage(imageId);
    return NextResponse.json<ApiResponse<null>>({
      success: true,
      message: "Image deleted",
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to delete image" },
      { status: 500 },
    );
  }
}
