import { Db, Collection, ObjectId } from "mongodb";
import { getDb, serializeId } from "@/lib/mongodb";

export interface UserDocument {
  _id?: ObjectId;
  username: string;
  passwordHash: string;
  createdAt: Date;
}

let cachedCollection: Collection<UserDocument> | null = null;

async function getCollection(): Promise<Collection<UserDocument>> {
  if (cachedCollection) return cachedCollection;
  const db: Db = await getDb();
  cachedCollection = db.collection<UserDocument>("users");
  return cachedCollection;
}

export async function getUserByUsername(
  username: string,
): Promise<UserDocument | null> {
  const collection = await getCollection();
  const doc = await collection.findOne({ username });
  return doc ? (serializeId(doc) as unknown as UserDocument) : null;
}

export async function createUser(
  username: string,
  passwordHash: string,
): Promise<UserDocument> {
  const collection = await getCollection();
  const result = await collection.insertOne({
    username,
    passwordHash,
    createdAt: new Date(),
  } as UserDocument);
  const doc = await collection.findOne({ _id: result.insertedId });
  return serializeId(doc!) as unknown as UserDocument;
}
