import { api } from "./api";

export type VacunaDto = {
  id: string; 
  nombre: string;
  fabricante: string;
};

type PaginationResponse<T> = {
  items: T[];
  meta: any;
};

export async function getVacunas(): Promise<VacunaDto[]> {
  const { data } = await api.get<PaginationResponse<VacunaDto>>("/vacunas");
  return data.items; 
}