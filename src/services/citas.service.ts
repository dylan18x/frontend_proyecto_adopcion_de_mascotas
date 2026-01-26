import { api } from "./api";

export type CitaDto = {
  id: string;
  fecha: string;
  hora: string;
  motivo: string;
  mascota?: { nombre: string } | any; 
  veterinario?: { nombre: string } | any;
};

type PaginationResponse<T> = {
  items: T[];
  meta: any;
};

export async function getCitas(): Promise<CitaDto[]> {
  const { data } = await api.get<PaginationResponse<CitaDto>>("/citas"); 
  return data.items;
}