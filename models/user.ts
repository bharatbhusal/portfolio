import mongoose from "mongoose";

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

function serialize(doc: Record<string, unknown>) {
  if (doc && doc._id) doc._id = doc._id.toString();
  return doc;
}

export async function getUserByUsername(
  username: string,
): Promise<UserDocument | null> {
  const doc = await User.findOne({ username }).lean();
  return doc ? (serialize(doc) as unknown as UserDocument) : null;
}

export async function createUser(
  username: string,
  passwordHash: string,
): Promise<UserDocument> {
  const doc = await User.create({ username, passwordHash });
  const obj = doc.toObject();
  (obj as Record<string, unknown>)._id = obj._id.toString();
  return obj as unknown as UserDocument;
}

export default User;
