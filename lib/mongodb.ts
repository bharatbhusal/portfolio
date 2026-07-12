import { MongoClient, Db, WithId, Document } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error("DATABASE_URL not set");
  cachedClient = await MongoClient.connect(uri);
  cachedDb = cachedClient.db();
  return cachedDb;
}

export function serializeId(doc: WithId<Document>): Record<string, unknown> {
  return { ...doc, _id: doc._id.toString() };
}

export async function getResumesCollection() {
  const db = await getDb();
  return db.collection("resumes");
}

export async function getRateLimitsCollection() {
  const db = await getDb();
  return db.collection("rate_limits");
}
