import { Db, Collection, ObjectId } from "mongodb";
import { getDb, serializeId } from "@/lib/mongodb";

export interface ResumeDocument {
  _id?: ObjectId;
  role: string;
  basics: {
    name: string;
    email: string;
    phone?: string;
    url?: string;
    summary: string;
    location?: string;
    profiles?: { network: string; url: string }[];
  };
  work: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    location?: string;
    summary?: string;
    highlights: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    area: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
  }[];
  skills: {
    category: string;
    keywords: string[];
  }[];
  projects: {
    name: string;
    highlights: string[];
    techStack: string[];
    url?: string;
  }[];
  createdAt: Date;
}

let cachedCollection: Collection<ResumeDocument> | null = null;

async function getCollection(): Promise<Collection<ResumeDocument>> {
  if (cachedCollection) return cachedCollection;
  const db: Db = await getDb();
  cachedCollection = db.collection<ResumeDocument>("resumes");
  // Ensure index for efficient sorting
  await cachedCollection.createIndex({ createdAt: -1 });
  return cachedCollection;
}

export async function getLatestResume(): Promise<ResumeDocument | null> {
  const collection = await getCollection();
  const doc = await collection.findOne({}, { sort: { createdAt: -1 } });
  return doc ? (serializeId(doc) as unknown as ResumeDocument) : null;
}

export async function getResumeHistory(
  page: number = 1,
  limit: number = 10,
): Promise<{ docs: ResumeDocument[]; total: number; page: number; pages: number }> {
  const collection = await getCollection();
  const skip = (page - 1) * limit;
  const total = await collection.countDocuments();
  const docs = await collection
    .find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  return {
    docs: docs.map((doc) => serializeId(doc) as unknown as ResumeDocument),
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

export async function getResumeById(
  id: string,
): Promise<ResumeDocument | null> {
  const collection = await getCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? (serializeId(doc) as unknown as ResumeDocument) : null;
}

export async function saveResume(
  data: Omit<ResumeDocument, "_id" | "createdAt">,
): Promise<ResumeDocument> {
  const collection = await getCollection();
  const doc = {
    ...data,
    createdAt: new Date(),
  };
  const result = await collection.insertOne(doc as ResumeDocument);
  const saved = await collection.findOne({ _id: result.insertedId });
  return serializeId(saved!) as unknown as ResumeDocument;
}
