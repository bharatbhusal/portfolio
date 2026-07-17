import mongoose from "mongoose";

const SchemaName = "Resume";

const resumeSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    basics: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      url: String,
      summary: { type: String, default: "" },
      location: String,
      profiles: [
        {
          network: String,
          url: String,
        },
      ],
    },
    work: [
      {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        location: String,
        summary: String,
        highlights: { type: [String], default: [] },
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        area: String,
        startDate: String,
        endDate: String,
        gpa: String,
      },
    ],
    skills: [
      {
        category: String,
        keywords: { type: [String], default: [] },
      },
    ],
    projects: [
      {
        name: String,
        description: String,
        highlights: { type: [String], default: [] },
        techStack: { type: [String], default: [] },
        url: String,
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export interface ResumeDocument {
  _id: mongoose.Types.ObjectId;
  role: string;
  basics: {
    name: string;
    email: string;
    phone?: string;
    url?: string;
    summary: string;
    location?: string;
    profiles?: { network: string; url: string }[];
  };
  work: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    location?: string;
    summary?: string;
    highlights: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    area: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
  }[];
  skills: {
    category: string;
    keywords: string[];
  }[];
  projects: {
    name: string;
    highlights: string[];
    techStack: string[];
    url?: string;
  }[];
  createdAt: Date;
}

const Resume =
  mongoose.models[SchemaName] || mongoose.model(SchemaName, resumeSchema);

export function serializeResume(doc: Record<string, unknown>) {
  if (doc && doc._id) {
    return { ...doc, _id: doc._id.toString() };
  }
  return doc;
}

export async function getLatestResume(): Promise<ResumeDocument | null> {
  const doc = await Resume.findOne({}).sort({ createdAt: -1 }).lean();
  return doc ? (serializeResume(doc) as unknown as ResumeDocument) : null;
}

export async function getResumeHistory(
  page: number = 1,
  limit: number = 10,
): Promise<{ docs: ResumeDocument[]; total: number; page: number; pages: number }> {
  const skip = (page - 1) * limit;
  const total = await Resume.countDocuments();
  const docs = await Resume.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    docs: docs.map((d) => serializeResume(d) as unknown as ResumeDocument),
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

export async function getResumeById(
  id: string,
): Promise<ResumeDocument | null> {
  const doc = await Resume.findById(id).lean();
  return doc ? (serializeResume(doc) as unknown as ResumeDocument) : null;
}

export async function saveResume(
  data: Omit<ResumeDocument, "_id" | "createdAt">,
): Promise<ResumeDocument> {
  const doc = await Resume.create(data);
  const obj = doc.toObject();
  (obj as Record<string, unknown>)._id = obj._id.toString();
  return obj as unknown as ResumeDocument;
}

export default Resume;
