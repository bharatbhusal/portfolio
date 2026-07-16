import type { CareerItem } from "@/types";
import type { CareerDocument } from "@/models/career";
import {
  getAllCareer as modelGetAll,
  getCareerById as modelGetById,
  createCareer as modelCreate,
  updateCareer as modelUpdate,
  deleteCareer as modelDelete,
} from "@/models/career";

export type Career = CareerDocument;

export async function getAllCareer(): Promise<Career[]> {
  return modelGetAll();
}

export async function getCareerById(id: string): Promise<Career | null> {
  return modelGetById(id);
}

export async function createCareer(data: CareerItem): Promise<Career> {
  return modelCreate(data);
}

export async function updateCareer(
  id: string,
  data: Partial<CareerItem>,
): Promise<Career | null> {
  return modelUpdate(id, data);
}

export async function deleteCareer(id: string): Promise<boolean> {
  return modelDelete(id);
}
