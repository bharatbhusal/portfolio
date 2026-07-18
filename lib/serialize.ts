import mongoose from "mongoose";

/**
 * Recursively converts every Mongoose ObjectId (`_id`) in a document to a
 * string, including nested subdocuments and array elements. Plain objects
 * returned from `.lean()` contain ObjectId instances whose `toJSON` breaks
 * RSC serialization, so we normalize them to strings before sending to the UI.
 */
export function serializeDoc<T = unknown>(doc: T): T {
  if (doc == null) return doc;
  if (doc instanceof mongoose.Types.ObjectId) {
    return doc.toString() as unknown as T;
  }
  if (Array.isArray(doc)) {
    return doc.map((item) => serializeDoc(item)) as unknown as T;
  }
  if (typeof doc === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(doc)) {
      out[key] = key === "_id" ? serializeDoc(value) : serializeDoc(value);
    }
    return out as T;
  }
  return doc;
}
