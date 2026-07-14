import { getRateLimitsCollection } from "./mongodb";

// Per-IP rate limit (10min) via MongoDB
export async function checkApiRateLimit(
  ip: string,
  windowMs = 10 * 60_000,
): Promise<{ allowed: boolean; retryAfterMs?: number }> {
  if (process.env.NODE_ENV === "development") return { allowed: true };

  const col = await getRateLimitsCollection();
  const now = new Date();
  const cutoff = new Date(now.getTime() - windowMs);

  const record = await col.findOne({ ip });
  if (record && record.lastRequest > cutoff) {
    const retryAfterMs =
      record.lastRequest.getTime() + windowMs - now.getTime();
    return { allowed: false, retryAfterMs };
  }

  await col.updateOne({ ip }, { $set: { lastRequest: now } }, { upsert: true });
  return { allowed: true };
}

// Service-wide PDF rate limit (2 hours) via in-memory
let lastPdfGeneration = 0;
const PDF_WINDOW_MS = 2 * 60 * 60 * 1000;

export function checkPdfRateLimit(): {
  allowed: boolean;
  retryAfterMs?: number;
} {
  if (process.env.NODE_ENV === "development") return { allowed: true };

  const now = Date.now();
  if (now - lastPdfGeneration < PDF_WINDOW_MS) {
    return {
      allowed: false,
      retryAfterMs: lastPdfGeneration + PDF_WINDOW_MS - now,
    };
  }
  lastPdfGeneration = now;
  return { allowed: true };
}

export function extractIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
