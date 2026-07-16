import { z } from "zod";

export const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  address: z.string().optional(),
  cgpa: z.string().optional(),
  description: z.string().optional(),
  courses: z.array(z.string()).optional(),
  links: z
    .array(
      z.object({
        link: z.string().url("Invalid URL"),
        type: z.string(),
      }),
    )
    .optional(),
  highlight: z.enum(["LATEST", "GOLD", "PINNED"]).optional(),
});
