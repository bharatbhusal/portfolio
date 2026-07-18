import mongoose from "mongoose";
import { serializeDoc } from "@/lib/serialize";

const SchemaName = "PersonalInfo";

const schema = new mongoose.Schema(
  {
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    title: { type: String, required: true },
    tagline: String,
    bio: String,
    keywords: [String],
  },
  { timestamps: true },
);

export interface PersonalInfoDocument {
  _id: mongoose.Types.ObjectId;
  name: {
    first: string;
    last: string;
  };
  title: string;
  tagline?: string;
  bio?: string;
  keywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PersonalInfo =
  mongoose.models[SchemaName] || mongoose.model(SchemaName, schema);

function serialize(doc: Record<string, unknown>) {
  return serializeDoc(doc);
}

export async function getPersonalInfo(): Promise<PersonalInfoDocument | null> {
  const doc = await PersonalInfo.findOne({}).lean();
  return doc ? (serialize(doc) as unknown as PersonalInfoDocument) : null;
}

export async function updatePersonalInfo(
  data: Partial<PersonalInfoDocument>,
): Promise<PersonalInfoDocument> {
  const doc = await PersonalInfo.findOneAndUpdate({}, data, {
    new: true,
    upsert: true,
    runValidators: true,
  }).lean();
  if (!doc) throw new Error("Failed to update personal info");
  return serialize(doc) as unknown as PersonalInfoDocument;
}

export default PersonalInfo;
