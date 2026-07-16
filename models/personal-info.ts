import { Db, Collection, ObjectId } from "mongodb";
import { getDb, serializeId } from "@/lib/mongodb";

export interface PersonalInfoDocument {
  _id?: ObjectId;
  name: {
    full: string;
    first: string;
    last: string;
  };
  email: string;
  phone?: string;
  website?: string;
  portfolio?: string;
  title: string;
  tagline?: string;
  bio?: string;
  keywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

let cachedCollection: Collection<PersonalInfoDocument> | null = null;

async function getCollection(): Promise<Collection<PersonalInfoDocument>> {
  if (cachedCollection) return cachedCollection;
  const db: Db = await getDb();
  cachedCollection = db.collection<PersonalInfoDocument>("personal_info");
  return cachedCollection;
}

export async function getPersonalInfo(): Promise<PersonalInfoDocument | null> {
  const collection = await getCollection();
  const doc = await collection.findOne({});
  return doc ? (serializeId(doc) as unknown as PersonalInfoDocument) : null;
}

export async function updatePersonalInfo(
  data: Partial<PersonalInfoDocument>,
): Promise<PersonalInfoDocument> {
  const collection = await getCollection();
  const now = new Date();

  const result = await collection.findOneAndUpdate(
    {},
    {
      $set: { ...data, updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true, returnDocument: "after" },
  );

  if (!result) throw new Error("Failed to update personal info");
  return serializeId(result) as unknown as PersonalInfoDocument;
}
