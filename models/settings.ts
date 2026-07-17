import mongoose from "mongoose";

const SchemaName = "Setting";

const schema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
});

export interface SettingDocument {
  _id: mongoose.Types.ObjectId;
  key: string;
  value: string;
  updatedAt: Date;
}

const Setting =
  mongoose.models[SchemaName] || mongoose.model(SchemaName, schema);

export async function getSetting(key: string): Promise<string | null> {
  const doc = await Setting.findOne({ key }).lean();
  return doc?.value ?? null;
}

export async function setSetting(
  key: string,
  value: string,
): Promise<void> {
  await Setting.updateOne({ key }, { $set: { value } }, { upsert: true });
}

export async function getAllSettings(): Promise<{ key: string; value: string }[]> {
  const docs = await Setting.find({}).lean();
  return docs.map((d) => ({ key: d.key, value: d.value }));
}

export default Setting;
