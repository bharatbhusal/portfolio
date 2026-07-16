import { Db, Collection, ObjectId } from "mongodb";
import { getDb, serializeId } from "@/lib/mongodb";
import type { SocialLinkConfig } from "@/types/social";

export interface SocialLinkDocument extends SocialLinkConfig {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

let cachedCollection: Collection<SocialLinkDocument> | null = null;

async function getCollection(): Promise<Collection<SocialLinkDocument>> {
  if (cachedCollection) return cachedCollection;
  const db: Db = await getDb();
  cachedCollection = db.collection<SocialLinkDocument>("social_links");
  return cachedCollection;
}

export async function getSocialLinks(): Promise<SocialLinkDocument[]> {
  const collection = await getCollection();
  const docs = await collection.find({}).toArray();
  return docs.map((doc) => serializeId(doc) as unknown as SocialLinkDocument);
}

export async function updateSocialLinks(
  links: SocialLinkConfig[],
): Promise<SocialLinkDocument[]> {
  const collection = await getCollection();
  const now = new Date();

  // Delete all existing and insert new
  await collection.deleteMany({});
  const docs = links.map((link) => ({
    ...link,
    createdAt: now,
    updatedAt: now,
  }));
  await collection.insertMany(docs);

  return getSocialLinks();
}

export async function initializeSocialLinks(): Promise<void> {
  const collection = await getCollection();
  const count = await collection.countDocuments();
  if (count > 0) return;

  // Initialize with default platforms (all disabled)
  const defaultPlatforms: SocialLinkConfig[] = [
    { platform: "github", url: "", handle: "", enabled: false },
    { platform: "twitter", url: "", handle: "", enabled: false },
    { platform: "telegram", url: "", handle: "", enabled: false },
    { platform: "email", url: "", handle: "", enabled: false },
    { platform: "substack", url: "", handle: "", enabled: false },
    { platform: "linkedin", url: "", handle: "", enabled: false },
    { platform: "instagram", url: "", handle: "", enabled: false },
  ];

  const now = new Date();
  const docs = defaultPlatforms.map((link) => ({
    ...link,
    createdAt: now,
    updatedAt: now,
  }));
  await collection.insertMany(docs);
}
