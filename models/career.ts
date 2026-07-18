import mongoose from "mongoose";
import type { CareerItem } from "@/types";
import { serializeDoc } from "@/lib/serialize";

const SchemaName = "Career";

const schema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: String,
    address: String,
    description: String,
    achievements: { type: [String], default: [] },
    links: {
      type: [
        {
          link: String,
          icon: mongoose.Schema.Types.Mixed,
          type: { type: String },
        },
      ],
      default: [],
    },
    highlight: String,
  },
  { timestamps: true },
);

export interface CareerDocument extends CareerItem {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const Career =
  mongoose.models[SchemaName] || mongoose.model(SchemaName, schema);

function serialize(doc: Record<string, unknown>) {
  return serializeDoc(doc);
}

export async function getAllCareer(): Promise<CareerDocument[]> {
  const docs = await Career.find({}).sort({ startDate: -1 }).lean();
  return docs.map((d) => serialize(d) as unknown as CareerDocument);
}

export async function getCareerById(
  id: string,
): Promise<CareerDocument | null> {
  const doc = await Career.findById(id).lean();
  return doc ? (serialize(doc) as unknown as CareerDocument) : null;
}

export async function createCareer(data: CareerItem): Promise<CareerDocument> {
  const doc = await Career.create(data);
  return serializeDoc(doc.toObject() as Record<string, unknown>) as unknown as CareerDocument;
}

export async function updateCareer(
  id: string,
  data: Partial<CareerItem>,
): Promise<CareerDocument | null> {
  const doc = await Career.findByIdAndUpdate(id, data, { new: true }).lean();
  return doc ? (serialize(doc) as unknown as CareerDocument) : null;
}

export async function deleteCareer(id: string): Promise<boolean> {
  const result = await Career.findByIdAndDelete(id);
  return !!result;
}

export default Career;
