import type { PersonalInfoDocument } from "@/models/personal-info";
import type { EducationDocument } from "@/models/education";
import type { CareerDocument } from "@/models/career";
import type { SocialLinkConfig } from "@/types/social";

export async function prefetchPersonalInfo(): Promise<PersonalInfoDocument | null> {
  try {
    const { getPersonalInfo } = await import("@/models/personal-info");
    return getPersonalInfo();
  } catch {
    return null;
  }
}

export async function prefetchEducation(): Promise<EducationDocument[]> {
  try {
    const { getAllEducation } = await import("@/models/education");
    return getAllEducation();
  } catch {
    return [];
  }
}

export async function prefetchCareer(): Promise<CareerDocument[]> {
  try {
    const { getAllCareer } = await import("@/models/career");
    return getAllCareer();
  } catch {
    return [];
  }
}

export async function prefetchSocialLinks(): Promise<SocialLinkConfig[]> {
  try {
    const { getSocialLinks } = await import("@/models/social-links");
    const docs = await getSocialLinks();
    return docs.map((doc) => ({
      platform: doc.platform,
      url: doc.url,
      handle: doc.handle,
      enabled: doc.enabled,
    }));
  } catch {
    return [];
  }
}
