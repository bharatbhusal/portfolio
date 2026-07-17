import { z } from "zod";

export const socialLinkSchema = z.object({
  platform: z.enum([
    "github",
    "twitter",
    "telegram",
    "email",
    "substack",
    "linkedin",
    "instagram",
    "phone",
  ]),
  handle: z.string(),
  enabled: z.boolean(),
});

export const socialLinksArraySchema = z.array(socialLinkSchema);
