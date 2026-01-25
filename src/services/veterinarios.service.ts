import { api } from "./api";

export type VeterinarioDto = {
  id: string;
  nombre: string;
  especialidad: string;
  telefono: string;
};

type PaginationResponse<T> = {
  items: T[];
  meta: any;
};

export async function getVeterinarios(): Promise<VeterinarioDto[]> {
  const { data } = await api.get<PaginationResponse<VeterinarioDto>>("/veterinarios");
  return data.items;
}