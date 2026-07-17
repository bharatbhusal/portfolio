import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.object({
    full: z.string().min(1, "Full name is required"),
    first: z.string().min(1, "First name is required"),
    last: z.string().min(1, "Last name is required"),
  }),
  title: z.string().min(1, "Title is required"),
  tagline: z.string().optional(),
  bio: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});
