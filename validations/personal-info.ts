import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.object({
    full: z.string().min(1, "Full name is required"),
    first: z.string().min(1, "First name is required"),
    last: z.string().min(1, "Last name is required"),
  }),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
  title: z.string().min(1, "Title is required"),
  tagline: z.string().optional(),
  bio: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});
