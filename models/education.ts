import { Db, Collection, ObjectId } from "mongodb";
import { getDb, serializeId } from "@/lib/mongodb";
import type { EducationItem } from "@/types";

export interface EducationDocument extends EducationItem {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

let cachedCollection: Collection<EducationDocument> | null = null;

async function getCollection(): Promise<Collection<EducationDocument>> {
  if (cachedCollection) return cachedCollection;
  const db: Db = await getDb();
  cachedCollection = db.collection<EducationDocument>("education_items");
  return cachedCollection;
}

export async function getAllEducation(): Promise<EducationDocument[]> {
  const collection = await getCollection();
  const docs = await collection.find({}).sort({ startDate: -1 }).toArray();
  return docs.map((doc) => serializeId(doc) as unknown as EducationDocument);
}

export async function getEducationById(
  id: string,
): Promise<EducationDocument | null> {
  const collection = await getCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? (serializeId(doc) as unknown as EducationDocument) : null;
}

export async function createEducation(
  data: EducationItem,
): Promise<EducationDocument> {
  const collection = await getCollection();
  const now = new Date();
  const result = await collection.insertOne({
    ...data,
    createdAt: now,
    updatedAt: now,
  } as EducationDocument);
  const doc = await collection.findOne({ _id: result.insertedId });
  return serializeId(doc!) as unknown as EducationDocument;
}

export async function updateEducation(
  id: string,
  data: Partial<EducationItem>,
): Promise<EducationDocument | null> {
  const collection = await getCollection();
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
  return result ? (serializeId(result) as unknown as EducationDocument) : null;
}

export async function deleteEducation(id: string): Promise<boolean> {
  const collection = await getCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
