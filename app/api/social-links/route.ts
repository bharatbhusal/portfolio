import { apiSuccess, apiError, handleApiError } from "@/lib/api-utils";
import { ErrorCode } from "@/lib/errors";
import { connectDB } from "@/lib/mongodb";
import { getSocialLinks, updateSocialLinks } from "@/services/social-links";
import { socialLinksArraySchema } from "@/validations/social-links";

export async function GET() {
  try {
    await connectDB();
    const links = await getSocialLinks();
    return apiSuccess(links);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const result = socialLinksArraySchema.safeParse(body);

    if (!result.success) {
      return apiError(
        ErrorCode.VALIDATION_ERROR,
        Object.values(result.error.flatten().fieldErrors).flat().join(", "),
      );
    }
    await connectDB();
    const updated = await updateSocialLinks(result.data);
    return apiSuccess(updated, "Social links updated");
  } catch (error) {
    return handleApiError(error);
  }
}
