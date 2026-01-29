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

export async function createMedicamento(med: Omit<MedicamentoDto, "id">): Promise<MedicamentoDto> {
  const { data } = await api.post<MedicamentoDto>("/medicamentos", med);
  return data;
}

export async function updateMedicamento(id: string, med: Partial<MedicamentoDto>): Promise<MedicamentoDto> {
  const { data } = await api.put<MedicamentoDto>(`/medicamentos/${id}`, med);
  return data;
}

export async function deleteMedicamento(id: string): Promise<void> {
  await api.delete(`/medicamentos/${id}`);
}
