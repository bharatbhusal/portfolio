import { NextRequest } from "next/server";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";
import { uploadImage, getProfileImageId, deleteImage, getImage } from "@/services/image";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const image = await getImage(id);
      if (!image) {
        return apiError(ErrorCode.IMAGE_NOT_FOUND, "Image not found", 404);
      }
      return new Response(image.buffer, {
        headers: {
          "Content-Type": image.contentType,
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    const imageId = await getProfileImageId();
    return apiSuccess({ id: imageId });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return apiError(ErrorCode.MISSING_REQUIRED_FIELD, "No file provided");
    }

    if (!file.type.startsWith("image/")) {
      return apiError(ErrorCode.VALIDATION_ERROR, "File must be an image");
    }

    if (file.size > 5 * 1024 * 1024) {
      return apiError(ErrorCode.VALIDATION_ERROR, "File size must be less than 5MB");
    }

    const existingId = await getProfileImageId();
    if (existingId) {
      await deleteImage(existingId);
    }

    const id = await uploadImage(file, file.name);
    return apiSuccess({ id }, "Image uploaded");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE() {
  try {
    const imageId = await getProfileImageId();
    if (!imageId) {
      return apiError(ErrorCode.IMAGE_NOT_FOUND, "No image to delete", 404);
    }

    await deleteImage(imageId);
    return apiSuccess(null, "Image deleted");
  } catch (error) {
    return handleApiError(error);
  }
}
