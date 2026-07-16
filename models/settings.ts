import { Db, Collection } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface SettingDocument {
  _id?: string;
  key: string;
  value: string;
  updatedAt: Date;
}

let cachedCollection: Collection<SettingDocument> | null = null;

async function getCollection(): Promise<Collection<SettingDocument>> {
  if (cachedCollection) return cachedCollection;
  const db: Db = await getDb();
  cachedCollection = db.collection<SettingDocument>("settings");
  await cachedCollection.createIndex({ key: 1 }, { unique: true });
  return cachedCollection;
}

export async function getSetting(key: string): Promise<string | null> {
  const collection = await getCollection();
  const doc = await collection.findOne({ key });
  return doc?.value ?? null;
}

export async function setSetting(
  key: string,
  value: string,
): Promise<void> {
  const collection = await getCollection();
  await collection.updateOne(
    { key },
    { $set: { value, updatedAt: new Date() } },
    { upsert: true },
  );
}

export async function getAllSettings(): Promise<
  { key: string; value: string }[]
> {
  const collection = await getCollection();
  const docs = await collection.find({}).toArray();
  return docs.map((doc) => ({
    key: doc.key,
    value: doc.value,
  }));
}
