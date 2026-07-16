import type { EducationItem } from "@/types";
import type { EducationDocument } from "@/models/education";
import {
  getAllEducation as modelGetAll,
  getEducationById as modelGetById,
  createEducation as modelCreate,
  updateEducation as modelUpdate,
  deleteEducation as modelDelete,
} from "@/models/education";

export type Education = EducationDocument;

export async function getAllEducation(): Promise<Education[]> {
  return modelGetAll();
}

export async function getEducationById(id: string): Promise<Education | null> {
  return modelGetById(id);
}

export async function createEducation(data: EducationItem): Promise<Education> {
  return modelCreate(data);
}

export async function updateEducation(
  id: string,
  data: Partial<EducationItem>,
): Promise<Education | null> {
  return modelUpdate(id, data);
}

export async function deleteEducation(id: string): Promise<boolean> {
  return modelDelete(id);
}
