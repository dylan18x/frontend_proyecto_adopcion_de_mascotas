import { api } from "./api";

export type RecetaDto = {
  id: string;
  dosis: string;
  duracion: string;
  consultaId: string;
  medicamentoId: string;
  medicamento?: {
    id: string;
    nombre: string;
  };
  consulta?: {
    id: string;
    motivo: string;
  };
};

type PaginationResponse<T> = {
  items: T[];
  meta: any;
};

export async function getRecetas(): Promise<RecetaDto[]> {
  const { data } = await api.get<PaginationResponse<RecetaDto>>("/recetas");
  return data.items;
}