import { api } from "./api";

export type MascotaDto = {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  cliente?: {
    nombre: string;
  } | null;
};

type PaginationResponse<T> = {
  items: T[];
  meta: any;
};

export async function getMascotas(): Promise<MascotaDto[]> {
  const { data } = await api.get<PaginationResponse<MascotaDto>>("/mascotas");
  return data.items;
}