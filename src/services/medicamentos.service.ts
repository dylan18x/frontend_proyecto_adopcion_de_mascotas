import { api } from "./api";

export type MedicamentoDto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
};

type PaginationResponse<T> = {
  items: T[];
  meta: any;
};

export async function getMedicamentos(): Promise<MedicamentoDto[]> {
  const { data } = await api.get<PaginationResponse<MedicamentoDto>>("/medicamentos");
  return data.items;
}