import type { SocialLinkConfig } from "@/types/social";
import {
  getSocialLinks as getModelLinks,
  updateSocialLinks as modelUpdateLinks,
  initializeSocialLinks,
} from "@/models/social-links";

export async function getSocialLinks(): Promise<SocialLinkConfig[]> {
  await initializeSocialLinks();
  const docs = await getModelLinks();
  return docs.map((doc) => ({
    platform: doc.platform,
    handle: doc.handle,
    enabled: doc.enabled,
  }));
}

export async function updateSocialLinks(
  links: SocialLinkConfig[],
): Promise<SocialLinkConfig[]> {
  const docs = await modelUpdateLinks(links);
  return docs.map((doc) => ({
    platform: doc.platform,
    handle: doc.handle,
    enabled: doc.enabled,
  }));
}
