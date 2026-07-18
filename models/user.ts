import mongoose from "mongoose";
import { serializeDoc } from "@/lib/serialize";

const SchemaName = "User";

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export interface UserDocument {
  _id: mongoose.Types.ObjectId;
  username: string;
  passwordHash: string;
  createdAt: Date;
}

const User =
  mongoose.models[SchemaName] || mongoose.model(SchemaName, schema);

export async function getUserByUsername(
  username: string,
): Promise<UserDocument | null> {
  const doc = await User.findOne({ username }).lean();
  return doc ? (serializeDoc(doc) as unknown as UserDocument) : null;
}

export async function createUser(
  username: string,
  passwordHash: string,
): Promise<UserDocument> {
  const doc = await User.create({ username, passwordHash });
  return serializeDoc(doc.toObject() as Record<string, unknown>) as unknown as UserDocument;
}

export default User;
