import mongoose from "mongoose";
import { getDb } from "@/lib/mongodb";

const { GridFSBucket } = mongoose.mongo;
const ObjectId = mongoose.Types.ObjectId;

let cachedBucket: InstanceType<typeof GridFSBucket> | null = null;

async function getBucket() {
  if (cachedBucket) return cachedBucket;
  const db = await getDb();
  cachedBucket = new GridFSBucket(db, { bucketName: "images" });
  return cachedBucket;
}

export async function uploadImage(
  file: File,
  filename: string,
): Promise<string> {
  const bucket = await getBucket();
  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadStream = bucket.openUploadStream(filename, {
    metadata: { contentType: file.type },
  });

  return new Promise((resolve, reject) => {
    uploadStream.on("error", reject);
    uploadStream.on("finish", () => {
      resolve(uploadStream.id.toString());
    });
    uploadStream.end(buffer);
  });
}

export async function getImage(
  id: string,
): Promise<{ buffer: Buffer; contentType: string } | null> {
  try {
    const bucket = await getBucket();
    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {
      const downloadStream = bucket.openDownloadStream(new ObjectId(id));

      downloadStream.on("data", (chunk: Buffer) => chunks.push(chunk));
      downloadStream.on("error", () => resolve(null));
      downloadStream.on("end", async () => {
        const db = await getDb();
        const file = await db
          .collection("images.files")
          .findOne({ _id: new ObjectId(id) });

        resolve({
          buffer: Buffer.concat(chunks),
          contentType: (file as Record<string, unknown>)?.contentType as string || "image/jpeg",
        });
      });
    });
  } catch {
    return null;
  }
}

export async function deleteImage(id: string): Promise<boolean> {
  try {
    const bucket = await getBucket();
    await bucket.delete(new ObjectId(id));
    return true;
  } catch {
    return false;
  }
}

export async function getProfileImageId(): Promise<string | null> {
  const db = await getDb();
  const file = await db
    .collection("images.files")
    .findOne({}, { sort: { uploadDate: -1 } });
  return file?._id.toString() ?? null;
}
