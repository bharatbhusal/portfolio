import type { PersonalInfoDocument } from "@/models/personal-info";
import {
  getPersonalInfo as getModelInfo,
  updatePersonalInfo as modelUpdateInfo,
} from "@/models/personal-info";

export type PersonalInfo = PersonalInfoDocument;

export async function getPersonalInfo(): Promise<PersonalInfo | null> {
  return getModelInfo();
}

export async function updatePersonalInfo(
  data: Partial<PersonalInfo>,
): Promise<PersonalInfo> {
  return modelUpdateInfo(data);
}
