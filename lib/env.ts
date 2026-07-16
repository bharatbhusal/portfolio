import { z } from "zod";

const envSchema = z.object({
  // Existing
  GITHUB_TOKEN: z.string().optional(),
  GITHUB_USERNAME: z.string().optional(),
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
  DATABASE_URL: z.string().default("mongodb://localhost:27017/resume"),
  HOSTED_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Auth
  ADMIN_USERNAME: z.string().min(1, "ADMIN_USERNAME is required"),
  ADMIN_PASSWORD: z
    .string()
    .min(6, "ADMIN_PASSWORD must be at least 6 characters"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),

  // Rate limiting (in ms)
  RATE_LIMIT_WINDOW: z.string().default("600000").transform(Number),
  RATE_LIMIT_MAX_REQUESTS: z.string().default("10").transform(Number),

  // Cache (in seconds)
  CACHE_DURATION: z.string().default("3600").transform(Number),
});

function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = validateEnv();
