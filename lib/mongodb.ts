import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL || "mongodb://localhost:27017/resume";

let isConnected = false;

export async function connectDB(): Promise<typeof mongoose> {
  if (isConnected) return mongoose;
  await mongoose.connect(MONGODB_URI);
  isConnected = true;
  return mongoose;
}

export async function getDb() {
  await connectDB();
  return mongoose.connection.db!;
}

export function serializeId(doc: Record<string, unknown>) {
  if (doc && doc._id) {
    return { ...doc, _id: doc._id.toString() };
  }
  return doc;
}

// ponytail: backward compat for rate-limit.ts — remove once migrated to a Mongoose model
export async function getRateLimitsCollection() {
  await connectDB();
  return mongoose.connection.db!.collection("rate_limits");
}
