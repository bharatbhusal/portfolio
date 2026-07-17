import mongoose from "mongoose";
import type { EducationItem } from "@/types";

const SchemaName = "Education";

const schema = new mongoose.Schema(
  {
    institution: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: String,
    address: { type: String, required: true },
    cgpa: { type: String, required: true },
    links: {
      type: [
        {
          link: String,
          icon: mongoose.Schema.Types.Mixed,
          type: String,
        },
      ],
      default: [],
    },
    courses: { type: [String], default: [] },
    degree: String,
    description: String,
    highlight: String,
  },
  { timestamps: true },
);

export interface EducationDocument extends EducationItem {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const Education =
  mongoose.models[SchemaName] || mongoose.model(SchemaName, schema);

function serialize(doc: Record<string, unknown>) {
  if (doc && doc._id) doc._id = doc._id.toString();
  return doc;
}

export async function getAllEducation(): Promise<EducationDocument[]> {
  const docs = await Education.find({}).sort({ startDate: -1 }).lean();
  return docs.map((d) => serialize(d) as unknown as EducationDocument);
}

export async function getEducationById(
  id: string,
): Promise<EducationDocument | null> {
  const doc = await Education.findById(id).lean();
  return doc ? (serialize(doc) as unknown as EducationDocument) : null;
}

export async function createEducation(
  data: EducationItem,
): Promise<EducationDocument> {
  const doc = await Education.create(data);
  const obj = doc.toObject();
  (obj as Record<string, unknown>)._id = obj._id.toString();
  return obj as unknown as EducationDocument;
}

export async function updateEducation(
  id: string,
  data: Partial<EducationItem>,
): Promise<EducationDocument | null> {
  const doc = await Education.findByIdAndUpdate(id, data, { new: true }).lean();
  return doc ? (serialize(doc) as unknown as EducationDocument) : null;
}

export async function deleteEducation(id: string): Promise<boolean> {
  const result = await Education.findByIdAndDelete(id);
  return !!result;
}

export default Education;
