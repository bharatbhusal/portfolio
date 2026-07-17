import { getRateLimitsCollection } from "./mongodb";
import { env } from "./env";

// Service-wide PDF cooldown = RATE_LIMIT_WINDOW * RATE_LIMIT_MAX_REQUESTS
const PDF_WINDOW_MS =
  env.RATE_LIMIT_WINDOW * env.RATE_LIMIT_MAX_REQUESTS;

// User-specific cooldown = 1/10th of service cooldown
const USER_WINDOW_MS = Math.floor(PDF_WINDOW_MS / 10);

// Per-IP rate limit window (from env)
export const API_RATE_WINDOW_MS = env.RATE_LIMIT_WINDOW;

export function getCooldownWindows() {
  return {
    serviceCooldown: PDF_WINDOW_MS,
    userCooldown: USER_WINDOW_MS,
  };
}

// Per-IP rate limit via MongoDB
export async function checkApiRateLimit(
  ip: string,
  windowMs = API_RATE_WINDOW_MS,
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

// Service-wide PDF rate limit via in-memory
let lastPdfGeneration = 0;

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
