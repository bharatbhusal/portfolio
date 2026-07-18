import mongoose from "mongoose";
import type { SocialLinkConfig, SocialPlatform } from "@/types/social";
import { serializeDoc } from "@/lib/serialize";

const SchemaName = "SocialLink";

const schema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    handle: { type: String, default: "" },
    enabled: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export interface SocialLinkDocument extends SocialLinkConfig {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLink =
  mongoose.models[SchemaName] || mongoose.model(SchemaName, schema);

function serialize(doc: Record<string, unknown>) {
  return serializeDoc(doc);
}

export async function getSocialLinks(): Promise<SocialLinkDocument[]> {
  const docs = await SocialLink.find({}).lean();
  return docs.map((d) => serialize(d) as unknown as SocialLinkDocument);
}

export async function updateSocialLinks(
  links: SocialLinkConfig[],
): Promise<SocialLinkDocument[]> {
  await SocialLink.deleteMany({});
  await SocialLink.insertMany(links);
  return getSocialLinks();
}

export async function initializeSocialLinks(): Promise<void> {
  const count = await SocialLink.countDocuments();
  if (count > 0) return;

  const defaultPlatforms: SocialLinkConfig[] = [
    { platform: "github" as SocialPlatform, handle: "", enabled: false },
    { platform: "twitter" as SocialPlatform, handle: "", enabled: false },
    { platform: "telegram" as SocialPlatform, handle: "", enabled: false },
    { platform: "email" as SocialPlatform, handle: "", enabled: false },
    { platform: "substack" as SocialPlatform, handle: "", enabled: false },
    { platform: "linkedin" as SocialPlatform, handle: "", enabled: false },
    { platform: "instagram" as SocialPlatform, handle: "", enabled: false },
    { platform: "phone" as SocialPlatform, handle: "", enabled: false },
  ];
  await SocialLink.insertMany(defaultPlatforms);
}

export default SocialLink;
