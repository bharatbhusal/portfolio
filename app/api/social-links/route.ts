import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import { getSocialLinks, updateSocialLinks } from "@/services/social-links";
import { socialLinksArraySchema } from "@/validations/social-links";

export async function GET() {
  try {
    const links = await getSocialLinks();
    return NextResponse.json<ApiResponse<typeof links>>({
      success: true,
      data: links,
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to fetch social links" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const result = socialLinksArraySchema.safeParse(body);

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

    const updated = await updateSocialLinks(result.data);
    return NextResponse.json<ApiResponse<typeof updated>>({
      success: true,
      data: updated,
      message: "Social links updated",
    });
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to update social links" },
      { status: 500 },
    );
  }
}
