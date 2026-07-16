import { Db, Collection, ObjectId } from "mongodb";
import { getDb, serializeId } from "@/lib/mongodb";
import type { CareerItem } from "@/types";

export interface CareerDocument extends CareerItem {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

let cachedCollection: Collection<CareerDocument> | null = null;

async function getCollection(): Promise<Collection<CareerDocument>> {
  if (cachedCollection) return cachedCollection;
  const db: Db = await getDb();
  cachedCollection = db.collection<CareerDocument>("career_items");
  return cachedCollection;
}

export async function getAllCareer(): Promise<CareerDocument[]> {
  const collection = await getCollection();
  const docs = await collection.find({}).sort({ startDate: -1 }).toArray();
  return docs.map((doc) => serializeId(doc) as unknown as CareerDocument);
}

export async function getCareerById(
  id: string,
): Promise<CareerDocument | null> {
  const collection = await getCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? (serializeId(doc) as unknown as CareerDocument) : null;
}

export async function createCareer(
  data: CareerItem,
): Promise<CareerDocument> {
  const collection = await getCollection();
  const now = new Date();
  const result = await collection.insertOne({
    ...data,
    createdAt: now,
    updatedAt: now,
  } as CareerDocument);
  const doc = await collection.findOne({ _id: result.insertedId });
  return serializeId(doc!) as unknown as CareerDocument;
}

export async function updateCareer(
  id: string,
  data: Partial<CareerItem>,
): Promise<CareerDocument | null> {
  const collection = await getCollection();
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
  return result ? (serializeId(result) as unknown as CareerDocument) : null;
}

export async function deleteCareer(id: string): Promise<boolean> {
  const collection = await getCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
