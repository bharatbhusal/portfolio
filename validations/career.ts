import { z } from "zod";

export const careerSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  achievements: z.array(z.string()).optional(),
  links: z
    .array(
      z.object({
        link: z.string().url("Invalid URL"),
        type: z.string(),
      }),
    )
    .optional(),
  highlight: z.enum(["PINNED"]).optional(),
});
